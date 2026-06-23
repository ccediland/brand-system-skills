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
- **v3 (skills built; validation next):** a fresh adversarial stress test (a third, independently-authored brand) exposed failure classes v2's gates miss — all reducing to lost epistemic status. v3's **rectoral constraint is anti-determinism**; its **north star** is a single attachable file an AI can *think / speak / design as* the brand; its **spine** is provenance on every datum. **Phases 1–4 shipped to `main`** (handoff contract · scoper v3 · builder v3 — capture/spine, reproduction+tokens, keystone+fidelity-gate); the transversal-audit remediation + a fresh full system audit (#25) and its fix-passes (#20–#28) leave the repo at **zero BLOCKER and zero MAJOR** (F10 closed #28); only a MINOR/NIT tail + a coverage-gap pass remain before Phase 5 (validation + live red-team + release). Plan in `v3-execution-plan.md`. See `## v3`.

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
| **v3 Theme-3 provenance spine into the tokens** — every emitted token carries `$extensions.brand.provenance` {source, confidence, owner, freshness}; `authored\|derived` is the SOURCE projection only and is ORTHOGONAL to the confidence ladder (same shape as the font-`license:` precedent — one axis describes, one gates); an `authored` value can still be `hypothesis` until owner-confirmed | a datum must never be used above the confidence it earned; the spine carried source but not status into the tokens | 2026-06-23 |
| **v3 confidence ladder byte-identical at every hop** — `hypothesis \| corroborated \| owner-confirmed`, no fourth value/synonym anywhere; the keystone's invented `confirmed` replaced with `owner-confirmed` and `corroborated` represented; the keystone REFERENCE asset line READS token-derived confidence from `$extensions.brand.provenance` (or canon.json / RESIDENT GAP ledger), never recalled from emitter memory | vocabulary drift between hops let a datum change status silently | 2026-06-23 |
| **v3 Theme-4 keystone gate audits OPERABILITY** — §7b adds a CONTENT check (THINK + DESIGN-as each ≥1 when-X-then-Z rule, SPEAK ≥1 on/off-brand pair, no core section a bare adjective list) testing FORM-OF-RULE only, never fixed brand content; `not-used(owner-declared)` dimensions resolve clean; DESIGN-as sources named (token spine + GRAMMAR G-*/ALGO-* + PRIMITIVES intent + ESSENCE meaning), not an unnamed "design rationale" | a structurally-perfect but operationally-hollow keystone (adjectives dressed as rules) passed the shape-only gate | 2026-06-23 |
| **v3 Theme-4 fidelity gates leave persisted evidence** — §7a commits the source + reproduction + recorded verdict to `audit/fidelity/<treatment-id>/` (absence = FAIL); §7b emits + commits the red-team battery + expected-refusal contract to `audit/redteam/` even when non-blocking (empty/un-run = FAIL); the LIVE red-team run is Phase-5-deferred but its deferral does NOT void the now-gated artifacts | both new v3 gates reduced to "a human said OK" with no committed trace | 2026-06-23 |
| **v3 Theme-5 coverage = illustrative floor, not a closed universe (F16)** — the n=2 must-have table is a PROMPT for the universality stress test (the real completeness gate); each row is `expected-unless-not-used(owner-declared)` so a legitimately-absent dimension (monogram-only / single-ink / sonic-primary) resolves CLEAN; mirrored in `architecture.md` Adaptivity | a frozen n=2 intersection-as-floor is the determinism failure in textbook form — a valid brand violated the enumerated minima | 2026-06-23 |
| **v3 Theme-6 public surface honest + current (F20/F23/F24/F50)** — both manifests carry the mandatory keystone deliverable, drop the retired "greenfield/brownfield" vocabulary for ANALYZE/CREATE framing, and bump to v0.3.0 in lockstep (pre-1.0 minor, Phase-5 pending); README notes the `/design-sync` contract is server-side/version-fluid | the pre-install promise omitted the north-star keystone, marketed retired vocabulary, and pinned 0.2.0 across a shipped v3 major | 2026-06-23 |
| **v3 Theme-6 build-tracking tokens stripped from shipped prose (F21/F22)** — internal IDs (PR-B*, F-0NN, D-B*, OI-*, GATE-2, Dn) + stale "forward-pointer"/"later-staged-PR" language scrubbed from all shipped references + emitted templates; Stage numbers + human-readable rules kept; a real cross-skill contract is named (CORE-ASSET FIDELITY CONTRACT), never an ID | tokens resolving to nothing in the bundle leaked into AI-facing prose, and "No forward-pointers remain" contradicted references still calling shipped gates forward-pointers | 2026-06-23 |
| **v3 execution plan resynced to Phase 5 (F26/F56)** — `v3-execution-plan.md` moved from a frozen end-of-Phase-1 state to `current_phase: 5 of 5`; design+build marked DONE, residual surface is Code (the run) + Chat (judgment); RESIDENT and the plan now agree on phase + shipped state | a plan frozen at "Phase 2, build at zero percent" would have a fresh session re-do completed phases | 2026-06-23 |
| **v3 honest medium scoping (system-audit B1/B2/M5/M6)** — every layer that assumed a visual `mark` now resolves the brand's PRIMARY-IDENTITY CARRIER(S) from the DIMENSION MAP — an OPEN class (visual mark \| sonic-mark \| motion-signature \| other declared lead atom), never a hardcoded enum. The fidelity floor, prototype evidence, keystone §4 DESIGN-as, and reproduction router act against that carrier; where the build has no build-grade producer for its medium it emits a DECLARED fidelity-blocking GAP (a tracked horizon), never a false-fail on a visual mark nor a silent pass. §7b keystone OPERABILITY (medium-agnostic) is now explicitly distinct from build-grade FIDELITY (§1/§2, visual-scoped) | the gate floor + render evidence were visual-only while the system advertised medium-agnosticism, so a sonic/motion-primary brand gate-failed on an element it doesn't lead with | 2026-06-23 |
| **v3 keystone consumes the WHY personality carriers (system-audit M1, orphan closed)** — Personality (Aaker-5 scored) + Differential scales feed keystone §2 THINK as named reasoning inputs; Personality (Aaker-5) + Resonance seed §3 SPEAK voice attributes; both `keystone-emit.md` and the `keystone.md` template now carry the slots, so the builder/scoper promise that the keystone consumes them is TRUE (GAP-not-fabrication where a carrier is `none`) | three owner-elicited WHY carriers were emitted + promised-consumed but had no keystone slot | 2026-06-23 |
| **v3 scoper client instrument instantiated + medium-agnostic intake (F10/F38)** — §6 ships a worked EXAMPLE of the external client instrument (jargon-free Mexican Spanish for a non-design owner, design terms glossed inline by example, a generic placeholder brand, one Found/Missing/To-confirm line) — the tone-fidelity-critical surface is no longer specified-but-uninstantiated; and the §3 asset-intake fidelity rubric is generalized to a capability class (a non-visual PRIMARY carrier — sonic / motion / verbal — gets its own build-grade/reference/missing rating elicited at intake), mirroring the #26 primary-identity-carrier model so the scoper ELICITS what the handoff/gate/keystone already carry | the client-facing surface most dependent on owner-language tone had no exemplar, and the intake rubric was visual-only while the system claims medium-agnosticism | 2026-06-23 |
| **v3 client-drift + repo hygiene (system-audit M2/M3/M4)** — (M2, rector) the real n=1 brand name is removed from `.gitignore` and the brand-scrub pattern generalized (`**/brandbook*.pdf` · `**/*-brandbook*.pdf` · `**/reference-*.pdf`) so a 0-brand-name grep over the WHOLE tracked tree is EMPTY — a standing pre-commit gate; (M3) the client RESIDENT template's gaps table carries the mandated 7th `Provenance` origin-tag column (`handoff-deliberate\|handoff-defect\|builder\|skill-scope`) so every scaffolded repo can hold a gap's origin; (M4) `conventions.md` is single-sourced to the kit (the drifted adapter-dir duplicate deleted, the §Shape pointer fixed) and the mandatory keystone (+ prototype + library) is surfaced in every deliverable map that omitted it (the inherited client README's Deliverables block, the builder SKILL "What it produces", and the tool README builder row) | a real brand name in a brand-agnostic repo (rector violation), a client ledger structurally unable to hold the gap-origin tag, a dead drifted conventions copy, and an inherited front door that omitted the north-star deliverable | 2026-06-23 |

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
| OI-J | **Non-visual-primary build-grade reproduction** (sonic / motion) is a tracked HORIZON, explicitly NOT a blocker: the reasoning layers are already medium-agnostic and a non-visual primary carrier resolves to a declared fidelity-blocking GAP today (honest scoping, #26). Producing build-grade output for a motion signature (timing/easing + frame-diff) or a sonic mark is a NEW capability MILESTONE, post-Phase-5. | NICE | OPEN (horizon, post-Phase-5) |
| OI-I | v3 transversal-audit remaining remediation (full backlog in `v3-audit—2026-06-22.md`): **Theme 7 client surface** — F10 (instantiate the scoper's external client instrument with a worked Spanish example) · F38 (non-visual fidelity rubric) · F32 (token-namespace reconciliation) — plus the **coverage-gap audit pass** (research-foundation + client-doc/satellite templates). Closed: Theme 1 F1/F3-F9/F11/F28/F29/F49 (#20); Theme 2 F2/F12/F13/F25 (#21); Theme 3/4 F14/F15/F17/F18/F19/F37 (#23); Theme 5 F16 + Theme 6 F20/F21/F22/F23/F24/F26 + F50/F56 (#24); Theme 7 **F10 + F38 closed (#28)**. Repo now ZERO BLOCKER and ZERO MAJOR; only F32 (token-namespace) + the system-audit MINOR/NIT tail + the coverage-gap pass remain (PR-8 re-baselines this item). | MAJOR | OPEN (before Phase 5) |

(OI-C — end-to-end run on a real brownfield pilot — RESOLVED: it surfaced the v2 reframe + F-001…F-026, all shipped. See `## v2`.)

## v2 — lineage (historical)
The first real brownfield pilot proved v1 shipped a **hollow skeleton** (rule-compliant but asset-less — no
real mark/fonts/renders, called done). v2's reframe, now shipped: **analyze published brand work across
mediums → extract the real assets → emit a real prototype + a `/design-sync`-ready component library** by
default; the four-layer canon is the *skeleton*, never the deliverable (scratch only on explicit instruction).
The method lives in `skills/*` (`F-001…F-026` closed); the surface split (design→Chat, filesystem/git→Code) is
normal flow.

> **`/design-sync` caveat (still binding).** The converter contract is server-side/version-fluid (re-read live
> via `get_claude_design_prompt`); the builder re-pins at run time, so treat pinned field/script names as fluid,
> not frozen. Step-0 re-pin procedure in `design-sync-kit.md`.

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
  seam wasn't a single sufficient interface + dangling pointers/stale metadata; 4 BLOCKER · 22 MAJOR · 24 MINOR ·
  6 NIT). The remediation is now SHIPPED: Theme 1 handoff seam (#20), Theme 2 install integrity (#21), Theme 3/4
  provenance spine + keystone operability (#23), and Theme 6 public surface + docs sync + the pulled-forward
  Theme-5 F16 (#24). A fresh full system audit (#25, `v3-system-audit—2026-06-23.md`) then drove three more
  fix-passes — honest medium scoping + keystone-orphan close (#26), client-drift + repo hygiene (#27), and the
  scoper client instrument + medium-agnostic intake (#28) — so **the repo now carries ZERO BLOCKER and ZERO
  MAJOR.** Only a MINOR/NIT tail (F32 token-namespace + the system-audit minors) + the coverage-gap audit pass
  remain before Phase 5 (validation on a 2nd differently-shaped brand · live red-team · visual-diff audit ·
  release). Plan in `v3-execution-plan.md`.

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
- 2026-06-23 — **Scoper client instrument + medium-agnostic intake (#28).** Instantiated the §6 external client instrument with a worked jargon-free Mexican-Spanish example (generic placeholder brand; design terms glossed inline; one Found/Missing/To-confirm line) — closes **F10, the lone surviving #19 MAJOR**. Generalized the §3 intake fidelity rubric to a capability class (non-visual sonic/motion/verbal primary carrier rated at intake — F38). Structure hygiene: H4 `4a`/`4b` → H3, top-of-file reference-load block (F47); trimmed the frontmatter description for headroom, no trigger lost (F52); fixed the posture confidence short-circuit — in-session = `corroborated`, promoted to `owner-confirmed` only at gate-6 (F54). **Repo now carries ZERO BLOCKER and ZERO MAJOR.** F55 (bold density) deliberately deferred as a defensible practitioner deviation. Only a MINOR/NIT tail + the coverage-gap pass remain (PR-8).
- 2026-06-23 — **Client-drift + repo hygiene (#27).** Killed the `.gitignore` real-brand-name leak (M2 — a rector violation; pattern generalized, 0-brand-name grep now EMPTY tree-wide); added the mandated `Provenance` origin-tag column to the client RESIDENT gaps template (M3); single-sourced `conventions.md` to the kit (deleted the drifted adapter-dir duplicate, fixed the §Shape pointer) and surfaced the mandatory keystone + prototype + library in every deliverable map that omitted it — the inherited client README (a new Deliverables block), the builder SKILL "What it produces", and the tool README builder row (M4); glossed DTCG/OKLCH in the inherited README + added glossary pointers in client CLAUDE/RESIDENT (jargon MINOR). Structured-color MINOR discharged by the frozen doc's existing status marker (no body edit, artifact preserved). Closes system-audit M2/M3/M4 + jargon MINOR.
- 2026-06-23 — **Honest medium scoping + keystone-orphan close (#26).** Every layer that assumed a visual `mark` now resolves the brand's primary-identity carrier from the DIMENSION MAP (open class — visual mark \| sonic-mark \| motion-signature \| other); an unsupported medium → a DECLARED fidelity-blocking GAP (tracked horizon OI-J), never a false-fail nor a silent pass; §7b operability made explicitly distinct from build-grade fidelity. The keystone now consumes Personality/Differential/Resonance (orphan closed). Co-located: posture `profile:` open-classed, F34 filter literal flagged illustrative, type-pairing collapse, ingest-css invariant stated. Closes system-audit B1/B2 (BLOCKER) + M1/M5/M6 (MAJOR) + 4 co-located MINOR/NIT; sonic/motion build-grade tracked as OI-J (post-Phase-5).
- 2026-06-23 — **v3 system audit produced (#25).** Full repo + functional-pipeline reassessment vs current main; see `v3-system-audit—2026-06-23.md` (root, audit-only). Verdict QUALIFIED YES on the visual default path (all five #19 BLOCKERs dead); 2 BLOCKER scoped to the medium-agnostic / sonic-motion shape · 6 MAJOR · 10 MINOR · 4 NIT. Open Items to be re-baselined from its ledger in the next fix-pass.
- 2026-06-23 — **Theme 6 public surface + docs sync + the pulled-forward Theme-5 F16 (#24).** Both manifests
  carry the mandatory keystone deliverable + ANALYZE/CREATE framing + v0.3.0 (dropped "greenfield/brownfield");
  README states the `/design-sync` contract is server-side/version-fluid; the coverage table reframed to an
  illustrative floor with the universality stress test primary (rows `expected-unless-not-used`); build-tracking
  tokens (PR-B*/F-0NN/D-B*/OI-*/GATE-2/Dn) + stale forward-pointer language stripped from shipped references +
  emitted templates; `v3-execution-plan.md` resynced to Phase 5. **Repo now carries ZERO BLOCKER**; F10 (Theme-7
  scoper client instrument) is the sole open MAJOR. F16/F20/F21/F22/F23/F24/F26 + F50/F56 closed.
- 2026-06-23 — **Theme 3/4 provenance spine + keystone operability (#23).** Provenance into the token spine (`$extensions.brand.provenance` on every token; `authored\|derived` orthogonal to the confidence ladder); keystone confidence vocab made byte-identical (`confirmed`→`owner-confirmed`, ladder shown); §7b gains a FORM-OF-RULE content check (operability, not shape) + DESIGN-as sources named; §7a/§7b leave persisted evidence (`audit/fidelity/` + `audit/redteam/`, absence = FAIL; live run = Phase 5). F14/F15/F17/F18/F19/F37 closed.
- 2026-06-23 — **Theme 2 install integrity (#21).** Killed the `dev/v2-build-spec.md` dangle (12 cites
  repointed/dropped; Stage-8 re-pin reconstructed into `design-sync-kit.md`); `.design-sync` config
  single-sourced; `canon.json` `$schema` neutralized; real offline `package-validate.mjs` shipped; license
  →GAP rule confirmed distinct from the SPDX axis. F2/F12/F13/F25 closed.
- 2026-06-22 — **Theme 1 seam fix (#20)** after the transversal audit (`v3-audit—2026-06-22.md`; QUALIFIED NO,
  4 BLOCKER · 22 MAJOR · 24 MINOR · 6 NIT). The handoff is made the single sufficient interface (two-track manifest · voice/value +
  geometry/license carriers · 3 orphaned blocks wired into Stage 0 with a live DIMENSION-MAP STOP · SPDX license).
  F1/F3-F9/F11/F28/F29/F49 closed.
- 2026-06-22 — **v3 Phases 1–4 shipped (skills BUILT).** Phase 1 ratified; handoff contract (#12) · scoper v3
  (#13) · builder — spine+capture (#14), reproduction+DTCG/OKLCH (#16), keystone+fidelity-gate (#17); spine
  harmonization (#15). OI-G resolved; OI-E → Phase 5.
- 2026-06-22 — **v3 scoped + Phase 1 ratified.** Stress test (3rd brand) exposed epistemic-status loss +
  determinism; set the v3 center (anti-determinism · provenance spine · keystone north star); plan in
  `v3-execution-plan.md`.
- 2026-06-21..22 — **v2 built & shipped + repo derived.** Two skills + canon templates + DTCG/OKLCH spine
  (GATE 1/2); builder Stages 0–12 + distribution + audit-remediation; `F-001…F-026` closed; `dev/` untracked.

## Conventions of this doc
Timeless content undated; Open Items + change log are dated/volatile. Nothing external should cite the
volatile state as permanent.
