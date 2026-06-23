# Font acquisition — multi-source, license-gated (Stage 4)

Read when running Stage 4. Acquire the brand's actual typefaces (never punt to a fallback stack), from
whatever path the source offers, within a hard licensing boundary.

## Stated-spec-read for type (the naming authority)

The brand's declared typeface NAME is the source of truth; font-table metadata only corroborates. Read the
named face from the brandbook page / site CSS `font-family` / design-tool style name first, and treat that
name as authoritative. `pdffonts`, PyMuPDF `get_page_fonts`, and embedded-font tables corroborate the named
face — they do not name it — because brand type is frequently outlined/flattened to shapes, in which case the
table reports the studio's embedded layout font (or nothing). When the table names a face the material never
declares, flag it as agency-embedded contamination and keep the declared name.

Consequences for acquisition:
- A face named in the spec but unrecoverable from the font table is still the brand face — acquire it by name
  (below), do not substitute the table's layout font.
- An outlined face with no name anywhere degrades to image-based font-matching (WhatTheFont / Fontspring
  Matcherator for clean printed faces; a vision-model read for hand-lettered/custom), recorded at
  `confidence: hypothesis` pending owner confirmation — or a MUST-HAVE fidelity GAP if no match is credible.

## Acquisition by path

- **Embedded in a source PDF** → extract via PyMuPDF (`Document.get_page_fonts` + `extract_font(xref)`) to
  corroborate the named face and recover the file when the embed is the real brand face (not a layout font).
- **Referenced by a live website** → download the actual `@font-face` files from the CSS `src: url(...)`
  (prefer WOFF2).
- **Present in a Drive/repo** → read the font files directly.
- **Open/libre, named but not supplied** → acquire programmatically via Fontsource (NPM + REST) or
  google-webfonts-helper.
- **Outlined / unnamed** → image-based font-matching → named candidate → acquire by the paths above, or GAP.
- Subset / recompress with `fonttools` + `woff2` where size matters.

## Licensing boundary (the hard rule)

- Self-host only OFL / Apache / Ubuntu-licensed or owner-supplied fonts; ship the license text
  (e.g. `OFL.txt`) alongside the files.
- **SIL OFL 1.1 nuance:** format-conversion and subsetting count as "modification" under the license,
  which triggers the Reserved-Font-Name rename requirement *if the face declares an RFN*. When the
  builder subsets/recompresses a self-hosted RFN font, it must rename the in-repo family accordingly.
- **Unlicensed commercial fonts must NEVER be embedded or pirated** → a MUST-HAVE fidelity GAP with a
  foundry/purchase pointer, unless the owner supplied licensed files (placed in `assets/`).
- **No automated "is this commercial?" classifier exists** → deny-by-default: self-host only when an
  SPDX/OFL marker or an explicit owner attestation is present. When in doubt, GAP it.

## Output

Self-hosted faces land under `assets/fonts/` with their license file; the token spine's `fontFamily` and the
kit's `styles.css` `@font-face` closure reference them. A named-but-unacquirable core face is a MUST-HAVE
fidelity GAP that blocks the fidelity gate (Stage 10) — not a silent fallback. Every face the builder records
carries the provenance spine (`gap-protocol.md`): a name from the stated spec is `source: declared-spec`; a
match is `source: matched, confidence: hypothesis` until the owner confirms.
