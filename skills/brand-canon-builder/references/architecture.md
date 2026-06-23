# Architecture — the four-question canon

The canon answers four questions, each owned by one layer, plus two non-canon satellites. The
four-question logic is the law; the file count is not. A tiny brand may collapse layers into fewer files;
a rich brand may split them — but every decision must still trace to *where-start / why / what / how*, and
nothing may be organized around an output.

| Layer | Question | Holds | Template |
|---|---|---|---|
| INDEX | where do I start? | map, glossary, derivation method, precedence, universality test | `canon/00-index.md` |
| ESSENCE | why? | meaning, voice, positioning, per-atom meaning | `canon/01-essence.md` |
| PRIMITIVES | what? | every fixed atom to full depth | `canon/02-primitives.md` |
| GRAMMAR | how? | generative rules `G-*` + algorithms `ALGO-*` | `canon/03-grammar.md` |
| DATA POINTER *(satellite)* | where do volatile values live? | pointer, never values | `data-map.md` |
| PROJECTIONS *(satellite)* | who consumes this? | consumer registry + interchange contract | `projections.md` |

## The non-negotiables (encode these into every canon you build)

1. **Output-agnostic.** No layer, file, or section is named for an output (no "website", "card",
   "Instagram"). If a truth is coupled to an output, move it up a layer and let GRAMMAR derive the output.
   This is the single most common failure — the per-artifact "applications" chapter common to traditional
   print brandbooks is the anti-pattern: absorb that *coverage* (the canon must be able to address
   stationery, social, packaging) but never as an enumerated list inside the canon.
2. **Generative over catalog.** Rules + typed algorithms, not enumerations. A rule earns its place only if
   it can decide an artifact the canon never mentions.
3. **Dual legibility.** Prose `canon/*.md` + machine mirror (`tokens.json` for measurable atoms,
   `canon/canon.json` for rules + meaning). Disagreement is a bug.
4. **Meaning precedes value.** Decide what an atom MEANS (ESSENCE) before its value is set (PRIMITIVES/tokens).
5. **Single source / precedence.** Canon > any projection. Within canon: PRIMITIVES win on values, ESSENCE
   on meaning, GRAMMAR on combination. `tokens.json` is the single source for measurable primitives;
   everything else is a generated projection.
6. **Volatile values live in the source system**, pointed at by DATA POINTER — never frozen into a layer.
7. **Lego property.** The repo is always createable and valid. Whatever is missing, three things always
   exist: a GOAL, PENDING TASKS/DECISIONS (each missing must-have = a logged GAP), and SKELETONS (every
   canon part has an empty, structured slot). Set everything first; project once set.

## Canon = skeleton; prototype + library + keystone = deliverable (v2/v3 law)

The four-layer canon is the source skeleton, never the deliverable on its own. The deliverable is the
real, presentable prototype (real mark, real fonts, real imagery on real surfaces), the
`/design-sync`-ready component library projected from it, and (v3) the mandatory keystone `.md` an AI can
think / speak / design *as* the brand. Rule-compliance of an asset-less skeleton is not
done — reaching "done" without the real assets and prototype is the bug, not the gap-logging. This law
governs the builder pipeline — the prototype/kit emit at Stage 8 and the keystone at Stage 8.5 (`SKILL.md`;
`references/design-sync-kit.md`; `references/keystone-emit.md`) and the fidelity gate enforces it at Stage 10
(`references/validate-audit.md`) — including the §7b keystone **operability** content-check (the keystone
carries real when-X-then-Z rules and on/off pairs, form-of-rule only, never bare adjectives). Each landed
value, and every emitted token, carries its provenance spine — per-token `$extensions.brand.provenance`
{source, confidence, owner, freshness} (`references/token-spine.md`) — so a datum is never used above the
confidence it earned. The do-not-regress invariants below hold underneath it.

## Stable IDs

Grammar rules: `G-<CATEGORY>-<NN>` (e.g. `G-COLOR-02`). Algorithms: `ALGO-<NAME>` with a typed
`(inputs) → output` signature and the `G-*` rules they enforce. IDs are stable and cited by consumers
instead of restating the rule. Reserve an ID even when a category is unused ("not used"), so numbering
never shifts.

## Adaptivity (the baseplate, not a fixed shape)

The templates are a Lego baseplate. Each subsection is a slot the brand either fills to full depth or marks
`not-used(owner-declared)` — the slot stays either way; an empty slot a brand *actually uses* becomes a GAP,
an owner-declared not-used one resolves clean. Optional dimensions
(motion, depth/elevation, multi-scheme, interaction, the Claude Design add-on) appear as slots that a
print-only brand simply marks unused. The coverage floor (essence, glossary, color, type, the mark system,
clear-space, min sizes, construction, misuse, usage-over-imagery, voice) is an ILLUSTRATIVE floor derived by
intersecting the two reference canons — *expected-unless-not-used(owner-declared)*, not a closed must-have
set every brand must carry. A brand that legitimately lacks a dimension marks the slot
`not-used(owner-declared)` and resolves clean; the universality stress test, not the list, is the real
completeness gate (`references/coverage-checklist.md`).
