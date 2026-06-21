# {{BRAND}} — CLAUDE.md (agent ops & guardrails)

> The canonical brand source for {{BRAND}}. This repo is the truth; consumers re-project from it.
> Read `RESIDENT.md` first, then this file, before touching anything.

## What this repo is
A four-layer brand canon (INDEX/ESSENCE/PRIMITIVES/GRAMMAR) + 2 satellites + a DTCG/OKLCH token spine.
Output-agnostic: nothing is organized around a specific output. Generative, not a catalog.

## How to use it
To decide any artifact, follow the derivation method in `canon/00-index.md` (ESSENCE → PRIMITIVES →
GRAMMAR → DATA POINTER → register as a PROJECTION). Cite rules by their `G-*` / `ALGO-*` IDs.

## Guardrails
- **The mark, the palette, the typefaces, and `tokens.json` change only by brand-owner decision** — never
  by local creative judgment. Generation tools use the real approved assets; they never recreate or
  approximate them.
- **Edit the layer docs + `tokens.json` / `canon.json` directly.** Never edit a projection and back-port.
  Any compiled master is generated, never hand-edited.
- **Volatile values live in the source system** (see `data-map.md`), never frozen into a canon layer.
- **Tokens:** OKLCH literal in `$value`; consumers emit `oklch()` via an OKLCH-preserving transform, never
  `color/css`. Authored print values in `$extensions` are truth and are not re-derived. (See `projections.md`.)
- **Brand voice rules apply to all copy** (anti-promise + lexicon in ESSENCE).

## Conventions
- {{asset conventions, e.g. SVG fills explicit per path; font formats}}

## Open items
Tracked in `RESIDENT.md` (GAP-NNN). Each empty must-have slot is a logged gap, not a silent hole.
