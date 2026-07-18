export const SITE = {
  name: "Whiteford Trusts & Estates — Colorado",
  legal: "Whiteford — Trusts & Estates, Colorado",
  phone: "(720) 853-1579",
  phoneHref: "tel:+17208531579",
  address: { street: "2128 W. 32nd Ave., Suite 200", city: "Denver", state: "CO", zip: "80211" },
  baseUrl: process.env.NEXT_PUBLIC_BASE_URL || "https://coloradotrustsandestates.com",
  calBookingUrl: "https://cal.com/jeffschell/meeting-with-jeff-schell",
  offers: {
    snapshot: {
      name: "Colorado Estate Snapshot",
      cta: "Get your free Estate Snapshot",
      sub: "A free 2-minute read on where your estate plan — or your inheritance concern — actually stands under current Colorado and federal law.",
    },
    session: {
      name: "Legacy Game Plan Session",
      cta: "Book your free Legacy Game Plan Session",
      sub: "30 minutes with our Colorado team. You leave with a clear plan — whether or not you engage us.",
      deliverables: [
        { t: "Your document & deadline check", d: "What you have, what's missing, and any clock that's already running — probate windows, contest periods, tax elections." },
        { t: "The exposure map", d: "Where your estate (or your inheritance) is actually vulnerable: probate costs, incapacity gaps, tax exposure, or a problem fiduciary." },
        { t: "A straight answer", d: "Whether your situation needs an attorney at all. If a simple will or a phone call solves it, we'll say so — for free." },
        { t: "Your next-three-steps memo", d: "The specific documents to gather or actions to take, in order, whatever you decide about hiring us." },
      ],
    },
    guarantee: "Clear, quoted fees for planning — and contingency options for inheritance disputes where appropriate.",
    guaranteeNote: "Every engagement starts with a written scope and fee agreement. No surprises, no hourly mystery bills for planning work.",
  },
  disclaimerShort:
    "Attorney Advertising. This website provides general information about Colorado and federal law and is not legal advice. Viewing this site or using the Estate Snapshot does not create an attorney–client relationship. Prior results do not guarantee a similar outcome. Outcomes depend on specific facts and applicable law.",
} as const;

export const HL_TAG = "Colorado Trusts Estates Lead";
