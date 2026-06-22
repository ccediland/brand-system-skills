# Font acquisition — multi-source, license-gated (Stage 4)

Read when running Stage 4. Acquire the brand's actual typefaces (never punt to a fallback stack), from
whatever path the source offers, within a hard licensing boundary.

## Acquisition by path

- **Embedded in a source PDF** → extract via PyMuPDF (`Document.get_page_fonts` + `extract_font(xref)`).
- **Referenced by a live website** → download the actual `@font-face` files from the CSS `src: url(...)`
  (prefer WOFF2).
- **Present in a Drive/repo** → read the font files directly.
- **Open/libre, named but not supplied** → acquire programmatically via Fontsource (NPM + REST) or
  google-webfonts-helper.
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
fidelity GAP that blocks the fidelity gate (Stage 10) — not a silent fallback.
