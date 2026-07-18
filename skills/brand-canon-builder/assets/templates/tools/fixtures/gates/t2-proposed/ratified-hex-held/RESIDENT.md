# Fixture Delta — RESIDENT (ratified-hex-held: the hex short-circuit attack)

Synthetic minimal repo. Zero real brand content. The pre-merge verify's BLOCKER: a token pins its `hex`
fallback to the terracotta the record ratifies (`#c17a5e`) while its OKLCH `components` — the C-1 PRIMARY,
rendered value — are FABRICATED (`oklch(0.40 0.25 300)`, a vivid purple the record never names). A lenient
value matcher would short-circuit on the hex hit and seal the fabricated primary at owner-confirmed. The R3
content-bind uses a STRICT matcher (`ratificationNamesValue`) that requires the OKLCH components, never a
hex-only hit, so it FAILs.

## Open Items / Gaps

| ID | Item | Why it matters | Severity | Provenance | Proposed resolution | Resolution target | Status |
|---|---|---|---|---|---|---|---|
| GAP-001 | seasonal accent (draft pending ratification) | invited extension | SHOULD | handoff-deliberate | record ratified terracotta; the token's OKLCH drifted to purple with hex held | tokens/base.tokens.json › color.accent-seasonal | CLOSED (ratified) |
