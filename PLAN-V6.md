---
name: plan-v6
description: Plan de ejecución DEFINITIVO para construir brand-system-skills v6 sobre la fundación v5 (v0.5.0 @ 9294c961). Se lee al abrir toda sesión v6, se reescribe al cierre de cada sesión, carga Session log propio. Deriva del análisis (brand-system-skills-v5-analysis_2026-07-04.md), de la failure gallery v5 (stress-test-v5/failure-gallery-v5.md, EV1-F01…F15) y de la ronda pre-plan §16b post-gate (F0, 2026-07-16), referenciados por ID. Use al ejecutar cualquier item v6, al decidir secuencia, o al cerrar una etapa.
last_updated: 2026-07-16
applies_to: ccediland/brand-system-skills — baseline v0.5.0 @ 9294c961 → target v0.6.0
status: "DEFINITIVO — F0 cerrada 2026-07-16 (ronda §16b absorbida; preliminar 2026-07-04 superado)"
etapa_vigente: F1
next_action: "F1-01 — migración .tokens.json (line-refs frescos de F0-01a en el item)"
---

# PLAN v6 — brand-system-skills

> Criterio de la versión (análisis §16e): v6 CONSTRUYE lo no-testeado sobre la fundación que v5 probó, MÁS lo que arrojó el stress-test v5. Fuentes de requisitos y evidencia, por ID: el análisis (congelado) · `stress-test-v5/failure-gallery-v5.md` (EV1-F01…F15 + patrones rectores) · veredicto por rector y R-06 (RESIDENT § Log del ciclo, 2026-07-16). Workflow idéntico a v5 (análisis §16): chat home base, Code brazo de ejecución/análisis, retornos destilados, análisis en cualquier punto puede modificar este plan.

## Reglas de operación

- Las mismas de PLAN-V5.md §Reglas (referencia por ID · 1 item ≈ 1 sesión · fixtures dentro del gate · frescura · análisis permanente §16c · wins-regression por etapa · E-O1: cero push de repos de marca y cero forense al repo, por siempre).
- Branches `claude/v6-f<N>`. Régimen A1 (herencia de la enmienda 2026-07-05): push/PR/merge AUTÓNOMOS al cierre de cada etapa con gates en verde; OK explícito del operador solo donde el home base lo instruya (F0: instruido y cumplido · gate final F6: instruido).
- Regla de contrato único v6: TODO cambio al contrato del wire (verbatim-check, provenance por línea, vocabulario de literales) ocurre UNA vez en F2-01; el resto del plan consume ese contrato congelado.
- Pins: baseline v6 = `9294c961` (commit de disposición de v5, superficie de código). Golden set = `essential-brand` LOCAL @ `8b78dba` (re-baseline E3, F0-04). Golden + failure gallery (v4 local + v5 en repo) = regresión permanente.

## Decisiones tomadas

2026-07-04 (preliminar, vigentes):
- Resolver Module (DTCG): NO en v6 — reemplazaría scheme-derive+R7, mecanismo probado, sin falla ni consumidor que lo exija (P-J-01). Condición de reapertura: un consumidor real que lo pida.
- OI-J build-grade (sonic/motion): FUERA de v6 — post-v6, gated en demanda real de una marca no-visual-primaria.
- F4 emitter = capability del KIT, no entregable propio.
- Mirror Drive = GitHub Action al push (git = fuente de verdad), creds vía Infisical; NO Apps Script.

2026-07-16 (ronda §16b / F0):
- Nueva etapa F2 "Costura de compilación" + renumeración (Modos→F3 · Kit→F4 · Mirror→F5 · Cierre→F6). Razón: el mecanismo dominante del gate v5 es inflación en COMPILACIÓN (patrón rector 1) — T2 no monta un wire roto; F1 se queda primero (formato antes de regen de fixtures).
- F1-02 = transform del LADO CANON: la restricción del consumer está anclada a bugs de SD v5 (#1398/#1494), no a diseño propio; "consumers are projections" es principio del propio spine; cero toque al spine = golden/gallery intactos.
- EV1-F05 adjudicado: plantillas-redes ⇒ kit YES. El slot se elicita por DESTINO en términos cliente; la spec carga la tabla destino⇒slot (F2-03); el dossier v6 declara el valor esperado (F6-02).
- F4∥F5 arranca tras F2 (no tras F1): F2-01 regenera fixtures de handoff que el arnés e2e del kit consume.
- Sin cambio (adjudicado en el gate): H1 NO-defecto (consolidación con Accountable disuelve — legítimo; residuo = diseño de dossier, F6-02) · NS-E/NS-H sostuvieron · re-scope de EV1-F02 se respeta (BUILD-MODE/kit exentos del frame; su obligación cristaliza en 7b).
- Pendientes del operador (se deciden al llegar a su etapa): perfil de la marca CREATE del stress-test (sugerencia vigente: venture real propio sin material de marca) · cuenta y estructura de folders Drive (F5-01).

## Dependencias

v6 ← v5: F2-01 ← E1-02 (contrato v5 congelado; bump único v6) + E3-01 (máquina/ledger/curator-wall) · T2 ← E1-02 + E3-01 · CREATE ← E1-04 (rama sin-fuente, ya instruida en run-gates) · F4 ← E1-09 (arnés e2e) + E0-01 (workaround Onyx @ `025cc64`, verificado F0-01d) · mirror ← E2-03 (asset-index) + E1-05 (custodia) · migración ← golden congelado ✓.
Internas v6: F1 → F2 (formato primero) · F2 → F3 (T2 monta el wire reparado) · F2 → F4∥F5 · todo → F6.

## F0 — Re-verificación (CERRADA 2026-07-16)

| Item | Resultado | Estado |
|---|---|---|
| F0-01 | Proyección FASE B verificada contra el repo real: a) migración vigente, line-refs frescos (ver F1-01) · b) CREATE re-scoped: completar downstream, no construir de cero (seams v5 sustanciales existen) · c) /design-sync VIGENTE (pin v2.1.185 sin report_validate/.render-check.json) · d) prerequisito Onyx cumplido (`025cc64`) · e) recalibración absorbida en Dimensionamiento | done |
| F0-02 | Hop downstream ROTO desde C-1 (no solo línea stale): web-stack exige `$value` string (tokens-example.md:7/:15/:81/:84 · SKILL.md:94; SD v5 #1398/#1494); el spine emite objeto estructurado (base.json:7). Clon en `~/proyectos/web-stack-skills`. Decisión → F1-02 | done |
| F0-04 | Re-baseline E3 del golden (EV1-F11 H1-r3): `expected-refusal-contract.md` extraído de battery.md como archivo propio (exigido por run-gates.mjs:299-302), commit LOCAL `8b78dba` cero push; perfil run-3 sin clase interina (su reaparición = hallazgo) + pin actualizado; gates re-corridos = solo clases conocidas, cero clase nueva, frozen restaurado porcelain 0 | done |
| F0-03 | Este documento: preliminar → DEFINITIVO con F0-01/F0-02/F0-04 + insumos del gate trazados | done |

Gate F0: CUMPLIDO — proyección validada/corregida + veredicto del hop + plan definitivo. PR del gate con OK del operador (branch `claude/v6-f0`).

## F1 — Spine (formato primero: F2+ regenera fixtures — migrar después obligaría doble regen)

| Item | Contenido → entregable | Esf. |
|---|---|---|
| F1-01 | Migración `.tokens.json` (cierra deferral E1-08 + CONTRA-9). Código con cambio real: SOLO `scheme-derive.mjs` (:8 comment · :84-85 reads base/semantic · :157 write schemes); `audit-lint.mjs:124/:128` y `package-validate.mjs:86` sufijo-compatibles vía endsWith — sin cambio. Renombres: 21 archivos token (3 templates + 18 fixtures, incl. `schemes/*.json`). Prosa: ~25 líneas en ~15 archivos (token-spine :11-13 deferral a RETIRAR + :32-34,:45 · validate-audit :101,:171,:212 · SKILL :36,:268-271 · visual-keystone :25,:27 · prototype.html ×4 · styles.css ×2 · docs/CLAUDE :23 · docs/RESIDENT :55 · 03-grammar :61 · projections :33 · descripciones de fixtures ×~8). CHECKSUMS sin regen (cero refs a tokens/); surfaces/asset-index migration-proof. Golden/gallery pasan sin rename (verificado F0-01a) | S–M |
| F1-02 | Transform del lado canon (veredicto F0-02): proyección string OKLCH derivada del `$value` estructurado, emitida como salida propia del tooling del spine — el spine NO se toca; e2e contra el clon `~/proyectos/web-stack-skills`; des-stalear RESIDENT §Integrations (flag 2026-07-04 resuelto). Secuencia: post-F1-01, sobre el layout renombrado | S–M |

Gate F1: suite completa verde con la extensión nueva + golden re-verificado + hop downstream end-to-end en verde.

## F2 — Costura de compilación (NUEVA — scoper wire-integrity)

> Responde a los dos patrones rectores del gate v5: (1) inflación en el paso de COMPILACIÓN — specifics sin etiqueta entran a carriers RATIFIED{} después del último checkpoint del owner, donde ningún gate corre; (2) compresión de instrumentos bajo presión. T2 (F3-02) consume este wire reparado.

| Item | Contenido → entregable | Esf. |
|---|---|---|
| F2-01 (×2) | Contrato wire v6 — cambio único lockstep: **verbatim-check compilado-vs-brief-firmado** (todo literal del wire marcado ratificado/verbatim/"sus palabras"/owner-confirmed se verifica contra el texto firmado — machine-checkable, gate del compile) · **PROVENANCE por línea** dentro de `RATIFIED{}` y en filas `not-used(owner-declared)` — el wrapper deja de heredar ratificación a paráfrasis derivada (EV1-F13, mecanismo de F03/F04); blanket jamás acuña not-used (EV1-F10) · vocabulario saneado: 6 clases de literal fuera de contrato sancionadas-o-corregidas (EV1-F12) + "n/a" fuera, born-gap shipea como fila GAPS (EV1-F07) · CREATE jamás false-bloqueado: sin brief firmado = N/A declarado (W-15) · propagación lockstep a las superficies del ladder + regen de fixtures de handoff | L |
| F2-02 | Gate-3.5 emite-o-waive-con-ledger: la 3.5 emite su deliverable o el waive muestra el LEDGER de costo con las dimensiones UNOPENED nombradas (EV1-F01) · barrido pre-brief: el compile 7a no procede sin ledger de dimensiones completo — cada dimensión en estado terminal o listada UNOPENED en "Qué falta" del brief (EV1-F02) · la instrucción de retome carga el brief (residuo EV1-F06) | M |
| F2-03 | Reglas escritas + checks chicos: corrección post-firma ⇒ REEMISIÓN fechada obligatoria, manifest apunta a la versión corregida, hash debe cambiar (EV1-F08) · no-✔ antes del pase To-confirm (EV1-F14: 8 promotes inventariados) · prosa cliente jamás referencia cuenta/operador/plumbing (EV1-F09 / NS-F) · tabla destino⇒kit-slot + elicitación del slot en términos cliente (EV1-F05) | S–M |

Gate F2: fixtures nuevos MUERDEN (wire con paráfrasis sin provenance → FAIL · skip de la 3.5 sin ledger → FAIL · not-used por blanket → FAIL) + suite completa verde + W-18/W-19 + wins-regression íntegra.

## F3 — Modos (CREATE primero, T2 después)

| Item | Contenido → entregable | Esf. |
|---|---|---|
| F3-01 | CREATE completado (re-scope F0-01b: completar downstream, no construir de cero). Existente v5: handoff-format :65/:126/:208 (MODE parse-or-stop) · run-gates :157-159/:195/:210 (NOT-RUN + instrucción master-autorado, jamás false-block) · validate-audit :267-270 · SKILL ruteo + seam Stage 8. Falta: create.md gana seams per-stage (fidelity/audit/kit/keystone — hoy 0 menciones ahí) y EJECUTA la rama sin-fuente que run-gates instruye · disciplina de provenance CREATE · reproduction-router: seam o N/A explícito (asume fuente capturada) · keystone-emit: adjudicar mode-agnóstico (probable por construcción — lee confianza DEL token) · doctrina intacta (jamás re-elicitar el WHY; GAP del handoff queda GAP) | M |
| F3-02 | T2 EXTEND/RECOMMEND: modo híbrido ANALYZE + propuestas etiquetadas — carrier per-dimension del contrato v5 EXTENDIDO por F2-01 (provenance por línea); consume el contrato v6 congelado, cero bump propio · flujo builder draft-desde-recomendación · loop de ratificación post-primer-feedback · hereda el curator-wall ESCRITO y el 4º estado (v5 E3-01) | M–L |

Gate F3: fixtures sintéticos de modo (handoff CREATE todo-vacío · handoff T2 con dimensiones proposed) pasan la suite completa; la validación viva queda en F6.

## F4 — Kit (paralelizable con F5 tras F2 — superficies disjuntas entre sí; ambas consumen fixtures post-F2)

| Item | Contenido → entregable | Esf. |
|---|---|---|
| F4-01 (×2) | F4 emitter offline de static cards como capability del kit: tool HTML estático sin React/network sobre el arnés e2e de v5 (E1-09); prototipo de referencia = workaround de Onyx congelado (`onyx-brand-canon` @ `025cc64`, `claude-design-upload/`: 4 cards + preview — prerequisito VERIFICADO F0-01d); fixtures propios; las static cards entran al manifest/deny como superficie cliente | L |
| F4-02 | Re-pin del contrato /design-sync: absorbe `report_validate` / `.render-check.json` — el pin v2.1.185 NO los carga; único registro en fixtures/kit-e2e/README-FIXTURE.md:28 (F0-01c). Regla de frescura al implementar | S |

Gate F4: fixture e2e extendido cubre el emitter (build → cards estáticas → package-validate → deny) en verde.

## F5 — Mirror Drive

| Item | Contenido → entregable | Esf. |
|---|---|---|
| F5-01 | GitHub Action al push: upload de binarios SIN conversión + verify `sha256Checksum` contra CHECKSUMS · columna Drive del asset-index (base additiva de v5 E2-03) · doc de operación · creds vía Infisical. Decisión del operador al llegar: cuenta y estructura de folders. Docs-Editors excluidos explícitos (sin checksum — R-14) | M |

Gate F5: round-trip verificado — push → Drive → checksums match en ambos lados.

## F6 — Cierre v6

| Item | Contenido → entregable | Esf. |
|---|---|---|
| F6-01 | Integración + docs del repo (RESIDENT/CLAUDE/README) + version bump → v0.6.0 | M |
| F6-02 | Diseño fino del stress-test v6 (reglas §11 + lecciones del gate v5): corrida CREATE de cero (perfil = decisión del operador) · corrida T2 (marca existente + extensión propuesta) · AMBOS brazos del kit cubiertos: kit-YES con wire emitido + v0/DEMO (delta-2 v5 quedó roto; NS-C sin cobertura) · dry-parse leg builder-side OBLIGATORIO por corrida (NS-B no-ejercitado en v5) · ambas corridas EMITEN handoff — controla la asimetría de superficie que invalidó R-06 y re-corre el probe · el dossier declara el expected-slot (EV1-F05) y usa cebos que NO dependan de que el owner no decida (H1-residual) · runbook: transcript-capture pre-cierre cero reconstrucciones, aborto ⇒ registro, delta Incógnito-no-ciega-cuenta declarado, handoff.md a raíz + instrumentos descargables reales + pin fresco (EV1-F15) · regresión de la suite v5 COMPLETA (golden `8b78dba` + gallery) | M |
| F6-03+ | Corridas + disposición: veredicto por capability (CREATE · T2 · F4-emitter · mirror · migración · COSTURA — sostuvo o no, con evidencia) + failure gallery v6 | L |

Gate final — disposición de v6; los hallazgos alimentan el ciclo siguiente.

## Wins-regression

La tabla W-1…W-14 de PLAN-V5.md corre ÍNTEGRA en el gate de cada etapa v6, más 5 checks nuevos:

| W+ | Check |
|---|---|
| W-15 | CREATE jamás false-bloqueado por gates sin-fuente (fixture todo-vacío en verde; W-1 extendido a modo) |
| W-16 | Propuestas T2 jamás canonizadas sin ratificación (toda dimensión proposed conserva hypothesis+GAP hasta sign-off) |
| W-17 | Integridad del mirror: checksums match en round-trip; cero conversión a formatos Google-nativos |
| W-18 | Cero specific sin provenance por línea dentro de `RATIFIED{}` / `not-used(owner-declared)` — fixture con paráfrasis derivada falla sin etiqueta |
| W-19 | La gate-3.5 emite o el waive muestra el ledger con las UNOPENED nombradas — fixture de skip falla |

## Dimensionamiento (inferring — se recalibra por etapa)

F0 consumida (1 sesión real vs 2–3 proyectadas) · F1 ≈ 2 · F2 ≈ 3–4 · F3 ≈ 3–4 · F4 ≈ 3 · F5 ≈ 1–2 · F6 ≈ 3–4 → restante ≈ 15–19, total ≈ 16–20 (vs 14–19 del preliminar sin F2).

## Session log

- 2026-07-16 — **F1-01 done (branch claude/v6-f1)** — migración `.tokens.json` shippeada lockstep; cierra el deferral E1-08 y CONTRA-9. **Renombres:** 20 archivos token trackeados vía `git mv` (3 templates + 17 fixtures) — desviación del inventario (decía 21): `scheme-derive/near-black/tokens/schemes/night.json` es OUTPUT gitignored del fixture (`.gitignore:27`), no se renombra — se regenera; el stale se borró y `scheme-derive.mjs` re-corrido lo emite como `night.tokens.json` con el legibility guard vivo (L 0.06→0.46). **Código:** SOLO `scheme-derive.mjs`, 4 líneas (:8 comment · :84-85 reads · :157 write) — per inventario; +2 líneas comment-only FUERA de inventario para no dejar docs mentirosos (`audit-lint.mjs:12` y `package-validate.mjs:78` — cero semántica, el código de ambos sigue intacto). **Prosa:** 15 archivos — token-spine (DEFERRAL RETIRADO :11-13, reescrito como cumplido + :32-34/:45/:68) · validate-audit ×3 · SKILL ×4 · visual-keystone ×2 · prototype.html ×4 · styles.css ×2 · docs CLAUDE/RESIDENT · 03-grammar · projections · fixtures ($desc canon.json ×3 · demo-keystones ×2 · kit-e2e README · agent-gates/surfaces de clean); residuales grep 0. **CHECKSUMS: 0 refs a tokens/ VERIFICADO** — cero regen de hashes. **Gate del item (output real):** audit 0/1/0/0 · r1-font-norm 0 · gates clean 2 / violations 1 · deny manifest 0 + legacy 0/1 · custody pass/fail + kit-off clean/violation: filas propias ✅/❌/✅/❌ correctas (exits globales 1×4 IDÉNTICOS a baseline main — verificado con worktree limpio: los fixtures mínimos siempre fueron BLOCKED por filas ajenas; el "custody-pass 0" del log v5 refería a la FILA) · **anti-vacuidad probada:** los seeds disparan CITANDO `tokens/base.tokens.json` (25 ❌ en seeded) — los tools CARGAN los renombrados, no pasan por vacío · **golden essential-brand SIN rename:** audit-lint exit 0 + run-gates exit 1 con las clases EXACTAS del baseline `8b78dba`, cero clase nueva — la compatibilidad de sufijo (`endsWith '.json'`) probada en ejecución real, no solo por lectura; frozen restaurado porcelain 0 · SKILL builder 439 / scoper 499 intactos · scrubs 0 (los 3 hits del grep = "essentially", palabra inglesa, no marca). F1-02 NO arrancado; RESIDENT intacto (va al gate de etapa).
- 2026-07-16 — **F0 CERRADA — ronda pre-plan §16b post-gate ejecutada; plan preliminar → DEFINITIVO.** F0-01 en Code (verificación FASE B contra el repo real @ `9294c961`): migración vigente con line-refs frescos y alcance menor al proyectado (código = 1 tool) · claim CREATE "0 menciones" STALE — re-scoped a completar-downstream · /design-sync vigente · Onyx prerequisito cumplido. F0-02: hop downstream ROTO desde C-1 con evidencia file:line (web-stack exige `$value` string por bugs SD v5; spine emite objeto) — DECIDIDO: transform del lado canon. F0-04: re-baseline E3 del golden ejecutado (contrato de refusal extraído a archivo propio, commit local `8b78dba` cero push; perfil run-3 sin clase interina; gates = solo clases conocidas, frozen restaurado). F0-03: este documento — nueva etapa F2 "Costura de compilación" (insumos EV1-F01/F02/F03/F04/F07/F08/F10/F12/F13/F14 + NS-A/NS-D/R-06) + renumeración F3–F6 · regla de contrato único v6 (F2-01) · EV1-F05 adjudicado kit-YES con tabla destino⇒slot · F4∥F5 tras F2 · régimen A1 heredado (el preliminar cargaba la regla pre-enmienda) · pins fijados (`9294c961` / golden `8b78dba`). Branch `claude/v6-f0` (commit `d89f80d` + cierre), PR del gate F0 con OK del operador — instrucción explícita, prima sobre A1.
- 2026-07-04 — PLAN v6 PRELIMINAR tallado y aprobado en chat (operador + Claude), etapa por etapa, contra la ronda pre-plan v6 (superficie no-leída A1–A6 verificada + proyección post-v5). Decisiones asentadas: resolver NO, OI-J post-v6, F4 = kit capability, mirror = GitHub Action. Los 4 flags de la ronda que tocaban v5 se movieron a PLAN-V5.md como enmiendas. Candidatos absorbidos: CONTRA-9 (deferral v5 + cierre en migración), RESIDENT stale / hop downstream (F0-02/F1-02), superficie report_validate (F4-02). Se finalizó en F0, post stress-test v5.

## Limitations

- DEFINITIVO al cierre de F0 (2026-07-16); los esfuerzos siguen inferring y se recalibran por etapa — el análisis permanente (§16c) puede modificar este plan con entrada en el log.
- No re-narra problemas ni evidencia — resolución por ID contra el análisis, `stress-test-v5/failure-gallery-v5.md` y PLAN-V5.md.
- Forense local-only (E-O1): veredicto EV-1, corridas y golden/gallery locales JAMÁS al repo; este plan solo los referencia.
- Fuera de v6: resolver Module (condición de reapertura escrita) · OI-J build-grade (post-v6, gated en demanda real) · todo lo que el stress-test v6 aún no ha dicho.
