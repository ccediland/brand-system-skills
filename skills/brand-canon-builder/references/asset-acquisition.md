# Asset acquisition — source-agnostic, medium-blind (Stage 3; also the sources for Stage 5)

Read when running Stage 3. The builder acquires the real, build-grade brand assets the canon's slots need —
from whatever the brand has, in any form or combination.

## Governing law (medium-agnostic)

The canon's slots define what is NEEDED; open discovery of whatever the brand has, in any form or
combination, defines what EXISTS; the delta is a tracked GAP with a fidelity grade. Never assume a
source type is present. Select the extraction technique per source-type encountered — never assume a
PDF. (This is the builder-side mirror of the scoper's medium-agnostic intake principle.)

## Stated-spec-read (rectoral — read before the matrix)

The brand's declared truth is authoritative; tool metadata only corroborates. A brand's typeface NAME and
its declared HEX/Pantone — as printed in a brandbook, named on a swatch, or set in CSS — are the source of
truth. Tool-derived metadata (`pdffonts`, embedded-font tables, a sampled pixel) is corroboration only,
never a substitute, because brand type is frequently outlined/flattened to shapes: the font table then
reports the studio's layout font, or nothing at all. (This is the root-cause fix for the v2 miss where an
outlined brand face went unidentified and the agency's embedded layout font was reported in its place.)

Rule, applied across every branch of the matrix below:
1. **Read the stated spec first.** Extract the declared font name and declared color values from the page
   text / swatch labels / CSS custom properties (PyMuPDF text extraction, OCR, or computed-style read).
   That declared value is the datum; record it with `source: declared-spec`.
2. **Use tool metadata only to corroborate.** `pdffonts` / `get_page_fonts` / a sampled hex either agrees
   (raise confidence) or disagrees (flag the conflict) — it never overrides the stated spec.
3. **Flag agency-embedded contamination.** When the font table reports a face the brandbook never names
   (a studio layout font), do not adopt it; record the named face from the spec and treat the table entry
   as noise.
4. **No stated spec + no recoverable value → it is a GAP, not a guess.** An outlined/flattened face with no
   name in the material degrades to image-based font-matching (Stage 4) or a MUST-HAVE fidelity GAP; a color
   with no declared value degrades to a sampled reference flagged for owner confirmation. Never canonize a
   tool-derived value as if it were stated truth.

Every datum this stage records carries the provenance spine (`gap-protocol.md` § The provenance spine):
`source` / `confidence` / `owner` / `freshness`. A sampled or matched value enters at `confidence:
hypothesis` and must be owner-confirmed before it is promoted to canonical brand truth.

## The acquisition matrix — per source-type (if present)

| Source (if it exists) | Technique / tool | Typical fidelity |
|---|---|---|
| Existing DTCG / token files / design system (Tailwind config, CSS vars, Figma variables) | ingest directly to the DTCG spine (Style Dictionary custom formats; Tokens Studio / `token-transformer` for Figma; CSS vars 1:1) | highest — read, don't re-sample |
| **Drive / repo** vector masters | SVG used directly; AI via `opendesigndev/illustrator-parser-pdfcpu` (Node/WASM, no Illustrator license, preserves spot/CMYK) or Ghostscript `-sDEVICE=eps2write`; EPS/PDF via Inkscape | high when masters present |
| **Live website(s)** | headless computed-style extractor: Dembrandt `--dtcg` (W3C DTCG out, OKLCH, MCP, Drift baseline) primary; designlang/design-extract for breadth; Firecrawl `branding` (logo as inline SVG data-URI) as the JS-render/bot-protected fallback; download `@font-face` files from CSS `src:url()`. Read the declared font-family stack + custom-property color values as the stated spec; the computed pixel only corroborates | medium-high — real SVG/fonts/colors |
| Brandbook PDF | Stated-spec first: read the named typeface + declared HEX/Pantone from the page text/swatches. Then PyMuPDF: `get_drawings()` (vector paths → `Shape`), `extract_font`, `get_images()` (raster only) — `extract_font` corroborates the named face, it does not name it. Inkscape `--pdf-poppler --export-text-to-path --export-area-drawing` or pdf2svg for vector masters | medium — vector only if embedded as paths |
| **Design-tool exports** (Figma/Canva) | Figma variables/styles → DTCG (Tokens Studio); layer/style names are the brand's declared truth; Canva export ≈ brandbook PDF | high (Figma) / low (Canva) |
| **Social media** | observe applied aesthetic + grab the downloadable avatar/imagery (best-effort; anti-scraping/rate-limits). Everything here is observed → `confidence: hypothesis`, owner-confirm before canonizing | low — reference, not master |
| **Nothing / a stray logo** | vectorize/clean the one mark; derive an OKLCH palette from it; pick an OFL stand-in face; emit a small valid DTCG spine; the rest = GAP (author only on `MODE: CREATE`) | n/a |

## ingest-token map — route by the contract's declared `ingest:`

The handoff's manifest carries an `ingest:` token per item (`brand-canon-scoper/references/handoff-format.md`).
That token is the contract's **authoritative HOW-to-read** — consume it to pick the matrix row directly,
instead of re-deriving routing from a detected source-type. Each of the five tokens maps to a row above:

| `ingest:` token | Routes to (matrix row) | What it tells the builder to do |
|---|---|---|
| `vector-extract` | Drive/repo vector masters · Brandbook-PDF vector paths | extract embedded vector paths to a clean master (SVG direct / `illustrator-parser-pdfcpu` / Ghostscript / PyMuPDF `get_drawings()` + copy-region) |
| `computed-css` | Live website(s) · the CONSUMERS track | headless computed-style read (Dembrandt `--dtcg`, OKLCH) on the reachable `url:`; download `@font-face` files; read declared font-stack + custom-property colors as the stated spec, pixel corroborates only |
| `design-file-native` | Existing DTCG/token files · Design-tool exports (Figma/Canva) | ingest the native source directly to the DTCG spine (Figma variables/styles via Tokens Studio; CSS vars 1:1; Canva export ≈ brandbook PDF) — read, don't re-sample |
| `ocr-visual` | Brandbook PDF (stated-spec read) · raster references | OCR/visual read of the page text + swatch labels for the declared font name + declared HEX/Pantone (`source: declared-spec`); a flattened-image source yields a reference, not a master |
| `font-match` | (degraded face path; feeds Stage 4) | image-based font-matching for an unnamed/outlined face — the value enters at `confidence: hypothesis`, owner-confirm before canonizing; no match → MUST-HAVE fidelity GAP |

`n/a` (or an absent token) is the only case where the builder falls back to detecting the source-type and
selecting the row itself. A declared token always wins over re-derivation; if the declared token and the
detected source-type disagree, follow the token and flag the conflict (the contract is the brief).

## Fidelity ceilings (design these into the GAP logic)

- `get_drawings()` cannot tell which paths form one logical figure (a logo may be hundreds of disjoint
  paths); `get_images()` misses vector-drawn marks entirely. For a clean vector master, copy the mark region
  into a fresh document rather than crop (Inkscape produces huge SVG from full pages).
- Inkscape on a flattened-image PDF yields a lossless raster copy, not a vector master.
- Computed-style extractors sample one viewport — run several for the responsive curve.
- A core slot whose best available source is raster-only cannot be rebuilt to a master → fidelity GAP.
- Outlined/flattened type cannot be recovered as a named font by any metadata tool — it requires the stated
  spec, image-based font-matching, or a GAP. Tool silence is not absence of a brand face.

## Cross-source assembly & precedence

For each canon slot, assemble the best-fidelity asset across all present sources, applying precedence:

1. owner-declared authored print/Pantone (from the handoff) > sampled/derived;
2. stated spec (named font, declared color) > tool-derived metadata (`pdffonts`, sampled pixel);
3. shipped repo / current site treatment > old brandbook for *current* treatment;
4. vector master > raster;
5. existing DTCG/token file > computed-style extraction > PDF sampling > social.

Reconcile by recency + source authority. Where two authoritative sources disagree (brandbook Pantone vs site
hex), record both — authored print canonical for print, sampled for screen — and flag the conflict. The
slot-need-vs-source-exists delta is a per-slot fidelity GAP (e.g. "logo: raster-only, vector master MISSING").
Each assembled value keeps its provenance spine, so the canon never presents a `hypothesis`-grade datum as
confirmed truth.

## Frontier & routing

The builder extracts measured/derived values; it never re-elicits intent (the scoper ratified the WHY).
`Wappalyzer`/`BuiltWith` detect the *presence* of font services/frameworks, not token values — use only to
route extraction, never as a source of truth. The stated-spec-read rule is the same principle applied to
extraction metadata: presence and corroboration, never authority.

## Dependencies (declare in the install docs)

PDF/vector: PyMuPDF (AGPL/commercial — license note), poppler/`pdf2svg`, Inkscape, `illustrator-parser-pdfcpu`,
Ghostscript. Website: Dembrandt / designlang (OSS, Playwright), Firecrawl (credit-priced). All best-effort: a
missing toolchain degrades a source to GAP, it never crashes the build (Lego property holds).
