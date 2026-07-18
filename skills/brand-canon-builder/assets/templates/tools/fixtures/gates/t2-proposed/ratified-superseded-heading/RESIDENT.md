# Fixture Delta — RESIDENT (ratified-superseded-heading: the trailing-qualifier heading attack)

Synthetic minimal repo. Zero real brand content. An honest re-ratification record keeps a
`## What was ratified — SUPERSEDED 2026-03-01` block (the earlier value, explicitly "do NOT ship") plus the
current `## What was ratified` naming a different value. A heading test that matched any heading STARTING
with "what was ratified" would open ratified scope on the superseded block and ratify the disavowed value.
The R3 section-scope binds the heading EXACTLY ("what was ratified" only, top-level `##`, exactly one), so
the superseded block is inert; the token shipping its value → FAIL.

## Open Items / Gaps

| ID | Item | Why it matters | Severity | Provenance | Proposed resolution | Resolution target | Status |
|---|---|---|---|---|---|---|---|
| GAP-001 | seasonal accent (draft pending ratification) | invited extension | SHOULD | handoff-deliberate | current ratified value is oklch(0.72 0.10 50); token ships the superseded oklch(0.68 0.09 45) | tokens/base.tokens.json › color.accent-seasonal | CLOSED (ratified) |
