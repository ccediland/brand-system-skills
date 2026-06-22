# {{BRAND}} — Canon · 2 · PRIMITIVES  (*what?*)

<!-- GUIDE: PRIMITIVES defines every fixed atom ONCE, to full intrinsic depth, independent of any output.
     Measurable atoms (the numbers/colors/scales) live machine-readable in tokens.json; THIS file is their
     canonical prose plus the atoms that are not numbers (the mark's form, patterns, the trust object).
     Do not restate values per output — define them here, let GRAMMAR combine them. Each subsection is a
     SLOT: if the brand uses it, fill it to full depth; if it does not, write "not used" — do not delete the
     slot, and do not invent content. Every must-have slot left empty becomes a GAP (see gap-protocol). -->

## Color

<!-- GUIDE: The closed palette. Define each ink across the spaces the brand actually needs. OKLCH is the
     canonical perceptual spine and the interchange value; sRGB hex/RGB are DERIVED from it; CMYK/Pantone
     may be DERIVED (computed nearest) or AUTHORED (a brand declares spot/CMYK as its print source of
     truth — those do NOT round-trip from OKLCH and must be marked authored). Full machine data + the
     authored/derived flags: tokens.json → color. Give each ink a ROLE and a MEANING (meaning from ESSENCE). -->

| Ink | role | meaning | OKLCH (L C H) | notes |
|---|---|---|---|---|
| {{INK_NAME}} | {{role, e.g. primary action / anchor / accent}} | {{from ESSENCE}} | {{L C H}} | {{authored print value? scarcity cap?}} |

- **Neutrals / operational:** {{background, surface, foreground inks if distinct from brand inks}}
- **Scarcity rules:** {{any ink capped to a max usage, e.g. an attention ink used sparingly}}

The application schemes (light/dark/etc. — the semantic role mappings) are *derivations* of these inks,
defined in `tokens.json → color.semantic` and combined by GRAMMAR. They are not new colors.

## Typography

<!-- GUIDE: the typefaces, defined once. Scale/weights/line-height/tracking live in tokens.json → typography. -->
- **Primary / display:** {{TYPEFACE, weight(s), usage — titles/highlights}}. Fallback: {{STACK}}. Licence: {{LICENCE}}.
- **Secondary / body (or supporting):** {{TYPEFACE, family/weights, usage}}. Fallback: {{STACK}}. Licence: {{LICENCE}}.
- **Scale & metrics:** see `tokens.json → typography` (display/body/eyebrow sizes, line-heights, tracking).

## Mark (the identity system)

<!-- GUIDE: the most protected atom. Use the exact approved asset files; never recreate, recolor, or
     distort them. This is a TAXONOMY of forms — fill the forms the brand has, mark the rest "not used".
     Do NOT enumerate per-output usage here (that is GRAMMAR/PROJECTIONS). -->

Arrangements (forms) — fill what exists:

| Arrangement | What it is | Used? | Geometry (viewBox / ratio) |
|---|---|---|---|
| **Wordmark / logotype** | the typographic name | {{y/n}} | {{…}} |
| **Symbol / isotype** | the standalone graphic mark | {{y/n}} | {{…}} |
| **Primary lockup** | the official combination (symbol + wordmark) | {{y/n}} | {{…}} |
| **Secondary lockup** | a sanctioned variant (e.g. with descriptor / different axis) | {{y/n}} | {{…}} |
| **Monogram** | initials/emblem for constrained or ornamental use | {{y/n}} | {{…}} |
| **Seal / stamp** | auxiliary badge mark | {{y/n}} | {{…}} |

Treatments (coloring of a form): {{e.g. full-color / two-ink / single-ink / reversed — list the
sanctioned treatments and the preference order; note any treatment that exists only for file completeness
and is NEVER used}}.

Geometry (decided values):
- **Construction:** {{the construction reference — a grid (e.g. an N×N module system) and/or a unit derived
  from the mark itself; how proportions are fixed. Never re-space or re-proportion by eye.}}
- **Clear space:** {{the protected margin, expressed as a unit of the mark (e.g. a cap-height or a chosen
  character/module). A minimum, not a target. Nothing intrudes.}}
- **Minimum sizes (legibility floor), digital AND physical:** {{per arrangement: min px AND min mm/cm.
  Below the floor, step up to a simpler arrangement.}}

Misuse — strictly prohibited: {{recoloring outside the palette; changing layout/proportions/hierarchy;
effects (shadow/glow/bevel) ON THE MARK ITSELF; flipping/rotating/distorting; substituting the typefaces;
sizes below the floor; intruding the clear space; low-contrast placement; any off-system treatment.}}
<!-- GUIDE: depth/elevation grammar (if the brand has one) applies to surfaces AROUND the mark, NEVER to
     the mark artwork, which stays flat and exact. -->

## Pattern & texture (graphic code)

<!-- GUIDE: many brands carry a supporting visual code — patterns, textures, tints, screens — derived from
     the mark or palette. Define it GENERATIVELY (the construction principle + the palette discipline), not
     as a fixed set of files. If the brand has none, write "not used". -->
- **Construction principle:** {{how the pattern is built — from the symbol, a motif, a texture concept}}
- **Palette discipline:** {{which inks/tints it may use; opacity/scale rules}}
- **Role:** {{support/enrichment — never competes with the mark or harms legibility}}

## Iconography

<!-- GUIDE: if the brand has an icon system, define its spec once. If it relies on an external library,
     state the sourcing rule (self-hosted + normalized to spec, no drift). If none, "not used". -->
- **Spec:** {{viewBox, stroke/fill model, single-ink via currentColor or fixed, weight, terminals}}
- **Sourcing:** {{drawn in-house / sourced from a free license-clear library normalized to spec — no CDN}}
- **Role:** {{supports text/action — never decoration}}

## Space & measure

<!-- GUIDE: spacing scale, radius, layout containers. Machine values in tokens.json → spacing/radius/layout. -->
- **Spacing scale:** {{e.g. an N-base grid}} — see `tokens.json → spacing`.
- **Radius:** {{soft/sharp language}} — see `tokens.json → radius`.
- **Layout containers:** {{default / narrow reading measure}} — see `tokens.json → layout`.

## Motion *(optional dimension — fill only if the brand moves)*

<!-- GUIDE: motion is a first-class but OPTIONAL token dimension. A print-only brand writes "not used"; the
     slot stays. Machine values in tokens.json → motion. The ETHICS of motion (what may animate, reduced
     motion) is a GRAMMAR rule. -->
- **Durations / easings:** see `tokens.json → motion`. Character: {{calm/energetic; bounce? no bounce?}}
- **Vocabulary:** {{entrance distance, stagger, hover, press, reveal, any signature motion}} — `tokens.json → motion.vocabulary`.

## Depth & elevation *(optional dimension — fill only if the brand has surface depth)*

<!-- GUIDE: optional. If the brand renders dimensional surfaces, define the elevation atoms (shadows,
     inner/edge highlights, surface gradients) here and in tokens.json → shadow (+ derived surface helpers
     in the CSS projection). Shadows tinted in a brand neutral, never pure black, is a common discipline.
     If flat, write "not used". Never apply depth to the mark artwork (see Mark › Misuse). -->
- **Elevation set:** see `tokens.json → shadow`. Surface language: {{any surface-depth helpers — e.g. surface gradients, inner highlights, edge highlights — if used}}

## Imagery (intrinsic character)

<!-- GUIDE: the character of an on-brand image (how it is COMBINED/graded is GRAMMAR). -->
- **Photography:** {{real vs generated policy, subjects, light, grade}}
- **Illustration:** {{style, in the mark's visual language}}
- **Atmosphere:** {{brand-built ambient scenes, if any; what generation is/ isn't allowed for}}

## Trust object / physical artifact *(optional)*

<!-- GUIDE: if the brand has a canonical physical object that carries identity (a plate, tag, seal, ticket
     with a code), define its fixed form here. If none, delete this subsection's body and write "not used". -->
{{PHYSICAL FORM, MATERIAL, ENGRAVING/ID FORMAT — defined once, to full depth}}

---
*Ratified by {{BRAND_OWNERS}} on {{DATE}}. Measurable atoms mirror to `tokens.json`. This layer is timeless.*
