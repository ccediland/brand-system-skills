---
name: brand-system-skills-resident
description: "Living resident doc for brand-system-skills — a Claude Code plugin marketplace whose skills
  build a generic, brand-agnostic, output-agnostic brand canon (four layers + DTCG/OKLCH token spine) for
  any brand. Use when any session touches this repo, its skills, the canon template, the token interchange
  contract, its relationship to web-stack-skills, or the v4→v5/v6 build cycle (recap + gate-level log live here).
  Canonical at the source; any mirror is read-only."
last_updated: 2026-07-04
applies_to: Repo ccediland/brand-system-skills — the brand-canon builder/scoper skills + canon template
canonical: github
domains: [brand-system, tooling, ciclo-v5]
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
- **v3 (shipped):** un stress adversarial (3ª marca independiente) expuso clases de falla que los gates v2 no ven — todas reducen a pérdida de estatus epistémico. v3 = **anti-determinismo rectoral** + north star **"a brand an AI can BE"** (keystone attachable think/speak/design-as) + **provenance en cada dato**. Phases 1–4 a `main`; los dos audits (#19 transversal, #25 system) remediados a **ledger CERRADO** across #20–#29 (deliberados: F55 bold-density · F31 motion-line · horizonte OI-J). Ver `## v3`.
- **v4 (SHIPPED — plugin `0.4.0`):** la disciplina de prosa vuelta **gates ejecutables** en ambos skills — 7 stages A–G cerrados, 23 mecanismos a `main` (solo R9 diferido): el builder emite un repo cliente auto-validante (`audit-lint` R0–R8 + fidelity MEDIDA + scheme materializer + client deny-lint); el scoper corre un flujo cliente único + self-checks EH/proceso. RESIDENT = único doc durable; el roadmap v4 retirado a git history. Ver `## v4`.
- **CICLO VIGENTE (2026-07-04) — v4 TESTEADA → v5/v6:** la validación que v4 llamaba "Phase 5" corrió — más grande — como **stress-test BLIND e2e de 5 marcas reales**. Veredicto: la tesis machine-true quedó a la mitad (~50% del gate suite era prosa auto-atestada; el aparato de provenance certifica la transcripción del builder, no la captura — C-X6; fidelity se fingió o esquivó donde aplicaba — X2). Disposición: `essential-brand` = golden set LOCAL; Onyx/Cuenca/Klim/Radiotopia = failure gallery local. Planeación CERRADA: análisis congelado + PLAN-V5 (aprobado) + PLAN-V6 (preliminar) en la raíz de este repo. Ver `## Ciclo vigente`.

## Cómo retomar (toda sesión del ciclo)

Leer EN ORDEN: este `RESIDENT.md` → `CLAUDE.md` → `brand-system-skills-v5-analysis_2026-07-04.md` (el "análisis") → el PLAN de la versión en curso (`PLAN-V5.md` / `PLAN-V6.md`). Con eso la sesión queda up-to-date: contexto, avance, decisiones, lo que falta. Mantenimiento de este doc: Code lo actualiza al cierre de cada GATE/ETAPA del ciclo (recap + log + decisiones) — JAMÁS por sesión; el detalle por sesión vive en el Session log del plan. `CLAUDE.md` carga lo puntual de arquitectura/código/gotchas y lo mantiene Code cuando haga falta.

## Ciclo vigente — v4 testeada → v5/v6 (recap; el detalle SIEMPRE se resuelve por ID en los docs de raíz)

- **Qué pasó:** v0.4.0 @ `65932bb` sometida a stress-test blind e2e de 5 marcas de clases distintas (visual · regulated · phantom · flat/foundry · sonic), cada una con self-analysis + harness. Los hallazgos, con ID estable, viven en el análisis (§1–§11 problemas · §12 wins W-1…W-14 · §13 rectores NS-A…NS-H · §14 directrices N1–N11+T1–T3 · §15 research con fuentes · §16 arquitectura de los dos workflows: creación de plan vs ejecución — chat home base, Code brazo, retornos destilados).
- **PLAN-V5.md (canónico, aprobado):** E0 congelar gallery → E1 verdad-máquina (contrato único E1-02: enum 5 rungs + fixtures sintéticos de handoff; gates ejecutables o demovidos; NS-B custodia; fidelity obligatoria con rama sin-fuente; NS-C) → E2 superficies (manifest, vocabulario sancionado, asset-index N5, R8 invertido, keystone visual N4 + regla imagery N7, N2, self-audit N1) → E3 scoper (máquina de estados 4-estados con frame generado, proxy/multi-decider, N11, curator-wall ESCRITO, POSTURE derivado) → E4 cierre + stress-tests por mecanismo. Wins-regression W-1…W-14 en cada gate. ≈30–35 sesiones.
- **PLAN-V6.md (PRELIMINAR, gated a F0 post stress-test v5):** F0 re-verificación + veredicto hop web-stack → F1 migración `.tokens.json` + hop → F2 CREATE completado + T2 EXTEND/RECOMMEND → F3 F4-emitter (kit capability) → F4 mirror Drive (GitHub Action + sha256) → F5 cierre. Fuera con condición escrita: resolver Module · OI-J.
- **Decisiones de ciclo (2026-07-04):** todo LOCAL — cero push de repos de marca; handoffs originales del test no existen y NO se reconstruyen (fixtures sintéticos v5); los 5 blind-test reports = archivo forense FUERA del workflow; los 3 docs del ciclo a la raíz de main; pin `65932bb` = baseline sobre la superficie de CÓDIGO (commits doc-only no lo invalidan).

### Log del ciclo (por gate/etapa — lo mantiene Code)

- 2026-07-04 — PLANEACIÓN CERRADA: análisis consolidado y CONGELADO; research §15 completo; rondas de análisis pre-plan v5 y v6 ejecutadas en Code; PLAN-V5 aprobado (v2 + 4 enmiendas de la ronda v6) y PLAN-V6 preliminar. Etapa vigente: PLAN-V5 E0 — pendiente: subida de los docs del ciclo a main (branch→PR→OK) + E0-01.
- 2026-07-06 — **E1 CERRADO (verdad-máquina, 13 items + A0/A1).** La tesis machine-true quedó TERMINADA en el builder core: contrato handoff v5 congelado (enum 6 valores/3 tiers + `proposed`-cuarentena + `origin:relay` + persistencia `sources/handoff—<fecha>.md` como cima de custodia + acquire routes + registro directivas→enforcement, con fixtures sintéticos que reemplazan los handoffs muertos) · gate suite ejecutable-o-demovido con status board machine-generated (`tools/run-gates.mjs` → `audit/gates/report.md`; NOT-RUN de primera clase; agent-gates con caminata committeada en `audit/agent-gates.md`) · fidelity OBLIGATORIA sobre non-waivables (recompute anti-verdict-a-mano; `--gap` ya no flipa pass; CREATE nunca false-bloquea; legibility guard en scheme-derive) · citas verificables (selector-existe/line-EOF/page-no-line) + custodia MANIFEST de derivados + R1 por comparación de VALORES + NS-C ejecutable (opt-out del kit reconciliado contra el handoff persistido; "OPTIONAL defaults YES" retirado de 9 superficies) · kit e2e corrido con red real (npm build→validate→R6c→deny→upload-shape) con anti-gaming FONT_MISSING spine-required + canal declared-fallback (CONTRA-3 resuelto vía la postura license-as-dependency) · Stage 12 local-by-default (herencia E-O1) · auto-GAP regulatorio detect-and-ask · MT-3 como agent-gate machine-condicionado · medición real (OS/2/metric-compare · cap-height SVG · colorways honestas). Contrato /design-sync re-leído EN VIVO 2026-07-06 (tool DesignSync: @dsCard→_ds_manifest.json · register legacy · report_validate) — coincide con R-07. Ledger de contradicciones del análisis tocadas: CONTRA-1/3/4/7/8 cerradas; CONTRA-2+P7 quedan para E2 (por diseño del plan). Wins-regression del gate corrida con output real (W-1/5/6/8/10/12/14 muerden). 3 rondas adversariales multi-agente pre-commit (E1-02/03/05) — 40 fixes confirmados aplicados. Cero NOT-RUNs abiertos. PRs: #61 (E0) mergeado; #62 (E1, A0→E1-13) mergeado al cierre. Detalle por item: Session log de PLAN-V5.
- 2026-07-05 — **E0 CERRADO.** Subida de los docs del ciclo a raíz de main completada @ `6850056` (PLAN-V5 + PLAN-V6 + análisis). A0: reglas del workflow de ejecución del operador asentadas en PLAN-V5 §Reglas de operación + frontmatter des-staleado. E0-01: failure gallery CONGELADA — commit LOCAL de todo lo untracked en los 5 repos de prueba (gate `git status` limpio 5/5): onyx-brand-canon `025cc64` (7 files — BUILD-SELF-ANALYSIS + DESIGN-SYNC-SKILL-REPORT + claude-design-upload/, los extras F4) · cuenca-brand `f709915` (1) · klim-brand `994cd3a` (1) · radiotopia-brand `3153b43` (1) · essential-brand ya limpio y trackeado @ `ae2d7ee` (nada que congelar). Todo local-only (E-O1). Etapa vigente → E1.
- 2026-07-07 — **E3 CERRADO (scoper, 7 items).** El scoper pasó de prosa-con-gates a MÁQUINA: **E3-01** — máquina de estados de elicitación (`scoper/references/elicitation-machine.md`): ciclo de vida por dimensión (UNOPENED born-GAP → OPEN → DECIDED / NOT-USED / PROPOSED-QUARANTINE / GAP) con guardas; frame GENERADO del perfil (patrón obstacle, meta-cobertura, abierto hasta el compile 7b) · orden por discrepancia (bancos = cantera, jamás script) · probing por señales · saturación auditable (N pre-fijado, registro en ledger) · reopen con re-ratificación post-7a · gate-6 promote definido; estado en el dimension ledger snapshoteado en cada DELIVERABLE (evidencia-de-proceso); **verify adversarial FAIL→22 fixes** (2 BLOCKER: proyección PROPOSED inventaba elemento de mapa que los fixtures contradicen · consultation-surface sin poder proyectar su literal PERMANENT; detalle en design note E3-01 §9); curator wall ESCRITO (process-discipline — cura, jamás manufactura; draft solo a cuarentena por invitación). **E3-02** — proxy first-class (factual → `proxy-relayed`; owner-meaning degrada a hypothesis+to-confirm; source check post-respuesta) + multi-decider (captura separada → consolidación de peso declarado → conflicto ESCALADO; scope de a-quién-preguntar válido y registrado). **E3-03** — instrumentos COMPLETOS y descargables en toda etapa, registro visual neutral (jamás la marca del cliente). **E3-04** — disciplina de firma: texto-antes-de-firma · brief≠handoff-mensaje · machine handoff único camino al builder (bloque retenido hasta sign-off) · cláusulas solo elicitadas · specifics web/memoria tagged. **E3-05** — NS-H scoper (proof-of-license des-gateado en las 3 líneas: license = dependencia+confirmación, jamás gate) + baterías = quarry del frame + CONTRA-6 verificada cerrada (Aaker 0 en keystone-emit y contrato). **E3-06** — route walk formal (todo ítem ASSETS con `acquire:`+`fallback:` asignado pre-compile; el scoper ASIGNA, el builder EJECUTA) + scope-bleed nombrado en §Principle. **E3-07** — instrument hygiene (say-once · WHY-first · numeración estable · repo-es-el-hogar · naming `<brand>-brand`). **Contrato handoff y máquina E3-01 INTACTOS toda la etapa** (porcelain 0 en congelados; los 3 fixtures de handoff idénticos a HEAD — la etapa fue 100% proceso, cero wire). **Presupuesto sostenido: SKILL 499/500 los 7 items** — cada exceso pagado con trade logueado en Session log. **Gate E3 (output real):** golden Essential audit-lint 0 (restaurado frozen) · fixtures handoff diff-vs-HEAD 0 · suite completa verde (audit 0/1/0/0 · deny manifest 0 + legacy 0/1 · gates clean 2 / violations 1 · r1 0) · wins con texto shipped: W-14 (0 hits proof-gating + capability-gate language) · W-13 (bloque retenido, process-discipline:86-87) · W-1 (born-gap + blanket-never-mints en la máquina) · scrubs F21/F22 + brand 0/0. **NOT-RUN honesto del gate:** los blind runs scoper-only en Incógnito (≥2 perfiles) que el plan pide son actividad chat-side del operador — quedan declarados pendientes; los stress-tests E4 los absorben (misma clase de corrida). PR de etapa mergeado al cierre. Etapa vigente → E4 (prompt propio del chat).
- 2026-07-06 — **E2 CERRADO (superficies, 8 items).** Las superficies del repo emitido quedan gobernadas por clase: manifest `satellites/surfaces.md` (client/ai-facing/operator) del que el deny-lint TOMA su target list (el linter jamás elige scope; keystone = ai-facing ⇒ el deny no corre ahí — CONTRA-2 muerto estructural, P7 muerto en la fuente vía vocabulario sancionado + binding por línea) · asset-index como única mesa de consulta con binding `verified-primary`→`primary-master-for` · R8 invertido (enumeración DEL índice, fail por omisión) · **SET residente del brand-AI (NS-G): keystone verbal + keystone VISUAL + asset-index — carga forzosa del par**, visual keystone 7 secciones con R-04 machine (cero pins; referencia por nombre de token) + regla imagery-IA de 5 ejes (ground truth del índice · forbidden/permitted abiertos · review por POSTURE · disclosure con pins fechados re-verificados por build) · mapa de ediciones N2 · self-audit harness-backed N1. **Verify adversarial E2-05/06** (4 agentes + juez con repros): FAIL inicial — 1 BLOCKER (el check DO/DON'T se auto-satisfacía con su propio heading; un §4 vacío pasaba) + 3 MAJOR (asset-index sin fila propia en el board · PIN_RE evadible con rgb()/DTCG components/Pantone · falso-fail sobre anchors de links) — corregidos y re-gateados en el acto (detalle: design note E2-05/06 §6). **Re-baseline del golden set** (regla de fixtures: la mutación del sub-check CITATION de E1-05 alcanza al golden set): las 35 citas de Essential → 22 verbatim ancladas a snippets reales del archivo hasheado + 12 `selector:none` honestos + 1 R6a-mislocation corregida; cero invención; commit LOCAL `f24afd9` (cero push, E-O1); Essential limpio DE VERDAD (audit-lint 0 hallazgos, no 0-por-supresión). **Delta regulatorio** (regla de frescura ejecutada con delta real): CA SB 942 movida por AB 853 → operativa 2026-08-02 (hosting 2027-01-01); EU AI Act Art. 50 aplica 2026-08-02, gracia omnibus a 2026-12-02 — pin stale del análisis marcado con corrección grado-log. **Gate E2 (output real):** replay gallery 5/5 BLOCKED con sus clases cazadas (Klim R6a-root+selector-drift · Onyx §7a scores-missing+X1-leak · Radiotopia verdict-a-mano recomputado+FONT_MISSING · Cuenca R6a+selectors fantasma · los 5 sin SET residente; restaurados a frozen 5/5) · golden 0 · W-2/5/9/11 muerden · suite verde (audit 0/1/0/0 · deny manifest 0 + legacy 0/1 · gates clean 2 / violations 1 con 12 filas · r1-font-norm 0). Backlog E2+ con dueño: anti-tamper del validator cliente · decoy multi-archivo `[0]`-only · matriz de fixtures por clase · checks value-blind extra. PR #63 mergeado al cierre. Etapa vigente → E3 (E3-01 espera prompt propio del chat).

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
- **Why v4 — the gate thesis (declares vs never instantiated).** Each skill *declared* a discipline but never
  made it a gate; v4 instantiates it. The frozen framing:

  | Skill | Declares | Never instantiated (pre-v4) | Keystone fix |
  |---|---|---|---|
  | Scoper (Chat) | two surfaces: internal-rigor vs client | separating them into distinct artifacts — shipped one undifferentiated stream | two-surface instantiation |
  | Builder (Code) | fidelity / values | measuring or reconciling them — evidence prose-true, not machine-true | cross-artifact reconciliation + measurement gate |

  v4 in one line: turn the rector from prose into executable gates — surfaces that are separate artifacts, values
  measured and byte-reconciled, completeness enforced — plus a third axis: the client-review surface must be
  human-legible and complete (scoper → a readable approval brief, not a machine block; builder → a complete
  interactive brandbook, not a thin demo + a repo of `.md`). Implemented across Stages A–G in `## v4`.

## Repo map
- `.claude-plugin/marketplace.json` · `plugin.json` — marketplace + plugin manifests (mirror web-stack-skills).
- `skills/brand-canon-builder/` — `SKILL.md` + `references/` (architecture, coverage-checklist, gap-protocol,
  token-spine, analyze, create, asset-acquisition, font-acquisition, design-sync-kit, claude-design-adapter,
  reproduction-router, keystone-emit, validate-audit, client-clean) + `assets/templates/` (canon skeletons,
  DTCG token spine, canon.json, satellites, docs, prototype, design-sync kit, Claude Design adapter, and the
  emitted-gate suite `tools/` — `audit-lint.mjs` (R0–R8) · `source-recover.py` · `fidelity-diff.py` ·
  `scheme-derive.mjs` · `client-deny-lint.mjs`, with `tools/fixtures/` the gates' own clean + seeded acceptance proof).
- `skills/brand-canon-scoper/` — `SKILL.md` + `references/` (`handoff-format.md`, `elicitation-bank.md`,
  `detection-batteries.md`, `process-discipline.md`).
- `README.md` (human front door) · `RESIDENT.md` (this doc — the single durable record) · `CLAUDE.md` (agent ops + guardrails).
- **Docs del ciclo v5/v6 (raíz, desde 2026-07-04):** `brand-system-skills-v5-analysis_2026-07-04.md` (análisis del stress-test v4, CONGELADO — requisitos/evidencia por ID) · `PLAN-V5.md` (plan de ejecución canónico v5) · `PLAN-V6.md` (preliminar, gated a F0).
- `dev/` — build provenance (work-log + v2 specs + `v2-backlog.md`, F-001…F-026); **gitignored, local-only, not shipped**.
- The v3 root docs (`v3-execution-plan.md`, `v3-research-foundation.md`, `v3-system-audit—2026-06-23.md`) were
  removed in the v4 consolidation, and the v4 roadmap (`v4-roadmap.md`) was retired at the v4 ship; their
  operating record lives in the closed-PR + git history. Historical mentions in `## v3` / `## Change log` below
  are append-only record, superseded by this note.

## Integrations / ritual
- **web-stack-skills** = downstream consumer. Its `astro-css-tokens` skill ingests the DTCG `tokens/` spine
  (3-file, OKLCH-string `$value`, plain-string values, `{tier.cat.name}` aliases, namespace-aligned category
  names). Validate "does a canon project cleanly into web-stack-skills?" whenever the token contract changes.
  **⚠️ FLAGGED 2026-07-04 (ronda pre-plan v6, verified):** esta descripción está STALE o el hop lleva roto desde C-1 — el spine emite `$value` estructurado, no OKLCH-string; web-stack-skills no está clonado local y el veredicto quedó pendiente en PLAN-V6 F0-02. No citar este contrato como vigente hasta ese veredicto.
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
| **v3 audit ledger CLOSED (#29) — last leak + tail** — F45: the §7b regulated trigger's SKILL summary drops the closed `health/finance/legal` enum for the OPEN class ("`regulatory:` non-empty OR a detected high-stakes domain") — the last determinism leak gone. F30: the kit shape is now a CARRIED datum — handoff `existing-component-stack:<storybook+playwright\|other\|none>` read at Stage 8 — discharging the lone "single sufficient interface" counterexample. F32: the radius namespace is unified by a GENERAL spine rule (a single-value category projects a bare `--<prefix>` singleton, a multi-value one `--<prefix>-<name>`) so the kit's `--radius` is conformant with no churn. Plus the MINOR/NIT tail (F33/F35/F46/F48/F39/F40/F41 + CREATE-treatment + coverage rows + projections enum + barrel regex). | both audit reports must read as closed baselines; the rector's last hardcoded floor had to go; a carried shape-fact closes the single-sufficient-interface gap | 2026-06-23 |
| **Ciclo v5/v6:** v4 testeada con stress blind de 5 marcas; v5 repara lo PROBADO, v6 construye lo NO-testeado; cada versión cierra con stress-test propio | atribución limpia sobre el pin `65932bb` (superficie de código); el criterio de reparto vive en análisis §16e | 2026-07-04 |
| Docs del ciclo (análisis + PLAN-V5 + PLAN-V6) en la RAÍZ de `main`; subida vía branch `claude/<nombre>` → PR → OK del operador | una sola fuente navegable con el repo; E-O1 intacto (cero push sin OK) | 2026-07-04 |
| Repos de marca del test: LOCALES por siempre, cero push; golden set = `essential-brand` local; handoffs originales NO se reconstruyen — fixtures sintéticos en formato v5 (PLAN-V5 E1-02) | fixtures del eval, no entregables públicos; los chats fuente del handoff ya no existen | 2026-07-04 |
| RESIDENT se actualiza por GATE/ETAPA del ciclo, jamás por sesión; recap del ciclo aquí, detalle en los planes | log por sesión = ruido; anti-drift: un dato, un doc | 2026-07-04 |
| Resolver Module NO se adopta (condición de reapertura escrita en PLAN-V6); OI-J = horizonte post-v6 gated en demanda real | un mecanismo probado (scheme-derive+R7) no se reemplaza sin falla ni consumidor que lo exija | 2026-07-04 |

## Open Items
| ID | Item | Severity | Status |
|---|---|---|---|
| OI-A | No downstream consumer yet ingests motion/depth tokens (web-stack `astro-css-tokens` reads neither). A future bridge skill could. | NICE | OPEN |
| OI-B | web-stack-skills cites no `G-*`/`ALGO-*` rule IDs today; enforceable canon downstream would need rule-ID citations there or carried as token metadata. | NICE | OPEN |
| OI-D | Literal Stage 2 (read-only) / Stage 6 (fill) §3 re-split deferred; the folded Stage 2 carries read+fill today. Revisit only if the PR-B1 spine is reopened. | NICE | OPEN |
| OI-E | Keystone `.md` RAG trip-point → RESUELTO como parámetro (2026-07-04, análisis §15 R-08): sigue sin número oficial (cualitativo "approaches the context window limit", 10x); envelope comunitario ~13 archivos/2% (un reporte). Presupuesto NS-G fijado: SET de pocos archivos, ≪ context window, attachment-tolerant — se aplica en PLAN-V5 E2-05/06 con regla de frescura. | MAJOR | RESUELTO-parametrizado (2026-07-04) |
| OI-F | Second validation brand → SUPERSEDED (2026-07-04): la validación corrió como stress-test blind e2e de 5 marcas de formas distintas — más que el segundo brand previsto. | MAJOR | SUPERSEDED (stress-test v4) |
| OI-G | Graceful-degradation path for the scoper's living-questions doc when the chat env lacks a connector/filesystem. | NICE | RESOLVED (#13 scoper v3 — Stage 6: commit-where-possible, else a downloadable artifact) |
| OI-H | Resolver-based theming → CERRADO por decisión (2026-07-04): resolver NO se adopta (scheme-derive+R7 probado; P-J-01); la migración de formato `.tokens.json` es PLAN-V6 F1; condición de reapertura escrita en PLAN-V6. Paisaje: DTCG 2025.10 estable + SD v5 liberado (análisis §15 R-09). | NICE | CERRADO por decisión (2026-07-04) |
| OI-J | **Non-visual-primary build-grade reproduction** (sonic / motion) is a tracked HORIZON, explicitly NOT a blocker: the reasoning layers are already medium-agnostic and a non-visual primary carrier resolves to a declared fidelity-blocking GAP today (honest scoping, #26). Producing build-grade output for a motion signature (timing/easing + frame-diff) or a sonic mark is a NEW capability MILESTONE, post-Phase-5. | NICE | OPEN (horizonte post-v6 — decisión 2026-07-04, gated en demanda real de marca no-visual-primaria) |
| OI-I | v3 audits (#19: 4 BLOCKER · 22 MAJOR · 24 MINOR · 6 NIT; #25 system) — **FULLY REMEDIATED (#29)** across PRs #20–#29 (detalle por PR en `## Change log`). Únicos no-cerrados, deliberados: **F55** (bold-density, ver *Documented deviations*) · **F31** (`motion:` prose token; consumidor = horizonte OI-A) · **OI-J**. Reports removidos en la consolidación v4; registro en closed-PR history — baselines CERRADOS, no trabajo abierto. | — | RESOLVED (#29) |

(OI-C — end-to-end run on a real brownfield pilot — RESOLVED: it surfaced the v2 reframe + F-001…F-026, all shipped. See `## v2`.)

**Documented deviations (deliberate, not defects).** *F55 (bold density):* the SKILLs keep ~100 `**bold**`
rule-anchors against md-house-style's "drop bold" — a defensible practitioner choice (bold marks scannable
rule-anchors in long procedural docs); kept intentionally. *F31 (motion line):* the handoff carries `motion:`
as a single prose token for the common not-used default; richer motion carriage rides the OI-A motion-token
bridge horizon.

## Roadmap — horizontes (reconciliado 2026-07-04 contra el ciclo v5/v6)

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

## v2 — lineage (historical)
The first real brownfield pilot proved v1 shipped a **hollow skeleton** (rule-compliant but asset-less, called
done). v2's shipped reframe: **analyze published brand work across mediums → extract the real assets → emit a
real prototype + a `/design-sync`-ready component library** by default; the four-layer canon is the *skeleton*,
never the deliverable (scratch only on explicit instruction). Method in `skills/*` (`F-001…F-026` closed); the
design→Chat / filesystem-git→Code split is normal flow.

> **`/design-sync` caveat (still binding).** The converter contract is server-side/version-fluid (re-read live
> via `get_claude_design_prompt`); the builder re-pins at run time, so treat pinned field/script names as fluid,
> not frozen. Step-0 re-pin procedure in `design-sync-kit.md`.

## v3 — provenance, anti-determinism, and a brand an AI can be
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

## v4 — builder validation architecture + token engine + review surface (Stages A–G)
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

## Change log
- 2026-07-04 — **Ciclo v4→v5: stress-test + planeación cerrada; RESIDENT al modelo de ciclo.** v0.4.0 @ `65932bb` sometida a stress-test blind e2e de 5 marcas (la validación Phase-5, ejecutada más grande): disposición Essential = golden set local, resto = failure gallery local. En la raíz del repo: análisis maestro CONGELADO (`brand-system-skills-v5-analysis_2026-07-04.md`) + PLAN-V5 (aprobado, E0–E4) + PLAN-V6 (preliminar, F0–F5); rondas de análisis pre-plan v5/v6 corridas en Code. Este RESIDENT: secciones nuevas (`## Cómo retomar` · `## Ciclo vigente` con recap + log por gate), Roadmap reconciliado (absorbidos-por-el-ciclo mapeados a su home, horizontes intactos), OI-E/OI-F/OI-H/OI-J re-baselineados, flag del hop web-stack (stale-o-roto, veredicto en F0-02), golden set re-fijado (Essential; pin Heresto conservado como registro), decisiones de ciclo añadidas. Historia v2/v3/v4 INTACTA.
- 2026-06-24 — **v4 shipped — plugin 0.3.0→0.4.0** (23 mechanisms / 7 stages A–G; executable gates audit-lint R0–R8 + measured fidelity + scheme materializer + client deny-lint; scoper client-flow + EH/process self-checks). Mechanism-complete + unit-validated; end-to-end golden-set v4 verdict-capture deferred to Phase-5 (R9 + live red-team RUN + 2nd validation brand).
- 2026-06-23 — **Post-v3 roadmap captured (#30, doc-only).** Added `## Roadmap — post-v3 horizons` (durable direction, separate from the closed ledger/OI-I): confidence & evidence (golden-set harness first), reduce-prompt-dependence (mechanize prose invariants), fidelity frontier (modern source extraction), two new skills (B canon-evolution before A genesis), the handoff-as-formal-interface enabler, the rector standing guards, and an explicit anti-roadmap. No skill/template/pipeline touched.
- 2026-06-23 — **Audit ledger CLOSED (#29).** Cleared the LAST determinism leak (F45 — regulated trigger open-classed, no more `health/finance/legal` floor) + the full MINOR/NIT tail: F30 (`existing-component-stack:` carrier → kit shape carried) · F32 (radius singleton spine rule) · F33 (Stage-2/6 chatter) · F35 (pinned codes framed illustrative, conceptual invariant hoisted) · F46 (named zero-tolerance, auditable) · F48 (sublabel unified) · F39 (font-provenance content-audit check) · F40 (SVG-clip sanity check) · F41 (traced-vs-synth limit noted) · CREATE-mode treatment classification · coverage rows 3-5 count/form-neutral · projections open enum · barrel regex robust. Coverage-gap pass: research-foundation (structured-color skim discharged by the frozen status-marker — no body edit; the F34 feTurbulence caveat mirrored at L59), data-map/projections, client-doc templates — clean. OI-I re-baselined to CLOSED; the #19 report lives on the open `v3/audit` branch (not main root), the #25 report at main root — both closed baselines. **Repo: zero BLOCKER/MAJOR/MINOR/NIT** except F55 (deliberate bold-density deviation) + OI-J (sonic/motion horizon). Only the Phase-5 validation run remains.
- 2026-06-23 — **Scoper client instrument + medium-agnostic intake (#28).** Instantiated the §6 external client instrument with a worked jargon-free Mexican-Spanish example (generic placeholder brand; design terms glossed inline; one Found/Missing/To-confirm line) — closes **F10, the lone surviving #19 MAJOR**. Generalized the §3 intake fidelity rubric to a capability class (non-visual sonic/motion/verbal primary carrier rated at intake — F38). Structure hygiene: H4 `4a`/`4b` → H3, top-of-file reference-load block (F47); trimmed the frontmatter description for headroom, no trigger lost (F52); fixed the posture confidence short-circuit — in-session = `corroborated`, promoted to `owner-confirmed` only at gate-6 (F54). **Repo now carries ZERO BLOCKER and ZERO MAJOR.** F55 (bold density) deliberately deferred as a defensible practitioner deviation. Only a MINOR/NIT tail + the coverage-gap pass remain (PR-8).
- 2026-06-23 — **Client-drift + repo hygiene (#27).** Killed the `.gitignore` real-brand-name leak (M2 — a rector violation; pattern generalized, 0-brand-name grep now EMPTY tree-wide); added the mandated `Provenance` origin-tag column to the client RESIDENT gaps template (M3); single-sourced `conventions.md` to the kit (deleted the drifted adapter-dir duplicate, fixed the §Shape pointer) and surfaced the mandatory keystone + prototype + library in every deliverable map that omitted it — the inherited client README (a new Deliverables block), the builder SKILL "What it produces", and the tool README builder row (M4); glossed DTCG/OKLCH in the inherited README + added glossary pointers in client CLAUDE/RESIDENT (jargon MINOR). Structured-color MINOR discharged by the frozen doc's existing status marker (no body edit, artifact preserved). Closes system-audit M2/M3/M4 + jargon MINOR.
- 2026-06-23 — **Honest medium scoping + keystone-orphan close (#26).** Every layer that assumed a visual `mark` now resolves the brand's primary-identity carrier from the DIMENSION MAP (open class — visual mark \| sonic-mark \| motion-signature \| other); an unsupported medium → a DECLARED fidelity-blocking GAP (tracked horizon OI-J), never a false-fail nor a silent pass; §7b operability made explicitly distinct from build-grade fidelity. The keystone now consumes Personality/Differential/Resonance (orphan closed). Co-located: posture `profile:` open-classed, F34 filter literal flagged illustrative, type-pairing collapse, ingest-css invariant stated. Closes system-audit B1/B2 (BLOCKER) + M1/M5/M6 (MAJOR) + 4 co-located MINOR/NIT; sonic/motion build-grade tracked as OI-J (post-Phase-5).
- 2026-06-23 — **v3 system audit produced (#25).** Full repo + functional-pipeline reassessment vs current main; see `v3-system-audit—2026-06-23.md` (root, audit-only). Verdict QUALIFIED YES on the visual default path (all five #19 BLOCKERs dead); 2 BLOCKER scoped to the medium-agnostic / sonic-motion shape · 6 MAJOR · 10 MINOR · 4 NIT. Open Items to be re-baselined from its ledger in the next fix-pass.
- 2026-06-23 — **Theme 6 public surface + docs sync + the pulled-forward Theme-5 F16 (#24).** Both manifests carry the mandatory keystone + ANALYZE/CREATE framing + v0.3.0 (dropped "greenfield/brownfield"); README notes the `/design-sync` contract is server-side/version-fluid; coverage table reframed to an illustrative floor (`expected-unless-not-used`); build-tracking tokens (PR-B*/F-0NN/D-B*/OI-*/GATE-2/Dn) + stale forward-pointers stripped from shipped prose; `v3-execution-plan.md` resynced to Phase 5. **ZERO BLOCKER after**; F10 the sole open MAJOR. F16/F20/F21/F22/F23/F24/F26/F50/F56 closed.
- 2026-06-23 — **Theme 3/4 provenance spine + keystone operability (#23).** Provenance into the token spine (`$extensions.brand.provenance` on every token; `authored\|derived` orthogonal to the confidence ladder); keystone confidence vocab made byte-identical (`confirmed`→`owner-confirmed`, ladder shown); §7b gains a FORM-OF-RULE content check (operability, not shape) + DESIGN-as sources named; §7a/§7b leave persisted evidence (`audit/fidelity/` + `audit/redteam/`, absence = FAIL; live run = Phase 5). F14/F15/F17/F18/F19/F37 closed.
- 2026-06-23 — **Theme 2 install integrity (#21).** Killed the `dev/v2-build-spec.md` dangle (12 cites repointed; Stage-8 re-pin reconstructed into `design-sync-kit.md`); `.design-sync` single-sourced; `canon.json` `$schema` neutralized; real offline `package-validate.mjs` shipped; license→GAP rule distinct from the SPDX axis. F2/F12/F13/F25 closed.
- 2026-06-22 — **Theme 1 seam fix (#20)** after the transversal audit (`v3-audit—2026-06-22.md`; QUALIFIED NO, 4 BLOCKER · 22 MAJOR · 24 MINOR · 6 NIT). The handoff made the single sufficient interface (two-track manifest · voice/value + geometry/license carriers · 3 orphans wired into Stage 0 with a live DIMENSION-MAP STOP · SPDX license). F1/F3-F9/F11/F28/F29/F49 closed.
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
volatile state as permanent. Actualización: por GATE/ETAPA del ciclo (Code) — recap + log del ciclo + decisiones; jamás por sesión (el detalle de sesión vive en el Session log del plan vigente). Ediciones fuera de gate = grado corrección, con entrada de change log.
