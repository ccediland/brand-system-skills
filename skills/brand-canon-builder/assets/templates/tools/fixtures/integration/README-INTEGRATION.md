# integration — the v6 mechanisms exercised TOGETHER (offline; run on demand)

The five v6 stages built mechanisms designed to be orthogonal but that never ran through one flow at once:
the **wire contract** (F2) · **CREATE/T2 quarantine** (F3) · the **static-cards emitter** (F4) · the **Drive
mirror** (F5) · on the F1 spine. This harness runs them over ONE repo and asserts that no mechanism steps on
another — the question F6-01 answers. It is **fully offline + zero-dep** (no npm, no network), so unlike
`kit-e2e/` it can run always-on.

Source repo: the `clean` fixture already crosses every mechanism — a full canon + kit + `sources/` (handoff +
signed brief) + `satellites/asset-index.md` + `.github/workflows/drive-mirror.yml`, AND a `proposed`
(quarantine) colour token in `tokens/base.tokens.json` (the "Seasonal" role: `source:proposed`,
`confidence:hypothesis`, tracked by an open GAP). So the flow is real, not staged-for-the-test.

Procedure (from `tools/`, staging to `$TMPDIR` so the committed `clean` fixture is never mutated):

    I=$TMPDIR/v6-integration && rm -rf $I && cp -r ../<tools>/fixtures/clean $I
    node <tools>/emit-cards.mjs      $I     # F4: materialize @dsCard static cards from the canon
    node <tools>/tokens-project.mjs  $I     # F1: emit the consumer string projection
    node <tools>/drive-mirror.mjs --plan $I # F5: compute the Drive mirror plan (offline)
    node <tools>/run-gates.mjs       $I     # the whole board, every mechanism at once

Expected — the cross-mechanism assertions (all verified 2026-07-18):

1. **Status survives proposed → card (no leak).** The `proposed` "Seasonal" colour renders in
   `design-sync-kit/cards/02-color.html` with the sanctioned CLIENT marker `· provisional` — NEVER a GAP id
   or a confidence grade — while every settled colour renders clean. The emitter reads confidence FROM the
   token (materialization confers nothing); the quarantine status is preserved to the client surface.
2. **Proposed never reaches the mirror.** The mirror set is `satellites/asset-index.md` ∩ `CHECKSUMS.txt` =
   the `sources/**` records; the `proposed` token lives in `tokens/` (not an asset-index row), so it is not
   mirrored — no status leak THROUGH the mirror (which copies bytes and stamps no status anyway).
3. **Custody producers coexist — one canonical, order-independent MANIFEST.** `emit-cards.mjs` (one entry per
   card×input) and `tokens-project.mjs` (one per projection) BOTH write `sources/MANIFEST.json`, each filtering
   out only ITS OWN `tool` rows, folding in every existing entry from ANY key (`{entries}` · a bare array ·
   `source-recover.py`'s `{recovered}`), and writing back ONE canonical, stably-sorted `{entries}` array. So the
   producers never clobber each other AND never leave a dual-key `{recovered, entries}` object — after both run,
   `sources/MANIFEST.json` holds all 10 entries (8 emit-cards + 2 tokens-project), byte-identical regardless of
   run order or re-runs. This is the F6-01 collision that hardened here: a dual-key manifest would let a
   precedence reader SHADOW `source-recover.py`'s `recovered` captures, flip `usedArchive` false, and silently
   skip the MT-3 identity/date gate — so `run-gates.mjs` now UNIONS every entry-carrying key (regression guard:
   `fixtures/gates/custody/recovered-shadow/`). Ratification records take a DIFFERENT custody path
   (`CHECKSUMS.txt` + R3 content-bind), so they never collide with the MANIFEST parent-hash path.
4. **Every mechanism's gate passes together.** `run-gates.mjs` returns zero FAIL with, in one board:
   `audit-lint R0–R8` PASS (R5 caps the proposed token to hypothesis+GAP) · `client-deny-lint` PASS (the cards
   are client-scrubbed; `provisional` is sanctioned client vocab) · `wire verbatim-check` PASS · `static cards`
   PASS (§3c) · `drive mirror plan` PASS (§3d) · `custody manifest` PASS (it recomputes the parent hash of
   EVERY card AND every projection in one pass — cross-producer consistency) · keystones + asset index + §1–§5
   PASS. Verdict is INCOMPLETE only because the kit is unbuilt (`[NO_DIST]`, honest) and the live red-team run
   is deferred — never a FAIL.

If any assertion breaks, a v6 mechanism has begun stepping on another — that is a cross-mechanism regression,
not a local gate failure. This harness is the F6-01 integration proof; the design note
`notes/design-note-f6-01-integration—2026-07-18.md` records the adversarial run that hardened it.
