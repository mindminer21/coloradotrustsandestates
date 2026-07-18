import Reveal from "./Reveal";

const FLIPS = [
  {
    myth: "“I'm not wealthy enough to need an estate plan.”",
    truth: "If you own a home in Colorado, you likely have more at stake than you think — and without documents, state defaults decide everything: who inherits, who raises your kids, who speaks for you if you're incapacitated.",
  },
  {
    myth: "“A will means my family avoids probate.”",
    truth: "It's the opposite — a will is instructions *for* probate. Avoiding court generally takes different tools: trusts, beneficiary designations, and correctly titled assets.",
  },
  {
    myth: "“The trustee is family — questioning them would tear us apart.”",
    truth: "Silence is what tears families apart, slowly. Fiduciaries owe legal duties precisely so beneficiaries can ask for accountings without it being personal. Asking early is protective, not hostile.",
  },
  {
    myth: "“We did our documents years ago — we're covered.”",
    truth: "Plans age. Federal law changed dramatically in 2025, families change faster, and unfunded trusts — assets never retitled — are the most common way good plans quietly fail.",
  },
];

export default function BeliefFlips() {
  return (
    <section className="border-y border-navy/10 bg-white py-14 md:py-16">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <Reveal>
          <p className="text-[0.78rem] font-semibold uppercase tracking-[0.18em] text-slateblue">Straight answers</p>
          <h2 className="mt-2 max-w-2xl font-display text-2xl text-navy md:text-3xl">
            What people get wrong about estates
          </h2>
        </Reveal>
        <div className="mt-9 grid gap-5 md:grid-cols-2">
          {FLIPS.map((f, i) => (
            <Reveal key={i} delay={i % 2}>
              <div className="lift-card h-full rounded-sm border border-navy/10 bg-paper p-6">
                <p className="font-display text-[1.05rem] italic text-slateblue">{f.myth}</p>
                <div className="my-3 h-[2px] w-10 bg-gold" aria-hidden />
                <p className="text-[0.95rem] leading-relaxed text-navy-ink/80">{f.truth}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
