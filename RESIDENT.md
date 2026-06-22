---
name: brand-system-skills-resident
description: "Living resident doc for brand-system-skills — a Claude Code plugin marketplace whose skills
  build a generic, brand-agnostic, output-agnostic brand canon (four layers + DTCG/OKLCH token spine) for
  any brand. Use when any session touches this repo, its skills, the canon template, the token interchange
  contract, or its relationship to web-stack-skills. Canonical at the source; any mirror is read-only."
last_updated: 2026-06-22
applies_to: Repo ccediland/brand-system-skills — the brand-canon builder/scoper skills + canon template
canonical: github
domains: [brand-system, tooling]
---

# brand-system-skills — RESIDENT

> Living doc for the repo that builds brand canons. **This repo is the SKILL/tooling**, not a brand canon
> itself. It was derived (Phase 4) by abstracting the method from a real, mature brand canon and validating
> coverage against a second, independently-authored one — so the output stays universal, not n=1.

## TL;DR
- A plugin marketplace (mirrors `web-stack-skills`) shipping one plugin `brand-system` with two skills:
  `brand-canon-builder` (Code-side, builds the canon) and `brand-canon-scoper` (Chat-side, scopes + hands off).
- It produces a four-layer canon (INDEX/ESSENCE/PRIMITIVES/GRAMMAR) + 2 satellites + a DTCG/OKLCH token
  spine, for any brand — ANALYZE its published work by default, or CREATE from a ratified brief. Output-agnostic, generative, dual-legible.
- Sibling to `web-stack-skills` (flagship stack consumer). Same token spine on both sides → lossless hop.
- **v2 (shipped): the first real-brand run proved v1 shipped a *hollow skeleton*, so v2 rebuilt the skill
  into an engine that analyzes existing published brand work across mediums → extracts the real assets →
  produces a real prototype + a Design-syncable component library by default.** The canon is the skeleton,
  never the deliverable. See `## v2`.

## Architecture & why
- **Four-question canon.** Every design truth answers *where-start / why / what / how*; each owned by one
  layer; nothing named for an output. The four-question logic is the law, not the file count (a brand may
  collapse or expand the file shape).
- **Generative over catalog.** Stable `G-*` rules + `ALGO-*` algorithms so a canon decides artifacts it
  never names (the universality test). The anti-pattern — a per-output applications catalog — is explicitly
  rejected; coverage of an output's *need* is absorbed as rules.
- **Dual legibility.** Prose `canon/*.md` + machine mirror (`tokens.json`, `canon.json`); disagreement = bug.
- **Token spine = standard DTCG base/semantic/component tiering, OKLCH spine.** OKLCH literal in `$value`;
  consumers emit `oklch()` via an OKLCH-preserving transform (never `color/css`). Per-entry
  `source:"authored"|"derived"` flag in `$extensions` so the model supports BOTH an OKLCH-native brand (all
  derived) and a print-native brand (authored spot/CMYK that must not be re-derived). Tiering is adopted as
  the DTCG standard, not because any single consumer uses it — canon stays stack-agnostic.
- **Lego principle.** The canon is always valid; every missing must-have is a tracked `GAP-NNN`, never a
  silent hole or fabricated content.
- **Two reference derivation (how this was built, recorded for provenance):** METHOD abstracted from a
  digital-native canon; COVERAGE intersected with a print-native canon. What both carried → universal
  must-have; what one carried → parameterized/optional dimension. Both brands' specifics were scrubbed to
  zero (brand-scrub gate).

## Repo map
- `.claude-plugin/marketplace.json` · `plugin.json` — marketplace + plugin manifests (mirror web-stack-skills).
- `skills/brand-canon-builder/` — `SKILL.md` + `references/` (architecture, coverage-checklist, gap-protocol,
  token-spine, analyze, create, asset-acquisition, font-acquisition, design-sync-kit, claude-design-adapter,
  validate-audit, client-clean) + `assets/templates/` (canon skeletons, DTCG token spine, canon.json,
  satellites, docs, prototype, design-sync kit, Claude Design adapter).
- `skills/brand-canon-scoper/` — `SKILL.md` + `references/handoff-format.md`.
- `README.md` (human front door) · `RESIDENT.md` (this doc) · `CLAUDE.md` (agent ops + guardrails).
- `dev/` — build provenance (work-log + v2 specs + `v2-backlog.md`, F-001…F-026); **gitignored, local-only, not shipped**.

## Integrations / ritual
- **web-stack-skills** = downstream consumer. Its `astro-css-tokens` skill ingests the DTCG `tokens/` spine
  (3-file, OKLCH-string `$value`, plain-string values, `{tier.cat.name}` aliases, namespace-aligned category
  names). Validate "does a canon project cleanly into web-stack-skills?" whenever the token contract changes.
- **Claude Design** = consumer via `/design-sync`, which needs a COMPILED COMPONENT LIBRARY (dist/Storybook/
  package), not a canon. v2 makes that library a default build output (see `## v2`).
- Both are PROJECTIONS of a brand canon; the canon never names a stack (escape valve = adapters in the
  consumer repo).

## Decisions
| Decision | Why | Date |
|---|---|---|
| Two skills (builder Code-side + scoper Chat-side) | filesystem-bound build vs. chat-only scoping; thin handoff between | 2026-06-21 |
| OKLCH literal in `$value`; hex/rgb derived, Pantone/CMYK authorable via `source` flag | OKLCH = canonical spine; print spot colors don't round-trip and must be declarable as truth | 2026-06-21 |
| base/semantic/component tiering documented as the DTCG standard, not as web-stack's shape | keep canon stack-agnostic; alignment is convergence on a standard | 2026-06-21 |
| Emit motion/depth tokens even without a current consumer | first-class optional dimensions; a downstream bridge can come later | 2026-06-21 |
| Don't pad the must-have checklist; rely on GAP protocol + universality stress test | a longer checklist ≠ a more complete canon | 2026-06-21 |
| **v2 reframe:** skill = analyze published work → extract real assets → real prototype + Design-syncable library; canon is the skeleton, not the deliverable | first real run shipped a hollow, unpresentable skeleton | 2026-06-21 |
| **v2:** default is to analyze/refine/transform/improve already-published work, NOT create from scratch | scratch only on explicit instruction; brownfield-vs-greenfield was the wrong top dichotomy | 2026-06-21 |
| **v2:** real asset acquisition (source-agnostic, any medium) + font acquisition are blocking build steps | a canon with no mark/fonts renders nothing on-brand; the source-agnostic matrix supersedes the PDF-only framing | 2026-06-21 |
| **v2:** compiled component library emitted by default; success criteria add a brand-fidelity / presentable gate | repo must be born `/design-sync`-ready and IS the real prototype; rule-compliance of an empty skeleton passed every gate | 2026-06-21 |
| **v2:** medium-agnostic intake — canon slots define what is NEEDED, open discovery what EXISTS, the delta is a tracked GAP; replaces any artifact-type routing | intake must never presume the shape of a brand's material; surfaced in the first real scoping | 2026-06-21 |
| **v2 builder:** `/design-sync` ingests a compiled `dist/`, not source → the library ships package-shape by default (one-command build: `esbuild` + `ts-morph` + `@types/react`) | the converter's verified contract requires `dist/` + `.d.ts`; a source-only handoff isn't ingestible | 2026-06-22 |
| **v2 builder:** the compiled component library is the ecosystem gap the builder fills | no existing tool compiles a `/design-sync`-ready package from a canon kit | 2026-06-22 |
| **v2 builder:** source-agnostic asset acquisition (matrix by source-type, never assume PDF) | never presume a single source type exists; technique chosen by the source found | 2026-06-22 |
| **v2 builder:** pin Style Dictionary v5 + DTCG draft 2025.10 | DTCG 2025.10 not yet fully supported in SD v5 (issue #1590); use `color/oklch`, never `color/css` | 2026-06-22 |

## Open Items
| ID | Item | Severity | Status |
|---|---|---|---|
| OI-A | No downstream consumer yet ingests motion/depth tokens (web-stack `astro-css-tokens` reads neither). A future bridge skill could. | NICE | OPEN |
| OI-B | web-stack-skills cites no `G-*`/`ALGO-*` rule IDs today; enforceable canon downstream would need rule-ID citations there or carried as token metadata. | NICE | OPEN |
| OI-D | Literal Stage 2 (read-only) / Stage 6 (fill) §3 re-split deferred; the folded Stage 2 carries read+fill today. Revisit only if the PR-B1 spine is reopened. | NICE | OPEN |

(OI-C — end-to-end run on a real brownfield pilot — RESOLVED: it surfaced the v2 reframe + F-001…F-026, all shipped. See `## v2`.)

## v2 — the reframe (shipped)
The first end-to-end run on a real brownfield (print-native) pilot proved the v1 output was a **hollow
skeleton**: structurally sound (authored/derived correct, brand-scrub correct, rules cited by ID) but
unusable as a deliverable — no real assets, placeholder mark, fallback fonts, generic renders. The skill
validated rule-compliance of an empty skeleton and called it done.

**Reframe (center of gravity).** Not a from-scratch, output-agnostic rule/token canon that defers assets.
An engine that **analyzes existing published brand work across mediums → extracts the real assets →
produces a real prototype + a Design-syncable component library, by default.** The four-layer canon is the
*skeleton*, never the deliverable. Brands are not created from scratch unless explicitly instructed.

**v2 — SHIPPED.** Scoper rewrite (PR #1) + builder pipeline Stages 0–12 (PR-B1…B5: handoff spine ·
source-agnostic asset + font acquisition · applied-design harvest · real prototype + `/design-sync`-ready
component-library kit · token spine · gaps · VALIDATE/AUDIT + fidelity gate · client-clean/scrub) +
distribution (PR-B6) + skills audit-remediation (#8). The method now lives in `skills/*/SKILL.md` +
`references/`; F-001…F-026 closed. Surface split (design → Chat, filesystem/git → Code) folded into normal flow.

> **Caveat (`/design-sync` contract).** The converter contract is **server-side/version-fluid** (the base
> command re-reads live instructions via `get_claude_design_prompt`). It was live-pinned post-GA against
> Claude Code `v2.1.185` (core corroborated; first-line `@dsCard` marker per preview → `ds_manifest`
> server-regenerated; `readmeHeader` coexists with `guidelinesGlob`). The builder **re-reads the live skill
> at run time** before freezing the emitter — treat pinned field/script names as version-fluid, not frozen.

## Dead-ends — do not retry
- Tried: ship an output-agnostic rule/token canon and defer all real assets to `GAP-NNN`. Abandoned: it
  passes every gate but renders nothing presentable. Do not retry — assets, fonts and a real prototype are
  blocking build outputs, not deferrable gaps.
- Tried: greenfield(elicit) vs brownfield(mine) as the top dichotomy. Abandoned: the real default is
  analyze-published-work-across-mediums → harvest/refine/transform/improve; from-scratch is the rare,
  explicitly-instructed exception.
- Tried: default "Claude Design adapter? no" / not-attached. Abandoned: contradicts the standing goal of
  direct `/design-sync`; the compiled component library is a default build output.
- Tried: scoper auto-mines material, infers the WHY/essence, and extracts primitives. Abandoned: WHY is not
  in source material (must be elicited) and the scoper's extraction was wrong. Do not retry — the scoper
  elicits + points; the builder extracts.

## Change log
- 2026-06-22 — **v2 built & shipped.** Scoper rewrite (PR #1) + builder pipeline Stages 0–12 (PR-B1…B5:
  handoff spine · asset/font acquisition · applied-design · prototype + `/design-sync` kit · token spine ·
  gaps · validate/audit + fidelity gate · client-clean) + distribution (PR-B6: README, manifests v0.2.0,
  topics, scoper zip) + skills audit-remediation (#8: frontmatter correctness, md-house-style, template
  audit). `/design-sync` §4.6 live-pinned vs Claude Code `v2.1.185` (server-side/version-fluid; re-pinned at
  runtime). F-001…F-026 closed.
- 2026-06-22 — **dev/ untracked** (build provenance now local-only per `.gitignore`); RESIDENT consolidated +
  CLAUDE refreshed (PR-B7).
- 2026-06-21 — First end-to-end run on a real brownfield (print-native) pilot — OI-C. Output structurally
  sound but unusable as a deliverable; logged the v2 reframe + findings F-001…F-026 and the workstream plan.
- 2026-06-21 — Repo derived (Phase 4) and built: two skills, full canon template set, DTCG/OKLCH token spine,
  Claude Design adapter, docs. GATE 1 approved by Carlos; GATE 2 (brand-scrub = 0, DTCG validate + web-stack
  round-trip, universality stress test) passed before commit.

## Conventions of this doc
Timeless content undated; Open Items + change log are dated/volatile. Nothing external should cite the
volatile state as permanent.
