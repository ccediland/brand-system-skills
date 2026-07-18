# Fixture Delta — RESIDENT (ratified-mismatch: the content-unbound seal attack)

Synthetic minimal repo reproducing the A-F3-01 attack. Zero real brand content. A FABRICATED value
(a saturated blue) ships at `confidence: owner-confirmed` citing a GENUINE, correctly-hashed ratification
record (`sources/ratification—2026-04-01.md`) whose text ratifies only the terracotta — the record does
NOT name the blue. Pre-fix, every provenance gate passed (hash→path bind only). Post-fix, R3's
content-bind FAILs it: a record ratifying value X does not ratify a token carrying value Y.

## Open Items / Gaps

| ID | Item | Why it matters | Severity | Provenance | Proposed resolution | Resolution target | Status |
|---|---|---|---|---|---|---|---|
| GAP-001 | seasonal accent (draft pending ratification) | invited extension | SHOULD | handoff-deliberate | owner ratified terracotta — the token value drifted to blue | tokens/base.tokens.json › color.accent-seasonal | CLOSED (ratified) |
