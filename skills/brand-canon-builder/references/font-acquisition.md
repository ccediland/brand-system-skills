# Font acquisition — multi-source, redistribution-gated (Stage 4)

Read when running Stage 4. Acquire the brand's actual typefaces (never punt to a fallback stack), from
whatever path the source offers. Licensing gates REDISTRIBUTION, never capability — see the posture below.

## License posture — a dependency + a confirmation, never a capability gate

A license is two things and only two things: a **dependency** (the builder needs the FILE to render the
brand's real type) and a **confirmation request** (a visible license/commercial-use confirmation GAP the
owner resolves). It is NEVER a gate on the builder's technical or creative capability. The emitted repo and
its project are PRIVATE: the build, the prototype render, the fidelity measurement, and every local evidence
artifact use the brand's REAL face when the file exists — absence of license *proof* does not degrade any of
them. Degrading the render to a lookalike "to stay license-clean" produces a prototype that misrepresents the
brand — the render is the one surface that must be true.

The ONLY real gate is **public redistribution**. Surfaces that ship or re-serve font files (self-hosted
`assets/fonts/`, the component kit's bundled files — anything a third party can download from the deliverable)
keep the deny-by-default self-host rule in *Redistribution boundary* below. On those surfaces a
non-redistributable face gets the declared substitute + license note; the real face stays in the local render.

Operational consequences:
- **File present, license unconfirmed** → build and render with the real face; open a license-confirmation
  GAP (visible in the ledger and the client review surface) requesting the owner's confirmation of
  license/commercial use. The GAP tracks the *confirmation*, not permission to work.
- **File absent** → that is a real dependency: acquire by the paths below, or a MUST-HAVE fidelity GAP with a
  foundry/purchase pointer (unchanged — a missing file blocks fidelity per the font's role).
- **Redistributable surfaces only:** a face that cannot be redistributed ships as a DECLARED web-safe/libre
  fallback + license note in the bundled files. That declared state is a valid, honest deliverable state —
  not a gate failure, and never a reason to delete the face's reference (removing the reference to silence a
  missing-font check is the exact regression the check exists to catch).
- The invariant that stays: the visible license GAP + confirmation request. What goes away: abstention in the
  local render.

(The scoper-side codification of this posture — how license questions are asked, never as capability
gating — lives in the scoper skill.)

## Read the declared `license:` first (the stated-license-read guard)

Before deriving anything about a face's license, **read the owner-declared `license:` field the handoff
carries per font** (WHAT per-font, parsed at Stage 0: a declared SPDX/license id, `owner-supplied`, or
`unlicensed→GAP`). That declared state is the owner's truth — consume it; do not re-derive a license you
were already told. This is the license-axis parity of the *stated-spec-read* guard below (read the declared
truth first, corroborate second).

Two INDEPENDENT axes govern a face — never collapse them into one:

- **Axis 1 — WHICH license (the SPDX-id axis).** The declared `license:` *names* the license (an open SPDX
  id like `OFL-1.1` / `Apache-2.0`, an `owner-supplied` attestation, or an explicit `unlicensed→GAP`). This
  is a capability class — any valid SPDX id, never a closed `OFL | owner | GAP` floor.
- **Axis 2 — the routing RULE (redistributable → self-host; else → declared fallback + GAP).** Separately
  from *which* license it is: a face with no usable/redistributable license keeps the REAL face in the local
  render (posture above) and routes to a tracked license-confirmation GAP; only the REDISTRIBUTABLE surfaces
  (self-hosted files, bundled kit) take the declared substitute + license note. A missing FILE — not a missing
  license — is what blocks fidelity per the font's role (a core face's file missing blocks the Stage-10 gate;
  a non-core face logs and the repo stays valid). The →GAP routing is its own rule — it fires on
  absence/non-usability, not on which SPDX id was named.

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

## Measured identity, never a name-match (fontTools, zero extra deps)

A matched/acquired face is CONFIRMED by MEASUREMENT, never by its name string or an eyeball:

- **Identity = the OS/2 table + style bits**, read with `fontTools` directly: `usWeightClass` /
  `usWidthClass` + the `fsSelection` / `head.macStyle` bits are the machine identity of a face; the `name`
  table is METADATA ONLY (renames, subsets, and foundry re-releases change it freely — a name-match is not
  an identity).
- **Metric-compare, normalized by `unitsPerEm`:** ascent / descent / lineGap, x-height and cap-height where
  the table version carries them, and the advance widths of a probe string (via `hmtx`) — compared between
  the candidate and the reference face after normalizing both by their own `unitsPerEm`. A face that
  name-matches but metric-diverges is a DIFFERENT face (record the divergence; the match stays
  `hypothesis` with the numbers attached, or degrades to a GAP).
- "Test-fonts ≈ production" is never assumed — the SHIPPED files are what gets measured.
- The reproduction gate's `--font` path (`tools/fidelity-diff.py`) already computes per-glyph deltas with
  fontTools; this section is the ACQUISITION-side identity floor that feeds it.

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

## Redistribution boundary (the hard rule — bundled/self-hosted surfaces ONLY)

Scope: everything in this section governs surfaces that ship or re-serve font FILES (self-hosted
`assets/fonts/`, the kit's bundled files). It never governs the local render or the builder's capability
(posture above).

- Self-host only OFL / Apache / Ubuntu-licensed or owner-supplied fonts; ship the license text
  (e.g. `OFL.txt`) alongside the files.
- **SIL OFL 1.1 nuance:** format-conversion and subsetting count as "modification" under the license,
  which triggers the Reserved-Font-Name rename requirement *if the face declares an RFN*. When the
  builder subsets/recompresses a self-hosted RFN font, it must rename the in-repo family accordingly.
- **Unlicensed commercial fonts must NEVER be bundled in redistributable files, and NEVER pirated** (piracy —
  acquiring the file from an illegitimate source — is absolute, all surfaces). A commercial face whose FILE
  is unobtainable → a MUST-HAVE fidelity GAP with a foundry/purchase pointer; owner-supplied files (placed in
  `assets/`) or files present in the brand's own material are legitimate for the local render regardless of
  proof status (posture above), with the license-confirmation GAP open.
- **No automated "is this commercial?" classifier exists** → deny-by-default: self-host only when an
  SPDX/OFL marker or an explicit owner attestation is present. When in doubt, GAP it.

## Output

Self-hosted faces land under `assets/fonts/` with their license file; the token spine's `fontFamily` and the
kit's `styles.css` `@font-face` closure reference them. A named-but-unacquirable core face is a MUST-HAVE
fidelity GAP that blocks the fidelity gate (Stage 10) — not a silent fallback. Every face the builder records
carries the provenance spine (`gap-protocol.md`): a name from the stated spec is `source: declared-spec`; a
match is `source: matched, confidence: hypothesis` until the owner confirms.
