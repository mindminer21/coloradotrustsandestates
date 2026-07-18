# Content generation — Whiteford Trusts & Estates Colorado (per-page JSON)

You are writing landing-page content for Whiteford's Colorado Trusts & Estates practice (real firm — accuracy matters). For EACH brief in your assigned chunk, write one JSON file to `/home/claude/whiteford-te/content/pages/<slug>.json`.

## Study first (required)
1. Read `/home/claude/whiteford-te/content/briefs/all-briefs.json` entry for your slugs — the `angle` is your content thesis; no two pages may feel alike.
2. Read `/home/claude/whiteford-te/content/briefs/all-slugs.json` to choose 5–6 `related` slugs (must exist; topically adjacent; always include one `value`-cluster slug).
3. Schema example: read `/home/claude/whiteford-pi/content/pages/denver-car-accident-lawyer.json` for structure/quality ONLY (that's a different practice — do NOT copy its subject matter).

## Schema (identical to example): slug, keyword, cluster (from brief), title (≤60 chars, keyword natural, end "| Whiteford"), metaDescription (150–160 chars, include (720) 853-1579 when it fits), h1, heroSub (1–2 sentences, warm + concrete), heroEyebrow, geoLabel (city/region, omit for statewide/value/law/tax), intro (3 paragraphs, first = concrete human hook), sections (EXACTLY 3: heading, paragraphs[2], optional bullets[3–5] on ONE section), localFacts (3–4 concrete CO/city specifics — real courts, real geography, real institution names; omit for value/law/tax), faqs (EXACTLY 5, answers 60–110 words), related (5–6 slugs).

## Voice
Warm, dignified, plain-English — families planning legacies or worried about a parent's estate. Zero fear-mongering, zero hype. Empathetic on dispute pages (family pain), practical on planning pages.

## HARD COMPLIANCE RULES (violations = rejected page)
1. NO specific legal/tax figures: no statute numbers, no dollar thresholds (no "$15M", no small-estate amounts), no deadline durations, no percentages. The site injects one vetted law block per page. Refer generally: "the 2026 federal exemption changes", "Colorado's small-estate threshold (indexed annually)", "contest windows can be short". Even tax/law pages: direction and concepts only, zero figures.
2. NO outcome promises, "best/top", "guaranteed", "specialists/experts in" (as legal-credential claims).
3. NO invented client stories, results, or statistics. Composite "families often…" framing is fine.
4. NO specific tax advice ("you should gift X") — educational concepts + "the attorney will tailor this".
5. Attorneys referenced only as "our Colorado team" / "Whiteford's national trusts and estates platform". True credential facts allowed: Chambers-ranked practice, ACTEC fellows in the section.
6. Phone: (720) 853-1579. Lead magnet: the free "Colorado Estate Snapshot" at /estate-snapshot (weave one natural mention). Consultation: the free "Legacy Game Plan Session".
7. Dispute pages: never accuse specific roles of wrongdoing categorically — "when a trustee fails to…" framing; encourage early, calm, formal steps.
8. Valid JSON, straight apostrophes, no markdown in strings.

## Word budget: 600–1,000 per page.

## Return ONLY: `written: <slug> (<wordcount>)` per file, or `FAILED: <slug> — reason`.
