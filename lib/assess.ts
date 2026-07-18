/** Educational T&E triage. NOT legal or tax advice. */
export type AssessInput = {
  needType: string; situation: string; estateSize: string; documents: string;
  family: string; urgency: string; concern: string; county: string;
};
export type Assessment = {
  headline: string; readiness: "urgent" | "gaps" | "solid-start" | "dispute-priority";
  findings: string[]; cautions: string[];
};
export function assess(i: AssessInput): Assessment {
  const findings: string[] = []; const cautions: string[] = [];
  const dispute = i.needType === "dispute";
  let readiness: Assessment["readiness"] = "solid-start";
  if (dispute) {
    readiness = "dispute-priority";
    findings.push("Inheritance and fiduciary disputes are deadline-driven — contest windows and notice periods in Colorado can be short, and they run whether or not you act.");
    if (["trustee-control", "poa-abuse", "asset-missing"].includes(i.concern)) findings.push("When someone else controls the assets, documentation and early formal demands often determine what remains recoverable.");
    if (i.urgency === "deadline-known") cautions.push("You indicated a known court date or deadline — treat this as time-critical and speak with an attorney promptly.");
    cautions.push("Estate values discussed at intake are unverified until documents are reviewed; recoverable amounts depend on solvency, title, and the conduct involved.");
  } else {
    if (i.documents === "none") { readiness = "urgent"; findings.push("Without a will or trust, Colorado's intestate-succession rules — not your wishes — decide who inherits, and the court process is typically longer and more public."); }
    else if (i.documents === "outdated") { readiness = "gaps"; findings.push("Documents older than a few years, or written before major life or law changes, frequently no longer do what their owners assume — especially after the 2026 federal exemption changes."); }
    else findings.push("Existing documents are a strong start — the common gaps are funding (assets never retitled into trusts), outdated beneficiary designations, and missing incapacity documents.");
    if (["blended", "business", "special-needs"].includes(i.family)) findings.push("Blended families, business ownership, and special-needs beneficiaries are the three situations where generic documents most often fail — each has planning tools built specifically for it.");
    if (i.estateSize === "over-15m") cautions.push("At this estate size, federal estate-tax planning is in play even under the raised 2026 exemption — timing of strategies matters.");
    cautions.push("This snapshot is educational and based on simplified assumptions — it is not legal or tax advice, and no attorney-client relationship is created.");
  }
  const headline = dispute ? "Your situation reads as a priority dispute matter." :
    readiness === "urgent" ? "Your estate currently runs on default rules — not your wishes." :
    readiness === "gaps" ? "You have a foundation — with gaps worth closing." :
    "You're ahead of most Coloradans — let's pressure-test it.";
  return { headline, readiness, findings, cautions };
}
