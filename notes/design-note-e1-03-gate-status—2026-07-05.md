---
name: design-note-e1-03-gate-status
description: Design note de E1-03 (PLAN-V5) — todo gate de prosa se vuelve ejecutable o se demociona explícito; NOT-RUN estatus de primera clase en el entregable. Checkpoint de reversa barata; la implementación se verifica contra este doc. Doc interno del ciclo (raíz, no shipped).
last_updated: 2026-07-05
applies_to: PLAN-V5 E1-03 · branch claude/v5-e1 (contrato E1-02 congelado @ e7ca0e7 como insumo)
status: diseño — se actualiza en el mismo commit si la implementación se desvía (cero drift)
---

# Design note — E1-03 · Gate suite ejecutable-o-demovido + NOT-RUN de primera clase

Requisitos por ID: EB-3 (≈50% del suite es prosa auto-atestada) · CB3/NOT-RUN (el ENTREGABLE marca NOT RUN;
patrón import-guard exit-3; deny-deps reproducible en clon fresco) · X2 (truth vs bookkeeping) · X4 (v0/DEMO
push-through honesto: ship-funcional-con-gaps sin false-pass ni hard-block). Insumo CONGELADO: vocabulario de
enforcement del contrato (`parse-or-stop · lint · measured · agent-gate`, handoff-format.md §Directives) —
agent-gate ES la democión explícita; no se re-deriva. Nota del plan (Gate E1): el deny solo recibe RE-SCOPE
INTERINO etiquetado — el manifest de superficies es E2-01; CONTRA-2/P7 cierran en E2.

## 1. El mecanismo — `tools/run-gates.mjs` (zero-dep Node) + el status board

UN tool nuevo, shipped al repo emitido: corre la suite completa y escribe **`audit/gates/report.md`** — el
status board machine-generated que ES el estatus del entregable. Nadie vuelve a narrar "all gates green": el
board sale de exit codes reales.

Estatus de primera clase por gate:
- `PASS` / `FAIL` — exit 0/1 real del gate ejecutable (child process, output capturado).
- `NOT-RUN(<razón>)` — exit 3 (import-guard: deps ausentes → se registra la instrucción de instalación del
  propio tool) o precondición ausente declarada (p.ej. npm no disponible). **NOT-RUN en gate BLOCKING ⇒ el
  veredicto global NO puede ser DONE** — es estado declarable (v0/DEMO shippea con el board visible), jamás
  un pass silencioso ni un hard-block deshonesto (X4).
- Filas con Class `agent-gate` — gate demovido explícito: el board registra la CLASE en su columna y el
  estatus PASS/FAIL sale de la evidencia committeada que la disciplina exige (form-checked, jamás contenido);
  evidencia ausente = FAIL (modelo §7a/§7b). (Ajuste post-verify: no es un estatus separado, es Class+estatus.)
- `N/A(<razón declarada>)` — el gate no aplica a esta forma de marca (anti-determinismo: flat/sonic pasan
  limpio, nunca false-fail).

Veredicto global: `ALL-GREEN` (cero FAIL, cero NOT-RUN en blocking) · `INCOMPLETE` (cero FAIL; hay NOT-RUN
blocking — shippable como v0/DEMO con el board a la vista) · `BLOCKED` (≥1 FAIL). El "v0 PASS / all gates
green" de la clase X4 muere: la única fuente del claim es el board.

## 2. El registro de gates (dentro del runner — clasificación completa del suite de validate-audit.md)

| Gate | Clase v5 | Cómo lo trata el runner |
|---|---|---|
| audit-lint R0–R8 | lint (BLOCKING) | corre `node tools/audit-lint.mjs .` — exit real |
| client-deny-lint | lint (BLOCKING) · **scope INTERINO etiquetado** | corre sobre el scope interino declarado (prototype/ + README.md emitido); deps ausentes → NOT-RUN con `npm install…` (CB3); el manifest real de superficies llega con el rediseño del deny (E2) y el board etiqueta el scope como interim |
| kit `package-validate.mjs` | lint (BLOCKING si kit presente) | `npm run validate` en design-sync-kit/; sin npm/deps → NOT-RUN; kit ausente (opt-out) → N/A |
| §7a fidelity evidencia | measured (BLOCKING) — presencia machine-checked | escanea `audit/fidelity/*/scores.json`: cada uno debe cargar verdict; dir ausente → N/A(no reproduced treatments) — la OBLIGATORIEDAD sobre el set non-waivable es E1-04, aquí solo presencia+forma |
| §7b keystone estructural | lint (BLOCKING) — mechanizado AQUÍ | keystone.md existe · 6 secciones `## ` (fences enmascarados) · GUARDRAIL en el tail (predicado index-based: una de las últimas dos secciones) · battery + expected-refusal contract presentes y no-vacíos en `audit/redteam/` |
| §7b keystone FORM-OF-RULE | lint (BLOCKING) — mechanizado AQUÍ (forma, jamás contenido) | THINK/DESIGN: ≥1 línea con forma condicional (`when…then/choose/prefer/use`) O una línea GAP visible · SPEAK: ≥1 par `on-brand:`+`off-brand:` O línea GAP — value-blind, medium-agnostic |
| §7b battery run vivo | agent-gate (Phase-5-deferred) | board: `NOT-RUN(live run Phase-5-deferred)` SIEMPRE honesto; si existe `audit/redteam/*/results.md` lo registra |
| §1 CORE-ASSET contract walk | agent-gate (BLOCKING) | evidencia exigida: la caminata committeada (ver §3) — ausente = FAIL |
| §2 named tolerance | agent-gate | evidencia: el artefacto §1 la nombra (mismo archivo) |
| §4 content audit | agent-gate | evidencia: sección en el artefacto §1/§4 committeado |
| §5 output-agnostic | agent-gate (grep como ayuda, jamás el gate) | demovido explícito — el regex superficial deja de venderse como gate |
| §5 universality stress test | agent-gate (juicio) | demovido explícito; evidencia: 3 artefactos caminados en el artefacto committeado |
| §5 DTCG validity | lint — ya lo cubre audit-lint (parse + alias en R4/R6a) | el board lo atribuye a audit-lint, no fila propia |
| Stage-11 client-clean | lint (deny) + agent-gate (juicio de registro) | el deny ya corre arriba; el juicio queda demovido |

## 3. Evidencia de agent-gates — UN artefacto, no N

Los agent-gates BLOCKING committean su evidencia en **`audit/agent-gates.md`** (un solo archivo, secciones
fijas: core-asset-contract-walk · named-tolerance · content-audit · output-agnostic · universality). El
runner verifica existencia + secciones no-vacías (forma, jamás contenido — anti-determinismo). Sin archivo o
sección vacía ⇒ FAIL del agent-gate correspondiente. Esto convierte "a human said OK" en "a committed,
re-auditable walk" — el mismo movimiento que v3 Theme-4 hizo con §7a/§7b.

## 4. Cambios de prosa (lockstep con el runner)

- `validate-audit.md`: cada sección gana su etiqueta de clase (`lint · measured · agent-gate`) usando el
  vocabulario del contrato; el **Gate summary se reescribe**: "done" se define por el board
  (`node tools/run-gates.mjs` → ALL-GREEN) + los agent-gates con evidencia committeada; NOT-RUN doctrine +
  X4 (INCOMPLETE shippable como v0 con board visible).
- builder `SKILL.md` Stage 10: el paso ejecutable pasa de "corre audit-lint" a "corre run-gates" (que corre
  audit-lint y todo lo demás); Stage 12 asserts board en el PR.
- `CLAUDE.md` §Tooling: fila nueva del runner + doctrina NOT-RUN.
- `keystone-emit.md` §7b nota: los checks estructurales/forma ahora son máquina (el juicio de operabilidad
  fina sigue agent-gate).

## 5. Fixtures (regla de fixtures: el mecanismo nuevo trae su acceptance proof)

- `fixtures/clean/` se EXTIENDE a exemplar completo: + `keystone.md` mínimo válido (6 secciones, guardrail
  en tail, 1 regla when-then, 1 par on/off) + `audit/redteam/battery.md` + `expected-refusal-contract.md` +
  `audit/agent-gates.md` (secciones llenas mínimas) → run-gates da INCOMPLETE (deny corre; kit validate
  NOT-RUN sin npm — aceptable) o ALL-GREEN según entorno; el fixture asserta: CERO FAIL.
- `fixtures/gates/board-violations/` NUEVO: keystone con guardrail enterrado + adjetivos puros + battery
  vacía + agent-gates.md ausente + un `audit/fidelity/<t>/scores.json` con `pass:false` → run-gates BLOCKED
  (las semillas se abanican en 8 filas FAIL: estructural, form, §7a y los 5 agent-gates).
- Caso CB3 (clon fresco): self-test documentado que copia deny-lint a `$TMPDIR/<fresh>/tools/` SIN
  node_modules y corre el runner → la fila deny = NOT-RUN(deps) y el veredicto INCOMPLETE — reproducible,
  sin duplicar tools committeados.
- Los reports de run-gates sobre fixtures NO se committean (misma razón E1-02: ruta absoluta) — gitignore ya
  cubre `fixtures/**/audit/` … los inputs de fixtures/clean/audit/redteam SÍ deben committearse ⇒ ajustar el
  patrón de .gitignore a `fixtures/**/audit/lint/` + `fixtures/**/audit/gates/` (solo outputs de corrida).

## 6. Modos de falla

| Falla | Comportamiento |
|---|---|
| Deny sin deps en clon fresco (CB3) | fila NOT-RUN(instrucción npm) en el board; veredicto INCOMPLETE; sustituirlo por grep manual ya no puede leerse como "clean" |
| Battery ausente/vacía | FAIL (§7b well-formedness) — machine |
| Agent-gate sin evidencia committeada | FAIL — "a human said OK" sin rastro murió |
| Narración "all gates green" | el único artefacto legítimo del claim es audit/gates/report.md, machine-generated |
| Marca flat/sonic | N/A declarados (kit opt-out, treatments ausentes, mark ausente) — cero false-fail |
| Keystone con GAP-line en vez de regla | FORM check pasa (GAP visible satisface forma — NS-D) |

## 7. Fronteras (qué NO hace E1-03)

- NO hace obligatoria la fidelity sobre el set non-waivable ni cierra el escape `--gap` (E1-04).
- NO valida selector/custodia (E1-05) · NO compara valores R1 (E1-06) · NO mecaniza el opt-out del kit ni
  toca defaults OPTIONAL (E1-07) · NO define el manifest de superficies del deny (E2-01; scope interino
  etiquetado) · NO toca el vocabulario sancionado (E2-02).
- El contrato E1-02 queda intacto (el runner CONSUME el vocabulario; cero cambios a handoff-format).
- El análisis sigue CONGELADO.

## 8. Ronda de verify adversarial (pre-commit — 3 atacantes + juez; FAIL inicial → 17 fixes aplicados)

Bloqueantes confirmados y corregidos: §7a ignoraba el campo máquina `pass` (un scores.json
outside-tolerance rendía ALL-GREEN — ahora `pass !== true` = FAIL; el escape `--gap` pass:true se respeta a
propósito, su cierre es del item de fidelity) · timeout de un gate colgado caía a NOT-RUN (ahora FAIL) ·
el deny interino no recursaba subdirectorios de prototype/ (ahora walk recursivo) · GAPLINE case-insensitive
aceptaba prosa ("a gap pending funding") como marcador (ahora forma tracked case-sensitive) · Stage 12 no
cargaba el board en el PR (ahora sí). Menores: fences enmascarados en el conteo de secciones (false-FAIL
real reproducido) · sibling tool ausente = FAIL (tampering) · detail de FAIL prefiere la línea ❌ ·
dist/ hueco (sin index.es.js) = FAIL · vocabulario de estatus unificado (agent-gate es Class, no estatus) ·
named-tolerance no-blocking · umbral 40-chars documentado como floor de forma · nota §7b en keystone-emit ·
VRT Storybook fuera del encadenado del board · enumeración de tools/* de Stage 1 completada. Límite
declarado (dueño backlog E2+): anti-tamper integral del validator del árbol cliente (hash-pin del kit).
Gates finales: clean exit 2 (cero FAIL) · board-violations exit 1 (8 FAIL) · regresión completa en verde.
