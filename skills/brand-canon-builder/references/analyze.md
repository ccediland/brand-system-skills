# ANALYZE — building a canon from published brand work (the default path)

Entered when the handoff says `MODE: ANALYZE` (the default for essentially every real brand). The brand
already expresses itself publicly in *some* form — one or more code repos, a brandbook PDF, a design-tool
library, a live site, social, packaging, signage, a single old logo file. The job is to **analyze that
published expression across mediums → harvest the real decisions into the canon, reconcile conflicts, and
remove the junk** — without inverting the source-of-truth, and without re-eliciting the WHY (the scoper
already ratified it; read it from the handoff's `WHY (essence) — RATIFIED` block).

Coverage is measured **per canon layer** (sourceable / partial / elicit-only / empty), never by artifact
type. The asset-acquisition, font, and prototype/kit stages are **mode-independent** and live in `SKILL.md`
+ their own references — they run here too, but are not part of this file.

## 1. Inventory the sources

List every source and classify each: a CONSUMER (a site, an app, a design-tool export), a REFERENCE (an
external brandbook / Drive doc), or RAW MATERIAL (assets, fonts, scattered notes). Note for each whether it
is *fresher* (recently shipped) or *older*.

## 2. Mine non-token design decisions

For each consumer repo, read its living docs (`RESIDENT.md` / `CLAUDE.md` or equivalent) **and any open
PRs / recent commits** — the freshest decisions often live in unmerged work. Extract decisions that belong
in the canon: meaning (→ ESSENCE), fixed atoms (→ PRIMITIVES/tokens), rules (→ GRAMMAR). Pull measurable
values into the token spine; pull rationale into the prose layers.

## 3. Reconcile conflicts (precedence)

When sources disagree:

- **Fresher / shipped-to-production wins on specifics** (the exact value, the current treatment) — it is
  the most-tested reality.
- **Identity / meaning wins on meaning** — the foundational "why" outranks a recent tactical tweak.
- **Repo wins over an external brandbook / Drive doc** — the code that shipped is the truth; a PDF is a
  reference. If the brandbook conflicts with the repo, the repo wins, and the brandbook becomes a REFERENCE
  to harvest from, not an authority.
- **Abstract to universal as you promote.** A consumer-specific or stack-specific decision is generalized
  (stripped of the output/stack) before it enters a canon layer. A web-only detail becomes a
  medium-agnostic rule or stays as projection rationale — never enters canon coupled to the web.

## 4. Harvest before removing

Off-system, duplicated, or superseded artifacts are junk → list them on the REMOVE manifest in
`projections.md`. But **harvest any reusable decision into the canon first**, and flag anything
irreplaceable as "preserve before delete". Deletion is gated behind a human OK — never delete in the same
pass that you harvest.

## 5. Register the consumers

Add each surviving consumer to the PROJECTIONS registry. Mark whether it is downstream-only or
**bidirectional** (also a source of design intent eligible for promotion), and record its upstream
promotion path.

## Applied-design harvest

v1 harvested *facts* from the consumers but ignored their *applied design* (F-021). Harvest the lived design
language from the live consumers the scoper pointed at (sites, social flagged as bidirectional design-intent):

- **Layout & composition** — recurring grid/margin/template structure, spacing rhythm (observe, then promote
  as a rule, not a pixel measurement).
- **Imagery / photography direction** — style (lighting, color tone, composition, framing, editing), type
  (photo/illustration/3D), staged vs natural, and what is deliberately avoided.
- **Type-in-use vs declared** — which faces and hierarchy actually appear in practice.
- **Lived aesthetic** — the universal look-and-feel pattern.

Promote all of it **abstracted to universal** (stripped of stack/medium): feed GRAMMAR (rules) and ESSENCE
(meaning), capture measurable atoms into the token spine. Where the lived expression **diverges** from the
ratified WHY, log the divergence as a reconcile item — never silently overwrite the ratified WHY. Never
fabricate: harvest only what the references actually show. (Method: `dev/v2-build-spec.md` §4.5.)

## 6. Fill, then gap

Fill every slot the harvested material supports. For must-have slots the material doesn't cover, log a GAP
(don't invent). Run the universality stress test before declaring done.
