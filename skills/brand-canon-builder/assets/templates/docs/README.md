# {{BRAND}} — Brand Canon

The canonical, output-agnostic source of truth for the {{BRAND}} brand. Humans and AI agents derive every
brand decision — for any medium, named here or not — from this repo.

## Start here

- **`canon/00-index.md`** — the map and how to make any decision.
- **`canon/01-essence.md`** — *why* the brand is what it is (meaning, voice, positioning).
- **`canon/02-primitives.md`** — *what* the fixed atoms are (color, type, the mark, …).
- **`canon/03-grammar.md`** — *how* to combine them (generative rules + algorithms).
- **`tokens.json` / `tokens/`** — the machine spine (DTCG — the W3C design-token standard; OKLCH — a perceptual color space); what consumers ingest.

Deliverables projected from the canon (the canon is the skeleton; these are what you ship):

- **`<brand>-keystone.md` + `<brand>-visual-keystone.md`** — the resident brand-AI set (two lobes of one brain — load BOTH), with `satellites/asset-index.md` as its asset map: an AI thinks / speaks / designs *as* the brand.
- **`prototype.html`** — a real, presentable prototype rendered from the canon (opens in any browser, no build).
- **`design-sync-kit/`** — the compiled, `/design-sync`-ready component library.

Satellites (not canon): `data-map.md` (where volatile values live) · `projections.md` (who consumes this).

## Principle

The repo is the source; consumers re-project from it and never override it. If this system can decide an
artifact it never names, it is working. See `canon/00-index.md` for the precedence rule and the
universality test.

## Status

See `RESIDENT.md` for the living architecture, decisions, and Open Items (anything still to be filled or
ratified).
