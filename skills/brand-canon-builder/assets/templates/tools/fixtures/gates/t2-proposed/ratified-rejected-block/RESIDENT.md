# Fixture Delta — RESIDENT (ratified-rejected-block: the reject-block attack, section-scope)

Synthetic minimal repo. Zero real brand content. The exact inversion of the v5 run-2 failure: the owner
says "that darker one, NO — the terracotta". The record names the REJECTED value in an "## Alternatives
considered — NOT chosen" block and ratifies the terracotta under "## What was ratified".

- `color.accent-seasonal` (terracotta, named in the ratified section) → **PASS**.
- `color.accent-dark-rejected` (the rejected value, named ONLY in the alternatives block) → **FAIL** — the
  content-bind is SECTION-SCOPED to "## What was ratified"; a value the owner rejected lives outside it and
  cannot ratify. A whole-record value search would have sealed the rejected colour owner-confirmed.

Overall `audit-lint` → **exit 1** (the rejected token fails; the ratified one passes).

## Open Items / Gaps

| ID | Item | Why it matters | Severity | Provenance | Proposed resolution | Resolution target | Status |
|---|---|---|---|---|---|---|---|
| GAP-001 | seasonal accent (draft pending ratification) | invited extension | SHOULD | handoff-deliberate | owner ratified terracotta and REJECTED the dark option | tokens/base.tokens.json › color.accent-seasonal | CLOSED (ratified) |
