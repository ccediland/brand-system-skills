# Claude Design adapter — operational notes & gotchas

<!-- GUIDE: the runbook for the OPTIONAL Claude Design sync. These are abstracted from real /design-sync
     runs; keep the brand-agnostic ones, add brand-specific discoveries as they happen. -->

## Mental model
- **kit = constant, canon = variable.** The component kit is a PROJECTION of the canon: it consumes tokens,
  icons, and the mark via `var(--*)` / asset references and never redefines them. To re-theme, change
  the canon and re-project — never edit kit values directly.
- The kit is one consumer; the canon is the source. Re-project (don't hand-edit) before every re-sync.

## Re-sync (one pass)
1. Re-project the canon into the kit's `tokens/` (tokens are a COPY of the canon projection — refresh first).
2. Build: `npm run build` (esbuild → `dist/`).
3. Run `/design-sync` from the kit dir; it reads the kit's single `.design-sync/config.json` (the one source
   of truth — this adapter dir carries no second config).

## Known gotchas (abstracted)
- **Assets aren't auto-copied** by the converter — copy the mark/logo + any image assets into the bundle
  post-build and list them in the upload plan.
- **Inline the mark as a data-URI** in components so the design pane renders it self-contained (a relative
  `<img src>` to an asset dir often fails in the pane).
- **`globalName` underscores are stripped** by the converter — don't rely on them.
- **`cssEntry` is the kit's hand-authored `styles.css`** (the import closure: `@import "./_ds_bundle.css"` +
  the token + `@font-face` closure). The converter writes `_ds_bundle.css` (the compiled component CSS) —
  that one is the build's, not hand-authored — but `styles.css` itself you author. (`extraFonts` stays `[]`
  unless the brand actually ships extra font CSS — never a stale pointer.)
- **Local static servers may lack the `.svg` MIME type** for the capture step — patch if capture fails.
- Record the canonical target project ID in `config.json`; note any superseded projects (the tool cannot
  delete projects — that is a manual step for the brand owner).
