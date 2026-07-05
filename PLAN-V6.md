---
name: plan-v6
description: Plan de ejecución PRELIMINAR para construir brand-system-skills v6 sobre la fundación v5 (v0.5.0). Se finaliza en F0 (post stress-test v5); hasta entonces toda proyección post-v5 es inferring contra PLAN-V5.md, no contra un build real. Se lee al abrir toda sesión v6, se reescribe al cierre, carga Session log propio. Deriva del análisis (brand-system-skills-v5-analysis_2026-07-04.md) y de la ronda pre-plan v6 (2026-07-04), referenciados por ID. Use al ejecutar cualquier item v6 o al finalizar este plan en F0.
last_updated: 2026-07-04
applies_to: ccediland/brand-system-skills — baseline v0.5.0 (proyectada) → target v0.6.0
status: PRELIMINAR (tallado y aprobado en chat 2026-07-04, F0–F5) — se convierte en definitivo al cierre de F0
etapa_vigente: gated — no arranca hasta disposición del stress-test v5 (PLAN-V5 E4)
next_action: (al abrir el ciclo v6) F0-01 ronda de re-verificación en Code
---

# PLAN v6 — brand-system-skills (PRELIMINAR)

> Criterio de la versión (análisis §16e): v6 CONSTRUYE lo no-testeado sobre la fundación que v5 probó. Fuente de requisitos y evidencia: el análisis, por ID; insumo adicional: retorno de la ronda pre-plan v6 (2026-07-04, chat) — superficie no-leída verificada + proyección post-v5. Workflow idéntico a v5 (análisis §16): chat home base, Code brazo de ejecución/análisis, retornos destilados, análisis en cualquier punto puede modificar este plan.

## Reglas de operación

- Las mismas de PLAN-V5.md §Reglas (referencia por ID · 1 item ≈ 1 sesión · fixtures dentro del gate · frescura · análisis permanente · wins-regression por etapa · branches `claude/v6-f<N>`, PR + OK por etapa, E-O1).
- Regla preliminar: TODO lo marcado (proyección) es inferring contra PLAN-V5.md; F0 lo convierte en verified o lo corrige. Ningún item F1+ arranca antes del cierre de F0.
- Pin v6: la baseline es el commit de disposición de v5 (se fija en F0); el golden set y la gallery v5 son la regresión permanente.

## Decisiones tomadas (2026-07-04)

- Resolver Module (DTCG): NO en v6 — reemplazaría scheme-derive+R7, mecanismo probado, sin falla ni consumidor que lo exija (P-J-01). Condición de reapertura: un consumidor real que lo pida.
- OI-J build-grade (sonic/motion): FUERA de v6 — horizonte post-v6, gated en demanda real de una marca no-visual-primaria (el anti-roadmap ya lo marca).
- F4 emitter = capability del KIT, no entregable propio (el kit ya es dueño de cards, package-validate y el arnés e2e).
- Mirror Drive = GitHub Action al push (git = fuente de verdad del sync), creds vía Infisical; NO Apps Script.
- Pendientes del operador (se deciden al llegar a su etapa): perfil de la marca CREATE del stress-test (sugerencia: venture real propio sin material de marca, para ratificación real) · cuenta y estructura de folders Drive (F4-01).

## Dependencias v6 ← v5 (de la ronda pre-plan)

T2 ← E1-02 (representación proposed en el contrato) + E3-01 (curator-wall escrito, 4º estado) · CREATE-test ← E1-04 (rama sin-fuente) · F4 ← E1-09 (arnés e2e) + E0-01 (workaround de Onyx congelado) · mirror ← E2-03 (asset-index) + E1-05 (custodia) · migración ← gate E1 (golden set congelado en formato actual primero).

## F0 — Re-verificación (convierte este plan en definitivo)

| Item | Contenido → entregable | Esf. |
|---|---|---|
| F0-01 | Ronda corta en Code: la proyección FASE B contra el repo v0.5.0 REAL — por área A1–A6 confirmar/ajustar superficie de toque y esfuerzos; absorber los hallazgos del stress-test v5 (análisis §16e: "más lo que arroje") | S–M |
| F0-02 | Clonar `web-stack-skills` a ~/proyectos y veredicto del hop downstream con evidencia: ¿la línea de RESIDENT ("astro-css-tokens ingiere OKLCH-string") está stale, o el hop está roto desde C-1? Define la forma de F1-02 | S |
| F0-03 | Finalizar el PLAN v6: preliminar → definitivo con F0-01/F0-02; re-emisión + entrada de log | S |

Gate F0: proyección validada o corregida + veredicto del hop + plan definitivo.

## F1 — Spine (formato primero: F2/F3 tocan fixtures y templates de tokens — migrar después obligaría doble regen)

| Item | Contenido → entregable | Esf. |
|---|---|---|
| F1-01 | Migración `.tokens.json`: rename + hardcodes mapeados (scheme-derive.mjs:80-81/:117-119; sufijo audit-lint:105/:109), templates, fixtures regen, docs — cierra el deferral declarado en v5 (E1-08) y CONTRA-9. Contexto: migración interna CHICA — el spine ya es 2025.10-shaped y SD no es dependencia de código (ronda v6, verified) | M |
| F1-02 | Hop downstream según veredicto F0-02: reparar el contrato con web-stack-skills (transform del lado canon o fix en web-stack — se decide con el veredicto) + des-stalear RESIDENT §Integrations | S–M |

Gate F1: suite completa verde con la extensión nueva + golden set re-verificado + hop downstream end-to-end (o N/A declarado con evidencia).

## F2 — Modos (CREATE primero, T2 después)

| Item | Contenido → entregable | Esf. |
|---|---|---|
| F2-01 | CREATE completado: seams por-stage en create.md (0 menciones de modo hoy en validate-audit/router/keystone-emit — verified), rama sin-fuente de fidelity CONSUMIDA (definida en v5 E1-04: master autorado = source-of-record, o N/A declarado), doctrina existente intacta (jamás re-elicitar el WHY; GAP del handoff queda GAP) | M |
| F2-02 | T2 EXTEND/RECOMMEND: modo híbrido ANALYZE + propuestas etiquetadas — carrier per-dimension ya en el contrato desde v5 E1-02 (authored + hypothesis + GAP + ratificación-pendiente; CERO bump nuevo del contrato), flujo builder draft-desde-recomendación, loop de ratificación post-primer-feedback; hereda el curator-wall ESCRITO (v5 E3-01) y el 4º estado | M–L |

Gate F2: fixtures sintéticos de modo (handoff CREATE todo-vacío · handoff T2 con dimensiones proposed) pasan la suite completa; la validación viva queda en F5.

## F3 — Kit (paralelizable con F4 tras F1 — superficies disjuntas)

| Item | Contenido → entregable | Esf. |
|---|---|---|
| F3-01 (×2) | F4 emitter offline de static cards como capability del kit: tool HTML estático sin React/network, sobre el arnés e2e de v5 E1-09; prototipo de referencia = workaround de Onyx congelado en E0-01 (untracked hoy — el freeze es prerequisito); fixtures propios; las static cards entran al manifest/deny como superficie cliente | L |
| F3-02 | Re-pin del contrato /design-sync: absorbe `report_validate` / `.render-check.json` (superficie no pinneada detectada en B1) — regla de frescura al implementar | S |

Gate F3: fixture e2e extendido cubre el emitter (build → cards estáticas → package-validate → deny) en verde.

## F4 — Mirror Drive

| Item | Contenido → entregable | Esf. |
|---|---|---|
| F4-01 | GitHub Action al push: upload de binarios SIN conversión + verify `sha256Checksum` contra CHECKSUMS · columna Drive del asset-index (base additiva de v5 E2-03) · doc de operación · creds vía Infisical. Decisión del operador al llegar: cuenta y estructura de folders. Docs-Editors excluidos explícitos (sin checksum — R-14) | M |

Gate F4: round-trip verificado — push → Drive → checksums match en ambos lados.

## F5 — Cierre v6

| Item | Contenido → entregable | Esf. |
|---|---|---|
| F5-01 | Integración + docs del repo (RESIDENT/CLAUDE/README) + version bump → v0.6.0 | M |
| F5-02 | Diseño fino del stress-test v6 (reglas §11 del análisis): corrida CREATE de cero (perfil = decisión del operador) · corrida T2 (marca existente + extensión propuesta) · regresión de la suite v5 COMPLETA (golden set + gallery) | M |
| F5-03+ | Corridas + disposición: veredicto por capability nueva (CREATE / T2 / F4-emitter / mirror / migración — sostuvo o no, con evidencia) + failure gallery v6 | L |

Gate final — disposición de v6; los hallazgos alimentan el ciclo siguiente.

## Wins-regression

La tabla W-1…W-14 de PLAN-V5.md corre ÍNTEGRA en el gate de cada etapa v6, más 3 checks nuevos:

| W+ | Check |
|---|---|
| W-15 | CREATE jamás false-bloqueado por gates sin-fuente (fixture todo-vacío en verde; W-1 extendido a modo) |
| W-16 | Propuestas T2 jamás canonizadas sin ratificación (toda dimensión proposed conserva hypothesis+GAP hasta sign-off) |
| W-17 | Integridad del mirror: checksums match en round-trip; cero conversión a formatos Google-nativos |

## Dimensionamiento (inferring — se recalibra en F0)

F0 ≈ 2–3 sesiones · F1 ≈ 2–3 · F2 ≈ 3–4 · F3 ≈ 3 · F4 ≈ 1–2 · F5 ≈ 3–4 · total ≈ 14–19. ~Mitad de v5, consistente con construir sobre fundación probada.

## Session log

- 2026-07-04 — PLAN v6 PRELIMINAR tallado y aprobado en chat (operador + Claude), etapa por etapa, contra la ronda pre-plan v6 (superficie no-leída A1–A6 verificada + proyección post-v5). Decisiones asentadas: resolver NO, OI-J post-v6, F4 = kit capability, mirror = GitHub Action. Los 4 flags de la ronda que tocaban v5 se movieron a PLAN-V5.md como enmiendas (E1-02 proposed-en-cuarentena, E1-04 rama sin-fuente, E3-01 curator-wall escrito, E1-08 deferral .tokens.json). Candidatos nuevos absorbidos: CONTRA-9 (deferral v5 + cierre F1-01), RESIDENT stale / hop downstream (F0-02/F1-02), superficie report_validate (F3-02). Se finaliza en F0, post stress-test v5.

## Limitations

- PRELIMINAR por diseño (análisis §16b): la proyección post-v5 es inferring contra PLAN-V5.md; F0 la verifica contra el repo real antes de ejecutar F1+.
- No re-narra problemas ni evidencia — resolución por ID contra el análisis y contra PLAN-V5.md.
- Fuera de v6: resolver Module (condición de reapertura escrita), OI-J build-grade (post-v6, gated en demanda real), y todo lo que el stress-test v5 aún no ha dicho.
