# Fixture Delta — RESIDENT (ratified-line-residue: the same-line value-residue attack)

Synthetic minimal repo. Zero real brand content. The ratified line legitimately carries a change-history
parenthetical naming the FIRST-draft value (`oklch(0.55 0.12 30)`) alongside the ratified value
(`oklch(0.68 0.09 45)`), both inside `## What was ratified`. A whole-line value search would let a token
shipping the first-draft value pass under the ratified slot. The R3 content-bind matches only the line's
VALUE SPAN — the first backtick span after the slot span — so the parenthetical off-value never ratifies →
FAIL.

## Open Items / Gaps

| ID | Item | Why it matters | Severity | Provenance | Proposed resolution | Resolution target | Status |
|---|---|---|---|---|---|---|---|
| GAP-001 | seasonal accent (draft pending ratification) | invited extension | SHOULD | handoff-deliberate | ratified terracotta; token ships the superseded first-draft value co-named on the line | tokens/base.tokens.json › color.accent-seasonal | CLOSED (ratified) |
