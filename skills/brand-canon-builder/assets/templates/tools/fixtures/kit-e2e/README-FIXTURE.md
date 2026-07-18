# kit-e2e — the full kit pipeline, exercised end to end (networked; run on demand)

The one chain no static fixture covered (the root cause of the P-series shipping undetected):
**kit → `npm install && npm run build` → package-validate → R6c → deny → upload-shape**, plus the OFFLINE
fallback path **canon → `emit-cards.mjs` → static cards → `--check` → deny** (the `[NO_DIST]`-reviewable route).
It needs npm (network) for the build leg, so it stages to `$TMPDIR` and never commits `node_modules`/`dist`;
the emitter leg is zero-dep and offline (also exercised always-on by the run-gates `static cards` §3c row + the
`fixtures/gates/emit-cards/` twins).

Procedure (from `tools/`):

    K=$TMPDIR/kit-e2e && rm -rf $K && mkdir -p $K/repo/tokens
    cp -r ../design-sync-kit $K/repo/design-sync-kit
    printf '{"base":{"font-family":{"$type":"fontFamily","body":{"$value":"\"Body Face\", system-ui, sans-serif"}}}}' > $K/repo/tokens/base.tokens.json
    cd $K/repo/design-sync-kit && npm install && npm run build       # → dist/index.es.js + .d.ts
    node package-validate.mjs                                        # → exit 0 (with a shipped @font-face
                                                                     #   or a declared --font-fallback-*)
    node <tools>/audit-lint.mjs $K/repo                              # → ZERO [R6c] rows (import closure
                                                                     #   resolves: shipped _ds_bundle.css
                                                                     #   placeholder + ../styles.css hrefs)
    node <tools>/client-deny-lint.mjs $K/repo/design-sync-kit/README-KIT.md \
         $K/repo/design-sync-kit/_card-shape/*.html                  # → exit 0
    head -1 _card-shape/preview-card.html | grep '@dsCard'           # → upload-shape marker present
    # --- the OFFLINE static-cards leg (zero-dep; the [NO_DIST]-reviewable path) ---
    node <tools>/emit-cards.mjs $K/repo                              # → design-sync-kit/cards/*.html (present layers)
    node <tools>/emit-cards.mjs --check $K/repo                      # → exit 0 (offline: no [REMOTE_REF]/[DSCARD_MISSING])
    node <tools>/client-deny-lint.mjs $K/repo/design-sync-kit/cards  # → exit 0 (emitted cards are client-clean)

Acceptance runs recorded 2026-07-06 (all live): build exit 0 · package-validate exit 0 · R6c zero rows ·
deny exit 0 · `@dsCard` first-line marker present. Anti-gaming (spine-required fonts): DELETING the
`--font-*` reference from styles.css still fails `[FONT_MISSING] … (spine-required — deleting the
styles.css reference does not remove the requirement)`; declaring `--font-fallback-body: "Body Face" …`
passes the font check as the honest non-redistributable state. The live `/design-sync` contract was
re-read in-session the same day (the DesignSync tool surface: `@dsCard` → `_ds_manifest.json`;
`register_assets` legacy; `report_validate` counts from the final `.render-check.json`).
