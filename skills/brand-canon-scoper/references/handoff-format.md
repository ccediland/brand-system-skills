# Handoff format

The scoper's only output is ONE self-contained, machine-readable block. The person places the material in
the target repo per the manifest, then pastes this block into Claude Code (in or next to the target repo) to
invoke `brand-canon-builder`.

This block is the output of **gate 7b** — produced ONLY after the Final Brand Brief (gate 7a) has the owner's BLOCKING approval; nothing compiles before that sign-off.

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
9. **Two-track manifest** — in-repo ASSETS carry a `sha256` (verified before reading); LIVE CONSUMERS (the
   surfaces the brand ships today) carry a `url` verified by REACHABILITY, not a checksum. Dead/ephemeral
   pointers (Claude.ai chats, local Downloads, auth-walled) stay forbidden.
10. **Per-datum provenance** — the 4-field spine (source / confidence / owner / freshness) on every
    primitive and gap, so the builder never uses a datum at a status it has not earned.
11. **Exhaustive dimension map** — every dimension resolves to filled / not-used / tagged-gap; none skipped.
    The SCOPER owns DIMENSION-MAP completeness — the builder STOPs only on a present-but-unresolved dimension,
    so an un-enumerated dimension is the scoper's defect, never a silent pass.
12. **Build-mode + non-waivables** — FULL vs v0/DEMO declared; the primary-identity carrier (resolved from the DIMENSION MAP, not assumed a visual mark) + graphic-code fidelity-blocking regardless.
13. **Owner rule-values the gate/keystone need** — per-mark geometry, per-font license, voice-exemplars,
    value trade-offs, personality scores, posture visibility + audiences: each carried as a typed slot with
    provenance, so the builder reads them instead of re-hunting, and absence is a GAP, never a fabrication.

The scoper passes pointers + owner-volunteered values only. It never samples a primitive; the builder
extracts measured values from the pointed-to sources.

## Template

````
Use the brand-canon-builder skill to build a brand canon in this repo.

BRAND: <name>
OWNERS: <who ratifies per slot>   UNRESOLVED CONFLICTS: <slots still split | none>
MODE: <ANALYZE | CREATE>   BUILD-MODE: <FULL | v0/DEMO>
TARGET REPO: <real path | "create repo <name>">

— MATERIAL MANIFEST (two tracks; dead/auth-walled/Downloads pointers forbidden) —
  ASSETS (in-repo before build; checksummed):
    <item> · role:<REFERENCE|RAW> · fresh:<shipped|stated-old> · path:<repo path> · fidelity:<build-grade|low-fi|pointer-only> · sha256:<hash> · ingest:<vector-extract|computed-css|design-file-native|ocr-visual|font-match|n/a>
  CONSUMERS (live surfaces the brand ships today; verified by reachability, not a checksum):
    <surface> · url:<live url> · role:CONSUMER · fresh:<shipped|stated-old> · bidirectional:<y/n> · promotion-path:<… | none> · ingest:computed-css   (fixed by invariant: a live surface is always read computed-css; only the ASSETS track carries the full ingest enum)

— WHY (essence) — RATIFIED (elicited + owner-confirmed) —
  Category/positioning · Audience · Feel (is / never) · Anti-promise · One line (onliness) · RTB · Voice (register/lexicon/don'ts)
  Personality (Aaker-5 scored: sincerity/excitement/competence/sophistication/ruggedness) · Differential scales (formal↔casual etc.) · Resonance
  VALUE TRADE-OFFS: <1–2 owner-confirmed "when trading X vs Y the brand chooses Z" | none>
  VOICE-EXEMPLARS (per audience): <audience> → on-brand:<utterance> / off-brand:<utterance> · PROVENANCE{ confidence:<owner-confirmed | hypothesis> } | none

— WHAT (primitives) — POINTERS + OWNER-PROVIDED ONLY (scoper never sampled) —
  <slot>: present:<y/n> · intent:<meaning> · owner value:<… | none> · source:<repo pointer>
    · PROVENANCE{ source:<declared-spec|extracted-vector|computed-css|design-file|matched|traced|inferred|owner-stated> · confidence:<hypothesis|corroborated|owner-confirmed> · owner:<who ratifies> · freshness:<shipped|stated-old> }
  mark forms present: <wordmark/symbol/lockup/secondary/monogram/seal>
  per-mark GEOMETRY (owner-provided + PROVENANCE; builder Stage 6 reads, does not re-hunt):
    <mark>: clear-space:<… | none> · min-size digital:<… | none> · min-size physical:<… | none> · construction-ref:<repo pointer | none> · PROVENANCE{ confidence:<owner-confirmed | hypothesis> }
  per-font: <face>: license:<declared SPDX/license id (e.g. OFL-1.1, Apache-2.0, Ubuntu) | owner-supplied | unlicensed→GAP>

— HOW (grammar) —
  Schemes · contrast/imagery rule · mark-selection rule · voice enforcement · motion:<… | not used> · depth:<… | not used>
  generative-rule seeds (if/then): <e.g. if mode=dark then surface=elevated | none stated>

— TREATMENTS (visual/textural, for the reproduction router) —
  <treatment>: observed-on:<manifest item> · route-hint:<procedural|generative|vector-trace|raster-required|unknown> · PROVENANCE{ confidence:<hypothesis|corroborated|owner-confirmed> } · none

— DIMENSION MAP (every dimension resolves; none skipped silently; scoper owns completeness) —
  <dimension>: <filled | not-used(owner-declared) | tagged-gap>
  applied-expression/social: <filled(media-attached) | not-used(owner-declared) | tagged-gap>   (must resolve explicitly)

— HORIZONS (category-detected; one-line + gap by default) —
  <horizon>: <direction one-line | not-relevant | tagged-gap> · existing-material:<y/n>

— POSTURE (guardrail layer; detected, not hardcoded; `profile` is an OPEN capability class — record an unlisted posture verbatim) —
  profile:<low-profile|high-visibility|regulated|activist|playful|b2b-formal|<other-detected>  (illustrative set, not a closed list)> · visibility:<low|moderate|high> · audiences:<ordered priority list> · regulatory:<… | none> · stance:<takes positions | neutral> · never-topics:<…> · refusal-style:<…>

— CORE-ASSET FIDELITY CONTRACT (this brand's must-haves) —
  <core slot>: <present build-grade | GAP low-fi/missing → fidelity-blocking>
  NON-WAIVABLE even in v0/DEMO: the brand's PRIMARY-IDENTITY CARRIER(S) — resolved from the DIMENSION MAP (e.g. visual mark | sonic-mark | motion-signature | other declared lead atom) · graphic-code
  (Where the build has no build-grade producer for the resolved carrier's medium, that carrier is a DECLARED fidelity-blocking GAP per its role — never a false zero-tolerance fail on a visual mark the brand does not lead with, and never a silent pass.)

— GAPS (client-language; builder formalizes to GAP-NNN) —
  <what's missing> — why:<…> · severity:<MUST/SHOULD/NICE> · provenance:<handoff-deliberate|handoff-defect|builder|skill-scope> · proposed:<…>

— OPTIONAL (v0/DEMO: OPTIONAL defaults YES; carve-out = scope-expanding dims default NO) —
  <dimension>: not used | demo-default-yes | scope-expanding(demo-default-no)
  Claude Design component library: default YES; "no" only on explicit owner opt-out
  existing-component-stack: <storybook+playwright | other | none>   (default none → builder emits package-shape; storybook+playwright → builder may emit Storybook-shape — Stage 8 reads this, never re-hunts it)

NOTES: <…>
````

## Rules

These v3 rules ADD to the v2 invariants (pointers-only, MODE ANALYZE/CREATE, real TARGET REPO + manifest
in-repo, RATIFIED-WHY-only, flag authored print, CORE-ASSET FIDELITY CONTRACT fidelity-blocking, GAPS in
client language, Claude Design default YES, one fenced self-contained block). Where a v3 rule hardens a v2
one, v3 wins.

- **Two manifest tracks; never a DEAD pointer.** In-repo ASSETS carry `sha256` (the builder verifies before
  reading). LIVE CONSUMERS — the surfaces the brand actually ships today (site, app, active feed) — carry a
  `url` and are verified by REACHABILITY, not a checksum: the builder confirms each url resolves before reading
  it. What stays forbidden is the *dead/ephemeral* pointer — a Claude.ai chat link, a local Downloads path, an
  auth-walled resource — because the Code-side builder cannot reach it. (Closes the v2 dead-end: resource handoff
  by a dead URL — not by penalizing the live surface the brand runs on.)
- **Media is attached or live + its ingestion declared.** Social/applied expression never crosses the seam as
  prose. A static asset is placed in `assets/`/`sources/` (checksummed); a live surface is carried in CONSUMERS
  (reachability-checked). Either way it carries an `ingest:` field telling the builder how to read it
  (vector-extract / computed-css / design-file-native / ocr-visual / font-match). (Closes the v2 dead-end:
  applied expression passed as prose degraded across the seam.)
- **Provenance on every primitive and every gap.** WHAT carries the 4-field spine
  (source / confidence / owner / freshness); observed expression enters as `hypothesis`; the builder never
  promotes a one-off to a line without `owner-confirmed`. This is the v3 root-cause fix (lost epistemic status).
- **`BUILD-MODE: v0/DEMO`** turns OPTIONAL to default-YES with a carve-out: genuinely scope-expanding
  dimensions default NO. The brand's primary-identity carrier (resolved from the DIMENSION MAP, not assumed a
  visual mark) and graphic-code stay fidelity-blocking even in demo (the NON-WAIVABLE line of the fidelity
  contract). FULL is the normal mode.
- **The DIMENSION MAP is exhaustive and the scoper owns its completeness.** Every dimension resolves to
  `filled` / `not-used(owner-declared)` / `tagged-gap` — including `applied-expression/social`, which must
  resolve to `filled(media-attached)` / `not-used` / `tagged-gap` explicitly. A builder that receives a
  *present-but-unresolved* dimension STOPS and reports — this is the live anti-determinism mechanism, not
  decoration. But the builder can only stop on a dimension that is *present*: an un-enumerated dimension is the
  SCOPER's defect (a `handoff-defect` GAP), never a silent pass — completeness is the scoper's accountability.
- **Freshness value enum is pinned: `shipped | stated-old`.** The field NAMES stay (`fresh:` in the manifest,
  `freshness:` in PROVENANCE), but the value is one of exactly these two literals at every hop — manifest,
  provenance spine, and downstream. `shipped` = fresh/live; `stated-old` = declared but not the current shipped
  reality.
- **TREATMENTS, HORIZONS, POSTURE are capability-class blocks, not brand instances.** They carry the
  scoper's observations + route-hints + detected posture as hypotheses for the builder's router / horizon
  detector / guardrail layer; none asserts a brand-specific value as settled truth.
- One block, fenced, self-contained. After it, tell the person: place the material in the target repo per the
  manifest (with checksums), then open Claude Code there and paste this; it runs brand-canon-builder.
