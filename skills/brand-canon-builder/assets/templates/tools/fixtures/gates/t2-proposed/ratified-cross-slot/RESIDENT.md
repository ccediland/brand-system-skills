# Fixture Delta — RESIDENT (ratified-cross-slot: the path-bind attack)

Synthetic minimal repo. Zero real brand content. A GENUINE, correctly-hashed ratification record ratifies
`color.accent-seasonal` = terracotta. A DIFFERENT slot — `color.brand-primary` — is given that same
terracotta value and cites the same record, so a value-only content-bind would seal it at owner-confirmed.
The R3 content-bind is PATH-BOUND: the "## What was ratified" section names `color.accent-seasonal`, never
`color.brand-primary`, so the record does not ratify this token → FAIL. One ratification act does not
silently ratify every other slot that happens to carry its value.

## Open Items / Gaps

| ID | Item | Why it matters | Severity | Provenance | Proposed resolution | Resolution target | Status |
|---|---|---|---|---|---|---|---|
| GAP-001 | seasonal accent (draft pending ratification) | invited extension | SHOULD | handoff-deliberate | record ratified accent-seasonal; brand-primary reuses the value without its own act | tokens/base.tokens.json › color.brand-primary | CLOSED (ratified) |
