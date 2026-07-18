# Verify note — OI-K close: path-bind + section-scope on the ratification content-bind (2026-07-17)

Design/verify note for the OI-K tightening on branch `claude/v6-oik`. Records what OI-K closed, the pre-merge
adversarial verify that gated the merge, and what residual (if any) remains. No transcripts, no journals — the
forensic lives local-only, off-repo (E-O1).

## What OI-K was

OI-K (from `verify-note-f3-fix-ratification-content-bind—2026-07-17.md` §C, findings 1 + 4): the R3
ratification content-bind was VALUE-bound but not SLOT-bound or SECTION-scoped. A genuine record ratifying
value X for slot A could be cited by another token (slot B) carrying X (path escape), and a value the owner
named in a rejected/alternatives block still matched (section escape — the exact inversion of the v5 run-2
failure, where the owner says "that one, NO" and it ships ratified).

## The tightening (no new engine, no wire-contract change)

The record is a post-handoff Stage-0 `sources/` artifact; the wire contract is FROZEN and untouched. Two
bindings added to the existing content-bind (`audit-lint` R3):
- **SECTION-SCOPE** — only lines inside the record's canonical `## What was ratified` section ratify
  (`ratifiedSectionLines`); a value in a rejected/alternatives/superseded block is inert. No section → FAIL.
- **PATH-BIND** — a token is ratified only by a line naming BOTH its slot (dotted path) AND its canonical
  value; one ratification act does not ratify every other slot that carries the value.

Golden-safety was VERIFIED before tightening (not assumed): the golden `essential-brand @ 8b78dba` cites
**zero** `sources/ratification—*` sourceRefs, so the content-bind never fires there — golden-safe by
construction. The record-shape convention is formalized in `gap-protocol.md § the ratification record shape`.

Twins added first: `ratified-cross-slot` (path-bind FAIL) · `ratified-rejected-block` (section-scope: rejected
FAIL, ratified PASS). The prior `ratified-clean/mismatch/hex-held` remain intact.

## The pre-merge adversarial verify (the F3 lesson, applied again)

3 fronts (path-bind evasion · section-scope evasion · false-fail on legit records) + a judge per finding,
re-running every repro from scratch; journal backed up to `/mnt/c` (forensic, local-only). It found **3 REAL
holes, all CONFIRMED, all merge-blocking** — the first tightening was too coarse. All three were fixed and
re-verified; two biting fixtures added.

### Judge table

| # | Finding | Kind | Sev | Blocked | Resolution |
|---|---|---|---|---|---|
| 1 | Same-line value residue: `ratificationNamesValue` scanned the WHOLE ratified line, so a change-history parenthetical naming a rejected value on the ratified line let a token ship that off-value | evasion | MAJOR | ✅ | **FIXED** — value matched only against the line's VALUE SPAN (`ratifiedValueSpan`: the first backtick span after the slot span). Fixture `ratified-line-residue`. |
| 2 | Superseded/nested heading: `/^what was ratified\b/i` + `#{1,6}` opened scope on `## What was ratified — SUPERSEDED …` and a nested `### What was ratified …` (rejected) block | evasion | MAJOR | ✅ | **FIXED** — heading bound EXACTLY (literal text, top-level `##`, exactly one; 0 or >1 → FAIL). Fixture `ratified-superseded-heading`. |
| 3 | ATX sub-headers (`### Colours`) inside the section silently closed scope → a legit grouped multi-slot record false-failed for every token | false-fail | MAJOR | ✅ | **RESOLVED** — kept the secure "any heading ends the section" (a `### Rejected` sub-header stays OUT of scope; option B would have re-opened that evasion), and DOCUMENTED the flat / `**bold**`-label grouping convention (no ATX sub-headers). Bold-grouped multi-slot verified PASS. |

### Post-fix re-run (the exact judge repros, from scratch)
value-residue → **exit 1** · superseded-heading → **exit 1** · nested-heading → **exit 1** · bold-grouped
legit multi-slot → **exit 0** (no false-fail). The 5 prior ratification fixtures keep their verdicts
(`ratified-clean` PASS; mismatch/hex-held/cross-slot/rejected-block FAIL). Golden `fixtures/clean` → exit 0.
Suite **32/32**.

## OI-K status: CLOSED · residual

**OI-K is CLOSED** — both facets (path-bind, section-scope) are bound and machine-checked, with 5 biting
fixtures (`cross-slot`, `rejected-block`, `line-residue`, `superseded-heading`, plus `mismatch`/`hex-held`).

No open hole remains from OI-K. Two standing items, both PRE-EXISTING and unchanged by this tightening:
- **Record-shape convention constraints (documented, not a hole):** ratified lines must be FLAT under the
  exact single top-level `## What was ratified` heading, with slot and value each in their own backtick span;
  ATX sub-header grouping is not supported (use bold labels). A record violating the convention FAILs — the
  correct, non-silent behavior now that `gap-protocol.md` states it.
- **Self-serving-record authenticity boundary (declared-open, same as the fix-pack §C):** the linter checks
  the record's STRUCTURE (exists · hashed · section · slot+value bound), never WHO authored it. A pipeline
  authoring a false-but-well-formed record is the same authenticity class as forging the signed brief —
  delegated to the Stage-0 hash + signing discipline, not this gate. Unchanged by OI-K.
