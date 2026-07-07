# Self-audit — the on-demand deep audit (HARNESS-BACKED, never a narrated confession)

Read when the operator invokes a self-audit after the first iteration of a brand repo (post-build,
on demand — the standard Stage-10 gates always ran regardless; this goes DEEPER, on BOTH axes).

**Condition of existence: harness-backed.** A self-audit that narrates verdicts without checking them
fabricates in BOTH directions — a clean build invents a sin to confess ("ugly-version" pressure), a dirty
build whitewashes. Self-flagellation and whitewashing are the same bug: a verdict asserted without a check.
So this mode has ONE law: **no claim enters the report without a fresh, executed check in the same act** —
a re-run with its exit code, a grep with its output, a file read with the line quoted. If a check cannot
run, the claim is recorded NOT-RUN with the reason — never asserted from memory of the build.

## Protocol

1. **Re-run the machine floor, fresh.** `node tools/run-gates.mjs` (which re-runs audit-lint, the deny over
   the manifest's client rows, the kit validate, and re-checks all committed evidence). Record the board
   verdict AS the harness's opening fact — never re-narrate last run's board.
2. **Dev/programmatic axis.** Walk the emitted machinery beyond the gates: does every tool in `tools/` run
   on this repo (exit codes recorded)? do the kit build + validate reproduce (`npm ci && npm run build`
   where the environment allows — else NOT-RUN)? do CHECKSUMS re-verify against the actual files
   (`sha256sum -c`-style, recorded)? any drift between `canon/canon.json` and the prose layers (spot-verify
   N mirrored values by reading BOTH files)?
3. **Knowledge/identity axis.** Re-walk the canon as an outsider: does each layer answer ONLY its question
   (a WHAT leaking into GRAMMAR is a finding)? do the keystone's rules trace to named canon sources (open
   the cited layer and quote it)? does the brandbook show everything the asset index says exists (re-run is
   already in step 1; here, eyeball the RENDERED page against the index rows)? is every uncertainty a
   tracked GAP with a resolution target (sample rows, verify the target file/section exists or is
   sensibly named)?
4. **Verify every claim against files before writing it.** The report's grammar per finding:
   `CLAIM → CHECK RUN (command / file:line) → OBSERVED OUTPUT → VERDICT`. A finding with no CHECK cell is
   invalid by construction.

## Where the artifacts live — `audit/self/`

`audit/self/<date>/report.md` (+ any captured outputs beside it). Operator surface: git-tracked, outside
the client scrub, epistemics intact — same class as the rest of `audit/**` in the surface manifest. Never
in the client brandbook; never a loose untracked file (evidence the repo needs must not die outside it).

## Boundaries

- The self-audit never edits what it audits mid-run (findings become GAPs / fixes AFTER the report lands).
- It never re-litigates owner-ratified decisions — it verifies the REPO against its own rules and records.
- Non-blocking by default: its findings route to the ledger; the operator decides what becomes work.
