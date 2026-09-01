---
name: bitacora-brand-system-skills
title: brand-system-skills — bitácora
description: >-
  Registro append-only de lo que pasó en este repo y cuándo. Es RASTRO, no fuente: los hechos
  atemporales viven en RESIDENT.md y las reglas en CLAUDE.md; aquí solo se referencian.
last_updated: 2026-08-31
status: vigente
supersede: ninguno
---

# brand-system-skills — bitácora

> **Append-only.** Se agrega al final; **nunca** se edita ni se reordena una entrada pasada. Si algo
> quedó mal, se corrige con una entrada nueva que referencia a la vieja.
>
> Un dictamen o una revisión posterior **es una entrada más, abajo y con su fecha** — jamás una nota
> pegada en esta cabecera. Una cabecera que reinterpreta lo de abajo contradice el append-only, y ya
> pasó una vez: un dictamen afirmaba «la única entrada» sobre un archivo que tenía cinco, y mintió el
> mismo día en que se escribió.

## Para qué sirve tener esto aparte

`RESIDENT.md` contesta *cómo es este proyecto hoy*. Si además carga la narrativa de lo que fue
pasando, cambia en cada sesión — y entonces el knowledge de su Project queda desfasado siempre y el
«Sync now» manual se vuelve diario. Con la bitácora aparte, el RESIDENT solo cambia cuando la forma
del proyecto cambia de verdad, y lo fechado —que es justo lo que envejece el knowledge— nunca entra
ahí.

## Formato

```markdown
## AAAA-MM-DD · <superficie> · <objetivo en una línea>

Hecho: <qué se produjo, en pasado, con cifras si las hay>
Decidido: <IDs de decisiones registradas, o "ninguna">
Pendiente: <lo que quedó abierto>
Siguiente: <la primera acción de la próxima sesión>
```

Superficie es una de: Code, Chat, Chrome, Cowork.

---

## 2026-08-31 · Code · Se siembra la bitácora, con lo que ya había pasado

Hecho: se crea este archivo como parte del doc-set de cinco del estándar de VenturEdge. La primera
entrada no se inventa: recoge los commits reales de esta sesión en el repo.

- Arreglar front matter y punteros que el auditor encontro (#78)

Decidido: ninguna en este repo (las del sistema viven en `_meta/venturedge-framework/decisiones.md`).
Pendiente: `MAPA.md`, el quinto documento del estándar, que aquí todavía no existe.
Siguiente: al cerrar la próxima sesión que toque este repo, agregar su entrada aquí — sin preguntar.

## 2026-08-31 · Code · Sesión de sistema

Hecho: 3 commit(s) en este repo, dentro de la sesión que cerró el doc-set de cinco en los
quince repos, escribió el criterio de dónde registrar un esfuerzo, y construyó el agregador de
avance sobre los dos dominios de Workspace.

- limpieza: sacar los volcados de sesion de Playwright MCP (#81)
- docs: MAPA.md, el quinto documento del estandar (#80)
- docs: BITACORA.md, el cuarto documento del estandar (#79)

Decidido: las del sistema viven en `_meta/venturedge-framework/decisiones.md` (`VE-2026-020` a
`VE-2026-033` se escribieron hoy).
Pendiente: lo que quedó abierto está en `pendientes.md` y como issues etiquetados por área.
Siguiente: al cerrar la próxima sesión que toque este repo, agregar su entrada aquí — sin preguntar.

## 2026-08-31 · Code · La caja de medios del builder, instalada y probada

Hecho: barrido exhaustivo (5 lectores) de los casos de medios que builder/scoper declaran, cruzado
contra la caja real de la máquina. Instalado lo que faltaba de sistema: Inkscape 1.4.3, pdf2svg,
rsvg-convert, woff2, dembrandt (npm, el extractor primario de tokens de sitio vivo), y el venv
`.venv/` de este repo con el stack que fidelity-diff.py exige (pymupdf 1.28.2, opencv 5.0, numpy,
scikit-image, pillow, fonttools, requests) — import-guard en verde (ya no exit 3) y pipeline real
probado: SVG→PDF con Inkscape, get_drawings() extrae los paths, pdf2svg de regreso, métricas OS/2
con fontTools. `.venv/` entra al .gitignore.

Encontrado y corregido: el `mark.svg` de la plantilla era XML inválido — el comentario contenía
`--` (por escribir `var(--color-brand)` dentro de un comentario). Inkscape lo toleraba; librsvg y
cualquier parser estricto rechazaban el archivo COMPLETO, y cada repo emitido lo heredaba. Barrido
de la clase en todo ~/proyectos: solo la plantilla madre estaba mal, los fixtures limpios.

Sin instalar, con razón: design-extract (0.1.0, demasiado verde — dembrandt lo cubre),
illustrator-parser-pdfcpu y token-transformer (deps por-proyecto npm, no de sistema; Ghostscript ya
está para EPS/.ai), Storybook/Chromatic/esbuild/Style Dictionary (viven en el package.json del kit
emitido). Firecrawl (fallback anti-bot) necesita cuenta/key de Carlos — issue abierto.

## 2026-06-21 · Code · decisión — brand-system-skills-D-001

Decidido: Two skills (builder Code-side + scoper Chat-side)
Por qué: filesystem-bound build vs. chat-only scoping; thin handoff between

(migrada del RESIDENT el 2026-09-01)

## 2026-06-21 · Code · decisión — brand-system-skills-D-002

Decidido: OKLCH literal in `$value`; hex/rgb derived, Pantone/CMYK authorable via `source` flag
Por qué: OKLCH = canonical spine; print spot colors don't round-trip and must be declarable as truth

(migrada del RESIDENT el 2026-09-01)

## 2026-06-21 · Code · decisión — brand-system-skills-D-003

Decidido: base/semantic/component tiering documented as the DTCG standard, not as web-stack's shape
Por qué: keep canon stack-agnostic; alignment is convergence on a standard

(migrada del RESIDENT el 2026-09-01)

## 2026-06-21 · Code · decisión — brand-system-skills-D-004

Decidido: Emit motion/depth tokens even without a current consumer
Por qué: first-class optional dimensions; a downstream bridge can come later

(migrada del RESIDENT el 2026-09-01)

## 2026-06-21 · Code · decisión — brand-system-skills-D-005

Decidido: Don't pad the must-have checklist; rely on GAP protocol + universality stress test
Por qué: a longer checklist ≠ a more complete canon

(migrada del RESIDENT el 2026-09-01)

## 2026-06-21 · Code · decisión — brand-system-skills-D-006

Decidido: **v2 reframe:** skill = analyze published work → extract real assets → real prototype + Design-syncable library; canon is the skeleton, not the deliverable
Por qué: first real run shipped a hollow, unpresentable skeleton

(migrada del RESIDENT el 2026-09-01)

## 2026-06-21 · Code · decisión — brand-system-skills-D-007

Decidido: **v2:** default is to analyze/refine/transform/improve already-published work, NOT create from scratch
Por qué: scratch only on explicit instruction; brownfield-vs-greenfield was the wrong top dichotomy

(migrada del RESIDENT el 2026-09-01)

## 2026-06-21 · Code · decisión — brand-system-skills-D-008

Decidido: **v2:** real asset acquisition (source-agnostic, any medium) + font acquisition are blocking build steps
Por qué: a canon with no mark/fonts renders nothing on-brand; the source-agnostic matrix supersedes the PDF-only framing

(migrada del RESIDENT el 2026-09-01)

## 2026-06-21 · Code · decisión — brand-system-skills-D-009

Decidido: **v2:** compiled component library emitted by default; success criteria add a brand-fidelity / presentable gate
Por qué: repo must be born `/design-sync`-ready and IS the real prototype; rule-compliance of an empty skeleton passed every gate

(migrada del RESIDENT el 2026-09-01)

## 2026-06-21 · Code · decisión — brand-system-skills-D-010

Decidido: **v2:** medium-agnostic intake — canon slots define what is NEEDED, open discovery what EXISTS, the delta is a tracked GAP; replaces any artifact-type routing
Por qué: intake must never presume the shape of a brand's material; surfaced in the first real scoping

(migrada del RESIDENT el 2026-09-01)

## 2026-06-22 · Code · decisión — brand-system-skills-D-011

Decidido: **v2 builder:** `/design-sync` ingests a compiled `dist/`, not source → the library ships package-shape by default (one-command build: `esbuild` + `ts-morph` + `@types/react`)
Por qué: the converter's verified contract requires `dist/` + `.d.ts`; a source-only handoff isn't ingestible

(migrada del RESIDENT el 2026-09-01)

## 2026-06-22 · Code · decisión — brand-system-skills-D-012

Decidido: **v2 builder:** the compiled component library is the ecosystem gap the builder fills
Por qué: no existing tool compiles a `/design-sync`-ready package from a canon kit

(migrada del RESIDENT el 2026-09-01)

## 2026-06-22 · Code · decisión — brand-system-skills-D-013

Decidido: **v2 builder:** source-agnostic asset acquisition (matrix by source-type, never assume PDF)
Por qué: never presume a single source type exists; technique chosen by the source found

(migrada del RESIDENT el 2026-09-01)

## 2026-06-22 · Code · decisión — brand-system-skills-D-014

Decidido: **v2 builder:** pin Style Dictionary v5 + DTCG draft 2025.10
Por qué: DTCG 2025.10 not yet fully supported in SD v5 (issue #1590); use `color/oklch`, never `color/css`

(migrada del RESIDENT el 2026-09-01)

## 2026-06-22 · Code · decisión — brand-system-skills-D-015

Decidido: **v3 rectoral:** anti-determinism governs the whole skillset — general capability classes only, instance as illustration
Por qué: the determinism failure recurred at every stress-test phase + in the v3 pre-research; intent didn't prevent it

(migrada del RESIDENT el 2026-09-01)

## 2026-06-22 · Code · decisión — brand-system-skills-D-016

Decidido: **v3 north star:** a single attachable `.md` an AI can think/speak/design as the brand (+ guardrail layer); mandatory build output
Por qué: the canon + library don't make the brand *operable* by an AI; this is the deliverable they serve

(migrada del RESIDENT el 2026-09-01)

## 2026-06-22 · Code · decisión — brand-system-skills-D-017

Decidido: **v3 spine:** provenance/epistemic status (source/confidence/owner/freshness) on every datum; extends `authored\|derived`
Por qué: ~5 distinct stress-test failures reduce to lost data-status; observed ≠ confirmed

(migrada del RESIDENT el 2026-09-01)

## 2026-06-22 · Code · decisión — brand-system-skills-D-018

Decidido: **v3 stated-spec-read:** brand's declared truth (named font, declared color) authoritative; tool metadata corroborates only
Por qué: outlined/flattened type makes font tables report the studio's layout font or nothing

(migrada del RESIDENT el 2026-09-01)

## 2026-06-22 · Code · decisión — brand-system-skills-D-019

Decidido: **v3 reproduction router:** treatment→method (procedural SVG-filter / generative-lib / vector-trace / raster) validated by visual diff, explicit code-can't boundary
Por qué: faithful capture is craft the provenance frame can't supply; photography + bespoke illustration are raster-required

(migrada del RESIDENT el 2026-09-01)

## 2026-06-22 · Code · decisión — brand-system-skills-D-020

Decidido: **v3 guardrail layer:** posture-parameterized, functional-requirements tier ABOVE personality; posture detected not hardcoded
Por qué: prevents tonal dissonance; personality must not override functional/safety constraints

(migrada del RESIDENT el 2026-09-01)

## 2026-06-22 · Code · decisión — brand-system-skills-D-021

Decidido: **v3 horizons:** adaptive detection (category → one-line + tracked gap → detect existing material), not a fixed checklist
Por qué: a fixed checklist causes tunnel vision + category mismatch

(migrada del RESIDENT el 2026-09-01)

## 2026-06-22 · Code · decisión — brand-system-skills-D-022

Decidido: **v3 two-surface output:** internal rigor surface (structured, mixed-language) vs external client surface (plain, visual, Spanish)
Por qué: one surface can't serve both the operator and a non-design SME client

(migrada del RESIDENT el 2026-09-01)

## 2026-06-22 · Code · decisión — brand-system-skills-D-023

Decidido: **v3 `v0/DEMO` mode:** OPTIONAL defaults YES (+ carve-out for scope-expanding dims); mark + graphic-code non-waivable even in demo
Por qué: momentum without dropping identity-load-bearing assets

(migrada del RESIDENT el 2026-09-01)

## 2026-06-22 · Code · decisión — brand-system-skills-D-024

Decidido: **v3 scheme derivation:** OKLCH as one general engine (light/dark, high-contrast, sub-brand as cases) on the v2 OKLCH spine
Por qué: one transformation space covers every scheme; keeps the v2 spine

(migrada del RESIDENT el 2026-09-01)

## 2026-06-22 · Code · decisión — brand-system-skills-D-025

Decidido: **v3 keystone schema = 6 sections** (front-matter · THINK-as · SPEAK-as · DESIGN-as · GUARDRAIL · REFERENCE); think/speak/design + guardrail layer
Por qué: ratified Phase 1 output; the north-star deliverable's structure, brand-agnostic

(migrada del RESIDENT el 2026-09-01)

## 2026-06-22 · Code · decisión — brand-system-skills-D-026

Decidido: **v3 keystone recall-ordering** — data first, active instructions last; guardrails never buried mid-doc; behavior layer (§5) doubles as Project instructions, reference (§6) as knowledge
Por qué: long-context position effects; load-bearing guardrails must stay high-recall

(migrada del RESIDENT el 2026-09-01)

## 2026-06-22 · Code · decisión — brand-system-skills-D-027

Decidido: **v3 keystone size-budget = parameter, not a hardcoded number** — conservative default (keep the keystone comfortably within resident context, fully in-context not chunked); measured figure delegated to empirical calibration in Phase 5 (ties OI-E). If the file exceeds the resident window, REFERENCE (§6) splits to retrievable knowledge; only GUARDRAIL (§5) + DESIGN-reasoning (§4) stay in-context
Por qué: RAG trip-point unpublished by Anthropic; schema must not fake a number

(migrada del RESIDENT el 2026-09-01)

## 2026-06-22 · Code · decisión — brand-system-skills-D-028

Decidido: **v3 token target = DTCG 2025.10**, but `$value` stays an OKLCH literal string — structured-color objects + resolver theming deferred (SD v5 lag, issue #1590 / OI-H)
Por qué: 2025.10 is the format target; migrating `$value` now would break the build → Lego: `main` stays buildable

(migrada del RESIDENT el 2026-09-01)

## 2026-06-22 · Code · decisión — brand-system-skills-D-029

Decidido: **v3 fidelity gate** — reproduction visual-diff vs the source (no pixel-VRT, no Storybook); keystone gate (present · 6-section · guardrail-in-tail · within budget); guardrail red-team posture-gated (regulated = BLOCKING + human sign-off; live adversarial run = Phase 5)
Por qué: judge fidelity not skeleton-compliance, and make the keystone/guardrail a real gate — honest that in-context guardrails reduce ≠ eliminate jailbreak risk

(migrada del RESIDENT el 2026-09-01)

## 2026-06-22 · Code · decisión — brand-system-skills-D-030

Decidido: **v3 Theme-1 seam: the handoff is the SINGLE SUFFICIENT INTERFACE** — two-track manifest (ASSETS checksummed / CONSUMERS live-url reachability-checked), voice/value + geometry/license carriers, every emitted block parsed in Stage 0, DIMENSION-MAP present-but-unresolved = live HALT; carrier enums are capability classes (e.g. font `license:` = declared SPDX id, never a closed floor)
Por qué: the transversal audit found the seam wasn't sufficient (orphans + out-of-band reads); the rector forbids closed-enum floors

(migrada del RESIDENT el 2026-09-01)

## 2026-06-22 · Code · sesión — registro del ciclo (fecha original 2026-06-22)

Hecho: **Theme 1 seam fix (#20)** after the transversal audit (`v3-audit—2026-06-22.md`; QUALIFIED NO, 4 BLOCKER · 22 MAJOR · 24 MINOR · 6 NIT). The handoff made the single sufficient interface (two-track manifest · voice/value + geometry/license carriers · 3 orphans wired into Stage 0 with a live DIMENSION-MAP STOP · SPDX license). F1/F3-F9/F11/F28/F29/F49 closed.

(migrada del RESIDENT el 2026-09-01)

## 2026-06-22 · Code · sesión — registro del ciclo (fecha original 2026-06-22)

Hecho: **v3 Phases 1–4 shipped (skills BUILT).** Phase 1 ratified; handoff contract (#12) · scoper v3 (#13) · builder — spine+capture (#14), reproduction+DTCG/OKLCH (#16), keystone+fidelity-gate (#17); spine harmonization (#15). OI-G resolved; OI-E → Phase 5.

(migrada del RESIDENT el 2026-09-01)

## 2026-06-22 · Code · sesión — registro del ciclo (fecha original 2026-06-22)

Hecho: **v3 scoped + Phase 1 ratified.** Stress test (3rd brand) exposed epistemic-status loss + determinism; set the v3 center (anti-determinism · provenance spine · keystone north star); plan in `v3-execution-plan.md`.

(migrada del RESIDENT el 2026-09-01)

## 2026-06-22 · Code · sesión — registro del ciclo (fecha original 2026-06-21..22)

Hecho: **v2 built & shipped + repo derived.** Two skills + canon templates + DTCG/OKLCH spine (GATE 1/2); builder Stages 0–12 + distribution + audit-remediation; `F-001…F-026` closed; `dev/` untracked.

(migrada del RESIDENT el 2026-09-01)

## 2026-06-22 · Code · sesión — v2 — lineage (arquitectura completa, migrada)

### v2 — lineage (historical)
The first real brownfield pilot proved v1 shipped a **hollow skeleton** (rule-compliant but asset-less, called
done). v2's shipped reframe: **analyze published brand work across mediums → extract the real assets → emit a
real prototype + a `/design-sync`-ready component library** by default; the four-layer canon is the *skeleton*,
never the deliverable (scratch only on explicit instruction). Method in `skills/*` (`F-001…F-026` closed); the
design→Chat / filesystem-git→Code split is normal flow.

> **`/design-sync` caveat (still binding).** The converter contract is server-side/version-fluid (re-read live
> via `get_claude_design_prompt`); the builder re-pins at run time, so treat pinned field/script names as fluid,
> not frozen. Step-0 re-pin procedure in `design-sync-kit.md`.

(migrada del RESIDENT el 2026-09-01)

## 2026-06-22 · Code · dictamen — OI-G cerrado

Graceful-degradation path for the scoper's living-questions doc when the chat env lacks a connector/filesystem. Severity: NICE. Status: RESOLVED (#13 scoper v3 — Stage 6: commit-where-possible, else a downloadable artifact).

(migrada del RESIDENT el 2026-09-01)

## 2026-06-22 · Code · dictamen — OI-C cerrado

End-to-end run on a real brownfield pilot — RESOLVED: it surfaced the v2 reframe + F-001…F-026, all shipped. Ver la entrada migrada de `## v2` en esta misma bitácora.

(migrada del RESIDENT el 2026-09-01)

## 2026-06-23 · Code · decisión — brand-system-skills-D-031

Decidido: **v3 Theme-2 install integrity** — a shipped bundle holds zero pointers to unshipped paths and zero gates naming non-existent artifacts: `dev/` dangle killed (harvest+repoint; the Stage-8 `/design-sync` re-pin reconstructed into `design-sync-kit.md`); `.design-sync` config single-sourced (kit owns it; adapter duplicate deleted); `canon.json` `$schema` neutralized (no tool-repo URL → no 404, no Stage-11 self-attribution leak); the kit ships a real offline `package-validate.mjs`; font `license:` = SPDX-id axis **plus a separate →GAP-on-absent routing rule**
Por qué: a freshly installed bundle must be self-contained + honest, and a client-emitted file carries no tool-repo URL/org

(migrada del RESIDENT el 2026-09-01)

## 2026-06-23 · Code · decisión — brand-system-skills-D-032

Decidido: **v3 Theme-3 provenance spine into the tokens** — every emitted token carries `$extensions.brand.provenance` {source, confidence, owner, freshness}; `authored\|derived` is the SOURCE projection only and is ORTHOGONAL to the confidence ladder (same shape as the font-`license:` precedent — one axis describes, one gates); an `authored` value can still be `hypothesis` until owner-confirmed
Por qué: a datum must never be used above the confidence it earned; the spine carried source but not status into the tokens

(migrada del RESIDENT el 2026-09-01)

## 2026-06-23 · Code · decisión — brand-system-skills-D-033

Decidido: **v3 confidence ladder byte-identical at every hop** — `hypothesis \| corroborated \| owner-confirmed`, no fourth value/synonym anywhere; the keystone's invented `confirmed` replaced with `owner-confirmed` and `corroborated` represented; the keystone REFERENCE asset line READS token-derived confidence from `$extensions.brand.provenance` (or canon.json / RESIDENT GAP ledger), never recalled from emitter memory
Por qué: vocabulary drift between hops let a datum change status silently

(migrada del RESIDENT el 2026-09-01)

## 2026-06-23 · Code · decisión — brand-system-skills-D-034

Decidido: **v3 Theme-4 keystone gate audits OPERABILITY** — §7b adds a CONTENT check (THINK + DESIGN-as each ≥1 when-X-then-Z rule, SPEAK ≥1 on/off-brand pair, no core section a bare adjective list) testing FORM-OF-RULE only, never fixed brand content; `not-used(owner-declared)` dimensions resolve clean; DESIGN-as sources named (token spine + GRAMMAR G-*/ALGO-* + PRIMITIVES intent + ESSENCE meaning), not an unnamed "design rationale"
Por qué: a structurally-perfect but operationally-hollow keystone (adjectives dressed as rules) passed the shape-only gate

(migrada del RESIDENT el 2026-09-01)

## 2026-06-23 · Code · decisión — brand-system-skills-D-035

Decidido: **v3 Theme-4 fidelity gates leave persisted evidence** — §7a commits the source + reproduction + recorded verdict to `audit/fidelity/<treatment-id>/` (absence = FAIL); §7b emits + commits the red-team battery + expected-refusal contract to `audit/redteam/` even when non-blocking (empty/un-run = FAIL); the LIVE red-team run is Phase-5-deferred but its deferral does NOT void the now-gated artifacts
Por qué: both new v3 gates reduced to "a human said OK" with no committed trace

(migrada del RESIDENT el 2026-09-01)

## 2026-06-23 · Code · decisión — brand-system-skills-D-036

Decidido: **v3 Theme-5 coverage = illustrative floor, not a closed universe (F16)** — the n=2 must-have table is a PROMPT for the universality stress test (the real completeness gate); each row is `expected-unless-not-used(owner-declared)` so a legitimately-absent dimension (monogram-only / single-ink / sonic-primary) resolves CLEAN; mirrored in `architecture.md` Adaptivity
Por qué: a frozen n=2 intersection-as-floor is the determinism failure in textbook form — a valid brand violated the enumerated minima

(migrada del RESIDENT el 2026-09-01)

## 2026-06-23 · Code · decisión — brand-system-skills-D-037

Decidido: **v3 Theme-6 public surface honest + current (F20/F23/F24/F50)** — both manifests carry the mandatory keystone deliverable, drop the retired "greenfield/brownfield" vocabulary for ANALYZE/CREATE framing, and bump to v0.3.0 in lockstep (pre-1.0 minor, Phase-5 pending); README notes the `/design-sync` contract is server-side/version-fluid
Por qué: the pre-install promise omitted the north-star keystone, marketed retired vocabulary, and pinned 0.2.0 across a shipped v3 major

(migrada del RESIDENT el 2026-09-01)

## 2026-06-23 · Code · decisión — brand-system-skills-D-038

Decidido: **v3 Theme-6 build-tracking tokens stripped from shipped prose (F21/F22)** — internal IDs (PR-B*, F-0NN, D-B*, OI-*, GATE-2, Dn) + stale "forward-pointer"/"later-staged-PR" language scrubbed from all shipped references + emitted templates; Stage numbers + human-readable rules kept; a real cross-skill contract is named (CORE-ASSET FIDELITY CONTRACT), never an ID
Por qué: tokens resolving to nothing in the bundle leaked into AI-facing prose, and "No forward-pointers remain" contradicted references still calling shipped gates forward-pointers

(migrada del RESIDENT el 2026-09-01)

## 2026-06-23 · Code · decisión — brand-system-skills-D-039

Decidido: **v3 execution plan resynced to Phase 5 (F26/F56)** — `v3-execution-plan.md` moved from a frozen end-of-Phase-1 state to `current_phase: 5 of 5`; design+build marked DONE, residual surface is Code (the run) + Chat (judgment); RESIDENT and the plan now agree on phase + shipped state
Por qué: a plan frozen at "Phase 2, build at zero percent" would have a fresh session re-do completed phases

(migrada del RESIDENT el 2026-09-01)

## 2026-06-23 · Code · decisión — brand-system-skills-D-040

Decidido: **v3 honest medium scoping (system-audit B1/B2/M5/M6)** — every layer that assumed a visual `mark` now resolves the brand's PRIMARY-IDENTITY CARRIER(S) from the DIMENSION MAP — an OPEN class (visual mark \| sonic-mark \| motion-signature \| other declared lead atom), never a hardcoded enum. The fidelity floor, prototype evidence, keystone §4 DESIGN-as, and reproduction router act against that carrier; where the build has no build-grade producer for its medium it emits a DECLARED fidelity-blocking GAP (a tracked horizon), never a false-fail on a visual mark nor a silent pass. §7b keystone OPERABILITY (medium-agnostic) is now explicitly distinct from build-grade FIDELITY (§1/§2, visual-scoped)
Por qué: the gate floor + render evidence were visual-only while the system advertised medium-agnosticism, so a sonic/motion-primary brand gate-failed on an element it doesn't lead with

(migrada del RESIDENT el 2026-09-01)

## 2026-06-23 · Code · decisión — brand-system-skills-D-041

Decidido: **v3 keystone consumes the WHY personality carriers (system-audit M1, orphan closed)** — Personality (Aaker-5 scored) + Differential scales feed keystone §2 THINK as named reasoning inputs; Personality (Aaker-5) + Resonance seed §3 SPEAK voice attributes; both `keystone-emit.md` and the `keystone.md` template now carry the slots, so the builder/scoper promise that the keystone consumes them is TRUE (GAP-not-fabrication where a carrier is `none`)
Por qué: three owner-elicited WHY carriers were emitted + promised-consumed but had no keystone slot

(migrada del RESIDENT el 2026-09-01)

## 2026-06-23 · Code · decisión — brand-system-skills-D-042

Decidido: **v3 scoper client instrument instantiated + medium-agnostic intake (F10/F38)** — §6 ships a worked EXAMPLE of the external client instrument (jargon-free Mexican Spanish for a non-design owner, design terms glossed inline by example, a generic placeholder brand, one Found/Missing/To-confirm line) — the tone-fidelity-critical surface is no longer specified-but-uninstantiated; and the §3 asset-intake fidelity rubric is generalized to a capability class (a non-visual PRIMARY carrier — sonic / motion / verbal — gets its own build-grade/reference/missing rating elicited at intake), mirroring the #26 primary-identity-carrier model so the scoper ELICITS what the handoff/gate/keystone already carry
Por qué: the client-facing surface most dependent on owner-language tone had no exemplar, and the intake rubric was visual-only while the system claims medium-agnosticism

(migrada del RESIDENT el 2026-09-01)

## 2026-06-23 · Code · decisión — brand-system-skills-D-043

Decidido: **v3 client-drift + repo hygiene (system-audit M2/M3/M4)** — (M2, rector) the real n=1 brand name is removed from `.gitignore` and the brand-scrub pattern generalized (`**/brandbook*.pdf` · `**/*-brandbook*.pdf` · `**/reference-*.pdf`) so a 0-brand-name grep over the WHOLE tracked tree is EMPTY — a standing pre-commit gate; (M3) the client RESIDENT template's gaps table carries the mandated 7th `Provenance` origin-tag column (`handoff-deliberate\|handoff-defect\|builder\|skill-scope`) so every scaffolded repo can hold a gap's origin; (M4) `conventions.md` is single-sourced to the kit (the drifted adapter-dir duplicate deleted, the §Shape pointer fixed) and the mandatory keystone (+ prototype + library) is surfaced in every deliverable map that omitted it (the inherited client README's Deliverables block, the builder SKILL "What it produces", and the tool README builder row)
Por qué: a real brand name in a brand-agnostic repo (rector violation), a client ledger structurally unable to hold the gap-origin tag, a dead drifted conventions copy, and an inherited front door that omitted the north-star deliverable

(migrada del RESIDENT el 2026-09-01)

## 2026-06-23 · Code · decisión — brand-system-skills-D-044

Decidido: **v3 audit ledger CLOSED (#29) — last leak + tail** — F45: the §7b regulated trigger's SKILL summary drops the closed `health/finance/legal` enum for the OPEN class ("`regulatory:` non-empty OR a detected high-stakes domain") — the last determinism leak gone. F30: the kit shape is now a CARRIED datum — handoff `existing-component-stack:<storybook+playwright\|other\|none>` read at Stage 8 — discharging the lone "single sufficient interface" counterexample. F32: the radius namespace is unified by a GENERAL spine rule (a single-value category projects a bare `--<prefix>` singleton, a multi-value one `--<prefix>-<name>`) so the kit's `--radius` is conformant with no churn. Plus the MINOR/NIT tail (F33/F35/F46/F48/F39/F40/F41 + CREATE-treatment + coverage rows + projections enum + barrel regex).
Por qué: both audit reports must read as closed baselines; the rector's last hardcoded floor had to go; a carried shape-fact closes the single-sufficient-interface gap

(migrada del RESIDENT el 2026-09-01)

## 2026-06-23 · Code · sesión — registro del ciclo (fecha original 2026-06-23)

Hecho: **Post-v3 roadmap captured (#30, doc-only).** Added `## Roadmap — post-v3 horizons` (durable direction, separate from the closed ledger/OI-I): confidence & evidence (golden-set harness first), reduce-prompt-dependence (mechanize prose invariants), fidelity frontier (modern source extraction), two new skills (B canon-evolution before A genesis), the handoff-as-formal-interface enabler, the rector standing guards, and an explicit anti-roadmap. No skill/template/pipeline touched.

(migrada del RESIDENT el 2026-09-01)

## 2026-06-23 · Code · sesión — registro del ciclo (fecha original 2026-06-23)

Hecho: **Audit ledger CLOSED (#29).** Cleared the LAST determinism leak (F45 — regulated trigger open-classed, no more `health/finance/legal` floor) + the full MINOR/NIT tail: F30 (`existing-component-stack:` carrier → kit shape carried) · F32 (radius singleton spine rule) · F33 (Stage-2/6 chatter) · F35 (pinned codes framed illustrative, conceptual invariant hoisted) · F46 (named zero-tolerance, auditable) · F48 (sublabel unified) · F39 (font-provenance content-audit check) · F40 (SVG-clip sanity check) · F41 (traced-vs-synth limit noted) · CREATE-mode treatment classification · coverage rows 3-5 count/form-neutral · projections open enum · barrel regex robust. Coverage-gap pass: research-foundation (structured-color skim discharged by the frozen status-marker — no body edit; the F34 feTurbulence caveat mirrored at L59), data-map/projections, client-doc templates — clean. OI-I re-baselined to CLOSED; the #19 report lives on the open `v3/audit` branch (not main root), the #25 report at main root — both closed baselines. **Repo: zero BLOCKER/MAJOR/MINOR/NIT** except F55 (deliberate bold-density deviation) + OI-J (sonic/motion horizon). Only the Phase-5 validation run remains.

(migrada del RESIDENT el 2026-09-01)

## 2026-06-23 · Code · sesión — registro del ciclo (fecha original 2026-06-23)

Hecho: **Scoper client instrument + medium-agnostic intake (#28).** Instantiated the §6 external client instrument with a worked jargon-free Mexican-Spanish example (generic placeholder brand; design terms glossed inline; one Found/Missing/To-confirm line) — closes **F10, the lone surviving #19 MAJOR**. Generalized the §3 intake fidelity rubric to a capability class (non-visual sonic/motion/verbal primary carrier rated at intake — F38). Structure hygiene: H4 `4a`/`4b` → H3, top-of-file reference-load block (F47); trimmed the frontmatter description for headroom, no trigger lost (F52); fixed the posture confidence short-circuit — in-session = `corroborated`, promoted to `owner-confirmed` only at gate-6 (F54). **Repo now carries ZERO BLOCKER and ZERO MAJOR.** F55 (bold density) deliberately deferred as a defensible practitioner deviation. Only a MINOR/NIT tail + the coverage-gap pass remain (PR-8).

(migrada del RESIDENT el 2026-09-01)

## 2026-06-23 · Code · sesión — registro del ciclo (fecha original 2026-06-23)

Hecho: **Client-drift + repo hygiene (#27).** Killed the `.gitignore` real-brand-name leak (M2 — a rector violation; pattern generalized, 0-brand-name grep now EMPTY tree-wide); added the mandated `Provenance` origin-tag column to the client RESIDENT gaps template (M3); single-sourced `conventions.md` to the kit (deleted the drifted adapter-dir duplicate, fixed the §Shape pointer) and surfaced the mandatory keystone + prototype + library in every deliverable map that omitted it — the inherited client README (a new Deliverables block), the builder SKILL "What it produces", and the tool README builder row (M4); glossed DTCG/OKLCH in the inherited README + added glossary pointers in client CLAUDE/RESIDENT (jargon MINOR). Structured-color MINOR discharged by the frozen doc's existing status marker (no body edit, artifact preserved). Closes system-audit M2/M3/M4 + jargon MINOR.

(migrada del RESIDENT el 2026-09-01)

## 2026-06-23 · Code · sesión — registro del ciclo (fecha original 2026-06-23)

Hecho: **Honest medium scoping + keystone-orphan close (#26).** Every layer that assumed a visual `mark` now resolves the brand's primary-identity carrier from the DIMENSION MAP (open class — visual mark \| sonic-mark \| motion-signature \| other); an unsupported medium → a DECLARED fidelity-blocking GAP (tracked horizon OI-J), never a false-fail nor a silent pass; §7b operability made explicitly distinct from build-grade fidelity. The keystone now consumes Personality/Differential/Resonance (orphan closed). Co-located: posture `profile:` open-classed, F34 filter literal flagged illustrative, type-pairing collapse, ingest-css invariant stated. Closes system-audit B1/B2 (BLOCKER) + M1/M5/M6 (MAJOR) + 4 co-located MINOR/NIT; sonic/motion build-grade tracked as OI-J (post-Phase-5).

(migrada del RESIDENT el 2026-09-01)

## 2026-06-23 · Code · sesión — registro del ciclo (fecha original 2026-06-23)

Hecho: **v3 system audit produced (#25).** Full repo + functional-pipeline reassessment vs current main; see `v3-system-audit—2026-06-23.md` (root, audit-only). Verdict QUALIFIED YES on the visual default path (all five #19 BLOCKERs dead); 2 BLOCKER scoped to the medium-agnostic / sonic-motion shape · 6 MAJOR · 10 MINOR · 4 NIT. Open Items to be re-baselined from its ledger in the next fix-pass.

(migrada del RESIDENT el 2026-09-01)

## 2026-06-23 · Code · sesión — registro del ciclo (fecha original 2026-06-23)

Hecho: **Theme 6 public surface + docs sync + the pulled-forward Theme-5 F16 (#24).** Both manifests carry the mandatory keystone + ANALYZE/CREATE framing + v0.3.0 (dropped "greenfield/brownfield"); README notes the `/design-sync` contract is server-side/version-fluid; coverage table reframed to an illustrative floor (`expected-unless-not-used`); build-tracking tokens (PR-B*/F-0NN/D-B*/OI-*/GATE-2/Dn) + stale forward-pointers stripped from shipped prose; `v3-execution-plan.md` resynced to Phase 5. **ZERO BLOCKER after**; F10 the sole open MAJOR. F16/F20/F21/F22/F23/F24/F26/F50/F56 closed.

(migrada del RESIDENT el 2026-09-01)

## 2026-06-23 · Code · sesión — registro del ciclo (fecha original 2026-06-23)

Hecho: **Theme 3/4 provenance spine + keystone operability (#23).** Provenance into the token spine (`$extensions.brand.provenance` on every token; `authored\|derived` orthogonal to the confidence ladder); keystone confidence vocab made byte-identical (`confirmed`→`owner-confirmed`, ladder shown); §7b gains a FORM-OF-RULE content check (operability, not shape) + DESIGN-as sources named; §7a/§7b leave persisted evidence (`audit/fidelity/` + `audit/redteam/`, absence = FAIL; live run = Phase 5). F14/F15/F17/F18/F19/F37 closed.

(migrada del RESIDENT el 2026-09-01)

## 2026-06-23 · Code · sesión — registro del ciclo (fecha original 2026-06-23)

Hecho: **Theme 2 install integrity (#21).** Killed the `dev/v2-build-spec.md` dangle (12 cites repointed; Stage-8 re-pin reconstructed into `design-sync-kit.md`); `.design-sync` single-sourced; `canon.json` `$schema` neutralized; real offline `package-validate.mjs` shipped; license→GAP rule distinct from the SPDX axis. F2/F12/F13/F25 closed.

(migrada del RESIDENT el 2026-09-01)

## 2026-06-23 · Code · sesión — v3 — provenance, anti-determinismo y "a brand an AI can be" (arquitectura completa, migrada)

### v3 — provenance, anti-determinism, and a brand an AI can be
v2's analyze→extract→prototype+library engine shipped and works. A fresh adversarial stress test (a third,
independently-authored brand of a divergent multi-source shape) exposed failure CLASSES v2's gates miss — all
reducing to one root: **the system loses each datum's epistemic status and crystallizes the unconfirmed or
instance-specific as settled.** v3 fixes it; it extends the v2 skills, never restarts them. Three load-bearing
moves:
- **Rectoral constraint — anti-determinism.** The WHOLE skillset (discovery, capture, reproduction, the
  dimension map, the keystone) reasons in general capability classes, spaces, and decision methods; a brand
  instance is only illustration. The failure recurred at every phase + in the v3 pre-research, so v3 enforces it
  structurally, not by intent.
- **North star — a brand an AI can BE.** Beyond canon + library, the keystone deliverable is a single attachable
  `.md` an AI can **think / speak / design as** the brand (+ a guardrail layer), sized to stay resident in a
  Claude Project. Mandatory build output; gives a testable end-to-end criterion (instantiate the brand-AI, judge
  fidelity).
- **Spine — provenance on every datum.** source / confidence / owner / freshness, generalizing v2's
  `authored|derived`; observed expression enters as `hypothesis`, line-vs-one-off promotion needs owner
  confirmation; a datum is never used above the status it earned.

**Status (CLOSED baselines).** The v3 skills are BUILT (Phases 1–4 shipped to `main`, #12–#17). A transversal
audit (`v3-audit—2026-06-22.md`, PR #19, never merged) verdict **QUALIFIED NO** (4 BLOCKER · 22 MAJOR · 24 MINOR
· 6 NIT), remediated across Theme 1 seam (#20), Theme 2 install integrity (#21), Theme 3/4 provenance + keystone
operability (#23), Theme 6 public surface + F16 (#24). A fresh full system audit (#25,
`v3-system-audit—2026-06-23.md`) drove three more fix-passes — medium scoping + keystone-orphan (#26),
client-drift + hygiene (#27), scoper instrument + intake (#28) — and the ledger-close (#29 — F45 last leak +
F32/F30/F33/F35/F46/F48 tail + coverage-gap). **The entire audit ledger is CLOSED: zero BLOCKER/MAJOR/MINOR/NIT**,
except the deliberate F55 (bold-density deviation) + OI-J (sonic/motion build-grade horizon). Both reports are
closed baselines; only the Phase-5 validation run remains (2nd differently-shaped brand · live red-team ·
visual-diff audit · release). **Nota 2026-07-04:** esa validación Phase-5 CORRIÓ — como el stress-test blind e2e de 5 marcas del ciclo v4→v5 (ver `## Ciclo vigente`); OI-F superseded, golden set re-fijado en Essential.

(migrada del RESIDENT el 2026-09-01)

## 2026-06-23 · Code · dictamen — OI-I cerrado

v3 audits (#19: 4 BLOCKER · 22 MAJOR · 24 MINOR · 6 NIT; #25 system) — FULLY REMEDIATED (#29) across PRs #20–#29 (detalle por PR en el change log migrado de este mismo archivo). Únicos no-cerrados, deliberados: F55 (bold-density, ver Documented deviations) · F31 (`motion:` prose token; consumidor = horizonte OI-A) · OI-J. Reports removidos en la consolidación v4; registro en closed-PR history — baselines CERRADOS, no trabajo abierto. Status: RESOLVED (#29).

(migrada del RESIDENT el 2026-09-01)

## 2026-06-24 · Code · sesión — registro del ciclo (fecha original 2026-06-24)

Hecho: **v4 shipped — plugin 0.3.0→0.4.0** (23 mechanisms / 7 stages A–G; executable gates audit-lint R0–R8 + measured fidelity + scheme materializer + client deny-lint; scoper client-flow + EH/process self-checks). Mechanism-complete + unit-validated; end-to-end golden-set v4 verdict-capture deferred to Phase-5 (R9 + live red-team RUN + 2nd validation brand).

(migrada del RESIDENT el 2026-09-01)

## 2026-06-24 · Code · sesión — v4 — arquitectura de validación del builder + motor de tokens + superficie de revisión, Stages A-G (completa, migrada)

### v4 — builder validation architecture + token engine + review surface (Stages A–G)
v4 turns the builder's prose discipline into **executable gates that exit non-zero on violation**. Stage B is
the builder-keystone: the emitted client repo is **self-validating** (regression-ready) and **machine-true**, not
prose-true. Two gates, two ecosystems, one persisted-evidence model.

- **`tools/audit-lint.mjs` — provenance / completeness / reconciliation (R0–R8, BLOCKING, zero-dep Node).** Run
  from the emitted-repo root; exit 1 on any violation; writes `audit/lint/report.md`. (R0–R6 detailed here; R7
  schemes-are-tokens and R8 prototype-completeness are added in Stages C and D below.)
  - **R0–R5 (MT-3/4/5, Stage B-1).** Every value token carries a `$extensions.brand.provenance` block on closed
    source/confidence enums; `corroborated` ⇒ ≥2 distinct hashed sources; `inferred`/`matched` ⇒ `hypothesis`;
    `computed-css`/`corroborated`/`owner-confirmed` ⇒ a path-bound `sha256` in `CHECKSUMS.txt`; every named
    value/scheme → a token artifact OR an open `GAP-NNN`; every uncertain token → exactly one open GAP. The
    archived-source identity+date gate feeds it via `tools/source-recover.py` (MT-3) + `CHECKSUMS.txt`.
  - **R6 (MT-1, Stage B-2a) — cross-artifact reconciliation / drift.** A downstream artifact may not drift from
    its single source: **R6a** every `derived` projection in `satellites/projections.md` consumes only aliases
    that resolve in the spine and any pinned value byte-equals the spine-resolved value (`source: authored` rows
    are truth, skipped); **R6b** the protected mark geometry is single-sourced from **`canon/mark.svg`** (the
    prototype `#brand-mark` + kit `Mark.tsx` byte-equal to it; `canon.json`/PRIMITIVES § Mark stay
    metadata-only); **R6c** every local asset ref resolves. The projection registry's `consumes`/`source`
    columns are the machine linkage.
- **`tools/fidelity-diff.py` — MEASURED reproduction fidelity (MT-2, Stage B-2b, build-time Python).** Replaces
  the old §7a human/perceptual "looks-fine" verdict with a measured one: co-registers the reproduction onto the
  **Stage-5 source capture** (ORB+RANSAC) and computes **ΔE2000** + **SSIM/pixelmatch** (+ fontTools glyph
  metrics for type), verdicting against the §2 numeric tiers (ΔE2000 ≤ 2.0 default, ≤ 1.0 core colour;
  loosening RAISES the bound, never waives the metric). It measures against the source capture — **not a
  pixel-VRT** against a reference render (none exists, §3a). Deps are import-guarded (missing → `pip install …`
  + exit 3); the **non-visual** path (`--medium non-visual`) needs none of them.
- **Persisted-evidence model (both gates).** Verdicts are committed, re-auditable artifacts, never transient:
  `audit/lint/report.md` (R0–R8) and `audit/fidelity/<treatment-id>/{source, reproduction, diff.png,
  scores.json}` (the numeric scores + thresholds + verdict — re-readable without cv2). Absence of the evidence
  for a reproduced treatment FAILS §7a.
- **Invariants (hold across both gates).** *Brand-agnostic + medium-agnostic* — every gate tests the SHAPE of a
  rule, never named brand content; a monogram-only / single-ink / sonic-primary / motion-primary brand passes
  clean (a non-visual carrier resolves to a declared fidelity-blocking GAP, never a false-fail). *A gate that
  fails correctly-built repos is worse than no gate* — every gate stage ships only after an exploit-repo
  adversarial review (fresh hostile repos, multiple reviewers) proves it fails on a seeded violation AND passes
  on clean + tricky-but-correct fixtures. Acceptance fixtures live beside each tool (`tools/fixtures/`).
- **Tooling split by native ecosystem.** JSON/token/cross-reference linting is **Node** (zero-dep, the kit's
  ecosystem); image diff / co-registration / glyph metrics are **Python** (OpenCV / scikit-image / fontTools).
  Build-time gates ship into the client repo so it self-validates (runnable offline, or wired into the emitted
repo's CI / a GitHub Action); the runtime component kit stays Node-only.

**Stage C — the token engine (CLOSED).** The colour token format and the scheme system became machine-true:
- **Structured-OKLCH `$value` (C-1).** A colour token's `$value` is the DTCG structured object
  `{colorSpace:"oklch", components:[L,C,H], alpha, hex}` (hex = sRGB fallback; the `$extensions.brand.spaces`
  source axis is preserved). `audit-lint` R6a serializes both a projection pin and the spine value through ONE
  canonical serializer (`oklch(L C H[ / a])`), so the drift gate reconciles structured + legacy-string values
  with no `String(object)`. R0–R5 stay value-blind (they read provenance, never `$value`).
- **Schemes-are-tokens (C-2).** N named `canon.json › schemes` become N COMPLETE materialized role-token sets
  via the runnable **`ALGO-SCHEME-DERIVE`** (03-grammar §10 + `canon.json.algorithms`) + a zero-dep
  **`tools/scheme-derive.mjs`** (NOT Style Dictionary): each role a structured-OKLCH object derived from the
  base palette by `{mode, dominant}` (light=identity · dark=invert-L on neutrals + lift non-dominant chromatic ·
  contrast=push neutrals to the L extreme; hex via in-process OKLCH→sRGB), written to `tokens/schemes/<id>.json`,
  tagged `$extensions.brand.scheme:"<id>"`. New **R7** fails any named scheme without a COMPLETE set (role-key
  parity with the default) OR `status:"deferred"` + its declared open GAP id (a tracked GAP bound to the id, not
  a name-match — never a bypass). The lint loader reads `tokens/schemes/*.json`, so scheme tokens are first-class
  under R0–R6. The DTCG Resolver Module (draft) stays a controlled convention over these sets, never raw SD.
- **Scheme toggle + decorative contrast (C-3).** The prototype renders a live `[data-scheme]` toggle (inline
  `<script>`, offline — `[data-scheme]` wins over the OS media query, which stays the no-JS fallback) when >1
  scheme is materialized; a flat brand drops it. GRAMMAR `ALGO-CONTRAST-ROLE` gains a graphic-code row and
  PRIMITIVES › Pattern a **decorative contrast band**: a brand-fixed opacity/contrast band is the PRIMARY rule,
  escalating to **WCAG 3:1 (SC 1.4.11)** when the device carries meaning/state; APCA Lc 15 is an internal
  reference only; **WCAG 2.x AA is the legal bar (no APCA substitution)**. Spec-level — no executable gate.

**Stage D — the human-legible complete review surface (CLOSED).** v4's third axis: the canon becomes legible
to a non-design owner without oral transfer, and the prototype becomes the complete deliverable.
- **The client-surface flow (scoper, RV-1/RV-2).** The three client-facing instruments are ONE instrument
  advancing through three checkpoints, not three parallel docs: gate 3.5 Discovery & Intake (CONFIRM/ASK/REQUEST,
  emission default) → gate 6 review (Found/Missing/To-confirm) → gate 7a Final Brand Brief (the BLOCKING client
  approval) → gate 7b machine handoff (emitted only after 7a sign-off). Same register/lineage; CONFIRM→Found ·
  ASK→To-confirm · REQUEST→Missing at successive maturity (v1→v2→vFinal).
- **Pipeline discipline (RV-3/RV-4).** Every gate emits a named/dated/versioned DELIVERABLE + a `stage N of 9`
  marker (3.5/6/7a are the same client instrument at v1→v2→vFinal). Gate 5 is unconditional/BLOCKING — a stated
  sole-decider does not waive the external-review framing — and `consultation-surface: always-required` is a
  permanent dimension (never resolves to not-used).
- **The prototype = complete interactive brandbook (builder, RV-5).** Stage 8 no longer emits a 5-zone UI demo:
  the prototype is the full brandbook — manifest sections (lexicon, Misuse, schemes, THINK-rule surface, plus
  hero/cards/type/color) DERIVED from the canon's present sections (anti-determinism: a not-used section is
  omitted or GAP, never invented), a "Decisions for you" ratification panel (client-language-first; the human
  sign-off ratifies, never auto-stamped), and a design bar (hero focal anchor, responsive `@media` breakpoint,
  colour-as-system). Single self-contained offline `.html`; the Stage-11 deny-lint (TS-2) already covers the
  enlarged brandbook.
- **R8 — prototype completeness (audit-lint §5a).** Every PRESENT canon section → a `data-canon-section`
  brandbook surface OR an open `GAP-NNN`. Shaped like R4/R7; anti-determinist (reads present sections by machine
  signal, never a fixed checklist — flat/monogram/sonic/non-visual pass clean). Gate-summary is now R0–R8.

**Stage A — the two-surface split (CLOSED).** The scoper's operator-surface and client-surface are distinct
artifacts, not one undifferentiated stream (TS-1); a client-surface **deny-lint** (`tools/client-deny-lint.mjs`,
rehype/parse5 over text + comment + visible-attribute nodes, run on the §3-stripped emitted surface) firewalls
operator vocabulary out of every client-facing surface, and the keystone is split so its GUARDRAIL layer is
genuinely last in deployed instructions (TS-2).

**Stage E — epistemic-honesty enforcement (CLOSED).** Scoper: an **EH self-check (BLOCKING, gate-7a
precondition)** holds owner-meaning fields (personality / differential / resonance / intended meaning) and
named regulatory instruments to `owner-stated`(cited) / owner-declared `none` / GAP — never scoper-derived,
never memory-asserted, never above `hypothesis` without ratification (EH-1/EH-2); the POSTURE `regulatory:`
carrier is owner-stated-cited-or-GAP. Builder: `validate-audit.md §7b` makes the regulated trigger inherit
**MUST-HAVE** to the enabling regulatory GAP (gated — `regulatory: none` forces nothing), binds the keystone §5
regulated-claim constraints + refusal policy to that cited carrier, and adds visual-guardrail + over-refusal
axes to the red-team battery (EH-3). The **executable R9** posture→GAP-severity gate (posture in `canon.json` +
Severity parsing in `audit-lint`) is deferred to Phase-5 with the live red-team RUN.

**Stage F — process discipline (CLOSED).** TEMPO doctrine (multi-session; the BLOCKING gates always run;
progress is evidence-of-process, never wall-clock); a register/preference firewall (the client register
inherits no operator terseness/speed/assumption preference — the §6 self-check scans register leakage; the
mirror-guard preserves legitimate operator directness on the internal surface); an assumption ledger
(proceed-assumption → explicit CONFIRM line); and verify-the-exact-claim (a blocked/failed retrieval is never a
positive status — stays `hypothesis` or a GAP, no new status word). TA-1 + TA-4 doctrine lives in
`brand-canon-scoper/references/process-discipline.md`.

**Stage G — structural hygiene (CLOSED).** The scoper interview bank + detection batteries are externalized to
`references/` (SH-1, keeps `SKILL.md` < 500); a live-but-raster CONSUMER surface declares `ingest:ocr-visual`
and the CONSUMERS `ingest:` is the same open class as the ASSETS track (SH-2); a non-trigger clause distinguishes
canon-pipeline scoping from brand-voice-only guideline generation (SH-3).

**Preserve — do not break (v4 gives the engine teeth, never replaces it).** A change here must not regress the
working engine. *Scoper engine:* the scoper/builder frontier (no primitive sampled in chat); the anti-determinism rector;
the salvage-vs-extraction insight (a dead brand inverts the fidelity strategy — archived CSS beats eyedropping a
raster); anti-fabrication on treatments; WHY elicited and ratified (onliness → spine, never-words →
anti-promise); DIMENSION-MAP completeness; hard claim-discipline + scope boundary; primary-identity-carrier
resolution. *Builder engine:* refusing an invalid vector master; naming an absent source over faking it;
demoting a commercial font to a flagged match; flooring every builder-introduced atom at `hypothesis`;
declining to fabricate a bespoke mark; earning multi-source `corroborated` honestly; OKLCH exact with full
alias closure; declaring FLAT with reason; deferring the live red-team behind a committed contract. The
instinct — commit evidence, tag confidence, never invent — is the architecture worth keeping. **2026-07-04:** este instinto quedó CODIFICADO como la wins-regression W-1…W-14 del ciclo (análisis §12) — corre en cada gate de PLAN-V5/V6.

**Research-pinned constraints (tooling/spec pins, as of 2026-06; numeric thresholds live in the Stage-C +
fidelity bullets above — structured-OKLCH `$value`, the decorative-contrast band, ΔE2000 ≤ 2.0 / SSIM).** *DTCG:*
Format + Color modules stable (2025.10); the Resolver Module is a preview draft → a controlled convention, never
an authoritative standard. *Style Dictionary v5.4.4* engine; structured colour since v5.3.0 (`color/oklch`); SD
does not yet consume `.resolver.json` (issue #1590) → per-scheme materialization rides a resolver-aware engine
(Dispersa) or a small preprocessor. *Fidelity tooling* is Python (OpenCV / scikit-image / fontTools) on
ORB+RANSAC co-registered same-DPI 8-bit images (MT-2). *Source recovery:* Wayback CDX + the `id_` raw-capture
modifier, occupant disambiguation, a SHA-256 manifest with per-token `sourceRef` (MT-3). *Two-surface lint:* a
rehype/parse5 AST deny-list over text + comment nodes, in `client-clean` (TS-2). **Nota 2026-07-04:** el paisaje se movió — DTCG 2025.10 ESTABLE + SD v5 liberado (análisis §15 R-09); estos pins describen lo SHIPPED en v4 y siguen siendo la verdad del código; la migración de formato es PLAN-V6 F1 (resolver NO adoptado).

> Golden-set: **`ccediland/heresto-brand` (external repo) is the canonical golden-set regression fixture.**
> **Pinned (Phase 4.2):** `ccediland/heresto-brand` @ `78f1cd9` (build-branch HEAD, immutable SHA — `main` @
> `ba63d72` empty; PR #1 open, unmerged, unratified-pending) against this repo's gates @ `ef8f386`.
> **Integrity:** 4/4 manual checks intact (build-branch @ 78f1cd9 · main @ ba63d72 · PR #1 open+unmerged ·
> planted hostile inputs present) — a v3-validated baseline whose existing evidence is `audit/fidelity/*/verdict.md`,
> the redteam `battery.md` + `expected-refusal-contract.md`, and `audit/fidelity-gate.md`.
> **Phase-5 deferral:** the build is v3-era and FAILS the v4 gates by construction (R6a structured-OKLCH · R6b
> `canon/mark.svg` · R7 materialized schemes · R8 `data-canon-section` markers), so capturing the v4
> expected-verdicts (R0–R8 + fidelity-diff + client-deny-lint + scheme-derive) requires a v4 rebuild of Heresto —
> the FIRST Phase-5 item (the golden-set is gated at Phase-5 per `## Roadmap — post-v3 horizons`). Still deferred
> to Phase-5: the live red-team RUN, the executable R9, and a second differently-shaped validation brand (OI-F).
> **Privacy:** heresto-brand is private; this record pins commit/repo + check structure only — never Heresto's
> brand values.
> **Supersedido como golden set (2026-07-04):** el ciclo v5 fija `essential-brand` (LOCAL, validado por el
> stress-test v4) como EL golden set de regresión (PLAN-V5 E0/E1/E2). Este pin Heresto queda como registro
> v3-era ÍNTEGRO — repo privado, sin rebuild v4; retomarlo es decisión fuera de ciclo.

**PRs (Stages A–G + Finalize).** A: TS-1 #37 · TS-2 #38. B: MT-3/4/5 #31 · MT-1 #32 · MT-2 #33. C: C-1 #34 ·
C-2 #35 · C-3 #36. D: RV-1/2 #41 · RV-3/4 #42 · RV-5 #44 · R8 #45. E: EH-1/2 #47 · EH-3 #48. F: TA-1…4 #52.
G: SH-1 #40 · SH-2/3 #50. Finalize: 4.1 #55 · 4.2 #56 · 4.3 ship #57.

(migrada del RESIDENT el 2026-09-01)

## 2026-06-24 · Code · fricción — caminos intentados y abandonados (registro completo, migrado)

### Dead-ends — do not retry
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
- Tried (v3): re-raising a withdrawn source-identity finding (the #8 phantom-source candidate) once it was
  settled. Abandoned: an archived domain flagged as a possible unrelated third party was verified — Wayback CDX +
  the committed archive — to be the brand's OWN historical site (later re-registered), a disproof, not a
  collision. Do not re-raise it; the surviving lesson is MT-3 (an archived source needs date + identity
  verification before harvest).
- Tried (v4 effort): re-deciding the staged-plan order unilaterally — a keystone stage (B) was run before a
  free-root stage (A) and split into B-1/B-2 without plan authority. Abandoned: follow the document's dependency
  order; among free roots the choice is the owner's, not a unilateral Chat decision (the split shipped fine, but
  the governance lesson stands).
- Tried (v4, revelado por el stress-test): contar gates de prosa auto-atestada como verificación (universality /
  output-agnostic / keystone-content / battery). Abandoned: ~50% del gate suite era prosa y fidelity se fingió o
  esquivó donde aplicaba (X2/EB-3). Do not retry — un gate es EJECUTABLE o se demociona explícito (rector NS-A;
  PLAN-V5 E1-03).

(migrada del RESIDENT el 2026-09-01)

## 2026-07-04 · Code · decisión — brand-system-skills-D-045

Decidido: **Ciclo v5/v6:** v4 testeada con stress blind de 5 marcas; v5 repara lo PROBADO, v6 construye lo NO-testeado; cada versión cierra con stress-test propio
Por qué: atribución limpia sobre el pin `65932bb` (superficie de código); el criterio de reparto vive en análisis §16e

(migrada del RESIDENT el 2026-09-01)

## 2026-07-04 · Code · decisión — brand-system-skills-D-046

Decidido: Docs del ciclo (análisis + PLAN-V5 + PLAN-V6) en la RAÍZ de `main`; subida vía branch `claude/<nombre>` → PR → OK del operador
Por qué: una sola fuente navegable con el repo; E-O1 intacto (cero push sin OK)

(migrada del RESIDENT el 2026-09-01)

## 2026-07-04 · Code · decisión — brand-system-skills-D-047

Decidido: Repos de marca del test: LOCALES por siempre, cero push; golden set = `essential-brand` local; handoffs originales NO se reconstruyen — fixtures sintéticos en formato v5 (PLAN-V5 E1-02)
Por qué: fixtures del eval, no entregables públicos; los chats fuente del handoff ya no existen

(migrada del RESIDENT el 2026-09-01)

## 2026-07-04 · Code · decisión — brand-system-skills-D-048

Decidido: RESIDENT se actualiza por GATE/ETAPA del ciclo, jamás por sesión; recap del ciclo aquí, detalle en los planes
Por qué: log por sesión = ruido; anti-drift: un dato, un doc

(migrada del RESIDENT el 2026-09-01)

## 2026-07-04 · Code · decisión — brand-system-skills-D-049

Decidido: Resolver Module NO se adopta (condición de reapertura escrita en PLAN-V6); OI-J = horizonte post-v6 gated en demanda real
Por qué: un mecanismo probado (scheme-derive+R7) no se reemplaza sin falla ni consumidor que lo exija

(migrada del RESIDENT el 2026-09-01)

## 2026-07-04 · Code · sesión — registro del ciclo (fecha original 2026-07-04)

Hecho: PLANEACIÓN CERRADA: análisis consolidado y CONGELADO; research §15 completo; rondas de análisis pre-plan v5 y v6 ejecutadas en Code; PLAN-V5 aprobado (v2 + 4 enmiendas de la ronda v6) y PLAN-V6 preliminar. Etapa vigente: PLAN-V5 E0 — pendiente: subida de los docs del ciclo a main (branch→PR→OK) + E0-01.

(migrada del RESIDENT el 2026-09-01)

## 2026-07-04 · Code · sesión — registro del ciclo (fecha original 2026-07-04)

Hecho: **Ciclo v4→v5: stress-test + planeación cerrada; RESIDENT al modelo de ciclo.** v0.4.0 @ `65932bb` sometida a stress-test blind e2e de 5 marcas (la validación Phase-5, ejecutada más grande): disposición Essential = golden set local, resto = failure gallery local. En la raíz del repo: análisis maestro CONGELADO (`brand-system-skills-v5-analysis_2026-07-04.md`) + PLAN-V5 (aprobado, E0–E4) + PLAN-V6 (preliminar, F0–F5); rondas de análisis pre-plan v5/v6 corridas en Code. Este RESIDENT: secciones nuevas (`## Cómo retomar` · `## Ciclo vigente` con recap + log por gate), Roadmap reconciliado (absorbidos-por-el-ciclo mapeados a su home, horizontes intactos), OI-E/OI-F/OI-H/OI-J re-baselineados, flag del hop web-stack (stale-o-roto, veredicto en F0-02), golden set re-fijado (Essential; pin Heresto conservado como registro), decisiones de ciclo añadidas. Historia v2/v3/v4 INTACTA.

(migrada del RESIDENT el 2026-09-01)

## 2026-07-04 · Code · dictamen — Roadmap: horizontes reconciliados contra el ciclo v5/v6 (registro completo, migrado)

### Roadmap — horizontes (reconciliado 2026-07-04 contra el ciclo v5/v6)

El principio original se sostiene: todo gated detrás de validación real; el riesgo dominante sigue siendo acumulación de roadmap sin usuario real. Cada item conserva su registro y declara su HOME actual — nada se borró en silencio.

### Absorbidos por el ciclo (viven en los planes; aquí solo el pointer)
- **Golden-set regression harness** → EJECUTADO distinto a lo previsto: el golden set es `essential-brand` (LOCAL, validado por el stress-test v4); fixtures + replay = gates de PLAN-V5 (E0-01, E1, E2). El pin Heresto v3-era queda como registro íntegro (ver nota en `## v4`).
- **Failure gallery** → EXISTE (Onyx · Cuenca · Klim · Radiotopia, local); se congela en PLAN-V5 E0-01.
- **Keystone falsifiability + RAG calibration** → probe R-06 integrado al stress-test v5 (PLAN-V5 E4-02) + presupuesto NS-G parametrizado (análisis §15 R-08 / OI-E).
- **Promote prose invariants to mechanical checks** → ES el rector NS-A y la etapa E1 completa de PLAN-V5 (EB-3: cada gate ejecutable o demovido explícito).
- **Self-audit as invokable skill** → directriz N1; PLAN-V5 E2-08 (harness-backed, hogar `audit/self/`).
- **Handoff contract as formal versioned interface** → PLAN-V5 E1-02 (contrato único v5: enum + persistencia + carriers + rutas). Sigue siendo el gate técnico para skill #3+.
- **Real anonymized examples** → el golden set + la gallery son la evidencia; publicarlos = decisión de operador fuera de ciclo (hoy: cero push).

### Siguen siendo horizonte
- **Modern source extraction (Figma Variables, Tokens Studio clean export, structured sites)** — el cuello de fidelity es el INPUT; mejor input = menos GAPs = más build-grade. La palanca de mayor ROI. · Horizon: medium · Urgency: high · Gate: cierre de v5 (el stress-test v5 valida la hipótesis GAP-origen).
- **Skill B — canon evolution / change management** — mutación gobernada de un canon vivo: token patch → primitive change → full rebrand, cada nivel con blast-radius + ratificación propia; el extremo rebrand REUSA el builder en diff-mode preservando historia + decision-provenance (what/why/who/when). La estratégica: un canon que no evoluciona es snapshot, no fuente de verdad. · Horizon: medium · Urgency: high · Gate: v5 shipped + contrato E1-02 estable.
- **Skill A — genesis (near-nothing → pipeline-ready)** — convierte "nombre + colores + ideas abstractas" en un WHY ratificable que entra al CREATE existente. HARD RECTOR GUARD intacto: A facilita CONVERGENCIA a un WHY ratificado por el dueño, JAMÁS genera verdad de marca — toda opción es hypothesis que el dueño confirma/rechaza; si fuera slop-generator ("10 esencias para tu panadería") envenenaría el value-prop completo. · Horizon: medium-long · Urgency: medium · Gate: Skill B primero. **Ordering B before A** — B recurre mucho más (toda marca cambia); greenfield puro casi no aparece en el ICP.
- **Non-visual build-grade (OI-J)** — decisión 2026-07-04: post-v6, gated en demanda real de una marca no-visual-primaria. Cross-ref, no duplicado.

### Standing guards (sin cambio)
- **Rector non-negotiable:** toda feature futura que exija relajar "never invent brand truth" o "provenance on everything" se DECLINA por default — un roadmap erosiona su core más rápido vía "just this once".
- **Every new skill inherits the full rector:** anti-determinismo / never-invent / provenance sin excepción, o el core disciplinado que distingue el producto se diluye.

### Anti-roadmap (registro explícito; refuerzos del ciclo)
- Figma bidireccional · Tokens Studio bridge · agent-based drift detection · 3D/spatial · motion systems · sub-brand inheritance — gate igual: Skill B + ≥1 cliente real manteniendo un canon vivo. Falsa pista si se toca antes.
- Resolver Module: NO adoptado (2026-07-04; condición de reapertura escrita en PLAN-V6).
- "Brand OS / hosted / enterprise platform" = decisión de NEGOCIO (Argos, su propio stack + ICP locked), NO objetivo del repo — la frontera queda marcada aquí a propósito.

(migrada del RESIDENT el 2026-09-01)

## 2026-07-04 · Code · dictamen — OI-E cerrado

Keystone `.md` RAG trip-point → RESUELTO como parámetro (2026-07-04, análisis §15 R-08): sigue sin número oficial (cualitativo "approaches the context window limit", 10x); envelope comunitario ~13 archivos/2% (un reporte). Presupuesto NS-G fijado: SET de pocos archivos, ≪ context window, attachment-tolerant — se aplica en PLAN-V5 E2-05/06 con regla de frescura. Severity: MAJOR. Status: RESUELTO-parametrizado (2026-07-04).

(migrada del RESIDENT el 2026-09-01)

## 2026-07-04 · Code · dictamen — OI-F cerrado

Second validation brand → SUPERSEDED (2026-07-04): la validación corrió como stress-test blind e2e de 5 marcas de formas distintas — más que el segundo brand previsto. Severity: MAJOR. Status: SUPERSEDED (stress-test v4).

(migrada del RESIDENT el 2026-09-01)

## 2026-07-04 · Code · dictamen — OI-H cerrado

Resolver-based theming → CERRADO por decisión (2026-07-04): resolver NO se adopta (scheme-derive+R7 probado; P-J-01); la migración de formato `.tokens.json` es PLAN-V6 F1; condición de reapertura escrita en PLAN-V6. Paisaje: DTCG 2025.10 estable + SD v5 liberado (análisis §15 R-09). Severity: NICE. Status: CERRADO por decisión (2026-07-04).

(migrada del RESIDENT el 2026-09-01)

## 2026-07-05 · Code · sesión — registro del ciclo (fecha original 2026-07-05)

Hecho: **E0 CERRADO.** Subida de los docs del ciclo a raíz de main completada @ `6850056` (PLAN-V5 + PLAN-V6 + análisis). A0: reglas del workflow de ejecución del operador asentadas en PLAN-V5 §Reglas de operación + frontmatter des-staleado. E0-01: failure gallery CONGELADA — commit LOCAL de todo lo untracked en los 5 repos de prueba (gate `git status` limpio 5/5): onyx-brand-canon `025cc64` (7 files — BUILD-SELF-ANALYSIS + DESIGN-SYNC-SKILL-REPORT + claude-design-upload/, los extras F4) · cuenca-brand `f709915` (1) · klim-brand `994cd3a` (1) · radiotopia-brand `3153b43` (1) · essential-brand ya limpio y trackeado @ `ae2d7ee` (nada que congelar). Todo local-only (E-O1). Etapa vigente → E1.

(migrada del RESIDENT el 2026-09-01)

## 2026-07-06 · Code · sesión — registro del ciclo (fecha original 2026-07-06)

Hecho: **E1 CERRADO (verdad-máquina, 13 items + A0/A1).** La tesis machine-true quedó TERMINADA en el builder core: contrato handoff v5 congelado (enum 6 valores/3 tiers + `proposed`-cuarentena + `origin:relay` + persistencia `sources/handoff—<fecha>.md` como cima de custodia + acquire routes + registro directivas→enforcement, con fixtures sintéticos que reemplazan los handoffs muertos) · gate suite ejecutable-o-demovido con status board machine-generated (`tools/run-gates.mjs` → `audit/gates/report.md`; NOT-RUN de primera clase; agent-gates con caminata committeada en `audit/agent-gates.md`) · fidelity OBLIGATORIA sobre non-waivables (recompute anti-verdict-a-mano; `--gap` ya no flipa pass; CREATE nunca false-bloquea; legibility guard en scheme-derive) · citas verificables (selector-existe/line-EOF/page-no-line) + custodia MANIFEST de derivados + R1 por comparación de VALORES + NS-C ejecutable (opt-out del kit reconciliado contra el handoff persistido; "OPTIONAL defaults YES" retirado de 9 superficies) · kit e2e corrido con red real (npm build→validate→R6c→deny→upload-shape) con anti-gaming FONT_MISSING spine-required + canal declared-fallback (CONTRA-3 resuelto vía la postura license-as-dependency) · Stage 12 local-by-default (herencia E-O1) · auto-GAP regulatorio detect-and-ask · MT-3 como agent-gate machine-condicionado · medición real (OS/2/metric-compare · cap-height SVG · colorways honestas). Contrato /design-sync re-leído EN VIVO 2026-07-06 (tool DesignSync: @dsCard→_ds_manifest.json · register legacy · report_validate) — coincide con R-07. Ledger de contradicciones del análisis tocadas: CONTRA-1/3/4/7/8 cerradas; CONTRA-2+P7 quedan para E2 (por diseño del plan). Wins-regression del gate corrida con output real (W-1/5/6/8/10/12/14 muerden). 3 rondas adversariales multi-agente pre-commit (E1-02/03/05) — 40 fixes confirmados aplicados. Cero NOT-RUNs abiertos. PRs: #61 (E0) mergeado; #62 (E1, A0→E1-13) mergeado al cierre. Detalle por item: Session log de PLAN-V5.

(migrada del RESIDENT el 2026-09-01)

## 2026-07-06 · Code · sesión — registro del ciclo (fecha original 2026-07-06)

Hecho: **E2 CERRADO (superficies, 8 items).** Las superficies del repo emitido quedan gobernadas por clase: manifest `satellites/surfaces.md` (client/ai-facing/operator) del que el deny-lint TOMA su target list (el linter jamás elige scope; keystone = ai-facing ⇒ el deny no corre ahí — CONTRA-2 muerto estructural, P7 muerto en la fuente vía vocabulario sancionado + binding por línea) · asset-index como única mesa de consulta con binding `verified-primary`→`primary-master-for` · R8 invertido (enumeración DEL índice, fail por omisión) · **SET residente del brand-AI (NS-G): keystone verbal + keystone VISUAL + asset-index — carga forzosa del par**, visual keystone 7 secciones con R-04 machine (cero pins; referencia por nombre de token) + regla imagery-IA de 5 ejes (ground truth del índice · forbidden/permitted abiertos · review por POSTURE · disclosure con pins fechados re-verificados por build) · mapa de ediciones N2 · self-audit harness-backed N1. **Verify adversarial E2-05/06** (4 agentes + juez con repros): FAIL inicial — 1 BLOCKER (el check DO/DON'T se auto-satisfacía con su propio heading; un §4 vacío pasaba) + 3 MAJOR (asset-index sin fila propia en el board · PIN_RE evadible con rgb()/DTCG components/Pantone · falso-fail sobre anchors de links) — corregidos y re-gateados en el acto (detalle: design note E2-05/06 §6). **Re-baseline del golden set** (regla de fixtures: la mutación del sub-check CITATION de E1-05 alcanza al golden set): las 35 citas de Essential → 22 verbatim ancladas a snippets reales del archivo hasheado + 12 `selector:none` honestos + 1 R6a-mislocation corregida; cero invención; commit LOCAL `f24afd9` (cero push, E-O1); Essential limpio DE VERDAD (audit-lint 0 hallazgos, no 0-por-supresión). **Delta regulatorio** (regla de frescura ejecutada con delta real): CA SB 942 movida por AB 853 → operativa 2026-08-02 (hosting 2027-01-01); EU AI Act Art. 50 aplica 2026-08-02, gracia omnibus a 2026-12-02 — pin stale del análisis marcado con corrección grado-log. **Gate E2 (output real):** replay gallery 5/5 BLOCKED con sus clases cazadas (Klim R6a-root+selector-drift · Onyx §7a scores-missing+X1-leak · Radiotopia verdict-a-mano recomputado+FONT_MISSING · Cuenca R6a+selectors fantasma · los 5 sin SET residente; restaurados a frozen 5/5) · golden 0 · W-2/5/9/11 muerden · suite verde (audit 0/1/0/0 · deny manifest 0 + legacy 0/1 · gates clean 2 / violations 1 con 12 filas · r1-font-norm 0). Backlog E2+ con dueño: anti-tamper del validator cliente · decoy multi-archivo `[0]`-only · matriz de fixtures por clase · checks value-blind extra. PR #63 mergeado al cierre. Etapa vigente → E3 (E3-01 espera prompt propio del chat).

(migrada del RESIDENT el 2026-09-01)

## 2026-07-07 · Code · sesión — registro del ciclo (fecha original 2026-07-07)

Hecho: **E3 CERRADO (scoper, 7 items).** El scoper pasó de prosa-con-gates a MÁQUINA: **E3-01** — máquina de estados de elicitación (`scoper/references/elicitation-machine.md`): ciclo de vida por dimensión (UNOPENED born-GAP → OPEN → DECIDED / NOT-USED / PROPOSED-QUARANTINE / GAP) con guardas; frame GENERADO del perfil (patrón obstacle, meta-cobertura, abierto hasta el compile 7b) · orden por discrepancia (bancos = cantera, jamás script) · probing por señales · saturación auditable (N pre-fijado, registro en ledger) · reopen con re-ratificación post-7a · gate-6 promote definido; estado en el dimension ledger snapshoteado en cada DELIVERABLE (evidencia-de-proceso); **verify adversarial FAIL→22 fixes** (2 BLOCKER: proyección PROPOSED inventaba elemento de mapa que los fixtures contradicen · consultation-surface sin poder proyectar su literal PERMANENT; detalle en design note E3-01 §9); curator wall ESCRITO (process-discipline — cura, jamás manufactura; draft solo a cuarentena por invitación). **E3-02** — proxy first-class (factual → `proxy-relayed`; owner-meaning degrada a hypothesis+to-confirm; source check post-respuesta) + multi-decider (captura separada → consolidación de peso declarado → conflicto ESCALADO; scope de a-quién-preguntar válido y registrado). **E3-03** — instrumentos COMPLETOS y descargables en toda etapa, registro visual neutral (jamás la marca del cliente). **E3-04** — disciplina de firma: texto-antes-de-firma · brief≠handoff-mensaje · machine handoff único camino al builder (bloque retenido hasta sign-off) · cláusulas solo elicitadas · specifics web/memoria tagged. **E3-05** — NS-H scoper (proof-of-license des-gateado en las 3 líneas: license = dependencia+confirmación, jamás gate) + baterías = quarry del frame + CONTRA-6 verificada cerrada (Aaker 0 en keystone-emit y contrato). **E3-06** — route walk formal (todo ítem ASSETS con `acquire:`+`fallback:` asignado pre-compile; el scoper ASIGNA, el builder EJECUTA) + scope-bleed nombrado en §Principle. **E3-07** — instrument hygiene (say-once · WHY-first · numeración estable · repo-es-el-hogar · naming `<brand>-brand`). **Contrato handoff y máquina E3-01 INTACTOS toda la etapa** (porcelain 0 en congelados; los 3 fixtures de handoff idénticos a HEAD — la etapa fue 100% proceso, cero wire). **Presupuesto sostenido: SKILL 499/500 los 7 items** — cada exceso pagado con trade logueado en Session log. **Gate E3 (output real):** golden Essential audit-lint 0 (restaurado frozen) · fixtures handoff diff-vs-HEAD 0 · suite completa verde (audit 0/1/0/0 · deny manifest 0 + legacy 0/1 · gates clean 2 / violations 1 · r1 0) · wins con texto shipped: W-14 (0 hits proof-gating + capability-gate language) · W-13 (bloque retenido, process-discipline:86-87) · W-1 (born-gap + blanket-never-mints en la máquina) · scrubs F21/F22 + brand 0/0. **NOT-RUN honesto del gate:** los blind runs scoper-only en Incógnito (≥2 perfiles) que el plan pide son actividad chat-side del operador — quedan declarados pendientes; los stress-tests E4 los absorben (misma clase de corrida). PR de etapa mergeado al cierre. Etapa vigente → E4 (prompt propio del chat).

(migrada del RESIDENT el 2026-09-01)

## 2026-07-16 · Code · sesión — registro del ciclo (fecha original 2026-07-16)

Hecho: **ETAPA F1 CERRADA (spine; 2 items; branch claude/v6-f1, merge autónomo A1).** **F1-01** — migración `.tokens.json` shippeada lockstep (cierra deferral E1-08 + CONTRA-9): 20 renames trackeados + 1 output gitignored regenerado (el "21" del inventario contaba disco); código real = SOLO scheme-derive.mjs (4 líneas) + 2 comments (audit-lint/package-validate, cero semántica — su código es sufijo-compatible vía `endsWith '.json'`, PROBADO en ejecución: los seeds disparan citando `tokens/base.tokens.json`, el golden SIN rename pasa idéntico); prosa 15 archivos con el deferral de token-spine RETIRADO; CHECKSUMS 0 refs verificado. **F1-02** — hop downstream REPARADO (veredicto F0-02: roto desde C-1): tool nuevo `tools/tokens-project.mjs` (zero-dep; tool propio y no flag de scheme-derive — una-herramienta-por-función) = proyección STRING derivada del spine → `tokens/web/{base,semantic,component}.json`, serialización C-1 byte-parity con audit-lint, hex fallback fuera, `$extensions` fuera (values-only), custodia de derivados en `sources/MANIFEST.json` con parent in-repo `{file,sha256}` — custody gate EXTENDIDO: recomputa el parent hash (proyección stale = FAIL; fixtures pass/fail regenerados dentro del gate) — fila `operator` en surfaces + registro en projections § Interchange; prosa stale del seam cazada (SKILL Stage 7 "plain strings" contradecía C-1 — corregido; bullet de projections idem). **E2E real:** build.mjs VERBATIM de web-stack + SD 5.4.4 sobre la proyección → tokens.css con oklch() preservados + var-chains + @theme correcto — contrato cumplido línea por línea. **Gate F1 (output real):** suite completa verde (audit 0/1/0/0 · r1 0 · gates 2/1 · custody/kit-off filas propias correctas · deny 0 + 0/1 · scheme-derive 0 · emitter diffs 0 · clean+proyección sin cambio) · golden = 8 clases exactas del baseline `8b78dba`, cero nueva, porcelain 0 · wins W-1/2/4/5/6/8/9/10/11/12/13/14 muerden con output; W-3/7/15/16/17/18/19 NOT-RUN honesto (capabilities de F2/F3/F5/F6) · SKILL 443/499 · scrubs 0/0. §Integrations DES-STALEADO (el hop real: spine objeto → tokens-project → string → astro-css-tokens). Etapa vigente → F2 (costura de compilación).

(migrada del RESIDENT el 2026-09-01)

## 2026-07-16 · Code · sesión — registro del ciclo (fecha original 2026-07-16)

Hecho: **RONDA PRE-PLAN §16b / F0 EJECUTADA — PLAN-V6 DEFINITIVO; CICLO v6 ABIERTO (branch claude/v6-f0; PR del gate F0 abierto, merge espera OK del operador).** **F0-01 (proyección FASE B vs repo real, por área):** F1-01 (migración `.tokens.json`) vigente y CHICO — line-refs frescos: único código con cambio real = `scheme-derive.mjs:84-85/:157`; `audit-lint.mjs:124/:128` y `package-validate.mjs:86` son SUFIJO-COMPATIBLES con `.tokens.json` sin cambio (match por `endsWith '.json'`); run-gates/client-deny 0 touchpoints; superficie restante = 21 renames de archivos token (3 templates + 18 fixtures) + ~25 líneas de prosa en ~15 archivos; CHECKSUMS de fixtures sin refs a tokens/ (cero regen de hashes); surfaces/asset-index migration-proof (globs dir-level) · CREATE re-scoped a COMPLETAR-DOWNSTREAM: el claim del preliminar ("0 menciones de modo") quedó STALE — seams v5 sustanciales ya existen (validate-audit:267-270 rama `MODE: CREATE` sembrada por E1-04 · run-gates:195/:210 CREATE→NOT-RUN jamás false-block · SKILL ruteo :104/:195 + treatment autorado Stage 8 :239 · create.md 48 líneas); lo que falta: consumo per-stage en create.md (fidelity/audit/kit/keystone) + adjudicar router/keystone-emit (0 menciones c/u; keystone probablemente mode-agnóstico por construcción) · /design-sync VIGENTE: el pin v2.1.185 NO carga `report_validate`/`.render-check.json` (grep 0 en design-sync-kit.md y adapter; único registro = nota de corrida en kit-e2e README-FIXTURE:28 — el re-read vivo 2026-07-06 los vio pero el pin no los absorbió) · prerequisito F4-emitter CUMPLIDO: workaround Onyx congelado y committeado (`claude-design-upload/` 4 cards estáticas + preview @ `025cc64`, tree limpio). **F0-02 (hop downstream):** web-stack-skills clonado a ~/proyectos; veredicto = hop ROTO desde C-1, no solo línea stale — astro-css-tokens exige `$value` string plano (tokens-example.md:7/:81/:84 · SKILL.md:94, anclado a bugs SD v5 #1398/#1494 de object-split) mientras el spine emite objeto estructurado (templates/tokens/base.json:7); DECIDIDO: transform del LADO CANON (proyección string derivada — consumers are projections; el spine 2025.10 no se toca ni se pelea con SD). **F0-04 (re-baseline E3 del golden, EV1-F11 H1-r3):** el contrato ya vivía como sección DENTRO de battery.md (la baseline E3 emitía un solo archivo) — extraído a `audit/redteam/expected-refusal-contract.md` (el archivo propio que run-gates:299-302 exige), battery queda con axes + pointer; commit LOCAL `8b78dba`, cero push (E-O1); clase interina "keystone structural" RETIRADA del perfil run-3 (+ pin del golden actualizado); re-run de gates con output real: keystone structural + form-of-rule PASS, FAIL = SOLO clases conocidas (visual-keystone · asset-index · agent-gates ×5 · deny INTERIM), exit 1, CERO clase nueva; frozen restaurado porcelain 0 (receta con `git clean` probada). **PLAN-V6 DEFINITIVO (compilado por el home base con este retorno):** etapa NUEVA F2 "costura de compilación" + renumeración F3–F6 · contrato único v6 en F2-01 · pin v6 = `9294c961` · insumos trazados EV1-F01…F15 + rectores · EV1-F05 adjudicado kit-YES. Recalibración: total v6 ≈ 16–20 sesiones (con F2).

(migrada del RESIDENT el 2026-09-01)

## 2026-07-16 · Code · sesión — registro del ciclo (fecha original 2026-07-16)

Hecho: **GATE FINAL v5 CORRIDO — E4 CERRADA; CICLO v5 CERRADO (PR del gate abierto, merge espera OK del operador).** Corridas 1/2/3 ejecutadas (run 2 VKL 2026-07-09 phantom-primero per protocolo · run 1 Tres Encinos 2026-07-14, intento 2 tras aborto accidental 07-13 · run 3 golden ejecutado ×2 sesiones con outputs citados); leg dry-parse opcional NO corrido; harness EV-1 en Code (21 agentes; disciplina CLAIM→CHECK→OUTPUT→VERDICT; forense LOCAL-ONLY `stress-v5-runs/veredicto-ev1—2026-07-16.md`, jamás al repo). **Veredicto por rector:** NS-A **no sostuvo** (8 status-claims inflados, 2 jamás curados; etiquetas de ratificación fabricadas en el wire) · NS-B **no-ejercitado** builder-side (sin dry-parse); diseño del wire correcto con mancha (cima de custodia = brief pre-corrección) · NS-C **sostuvo-parcial** (slots explícitos, cero silencio; kit NO contradijo el destino registrado del cliente sin consulta; brazo v0/DEMO sin cobertura) · NS-D **no sostuvo** (run 2: intake saltada + waive sin ledger + "está hecha" falso + 5 dimensiones en silencio; run 1: chat sostuvo, wire no) · NS-E **sostuvo** en lo ejercitado (reaches del perfil: mandiles, etiquetas de calibración, acreditado-vs-conforme; ningún framework exigido; frame run-2 estrecho) · NS-F **sostuvo con 1 mancha dura** (instrumentos limpios de vocabulario operador; leak "(Carlos, por lo que veo de esta cuenta)" en el Incógnito) · NS-G **sostuvo-parcial** (el handoff carga los feeds del SET; Personality/scales inflados + never-topics/refusal-style "n/a" sin elicitar) · NS-H **sostuvo** (license = dependencia+GAP; cero proof-gating en ambos runs). **R-06:** run 1 = 12 eventos (2 fabricaciones netas + 10 borderline; 10/12 en el handoff) vs run 2 = 5 borderline (0 netas) → **INSUFICIENTE** — dirección compatible en el tier neto (2 vs 0, fill-ins de categoría) pero invertida controlada por superficie (chat+brief 2 vs 5); el mecanismo dominante es **inflación en compilación, no memoria en elicitación** (los specifics entran al envolverse en RATIFIED{}/owner-confirmed, después del último checkpoint del owner). **Deltas de comparabilidad (§6 del veredicto):** los 5 del protocolo operaron (el delta 2 ROTO: ambos brazos del kit terminaron en NO — run 2 sin wire, run 1 emitió NO contra el diseño YES) + 7 de ejecución declarados (transcripts reconstruidos desde home base, runbook §3.1 incumplido ×2 · aborto/reintento run 1 · run 2 sin barrer imagery/minimalismo/BUILD-MODE/kit · Incógnito no ciega identidad de cuenta · dry-parse no corrido · red del evaluador por sandbox · pin `aa756dd` = doc-drift, árbol skills/ idéntico verificado). **Insumo pre-plan v6:** EV1-F13 + **verbatim-check compilado-vs-brief-firmado** = candidato PRINCIPAL de mecanismo; EV1-F01/F02 (gate-3.5 emite-o-waive-con-ledger + barrido de dimensiones pre-brief) = candidatos de mecanismo; pendientes de EV1-F11: re-baseline E3 del golden (`expected-refusal-contract.md`, local) + adjudicar kit-slot↔plantillas-redes. Hallazgos completos (15 + adjudicación H1 NO-defecto): `stress-test-v5/failure-gallery-v5.md`; perfil run-3 corregido en este gate (clases conocidas + receta con `git clean`).

(migrada del RESIDENT el 2026-09-01)

## 2026-07-16 · Code · sesión — registro del ciclo (fecha original 2026-07-16)

Hecho: **Gate final v5 (E4 cerrada; ciclo v5 cerrado).** Stress-test v5 corrido (3 corridas + harness EV-1) y veredicto destilado al repo: `stress-test-v5/failure-gallery-v5.md` NUEVA (15 hallazgos EV1-F01…F15 con clase/severidad/evidencia + adjudicación H1 NO-defecto + pendientes pre-plan v6) · perfil `stress-test-v5/profiles/run-3-golden-rerun.md` corregido contra tools v5 (clases conocidas: fuera "sin handoff persistido" → N/A; dentro "keystone structural" interina; receta de restauración + `git clean -fd audit/gates/`) — sustento: veredicto EV-1 §2e H1/H2/H3-r3 · RESIDENT: entrada de gate en Log del ciclo (veredicto por rector + R-06 + deltas + insumo v6), bullet E4 en `## v5`, TL;DR. Forense LOCAL-ONLY fuera del repo (E-O1). PR del gate abierto; merge espera OK del operador.

(migrada del RESIDENT el 2026-09-01)

## 2026-07-16 · Code · sesión — v5 — verdad-máquina completada, superficies gobernadas, el scoper como máquina, E0-E4 (completa, migrada)

### v5 — machine-truth completed, governed surfaces, the scoper as a machine (E0–E4)

v5 es la respuesta directa al stress-test blind de 5 marcas (2026-07): cada clase de falla observada quedó
con mecanismo ejecutable o ley escrita. Ejecutado en 5 etapas sobre `PLAN-V5.md` (Session log por item; los
verifies adversariales multi-agente corrieron pre-merge en los items L). E4 cerrada con el stress-test v5 +
gate final (2026-07-16): veredicto EV-1 destilado en el Log del ciclo y en `stress-test-v5/failure-gallery-v5.md`.

- **E1 — verdad-máquina (builder core).** El contrato handoff v5 CONGELADO: enum de confianza 6 valores/3
  tiers (`hypothesis→corroborated·verified-primary→proxy-relayed·handoff-confirmed·owner-confirmed`),
  `source: proposed` = canal de cuarentena, `origin: relay` excluido de corroboración, persistencia
  `sources/handoff—<fecha>.md` hasheada como cima de custodia, rutas `acquire:/fallback:` ejecutables,
  registro directivas→enforcement (`parse-or-stop·lint·measured·agent-gate`). `tools/run-gates.mjs` = la
  suite ejecutable-o-demovido: exit codes reales, NOT-RUN de primera clase, evidencia committeada de
  agent-gates, recompute del veredicto de fidelity (verdict-a-mano cazado), board machine-generated
  (`audit/gates/report.md`) como único claim legítimo de "gates green". Citas verificables
  (selector-existe/línea≤EOF/PDF-page) + R1 por comparación de VALORES en fuentes hasheadas. License =
  dependencia + confirmación, jamás gate de capacidad (único gate real: redistribución). Stage 12
  local-by-default.
- **E2 — superficies gobernadas.** `satellites/surfaces.md` (client/ai-facing/operator) — el client-deny-lint
  toma su target list DEL manifest, jamás elige su scope; binding por línea + vocabulario cliente sancionado.
  **El brand-AI es un SET residente**: keystone verbal + keystone VISUAL (7 secciones tipo design-brain:
  principios por átomo, tokens POR NOMBRE — cero pins, un pin driftea —, DO/DON'T citando reglas, método
  generativo de decisión, regla imagery-IA de 5 ejes con pins regulatorios re-verificados por build,
  guardrails en cola) + `satellites/asset-index.md` (única mesa de consulta; R8 enumera DESDE el índice —
  fail por omisión). Mapa de ediciones + self-audit harness-backed en el repo emitido.
- **E3 — el scoper como máquina.** `references/elicitation-machine.md`: ciclo de vida por dimensión
  (UNOPENED **born-GAP** → OPEN → DECIDED/NOT-USED/PROPOSED-QUARANTINE/GAP) con guardas; frame GENERADO del
  perfil (obstacle pattern, meta-cobertura, abierto hasta el compile); orden por discrepancia (bancos =
  cantera); probing por señales; saturación auditable; ledger snapshoteado en DELIVERABLEs. Leyes de proceso
  (`references/process-discipline.md`): curator wall (cura, jamás manufactura) · documentos completos
  descargables en toda etapa (registro neutral) · disciplina de firma (texto-antes-de-firma;
  brief≠handoff-mensaje; machine handoff único camino; cláusulas elicitadas; specifics tagged) · instrument
  hygiene. Proxy/multi-decider (`references/multi-decider-proxy.md`): factual→`proxy-relayed`, owner-meaning
  degrada a to-confirm, captura separada → consolidación declarada → conflicto ESCALADO. Route walk formal:
  el scoper ASIGNA rutas de adquisición, el builder las EJECUTA.
- **E4 — stress-test v5 + gate final.** Diseño canónico en `stress-test-v5/` (protocolo blind con asimetría
  declarada · 2 dossiers con conductas-cebo · runbook del operador · harness EV-1 con probe R-06). Corridas:
  run 1 Tres Encinos (scoper-only, FULL, brazo conocido R-06) · run 2 VKL (scoper-only, v0/DEMO, brazo
  phantom; cierre honesto sin handoff) · run 3 golden re-run (builder-side). Harness EV-1 ejecutado en Code
  (21 agentes: 6 barridos + 14 refutadores adversariales + crítico; evidencia por clase: fresco/journal/disco).
  Veredicto mixto: la disciplina CHAT-SIDE sostuvo (curator wall, EH-2 ×2 bajo tentación máxima, firma,
  proxy/multi-decider, superficies cliente limpias); fallan dos costuras — emisión de instrumentos bajo
  compresión (gate-3.5 saltada + waive sin ledger, run 2) e inflación en el paso de COMPILACIÓN del wire
  (12 eventos R-06 con atribución de ratificación fabricada dentro de RATIFIED{}, run 1). 15 hallazgos con
  ID estable → `stress-test-v5/failure-gallery-v5.md`; forense LOCAL-ONLY (E-O1).
  citas verbatim contra archivos hasheados o `selector:none` honesto — 0 hallazgos REALES, no 0-por-supresión.
- **Todo local (E-O1):** cero push de repos de marca, siempre; la gallery y el golden son fixtures locales.

(migrada del RESIDENT el 2026-09-01)

## 2026-07-17 · Code · sesión — registro del ciclo (fecha original 2026-07-17)

Hecho: **ETAPA F5 CERRADA — MIRROR DRIVE, ACTION EMITIDO AL REPO DE MARCA (1 item; branch claude/v6-f5, merge autónomo A1).** Capability OPT-IN: el builder EMITE un GitHub Action (`.github/workflows/drive-mirror.yml`) + su engine zero-dep (`tools/drive-mirror.mjs`) que sube los assets custodiados (**asset-index ∩ CHECKSUMS**) a un Drive compartido en push a la rama default y verifica el round-trip por `sha256Checksum` en AMBOS lados. **Encuadre (home base):** el repo es PÚBLICO, el Action es plantilla parametrizada, cada usuario cablea su propio Drive; cuenta+folder = parámetros, jamás stop de build. **Contrato del mirror:** no-conversión (MIME real, Docs-Editors nativos excluidos por nombre R-14 — sin `sha256Checksum`) · folder tree = espejo del asset-index (columna Drive por fila, o `Kind`) · one-way (git = fuente de verdad, P-J-01) · verify sin empty-pass ni stale. **Auth (2 rutas, GitHub Secrets nativo):** service account + shared drive scope `drive` (la restricción `storageQuotaExceeded` de la SA sin cuota NOMBRADA con evidencia; `drive.file` 404ea en un folder pre-creado) · OAuth `drive.file` + root folder app-owned (publicado a producción → sin expiración de 7 días). run-gates gana la fila **§3d "drive mirror plan"** (`--plan` OFFLINE si el workflow está emitido; N/A si no); superficie `.github/**|operator`. **VERIFY ADVERSARIAL PRE-MERGE (6 frentes + juez, journal a /mnt/c):** los 4 frentes de SEGURIDAD (conversión · empty-verify · stale-binary · **secret-exfil/`pull_request_target`**) LIMPIOS; 2 de corrección cazaron **4 BLOQUEANTES, todos corregidos + re-verify CLEAR**: B1 `drive.file` no escribe a folder pre-creado→live 404 (fix scope+app-owned-root) · B2 OAuth 7-días Testing (fix publicar a producción) · B3 parser CHECKSUMS tira binary-mode `hash *path`→mirror vacío silencioso (fix `\*?`) · B4 `//` interno escapa colisión→pérdida silenciosa (fix `canonFolder` calca el resolver vivo). Fixtures nuevos que muerden: `checksums-binary-stale` + `collision-double-slash`. **DECIDIDO de criterio de gate (doctrina reusable):** el gate de una capability EMITIDA = emisión correcta + verify OFFLINE que muerde, JAMÁS ejecución viva dependiente de infra de tercero (un round-trip del autor prueba el Drive del autor, no el skill; E-O1). El round-trip vivo se documenta como **aceptación del usuario (opt-in)**, no gate. **W-17 → NOT-RUN honesto** (clase W-3/W-7). **Gate F5:** suite 30/30 · golden `essential-brand @ 8b78dba` 8 clases exactas cero nueva porcelain 0 · §3d N/A en golden · scrubs 0/0 · caps scoper 500/500 builder 464/500. Etapa vigente → F6 (cierre v6).

(migrada del RESIDENT el 2026-09-01)

## 2026-07-17 · Code · sesión — registro del ciclo (fecha original 2026-07-17)

Hecho: **ETAPA F4 CERRADA — EL KIT GANA SU PIERNA OFFLINE (emitter de static cards + re-pin vivo; 2 items; branch claude/v6-f4, merge autónomo A1).** **F4-01 — emitter offline de static cards** (`tools/emit-cards.mjs`, zero-dep, capability del kit), derivado del prototipo Onyx congelado (@ `025cc64`, READ-ONLY E-O1) y su `DESIGN-SYNC-SKILL-REPORT.md` (F4/P4: el kit no produce nada renderable offline — sus cards React necesitan build networked + `_ds_bundle.js` + el converter; el workaround fue autorar 4 static cards a mano). Lee el canon (tokens + `canon/mark.svg` + `canon.json`) y escribe cards `@dsCard` self-contained a `design-sync-kit/cards/NN-<group>.html` — una por capa PRESENTE (Brand/Color/Type/Components), NO React/bundle/converter/**network** → hace de `[NO_DIST]` un estado revisable. **Mejora sobre el workaround:** verdaderamente offline (font STACKS con fallbacks; Onyx aún cargaba CDN jsdelivr). Honestidad de provenance: valor incierto (R5) → "· provisional" en vocab cliente, incluye schemes (materializados = hypothesis). Superficie cliente sin plumbing nuevo (fila `design-sync-kit/**` existente). Custody de derivados (patrón F1-02): entrada por (card × input); el color-file es parent de TODA card → cambio en el canon = STALE FAIL; capa removida = poda; la mark lleva `id="brand-mark"` → R6b la reconcilia. Gate `--check` = fila §3c de run-gates. **Verify adversarial pre-commit (4 frentes + juez):** cazó 7 defectos, 5 bloqueantes, todos corregidos — BLOCKER scheme-hypothesis-sin-marcar · MAJOR mark `<image href="http:host">` (esquema sin `//`) evadía el REMOTE regex · MAJOR **inyección** (`$value` sin escapar en `<style>`) · MAJOR card huérfana al quitar capa · +2 no-bloqueantes (fixes: marker lee confidence de roles · REMOTE flag a cualquier esquema no-`data:` fetchable · sanitizers `safeColor`/`safeFont` · pruning · color-file parent universal). **F4-02 — re-pin VIVO del contrato /design-sync + reconciliación** (endereza el orden invertido: F4-01 congeló contra el pin v2.1.185 sin re-pinear; el Step 0 exige lo inverso). Lectura viva vía el **schema del tool `DesignSync`** (interfaz runtime autoritativa, sin `/update`). **Divergencia:** `@dsCard` marker LIVE-current (emitter correcto, NO-OP) · `ds_manifest`→**`_ds_manifest.json`** · register/unregister LEGACY · **`report_validate` + `.render-check.json`** = método+artefacto LIVE que el pin MISSED (los DOS de F0-01c) → añadidos al pin · flujo upload + caps confirmados · config-keys/scripts no tool-visibles → quedan en el pin confirmado (no se inventan). **EMITTER = NO-OP en código** → el verify de F4-01 se sostiene, NO corrí uno nuevo. Regla nueva §Reglas — **freeze-after-repin** (todo congelar-contra-contrato-externo va DESPUÉS del re-pin). **Gate F4:** suite 36/36 · golden 8 clases exactas cero nueva porcelain 0 · pierna offline del emitter verde · scrubs 0/0 · caps SKILL intactos. Etapa vigente → F5 (mirror Drive).

(migrada del RESIDENT el 2026-09-01)

## 2026-07-17 · Code · sesión — registro del ciclo (fecha original 2026-07-17)

Hecho: **OI-K CERRADO — path-bind + section-scope del content-bind de ratificación (branch claude/v6-oik, merge autónomo A1).** Aprieta el helper existente (cero motor nuevo, cero delta de contrato; el registro es artefacto post-handoff builder-side). **Dos ataduras nuevas en R3:** PATH-BIND (el valor debe estar en una línea que también nombra el slot del token — un registro que ratifica valor X para el slot A ya no ratifica al slot B que casualmente carga X) · SECTION-SCOPE (solo líneas dentro de `## What was ratified` ratifican — un valor que el owner nombra en un bloque rechazado/alternativas/superseded es inerte: la inversión EXACTA del run 2 v5, "esa terracota NO, la otra"). Golden-safety VERIFICADA antes de apretar: el golden `8b78dba` cita CERO registros de ratificación → el content-bind nunca dispara ahí. **VERIFY ADVERSARIAL PRE-MERGE (3 frentes + juez, journal a /mnt/c):** cazó **3 huecos bloqueantes** en el primer apriete — (1) value-residue en la misma línea (el matcher escaneaba la línea ENTERA, así que un paréntesis de change-history con un valor rechazado dejaba shippear ese off-value → fix: matchear solo el VALUE SPAN, el primer span backtick tras el slot) · (2) heading superseded/nested (`## What was ratified — SUPERSEDED` y `### …` anidado abrían scope → fix: heading EXACTO, top-level `##`, exactamente uno) · (3) falso-FAIL por sub-headers ATX (`### Colours` cerraba la sección → resuelto seguro: se mantiene "cualquier heading cierra" — la opción B reabriría el reject-sub-header — y se documenta el grouping con `**bold**`). Los 3 corregidos + re-corridos + 2 fixtures nuevos (`ratified-line-residue`, `ratified-superseded-heading`); twins base `ratified-cross-slot` (path-bind) + `ratified-rejected-block` (section-scope). **Cierre:** suite **32/32** · golden 8 clases exactas, cero nueva, porcelain 0 · scrubs 0/0 · caps SKILL intactos (0 SKILL tocado). Convención en gap-protocol § record shape. OI-K → CERRADO; residual solo la frontera de autenticidad self-serving-record (declarada-open desde el fix-pack, sin cambio). Etapa vigente sigue F4.

(migrada del RESIDENT el 2026-09-01)

## 2026-07-17 · Code · sesión — registro del ciclo (fecha original 2026-07-17)

Hecho: **FIX-PACK POST-F3 — content-bind sobre el acto de ratificación (branch claude/v6-f3-fix, merge autónomo A1).** F3 mergeó con un defecto BLOCKER porque su verify corrió DESPUÉS del merge; un verify adversarial post-F3 (huérfano por doble crash de WSL — 3/5 atacantes + A rescatado + C parcial, Judge nunca corrió; cosechado forense local-only) lo cazó, el home base lo adjudicó. **El hueco (A-F3-01 BLOCKER + A-F3-02 MAJOR, UN defecto):** un `owner-confirmed` citando un `sources/ratification—<fecha>.md` genuino y bien hasheado subía a la cima de confianza SIN que ningún gate verificara que el registro NOMBRA el valor que certifica — R3 ataba hash→path y nada más; el `valueInText` de R1 solo disparaba en `corroborated`; y la forma RATIFY legítima (source seguía `proposed`) daba exit 1 (R2), forzando el relabel a `owner-stated` = lavado. **El fix (un mecanismo):** (1) **content-bind del acto de ratificación** en `audit-lint` R3 — un token que cita `sources/ratification—*.md` debe apuntar a un archivo que EXISTE y tener su valor CANÓNICO nombrado en el texto (el análogo post-handoff del `BRIEF{}` verbatim del wire); (2) **terminal `ratified-proposal`** (nuevo source enum) — la salida RATIFY del linaje proposed: preserva el origen "fue propuesta" en el NOMBRE (jamás relabel a owner-stated), sube a owner-confirmed SOLO atado a un registro content-bound, no capado por R2; (3) `gap-protocol § loop de ratificación` reescrito EJECUTABLE + nombra el eje source (corrido contra el linter). **DECIDIDO del eje source:** valor de enum nuevo, NO carve en R2/R5 — preserva el invariante `proposed`=cuarentena, graba el linaje en el nombre, cero delta de contrato (el registro es artefacto Stage-0). **E1/E2 medidos (P-J-01):** E1 (ghost record) MUERTO para registros de ratificación (el content-bind exige existsSync); E1-general (ghost handoff) y E2 (owner-confirmed sobre handoff/declared-spec solo) SOBREVIVEN declarados-open (cerrarlos rompería el golden). **VERIFY ADVERSARIAL PRE-MERGE (la lección aplicada; 3 frentes + juez por hallazgo, journal respaldado a /mnt/c):** cazó **6 huecos new-in-fix** en la PRIMERA implementación — que reusaba el `valueInText` LAXO de R1 para un sello que necesita matching ESTRICTO. **4 bloquearon el merge y se corrigieron** (1 BLOCKER hex short-circuit — un OKLCH fabricado shippeaba si el hex estaba en el registro · 3 MAJOR: substring de fuente "Ares"⊂"shares" · mismo hex short-circuit en valor primario · content-bind vacío para valores no-color) vía un helper estricto content-bind-local `ratificationNamesValue` (requiere componentes OKLCH nunca hex-solo, matches word/number-bounded, forma no verificable = FAIL; `valueInText` intacto → R1 sin regresión); **2 DOWNGRADED a residual declarado** (OI-K: content-bind value-bound no slot-bound). Fixtures gemelos: `ratified-clean` (PASS, la forma legítima antes no-linteable) · `ratified-mismatch` (FAIL, content-bind) · `ratified-hex-held` (FAIL, el BLOCKER del verify). **Cierre:** suite 28/28 · golden `essential-brand @ 8b78dba` audit 0 + 8 clases exactas, cero nueva, porcelain 0 · scrub de cycle-IDs (README fixture + comentario tool) · scrubs 0/0. **Regla nueva en PLAN-V6 § Reglas de operación:** todo item con mecanismo/contrato lleva verify adversarial PRE-merge. Etapa vigente sigue F4 (el fix no la avanza).

(migrada del RESIDENT el 2026-09-01)

## 2026-07-17 · Code · sesión — registro del ciclo (fecha original 2026-07-17)

Hecho: **ETAPA F3 CERRADA — LOS DOS MODOS (CREATE downstream + T2 EXTEND/RECOMMEND; 2 items; branch claude/v6-f3, merge autónomo A1).** **F3-01 — CREATE completado DOWNSTREAM** (re-scope F0-01b: completar, no construir de cero; cero delta al contrato): `create.md` ganó §5 seams per-stage — la rama sin-fuente de fidelity ahora se OPERA (master AUTORADO = source-of-record: `fidelity-diff --source <master> --reproduction <emitido>` por NON-WAIVABLE con master; sin master = NOT-RUN/medium N/A, JAMÁS FAIL por carecer de lo que CREATE por definición carece) — y §6 disciplina de provenance (todo lo generado = `source:"authored"·confidence:"hypothesis"` en gap "pending owner ratification"; `verbatim`/`owner-confirmed` sin acto del owner NO EXISTEN; ratificación jamás retroactiva); reproduction-router § Mode seam (selección mode-agnóstica; validación por sustitución del source-of-record; archived-source N/A); keystone-emit adjudicado MODE-AGNÓSTICO POR CONSTRUCCIÓN (lee confianza DEL token, verificado contra el código — declarado explícito, el silencio ya no es el estado). Fixture `gates/create-empty/` (wire CREATE todo-vacío): wire-check N/A(declared) · §7a NOT-RUN con instrucción master-autorado · kit opt-out PASS — W-15 muerde con output. **F3-02 — T2 EXTEND/RECOMMEND** consumiendo el contrato CONGELADO (cero bump): T2 = engagement shape de ANALYZE (jamás tercer literal de MODE) — mitad analizada corre el lifecycle normal con provenance original; mitad propositiva corre PROPOSED-QUARANTINE invitation-scoped (el ask nombra los slots; fuera de ellos, doble guard intacto — jamás blanket; curator wall íntegro vía su cláusula de herencia escrita); **loop de ratificación post-primer-feedback** con exactamente DOS salidas — RATIFY (acto registrable: promote gate-6 en el brief, o `sources/ratification—<fecha>.md` hasheado post-handoff; gap cierra) o ADJUST-and-stay-proposed — y NINGUNA implícita (silencio/entusiasmo/uso del draft promueven nada); **flujo builder draft-desde-recomendación** (gap-protocol § nueva): lo materializado hereda `proposed·hypothesis` montado en el MISMO gap, R2/R5 sostienen el cap mecánicamente. Doctrina: T2 extiende, jamás re-litiga lo ratificado. Fixture `gates/t2-proposed/` (gemelos): clean = wire T2 PASS (14/12/2; exención de cuarentena probada con valor real) + draft token → audit-lint CLEAN exit 0; violation = propuesta canonizada sin acto → exit 1 R2+R3+R5 — **W-16 muerde con output real**. **Gate F3:** suite completa verde (batería wire-check 8 FAIL + 2 N/A + 5 PASS; baselines custody/kit-off/deny/scheme/tokens-project intactos) · golden `8b78dba` audit 0 + 8 clases exactas, cero nueva, porcelain 0 · wins W-1…W-19 íntegra (W-15/W-16 con output; NOT-RUN honesto solo W-3/7→F6 y W-17→F5) · scrubs 0/0 · scoper 500/500 · builder 462/500. Etapa vigente → F4 (kit ∥ F5 mirror).

(migrada del RESIDENT el 2026-09-01)

## 2026-07-17 · Code · sesión — registro del ciclo (fecha original 2026-07-17)

Hecho: **ETAPA F2 CERRADA — LA COSTURA DE COMPILACIÓN (el insumo #1 del gate v5; 3 items; branch claude/v6-f2, merge autónomo A1).** El wire ya no puede AFIRMAR ratificación que no puede PROBAR. **F2-01 — contrato wire v6 (cambio único lockstep; design note `design-note-f2-01-wire-contract-v6—2026-07-16.md`, DECIDIDOs 1–12):** el brief firmado viaja DENTRO del wire (appendix `— SIGNED BRIEF —`, exactamente uno, ÚLTIMO bloque; Stage 0 lo parte a `sources/brief—<fecha>.md`, ambos hasheados; binding R3 queda al handoff) · tag `BRIEF{ verbatim:"…" | anchor:"…" | none — compiled, hypothesis }` POR LÍNEA — el wrapper `RATIFIED{}` registra el ACTO y confiere NADA; herencia por línea (verbatim/anchor verificado → handoff-confirmed; none → hypothesis; sin tag = defect) — el mecanismo de EV1-F03/F04 muerto · verbatim con CONTENT-BIND + coverage (una cita real jamás legitima contenido distinto) · not-used(owner-declared) exige cita confirmatoria presente en el brief DONDEQUIERA que aparezca (blanket muerto por omisión Y por duplicación) · línea `WIRE-CHECK:` recomputable + identidad + reconciliación body-wide · vocabulario saneado (las 6 clases del run 1 CORREGIDAS; "n/a" baneada como valor; ingest `n/a`→`none-needed`; extensión open-class solo por declaración NEW-INGEST; posture `→GAP` ⇒ fila GAPS) · **ejecutable `tools/wire-check.mjs`** (Stage 0 al persistir — el dry-parse lo hereda — + fila BLOCKING del board; límite declarado: consistencia interna, la autenticidad es hash+firma) · verify adversarial 4 atacantes + juez (43→43): 2 BLOCKER (header temprano tragaba el body → PASS universal; cita-real-contenido-fabricado, pre-cazado por probe propio) + 15 MAJOR + 9 MINOR + 5 NIT corregidos y re-verificados con repros. **F2-02 — gate-3.5 emite-o-waive-con-ledger + barrido pre-brief:** la consecuencia machine-checkeable del skip/waive es la DIMENSIÓN EN SILENCIO — clases `silent-dimension`/`silent-gap` (un tagged-gap o fila GAPS que el brief firmado jamás nombra = el owner aprobó a ciegas — el fallo exacto del run 2); chat-side escrito: la 3.5 EMITE o el waive nombra cada UNOPENED una por una + jamás sellado done; el retome TRAE el brief (EV1-F06). **F2-03 — reglas + checks chicos:** reemisión post-firma con diente mecánico (clase `reemission`: el split del brief debe ser byte-fiel al appendix — la corrección in-place de EV1-F08 muere) + no-✔ antes del To-confirm (EV1-F14) + prosa cliente sin plumbing (EV1-F09: tercera clase del self-check §6) + tabla destino⇒kit-slot en el bank (EV1-F05 kit-YES: se elicita por DESTINO, jamás por nombre de librería). **Mecánico vs escrito:** mecánico todo lo que un artefacto persistido alcanza (12+ clases de FAIL nuevas en wire-check; 9 fixtures biting); escrito SOLO lo chat-side sin artefacto (waive-ledger · no-✔ · plumbing · retome — en machine/process-discipline/self-checks). **Gate F2 (output real):** suite completa verde · biting 8/8 FAIL + N/A honesto + handoffs 3/3 PASS + clean PASS · golden = 8 clases exactas del baseline `8b78dba`, cero nueva, porcelain 0 · **W-18 y W-19 VIVOS con fixture** · wins íntegra (NOT-RUN honesto solo F3/F5/F6 capabilities) · scrubs 0/0 · scoper 500/500 cap duro (trades logueados). Contrato v6 CONGELADO para F3+ (T2 lo consume tal cual). Etapa vigente → F3 (modos).

(migrada del RESIDENT el 2026-09-01)

## 2026-07-17 · Code · dictamen — OI-K cerrado

Ratification content-bind value-bound, not slot-bound / section-scoped — CERRADO (2026-07-17, branch claude/v6-oik). El content-bind R3 ahora ata PATH (el valor debe estar en una línea que nombra el slot del token — un registro que ratifica X para el slot A ya no ratifica al slot B que carga X) y SECTION-SCOPE (solo `## What was ratified` ratifica; un bloque rechazado/superseded es inerte — la inversión del run 2 v5), con heading exacto/único/top-level, valor por VALUE SPAN (primer span backtick tras el slot), y 5 fixtures bitientes. Verify adversarial pre-merge (3 frentes) cazó 3 huecos bloqueantes (value-residue en la misma línea · heading superseded/nested · falso-FAIL por sub-headers ATX) — los 3 corregidos + fixtures. Convención formalizada en gap-protocol § the ratification record shape. Detalle en `notes/verify-note-oik-path-section-bind—2026-07-17.md`. Severity: MAJOR. Status: CERRADO (2026-07-17).

(migrada del RESIDENT el 2026-09-01)

## 2026-08-13 · Code · sesión — registro del ciclo (fecha original 2026-08-13)

Hecho: **CONSTRUCCIÓN v6 CERRADA — v0.6.0 MERGEADO A MAIN (PR #76 squash, main @ `9db1d4f`; gate final F6 con OK explícito del operador).** La verificación independiente pre-merge (26 días después del push de `babe0d0`) cazó y corrigió: frozen truth STALE del round-trip de tokens-project (el sort estable de F6-01 dejó `expected/MANIFEST.json` con orden viejo; staleness PROBADA por normalización, re-congelado CORRIENDO el productor — `6495cde`) y el claim **"suite 31/31" de la sesión F6-01 era falso** (ese round-trip estaba en rojo) — corregido con entrada correctiva en PLAN-V6 (`dd398fd`). Suite pre-merge **52/52 verde** (incluido el harness de integración: exit 2, cero FAIL, MANIFEST canónico 10 entries). **OI-M registrado (SHOULD/OPEN):** el golden `essential-brand @ 8b78dba` está PERDIDO (ruta jamás registrada) — v6 cierra SIN regresión e2e sobre marca real; se salda con un golden NUEVO en la siguiente validación de marca, post-instalación de v0.6.0 en trabajo real. Post-merge: manifests 0.6.0 verificados en main · ramas remotas muertas borradas (claude/v5-e0…e4-stress + claude/v6-f6) · copia de trabajo drvfs (`/mnt/c/…/Downloads/brand-system-skills`, donde corrió F6-01) retirada; `dev/` local-only rescatado al clon canónico `~/proyectos/brand-system-skills`. **Quedan F6-02/F6-03** — la validación e2e de v6 NO ha corrido; etapa de stress-test gated a instrucción del operador.

(migrada del RESIDENT el 2026-09-01)

## 2026-08-13 · Code · sesión — v6 — costura de compilación, los dos modos, la pierna offline del kit, el mirror de Drive, F0-F6 (completa, migrada)

### v6 — compile seam, both modes, the kit's offline leg, the Drive mirror (F0–F6)

v6 CONSTRUYE lo no-testeado sobre la fundación que v5 probó, MÁS lo que arrojó el stress-test v5 (los dos
patrones rectores del gate: inflación en el paso de COMPILACIÓN del wire · compresión de instrumentos bajo
presión). Ejecutado en 6 etapas sobre `PLAN-V6.md` (Session log por item); TODO item con mecanismo o contrato
llevó **verify adversarial PRE-merge** (la lección de F3, que mergeó con un BLOCKER por correr el verify
después) con journal respaldado local-only. Baseline `9294c961` → **plugin `0.6.0`**. Golden = `essential-brand`
LOCAL `8b78dba` (8 clases FAIL exactas = la regresión permanente). Design/verify notes por etapa en `notes/`.

- **F1 — spine.** Migración `.tokens.json` lockstep (cierra el deferral E1-08); hop downstream REPARADO — el
  spine emite el objeto estructurado-OKLCH y `tools/tokens-project.mjs` (zero-dep, tool propio) proyecta la
  STRING canónica C-1 a `tokens/web/**` para los consumers string-only (SD v5 #1398/#1494); custodia de
  derivados en `sources/MANIFEST.json` con parent hash recomputado por el gate. E2E real contra el clon
  web-stack (build.mjs verbatim + SD 5.4.4 → oklch() preservado).
- **F2 — la costura de compilación (el insumo #1 del gate v5).** El wire ya no AFIRMA ratificación que no
  puede PROBAR: el brief firmado viaja DENTRO del wire (appendix, último bloque; Stage 0 lo parte + hashea),
  con **`BRIEF{ verbatim | anchor | none }` POR LÍNEA** — el wrapper `RATIFIED{}` registra el acto y confiere
  NADA; paráfrasis sin ancla = democión a hypothesis (el mecanismo EV1-F03/F04 muerto). Ejecutable
  `tools/wire-check.mjs` (verbatim-check compilado-vs-brief-firmado + barrido pre-brief silent-dimension/gap +
  reemisión byte-fiel + vocabulario saneado). Contrato v6 CONGELADO para el resto del plan.
- **F3 — los dos modos.** CREATE completado DOWNSTREAM (seams per-stage: la rama sin-fuente de fidelity se
  OPERA contra el master AUTORADO; provenance `authored·hypothesis`; keystone MODE-AGNÓSTICO por construcción).
  T2 EXTEND/RECOMMEND = engagement shape de ANALYZE (jamás tercer literal de MODE): mitad propositiva en
  PROPOSED-QUARANTINE invitation-scoped + **loop de ratificación** post-primer-feedback con dos salidas (RATIFY
  registrable / ADJUST-and-stay-proposed), ninguna implícita. Fix-pack post-F3 + OI-K: **content-bind del acto
  de ratificación** en R3 (el registro debe existir y nombrar el valor canónico, path-bound + section-scoped;
  terminal `ratified-proposal`), cerrado con 3 verifies adversariales.
- **F4 — el kit gana su pierna offline.** `tools/emit-cards.mjs` (zero-dep, capability del kit) renderiza
  cards `@dsCard` self-contained desde el canon — cero React/bundle/converter/**network** → hace de
  `[NO_DIST]` un estado revisable; honestidad de provenance (un valor incierto R5 → "· provisional" en vocab
  cliente, jamás GAP id). Re-pin VIVO del contrato /design-sync leído del schema del tool `DesignSync`
  (`report_validate` + `.render-check.json` absorbidos; regla nueva freeze-after-repin).
- **F5 — el mirror Drive (capability EMITIDA, opt-in).** GitHub Action + engine zero-dep `tools/drive-mirror.mjs`
  que sube los assets custodiados (**asset-index ∩ CHECKSUMS**) a un Drive compartido en push y verifica el
  round-trip por `sha256Checksum` en ambos lados; no-conversión (Docs-Editors excluidos por nombre, R-14);
  one-way (git = fuente de verdad). Auth GitHub Secrets (SA `drive` + shared drive, o OAuth `drive.file` +
  app-owned root). **DECIDIDO de criterio de gate (doctrina reusable):** el gate de una capability EMITIDA =
  emisión correcta + verify OFFLINE que muerde, JAMÁS ejecución viva dependiente de infra de tercero — el
  round-trip vivo es aceptación del usuario, no gate (W-17 = NOT-RUN honesto).
- **F6 — cierre.** Integración: los mecanismos de las 5 etapas ejercitados JUNTOS sobre un repo (proposed → card
  `provisional` → deny scrub · proposed nunca llega al mirror · los 3 productores de custodia coexisten — el
  merge de `sources/MANIFEST.json` es tool-scoped, jamás clobber · run-gates verde con toda la board de una vez)
  → **cero pisos, mecanismos ortogonales confirmado**; harness offline en `fixtures/integration/`. Docs del repo
  a v6, notas consolidadas a `notes/`, bump `0.6.0`.

(migrada del RESIDENT el 2026-09-01)

## 2026-09-01 · Code · Mudanza de contenido de la base v2 del estándar de documentos

Hecho: RESIDENT.md (593→176 líneas) y CLAUDE.md (328→122 líneas) purgados de narrativa fechada y
material de referencia largo, ambos ahora bajo su presupuesto (200 y 150). Del RESIDENT salieron: la
narrativa histórica completa v2→v6 + dead-ends + change log (líneas 236–590, 355 líneas), la tabla de
49 decisiones (131–182, ahora índice agrupado de 9 líneas con las 49 IDs `brand-system-skills-D-001`
a `D-049`), el Roadmap-horizontes (208–234) y el Log-del-ciclo de 15 gates (47–63) — todo migrado
arriba en esta misma bitácora como 94 entradas nuevas (49 decisión + 31 sesión de registro
[16 change log + 15 log-del-ciclo] + 5 sesión de arquitectura [v2…v6] + 8 dictamen [7 Open Items
cerrados + el roadmap-horizontes] + 1 fricción [dead-ends]), cada una con su fecha original y la
nota de migración. El RESIDENT ganó `## Rumbo` (objetivo vigente · qué sigue
indexando el único issue real, #85 · despensa de lo no comprometido) y quedó con front matter de
esquema base (name/title/description/last_updated/status/supersede) conservando sus campos de ruteo
(applies_to/canonical/domains). Del CLAUDE.md salieron dos bloques de referencia larga —
`## Tooling — emitted gates` (149 líneas, las 9 herramientas del builder) y `## Standing guardrails`
(103 líneas, ~18 guardrails) — a `docs/tools-reference.md` y `docs/guardrails-reference.md`
respectivamente (verbatim, con solo un header nuevo); `CLAUDE.md` quedó con el resumen de una línea
por herramienta/guardrail y un puntero a cada doc. `CLAUDE.md` ganó `## Cómo verificar` como primera
sección: este repo no tiene build/tests propios — el verde es el self-test de cada gate contra sus
fixtures, `audita.py revisa`, el pre-commit global, y el brand-scrub manual. README.md (105→90) perdió
solo la sección `## Status` con detalle de versión (ya duplicado en RESIDENT/BITACORA) y el rewrap de
dos bullets de Requirements. MAPA.md regenerado con las 2 filas nuevas de `docs/` descritas y la fila
de RESIDENT.md corregida (ya no dice 593 líneas). Verificado: `audita.py revisa .` da cero avisos;
`mapa.py revisa` cubre los 329 archivos trackeados sin enlaces rotos. Verificación de fidelidad: cada
bloque migrado se comparó byte a byte contra el RESIDENT original antes de escribir la versión nueva
(las 49 filas de la tabla de decisiones, las 6 secciones de arquitectura v2–v6 + dead-ends, y los 16
bullets del change log reconstruyen exactamente el texto fuente).

Decidido: ninguna decisión de sistema — las de este repo (D-001…D-049) son la mudanza misma, no
decisiones nuevas.
Pendiente: nada de este encargo; sigue abierto lo que ya estaba (issue #85, stress-test v6, `OI-M`).
Siguiente: al cerrar la próxima sesión que toque este repo, agregar su entrada aquí — sin preguntar.
