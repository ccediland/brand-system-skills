# brand-system-skills — v2 backlog

> Findings from the first end-to-end run on a real brand (brownfield, print-native pilot — the OI-C run).
> Track-B (tool eval) only; no client content. Schema: `F-NNN · stage · what · severity · v2 change`.
> The reframe and the Chat/Code surface roadmap live in `RESIDENT.md` › `## v2`; this file is the granular
> evidence behind it.

## Headline
The run produced a structurally sound canon (authored/derived correct, brand-scrub correct, rules cited by
ID) that was **unusable as a client deliverable**: no real assets, placeholder mark, fallback fonts, generic
renders. The skill validated rule-compliance of an empty skeleton and called it done.

## WS0 · Foundational reframe
- **F-023 · BLOCKER** · no brand intake/understanding methodology exists at all. → define it as the skill's spine.
- **F-024 · BLOCKER** · wrong mental model (greenfield-vs-brownfield). We do not create from scratch (except on
  explicit instruction); default = analyze already-published work across mediums (site, social, print,
  brandbook) → harvest → refine → transform → improve. Encoded brand/country/client-blind.
- **F-025 · BLOCKER** · "placeholder here" as a default is unacceptable. A real, decent prototype is critical
  for the client AND for selling the service. → deliverable includes a real prototype (real mark, fonts,
  imagery on real surfaces), not placeholder scaffolding.
- **F-026 · BLOCKER** · the repo must be born `/design-sync`-able BY DEFAULT. `/design-sync` needs a compiled
  component library (dist/Storybook/package); a canon has none. The build must always emit that component
  library as a PROJECTION (canon stays stack-agnostic) — never the opt-in "Claude Design adapter? no"
  default. The real prototype (F-025) IS that library. (Supersedes the earlier F-017 OKLCH-in-design-sync
  question — sync did not apply.)

## WS1 · Scoper = guided intake instrument (not autonomous miner)
- **F-002 · BLOCKER** · scoper ran no intake; invented the WHY (essence). → mandatory blocking interview
  before compile; WHY is elicited, never inferred (source material does not contain it).
- **F-008 · BLOCKER** · scoper is not a guided instrument. → 3 stages: (a) material protocol across the full
  spectrum (full brandbook / only a site / nothing), (b) interview script/questionnaire at start, (c)
  gap+confirmation doc to review with the client; only then compile.
- **F-009 · SHOULD** · no multi-decider or unstructured-input handling. → capture multiple voices → one
  confirmation; structure/de-dup rambling input. Encoded blind.
- **F-003 · HARD RULE** · scoper extracted primitives and got them wrong (sampled an approximate color the
  builder later corrected from the source's authored print values). → scoper never extracts primitives; it
  points at the source, the builder extracts.
- **F-006 · SHOULD** · scoper proposed a non-existent target repo (no filesystem view). → pass it the target repo.
- **F-007 · SHOULD** · handoff pointed source material to "Project knowledge", which the Code-side builder
  cannot read. → instruct "place source material in the repo" as a build precondition.
- **F-020 · BLOCKER** · the pipeline never REQUESTED the full visual inventory (mark vectors, font files,
  pattern, photography, icons, seals). → intake demands the asset inventory as a precondition.

## WS5 · Real visual assets + brand fidelity
- **F-018 · BLOCKER** · zero asset extraction from the source PDF (logo, wordmark, symbol, seal, monogram,
  icons, pattern, type specimens). The builder already ran a PDF renderer for color — extraction was in
  reach. → asset extraction from source PDFs is a first-class, blocking build step (extract embedded
  vectors/images, inventory, place under `assets/`).
- **F-019 · BLOCKER** · zero font acquisition; named faces punted to fallback stacks. → font acquisition is a
  required step (search/fetch/license/host).
- **F-021 · BLOCKER** · ignored live applied-design references (site + social), though the site was registered
  as a bidirectional design-intent source. Harvested facts, never design. → harvest live consumers' applied
  design language (layout, imagery, composition); study social for the lived aesthetic.
- **F-022 · BLOCKER (meta)** · success criteria reward rule-compliance over brand fidelity. Every gate passed
  on asset-less scaffolding. → add brand-fidelity / "presentable to client" gates (real mark, fonts, pattern,
  imagery); missing core assets FAIL the build, not "pass with gaps." Gap-logging stays; proceeding to
  "done" without assets is the bug.

## WS2 · Post-build validate/audit stage (new)
- **F-016 · BLOCKER** · the skill ends at "canon built"; no validation loop. → add a final VALIDATE/AUDIT
  stage: render real sample artifacts + rule-by-rule audit of all written and visual content (own and
  generated) + a client-confirmation round.

## WS3 · Client-clean output
- **F-013 · SHOULD** · reference-brand bleed (the method-reference brand's naming rule leaked into the client canon).
- **F-015 · SHOULD** · build-tool self-attribution in the client deliverable (README/RESIDENT credited the tool).
- **F-014 · SHOULD** · premature auto "Ratified by…" stamp without real sign-off. → gate ratification on confirmation.
- Theme: scrub all apparatus (reference brand, tool credit, scaffolding chatter); never auto-stamp ratification.

## WS4 · Distribution / install / deps
- **F-001 · SHOULD** · scoper Chat-side: installing the Code plugin ≠ available in claude.ai chat. → document
  in the marketplace README; publish a zip ready for claude.ai upload.
- **F-011 · SHOULD** · builder skill was not installed in Code (method executed by hand) — eval-validity
  caveat. → validate the install path; declare a portable PDF-render dependency (poppler/PyMuPDF fallback).

## Validated — do not regress
- **F-005** authored/derived print-native (Pantone authored, OKLCH interchange, not re-derived) — PASS.
- **F-012** brand-scrub fired correctly (junk only, gated; facts preserved) — PASS.
- **F-004** expanded taxonomy (monogram/seal/pattern/physical reproduction) exercised — PASS.
- **OI-A** motion/depth handled (reserved/not-used) for a flat brand — OK.
- **OI-B** canon enables rule-ID citation (`ruleIndex` + `ALGO-*`); the gap is consumer-side (web-stack does
  not cite rule IDs).
