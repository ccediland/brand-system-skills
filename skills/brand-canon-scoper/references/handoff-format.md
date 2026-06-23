# Handoff format

The scoper's only output is ONE self-contained, machine-readable block. The person places the material in
the target repo per the manifest, then pastes this block into Claude Code (in or next to the target repo) to
invoke `brand-canon-builder`.

This is a contract, not prose. LLMs do not reliably infer intent from prose, diagrams, or a Figma file —
the builder needs an explicit, deterministic, auditable block: declared constraints, named responsibilities
per canon layer, generative rules as the bridge from intent to appearance, fidelity/provenance flags so the
build can FAIL, and the mode + ratification + "not used" declarations made explicit. It keeps the v1
single-block property: one fenced block, self-contained.

## What the block must carry
1. **Deterministic structure** — one machine-readable block, predictable shape (not prose).
2. **Token-spine readiness** — fields shaped for the builder's DTCG `$value`/`$type` spine, aliases,
   primitive/semantic tiering; OKLCH authored + HEX fallback derived by the builder.
3. **Declared constraints** — allowed/forbidden stated explicitly, never implied.
4. **Named responsibilities** per canon layer (INDEX / ESSENCE / PRIMITIVES / GRAMMAR).
5. **Generative-rule seeds (`if/then`)** mapping context → token override, where the owner stated rules.
6. **GAP register** — the delta between needed slots and what exists, in client language (the builder
   formalizes to `GAP-NNN`).
7. **Fidelity/provenance flags** per asset (build-grade vs reference vs missing) so the build can FAIL on a
   missing core asset.
8. **Auditability** — mode, owner ratification, and "not used" declarations explicit, so the build is
   auditable against intent.
9. **Checksummed manifest** — each placed item carries a `sha256`; no URL or local-path pointers.
10. **Per-datum provenance** — the 4-field spine (source / confidence / owner / freshness) on every
    primitive and gap, so the builder never uses a datum at a status it has not earned.
11. **Exhaustive dimension map** — every dimension resolves to filled / not-used / tagged-gap; none skipped.
12. **Build-mode + non-waivables** — FULL vs v0/DEMO declared; mark + graphic-code fidelity-blocking regardless.

The scoper passes pointers + owner-volunteered values only. It never samples a primitive; the builder
extracts measured values from the pointed-to sources.

## Template

````
Use the brand-canon-builder skill to build a brand canon in this repo.

BRAND: <name>
OWNERS: <who ratifies per slot>   UNRESOLVED CONFLICTS: <slots still split | none>
MODE: <ANALYZE | CREATE>   BUILD-MODE: <FULL | v0/DEMO>
TARGET REPO: <real path | "create repo <name>">

— MATERIAL MANIFEST (placed in-repo before build; checksums, never URLs) —
  <item> · role:<CONSUMER|REFERENCE|RAW> · fresh:<shipped|older> · path:<repo path> · fidelity:<build-grade|low-fi|pointer-only> · sha256:<hash> · ingest:<vector-extract|computed-css|design-file-native|ocr-visual|font-match|n/a>

— WHY (essence) — RATIFIED (elicited + owner-confirmed) —
  Category/positioning · Audience · Feel (is / never) · Anti-promise · One line (onliness) · RTB · Voice (register/lexicon/don'ts)

— WHAT (primitives) — POINTERS + OWNER-PROVIDED ONLY (scoper never sampled) —
  <slot>: present:<y/n> · intent:<meaning> · owner value:<… | none> · source:<repo pointer>
    · PROVENANCE{ source:<declared-spec|extracted-vector|computed-css|design-file|matched|traced|inferred|owner-stated> · confidence:<hypothesis|corroborated|owner-confirmed> · owner:<who ratifies> · freshness:<shipped|stated/old> }
  mark forms present: <wordmark/symbol/lockup/secondary/monogram/seal>

— HOW (grammar) —
  Schemes · contrast/imagery rule · mark-selection rule · voice enforcement · motion:<… | not used> · depth:<… | not used>
  generative-rule seeds (if/then): <e.g. if mode=dark then surface=elevated | none stated>

— TREATMENTS (visual/textural, for the reproduction router) —
  <treatment>: observed-on:<manifest item> · route-hint:<procedural|generative|vector-trace|raster-required|unknown> · PROVENANCE{ confidence:<hypothesis|corroborated|owner-confirmed> } · none

— DIMENSION MAP (every dimension resolves; none skipped silently) —
  <dimension>: <filled | not-used(owner-declared) | tagged-gap>

— HORIZONS (category-detected; one-line + gap by default) —
  <horizon>: <direction one-line | not-relevant | tagged-gap> · existing-material:<y/n>

— POSTURE (guardrail layer; detected, not hardcoded) —
  profile:<low-profile|high-visibility|regulated|activist|playful|b2b-formal> · regulatory:<… | none> · stance:<takes positions | neutral> · never-topics:<…> · refusal-style:<…>

— CORE-ASSET FIDELITY CONTRACT (this brand's must-haves) —
  <core slot>: <present build-grade | GAP low-fi/missing → fidelity-blocking>
  NON-WAIVABLE even in v0/DEMO: mark · graphic-code

— GAPS (client-language; builder formalizes to GAP-NNN) —
  <what's missing> — why:<…> · severity:<MUST/SHOULD/NICE> · provenance:<handoff-deliberate|handoff-defect|builder|skill-scope> · proposed:<…>

— OPTIONAL (v0/DEMO: OPTIONAL defaults YES; carve-out = scope-expanding dims default NO) —
  <dimension>: not used | demo-default-yes | scope-expanding(demo-default-no)
  Claude Design component library: default YES; "no" only on explicit owner opt-out

NOTES: <…>
````

## Rules

These v3 rules ADD to the v2 invariants (pointers-only, MODE ANALYZE/CREATE, real TARGET REPO + manifest
in-repo, RATIFIED-WHY-only, flag authored print, CORE-ASSET FIDELITY CONTRACT fidelity-blocking, GAPS in
client language, Claude Design default YES, one fenced self-contained block). Where a v3 rule hardens a v2
one, v3 wins.

- **Checksums, never URLs.** Every manifest item carries `sha256`; the builder verifies before reading.
  Zero pointers to Claude.ai or to a local Downloads folder. (Closes the v2 dead-end: resource handoff by URL.)
- **Media is attached + its ingestion declared.** Social/applied expression never crosses the seam as prose;
  it is placed in `assets/`/`sources/` with an `ingest:` field telling the builder how to read it
  (vector-extract / computed-css / design-file-native / ocr-visual / font-match). (Closes the v2 dead-end:
  applied expression passed as prose degraded across the seam.)
- **Provenance on every primitive and every gap.** WHAT carries the 4-field spine
  (source / confidence / owner / freshness); observed expression enters as `hypothesis`; the builder never
  promotes a one-off to a line without `owner-confirmed`. This is the v3 root-cause fix (lost epistemic status).
- **`BUILD-MODE: v0/DEMO`** turns OPTIONAL to default-YES with a carve-out: genuinely scope-expanding
  dimensions default NO. Mark and graphic-code stay fidelity-blocking even in demo (the NON-WAIVABLE line of
  the fidelity contract). FULL is the normal mode.
- **The DIMENSION MAP is exhaustive.** Every dimension resolves to `filled` / `not-used(owner-declared)` /
  `tagged-gap`. A builder that receives an unresolved dimension STOPS and reports — this is the
  anti-determinism mechanism, not decoration.
- **TREATMENTS, HORIZONS, POSTURE are capability-class blocks, not brand instances.** They carry the
  scoper's observations + route-hints + detected posture as hypotheses for the builder's router / horizon
  detector / guardrail layer; none asserts a brand-specific value as settled truth.
- One block, fenced, self-contained. After it, tell the person: place the material in the target repo per the
  manifest (with checksums), then open Claude Code there and paste this; it runs brand-canon-builder.
