# Seeded Brand — PROJECTIONS  *(satellite · not canon · SEEDED-VIOLATION fixture)*

<!-- Planted R6a violation: a `derived` projection whose pinned value has DRIFTED from the
     spine-resolved value. {semantic.color.foreground} resolves through {base.color.r5bad} to
     oklch(0.40 0.02 250); the row pins oklch(0.99 0 0) — a drift R6a must catch. -->

## Projection registry

| Consumer | Role | consumes | source | Status |
|---|---|---|---|---|
| web (marketing site) | downstream | `{semantic.color.foreground}` = `oklch(0.99 0 0)` | derived | KEEP |

## Interchange contract (machine)

- **Color spine:** OKLCH literal in `$value`; authored print values honor `source:"authored"|"derived"`.
