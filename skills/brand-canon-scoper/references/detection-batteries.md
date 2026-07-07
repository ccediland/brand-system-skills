# Brand Canon Scoper — Detection batteries (posture + horizons)

The posture and horizon detection methods for the gate-4 sub-instruments (`SKILL.md` §4a / §4b) — load them when running that gate. Both are capability-class methods: detect, never hardcode from category. Both batteries are QUARRY for the elicitation machine's frame (`references/elicitation-machine.md` § The quarry): the REACHES asked are derived from this brand's profile — no battery item is mandatory, no item order is a script, and an unelicited posture/horizon field is born a gap, never a scoper-coined value.

## Posture detection (detect, don't hardcode)
The brand's posture parameterizes the builder's guardrail layer (the keystone's operational tier). Detect
it with a question battery; never assume it from category. The posture space is a capability class
(illustrative, not a closed set — record an unlisted posture verbatim):
low-profile/conservative · high-visibility/aggressive · regulated/compliance · activist/opinionated ·
playful/irreverent · B2B-formal · <other-detected>. Battery:
- **Regulatory exposure:** "Are the claims you make legally constrained? By whom?" *(→ regulated profile)*
- **Risk appetite:** "When in doubt, does the brand stay quiet or speak boldly?" *(→ visibility setting)*
- **Stance:** "Does the brand take public positions on issues, or stay neutral?" *(→ activist vs neutral)*
- **Humor/irreverence tolerance** and **formality default.**
- **Audiences served and their relative priority** (staff / customers / press / regulators / community).
- **Off-limits:** "What topics will the brand never discuss?" and "How should it refuse when asked?"

Record the detected `profile` + the parameters into the handoff's POSTURE block, including two the keystone
guardrail tier reads directly: `visibility:<low|moderate|high>` (from the risk-appetite answer) and
`audiences:<ordered priority list>` (from the audiences-served answer, ordered by the stated priority).
Posture is declared, not observed — so each answer's `source` is `owner-stated`; but its `confidence` enters
as `hypothesis` (owner-stated in-session, not yet gate-ratified — exactly like every other unratified owner
datum, e.g. the WHY exemplars) and is promoted to `owner-confirmed` only at the gate-6 To-confirm pass, never
stamped mid-interview (an in-session statement is not yet a gate-ratified line).

## Horizon detection (adaptive, not a checklist)
A fixed checklist causes tunnel vision and category mismatch. Detect horizons adaptively:
1. **Generate candidates from the brand's category + the base taxonomy** (Brand Key / Keller / Aaker /
   Neumeier / Wheeler). E.g. hospitality → uniforms, signage, sonic, menu/packaging; SaaS → motion, naming
   architecture, partner co-branding. Suppress irrelevant horizons.
2. **Prompt lightly by default** — for each relevant horizon, offer a one-line direction + a tracked gap;
   deepen only when the brand already has material or asks.
3. **Detect existing material** — actively probe for assets a naive run would miss (existing uniforms,
   gift-shop merch, hold music, signage), so the canon ingests what exists rather than re-inventing it.
4. **Ask the open question** — "Are there other horizons we haven't named?" Never present the generated set
   as exhaustive; owner confirmation closes it.

Record each horizon as `direction one-line | not-relevant | tagged-gap` + `existing-material:<y/n>` into
the handoff's HORIZONS block.
