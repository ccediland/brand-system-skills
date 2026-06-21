---
name: brand-canon-builder
description: Build or extend a canonical, brand-agnostic, output-agnostic brand source ("brand canon") for ANY brand — a four-layer canon (essence/primitives/grammar plus an index) and a DTCG/OKLCH token spine that any consumer (a website, an app, a slide deck, a print kit, a design tool) derives any artifact from. Use this whenever someone wants to create a brand system, design system, brand guidelines, brand book, design tokens, a single source of truth for a brand's identity/voice/visual language, or wants to consolidate scattered brand decisions (across repos, a brandbook PDF, a design library) into one canonical repo — greenfield (nothing yet) or brownfield (existing material). Triggers on "brand system", "design system", "brand canon", "design tokens", "brand guidelines", "brandbook", "set up our brand", "single source of truth for our brand", "make our brand work in Claude Design". Builds the repo, fills what's known, logs the rest as tracked gaps, and emits a DTCG token spine that projects losslessly into downstream consumers.
---

# Brand Canon Builder

Build a **brand canon**: the canonical, output-agnostic source of truth for a brand, that any consumer (AI
or human) extracts from to decide any artifact — including ones the canon never names. This skill scaffolds
the canon, fills what the brand's material supports, logs the rest as tracked gaps, and emits a DTCG/OKLCH
token spine. It works greenfield (a brand with nothing) or brownfield (existing repos / brandbook / library).

The defining property is the **Lego principle**: the repo is *always* createable and valid, even for a brand
that arrives with nothing. Whatever is missing always resolves to a GOAL, a tracked PENDING DECISION, and a
SKELETON slot — never a blocked, empty shell.

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

### Step 0 — Detect mode & locate the target
Determine **greenfield** (no prior brand material) vs **brownfield** (existing repos / brandbook / design
library). Confirm the target repo path and the brand name + owners. If the user came from the SCOPER, they
will paste a handoff block — use it as the brief.

### Step 1 — Scaffold (always first)
Copy the full template set from `assets/templates/` into the target repo, renaming `docs/*` to the repo
root (`README.md`, `CLAUDE.md`, `RESIDENT.md`) and `tokens/*` into `tokens/`. This creates the valid,
empty-but-structured baseplate before any content. Fill the obvious header fields (`{{BRAND}}`,
`{{BRAND_OWNERS}}`, `{{DATE}}`, repo/org).

### Step 2 — Fill the canon
- **Greenfield:** read `references/greenfield.md`. Elicit in four-question order (why → what → how); fill
  every slot the brief supports.
- **Brownfield:** read `references/brownfield.md`. Inventory sources, mine each consumer's living docs **and
  open PRs**, reconcile conflicts (fresher/shipped wins specifics; identity wins meaning; repo wins over
  external brandbook/Drive; abstract to universal before promoting), harvest before removing junk, register
  consumers in `projections.md`.

For every slot: fill it to full depth if the material supports it; write **"not used"** if the brand
genuinely doesn't use that dimension; otherwise leave the placeholder and log a gap (Step 4). Keep meaning
in the prose layers and values in the token spine. Mirror essence + grammar into `canon/canon.json` as you go.

### Step 3 — Build the token spine
Read `references/token-spine.md`. Author `tokens/base.json` (raw OKLCH + authored/derived `$extensions`),
`tokens/semantic.json` (role aliases), `tokens/component.json` (optional). Keep `$value` plain strings,
aliases as `{tier.category.name}`, category names on the namespace convention. Emit motion/depth tokens if
the brand uses them (DTCG-valid even without a current consumer); omit for a flat/print-only brand.

### Step 4 — Coverage pass + log gaps
Read `references/coverage-checklist.md` and `references/gap-protocol.md`. Walk the universal must-haves; for
each unmet one, add a `GAP-NNN` row to `RESIDENT.md` (severity + proposed resolution). Do **not** pad the
checklist defensively — the universality stress test is the real net.

### Step 5 — Optional: attach Claude Design
Only if the brand wants a live component library in claude.ai/design. Read
`references/claude-design-adapter.md`, copy the adapter templates, fill from the canon, register Claude
Design as a consumer. Skip entirely otherwise.

### Step 6 — Validate (the build's quality gate)
- **Output-agnostic check:** grep the canon for any output/medium-named section; there must be none.
- **DTCG validity:** the token files parse and the alias graph resolves (every `{...}` points to a real leaf).
- **Universality stress test:** pick **three arbitrary artifacts the canon names nowhere** (span media —
  e.g. digital, print, spatial). Walk the derivation method for each; confirm the canon decides each one
  without enumerating it. A failure means a missing *rule/atom* — add that, never a per-artifact section.
- Update `RESIDENT.md` (decisions, Open Items, change log) and commit on a `claude/<name>` branch; open a PR
  for the owners unless told otherwise.

## Principle to keep in mind
The repo is the source; consumers re-project from it and never override it. **kit = constant, canon =
variable** — this same builder clones a new brand by swapping the canon, which is why it must stay strictly
brand-agnostic and output-agnostic. When in doubt, move a truth up a layer and let GRAMMAR derive the output.
