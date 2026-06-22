# Asset acquisition — source-agnostic, medium-blind (Stage 3; also the sources for Stage 5)

Read when running Stage 3. The builder acquires the real, build-grade brand assets the canon's slots need —
from whatever the brand has, in any form or combination.

## Governing law (medium-agnostic)

The canon's slots define what is **NEEDED**; open discovery of whatever the brand has, in any form or
combination, defines what **EXISTS**; the delta is a tracked **GAP** with a fidelity grade. **Never assume a
source type is present.** Select the extraction technique **per source-type encountered** — never assume a
PDF. (This is the builder-side mirror of the scoper's medium-agnostic intake principle.)

## The acquisition matrix — per source-type (if present)

| Source (if it exists) | Technique / tool | Typical fidelity |
|---|---|---|
| Existing **DTCG / token files / design system** (Tailwind config, CSS vars, Figma variables) | ingest **directly** to the DTCG spine (Style Dictionary custom formats; Tokens Studio / `token-transformer` for Figma; CSS vars 1:1) | **highest** — read, don't re-sample |
| **Drive / repo** vector masters | SVG used directly; **AI** via `opendesigndev/illustrator-parser-pdfcpu` (Node/WASM, no Illustrator license, preserves spot/CMYK) or Ghostscript `-sDEVICE=eps2write`; EPS/PDF via Inkscape | high when masters present |
| **Live website(s)** | headless computed-style extractor: **Dembrandt** `--dtcg` (W3C DTCG out, OKLCH, MCP, Drift baseline) primary; **designlang/design-extract** for breadth; **Firecrawl** `branding` (logo as inline SVG data-URI) as the JS-render/bot-protected fallback; download `@font-face` files from CSS `src:url()` | medium-high — real SVG/fonts/colors |
| Brandbook **PDF** | **PyMuPDF**: `get_drawings()` (vector paths → `Shape`), `extract_font`, `get_images()` (raster only). **Inkscape** `--pdf-poppler --export-text-to-path --export-area-drawing` or **pdf2svg** for vector masters | medium — vector only if embedded as paths |
| **Design-tool exports** (Figma/Canva) | Figma variables/styles → DTCG (Tokens Studio); Canva export ≈ brandbook PDF | high (Figma) / low (Canva) |
| **Social media** | observe applied aesthetic + grab the downloadable avatar/imagery (best-effort; anti-scraping/rate-limits) | low — reference, not master |
| **Nothing / a stray logo** | vectorize/clean the one mark; derive an OKLCH palette from it; pick an OFL stand-in face; emit a small valid DTCG spine; the rest = GAP (author only on `MODE: CREATE`) | n/a |

## Fidelity ceilings (design these into the GAP logic)

- `get_drawings()` cannot tell which paths form one logical figure (a logo may be hundreds of disjoint
  paths); `get_images()` misses vector-drawn marks entirely. For a clean vector master, copy the mark region
  into a **fresh** document rather than crop (Inkscape produces huge SVG from full pages).
- Inkscape on a flattened-image PDF yields a lossless **raster** copy, not a vector master.
- Computed-style extractors sample **one viewport** — run several for the responsive curve.
- A core slot whose best available source is raster-only **cannot be rebuilt to a master** → fidelity GAP.

## Cross-source assembly & precedence

For each canon slot, assemble the best-fidelity asset across **all** present sources, applying precedence:

1. owner-declared authored print/Pantone (from the handoff) > sampled/derived;
2. shipped repo / current site treatment > old brandbook for *current* treatment;
3. vector master > raster;
4. existing DTCG/token file > computed-style extraction > PDF sampling > social.

Reconcile by recency + source authority. Where two authoritative sources disagree (brandbook Pantone vs site
hex), record both — authored print canonical for print, sampled for screen — and **flag the conflict**. The
slot-need-vs-source-exists delta is a per-slot fidelity GAP (e.g. "logo: raster-only, vector master MISSING").

## Frontier & routing

The builder **extracts** measured/derived values; it never re-elicits intent (the scoper ratified the WHY).
`Wappalyzer`/`BuiltWith` detect the *presence* of font services/frameworks, not token values — use only to
route extraction, never as a source of truth.

## Dependencies (declare in the install docs)

PDF/vector: PyMuPDF (AGPL/commercial — license note), poppler/`pdf2svg`, Inkscape, `illustrator-parser-pdfcpu`,
Ghostscript. Website: Dembrandt / designlang (OSS, Playwright), Firecrawl (credit-priced). All best-effort: a
missing toolchain degrades a source to GAP, it never crashes the build (Lego property holds).
