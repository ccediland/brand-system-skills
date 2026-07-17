# {{BRAND}} — PROJECTIONS  *(satellite · not canon)*

<!-- GUIDE: This registry tracks every CONSUMER of the canon and the contract it consumes by. A projection
     is any artifact derived from the canon (a website, a slide deck, a print kit, a design-tool library).
     A projection is never a second source of truth — the canon wins (INDEX › Precedence). This file also
     declares the machine interchange contract and the HARVEST-then-REMOVE manifest for junk.

     MACHINE CONTRACT (audit-lint R6a / MT-1): the `consumes` column is machine-readable — a list of the
     token aliases `{tier.category.name}` the projection derives from, separated by `;`. You MAY pin a value
     with ` = <canonical serialized value>` to assert byte-equality with the spine. Since a colour `$value` is
     the structured-OKLCH object (C-1), the pin is the **canonical serialized form** the gate emits —
     `oklch(L C H)` or `oklch(L C H / a)`, numbers normalized (e.g. `0.30` → `0.3`); e.g.
     `{semantic.color.action}` = `oklch(0.62 0.13 255)`. The `source` column is `derived | authored`. R6
     reconciles every `derived` row by SERIALIZING both the pin and the spine value through one canonical
     serializer, then byte-comparing — a stale pin or a renamed/removed alias is DRIFT and FAILS the gate.
     `authored` rows (e.g. an authored print spot value, per the Interchange contract `source` flag) are truth
     and are NOT re-derived/checked. List ONLY aliases the canon actually defines — never a raw value as a
     second source. -->

## Projection registry

| Consumer | Role | consumes | source | Status |
|---|---|---|---|---|
| {{consumer name / id}} | {{downstream \| bidirectional}} | {{`{tier.category.name}` alias(es), `;`-separated; optional ` = <pinned value>`}} | {{derived \| authored}} | {{KEEP \| SUPERSEDED}} |

Bidirectional consumers are both downstream consumers AND upstream sources of design intent. Their
promotion path: a non-token design decision proven in the consumer → reviewed → abstracted to
universal (stripped of anything output- or stack-specific) → promoted into GRAMMAR/ESSENCE. Until
promoted, it stays as projection rationale, not canon.

## Interchange contract (machine)

- **Tokens:** DTCG `tokens/` in three tiers — `base.tokens.json` / `semantic.tokens.json` / `component.tokens.json`
  (the standard DTCG base/semantic/component convention). `usesDtcg:true`.
- **Color spine:** OKLCH literal in `$value`. Consumers MUST emit `oklch()` via an OKLCH-preserving
  transform — never `color/css` or a `transformGroup:'css'` (those gamut-map to sRGB and discard the
  OKLCH precision). Other color spaces are read from `$extensions.brand.spaces`, honoring the
  `source:"authored"|"derived"` flag (authored print values are truth and are not re-derived from OKLCH).
- **Aliases:** `{tier.category.name}`, no `.value` suffix, pointing to a leaf.
- **Escape valve:** stack-specific needs (a framework theme block, a shader uniform, a runtime) are
  adapters in the consumer repo, derived from the canon — never coupling that names a stack inside any
  canon layer. The canon names no stack.
- **Boundary:** engineering/runtime concerns (e.g. security, performance, SEO, hosting — not exhaustive) are out of scope; they belong to the consumer, derived from but never coupled into the canon.

## REMOVE manifest (harvest-first)

<!-- GUIDE: list off-system, duplicated, or superseded artifacts to delete. HARVEST any reusable decision
     into the canon BEFORE removing. Deletion is gated behind a human OK. Flag anything irreplaceable as
     "preserve before delete". -->
| Artifact | Why remove | Harvested? | Deletion gate |
|---|---|---|---|
| {{...}} | {{off-system / duplicates canon / superseded}} | {{y/n}} | {{phase + human OK}} |

## Add-on: Claude Design (present only when the brand opted IN)

When the brand's brief said YES to the component library, the Claude Design adapter is attached (see
`claude-design-adapter/`) and registered here as a consumer. It is one more consumer drinking from this same
canon — governed by the brand's explicit choice (a NO leaves no adapter, no kit, and no row here), and
brand-agnostic except inside the adapter itself.
