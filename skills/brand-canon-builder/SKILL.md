---
name: brand-canon-builder
description: Build or extend a canonical, brand-agnostic, output-agnostic brand source ("brand canon") for ANY brand — a four-layer canon (essence/primitives/grammar plus an index) and a DTCG/OKLCH token spine that any consumer (a website, an app, a slide deck, a print kit, a design tool) derives any artifact from. Use this whenever someone wants to create a brand system, design system, brand guidelines, brand book, design tokens, a single source of truth for a brand's identity/voice/visual language, or wants to consolidate scattered brand decisions (across repos, a brandbook PDF, a design library) into one canonical repo. Runs in two modes read from the scoper handoff: ANALYZE (the default — analyze the brand's published work across mediums and harvest it) or CREATE (the rare exception — author from the ratified WHY, only on explicit instruction). Triggers on "brand system", "design system", "brand canon", "design tokens", "brand guidelines", "brandbook", "set up our brand", "single source of truth for our brand", "make our brand work in Claude Design". Builds the repo, fills what's known, logs the rest as tracked gaps, and emits a DTCG token spine that projects losslessly into downstream consumers.
---

# Brand Canon Builder

Build a **brand canon**: the canonical, output-agnostic source of truth for a brand, that any consumer (AI
or human) extracts from to decide any artifact — including ones the canon never names. This skill scaffolds
the canon, fills what the brand's material supports, logs the rest as tracked gaps, and emits a DTCG/OKLCH
token spine. It runs in two modes read from the scoper handoff: **ANALYZE** (the default — analyze the
brand's published work across mediums) or **CREATE** (the rare exception — author from the ratified WHY,
only on explicit instruction).

The defining property is the **Lego principle**: the repo is *always* createable and valid, even for a brand
that arrives with nothing. Whatever is missing always resolves to a GOAL, a tracked PENDING DECISION, and a
SKELETON slot — never a blocked, empty shell.

> **Canon = skeleton; prototype + library = deliverable (v2 law, §5.2).** The four-layer canon is the source
> *skeleton*, never the deliverable on its own. The deliverable is the real, presentable prototype + the
> `/design-sync`-ready component library projected from it. Rule-compliance of an asset-less skeleton is
> **not** done. (Stage 8 emits both deliverables; the Stage-10 fidelity gate enforces "done" against them —
> a missing or low-fidelity core asset FAILS the build. See `dev/v2-build-spec.md`.)

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
README.md · CLAUDE.md · RESIDENT.md   docs (RESIDENT carries the GAP-NNN Open Items)
assets/                  source binaries placed in-repo (marks, fonts, imagery) — read by the build
sources/                 source references placed in-repo (brandbook PDFs, exports) — read by the build
[optional] .design-sync/ Claude Design adapter (config + conventions + notes)
```

Templates for all of these live in `assets/templates/`. Reference knowledge lives in `references/` — read
the relevant one when you reach that step; don't hold them all at once.

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

The builder runs a fixed, **gated** pipeline (full specification: `dev/v2-build-spec.md` §3). **BLOCKING**
gates must pass — or be explicitly waived by the owner via the handoff/PR — before the build is declared
complete. Stages 0–10 and 12 are implemented (mode + handoff spine, acquisition, fonts, applied-design,
prototype + kit, token spine, gaps, validate/audit + fidelity gate); only Stage 11 (client-clean / scrub)
remains a titled forward-pointer to the spec, landing in PR-B5 (the accounting line below is authoritative).

### Stage 0 — Ingest the handoff contract & locate the target
The scoper's machine-readable handoff (`brand-canon-scoper/references/handoff-format.md`) is the **canonical
brief** — parse every block and act on it (do not re-derive what it already carries):

- **`MODE`** → ANALYZE | CREATE (drives Stage 2). **`TARGET REPO`** → the real repo path (never invent a tree
  the builder can't see). **`OWNERS` / `UNRESOLVED CONFLICTS`** → ratification bookkeeping; an unresolved
  conflict is an open GAP, never builder-decided.
- **`MATERIAL MANIFEST`** → the in-repo paths (`assets/` / `sources/`) read in Stage 2, plus any live-URL
  pointers. If the manifest points anywhere the builder cannot read (e.g. Project knowledge), **stop and
  report** — material must live in the repo.
- **`WHY (essence) — RATIFIED`** → fills ESSENCE directly in Stage 2. The builder **never re-elicits or
  re-infers the WHY**; a GAP in the handoff stays a GAP.
- **`WHAT (primitives) — POINTERS + OWNER-PROVIDED ONLY`** → pointers the builder will **extract** measured
  values from (its half of the frontier); owner-provided values (declared Pantone, `authored-print`) are
  truth, written `source:"authored"` (never re-derived); `intent` seeds per-atom meaning.
- **`HOW (grammar)` + `generative-rule seeds (if/then)`** → seed `G-*`/`ALGO-*` with stable IDs.
  **`CORE-ASSET FIDELITY CONTRACT`** → drives the fidelity gate (Stage 10). **`GAPS (client-language)`** →
  the builder owns formalization into `GAP-NNN` (two-ledger, Stage 9). **`OPTIONAL`** (incl. `Claude Design
  library: default YES`) → Stage 8.

A handoff that cannot be parsed, or that names no real target repo, is a **parse-or-stop** gate: stop and
report rather than guess. (If a user runs the builder directly in Code with published material and no handoff
block, default `MODE: ANALYZE` and gather the equivalent fields before proceeding.)

### Stage 1 — Scaffold (always first)
Copy the full template set from `assets/templates/` into the target repo, renaming `docs/*` to the repo
root (`README.md`, `CLAUDE.md`, `RESIDENT.md`) and `tokens/*` into `tokens/`. **Create `assets/` (source
binaries: marks, fonts, imagery) and `sources/` (references: brandbook PDFs, exports)** — the D2 material
convention. This creates the valid, empty-but-structured baseplate before any content. Fill the obvious
header fields (`{{BRAND}}`, `{{BRAND_OWNERS}}`, `{{DATE}}`, repo/org).

### Stage 2 — Read material in-repo & fill the canon (by MODE)
Read placed material **only** from the in-repo `assets/` (binaries) and `sources/` (references) — plus any
live-URL pointers the manifest carries. **Never read from Project knowledge** or a tree the manifest didn't
place. Then fill by the handoff's `MODE` (default **ANALYZE**):

- **ANALYZE (default):** read `references/analyze.md`. Inventory sources, mine each consumer's living docs
  **and open PRs**, reconcile conflicts (fresher/shipped wins specifics; identity wins meaning; repo wins
  over external brandbook/Drive; abstract to universal before promoting), harvest before removing junk,
  register consumers in `projections.md`. (Applied-design harvest now runs in Stage 5.)
- **CREATE (rare exception, only on `MODE: CREATE`):** read `references/create.md`. Author from the
  handoff's ratified WHY in four-question order — **consume the handoff, do not re-interview**; fill every
  slot the handoff supports.

For every slot: fill it to full depth if the material supports it; write **"not used"** if the brand
genuinely doesn't use that dimension; otherwise leave the placeholder and log a gap (Stage 9). Keep meaning
in the prose layers and values in the token spine. Mirror essence + grammar into `canon/canon.json` as you go.

---

**Stages 3–5 (PR-B2), Stage 8 (PR-B3), and Stage 10 (PR-B4) are implemented:** source-agnostic asset
acquisition, font acquisition, applied-design harvest, the real prototype + `/design-sync`-ready kit, and the
VALIDATE/AUDIT stage + fidelity gate. **Only Stage 11 (client-clean / scrub) remains a forward-pointer** to
`dev/v2-build-spec.md` (PR-B5) — not yet implemented. Stages 6, 7, 9, 12 carry the validated v1 method.

### Stage 3 — Source-agnostic asset acquisition · BLOCKING (core)
Read `references/asset-acquisition.md`. Acquire build-grade assets from whatever sources exist (any
combination), selecting the extraction technique **per source-type encountered** (existing DTCG/token files >
repo vector masters > website extraction > PDF > design-tool exports > social) — **never assume a PDF**.
Assemble the best-fidelity asset per canon slot with precedence (authored print > sampled; shipped/site > old
brandbook; vector master > raster; existing tokens > extraction). The slot-need-vs-source-exists delta is a
per-slot fidelity **GAP**. (`dev/v2-build-spec.md` §4.3.)

### Stage 4 — Font acquisition · BLOCKING (core)
Read `references/font-acquisition.md`. Acquire the brand's actual typefaces by whatever path the source
offers (embedded-PDF / `@font-face` from a live site / repo files / acquire open via Fontsource). **Licensing
is hard-gated:** self-host only OFL/Apache/Ubuntu or owner-supplied faces (ship the license; rename on a
Reserved Font Name when subsetting); an unlicensed commercial face is a MUST-HAVE fidelity **GAP**, never a
silent fallback (deny-by-default). (`dev/v2-build-spec.md` §4.4.)

### Stage 5 — Applied-design harvest
Harvest the lived design language from the live consumers the scoper pointed at (the *Applied-design harvest*
section of `references/analyze.md`): layout/composition, imagery/photography direction, type-in-use vs
declared, the lived aesthetic — abstracted to universal (stripped of stack/medium), feeding GRAMMAR (rules)
and ESSENCE (meaning), measurable atoms into tokens. Where lived expression diverges from the ratified WHY,
log the divergence; never silently overwrite. (`dev/v2-build-spec.md` §4.5.)

### Stage 6 — Fill the canon (extraction synthesis)
The consolidation point where the canon is filled — **not a separate pass**. Stage 2 routes by MODE and fills
from the placed material; Stages 3–5 acquire the real assets, fonts and applied design. Here the builder
**extracts** the measured primitive values those sources yield and lands them in the canon: meaning to the
prose layers, values to the token spine, mirrored to `canon/canon.json`. The frontier holds throughout — the
builder extracts/derives values, never re-elicits the ratified WHY. (`dev/v2-build-spec.md` §4.1, §4.5.)

> **Stage 2 / Stage 6 note (adjudicated).** In the spec's §3 table, Stage 2 is *read material* and Stage 6 is
> *fill the canon*; PR-B1's SKILL mapping folded the MODE-routed fill into Stage 2, leaving Stage 6 partly
> redundant. Reconciled here by keeping Stage 2 as the merged, load-bearing read+fill entry point and
> reframing Stage 6 as the explicit extraction-synthesis culmination of Stages 2–5 (no duplicate fill, no
> future-PR tag). A literal Stage 2 (read-only) / Stage 6 (fill) re-split to mirror §3 exactly is deferred to
> whichever PR next revisits the PR-B1 spine — out of PR-B2's scope.

### Stage 7 — Token spine
Read `references/token-spine.md`. Author `tokens/base.json` (raw OKLCH + authored/derived `$extensions`),
`tokens/semantic.json` (role aliases), `tokens/component.json` (optional). Keep `$value` plain strings,
aliases as `{tier.category.name}`, category names on the namespace convention. Emit motion/depth tokens if
the brand uses them (DTCG-valid even without a current consumer); omit for a flat/print-only brand.

### Stage 8 — Prototype + `/design-sync`-ready kit · BLOCKING (prototype)
Emit both real deliverables (canon = skeleton, these = deliverable):

- **(a) The presentable prototype (F-025).** Copy `assets/templates/prototype/prototype.html` into the repo
  and fill it from the canon: OKLCH token values inline, the real extracted mark as inline SVG/data-URI,
  acquired fonts via `@font-face`/data-URI, harvested imagery — rendering hero, card, control set, type
  spread, color blocks. It is **self-contained and deterministic** (opens in any browser, no toolchain) — the
  artifact you show a client and the Stage-10 "render real samples" evidence. Never make it depend on the kit.
- **(b) The `/design-sync`-ready kit (F-026).** Scaffold `assets/templates/design-sync-kit/` and fill it from
  the canon (components, tokens, `pkg`/`globalName`, conventions). Read `references/design-sync-kit.md` for
  the converter contract: package-shape default; one-command build (`esbuild` + `ts-morph` + `@types/react`)
  → `dist/index.es.js` + `.d.ts`; `.design-sync/config.json` with **only live-valid keys** (unknown keys fail
  the run); the `@dsCard` first-line marker on every emitted card; the `readmeHeader` conventions header;
  `styles.css` that `@import`s `_ds_bundle.css` and carries the token + `@font-face` closure. **Claude Design
  default YES** (`references/claude-design-adapter.md`; opt-out only on explicit owner request). The `dist/`
  build is **best-effort, never a hard-fail** — `[NO_DIST]` is recoverable by running the build, and (a) is
  the deterministic fidelity artifact regardless.

Re-pin the live `/design-sync` contract before freezing the emitter (`dev/v2-build-spec.md` §4.6 step 0 — the
contract is server-side/version-fluid via `get_claude_design_prompt`).

### Stage 9 — Coverage + gaps
Read `references/coverage-checklist.md` and `references/gap-protocol.md`. Formalize the handoff's
client-language gaps into `GAP-NNN` (two-ledger); walk the universal must-haves; for each unmet one, add a
`GAP-NNN` row to `RESIDENT.md` (severity + proposed resolution). Do **not** pad the checklist defensively —
the universality stress test is the real net.

### Stage 10 — VALIDATE / AUDIT + fidelity gate · BLOCKING
Read `references/validate-audit.md`. Judge the build on **fidelity**, not rule-compliance of an empty
skeleton. Five parts:

- **Fidelity gate** — consume the handoff's `CORE-ASSET FIDELITY CONTRACT` (parsed at Stage 0): a missing or
  low-fidelity **core** asset is **fidelity-blocking → the build FAILS** (not "pass with gaps"); non-core gaps
  still log and the repo stays valid (Lego). Layered thresholds: zero tolerance on the mark + primary color
  tokens, higher on gradients/illustration; per-component-variant + per-brand baselines.
- **Mechanism is shape-dependent** (do not mandate Storybook): **package-shape (default)** evidences fidelity
  via the deterministic HTML prototype (render real samples) + the kit's `/design-sync` gates
  (`[FONT_MISSING]` must-resolve, the hollow-render gate `[RENDER]`/`[RENDER_BLANK]`/`[RENDER_THIN]`,
  `package-validate.mjs` exit 0, the absolute Styled/Complete/Plausible grade) + the content audit + the
  contract pass/fail — **no pixel-diff VRT**. **Storybook-shape (only if the brand already ships Storybook +
  Playwright)** adds a pixel-match VRT oracle (Chromatic default; Percy / BackstopJS alternatives).
- **Content audit** — rule-by-rule audit of all written + visual content (authored AND generated) against the
  `G-*`/`ALGO-*` GRAMMAR rules and ESSENCE/voice (anti-promise, lexicon, don'ts).
- **Render real samples** — the Stage-8 HTML prototype is the evidence.
- **Client-confirmation is a HUMAN gate** — assemble the audit + samples + open ratification GAPs into the PR
  and **stop**; sign-off is human PR review. Never auto-confirm or auto-stamp "Ratified by…"; default state is
  unratified-pending. (The scrub apparatus is Stage 11 / PR-B5.)

Retained existing checks (do-not-regress):
- **Output-agnostic check:** grep the canon for any output/medium-named section; there must be none.
- **DTCG validity:** the token files parse and the alias graph resolves (every `{...}` points to a real leaf).
- **Universality stress test:** pick **three arbitrary artifacts the canon names nowhere** (span media —
  e.g. digital, print, spatial). Walk the derivation method for each; confirm the canon decides each one
  without enumerating it. A failure means a missing *rule/atom* — add that, never a per-artifact section.

### Stage 11 — Client-clean / scrub · BLOCKING · *PR-B5*
Scrub reference-brand bleed, tool self-attribution, scaffolding chatter; never auto-stamp ratification.
(`dev/v2-build-spec.md` §4.8.)

### Stage 12 — Commit + PR
Update `RESIDENT.md` (decisions, Open Items, change log) and commit on a `claude/<name>` branch; open a PR
carrying the audit + samples + open ratification GAPs for the owners unless told otherwise.

## Principle to keep in mind
The repo is the source; consumers re-project from it and never override it. **kit = constant, canon =
variable** — this same builder clones a new brand by swapping the canon, which is why it must stay strictly
brand-agnostic and output-agnostic. When in doubt, move a truth up a layer and let GRAMMAR derive the output.
