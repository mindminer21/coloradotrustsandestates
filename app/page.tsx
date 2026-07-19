import type { Metadata } from "next";
import Link from "next/link";
import AnimatedHero from "@/components/AnimatedHero";
import TrustBar from "@/components/TrustBar";
import ProcessSteps from "@/components/ProcessSteps";
import LawContext from "@/components/LawContext";
import AttorneyCards from "@/components/AttorneyCards";
import CtaBand from "@/components/CtaBand";
import Reveal from "@/components/Reveal";
import OfferStack from "@/components/OfferStack";
import BeliefFlips from "@/components/BeliefFlips";

export const metadata: Metadata = {
  title: "Colorado Trusts & Estates Attorneys | Whiteford — Denver",
  description:
    "Estate planning, probate, and inheritance disputes for Colorado families — Denver-based counsel with Whiteford's Chambers-ranked national trusts & estates platform. (720) 853-1579.",
  alternates: { canonical: "/" },
};

const SERVICES = [
  { href: "/denver-estate-planning-attorney", label: "Estate planning", d: "Wills, trusts, and plans that actually work" },
  { href: "/colorado-living-trust-attorney", label: "Living trusts", d: "Keep your family out of court" },
  { href: "/denver-probate-attorney", label: "Probate & administration", d: "Guidance for executors and families" },
  { href: "/colorado-trust-litigation-attorney", label: "Trust & estate disputes", d: "When something isn't right" },
  { href: "/colorado-estate-tax-planning", label: "Estate tax strategy", d: "The 2026 rules changed everything" },
  { href: "/colorado-special-needs-trust-attorney", label: "Special needs planning", d: "Protection without losing benefits" },
  { href: "/colorado-business-succession-planning", label: "Business succession", d: "The company outlives the founder" },
  { href: "/denver-elder-law-attorney", label: "Elder law & incapacity", d: "Powers of attorney, care, dignity" },
  { href: "/colorado-will-contest-attorney", label: "Will contests", d: "Undue influence and capacity challenges" },
];

export default function HomePage() {
  return (
    <>
      <AnimatedHero
        eyebrow="Denver · Whiteford Trusts & Estates"
        h1="The federal estate law changed in 2026. Most Colorado estate plans haven't."
        sub="Whiteford integrates face-to-face Colorado lawyers with a Chambers-ranked national trusts and estates platform — for Colorado families planning ahead, settling an estate, or facing an inheritance that isn't being handled right."
      />
      <TrustBar />

      <section className="mx-auto max-w-6xl px-4 py-14 md:px-6 md:py-20">
        <Reveal>
          <p className="text-[0.78rem] font-semibold uppercase tracking-[0.18em] text-slateblue">How we can help</p>
          <h2 className="mt-2 max-w-2xl font-display text-2xl text-navy md:text-3xl">
            Serious counsel for every stage of a family&apos;s legacy
          </h2>
        </Reveal>
        <div className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((c, i) => (
            <Reveal key={c.href} delay={i % 3}>
              <Link href={c.href} className="group block h-full rounded-sm border border-navy/10 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-gold/50 hover:shadow-[0_16px_40px_rgba(2,27,44,0.10)]">
                <h3 className="font-display text-lg text-navy group-hover:text-slateblue">{c.label}</h3>
                <p className="mt-1.5 text-sm text-navy-ink/60">{c.d}</p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-gold">
                  Learn more
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="transition-transform group-hover:translate-x-1" aria-hidden>
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
        <Reveal>
          <p className="mt-6 text-sm text-navy-ink/60">
            Don&apos;t see your situation? <Link href="/practice-areas" className="font-semibold text-navy underline decoration-gold/60 underline-offset-4">Browse all services</Link> or call — if we can&apos;t help, we&apos;ll say so.
          </p>
        </Reveal>
      </section>

      <LawContext />
      <OfferStack />
      <BeliefFlips />
      <ProcessSteps />
      <AttorneyCards />
      <CtaBand />
    </>
  );
}
