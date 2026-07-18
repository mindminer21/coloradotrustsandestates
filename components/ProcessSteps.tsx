import Reveal from "./Reveal";

const STEPS = [
  {
    n: "01",
    t: "Tell us where things stand",
    d: "A free, confidential conversation — or start with the two-minute Estate Snapshot. Planning or dispute, we listen first; no obligation, no pressure.",
  },
  {
    n: "02",
    t: "We map documents and deadlines",
    d: "What exists, what's missing, and every clock that's running — probate windows, contest periods, tax elections. Estates are won and lost on timing.",
  },
  {
    n: "03",
    t: "We design — or investigate",
    d: "For planning: a design built around your family, assets, and tax picture. For disputes: records, accountings, and title work that show what actually happened.",
  },
  {
    n: "04",
    t: "Execute with national depth",
    d: "Documents signed, trusts funded, plans that actually work — or a dispute pressed by a Chambers-ranked trusts and estates platform prepared to litigate when needed.",
  },
];

export default function ProcessSteps() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-14 md:px-6 md:py-20">
      <Reveal>
        <p className="text-[0.78rem] font-semibold uppercase tracking-[0.18em] text-slateblue">How it works</p>
        <h2 className="mt-2 font-display text-2xl text-navy md:text-3xl">A clear process, from first contact to resolution</h2>
      </Reveal>
      <div className="relative mt-10 grid gap-6 md:grid-cols-4">
        <div className="absolute -top-[2px] left-0 hidden w-full md:block" aria-hidden>
          <Reveal>
            <div className="process-line h-[2px] w-full bg-gradient-to-r from-gold via-gold/60 to-gold/20" />
          </Reveal>
        </div>
        {STEPS.map((s, i) => (
          <Reveal key={s.n} delay={i}>
            <div className="lift-card h-full border-t-2 border-gold pt-5 md:border-t-0">
              <p className="font-display text-sm text-gold">{s.n}</p>
              <h3 className="mt-2 font-display text-lg text-navy">{s.t}</h3>
              <p className="mt-2 text-sm leading-relaxed text-navy-ink/70">{s.d}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
