# {{BRAND}} — PROJECTIONS  *(satellite · not canon)*

<!-- GUIDE: This registry tracks every CONSUMER of the canon and the contract it consumes by. A projection
     is any artifact derived from the canon (a website, a slide deck, a print kit, a design-tool library).
     A projection is never a second source of truth — the canon wins (INDEX › Precedence). This file also
     declares the machine interchange contract and the HARVEST-then-REMOVE manifest for junk. -->

## Projection registry

| Consumer | Role | Re-projects | Status |
|---|---|---|---|
| {{consumer name / id}} | {{downstream \| bidirectional}} | {{what it derives from the canon}} | {{KEEP \| SUPERSEDED}} |

Bidirectional consumers are both downstream consumers AND upstream sources of design intent. Their
promotion path: a non-token design decision proven in the consumer → reviewed → abstracted to
universal (stripped of anything output- or stack-specific) → promoted into GRAMMAR/ESSENCE. Until
promoted, it stays as projection rationale, not canon.

## Interchange contract (machine)

- **Tokens:** DTCG `tokens/` in three tiers — `base.json` / `semantic.json` / `component.json`
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

## Optional add-on: Claude Design

If the brand wants its components available in claude.ai/design as a live, on-brand library, attach the
Claude Design adapter (see `claude-design-adapter/`). It is one more consumer drinking from this same
canon — never mandatory, and brand-agnostic except inside the adapter itself.
