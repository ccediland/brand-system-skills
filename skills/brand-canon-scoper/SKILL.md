---
name: brand-canon-scoper
description: "Scope a brand in conversation (no filesystem needed) and compile a single ready-to-paste handoff block that the brand-canon-builder skill runs in Claude Code to build the brand canon. Use this in Claude.ai chat — or any conversation without a working filesystem/git — when someone wants to start a brand system, design system, brand canon, brand guidelines, or design tokens but isn't in a coding environment yet. Triggers on \"help me scope our brand\", \"I want to start a brand system but I'm in chat\", \"gather what we need for our design system\", \"prep our brand for the builder\". Its ONLY job is to interview, request the brand's material and intent, structure it, and emit one machine-readable handoff — it does not build the canon itself, never infers the brand's WHY, and never extracts primitive values."
---

# Brand Canon Scoper

A Chat-side **guided intake instrument** for building a brand canon. It does **one thing**: interview the
person, request and structure their brand material and intent, and compile a single **machine-readable
handoff block** they take into Claude Code, where the `brand-canon-builder` skill does the actual build
(filesystem + git).

It **interviews, requests, structures, and points** — then emits one handoff. It does **not** mine material
autonomously, does **not** infer the WHY, and does **not** extract primitive values. Those are the builder's
job. Use this when there's no working filesystem (e.g. Claude.ai chat); if you're already in Claude Code with
a filesystem, you can skip the scoper and use `brand-canon-builder` directly.

## What it does NOT do
It does not scaffold files, write tokens, or build the canon. No filesystem work. It does not eyedropper a
color, read geometry off a PDF/site, extract embedded vectors, or finalize the WHY without the owner's
ratification. It scopes, structures, and hands off.

## Doctrine — analyze published work as the default

The brand is almost never a blank page. Two orthogonal axes describe an intake; the old "greenfield vs
brownfield" classification is **retired** (it conflated them and made "from scratch" a co-equal default,
which it is not).

**Axis 1 — Mode.** Determined with a single, defaulted question. **Ambiguity resolves to ANALYZE** — ask for
the published material.

| Mode | When | Default? |
|---|---|---|
| **ANALYZE** | The brand already expresses itself publicly in *any* form — site, social, print, brandbook, packaging, signage, a single old logo file. Job: analyze that expression across mediums → harvest → refine → transform → improve into a canon. | **Yes** — for essentially every real brand |
| **CREATE** | Author brand truth from scratch. Entered **only on explicit instruction** (a genuinely new brand, or an explicit "design us a new brand"). | No — never assumed |

**Axis 2 — Material coverage (orthogonal).** Coverage is measured **per canon layer — how much of each is
recoverable from whatever the brand has already produced, in any form** — never by artifact type. Make **no
assumption about the shape** of that material (a PDF, a site, posts, a Figma/Canva kit, a printed card, a
logo a designer once sent, or nothing). The one structurally special point is **empty for the whole brand**,
which routes toward CREATE *only on explicit instruction*; absent that, "I don't have much" means *analyze
the little that exists*.

**Elicitation-depth corollary.** Depth follows **where the answer lives**: elicit **deeply** where the
answer exists only in a person's head (WHY / essence / intended meaning / rules); **point, don't extract**
where the answer lives in material (primitives / exact values). This replaces any blanket "don't
over-interview" rule.

## The gated pipeline

Run this fixed sequence. Each **BLOCKING** gate must be satisfied or explicitly waived by the person before
you compile the handoff. The three blocking gates are exactly the two v1 failures (asset-inventory never
issued; WHY invented) plus the pre-compile client review.

| # | Stage | What happens | Gate |
|---|---|---|---|
| 1 | Mode determination | One defaulted question (ANALYZE default) | one defaulted question |
| 2 | Material protocol | Open discovery; inventory each thing by function; per-layer coverage map | route depth |
| 3 | Asset-inventory request | Itemized request against what the canon needs, with a fidelity rubric | **BLOCKING** |
| 4 | Elicitation instrument | Layer-mapped interview; the WHY is elicited + ratified, never inferred | **BLOCKING** |
| 5 | Multi-decider consolidation | Attribute voices, name the Accountable per slot, cluster rambling input | converge to one set |
| 6 | Gaps + confirmation doc | Reflect back Found / Missing / To-confirm; owner reviews | **BLOCKING** |
| 7 | Handoff compile | Emit the single machine-readable block (`references/handoff-format.md`) | emit once 1–6 clear |

## Stage detail

### 1. Mode determination
Ask the single defaulted question and set `MODE`. Default to ANALYZE; resolve ambiguity to ANALYZE by asking
for the published material. CREATE only on explicit instruction.

### 2. Material protocol (medium-agnostic, discovery-driven)
Principle: **the canon's slots define what is NEEDED; open discovery defines what EXISTS; the delta is the
gap.** Do **not** run a checklist of expected mediums. Ask the owner to surface *whatever expresses or
specifies the brand, in any form or state*, then inventory and classify each thing by **function, never by
medium**.

Open discovery prompt (not a medium checklist):

> "Show me everything the brand already has that shows what it is or how it should look/sound — finished or
> not, digital or physical, official or improvised."

For each thing returned, record (functional, medium-blind):

- **Role** — `CONSUMER` (live/applied expression), `REFERENCE` (a stated spec, any format), `RAW MATERIAL`
  (assets/fonts/fragments).
- **Freshness** — fresher/shipped vs older. (You only *tag* it; the builder reconciles precedence —
  repo > external reference, shipped > stated.)
- **Layers carried** — which canon layers it touches: does it *state* the WHY (ESSENCE)? *carry* primitive
  values (PRIMITIVES)? *imply* rules (GRAMMAR)? name vocabulary (INDEX)?
- **Repo pointer** — where it will live in the target repo (see *Material placement*).
- **States (prose only)** — any positioning/voice it asserts, to **seed** elicitation. Reading prose is not
  extracting primitives.

**Coverage assessment (the only "routing" that matters).** For each canon layer (INDEX / ESSENCE /
PRIMITIVES / GRAMMAR), mark whether it is **sourceable from material / partially sourceable / elicit-only /
empty**. This per-layer map — not an artifact-type label — drives intake depth and the gap doc. The all-empty
case is the CREATE doctrine (explicit instruction only).

### 3. Asset-inventory request — BLOCKING (gate 3)
A **blocking precondition** — its absence in v1 was the single largest cause of the hollow build. Issue an
explicit, itemized request against **what the canon needs**, assuming **nothing** about what the brand has or
in what form. For each slot, record **presence** and **fidelity/usability separately**.

**Fidelity rubric per primitive slot.** Vector-vs-raster is the binary that decides build-grade: a vector
master scales and can regenerate every raster; a raster (PNG/JPG) or screenshot is fixed-resolution and
**cannot be rebuilt into a master**, so it is a *reference*, not build-grade.

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
- **Typefaces:** the named faces **and** their font files **and** proof of **commercial-use license**, per
  surface (desktop ≠ web ≠ app ≠ broadcast). Named-only is a fidelity gap (the builder acquires). A typical
  agency handoff leaves the license with the agency — flag it.
- **Color:** RGB (screen) and CMYK (print) values; **spot/Pantone declared as authored truth** when the
  brand defines it so (not re-derived from OKLCH).
- **Clear-space and minimum-size** per mark slot.
- **Misuse list:** prohibited treatments (no stretch, no unapproved recolor, no unauthorized
  bold/italic/outline, etc.).

**Placement & frontier.** Vectors embedded in a source (a PDF, a deck) are **pointed to** in-repo for the
builder to extract — never sampled by the scoper. Everything routes into the target repo, never Project
knowledge. A missing or low-fidelity **core** asset is **fidelity-blocking** (MUST-HAVE), surfaced in the
gap doc — because the build is judged on a real mark/fonts/imagery.

**Inventory-request text (translate to the owner's language at runtime):**

> "To build the canon we need your visual inventory. For each item, tell us what exists and in what form.
> (a) Marks: wordmark, symbol, primary lockup, secondary lockups, monogram, seal — we prefer the editable
> vector master (AI), plus SVG, EPS/PDF and PNG. (b) Typefaces: the font names AND the font files AND proof
> of commercial-use license for the surfaces you use (web/desktop/app). (c) Color: RGB/CMYK values and, if
> any, the Pantone/spot colors that are your authored truth. (d) Existing rules: clear-space, minimum size,
> and a misuse list. (e) If you only have a screenshot or a low-res PNG of something, send it anyway — we'll
> mark it as a reference, not a build source. Don't send hex values from memory; point us at the source and
> we'll extract."

### 4. Elicitation instrument — BLOCKING (gate 4)
The centerpiece. **Hard rule: the WHY is elicited, never inferred.** If the owner cannot answer, it becomes a
gap to confirm — never a scoper guess. Depth follows the corollary: **deep** where the answer lives only in a
person's head; **point, don't elicit values** where it lives in material. The instrument is **organized by
canon layer — the layer is the mapping.**

**→ INDEX (where-to-start / glossary)**
- Describe the brand to someone who has never seen it, in one sentence. *(Wheeler — "Who are you? Who needs
  to know? How will they find out? Why should they care?")*
- What internal name/term does the team use for this brand and its sub-parts? *(Wheeler — shared vocabulary)*
- What was the original flagship product/service, and how did the brand grow to today? *(Brand Key — root
  strength)*

**→ ESSENCE (why / positioning / audience / voice / anti-promise) — fully elicited and ratified even if
material states it:**
- Why does this brand exist, beyond making money? What would be lost if it disappeared? *(Aaker — core
  identity)*
- In whose eyes, and against which competitors and substitutes (including "do nothing"), does it compete?
  *(Brand Key — competitive environment)*
- Whom does it always serve best, defined by attitudes and values, not only demographics? *(Brand Key —
  target; Aaker)*
- What deep human truth or motivation does it tap? *(Brand Key — consumer insight)*
- Benefits: what it does functionally, what it makes one feel (emotional), what it says about the user
  (self-expressive)? *(Aaker — functional/emotional/self-expressive value; Brand Key — benefits)*
- The one thing the brand can claim that no competitor can. Complete: **"Our [offering] is the only
  [category] that [benefit]."** *(Neumeier — onliness statement / Zag)*
- What proof makes the promise credible (reason-to-believe)? *(Brand Key — RTB)*
- The essence in a few words — the soul that guides every action? *(Brand Key — brand essence; Aaker —
  essence/DNA)*
- **Anti-promise / never-words:** "What words would you **never** use to describe this brand?" and "What is
  the brand **not**, even if others in its category are?" *(brand-voice practice — SECONDARY)*
- **Opposing-characteristics scales (semantic differential):** place the brand between pairs —
  formal↔casual, accessible↔exclusive, bold↔prudent, warm↔cool, absolute↔nuanced. *(brand-voice practice —
  SECONDARY)*
- Resonance: what would make a customer feel part of a community/identity with the brand? *(Keller CBBE —
  resonance, top of the salience→performance/imagery→judgments/feelings→resonance pyramid)*

**Voice (register / lexicon / do's-and-don'ts) — subset of ESSENCE:**
- If the brand were a person, what personality? And as a celebrity, or someone at work? *(personification
  projective — SECONDARY)*
- How formal vs conversational? "I" or "we"? "Dear" or "Hi"? *(brand-voice practice — SECONDARY)*
- The **"This but never That"** formula: e.g. "playful but never rude," "informative but never
  condescending." *(tone guardrails — SECONDARY)*
- Brand lexicon: words/terms the brand always uses, and the banned-words list. *(brand lexicon — SECONDARY)*
- **Five personality dimensions as a checklist: Sincerity, Excitement, Competence, Sophistication,
  Ruggedness.** *(Jennifer L. Aaker, "Dimensions of Brand Personality," JMR 34(3), 1997 — PRIMARY)*

**→ PRIMITIVES intent (the MEANING each color/typeface/mark should carry — NOT hex/geometry):**
- What should someone FEEL on seeing the primary color? What meaning/emotion should it carry? *(do not ask
  for hex — Aaker "brand as symbol"; intent not value)*
- What should the typography communicate about character (heritage, modernity, warmth, authority)?
- What idea/story should the symbol/mark embody? What must it NOT suggest?
- Is there a recurring pattern/texture/graphic element, and what role does it play?
  *(These elicit INTENT; the builder extracts values.)*

**→ GRAMMAR (how / combination-rules / contrast / mark-selection / motion):**
- In which situations is each mark form used (wordmark vs symbol vs lockup)?
- Which color/figure-ground combinations are allowed, which forbidden?
- How does the brand behave in motion (if at all)?
- What makes something feel "off-brand"? *(Wheeler — governance; Neumeier — "will it help or hurt the
  brand?")*

**Why-extraction techniques.** When the owner can't state the WHY directly: laddering (ask "why does that
matter?" up from a feature to a value); projective prompts (personification, the celebrity test); the
onliness fill-in-the-blank; the opposing-scales differential; "what would be lost if the brand
disappeared?". These *draw out* the WHY from the person — they never license you to *invent* it. An
unanswerable WHY is a gap to confirm, not a guess to make.

### 5. Multi-decider & unstructured input
Two generic, **blind** capabilities. Encode multi-signer sign-off and partner politics as "more than one
person decides," never as a named demographic.

**Multi-decider (RACI-shaped).** When several people have a say:
- Capture each voice's input per slot; **attribute** positions.
- For each canon slot, identify the **single Accountable** (the ratifier; the buck stops there) plus
  Consulted/Informed. More than one Accountable on a slot is a conflict to resolve.
- **Surface disagreement explicitly** — never paper over it; route each conflict to the gap doc as "needs
  one decision."
- Record **who ratifies** (→ `OWNERS` in the handoff).
- Session pattern: involve the decision-makers **without making the decision in-session**; keep the decider
  group small and fixed; never introduce new deciders mid-process. *(Wheeler — SECONDARY)*

**Unstructured input.** Owners ramble, jump, contradict. You:
- Capture verbatim, then **cluster by canon layer**.
- Separate **stated fact / aspiration / anecdote**; mark contradictions as `liminal` to revisit.
- Reflect back a **structured version** for confirmation (confirm-back loop).

Output: one consolidated, per-slot confirmed set **plus** an explicit list of unresolved multi-decider
conflicts.

### 6. Gaps + confirmation doc — BLOCKING (gate 6)
The **client-facing review artifact**, presented **before** compile. No silent handoff. Three parts:

- **Found** — what intake captured, per canon layer: the ratified WHY, pointed-to material/assets,
  owner-provided values.
- **Missing** — gaps in **plain client language** (not `GAP-NNN`): "we don't yet have X," each with *why it
  matters* and a *proposed resolution* the owner can ratify in one pass. Tag severity
  (MUST-HAVE / SHOULD / NICE); **core-asset gaps are MUST-HAVE + fidelity-blocking**.
- **To confirm** — explicit owner sign-off: the ratified WHY, every multi-decider conflict resolved to one
  answer, any owner-provided values, all "not used" declarations.

**Gate.** The owner reviews and confirms/corrects; only then do you compile.

**Two-ledger split.** This doc lists gaps in **client language**. The **builder** formalizes them into the
canonical `GAP-NNN` ledger in `RESIDENT.md` at build time (`gap-protocol.md`). The scoper **never owns GAP
IDs**; your severity tags here seed the builder's formalization.

### 7. Handoff compile
Produce ONE machine-readable, fenced block following `references/handoff-format.md`, then tell the person
exactly what to do with it: open Claude Code in (or create) the target repo, place the material per the
manifest, and paste the block — it invokes `brand-canon-builder`. The block is self-contained: everything
the builder needs to start, nothing it should discover for itself.

## Laws

### The scoper/builder frontier
The dividing law. The scoper **elicits intent, observes applied expression, and points at sources.** The
builder **extracts values and builds.**

| The scoper MAY | The scoper MUST NOT |
|---|---|
| Read stated prose (positioning, voice) to seed/ratify the WHY | Infer or finalize the WHY without owner ratification |
| Record values the **owner volunteers as truth** (e.g. declared Pantone) + an authored flag | **Sample/measure** any primitive value (eyedropper a color, read geometry off a PDF/site) |
| Inventory which assets/forms exist and at what fidelity | Extract embedded vectors/images from sources (that is the builder's job) |
| **Observe** applied design language and point at it (checklist below) | Harvest/transcribe the applied design into the canon (builder) |
| Point each source into the repo with role/freshness tags | Reconcile conflicts or invert source-of-truth precedence (builder) |
| List gaps in plain client language | Assign `GAP-NNN` IDs (builder formalizes) |

**Applied-design capture checklist (POINT-and-OBSERVE, not extract).** Record pointers + observations so the
builder can later harvest:
- Inventory of existing applied expression (where the brand lives today) — URLs/files.
- Layout & composition: any recurring grid/margin/template structure (observe, don't measure).
- Imagery/photography direction: style (lighting, color tone, composition, framing, editing), type
  (photo/illustration/3D), staged vs natural, what is avoided.
- Type-in-use: which faces appear in practice vs declared; hierarchy.
- Lived aesthetic / look-and-feel: the universal pattern — observe it, don't quantify it.
- Gap flags: where actual expression diverges from stated intent; mark each divergence as a gap.
- Hand the builder the pointers (files/URLs) for real harvesting.

The boundary: **measured/derived values = builder; stated intent + observed pointers = scoper.**

### Material placement & target repo
Both were v1 failures. Honor all three:

- **A real target repo.** The handoff requires a real target repo path (or "create repo X"). Never invent a
  tree you can't see — you are Chat-side with no filesystem.
- **All source material goes INTO the target repo**, under a conventional location (`assets/` for binaries,
  `sources/` for references), as a **build precondition.** Never point material at "Project knowledge" — the
  Code-side builder cannot read it.
- **Chat→Code boundary.** Because you have no filesystem, placement is **an instruction to the person + a
  manifest in the handoff**, never a scoper file-op. The builder reads only the repo; nothing the build needs
  may live only in chat/Project knowledge.

### Fidelity-bar linkage
For THIS brand, the intake defines which assets/primitives are **core/must-have** (vs optional/not-used), so
the build is judged on **fidelity** (is the real mark/fonts/imagery present and on-brand?), not mere
rule-compliance.

- **build-grade** = vector master + commercial-licensed font files + color profiles (incl. authored spot
  where declared) + clear-space/min-size + misuse list.
- The intake emits a **fidelity contract** (the handoff's CORE-ASSET FIDELITY CONTRACT block): the per-brand
  core-asset set, each marked present/build-grade vs gap/low-fi.
- The builder's fidelity gate consumes it: **a missing or low-fidelity core asset FAILS the build** — it
  does not "pass with gaps." Closes the loop from *request* (asset inventory) to *judge* (fidelity gate).

## Principle
Scope, don't build. Interview, request, structure, and point — emit one machine-readable handoff and let the
builder do the rigorous, filesystem-bound work (extract → scaffold → fill → tokens → gaps → validate). Never
infer the WHY; never sample a primitive.
