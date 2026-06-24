---
title: brand-system-skills — v4 Ship Roadmap (consolidated)
status: in-progress
current_phase: Phase 3 — Stages A, B, C, D CLOSED; G SH-1 done; remaining: E, SH-2/SH-3, F, finalize
last_updated: 2026-06-24
home_base: chat (claude.ai)
next_action: Stage D closed (RV-1…RV-5); pick a free root — E (epistemic honesty), SH-2/SH-3 (close G), or F (now unblocked)
repo: ccediland/brand-system-skills (public Claude Code plugin)
main_head: a3ac99e68176032b23b420a23fc32f6d4dc5a9fe (Stages A/B/C/D CLOSED — D-1a #41, D-1b #42, D-2a #44, D-2b #45; G SH-1 #40; free roots E / SH-2-3 / F)
plugin_version: 0.3.0
resident: RESIDENT.md at repo root — final reconciliation at Phase 4.1; durable per-stage changes migrate at relevant stage closes
applies_to: brand-canon-scoper (Chat) + brand-canon-builder (Code), v4
---

# brand-system-skills — v4 Ship Roadmap (consolidated)

> The single operating document for shipping v4 of both skills. v4 turns the anti-determinism rector from prose into executable gates that fail on violation. This file is the memory tool: a fresh session reads it first — purpose and northstars, what is already done, what is left — then confirms the next action and continues. It does not restart and does not relitigate settled decisions.

## TL;DR

- v4 thesis: both skills declare a discipline in prose but never instantiate it as a gate. v4 makes the gates real — separate surfaces as distinct artifacts, values measured and byte-reconciled, completeness enforced — across both skills.
- Position: Phases 0–2 are done (problem ledger frozen, findings verified against `main`, research pinned). **Stages A, B, C, and D are CLOSED** on `main` (HEAD `a3ac99e`): Stage A (TS-1 operator/client confinement + TS-2 client-surface deny-list), Stage B (MT-1…MT-5 — audit-lint R0–R6 + the measured fidelity gate), Stage C (SC-1 — schemes-as-tokens + structured-OKLCH + audit-lint R7 + the live scheme toggle + decorative-contrast spec), and Stage D (RV-1…RV-5 — the client-surface flow + pipeline discipline + the prototype-as-brandbook + audit-lint R8 completeness gate). Stage G's SH-1 is done (#40); the remaining free roots are **E** (epistemic honesty), **SH-2/SH-3** (rest of G), and **F** (process tempo — now unblocked, needed A+D), then finalize.
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
| TS-1 | S | A (done) | Stage 6 emits the internal-rigor surface and the client surface as two distinct artifacts; tool failures, provenance plumbing, and cost/credit reasoning are confined to the operator surface. |
| TS-2 | B | A (done) | A deny-list lint rejects operator vocabulary (`GAP-\d+`, build-grade, provenance grades, "OFL match", "redrawn/harvested/Wayback", "Stage-N", "unratified") in the README, prototype text and HTML comments, keystone deploy sections, and the kit; the build worksheet lives in `RESIDENT.md` only; the keystone is split so the GUARDRAIL layer is genuinely last in deployed instructions. |
| MT-1 | B | B-2 (done) | Every measurable projection value is byte-equal to the spine (projections become generated, not hand-authored); every `@import`/asset ref resolves; every protected-mark geometry is a single-sourced reference (`<use>`/import), never re-typed. This is the builder keystone. |
| MT-2 | B | B-2 (done) | Zero-tolerance carriers (the primary-identity carrier and primary color tokens) and reproduced treatments get a registered same-DPI 8-bit diff with a pre-declared metric and threshold plus per-attribute glyph checks (stem:serif, overhang); tolerance tiers may not waive measurement. Replaces the eyeball/perceptual verdict. |
| MT-3 | B | B-1 (done) | Before harvest, read the snapshot body for identity tokens and disambiguate the CDX occupant; reconcile capture-date vs page "Last Published"; hash every `sources/` file into CHECKSUMS; add a per-token `sourceRef` (file›selector›line); no token at `corroborated`/`computed-css` without a hashed, identity-verified source. |
| MT-4 | B | B-1 (done) | `corroborated` requires ≥2 distinct source artifacts; `inferred`/`matched` are capped at `hypothesis`. |
| MT-5 | B | B-1 (done) | Every value or scheme named in a canon layer or an ALGO maps to a token artifact or a GAP; every `hypothesis`/`inferred`/`matched`/`traced` token maps to exactly one open GAP. |
| SC-1 | B | C (done) | N canon schemes become N materialized token sets via a runnable `ALGO-SCHEME-DERIVE` (or an unbuilt scheme carries `$extensions.brand.status:"deferred"` plus a logged GAP); the validator fails when a named scheme has no token artifact; Stage 8 renders a live scheme toggle when more than one scheme exists. Adds a graphic-code contrast spec: PRIMITIVES fixes each device's target opacity/contrast-vs-ground and `ALGO-CONTRAST-ROLE` gains a graphic-code row. |
| RV-1 | S | D (done) | Split gate 7 into 7a, a human-readable Final Brand Brief that is the BLOCKING client approval, then 7b, the machine handoff produced only after sign-off. |
| RV-2 | S | D (done) | Gate 3.5, a Discovery and Intake Instrument: one fillable doc, every line tagged CONFIRM / ASK / REQUEST; emission is default, not optional; chat resolves it, never replaces it. |
| RV-3 | S | D (done) | Deliverable-per-gate: a mandatory DELIVERABLE column; each gate emits a named, dated, versioned artifact plus a `stage N of M` marker; no gate clears without it. |
| RV-4 | S | D (done) | Consultation-surface invariant: gate 5 is unconditional; a stated sole-decider does not waive external-review framing; add `consultation-surface: always-required` as a permanent dimension. |
| RV-5 | B | D (done) | Stage-8 redefinition: the prototype becomes the complete interactive brandbook — a 1:1 section manifest from canon plus keystone (lexicon, Misuse, schemes, THINK rules) plus a "Decisions for you" ratification panel — with a completeness gate, a design bar (hero focal anchor, responsive `@media`, colour-as-system), and the TS-2 firewall. |
| EH-1 | S | E | Personality, differential, resonance, and any owner-meaning field must be elicited or marked GAP — never scoper-derived, never above `hypothesis` without ratification. |
| EH-2 | S | E | The scoper searches for named legal/regulatory instruments (or carries them as an explicit GAP for the builder) — never asserts them from memory. |
| EH-3 | B | E | A regulated/BLOCKING posture forces the enabling regulatory GAP to inherit MUST/BLOCKING; figure-shape refusals are bound to the live source-of-truth, never a hardcoded illustrative figure; the red-team battery covers the visual guardrail and over-refusal controls. |
| TA-1 | S | F | TEMPO doctrine: a multi-session, multi-day model; no single-session compression even with perfect material; certainty gates always run. Guard: pad evidence-of-process (gated deliverables), not wall-clock. |
| TA-2 | S | F | Register firewall: the client surface inherits no operator preference toward terseness/speed/assumption; operator directness governs the internal surface only. Hard to author — the skill must explicitly firewall its client register from the user-profile preferences that bleed pervasively. |
| TA-3 | S | F | Assumption ledger: every proceed-assumption surfaces as an explicit CONFIRM line; nothing inferred silently. |
| TA-4 | S | F | Verify-the-exact-claim guard: a blocked or failed retrieval may never be recorded as a positive status; liveness/`verified` requires a successful read, not an adjacent signal. |
| SH-1 | S | G (done) | Externalize the interview bank and detection batteries into `references/` (e.g. `elicitation-bank.md`, `detection-batteries.md`); drops SKILL.md off the 500-line ceiling and lightens the always-on load. |
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

MERGED to `main` (`ade191c`) — PR #31 squash-merged after Chat re-verified the decontaminated 28-file diff (no roadmap doc); the branch was decontaminated (the roadmap doc removed) so only code landed. `tools/audit-lint.mjs`, `tools/source-recover.py`, `tools/fixtures/`, and the wired specs are on `main`.

- New gate `tools/audit-lint.mjs` (Node, zero-dep) — exits 1 on violation, report to `audit/lint/report.md`. Rules: R0 provenance present plus closed enums (no token evades the conditional rules by dropping its provenance block; aliases exempt); R1 `corroborated` ⇒ ≥2 distinct source files; R2 `inferred`/`matched` capped at `hypothesis`; R3 `computed-css`/`corroborated`/`owner-confirmed` ⇒ a `sourceRef.sha256` in CHECKSUMS path-bound to its own file; R4 every named value/scheme ⇒ a token or an open GAP; R5 every uncertain token ⇒ exactly one open GAP via `$extensions.brand.gap`.
- New helper `tools/source-recover.py` (Python) — Wayback CDX, raw `id_` fetch, occupant disambiguation, surfaces title/copyright/Last-Published, SHA-256 to `sources/MANIFEST.json`. Identity verification stays an agent step.
- Proof: CLEAN fixture exits 0 (R0–R5 pass), SEEDED fixture exits 1 (one dedicated trip per rule). 29 files changed; spec wired into `gap-protocol.md`, `token-spine.md`, `asset-acquisition.md`, `reproduction-router.md`, `coverage-checklist.md`, `validate-audit.md`, `SKILL.md`, `tokens/base.json`. `CLAUDE.md` updated; `RESIDENT.md` untouched.
- Two hardenings added by the adversarial review (kept as standing practice): R0 was added beyond the literal R1–R5 (closes the "delete the provenance block to evade everything" bypass); R3 was strengthened to path-bound (hash-membership alone let a token borrow any listed hash). A false-positive that would have failed correctly-built repos was caught and fixed (30/30 reviewer expectations match).
- Chat-verified independently (2026-06-23): the gate was run on both fixtures — CLEAN exits 0 with R0–R5 all PASS, SEEDED exits 1 with all six rules firing one precise message each; `RESIDENT.md` is byte-identical to `main`; no brand-specific value appears in the gate or the wired specs. The code is sound and mergeable.
- Landed clean: the branch was decontaminated (the inherited roadmap doc removed) so the squash diff was 28 code files only; Chat re-verified that diff before the merge. The roadmap doc lives separately as `v4-roadmap.md` at `main` root (this file).

## Preserve — do not break

v4 adds gates without regressing the working engine. A fresh session must not let a change below break any of these.

- Scoper engine: the scoper/builder frontier (no primitive sampled in chat); the anti-determinism rector; the salvage-vs-extraction insight (a dead brand inverts the fidelity strategy — archived CSS beats eyedropping a raster); anti-fabrication on treatments; WHY elicited and ratified (onliness → spine, never-words → anti-promise); DIMENSION MAP completeness; hard claim-discipline and scope boundary; primary-identity-carrier resolution.
- Builder engine: refusing an invalid vector master; naming an absent source rather than faking it; demoting a commercial font to a flagged match instead of smuggling it in; flooring every builder-introduced atom at `hypothesis`; declining to fabricate a bespoke mark; earning multi-source `corroborated` honestly; OKLCH exact with full alias closure; declaring FLAT with reason; deferring the live red-team behind a committed contract. The instinct — commit evidence, tag confidence, never invent — is the architecture worth keeping.

## Work stages to v4

### Stage map (dependency order)

Order follows the dependency graph (keystones first; the prototype-completeness stage needs schemes-as-tokens for its toggle). This is the document's order; do not re-decide it unilaterally. Where roots are free (D, E, G), the pick among them is Carlos's call.

| Stage | Theme | Mechanisms | Sk | Depends on | Status | Docs on close |
|---|---|---|---|---|---|---|
| A | Two-surface | TS-1, TS-2 | S+B | — | **CLOSED** (A-1 #37, A-2 #38) | CLAUDE + log |
| B | Machine-true evidence (builder keystone) | MT-1…MT-5 | B | — | **CLOSED** (B-1 #31, B-2a #32, B-2b #33 — MT-1…MT-5) | RESIDENT + CLAUDE + log |
| C | Schemes are tokens | SC-1 | B | B | **CLOSED** (C-1 #34, C-2 #35, C-3 #36 — SC-1) | RESIDENT + CLAUDE + log |
| D | Human-legible complete review surface | RV-1…RV-5 | S+B | A, C | **CLOSED** (D-1a #41, D-1b #42, D-2a #44, D-2b #45 — RV-1…RV-5) | RESIDENT + CLAUDE + log |
| E | Epistemic honesty enforcement | EH-1, EH-2, EH-3 | S+B | B | pending | CLAUDE + log |
| F | Process tempo + assumption discipline | TA-1…TA-4 | S | A, D | pending | log |
| G | Structural hygiene | SH-1, SH-2, SH-3 | S | — | in progress — SH-1 #40 merged; SH-2/SH-3 pending | CLAUDE + log |

Anchor discipline: at each stage's n.1, re-pin every target against then-current `main` by section name or rule ID. The skill files are rewritten repeatedly downstream, so line numbers drift — names are the contract.

Ratification-gated mechanisms (flag at the owning stage's n.1, do not auto-proceed): RV-1 (handoff schema, the 7a/7b split), RV-4 (new permanent dimension), SH-2 (CONSUMERS contract), SH-3 (trigger/scope). Plus every merge to `main`.

### Stage A — Two-surface (TS-1, TS-2)

- Status: **CLOSED** — A-1 (TS-1, PR #37) + A-2 (TS-2, PR #38) merged to `main`.
- Change (scoper, TS-1): rework Stage 6 so it emits two distinct artifacts — the operator surface (tool failures, provenance, cost/credit) and the client surface — instead of one undifferentiated stream. Target `scoper/SKILL.md` Stage 6.
- Change (builder, TS-2): add the deny-list lint over the client surfaces and split the keystone so GUARDRAIL is last. Targets `keystone-emit.md`, `keystone.md`, `prototype.html`, and the `client-clean.md` scrub seam (the scrub does not currently name the keystone — that is where the lint wires in).
- Consumes: the rehype/parse5 AST deny-list over text and comments.
- Gate proof: the lint exits 1 on a surface containing any deny-listed term (text or comment) and 0 on a clean surface; run the exploit-repo review.

### Stage B — Machine-true evidence (MT-1…MT-5)

- B-1 (MT-3/4/5): MERGED to `main` (ade191c, PR #31; docs cleanup at `b3ed6c7`) — see What is already done.
- B-2a (MT-1): MERGED to `main` (PR #32, in `d0d2480`). `audit-lint.mjs` gained **rule R6 (MT-1)**, the cross-artifact reconciliation / drift gate: R6a projection drift, R6b protected-mark single-source from `canon/mark.svg`, R6c asset-ref resolution; `satellites/projections.md` gained `consumes`/`source` columns. Wired into `validate-audit.md` §5a + Gate summary; R0–R5 unchanged.
- B-2b (MT-2): MERGED to `main` (PR #33) — **CLOSED Stage B**. New build-time tool **`tools/fidelity-diff.py`** replaces the §7a perceptual verdict with a MEASURED one: co-registers the reproduction onto the Stage-5 source capture (ORB+RANSAC) and computes ΔE2000 (≤ 2.0 default, ≤ 1.0 core colour) + SSIM/pixelmatch + fontTools glyph metrics, writing `audit/fidelity/<treatment-id>/scores.json` (re-auditable without cv2). Measures against the source capture — NOT a pixel-VRT (§3a preserved). Medium-agnostic: a non-visual carrier → declared GAP, never a false-fail; deps import-guarded (non-visual path needs none). Wired into `validate-audit.md` §7a + §2 + the Gate-summary §7a clause, and `reproduction-router.md` § Validation. Synthetic fixtures `tools/fixtures/fidelity/`. §3a/§5a + the Gate-summary R0–R6 clause byte-untouched; `audit-lint.mjs` untouched. RESIDENT.md gains its first v4 section (Stage-B close).
- Scope boundary: §3a "no pixel-VRT for component renders" stays — MT-2 measures the mark, primary colors, and treatments, not component renders.
- Consumes: ΔE2000 / ORB+RANSAC / fontTools (MT-2); SD custom formats and SVG `<use>` (MT-1).

### Stage C — Schemes are tokens (SC-1)

- Change: make `ALGO-SCHEME-DERIVE` runnable so N named schemes become N materialized token sets (or an unbuilt scheme carries `$extensions.brand.status:"deferred"` plus a logged GAP); add a validator that fails a named scheme with no token artifact; render a live scheme toggle in Stage 8 when more than one scheme exists; add the graphic-code contrast spec (`ALGO-CONTRAST-ROLE` graphic-code row). Targets `03-grammar.md` (`ALGO-SCHEME-DERIVE`, `ALGO-CONTRAST-ROLE`), `token-spine.md`, `validate-audit.md` (new validator), `prototype.html` (toggle), the token templates.
- Color-format migration lands here: structured OKLCH `$value` objects via SD `color/oklch`, with a `hex` sRGB fallback. This is the one place the `$value` format changes; earlier stages keep it untouched.
- Consumes: DTCG 2025.10 Resolver (draft, wraps base/semantic/component; build-time N-file materialization via Dispersa or a preprocessor); structured OKLCH; the brand-fixed decorative contrast band with WCAG 3:1 escalation.
- Sub-PRs (Stage C ships in three to keep each diff reviewable):
  - **C-1 (structured-OKLCH `$value` migration + R6a serializer lockstep) — MERGED** (PR #34, in `89e9cb2`). Colour value-tokens migrate to the DTCG structured object `{colorSpace, components, alpha, hex}` (hex = sRGB fallback; `$extensions.brand.spaces` source axis preserved). `audit-lint.mjs` gains ONE canonical `serializeValue` so R6a reconciles a pinned `oklch(L C H)` / `oklch(L C H / a)` form against a structured spine value (migration-tolerant; no `String(object)`). `token-spine.md` adopts the structured form + a C-2 `color/oklch` forward-constraint; `projections.md` documents the canonical-serialized pin. Fixtures migrated (clean R0–R6 PASS, incl. an alpha guard; seeded R6a fires on a structured-value drift with a readable serialized message). R0–R5 + `isAliasValue` + R4 unchanged; §7a/§3a/§2 + `fidelity-diff.py` untouched; no Style Dictionary. RESIDENT untouched (Stage C closes at C-3).
  - **C-2 (schemes-as-tokens) — MERGED** (PR #35, in `e9c17da`). Runnable `ALGO-SCHEME-DERIVE` (03-grammar §10 + canon.json.algorithms) + a zero-dep `tools/scheme-derive.mjs` (NOT Style Dictionary) materialize N named schemes → N COMPLETE `$extensions.brand.scheme`-tagged structured-OKLCH role-token sets in `tokens/schemes/<id>.json` (light/dark/contrast L-remap, OKLCH→sRGB hex in-process; deferred scheme → no set + GAP). New `audit-lint` **R7** (a sibling — R4 left as-is) fails any named scheme without a complete set (role-key parity with the default) or a deferred+GAP; the loader now also reads `tokens/schemes/*.json`. R0–R6 + `serializeValue` byte-unchanged; §7a/§3a/§2 + `fidelity-diff.py` + `prototype.html` + `ALGO-CONTRAST-ROLE` untouched. Clean: R0–R7 PASS (2 complete schemes + 1 deferred+GAP). RESIDENT untouched (closes at C-3).
  - **C-3 (scheme toggle + decorative contrast) — MERGED** (PR #36) → **CLOSED Stage C**. The prototype gains a live `[data-scheme]` toggle (inline `<script>` + one `:root[data-scheme="<id>"]` block per materialized scheme, rendered only when >1 scheme; `[data-scheme]` wins over the OS `@media`, which stays the no-JS fallback; flat brand drops it; zero-toolchain/offline preserved — rendered + verified light & dark). GRAMMAR `ALGO-CONTRAST-ROLE` gains a graphic-code row + `G-PATTERN-01` is wired to it; PRIMITIVES › Pattern gains a brand-fixed decorative-contrast band (PRIMARY; escalate to WCAG 3:1 / SC 1.4.11 when the device carries meaning/state; APCA Lc 15 internal-only; WCAG 2.x AA the legal bar). Spec-level — no executable gate (R0–R7 + scheme-derive.mjs + §7a/§3a/§2 + fidelity-diff.py byte-untouched). RESIDENT `## v4` extended with the Stage-C-close architecture; CLAUDE + roadmap updated. Heresto/golden-set NOT backfilled (4.1).

### Stage D — Human-legible complete review surface (RV-1…RV-5)

- Status: **CLOSED** — scoper side (D-1a #41: RV-1 7a/7b split + RV-2 gate-3.5 intake; D-1b #42: RV-3 DELIVERABLE column + stage N-of-9, RV-4 gate-5 unconditional + `consultation-surface: always-required`) + builder side (D-2a #44: RV-5 prototype → complete interactive brandbook; D-2b #45: RV-5 completeness gate audit-lint R8 — CLOSES Stage D). RV-1…RV-5 all in.
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

- Status: **in progress** — SH-1 #40 merged (interview bank → `references/elicitation-bank.md` + detection batteries → `references/detection-batteries.md`; SKILL.md 508→393, under 500). SH-2 + SH-3 pending.
- Change (scoper): externalize the interview bank and detection batteries to `references/` (SH-1, drops SKILL.md off the 500 ceiling); add the CONSUMERS `ingest` value for live-but-raster surfaces (SH-2); add the sibling non-trigger clause vs `brand-voice` (SH-3, in-Chat, no research). Targets `scoper/SKILL.md` (Stage 4 bank, description) and `handoff-format.md` (CONSUMERS).
- Optional sequencing: SH-1 is dependency-free and a pure move, so pulling it forward lets D/E/F edit the slimmed file. Low value, zero risk; Carlos's call.
- Ratify: SH-2 (CONSUMERS contract), SH-3 (trigger/scope).

## Finalize and ship (Phase 4)

- 4.1 RESIDENT reconciliation. A single pass that backfills what per-stage migrations did not cover: the v3-audit closure, this validation run (the Heresto golden-set and both phases' findings), and any durable Phase-3 outcome not already migrated. Locked inputs from Phase 1: bump `last_updated` 2026-06-22 → 2026-06-23; complete the builder repo-map (add `keystone-emit.md` and `reproduction-router.md`); drop the now-removed v3 root docs (`v3-execution-plan.md`, `v3-research-foundation.md`, `v3-system-audit—2026-06-23.md`) from the repo-map and point the roadmap entry at `v4-roadmap.md`; add a v4 section that names Heresto and the golden-set (currently invisible in RESIDENT); reflect the reopened-then-reclosed audit ledger.
- 4.2 Release criterion plus golden-set freeze. The v4 bar: every mechanism is instantiated as a gate that fails on violation, and both skills are re-validated. Freeze `heresto-brand` at the known commit as the regression golden-set and record the expected gate verdicts.
- 4.3 Ship. Human-ratified merge to `main` plus a marketplace version bump from `0.3.0`.

## Current state

Phase 3 is in progress on `main` (`a3ac99e`). **Stages A, B, C, and D are CLOSED**, and **Stage G's SH-1 is done** (#40). Live on `main`: the builder gate suite (`tools/audit-lint.mjs` **R0–R8**, `tools/source-recover.py`, `tools/fidelity-diff.py` ΔE2000/SSIM/glyph, `tools/scheme-derive.mjs` `ALGO-SCHEME-DERIVE`, `tools/client-deny-lint.mjs` TS-2), the structured-OKLCH `$value` migration, `canon/mark.svg` single-sourcing, the live `[data-scheme]` toggle + decorative-contrast spec; the Stage-8 prototype as the **complete interactive brandbook** (manifest sections derived from the canon + a "Decisions for you" panel + a design bar) gated by **R8** (every present canon section → a `data-canon-section` surface OR an open GAP); and scoper-side, the operator/client confinement + gate-6 self-check (TS-1), the **client-surface flow** — gate 3.5 intake + 7a Final Brand Brief / 7b machine handoff + the one-flow reconciliation (RV-1/RV-2), the **DELIVERABLE column + stage N-of-9** and **gate-5-unconditional + `consultation-surface: always-required`** (RV-3/RV-4) — and SH-1's externalized interview bank + detection batteries (`SKILL.md` 393 < 500). RESIDENT.md carries the durable Stage-B/C/D architecture. The repo is clean — only `main`, 0 open PRs; `v4-roadmap.md` is the single roadmap at root. Plugin still `0.3.0` (bump is Phase 4.3). The change set, targets, and research constraints are locked above; nothing downstream needs re-deriving. Next, free roots (Carlos's call): **E** (epistemic honesty); **SH-2/SH-3** close Stage G; **F** (process tempo — now unblocked); then finalize.

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

- Stages A, B, C, D are CLOSED (D fully: D-1a #41, D-1b #42, D-2a #44, D-2b #45) and Stage G's SH-1 (#40) is merged. The live roots are now **E** (epistemic honesty — needs B, done), **SH-2/SH-3** (the rest of G), and **F** (process tempo — needed A+D, now unblocked). Carlos picks the next.
- RESOLVED (was: PR #31 branched from `v4/roadmap`): PR #31 was decontaminated to code-only and squash-merged (`ade191c`); `v4-roadmap.md` landed separately on `main` root with cleanup complete at `b3ed6c7`. B-2a's PR is branched cleanly from `origin/main` (`b3ed6c7`), so this does not recur.
- The ratification-gated mechanisms (RV-1, RV-4, SH-2, SH-3) need Carlos's sign-off when their stages reach n.1.

## Next actions

1. Stage D is CLOSED (RV-1…RV-5). Pick a free root: **E** (epistemic honesty), **SH-2/SH-3** (the rest of G), or **F** (process tempo — now unblocked). Carlos's call.
2. Run that stage's inner cycle: n.1 Chat design + decisions (re-pin targets against current `main` by section/rule name) → n.2 one self-contained hand-off → n.3 Code executes and reports → n.4 Chat verifies via Composio, then the merge is ratified.
3. Keep the exploit-repo adversarial review per gate stage; prove each new gate fails on a seeded violation and passes clean before merge.

## Session log

- 2026-06-23 — Roadmap opened; Phase 0 frozen (both phases' findings consolidated into the change set; thesis locked).
- 2026-06-23 — Phase 1 done: all findings confirmed against `main@658ab59`; golden-set `heresto-brand` intact (4/4); RESIDENT staleness enumerated.
- 2026-06-23 — Phase 2 done: tooling and spec decisions pinned (DTCG 2025.10 stable with draft resolver; SD v5.4.4 with structured OKLCH; ΔE2000 + ORB+RANSAC + fontTools; rehype/parse5; WCAG 2.x legal bar with a brand-fixed decorative band).
- 2026-06-23 — Stage B-1 shipped (PR #31, unmerged): `audit-lint.mjs` (R0–R5) plus `source-recover.py` plus spec wiring across 8 files; adversarial review added R0, path-bound R3, and fixed a good-repo false-positive (30/30). Pending: Composio verification plus merge ratification.
- 2026-06-23 — Roadmap consolidated from scratch into this file (`v4-roadmap.md`, the operating document going forward, at `main` root); stage order restored to the dependency graph; RESIDENT-touch rule revised to per-relevant-stage plus a 4.1 reconciliation.
- 2026-06-23 — Repo untangled and B-1 LANDED. Cleanup executed: `v4-roadmap.md` committed to `main` root, the three v3 root docs removed, PR #19 closed, branches `v4/roadmap` / `v3/audit` / `claude/v3-plan` deleted. PR #31 decontaminated to 28 code files, Chat re-verified the diff via Composio, then squash-merged → `main` `ade191c`; its branch auto-deleted. Repo state: only `main`, no open PRs, the gate + helper + specs live.
- 2026-06-23 — B-1 code Chat-verified by running the gate on both fixtures (clean exit 0 / seeded exit 1, all rules firing; RESIDENT untouched; no brand leak). Branch/PR topology verified via Composio: the roadmap doc had diverged across `v4/roadmap` (6 commits, no PR) and PR #31 (carries it among 29 files). Cleanup planned: decontaminate PR #31 to code-only, land `v4-roadmap.md` on `main`, remove the v3 root docs, delete stale branches, close PR #19.
- 2026-06-23 — Stage B-2a (MT-1) shipped + MERGED (PR #32 → `d0d2480`): `audit-lint.mjs` gained rule R6 (R6a projection drift · R6b mark single-source via the new `canon/mark.svg` · R6c asset-ref resolution); `satellites/projections.md` gained machine-readable `consumes`/`source` columns. Exploit-repo review (5 independent reviewers) found + fixed 6 false-fail classes (quoted CSS values, `;`-inside-value, self-closing vs explicit-empty svg, `id` on a non-svg, a decorative `Mark` outside the kit, an encoded data-URI fragment); two became permanent clean-fixture regression guards. §7a/§3a/§2 + R0–R5 byte-untouched.
- 2026-06-24 — Stage B-2b (MT-2) shipped (PR on `v4/stage-b2b-fidelity`, base `main@d0d2480`) → **CLOSES Stage B** (MT-1…MT-5 all in). New build-time `tools/fidelity-diff.py` replaces the §7a perceptual verdict with a MEASURED ΔE2000 + SSIM/pixelmatch + fontTools-glyph diff against the Stage-5 source capture (ORB+RANSAC co-registration), writing `audit/fidelity/<id>/scores.json` (re-auditable without cv2). Validated on synthetic fixtures: within / within-shift / core-colour → pass; out → exit 1; out+declared-GAP + non-visual carrier → pass; mid@default fail vs mid@loose pass (a looser tier raises the bound, never waives the metric); import-guard → exit 3 with a `pip install` message; the non-visual path runs dep-free. Exploit-repo adversarial review (5 reviewers) FOUND + FIXED several false-fail classes — a degenerate/garbage co-registration warp applied blindly (flat swatch, 2% scale, authored-foil), `mismatch_fraction` tripping on edge-localized JPEG/skew, SSIM degeneracy on flat carriers, and a glyph crash on a no-Unicode-cmap font; fixes: registration now KEEPS-THE-BEST alignment by ΔE (never worse than no-warp) + sanity-bounds, mismatch counts only grossly-wrong pixels (ΔE>10), a flat-image SSIM guard, structure bounds kept looser than the strict ΔE primary, and the cmap guard. Re-verified 22/22 (incl. RGBA/grayscale/mismatched-dims/1×1/missing→exit2/SVG→exit2). §3a/§5a + the Gate-summary R0–R6 clause + `audit-lint.mjs` byte-untouched; reproduction-router §7a cross-refs intact. RESIDENT.md gains its first v4 section (Stage-B builder-validation architecture). Heresto/golden-set NOT backfilled (deferred to 4.1). Pending: Chat-verify + ratified merge.
- 2026-06-24 — Stage C-1 (structured-OKLCH `$value` migration + R6a serializer lockstep) shipped (PR on `v4/stage-c1-structured-oklch`, base `main@86058de`) — the FIRST of three Stage-C sub-PRs. Colour value-tokens migrate from an OKLCH literal string to the DTCG structured object `{colorSpace, components, alpha, hex}` (hex = sRGB fallback; `$extensions.brand.spaces` source axis preserved). `audit-lint.mjs` gains ONE canonical `serializeValue` (the only rule touched is R6a): it serializes BOTH the projection pin and the spine value to `oklch(L C H)` / `oklch(L C H / a)` (numbers normalized 0.30→0.3, alpha-1/absent dropped symmetrically, colourSpace lowercased, arrays/cubic-bezier → bracketed) — migration-tolerant (legacy string OR structured object), never `String(object)`. `token-spine.md` adopts the structured form + a C-2 `color/oklch` forward-constraint; `projections.md` documents the canonical-serialized pin. Fixtures migrated (clean R0–R6 PASS incl. an alpha-0.5 guard; seeded R6a fires on a structured-value drift with a readable serialized message — no `[object Object]`). Validated: clean exit 0 / seeded exit 1; R0–R5 + `isAliasValue` + R4 byte-unchanged; §7a/§3a/§2 + `fidelity-diff.py` untouched; no Style Dictionary; RESIDENT untouched (Stage C closes at C-3). Exploit-repo review (5 reviewers) FOUND + FIXED serializer asymmetries — an explicit `/ 1` alpha in a pin (legacy branch kept it, structured dropped it), the array branch emitting unmatchable quoted-string JSON (`["0.4",…]`), and an un-lowercased structured `colorSpace`; the percent-form pin (`30%` vs `0.3`) is left as an out-of-contract spelling (the canonical form is fractional 0–1; per-component percent is semantically unsafe to auto-convert). Tooling note: a global save-formatter reflows `.mjs` to tabs on any Edit/Write tool call — apply `audit-lint.mjs` edits via a Bash/python patch to keep the diff surgical (JS-only; `.md`/`.json` edits are safe).

- 2026-06-24 — Stage C-2 (schemes-as-tokens) shipped (PR on `v4/stage-c2-schemes-as-tokens`, base `main@89e9cb2`) — the SECOND of three Stage-C sub-PRs. The runnable `ALGO-SCHEME-DERIVE` (authored into 03-grammar §10 + registered in canon.json.algorithms) + a NEW zero-dep `tools/scheme-derive.mjs` (NOT Style Dictionary/Dispersa) materialize N named canon schemes into N COMPLETE role-token sets at `tokens/schemes/<id>.json`: each role a structured-OKLCH object derived from the base palette by `{mode, dominant}` (light=identity · dark=invert-L on neutral roles + lift non-dominant chromatic +0.08 · contrast=push neutrals to the L extreme; C/H preserved; hex via in-process OKLCH→sRGB), tagged `$extensions.brand.scheme:"<id>"`, entering at `confidence:"hypothesis"` + the scheme's tracking GAP. A `status:"deferred"` scheme emits no set (carries a logged GAP). New `audit-lint` **R7** (a sibling — R4 left byte-unchanged) fails any named scheme without a complete set (role-key parity vs the default) or a deferred+GAP; the audit-lint loader now also reads `tokens/schemes/*.json` so the scheme tokens are subject to R0–R6 too. Validated: clean exit 0 (R0–R7 PASS — day+night complete, print deferred+GAP-022; R6a green on a scheme-consuming projection); seeded exit 1 (R0–R6 fire as before + R7 names the missing role-key on a partial `night` set). Exploit-repo review (5 reviewers) FOUND + FIXED one R7 defect — the deferred-scheme escape bound its GAP by NAME-match in RESIDENT prose (`rowMentions`), so a scheme named with an ordinary word (or mentioned in a sibling's GAP row) false-failed; now bound to the DECLARED `schemes.<id>.gap` id + checked OPEN. Flat/vacuous, N-complete, alias-shaped role tokens, and R0–R6 first-class scheme-token handling all passed (0 other false-fails). R0–R6 + `serializeValue` byte-unchanged; §7a/§3a/§2 + `fidelity-diff.py` + `prototype.html` + `ALGO-CONTRAST-ROLE` untouched (C-3 owns the toggle + contrast spec). RESIDENT untouched (Stage C closes at C-3). Tooling: Carlos added a global biome/ruff save-formatter hook today; it reflows edited JS/JSON/CSS to biome's default (TABS) because the repo has no `biome.json` — so ALL repo edits this PR were applied via Bash/python patches (no Edit/Write tool) to keep diffs surgical + 2-space. Pending: Chat-verify + ratified merge.

- 2026-06-24 — Stage C-3 (scheme toggle + decorative-contrast spec) shipped (PR on `v4/stage-c3-toggle-contrast`, base `main@e9c17da`) — the LAST Stage-C sub-PR, CLOSING Stage C. (1) `prototype.html` gains a live scheme toggle: per-scheme `:root[data-scheme="<id>"]` blocks + an inline `<script>` (no import/module/network) that sets `<html data-scheme>` from a Controls `<select>`, rendered only when >1 non-deferred scheme exists; `[data-scheme]` wins over `@media (prefers-color-scheme)` (kept as the no-JS fallback); a flat brand drops the toggle. Rendered + visually verified (shot.mjs) in BOTH light (default) and dark (toggle → `data-scheme="dark"`) — the per-scheme block applies and the inline script drives it; zero-toolchain/offline preserved. (2) Decorative-contrast spec (SPEC, not a gate): GRAMMAR `ALGO-CONTRAST-ROLE` gains a graphic-code row and `G-PATTERN-01` is wired to it (no longer ratio-less); PRIMITIVES › Pattern gains a brand-fixed decorative-contrast band — PRIMARY rule, escalate to WCAG 3:1 (SC 1.4.11) when the device carries meaning/state, APCA Lc 15 internal-only, WCAG 2.x AA the legal bar (no APCA substitution). (3) Stage C CLOSED: RESIDENT `## v4` extended with the durable Stage-C architecture (structured-OKLCH + R6a serializer · schemes-as-tokens + ALGO-SCHEME-DERIVE + scheme-derive.mjs + R7 + deferred+GAP · toggle · contrast band); CLAUDE + roadmap updated; Heresto/golden-set still deferred to 4.1. Gate untouched: audit-lint clean exit 0 / R0–R7 PASS; audit-lint.mjs + scheme-derive.mjs + validate-audit.md (§7a/§3a/§2/§5a) + fidelity-diff.py byte-untouched (absent from the diff). This PR touched only `.html` + `.md` — outside the biome hook's JS/JSON/CSS scope — so edits used the normal tools. Pending: Chat-verify + ratified merge → Stage C closes, then the free roots are A / E / G.
- 2026-06-24 — Stage B CLOSED: B-2a (MT-1, cross-artifact reconciliation/drift → audit-lint R6a/b/c) and B-2b (MT-2, measured fidelity → tools/fidelity-diff.py, ΔE2000/SSIM/glyph) merged; builder keystone complete.
- 2026-06-24 — Stage C CLOSED: SC-1 — ALGO-SCHEME-DERIVE materializer (tools/scheme-derive.mjs), audit-lint R7 (scheme-set completeness), structured-OKLCH $value migration (C-1), live scheme toggle + decorative-contrast spec (C-3).
- 2026-06-24 — Stage A CLOSED: A-1 (TS-1, #37) rigorous operator/client confinement + gate-6 self-check in scoper; A-2 (TS-2, #38) client-surface deny-list AST lint (tools/client-deny-lint.mjs, rehype/parse5, text+comment+attr) wired into the client-clean Stage-11 scrub, keystone GUARDRAIL-tail assert, client-clean now names the keystone, prototype body leak fixed. Exploit review hardened the matcher; an independent Chat pass caught and fixed an asset-origin heritage-copy false-fail (rebind to build-context) before merge.
- 2026-06-24 — SH-1 (#40) CLOSED: scoper interview bank → references/elicitation-bank.md + detection batteries → references/detection-batteries.md; SKILL.md 508→393 (<500); gate-4 contract + pointers retained. Pure faithful move.
- 2026-06-24 — D-1a (#41): gate 7 → 7a Final Brand Brief (BLOCKING client approval) + 7b machine handoff (post-signoff); new gate 3.5 intake (CONFIRM/ASK/REQUEST, emission default); the three client instruments reconciled into ONE flow, three checkpoints (CONFIRM→Found · ASK→To-confirm · REQUEST→Missing). RV-1 + RV-2.
- 2026-06-24 — D-1b (#42): DELIVERABLE column + stage N-of-9 per gate (RV-3); gate 5 unconditional/BLOCKING (sole-decider doesn't waive external-review) + consultation-surface: always-required permanent dimension (RV-4). Scoper side of Stage D complete.
- 2026-06-24 — D-2a (#44): the builder Stage-8 prototype becomes the COMPLETE interactive brandbook — manifest sections (lexicon / Misuse / schemes / THINK-rule surface, plus hero / cards / type / color) DERIVED from the canon's present sections (a not-used section is omitted or GAP, never invented), a "Decisions for you" ratification panel (client-language-first; the human sign-off ratifies, never auto-stamped), and a design bar (hero focal anchor, responsive `@media` breakpoint, colour-as-system). Single self-contained offline `.html` preserved (inline `<style>`+`<script>`, no `<link>`/`<use>`/fetch); C-3 scheme toggle intact. Rendered + visually verified (shot.mjs) on phone + desktop, light + dark. RV-5 part 1.
- 2026-06-24 — D-2b (#45) — **Stage D CLOSED**: the RV-5 completeness gate `audit-lint` **R8** (`validate-audit.md` §5a) — every PRESENT canon section → a live `[data-canon-section="<id>"]` brandbook surface in a generated `.html` OR an open `GAP-NNN`. Present-set DERIVED by machine signal, never a fixed checklist (essence=canon/01-* · color=color tokens · type=typography/`font-*`/`line-height` tokens · mark=canon/mark.svg · schemes=canon.json ≥1); anti-determinist — flat/monogram/sonic/non-visual pass clean, a not-used/absent section needs no surface, no `.html` is a vacuous PASS; markers inside HTML comments / inert `<template>` are stripped before the scan. Shaped like R4/R7; R0–R7 byte-untouched (purely additive). Gate-summary now **R0–R8**; the Stage-11 deny-lint (TS-2) confirmed over the enlarged brandbook. Exploit-repo review (4 lenses) FOUND + FIXED 2 real defects pre-merge: the `type` detection regex never matched the shipped token convention (`font-size`/`font-family`/`line-height`) → broadened + `data-canon-section="type"` surfaces added to clean/flat/sonic fixtures (BLOCKER); markers inside comments / inert `<template>` falsely satisfied R8 → stripped before the scan (MAJOR); essence detection broadened from exact `01-essence.md` to the `canon/01-*` layer (MINOR). Proven: clean→0 / seeded→1 (R8 fires once for "color") / anti-determinism battery (flat: no schemes · sonic: no mark) →0. RV-1…RV-5 complete; RESIDENT `## v4` extended to Stages B–D with the durable review-surface architecture; CLAUDE gets R0–R8 + scoper `references/`. Heresto/golden-set still deferred to 4.1.

## Resume

Read this document in order (front matter, TL;DR, Purpose, What is already done, Work stages, Next actions). Confirm the next action with Carlos before working. For any repo work, fetch `CLAUDE.md` and `RESIDENT.md` from `main` first. Run each stage through the inner cycle and verify every PR via Composio before its merge is ratified. Do not restart the plan and do not relitigate the decisions above; append to the Session log and fill stage blocks in place.

## Limitations

- This document does NOT carry the diagnostic process — the pre-research, the research rounds, the finding-by-finding reconciliation. Those are folded to their results and concrete changes. The frozen detail is not carried forward; if ever needed it remains in the repo's closed-PR history and the deleted branches' commits.
- This document does NOT contain the per-stage hand-off blocks; each is produced at that stage's n.2 and pasted into Code by Carlos.
- This document does NOT cover the live red-team RUN or a second-brand validation beyond Heresto — those are Phase-5 / post-v4.
- Where it needs a human: the ratification gates (rector/scope changes, the four flagged mechanisms, every merge), the choice among free root stages, and any PR merge.
