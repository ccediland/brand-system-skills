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

`ratified-hex-held/` — the pre-merge verify's BLOCKER: the token pins its `hex` fallback to the terracotta
the record names (`#c17a5e`) while its OKLCH `components` — the C-1 PRIMARY, rendered value — are FABRICATED
(`oklch(0.40 0.25 300)`). `node ../../../audit-lint.mjs .` → **exit 1 (FAIL)**: the content-bind's STRICT
matcher (`ratificationNamesValue`) requires the OKLCH components (never a hex-only hit) — a lenient
value-presence test would have short-circuited on the hex and sealed the fabricated primary owner-confirmed.
The strict matcher is content-bind-LOCAL (R1 corroboration keeps its lenient hex-OR-oklch `valueInText`); it
also word/number-bounds string and numeric matches (a font family "Ares" never ratifies via the substring in
"shares"; a non-colour value the record never names FAILs instead of a vacuous pass).

`ratified-cross-slot/` — the PATH-BIND twin (OI-K finding 4): a genuine record ratifies
`color.accent-seasonal` = terracotta, and a DIFFERENT slot `color.brand-primary` reuses that same value
citing the same record. `node ../../../audit-lint.mjs .` → **exit 1 (FAIL)**: the R3 content-bind is
PATH-BOUND — it ratifies a token only via a line in `## What was ratified` that names THIS token's slot; the
section names `color.accent-seasonal`, never `color.brand-primary`. One ratification act does not silently
ratify every other slot that happens to carry its value.

`ratified-rejected-block/` — the SECTION-SCOPE twin (OI-K finding 1, the exact inversion of the v5 run-2
failure): the record names the REJECTED darker option in an `## Alternatives considered — NOT chosen` block
and ratifies the terracotta under `## What was ratified`. `node ../../../audit-lint.mjs .` → **exit 1**: the
ratified token (`color.accent-seasonal`) PASSES, but the rejected token (`color.accent-dark-rejected`, whose
value+slot appear ONLY in the alternatives block) FAILS — nothing outside `## What was ratified` ratifies. A
whole-record value search would have sealed the owner-rejected colour owner-confirmed. A record with no
`## What was ratified` section at all is malformed → FAIL (never a vacuous pass).

`ratified-line-residue/` — the SAME-LINE value-residue twin (OI-K pre-merge verify): the ratified line
legitimately carries a change-history parenthetical naming the first-draft value alongside the ratified one,
both inside `## What was ratified`. `node ../../../audit-lint.mjs .` → **exit 1**: the content-bind matches
only the line's VALUE SPAN (the first backtick span after the slot span), so a token shipping the parenthetical
off-value is not ratified — a whole-line value search would have sealed it.

`ratified-superseded-heading/` — the TRAILING-QUALIFIER heading twin (OI-K pre-merge verify): an honest
re-ratification record keeps a `## What was ratified — SUPERSEDED 2026-03-01` block ("do NOT ship") plus the
current `## What was ratified`. `node ../../../audit-lint.mjs .` → **exit 1**: the heading is bound EXACTLY
(literal text, top-level `##`, exactly one), so the superseded block is inert and the token shipping its value
FAILS. A heading matching any text STARTING with "what was ratified", or a nested `###`, would have opened
scope on the disavowed block.
