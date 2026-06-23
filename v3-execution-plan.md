---
title: "Brand-system-skills v3 — execution plan"
status: active
current_phase: "5 of 5 — validation & release"
last_updated: 2026-06-23
home_base: "Code (the validation run) + Chat (judgment)"
resident: ccediland/brand-system-skills/RESIDENT.md
next_action: "Phase 5: choose a second, differently-shaped brand and run validation · live guardrail red-team · visual-diff audit · then release. Design + build are shipped and the ENTIRE audit ledger (#19 + #25) is CLOSED across PRs #20–#29 — zero BLOCKER/MAJOR/MINOR/NIT except the deliberate F55 + the OI-J horizon. The only residual surface is Code (the run) + Chat (judgment); nothing precedes the run except picking the brand."
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

Active: **phase 5 (validation & release)**. **Phases 1–4 are SHIPPED to `main`** — the scoper and builder are rewritten to v3: handoff contract (#12) · scoper v3 (#13) · builder — spine+capture (#14), spine harmonization (#15), reproduction+DTCG/OKLCH (#16), keystone+fidelity-gate (#17). A full transversal audit then ran (`v3-audit—2026-06-22.md`, at the root of the open `v3/audit` branch / PR #19, not merged to main; verdict QUALIFIED NO), and a fresh full system audit (`v3-system-audit—2026-06-23.md`, at main root; #25). Both ledgers are now **FULLY REMEDIATED across PRs #20–#29**: handoff seam (#20) · install integrity (#21) · RESIDENT compaction (#22) · provenance spine + keystone operability (#23) · public surface + docs + F16 (#24) · medium scoping + keystone orphan (#26) · client-drift + hygiene (#27) · scoper client instrument + intake (#28) · ledger close + last leak F45 + tail (#29). **The entire audit ledger is CLOSED — zero BLOCKER/MAJOR/MINOR/NIT**, except the deliberate F55 (bold-density deviation) + OI-J (sonic/motion build-grade horizon). The only residual is the Phase-5 run itself — a second, differently-shaped brand · live guardrail red-team · visual-diff audit · release; nothing else precedes it. The stress-test artifacts (branch `v0/canon-from-available` in the private test-brand repo) are test-only and do not ship.

## Session log

- 2026-06-23 — **Audit ledger fully CLOSED (#20–#29).** After the #24 move-to-Phase-5, a fresh full system
  audit (#25, `v3-system-audit—2026-06-23.md`) re-verified main and surfaced a residual tail; it was
  remediated across #26 (medium scoping + keystone orphan), #27 (client-drift + hygiene), #28 (scoper client
  instrument + medium-agnostic intake — closed F10, the last #19 MAJOR), and #29 (the last determinism leak
  F45 + the full MINOR/NIT tail + coverage-gap + the OI-I/ledger re-baseline). Both audit reports are now
  closed baselines (the #19 report on the open `v3/audit` branch, the #25 report at main root). Repo carries
  **zero BLOCKER/MAJOR/MINOR/NIT** except the deliberate F55 (bold-density) + the OI-J horizon. The only
  remaining work is the Phase-5 validation run. Mirrors `RESIDENT.md` OI-I (RESOLVED) + change log.
- 2026-06-23 — **Remediation fix-pass complete; moved to Phase 5.** After the transversal audit
  (`v3-audit—2026-06-22.md`; QUALIFIED NO; 4 BLOCKER · 22 MAJOR · 24 MINOR · 6 NIT; PR #19 left open), the
  remediation shipped as Themes 1–6 + the pulled-forward Theme-5 F16: handoff seam single-sufficient-interface
  (#20), install integrity (#21), RESIDENT compaction (#22), provenance spine + keystone operability (#23),
  and public surface + docs sync (this pass — manifests carry the keystone + v0.3.0 + ANALYZE/CREATE; the
  coverage table reframed to an illustrative floor with the universality stress test primary; build-tracking
  tokens stripped from shipped prose; this plan resynced). Repo now carries ZERO BLOCKER. One MAJOR remains
  (F10, Theme-7 scoper client instrument) plus MINORs F32/F38 + the coverage-gap pass — all before the Phase-5
  run. Next: clear Theme 7 + the coverage-gap pass, then run validation on a 2nd differently-shaped brand,
  the live guardrail red-team, and the visual-diff audit; then release. Mirrors RESIDENT `## v3` + change log.
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

- Claude Project RAG trip-point: the exact size at which the keystone `.md` stops being context-resident and is silently chunked is unpublished by Anthropic; the keystone size budget needs empirical calibration. Waits on a calibration test in Phase 5.
- Resolver-based theming for the OKLCH scheme-derivation engine rides on the existing v2 pin (Style Dictionary v5 + DTCG `2025.10`, tracked in `RESIDENT.md` Decisions; 2025.10 not yet fully supported in SD v5, issue #1590). The compiler may need a custom-transformer or Terrazzo fallback for resolver theming. Waits on SD v5 progress.
- The graceful-degradation path for the living questions doc when the chat environment lacks a connector or filesystem (commit-to-repo versus downloadable artifact). RESOLVED (#13 scoper v3 — Stage 6: commit-where-possible, else a downloadable artifact).
- The second validation brand (Phase 5) is not yet chosen — it must be differently-shaped (no brandbook, light-only palette, incomplete material) to actually test generality.
- Gate (Phase 2): the v3 Chat↔Code handoff contract. RESOLVED — ratified, and both skills built to it (Phases 2–4 shipped); the handoff was later hardened to the single sufficient interface in the Theme-1 remediation (#20).
- Pre-Phase-5 remediation: the full audit ledger (#19 transversal + #25 system audit) is **CLOSED across PRs #20–#29 — RESOLVED**; nothing precedes the run but choosing the brand. Only the deliberate F55 (bold-density) + the OI-J horizon remain open. See `RESIDENT.md` OI-I (RESOLVED).

## Next actions

1. (Done) Phase 1 ratified — the architecture spec (anti-determinism rectoral · 4-field provenance spine · adaptive dimension map · two-surface output · scoper/builder v3 deltas) and the 6-section keystone `.md` schema, distilled into `RESIDENT.md ## v3` Decisions.
2. (Done, #12) Phase 2 — the v3 Chat↔Code handoff contract committed to `handoff-format.md`; later hardened to the single sufficient interface in the Theme-1 remediation (#20).
3. (Done, #13–#17) Phases 3–4 — scoper v3 (#13) and builder v3 (capture/spine #14, harmonization #15, reproduction+tokens #16, keystone+fidelity-gate #17) shipped.
4. (Done, #20–#29) Full remediation of both audits (#19 + #25) — repo carries zero BLOCKER/MAJOR/MINOR/NIT except the deliberate F55 + the OI-J horizon.
5. (Done, #26–#29) Theme 7 + the #25 system-audit findings + the coverage-gap pass — all cleared; the audit ledger is CLOSED.
6. Phase 5 (the only remaining work): choose the second, differently-shaped brand; run the end-to-end validation build; live guardrail red-team (persona + injection); visual-diff audit of reproductions; confirm no single-brand hardcoding survived; then release + final migration of durable residue into `RESIDENT.md`.

## Resume

Read `RESIDENT.md` first — its front matter, TL;DR, and domain map, then the v3 domain — then this plan's state block, Current state, Open questions, and Next actions. Phases 1–4 + the FULL audit remediation (#20–#29) are SHIPPED and the entire ledger is CLOSED (zero BLOCKER/MAJOR/MINOR/NIT except the deliberate F55 + the OI-J horizon); do not restart shipped phases or re-open cleared findings. Pick up at Next action 6 (the Phase-5 run): choose the 2nd differently-shaped brand and run validation. Confirm the next action with Carlos, then continue.
