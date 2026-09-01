---
name: brand-system-skills-resident
title: brand-system-skills — RESIDENT
description: "Living resident doc for brand-system-skills — a Claude Code plugin marketplace whose skills
  build a generic, brand-agnostic, output-agnostic brand canon (four layers + DTCG/OKLCH token spine) for
  any brand. Use when any session touches this repo, its skills, the canon template, the token interchange
  contract, its relationship to web-stack-skills, or the v4→v5/v6 build cycle. Canonical at the source;
  any mirror is read-only."
last_updated: 2026-09-01
status: vigente
supersede: ninguno
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
- **Estado vigente (v6 SHIPPED — plugin `0.6.0`, mergeado a `main` @ `9db1d4f`, PR #76 con OK explícito del operador):** el ciclo v2→v6 completo (motor analyze→extract→prototype+library, provenance/anti-determinismo, gates ejecutables, verdad-máquina, superficies gobernadas, costura de compilación, los dos modos, kit offline, mirror Drive) está construido y mergeado. La historia completa de cada versión, sus 49 decisiones y el change log viven en `BITACORA.md` (`estandar.md §2`) — este doc solo carga lo que sigue siendo verdad hoy. Ver `## Rumbo` para lo que falta.

## Cómo retomar (toda sesión del ciclo)

Leer EN ORDEN: este `RESIDENT.md` → `CLAUDE.md` → `brand-system-skills-v5-analysis_2026-07-04.md` (el "análisis") → el PLAN de la versión en curso (`PLAN-V5.md` / `PLAN-V6.md`). Con eso la sesión queda up-to-date: contexto, avance, decisiones, lo que falta. El detalle de diseño/verify por etapa del ciclo vive en `notes/` (índice en `notes/README.md`) — provenance, no docs vivos. Mantenimiento de este doc: Code lo actualiza al cierre de cada GATE/ETAPA del ciclo (recap + log + decisiones) — JAMÁS por sesión; el detalle por sesión vive en el Session log del plan. `CLAUDE.md` carga lo puntual de arquitectura/código/gotchas y lo mantiene Code cuando haga falta.

## Ciclo vigente — v4 testeada → v5/v6 (recap; el detalle SIEMPRE se resuelve por ID en los docs de raíz)

- **Qué pasó:** v0.4.0 @ `65932bb` sometida a stress-test blind e2e de 5 marcas de clases distintas (visual · regulated · phantom · flat/foundry · sonic), cada una con self-analysis + harness. Los hallazgos, con ID estable, viven en el análisis (§1–§11 problemas · §12 wins W-1…W-14 · §13 rectores NS-A…NS-H · §14 directrices N1–N11+T1–T3 · §15 research con fuentes · §16 arquitectura de los dos workflows: creación de plan vs ejecución — chat home base, Code brazo, retornos destilados).
- **PLAN-V5.md (canónico, aprobado):** E0 congelar gallery → E1 verdad-máquina (contrato único E1-02: enum 5 rungs + fixtures sintéticos de handoff; gates ejecutables o demovidos; NS-B custodia; fidelity obligatoria con rama sin-fuente; NS-C) → E2 superficies (manifest, vocabulario sancionado, asset-index N5, R8 invertido, keystone visual N4 + regla imagery N7, N2, self-audit N1) → E3 scoper (máquina de estados 4-estados con frame generado, proxy/multi-decider, N11, curator-wall ESCRITO, POSTURE derivado) → E4 cierre + stress-tests por mecanismo. Wins-regression W-1…W-14 en cada gate. ≈30–35 sesiones.
- **PLAN-V6.md (PRELIMINAR, gated a F0 post stress-test v5):** F0 re-verificación + veredicto hop web-stack → F1 migración `.tokens.json` + hop → F2 CREATE completado + T2 EXTEND/RECOMMEND → F3 F4-emitter (kit capability) → F4 mirror Drive (GitHub Action + sha256) → F5 cierre. Fuera con condición escrita: resolver Module · OI-J.
- **Decisiones de ciclo (2026-07-04):** todo LOCAL — cero push de repos de marca; handoffs originales del test no existen y NO se reconstruyen (fixtures sintéticos v5); los 5 blind-test reports = archivo forense FUERA del workflow; los 3 docs del ciclo a la raíz de main; pin `65932bb` = baseline sobre la superficie de CÓDIGO (commits doc-only no lo invalidan).

El detalle gate-por-gate (F0–F6, E0–E4) que antes vivía aquí como «Log del ciclo» se mudó a `BITACORA.md`, como entradas tipo sesión — una por gate, con su fecha original.

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
  token-spine, analyze, create, asset-acquisition, font-acquisition, design-sync-kit, drive-mirror,
  claude-design-adapter, reproduction-router, keystone-emit, validate-audit, client-clean) + `assets/templates/`
  (canon skeletons, DTCG token spine, canon.json, satellites, docs, prototype, design-sync kit, Claude Design
  adapter, `.github/` (the opt-in Drive-mirror Action + `DRIVE-MIRROR.md`), and the emitted-gate suite `tools/` —
  `run-gates.mjs` (suite runner + status board) · `audit-lint.mjs` (R0–R8) · `wire-check.mjs` (wire verbatim) ·
  `tokens-project.mjs` (string projection) · `emit-cards.mjs` (offline @dsCard cards) · `drive-mirror.mjs` (Drive
  mirror engine) · `scheme-derive.mjs` · `client-deny-lint.mjs` · `source-recover.py` · `fidelity-diff.py`, with
  `tools/fixtures/` the gates' own clean + seeded acceptance proof + `fixtures/integration/` the v6 cross-mechanism harness).
- `skills/brand-canon-scoper/` — `SKILL.md` + `references/` (`handoff-format.md`, `elicitation-machine.md`,
  `multi-decider-proxy.md`, `process-discipline.md`, `elicitation-bank.md`, `detection-batteries.md`).
- `README.md` (human front door) · `RESIDENT.md` (this doc — the single durable record) · `CLAUDE.md` (agent ops + guardrails).
- **Docs del ciclo v5/v6 (raíz):** `brand-system-skills-v5-analysis_2026-07-04.md` (análisis del stress-test v4, CONGELADO — requisitos/evidencia por ID) · `PLAN-V5.md` (plan v5, cerrado) · `PLAN-V6.md` (plan v6, F0–F6). Design/verify notes por etapa en `notes/` (índice `notes/README.md`).
- `dev/` — build provenance (work-log + v2 specs + `v2-backlog.md`, F-001…F-026); **gitignored, local-only, not shipped**.
- The v3 root docs (`v3-execution-plan.md`, `v3-research-foundation.md`, `v3-system-audit—2026-06-23.md`) were
  removed in the v4 consolidation, and the v4 roadmap (`v4-roadmap.md`) was retired at the v4 ship; their
  operating record lives in the closed-PR + git history. Historical mentions in `## v3` / `## Change log` below
  are append-only record, superseded by this note.

## Integrations / ritual
- **web-stack-skills** = downstream consumer, via the DERIVED string projection (contrato vigente desde v6 F1-02;
  el flag 2026-07-04 quedó resuelto con el veredicto F0-02 — el hop estaba ROTO desde C-1, no solo stale).
  **El hop real:** spine estructurado (`tokens/*.tokens.json`, `$value` objeto C-1) → `node tools/tokens-project.mjs`
  → `tokens/web/{base,semantic,component}.json` (plain-string `oklch()` `$value`, hex fallback fuera, values-only,
  custodia con parent hash recomputado) → `astro-css-tokens` (SD v5.4.4, que RECHAZA `$value` objeto — #1398/#1494)
  los compila a `tokens.css`/`theme.css`. E2E verificado 2026-07-16 con el build.mjs verbatim de web-stack sobre el
  clon local. Validate "does a canon project cleanly into web-stack-skills?" whenever the token contract changes.
- **Claude Design** = consumer via `/design-sync`, which needs a COMPILED COMPONENT LIBRARY (dist/Storybook/
  package), not a canon. v2 makes that library a default build output (see `## v2`).
- Both are PROJECTIONS of a brand canon; the canon never names a stack (escape valve = adapters in the
  consumer repo).

## Decisiones — índice

Índice por grupo (ID inicial–ID final, tema). El texto completo de cada una de las 49 (qué se eligió,
por qué, y cuándo) vive en `BITACORA.md`, como entradas tipo `decisión` con su propio ID
(`brand-system-skills-D-NNN`) — este índice solo ubica el grupo, no sustituye la entrada.

- **`D-001`–`D-005`** — arquitectura base — dos skills (builder Code / scoper Chat), OKLCH literal en `$value`, tiering DTCG base/semantic/component, tokens motion/depth sin consumidor aún, GAP-protocol sobre checklist largo.
- **`D-006`–`D-010`** — reframe v2 — analyze-primero (scratch solo con instrucción explícita), adquisición de assets+fuentes real y bloqueante, librería compilada por default, intake medium-agnostic (slots definen lo NECESARIO, discovery lo que EXISTE).
- **`D-011`–`D-014`** — v2 builder — `/design-sync` ingiere `dist/` compilado (no fuente), la librería compilada es el gap del ecosistema que el builder llena, adquisición de assets source-agnostic, pin Style Dictionary v5 + DTCG draft 2025.10.
- **`D-015`–`D-020`** — v3 rectoral — anti-determinismo gobierna todo el skillset, north star "a brand an AI can be" (keystone obligatorio), spine de provenance en cada dato, stated-spec-read (la fuente declarada manda sobre metadata de herramienta), reproduction router por tratamiento, guardrail layer posture-parameterizado por ENCIMA de la personalidad.
- **`D-021`–`D-026`** — v3 continuado — horizontes por detección adaptativa (no checklist fijo), salida de dos superficies (rigor interno vs cliente), `v0/DEMO` con OPTIONAL=YES por default salvo assets identity-load-bearing, esquemas de color derivados en OKLCH, keystone de 6 secciones, keystone con orden de recall (datos primero, guardrails al final).
- **`D-027`–`D-030`** — v3 presupuestos y gates — tamaño del keystone como parámetro calibrable (no número fijo), target de tokens DTCG 2025.10 con `$value` string OKLCH, gate de fidelity por visual-diff medido (no pixel-VRT ni veredicto a mano), el handoff como interfaz única suficiente Chat→Code.
- **`D-031`–`D-036`** — remediación v3 Theme 2–5 — integridad de instalación (cero rutas no-shippeadas), provenance dentro de los tokens emitidos, escalera de confianza byte-idéntica en cada hop, el gate del keystone audita OPERABILIDAD (no solo forma), evidencia persistida de los gates de fidelity/keystone, cobertura como piso ilustrativo — nunca universo cerrado.
- **`D-037`–`D-044`** — remediación v3 Theme 6 + cierre de ledger — superficie pública honesta y vigente, tokens de tracking interno retirados de la prosa shippeada, plan de ejecución re-sincronizado a Fase 5, scoping honesto de medio (carrier abierto, no solo visual), el keystone consume las WHY personality carriers, instrumento cliente del scoper instanciado con ejemplo real, hygiene de repo + anti-drift de nombre de marca, ledger de auditoría CERRADO (cero BLOCKER/MAJOR/MINOR/NIT salvo desviaciones deliberadas).
- **`D-045`–`D-049`** — decisiones del ciclo v5/v6 — v5 repara lo YA probado y v6 construye lo NO-testeado, docs del ciclo en la raíz de `main` vía branch→PR→OK, repos de marca del test siempre LOCALES (cero push), el RESIDENT se actualiza por gate/etapa —jamás por sesión—, el Resolver Module de DTCG NO se adopta.

## Open Items
Solo lo que sigue abierto hoy. Lo cerrado/superseded (OI-C · OI-E · OI-F · OI-G · OI-H · OI-I · OI-K)
se mudó a `BITACORA.md` como entradas tipo `dictamen`, con su fecha de cierre.

| ID | Item | Severity | Status |
|---|---|---|---|
| OI-A | No downstream consumer yet ingests motion/depth tokens (web-stack `astro-css-tokens` reads neither). A future bridge skill could. | NICE | OPEN |
| OI-B | web-stack-skills cites no `G-*`/`ALGO-*` rule IDs today; enforceable canon downstream would need rule-ID citations there or carried as token metadata. | NICE | OPEN |
| OI-D | Literal Stage 2 (read-only) / Stage 6 (fill) §3 re-split deferred; the folded Stage 2 carries read+fill today. Revisit only if the PR-B1 spine is reopened. | NICE | OPEN |
| OI-J | **Non-visual-primary build-grade reproduction** (sonic / motion) is a tracked HORIZON, explicitly NOT a blocker: the reasoning layers are already medium-agnostic and a non-visual primary carrier resolves to a declared fidelity-blocking GAP today (honest scoping, #26). Producing build-grade output for a motion signature (timing/easing + frame-diff) or a sonic mark is a NEW capability MILESTONE, post-Phase-5. | NICE | OPEN (horizonte post-v6 — decisión 2026-07-04, gated en demanda real de marca no-visual-primaria) |
| OI-L | **`source-recover.py` re-run clobbers producer custody entries** — NOMBRADO por el verify de integración F6-01 (P-J-01: hueco real revelado se nombra, no se tapa sin adjudicación). `source-recover.py` construye un `{recovered:[…]}` fresco y `json.dump` SOBRESCRIBE el MANIFEST — nunca lo lee (no hay `json.load`), así que re-correrlo DESPUÉS de un productor Stage-8 (emit-cards/tokens-project) tira las filas `entries` de esos productores. PRE-EXISTENTE (no lo introdujo el fix F6-01 del dual-key). **Mitigado por orden de pipeline** (source-recover = Stage 3, ANTES de los productores Stage 8; los productores re-agregan sus filas en cualquier re-corrida Stage-8/10) → no muerde en el flujo normal. Fix recomendado: plegar `source-recover.py` al MISMO contrato union-preserving que ya tienen los dos productores JS (leer el MANIFEST existente, filtrar solo lo propio, unir, escribir). Candidato F6-03 o backlog — lo adjudica el home base. | MINOR | OPEN (candidato F6-03 — NOMBRADO 2026-07-18, mitigado por orden de pipeline) |
| OI-M | **Golden `essential-brand @ 8b78dba` PERDIDO — v6 cerró sin fixture de regresión end-to-end sobre marca real.** Registrado 2026-08-13 en la verificación pre-merge del PR #76: el golden era LOCAL (E-O1, nunca al repo) y no se localizó en el disco del operador (buscado: `~` WSL · `/mnt/c/Users/USER/{Downloads,Documents,Desktop,OneDrive,verify-forensics}` · `/mnt/d`); ninguna nota registra su RUTA — la lección operativa: un pin sin ruta registrada no es un fixture recuperable. La suite de 52 checks cubre los mecanismos POR SEPARADO (fixtures sintéticos + harness de integración); NO cubre el flujo completo builder→gates contra una marca real. Se salda construyendo un golden NUEVO en la siguiente validación de marca — no antes de que v0.6.0 se instale en trabajo real; al construirlo, registrar aquí su ruta local y su pin. | SHOULD | OPEN (registrado 2026-08-13) |

**Documented deviations (deliberate, not defects).** *F55 (bold density):* the SKILLs keep ~100 `**bold**`
rule-anchors against md-house-style's "drop bold" — a defensible practitioner choice (bold marks scannable
rule-anchors in long procedural docs); kept intentionally. *F31 (motion line):* the handoff carries `motion:`
as a single prose token for the common not-used default; richer motion carriage rides the OI-A motion-token
bridge horizon.

## Rumbo

**Objetivo vigente:** v6 mergeado a `main` (`0.6.0`, PR #76) — falta cerrar la validación real: el
stress-test v6 end-to-end no ha corrido y el golden `essential-brand @ 8b78dba` está perdido (`OI-M`),
así que hoy el repo no tiene regresión e2e sobre marca real.

**Lo que sigue** (el tablero vivo es `gh issue list`; esto es solo el índice):

- Cuenta/API key de Firecrawl para el fallback anti-bot del builder (#85, bloqueado en Carlos).

**Despensa** (mencionado, no comprometido):

- Stress-test v6 completo + golden set nuevo que reemplace `essential-brand @ 8b78dba` (perdido, `OI-M`)
  — condición: instalar `0.6.0` en trabajo real primero; sin issue abierto aún.
- Skill B (canon evolution / change management) antes que Skill A (genesis) — gate ya cumplido
  (contrato E1-02 estable); sigue sin cliente real que lo empuje.
- Build-grade no-visual (sonic/motion), `OI-J` — gated en demanda real de una marca no-visual-primaria.
- Modern source extraction (Figma Variables, Tokens Studio clean export) — el cuello de la fidelity es
  el input; mayor ROI de los horizontes.
- Anti-roadmap explícito (no tocar sin ≥1 cliente real manteniendo un canon vivo): Figma bidireccional,
  Tokens Studio bridge, agent-based drift detection, 3D/spatial, motion systems, sub-brand inheritance.
  Resolver Module DTCG: no adoptado (decisión `brand-system-skills-D-049`).
- "Brand OS / hosted / enterprise platform" — decisión de NEGOCIO de Argos (su propio stack + ICP),
  no objetivo de este repo; la frontera queda marcada aquí a propósito.

## Conventions of this doc
Timeless content undated; Open Items y `## Rumbo` son lo único dado/volátil. Nada externo debe citar el
estado volátil como permanente. Actualización: por GATE/ETAPA del ciclo (Code) — recap + decisiones;
jamás por sesión (el detalle de sesión vive en `BITACORA.md`). La narrativa histórica (v2…v6, dead-ends,
change log, log del ciclo) y la tabla completa de decisiones se mudaron a `BITACORA.md`
(`estandar.md §2`, mudanza de contenido de la base v2 — ver esa fecha en `BITACORA.md`) — este doc
quedó solo con lo atemporal.
