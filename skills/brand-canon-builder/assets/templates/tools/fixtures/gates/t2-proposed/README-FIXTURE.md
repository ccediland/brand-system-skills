# t2-proposed — the EXTEND/RECOMMEND quarantine acceptance (proposals never canonize without ratification)

Minimal twin repos for the EXTEND/RECOMMEND (T2) engagement — an ANALYZE wire whose owner invited
extension proposals (Fixture Delta; zero real brand content). The wire carries two `PROPOSED` quarantine
lines + a WHAT slot at `source:proposed`, each riding a client-language GAPS row; the extension dimensions
(`seasonal-accent`, `motion`) stay `tagged-gap` — a proposal never re-rows its dimension — and the signed
brief names both drafts as pending the owner's ratification.

`clean/` — the quarantine channel carried CORRECTLY never blocks:
- `node ../../../wire-check.mjs .` → **PASS** (markers:14 · verified:12 · demoted:2): `PROPOSED` lines and
  the `source:proposed` WHAT slot are exempt from tag scope — a proposal's lineage is its `proposed`
  label, never a lineage tag.
- `node ../../../audit-lint.mjs .` → **exit 0 (CLEAN)**: the materialized draft token
  (`color.accent-seasonal`) rides `source:"proposed"` · `confidence:"hypothesis"` · `gap:"GAP-001"`
  (OPEN in RESIDENT) — the draft-from-recommendation shape, R2/R3/R5 all green.
- run-gates board: `audit-lint` PASS · `wire verbatim-check` PASS · `kit opt-out reconciliation` PASS.
  The remaining FAIL rows (keystone/asset-index/agent-gates absent; §7a never-ran on an ANALYZE wire) are
  the generic minimal-fixture structure rows — not this fixture's class. Overall exit stays 1 (BLOCKED).

`violation/` — a proposal tries to CANONIZE without a ratification act: same wire, but the token flips to
`confidence:"owner-confirmed"` and drops its gap back-reference. `node ../../../audit-lint.mjs .` →
**exit 1 (FAIL)** on three facets of the one crime: **R2** (proposed capped at hypothesis — rose without
an act) · **R3** (no hashed ratification record backs the claimed confidence) · **R5** (the quarantine
gap was dropped instead of closed by the owner). Enthusiasm, silence, or shipping the draft promote
nothing — only the recorded ratification loop does.

`ratified-clean/` — the RATIFY happy path (the legit exit the loop's prose prescribes). The owner ratified
the terracotta draft in a witnessed record (`sources/ratification—2026-04-01.md`, hashed); the token moves
to `source:"ratified-proposal"` (the proposed lineage PRESERVED in the name — never re-labeled to
`owner-stated`, which would erase the origin) · `confidence:"owner-confirmed"` · a mandatory `sourceRef` to
that record · GAP-001 `CLOSED (ratified)`. `node ../../../audit-lint.mjs .` → **exit 0 (CLEAN)**: R3's
content-bind reads the record, finds the ratified value in its text, and passes. (Pre-fix this exact shape
gave exit 1 — the loop's prose was un-lintable.)

`ratified-mismatch/` — the content-unbound seal: a FABRICATED value (a saturated blue) ships at
`confidence:"owner-confirmed"` citing the SAME genuine, correctly-hashed ratification record — which
ratifies only the terracotta. `node ../../../audit-lint.mjs .` → **exit 1 (FAIL)** on **R3's content-bind
alone**: the record's text does NOT name the token's value, so the record does not ratify it (the
post-handoff analog of the wire's `BRIEF{}` verbatim — a hash→path bind alone let a genuine ratification
of value X ship a token carrying value Y). A ghost record (a `sources/ratification—*` cited but absent,
its hash fabricated into `CHECKSUMS.txt`) fails the same rule — a CHECKSUMS line is custody, not the file.
