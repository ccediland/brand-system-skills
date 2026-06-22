# v2 build spec — brand-canon-builder

> Version 1.1 · 2026-06-21 · research-grounded (Round B) · brand/country/client-blind
> Consumed by a Claude Code session that rewrites `skills/brand-canon-builder/` to v2.
> Sibling of `dev/v2-intake-spec.md` (the scoper side, merged). Together they cover WS0–WS5.
> v1.1 folds Research Round B (the `/design-sync` contract, the medium-agnostic acquisition matrix,
> fonts/licensing, DTCG→Style Dictionary v5, brand-fidelity gates). Confidence flags inline:
> VERIFIED (primary source) / INFERRING (reasoned policy) / UNCERTAIN (thin source).

## §0 — Purpose & consumers

This document specifies the v2 rewrite of `brand-canon-builder` (the Code-side skill). It is the design
authority a Claude Code session executes; it is not itself shipped to a client.

It closes the workstreams the intake-spec did not — **WS2** (post-build validate/audit), **WS3**
(client-clean output), **WS4** (distribution/install/deps), **WS5** (real assets + brand fidelity) — plus
the builder half of the WS0 doctrine and the WS1 handoff bridge. Granular evidence: `dev/v2-backlog.md`
(F-001…F-026); reframe + surface roadmap: `RESIDENT.md › ## v2`; research evidence behind v1.1: the Round-B
findings doc (see §8).

The builder consumes the **machine-readable handoff** the v2 scoper emits
(`skills/brand-canon-scoper/references/handoff-format.md`, merged). This spec assumes that contract verbatim.

## §1 — Scope & invariants

**The center of gravity (the inversion).** The first real run proved v1 ships a *hollow skeleton*:
structurally correct but unpresentable — placeholder mark, fallback fonts, generic renders — and every gate
passed on it. v2 makes the builder an engine that **analyzes published brand work across mediums → extracts
the real assets → produces a real, presentable prototype and a `/design-sync`-ready component-library, by
default.** The four-layer canon remains the **skeleton**, never the deliverable.

**The load-bearing artifact (VERIFIED, Round B).** `/design-sync` ingests an **already-compiled** component
library and bundles its `dist/`; it does not compile source for you. So "born `/design-sync`-ready" means the
builder must scaffold component **source plus a one-command build** that emits `dist/` with a `.d.ts` tree —
not a source-only handoff. This grounds D-B1 (§7).

**Hard invariants — do NOT regress** (validated in the v1 run; the reframe adds on top, never removes):

| Invariant | Source |
|---|---|
| Output-agnostic: no layer/file/section named for an output; coverage absorbed as generative rules | architecture.md |
| Generative over catalog: `G-*` rules + `ALGO-*` algorithms, stable IDs, rule-ID citation (`ruleIndex`) | architecture.md |
| Dual legibility: prose `canon/*.md` + machine mirror (`tokens.json`, `canon.json`); disagreement = bug | architecture.md |
| DTCG/OKLCH token spine: OKLCH literal in `$value`, plain-string values, `{tier.cat.name}` aliases, namespace-aligned categories, OKLCH-preserving transform (never `color/css`) | token-spine.md |
| Authored/derived: per-entry `source:"authored"\|"derived"` in `$extensions`; authored spot/CMYK never re-derived | token-spine.md |
| Lego property: repo always valid; every missing must-have = a tracked `GAP-NNN`, never a silent hole, never fabricated brand truth | gap-protocol.md |
| Universality stress test (three unnamed artifacts spanning media) as the real completeness net | gap-protocol.md |
| Brand-scrub: junk only, gated behind human OK, facts preserved | analyze.md |
| Expanded taxonomy: wordmark/symbol/lockup/secondary/monogram/seal/pattern/physical reproduction | coverage-checklist.md |
| Motion/depth: first-class but optional; reserved-or-used; emitted DTCG-valid even without a consumer | token-spine.md |

**Brand-blind.** Every rule encoded brand/country/client-neutral. The builder clones per brand by swapping
the canon; it must stay strictly brand- and output-agnostic.

**Blast radius & staging.** This rewrite is far larger than the scoper's (2 files). It touches `SKILL.md`,
~7 references (some rewritten, some new), `assets/templates/`, repo-meta, and introduces a real acquisition
pipeline and a prototype/kit emitter. **The spec is one document; the execution is staged into reviewable
PRs** (§6). No mega-PR.

## §2 — Doctrine (WS0 / F-023·024·025·026)

1. **Analyze published work is the default; CREATE is the rare exception.** Default = analyze the brand's
   published expression across mediums → harvest → refine → transform → improve into a canon + real assets.
   CREATE (author from the ratified WHY) is entered **only on the handoff's `MODE: CREATE`**. The
   greenfield-vs-brownfield top dichotomy is **retired** (Dead-end).
2. **Mode = ANALYZE | CREATE; coverage is per-layer.** Read `MODE`; within either, completeness is measured
   per canon layer (sourceable / partial / elicit-only / empty), never by artifact type.
3. **A real prototype and a `/design-sync`-ready library are default outputs — not deferrable gaps.** The
   deliverable includes a presentable prototype (real mark, real fonts, real imagery on real surfaces) and
   the repo is born `/design-sync`-able. The optional "Claude Design adapter? no" default is **retired**.
4. **No-placeholder-default + never invent brand truth coexist.** Assets are extracted/acquired/harvested,
   not invented; what cannot be sourced is a **fidelity GAP**, not a fabricated value and not a silent pass.
   Proceeding to "done" without core assets is the bug — not the gap-logging.

## §3 — The builder pipeline (rewritten, gated)

Fixed sequence. **BLOCKING** gates must pass (or be explicitly waived by the owner via handoff/PR) before the
build is declared complete.

| # | Stage | What happens | Gate |
|---|---|---|---|
| 0 | Ingest handoff + locate target | Parse the machine-readable contract; confirm real target repo + brand + owners | parse-or-stop |
| 1 | Scaffold (always) | Copy the full template set; create `assets/` + `sources/`; fill header fields — the Lego baseplate | — |
| 2 | Read material in-repo | Read placed material from `assets/` (binaries) + `sources/` (references); never Project knowledge | — |
| 3 | **Source-agnostic asset acquisition** | Acquire build-grade assets from whatever sources exist (any combination), per the §4.3 matrix; assemble best-fidelity per slot with precedence; slot-vs-source delta = GAP | **BLOCKING** (core) |
| 4 | **Font acquisition** | Multi-source (embedded-PDF / `@font-face` / repo files / acquire-open); license-gated; else fidelity GAP | **BLOCKING** (core) |
| 5 | Applied-design harvest | Observe live consumers (site/social): layout, imagery, composition, type-in-use → GRAMMAR/ESSENCE | — |
| 6 | Fill the canon | ANALYZE (harvest) / CREATE (author from ratified WHY); builder **extracts** measured primitives; meaning in prose, values in tokens; mirror to `canon.json` | — |
| 7 | Token spine | Author base/semantic/component (OKLCH spine, authored/derived) — invariant | — |
| 8 | **Prototype + `/design-sync`-ready kit** | Emit a self-contained presentable prototype (F-025) + a compiled-`dist/`-ready component library (package-shape default) + the upload bundle the converter needs (F-026) | **BLOCKING** (prototype) |
| 9 | Coverage + gaps | Formalize the handoff's client-language gaps → `GAP-NNN` (two-ledger); walk must-haves | — |
| 10 | **VALIDATE / AUDIT** | Output-agnostic + DTCG + universality (existing) **+ fidelity gate (layered-threshold VRT) + content audit + render real samples**; assemble client-confirmation evidence | **BLOCKING** |
| 11 | **Client-clean / scrub** | Scrub reference-brand bleed, tool self-attribution, scaffolding chatter; **never auto-stamp ratification** | **BLOCKING** |
| 12 | Commit + PR | Commit on `claude/<name>`; open a PR carrying the audit + samples + open ratification GAPs | emit once 0–11 clear |

## §4 — Stage detail

### §4.1 Handoff contract consumption (F-003·006·007·008 bridge)

The handoff is the **canonical brief**. Parse every block of the scoper's `handoff-format.md` and act on it:

- `MODE` → §4.2. `TARGET REPO` → the real repo (never invent a tree). `OWNERS` / `UNRESOLVED CONFLICTS` →
  ratification bookkeeping; unresolved conflicts are open GAPs, never builder-decided.
- `MATERIAL MANIFEST` → the in-repo paths (`assets/`/`sources/`) read in stage 2 (+ live-URL pointers for
  websites/social). Material lives in the repo, never Project knowledge (F-007); if the manifest points
  anywhere the builder cannot read, stop and report.
- `WHY (essence) — RATIFIED` → fill ESSENCE directly. **The builder never re-elicits/re-infers the WHY**; a
  GAP in the handoff stays a GAP.
- `WHAT (primitives) — POINTERS + OWNER-PROVIDED ONLY` → the builder **extracts** measured values from the
  pointed-to sources (its half of the frontier). Owner-provided values (declared Pantone, `authored-print`)
  are truth, written `source:"authored"` (never re-derived); `intent` seeds per-atom meaning.
- `HOW (grammar)` + `generative-rule seeds (if/then)` → seed `G-*`/`ALGO-*` with stable IDs.
  `CORE-ASSET FIDELITY CONTRACT` → drives the fidelity gate (§4.7). `GAPS (client-language)` → the builder
  owns formalization into `GAP-NNN` (two-ledger). `OPTIONAL` (incl. `Claude Design library: default YES`) →
  §4.6.

**Material-placement convention (D2, reconciled builder-side).** Document, in `SKILL.md` and `analyze.md`,
that material is read from **`assets/`** (binaries: marks, fonts, imagery) and **`sources/`** (references:
brandbook PDFs, exports). Stage 1 creates both directories.

### §4.2 Mode reconciliation (F-024)

Replace `Step 0` greenfield/brownfield detection with **read `MODE`** (default ANALYZE if a direct-to-Code
run has published material). Rename the two reference files so they stop reasserting the retired dichotomy:

- `references/brownfield.md` → **`references/analyze.md`** — the ANALYZE default: inventory sources, harvest
  decisions (meaning→ESSENCE, atoms→PRIMITIVES/tokens, rules→GRAMMAR), harvest applied design (§4.5),
  reconcile precedence, harvest-before-remove (brand-scrub gated). The existing brownfield logic **plus** the
  applied-design harvest it lacked (F-021).
- `references/greenfield.md` → **`references/create.md`** — the CREATE exception: author from the ratified
  handoff WHY (not a fresh interview). "Elicit in four-question order" → "consume the handoff in
  four-question order".

The acquisition/font/prototype/kit stages (§4.3–§4.6) are **mode-independent** — they run in both — so they
live in `SKILL.md` + their own references, not inside analyze/create.

### §4.3 Source-agnostic asset acquisition (F-018·021) — BLOCKING for core assets

**Governing law (medium-agnostic).** The canon's slots define what is **NEEDED**; open discovery of whatever
the brand has, in **any form or combination**, defines what **EXISTS**; the delta is a tracked **GAP** with a
fidelity grade. **Never assume any single source type is present.** The extraction technique is selected per
source-type encountered — never assumed to be a PDF. (This replaces v1.0's PDF-centric framing; it mirrors
the scoper's medium-agnostic principle on the builder's extraction side.)

**Acquisition matrix — per source-type (if present), the verified technique and fidelity ceiling:**

| Source (if it exists) | Technique / tool (VERIFIED unless noted) | Typical fidelity |
|---|---|---|
| Existing **DTCG / token files / design system** (Tailwind config, CSS vars, Figma variables) | ingest **directly** to the DTCG spine (Style Dictionary custom formats; Tokens Studio / `token-transformer` for Figma); CSS vars map 1:1 | **highest** — read, don't re-sample |
| **Drive / repo** vector masters | SVG used directly; **AI** via `opendesigndev/illustrator-parser-pdfcpu` (Node/WASM, no Illustrator license, preserves spot/CMYK) or Ghostscript `-sDEVICE=eps2write`; EPS/PDF via Inkscape | high when masters present |
| **Live website(s)** | headless computed-style extractor: **Dembrandt** `--dtcg` (W3C DTCG out, OKLCH, MCP, Drift baseline) primary; **designlang/design-extract** for breadth (DTCG+Tailwind+CSS+Figma+inline SVGs+font sources); **Firecrawl** `branding` (logo as inline SVG data-URI) as JS-render/bot-protected fallback; download actual `@font-face` files from CSS `src:url()` | medium-high — real SVG/fonts/colors |
| Brandbook **PDF** | **PyMuPDF**: `get_drawings()` (vector paths→`Shape`), font extraction, `get_images()` (raster only). **Inkscape** `--pdf-poppler --export-text-to-path --export-area-drawing` or **pdf2svg** for vector masters | medium — vector only if embedded as paths |
| **Design-tool exports** (Figma/Canva) | Figma variables/styles → DTCG (Tokens Studio); Canva export ≈ brandbook PDF | high (Figma) / low (Canva) |
| **Social media** | observe applied aesthetic + grab downloadable avatar/imagery (best-effort; anti-scraping/rate-limits) | low — reference, not master |
| **Nothing / a stray logo** | vectorize/clean the one mark; derive an OKLCH palette from it; pick an OFL stand-in face; emit a small valid DTCG spine; everything else = GAP (CREATE only on instruction) | n/a |

**Fidelity ceilings (VERIFIED — design into the GAP logic):** `get_drawings()` cannot determine which paths
form one logical figure (a logo may be hundreds of disjoint paths); `get_images()` misses vector-drawn marks
entirely; Inkscape on a flattened-image PDF yields a lossless **raster** copy, not a vector master; computed-
style extractors sample **one viewport** (run several for the responsive curve). A core slot whose best
available source is raster-only **cannot be rebuilt to a master** → fidelity GAP.

**Cross-source assembly & precedence (INFERRING — policy).** For each canon slot, assemble the best-fidelity
asset across all present sources, applying precedence: (1) owner-declared authored print/Pantone > sampled;
(2) shipped repo / current site treatment > old brandbook for *current* treatment; (3) vector master >
raster; (4) existing DTCG/token file > computed-style extraction > PDF sampling > social. Reconcile by
recency + source authority; where two authoritative sources disagree (brandbook Pantone vs site hex), record
both — authored print canonical for print, sampled for screen — and flag the conflict. The slot-need-vs-
source-exists delta is a per-slot fidelity GAP ("logo: raster-only, vector master MISSING").

**Frontier:** the builder extracts measured/derived values; it never re-elicits intent. `Wappalyzer`/
`BuiltWith` detect *presence* of font services/frameworks, not token values — use only to route extraction.

### §4.4 Font acquisition (F-019) — BLOCKING for core type

Acquire the brand's **actual** typefaces across every source path: extract embedded fonts from a source PDF
(PyMuPDF); download the actual `@font-face` files from a live site's CSS; read font files in a Drive/repo;
acquire open/libre faces via **Fontsource** (NPM + REST) or **google-webfonts-helper**. Subset/recompress
via `fonttools`/`woff2`.

**Licensing boundary (the hard rule, VERIFIED):**
- Self-host only **OFL / Apache / Ubuntu**-licensed or **owner-supplied** fonts; ship the license text
  (`OFL.txt`).
- **SIL OFL 1.1 nuance:** format-conversion and subsetting count as **"modification"**, which triggers the
  **Reserved-Font-Name rename** requirement *if the face declares an RFN*. When the builder subsets/recompresses
  a self-hosted RFN font, it must rename the in-repo family accordingly.
- **Unlicensed commercial fonts must NEVER be embedded or pirated** → a **MUST-HAVE fidelity GAP** with a
  foundry/purchase pointer unless the owner supplied licensed files.
- **No automated "is this commercial?" classifier exists** → **deny-by-default**: self-host only when an
  SPDX/OFL marker or an owner attestation is present.

### §4.5 Applied-design harvest (F-021)

The scoper points at live consumers (site, social) flagged as bidirectional design-intent; the builder
**harvests** their applied design (v1 harvested facts but ignored design). Observe and promote (abstracted to
universal, stripped of stack/medium): layout/composition patterns, imagery/photography direction (lighting,
tone, framing, what is avoided), type-in-use vs declared, the lived aesthetic. Feed GRAMMAR (rules) and
ESSENCE (meaning); capture measurable atoms into tokens. Where lived expression diverges from the ratified
WHY, log the divergence — never silently overwrite. Never fabricate.

### §4.6 Real prototype + `/design-sync`-ready kit, by default (F-025·026) — BLOCKING (prototype)

Two distinct deliverables, both real:

**(a) The presentable prototype (F-025) — deterministic, no toolchain.** A **self-contained HTML** file:
inline CSS from the OKLCH token values, the real extracted mark as inline SVG/data-URI, acquired fonts via
`@font-face`/data-URI, harvested imagery — rendering the brand on real surfaces (hero, card, control set,
type spread, color blocks). One file the builder writes directly; the artifact you show a client and that
sells the service, and the §4.7 "render real samples" evidence.

**(b) The `/design-sync`-ready component library (F-026) — per the VERIFIED converter contract.** Upgrade the
Claude Design adapter from optional to **DEFAULT** (`OPTIONAL.Claude Design = YES` unless explicit owner
opt-out). The verified facts the builder must satisfy:

- **`/design-sync` ingests a compiled `dist/`, not source.** The converter runs `package-build.mjs --entry
  ./dist/index.es.js` (or the package `module`/`main`/`exports['.']`); a missing entry is `[NO_DIST]` and it
  instructs you to run the build first. So the builder scaffolds component **source + a one-command build**
  (`tsup`/`vite build`/`rollup`/`tsc`) that emits `dist/` with a `.d.ts` tree. The build may run at
  `/design-sync` time or best-effort by the builder if a Node toolchain is present — **never a hard-fail
  dependency** (the prototype (a) is the deterministic fidelity artifact; the dist is one command away).
- **Default = package-shape**, not Storybook-shape. Package-shape needs **no Storybook**: the component list
  comes from the shipped `.d.ts` exports, unscoped components get an honest **floor card** ("preview not yet
  authored"), and rich per-component previews are authored in `.design-sync/previews/<Name>.tsx` only for
  scoped components. Build deps are just `esbuild` + `ts-morph` + `@types/react`. **Escalate to Storybook-
  shape only if the brand already has a Storybook + Playwright** (gains a pixel-match fidelity oracle).
- **`.design-sync/config.json`** requires at minimum `pkg` + `globalName`; `buildCmd`, `cssEntry`,
  `tokensPkg`, `extraFonts`, `provider`, `overrides`, `dtsPropsFor` accumulate fixes across re-syncs and are
  committed under `.design-sync/`.
- **The upload bundle shape** (the converter writes it; the builder makes it producible): top-level
  `components/`, `tokens/`, `fonts/`, `_ds_bundle.js`, `styles.css`, `README.md` (self-check minimum).
  **`styles.css` is the import-closure** the rendered designs receive: it must `@import "./_ds_bundle.css"`
  (the compiled component CSS) and carry the token + `@font-face` closure (`[CSS_BUNDLE_UNREACHABLE]`,
  `[TOKENS_MISSING]`, `[FONT_MISSING]` are the converter's errors). `@types/react` must be present or `.d.ts`
  props resolve to `any`.
- **Ecosystem gap (VERIFIED):** no existing tool compiles a `/design-sync`-ready package from a brand canon
  kit — Dembrandt/designlang *extract* tokens, the sibling `web-stack-skills` builds *sites*, `/design-sync`
  *consumes* a finished package. The builder fills this gap; that is the net-new work.
- **Source caveat (UNCERTAIN provenance):** the converter contract above is reconstructed from the
  **Piebald-AI/claude-code-system-prompts** community mirror of Claude Code's bundled skill files (against
  `ccVersion 2.1.176`), not an officially published Anthropic doc. *(Update 2026-06-22 — core contract now corroborated post-GA; the live check at PR-B3 start is scoped to exact field/script names, not the whole contract. See “Verification update” below.)*

**Verification update — 2026-06-22 (post-GA).** `/design-sync` shipped publicly on **2026-06-17** (the Anthropic
Claude Design overhaul; documented in `support.claude.com`). The §4.6 contract above was re-verified against
fresh sources — the bundled skill files themselves (`skill-design-sync-storybook-source-shape`, the
`/design-sync package source shape` skill) plus official help docs and a direct third-party sync run:

- **CORROBORATED (core contract holds).** The converter bundles the package's **compiled `dist/`** into
  `_ds_bundle.js` — *"the same bundle the claude.ai/design agent builds with"* (compiled, not source);
  **package-shape "from a built package without Storybook"** is a real, distinct shape (the D-B8 default is
  valid); **`.design-sync/config.json`** + the converter scripts + the `pkg`/`globalName` bundle-redirect; the
  **plan/`planId` approval gate**, incremental one-component-at-a-time writes, and **256-file-per-call**
  upload batches (the tool also enforces a server payload-byte cap with no fixed figure — batch binary-heavy
  dirs smaller and halve the chunk on a 500; the earlier "256 KiB" figure was not in the live skill and is
  withdrawn).
- **DELTA-1 — card index is now from a marker, not explicit registration.** The Design System pane builds its
  card index from each preview's **first-line `<!-- @dsCard group="…" -->` comment**, compiled into
  **`_ds_manifest.json`** by the app's self-check; `register_assets`/`unregister_assets` are **legacy** (only
  for hand-authored projects without `@dsCard` markers). **PR-B3's emitter must stamp every preview with a
  `@dsCard` first-line marker**, not rely on registration.
- **DELTA-2 — a conventions/README header is now a first-class step.** The package-shape config **added** a
  **`readmeHeader`** path (a repo-committed file prepended verbatim to the generated README — the
  conventions-header slot), and the workflow added an **"Author the conventions header"** step before upload
  (distilled into `.design-sync/conventions.md`, wired via `readmeHeader`). The kit should emit a conventions
  header as part of the bundle, referenced by `readmeHeader`. *(Correction, 2026-06-22 live-pin: this is an
  **addition, not a replacement** — `guidelinesGlob` remains a separate, still-present field for design-guideline
  `.md` files copied into `guidelines/`; the two coexist in v2.1.185.)*
- **VERSION-SPECIFIC (confirm live — narrowed, not the whole contract).** Exact field names and the precise
  converter invocation (`package-build.mjs` vs `.ds-sync/lib/preview-rebuild.mjs`; the full config schema) are
  evolving release-to-release (the skill recently added stable-hash grading, grade carry-forward, remote
  sidecar diffs, targeted rebuilds, upload partitioning). **PR-B3 step 0 = in an updated Claude Code session
  (`/update`), read the live bundled `/design-sync package source shape` skill and pin the current
  field/script names** before generating the emitter. The Piebald mirror is accurate but lags releases by
  minutes-to-days, and the schema is actively growing (`readmeHeader` was a recent addition alongside the
  existing `guidelinesGlob`).

**LIVE-PIN — 2026-06-22, against the on-disk skill in Claude Code `v2.1.185`** (newer than the Piebald
mirror's `ccVersion 2.1.176`; read directly from the bundled `/design-sync package source shape` skill). The
core contract is confirmed; pin these exact names for PR-B3:

- **`.design-sync/config.json` fields (live):** required `pkg`, `globalName` (auto-derived from `pkg` when
  omitted); plus `projectId`, `shape` (`'storybook'|'package'`), `buildCmd`, `srcDir`, `tsconfig`,
  `extraEntries`, `componentSrcMap`, `dtsPropsFor`, `cssEntry`, `tokensPkg`, `tokensGlob`, `docsDir`,
  `docsMap`, `readmeHeader`, `guidelinesGlob`, `extraFonts`, `runtimeFontPrefixes`, `replaces`,
  `libOverrides`, `provider`. Unknown/removed keys fail the run with a named fix (no compat code) — so the
  builder's emitted config must track the live schema.
- **Converter scripts (live, staged into `.ds-sync/`):** `package-build.mjs`, `package-validate.mjs`,
  `package-capture.mjs`, `resync.mjs` (the one-command re-sync driver), `lib/preview-rebuild.mjs`
  (component-scoped rebuild), `storybook/http-serve.mjs` (serves `.review.html`). Build invocation:
  `node .ds-sync/package-build.mjs --config .design-sync/config.json --node-modules <nm> --entry
  ./dist/index.es.js --out ./ds-bundle`, then `node .ds-sync/package-validate.mjs ./ds-bundle`. Converter
  deps: `esbuild ts-morph @types/react`.
- **`@dsCard` marker (live, exact):** each `<Name>.html`'s first line is `<!-- @dsCard group="…" -->`; a
  missing/misplaced header is `[DSCARD_MISSING]`. The server self-check reads it on project open to register
  cards and regenerates the adherence config + `ds_manifest` from the uploaded source (the manifest is
  server-regenerated, not shipped — the earlier `_ds_manifest.json` naming was approximate).
- **Upload bundle (live, root-level):** `_ds_bundle.js`, `_ds_bundle.css`, `styles.css`, `components/`,
  `tokens/`, `fonts/`, `README.md`, `_ds_sync.json`, `_ds_needs_recompile`, plus `_vendor/`, `_preview/`,
  `guidelines/`. `styles.css` must `@import "./_ds_bundle.css"` (its import closure is all a built design
  receives). Upload sequence via the `DesignSync` MCP tool: `finalize_plan` (interactive approval) →
  sentinel `_ds_needs_recompile` first → content `write_files` (≤256/call) → `delete_files` →
  sentinel re-arm → `_ds_sync.json` **last**. Error codes confirmed: `[NO_DIST]`, `[CSS_BUNDLE_UNREACHABLE]`,
  `[TOKENS_MISSING]`, `[FONT_MISSING]` (plus many more, e.g. `[DSCARD_MISSING]`, `[RENDER]`, `[ZERO_MATCH]`).
- **Caveat that survives the pin:** the base `/design-sync` command "always fetches the live Claude Design
  instructions via `get_claude_design_prompt` rather than shipping a vendored copy" — so the authoritative
  contract is server-side and version-fluid. This LIVE-PIN is the on-disk skill at one moment; PR-B3 step 0
  still re-reads the live skill in an updated session before freezing the emitter.

### §4.7 Fidelity gate + VALIDATE/AUDIT stage (F-016·022) — BLOCKING

v1 ended at "canon built" and rewarded rule-compliance over fidelity. Add a real final stage consuming the
scoper's `CORE-ASSET FIDELITY CONTRACT`:

- **Fidelity gate (layered-threshold VRT, VERIFIED stack).** Visual regression via **Storybook + Chromatic**
  (default; free 5k snapshots/mo), with **Percy** or **BackstopJS** (free OSS) as alternatives. **Layered
  thresholding: zero tolerance on brand-defining elements (logos, primary color tokens); higher tolerance on
  gradients/illustration.** Per-component-variant baselines; **per-brand baselines** for the clone-per-brand
  model. A **missing or low-fidelity CORE asset FAILS the build** — not "pass with gaps." Non-core gaps still
  log (Lego holds).
- **Leverage `/design-sync`'s own gates** (the kit ships them): `[FONT_MISSING]` (must-resolve — the one
  defect the render check can't self-detect), `[RENDER_BLANK]`/`[RENDER_THIN]` (hollow previews fixed within
  iterations), `package-validate.mjs` exiting 0, and the absolute **Styled / Complete / Plausible** grade per
  in-scope component.
- **Content audit:** rule-by-rule audit of all written and visual content (authored + generated) against the
  GRAMMAR rules and ESSENCE/voice.
- **Render real samples:** the §4.6(a) prototype is the evidence.
- **Existing checks retained:** output-agnostic grep, DTCG validity (alias graph resolves), universality
  stress test.
- **Client-confirmation = a human gate, not self-certification (D-B6).** The kit's `.review.html` (iframes
  every preview card, served locally) is the built-in human-review surface. The builder assembles the audit +
  samples + open ratification GAPs into the PR and **stops**; sign-off is human PR review; never auto-confirm,
  never auto-stamp "Ratified by…" (F-014).

### §4.8 Client-clean / scrub (F-013·014·015) — BLOCKING

The produced **client** repo must be clean of all build apparatus: strip method-reference-brand bleed
(F-013); the client `README.md`/`RESIDENT.md` must not credit the build tool or skill (F-015); remove
`{{PLACEHOLDER}}` leftovers and scaffolding chatter; never auto-write a "Ratified by…" stamp — ratification
is stamped only on real owner sign-off (F-014). Default state is unratified-pending.

## §5 — Laws & boundaries

### §5.1 The scoper/builder frontier (builder side)

| The builder MUST | The builder MUST NOT |
|---|---|
| Extract measured/derived primitive values from the pointed-to sources | Re-elicit or re-infer the WHY (the scoper elicited + ratified it) |
| Take owner-provided values (declared Pantone, `authored-print`) as truth, `source:"authored"` | Re-derive an authored print value from OKLCH |
| Formalize the handoff's client-language gaps into `GAP-NNN` | Invent brand truth, or silently pass a missing core asset |
| Harvest applied design from the live consumers the scoper pointed at | Decide an `UNRESOLVED CONFLICT` itself (that is an open GAP) |
| Read material only from the in-repo `assets/`/`sources/` (+ pointed live URLs) | Read from Project knowledge or a tree the manifest didn't place |

### §5.2 Canon = skeleton, prototype + library = deliverable

State as law in `SKILL.md` and `architecture.md`: the four-layer canon is the **source skeleton**; the
**deliverable** is the real, presentable prototype + the `/design-sync`-ready library projected from it.
Rule-compliance of an asset-less skeleton is **not** done.

### §5.3 Preserve the do-not-regress invariants

Everything in §1's invariant table is a **regression check** for the rewrite. The reframe adds the asset/
prototype/fidelity layer on top; it must not weaken output-agnosticism, the generative model, dual
legibility, the DTCG/OKLCH spine, the Lego property, the universality test, brand-scrub, or rule-ID citation.

### §5.4 Distribution / install / deps (WS4 / F-001·011)

Repo-meta, not just `SKILL.md`:

- **Scoper availability (F-001):** installing the Code plugin does not make the Chat-side scoper available in
  claude.ai. Document this in the marketplace `README.md` and **publish a zip ready for claude.ai upload** of
  the scoper skill.
- **Builder install path (F-011):** validate the Code install path. Declare the dependencies and their cost/
  license posture:
  - **PDF/vector:** PyMuPDF (AGPL/commercial dual-license — note for a tool), poppler/`pdf2svg`, Inkscape,
    `illustrator-parser-pdfcpu`, Ghostscript.
  - **Website extraction:** Dembrandt / designlang (OSS, Playwright), Firecrawl (credit-priced; `branding`
    1 credit, JSON +4, stealth +4; free 500 one-time credits).
  - **Kit build:** `esbuild` + `ts-morph` + `@types/react` (package-shape); `tsup`/`vite`.
  - **Fidelity:** Chromatic (free 5k/mo, paid from ~$149/mo) / Percy (free 5k/mo) / BackstopJS (free).
- **Version pinning (VERIFIED — mandatory):** DTCG format **2025.10 is not yet fully supported** in Style
  Dictionary v5 (work-in-progress, style-dictionary issue #1590). **Pin Style Dictionary and the DTCG draft
  version**; re-test on upgrade. Use SD v5's `color/oklch` transform (14 color spaces, hex fallback) — never
  `color/css`.
- **Manifests:** keep `.claude-plugin/marketplace.json` + `plugin.json` consistent with new references/templates.

## §6 — Acceptance map + staged PR plan

**Finding → file change:**

| Finding | Where it lands |
|---|---|
| F-024 (mode) | `SKILL.md` Step 0/2 → ANALYZE/CREATE; rename `brownfield.md`→`analyze.md`, `greenfield.md`→`create.md`; `architecture.md` skeleton-vs-deliverable note |
| F-003/006/007/008 (handoff bridge) | `SKILL.md` Stage 0 handoff parse; `assets/`+`sources/` read convention (D2) |
| F-018/021 (acquisition) | new `references/asset-acquisition.md` (the source-agnostic matrix + ceilings + precedence); `analyze.md` applied-design harvest; `SKILL.md` Stages 3 & 5; deps |
| F-019 (fonts) | new `references/font-acquisition.md` (multi-source + OFL/RFN/deny-by-default); `SKILL.md` Stage 4 |
| F-025/026 (prototype + kit) | new `references/design-sync-kit.md` (converter contract, package-shape, bundle shape, build); `claude-design-adapter.md` optional→default; new prototype + package-shape kit + `.design-sync/config.json` templates under `assets/templates/`; `SKILL.md` Stage 8 |
| F-016/022 (validate/audit + fidelity) | new `references/validate-audit.md` (layered-threshold VRT + `/design-sync` gates); `SKILL.md` Stage 10; consume `CORE-ASSET FIDELITY CONTRACT` |
| F-013/014/015 (client-clean) | new `references/client-clean.md`; scrub `assets/templates/docs/*`; `SKILL.md` Stage 11 |
| F-001/011 (distribution) | marketplace `README.md`, `plugin.json`, dependency + version-pin docs, scoper zip |
| do-not-regress set | regression checks across all of the above |

**Staged PRs (dependency order):**

| PR | Scope | Model |
|---|---|---|
| PR-B1 | Mode + handoff reconciliation: `SKILL.md` Step 0/2, rename analyze/create, D2 convention, architecture note | Opus (method) |
| PR-B2 | Source-agnostic asset acquisition (F-018/021) + font acquisition (F-019): `asset-acquisition.md` + `font-acquisition.md` + SKILL Stages 3-5 + deps | Opus + scaffolding |
| PR-B3 | Prototype + `/design-sync`-ready kit (F-025/026): `design-sync-kit.md` + package-shape templates + `.design-sync/config.json` + adapter default + HTML prototype template (**after re-verifying the live `/design-sync` contract**) | Opus + scaffolding |
| PR-B4 | Validate/audit (F-016) + fidelity gates (F-022): `validate-audit.md` + SKILL Stage 10 + contract consumption | Opus (method) |
| PR-B5 | Client-clean/scrub (F-013/014/015): `client-clean.md` + docs-template scrub + ratification gate | Opus (method) |
| PR-B6 | Distribution/install/deps (F-001/011): marketplace README, manifests, version-pin docs, scoper zip | cheap/fast tier |

Each PR independently reviewable; PR-B1 is the spine everything else builds on. PR-B3 is gated on re-verifying
the `/design-sync` contract against the live skill (the Piebald-mirror caveat).

## §7 — Decisions (resolved)

Resolved with operator judgment; rationale one line each. Round-B grounding noted.

- **D-B1 — where the component library is compiled:** *Refined hybrid, CONFIRMED by the verified contract.*
  Builder emits a self-contained HTML prototype (F-025, deterministic) **and** a compiled-`dist/`-ready
  package (F-026) whose build is one command (run at `/design-sync` time or best-effort by the builder, never
  hard-fail). Grounded: `/design-sync` ingests a compiled `dist/`, not source; no tool compiles such a
  package from a canon kit, so the builder fills the gap.
- **D-B8 — kit shape:** *Default package-shape* (no Storybook; deps `esbuild`+`ts-morph`+`@types/react`;
  floor cards for unscoped components; rich previews authored per scoped component). Escalate to Storybook-
  shape only when the brand already ships Storybook + Playwright (pixel-match oracle).
- **D-B2 — how much prototype:** the self-contained presentable prototype only; not the owner's production app.
- **D-B3 — font legal boundary:** acquire only open/licensed or owner-supplied; subsetting/conversion = OFL
  "modification" → rename on RFN; unlicensed commercial = MUST-HAVE GAP; deny-by-default (no auto-classifier).
- **D-B4 — acquisition toolchain:** source-agnostic matrix (§4.3) — existing tokens > repo masters > website
  extraction (Dembrandt/designlang/Firecrawl) > PDF (PyMuPDF/Inkscape) > social; per-source fidelity ceilings;
  precedence assembly. (Reframed from the v1.0 "PDF toolchain" to kill the determinism.)
- **D-B5 — reference files:** rename `brownfield.md`→`analyze.md`, `greenfield.md`→`create.md`.
- **D-B6 — client-confirmation:** Code-side produces the auditable evidence (incl. the kit's `.review.html`)
  + PR + open ratification GAPs and stops; sign-off is a human PR gate; no auto-stamp.
- **D-B7 — staging:** six PRs in dependency order (§6); PR-B1 first; PR-B3 gated on contract re-verification.
- **Version-pin (VERIFIED):** pin Style Dictionary v5 + DTCG draft (2025.10 partial, issue #1590).

**Residual open items:** re-verify the exact `/design-sync` field/script names against the live skill at PR-B3 start (core contract
corroborated 2026-06-22, §4.6; Piebald-mirror lags releases); whether the prototype's surface set should be parameterized per
brand (default: the fixed five).

## §8 — Provenance

Grounded in: the v1 real-run findings (`dev/v2-backlog.md` F-001…F-026) and `RESIDENT.md › ## v2`; the merged
scoper handoff contract + intake spec (`dev/v2-intake-spec.md`); the builder's current `SKILL.md` + references;
the intake-spec research round (Brand Key/Keller/Aaker/Neumeier/Wheeler; W3C/DTCG 2025.10 + OKLCH; Lahdelma/
Rythm); a direct read of `ccediland/web-stack-skills` (builds sites, not `/design-sync` libraries); and
**Research Round B** (this v1.1), whose primary sources include the Piebald-AI/claude-code-system-prompts
mirror of Claude Code's bundled `/design-sync` skill files (converter contract, package/Storybook source
shapes — UNCERTAIN provenance, re-verify), PyMuPDF / Inkscape / pdf2svg docs, Dembrandt / designlang /
Firecrawl, `illustrator-parser-pdfcpu`, Fontsource + SIL OFL 1.1 (TLDRLegal/FOSSA), Style Dictionary v5 DTCG
docs + issue #1590, DTCG Color Module 2025.10, and Chromatic/Percy/BackstopJS. Claude Design launched
2026-04-17; two-way `/design-sync` shipped 2026-06-17; contract documented against `ccVersion 2.1.176`.
