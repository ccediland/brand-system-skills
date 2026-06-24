# brand-system-skills — CLAUDE.md (agent ops & guardrails)

> A Claude Code plugin marketplace whose skills build a generic, brand-agnostic, output-agnostic **brand
> canon** (four layers + DTCG/OKLCH token spine) for any brand. This repo is the SKILL/tooling — not a
> brand canon itself. Read `RESIDENT.md` first, then this file.

## Repo map
- `.claude-plugin/marketplace.json` · `plugin.json` — marketplace + plugin manifests (mirror `web-stack-skills`).
- `skills/brand-canon-builder/` — Code-side builder: `SKILL.md`, `references/` (the method knowledge),
  `assets/templates/` (the canon skeletons + DTCG token spine + satellites + docs + prototype + design-sync
  kit + Claude Design adapter + `tools/` — emitted gates `audit-lint.mjs` · `source-recover.py`, with
  `tools/fixtures/` the gate's own clean + seeded-violation acceptance proof, not emitted to clients).
- `skills/brand-canon-scoper/` — Chat-side scoper: `SKILL.md` + `references/` (`handoff-format.md`,
  `elicitation-bank.md`, `detection-batteries.md` — the interview bank + detection batteries externalized at SH-1).
- `README.md` (human front door) · `RESIDENT.md` (living architecture, decisions, Open Items).
- `v3-execution-plan.md` (root) — the v3 execution plan (detailed gated phases + session log).
- `v3-research-foundation.md` (root) — the frozen v3 research (resolved methods, boundaries, sources); the build phases draw from it.

## How the skills work (one line each)
- **brand-canon-builder** — scaffold the canon → fill what the brand's material/brief supports → log the
  rest as tracked `GAP-NNN` → emit the DTCG/OKLCH token spine → render the Stage-8 prototype as the **complete
  interactive brandbook** (manifest sections + "Decisions for you" panel, RV-5) → attach the Claude Design
  adapter (default ON) → validate.
- **brand-canon-scoper** — in chat (no filesystem), interview + emit the **client-surface flow** (one
  instrument, three checkpoints: gate 3.5 intake → gate 6 review → gate 7a Final Brand Brief, the BLOCKING
  client approval) → compile one ready-to-paste 7b handoff block for the builder, only after sign-off.

## Tooling — emitted gates (run from the EMITTED client repo root)
The builder copies `assets/templates/tools/` into every emitted repo as `tools/` (Stage 1; never `tools/fixtures/`):
- **`node tools/audit-lint.mjs`** — the BLOCKING Stage-10 **provenance, completeness & reconciliation gate**
  (MT-1/3/4/5 + SC-1 + RV-5; rules R0–R8). Exits 1 on any violation, writing `audit/lint/report.md`. Reads `tokens/*.json`,
  `canon/*.md` + `canon/canon.json`, `RESIDENT.md`, `CHECKSUMS.txt`, and (for R6) `satellites/projections.md`,
  `canon/mark.svg`, and the generated `.html`/`.css` artifacts. Zero-dep Node. Self-test from THIS repo:
  `node skills/brand-canon-builder/assets/templates/tools/audit-lint.mjs skills/brand-canon-builder/assets/templates/tools/fixtures/clean`
  (exit 0) and `…/fixtures/seeded-violation` (exit 1).
  - **R0–R5 (MT-3/4/5)** — provenance & completeness (each value token's provenance block on closed enums;
    corroborated ⇒ ≥2 distinct hashed sources; inferred/matched ⇒ hypothesis; path-bound sha256; value→token/GAP;
    one GAP back-ref). See `references/validate-audit.md` §5a.
  - **R6 (MT-1) — cross-artifact reconciliation / drift.** **R6a** every `derived` projection in
    `satellites/projections.md` consumes only aliases that resolve in the spine, and any pinned value byte-equals
    the spine-resolved value — **both sides routed through one canonical serializer (`serializeValue`, C-1) so a
    structured-OKLCH `$value` reconciles against a pinned `oklch(L C H)` / `oklch(L C H / a)` form; never
    `String(object)`** (drift FAILS); `source: authored` rows are truth and are **skipped** (the authored
    carve-out). **R6b** the protected mark geometry is single-sourced from **`canon/mark.svg`** — each rendered
    instance (prototype `#brand-mark`, kit `Mark.tsx`) must be byte-equal to it; a brand with **no visual mark
    and no rendered instance is N/A → PASS** (medium-agnostic — never a false fail on a sonic/verbal brand).
    **R6c** every local `@import`/`url()`/`href`/`src` in a generated artifact resolves to an existing file.
    `canon/mark.svg` is the ONE renderable mark source; `canon.json`/PRIMITIVES § Mark stay metadata-only. The
    projection registry's `consumes`/`source` columns are the machine linkage R6a reads.
  - **R8 (RV-5, Stage D)** — prototype completeness: every present canon section → a `data-canon-section`
    brandbook surface OR an open GAP. Reads present sections by machine signal (never a fixed checklist —
    flat/monogram/sonic/non-visual pass clean); markers inside HTML comments / inert `<template>` are stripped
    before the scan; no `.html` is a vacuous PASS. See `references/validate-audit.md` §5a.
- **`python tools/source-recover.py <url> [--from --to]`** — MT-3 **archived-source recovery**: Wayback CDX +
  raw `id_` fetch, occupant disambiguation, SHA-256 → `sources/MANIFEST.json`. Identity/date verification is an
  AGENT step (Stage 3), not the script's. Dep: `requests`.
- **`python tools/fidelity-diff.py --treatment <id> --source <src.png> --reproduction <render.png>`** — MT-2 the
  **measured reproduction-fidelity gate** (the §7a verdict; build-time, not a runtime/client dep). Co-registers
  the reproduction onto the **Stage-5 source capture** (ORB+RANSAC) and computes **ΔE2000** + **SSIM/pixelmatch**
  (+ **fontTools** glyph metrics for type). Verdict vs the §2 tiers (ΔE2000 ≤ 2.0 default, ≤ 1.0 core colour;
  loosening RAISES the bound, never waives it) → `within-tolerance` (exit 0) / `outside-tolerance` (exit 1; with
  `--gap` a declared tracked GAP passes) / non-visual carrier `--medium non-visual` → declared GAP (exit 0).
  Writes **`audit/fidelity/<treatment-id>/scores.json`** (numeric scores + thresholds + verdict — re-auditable
  WITHOUT cv2) + a `diff.png` heatmap. It measures against the SOURCE capture — **not a pixel-VRT** (§3a). Deps
  (numpy, opencv-python-headless, scikit-image, pillow; fontTools for `--font`) are **import-guarded**: missing →
  a clear `pip install …` + exit 3, never a stack trace; the non-visual path needs none of them. Self-test
  fixtures + generator: `tools/fixtures/fidelity/` (`gen.py` → source/within/within_shift/mid/out `.png`).
- **`node tools/scheme-derive.mjs [repo-root]`** — SC-1 the **ALGO-SCHEME-DERIVE materializer** (Stage C-2;
  build-time, zero-dep Node, **NOT Style Dictionary**). Reads `canon/canon.json › schemes` + `tokens/base.json`
  + `tokens/semantic.json` (role→anchor); for each NON-deferred scheme derives the semantic colour roles in
  OKLCH by `{mode, dominant}` (light=identity · dark=invert-L on neutrals + lift non-dominant chromatic ·
  contrast=push neutrals to the L extreme; C/H preserved, hex via in-process OKLCH→sRGB) and writes
  `tokens/schemes/<id>.json` — every token a structured-OKLCH object tagged **`$extensions.brand.scheme:"<id>"`**,
  entering at `confidence:"hypothesis"` + the scheme's tracking GAP. A `status:"deferred"` scheme emits no set
  (carries a GAP). **audit-lint R7** (loaded from `tokens/schemes/*.json` too) fails any named scheme without a
  COMPLETE set (role-key parity with the default) or a deferred+GAP; single-scheme/flat brands pass clean.

## Standing guardrails (apply when editing THIS repo's templates/skills)
- **Brand-agnostic + output-agnostic, always.** The templates must contain zero real brand specifics and no
  output/medium-named sections. Before committing changes to the templates/skills, grep the tracked tree for
  any real brand name, ink, or token value that may have crept in — it must be 0 hits (a standing pre-commit
  gate). This covers `.gitignore`, configs, and every dotfile too: a brand-scrub *pattern* must generalize
  (`**/brandbook*.pdf`), never name a brand (the M2 leak hid in `.gitignore`). Example/illustrative token
  values must be obviously generic (never a real brand's exact OKLCH/hex/Pantone).
- **Token contract is load-bearing.** Keep the DTCG token templates valid and projecting cleanly into
  downstream consumers: OKLCH literal in `$value`; plain-string values; `{tier.category.name}` aliases;
  category names on the namespace convention (a single-value category projects a bare `--<prefix>` singleton,
  e.g. one radius → `--radius`; a multi-value one projects `--<prefix>-<name>`); `source:"authored"|"derived"`
  on extension color spaces. See `skills/brand-canon-builder/references/token-spine.md`.
- **Generative over catalog.** Never add a per-output section to a template; absorb the need as a rule.
- **Install integrity (Theme 2).** A shipped file must point at zero unshipped paths — never cite `dev/`
  (gitignored) from `skills/`; if a method lives only in `dev/`, harvest it into the shipped reference that owns
  that stage. Client-emitted templates (`canon.json`, the kit, docs templates) must carry no tool-repo URL/org
  (`brand-system-skills`/`ccediland`) — the Stage-11 client-clean grep depends on it. The `.design-sync` config
  is single-sourced in the kit (`design-sync-kit/.design-sync/config.json`); the adapter references it, never a
  duplicate. No gate (validate-audit.md) may name an artifact that isn't shipped or honestly attributed — the kit
  ships a real offline `package-validate.mjs`.
- **Epistemic honesty (Stage E — EH-1/EH-2/EH-3).** Scoper: an **EH self-check (BLOCKING, gate-7a precondition)**
  holds that owner-meaning fields (personality / differential / resonance / intended meaning) and named
  regulatory instruments resolve to `owner-stated`(cited) / owner-declared `none` / GAP — never scoper-derived,
  never memory-asserted, never above `hypothesis` without ratification (EH-1/EH-2); the `regulatory:` carrier is
  owner-stated-cited-or-GAP. Builder: `validate-audit.md §7b` makes the regulated trigger inherit **MUST-HAVE**
  to the enabling regulatory GAP (gated — `regulatory: none` forces nothing; no new `BLOCKING` severity), binds
  the keystone §5 regulated-claim constraints + refusal policy to that cited `regulatory:` carrier (or GAP, never
  memory-recalled), and adds visual-guardrail + over-refusal axes to the red-team battery (EH-3). **R9 — the
  EXECUTABLE posture→GAP-severity gate (a `posture` block in `canon.json` + Severity-column parsing in
  `audit-lint`) is DEFERRED to Phase-5 with the live red-team RUN;** EH-3 ships as prose, so `audit-lint` stays
  R0–R8.
- **Mirror web-stack-skills' marketplace conventions** so the two interoperate (same manifest/skill layout).

## Provenance / build memory
This repo was derived in a bounded "Phase 4" job — abstracting the method from one mature brand canon and
validating coverage against a second, independently-authored one — then rebuilt in v2 into an analyze →
extract → prototype + Design-syncable library engine (the v2 pipeline is complete; see `RESIDENT.md`). The
full work-log, the v2 specs (`v2-build-spec.md`, `v2-intake-spec.md`), and the granular backlog
(`v2-backlog.md`, F-001…F-026) live in the **gitignored `dev/`** directory — local provenance, not shipped.

## v3 (skills built; Phase 5 validation next) — see `v3-execution-plan.md`
v3 extends the shipped v2 skills (does not restart them); **Phases 1–4 are merged to `main`** — the scoper and
builder are rewritten to v3 (handoff contract · provenance spine · capture · reproduction router · DTCG 2025.10 /
OKLCH engine · the mandatory keystone · the v3 fidelity gate). Rectoral rule for ALL v3 work: **anti-determinism** —
build and research the general capability class, never a single-brand instance; the brand is illustration only.
A full transversal audit then ran (`v3-audit—2026-06-22.md`, on the open `v3/audit` branch / PR #19, not merged to main; verdict QUALIFIED NO; 4 BLOCKER · 22 MAJOR);
its remediation is shipped through **Theme 6** (handoff seam #20 · install integrity #21 · provenance spine +
keystone operability #23 · public surface + docs sync + the pulled-forward Theme-5 F16 #24; RESIDENT compaction
#22). A fresh full system audit (#25) then drove #26 (medium scoping + keystone orphan) · #27 (client-drift +
hygiene) · #28 (scoper client instrument + medium-agnostic intake) · #29 (ledger close — F45 last leak + the
MINOR/NIT tail + coverage-gap) — so the **entire audit ledger is CLOSED: zero BLOCKER, MAJOR, MINOR and NIT**,
except the deliberate F55 (bold-density deviation) + OI-J (sonic/motion build-grade horizon). Both audit reports
are closed baselines; only the Phase-5 validation run remains. The rules below are guardrails/gotchas;
the staged plan lives in `v3-execution-plan.md` (root), the resolved methods/boundaries/sources in
`v3-research-foundation.md`, and `RESIDENT.md ## v3`.
- **Handoff = single sufficient interface (Theme 1).** When editing the skills, keep the seam closed both ways:
  every carrier field the handoff emits has a NAMED consumer stage in the builder (parse it in Stage 0), and the
  builder never reads a field the contract doesn't carry. The manifest is two tracks — ASSETS (in-repo, `sha256`)
  / CONSUMERS (live `url:`, reachability-checked, not checksummed); "never URLs" means never a DEAD/auth-walled
  pointer, not never a live surface. DIMENSION-MAP present-but-unresolved → builder HALTs (live anti-determinism).
  Carrier enums stay capability classes — font `license:` is a declared SPDX id (not a closed OFL/owner/GAP
  floor); freshness is exactly `shipped | stated-old` at every hop. Keystone voice/value layers derive from WHY
  `VOICE-EXEMPLARS`/`VALUE TRADE-OFFS` and emit a GAP where absent — never fabricate. The kit shape is a carried
  datum too — `existing-component-stack:<storybook+playwright | other | none>` (default `none` → package-shape),
  read at Stage 8, never re-hunted.
- **Medium scoping (honest, carrier-resolved).** Every layer that gates or renders a brand's identity acts on
  the brand's PRIMARY-IDENTITY CARRIER(S) resolved from the DIMENSION MAP — an OPEN class (visual mark \|
  sonic-mark \| motion-signature \| other declared lead atom), never a hardcoded `mark`. The current build is
  **visual-build-grade**: where it has no build-grade producer for the resolved carrier's medium (sonic/motion),
  the layer emits a DECLARED fidelity-blocking GAP (a tracked horizon, `RESIDENT.md` OI-J), never a false-fail on
  a visual mark nor a silent pass. The §7b keystone OPERABILITY gate is medium-agnostic and stays distinct from
  build-grade FIDELITY (`validate-audit.md` §1/§2, visual-scoped). The keystone consumes the WHY personality
  carriers (Aaker-5/Differential→§2 THINK, Aaker-5/Resonance→§3 SPEAK). Posture `profile:` is an open class with
  an `<other-detected>` escape — don't reintroduce a closed enum-as-floor.
- **Stated-spec-read.** Read the brand's declared truth (named font, declared hex/Pantone) via OCR/visual; treat
  `pdffonts`/embedded-font tables as corroboration only — outlined type makes them report the studio's layout
  font or nothing.
- **Provenance spine (4 fields per datum).** Every datum carries source / confidence / owner /
  freshness, generalizing v2's `authored|derived`. Observed expression enters as `hypothesis`; promoting a
  one-off to a brand line requires `owner-confirmed`. A datum is never used at a status it has not earned (a
  MATCHED/INFERRED value is not canonized unconfirmed). **Token emission (Stage 7):** every emitted token carries
  `$extensions.brand.provenance` {source, confidence, owner, freshness} — `authored|derived` is the source axis
  ONLY and is orthogonal to the confidence ladder (an `authored` value can still be `hypothesis`). Confidence
  ladder is byte-identical at every hop: `hypothesis | corroborated | owner-confirmed` — no fourth value/synonym
  (the keystone reads its asset-line confidence FROM the token's `$extensions.brand.provenance`, never recalled).
- **Adaptive dimension map.** Every brand dimension resolves explicitly to `filled` /
  `not-used(owner-declared)` / `tagged-gap` — none skipped silently. A builder that receives an unresolved
  dimension STOPS and reports. The current dimension catalogue (capture · reproduction · keystone · guardrails ·
  horizons · tokens) is an illustrative instance of the mechanism, never a closed universe (anti-determinism).
- **Faithful capture.** Clean vectors via PyMuPDF `page.get_drawings()` or copy-region-to-new-doc (a full-page
  Inkscape open yields a bloated, non-isolated SVG); image font-matching for unnamed faces; fidelity rating +
  provenance per artifact.
- **Reproduction router (treatment→method).** Procedural SVG filters (`feTurbulence` texture · `feDisplacementMap`
  organic/glitch · `feDiffuse`+`feSpecularLighting` 3D/gloss/emboss · `feGaussianBlur` glass · `feColorMatrix`
  grading) / generative lib (rough.js) / vector-trace / raster-required. Validate by visual diff. `feTurbulence`
  is CPU-heavy → constrain or rasterize; photography + bespoke illustration are raster-required.
- **Keystone `.md` (mandatory v3 output, Stage 8.5).** A single attachable think/speak/design + guardrail file
  (6-section schema in `references/keystone-emit.md`); keep it within a Claude Project's resident context (RAG
  trip-point unpublished → size is a parameter, calibrated in Phase 5; data first, instructions last for recall).
- **Fidelity gate v3 (Stage 10, `references/validate-audit.md` §7).** Reproduction visual-diff vs the source
  (perceptual overlay, no pixel-VRT, no Storybook) → commits persisted evidence to `audit/fidelity/<treatment-id>/`
  (source + reproduction + recorded verdict; absence = FAIL); keystone gate (present · 6-section ·
  guardrail-in-tail · within budget) PLUS a §7b FORM-OF-RULE content check (THINK + DESIGN-as each ≥1
  when-X-then-Z rule, SPEAK ≥1 on/off-brand pair, no bare-adjective core section; `not-used(owner-declared)`
  resolves clean); guardrail red-team battery + expected-refusal contract EMITTED + COMMITTED to `audit/redteam/`
  even when non-blocking (empty = FAIL), posture-gated — regulated postures BLOCK + need human sign-off, the live
  adversarial run is Phase 5 (deferral does not void the committed artifacts).
- **Tokens/scheme.** DTCG **2025.10** is the format target. **Colour `$value` is the structured-OKLCH object
  `{colorSpace, components, alpha, hex}` (migrated in Stage C-1); audit-lint R6a serializes structured + legacy
  string values through ONE canonical serializer so the drift gate stays green.** Composite values (shadows) stay
  plain strings (the SD `-value`/`-unit` split bug). Schemes are MATERIALIZED (C-2): N named schemes → N complete `$extensions.brand.scheme`-tagged role-token
  sets via `tools/scheme-derive.mjs` (zero-dep, NOT SD), enforced by R7. The Resolver Module stays deferred (SD
  v5 lag, issue #1590 / OI-H) and is a controlled convention layered over those sets, never raw `.resolver.json`. **Forward (C-2):** when a build-time materializer / Style
  Dictionary is added, structured colour MUST route through `color/oklch` (SD ≥ 5.3) or a preprocessor — never
  raw SD `$value`, never `color/css` (gamut-maps to sRGB). OKLCH is the general scheme-derivation engine
  (light/dark, high-contrast, sub-brand). **Scheme toggle (C-3):** the prototype renders a live `[data-scheme]`
  toggle (inline `<script>` + one `:root[data-scheme="<id>"]` block per materialized scheme) ONLY when >1
  non-deferred scheme exists; a flat brand drops it. `[data-scheme]` wins over `@media (prefers-color-scheme)`,
  which stays the no-JS fallback. Prototype stays zero-toolchain/offline — inline `<style>`+`<script>` only.
- **Decorative contrast (C-3, SPEC — no gate).** A graphic-code device's contrast lives in PRIMITIVES › Pattern
  as a **brand-fixed opacity/contrast band** (PRIMARY), escalating to **WCAG 3:1 (SC 1.4.11)** when it carries
  meaning/state; resolved by GRAMMAR `ALGO-CONTRAST-ROLE`'s graphic-code row + `G-PATTERN-01`. APCA Lc 15 is an
  internal reference only; **WCAG 2.x AA is the legal bar — no APCA substitution.** Not an executable validator.

## Flujo (Carlos)
Work on a `claude/<name>` branch, never main; PR + wait for OK before merge. Respond to Carlos in es-MX
(technical terms + code in English). Secrets in Infisical, never in git/Drive.

**Workflow hub (v3).** Chat is the hub; design decisions happen in Chat. Hand big or filesystem/git/build tasks
to Claude Code (it returns results to Chat) — including non-repo tasks better suited to Code. From Chat, use
Composio GitHub **con calma**: reads + light edits only; route big repo work to Code. Editing canonical `.md`
(RESIDENT/CLAUDE) via Composio carries clobber risk → read-then-merge, or route to Code. Update RESIDENT + CLAUDE
at the end of each chat — especially on a context/compute hand-off, which Carlos decides (Claude may only suggest
a fresh chat when context is legitimately heavy).
