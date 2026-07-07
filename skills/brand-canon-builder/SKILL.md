---
name: brand-canon-builder
description: Build or extend a canonical, brand-agnostic, output-agnostic brand source ("brand canon") for ANY brand — a four-layer canon (essence/primitives/grammar plus an index) and a DTCG/OKLCH token spine that any consumer (web, app, slides, print, a design tool) derives any artifact from. Use whenever someone wants to create a brand system, design system, brand guidelines, brand book, or design tokens, build a single source of truth for a brand's identity/voice/visual language, or consolidate scattered brand decisions into one canonical repo. Two modes come from the scoper handoff — ANALYZE (default, harvest the brand's published work across mediums) or CREATE (rare, author from the ratified WHY, explicit only). Triggers on "brand system", "design system", "brand canon", "design tokens", "brand guidelines", "brandbook", "set up our brand", "make our brand work in Claude Design".
---

# Brand Canon Builder

Build a brand canon: the canonical, output-agnostic source of truth for a brand, that any consumer (AI
or human) extracts from to decide any artifact — including ones the canon never names. This skill scaffolds
the canon, fills what the brand's material supports, logs the rest as tracked gaps, and emits a DTCG/OKLCH
token spine. It runs in two modes read from the scoper handoff: ANALYZE (the default — analyze the
brand's published work across mediums) or CREATE (the rare exception — author from the ratified WHY,
only on explicit instruction).

The defining property is the Lego principle: the repo is *always* createable and valid, even for a brand
that arrives with nothing. Whatever is missing always resolves to a GOAL, a tracked PENDING DECISION, and a
SKELETON slot — never a blocked, empty shell.

> Canon = skeleton; prototype + library + keystone = deliverable (v2/v3 law). The four-layer canon is the
> source *skeleton*, never the deliverable on its own. The deliverable is the real, presentable prototype, the
> `/design-sync`-ready component library projected from it, and the mandatory keystone `.md`. Rule-compliance
> of an asset-less skeleton is not done. (Stage 8 emits the prototype + kit, Stage 8.5 the keystone; the
> Stage-10 fidelity gate enforces "done" against them — a missing or low-fidelity core asset FAILS the build —
> and Stage 11 scrubs the client repo clean before handoff. See `references/architecture.md` § "Canon =
> skeleton; prototype + library + keystone = deliverable".)

## What it produces

A brand repo with:
```
canon/00-index.md        INDEX     — map, glossary, derivation method, precedence (where do I start?)
canon/01-essence.md      ESSENCE   — meaning, voice, positioning (why?)
canon/02-primitives.md   PRIMITIVES— every fixed atom to full depth (what?)
canon/03-grammar.md      GRAMMAR   — generative rules G-* + algorithms ALGO-* (how?)
canon/canon.json         machine mirror of essence + grammar (dual legibility)
tokens/base.json | semantic.json | component.json   DTCG token spine (OKLCH; the interchange contract)
data-map.md              DATA POINTER  (satellite, not canon) — where volatile values live
projections.md           PROJECTIONS   (satellite, not canon) — consumer registry + interchange contract
surfaces.md              SURFACES      (satellite) — the surface manifest: client/ai-facing/operator classes; THE deny-lint target list
asset-index.md           ASSET INDEX   (satellite) — the ONE consultation map (every asset + detail-doc, repo location mandatory, optional Drive mirror w/ shared sha256, custody pointers, primary-master-for slots); emitted from the canon, in the reconciliation gate's scope
prototype.html           PROTOTYPE  — a real, presentable render from the canon (Stage 8; opens in any browser)
design-sync-kit/         LIBRARY    — the compiled, /design-sync-ready component library (Stage 8)
<brand>-keystone.md      KEYSTONE   — the attachable .md an AI thinks / speaks / designs as the brand (Stage 8.5)
README.md · CLAUDE.md · RESIDENT.md   docs (RESIDENT carries the GAP-NNN Open Items)
assets/                  source binaries placed in-repo (marks, fonts, imagery) — read by the build
sources/                 source references placed in-repo (brandbook PDFs, exports) — read by the build
[optional] .design-sync/ Claude Design adapter (config + conventions + notes)
```

Templates for all of these live in `assets/templates/`.

## Reference materials — load when relevant

This SKILL.md is the workflow + hard standards. Load a reference only when its stage is reached; don't hold
them all at once.

- `references/architecture.md` — load when laying out the four-question canon or checking output-agnosticism.
- `references/token-spine.md` — load when authoring the DTCG/OKLCH token files (Stage 7).
- `references/gap-protocol.md` — load when logging `GAP-NNN`, applying the provenance spine, or running the universality stress test (Stages 6, 9–10).
- `references/coverage-checklist.md` — load when walking the universal must-haves in the coverage pass (Stage 9).
- `references/analyze.md` — load for the ANALYZE path (Stage 2, default): harvest the brand's published work.
- `references/create.md` — load for the CREATE path (Stage 2): author from the ratified handoff WHY.
- `references/asset-acquisition.md` — load when acquiring build-grade assets, source-agnostic (Stage 3).
- `references/font-acquisition.md` — load when acquiring fonts under the license boundary (Stage 4).
- `references/reproduction-router.md` — load when a brand carries a visual/textural treatment to reproduce (Stages 5 & 8).
- `references/design-sync-kit.md` — load when emitting the prototype + `/design-sync`-ready kit (Stage 8).
- `references/claude-design-adapter.md` — load when wiring the Claude Design adapter (per the handoff's explicit kit slot; Stage 8).
- `references/keystone-emit.md` — load when emitting the mandatory keystone `.md` (Stage 8.5).
- `references/validate-audit.md` — load when running the VALIDATE/AUDIT stage + fidelity gate (Stage 10).
- `references/self-audit.md` — load when the operator invokes the on-demand deep self-audit (post-build; harness-backed by law — no claim without a fresh executed check; artifacts to `audit/self/`).
- `references/client-clean.md` — load when scrubbing the client repo before handoff (Stage 11).

## Hard standards (non-negotiable — encode these into every canon)

1. **Output-agnostic.** No layer/file/section named for an output. Coverage of an output's *need* is
   absorbed as generative rules; never as an enumerated per-artifact list. (`references/architecture.md`.)
2. **Generative over catalog.** Rules + typed algorithms with stable IDs (`G-*`, `ALGO-*`), not enumerations.
3. **Dual legibility.** Prose `canon/*.md` + machine mirror (`tokens.json`, `canon/canon.json`).
4. **Interchange contract.** DTCG tokens; OKLCH literal in `$value`; consumers emit `oklch()` via an
   OKLCH-preserving transform (never `color/css`); print values authored in `$extensions`, screen values
   derived. (`references/token-spine.md`.)
5. **Lego property.** Always valid; every missing must-have is a logged `GAP-NNN`, never a silent hole, never
   fabricated content. (`references/gap-protocol.md`.)
6. **Never invent brand truth.** If the material/brief doesn't give it, log a gap for the owners to ratify.

## Workflow

The builder runs a fixed, gated pipeline — the Stages 0–12 specified below are the full specification. BLOCKING
gates must pass — or be explicitly waived by the owner via the handoff/PR — before the build is declared
complete. The full pipeline (Stages 0–12) is implemented — mode + handoff spine, acquisition, fonts,
applied-design, prototype + kit, token spine, gaps, validate/audit + fidelity gate, client-clean / scrub,
commit + PR. Every stage is specified here; nothing is deferred elsewhere.

### Stage 0 — Persist + ingest the handoff contract & locate the target
The scoper's machine-readable handoff (`brand-canon-scoper/references/handoff-format.md`) is the canonical
brief. **FIRST, before parsing: persist the received block VERBATIM to `sources/handoff—<date>.md`** (ISO
date of receipt; a successive handoff is a NEW file — custody history) so it is hashed into `CHECKSUMS.txt`
with everything under `sources/**`. The persisted handoff is the TOP of the chain of custody: the hashed
source-of-record that `handoff-confirmed`/`proxy-relayed` data cites, and the artifact the gates read —
never a paste that dies in chat. Then parse every block and act on it (do not re-derive what it already
carries):

- **`MODE`** → ANALYZE | CREATE (drives Stage 2). `BUILD-MODE` → `FULL` = the normal build; `v0/DEMO` =
  obey the OPTIONAL block's EXPLICIT resolutions (the scoper writes `demo-default-yes` /
  `scope-expanding(demo-default-no)` — the builder never fills a slot with a skill default; an unfilled
  directive slot is a handoff defect: stop and report) and thread
  that mode into Stage 8 (prototype/kit) and Stage 9 (gaps); the resolved primary-identity carrier(s) (from the
  DIMENSION MAP — visual mark | sonic-mark | motion-signature | other lead atom) + graphic-code stay non-waivable
  regardless (a declared fidelity-blocking GAP where the carrier's medium has no build-grade producer, never a false-fail on a visual mark).
  `TARGET REPO` → the real repo path (never invent a tree the builder can't see). `OWNERS` /
  `UNRESOLVED CONFLICTS` → ratification bookkeeping; an unresolved conflict is an open GAP, never builder-decided.
- **`MATERIAL MANIFEST`** (two tracks) → **ASSETS**: the in-repo paths (`assets/` / `sources/`) read in
  Stage 2; verify each `sha256` before reading. **CONSUMERS**: the live surfaces (`url:`) the brand ships
  today — verify each url is REACHABLE before reading it, then ANALYZE harvests from them (Stages 2 / 5). If
  the manifest points anywhere the builder cannot reach — Project knowledge, a dead Claude.ai/Downloads link,
  an auth-walled resource — stop and report. (This typed CONSUMERS carrier replaces the old undeclared
  "plus any live-URL pointers" aside.) A CONSUMER is **not** computed-css-only: it routes by its own declared
  `ingest:` (`computed-css` for a CSS-readable live site; `ocr-visual` for a live-but-raster surface — an image
  feed / gallery reachable by `url:` but not computed-style-readable) — see *Route by declared `ingest:`* next.
- **Route by declared `ingest:`** → each ASSETS/CONSUMERS item carries an `ingest:` token
  (`vector-extract | computed-css | design-file-native | ocr-visual | font-match | n/a`). Consume that token
  as the authoritative HOW-to-read and route to the matching acquisition technique (Stage 3,
  `references/asset-acquisition.md` § ingest-token map) — do not re-derive routing from a detected source-type
  when the contract already declares it.
- **`WHY (essence) — RATIFIED{by · how · date}`** → fills ESSENCE directly in Stage 2. The RATIFIED header is
  a RECORD: what the builder inherits from the signed block enters the build as `handoff-confirmed` (or
  `proxy-relayed` where a proxy answered), never `owner-confirmed` on handoff text alone. The builder never
  re-elicits or re-infers the WHY; a GAP in the handoff stays a GAP; a `PROPOSED` line lands in quarantine
  (`source: proposed` + `hypothesis` + its GAP). The voice/value carriers feed Stage 8.5: `Personality
  (scored)` / `Differential scales` / `Resonance` seed the keystone's THINK/SPEAK; `VALUE TRADE-OFFS` →
  keystone §2 trade-off rules; `VOICE-EXEMPLARS` → keystone §3 few-shot pairs. Where a carrier is `none`, the
  keystone emits a tagged GAP — never a fabricated pair/rule (`references/keystone-emit.md`).
- **`WHAT (primitives) — POINTERS + OWNER-PROVIDED ONLY`** → pointers the builder will extract measured
  values from (its half of the frontier); owner-provided values (declared Pantone, `authored-print`) are
  truth, written `source:"authored"` (never re-derived); `intent` seeds per-atom meaning. Carry each
  primitive's `PROVENANCE{source/confidence/owner/freshness}` from the handoff into the build and propagate
  it through extraction (`references/gap-protocol.md` § The provenance spine): a value enters at its handoff
  confidence (ratification carried by the handoff lands as `handoff-confirmed`/`proxy-relayed`) and is never
  promoted to a brand line without tier-2 ratification. **per-mark GEOMETRY**
  (clear-space / min-size digital / min-size physical / construction-ref) → Stage 6 reads these owner-provided
  values instead of re-hunting from a PDF. **per-font `license:`** (a declared SPDX/license id, `owner-supplied`,
  or `unlicensed→GAP`) → Stage 4 reads the actual license and applies its redistribution policy (OFL/Apache/
  Ubuntu/… self-host; a non-redistributable face ships a declared fallback + license note in bundled files
  ONLY — the local render keeps the real face; a face whose FILE is unobtainable is a MUST-HAVE fidelity GAP,
  never a silent fallback). License is a dependency + confirmation request, never a capability gate
  (`references/font-acquisition.md` § License posture).
- **`HOW (grammar)` + `generative-rule seeds (if/then)`** → seed `G-*`/`ALGO-*` with stable IDs.
  `CORE-ASSET FIDELITY CONTRACT` → drives the fidelity gate (Stage 10). `GAPS (client-language)` →
  the builder owns formalization into `GAP-NNN` (two-ledger, Stage 9). `OPTIONAL` (incl. the explicit
  `Claude Design component library: <YES|NO>` directive — NO means ZERO Claude Design artifacts, reconciled
  by the gate runner against the persisted handoff — and `existing-component-stack:` → the Stage-8 kit
  shape) → Stage 8.
- **`DIMENSION MAP`** → resolve each dimension to `filled` / `not-used(owner-declared)` / `tagged-gap`,
  including the explicit `applied-expression/social` dimension. A dimension **present but unresolved** is a
  PARSE-OR-STOP gate: HALT the build and report it — this is the live anti-determinism mechanism, not a
  decorative check. (The SCOPER owns completeness, so an *un-enumerated* dimension is a `handoff-defect` GAP,
  not something the builder can silently pass; a *present-but-unresolved* one stops the build.)
- **`HORIZONS`** → seed the keystone §6 horizon map (Stage 8.5); where a horizon carries
  `existing-material:y`, route those assets into Stage 3 acquisition rather than re-inventing them.
- **`POSTURE`** → parse `profile` + `visibility` + `audiences` (+ `regulatory`/`stance`/`never-topics`/
  `refusal-style`); feed the keystone §5 guardrail tier (Stage 8.5) and the Stage 10 §7b regulated gate.
- **`TREATMENTS`** → parsed here (`observed-on` / `route-hint` / PROVENANCE), then routed to the reproduction
  router at Stage 5 (classify) and Stage 8 (reproduce); each treatment stays `confidence: hypothesis` until
  tier-2 ratification.
- **`NOTES`** → human-readable context for the build PR only; the builder never treats it as a source of brand
  truth and it never silently overrides a parsed block.

A handoff that cannot be parsed, that names no real target repo, or that carries a present-but-unresolved
DIMENSION-MAP dimension is a parse-or-stop gate: stop and report rather than guess. (If a user runs the
builder directly in Code with published material and no handoff block, default `MODE: ANALYZE` and gather the
equivalent fields before proceeding.)

### Stage 1 — Scaffold (always first)
Copy the full template set from `assets/templates/` into the target repo, renaming `docs/*` to the repo
root (`README.md`, `CLAUDE.md`, `RESIDENT.md`), `tokens/*` into `tokens/`, and `tools/*` into `tools/`
(`run-gates.mjs` — the Stage-10 suite runner + status board; `audit-lint.mjs` — the provenance/completeness
gate; `client-deny-lint.mjs`; `scheme-derive.mjs`; `fidelity-diff.py`; `source-recover.py` — MT-3
archived-source recovery). **Do NOT copy `tools/fixtures/`** — it is the skill's own gate-acceptance proof (a clean sample +
a seeded-violation sample), not client material. Create `assets/` (source
binaries: marks, fonts, imagery) and `sources/` (references: brandbook PDFs, exports) — the
`assets/`+`sources/` material convention. This creates the valid, empty-but-structured baseplate before any content. Fill the obvious
header fields (`{{BRAND}}`, `{{BRAND_OWNERS}}`, `{{DATE}}`, repo/org).

### Stage 2 — Read material in-repo & fill the canon (by MODE)
Read placed material only from the in-repo `assets/` (binaries) and `sources/` (references) — plus the
reachability-verified `url:` surfaces in the manifest's CONSUMERS track (Stage 0 confirmed each resolves).
Never read from Project knowledge, a tree the manifest didn't place, or an unreachable/dead pointer. Then
fill by the handoff's `MODE` (default ANALYZE):

- **ANALYZE (default):** read `references/analyze.md`. Inventory sources, mine each consumer's living docs
  and open PRs, reconcile conflicts (fresher/shipped wins specifics; identity wins meaning; repo wins
  over external brandbook/Drive; abstract to universal before promoting), harvest before removing junk,
  register consumers in `projections.md`. (Applied-design harvest now runs in Stage 5.)
- **CREATE (rare exception, only on `MODE: CREATE`):** read `references/create.md`. Author from the
  handoff's ratified WHY in four-question order — consume the handoff, do not re-interview; fill every
  slot the handoff supports.

For every slot: fill it to full depth if the material supports it; write "not used" if the brand
genuinely doesn't use that dimension; otherwise leave the placeholder and log a gap (Stage 9). Keep meaning
in the prose layers and values in the token spine. Mirror essence + grammar into `canon/canon.json` as you go.

### Stage 3 — Source-agnostic asset acquisition · BLOCKING (core)
Read `references/asset-acquisition.md` — including the **stated-spec-read** rule (the brand's declared font
name + declared color are authoritative; `pdffonts`/font-tables/sampled pixels corroborate only, because
outlined type makes the table report the studio's layout font or nothing). Acquire build-grade assets from
whatever sources exist (any combination). **Route by the declared `ingest:` token first** (the contract's
authoritative HOW-to-read, mapped per token in `references/asset-acquisition.md` § ingest-token map); only
where the manifest leaves it `n/a` do you fall back to selecting the technique by detected source-type
(existing DTCG/token files > repo vector masters > website extraction > PDF > design-tool exports > social) —
never assume a PDF. Assemble the best-fidelity asset per canon slot with precedence (authored print > sampled;
shipped/site > old brandbook; vector master > raster; existing tokens > extraction). The slot-need-vs-source-exists
delta is a per-slot fidelity GAP. **When the live site is dead/blocked**, recover the source-of-record from
the archive with `tools/source-recover.py` (Wayback CDX + raw `id_` fetch) — then run the identity+date gate
(MT-3): confirm the capture is the right brand (occupant disambiguation) and reconcile `captureTs` vs the
page's self-reported "Last Published" BEFORE trusting any value; hash every recovered file under `sources/**`
into `CHECKSUMS.txt`. (Full method: `references/asset-acquisition.md` § Archived-source recovery.)

### Stage 4 — Font acquisition · BLOCKING (core)
Read `references/font-acquisition.md`. **Read each face's handoff `license:` field first** (a declared
SPDX/license id, `owner-supplied`, or `unlicensed→GAP`, from WHAT per-font, parsed at Stage 0) — it is the
owner's declared license state, not something to re-derive. Then acquire the brand's actual typefaces by whatever path the source
offers (embedded-PDF / `@font-face` from a live site / repo files / acquire open via Fontsource). License =
dependency + confirmation request, NEVER a capability gate: the private build/render/fidelity evidence use the
brand's REAL face whenever the file exists (license unconfirmed → a visible license-confirmation GAP, work
continues); only REDISTRIBUTION is hard-gated — self-host/bundle only OFL/Apache/Ubuntu or owner-supplied
faces (ship the license; rename on a Reserved Font Name when subsetting); a non-redistributable face ships a
declared fallback + license note in bundled files only; a face whose FILE is unobtainable is a MUST-HAVE
fidelity GAP, never a silent fallback. (Full method + posture: `references/font-acquisition.md`.)

### Stage 5 — Applied-design harvest
Harvest the lived design language from the live consumers the scoper pointed at (the *Applied-design harvest*
section of `references/analyze.md`): layout/composition, imagery/photography direction, type-in-use vs
declared, the lived aesthetic — abstracted to universal (stripped of stack/medium), feeding GRAMMAR (rules)
and ESSENCE (meaning), measurable atoms into tokens. Where lived expression diverges from the ratified WHY,
log the divergence; never silently overwrite. Classify any visual/textural treatment you observe
(texture, finish, effect) against `references/reproduction-router.md` and record it with the handoff's
TREATMENTS provenance (`confidence: hypothesis` until tier-2 ratification); the reproduction itself happens in
Stage 8. In CREATE mode (or wherever a TREATMENT is handoff-carried with no live consumer to harvest from),
classify the handoff TREATMENTS block directly against `references/reproduction-router.md` regardless of
whether a live-consumer harvest ran — Stage 0 routes TREATMENTS here either way. (Full method: `references/analyze.md` § Applied-design harvest + `references/reproduction-router.md`.)

### Stage 6 — Fill the canon (extraction synthesis)
The consolidation point where the canon is filled — not a separate pass. Stage 2 routes by MODE and fills
from the placed material; Stages 3–5 acquire the real assets, fonts and applied design. Here the builder
extracts the measured primitive values those sources yield and lands them in the canon: meaning to the
prose layers, values to the token spine, mirrored to `canon/canon.json`. Each landed value carries its
provenance spine (`references/gap-protocol.md` § The provenance spine): extracted/sampled/matched values
enter at `confidence: hypothesis` and stay flagged for ratification; a value read EXACT from the slot's
hashed primary master earns `verified-primary`; only `declared-spec`/`owner-stated`
data is canonical truth. For per-mark geometry (clear-space / min-size digital / min-size physical /
construction-ref), read the owner-provided values the handoff's WHAT GEOMETRY block carries (inherited as
`handoff-confirmed`, or `proxy-relayed` where a proxy answered) instead of re-hunting them from a PDF; only
where a geometry
value is `none` does the builder derive it (at `hypothesis`) or log a GAP — and a derived clear-space is
MEASURED from the mark's real cap-height/x-height read off the SVG path extents, never an eyeballed
"≈0.5× bounding box" (`asset-acquisition.md` § Measured derivation floor). The frontier holds throughout —
the builder extracts/derives values, never re-elicits the ratified WHY, and never promotes a `hypothesis`
observation to a brand line. (Provenance spine: `references/gap-protocol.md`.)

> Stage 2 / Stage 6 note. Stage 2 is the merged, load-bearing read+fill entry point; Stage 6 is the explicit
> extraction-synthesis culmination of Stages 2–5 — no duplicate fill.

### Stage 7 — Token spine
Read `references/token-spine.md` — DTCG **2025.10** target, the OKLCH `$value` operative format (with the
tooling-lag caveat on structured color / resolvers), and the **OKLCH scheme-derivation
engine** (light/dark, high-contrast, sub-brand as cases of one L/C/H transform; re-cohering an ad-hoc
palette is a `hypothesis` proposal pending owner confirmation). Author `tokens/base.json` (raw OKLCH +
authored/derived `$extensions` + `$extensions.brand.provenance` {source, confidence, owner, freshness} on
EVERY token — `authored|derived` is source-only and orthogonal to the confidence ladder), `tokens/semantic.json`
(role aliases), `tokens/component.json` (optional).
Keep `$value` plain strings, aliases as `{tier.category.name}`, category names on the namespace convention.
Derive any additional scheme (dark, high-contrast, sub-brand) at the `semantic` tier via the OKLCH engine.
Emit motion/depth tokens if the brand uses them (DTCG-valid even without a current consumer); omit for a
flat/print-only brand.

### Stage 8 — Prototype + `/design-sync`-ready kit · BLOCKING (prototype)
Emit both real deliverables (canon = skeleton, these = deliverable):

- **(a) The presentable prototype.** Copy `assets/templates/prototype/prototype.html` into the repo
  and fill it from the canon: OKLCH token values inline, the real extracted mark as inline SVG/data-URI,
  acquired fonts via `@font-face`/data-URI, harvested imagery. The prototype is the COMPLETE INTERACTIVE
  BRANDBOOK (RV-5), not a UI demo: render one surface per canon section the brand HAS — DERIVE the surface-set
  from the PRIMARY MEDIUM + the dimension map (never a fixed checklist, never assume visual) — across the
  visual surfaces (hero · controls · cards · type spread · color blocks) AND the documentation surfaces
  (how-the-brand-decides / THINK rules in client language · lexicon · misuse · color-schemes when >1 scheme),
  PLUS a "Decisions for you" panel surfacing the owner's open decisions in PLAIN CLIENT LANGUAGE (never
  operator vocab / gap ids — the Stage-11 client-clean deny-lint scans it). A section with no canon material is
  omitted or marked a GAP, never invented. Keep the design bar: a hero focal anchor, a responsive width
  breakpoint (layout otherwise intrinsic via clamp/auto-fit), colour-as-system. Reproduce any brand treatment via `references/reproduction-router.md`
  (procedural SVG-filter / generative-lib / vector-trace / raster-required), validated by visual diff against
  the source; a treatment that can't be brought within tolerance degrades a method or becomes a fidelity GAP.
  It is self-contained and deterministic (opens in any browser, no toolchain) — the artifact you show a
  client and the Stage-10 "render real samples" evidence. Never make it depend on the kit.
- **(b) The `/design-sync`-ready kit.** Scaffold `assets/templates/design-sync-kit/` and fill it from
  the canon (components, tokens, `pkg`/`globalName`, conventions). The kit SHAPE is a CARRIED datum: read the
  handoff's `existing-component-stack:` (parsed at Stage 0) — `none`/`other` → package-shape (the default);
  `storybook+playwright` → Storybook-shape is available — never re-hunt whether the brand ships Storybook.
  Read `references/design-sync-kit.md` for the converter contract: package-shape default; one-command build (`esbuild` + `ts-morph` + `@types/react`)
  → `dist/index.es.js` + `.d.ts`; `.design-sync/config.json` with only live-valid keys (unknown keys fail
  the run); the `@dsCard` first-line marker on every emitted card; the `readmeHeader` conventions header;
  `styles.css` that `@import`s `_ds_bundle.css` and carries the token + `@font-face` closure. The kit is
  emitted per the handoff's explicit `Claude Design component library:` directive — YES emits, NO emits
  NOTHING (the runner reconciles; `references/claude-design-adapter.md`). The `dist/`
  build is best-effort, never a hard-fail — `[NO_DIST]` is recoverable by running the build, and (a) is
  the deterministic fidelity artifact regardless.

Re-pin the live `/design-sync` contract before freezing the emitter (`references/design-sync-kit.md` § "Step 0
— Re-pin the live contract" — the contract is server-side/version-fluid via `get_claude_design_prompt`).

### Stage 8.5 — Emit the keystone `.md` · BLOCKING (north-star)
Read `references/keystone-emit.md`. Synthesize the single attachable `<brand>-keystone.md` from the filled
canon (Stages 2/6), the token spine (Stage 7), and the acquired assets (Stages 3/4) — the deliverable that
makes the brand *operable* by an AI (think / speak / design AS the brand + a guardrail layer). Mandatory build
output, not opt-in. Copy `assets/templates/keystone/keystone.md` and fill it in the ratified 6-section order
(front-matter · THINK-as · SPEAK-as · DESIGN-as · GUARDRAIL · REFERENCE):
- Render THINK and DESIGN as decision rules and SPEAK with few-shot pairs (machine-consumable), never
  adjectives; derive DESIGN from the token spine, GUARDRAIL from the handoff POSTURE block.
- Recall-ordering: the GUARDRAIL layer (§5) sits in the high-recall tail, never buried mid-document; §5 + §4
  double as Project instructions, §6 REFERENCE as Project knowledge (front-matter carries the deployment map).
- Size budget is a parameter (conservative default: stay fully resident in context). If over, apply the
  degradation path (split §6 REFERENCE to retrievable knowledge first). The measured trip-point is delegated to
  Phase-5 calibration.
- Provenance: every datum inherits the spine; mark observed-but-unconfirmed as `hypothesis`, never crystallize.
Stage 10 fails the build if the keystone is absent or malformed (`references/validate-audit.md` §7b).

### Stage 9 — Coverage + gaps + the consultation index
Read `references/coverage-checklist.md` and `references/gap-protocol.md`. Formalize the handoff's
client-language gaps into `GAP-NNN` (two-ledger); walk the universal must-haves; for each unmet one, add a
`GAP-NNN` row to `RESIDENT.md` (severity + proposed resolution). Do not pad the checklist defensively —
the universality stress test is the real net. **Emit `satellites/asset-index.md` FROM the canon** (every
asset + every knowledge doc deeper than the keystone, one row each: repo location MANDATORY, optional Drive
mirror with the SAME sha256, custody pointer to where the record already lives — sourceRefs / CHECKSUMS /
MANIFEST, never re-homed — and `primary-master-for` naming each slot's official master, which the lint binds
`verified-primary` reads to). Keep `satellites/surfaces.md` current: a new surface gets its class row (an
unlisted client surface silently escapes the deny firewall). Both are emitted artifacts — hand-maintained
copies are drift by construction; both sit in the reconciliation gate's scope.

### Stage 10 — VALIDATE / AUDIT + fidelity gate · BLOCKING
Read `references/validate-audit.md`. Judge the build on fidelity, not rule-compliance of an empty
skeleton. Eight parts:

- **Fidelity gate** — consume the handoff's `CORE-ASSET FIDELITY CONTRACT` (parsed at Stage 0): a missing or
  low-fidelity core asset is fidelity-blocking → the build FAILS (not "pass with gaps"); non-core gaps
  still log and the repo stays valid (Lego). Layered thresholds: zero tolerance on the brand's primary-identity
  carrier(s) (resolved from the DIMENSION MAP — visual mark | sonic-mark | motion-signature | other) + primary
  color tokens, higher on gradients/illustration; where the build has no build-grade producer for that medium
  the carrier is a declared fidelity-blocking GAP (never a false-fail on a visual mark the brand doesn't lead
  with); per-component-variant + per-brand baselines.
- **Mechanism is shape-dependent** (do not mandate Storybook): package-shape (default) evidences fidelity
  via the deterministic HTML prototype (render real samples) + the kit's own offline `npm run validate`
  (`package-validate.mjs`, kit-shipped: dist/`.d.ts` present, ≥1 component exported, every referenced font
  has a shipped `@font-face`, non-hollow token closure) + the `/design-sync` converter's server-side gates
  (`[FONT_MISSING]` must-resolve, the hollow-render gate `[RENDER]`/`[RENDER_BLANK]`/`[RENDER_THIN]`, the
  converter's own `package-validate.mjs` exit 0, the absolute Styled/Complete/Plausible grade) + the content
  audit + the contract pass/fail — no pixel-diff VRT. Storybook-shape (only if the brand already ships
  Storybook + Playwright) adds a pixel-match VRT oracle (Chromatic default; Percy / BackstopJS alternatives).
- **Content audit** — rule-by-rule audit of all written + visual content (authored AND generated) against the
  `G-*`/`ALGO-*` GRAMMAR rules and ESSENCE/voice (anti-promise, lexicon, don'ts).
- **THE SUITE RUNNER (executable, BLOCKING)** — run `node tools/run-gates.mjs` from the emitted repo root:
  it runs every executable gate (real exit codes), verifies the committed evidence of every DEMOTED
  agent-gate (`audit/agent-gates.md` — §1 contract walk, §2 named tolerance, §4 content audit,
  output-agnostic, universality), machine-checks the keystone structure + form and the committed battery, and
  writes the status board `audit/gates/report.md` — the ONLY legitimate "gates green" claim. Statuses are
  first-class: PASS/FAIL (real exits) · NOT-RUN(reason) (deps → the tool's exit-3 install line; never
  substituted by a manual "clean") · N/A(declared). Verdict ALL-GREEN required for "done"; INCOMPLETE is the
  honest, declarable v0/DEMO state. (`validate-audit.md` §8.)
- **Provenance & completeness lint (executable, BLOCKING; run by the runner)** — `node tools/audit-lint.mjs` from the emitted
  repo root: exit 0 required (MT-3/4/5, R0–R5 — every value token carries valid-enum provenance;
  corroborated⇒≥2 distinct non-relay sources (R1 counts, it does not hash-check); inferred/matched/proposed
  capped at hypothesis; computed-css
  or any confidence above hypothesis⇒a `sourceRef.sha256` in `CHECKSUMS.txt` bound to that file (for
  handoff-confirmed/proxy-relayed, bound to the persisted handoff); every named
  value/scheme→token or
  open GAP; every uncertain token→exactly one open GAP via its `$extensions.brand.gap`). Requires `CHECKSUMS.txt`
  to hash every file under `sources/**` — the persisted handoff included. (`validate-audit.md` §5a.)
- **Render real samples** — the Stage-8 HTML prototype is the evidence.
- **Reproduction visual-diff (treatments)** — every reproduced treatment (Stage 5 → Stage 8 via
  `reproduction-router.md`) passes a perceptual visual-diff against the Stage-5 source (no pixel-VRT, no
  Storybook dependency), else it degrades a method or logs a fidelity GAP. The verdict leaves a PERSISTED
  artifact committed to `audit/fidelity/<treatment-id>/` (source + reproduction + recorded verdict); its absence
  FAILS the gate. (`validate-audit.md` §7a.)
- **Keystone gate (exists + content + red-team)** — the Stage-8.5 keystone is present, six-section,
  guardrail-in-tail, within budget (structural) AND passes the §7b CONTENT check (THINK + DESIGN-as each ≥1
  when-X-then-Z rule, SPEAK ≥1 on/off-brand pair, no core section a bare adjective list — form-of-rule only,
  `not-used(owner-declared)` resolves clean). The builder emits + COMMITS the guardrail red-team battery +
  expected-refusal contract to `audit/redteam/` (empty/un-run battery = well-formedness FAIL). A regulated posture
  — fire on EITHER §7b arm: the handoff POSTURE `profile == regulated` OR a non-empty `regulatory:` field (not a
  fixed domain list): BLOCKING + human red-team sign-off (default unratified-pending); the live adversarial
  run is Phase 5 (its deferral does not void the committed artifacts). (`validate-audit.md` §7b.)
- **Client-confirmation is a HUMAN gate** — assemble the audit + samples + open ratification GAPs into the PR
  and stop; sign-off is human PR review. Never auto-confirm or auto-stamp "Ratified by…"; default state is
  unratified-pending. (The scrub apparatus is Stage 11.)

Retained existing checks (do-not-regress):
- **Output-agnostic check:** grep the canon for any output/medium-named section; there must be none.
- **DTCG validity:** the token files parse and the alias graph resolves (every `{...}` points to a real leaf).
- **Universality stress test:** pick three arbitrary artifacts the canon names nowhere (span media —
  e.g. digital, print, spatial). Walk the derivation method for each; confirm the canon decides each one
  without enumerating it. A failure means a missing *rule/atom* — add that, never a per-artifact section.

### Stage 11 — Client-clean / scrub · BLOCKING
Read `references/client-clean.md`. The build is not "done" until the client repo is clean of all build
apparatus:
- **Tool self-attribution:** no doc credits the build tool/skill — grep the client tree for
  `brand-system-skills`, the skill names, and the tool repo URL; zero hits.
- **Reference-brand bleed, runtime catch:** every rule / name / example / value in the client canon
  must trace to the client's own material (or an honest GAP); strip anything traceable to a
  method/reference/example brand instead.
- **`{{PLACEHOLDER}}` leftovers + chatter:** no raw `{{…}}` survive; remove GUIDE/builder comments and dead
  template sections from the client deliverable.
- **Ratification:** never auto-stamp "Ratified by…" or flip a gap to `CLOSED (ratified)`; default is
  unratified-pending — ratification lands only on real owner sign-off (the Stage-10 human gate).

This stage scrubs only the client repo it produces; this builder repo's own docs keep their attribution.

### Stage 12 — Commit (LOCAL by default; push gated on explicit OK)
Update `RESIDENT.md` (decisions, Open Items, change log) and commit on a `claude/<name>` branch —
**LOCALLY. The emitted repo holds recovered brand assets and client IP: creating a remote, pushing, or
opening a PR happens ONLY on an explicit, per-step OK from the operator/owner — never as a default step,
and a prior OK never carries to the next push.** When that OK arrives, the PR carries the audit — including
`audit/gates/report.md`, the machine-generated gate board, the only
legitimate gates-green claim — + samples + open ratification GAPs for the owners. Until then, the review
surface is the local repo + the board.

## Principle to keep in mind
The repo is the source; consumers re-project from it and never override it. kit = constant, canon =
variable — this same builder clones a new brand by swapping the canon, which is why it must stay strictly
brand-agnostic and output-agnostic. When in doubt, move a truth up a layer and let GRAMMAR derive the output.
