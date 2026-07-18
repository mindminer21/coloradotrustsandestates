import Reveal from "./Reveal";

/**
 * The ONLY place legal/tax specifics are stated on this site.
 * Verified 2026-07: OBBBA (Pub. L. 119-21, 2025) made the federal estate/gift exemption $15M per person
 * from 2026 (indexed); Colorado has no state estate or inheritance tax; Colorado follows the UPC with
 * small-estate collection by affidavit under an indexed threshold; Colorado Uniform Trust Code applies.
 */
export default function LawContext() {
  return (
    <section className="border-y border-navy/10 bg-white py-14 md:py-16">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <Reveal>
          <p className="text-[0.78rem] font-semibold uppercase tracking-[0.18em] text-slateblue">The law, current</p>
          <h2 className="mt-2 font-display text-2xl text-navy md:text-3xl">What Colorado families should know in 2026</h2>
        </Reveal>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          <Reveal delay={0}>
            <div className="lift-card glass-gold-edge h-full rounded-sm border border-navy/10 bg-paper p-6">
              <p className="font-display text-3xl text-navy">$15M</p>
              <p className="mt-2 text-sm font-semibold text-navy">Federal exemption — now permanent</p>
              <p className="mt-2 text-sm leading-relaxed text-navy-ink/70">
                The 2025 federal tax law made the estate and gift tax exemption permanent at $15,000,000 per person
                (indexed) beginning in 2026 — roughly $30M for a married couple with proper planning. Colorado imposes
                no state estate or inheritance tax. Plans written under older, lower exemptions often carry structures
                families no longer need — or miss opportunities they now have.
              </p>
            </div>
          </Reveal>
          <Reveal delay={1}>
            <div className="lift-card glass-gold-edge h-full rounded-sm border border-navy/10 bg-paper p-6">
              <p className="font-display text-3xl text-navy">UPC</p>
              <p className="mt-2 text-sm font-semibold text-navy">Colorado probate: simpler — but not simple</p>
              <p className="mt-2 text-sm leading-relaxed text-navy-ink/70">
                Colorado follows the Uniform Probate Code: many estates qualify for informal probate, and small estates
                under an inflation-indexed threshold can often skip court entirely via affidavit. But without a will,
                Colorado&apos;s intestate-succession statutes — not your wishes — decide who inherits, and blended
                families are where those defaults surprise people most.
              </p>
            </div>
          </Reveal>
          <Reveal delay={2}>
            <div className="lift-card glass-gold-edge h-full rounded-sm border border-navy/10 bg-paper p-6">
              <p className="font-display text-3xl text-navy">Clocks</p>
              <p className="mt-2 text-sm font-semibold text-navy">Dispute deadlines run quietly</p>
              <p className="mt-2 text-sm leading-relaxed text-navy-ink/70">
                Will contests, trust challenges, creditor claims, and fiduciary-misconduct actions in Colorado all carry
                deadlines — some triggered by notices a beneficiary may not even recognize as starting a clock. If
                something about an estate feels wrong, the single most protective step is learning your specific
                deadlines early.
              </p>
            </div>
          </Reveal>
        </div>
        <Reveal delay={1}>
          <p className="mt-6 max-w-3xl text-xs leading-relaxed text-navy-ink/50">
            Sources: Pub. L. 119-21 (2025) (federal exemption); Colo. Rev. Stat. Title 15 (probate, intestacy,
            small-estate collection; Colorado Uniform Trust Code). General information, not legal or tax advice;
            thresholds adjust and exceptions apply.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
