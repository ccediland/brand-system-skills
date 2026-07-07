---
name: brand-canon-scoper
description: "Scope a brand in conversation (no filesystem needed): interview the owner, structure their brand material and intent, detect brand posture and horizons, and compile a single handoff block the brand-canon-builder skill runs in Claude Code to build the brand canon. Use it when someone wants to start a brand system, design system, brand canon, brand guidelines, or design tokens but isn't in a coding environment yet. Triggers on \"help me scope our brand\", \"I want to start a brand system but I'm in chat\", \"gather what we need for our design system\", \"prep our brand for the builder\". It emits the handoff plus a client instrument; it does not build the canon or promote an observation to a brand rule without owner confirmation. Do NOT trigger for brand-voice-only guideline generation — writing voice guidelines for an existing brand as the whole task is a narrower sibling, not this canon pipeline; \"brand guidelines\" still triggers when it is part of scoping a full brand canon."
---

# Brand Canon Scoper

A Chat-side guided intake instrument for building a brand canon. It does one thing: interview the
person, request and structure their brand material and intent, detect posture + horizons, resolve every
dimension to a known state, and compile a single machine-readable handoff block they take into Claude
Code, where the `brand-canon-builder` skill does the actual build (filesystem + git).

It interviews, requests, structures, detects, and points — then emits one handoff plus a client-facing
instrument. It does not mine material autonomously, does not infer the WHY, does not extract primitive
values, and does not promote an observation to a brand rule without owner confirmation. Those are the
builder's job or require the owner. Use this when there's no working filesystem (e.g. Claude.ai chat);
if you're already in Claude Code with a filesystem, you can skip the scoper and use
`brand-canon-builder` directly.

## Reference materials — load when relevant
This SKILL.md is the workflow + gates. Load the reference only when its stage is reached:
- `references/handoff-format.md` — the handoff contract: the single self-contained fenced block this skill compiles at Stage 7 (two-track manifest with acquire routes · six-value provenance spine · directives registry · WHY/WHAT/HOW/DIMENSION-MAP/POSTURE/HORIZONS carriers). Load when compiling or validating the handoff.
- `references/process-discipline.md` — the TEMPO doctrine (TA-1) + the verify-the-exact-claim rationale (TA-4); load at the gated pipeline's proceed-points.

## What it does NOT do
It does not scaffold files, write tokens, or build the canon. No filesystem work. It does not eyedropper a
color, read geometry off a PDF/site, extract embedded vectors, or finalize the WHY without the owner's
ratification. It does not crystallize an observed one-off as a brand line. It scopes, structures, detects,
and hands off.

**Non-trigger (vs brand-voice).** It does not engage for brand-voice-only guideline generation — a request to
write tone-of-voice / voice guidelines for a brand (new or existing), with no full canon to scope, is a
narrower sibling task — the discriminator is whole-task-vs-part-of-canon, never brand age. The scoper engages only when the job is scoping a full brand canon (where voice / "brand
guidelines" is one part of the whole). Mirror guard: voice-as-the-whole-task is out of scope, but a
full-canon request that *includes* voice IS in scope — this clause must never suppress legitimate canon
scoping (a false-negative trigger is as much a defect as a false fire).

## Rectoral rule — anti-determinism
Every part of this skill reasons in general capability classes, not a single-brand instance. The dimension
map, the posture space, the horizon taxonomy, the epistemic states — all are mechanisms that span every
brand; a given brand is only an illustration that fills them in. Never hardcode a brand-specific answer
into the method.

## The provenance spine (every datum carries it)
Generalizes v2's `authored|derived` flag. Every datum the scoper records carries four fields:
- **source** — where it came from (declared-spec / owner-stated / computed-css / … / `proposed` = the quarantine channel: scoper-drafted at the owner's request — labeled, never canon).
- **confidence** — the six-value ladder (wire form + tiers in `references/handoff-format.md`): `hypothesis` →
  `corroborated` · `verified-primary` → ratified: `proxy-relayed` (factual only) · `handoff-confirmed` (builder-side label, never scoper-stamped) · `owner-confirmed` (witnessed).
- **owner** — who ratifies it (the Accountable for that slot).
- **freshness** — the pinned value enum `shipped | stated-old` (`shipped` = fresh/live; `stated-old` =
  declared but not the current shipped reality). The same two literals are used at every hop downstream.

Hard rule: **observed expression enters as `hypothesis`, never as a finding.** Promoting a one-off to a
brand *line* requires tier-2 ratification (`proxy-relayed` for factual slots only). A datum never crosses the
handoff above its earned status — a scoper-authored value travels as `proposed`+`hypothesis`+gap, never unlabeled.

## Doctrine — analyze published work as the default

The brand is almost never a blank page. Two orthogonal axes describe an intake; the old "greenfield vs
brownfield" classification is retired (it conflated them and made "from scratch" a co-equal default,
which it is not).

Axis 1 — Mode. Determined with a single, defaulted question. Ambiguity resolves to ANALYZE — ask for
the published material.

| Mode | When | Default? |
|---|---|---|
| **ANALYZE** | The brand already expresses itself publicly in *any* form — site, social, print, brandbook, packaging, signage, a single old logo file. Job: analyze that expression across mediums then harvest, refine, transform, improve into a canon. | Yes — for essentially every real brand |
| **CREATE** | Author brand truth from scratch. Entered only on explicit instruction (a genuinely new brand, or an explicit "design us a new brand"). | No — never assumed |

Axis 2 — Material coverage (orthogonal). Coverage is measured per canon layer — how much of each is
recoverable from whatever the brand has already produced, in any form — never by artifact type. Make no
assumption about the shape of that material (a PDF, a site, posts, a Figma/Canva kit, a printed card, a
logo a designer once sent, or nothing). The one structurally special point is empty for the whole brand,
which routes toward CREATE *only on explicit instruction*; absent that, "I don't have much" means *analyze
the little that exists*.

Elicitation-depth corollary. Depth follows where the answer lives: elicit deeply where the
answer exists only in a person's head (WHY / essence / intended meaning / rules / posture); point, don't
extract where the answer lives in material (primitives / exact values). This replaces any blanket "don't
over-interview" rule.

## The gated pipeline

Run this fixed sequence. Each BLOCKING gate must be satisfied or explicitly waived by the person before
you compile the handoff. The blocking gates trace to the two v1 failures (asset-inventory never
issued; WHY invented) plus the single client-surface flow — the intake (3.5), the pre-compile review (6),
and the Final Brand Brief approval (7a).

**TEMPO doctrine (TA-1).** Scoping is multi-session / multi-day; the BLOCKING gates above always run; progress
is **evidence-of-process** (gated DELIVERABLEs exist), **never wall-clock** (`references/process-discipline.md`).
**Assumption ledger (TA-3):** every proceed-assumption surfaces as an explicit CONFIRM line (gate-3.5) — nothing inferred silently.

| # | Stage | What happens | Gate | DELIVERABLE |
|---|---|---|---|---|
| 1 | Mode determination | One defaulted question (ANALYZE default) | one defaulted question | mode card (mode + rationale) · stage 1 of 9 |
| 2 | Material protocol | Brandbook-/social-first discovery; inventory each thing by function with epistemic + freshness tags; the dimension map | route depth | dimension map + material inventory · stage 2 of 9 |
| 3 | Asset-inventory request | Itemized request against what the canon needs, with a fidelity rubric | BLOCKING | itemized asset request · stage 3 of 9 |
| 3.5 | Discovery & Intake Instrument | fillable doc, every line CONFIRM/ASK/REQUEST, emission default; chat resolves, never replaces | BLOCKING | Discovery & Intake Instrument — client instrument v1 · stage 4 of 9 |
| 4 | Elicitation instrument | Frame-generated interview (runs the elicitation machine); WHY elicited + ratified never inferred; plus posture detection + horizon detection | BLOCKING | elicited WHY/ESSENCE record · stage 5 of 9 |
| 5 | Multi-decider consolidation | Attribute voices, name the Accountable per slot, cluster rambling input | BLOCKING | consolidated per-slot set + conflicts list (OWNERS) · stage 6 of 9 |
| 6 | Three-surface review | Internal status + external client instrument + living questions doc; owner reviews | BLOCKING | External client instrument — client instrument v2 · stage 7 of 9 |
| 7a | Final Brand Brief | the client review resolved to ratified-complete; the BLOCKING client approval | BLOCKING | ratified Final Brand Brief — client instrument vFinal (signed) · stage 8 of 9 |
| 7b | Handoff compile | emit the single machine block (`references/handoff-format.md`) AFTER 7a sign-off | emit once 7a clears | machine handoff block · stage 9 of 9 |

No gate clears without emitting its DELIVERABLE, dated (ISO) and versioned. The 3.5 / 6 / 7a deliverables are the SAME client instrument at successive versions (v1 → v2 → vFinal), per §6 "One client-surface flow".

## Stage detail

### 1. Mode determination
Ask the single defaulted question and set `MODE`. Default to ANALYZE; resolve ambiguity to ANALYZE by asking
for the published material. CREATE only on explicit instruction.

### 2. Material protocol (medium-agnostic, discovery-driven)
Principle: the canon's slots define what is NEEDED; open discovery defines what EXISTS; the delta is the
gap. Do not run a checklist of expected mediums. Ask the owner to surface *whatever expresses or
specifies the brand, in any form or state*, then inventory and classify each thing by function, never by
medium.

Discovery order (brandbook-first, social-first, stale-vs-fresh). Probe in a deliberate order so the
highest-authority and the freshest sources surface first, and so staleness is caught:
1. **Brandbook / stated spec first** — "Is there a brand book, style guide, or any document that *states*
   the rules (named fonts, declared colors)?" This is the brand's declared truth (highest authority for
   intent), but it may be stale — tag its freshness.
2. **Shipped/social next** — "Where does the brand live *today* — the live site, the active social feeds,
   the most recent packaging?" Shipped expression is the freshest evidence of practice, but it is
   *observed*, so it enters as `hypothesis` (confidence), not as a finding.
3. **Stale-vs-fresh reconciliation (tag only).** When a brandbook says one thing and shipped work shows
   another, you only *tag* the divergence (freshness + a gap flag); the builder reconciles precedence
   (repo > external reference; shipped > stated for specifics; identity/stated > shipped for meaning).
4. **Verify-the-exact-claim (TA-4).** A blocked/failed retrieval is NEVER a positive status — verified/liveness needs a successful read of the exact thing claimed, not an adjacent signal;
   it stays `hypothesis` or a GAP, never `shipped`/`corroborated` on a guess (no new status word; `references/process-discipline.md`).

Open discovery prompt (not a medium checklist):

> "Show me everything the brand already has that shows what it is or how it should look/sound — finished or
> not, digital or physical, official or improvised. Start with any brand book or style guide, then where the
> brand lives today (site, social, packaging)."

For each thing returned, record (functional, medium-blind):

- **Role** — `CONSUMER` (a live/applied surface the brand ships today — site, app, active feed), `REFERENCE`
  (a stated spec, any format), `RAW MATERIAL` (assets/fonts/fragments). A CONSUMER is carried in the handoff's
  CONSUMERS track by its `url` (reachability-verified, no checksum); REFERENCE/RAW are placed in-repo and
  checksummed in the ASSETS track.
- **Provenance** — the four-field spine: source · confidence (`hypothesis` for anything observed) · owner ·
  freshness (the pinned enum `shipped | stated-old`). You only *tag*; the builder reconciles precedence.
- **Layers carried** — which canon layers it touches: does it *state* the WHY (ESSENCE)? *carry* primitive
  values (PRIMITIVES)? *imply* rules (GRAMMAR)? name vocabulary (INDEX)?
- **Repo pointer** — where it will live in the target repo (see *Material placement*).
- **States (prose only)** — any positioning/voice it asserts, to seed elicitation. Reading prose is not
  extracting primitives, and what it asserts enters as `hypothesis` until the owner confirms it.

The dimension map (the routing mechanism). Replaces the v2 per-layer coverage map with the v3
anti-determinism mechanism: **every brand dimension resolves explicitly to exactly one state — none is
skipped silently.**

| State | Meaning | What it requires |
|---|---|---|
| **filled** | sourceable from material or owner, with its epistemic status earned | a datum with the four-field spine |
| **not-used** | the brand genuinely does not use this dimension | an explicit owner declaration |
| **tagged-gap** | needed but absent or unconfirmed | a gap with severity + a provenance tag |

The dimensions are not a closed checklist — they are an open space seeded by the canon layers (INDEX /
ESSENCE / PRIMITIVES / GRAMMAR), the treatments, the horizons, and the posture, and GENERATED per client by
the frame step of the elicitation machine (`references/elicitation-machine.md` — load its § The frame here). A dimension you cannot
resolve to one of the three states is itself a `tagged-gap`, never an omission; an unelicited one is BORN a
gap. This map drives intake depth, the client review, and the handoff. The all-empty case is the CREATE doctrine (explicit instruction only).

The scoper owns completeness. The builder can only STOP on a dimension that is *present* in the map but
unresolved; an un-enumerated dimension is the scoper's own defect (it lands as a `handoff-defect` gap), never
a silent pass. One dimension is named explicitly so it can never be dropped: **applied-expression/social**
resolves to `filled(media-attached)` / `not-used(owner-declared)` / `tagged-gap` — a live applied surface is
carried in the CONSUMERS track, static applied media in ASSETS, and if neither exists the dimension is a gap.

A second dimension is PERMANENT and not brand-enumerated: **consultation-surface: always-required** — unlike
every other dimension it never resolves to `filled` / `not-used` / `tagged-gap`; it is fixed always-required,
because gate 5 (the consultation / external-review framing) runs for every brand, even a stated sole-decider (RV-4).

Named regulatory instruments — elicited-or-GAP (EH-2). When the brand has regulatory exposure (surfaced at
§4a and carried in the handoff POSTURE `regulatory:` field), any NAMED legal/regulatory instrument that binds
the brand's claims — a statute, standard, code, or naming authority — is ELICITED from the owner or their
material (`source: owner-stated`, cited to the owner utterance or a manifest item), or carried as an explicit
`tagged-gap` for the builder. Like all posture data its `confidence` stays `hypothesis` until the gate-6
promote — `owner-stated` is the SOURCE axis, not a ratification. The scoper NEVER asserts a specific regulation
from the model's own memory: there is no "you're subject to `<regulation>`" guessed from the brand's category
— an unsupplied instrument is a gap to confirm, never a scoper-recalled name, and a name tagged `owner-stated`
with no cited owner source IS a memory-assertion defect. So the `regulatory:` carrier is `owner-stated`-or-GAP,
never memory-asserted; it is the input EH-3 (the builder's posture→severity gate, a forward seam) will read,
which is why a memory-guessed name must never reach it. Brand-agnostic: a brand with no regulatory exposure
declares `regulatory: none` (a `not-used` owner declaration) and passes clean — exposure is never assumed, and
absence is never forced into a GAP.

### 3. Asset-inventory request — BLOCKING (gate 3)
A blocking precondition — its absence in v1 was the single largest cause of the hollow build. Issue an
explicit, itemized request against what the canon needs, assuming nothing about what the brand has or
in what form. For each slot, record presence and fidelity/usability separately.

Fidelity rubric per primitive slot. Vector-vs-raster is the binary that decides build-grade: a vector
master scales and can regenerate every raster; a raster (PNG/JPG) or screenshot is fixed-resolution and
cannot be rebuilt into a master, so it is a *reference*, not build-grade.

| Slot | build-grade | low-fi-reference | missing |
|---|---|---|---|
| Wordmark | vector master (AI/SVG/EPS/PDF-vector), clean paths | raster / screenshot | no file |
| Symbol / icon | vector master | raster | — |
| Primary lockup | vector master + clear-space + min-size | raster, no rules | — |
| Secondary / variants | vector master | raster | — |
| Monogram | vector master | raster | — |
| Seal / emblem | vector master | raster | — |

**The core-asset set is per-brand — not a fixed visual list.** The table above is the COMMON (visual-primary)
case. Where a brand's PRIMARY identity carrier is non-visual — e.g. a sonic mark (a sound logo / audio
signature), a motion signature (a timing/easing identity), a verbal/naming system, or another declared lead
carrier — elicit and rate THAT carrier on the same three-way scale at intake: **build-grade** = the editable
master + its spec (what the build can reproduce from); **low-fi-reference** = a lossy/recorded/captured
instance (a clip, a screen-grab, scattered examples); **missing** = named only. So the scoper ELICITS the
non-visual primary's fidelity and the handoff carries it under the same primary-identity-carrier model the
builder gate + keystone use — the lead atom is never assumed to be a visual mark.

Other build-grade requirements (request all; "not used" is valid for optional items):

- **Vector formats:** AI (editable master), SVG (web), EPS/PDF (print/vendor).
- **Typefaces:** the named faces and their font files and proof of commercial-use license, per
  surface (desktop ≠ web ≠ app ≠ broadcast). Named-only is a fidelity gap (the builder acquires). A typical
  agency handoff leaves the license with the agency — flag it.
- **Color:** RGB (screen) and CMYK (print) values; spot/Pantone declared as authored truth when the
  brand defines it so (`owner-stated`, not re-derived from OKLCH).
- **Clear-space and minimum-size** per mark slot.
- **Misuse list:** prohibited treatments (no stretch, no unapproved recolor, no unauthorized
  bold/italic/outline, etc.).

Placement & frontier. Vectors embedded in a source (a PDF, a deck) are pointed to in-repo for the
builder to extract — never sampled by the scoper. Everything routes into the target repo, never Project
knowledge. A missing or low-fidelity core asset is fidelity-blocking (MUST-HAVE), surfaced in the
client review — because the build is judged on a real mark/fonts/imagery.

Inventory-request text (translate to the owner's language at runtime):

> "To build the canon we need your visual inventory. For each item, tell us what exists and in what form.
> (a) Marks: wordmark, symbol, primary lockup, secondary lockups, monogram, seal — we prefer the editable
> vector master (AI), plus SVG, EPS/PDF and PNG. (b) Typefaces: the font names AND the font files AND proof
> of commercial-use license for the surfaces you use (web/desktop/app). (c) Color: RGB/CMYK values and, if
> any, the Pantone/spot colors that are your authored truth. (d) Existing rules: clear-space, minimum size,
> and a misuse list. (e) If you only have a screenshot or a low-res PNG of something, send it anyway — we'll
> mark it as a reference, not a build source. Don't send hex values from memory; point us at the source and
> we'll extract. (f) If your brand's LEAD identity isn't visual — a sound logo, a signature animation/motion,
> a naming/verbal system — tell us that's the primary, and send its editable master + spec (or the best
> recording you have, marked as a reference): we rate it build-grade / reference / missing on the same scale."

### 3.5 Discovery & Intake Instrument — BLOCKING (gate 3.5)
A single fillable instrument, emitted by DEFAULT (not optional). Every line is tagged: **CONFIRM** (what we
already believe, for the owner to ratify) / **ASK** (what we put as an open question) / **REQUEST** (material
or assets we need). The chat RESOLVES it in session — filling, confirming, collecting — and never replaces it
with loose conversation. Register: the worked-example register of §6 (warm, plain Mexican Spanish for a
non-design owner-operator; design terms glossed inline by example) — do not duplicate that example here, it
governs. This is the FIRST checkpoint of the single client-surface flow (see §6 "One client-surface flow,
three checkpoints"): its CONFIRM / ASK / REQUEST lines mature into the §6 review and the gate-7a brief, never
into a throwaway side-doc.

### 4. Elicitation instrument — BLOCKING (gate 4)
The centerpiece. Hard rule: the WHY is elicited, never inferred. If the owner cannot answer, it becomes a
gap to confirm — never a scoper guess. Depth follows the corollary: deep where the answer lives only in a
person's head; point, don't elicit values where it lives in material. The gate RUNS the per-dimension
elicitation machine (`references/elicitation-machine.md`; load it here): a frame GENERATED from the profile,
discrepancy-ordered areas, signal-triggered probes, an auditable saturation close — every dimension in the
frame ends in exactly one honest terminal state, and an unelicited field is BORN a gap.
The interview bank (`references/elicitation-bank.md`) and the posture + horizon batteries (`references/detection-batteries.md`) are the machine's QUARRY — method-sourced material it improvises from against this brand's profile; illustrative, never a script. Load them with the gate.

Carry, don't just elicit. The scored personality attributes (any scale the owner ratifies — a named framework
is an illustration, never a required input), the differential-scale placements, and the resonance answer are
written into the handoff's WHY block (Personality / Differential scales / Resonance) so the builder and
keystone consume them. An unanswered one is a gap, never a scoper guess.

Elicited-or-GAP (EH-1). Personality, differential scales, resonance, and any owner-meaning field — a field
whose value lives only in a person's intent (what the brand MEANS, chooses, or refuses: the intended meaning
of a color/typeface/mark, the anti-promise, value trade-offs), as opposed to a value observable in or
measurable from material — resolves to exactly one of three honest states: ELICITED from the owner
(`source: owner-stated`, carried at its earned `confidence`), an owner-declared `none` (the brand has none — a
clean not-used, never invented), or an explicit GAP. It is NEVER scoper-derived. `confidence: hypothesis` is
not a license to carry a scoper-supplied value: a field with no owner source behind it is a GAP regardless of
confidence, and a value reaches `owner-confirmed` only by explicit owner ratification. This is the *The
provenance spine* hard rule applied at this gate (do not restate the ladder — it governs); a score, a scale
placement, or an intended meaning the scoper supplies on the owner's behalf is a defect, not a finding. The EH
self-check (below, pre-compile) verifies it.

### 4a. Posture detection (detect, don't hardcode)
**Posture detection — detect, don't hardcode.** A question battery (quarry in `references/detection-batteries.md`; posture is a dimension OF the machine's frame — unelicited fields are born gaps) detects the brand's posture as a capability class; record `profile` + params into the handoff POSTURE block, incl. `visibility:<low|moderate|high>` and `audiences:<ordered>`. Posture is owner-stated (source) / `hypothesis` (confidence) until the gate-6 promote — never stamped mid-interview.

### 4b. Horizon detection (adaptive, not a checklist)
**Horizon detection — adaptive, not a checklist.** The adaptive method (quarry in `references/detection-batteries.md`; horizons are dimensions OF the machine's frame) generates category-relevant candidates, prompts lightly, probes for existing material, and asks the open question; record each as `direction | not-relevant | tagged-gap` + `existing-material:<y/n>` into the handoff HORIZONS block.

### 5. Multi-decider & unstructured input
Two generic, blind capabilities. Encode multi-signer sign-off and partner politics as "more than one
person decides," never as a named demographic.

Multi-decider (RACI-shaped). When several people have a say:
- Capture each voice's input per slot; attribute positions.
- For each canon slot, identify the single Accountable (the ratifier; the buck stops there) plus
  Consulted/Informed. More than one Accountable on a slot is a conflict to resolve. The Accountable is the
  `owner` field of the provenance spine for that slot.
- **Surface disagreement explicitly** — never paper over it; route each conflict to the living questions doc
  as "needs one decision."
- Record who ratifies (→ `OWNERS` in the handoff).
- Session pattern: involve the decision-makers without making the decision in-session; keep the decider
  group small and fixed; never introduce new deciders mid-process. *(Wheeler — SECONDARY)*

Unstructured input. Owners ramble, jump, contradict. You:
- Capture verbatim, then cluster by canon layer.
- Separate stated fact / aspiration / anecdote; mark contradictions as `liminal` to revisit.
- Reflect back a structured version for confirmation (confirm-back loop).

Output: one consolidated, per-slot confirmed set plus an explicit list of unresolved multi-decider
conflicts.

Consultation-surface — unconditional. Gate 5 runs ALWAYS — it is BLOCKING, not waivable. A stated
sole-decider does NOT collapse it to an in-session decision: even with a single Accountable, the confirm-back
loop and the surface-disagreement framing still apply (reflect the structured version back, name any tension,
route it as a decision to be made — never paper over). The external-review / consultation framing is a
permanent property of the flow, not a step a one-person brand skips.

### 6. Three-surface review — BLOCKING (gate 6)
The pre-compile review. No silent handoff. v3 splits the single v2 review doc into three surfaces by
architecture, because one surface cannot serve both the operator and a non-design SME owner. The scoper is
Chat-side with no filesystem, so each surface is produced as chat text or a downloadable/presentable
artifact, never a file-op.

| Surface | Audience | Form | What it carries |
|---|---|---|---|
| **Internal status** | the operator / builder | structured, dense, mixed-language | the full provenance spine, the dimension map, severity tags, RACI — seeds the handoff; SOLE home for all operator plumbing (tool failures, provenance/confidence grades, cost/credit reasoning, GAP-NNN, Stage-N, RACI) — none of it crosses to the client surfaces |
| **External client instrument** | the brand owner / SME | plain language, visual, the owner's language (e.g. Spanish); design terms glossed by example | Found / Missing / To-confirm in client words, presentable in chat |
| **Living questions doc** | the owner, over time | a markdown block the owner keeps | open questions, multi-decider conflicts, requests; committed to the repo where the env allows, else a downloadable artifact (graceful degradation) |

The external instrument's three parts (client language only — never GAP-NNN, provenance/confidence grades, Stage-N, RACI, tool-failure or cost/credit reasoning, nor severity as an operator token):
- **Found** — what intake captured, per canon layer: the ratified WHY, pointed-to material/assets,
  owner-provided values, detected posture + horizons.
- **Missing** — gaps in plain client language: "we don't yet have X," each with *why it matters* and a
  *proposed resolution* the owner can ratify in one pass. Carry priority in client words (most urgent /
  important / optional), never the operator token — the structured MUST-HAVE/SHOULD/NICE severity lives on
  the Internal status surface where it seeds the handoff. Core-asset gaps are the most-urgent,
  fidelity-blocking tier.
- **To confirm** — explicit owner sign-off: the ratified WHY, every multi-decider conflict resolved to one
  answer, any owner-provided values, all "not used" declarations, and every observation we recorded as tentative and
  are asking the owner to confirm as a brand line.

**Worked example — the external instrument in use** (this is the tone-fidelity-critical surface; register:
warm, plain Mexican Spanish for a non-design owner-operator, every design term glossed inline by example — no
jargon, no filler, never translated-English or AI-slop). Placeholder brand: a neighborhood bakery (generic;
`<marca>` stands in for the name, never a real brand). It shows exactly one Found / one Missing / one
To-confirm line:

> **Encontrado.** Su logo ya viene como una sola pieza —el dibujo y el nombre de la panadería pegados, lo que
> llamamos el *lockup*— y nos lo pasaron en archivo editable, así que sirve tal cual para todo lo que armemos.
>
> **Falta.** No tenemos el archivo de su tipografía —la *fuente*, el molde de las letras con que se escriben
> el nombre y los letreros—. Sin ese archivo, cada material acaba con una letra distinta y el negocio se ve
> disparejo; es lo más urgente, y se consigue con su diseñador o se compra con licencia.
>
> **Por confirmar.** En sus redes usan un rosa más fuerte que el del menú impreso. ¿Cuál es el oficial —el que
> manda— y cuál fue solo una prueba? Díganos cuál es el bueno y lo dejamos fijo.

(Exactly one Encontrado / one Falta / one Por confirmar; two terms glossed inline by example — *lockup*,
*fuente*. The point is the register, not the length.)

**Client-surface self-check — BLOCKING.** Before presenting the External client instrument and the Living
questions doc, scan both for TWO leakage classes — (1) **operator vocabulary** (GAP-NNN, Stage-N,
provenance/confidence grades, build-grade, RACI, tool-failure/cost reasoning, severity-as-operator-token); and
(2) **operator register/preference leakage (TA-2)** — the client surface gone terse, assumption-laden, or
terms unglossed because the operator's user-profile preference toward terseness/speed/proceed-by-assumption
bled in. Any hit is a defect: a **register** hit → rewrite in the §6 client register (warm, plain, owner's
language, every term glossed; compare the §6 worked example); a **vocabulary** hit → rewrite in client language
or move to the Internal status surface. **Register/preference firewall (TA-2):** the client register inherits
NO operator terseness/speed/assumption preference; **mirror-guard** — it governs the CLIENT register ONLY,
preserving legitimate operator directness on the Internal status surface + handoff. Neither client surface
clears gate 6 with either class present. Brand-agnostic — tests the form (vocabulary + register), never brand
content.

Gate. The owner reviews and confirms/corrects the external instrument; only then do you compile.

Two-ledger split. These docs list gaps in client language. The builder formalizes them into the
canonical `GAP-NNN` ledger in `RESIDENT.md` at build time (`gap-protocol.md`). The scoper never owns GAP
IDs; your severity tags + provenance tags here seed the builder's formalization.

One client-surface flow, three checkpoints. The gate-3.5 intake (CONFIRM / ASK / REQUEST), this External
client instrument (Found / Missing / To-confirm), and the gate-7a Final Brand Brief are not three parallel
docs — they are ONE instrument maturing through the flow: same register, same language, same lineage. The
taxonomy maps across maturities: CONFIRM → Found, ASK → To-confirm, REQUEST → Missing. Gate 7a is this very
review resolved to full ratification.

### EH self-check — BLOCKING
The pre-compile status gate: gate 7a does not open until this passes. Run a second BLOCKING self-check over the
recorded intake — the epistemic-honesty companion to the §6 Client-surface self-check (which guards client
vocabulary; this one guards status integrity). It tests the FORM of each datum's provenance on the spine's own
axes (`source` / `confidence` / GAP), never any brand's content. Verify:
- **(a) Owner-meaning fields** — any field whose value lives only in a person's intent (what the brand means,
  chooses, or refuses: personality, differential scales, resonance, the intended meaning of a
  color/typeface/mark, the anti-promise, value trade-offs), not a value observable in material. Each resolves
  to exactly one of: `source: owner-stated` backed by a real owner utterance, an owner-declared `none`
  (not-used), or an explicit GAP. None is scoper-derived; `confidence: hypothesis` is not a license — a field
  carrying a value with no owner source behind it is a defect even at hypothesis, and nothing sits above
  hypothesis without explicit owner ratification.
- **(b) Regulatory instruments.** Every named legal/regulatory instrument is `source: owner-stated` cited to
  the owner or a manifest item — never memory-asserted; a name tagged `owner-stated` with no cited source is a
  defect. The POSTURE `regulatory:` field carries no model-recalled regulation name.
- **(c) Proceed-assumptions (TA-3).** Every assumption made to advance carries an explicit CONFIRM line
  (gate-3.5 mechanism); a proceed-assumption with no CONFIRM line — anything inferred silently — is a defect.
Any violation is a BLOCKING defect: re-status the datum to a GAP (or, for a field the owner closed, an
owner-declared `none`), add the missing CONFIRM line, or elicit it before compiling. Brand-agnostic by construction — a brand with no
regulatory exposure (`regulatory: none`) and any owner-declared `none` field both pass clean; absence is never
forced into a GAP.

### 7a. Final Brand Brief — BLOCKING (gate 7a)
The close of the single client-surface flow: the §6 review carried to ratified-complete, in client language
(the §6 register — warm, plain, the owner's language, every design term glossed). This is the BLOCKING client
APPROVAL — nothing is compiled without it. It is the §6 External client instrument resolved so every Found /
Missing / To-confirm line is settled: each gap accepted or owned with a resolution, every "to confirm"
confirmed, the WHY ratified. The owner signs off on this human-readable brief, not on the machine block.

### 7b. Handoff compile (gate 7b)
Produced ONLY after the 7a sign-off. Produce ONE machine-readable, fenced block following
`references/handoff-format.md` — load that reference and compile EVERY block and carrier it defines (it is
the single contract; this skill never re-enumerates it): the two-track manifest with `acquire:` routes +
declared fallbacks · the six-value provenance spine with `proposed`-quarantine · the `RATIFIED{by · how ·
date}` record · WHY/WHAT/HOW carriers · TREATMENTS / DIMENSION MAP / HORIZONS / POSTURE · per-gap provenance
tags · `BUILD-MODE` · the explicit `Claude Design component library: <YES|NO>` slot · the non-waivables.
Then tell the person: open Claude Code in (or create) the target repo, place the material per the manifest
**with checksums** (or leave placement to the builder where an item declares an executable `acquire:` route),
and paste the block — it invokes `brand-canon-builder`, which persists it under `sources/` before parsing.
Self-contained: everything the builder needs, nothing it should discover for itself.

## Laws

### The scoper/builder frontier
The dividing law — plus the curator wall, the WRITTEN no-manufacture rule (`references/process-discipline.md`
§ The curator wall). The scoper elicits intent, observes applied expression (as hypothesis), detects posture + horizons, and points at sources. The builder extracts values and builds.

| The scoper MAY | The scoper MUST NOT |
|---|---|
| Read stated prose (positioning, voice) to seed/ratify the WHY | Infer or finalize the WHY without owner ratification |
| Record values the owner volunteers as truth (e.g. declared Pantone) + the `owner-stated` source | Sample/measure any primitive value (eyedropper a color, read geometry off a PDF/site) |
| Inventory which assets/forms exist and at what fidelity | Extract embedded vectors/images from sources (that is the builder's job) |
| **Observe** applied design language and point at it (checklist below) as `hypothesis` | Harvest/transcribe the applied design into the canon (builder) |
| Tag a one-off observation with `confidence: hypothesis` | Promote an observed one-off to a brand *line* without tier-2 ratification |
| Detect posture + horizons via the elicitation batteries | Hardcode posture/horizons from category assumption |
| Point each source into the repo with role/freshness/provenance tags | Reconcile conflicts or invert source-of-truth precedence (builder) |
| List gaps in plain client language with a provenance tag | Assign `GAP-NNN` IDs (builder formalizes) |

Applied-design capture checklist (POINT-and-OBSERVE, not extract). Record pointers + observations (each as
`hypothesis`) so the builder can later harvest:
- Inventory of existing applied expression (where the brand lives today) — URLs/files.
- Layout & composition: any recurring grid/margin/template structure (observe, don't measure).
- Imagery/photography direction: style (lighting, color tone, composition, framing, editing), type
  (photo/illustration/3D), staged vs natural, what is avoided.
- Type-in-use: which faces appear in practice vs declared; hierarchy.
- Lived aesthetic / look-and-feel: the universal pattern — observe it, don't quantify it.
- Treatments: any recurring texture/finish/effect — observe + point at the source artifact for the
  builder's reproduction router.
- Gap flags: where actual expression diverges from stated intent; mark each divergence as a gap.
- Hand the builder the pointers (files/URLs) for real harvesting.

The boundary: measured/derived values = builder; stated intent + observed pointers (as hypothesis) = scoper.

### Material placement & target repo
Both were v1 failures. Honor all three:

- **A real target repo.** The handoff requires a real target repo path (or "create repo X"). Never invent a
  tree you can't see — you are Chat-side with no filesystem.
- **Static source material goes INTO the target repo**, under a conventional location (`assets/` for binaries,
  `sources/` for references), as a build precondition, **with a sha256 checksum per item** (the ASSETS track).
  A **live consumer surface** the brand ships today (its site, app, active feed) is the exception: it is *not*
  copied in — it is carried in the CONSUMERS track by its `url`, which the builder reaches and reads at build
  time. What is always forbidden is the **dead/ephemeral** pointer: a Claude.ai chat link, a local Downloads
  path, an auth-walled resource, or "Project knowledge" — the Code-side builder cannot reach any of those. The
  test is reachability, not URL-vs-file: a live url that resolves is allowed; a dead link is not.
- **Chat→Code boundary.** Because you have no filesystem, placement is an instruction to the person + a
  two-track manifest in the handoff (checksummed ASSETS + reachability-verified CONSUMERS), never a scoper
  file-op. Social/applied media is either attached (ASSETS, checksummed) or carried live (CONSUMERS, url), each
  with an `ingest:` method, never passed as prose. The builder reads only the repo + the reachable consumer
  surfaces; nothing the build needs may live only in a chat or in Project knowledge.

### Fidelity-bar linkage
For THIS brand, the intake defines which assets/primitives are core/must-have (vs optional/not-used), so
the build is judged on fidelity (is the real mark/fonts/imagery present and on-brand?), not mere
rule-compliance.

- **build-grade** = vector master + commercial-licensed font files + color profiles (incl. authored spot
  where declared) + clear-space/min-size + misuse list.
- The intake emits a fidelity contract (the handoff's CORE-ASSET FIDELITY CONTRACT block): the per-brand
  core-asset set, each marked present/build-grade vs gap/low-fi. The brand's primary-identity carrier (resolved
  from the DIMENSION MAP, not assumed a visual mark) + graphic-code are non-waivable even under
  `BUILD-MODE: v0/DEMO`.
- The builder's fidelity gate consumes it: a missing or low-fidelity core asset FAILS the build — it
  does not "pass with gaps." Closes the loop from *request* (asset inventory) to *judge* (fidelity gate).

## Principle
Scope, don't build. Interview, request, structure, detect, and point — emit one machine-readable handoff
plus a client instrument, and let the builder do the rigorous, filesystem-bound work (extract → scaffold →
fill → tokens → gaps → validate). Never infer the WHY; never sample a primitive; never promote an
observation to a line without the owner.
