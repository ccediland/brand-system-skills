# brand-system-skills — v4 Ship Roadmap (Master)

**Date opened:** 2026-06-23 · **Species:** execution-plan (a plan Claude executes across sessions, with a live log) · **Scope:** the full path to shipping **v4** of BOTH skills — `brand-canon-scoper` (Chat) + `brand-canon-builder` (Code) · **Status:** Phase 0 FROZEN; Phases 1–4 gated. · **Canonical home:** this file is the single source for the v4 effort — nothing lives outside it; it is filled as the rounds run, and `RESIDENT.md` is updated from it only at the end.

---

## How to use this document

This is **an ai-roadmap inside an ai-roadmap.**

- **Outer roadmap (the project):** Phases 0 → 4 below, run in order. Phase 0 is the frozen base. Phases 1–4 are gated and fill in as they execute.
- **Inner roadmap (inside Phase 3):** each change-stage is its own four-step cycle modelled on how this project has run all along — **Chat analyzes & decides → hand-off → Code executes → Chat analyzes Code's results.** Each stage is a section; each section carries that cycle.

**Log discipline.** This doc *is* the work log. Every session appends to the Session Log (bottom) and fills the relevant PENDING block in place. Never restart; never lose the log.

**Gates.** A `[GATED]` phase/stage does not begin until the prior one's output is in. Two human-ratification gates apply (per the operator's standing rule): (a) any change that alters a skill's **rector or scope**, and (b) the final **merge to `main`**. Everything else is pre-approved within scope.

**Self-containment.** All substance from the Chat-phase and Code-phase findings is folded into Phase 0 as the authoritative ledger. Those source docs are treated as gone; this is the record.

---

## Phase 0 — Consolidated problem + change ledger  `[FROZEN BASE]`

### 0.1 The v4 thesis

Both skills are architecturally sound in their **engine** and broken in the same way at the **seam**: each **declares a discipline (the anti-determinism rector) in prose but never instantiates it as a gate that fails.**

| Skill | Declares | Never instantiates | Keystone fix |
|---|---|---|---|
| **Scoper** (Chat) | two surfaces (internal-rigor vs client) | separating them into distinct artifacts → ships one undifferentiated stream | **two-surface instantiation** |
| **Builder** (Code) | fidelity / values | measuring or reconciling them → "evidence" is prose-true, not machine-true | **cross-artifact reconciliation + measurement gate** |

**v4 in one line:** turn the rector from prose into **executable gates** — surfaces that are separate artifacts, values that are measured and byte-reconciled, completeness that is enforced — across both skills. A third axis unites them: **the surface the client reviews must be human-legible and complete, not a technical artifact** (scoper: a human-readable approval brief, not a machine block; builder: a complete interactive brandbook, not a thin demo + a repo of `.md`).

### 0.2 Scoper (Chat-phase) findings

**Behavioral** (observed in a blind scoping run on the Heresto fixture). Severity: MAJOR / MINOR / RESOLVED.

| # | Finding | Sev | Structural root |
|---|---|---|---|
| 1 | **Epistemic confabulation** — converted a *blocked* fetch (`ROBOTS_DISALLOWED`) into a positive liveness claim ("Live site") and stamped `verified` on the adjacent truth (the robots-wall), laundering a false classification. Floor breach: verified the adjacent claim, reported the target claim | MAJOR | — |
| 1b | **Unearned outcome optimism** — "if the CSS is there, your fidelity problem is largely solved" — promise over data it admits not touching. Same motor as #1 | MINOR | — |
| 2 | **Two-surface collapse** — narrated tool failures + cost/credit reasoning into the *client* surface; never instantiated the internal-vs-client separation at all. Visible only under live tool failure → cold audits missed it | MAJOR | S2 |
| 3 | DIMENSION MAP emitted complete in the compile (correct surface) | RESOLVED | — |
| 4 | **Contract rigidity (CONSUMERS `ingest`)** — live-but-raster surfaces (FB, Behance) can only be `ingest:computed-css` per the contract; the scoper could only patch it in prose. Against the contract, not the scoper | MINOR | contract |
| 5 | **Agency-feel failure (rectoral for the ICP)** — optimized for speed-to-handoff; four exchanges from "tell me about your brand" to "paste this in your terminal." Felt like a 20-min gadget, not an agency process | MAJOR | S2+S3+S4+S5 |
| 6 | **Self-derived personality, mislabeled** — Aaker-5 / differential scales / resonance were *inferred from voice, never elicited*, and stamped `corroborated` (needs multiple sources) on single-source inference. Double breach: rector (elicit-or-gap) + epistemics (over-stamp) | MAJOR | — |
| 7 | **Regulatory instruments from memory** — named the ANZA Alcohol Code + Fair Trading Act without searching to confirm they are current/correct | MINOR-MED | — |

**Structural** (skill-author audit of `brand-canon-scoper/SKILL.md` + `references/handoff-format.md`). Frontmatter passes (name kebab, no "claude"; description 945/1024; no angle brackets; quoted scalar).

| # | Finding | Leverage | Roots |
|---|---|---|---|
| S1 | Monolithic SKILL.md at the 500-line ceiling; the interview bank (Stage 4, ~90 lines), posture battery (4a), horizon method (4b), capture-checklist all load on every trigger though each is needed only at its stage. One reference only | Medium | — |
| S2 | **Stage 6 review authored as chat prose, not a fillable client instrument** | High | #2, #5 |
| S3 | **Stage 5 multi-decider is reactive, not defaulted-to-external** — engages only if the owner names multiple deciders; permits single-decider closure | High | #5 |
| S4 | **No tempo model** — 7 stages run as one conversational pass; structure itself pushes speed-to-handoff | High | #1-motor, #5 |
| S5 | **Handoff authored as a machine contract only** — Stage 7 emits only the machine block; the human review (Stage 6) is separate and ephemeral; no single artifact is both client approval gate and builder input | High | #5 |
| S6 | Trigger overlap with `brand-voice:guideline-generation` on "brand guidelines / style guide" | Low-med | — |

**Process note — the withdrawn #8.** During Code-phase staging an "#8 (phantom source)" was raised — that `heresto.co.nz` was an unrelated charity, so the scoper's handoff pointed at a dead source. On verification (Wayback CDX + the committed archive) the source proved **real**: `heresto.co.nz` *was* the Heresto Vodka Webflow site in 2022–2023; the charity is a later re-registration of the dissolved brand's domain. **#8 was a mis-diagnosis induced by an incomplete staging check and is withdrawn.** The surviving lesson is structural and lands on the builder, not the scoper: an archived source needs **date + identity** verification because a dissolved domain changes hands (→ builder mechanism MT-3).

### 0.3 Builder (Code-phase) findings

**Self-review** (the builder's own 11-auditor + 2-critic adversarial pass, quantified — WCAG, OKLCH, alias closure, stem:serif, cross-artifact diffs; resolution rule: direct evidence > reasoning-from-category). Severity: BLOCKER / MAJOR / MINOR / HELD.

| Dim | HELD (preserve) | Slips |
|---|---|---|
| 1 Source harvest | right source found; yellow + Basis honestly earned | MAJOR identity verified in chat, not on record (CDX-occupant disambiguation unrecorded); MAJOR date conflict (filename `2023-01-24` vs page `Last Published Jun 2022`); MINOR `CHECKSUMS.txt` omits `sources/wayback/` (the source-of-record un-hashed) |
| 2 Provenance | floor sound — builder atoms marked `hypothesis`; yellow genuinely `corroborated` | MAJOR `corroborated` leaked onto single-source reads (charcoal/white/font-weights); MAJOR `semantic.json` `source:inferred + confidence:corroborated` (logical contradiction) |
| 3 Vector fidelity | invalid-`.ai` detection honest; absent-`.eps` named; redraw-vs-fabricate drawn cleanly (H redrawn, bespoke script NOT fabricated) | **BLOCKER zero-tolerance monogram certified by eyeball** — 50% blend, no measured diff/threshold, source on a tilted band vs axis-aligned reproduction → they don't co-register; MAJOR glyph is 2.8:1 slab, not the "hairline Didone" the canon claims ×3; MAJOR "shippable" lockup uses live `<text>` → degrades to system font |
| 4 Token spine | OKLCH exact; 16/16 aliases; FLAT (motion/depth not-used) auditable | **BLOCKER 2 of 3 schemes are prose not tokens** — only yellow-forward materialized; the unbuilt high-contrast scheme is the a11y scheme, on a brand with a documented white-on-yellow AA failure; MINOR `charcoal-deep` orphaned |
| 5 Keystone | 6 sections; $2 claim-discipline as functional-above-personality override; injection resistance | **BLOCKER two-surface leak** — §6 REFERENCE (client-deployed) saturated with operator plumbing (GAP codes, build-grade, matched|hypothesis, "redrawn", "OFL build match"), confidence tags in §2-4, "Builder note:" in §5; MAJOR "high-recall tail" claim contradicted by §6 physically following §5 |
| 6 Red-team | battery real/on-target/brand-specific; honestly defers the live run behind a committed expected-refusal contract | MAJOR hardcodes the unpinned $2 (data-map says it is illustrative); MAJOR severity contradiction (regulated posture = BLOCKING, but GAP-008 filed SHOULD); MAJOR covers none of the §4 visual/design guardrail; MINOR no over-refusal / null-control cases |
| 7 GAP ledger | GAP-001 (yellow) correctly MUST-HAVE; GAP-002/003/005 well-calibrated | MAJOR no GAP for the unmaterialized schemes; MAJOR no GAP/gate for the snapshot identity/date; MINOR GAP-008 mis-tagged `skill-scope` (it's an owner/legal duty); `charcoal-deep` unlogged; GAP-001 "resolved at corroborated" overstates closure |
| 8 Two-surface | — | MAJOR operator machinery rendered in the client surface — `prototype.html` shows "Type — Hanken Grotesk (OFL match for Basis Grotesque Pro)", 4 GAP citations (2 in HTML comments), a head comment leaking the full build manifest. Fairness: the kit `@import` is by-design (converter writes it at sync) → cleared |
| 9 Prototype as review surface | visual fidelity, on-brand palette/voice, accurate single-instance rendering | **CENTRAL FAILURE** — ~6 surface sections vs ~30 brand-content blocks; missing the entire GRAMMAR layer, the Manifesto + message pillars, Voice/lexicon (register, mother rule, anti-promise, forbidden/preferred, on/off-brand pairs), the Mark spec (construction, clear-space, min-size, Misuse), the colour *system*, the **scheme toggle**, and a **"Decisions for you" ratification panel** (GAP-001…010 invisible) |
| 10 Cross-artifact integrity | — | MAJOR wordmark tracking has **4 conflicting values** (canon `0.02em` / spine `0.08em` / lockup SVG `3.5` / prototype `.18em`); MAJOR spacing scale ≠ spine (spine `4/8/16/24/48/80`, projections `8/16/24/40/64`); MAJOR the "most protected atom" hand-duplicated across ≥4 files (violates G-MARK-01 in its own projections); MAJOR `audit/fidelity-gate.md` self-certifies a contrast "PASS" it never computed |

**External-audit reconciliation** (my watch-item audit, corrected against the self-review + independent verification).

| Item | Resolution |
|---|---|
| #8 phantom source | **REVERTED — withdrawn.** Source verified REAL externally: in-repo CSS carries `.fs-styleguide_color-sample.is-primary{#fcd900}`; HTML title `Heresto Vodka`; the real Wayback has the exact hashed asset `dc551ca16` as a 200 capture. (External Wayback proof was the auditor's unique contribution; the self-review confirmed but did not prove the source.) |
| FIRST JOB | **Outcome correct, process slipped.** Real source, evidence committed (externally verified) — but identity was verified *indirectly/in chat*, the committed HTML body never read, the CDX-trap disambiguation never recorded, the date conflict never reconciled |
| Two-surface (builder) | **Slip confirmed** — the prototype leaks plumbing (line 174 OFL-match + GAP codes + Stage refs + manifest) |
| OKLCH / aliases / FLAT / anti-fabrication / red-team defer | **Hold** — OKLCH independently re-derived (`#fcd900 → oklch(0.886 0.183 97.2)`); 16/16 aliases confirmed |
| C-1 personality `corroborated` | confirmed and **broadened** — the over-stamp is systemic (charcoal/white/font-weights), not one line |
| C-2 regulatory unverified | confirmed and **sharpened** — adds the severity angle (regulated=BLOCKING vs GAP-008=SHOULD) |
| C-3 keystone leak | **understated** — the entire §6 REFERENCE is saturated → BLOCKER, not minor |

### 0.4 Consolidated change set (the mechanisms)

Every mechanism is grouped by the gate-family it creates. **Sk** = skill (S scoper / B builder / S+B both). **G/Sp** = general vs specific. Each cites the finding(s) it closes. These map to Phase-3 stages.

**Group I — Two-surface (the shared keystone).**

| ID | Mechanism | Sk | G/Sp | Closes | What changes |
|---|---|---|---|---|---|
| TS-1 | **Two-surface instantiation** — the internal-rigor surface and the client surface become *distinct artifacts*, not a notional split | S | G | #2, S2 | Stage 6 produces two separate artifacts; internal machinery (tool failures, provenance plumbing, cost/credit) confined to the operator surface |
| TS-2 | **Two-surface firewall (deny-list lint)** — a lint rejects operator vocabulary in client surfaces | B | G | §5, §8 | Reject `GAP-\d+`, build-grade, provenance grades, "OFL match", "redrawn/harvested/Wayback", "Stage-N", "unratified" in README, prototype text *and* comments, keystone deploy sections, kit; worksheet lives in `RESIDENT.md` only; split the keystone so GUARDRAIL is genuinely last in deployed instructions |

**Group II — Evidence must be machine-true (the builder keystone).**

| ID | Mechanism | Sk | G/Sp | Closes | What changes |
|---|---|---|---|---|---|
| MT-1 | **Cross-artifact reconciliation + measurement gate (KEYSTONE)** | B | G | §10, the root | Every measurable projection value byte-equal to the spine (forces projections to be *generated*, not hand-authored); every `@import`/asset ref resolves; every protected-mark geometry a single-sourced reference (`<use>`/import), never re-typed |
| MT-2 | **Quantitative fidelity verdict** | B | G | Note 4, §3, §10 | Zero-tolerance carriers need a registered same-DPI 8-bit diff with a pre-declared metric/threshold + per-attribute glyph checks (stem:serif, overhang); recurring devices need source-vs-reproduction contrast within a band; tolerance tiers may **not** waive measurement |
| MT-3 | **Source identity + date verification gate** | B | Sp | §1 (FIRST JOB), withdrawn-#8 lesson | Before harvest, read the snapshot *body* for identity tokens (`<title>`, product signals, CDX-occupant disambiguation), reconcile capture-date vs page "Last Published", hash every source file (extend `CHECKSUMS.txt` to `sources/`), add per-token `sourceRef` (file›selector›line); no token at `corroborated`/`computed-css` without a hashed, identity-verified source |
| MT-4 | **Corroboration gate** | B | Sp | §2, C-1 | `corroborated` requires ≥2 *distinct* source artifacts; `inferred`/`matched` capped at `hypothesis` (kills the `semantic.json` contradiction) |
| MT-5 | **Ledger-completeness pass** | B | G | §4, §7 | Every value/scheme named in a canon layer or ALGO maps to a token artifact or a GAP; every `hypothesis`/`inferred`/`matched`/`traced` token maps to exactly one GAP |

**Group III — The client review surface is human-legible + complete (the cross-phase convergence).**

| ID | Mechanism | Sk | G/Sp | Closes | What changes |
|---|---|---|---|---|---|
| RV-1 | **Split gate 7** — 7a human-readable Final Brand Brief (BLOCKING client approval) → 7b machine handoff (post-approval, fed to Code) | S | G | #5, S5 | A complete human-readable `.md` the client reviews/approves; the machine block produced only after sign-off (optionally one doc with a delimited machine section appended) |
| RV-2 | **Gate 3.5 — Discovery & Intake Instrument** | S | Sp | #5, S2 | One fillable doc, every line tagged CONFIRM / ASK / REQUEST; emission is default, not optional; chat *resolves* it, never *replaces* it |
| RV-3 | **Deliverable-per-gate** | S | G | #5 | Mandatory DELIVERABLE column; each gate emits a named/dated/versioned artifact + `stage N of M` marker; no gate clears without it |
| RV-4 | **Consultation-surface invariant** | S | G | #5, S3 | Gate 5 unconditional; deliverables circulation-ready by default; a stated sole-decider does **not** waive external-review framing; add `consultation-surface: always-required` as a permanent dimension |
| RV-5 | **Brandbook-completeness gate (Stage-8 redefinition)** | B | G | Note 2 (central), §9 | The prototype becomes the complete interactive brandbook — a 1:1 section manifest from canon+keystone (incl. lexicon, Misuse, schemes, THINK rules) **plus a "Decisions for you" ratification panel** — with a completeness gate (every brand-layer section maps to a prototype section), a **design bar** (hero focal anchor, responsive `@media`, colour-as-system), and the two-surface firewall (TS-2) |

**Group IV — Process tempo + assumption discipline (scoper).**

| ID | Mechanism | Sk | G/Sp | Closes | What changes |
|---|---|---|---|---|---|
| TA-1 | **TEMPO doctrine** | S | G | #5, S4 | Multi-session, multi-day model; no single-session compression even with perfect material; certainty gates run even with a perfect brand book. **GUARD: pad evidence-of-process, not wall-clock** — the felt agency difference is gated deliverables, not artificial latency |
| TA-2 | **Register firewall** | S | G | #5, #2 | The client surface inherits **no** operator preference toward terseness/speed/assumption; operator directness governs the *internal* surface only. **FLAG: hard to author** — the skill must explicitly firewall its client register from the user's own profile preferences (which bleed pervasively) |
| TA-3 | **Assumption ledger** | S | G | #1/§1.2(c), TA-1 | Every proceed-assumption surfaces as an explicit CONFIRM line; nothing inferred silently |
| TA-4 | **Verify-the-exact-claim guard** | S | Sp | #1 | A blocked/failed retrieval may never be recorded as a positive status; liveness/`verified` requires a *successful* read, not an adjacent signal |

**Group V — Epistemic honesty enforcement (both).**

| ID | Mechanism | Sk | G/Sp | Closes | What changes |
|---|---|---|---|---|---|
| EH-1 | **Elicit-or-gap enforcement** | S | Sp | #6 | Personality / differential / resonance and any owner-meaning field must be elicited or marked GAP — never scoper-derived, never above `hypothesis` without ratification |
| EH-2 | **Search-before-asserting on current facts** | S | Sp | #7 | The scoper searches for named legal/regulatory instruments (or carries them as an explicit GAP for the builder) — never asserts them from memory |
| EH-3 | **Posture→GAP severity inheritance + figure-shape refusals** | B | Sp | §6, §7 | A regulated/BLOCKING posture forces the enabling regulatory GAP to inherit MUST/BLOCKING; the refusal contract corrects claims to a shape bound to the live source-of-truth ("the live $X, drinker-chooses, scan-tied"), never a hardcoded figure the repo marks illustrative; the battery covers the §4 visual guardrail + over-refusal controls |

**Group VI — Schemes are tokens (builder).**

| ID | Mechanism | Sk | G/Sp | Closes | What changes |
|---|---|---|---|---|---|
| SC-1 | **Schemes-are-tokens gate + scheme toggle** | B | Sp | Note 3, §4, §7 | N canon schemes → N materialized token sets via a *runnable* `ALGO-SCHEME-DERIVE` (or each unbuilt scheme carries `$extensions.brand.status:"deferred"` + a logged GAP); the validator fails when a named scheme has no token artifact; Stage-8 renders a live scheme toggle when >1 scheme exists. Includes a **graphic-code contrast spec**: PRIMITIVES fixes each device's target opacity/contrast-vs-ground; `ALGO-CONTRAST-ROLE` gains a graphic-code row (closes Note 4's spec gap) |

**Group VII — Structural hygiene (scoper).**

| ID | Mechanism | Sk | G/Sp | Closes | What changes |
|---|---|---|---|---|---|
| SH-1 | **Externalize the bank** | S | G | S1 | Interview bank + detection batteries → `references/` (e.g. `elicitation-bank.md`, `detection-batteries.md`); drops SKILL.md off the 500 ceiling, leaner always-on |
| SH-2 | **CONSUMERS live-raster `ingest`** | S | Sp | #4 | The CONSUMERS track needs an `ingest` value for live-but-raster surfaces (allow `ocr-visual` there, or add a `media-type:` axis orthogonal to reachability) |
| SH-3 | **Sibling non-trigger clause** | S | Sp | S6 | A non-trigger clause distinguishing the canon-pipeline scoper from `brand-voice` guideline generation |

### 0.5 Preserve — do not break (both engines)

**Scoper engine:** the scoper/builder frontier (no primitive sampled); the anti-determinism rector; the salvage-vs-extraction insight (a dead brand inverts the fidelity strategy; archived CSS beats eyedropping a raster); anti-fabrication on treatments; WHY elicited + ratified (onliness → spine, never-words → anti-promise); DIMENSION MAP completeness; hard claim-discipline + scope boundary; PRIMARY-IDENTITY CARRIER resolution.

**Builder engine:** refused the 42-byte invalid `.ai`; named the absent `.eps`; demoted commercial Basis Grotesque Pro to a flagged OFL match instead of smuggling it in; floored every builder-introduced atom at `hypothesis`; **declined to fabricate** the bespoke script; earned the yellow's two-source `corroborated` honestly; OKLCH exact with full alias closure; FLAT declared with reason; deferred the live red-team behind a committed contract. The instinct — commit evidence, tag confidence, never invent — is the architecture worth keeping. **v4 gives it teeth; it does not replace it.**

---

## Phase 1 — Repo verification + analysis with Code  `[GATED]`

### 1.1 Purpose
Anchor this roadmap to the **verified current state of `main`**, not to memory or the (stale) `RESIDENT.md`. Confirm the v3 baseline, check that each Phase-0 finding still matches the current skill files (the audits were captured from point-in-time reads), enumerate exactly what is stale in `RESIDENT.md`, and confirm the golden-set fixture is frozen. Output seeds Phase 1.4 and the Phase-3 stage specs.

### 1.2 HAND-OFF → Claude Code  *(read-only; no commits, no edits)*

```
GOAL
Read-only verification of the current state of ccediland/brand-system-skills on `main`, to anchor a v4 roadmap. Produce ONE report. Do NOT edit, commit, or open a PR — this is reconnaissance only.

READ FIRST (discover paths yourself; do not ask)
- ccediland/brand-system-skills @ main: RESIDENT.md, CLAUDE.md, the v3 execution plan + any v3 audit docs at root, and the marketplace manifest (version).
- skills/brand-canon-scoper/SKILL.md + skills/brand-canon-scoper/references/handoff-format.md
- skills/brand-canon-builder/SKILL.md + all of skills/brand-canon-builder/references/**
- The golden-set fixture repo ccediland/heresto-brand: confirm branch claude/brand-canon is at commit 78f1cd9 and main is at staging ba63d72 (PR #1 open, unmerged).

TASKS
1. Baseline. Report main's HEAD commit, the marketplace version string, and the full file tree of both skills (path + line count per file).
2. Finding-vs-main check. For each item below, quote the current main location (file + line range) and mark MATCHES / MOVED / CHANGED / GONE vs the captured finding:
   - scoper: SKILL.md is 500 lines, single reference (handoff-format.md); Stage 6 is authored as chat prose; Stage 5 multi-decider engages only "when several people have a say"; Stage 7 emits only the machine block; the interview bank + posture/horizon batteries are inline; frontmatter description length.
   - builder: locate the stage that produces prototype.html (the "representative sample surface" stage) and quote how it specifies the prototype's required content; locate the fidelity-gate logic and quote whether any verdict is required to carry a computed number; locate the scheme/ALGO-SCHEME-DERIVE handling and quote whether schemes are emitted as token sets or described in prose; locate the keystone-emission spec and quote whether it firewalls operator vocabulary from client-deployed sections; locate the provenance/confidence spec and quote the rule for when `corroborated` is allowed.
3. RESIDENT staleness. List every line/section of RESIDENT.md that no longer reflects reality (it has not been updated since before the v3 audits + this validation run). Output a bullet list of "stale: <quote> -> reality: <one line>" — this seeds the end-of-roadmap RESIDENT update.
4. Golden-set. Confirm heresto-brand branch/commit state above; confirm the planted-hostile inputs are intact (assets/logo/Heresto_Logo_FINAL.ai is the 42-byte invalid placeholder; logo_earlier_round.eps absent; sources/studio-onepagers empty); confirm sources/wayback/ holds the harvested HTML + CSS.

CONSTRAINTS
- Read-only. No edits, commits, branches, or PRs anywhere.
- Quote, do not paraphrase, when reporting a finding-vs-main location (file + line range + the exact text).
- If a finding's target cannot be found on main, say GONE and where you looked — do not guess.

REPORT BACK (structured)
- A) Baseline: commit, version, both skill trees (path · lines).
- B) Finding-vs-main table: finding · main location (file:lines) · MATCHES/MOVED/CHANGED/GONE · the quoted text.
- C) RESIDENT staleness list: stale-quote -> reality.
- D) Golden-set confirmation: the four checks, each PASS/FAIL with evidence.
- E) Anything you noticed on main that the roadmap should know but was not asked.
```

### 1.3 Results from Code  `[PENDING — Carlos pastes Code's report here]`

### 1.4 Analysis + roadmap deltas  `[PENDING — Chat folds Code's report into Phase 0/3: confirm or adjust each finding's target, lock RESIDENT-update inputs, finalize Phase-3 stage specs against real line locations]`

---

## Phase 2 — Pre-research + research  `[GATED]`

### 2.1 Open questions (seeded from the findings; refined after Phase 1)
1. **DTCG scheme materialization** — the cleanest pattern to emit N scheme token-sets (yellow-forward / light / high-contrast) and a *runnable* `ALGO-SCHEME-DERIVE`; W3C DTCG conventions for themes/modes (SC-1).
2. **OKLCH-preserving transform tooling** — how consumers emit `oklch()` without a lossy `color/css` conversion (Style Dictionary transforms or equivalent) (MT-1, SC-1).
3. **Graphic-code / decorative contrast spec** — is there a defensible target for a "tonal texture" device's opacity/contrast-vs-ground (WCAG doesn't cover decorative); what number/band to fix (SC-1, Note 4).
4. **Quantitative image-diff for fidelity** — tooling for same-DPI 8-bit diffs + per-attribute glyph metrics (stem:serif, overhang); co-registration of a tilted source vs axis-aligned reproduction (MT-2).
5. **Cross-artifact reconciliation enforcement** — build-step vs linter vs single-source-of-truth generation; how to force projection numbers byte-equal to the spine and protected geometry to a single `<use>` reference (MT-1).
6. **Source identity+date verification** — Wayback CDX `id_`/`im_` modifiers, occupant disambiguation (`suspendedpage.cgi`, redirects), capture-date vs page "Last Published" reconciliation; generalizing the Finsweet `fs-styleguide` CSS-recovery across Webflow sites (MT-3).
7. **Fillable client instrument format** — best format for a non-technical owner's CONFIRM/ASK/REQUEST doc that circulates and returns (RV-2); and the complete interactive brandbook shape (RV-5).
8. **Two-surface deny-list lint** — patterns/tooling for a vocabulary lint over HTML text *and* comments (TS-2).
9. **brand-voice sibling boundary** — the precise non-trigger language to deconflict from `brand-voice:guideline-generation` (SH-3).

### 2.2 Pre-research brief  `[PENDING — run before any Research-mode turn; scopes objectives + source priority per question]`

### 2.3 Research findings  `[PENDING — the answers, with inline sources, that constrain the Phase-3 stage designs]`

---

## Phase 3 — Staged change execution  `[GATED]` — *the inner roadmap*

### 3.0 Stage map + dependency order
Stages group the Phase-0 mechanisms by gate-family. Order respects dependencies (keystones first; the prototype-completeness stage depends on schemes-as-tokens for its toggle). Order is adjustable as Phase 1/2 land.

| Stage | Theme | Mechanisms | Skill(s) | Depends on |
|---|---|---|---|---|
| **A** | Two-surface | TS-1, TS-2 | S + B | — |
| **B** | Machine-true evidence (builder keystone) | MT-1…MT-5 | B | — |
| **C** | Schemes are tokens | SC-1 | B | B |
| **D** | Human-legible complete review surface | RV-1…RV-5 | S + B | A, C |
| **E** | Epistemic honesty enforcement | EH-1, EH-2, EH-3 | S + B | B |
| **F** | Process tempo + assumption discipline | TA-1…TA-4 | S | A, D |
| **G** | Structural hygiene | SH-1, SH-2, SH-3 | S | — |

**Each stage runs the inner cycle** (filled in place as it executes):
- **n.1 Chat analysis + decision** — the design, pre-resolved decisions, exact file/line targets (from Phase 1), and any rector/scope-gate item flagged for ratification. `[PENDING]`
- **n.2 Hand-off → Code** — one self-contained paste block (READ FIRST · spec · constraints · validate-before-merge · ship steps with `--squash --delete-branch` · report-back format · the `RESIDENT.md`/`CLAUDE.md` update step). `[PENDING]`
- **n.3 Code results** — Carlos pastes Code's report. `[PENDING]`
- **n.4 Analysis of results** — independent verification via Composio before approving; deltas; next stage unblocks. `[PENDING]`

### 3.1 Stage A — Two-surface `[PENDING]`
### 3.2 Stage B — Machine-true evidence `[IN PROGRESS]`

Stage B (MT-1…MT-5) instantiates the builder's prose evidence rules as gates that FAIL. Executed in sub-stages
by gate-family; this is the live ledger.

#### B-1 — Provenance & completeness gates (MT-3, MT-4, MT-5) `[CODE DONE — PR open; awaiting Composio verify + ratify]`

- **B-1.1 Chat analysis + decision.** Pre-resolved: collapse the provenance/confidence prose into ONE executable
  gate `tools/audit-lint.mjs` — R1 corroboration ≥2 *distinct* sources · R2 inferred/matched capped at hypothesis ·
  R3 computed-css/corroborated/owner-confirmed needs a hashed source-of-record · R4 every named value/scheme → token
  or open GAP · R5 every uncertain token → exactly one open GAP; add the per-token `sourceRef` harvest field; build
  the MT-3 archived-source recovery helper `tools/source-recover.py` (identity verification stays an AGENT step);
  extend `CHECKSUMS.txt` to `sources/**`. Rector guard: every rule general + value-blind (a monogram-only / single-ink /
  sonic-primary brand passes clean).
- **B-1.2 Hand-off → Code.** This stage's self-contained paste block — branch `v4/stage-b1-provenance-gates` (off the v4 roadmap base).
- **B-1.3 Code results** `[2026-06-23 · PR #__ · branch v4/stage-b1-provenance-gates]`. Landed:
  - NEW `tools/audit-lint.mjs` — zero-dep Node; executable R1–R5; exit 1 on violation; report → `audit/lint/report.md`.
  - NEW `tools/source-recover.py` — Wayback CDX + raw `id_` fetch, occupant disambiguation, SHA-256 → `sources/MANIFEST.json`.
  - NEW `tools/fixtures/{clean,seeded-violation}` — the acceptance proof: CLEAN exits 0, SEEDED-VIOLATION exits 1 (all five rules trip).
  - SPEC wired: `gap-protocol` (MT-3/4 hard rules) · `token-spine` (+`sourceRef` field, MT-4 gate) · `asset-acquisition` (archived recovery + CHECKSUMS-covers-`sources/**`, Finsweet generalized) · `reproduction-router` (archived identity/date inheritance) · `coverage-checklist` (3rd check: ledger completeness) · `validate-audit` (§5a lint + Gate summary) · `SKILL.md` (Stage 1 emits `tools/`, Stage 3 recovery pointer, Stage 10 lint part) · `CLAUDE.md` (tooling + repo-map).
  - Acceptance pasted in the Code report: `audit-lint` exit 0 (CLEAN) / exit 1 (SEEDED); `source-recover` smoke test ≥1 capture + `MANIFEST.json`. **No `RESIDENT.md` change** (Phase 4.1 owns it). **Stopped before merge.**
- **B-1.4 Analysis of results** `[PENDING — Chat verifies the PR independently via Composio, then ratifies the merge with `--squash --delete-branch`]`.
### 3.3 Stage C — Schemes are tokens `[PENDING]`
### 3.4 Stage D — Human-legible complete review surface `[PENDING]`
### 3.5 Stage E — Epistemic honesty enforcement `[PENDING]`
### 3.6 Stage F — Process tempo + assumption discipline `[PENDING]`
### 3.7 Stage G — Structural hygiene `[PENDING]`

---

## Phase 4 — Finalize: RESIDENT update + v4 ship  `[GATED]`

### 4.1 RESIDENT update
`[PENDING]` Apply, in one pass, every durable change since RESIDENT was last updated: the v3 audits' closure, this validation run (Heresto golden-set, both phases' findings), and all Phase-3 stage outcomes. Inputs are locked from Phase 1.3.C (staleness list) + each Stage n.4. This is the only time RESIDENT is touched in this roadmap.

### 4.2 Release criterion + golden-set freeze
`[PENDING]` Define the v4 pass bar (every Phase-0 mechanism instantiated as a gate that fails on violation; both skills re-validated). Freeze the Heresto fixture (heresto-brand @ the known commit) as the regression golden-set; record the expected gate verdicts.

### 4.3 Ship v4
`[PENDING — human-ratified merge to `main` + marketplace version bump]`

---

## Session log

- **2026-06-23** — Roadmap opened. Phase 0 frozen: consolidated both phases' findings (scoper behavioral #1–#7 + structural S1–S6; the withdrawn #8; builder self-review across 10 dimensions + external-audit corrections) and the full change set (24 mechanisms in 7 gate-families). v4 thesis locked: *make the anti-determinism rector executable gates across both skills*, with the human-legible/complete client review surface as the cross-phase convergence. Phase-1 read-only verification hand-off written and ready. Phases 2–4 scaffolded and gated. Next action: run the Phase-1 hand-off in Claude Code; paste the report into 1.3.
- **2026-06-23** — **Stage B-1 (provenance & completeness gates, MT-3/4/5) executed in Code** → branch `v4/stage-b1-provenance-gates`, PR #__. Instantiated the v4 thesis as runnable checks: `tools/audit-lint.mjs` (R1–R5, exits 1 on violation) + `tools/source-recover.py` (MT-3 archived recovery, identity verification kept an agent step) + `tools/fixtures/{clean,seeded-violation}` (the acceptance proof: exit 0 / exit 1). Wired the gate through gap-protocol · token-spine (+`sourceRef`) · asset-acquisition (+ CHECKSUMS-covers-`sources/**`) · reproduction-router · coverage-checklist (3rd check) · validate-audit (§5a) · SKILL.md · CLAUDE.md. `RESIDENT.md` untouched (Phase 4.1 owns it). **Stopped before merge** — Chat verifies via Composio, then ratifies. Next: Stage C (schemes-are-tokens) unblocks on B merge.
