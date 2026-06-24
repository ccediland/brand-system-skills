# Brand Canon Scoper — Elicitation bank (gate-4 interview)

The full layer-mapped interview bank for the gate-4 Elicitation instrument (`SKILL.md` §4) — load it when running that gate. Questions are grouped by canon layer; the parenthetical citations (Aaker / Wheeler / Neumeier / Brand Key / Keller) name the method sources.

→ INDEX (where-to-start / glossary)
- Describe the brand to someone who has never seen it, in one sentence. *(Wheeler — "Who are you? Who needs
  to know? How will they find out? Why should they care?")*
- What internal name/term does the team use for this brand and its sub-parts? *(Wheeler — shared vocabulary)*
- What was the original flagship product/service, and how did the brand grow to today? *(Brand Key — root
  strength)*

→ ESSENCE (why / positioning / audience / voice / anti-promise) — fully elicited and ratified even if
material states it:
- Why does this brand exist, beyond making money? What would be lost if it disappeared? *(Aaker — core
  identity)*
- In whose eyes, and against which competitors and substitutes (including "do nothing"), does it compete?
  *(Brand Key — competitive environment)*
- Whom does it always serve best, defined by attitudes and values, not only demographics? *(Brand Key —
  target; Aaker)*
- What deep human truth or motivation does it tap? *(Brand Key — consumer insight)*
- Benefits: what it does functionally, what it makes one feel (emotional), what it says about the user
  (self-expressive)? *(Aaker — functional/emotional/self-expressive value; Brand Key — benefits)*
- The one thing the brand can claim that no competitor can. Complete: "Our [offering] is the only
  [category] that [benefit]." *(Neumeier — onliness statement / Zag)*
- What proof makes the promise credible (reason-to-believe)? *(Brand Key — RTB)*
- The essence in a few words — the soul that guides every action? *(Brand Key — brand essence; Aaker —
  essence/DNA)*
- **Anti-promise / never-words:** "What words would you never use to describe this brand?" and "What is
  the brand not, even if others in its category are?" *(brand-voice practice — SECONDARY)*
- **Opposing-characteristics scales (semantic differential):** place the brand between pairs —
  formal↔casual, accessible↔exclusive, bold↔prudent, warm↔cool, absolute↔nuanced. *(brand-voice practice —
  SECONDARY)*
- Resonance: what would make a customer feel part of a community/identity with the brand? *(Keller CBBE —
  resonance, top of the salience→performance/imagery→judgments/feelings→resonance pyramid)*
- **Value trade-offs (owner-confirmed):** "When the brand must trade one value against another — e.g. speed vs
  craft, reach vs exclusivity — which does it choose, and why?" Capture 1–2 as "when trading X vs Y the brand
  chooses Z." *(seeds the keystone's THINK trade-off rules — carried in WHY VALUE TRADE-OFFS; `none` if the
  owner has none, never invented.)*

Voice (register / lexicon / do's-and-don'ts) — subset of ESSENCE:
- If the brand were a person, what personality? And as a celebrity, or someone at work? *(personification
  projective — SECONDARY)*
- How formal vs conversational? "I" or "we"? "Dear" or "Hi"? *(brand-voice practice — SECONDARY)*
- The "This but never That" formula: e.g. "playful but never rude," "informative but never
  condescending." *(tone guardrails — SECONDARY)*
- Brand lexicon: words/terms the brand always uses, and the banned-words list. *(brand lexicon — SECONDARY)*
- **Five personality dimensions as a checklist: Sincerity, Excitement, Competence, Sophistication,
  Ruggedness.** *(Jennifer L. Aaker, "Dimensions of Brand Personality," JMR 34(3), 1997 — PRIMARY)* Score each
  and carry the scores into WHY (Personality, Aaker-5 scored).
- **Voice-exemplars (per audience, owner-confirmed):** for each priority audience, ask the owner for one
  *on-brand* utterance and one *off-brand* utterance the brand might say. These become the keystone's SPEAK
  few-shot pairs. Carry them into WHY VOICE-EXEMPLARS with provenance; where the owner gives none, the carrier
  is `none` and the keystone emits a tagged GAP — a pair is never fabricated. *(few-shot voice practice — PRIMARY)*

→ PRIMITIVES intent (the MEANING each color/typeface/mark should carry — NOT hex/geometry):
- What should someone FEEL on seeing the primary color? What meaning/emotion should it carry? *(do not ask
  for hex — Aaker "brand as symbol"; intent not value)*
- What should the typography communicate about character (heritage, modernity, warmth, authority)?
- What idea/story should the symbol/mark embody? What must it NOT suggest?
- Is there a recurring pattern/texture/graphic element, and what role does it play?
  *(These elicit INTENT; the builder extracts values.)*
- **Per-mark geometry (record owner-provided values, don't measure):** for each mark, ask the owner for its
  clear-space, minimum size (digital and physical), and any construction reference. These are *owner-provided
  rule-values*, not scoper measurements — record them with provenance into the handoff's WHAT per-mark GEOMETRY
  block so the builder reads them instead of re-hunting from a PDF. `none` where the owner has none (then it is
  a gap the builder can flag), never a scoper-measured value.
- **Per-font license (record, don't assume):** for each named face, record its license state — the declared
  SPDX/license id (e.g. `OFL-1.1` / `Apache-2.0` / `Ubuntu`) / `owner-supplied` / `unlicensed→GAP` — into the
  handoff's WHAT per-font `license:` field, so the builder's font stage reads the actual license (and applies
  its own self-hostable policy) rather than being boxed into a closed list. An agency handoff that withheld the
  license is `unlicensed→GAP`.

→ TREATMENTS intent (visual/textural language — observed, enters as hypothesis):
- Does the brand have a recurring texture, finish, or treatment (grain, gloss, hand-drawn, glitch, foil,
  halftone, glass)? Where does it appear? *(Observe + point; the builder's reproduction router decides
  procedural / generative / vector-trace / raster. You only record the observation as `hypothesis` and
  point at the source artifact.)*

→ GRAMMAR (how / combination-rules / contrast / mark-selection / motion):
- In which situations is each mark form used (wordmark vs symbol vs lockup)?
- Which color/figure-ground combinations are allowed, which forbidden?
- How does the brand behave in motion (if at all)?
- What makes something feel "off-brand"? *(Wheeler — governance; Neumeier — "will it help or hurt the
  brand?")*

Why-extraction techniques. When the owner can't state the WHY directly: laddering (ask "why does that
matter?" up from a feature to a value); projective prompts (personification, the celebrity test); the
onliness fill-in-the-blank; the opposing-scales differential; "what would be lost if the brand
disappeared?". These *draw out* the WHY from the person — they never license you to *invent* it. An
unanswerable WHY is a gap to confirm, not a guess to make.
