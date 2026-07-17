# wire-check fixtures — the biting cases (v6 F2-01)

Own acceptance fixtures of `tools/wire-check.mjs`. Each file is a minimal RAW wire (the tool accepts a
direct `.md` path); each fires exactly its class — run `node ../../wire-check.mjs <file>` from `tools/`:

| Fixture | Expected | Class it bites |
|---|---|---|
| `untagged-paraphrase.md` | FAIL (exit 1) | `untagged` — a WHY line inside RATIFIED scope with no `BRIEF{}` tag (the wrapper confers nothing) + `wire-check` (no WIRE-CHECK line) |
| `blanket-notused.md` | FAIL (exit 1) | `blanket` — 2 not-used rows, 1 citation · `verbatim-miss` — the quote is not in the signed brief (a blanket never mints rows — W-18) |
| `fabricated-verbatim.md` | FAIL (exit 1) | `verbatim-miss` — quoted "her words" absent from the brief (the fabricated-attribution class) · `wire-check` — declared verified:1 vs recomputed 0 (a hand-written check) |
| `markers-no-brief.md` | FAIL (exit 1) | `no-brief` — RATIFIED markers with no SIGNED BRIEF appendix (the fabrication surface) |
| `vocab-drift.md` | FAIL (exit 1) | the 6 observed out-of-vocabulary literal classes (`fidelity:reference` · `url:PENDIENTE` · `visibility:low-moderate` · `ingest:vector-trace` · `existing-material:pendiente` · `route-hint:font-match/trace`) + `n/a` + `born-gap` (posture `→GAP` with no GAPS row naming the field) |
| `empty-create.md` | N/A (exit 0) | the W-15 guard — no markers, no brief, vocabulary clean: an all-empty CREATE wire is NEVER false-blocked |
| `honest-quote-different-content.md` | FAIL (exit 1) | `content-bind` — a REAL brief quote certifying DIFFERENT line content (the fabrication-with-honest-citation hole, caught pre-verify by probe) + `wire-check` discrepancy |

The PASSING instances are the three synthetic handoffs in `../handoff/` (exact recomputed counts). The
repo-root mode (latest `sources/handoff—*.md`) is exercised by `../clean/` (PASS row in run-gates) and the
`../gates/**` fixtures (self-declared N/A on marker-free stub wires).
