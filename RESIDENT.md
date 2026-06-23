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
- **v3 (skills built; validation next):** a fresh adversarial stress test (a third, independently-authored brand) exposed failure classes v2's gates miss — all reducing to lost epistemic status. v3's **rectoral constraint is anti-determinism**; its **north star** is a single attachable file an AI can *think / speak / design as* the brand; its **spine** is provenance on every datum. **Phases 1–4 shipped to `main`** (handoff contract · scoper v3 · builder v3 — capture/spine, reproduction+tokens, keystone+fidelity-gate); Phase 5 (validation + live red-team + release) next. Plan in `v3-execution-plan.md`. See `## v3`.

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
- `v3-execution-plan.md` (root, tracked) — the v3 execution plan (detailed gated phases + session log); v3's simplified goals/decisions live in this RESIDENT (`## v3`), its tech/gotchas in `CLAUDE.md`.
- `v3-research-foundation.md` (root, tracked) — the frozen v3 research: six resolved capability classes with methods, capability boundaries, and primary sources; the build phases draw from it.

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
| **v3 rectoral:** anti-determinism governs the whole skillset — general capability classes only, instance as illustration | the determinism failure recurred at every stress-test phase + in the v3 pre-research; intent didn't prevent it | 2026-06-22 |
| **v3 north star:** a single attachable `.md` an AI can think/speak/design as the brand (+ guardrail layer); mandatory build output | the canon + library don't make the brand *operable* by an AI; this is the deliverable they serve | 2026-06-22 |
| **v3 spine:** provenance/epistemic status (source/confidence/owner/freshness) on every datum; extends `authored\|derived` | ~5 distinct stress-test failures reduce to lost data-status; observed ≠ confirmed | 2026-06-22 |
| **v3 stated-spec-read:** brand's declared truth (named font, declared color) authoritative; tool metadata corroborates only | outlined/flattened type makes font tables report the studio's layout font or nothing | 2026-06-22 |
| **v3 reproduction router:** treatment→method (procedural SVG-filter / generative-lib / vector-trace / raster) validated by visual diff, explicit code-can't boundary | faithful capture is craft the provenance frame can't supply; photography + bespoke illustration are raster-required | 2026-06-22 |
| **v3 guardrail layer:** posture-parameterized, functional-requirements tier ABOVE personality; posture detected not hardcoded | prevents tonal dissonance; personality must not override functional/safety constraints | 2026-06-22 |
| **v3 horizons:** adaptive detection (category → one-line + tracked gap → detect existing material), not a fixed checklist | a fixed checklist causes tunnel vision + category mismatch | 2026-06-22 |
| **v3 two-surface output:** internal rigor surface (structured, mixed-language) vs external client surface (plain, visual, Spanish) | one surface can't serve both the operator and a non-design SME client | 2026-06-22 |
| **v3 `v0/DEMO` mode:** OPTIONAL defaults YES (+ carve-out for scope-expanding dims); mark + graphic-code non-waivable even in demo | momentum without dropping identity-load-bearing assets | 2026-06-22 |
| **v3 scheme derivation:** OKLCH as one general engine (light/dark, high-contrast, sub-brand as cases) on the v2 OKLCH spine | one transformation space covers every scheme; keeps the v2 spine | 2026-06-22 |
| **v3 keystone schema = 6 sections** (front-matter · THINK-as · SPEAK-as · DESIGN-as · GUARDRAIL · REFERENCE); think/speak/design + guardrail layer | ratified Phase 1 output; the north-star deliverable's structure, brand-agnostic | 2026-06-22 |
| **v3 keystone recall-ordering** — data first, active instructions last; guardrails never buried mid-doc; behavior layer (§5) doubles as Project instructions, reference (§6) as knowledge | long-context position effects; load-bearing guardrails must stay high-recall | 2026-06-22 |
| **v3 keystone size-budget = parameter, not a hardcoded number** — conservative default (keep the keystone comfortably within resident context, fully in-context not chunked); measured figure delegated to empirical calibration in Phase 5 (ties OI-E). If the file exceeds the resident window, REFERENCE (§6) splits to retrievable knowledge; only GUARDRAIL (§5) + DESIGN-reasoning (§4) stay in-context | RAG trip-point unpublished by Anthropic; schema must not fake a number | 2026-06-22 |
| **v3 token target = DTCG 2025.10**, but `$value` stays an OKLCH literal string — structured-color objects + resolver theming deferred (SD v5 lag, issue #1590 / OI-H) | 2025.10 is the format target; migrating `$value` now would break the build → Lego: `main` stays buildable | 2026-06-22 |
| **v3 fidelity gate** — reproduction visual-diff vs the source (no pixel-VRT, no Storybook); keystone gate (present · 6-section · guardrail-in-tail · within budget); guardrail red-team posture-gated (regulated = BLOCKING + human sign-off; live adversarial run = Phase 5) | judge fidelity not skeleton-compliance, and make the keystone/guardrail a real gate — honest that in-context guardrails reduce ≠ eliminate jailbreak risk | 2026-06-22 |
| **v3 Theme-1 seam: the handoff is the SINGLE SUFFICIENT INTERFACE** — two-track manifest (ASSETS checksummed / CONSUMERS live-url reachability-checked), voice/value + geometry/license carriers, every emitted block parsed in Stage 0, DIMENSION-MAP present-but-unresolved = live HALT; carrier enums are capability classes (e.g. font `license:` = declared SPDX id, never a closed floor) | the transversal audit found the seam wasn't sufficient (orphans + out-of-band reads); the rector forbids closed-enum floors | 2026-06-22 |
| **v3 Theme-2 install integrity** — a shipped bundle holds zero pointers to unshipped paths and zero gates naming non-existent artifacts: `dev/` dangle killed (harvest+repoint; the Stage-8 `/design-sync` re-pin reconstructed into `design-sync-kit.md`); `.design-sync` config single-sourced (kit owns it; adapter duplicate deleted); `canon.json` `$schema` neutralized (no tool-repo URL → no 404, no Stage-11 self-attribution leak); the kit ships a real offline `package-validate.mjs`; font `license:` = SPDX-id axis **plus a separate →GAP-on-absent routing rule** | a freshly installed bundle must be self-contained + honest, and a client-emitted file carries no tool-repo URL/org | 2026-06-23 |

## Open Items
| ID | Item | Severity | Status |
|---|---|---|---|
| OI-A | No downstream consumer yet ingests motion/depth tokens (web-stack `astro-css-tokens` reads neither). A future bridge skill could. | NICE | OPEN |
| OI-B | web-stack-skills cites no `G-*`/`ALGO-*` rule IDs today; enforceable canon downstream would need rule-ID citations there or carried as token metadata. | NICE | OPEN |
| OI-D | Literal Stage 2 (read-only) / Stage 6 (fill) §3 re-split deferred; the folded Stage 2 carries read+fill today. Revisit only if the PR-B1 spine is reopened. | NICE | OPEN |
| OI-E | Keystone `.md` RAG trip-point (size at which a Claude Project stops keeping it resident and chunks it) is unpublished by Anthropic → keystone size budget needs empirical calibration. The v3 skills treat it as a parameter; the measured figure is a Phase-5 validation task (resolves the keystone-files↔RESIDENT phase drift in favor of Phase 5). | MAJOR | OPEN (Phase 5) |
| OI-F | Second v3 validation brand not chosen — must be differently-shaped (no brandbook, light-only palette, incomplete material) to test generality. | MAJOR | OPEN (Phase 5) |
| OI-G | Graceful-degradation path for the scoper's living-questions doc when the chat env lacks a connector/filesystem. | NICE | RESOLVED (#13 scoper v3 — Stage 6: commit-where-possible, else a downloadable artifact) |
| OI-H | Resolver-based theming for OKLCH scheme derivation rides on the v2 SD-v5 / DTCG-2025.10 pin (issue #1590) → may need a custom-transformer/Terrazzo fallback. | NICE | OPEN |
| OI-I | v3 transversal-audit remaining remediation (Themes 3–7; full backlog in `v3-audit—2026-06-22.md`): provenance into the token spine F17 · keystone operability gate F15 · de-crystallize the n=2 coverage table F16 · manifests/version + docs sync F20/F23/F24/F26 · client surface F10/F38 · coverage-gap pass (research-foundation + client-doc/satellite templates). (Theme 1 F1/F3-F9/F11/F28/F29/F49 closed by #20; Theme 2 F2/F12/F13/F25 closed by this PR.) | MAJOR | OPEN (before Phase 5) |

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

## v3 — provenance, anti-determinism, and a brand an AI can be
v2's analyze→extract→prototype+library engine shipped and works. A fresh adversarial stress test — a third,
independently-authored brand of a different shape (a divergent multi-source identity: an authored brandbook,
fresher shipped social, a stale website) — exposed failure CLASSES v2's gates do not catch. They reduce to one
root: **the system loses track of each datum's epistemic status and crystallizes the unconfirmed or the
instance-specific as settled.** v3 is the fix; it extends the v2 skills, it does not restart them.

- **Rectoral constraint — anti-determinism.** Governs the WHOLE skillset, not one phase. Every part (discovery,
  inventory, capture, reproduction, the dimension map, the keystone file) reasons in general capability classes,
  spaces, and decision methods, never single-brand instances; a brand instance is only an illustration. The
  failure recurred at every stress-test phase and inside the v3 pre-research itself, so v3 enforces it
  structurally, not by intent.
- **North star — a brand an AI can BE.** Beyond the canon + component library, v3's keystone deliverable is a
  single attachable Markdown file that lets an AI **think / speak / design as** the brand (essence/positioning as
  operative reasoning + voice + design-reasoning derived from the token canon) plus an operational guardrail
  layer, sized to stay resident in a Claude Project's context. Mandatory build output; gives a testable
  end-to-end criterion (instantiate the brand-AI, judge fidelity).
- **Spine — provenance/epistemics on every datum.** Generalizes v2's `authored|derived` flag + GAP protocol:
  every datum carries source / confidence / owner / freshness, and is never used as if it had a status
  it has not earned. Observed expression enters as a hypothesis, never a finding; line-vs-one-off promotion needs
  owner confirmation.
- **Five axes / two columns.** Axes: coverage+epistemics · faithful capture+reproduction · horizons+keystone ·
  the Chat↔Code seam · two-surface output. Two columns that don't subsume each other: provenance discipline
  (honesty about known-vs-assumed) + faithful-capture craft (actually reproducing what is seen).
- **Status.** The v3 skills are BUILT (Phases 1–4 shipped to `main`, #12–#17). A full transversal SYSTEM/PRODUCT
  audit then ran — report `v3-audit—2026-06-22.md` (root); verdict **QUALIFIED NO** (conceptually sound, but the
  seam wasn't a single sufficient interface + dangling pointers/stale metadata; 5 BLOCKER · 27 MAJOR). **Theme 1
  (handoff seam, #20) and Theme 2 (install integrity) are now fixed.** Remaining audit themes 3–7 are tracked in OI-I, to clear before Phase 5
  (validation on a 2nd differently-shaped brand · live red-team · visual-diff audit · release). Plan in
  `v3-execution-plan.md`.

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
- Tried (v3 stress test): trusting `pdffonts`/font tables for the brand typeface. Abandoned: outlined brand
  type is invisible to the table, which reported the studio's embedded layout font. Do not retry —
  stated-spec-read (OCR/visual the named spec); metadata corroborates only.
- Tried (v3): a full-page PDF opened in Inkscape with a cropped viewBox as the "isolated" mark. Abandoned: not
  isolated — carried the whole page's paths/glyphs; bloated. Do not retry — subtree-extract
  (`page.get_drawings()`) / copy-region-to-new-doc, or label page-clips honestly.
- Tried (v3): recreating a brand's graphic-code pattern parametrically from scratch. Abandoned: wrong vs the
  source (invented, not compared). Do not retry — trace the source vector as master; parametric only as a
  visual-diff-validated variant.
- Tried (v3): passing social/applied expression as prose across the Chat→Code handoff. Abandoned: the builder
  can't ingest prose; the applied-expression dimension degraded. Do not retry — attach real media + give the
  builder an ingestion method.
- Tried (v3): resource handoff via Claude.ai URLs. Abandoned: unreachable behind auth; the builder hunted local
  Downloads. Do not retry — a placed-files manifest with checksums.
- Tried (v3, meta): researching/building the single brand instance instead of the general capability. Abandoned:
  determinism/tunnel-vision recurs at every phase. Do not retry — anti-determinism is rectoral.

## Change log
- 2026-06-23 — **v3 Theme 2 — install integrity.** Killed the `dev/v2-build-spec.md` dangle (12 cites repointed
  to their shipped homes or dropped; the Stage-8 `/design-sync` re-pin reconstructed into `design-sync-kit.md`);
  single-sourced the `.design-sync` config (deleted the adapter duplicate, kit's config is canonical); neutralized
  `canon.json` `$schema` (removed the tool-repo URL → no 404, no Stage-11 self-attribution leak); shipped a real
  offline `package-validate.mjs` + `validate` script so no Stage-10 gate names a phantom artifact; font-acquisition
  rider (read declared `license:` first; the →GAP-on-absent rule confirmed distinct from the SPDX-id axis).
  F2/F12/F13/F25 closed; audit Themes 3–7 remain (OI-I). Implemented by a delegated agent, adversarially verified.
- 2026-06-22 — **v3 transversal audit + Theme 1 seam fix.** Ran a 9-workstream + deep-seam SYSTEM/PRODUCT audit
  (report `v3-audit—2026-06-22.md`, root; verdict QUALIFIED NO — 5 BLOCKER · 27 MAJOR; the seam wasn't a single
  sufficient interface + dangling pointers/stale metadata). Fixed **Theme 1** — the handoff is now the single
  sufficient interface (#20): two-track manifest, voice/value + geometry/license carriers, the 3 orphaned blocks
  wired into Stage 0 with a live DIMENSION-MAP STOP, freshness enum unified, font `license:` opened to a declared
  SPDX id (capability class). Remaining audit themes tracked in OI-I. Each merge adversarially verified.
- 2026-06-22 — **v3 Phases 2–4 shipped (the skills are BUILT).** Phase 2: the v3 Chat↔Code handoff contract
  (#12). Phase 3: `brand-canon-scoper` rewritten to it (#13). Phase 4 (builder): provenance spine +
  stated-spec-read in capture (#14) · reproduction router + DTCG 2025.10 / OKLCH scheme engine (#16) · mandatory
  keystone `.md` emit + fidelity gate v3 (#17); plus a spine-label harmonization (#15) and a keystone-template
  comment fix. Each PR verified by adversarial multi-agent review before merge; OI-G resolved, OI-E moved to
  Phase 5. Phase 5 (validation + live red-team + release) is next.
- 2026-06-22 — **v3 scoped + Phase 1 ratified.** A stress test (3rd, independently-authored brand) exposed
  epistemic-status loss + determinism; ran identify→pre-research→research→plan; set the v3 center (rectoral
  anti-determinism · provenance spine · keystone north star); five-phase plan in `v3-execution-plan.md`. Carlos
  ratified the architecture spec + the 6-section keystone schema (distilled into Decisions, no separate spec file).
- 2026-06-22 — **v2 built & shipped.** Scoper rewrite + builder Stages 0–12 (asset/font acquisition ·
  applied-design · prototype + `/design-sync` kit · token spine · gaps · validate/fidelity · client-clean) +
  distribution + audit-remediation; F-001…F-026 closed; `dev/` untracked; RESIDENT/CLAUDE consolidated (PR-B7).
  `/design-sync` live-pinned vs Claude Code `v2.1.185` (server-side/version-fluid).
- 2026-06-21 — **Repo derived + first pilot.** Two skills + canon templates + DTCG/OKLCH spine built (GATE 1/2
  passed); the first real brownfield run surfaced the v2 reframe (OI-C) + F-001…F-026.

## Conventions of this doc
Timeless content undated; Open Items + change log are dated/volatile. Nothing external should cite the
volatile state as permanent.
