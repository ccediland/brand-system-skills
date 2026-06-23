# Coverage / completeness model

The real completeness mechanism is the **universality stress test** (`gap-protocol.md`): pick arbitrary
artifacts the canon names nowhere and confirm the canon decides each one through its derivation method. A
canon is complete when it passes that test — not when it has ticked a fixed list of slots. The checklist
below is a **prompt for that test, not the gate**: an ILLUSTRATIVE floor derived by intersecting two
independent canons (one digital-native, one print-native), the same way the dimension catalogue in
`CLAUDE.md` is an illustrative instance of a mechanism and never a closed universe (anti-determinism). It is
**not** the set of things every brand must have — a monogram-only, single-typeface, or single-ink brand is
fully valid while "missing" several rows below. Do not pad this list defensively — a longer checklist is not a
more complete canon; the list only jogs the stress test.

## Illustrative coverage floor (a prompt for the stress test — not a closed must-have set)

Each row is **expected-unless-not-used(owner-declared)**: present it if the brand uses that dimension; if the
brand legitimately does not, mark the slot `not-used(owner-declared)` and it resolves CLEAN — never a gap,
never a violation. A row is a MUST-HAVE GAP only when the brand *does* use the dimension and it is missing or
empty (severity below). What both reference canons carried is shown here; what one carried is a
parameterized/optional dimension below — neither is a universe, both are illustration.

| # | Coverage item (expected-unless-not-used) | Lands in |
|---|---|---|
| 1 | Brand essence / narrative / origin / positioning / audience | ESSENCE |
| 2 | Glossary of the system's own vocabulary | INDEX |
| 3 | Color: primary + secondary/accent, each with a role + meaning, on an OKLCH spine | PRIMITIVES + tokens |
| 4 | Typography: primary + secondary, with a scale | PRIMITIVES + tokens |
| 5 | Mark forms: wordmark + symbol + primary lockup (+ secondary / monogram / seal if used) | PRIMITIVES |
| 6 | Mark geometry: construction reference + clear-space + minimum sizes (digital AND physical) | PRIMITIVES |
| 7 | Mark treatments (colorings) + a misuse list | PRIMITIVES |
| 8 | Usage over imagery / backgrounds (contrast safety) | GRAMMAR |
| 9 | Pattern / texture (graphic code) — *if the brand uses one* | PRIMITIVES + GRAMMAR |
| 10 | Voice: register + anti-promise + lexicon | ESSENCE + GRAMMAR |

## Parameterized / optional dimensions (one reference only → fill only if the brand uses them)

- Motion (tokens + ethics rule) · Depth / elevation (tokens + composition rule) · Multi-scheme (e.g.
  dark) · Atmosphere / ambient imagery · Interaction / medium-agnostic UX · Trust object / physical
  artifact · The Claude Design add-on.

A brand that does not use one writes "not used" in the slot — the slot stays, and it is not a gap.

## Explicitly out of canon

- **Per-output applications** (stationery, social templates, packaging, slides) → these are PROJECTIONS,
  not canon. Absorb the *need to be able to make them*; never enumerate them inside a layer.
- **Volatile values** (prices, hours, contact, inventory) → DATA POINTER.
- **Legal / confidentiality / governance** → a non-canon meta note at most; never a design truth.

## Two coverage checks beyond the floor (shipped v3 behavior)

- **Provenance coverage.** Every landed datum carries its 4-field provenance spine, and every emitted token its
  `$extensions.brand.provenance` (`token-spine.md` § The provenance block) — a value present but held at an
  unearned confidence is an incomplete datum, not a complete one. Coverage is of *status*, not just presence.
- **Keystone operability.** The mandatory keystone passes the Stage-10 §7b content check (`validate-audit.md`):
  the core sections carry when-X-then-Z rules / on-off pairs (form-of-rule only — never fixed brand content),
  not bare adjectives. A structurally-present but operationally-hollow keystone is not "covered".

## Severity (for any unmet item)

- **MUST-HAVE** — a dimension the brand *uses* (a floor row not marked `not-used(owner-declared)`) is missing
  or empty. Blocks "complete", never blocks the repo existing.
- **SHOULD** — an optional dimension the brand *does* use is present but unfilled.
- **NICE** — a refinement deferred by choice.

Every unmet item becomes a `GAP-NNN` in `RESIDENT.md` (see `gap-protocol.md`). The repo is valid with open
gaps — that is the Lego property.
