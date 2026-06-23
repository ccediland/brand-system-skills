---
title: "Brand-system-skills v3 — execution plan"
status: active
current_phase: "2 of 5 — Chat↔Code seam"
last_updated: 2026-06-22
home_base: chat
resident: ccediland/brand-system-skills/RESIDENT.md
next_action: "Phase 2 gate: ratify the v3 Chat↔Code handoff contract (checksummed manifest · media-ingestion method · 4-field provenance · v0/DEMO mode · per-gap provenance tags) before both skills build to it."
---

# Brand-system-skills v3 — execution plan

## Plan / ideal end-state

Rectoral constraint, governs the entire skillset and not any single phase: anti-determinism. Every part of v3 — discovery, inventory, capture, reproduction, the dimension map, the keystone file — reasons in general capability classes, spaces, and decision methods, never in single-brand instances. A brand instance (the anonymous stress-test brand) is only ever an illustration. The determinism failure recurred at every phase of the v2 stress test (scoper inventory anchoring, scoper unconfirmed "lines", builder font and graphic-code misses) and inside the v3 pre-research itself; intentions did not prevent it, so v3 enforces it structurally rather than by good will.

v3 builds on v2 (shipped). v2 rebuilt the skills into an analyze-extract-prototype-plus-library engine; a fresh adversarial stress test — a third, independently-authored brand of a different shape (a divergent multi-source identity: an authored brandbook, fresher shipped social, a stale website) — then exposed deeper failure classes, all reducing to the system losing track of its data's epistemic status and crystallizing the unconfirmed. v3 addresses them.

Done looks like: the two skills — `brand-canon-scoper` (chat-side) and `brand-canon-builder` (Code-side) — rebuilt to v3 and validated against a second, differently-shaped brand (no brandbook, light-only palette, incomplete material), such that another Claude or Carlos would judge them battle-hardened and fool-proof. The north-star deliverable — a single attachable Markdown file that lets an AI speak, design, and think as the brand — is a mandatory build output the rest of the canon now serves, and it gives v3 a testable end-to-end criterion (instantiate the brand-AI, judge fidelity).

Objective: rebuild the skillset around five axes and two execution columns, with anti-determinism rectoral and provenance/epistemics as the spine.
- Five axes (problem structure, from the v3 stress-test findings): coverage and epistemics; faithful capture and reproduction; brand horizons plus the AI-knowledge keystone; the Chat-to-Code seam; two-surface output.
- Two execution columns (how every capability gets built): provenance and epistemic discipline (be honest about what is known versus assumed) plus faithful-capture craft (be actually able to reproduce what is seen). Neither subsumes the other — the provenance frame does not, by itself, draw a texture.
- Spine: every datum carries provenance — source, confirmation status, owner, freshness — and is never used as if it had a status it has not earned.

This plan does not stand alone — it points at three companion repo docs. The full resolved research (methods, capability boundaries, and primary sources for all six capability areas) lives in `v3-research-foundation.md`; the durable goals and decisions in `RESIDENT.md` (`## v3`); the technical methods and gotchas in `CLAUDE.md` (`## v3`). The phases below name the chosen methods; their build-level detail and sources are in `v3-research-foundation.md`. Work from those four repo documents, not from any working notes.

Phases:
1. Foundations and architecture — surface: chat; model: top Opus (reasoning); output: a v3 architecture spec (anti-determinism as rectoral constraint; the provenance/epistemic-status model; the adaptive dimension-map mechanism, where every dimension resolves to filled, not-used, or tagged-gap and none is skipped silently; the two-surface output model; the keystone `.md` schema spanning think/speak/design plus a guardrail layer) and the definition of what the scoper and builder each become. Gate: Carlos ratifies before any rewrite.
2. The Chat-to-Code seam — surface: chat design, Code implements; model: Opus (design), Code (implementation); output: a rewritten handoff contract (placed-files manifest with checksums, not URLs; a social and applied-media ingestion method; a declared `v0/DEMO` mode where OPTIONAL defaults to YES with a carve-out for genuinely scope-expanding dimensions, and mark plus graphic-code stay non-waivable even in demo; provenance tags on every gap — handoff-deliberate, handoff-defect, builder, or skill-scope). Gate: contract fixed before both skills build to it.
3. Scoper v3 — surface: Code (skill rewrite), Opus for design calls; output: rewritten `brand-canon-scoper` — a brandbook-first, social-first, stale-versus-fresh discovery protocol; the adaptive dimension map plus epistemic states in elicitation (observed expression enters as hypotheses, never findings; line-versus-one-off promotion requires owner confirmation); a plain-language, visual, Spanish client surface with design terms glossed by example; the posture-elicitation and horizon-detection methods; outputs split into an internal status doc, an external client instrument, and a living questions/requests doc (committed to the repo where the environment allows, degrading gracefully to a downloadable artifact otherwise).
4. Builder v3 — surface: Code; model: Code (execution tier), top Opus for hard design calls, fast tier for mechanical extraction and optimization; output: rewritten `brand-canon-builder` — the multi-source capture decision tree with the stated-spec-read rule (`page.get_drawings()`, dvisvgm, or copy-region for clean vectors; OCR or visual read of named specs authoritative, `pdffonts` corroborative only; image-based font matching for unnamed faces); the treatment-to-reproduction router (procedural SVG-filter, generative-library, vector-trace, or raster-required) with visual-diff validation and an explicit cannot-reproduce-in-code boundary; the DTCG `2025.10` token spine plus an OKLCH scheme-derivation engine (light/dark, high-contrast, sub-brand as cases); fidelity gates; a provenance-tagged gap ledger; and emission of the keystone `.md` as a mandatory output.
5. Validation and release — surface: chat plus Code; model: Opus (judgment), Code (the run); output: a fresh stress test on a second, differently-shaped brand to confirm generality; a red-team of the guardrail layer (persona and injection); a visual-diff audit of reproductions; a check that no single-brand-shaped hardcoding survived; then the v3 release and the final migration of durable residue into `RESIDENT.md`.

## Current state

Active: phase 2 (Chat↔Code seam). Phase 1 (Foundations & architecture) RATIFIED by Carlos 2026-06-22 — architecture spec + keystone `.md` schema approved, distilled into RESIDENT `## v3` Decisions. Build at zero percent. Design inputs complete — the v3 stress-test findings and the research foundation are done; the five axes, two columns, provenance spine, and keystone north star are settled. The stress-test artifacts (branch `v0/canon-from-available` in the private test-brand repo) are test-only and do not ship.

## Session log

- 2026-06-22 — Phase 1 ratified; Phase 2 opened. Carlos ratified the architecture spec and the 6-section
  keystone schema (no separate spec file — distilled into RESIDENT Decisions). Designed the v3 handoff
  contract in Chat and committed it to `skills/brand-canon-scoper/references/handoff-format.md` (checksummed
  manifest · media-ingestion · 4-field provenance · v0/DEMO · per-gap provenance tags; new TREATMENTS /
  DIMENSION MAP / HORIZONS / POSTURE blocks). RESIDENT + CLAUDE given the v3 deltas. Next: Phase 2 gate —
  Carlos ratifies the contract, then both skills build to it.
- 2026-06-22 — Ran the full identify, pre-research, research, plan arc. Merged the two v2-stress-test findings docs into five axes plus two execution columns; named the provenance/epistemics spine and the "a brand an AI can be" north star. Ran pre-research twice — the second pass re-leveled every research subtask from single-brand instances to general capability classes after catching instance-level determinism in the first pass. Ran Research mode and produced the six-subtask research foundation (capture tree, treatment-to-reproduction router, keystone schema, posture-guardrails, horizon detection, DTCG plus OKLCH). Wrote this execution plan, committed it to the repo root, and added the v3 domain to `RESIDENT.md` and `CLAUDE.md`. Decided anti-determinism is the rectoral constraint of the whole skillset, not just the research. Next: draft the Phase 1 architecture spec and get it ratified before building.

## Decisions made

- Anti-determinism is the skillset's rectoral constraint — the failure recurred at every v2 phase and in the v3 pre-research itself, so v3 enforces it structurally (the dimension map; general-capability framing; instance-as-illustration only) rather than relying on intent. (Carlos.)
- North star is a brand an AI can speak, design, and think as; the keystone `.md` is the keystone deliverable the rest of the canon serves, and it supplies a testable end-to-end success criterion.
- Spine is provenance and epistemics on every datum — roughly five distinct v2 failures reduce to "the system lost track of its data's status (source, confidence, owner, freshness)."
- Two execution columns, not one — provenance discipline and faithful-capture craft are both required; the elegant provenance frame cannot, alone, reproduce an asset.
- The adaptive dimension map (filled, not-used, tagged-gap) is the single mechanism that fixes both over-reach (crystallizing the unconfirmed) and under-reach (horizons never considered).
- Stated-spec-read rule — the brand's declared truth (named font, declared color) is authoritative; tool metadata is corroboration only. This is the root-cause fix for the miss where an outlined brand face went unidentified and the studio's embedded layout font was reported in its place.
- Treatment-to-reproduction is a router over a taxonomy (procedural, generative, vector-trace, raster), validated by visual diff, with an explicit code-cannot-do-this boundary.
- `v0/DEMO` mode: OPTIONAL defaults to YES for future-proofing and momentum, with a carve-out for genuinely scope-expanding dimensions; mark plus graphic-code are non-waivable even in demo.
- Two-surface output — an internal rigor surface (structured, mixed-language) and an external client surface (plain language, visual, Spanish) are split by architecture.
- Token target is DTCG `2025.10` (stable; theming via resolvers, modern color including OKLCH); scheme derivation uses OKLCH as one general engine. Tooling lag (Style Dictionary v5 work-in-progress) is a known risk with a custom-transformer fallback.
- The stress-test brand repo is a test artifact, not a shipped product.

## Dead-ends

- Tried: trusting `pdffonts` for the brand typeface. Abandoned: it reported the studio's embedded layout font because the brand face was outlined and invisible to the font table. Do not retry — read the page that names the type (OCR or visual), treat font-table metadata as corroboration only, and flag agency-embedded contamination.
- Tried: opening the full PDF page in Inkscape with a cropped viewBox as the "isolated" mark. Abandoned: not isolated — it carried the whole page's paths and glyph definitions; bloated, not a master. Do not retry — subtree-extract (`page.get_drawings()`) or copy-region-to-new-document, or label page-clips honestly as page clips.
- Tried: recreating the graphic-code pattern parametrically from scratch. Abandoned: wrong result (spiky versus the source's rounded forms) because it was invented without comparing to the source. Do not retry — trace the embedded vector as the master; keep parametric only as a variant validated by visual diff.
- Tried: passing social and applied expression as prose description across the handoff. Abandoned: the builder could not ingest prose; the whole applied-expression dimension degraded across the seam. Do not retry — attach real media or exports and give the builder an ingestion method.
- Tried: resource handoff to Code via Claude.ai URLs. Abandoned: unreachable behind an auth wall; the builder fell back to hunting local Downloads. Do not retry — a placed-files manifest with checksums, never links the builder cannot fetch.
- Tried (meta): researching or building a single brand instance (a specific texture, specific fonts) instead of the general capability; and earlier, front-loading ML before data foundations existed. Abandoned: determinism and tunnel-vision recur at every phase. Do not retry — anti-determinism is rectoral; always target the general capability class, with the instance as illustration only.

## Open questions / blockers

- Claude Project RAG trip-point: the exact size at which the keystone `.md` stops being context-resident and is silently chunked is unpublished by Anthropic; the keystone size budget needs empirical calibration. Waits on a calibration test in Phase 4.
- Resolver-based theming for the OKLCH scheme-derivation engine rides on the existing v2 pin (Style Dictionary v5 + DTCG `2025.10`, tracked in `RESIDENT.md` Decisions; 2025.10 not yet fully supported in SD v5, issue #1590). The compiler may need a custom-transformer or Terrazzo fallback for resolver theming. Waits on SD v5 progress.
- The graceful-degradation path for the living questions doc when the chat environment lacks a connector or filesystem (commit-to-repo versus downloadable artifact) needs a spec in Phase 3.
- The second validation brand (Phase 5) is not yet chosen — it must be differently-shaped (no brandbook, light-only palette, incomplete material) to actually test generality.
- Gate: Carlos must ratify the Phase 1 architecture before any skill rewrite begins.

## Next actions

1. Draft the Phase 1 v3 architecture spec: write anti-determinism as the skillset's rectoral constraint, the provenance/epistemic-status model, and the adaptive dimension-map mechanism; define what `brand-canon-scoper` and `brand-canon-builder` each become in v3. (Chat, top Opus.)
2. Design the keystone `.md` schema (think, speak, design, plus the guardrail layer) as the north-star deliverable spec, structured for Claude Project consumption. (Chat, top Opus.)
3. Take the architecture and keystone schema to Carlos for ratification — the gate — before any rewrite.
4. (Done this session) The execution plan, the updated `RESIDENT.md`, and the updated `CLAUDE.md` are committed via PR on branch `claude/v3-plan`; merge to make them resident on `main`.

## Resume

Read `RESIDENT.md` first — its front matter, TL;DR, and domain map, then only the domains this plan touches — then this plan's state block, Current state, Open questions, and Next actions. Confirm the next action with Carlos, then continue. Do not restart the plan.
