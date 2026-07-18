import { NextRequest, NextResponse } from "next/server";
import { assess, type AssessInput } from "@/lib/assess";
import { createLead, hlConfigured } from "@/lib/highlevel";

export const runtime = "nodejs";

const hits = new Map<string, { n: number; t: number }>();
function limited(ip: string): boolean {
  const now = Date.now();
  const rec = hits.get(ip);
  if (!rec || now - rec.t > 10 * 60 * 1000) { hits.set(ip, { n: 1, t: now }); return false; }
  rec.n++; return rec.n > 8;
}
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const clean = (s: unknown, max = 120) => String(s ?? "").replace(/[<>]/g, "").trim().slice(0, max);

async function triggerFollowupCall(p: { phone: string; firstName: string; needType: string; pagePath: string }) {
  const key = process.env.RETELL_API_KEY?.trim();
  const agentId = process.env.RETELL_OUTBOUND_AGENT_ID?.trim();
  if (!key || !agentId) return "unconfigured";
  const now = new Date();
  const mt = new Intl.DateTimeFormat("en-US", { timeZone: "America/Denver", hour12: false, weekday: "short", hour: "numeric" }).formatToParts(now);
  const weekday = mt.find((x) => x.type === "weekday")?.value || "";
  const hour = parseInt(mt.find((x) => x.type === "hour")?.value || "0", 10);
  if (weekday === "Sun" || hour < 8 || hour >= 19) return "outside_hours";
  const digits = p.phone.replace(/[^\d+]/g, "");
  const e164 = digits.startsWith("+") ? digits : `+1${digits.replace(/^1/, "")}`;
  if (!/^\+1\d{10}$/.test(e164)) return "bad_phone";
  const res = await fetch("https://api.retellai.com/v2/create-phone-call", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from_number: "+19704992705",
      to_number: e164,
      override_agent_id: agentId,
      retell_llm_dynamic_variables: { lead_first_name: p.firstName, need_type: p.needType, page_path: p.pagePath },
    }),
  });
  return res.ok ? "queued" : `failed_${res.status}`;
}

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (limited(ip)) return NextResponse.json({ error: "rate_limited" }, { status: 429 });

  let body: Record<string, unknown>;
  try { body = await req.json(); } catch { return NextResponse.json({ error: "bad_json" }, { status: 400 }); }
  if (clean(body.website)) return NextResponse.json({ ok: true, result: null });

  const contact = (body.contact || {}) as Record<string, unknown>;
  const firstName = clean(contact.firstName, 60);
  const lastName = clean(contact.lastName, 60);
  const email = clean(contact.email, 140).toLowerCase();
  const phone = clean(contact.phone, 30);
  if (!firstName || !lastName || !EMAIL_RE.test(email)) return NextResponse.json({ error: "invalid_contact" }, { status: 400 });

  const a = (body.answers || {}) as Record<string, string>;
  const input: AssessInput = {
    needType: clean(a.needType, 30) || "planning",
    situation: clean(a.situation, 30),
    estateSize: clean(a.estateSize, 20),
    documents: clean(a.documents, 20),
    family: clean(a.family, 20),
    urgency: clean(a.urgency, 20),
    concern: clean(a.concern, 30),
    county: clean(a.county, 30),
  };
  const result = assess(input);
  const pagePath = clean(body.pagePath, 200) || "/estate-snapshot";
  const keyword = clean(body.keyword, 120);
  const utmRaw = (body.utm || {}) as Record<string, unknown>;
  const utm: Record<string, string> = {};
  for (const k of ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"]) if (utmRaw[k]) utm[k] = clean(utmRaw[k], 100);

  let crm: "created" | "failed" | "unconfigured" = "unconfigured";
  if (hlConfigured()) {
    try {
      await createLead({
        firstName, lastName, email, phone: phone || undefined,
        pagePath, primaryKeyword: keyword || undefined, utm,
        answers: input as unknown as Record<string, string>,
        band: { low: 0, high: 0, qualifier: `Estate Snapshot: ${result.readiness}` },
      });
      crm = "created";
    } catch (e) {
      crm = "failed";
      console.error("[lead-dead-letter]", JSON.stringify({ at: new Date().toISOString(), email, firstName, lastName, phone, pagePath, keyword, utm, input, error: e instanceof Error ? e.message : String(e) }));
    }
  } else {
    console.error("[lead-dead-letter]", JSON.stringify({ at: new Date().toISOString(), reason: "highlevel_not_configured", email, firstName, lastName, phone, pagePath, keyword, input }));
  }

  let followup = "skipped";
  if (phone) {
    try { followup = await triggerFollowupCall({ phone, firstName, needType: input.needType, pagePath }); }
    catch (e) { followup = "error"; console.error("[followup-call]", e instanceof Error ? e.message : String(e)); }
  }

  return NextResponse.json({ ok: true, result, crm, followup });
}
