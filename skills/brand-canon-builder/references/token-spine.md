# Token spine — DTCG 2025.10, OKLCH, scheme derivation, and the interchange contract

`tokens.json` (emitted as the three files in `tokens/`) is the single source for measurable primitives and
the machine interchange contract. Build it so it projects into any consumer with no lossy hop.

## Format target — DTCG 2025.10

Target the W3C/DTCG Design Tokens Specification **2025.10** (the first stable version, 28 Oct 2025): JSON
syntax, `$value`/`$type`/`$description`, atomic + composite types, aliases via `{group.token}`, structured
color with `colorSpace` (incl. `oklch`), and **resolvers** (sets + modifiers + `resolutionOrder`) as the
standard theming mechanism. Files use `.tokens.json`; media type `application/design-tokens+json`.

**Structured-OKLCH `$value` (adopted in Stage C-1).** Colour value-tokens carry the DTCG **structured-OKLCH
object** `{ "colorSpace": "oklch", "components": [L, C, H], "alpha": 1, "hex": "#rrggbb" }` — OKLCH the canonical
perceptual spine, `hex` the sRGB render fallback. The stable 2025.10 spec makes the structured object the
canonical value. **Forward-constraint (Stage C-2 — when a build-time materializer / Style Dictionary is
introduced):** structured colour MUST route through SD's `color/oklch` transform (SD ≥ 5.3) or a preprocessor —
NEVER raw SD `$value` consumption, which still trips SD's object/structured-color split bug (`-value`/`-unit`,
issue #1590). C-1 introduces **no** SD, so the bug is not triggered here. Resolver theming remains a draft and is
implemented as a controlled convention (Stage C-2), never an authoritative standard. (Lego property: `main`
stays buildable — C-1 changes only the `$value` format + the audit-lint R6a serializer in lockstep.)

## Tiering (standard DTCG convention)

Three tiers, the standard DTCG base / semantic / component convention (adopted because it is the
standard — not because any one consumer uses it):

- `tokens/base.json` — raw primitive values. `path[0]` is always `"base"`.
- `tokens/semantic.json` — intent aliases naming a ROLE. `path[0]` is always `"semantic"`.
- `tokens/component.json` — optional component-scoped aliases. `path[0]` is always `"component"`.

`semantic` aliases `base`; `component` aliases `semantic` (never `base` directly), so a scheme change at the
semantic tier flows through. The tier a consumer themes is `semantic` — one scheme override (or one resolver
modifier, once supported) re-points it.

### Scheme materialization (`$extensions.brand.scheme`, SC-1)

N named schemes in `canon/canon.json › schemes` become N COMPLETE materialized role-token sets, NOT prose. A
zero-dep preprocessor `tools/scheme-derive.mjs` (the runnable `ALGO-SCHEME-DERIVE`, 03-grammar §10 — NOT Style
Dictionary, which would trip the structured-colour `-value`/`-unit` split) derives each scheme from the base
palette by its `{mode, dominant}` and writes `tokens/schemes/<id>.json`: every role token a structured-OKLCH
object tagged **`$extensions.brand.scheme:"<id>"`**, entering at `confidence:"hypothesis"` + the scheme's
tracking GAP (a derived palette is unratified until owner-confirmed). The DEFAULT scheme's set is materialized
and tagged too; it defines the role-key parity. A scheme marked `status:"deferred"` emits NO set and carries a
logged `GAP-NNN` instead. `audit-lint` R7 enforces this (complete set OR deferred+GAP). The Resolver Module
(DTCG draft) remains a controlled convention layered over these sets — never raw SD `.resolver.json` (#1590).

## Authoring rules (hard)

- `usesDtcg: true` — DTCG `$type` / `$value` syntax (not legacy `value`).
- Every leaf token has a `$type` (inherit from the group via a `$type` on the group object). Common types:
  `color`, `dimension`, `number`, `fontFamily`, `fontWeight`, `duration`, `cubicBezier`, `shadow`.
- **`$value` shape by type.** A COLOUR `$value` is the DTCG **structured-OKLCH object** (above, adopted in
  C-1). Every OTHER `$value` stays a plain string / number / cubic-bezier array — never a nested object: object
  SHADOW / composite values still trip the Style Dictionary `-value`/`-unit` split bug, so shadows are authored
  as plain composite CSS strings. (Only colour migrates to the structured object in C-1; composites stay
  strings until their tooling lands. See the structured-OKLCH note above.)
- **Aliases** are `{tier.category.name}` — no `.value` suffix, pointing to a leaf, not a group.
- **Category names** at `path[1]` follow the namespace convention so they map cleanly:
  `color → --color-`, `spacing → --spacing-`, `font-size → --text-`, `font-family → --font-`,
  `font-weight → --font-weight-`, `line-height → --leading-`, `border-radius → --radius-`,
  `shadow → --shadow-`.
- **Singleton vs family.** A category with MULTIPLE values projects `--<prefix>-<name>` (e.g. a 2-radius brand
  → `--radius-base` / `--radius-pill`, as the base.json template's example family shows); a category with a
  SINGLE value projects the bare `--<prefix>` singleton (one radius → `--radius`, one shadow → `--shadow`, as
  the kit/prototype templates show). The bare form is the single-value case of the family, not a namespace
  break. The two templates illustrate the two shapes; per brand the builder emits ONE shape and keeps the
  token tier and the kit CSS consistent with each other.

## Color — OKLCH spine + authored/derived (the binding refinement)

- `$value` is the **structured-OKLCH object** `{ "colorSpace": "oklch", "components": [L, C, H], "alpha": 1,
  "hex": "#rrggbb" }` (C-1). OKLCH is the canonical perceptual spine and interchange value; `hex` is the sRGB
  render fallback (not a second source of truth). Do not treat hex as the operative value.
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

## The provenance block — confidence rides the token, not just `authored|derived`

`authored|derived` is the SOURCE projection ONLY — it records whether a color space is the brand's declared
truth or auto-generated from OKLCH. It says **nothing** about how confident anyone is in the token. The two
are ORTHOGONAL axes — the same shape as the font-`license:` precedent (one axis is a declared SPDX id that
*describes* the license; a separate →GAP-on-absent rule *gates* usability): here `authored|derived` *describes*
the source space, while the **confidence ladder** *gates* the status a datum may be used at. `authored` does
NOT discharge the confidence obligation — a brand can DECLARE a CMYK build (`source: authored`) that is still
only a `hypothesis` until the owner ratifies it.

So EVERY emitted token carries the full provenance spine (`gap-protocol.md` § The provenance spine) under
`$extensions.brand.provenance`:

```
"$extensions": { "brand": { "provenance": {
  "source": "<declared-spec | owner-stated | extracted-vector | computed-css | design-file | matched | traced | inferred | proposed>",
  "confidence": "<hypothesis | corroborated | verified-primary | proxy-relayed | handoff-confirmed | owner-confirmed>",
  "owner": "<who ratifies this slot, from the handoff OWNERS>",
  "freshness": "<shipped | stated-old>"
} } }
```

- `$extensions` is the DTCG escape hatch — additive metadata the spec ignores. The file MUST still parse and
  every `{tier.category.name}` alias MUST still resolve; the provenance block never sits where a `$value` or an
  alias is expected, so it introduces no dangle.
- The per-space `source` flag inside `$extensions.brand.spaces` (above) is the color-specific projection of the
  block's `source` field — they agree, they don't compete. A space tagged `authored` still inherits the token's
  `confidence`; a datum is **never used at a status it has not earned** regardless of which space carries it.
- The template applies the block to its REPRESENTATIVE tokens as the illustrative pattern (not every literal —
  this is a template). **Every emitted token carries it**; the builder fills the block per datum at Stage 7 from
  the value's handoff/extraction provenance (it enters at the confidence its provenance EARNED —
  observed/extracted values at `hypothesis`; a brand LINE still needs tier-2 ratification — the six-value
  ladder and its tiers are defined in `gap-protocol.md` § The provenance spine;
  handoff-carried ratification enters as `handoff-confirmed`/`proxy-relayed`, never `owner-confirmed`).
- `freshness` uses the pinned `shipped | stated-old` literal — the same two values at every hop, never a synonym.

### Confidence↔source is a GATE, not advice (MT-4 — `tools/audit-lint.mjs` R1/R2)

The ladder is checkable, mirroring `gap-protocol.md`: `confidence: corroborated` requires **≥2 _distinct_
non-relay source artifacts** (R1 — two refs to the same file is one source, and a ref marked
`origin: "relay"` is a builder transcription that never counts), and a `source` of
`inferred`/`matched`/`proposed` is **capped at `hypothesis`** (R2 — `proposed` is the quarantine channel).
A `semantic`-tier token stamped `source: inferred` + `confidence: corroborated` is the canonical
contradiction the lint fails the build on.

### Harvest provenance — `$extensions.brand.sourceRef` (MT-3 — `audit-lint.mjs` R3)

Beyond the `provenance` block (the WHO/HOW-confident), every HARVESTED token also carries a `sourceRef` — the
WHERE-FROM: the exact, hashed source-of-record the value was read from.

```
"$extensions": { "brand": { "sourceRef": {
  "file": "<path under sources/**, hashed in CHECKSUMS.txt>",
  "selector": "<CSS selector / swatch label / page region the value was read at>",
  "line": <line number in that source file>,
  "sha256": "<sha256 of the source file — MUST appear in CHECKSUMS.txt>",
  "origin": "<capture | relay — absent means capture; relay = a builder-authored transcription (hashable custody, never an independent source; excluded from the R1 count)>",
  "captureTs": "<Wayback capture timestamp, when recovered from an archive>",
  "selfPublished": "<the page's own 'Last Published' date — reconciled vs captureTs before trusting>"
} } }
```

- `sourceRef` may be a single object OR an **array**; a `corroborated` token carries **≥2 non-relay entries
  with distinct `file` values** — the two independent artifacts MT-4/R1 demands.
- Any token above `confidence: hypothesis`, or with `source: computed-css`, MUST carry a `sourceRef`
  whose `sha256` is in `CHECKSUMS.txt` (MT-3/R3) — the build SHA-256-hashes every file under `sources/**`
  (`asset-acquisition.md`), the persisted handoff (`sources/handoff—<date>.md` — the natural sourceRef of
  `handoff-confirmed`/`proxy-relayed` data) included. The lint fails the build otherwise.
- `captureTs`/`selfPublished` carry the archived-source identity+date trail (`source-recover.py`,
  `asset-acquisition.md` § Archived-source recovery): the agent reconciles them before the value is trusted.
- The template applies `sourceRef` to its REPRESENTATIVE token as the illustrative pattern (the same way the
  `provenance` block is shown on representatives). **Every harvested token carries it.** A purely-aliased token
  (a `semantic`/`component` alias) inherits its source-of-record from the base leaf it points at and carries none.

### Gap back-reference + ladder closure (MT-5/R5 + the gate's R0)

- An **uncertain** token (`confidence: hypothesis`, or `source ∈ {inferred, matched, traced, proposed}`)
  carries `$extensions.brand.gap: "GAP-NNN"` — the back-reference to the ONE open gap that tracks it (MT-5/R5).
  Resolve to exactly one open gap or the gate fails; a `not-used(owner-declared)` dimension produces no token
  to track and is clean.
- The gate's **R0** enforces ladder closure: every value (non-alias) token MUST carry a `provenance` block whose
  `source` is on the closed source enum and whose `confidence` is one of `hypothesis | corroborated |
  verified-primary | proxy-relayed | handoff-confirmed | owner-confirmed` — no missing block, no extra
  value/synonym. (This is the executable form of the "every
  emitted token carries provenance / byte-identical ladder" rule in `gap-protocol.md` + `CLAUDE.md`.)

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
