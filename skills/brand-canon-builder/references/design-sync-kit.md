# /design-sync kit — the builder-side converter contract (Stage 8b)

Read when running Stage 8. This is what the builder must emit so the brand repo is born `/design-sync`-ready
by default (F-026). It is grounded in the live `/design-sync` skill, captured here as a versioned pin (Claude
Code v2.1.185 LIVE-PIN). Templates: `assets/templates/design-sync-kit/`.

> Server-side / version-fluid caveat. The base `/design-sync` command *always fetches live instructions
> via `get_claude_design_prompt`* rather than shipping a vendored copy — so the authoritative contract lives
> server-side and shifts release-to-release. Re-pin the exact field/script/marker names against the live
> skill before each major run (procedure below). Everything below is the v2.1.185 pin.

## Step 0 — Re-pin the live contract before freezing the emitter

The contract below is a captured pin, not a vendored copy of the truth — the live skill is fetched
server-side and grows release-to-release (this pin already absorbed `readmeHeader`, `@dsCard`-marker card
indexing, and the `package-validate.mjs` converter script across releases). So **before generating or
freezing the kit emitter on any major run, re-pin against the live skill**:

1. **Update first.** Run `/update` so the Claude Code session carries the current bundled `/design-sync`
   skill (the Piebald-mirror copy lags releases by minutes-to-days — read the live on-disk skill, not a
   mirror).
2. **Read the live skill.** Open the bundled `/design-sync package source shape` skill and re-pin the exact
   names this kit depends on: the `.design-sync/config.json` top-level keys (a removed/renamed key fails the
   run with no compat code), the converter script names (`package-build.mjs` / `package-validate.mjs` /
   `package-capture.mjs` / `resync.mjs`), the `@dsCard` first-line marker, the upload-bundle file names, and
   the converter error codes (`[NO_DIST]`, `[FONT_MISSING]`, `[RENDER]`, …).
3. **Reconcile the pin.** Where a live name diverges from the pin below, update the kit templates + this
   reference to the live name before emitting — never ship the emitter against a stale field/script name.
   If a render-/error-code variant isn't confirmed live, fall back to the generic confirmed code (e.g.
   `[RENDER]`) rather than invent one.

This is the one piece that cannot be frozen into the kit: the rest of this reference is the captured pin to
reconcile *against*.

## What `/design-sync` ingests (the load-bearing fact)

`/design-sync` bundles the package's already-compiled `dist/` — it does not compile source for you.
So "born `/design-sync`-ready" means scaffolding component source + a one-command build that emits
`dist/index.es.js` + a `.d.ts` tree, not a source-only handoff. The build is best-effort, never a
hard-fail: a missing `dist/` is `[NO_DIST]`, recoverable by running the build. The deterministic fidelity
artifact is the HTML prototype (`references` for F-025; `assets/templates/prototype/`), which depends on
no toolchain — the kit dist is one command away from it.

## Package-shape (the default, D-B8)

No Storybook. Deps are just `esbuild` + `ts-morph` + `@types/react`. The component list comes from the
shipped `.d.ts` exports; unscoped components get an honest floor card ("preview not yet authored" — not a
failure); rich previews are authored per scoped component. Escalate to Storybook-shape only if the brand
already ships Storybook + Playwright (gains a pixel-match oracle) — otherwise stay package-shape.

## The build (one command)

`npm run build` → `build.mjs`:
1. **esbuild** bundles `src/index.ts` → `dist/index.es.js` (ESM, React/JSX externalised).
2. **ts-morph** emits the `.d.ts` tree (the converter reads `<Name>.d.ts` as each component's API; without
   `@types/react`, React utility-type props collapse to `any` → `[DTS_REACT]`).

`npm run validate` (`package-validate.mjs`) is the kit's OWN offline pre-flight gate, distinct from the live
converter's server-side validate: it checks dist + `.d.ts` present, ≥1 component exported, every referenced
font-family has a shipped `@font-face` (local `[FONT_MISSING]`), and `styles.css` carries a non-hollow token
closure → exit 0/1. It needs no `/design-sync` round-trip, so the Stage-10 gate can run it offline before any
upload (`validate-audit.md` §3a).

## `.design-sync/config.json` (emit ONLY live-valid keys)

Top-level keys are validated strictly: an unknown or removed key fails the run with a named fix, and
the scripts carry no compat code. Emit only keys confirmed live-valid. Required: `pkg` + `globalName`
(globalName auto-derives from pkg when omitted). The kit template uses: `pkg`, `globalName`, `projectId`,
`shape:"package"`, `buildCmd`, `srcDir`, `cssEntry`, `extraFonts`, `readmeHeader` — and nothing empty
(an empty map is still an unknown-shape risk; omit a key until it carries a value).

Other live-valid keys (add only when needed): `tsconfig`, `extraEntries`, `componentSrcMap`, `dtsPropsFor`,
`tokensPkg`, `tokensGlob`, `docsDir`, `docsMap`, `guidelinesGlob`, `runtimeFontPrefixes`, `replaces`,
`libOverrides`, `overrides`, `provider`. Two distinct override keys — don't confuse them: `libOverrides`
is the schema row for declaring which `.design-sync/overrides/*.mjs` lib forks the repo carries (+ why);
`overrides.<Name>` holds per-component preview tweaks (`cardMode` / `skip` / `primaryStory`) and is set
only when a component needs one — never shipped as an empty `{}`. (`readmeHeader` and `guidelinesGlob`
coexist — `readmeHeader` prepends a file to the README/conventions header; `guidelinesGlob` copies
guideline `.md`s into `guidelines/`. The "replacement" framing was wrong; both are present in v2.1.185.)

## The `@dsCard` marker

Every emitted preview/floor `<Name>.html`'s first line is `<!-- @dsCard group="…" -->`. The design pane's
self-check reads it to register the card and build the card index (compiled server-side into
`ds_manifest`; `register_assets`/`unregister_assets` are legacy). A card whose first line isn't the marker is
`[DSCARD_MISSING]`. Authored `previews/<Name>.tsx` carry NO marker (they're yours, re-syncs never touch
them) — the converter stamps the marker into the generated `.html`. The emitter must stamp every card,
authored or floor. (Shapes: `assets/templates/design-sync-kit/_card-shape/`.)

## The conventions header (`readmeHeader`)

The live workflow has an "Author the conventions header" step that prepends the `readmeHeader` file
verbatim to the generated README the design agent reads. The kit ships `.design-sync/conventions.md` (the
canon's GRAMMAR scoped to the kit) wired via the `readmeHeader` key.

## The upload bundle the converter writes

Root-level: `_ds_bundle.js`, `_ds_bundle.css`, `styles.css`, `components/`, `tokens/`, `fonts/`, `README.md`,
`_ds_sync.json`, `_ds_needs_recompile`, plus `_vendor/`, `_preview/`, `guidelines/`. `styles.css` is the
import closure every built design receives: it must `@import "./_ds_bundle.css"` (the compiled component
CSS) and carry the token + `@font-face` closure. Converter gates to design against: `[CSS_BUNDLE_UNREACHABLE]`
(closure can't reach the component CSS), `[TOKENS_MISSING]` (referenced `var(--token-*)` undefined),
`[FONT_MISSING]` (a referenced family with no shipped `@font-face` — a core face missing is a fidelity GAP,
never a silent fallback).

## What the builder emits at Stage 8 (summary)

1. Copy `assets/templates/design-sync-kit/` into the repo; fill `{{pkg}}`/`{{globalName}}`/components/tokens
   from the canon (invent nothing).
2. Run the one-command build best-effort if a Node toolchain is present (else leave `[NO_DIST]` for the
   `/design-sync`-time build — recoverable, documented); then `npm run validate` (the kit's offline gate)
   to catch a hollow lib / `[FONT_MISSING]` / `[NO_DIST]` before any `/design-sync` upload.
3. Author `previews/<Name>.tsx` for the scoped components; floor card the rest.
4. Wire `conventions.md` via `readmeHeader`; ensure `styles.css` `@import`s `_ds_bundle.css` + closure.
5. Register Claude Design as a consumer in `projections.md` (default ON — `claude-design-adapter.md`).

The fidelity gate (Stage 10, PR-B4) and client-clean scrub (Stage 11, PR-B5) consume this kit's gates; they
are forward-pointers from this PR.
