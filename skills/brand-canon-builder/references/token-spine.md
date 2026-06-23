# Token spine — DTCG 2025.10, OKLCH, scheme derivation, and the interchange contract

`tokens.json` (emitted as the three files in `tokens/`) is the single source for measurable primitives and
the machine interchange contract. Build it so it projects into any consumer with no lossy hop.

## Format target — DTCG 2025.10

Target the W3C/DTCG Design Tokens Specification **2025.10** (the first stable version, 28 Oct 2025): JSON
syntax, `$value`/`$type`/`$description`, atomic + composite types, aliases via `{group.token}`, structured
color with `colorSpace` (incl. `oklch`), and **resolvers** (sets + modifiers + `resolutionOrder`) as the
standard theming mechanism. Files use `.tokens.json`; media type `application/design-tokens+json`.

**Tooling-lag caveat (binding — ties RESIDENT OI-H).** Full 2025.10 + resolver support is still landing in
Style Dictionary v5 (issue #1590), and SD's object/structured color trips a known split bug. Until that
lands, author the **operative `$value` as an OKLCH literal string** (below) — which SD v4/v5 consume — and
treat 2025.10 structured-color and resolver theming as the target with a documented fallback
(custom-transformer or Terrazzo). Do not migrate `$value` to structured-color objects while the chosen build
tool cannot consume them; that would break the pipeline (Lego property: main stays buildable).

## Tiering (standard DTCG convention)

Three tiers, the standard DTCG base / semantic / component convention (adopted because it is the
standard — not because any one consumer uses it):

- `tokens/base.json` — raw primitive values. `path[0]` is always `"base"`.
- `tokens/semantic.json` — intent aliases naming a ROLE. `path[0]` is always `"semantic"`.
- `tokens/component.json` — optional component-scoped aliases. `path[0]` is always `"component"`.

`semantic` aliases `base`; `component` aliases `semantic` (never `base` directly), so a scheme change at the
semantic tier flows through. The tier a consumer themes is `semantic` — one scheme override (or one resolver
modifier, once supported) re-points it.

## Authoring rules (hard)

- `usesDtcg: true` — DTCG `$type` / `$value` syntax (not legacy `value`).
- Every leaf token has a `$type` (inherit from the group via a `$type` on the group object). Common types:
  `color`, `dimension`, `number`, `fontFamily`, `fontWeight`, `duration`, `cubicBezier`, `shadow`.
- **`$value` is a plain string** (or a number / cubic-bezier array where the type requires) — never a
  nested object. Object color/shadow values trip a known Style Dictionary bug that splits them into
  `-value`/`-unit` vars. So shadows are authored as plain composite CSS strings. (This is the operative
  reason the OKLCH literal string — not 2025.10 structured color — is the `$value` today; see the
  tooling-lag caveat above.)
- **Aliases** are `{tier.category.name}` — no `.value` suffix, pointing to a leaf, not a group.
- **Category names** at `path[1]` follow the namespace convention so they map cleanly:
  `color → --color-`, `spacing → --spacing-`, `font-size → --text-`, `font-family → --font-`,
  `font-weight → --font-weight-`, `line-height → --leading-`, `border-radius → --radius-`,
  `shadow → --shadow-`.

## Color — OKLCH spine + authored/derived (the binding refinement)

- `$value` is a literal OKLCH string: `"oklch(L C H)"`. OKLCH is the canonical perceptual spine and the
  interchange value. Do not pre-convert to hex in `$value`.
- Consumers MUST emit `oklch()` via an OKLCH-preserving transform — never `color/css` or
  `transformGroup:'css'`, which gamut-map to sRGB and discard OKLCH precision. (The mechanism is the
  consumer's; the requirement is pinned.)
- Other color spaces live in `$extensions.brand.spaces`, each tagged with a source flag (the color-specific
  projection of the provenance spine in `gap-protocol.md`):
  - `source: "derived"` — auto-generated from OKLCH (hex, rgb). Safe to regenerate.
  - `source: "authored"` — a value the brand DECLARES as its truth (a spot/Pantone or a CMYK build the
    brand prints by). Authored values must NOT be re-derived from OKLCH — spot colors do not round-trip.
    Print consumers read the authored value; screen consumers read the OKLCH `$value`.
- This supports both an OKLCH-native brand (all `$extensions` derived) and a print-native brand
  (some `$extensions` authored). A print-native brand's color truth can be the authored value with OKLCH as
  the best-fit interchange approximation.

## OKLCH scheme-derivation engine (one transformation space)

OKLCH (L = perceptual lightness 0–1, C = chroma, H = hue 0–360) is perceptually uniform and decouples
lightness/chroma from hue, so ONE transformation engine covers the whole scheme space. Each scheme is a
worked case of an L/C/H transform on the authored base, re-pointed at the `semantic` tier:

- **Light → dark.** Invert/redistribute L while preserving H and C, so a `violet-600` stays recognizably
  violet (not muddy gray-purple); tune chroma for dark backgrounds.
- **High-contrast / accessibility.** Push L separation between fore/background to meet contrast targets
  while holding H/C identity; validate with contrast models (WCAG; APCA via OKLCH-native tooling such as
  apcach).
- **Sub-brand / seasonal.** Rotate H (and/or shift C) by fixed degrees from a single authored scheme to
  generate sibling palettes that share L/C and therefore read as one family; equal-C harmonic sets keep
  visual weight consistent.
- **Re-cohere an ad-hoc palette.** Place each existing color in OKLCH, infer the intended L-ramp / H-families,
  snap to a coherent token scale — then OWNER-CONFIRM. A re-cohered palette is a `confidence: hypothesis`
  proposal until the owner ratifies it, never silently imposed.

Boundaries: (a) tooling lag — resolver-based theming rides on the SD v5 / DTCG 2025.10 pin above; until it
lands, emit schemes via a custom transformer (or Terrazzo / multiple semantic files), not blocked. (b) Gamut
— highly saturated OKLCH values can fall outside sRGB; gamut-map / provide fallbacks for non-P3 displays.
(c) Derivation proposes, owner confirms — a generated alternate scheme is a recommendation, not authored
brand truth.

## Non-color dimensions

Motion (`duration`, `cubicBezier`, plus a `vocabulary` of dimensions) and depth/elevation (`shadow`, plus
surface helpers in a CSS projection) are first-class but optional token dimensions. Emit them DTCG-valid
even when no current consumer ingests them (a downstream bridge can come later) — do not drop them for
lacking a consumer today. A flat / print-only brand omits them.

## Projections, not coupling

CSS variables, framework theme blocks, runtime configs are projections generated from these tokens,
living in the consumer repo. No canon layer names a stack. Stack-specific needs are adapters in the consumer
(the escape valve in `projections.md`).
