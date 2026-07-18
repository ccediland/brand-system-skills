# design-sync-kit — the package-shape scaffold

This is the compiled component library `/design-sync` ingests, scaffolded so a brand repo is born
`/design-sync`-ready. It is a projection of the canon (kit = constant, canon = variable): components style
themselves only via `var(--token-*)`; re-theme by swapping the canon and rebuilding.

## What's here

```
design-sync-kit/
  package.json            `npm run build` → dist/index.es.js + .d.ts; `npm run validate` → the offline gate
  tsconfig.json           emits the .d.ts tree the converter reads as each component's API
  build.mjs               the build (esbuild bundle + ts-morph .d.ts) — best-effort, never a hard-fail
  package-validate.mjs    the kit's OWN offline pre-flight gate (`npm run validate`): dist/.d.ts present,
                          ≥1 component exported, every referenced font has a shipped @font-face, styles.css
                          carries a non-hollow token closure → exit 0/1. Distinct from the converter's
                          server-side validate; this one needs no /design-sync round-trip.
  src/index.ts            barrel: every PascalCase export = a discovered component
  src/components/*.tsx    component source (Mark, Button) — projections of the canon, token-only styling
  styles.css             the import closure: @import "./_ds_bundle.css" + token + @font-face closure
  .design-sync/
    config.json           shape:"package", pkg + globalName required, ONLY live-valid keys
    conventions.md        the readmeHeader source (prepended to the generated README)
    previews/Button.tsx   authored preview (no marker — the converter stamps @dsCard into the .html)
  _card-shape/
    preview-card.html     reference shape of an emitted card (first line = @dsCard marker)
    floor-card.html       honest floor card for unscoped components (also first-line @dsCard marker)
```

## How it satisfies the live `/design-sync` contract (v2.1.185 LIVE-PIN; see `references/design-sync-kit.md`)

- **Compiled `dist/`, not source.** `/design-sync` bundles the package's built `dist/index.es.js`; the
  build here is one command (`npm run build`). A missing dist is `[NO_DIST]` — recoverable by running
  the build, never a hard-fail. The deterministic fidelity artifact is the HTML prototype
  (`assets/templates/prototype/`), not this.
- **Package-shape default** (no Storybook): the component list comes from the shipped `.d.ts` exports;
  unscoped components get an honest floor card; rich previews are authored per scoped component.
- **`@dsCard` marker.** Every emitted card's first line is `<!-- @dsCard group="…" -->` (the pane reads it
  to register cards → server-regenerated `_ds_manifest.json`). Authored `previews/*.tsx` carry no marker;
  the converter stamps it into the generated `.html`.
- **`readmeHeader`** wires `conventions.md` as the conventions header (the "Author the conventions header"
  step).
- **`styles.css` closure** `@import`s `_ds_bundle.css` and carries the token + `@font-face` closure
  (`[CSS_BUNDLE_UNREACHABLE]` / `[TOKENS_MISSING]` / `[FONT_MISSING]` are the converter's gates).
- **Strict config.** Unknown top-level keys fail the run (no compat code) — emit only live-valid keys, and
  re-pin the schema before each major run: the base command fetches live instructions via
  `get_claude_design_prompt`, so the contract is server-side / version-fluid.

The conceptual canon→kit brief (token mapping, conventions, runbook) lives in
`references/claude-design-adapter.md` + `assets/templates/claude-design-adapter/`; this scaffold is the
buildable package that brief describes.
