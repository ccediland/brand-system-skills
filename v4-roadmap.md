---
title: brand-system-skills — v4 Ship Roadmap (consolidated)
status: in-progress
current_phase: Phase 3 (staged change execution) — Stage B-1 shipped, unmerged
last_updated: 2026-06-23
home_base: chat (claude.ai)
next_action: run the repo-cleanup hand-off (decontaminate PR #31, land this doc + remove v3 docs, delete stale branches); Chat re-verifies the decontaminated PR #31 diff, then Carlos ratifies the squash-merge; then pick the next stage (A or B-2)
repo: ccediland/brand-system-skills (public Claude Code plugin)
main_head: 658ab59
plugin_version: 0.3.0
resident: RESIDENT.md at repo root — final reconciliation at Phase 4.1; durable per-stage changes migrate at relevant stage closes
applies_to: brand-canon-scoper (Chat) + brand-canon-builder (Code), v4
---

# brand-system-skills — v4 Ship Roadmap (consolidated)

> The single operating document for shipping v4 of both skills. v4 turns the anti-determinism rector from prose into executable gates that fail on violation. This file is the memory tool: a fresh session reads it first — purpose and northstars, what is already done, what is left — then confirms the next action and continues. It does not restart and does not relitigate settled decisions.

## TL;DR

- v4 thesis: both skills declare a discipline in prose but never instantiate it as a gate. v4 makes the gates real — separate surfaces as distinct artifacts, values measured and byte-reconciled, completeness enforced — across both skills.
- Position: Phases 0–2 are done (problem ledger frozen, findings verified against `main`, research pinned). Stage B-1 is shipped but unmerged (PR #31). Remaining work: Stages A, B-2, C, D, E, F, G, then finalize and ship.
- The change set is 23 mechanisms in 7 families, mapped to Phase-3 stages. Each is a concrete add/change/remove on a named file.
- Two invariants that override convenience, repeated because downstream summaries drop caveats: (1) every gate is brand-agnostic — it tests the shape of a rule, never specific brand content; a monogram-only / single-ink / sonic-primary brand must pass clean. (2) A gate that fails correctly-built repos is worse than no gate — every gate stage runs an exploit-repo adversarial review before merge.
- RESIDENT.md is touched at relevant stage closes (durable architecture only) and reconciled once at Phase 4.1 — not on every step.

## When to use this document

A session working toward v4 reads this first, whether it arrives from a hand-off prompt or fresh. Order of reading: front-matter state block, then TL;DR, then Purpose and northstars, then What is already done, then Work stages, then Next actions. Confirm the next action with Carlos before doing work. For any repo work, fetch `CLAUDE.md` and `RESIDENT.md` from `main` first. Never approve a merge without an independent Composio verification of the PR.

## How the work runs

The operating model has held across this whole effort and does not change in v4.

- Split. Chat (this surface) analyzes, designs, decides, and verifies. Claude Code commits, opens PRs, and merges. Carlos pastes hand-off blocks into Code and returns the reports. Chat verifies each PR independently via Composio before any merge — Code's report alone is never trusted.
- Ratification gates (Carlos's standing rule). Two things require his sign-off: a change to a skill's rector or scope, and the merge to `main`. Everything else inside scope is pre-approved. Tightening the rector is pre-approved; relaxing it is declined by default.
- Inner cycle per stage. n.1 Chat design and decisions → n.2 one self-contained hand-off block → n.3 Code executes and reports → n.4 Chat verifies via Composio, then the merge is ratified.
- Standing practice (adopted at B-1). Every gate stage runs an exploit-repo adversarial review (fresh hostile repos, multiple reviewers) before the PR is approved, and proves the gate fails on a seeded violation and passes on a clean fixture.
- Doc sync. Durable repo-level knowledge (commands, tooling, conventions) migrates to `CLAUDE.md`; durable project-level architecture (how the systems work and why) migrates to `RESIDENT.md`; both happen at the close of relevant stages, not every step. The roadmap log is appended at each stage close. `RESIDENT.md` gets one final reconciliation pass at Phase 4.1 to catch the v3-audit closure and validation-run staleness.

## Purpose and northstars (v4)

| Skill | Declares | Never instantiates | Keystone fix |
|---|---|---|---|
| Scoper (Chat) | two surfaces: internal-rigor vs client | separating them into distinct artifacts; ships one undifferentiated stream | two-surface instantiation |
| Builder (Code) | fidelity / values | measuring or reconciling them; evidence is prose-true, not machine-true | cross-artifact reconciliation + measurement gate |

v4 in one line: turn the rector from prose into executable gates — surfaces that are separate artifacts, values that are measured and byte-reconciled, completeness that is enforced — across both skills. A third axis unites them: the surface the client reviews must be human-legible and complete, not a technical artifact. For the scoper that is a human-readable approval brief, not a machine block; for the builder a complete interactive brandbook, not a thin demo plus a repo of `.md`.

Invariants that constrain every stage:

- Anti-determinism rector. Every output is a general capability class; a specific brand is illustration, never the object. Gates test the form of a rule (is a conditional present, is a pair present, is a token materialized), never named brand content.
- Gates, not prose. A rule that exists only as English in a `.md` and not as a check that exits non-zero does not satisfy v4. The whole effort is converting prose discipline into failing gates.
- Preserve the engine. v4 gives the existing engine teeth; it does not replace it. See Preserve — do not break.

## What is already done

### The change set (23 mechanisms, 7 families)

Each mechanism is a concrete change on the builder or scoper. `Sk`: S scoper, B builder, S+B both. `Stage`: where it lands in Phase 3.

| ID | Sk | Stage | What changes |
|---|---|---|---|
| TS-1 | S | A | Stage 6 emits the internal-rigor surface and the client surface as two distinct artifacts; tool failures, provenance plumbing, and cost/credit reasoning are confined to the operator surface. |
| TS-2 | B | A | A deny-list lint rejects operator vocabulary (`GAP-\d+`, build-grade, provenance grades, "OFL match", "redrawn/harvested/Wayback", "Stage-N", "unratified") in the README, prototype text and HTML comments, keystone deploy sections, and the kit; the build worksheet lives in `RESIDENT.md` only; the keystone is split so the GUARDRAIL layer is genuinely last in deployed instructions. |
| MT-1 | B | B-2 | Every measurable projection value is byte-equal to the spine (projections become generated, not hand-authored); every `@import`/asset ref resolves; every protected-mark geometry is a single-sourced reference (`<use>`/import), never re-typed. This is the builder keystone. |
| MT-2 | B | B-2 | Zero-tolerance carriers (the primary-identity carrier and primary color tokens) and reproduced treatments get a registered same-DPI 8-bit diff with a pre-declared metric and threshold plus per-attribute glyph checks (stem:serif, overhang); tolerance tiers may not waive measurement. Replaces the eyeball/perceptual verdict. |
| MT-3 | B | B-1 (done) | Before harvest, read the snapshot body for identity tokens and disambiguate the CDX occupant; reconcile capture-date vs page "Last Published"; hash every `sources/` file into CHECKSUMS; add a per-token `sourceRef` (file›selector›line); no token at `corroborated`/`computed-css` without a hashed, identity-verified source. |
| MT-4 | B | B-1 (done) | `corroborated` requires ≥2 distinct source artifacts; `inferred`/`matched` are capped at `hypothesis`. |
| MT-5 | B | B-1 (done) | Every value or scheme named in a canon layer or an ALGO maps to a token artifact or a GAP; every `hypothesis`/`inferred`/`matched`/`traced` token maps to exactly one open GAP. |
| SC-1 | B | C | N canon schemes become N materialized token sets via a runnable `ALGO-SCHEME-DERIVE` (or an unbuilt scheme carries `$extensions.brand.status:"deferred"` plus a logged GAP); the validator fails when a named scheme has no token artifact; Stage 8 renders a live scheme toggle when more than one scheme exists. Adds a graphic-code contrast spec: PRIMITIVES fixes each device's target opacity/contrast-vs-ground and `ALGO-CONTRAST-ROLE` gains a graphic-code row. |
| RV-1 | S | D | Split gate 7 into 7a, a human-readable Final Brand Brief that is the BLOCKING client approval, then 7b, the machine handoff produced only after sign-off. |
| RV-2 | S | D | Gate 3.5, a Discovery and Intake Instrument: one fillable doc, every line tagged CONFIRM / ASK / REQUEST; emission is default, not optional; chat resolves it, never replaces it. |
| RV-3 | S | D | Deliverable-per-gate: a mandatory DELIVERABLE column; each gate emits a named, dated, versioned artifact plus a `stage N of M` marker; no gate clears without it. |
| RV-4 | S | D | Consultation-surface invariant: gate 5 is unconditional; a stated sole-decider does not waive external-review framing; add `consultation-surface: always-required` as a permanent dimension. |
| RV-5 | B | D | Stage-8 redefinition: the prototype becomes the complete interactive brandbook — a 1:1 section manifest from canon plus keystone (lexicon, Misuse, schemes, THINK rules) plus a "Decisions for you" ratification panel — with a completeness gate, a design bar (hero focal anchor, responsive `@media`, colour-as-system), and the TS-2 firewall. |
| EH-1 | S | E | Personality, differential, resonance, and any owner-meaning field must be elicited or marked GAP — never scoper-derived, never above `hypothesis` without ratification. |
| EH-2 | S | E | The scoper searches for named legal/regulatory instruments (or carries them as an explicit GAP for the builder) — never asserts them from memory. |
| EH-3 | B | E | A regulated/BLOCKING posture forces the enabling regulatory GAP to inherit MUST/BLOCKING; figure-shape refusals are bound to the live source-of-truth, never a hardcoded illustrative figure; the red-team battery covers the visual guardrail and over-refusal controls. |
| TA-1 | S | F | TEMPO doctrine: a multi-session, multi-day model; no single-session compression even with perfect material; certainty gates always run. Guard: pad evidence-of-process (gated deliverables), not wall-clock. |
| TA-2 | S | F | Register firewall: the client surface inherits no operator preference toward terseness/speed/assumption; operator directness governs the internal surface only. Hard to author — the skill must explicitly firewall its client register from the user-profile preferences that bleed pervasively. |
| TA-3 | S | F | Assumption ledger: every proceed-assumption surfaces as an explicit CONFIRM line; nothing inferred silently. |
| TA-4 | S | F | Verify-the-exact-claim guard: a blocked or failed retrieval may never be recorded as a positive status; liveness/`verified` requires a successful read, not an adjacent signal. |
| SH-1 | S | G | Externalize the interview bank and detection batteries into `references/` (e.g. `elicitation-bank.md`, `detection-batteries.md`); drops SKILL.md off the 500-line ceiling and lightens the always-on load. |
| SH-2 | S | G | The CONSUMERS track gains an `ingest` value for live-but-raster surfaces (allow `ocr-visual` there, or add a `media-type:` axis orthogonal to reachability). |
| SH-3 | S | G | A non-trigger clause distinguishing the canon-pipeline scoper from `brand-voice` guideline generation. No external research; resolved in-Chat. |

### Verified baseline and golden-set

- All findings hold on `main@658ab59` (plugin `0.3.0`). Nothing was found already fixed or void. The one correction worth carrying: schemes-are-tokens is unbuilt — `ALGO-SCHEME-DERIVE` is a stub, no validator fails a scheme without a token artifact, and the real build shipped 2 of 3 schemes as prose. SC-1 is a real mechanism, not a no-op.
- Golden-set fixture `ccediland/heresto-brand` is intact (4/4 checks): branch `claude/brand-canon` @ `78f1cd9`, `main` @ `ba63d72` with PR #1 open and unmerged; the planted-hostile inputs are present (the 42-byte invalid `.ai`, the absent `.eps`, the empty `studio-onepagers/`); the harvested HTML + CSS live in `sources/wayback/` on the build branch (not on `main`, which is why `main`'s `CHECKSUMS.txt` could not hash it — the gap MT-3 closes).

### Research-pinned constraints

These are the load-bearing tooling and spec decisions; the stages that consume them are noted. Versions are pinned as of 2026-06.

- DTCG spec. Format and Color modules are stable (2025.10). The Resolver Module is a flagged preview draft — implement it as a controlled convention, not as an authoritative standard. (Consumed by SC-1.)
- Style Dictionary v5.4.4 is the engine; structured color since v5.3.0 ships `color/oklch` and the other space transforms. SD does not yet consume `.resolver.json` (issue #1590 open) — resolver expansion is handled by a resolver-aware engine (Dispersa) or a small preprocessor that emits per-scheme token files at build time. (SC-1.)
- Color format. Adopt the structured OKLCH `$value` object `{colorSpace, components, alpha, hex}` with a `hex` sRGB fallback; the stable spec makes the structured object the canonical value. This migration lands in Stage C, not earlier. (SC-1; touches the token spine.)
- Decorative contrast. No standard governs a decorative graphic device. Use a brand-fixed opacity/contrast band as the primary rule, escalate to WCAG 3:1 (SC 1.4.11) when the device carries meaning/state; APCA Lc 15 is an internal perceptual reference only; WCAG 2.x AA remains the legal bar (no APCA substitution). (SC-1.)
- Fidelity measurement. ΔE2000 ≤ 2.0 as the color gate (≤ 1.0 on the mark's core color), pixelmatch/SSIM for structure, on ORB+RANSAC co-registered same-DPI 8-bit images; fontTools for glyph metrics. Tooling is Python (OpenCV, scikit-image, fontTools). (MT-2.)
- Cross-artifact reconciliation. Generate satellites from the spine via SD custom formats; a drift linter fails on any re-typed spine value or duplicated mark geometry; protected mark geometry single-sourced via SVG `<use>`; runs in the offline `validate` plus a GitHub Action. (MT-1.)
- Source recovery. Wayback CDX plus the `id_` raw-capture modifier, occupant disambiguation, a SHA-256 manifest with per-token `sourceRef`. (MT-3, shipped.)
- Two-surface lint. A rehype/parse5 AST deny-list over both text and comment nodes, run in the `client-clean` scrub. (TS-2.)

### Shipped: Stage B-1 (MT-3, MT-4, MT-5)

PR #31, branch `v4/stage-b1-provenance-gates`, head `8c25446` — open against `main`, not merged, stopped before merge for Composio verification.

- New gate `tools/audit-lint.mjs` (Node, zero-dep) — exits 1 on violation, report to `audit/lint/report.md`. Rules: R0 provenance present plus closed enums (no token evades the conditional rules by dropping its provenance block; aliases exempt); R1 `corroborated` ⇒ ≥2 distinct source files; R2 `inferred`/`matched` capped at `hypothesis`; R3 `computed-css`/`corroborated`/`owner-confirmed` ⇒ a `sourceRef.sha256` in CHECKSUMS path-bound to its own file; R4 every named value/scheme ⇒ a token or an open GAP; R5 every uncertain token ⇒ exactly one open GAP via `$extensions.brand.gap`.
- New helper `tools/source-recover.py` (Python) — Wayback CDX, raw `id_` fetch, occupant disambiguation, surfaces title/copyright/Last-Published, SHA-256 to `sources/MANIFEST.json`. Identity verification stays an agent step.
- Proof: CLEAN fixture exits 0 (R0–R5 pass), SEEDED fixture exits 1 (one dedicated trip per rule). 29 files changed; spec wired into `gap-protocol.md`, `token-spine.md`, `asset-acquisition.md`, `reproduction-router.md`, `coverage-checklist.md`, `validate-audit.md`, `SKILL.md`, `tokens/base.json`. `CLAUDE.md` updated; `RESIDENT.md` untouched.
- Two hardenings added by the adversarial review (kept as standing practice): R0 was added beyond the literal R1–R5 (closes the "delete the provenance block to evade everything" bypass); R3 was strengthened to path-bound (hash-membership alone let a token borrow any listed hash). A false-positive that would have failed correctly-built repos was caught and fixed (30/30 reviewer expectations match).
- Chat-verified independently (2026-06-23): the gate was run on both fixtures — CLEAN exits 0 with R0–R5 all PASS, SEEDED exits 1 with all six rules firing one precise message each; `RESIDENT.md` is byte-identical to `main`; no brand-specific value appears in the gate or the wired specs. The code is sound and mergeable.
- Decontamination required before merge: the branch was cut from `v4/roadmap`, so PR #31's tree carries the old roadmap doc among its 29 files. Before merge, remove the roadmap doc from the branch tip so the squash diff is the 28 code files only; Chat re-verifies that decontaminated diff, then the squash-merge is ratified. The roadmap doc lands separately as `v4-roadmap.md` (see Finalize).

## Preserve — do not break

v4 adds gates without regressing the working engine. A fresh session must not let a change below break any of these.

- Scoper engine: the scoper/builder frontier (no primitive sampled in chat); the anti-determinism rector; the salvage-vs-extraction insight (a dead brand inverts the fidelity strategy — archived CSS beats eyedropping a raster); anti-fabrication on treatments; WHY elicited and ratified (onliness → spine, never-words → anti-promise); DIMENSION MAP completeness; hard claim-discipline and scope boundary; primary-identity-carrier resolution.
- Builder engine: refusing an invalid vector master; naming an absent source rather than faking it; demoting a commercial font to a flagged match instead of smuggling it in; flooring every builder-introduced atom at `hypothesis`; declining to fabricate a bespoke mark; earning multi-source `corroborated` honestly; OKLCH exact with full alias closure; declaring FLAT with reason; deferring the live red-team behind a committed contract. The instinct — commit evidence, tag confidence, never invent — is the architecture worth keeping.

## Work stages to v4

### Stage map (dependency order)

Order follows the dependency graph (keystones first; the prototype-completeness stage needs schemes-as-tokens for its toggle). This is the document's order; do not re-decide it unilaterally. Where roots are free (A, B remaining, G), the pick among them is Carlos's call.

| Stage | Theme | Mechanisms | Sk | Depends on | Status | Docs on close |
|---|---|---|---|---|---|---|
| A | Two-surface | TS-1, TS-2 | S+B | — | pending | CLAUDE + log |
| B | Machine-true evidence (builder keystone) | MT-1…MT-5 | B | — | B-1 shipped (unmerged); B-2 pending | RESIDENT + CLAUDE + log |
| C | Schemes are tokens | SC-1 | B | B | pending | RESIDENT + CLAUDE + log |
| D | Human-legible complete review surface | RV-1…RV-5 | S+B | A, C | pending | RESIDENT + CLAUDE + log |
| E | Epistemic honesty enforcement | EH-1, EH-2, EH-3 | S+B | B | pending | CLAUDE + log |
| F | Process tempo + assumption discipline | TA-1…TA-4 | S | A, D | pending | log |
| G | Structural hygiene | SH-1, SH-2, SH-3 | S | — | pending | CLAUDE + log |

Anchor discipline: at each stage's n.1, re-pin every target against then-current `main` by section name or rule ID. The skill files are rewritten repeatedly downstream, so line numbers drift — names are the contract.

Ratification-gated mechanisms (flag at the owning stage's n.1, do not auto-proceed): RV-1 (handoff schema, the 7a/7b split), RV-4 (new permanent dimension), SH-2 (CONSUMERS contract), SH-3 (trigger/scope). Plus every merge to `main`.

### Stage A — Two-surface (TS-1, TS-2)

- Change (scoper, TS-1): rework Stage 6 so it emits two distinct artifacts — the operator surface (tool failures, provenance, cost/credit) and the client surface — instead of one undifferentiated stream. Target `scoper/SKILL.md` Stage 6.
- Change (builder, TS-2): add the deny-list lint over the client surfaces and split the keystone so GUARDRAIL is last. Targets `keystone-emit.md`, `keystone.md`, `prototype.html`, and the `client-clean.md` scrub seam (the scrub does not currently name the keystone — that is where the lint wires in).
- Consumes: the rehype/parse5 AST deny-list over text and comments.
- Gate proof: the lint exits 1 on a surface containing any deny-listed term (text or comment) and 0 on a clean surface; run the exploit-repo review.

### Stage B — Machine-true evidence (MT-1…MT-5)

- B-1 (MT-3/4/5): shipped — see What is already done. Remaining for B-1: Composio verification (n.4), then the ratified merge.
- B-2 (MT-1): generate measurable projections from the spine (SD custom format) so values cannot drift; single-source the protected mark geometry via `<use>`/import; extend `audit-lint.mjs` with a drift rule that fails on any downstream value not equal to the spine-resolved value or any duplicated mark geometry. Targets `validate-audit.md`, `satellites/projections.md`, the mark assets.
- B-2 (MT-2): replace the §7a perceptual verdict with a measured one — a registered same-DPI 8-bit diff (ΔE2000 ≤ 2.0; ≤ 1.0 on the mark's core color; SSIM/pixel for structure) on ORB+RANSAC co-registered images, plus fontTools glyph metrics; applies to the zero-tolerance carriers and treatments. New tool `tools/fidelity-diff.py` (Python). Targets `validate-audit.md` §2 and §7a, `reproduction-router.md` Validation.
- Scope boundary: §3a "no pixel-VRT for component renders" stays — MT-2 measures the mark, primary colors, and treatments, not component renders.
- Consumes: ΔE2000 / ORB+RANSAC / fontTools (MT-2); SD custom formats and SVG `<use>` (MT-1).

### Stage C — Schemes are tokens (SC-1)

- Change: make `ALGO-SCHEME-DERIVE` runnable so N named schemes become N materialized token sets (or an unbuilt scheme carries `$extensions.brand.status:"deferred"` plus a logged GAP); add a validator that fails a named scheme with no token artifact; render a live scheme toggle in Stage 8 when more than one scheme exists; add the graphic-code contrast spec (`ALGO-CONTRAST-ROLE` graphic-code row). Targets `03-grammar.md` (`ALGO-SCHEME-DERIVE`, `ALGO-CONTRAST-ROLE`), `token-spine.md`, `validate-audit.md` (new validator), `prototype.html` (toggle), the token templates.
- Color-format migration lands here: structured OKLCH `$value` objects via SD `color/oklch`, with a `hex` sRGB fallback. This is the one place the `$value` format changes; earlier stages keep it untouched.
- Consumes: DTCG 2025.10 Resolver (draft, wraps base/semantic/component; build-time N-file materialization via Dispersa or a preprocessor); structured OKLCH; the brand-fixed decorative contrast band with WCAG 3:1 escalation.

### Stage D — Human-legible complete review surface (RV-1…RV-5)

- Change (scoper): split gate 7 into 7a Final Brand Brief (BLOCKING approval) and 7b machine handoff (RV-1); add gate 3.5, the fillable CONFIRM/ASK/REQUEST instrument (RV-2); add the DELIVERABLE column and `stage N of M` markers (RV-3); make gate 5 unconditional and add `consultation-surface: always-required` (RV-4). Targets `scoper/SKILL.md` (Stage 7, new gate 3.5, the gated pipeline, Stage 5) and `handoff-format.md`.
- Change (builder): redefine Stage 8 so the prototype is the complete interactive brandbook with a 1:1 section manifest, a "Decisions for you" panel, a completeness gate, a design bar, and the TS-2 firewall (RV-5). Targets `builder/SKILL.md` Stage 8, `prototype.html`, `validate-audit.md`, `coverage-checklist.md`.
- Reconciliation (mandatory): RV-2's intake instrument, RV-1's 7a brief, and the existing Stage-6 external instrument must collapse into one client-surface flow, not three parallel instruments.
- Consumes: the tagged-Markdown brief and the 5-part brandbook manifest.
- Ratify: RV-1 (handoff schema), RV-4 (new permanent dimension).

### Stage E — Epistemic honesty enforcement (EH-1, EH-2, EH-3)

- Change (scoper): personality/differential/resonance and any owner-meaning field are elicited-or-GAP, never derived (EH-1, `scoper/SKILL.md` Stage 4); named legal/regulatory instruments are searched-or-GAP, never from memory (EH-2, `scoper/SKILL.md` Stage 2).
- Change (builder): posture→GAP severity inheritance and figure-shape refusals bound to the live source-of-truth; the battery covers the visual guardrail and over-refusal controls (EH-3, `validate-audit.md` §7b, `keystone-emit.md` guardrail).

### Stage F — Process tempo + assumption discipline (TA-1…TA-4)

- Change (scoper, all): the TEMPO doctrine, multi-session with certainty gates that always run, padding evidence-of-process not wall-clock (TA-1); the register firewall keeping operator terseness/speed/assumption out of the client surface (TA-2 — hard to author, must firewall against the user-profile preferences that bleed); the assumption ledger surfacing every proceed-assumption as a CONFIRM line (TA-3); the verify-the-exact-claim guard so a blocked retrieval is never a positive status (TA-4). Targets `scoper/SKILL.md` (gated pipeline, Stage 2, client-surface authoring, proceed-points).

### Stage G — Structural hygiene (SH-1, SH-2, SH-3)

- Change (scoper): externalize the interview bank and detection batteries to `references/` (SH-1, drops SKILL.md off the 500 ceiling); add the CONSUMERS `ingest` value for live-but-raster surfaces (SH-2); add the sibling non-trigger clause vs `brand-voice` (SH-3, in-Chat, no research). Targets `scoper/SKILL.md` (Stage 4 bank, description) and `handoff-format.md` (CONSUMERS).
- Optional sequencing: SH-1 is dependency-free and a pure move, so pulling it forward lets D/E/F edit the slimmed file. Low value, zero risk; Carlos's call.
- Ratify: SH-2 (CONSUMERS contract), SH-3 (trigger/scope).

## Finalize and ship (Phase 4)

- 4.1 RESIDENT reconciliation. A single pass that backfills what per-stage migrations did not cover: the v3-audit closure, this validation run (the Heresto golden-set and both phases' findings), and any durable Phase-3 outcome not already migrated. Locked inputs from Phase 1: bump `last_updated` 2026-06-22 → 2026-06-23; complete the builder repo-map (add `keystone-emit.md` and `reproduction-router.md`); drop the now-removed v3 root docs (`v3-execution-plan.md`, `v3-research-foundation.md`, `v3-system-audit—2026-06-23.md`) from the repo-map and point the roadmap entry at `v4-roadmap.md`; add a v4 section that names Heresto and the golden-set (currently invisible in RESIDENT); reflect the reopened-then-reclosed audit ledger.
- 4.2 Release criterion plus golden-set freeze. The v4 bar: every mechanism is instantiated as a gate that fails on violation, and both skills are re-validated. Freeze `heresto-brand` at the known commit as the regression golden-set and record the expected gate verdicts.
- 4.3 Ship. Human-ratified merge to `main` plus a marketplace version bump from `0.3.0`.

## Current state

Phase 3 is in progress. Stage B-1 is shipped and Chat-verified (the gate passes clean and fails on a seeded violation; RESIDENT untouched; no brand leak), sitting in PR #31 against `main`, unmerged. A repo cleanup is the immediate work: decontaminate PR #31 (the roadmap doc must come off its branch), land this file as `v4-roadmap.md` at `main` root, remove the superseded v3 root docs, and delete the stale branches (`v4/roadmap`, `v3/audit`, `claude/v3-plan`) and close PR #19. `main` is at `658ab59`, plugin `0.3.0`. No other stage has started. The change set, targets, and research constraints are locked above; nothing downstream needs re-deriving.

## Decisions made

- Schemes-are-tokens is unbuilt (the b3 correction). Reading the spec's intent as if already satisfied would have retired SC-1; it is a real mechanism. Source of truth is the materialized artifact, not the prose intent.
- Tooling split by native ecosystem. Image diff, co-registration, and glyph metrics are Python (OpenCV, scikit-image, fontTools); token generation and JSON/GAP cross-reference linting are Node (the kit's ecosystem). Build-time gates ship into the client repo so it is self-validating (regression-ready); the runtime component kit stays Node-only.
- The structured-OKLCH migration is scoped to Stage C, not spread earlier — the resolver, structured color, and scheme materialization are one coherent token-format change.
- Exploit-repo adversarial review per gate stage is standing practice — a gate that fails correctly-built repos is worse than no gate.
- RESIDENT-touch rule revised. The v3-era plan deferred all RESIDENT edits to a single end pass; v4 migrates durable architecture at relevant stage closes and reconciles once at 4.1. Per ai-roadmap, durable knowledge finds its home immediately, not when the plan dies.

## Dead-ends

- The withdrawn #8 (phantom source). `heresto.co.nz` was alleged to be an unrelated charity; verification (Wayback CDX plus the committed archive) proved it was the real Heresto Vodka site in 2022–2023, later re-registered. Do not re-raise it. The surviving lesson is structural and already captured as MT-3 (an archived source needs date and identity verification).
- Re-deciding stage order unilaterally. Stage B-1 was run before Stage A and split into B-1/B-2 without roadmap authority. The split is now a shipped fact, but the lesson stands: follow the document's dependency order; the choice among free roots is Carlos's, not a unilateral Chat decision.
- The rigid "RESIDENT only at 4.1" rule. Replaced by per-relevant-stage migration plus a 4.1 reconciliation (see Decisions made).

## Open questions and blockers

- After PR #31 merges, the next stage is a free choice between A (two-surface) and B-2 (reconciliation and measurement). Carlos picks.
- PR #31 was branched from `v4/roadmap`, so its squash lands a roadmap-doc commit with the B-1 code. Confirm this is intended at merge, or rebase onto `main` first.
- The ratification-gated mechanisms (RV-1, RV-4, SH-2, SH-3) need Carlos's sign-off when their stages reach n.1.

## Next actions

1. Run the repo-cleanup hand-off in Code: decontaminate PR #31 (remove the roadmap doc from its branch so the squash diff is 28 code files), reconfirm the gate, and STOP before the merge; commit `v4-roadmap.md` to `main` root and `git rm` the three v3 root docs; close PR #19; delete branches `v4/roadmap`, `v3/audit`, `claude/v3-plan`.
2. Chat re-verifies the decontaminated PR #31 diff via Composio (28 code files, no roadmap doc).
3. Carlos ratifies the PR #31 squash-merge (`--squash --delete-branch` — this also removes `v4/stage-b1-provenance-gates`).
4. Pick the next stage — A or B-2 — Carlos's call.
5. Run that stage's inner cycle: n.1 Chat design and decisions → n.2 hand-off → n.3 Code → n.4 Composio verify.

## Session log

- 2026-06-23 — Roadmap opened; Phase 0 frozen (both phases' findings consolidated into the change set; thesis locked).
- 2026-06-23 — Phase 1 done: all findings confirmed against `main@658ab59`; golden-set `heresto-brand` intact (4/4); RESIDENT staleness enumerated.
- 2026-06-23 — Phase 2 done: tooling and spec decisions pinned (DTCG 2025.10 stable with draft resolver; SD v5.4.4 with structured OKLCH; ΔE2000 + ORB+RANSAC + fontTools; rehype/parse5; WCAG 2.x legal bar with a brand-fixed decorative band).
- 2026-06-23 — Stage B-1 shipped (PR #31, unmerged): `audit-lint.mjs` (R0–R5) plus `source-recover.py` plus spec wiring across 8 files; adversarial review added R0, path-bound R3, and fixed a good-repo false-positive (30/30). Pending: Composio verification plus merge ratification.
- 2026-06-23 — Roadmap consolidated from scratch into this file (`v4-roadmap.md`, the operating document going forward, at `main` root); stage order restored to the dependency graph; RESIDENT-touch rule revised to per-relevant-stage plus a 4.1 reconciliation.
- 2026-06-23 — B-1 code Chat-verified by running the gate on both fixtures (clean exit 0 / seeded exit 1, all rules firing; RESIDENT untouched; no brand leak). Branch/PR topology verified via Composio: the roadmap doc had diverged across `v4/roadmap` (6 commits, no PR) and PR #31 (carries it among 29 files). Cleanup planned: decontaminate PR #31 to code-only, land `v4-roadmap.md` on `main`, remove the v3 root docs, delete stale branches, close PR #19.

## Resume

Read this document in order (front matter, TL;DR, Purpose, What is already done, Work stages, Next actions). Confirm the next action with Carlos before working. For any repo work, fetch `CLAUDE.md` and `RESIDENT.md` from `main` first. Run each stage through the inner cycle and verify every PR via Composio before its merge is ratified. Do not restart the plan and do not relitigate the decisions above; append to the Session log and fill stage blocks in place.

## Limitations

- This document does NOT carry the diagnostic process — the pre-research, the research rounds, the finding-by-finding reconciliation. Those are folded to their results and concrete changes. The frozen detail is not carried forward; if ever needed it remains in the repo's closed-PR history and the deleted branches' commits.
- This document does NOT contain the per-stage hand-off blocks; each is produced at that stage's n.2 and pasted into Code by Carlos.
- This document does NOT cover the live red-team RUN or a second-brand validation beyond Heresto — those are Phase-5 / post-v4.
- Where it needs a human: the ratification gates (rector/scope changes, the four flagged mechanisms, every merge), the choice among free root stages, and any PR merge.
