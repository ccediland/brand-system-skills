---
name: brand-system-skills-resident
description: Living resident doc for brand-system-skills — a Claude Code plugin marketplace whose skills
  build a generic, brand-agnostic, output-agnostic brand canon (four layers + DTCG/OKLCH token spine) for
  any brand. Use when any session touches this repo, its skills, the canon template, the token interchange
  contract, or its relationship to web-stack-skills. Canonical at the source; any mirror is read-only.
last_updated: 2026-06-21
applies_to: Repo ccediland/brand-system-skills — the brand-canon builder/scoper skills + canon template
canonical: github
domains: [brand-system, tooling, v2-refactor]
---

# brand-system-skills — RESIDENT

> Living doc for the repo that builds brand canons. **This repo is the SKILL/tooling**, not a brand canon
> itself. It was derived (Phase 4) by abstracting the method from a real, mature brand canon and validating
> coverage against a second, independently-authored one — so the output stays universal, not n=1.

## TL;DR
- A plugin marketplace (mirrors `web-stack-skills`) shipping one plugin `brand-system` with two skills:
  `brand-canon-builder` (Code-side, builds the canon) and `brand-canon-scoper` (Chat-side, scopes + hands off).
- It produces a four-layer canon (INDEX/ESSENCE/PRIMITIVES/GRAMMAR) + 2 satellites + a DTCG/OKLCH token
  spine, for any brand, greenfield or brownfield. Output-agnostic, generative, dual-legible.
- Sibling to `web-stack-skills` (flagship stack consumer). Same token spine on both sides → lossless hop.
- **v2 (load-bearing): the first real-brand run proved the v1 ships a *hollow skeleton*.** The skill must
  become an engine that **analyzes existing published brand work across mediums → extracts real assets →
  produces a real prototype + a Design-syncable component library by default** — not a from-scratch
  rule/token canon that defers assets to placeholders. The canon is the skeleton, never the deliverable.
  See `## v2`.

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
  token-spine, brownfield, greenfield, claude-design-adapter) + `assets/templates/` (canon skeletons, DTCG
  token spine, canon.json, satellites, docs, Claude Design adapter).
- `skills/brand-canon-scoper/` — `SKILL.md` + `references/handoff-format.md`.
- `dev/` — the bounded build's work-log (provenance) + `v2-backlog.md` (granular v2 findings F-001…F-026).
- `CLAUDE.md` — agent ops + guardrails + Compact Instructions (build-time memory).

## Integrations / ritual
- **web-stack-skills** = downstream consumer. Its `astro-css-tokens` skill ingests the DTCG `tokens/` spine
  (3-file, OKLCH-string `$value`, plain-string values, `{tier.cat.name}` aliases, namespace-aligned category
  names). Validate "does a canon project cleanly into web-stack-skills?" whenever the token contract changes.
- **Claude Design** = consumer via `/design-sync`, which needs a COMPILED COMPONENT LIBRARY (dist/Storybook/
  package), not a canon. v2 makes that library a default build output (see `## v2`, F-026).
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
| **v2 reframe:** skill = analyze published work across mediums → extract real assets → real prototype + Design-syncable component library; canon is the skeleton, not the deliverable | first real run shipped a hollow, unpresentable skeleton | 2026-06-21 |
| **v2:** default is to analyze/refine/transform/improve already-published work, NOT create from scratch | scratch only on explicit instruction; brownfield-vs-greenfield was the wrong top dichotomy | 2026-06-21 |
| **v2:** asset extraction (from source PDFs) + font acquisition are blocking build steps | a canon with no mark/fonts renders nothing on-brand | 2026-06-21 |
| **v2:** compiled component library emitted by default as a projection; success criteria add a brand-fidelity / presentable gate | repo must be born `/design-sync`-ready and IS the real prototype; rule-compliance of an empty skeleton passed every gate | 2026-06-21 |
| **v2:** medium-agnostic intake discovery — los slots del canon definen lo NECESARIO, el discovery abierto lo EXISTENTE, el delta es un GAP rastreado; reemplaza cualquier routing por tipo-de-artefacto (PDF/site/social) | el intake nunca debe presumir la forma del material de una marca; surgió en el primer scoping real | 2026-06-21 |
| **v2 builder:** `/design-sync` ingiere un `dist/` compilado, no source → la component library se emite con package-shape por default (build de un comando: `esbuild` + `ts-morph`) | el contrato verificado del converter exige `dist/` + `.d.ts`; un handoff source-only no es ingerible | 2026-06-22 |
| **v2 builder:** la compiled component library es el hueco de ecosistema que el builder llena | ninguna herramienta existente compila un paquete `/design-sync`-ready desde un canon kit (Dembrandt/designlang extraen; web-stack-skills construye sitios; `/design-sync` consume) | 2026-06-22 |
| **v2 builder:** asset acquisition source-agnostic (matriz por tipo-de-fuente, sin asumir PDF) | nunca presumir que existe un solo tipo de fuente; la técnica de extracción se elige por fuente encontrada | 2026-06-22 |
| **v2 builder:** pin Style Dictionary v5 + DTCG draft 2025.10 | DTCG 2025.10 aún no está full-supported en SD v5 (issue #1590); usar el transform `color/oklch`, nunca `color/css` | 2026-06-22 |

## Open Items
| ID | Item | Severity | Status |
|---|---|---|---|
| OI-A | No downstream consumer yet ingests motion/depth tokens (web-stack `astro-css-tokens` reads neither). A future bridge skill could. | NICE | OPEN |
| OI-B | web-stack-skills cites no `G-*`/`ALGO-*` rule IDs today; enforceable canon downstream would need rule-ID citations there or rule-IDs carried as token metadata. (Canon itself DOES enable rule-ID citation.) | NICE | OPEN |
| OI-C | Skills exercised end-to-end on a real brownfield brand (print-native pilot). **DONE** → surfaced the v2 reframe + 26 findings. Superseded by `## v2` / WS0–WS5 / `dev/v2-backlog.md`. | SHOULD | RESOLVED → v2 |

## v2 — first real run: the reframe + surface roadmap
The first end-to-end run (OI-C, a real brownfield print-native pilot) proved the v1 output is a **hollow
skeleton**: structurally sound (authored/derived correct, brand-scrub correct, rules cited by ID) but
unusable as a deliverable — no real assets, placeholder mark, fallback fonts, generic renders. The skill
validated rule-compliance of an empty skeleton and called it done. Granular findings F-001…F-026 in
`dev/v2-backlog.md`.

**Reframe (center of gravity).** Not a from-scratch, output-agnostic rule/token canon that defers assets.
An engine that **analyzes existing published brand work across mediums → extracts the real assets →
produces a real prototype + a Design-syncable component library, by default.** The four-layer canon is the
*skeleton*, never the deliverable. We do not create brands from scratch unless explicitly instructed.

**Workstreams** (detail in `dev/v2-backlog.md`):

| WS | Thrust |
|---|---|
| WS0 | Reframe: analyze-published-work default; real prototype; Design-syncable by default; no placeholder-default (F-023/024/025/026) |
| WS1 | Scoper = guided intake instrument (interview, asset-inventory request, gap doc); never infers WHY, never extracts primitives (F-002/008/009/003/006/007/020) |
| WS2 | New post-build VALIDATE/AUDIT stage: render real samples + content audit + client confirmation (F-016) |
| WS3 | Client-clean output: scrub apparatus; gate ratification (F-013/014/015) |
| WS4 | Distribution / install / deps (F-001/011) |
| WS5 | Real assets + brand fidelity: PDF asset extraction, font acquisition, fidelity gates (F-018/019/021/022) |

WS0 (doctrine) + WS1 (scoper intake instrument): specced en `dev/v2-intake-spec.md` (v1.0) y **MERGED** — el rewrite del scoper está hecho (PR #1, commit `485cbdb`). Lado scoper cerrado.
WS2–WS5 + el bridge WS0/WS1 del builder: specced en `dev/v2-build-spec.md` (v1.1, research-grounded Round B). Ejecución en PRs por etapas (PR-B1…PR-B6); PR-B1 = reconciliación de modo + consumo del handoff contract.

> **Caveat (`/design-sync` contract).** El contrato del converter en `v2-build-spec.md` §4.6 está reconstruido desde el mirror comunitario **Piebald-AI/claude-code-system-prompts** (vs `ccVersion 2.1.176`), no de un doc oficial de Anthropic. **Re-verificar contra el skill `/design-sync` vivo antes de que PR-B3** implemente el kit emitter.

**Surface split — who does what:**

| Surface | Work | Model |
|---|---|---|
| **Chat (home base)** | Design the v2 method: intake/understanding methodology (F-023/024); asset-inventory request + questionnaire + multi-stakeholder confirmation (F-008/009/020); brand-fidelity success criteria (F-022); Design-by-default shape (F-026); validate/audit stage spec (F-016). Author the v2 spec prose + decisions. Maintain this RESIDENT + the backlog. | top Opus |
| **Code (excursions)** | Rewrite both skills' `SKILL.md` + `references/` to spec; build the PDF asset-extraction pipeline (F-018) and font-acquisition step (F-019); scaffold the default compiled component-library template so every repo is born `/design-sync`-ready (F-026); build the validate/audit stage into the builder (F-016/022); add brand-fidelity gates + tests; update `assets/templates/`. | Opus for method-encoding, cheap/fast tier for bulk scaffolding |

## Dead-ends — do not retry
- Tried: ship an output-agnostic rule/token canon and defer all real assets to `GAP-NNN`. Abandoned: it
  passes every gate but renders nothing presentable. Do not retry — assets, fonts and a real prototype are
  blocking build outputs, not deferrable gaps. (WS0/WS5)
- Tried: greenfield(elicit) vs brownfield(mine) as the top dichotomy. Abandoned: the real default is
  analyze-published-work-across-mediums → harvest/refine/transform/improve; from-scratch is the rare,
  explicitly-instructed exception. (F-024)
- Tried: default "Claude Design adapter? no" / not-attached. Abandoned: contradicts the standing goal of
  direct `/design-sync`; the compiled component library is a default build output. (F-026)
- Tried: scoper auto-mines material, infers the WHY/essence, and extracts primitives. Abandoned: WHY is not
  in source material (must be elicited) and the scoper's extraction was wrong. Do not retry — the scoper
  elicits + points; the builder extracts. (F-002/F-003/F-008)

## Change log
- 2026-06-22 — Builder v2 spec `dev/v2-build-spec.md` commiteado (v1.1, research-grounded Round B): WS2–WS5 + bridge WS0/WS1, plan de PRs por etapas (PR-B1…PR-B6). PR-B1 ejecutado en `brand-canon-builder`: Stage 0 = parse del handoff contract, Stage 2 = lectura de modo (default ANALYZE) + material in-repo `assets/`/`sources/` (D2); `brownfield.md`→`analyze.md`, `greenfield.md`→`create.md`; nota-ley §5.2 (canon = esqueleto; prototipo + library = deliverable) en `architecture.md`. Scoper rewrite ya MERGED (PR #1, `485cbdb`).
- 2026-06-21 — WS0 doctrine + WS1 scoper intake instrument specced en `dev/v2-intake-spec.md` (v1.0; grounded: Brand Key/Keller/Aaker/Neumeier/Wheeler + W3C/DTCG 2025.10 + OKLCH + Lahdelma/Rythm). Listo para reescribir `brand-canon-scoper/SKILL.md` + `references/handoff-format.md`.
- 2026-06-21 — First end-to-end run on a real brownfield (print-native pilot) — OI-C. Output structurally
  sound but unusable as a deliverable (no real assets/prototype). Logged the v2 reframe + findings
  F-001…F-026 (`dev/v2-backlog.md`); added the `## v2` section (workstreams + Chat/Code surface roadmap),
  Dead-ends, decisions, and resolved OI-C.
- 2026-06-21 — Repo derived (Phase 4) and built: two skills, full canon template set, DTCG/OKLCH token spine,
  Claude Design adapter, docs. GATE 1 approved by Carlos; GATE 2 (brand-scrub = 0, DTCG validate + web-stack
  round-trip, universality stress test) passed before commit. See `dev/work-log—2026-06-21.md` for provenance.

## Conventions of this doc
Timeless content undated; Open Items + change log are dated/volatile. Nothing external should cite the
volatile state as permanent.
