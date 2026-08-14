# custody/recovered-shadow — the F6-01 dual-key custody collision (regression guard)

`sources/MANIFEST.json` here is a **dual-key** object: an `entries` array (an `emit-cards.mjs` derived-card
entry — a valid custody row) AND a `recovered` array (a `source-recover.py` wayback capture, carrying
`captureTs`). This is exactly what the real v6 pipeline produced before F6-01: `source-recover.py` writes
`{recovered:[…]}` at Stage 3, then `emit-cards.mjs` / `tokens-project.mjs` merged a new `entries` key at
Stage 8, leaving both.

A PRECEDENCE reader (`entries` beats `recovered`) reads only `entries`, so the captureTs-bearing recovery in
`recovered` is SHADOWED — `usedArchive` flips false and the MT-3 identity/date agent-gate is silently skipped:
a blocking provenance gate turns green on its own. There is no `audit/agent-gates.md` "source identity/date
verification" section here, so the correct verdict is **custody manifest → FAIL**.

`run-gates.mjs` now UNIONS every entry-carrying key, so it sees the `captureTs` capture in `recovered`,
`usedArchive` stays true, and the custody row FAILs (archived recovery, no committed walk). A reader that
reverts to precedence would let this PASS — so this fixture bites the fix.

Run: `node tools/run-gates.mjs tools/fixtures/gates/custody/recovered-shadow` → the `custody manifest` row is
FAIL (the overall board is BLOCKED, as expected for a minimal repo).
