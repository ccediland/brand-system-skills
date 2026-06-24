# Demo Brand — PROJECTIONS  *(satellite · not canon · CLEAN fixture)*

<!-- Every `derived` projection's consumed alias resolves in the spine, and each pinned value
     byte-equals the spine-resolved value (R6a). The `authored` print row legitimately differs
     from the OKLCH-derived value and is NOT re-derived — R6a skips it (the carve-out). -->

## Projection registry

| Consumer | Role | consumes | source | Status |
|---|---|---|---|---|
| web (marketing site) | downstream | `{semantic.color.action}` = `oklch(0.62 0.13 255)`; `{semantic.color.foreground}` = `oklch(0.30 0 0)` | derived | KEEP |
| slides (deck) | downstream | `{semantic.font-family.body}` = `"Body Face", system-ui, sans-serif` | derived | KEEP |
| overlay (alpha) | downstream | `{base.color.tint}` = `oklch(0.62 0.13 255 / 0.5)` | derived | KEEP |
| print one-sheet | downstream | `{semantic.color.action}` = `oklch(0.55 0.10 30)` | authored | KEEP |

The print row is `source: authored` — an authored spot value that is truth and is not re-derived
from OKLCH; R6a does not fail it even though its value differs from the derived spine value.

## Interchange contract (machine)

- **Tokens:** DTCG `tokens/` in tiers. Aliases `{tier.category.name}`, pointing to a leaf.
- **Color spine:** structured-OKLCH `$value` object `{colorSpace, components, alpha, hex}` (C-1); a `derived`
  projection pins the **canonical serialized form** the gate emits — `oklch(L C H)` or `oklch(L C H / a)`. Other
  spaces honor the `source:"authored"|"derived"` flag (authored print values are truth, not re-derived).
