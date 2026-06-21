# Brownfield — building a canon from existing material

A brownfield brand arrives with material already: one or more code repos, a brandbook PDF, a design-tool
library, a live site, scattered decisions. The job is to **harvest the real decisions into the canon,
reconcile conflicts, and remove the junk** — without inverting the source-of-truth.

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

## 6. Fill, then gap

Fill every slot the harvested material supports. For must-have slots the material doesn't cover, log a GAP
(don't invent). Run the universality stress test before declaring done.
