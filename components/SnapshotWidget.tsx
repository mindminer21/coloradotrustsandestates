"use client";
import { useMemo, useState } from "react";
import { SITE } from "@/lib/site";

type Answers = Record<string, string>;

const STEPS: { key: string; label: string; help?: string; options: [string, string][] }[] = [
  {
    key: "needType",
    label: "What brings you here today?",
    options: [
      ["planning", "Planning ahead — wills, trusts, protecting my family"],
      ["administration", "Someone passed — I need help with the estate"],
      ["dispute", "Something's wrong — an inheritance or trustee concern"],
      ["incapacity", "Planning for incapacity, elder care, or special needs"],
    ],
  },
  {
    key: "situation",
    label: "Which best describes your situation?",
    options: [
      ["individual", "Individual or couple planning"], ["family-young", "Family with minor children"],
      ["blended-fam", "Blended family"], ["business-owner", "Business or ranch/farm owner"],
      ["beneficiary", "I'm a beneficiary or heir"], ["fiduciary", "I'm a trustee, executor, or agent"],
    ],
  },
  {
    key: "estateSize",
    label: "Roughly, what's the total estate value involved?",
    help: "Home equity counts. A rough sense is fine — this stays confidential.",
    options: [
      ["under-500k", "Under $500,000"], ["500k-2m", "$500,000 – $2M"], ["2m-15m", "$2M – $15M"],
      ["over-15m", "Over $15M"], ["unsure", "Not sure"],
    ],
  },
  {
    key: "documents",
    label: "What documents exist today?",
    options: [
      ["none", "None yet"], ["will-only", "A will, but nothing else"],
      ["trust", "A trust (with or without a will)"], ["outdated", "Documents exist but are 5+ years old"],
      ["unknown", "I don't know what exists"],
    ],
  },
  {
    key: "family",
    label: "Any of these apply to your family?",
    options: [
      ["simple", "Fairly straightforward family"], ["blended", "Blended family / prior marriages"],
      ["business", "Family business or significant real estate"], ["special-needs", "A beneficiary with special needs"],
      ["conflict", "Existing family tension or conflict"],
    ],
  },
  {
    key: "urgency",
    label: "Is there any time pressure?",
    help: "Court dates, health situations, notices received — deadlines change everything.",
    options: [
      ["none", "No particular urgency"], ["health", "A health situation makes this timely"],
      ["death-recent", "A death occurred recently"], ["deadline-known", "There's a known court date or deadline"],
    ],
  },
  {
    key: "concern",
    label: "What's your biggest concern?",
    options: [
      ["family-protected", "Making sure my family is protected"], ["avoid-probate", "Avoiding probate and taxes"],
      ["trustee-control", "Someone controlling assets improperly"], ["poa-abuse", "Possible POA or caregiver abuse"],
      ["asset-missing", "Assets seem to be missing or mishandled"], ["fair-share", "Getting what was intended for me"],
    ],
  },
  {
    key: "county",
    label: "Where in Colorado?",
    options: [
      ["denver-metro", "Denver metro"], ["colorado-springs", "Colorado Springs area"],
      ["northern", "Northern Colorado"], ["boulder", "Boulder county"], ["mountains", "Mountain communities"],
      ["western", "Western Slope"], ["other-co", "Elsewhere in Colorado"], ["out-of-state", "I'm out of state (Colorado estate)"],
    ],
  },
];

type Result = { headline: string; readiness: string; findings: string[]; cautions: string[] };

export default function SnapshotWidget({ pagePath, keyword }: { pagePath?: string; keyword?: string }) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [contact, setContact] = useState({ firstName: "", lastName: "", email: "", phone: "", consent: false, website: "" });
  const [state, setState] = useState<"answering" | "contact" | "submitting" | "done" | "soft-error">("answering");
  const [result, setResult] = useState<Result | null>(null);
  const [validationMsg, setValidationMsg] = useState("");

  const total = STEPS.length;
  const progress = state === "answering" ? (step / (total + 1)) * 100 : state === "contact" ? 92 : 100;

  const utm = useMemo(() => {
    if (typeof window === "undefined") return {};
    const p = new URLSearchParams(window.location.search);
    const out: Record<string, string> = {};
    ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"].forEach((k) => {
      const v = p.get(k);
      if (v) out[k] = v;
    });
    return out;
  }, []);

  function pick(key: string, value: string) {
    setAnswers({ ...answers, [key]: value });
    if (step + 1 < total) setStep(step + 1);
    else setState("contact");
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setValidationMsg("");
    if (!contact.firstName.trim() || !contact.lastName.trim()) return setValidationMsg("Please enter your first and last name.");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact.email)) return setValidationMsg("Please enter a valid email address.");
    if (!contact.consent) return setValidationMsg("Please confirm the consent checkbox to continue.");
    setState("submitting");
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          answers,
          contact: { firstName: contact.firstName, lastName: contact.lastName, email: contact.email, phone: contact.phone },
          website: contact.website,
          pagePath: pagePath || (typeof window !== "undefined" ? window.location.pathname : "/estate-snapshot"),
          keyword,
          utm,
        }),
      });
      const data = await res.json();
      if (data?.result) {
        setResult(data.result);
        setState("done");
      } else setState("soft-error");
    } catch {
      setState("soft-error");
    }
  }

  return (
    <div className="mx-auto max-w-2xl rounded-sm border border-navy/10 bg-white shadow-[0_20px_60px_rgba(2,27,44,0.08)]">
      <div className="h-1.5 w-full bg-navy/10">
        <div className="step-bar h-full bg-gold" style={{ width: `${progress}%` }} aria-hidden />
      </div>
      <div className="p-6 md:p-10">
        {state === "answering" && (
          <div key={step}>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slateblue">
              Question {step + 1} of {total}
            </p>
            <h2 className="mt-2 font-display text-xl text-navy md:text-2xl">{STEPS[step].label}</h2>
            {STEPS[step].help && <p className="mt-2 text-sm text-navy-ink/60">{STEPS[step].help}</p>}
            <div className="mt-6 grid gap-2.5">
              {STEPS[step].options.map(([v, label]) => (
                <button key={v} onClick={() => pick(STEPS[step].key, v)}
                  className="group flex items-center justify-between rounded-sm border border-navy/15 bg-paper px-5 py-3.5 text-left text-[0.95rem] font-medium text-navy transition-all hover:-translate-y-px hover:border-gold hover:bg-white hover:shadow-md">
                  {label}
                  <span className="text-gold opacity-0 transition-opacity group-hover:opacity-100" aria-hidden>→</span>
                </button>
              ))}
            </div>
            {step > 0 && (
              <button onClick={() => setStep(step - 1)} className="mt-5 text-sm text-slateblue underline underline-offset-4">← Back</button>
            )}
          </div>
        )}

        {state === "contact" && (
          <form onSubmit={submit} noValidate>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slateblue">Last step</p>
            <h2 className="mt-2 font-display text-xl text-navy md:text-2xl">Where should we send your Estate Snapshot?</h2>
            <p className="mt-2 text-sm text-navy-ink/60">Your answers are reviewed by our Colorado team. Your snapshot appears immediately.</p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <label className="block text-sm font-medium text-navy">First name*
                <input value={contact.firstName} onChange={(e) => setContact({ ...contact, firstName: e.target.value })} required autoComplete="given-name"
                  className="mt-1.5 w-full rounded-sm border border-navy/20 bg-paper px-4 py-3 text-navy-ink outline-none transition-colors focus:border-gold" />
              </label>
              <label className="block text-sm font-medium text-navy">Last name*
                <input value={contact.lastName} onChange={(e) => setContact({ ...contact, lastName: e.target.value })} required autoComplete="family-name"
                  className="mt-1.5 w-full rounded-sm border border-navy/20 bg-paper px-4 py-3 text-navy-ink outline-none transition-colors focus:border-gold" />
              </label>
              <label className="block text-sm font-medium text-navy sm:col-span-2">Email*
                <input type="email" value={contact.email} onChange={(e) => setContact({ ...contact, email: e.target.value })} required autoComplete="email"
                  className="mt-1.5 w-full rounded-sm border border-navy/20 bg-paper px-4 py-3 text-navy-ink outline-none transition-colors focus:border-gold" />
              </label>
              <label className="block text-sm font-medium text-navy sm:col-span-2">Phone <span className="font-normal text-navy-ink/50">(optional — for a faster callback)</span>
                <input type="tel" value={contact.phone} onChange={(e) => setContact({ ...contact, phone: e.target.value })} autoComplete="tel"
                  className="mt-1.5 w-full rounded-sm border border-navy/20 bg-paper px-4 py-3 text-navy-ink outline-none transition-colors focus:border-gold" />
              </label>
              <input tabIndex={-1} autoComplete="off" value={contact.website} onChange={(e) => setContact({ ...contact, website: e.target.value })} name="website" className="hidden" aria-hidden="true" />
            </div>
            <label className="mt-5 flex items-start gap-3 text-xs leading-relaxed text-navy-ink/70">
              <input type="checkbox" checked={contact.consent} onChange={(e) => setContact({ ...contact, consent: e.target.checked })} className="mt-0.5 h-4 w-4 accent-[#C6A15B]" />
              <span>
                I agree that Whiteford may contact me about my inquiry by email or phone. I understand this Snapshot
                provides general educational information only — it is <strong>not legal or tax advice and does not
                create an attorney–client relationship</strong>.
              </span>
            </label>
            {validationMsg && <p className="mt-3 text-sm font-medium text-red-700" role="alert">{validationMsg}</p>}
            <button type="submit" className="cta-gold mt-6 w-full rounded-sm bg-gold px-6 py-4 font-semibold text-navy-ink transition-transform hover:-translate-y-0.5">
              Show my Estate Snapshot
            </button>
          </form>
        )}

        {state === "submitting" && (
          <div className="py-12 text-center">
            <div className="mx-auto h-10 w-10 animate-spin rounded-full border-2 border-navy/20 border-t-gold" aria-hidden />
            <p className="mt-4 text-sm text-navy-ink/60">Preparing your snapshot…</p>
          </div>
        )}

        {state === "done" && result && (
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slateblue">Your Estate Snapshot</p>
            <p className="mt-3 font-display text-2xl leading-snug text-navy md:text-3xl">{result.headline}</p>
            <div className="mt-6 space-y-4">
              <div>
                <p className="text-sm font-semibold text-navy">What we noticed</p>
                <ul className="mt-2 space-y-1.5">
                  {result.findings.map((d, i) => (
                    <li key={i} className="relative pl-5 text-sm leading-relaxed text-navy-ink/75">
                      <span className="absolute left-0 top-[0.5em] h-[5px] w-[5px] rotate-45 bg-gold" aria-hidden />{d}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="text-sm font-semibold text-navy">Important cautions</p>
                <ul className="mt-2 space-y-1.5">
                  {result.cautions.map((c, i) => (
                    <li key={i} className="relative pl-5 text-sm leading-relaxed text-navy-ink/75">
                      <span className="absolute left-0 top-[0.5em] h-[5px] w-[5px] rotate-45 bg-slateblue" aria-hidden />{c}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="mt-8 rounded-sm bg-navy p-6 text-white">
              <p className="font-display text-lg">Want the real answer for your family?</p>
              <p className="mt-1 text-sm text-white/70">
                Book your free {SITE.offers.session.name}: 30 minutes with our Colorado team. You leave with your
                document and deadline check, an exposure map, and a straight answer on what you actually need.
              </p>
              <div className="mt-4 flex flex-wrap gap-3">
                <a href={SITE.calBookingUrl} target="_blank" rel="noopener" className="cta-gold inline-flex rounded-sm bg-gold px-6 py-3 font-semibold text-navy-ink">
                  {SITE.offers.session.cta}
                </a>
                <a href={SITE.phoneHref} className="inline-flex rounded-sm border border-white/30 px-6 py-3 font-semibold text-white hover:border-gold-soft hover:text-gold-soft">
                  Or call {SITE.phone} — 24/7
                </a>
              </div>
            </div>
            <p className="mt-5 text-[0.7rem] leading-relaxed text-navy-ink/45">
              This tool provides general educational information based on simplified assumptions. It is not legal or tax
              advice, not a document review, and not an offer of representation. No attorney–client relationship is
              created by using it. Outcomes depend on documents, titling, family circumstances, and applicable law.
            </p>
          </div>
        )}

        {state === "soft-error" && (
          <div className="py-8 text-center">
            <h2 className="font-display text-xl text-navy">Thanks — your answers were received.</h2>
            <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-navy-ink/70">
              We hit a hiccup showing your snapshot, but our team has your information and will follow up by email.
              For an immediate conversation, call us — the consultation is free.
            </p>
            <a href={SITE.phoneHref} className="cta-gold mt-5 inline-flex rounded-sm bg-gold px-6 py-3 font-semibold text-navy-ink">
              Call {SITE.phone}
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
