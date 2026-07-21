import type { Metadata } from "next";
import AttorneyCards from "@/components/AttorneyCards";
import CtaBand from "@/components/CtaBand";
import Reveal from "@/components/Reveal";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Our Attorneys | Whiteford Trusts & Estates — Colorado",
  description:
    "Meet the team: Colorado-based Managing Partner Jeffrey Schell with Peter Antonoplos, Co-Chair of Whiteford's Chambers-ranked Trusts & Estates practice.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <section className="bg-navy-deep py-16 text-white md:py-20">
        <div className="mx-auto max-w-6xl px-4 md:px-6">
          <p className="text-[0.78rem] font-semibold uppercase tracking-[0.18em] text-gold-soft">About us</p>
          <h1 className="mt-2 max-w-3xl font-display text-3xl leading-tight md:text-5xl">
            National trusts &amp; estates depth. A Colorado front door.
          </h1>
          <p className="mt-5 max-w-2xl text-white/75">
            Whiteford&apos;s Trusts and Estates practice is Chambers-ranked, with ACTEC fellows and decades of
            multigenerational client relationships. In Colorado, that depth comes with a local address: a
            Denver-based attorney who supervises every Colorado matter and stays personally accessible.
          </p>
        </div>
      </section>
      <AttorneyCards full />
      <section className="mx-auto max-w-3xl px-4 py-14 md:px-6">
        <Reveal>
          <div className="prose-wm">
            <h2>How Colorado engagements work</h2>
            <p>
              Every Colorado matter runs through our Denver office: Jeff Schell serves as your Colorado attorney and
              point of contact, supervising each engagement as local counsel, while Peter Antonoplos and Whiteford&apos;s
              national trusts and estates team provide the deep planning, tax, and fiduciary-litigation expertise your
              matter requires. You get a firm that answers locally — with a bench most Colorado boutiques can&apos;t match.
            </p>
            <p>
              Call <a href={SITE.phoneHref} className="font-semibold">{SITE.phone}</a> to schedule your free
              consultation — our intake team answers around the clock and can book you directly. If your matter
              isn&apos;t one we can help with, we&apos;ll tell you straight and point you in the right direction.
            </p>
          </div>
        </Reveal>
      </section>
      <CtaBand />
    </>
  );
}
