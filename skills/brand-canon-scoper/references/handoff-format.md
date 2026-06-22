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

The scoper passes pointers + owner-volunteered values only. It never samples a primitive; the builder
extracts measured values from the pointed-to sources.

## Template

````
Use the brand-canon-builder skill to build a brand canon in this repo.

BRAND: <name>
OWNERS: <who ratifies>   UNRESOLVED CONFLICTS: <slots still split | none>
MODE: <ANALYZE | CREATE>
TARGET REPO: <real path | "create repo <name>">

— MATERIAL MANIFEST (placed in-repo before build) —
  <item> — role:<CONSUMER|REFERENCE|RAW> · fresh:<shipped/older> · path:<repo path> · fidelity:<build-grade|low-fi|pointer-only>

— WHY (essence) — RATIFIED (elicited + owner-confirmed) —
  Category/positioning · Audience · Feel (is / never) · Anti-promise · One line (onliness) · RTB · Voice (register/lexicon/don'ts)

— WHAT (primitives) — POINTERS + OWNER-PROVIDED ONLY (scoper never sampled) —
  <slot>: present:<y/n> · fidelity:<…> · owner value:<… | none> · authored-print:<… | n> · intent:<meaning> · source:<repo pointer>
  mark forms present: <wordmark/symbol/lockup/secondary/monogram/seal>

— HOW (grammar) —
  Schemes · contrast/imagery rule · mark-selection rule · voice enforcement · motion:<… | not used> · depth:<… | not used>
  generative-rule seeds (if/then): <e.g. if mode=dark then surface=elevated | none stated>

— CORE-ASSET FIDELITY CONTRACT (this brand's must-haves) —
  <core slot>: <present build-grade | GAP low-fi/missing → fidelity-blocking>

— GAPS (client-language; builder formalizes to GAP-NNN) —
  <what's missing> — why:<…> · severity:<MUST/SHOULD/NICE> · proposed:<…>

— OPTIONAL —
  <dimension>: not used
  Claude Design component library: default YES; "no" only on explicit owner opt-out

NOTES: <…>
````

## Rules
- **Pointers + owner-volunteered values only.** Fill `WHAT` with what the owner *provided as truth* and with
  *repo pointers*; never write a value you sampled or measured. The builder extracts from the sources.
- **MODE is ANALYZE or CREATE** (not greenfield/brownfield). Default ANALYZE; CREATE only on explicit
  instruction.
- **A real TARGET REPO** (path or "create repo X") and a MATERIAL MANIFEST that places every source
  in-repo (`assets/` binaries, `sources/` references). Never point the builder at "Project knowledge."
- **RATIFIED WHY only.** The essence block carries the owner-confirmed WHY. If it could not be ratified, it
  is a GAP, not a guess.
- **Flag authored print** (Pantone/CMYK the brand defines as truth) so the builder won't re-derive it from
  OKLCH.
- **Emit the CORE-ASSET FIDELITY CONTRACT** — the per-brand core slots, each present-build-grade vs
  gap/low-fi. A core asset that is missing or low-fi is fidelity-blocking: it FAILS the build, not "passes
  with gaps."
- **GAPS in client language**; the builder owns the `GAP-NNN` IDs. Pre-tag severity (MUST/SHOULD/NICE) to
  seed it.
- **Claude Design component library defaults to YES**; only "no" on explicit owner opt-out.
- One block, fenced, self-contained. After it, tell the person: place the material in the target repo per the
  manifest, then open Claude Code there and paste this; it runs brand-canon-builder.
