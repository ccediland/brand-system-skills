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
> **not** done. (Stages 8 and 10 below, specced in `dev/v2-build-spec.md`, are where this is enforced;
> this PR-B1 lands the mode + handoff spine the rest builds on.)

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
complete. Stages 0–2 are the **mode + handoff spine** (this PR-B1). Stages 3–12 are titled here as
forward-pointers to the spec; they are **not yet implemented** and land in the staged PRs noted against each.

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
  register consumers in `projections.md`. (Applied-design harvest is specced for PR-B2.)
- **CREATE (rare exception, only on `MODE: CREATE`):** read `references/create.md`. Author from the
  handoff's ratified WHY in four-question order — **consume the handoff, do not re-interview**; fill every
  slot the handoff supports.

For every slot: fill it to full depth if the material supports it; write **"not used"** if the brand
genuinely doesn't use that dimension; otherwise leave the placeholder and log a gap (Stage 9). Keep meaning
in the prose layers and values in the token spine. Mirror essence + grammar into `canon/canon.json` as you go.

---

**Stages 3–12 — specced in `dev/v2-build-spec.md`, not yet implemented.** Forward-pointers only; each lands
in a later staged PR. Do not implement them in this PR.

### Stage 3 — Source-agnostic asset acquisition · BLOCKING (core) · *PR-B2*
Acquire build-grade assets from whatever sources exist (any combination), per the spec's acquisition matrix;
assemble best-fidelity per slot with precedence; the slot-need-vs-source-exists delta is a fidelity GAP.
(`dev/v2-build-spec.md` §4.3.)

### Stage 4 — Font acquisition · BLOCKING (core) · *PR-B2*
Multi-source, license-gated font acquisition (OFL/RFN, deny-by-default); else a fidelity GAP.
(`dev/v2-build-spec.md` §4.4.)

### Stage 5 — Applied-design harvest · *PR-B2*
Harvest the lived design language from live consumers → GRAMMAR/ESSENCE. (`dev/v2-build-spec.md` §4.5;
stub in `references/analyze.md`.)

### Stage 6 — Fill the canon (extraction) · *PR-B2+*
Builder **extracts** measured primitives from the pointed-to sources; meaning in prose, values in tokens.
(`dev/v2-build-spec.md` §4.1, §4.5.)

### Stage 7 — Token spine
Read `references/token-spine.md`. Author `tokens/base.json` (raw OKLCH + authored/derived `$extensions`),
`tokens/semantic.json` (role aliases), `tokens/component.json` (optional). Keep `$value` plain strings,
aliases as `{tier.category.name}`, category names on the namespace convention. Emit motion/depth tokens if
the brand uses them (DTCG-valid even without a current consumer); omit for a flat/print-only brand.

### Stage 8 — Prototype + `/design-sync`-ready kit · BLOCKING (prototype) · *PR-B3*
Emit a self-contained presentable prototype + a compiled-`dist/`-ready component library (package-shape
default) + the `/design-sync` upload bundle. Claude Design library default YES. (`dev/v2-build-spec.md` §4.6;
gated on re-verifying the live `/design-sync` contract.)

### Stage 9 — Coverage + gaps
Read `references/coverage-checklist.md` and `references/gap-protocol.md`. Formalize the handoff's
client-language gaps into `GAP-NNN` (two-ledger); walk the universal must-haves; for each unmet one, add a
`GAP-NNN` row to `RESIDENT.md` (severity + proposed resolution). Do **not** pad the checklist defensively —
the universality stress test is the real net.

### Stage 10 — VALIDATE / AUDIT + fidelity gate · BLOCKING · *PR-B4*
Output-agnostic + DTCG + universality (below) **plus** the fidelity gate (layered-threshold VRT consuming the
`CORE-ASSET FIDELITY CONTRACT`), content audit, and rendered real samples. A missing or low-fidelity **core**
asset FAILS the build. (`dev/v2-build-spec.md` §4.7.) The retained existing checks:
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
