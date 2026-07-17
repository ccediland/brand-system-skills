# {{BRAND}} — CLAUDE.md (agent ops & guardrails)

> The canonical brand source for {{BRAND}}. This repo is the truth; consumers re-project from it.
> Read `RESIDENT.md` first, then this file, before touching anything.

## What this repo is
A four-layer brand canon (INDEX/ESSENCE/PRIMITIVES/GRAMMAR) + 2 satellites + a DTCG/OKLCH token spine.
Output-agnostic: nothing is organized around a specific output. Generative, not a catalog.

## How to use it
To decide any artifact, follow the derivation method in `canon/00-index.md` (ESSENCE → PRIMITIVES →
GRAMMAR → DATA POINTER → register as a PROJECTION). Cite rules by their `G-*` / `ALGO-*` IDs.

## Edits map — how a client directive becomes traceable surgery
The client's future asks arrive VERY general ("I don't like this color / it's everywhere", "the brand
doesn't say/do this", "not that kind of animation"). Shared roots live in several places (the drift the
reconciliation gate polices), so every edit follows a ROUTE: which files, in which order, then which gates
re-run. Always finish with `node tools/run-gates.mjs` (the board must return to its pre-edit verdict or
better).

| Directive class (client language) | Files to touch, in order | Gates to re-run |
|---|---|---|
| a COLOR changes / is disliked | `tokens/base.tokens.json` (the one root) → `node tools/scheme-derive.mjs` (re-derive schemes) → `node tools/tokens-project.mjs` (re-emit the consumer string projection) → re-emit prototype + kit styles from tokens → `canon/02-*` intent prose if the meaning changed | audit-lint (R1/R3/R6a drift) · run-gates |
| the brand "doesn't say / never says X" (voice) | `canon/01-*` ESSENCE (anti-promise / lexicon) → keystone re-emit (SPEAK/§5) → prototype copy | content audit (agent-gates) · deny over client rows · run-gates |
| a RULE feels wrong (spacing, usage, combination) | `canon/03-*` GRAMMAR (`G-*`/`ALGO-*` by ID) → `canon/canon.json` mirror → keystone re-emit (DESIGN-as) | audit-lint (R4 named refs) · run-gates |
| the MARK changes | `canon/mark.svg` (THE single source) → prototype `#brand-mark` + kit `Mark.tsx` re-inline byte-equal → fidelity re-measure | audit-lint (R6b) · fidelity-diff · run-gates |
| an ASSET is added / replaced | place under `assets/`/`sources/` + hash into `CHECKSUMS.txt` → row in `satellites/asset-index.md` → `data-asset` surface in the brandbook (or an open GAP) | audit-lint (R3/R6d/R8) · run-gates |
| a SCHEME (dark/contrast) feels off | `canon/canon.json › schemes` → `node tools/scheme-derive.mjs` → prototype toggle re-check | audit-lint (R7) · run-gates |
| a GAP gets its answer | fill the owning layer/token per the gap's **Resolution target** column → flip the `RESIDENT.md` row to CLOSED (ratified) | audit-lint (R4/R5) · run-gates |

Update-protocol invariants: edit the ROOT, never a projection (no back-porting); re-emit everything the
root feeds (schemes, keystone, prototype, kit) rather than patching downstream; every edit ends with the
board green and a `RESIDENT.md` change-log line. Docs stay TIMELESS: transient state lives ONLY in the
`RESIDENT.md` Open Items + Change log — never scattered stamps in layer docs.

## Guardrails
- **The mark, the palette, the typefaces, and `tokens.json` change only by brand-owner decision** — never
  by local creative judgment. Generation tools use the real approved assets; they never recreate or
  approximate them.
- **Edit the layer docs + `tokens.json` / `canon.json` directly.** Never edit a projection and back-port.
  Any compiled master is generated, never hand-edited.
- **Volatile values live in the source system** (see `data-map.md`), never frozen into a canon layer.
- **Tokens:** OKLCH literal in `$value`; consumers emit `oklch()` via an OKLCH-preserving transform, never
  `color/css`. Authored print values in `$extensions` are truth and are not re-derived. (See `projections.md`;
  for DTCG / OKLCH / "OKLCH-preserving transform" / `color/css`, see the glossary in `canon/00-index.md`.)
- **Brand voice rules apply to all copy** (anti-promise + lexicon in ESSENCE).

## Conventions
- {{asset conventions, e.g. SVG fills explicit per path; font formats}}

## Open items
Tracked in `RESIDENT.md` (GAP-NNN). Each empty must-have slot is a logged gap, not a silent hole.
