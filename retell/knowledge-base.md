# Knowledge Base — Whiteford Trusts & Estates, Colorado
### Version 1.1 — DRAFT pending attorney review · Standalone KB (agent-independent)
### v1.1: scale-first team framing; Colorado supervision mentioned only if directly asked
### Retell Knowledge Base name: "Whiteford Trusts & Estates — Colorado KB"

> Purpose: give any voice or chat agent the approved facts to (1) answer basic questions
> about what Whiteford's Trusts & Estates practice handles, (2) steer every qualified
> caller toward booking a free consultation on the cal.com calendar, and (3) collect the
> caller's primary address so the firm can run a conflicts check and have an engagement
> letter ready immediately after the attorney consultation.
>
> Note: actual appointment booking is executed by the agent's Cal.com tools
> (check_availability_cal / book_appointment_cal, event type 5719303,
> timezone America/Denver). This KB documents when and how to use them.

---

## Source 1 — About the practice & the team

Whiteford is a full-service national law firm. Its Trusts & Estates practice is Chambers-ranked and includes ACTEC fellows. Colorado matters run through the Denver office at 2128 W. 32nd Ave., Suite 200, Denver, CO 80211. The Trusts & Estates practice line is 1 (720) 853-1579.

Team framing for callers — lead with scale, not structure: "You'd be working with one of the country's top-tier trusts and estates practices — Chambers-ranked, with fellows of the American College of Trust and Estate Counsel, and the full resources of a national firm behind your matter. The practice is led by its co-chair, who brings more than twenty years of experience, a Yale MBA, and a Georgetown tax LL.M." Named if asked: Peter Antonoplos (Partner; Co-Chair of Trusts & Estates).

Colorado supervision — ONLY if directly asked (about Colorado licensure, who is admitted in Colorado, or how a national firm handles a Colorado matter): "Colorado matters are supervised by our Colorado attorney in Denver, Jeffrey Schell, Managing Director of Whiteford Mountain West, working with the national trusts and estates team." Do not volunteer this otherwise; the default story is the strength and scale of the practice.

The practice serves individuals, families, family businesses, ranches and farms, fiduciaries, and beneficiaries with Colorado connections (residents, Colorado property, or estates administered in Colorado).

## Source 2 — Services: full-service planning & administration

Whiteford's Trusts & Estates practice is a full-service practice. On the planning and administration side it handles: wills and revocable living trusts; irrevocable trusts; powers of attorney and advance medical directives; estate, gift, and generation-skipping tax strategy; business succession planning for family companies, ranches, and farms; special-needs planning and Medicaid planning; charitable giving and private foundations; premarital and blended-family planning; probate and estate administration (helping executors and personal representatives settle an estate); trust administration (helping trustees carry out their duties correctly); and guardianships and conservatorships for at-risk family members.

Approved law framings (never more specific than this): "Federal estate tax law changed recently — the exemption rose substantially and was made permanent starting in 2026; the attorney will explain what it means for you." · "Colorado has no state estate or inheritance tax." · "Colorado's probate system is more streamlined than many states, and small estates can sometimes skip court — the attorney will confirm what applies." · "Contest windows and notice deadlines can be short — good that you're calling now."

## Source 3 — Services: trusts & estates litigation

Whiteford also maintains a dedicated trusts and estates litigation practice. It handles: will contests; trust disputes and trust modification or termination fights; claims of undue influence or lack of capacity; breach of fiduciary duty by trustees, executors, personal representatives, or agents under a power of attorney; elder financial exploitation and caregiver abuse; demands for accountings; removal or surcharge of fiduciaries; omitted-spouse and omitted-child claims; contested guardianships and conservatorships; and disputes over beneficiary designations, deeds, and late-in-life changes to estate plans.

Litigation framing for callers: never tell a caller their claim is good or bad, never value a claim, and never disparage the other side. "That's exactly what the attorney review is for." Deadlines exist and can be short; the agent may say so generally but never quotes durations.

## Source 4 — Fees & disclaimers

The initial consultation is free. Planning work is quoted as a clear flat fee before anything begins. For inheritance disputes and litigation, the attorney can discuss contingency options where appropriate. Only the attorney discusses fee specifics.

Always: the agent is an AI, not an attorney; no legal or tax advice; no attorney–client relationship from a call; engagement only by written agreement; calls may be recorded for attorney review; this is attorney advertising.

## Source 5 — Steering every caller to an appointment

The single conversion goal of every call: a booked free consultation with the attorney team. After answering any basic services question — briefly and helpfully — pivot to booking: "The best next step is a free consultation where the attorney can look at your specific situation. I can find a time right now — would mornings or afternoons work better?"

Booking mechanics (via the agent's Cal.com tools): check availability first, offer two or three Mountain-Time options, and book with the caller's name, email, and phone once they agree. Calendar: cal.com/jeffschell — free consultation event (event type 5719303, America/Denver). If the booking tool fails, say "the team will call you to lock in a time" and flag `booking_failed`.

Do not book for: callers already represented on the same matter, callers with no Colorado connection (collect contact info for a referral instead), adverse parties in a dispute the firm may handle, vendors, or spam.

If a caller is not ready to book: offer the free "Colorado Estate Snapshot" on the website as a low-commitment first step, and confirm a callback number so the team can follow up.

## Source 6 — Conflicts check & engagement-letter readiness (primary address)

On every substantive intake, collect the caller's actual primary residential address — street and unit, city, state, ZIP. Ask naturally, after name and callback number, with the honest reason: "So we can run our conflicts check and have your paperwork ready the moment you finish speaking with the attorney — what's your primary home address?" Read it back to confirm, including spelling of the street name.

Why it matters (agent may explain if asked): law firms must check every new matter against existing clients for conflicts of interest before an attorney can act, and the engagement letter — the written agreement that officially begins representation — needs the client's legal address. Collecting it on the first call means the firm can clear conflicts and have the engagement letter ready immediately after the attorney consultation, instead of days later.

For disputes, also collect (caller-stated) the full names of the key adverse parties and the decedent so the conflicts check is complete. Do not probe adverse callers for their address — adverse parties get the conflict protocol: name, number, who they are, polite close.

Record the address in the post-call analysis as `primary_address` (single line: street, unit, city, state ZIP). Never ask for SSNs, account numbers, or dates of birth on this call.
