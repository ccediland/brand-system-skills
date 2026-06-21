# Token spine — DTCG, OKLCH, and the interchange contract

`tokens.json` (emitted as the three files in `tokens/`) is the single source for measurable primitives and
the machine interchange contract. Build it so it projects into any consumer with **no lossy hop**.

## Tiering (standard DTCG convention)

Three tiers, the standard DTCG **base / semantic / component** convention (adopted because it is the
standard — not because any one consumer uses it):

- `tokens/base.json` — raw primitive values. `path[0]` is always `"base"`.
- `tokens/semantic.json` — intent aliases naming a ROLE. `path[0]` is always `"semantic"`.
- `tokens/component.json` — optional component-scoped aliases. `path[0]` is always `"component"`.

`semantic` aliases `base`; `component` aliases `semantic` (never `base` directly), so a scheme change at the
semantic tier flows through. The tier a consumer themes is `semantic` — one scheme override re-points it.

## Authoring rules (hard)

- `usesDtcg: true` — DTCG `$type` / `$value` syntax (not legacy `value`).
- Every leaf token has a `$type` (inherit from the group via a `$type` on the group object). Common types:
  `color`, `dimension`, `number`, `fontFamily`, `fontWeight`, `duration`, `cubicBezier`, `shadow`.
- **`$value` is a plain string** (or a number / cubic-bezier array where the type requires) — **never a
  nested object**. Object color/shadow values trip a known Style Dictionary bug that splits them into
  `-value`/`-unit` vars. So shadows are authored as plain composite CSS strings.
- **Aliases** are `{tier.category.name}` — no `.value` suffix, pointing to a leaf, not a group.
- **Category names** at `path[1]` follow the namespace convention so they map cleanly:
  `color → --color-`, `spacing → --spacing-`, `font-size → --text-`, `font-family → --font-`,
  `font-weight → --font-weight-`, `line-height → --leading-`, `border-radius → --radius-`,
  `shadow → --shadow-`.

## Color — OKLCH spine + authored/derived (the binding refinement)

- `$value` is a **literal OKLCH string**: `"oklch(L C H)"`. OKLCH is the canonical perceptual spine and the
  interchange value. **Do not pre-convert to hex** in `$value`.
- Consumers MUST emit `oklch()` via an **OKLCH-preserving transform** — never `color/css` or
  `transformGroup:'css'`, which gamut-map to sRGB and discard OKLCH precision. (The mechanism is the
  consumer's; the requirement is pinned.)
- Other color spaces live in `$extensions.brand.spaces`, each tagged with a **source flag**:
  - `source: "derived"` — auto-generated from OKLCH (hex, rgb). Safe to regenerate.
  - `source: "authored"` — a value the brand DECLARES as its truth (a spot/Pantone or a CMYK build the
    brand prints by). **Authored values must NOT be re-derived from OKLCH** — spot colors do not round-trip.
    Print consumers read the authored value; screen consumers read the OKLCH `$value`.
- This supports **both** an OKLCH-native brand (all `$extensions` derived) and a **print-native** brand
  (some `$extensions` authored). A print-native brand's color truth can be the authored value with OKLCH as
  the best-fit interchange approximation.

## Non-color dimensions

Motion (`duration`, `cubicBezier`, plus a `vocabulary` of dimensions) and depth/elevation (`shadow`, plus
surface helpers in a CSS projection) are **first-class but optional** token dimensions. Emit them DTCG-valid
even when no current consumer ingests them (a downstream bridge can come later) — do not drop them for
lacking a consumer today. A flat / print-only brand omits them.

## Projections, not coupling

CSS variables, framework theme blocks, runtime configs are **projections** generated from these tokens,
living in the consumer repo. No canon layer names a stack. Stack-specific needs are adapters in the consumer
(the escape valve in `projections.md`).
