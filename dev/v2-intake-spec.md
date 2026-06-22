---
title: v2 intake spec — brand-canon-scoper
status: v1.0 — research-grounded; ready for the Code rewrite of the scoper
governs: the Chat-side intake method the brand-canon-scoper runs (WS0 doctrine + WS1)
consumed_by: a Claude Code session that rewrites skills/brand-canon-scoper/SKILL.md + skills/brand-canon-scoper/references/handoff-format.md
anchored_in: RESIDENT.md > "## v2"; dev/v2-backlog.md (F-001…F-026)
carries: WS0 F-024 · WS1 F-002/003/006/007/008/009/020 · bridge F-022
grounded_by: a 2026-06-21 research round (Brand Key, Keller CBBE, Aaker, Neumeier, Wheeler; W3C/DTCG Design Tokens 2025.10 + OKLCH; Lahdelma llm-component-schema + Rythm)
last_updated: 2026-06-21
---

# brand-canon-scoper — v2 intake spec

> Authority for the **WS0 doctrine + WS1 instrument** of the v2 scoper rewrite. The scoper is a Chat-side guided intake instrument: it **interviews, requests, structures, and points**, then emits one machine-readable handoff the Code-side builder consumes. It never mines autonomously, never infers the WHY, never extracts primitives. Grounded by a research round against named brand-strategy frameworks, the W3C/DTCG token standard, and LLM-consumable design-system practice (provenance in §8).

## §0 — Purpose & consumers

This spec defines the intake method the `brand-canon-scoper` runs **Chat-side**. It is the WS0 (doctrine) + WS1 (instrument) authority for the v2 rewrite. It is consumed by a Claude Code session that rewrites `brand-canon-scoper/SKILL.md` and `references/handoff-format.md` to conform. Durable decisions — not spec detail — migrate to `RESIDENT.md > ## v2`.

It does **not** specify the builder, the build outputs (real prototype, compiled component library, tokens), or WS2–WS5. Those are named only where intake hands off to them.

## §1 — Scope, non-scope & invariants

**In scope.** The doctrine (mode model); the gated intake pipeline; the five intake instruments (material protocol, asset-inventory request, elicitation instrument, multi-decider consolidation, gaps+confirmation doc); the scoper/builder frontier; material placement; the handoff contract; the per-brand fidelity-bar linkage.

**Out of scope (interface-only references).** Builder extraction logic; build outputs; WS2 validate/audit; WS3 client-clean scrub; WS4 distribution; WS5 asset-extraction / font-acquisition / fidelity gates internal to the build. The builder's own `greenfield.md` / `brownfield.md` references are **not** rewritten here — flagged for downstream reconciliation only.

**Invariants (hold across every section).**

- **Blind.** Encode realities — owners who ramble, partner politics, multi-signer sign-off — as generic capabilities. Never name a sector, country, demographic, or client.
- **Guided instrument, not autonomous miner.** The scoper interviews, requests, structures, and points. It does not mine material autonomously, does not infer the WHY, and does not extract primitives.
- **Do not re-litigate.** The RESIDENT `## v2` Dead-ends are settled: no output-agnostic canon that defers assets; greenfield-vs-brownfield is not the top dichotomy; Design-syncable is the default; the scoper elicits + points while the builder extracts. This spec builds on those.

## §2 — Doctrine: analyze-published-as-default mode model · (req 1 · F-024)

The pre-v2 scoper opened by classifying the brand greenfield vs brownfield. **That dichotomy is retired.** It conflated two independent axes and made "from scratch" a co-equal default, which it is not. Two orthogonal axes replace it.

**Axis 1 — Mode (the doctrine).**

| Mode | When | Default? |
|---|---|---|
| **ANALYZE** | The brand already expresses itself publicly (site, social, print, brandbook, packaging, signage, a single old logo file — any form). Job: analyze that expression across mediums → harvest → refine → transform → improve into a canon. | **Yes** — for essentially every real brand |
| **CREATE** | Author brand truth from scratch. Entered **only on explicit instruction** (genuinely new brand, or an explicit "design us a new brand"). | No — never assumed |

The scoper determines mode with a single question, defaulting to ANALYZE. **Ambiguity resolves to ANALYZE** (ask for the published material).

**Axis 2 — Material coverage (orthogonal; §4.1).** Coverage is measured **per canon layer — how much of each is recoverable from whatever the brand has already produced, in any form** — not by artifact type. The scoper makes **no assumption about the shape** of that material (a PDF, a site, posts, a Figma/Canva kit, a printed card, a logo a designer once sent, nothing). The one structurally special point on the spectrum is **empty**, which for the whole brand routes toward CREATE only on explicit instruction; absent that, "I don't have much" means *analyze the little that exists*.

**Decision (load-bearing for the rewrite).** The scoper's old Step 1 ("detect greenfield vs brownfield") is **deleted**. Mode = one defaulted question; coverage = the Material Protocol. The builder's internal fill-from-material vs fill-from-brief logic stays builder-side and is not governed here.

**Elicitation-depth corollary (seeds §4.3 / §5.1).** Depth follows *where the answer lives*: elicit **deeply** where the answer exists only in a person's head (WHY / essence / intended meaning / rules); **point, don't extract** where the answer lives in material (primitives / exact values). This replaces v1's blanket "don't over-interview."

## §3 — Intake pipeline overview

The scoper runs a fixed, **gated** sequence. Each blocking gate must be satisfied or explicitly waived by the person before compile.

| # | Stage | Detail | Gate |
|---|---|---|---|
| 1 | Mode determination | §2 | one defaulted question |
| 2 | Material protocol | §4.1 | route depth; state inputs/outputs per route |
| 3 | Asset-inventory request | §4.2 | **BLOCKING** (fidelity-capable build) |
| 4 | Elicitation instrument | §4.3 | **BLOCKING** (WHY never inferred) |
| 5 | Multi-decider consolidation | §4.4 | converge voices → one confirmation |
| 6 | Gaps + confirmation doc | §4.5 | **BLOCKING** (review before compile) |
| 7 | Handoff compile | §5.3 | emit once 1–6 clear |

The two gates that were the v1 failures: the **asset-inventory request** (gate 3, never issued → F-020) and the **elicitation of the WHY** (gate 4, invented → F-002). Both are hard-blocking. Gate 6 is the client's pre-build review — the scoper does not hand off material it hasn't reflected back for confirmation.

## §4 — Stage detail

### §4.1 — Material Protocol (medium-agnostic, discovery-driven) · (req 2 · F-008a)

Principle: **the canon's slots define what is NEEDED; open discovery defines what EXISTS; the delta is the gap (§4.5).** Grounded in brand-audit method, which is a gap analysis between the *intended* brand and the *actual/perceived* brand. The scoper makes no assumption about the form of prior work. It does not run a checklist of expected mediums — it asks the owner to surface **whatever expresses or specifies the brand, in any form or state**, then inventories and classifies each thing by **function, never by medium**.

**Discovery prompt (open, not a medium checklist):** *"Show me everything the brand already has that shows what it is or how it should look/sound — finished or not, digital or physical, official or improvised."* Whatever returns is treated the same way.

**Per-thing record (functional, medium-blind):**

- **Role** — `CONSUMER` (live/applied expression), `REFERENCE` (a stated spec, any format), `RAW MATERIAL` (assets/fonts/fragments).
- **Freshness** — fresher/shipped vs older (the builder reconciles precedence: repo > external reference, shipped > stated; the scoper only tags it).
- **Layers carried** — which canon layers it touches: does it *state* the WHY? *carry* primitive values? *imply* rules?
- **Repo pointer** — where it now lives in the target repo (§5.2).
- **States (prose only)** — any positioning/voice it asserts, to **seed** elicitation (reading prose != extracting primitives — §5.1).

**Coverage assessment (the only "routing" that matters):** for each canon layer (INDEX/ESSENCE/PRIMITIVES/GRAMMAR), mark whether it is **sourceable from material / partially sourceable / elicit-only / empty**. This per-layer map — not an artifact-type label — drives intake depth and the gap doc. The CREATE doctrine (§2) covers the all-empty case (explicit instruction only).

### §4.2 — Asset Inventory (need-keyed, availability-blind) · (req 3 · F-020)

A **blocking precondition** (gate 3) — v1 never issued it, the single largest cause of the hollow build. The scoper issues an explicit, itemized request against **what the canon needs**, assuming **nothing about what the brand has or in what form**. The slots below are the canon's primitive taxonomy (brand-blind): *what a complete canon requires*, not *what we expect this brand to possess*.

For each slot the scoper records two things **separately**: **presence** and **fidelity/usability**.

**Fidelity rubric per primitive slot.** Vector-vs-raster is the binary that decides build-grade: a vector master scales and can regenerate every raster; a raster (PNG/JPG) or screenshot is fixed-resolution and **cannot be rebuilt into a master** — so it is a *reference*, not build-grade.

| Slot | build-grade | low-fi-reference | missing |
|---|---|---|---|
| Wordmark | vector master (AI/SVG/EPS/PDF-vector), clean paths | raster / screenshot | no file |
| Symbol / icon | vector master | raster | — |
| Primary lockup | vector master + clear-space + min-size | raster, no rules | — |
| Secondary / variants | vector master | raster | — |
| Monogram | vector master | raster | — |
| Seal / emblem | vector master | raster | — |

**Other build-grade requirements (request all; "not used" is valid for optional items):**

- **Vector formats:** AI (editable master), SVG (web), EPS/PDF (print/vendor).
- **Typefaces:** the named faces **and** their font files **and** proof of **commercial-use license**, per surface (desktop != web != app != broadcast). Named-only is a fidelity gap (the builder acquires — F-019). A typical agency handoff leaves the license with the agency — flag it.
- **Color:** RGB (screen) and CMYK (print) values; **spot/Pantone declared as authored truth** when the brand defines it so (not re-derived from OKLCH).
- **Clear-space and minimum-size** per mark slot.
- **Misuse list:** prohibited treatments (no stretch, no unapproved recolor, no unauthorized bold/italic/outline, etc.).

**Placement & frontier:** vectors embedded in any source (a PDF, a deck) are **pointed to** in-repo for the builder to extract (F-018), never sampled by the scoper. Everything routes into the target repo (§5.2), not Project knowledge. A missing or low-fidelity **core** asset is **fidelity-blocking** (MUST-HAVE), surfaced in §4.5 — because the build is judged on a real mark/fonts/imagery (F-022, §5.4).

**Inventory-request text (blind, ready to use; the scoper translates to the owner's language at runtime):**

> "To build the canon we need your visual inventory. For each item, tell us what exists and in what form. (a) Marks: wordmark, symbol, primary lockup, secondary lockups, monogram, seal — we prefer the editable vector master (AI), plus SVG, EPS/PDF and PNG. (b) Typefaces: the font names AND the font files AND proof of commercial-use license for the surfaces you use (web/desktop/app). (c) Color: RGB/CMYK values and, if any, the Pantone/spot colors that are your authored truth. (d) Existing rules: clear-space, minimum size, and a misuse list. (e) If you only have a screenshot or a low-res PNG of something, send it anyway — we'll mark it as a reference, not a build source. Don't send hex values from memory; point us at the source and we'll extract."

### §4.3 — Elicitation Instrument · (req 4 · F-002, F-008b)

The centerpiece, and the second great v1 failure (the WHY was invented). **Hard rule: the WHY is elicited, never inferred.** If the owner cannot answer, it becomes a gap to confirm — never a scoper guess. Depth follows the corollary (§2): **deep** where the answer lives only in a person's head; **point, don't elicit values** where it lives in material. The instrument is **organized by canon layer — the layer is the mapping** (req 4). Each question is traceable to a named framework (provenance §8).

**→ INDEX (where-to-start / glossary)**
- Describe the brand to someone who has never seen it, in one sentence. *(Wheeler — "Who are you? Who needs to know? How will they find out? Why should they care?")*
- What internal name/term does the team use for this brand and its sub-parts? *(Wheeler — shared vocabulary)*
- What was the original flagship product/service, and how did the brand grow to today? *(Brand Key — root strength)*

**→ ESSENCE (why / positioning / audience / voice / anti-promise) — fully elicited, ratified even if material states it:**
- Why does this brand exist, beyond making money? What would be lost if it disappeared? *(Aaker — core identity)*
- In whose eyes, and against which competitors and substitutes (including "do nothing"), does it compete? *(Brand Key — competitive environment)*
- Whom does it always serve best, defined by attitudes and values, not only demographics? *(Brand Key — target; Aaker)*
- What deep human truth or motivation does it tap? *(Brand Key — consumer insight)*
- Benefits: what it does functionally, what it makes one feel (emotional), what it says about the user (self-expressive)? *(Aaker — functional/emotional/self-expressive value; Brand Key — benefits)*
- The one thing the brand can claim that no competitor can. Complete: **"Our [offering] is the only [category] that [benefit]."** *(Neumeier — onliness statement / Zag)*
- What proof makes the promise credible (reason-to-believe)? *(Brand Key — RTB)*
- The essence in a few words — the soul that guides every action? *(Brand Key — brand essence; Aaker — essence/DNA)*
- **Anti-promise / never-words:** "What words would you **never** use to describe this brand?" and "What is the brand **not**, even if others in its category are?" *(brand-voice practice — SECONDARY)*
- **Opposing-characteristics scales (semantic differential):** place the brand between pairs — formal↔casual, accessible↔exclusive, bold↔prudent, warm↔cool, absolute↔nuanced. *(brand-voice practice — SECONDARY)*
- Resonance: what would make a customer feel part of a community/identity with the brand? *(Keller CBBE — resonance, top of the salience→performance/imagery→judgments/feelings→resonance pyramid)*

**Voice (register / lexicon / do's-and-don'ts) — subset of ESSENCE:**
- If the brand were a person, what personality? And as a celebrity, or someone at work? *(personification projective — SECONDARY)*
- How formal vs conversational? "I" or "we"? "Dear" or "Hi"? *(brand-voice practice — SECONDARY)*
- The **"This but never That"** formula: e.g. "playful but never rude," "informative but never condescending." *(tone guardrails — SECONDARY)*
- Brand lexicon: words/terms the brand always uses, and the banned-words list. *(brand lexicon — SECONDARY)*
- **Five personality dimensions as a checklist: Sincerity, Excitement, Competence, Sophistication, Ruggedness.** *(Jennifer L. Aaker, "Dimensions of Brand Personality," Journal of Marketing Research 34(3), 1997 — PRIMARY)*

**→ PRIMITIVES intent (the MEANING each color/typeface/mark should carry — NOT hex/geometry):**
- What should someone FEEL on seeing the primary color? What meaning/emotion should it carry? *(do not ask for hex — Aaker "brand as symbol"; "intent not value")*
- What should the typography communicate about character (heritage, modernity, warmth, authority)?
- What idea/story should the symbol/mark embody? What must it NOT suggest?
- Is there a recurring pattern/texture/graphic element, and what role does it play?
  *(These elicit INTENT; the builder extracts values.)*

**→ GRAMMAR (how / combination-rules / contrast / mark-selection / motion):**
- In which situations is each mark form used (wordmark vs symbol vs lockup)?
- Which color/figure-ground combinations are allowed, which forbidden?
- How does the brand behave in motion (if at all)?
- What makes something feel "off-brand"? *(Wheeler — governance; Neumeier — "will it help or hurt the brand?")*

### §4.4 — Multi-Decider & Unstructured Input · (req 5 · F-009)

Two generic, **blind** capabilities — encode multi-signer sign-off and partner politics as "more than one person decides," never as a named demographic.

**Multi-decider (RACI-shaped).** When several people have a say:
- Capture each voice's input per slot; **attribute** positions.
- For each canon slot, identify the **single Accountable** (the ratifier; the buck stops there) plus Consulted/Informed. More than one Accountable on a slot is a conflict to resolve.
- **Surface disagreement explicitly** — never paper over it; route each conflict to the gap doc (§4.5) as "needs one decision."
- Record **who ratifies** (→ `OWNERS` in the handoff).
- Session pattern: involve the decision-makers **without making the decision in-session**; keep the decider group small and fixed; never introduce new deciders mid-process. *(Wheeler — SECONDARY)*

**Unstructured input.** Owners ramble, jump, contradict. The scoper:
- Captures verbatim, then **clusters by canon layer**.
- Separates **stated fact / aspiration / anecdote**; marks contradictions as `liminal` to revisit.
- Reflects back a **structured version** for confirmation (confirm-back loop).

Output: one consolidated, per-slot confirmed set **plus** an explicit list of unresolved multi-decider conflicts.

### §4.5 — Gaps + Confirmation Doc · (req 6 · F-008c)

The **client-facing review artifact**, presented **before** compile (gate 6). No silent handoff. Three parts:

- **Found** — what intake captured, per canon layer: the ratified WHY, pointed-to material/assets, owner-provided values.
- **Missing** — gaps in **plain client language** (not `GAP-NNN`): "we don't yet have X," each with *why it matters* and a *proposed resolution* the owner can ratify in one pass. Tag severity (MUST-HAVE / SHOULD / NICE); **core-asset gaps are MUST-HAVE + fidelity-blocking** (§5.4).
- **To confirm** — explicit owner sign-off: the ratified WHY, every multi-decider conflict resolved to one answer, any owner-provided values, all "not used" declarations.

**Gate.** The owner reviews and confirms/corrects; only then does the scoper compile (§5.3).

**Two-ledger split.** This doc lists gaps in client language. The **builder** formalizes them into the canonical `GAP-NNN` ledger in `RESIDENT.md` at build time (`gap-protocol.md`). The scoper **never owns GAP IDs**; severity tags here seed the builder's formalization.

## §5 — Laws & contracts

### §5.1 — Scoper/Builder Frontier · (req 7 · F-003)

The dividing law. The scoper **elicits intent, observes applied expression, and points at sources**. The builder **extracts values and builds**.

| The scoper MAY | The scoper MUST NOT |
|---|---|
| Read stated prose (positioning, voice) to seed/ratify the WHY | Infer or finalize the WHY without owner ratification |
| Record values the **owner volunteers as truth** (e.g., declared Pantone) + authored flag | **Sample/measure** any primitive value (eyedropper a color, read geometry off a PDF/site) |
| Inventory which assets/forms exist and at what fidelity | Extract embedded vectors/images from sources (that is F-018, builder) |
| **Observe** applied design language and point at it (capture checklist below) | Harvest/transcribe the applied design into the canon (builder cosechs) |
| Point each source into the repo with role/freshness tags | Reconcile conflicts or invert source-of-truth precedence (builder) |
| List gaps in plain client language | Assign `GAP-NNN` IDs (builder formalizes) |

**Applied-design capture checklist (POINT-and-OBSERVE, not extract).** From brand-visual-audit method; the scoper records pointers + observations so the builder can later harvest:
- Inventory of existing applied expression (where the brand lives today) — URLs/files.
- Layout & composition: any recurring grid/margin system or template structure (observe, don't measure).
- Imagery/photography direction: style (lighting, color tone, composition, framing, editing), type (photo/illustration/3D), staged vs natural, what is avoided.
- Type-in-use: which faces appear in practice vs declared; hierarchy.
- Lived aesthetic / look-and-feel: the universal pattern — observe it, don't quantify it.
- Gap flags: where actual expression diverges from stated intent; mark each divergence as a GAP.
- Hand the builder the pointers (files/URLs) for real harvesting.

Rationale: the v1 scoper sampled an approximate color the builder later corrected from authored print values (F-003). The boundary: **measured/derived values = builder; stated intent + observed pointers = scoper.**

### §5.2 — Material Placement & Target Repo · (req 8 · F-006, F-007)

Preconditions, both v1 failures.

- **The scoper is passed (or establishes) the target repo.** v1 proposed a non-existent repo with no filesystem view (F-006). The handoff requires a real target repo path (or "create repo X"); the scoper does not invent a tree it can't see.
- **All source material goes INTO the target repo**, under a conventional location (`assets/` for binaries, `sources/` for references), as a **build precondition.** v1 pointed material at "Project knowledge," which the Code-side builder cannot read (F-007).
- **Chat→Code boundary:** the scoper is Chat-side with no filesystem (§1) — so placement is **an instruction to the person + a manifest in the handoff**, not a scoper file-op. The builder reads only the repo; nothing the build needs may live only in chat/Project knowledge.

### §5.3 — Handoff Contract · (req 9) — rewrites `handoff-format.md`

What the scoper passes to the builder: intake output → build input. It must be a **single machine-readable, deterministic, auditable block** — not prose. Established principle: LLMs do not infer intent from prose, diagrams, or Figma; they need explicit machine-readable contracts (deterministic structure, declared constraints, named responsibilities, predictable output shapes), with **generative rules as the bridge from intent to appearance**, and everything **auditable** (Lahdelma/Rythm; §8). The contract keeps the v1 single-block property.

**LLM-executable gap list — what the handoff must carry:**
1. **Deterministic structure** (not prose): one machine-readable block, predictable shape.
2. **Token-spine readiness (DTCG/OKLCH):** fields shaped for the builder's `$value`/`$type` spine, aliases, primitive/semantic tiering; OKLCH authored + HEX fallback derived. (W3C/DTCG Design Tokens 2025.10.)
3. **Declared constraints** explicitly (allowed/forbidden), not implicit.
4. **Named responsibilities** per canon layer (INDEX/ESSENCE/PRIMITIVES/GRAMMAR).
5. **Generative-rule seeds (`if/then`)** mapping context → token override (intent→appearance), where the owner stated rules.
6. **Accessibility/semantics** where they apply.
7. **GAP register:** the delta between needed slots and what exists, tracked and declared.
8. **Fidelity/provenance flags** per asset (build-grade vs reference vs missing) so the build can FAIL.
9. **Dual-legibility:** the handoff is the prose+intent seed; the builder emits the machine mirror.
10. **Auditability:** mode, owner ratification, and "not used" declarations explicit, so the build is auditable against intent.

**Handoff template (rewrites `handoff-format.md`):**

```
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
  Claude Design component library: default YES (per F-026); "no" only on explicit owner opt-out

NOTES: <…>
```

### §5.4 — Fidelity-Bar Linkage · (req 10 · F-022)

The bridge to the build's success criteria (WS5, out of scope here). The intake defines, **for THIS brand**, which assets/primitives are **core/must-have** (vs optional/not-used), so the build is judged on **fidelity** (is the real mark/fonts/imagery present and on-brand?), not mere rule-compliance. v1's gates all passed on asset-less scaffolding (F-022).

- **build-grade** = vector master + commercial-licensed font files + color profiles (incl. authored spot where declared) + clear-space/min-size + misuse list.
- The intake emits a **fidelity contract** (the handoff's CORE-ASSET FIDELITY CONTRACT block): the per-brand core-asset set (from which slots the brand actually uses, confirmed in §4.5), each marked present/build-grade vs gap/low-fi.
- The builder's fidelity gate consumes it: **a missing or low-fidelity core asset FAILS the build**, it does not "pass with gaps." Gap-logging continues; reaching "done" without core assets is the bug. Closes the loop F-020 (request) → F-022 (judge).

## §6 — Acceptance criteria (finding → concrete change)

| Finding | Change | File |
|---|---|---|
| F-024 | Delete Step 1 greenfield/brownfield; install ANALYZE/CREATE mode + per-layer coverage | SKILL.md |
| F-002 | Elicitation = blocking gate; WHY elicited+ratified, never inferred | SKILL.md |
| F-008 | Install 3 instruments (material protocol, questionnaire, gap+confirm doc) as gates | SKILL.md |
| F-009 | Multi-decider (RACI) + unstructured-input consolidation | SKILL.md |
| F-003 | Frontier: scoper never extracts primitives; point/observe-only | SKILL.md + handoff-format.md |
| F-006 | Require a real TARGET REPO; no invented trees | SKILL.md + handoff-format.md |
| F-007 | Material goes into the repo (manifest + person-instruction); never Project knowledge | SKILL.md + handoff-format.md |
| F-020 | Asset-inventory request (with fidelity rubric) as a blocking precondition | SKILL.md + handoff-format.md |
| F-022 (bridge) | Emit the per-brand core-asset fidelity contract in the handoff | handoff-format.md |

**Files touched: only** `brand-canon-scoper/SKILL.md` + `references/handoff-format.md`. Builder files **not** touched (scope §1). Single-block handoff property preserved.

## §7 — Open decisions & residual research

- **D1** — GAP split confirmed (scoper plain-language / builder `GAP-NNN`). RESOLVED.
- **D2** — Repo paths for placement: proposed `assets/` (binaries) + `sources/` (references). Confirm against the builder's existing template when Code rewrites; treat as builder-side convention.
- **D3** — Severity tagging: scoper pre-tags (MUST/SHOULD/NICE) to seed; builder authoritative. PROPOSED — confirm.
- **D4** — Durable: the **medium-agnostic discovery** principle (need=canon slots / exists=open discovery / delta=GAP) migrates to RESIDENT `## v2`.
- **Residual research caveat (handoff internals):** the LLM-consumable contract is modeled on the *principle* (deterministic, machine-readable, generative-rule, auditable) and on the DTCG token standard, both well-grounded. The exact internal field shapes of Lahdelma's `llm-component-schema` JSON were not byte-confirmed (repo not directly fetched during research). The handoff here is intake-shaped, not a component schema, so this does not block §5.3; if Code later wants the machine mirror to align literally with that schema, re-fetch `schema.json` before freezing field shapes.

## §8 — Provenance

**Brand-strategy frameworks (PRIMARY):** Unilever **Brand Key** (root strength, competitive environment, target, consumer insight, benefits, RTB, essence); **Keller** Customer-Based Brand Equity / resonance pyramid (salience → performance/imagery → judgments/feelings → resonance); **David Aaker** brand identity (core/extended identity, functional/emotional/self-expressive value, brand-as-symbol); **Jennifer L. Aaker**, "Dimensions of Brand Personality," *JMR* 34(3), 1997 (Sincerity/Excitement/Competence/Sophistication/Ruggedness); **Marty Neumeier** (*The Brand Gap*, *Zag*) onliness statement; **Alina Wheeler**, *Designing Brand Identity* (the four questions; governance; decider discipline).

**Technical standards (PRIMARY):** W3C/DTCG **Design Tokens Specification 2025.10** (first stable, 28 Oct 2025) — `$value`/`$type`, aliases, primitive/semantic/component tiering, `application/design-tokens+json`; **OKLCH** perceptual color spine with HEX fallback. **Lahdelma**, `llm-component-schema-template` + writeups, extending **Rythm** ("AI Design Systems: Why Tokens, Schema & Generative Rules Matter Now") — LLM-consumable contracts, generative rules as the intent→appearance bridge, auditability.

**SECONDARY (marked):** agency brand-discovery guides and brand-voice practice (question inventories, never-words prompt, opposing-characteristics scales, "This but never That," personification, two-phase discovery, confirm-back); logo file-format and font-licensing guides (vector-vs-raster, commercial-license requirement); RACI for ratifier identification. Public brand manuals (e.g. easyGroup) used only as examples of spot-as-authored-truth + misuse rules, naming no sector/client.

**Excluded by instruction:** LLM-visibility / Generative Engine Optimization / "AI brand visibility" tooling — adjacent, off-topic.
