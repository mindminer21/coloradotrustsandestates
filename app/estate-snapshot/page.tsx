import type { Metadata } from "next";
import SnapshotWidget from "@/components/SnapshotWidget";
import AttorneyCards from "@/components/AttorneyCards";
import Reveal from "@/components/Reveal";
import MagnetPillarLinks from "@/components/MagnetPillarLinks";

export const metadata: Metadata = {
  title: "Free Colorado Estate Snapshot | Whiteford Trusts & Estates",
  description:
    "The Colorado Estate Snapshot: 8 quick questions and an honest read on where your estate plan — or inheritance concern — stands under current law. Free and confidential.",
  alternates: { canonical: "/estate-snapshot" },
};

export default function SnapshotPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-navy-deep pb-16 pt-14 text-white md:pt-20">
        <div className="sky-glow pointer-events-none absolute inset-0 bg-[radial-gradient(90%_70%_at_70%_-10%,rgba(143,184,212,0.25),transparent_60%)]" aria-hidden />
        <div className="relative mx-auto max-w-3xl px-4 text-center md:px-6">
          <p className="text-[0.78rem] font-semibold uppercase tracking-[0.18em] text-gold-soft">Free · Confidential · ~2 minutes</p>
          <h1 className="mt-3 font-display text-3xl leading-tight md:text-5xl">The Colorado Estate Snapshot</h1>
          <p className="mx-auto mt-5 max-w-xl text-white/75">
            Where does your estate plan — or your inheritance concern — actually stand? Eight quick questions
            and an honest, educational read under current Colorado and federal law.
          </p>
        </div>
      </section>
      <div className="relative z-10 mx-auto -mt-8 max-w-6xl px-4 pb-16 md:px-6">
        <SnapshotWidget />
        <Reveal>
          <p className="mx-auto mt-8 max-w-2xl text-center text-xs leading-relaxed text-navy-ink/50">
            This Snapshot provides general educational information based on simplified assumptions. It is not legal
            or tax advice, not a document review, and not an offer of representation. No attorney–client relationship
            is created.
          </p>
        </Reveal>
      </div>
      <MagnetPillarLinks paths={["/estate-planning/", "/for/parents/", "/denver/estate-planning-lawyer/"]} />
      <AttorneyCards />
    </>
  );
}
