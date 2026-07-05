---
name: plan-v5
description: Plan de ejecución vivo para construir brand-system-skills v5 desde la baseline v0.4.0 @ 65932bb. Se lee al abrir toda sesión de trabajo v5, se reescribe al cierre de cada sesión, carga Session log propio. Deriva de brand-system-skills-v5-analysis_2026-07-04.md (análisis y resultados del stress-test v4) y lo referencia por ID — jamás re-narra. Use al ejecutar cualquier item v5, al decidir secuencia, o al cerrar una etapa.
last_updated: 2026-07-04
applies_to: ccediland/brand-system-skills — baseline v0.4.0 @ 65932bb → target v0.5.0
status: "v2 aprobado — EN EJECUCIÓN (docs del ciclo en raíz de main @ 6850056)"
etapa_vigente: E1
next_action: "E1-06 (R1 por comparación de VALORES cross-source) → E1-07 (NS-C ejecutable) — cierran la ola 2"
---

# PLAN v5 — brand-system-skills

> Plan de ejecución para v5. Fuente de requisitos y evidencia: `brand-system-skills-v5-analysis_2026-07-04.md` (el "análisis"), referenciado por ID — este plan carga SOLO lo accionable. Workflow (análisis §16): chat = home base (dirección/decisiones), Code = ejecución/análisis profundo/bughunting/building; retornos inline destilados, cero saturación de contexto. Los stress-tests son el CIERRE de la ejecución (E4), jamás actividad previa.

## Reglas de operación

- Referencia por ID al análisis (C-X#, ítems por §, W-#, NS-#, N#/T#, CONTRA-#, R-##). Precedencia y derivación: análisis §16a. Descubrimientos de ejecución → Session log de este plan + RESIDENT del repo, nunca al análisis.
- 1 item ≈ 1 sesión de Code. Items L divisibles llevan (×2). Estados: `pendiente · en-curso · done · bloqueado`.
- Regla de contrato único: TODO cambio al contrato del handoff (enum, persistencia, carriers, rutas, directivas) ocurre UNA vez en E1-02; el resto del plan consume ese contrato congelado.
- Regla de fixtures: toda mutación de schema/enum/gate regenera los fixtures afectados DENTRO del gate del item — nunca item aparte.
- Regla de frescura (análisis §15b): contratos version-fluid (/design-sync, fechas C2PA/AI-Act, RAG trip-point) se re-verifican al implementar el item que los toca.
- Regla permanente de análisis (análisis §16c): en cualquier punto, diferir a Code el análisis que haga falta antes de modificar; el resultado puede modificar este plan, con entrada en Session log.
- Wins-regression: la tabla W-# corre en el gate de CADA etapa.
- Pin y branches: `65932bb` = baseline sobre la superficie de código. Código se toca solo dentro de su etapa, en branch `claude/v5-e<N>`; PR + merge autónomos al cierre de cada etapa con gates en verde (enmienda 2026-07-05; E-O1 vive: cero push de repos de marca).

### Reglas del workflow de ejecución (operador, 2026-07-04)
- Momentum sobre ceremonia: contexto y compute son la prioridad #1. El chat home base minimiza paradas — decide y avanza, aprovecha cada turn; cambiar de sesión de chat pierde momentum y contexto valioso y se MINIMIZA.
- Decisiones: las toma el CHAT y las informa con prefijo "DECIDIDO:"; el silencio del operador = ratificación. Solo se detiene si es ESTRICTAMENTE necesario: gasto real de dinero o acción física que solo el operador puede ejecutar.
- Push/PR/merge del REPO DEL SKILL: AUTÓNOMOS (enmienda del operador, 2026-07-05 — reemplaza la regla previa de push-con-OK): al cierre de cada etapa, con los gates de la etapa en verde como precondición, Code pushea, abre el PR y lo mergea sin esperar OK. INVARIANTE INTACTO (E-O1): cero push en los repos de marca (~/proyectos/<brand>-brand), por siempre — fixtures local-only.
- Análisis a demanda: en CUALQUIER momento el chat puede dedicar un turn a solicitar a Code un análisis/diagnóstico — esté o no en el plan — si mejora el trabajo o el entendimiento de lo que se modifica (extiende análisis §16c).
- Cero manual: el operador jamás edita/crea archivos o repos a mano ni se le pide hacerlo. Toda edición/creación = Code; el chat usa Composio solo para operaciones MUY ligeras (lecturas puntuales, verificaciones) — nunca ediciones ni archivos extensos. Ante la duda, diferir a Code.
- Code = UNA sesión por versión, Fable 5 activo. Cada prompt del chat a Code declara el effort: análisis/diagnóstico = high · items L, diseño de mecanismos (E1-02, E3-01), debugging duro = ultracode · items S/M mecánicos = medium–high.
- Contexto de Code vía /compact: el operador monitorea el contexto de la sesión; cuando lo indique, el chat emite el bloque "/compact <instrucciones>" — qué RETENER (etapa/item vigente y estados, decisiones, gotchas, contratos/paths/líneas clave, next steps) y qué DESCARTAR (outputs verbatim ya asentados, exploraciones muertas, diffs committeados). Los tokens de Code NO son restricción.
- Los retornos de Code al chat siguen destilados (economía de contexto, análisis §16). RESIDENT por gate/etapa; el plan se reescribe al cierre de cada bloque de trabajo.

## Decisiones del operador (tomadas 2026-07-04)

- TODO LOCAL: cero push de repos de marca. El golden set (essential-brand) y la failure gallery son fixtures LOCALES; publicarlos no es relevante para v5.
- Handoffs originales de Klim/Radiotopia: NO existen (chats borrados) y NO se reconstruyen. Los gates de contrato usan fixtures SINTÉTICOS en formato v5 (E1-02, con variantes opt-out); el gate de E2 corre sobre los canons EMITIDOS de la gallery.
- Reports forenses del test v4: FUERA del plan. El análisis y este plan cargan todo lo necesario; no se vuelve a los reports.
- Hogar del handoff persistido en el repo emitido: `sources/handoff—<fecha>.md`, hasheado en CHECKSUMS (sources/ = superficie operador; el handoff es la cima de la chain-of-custody).
- Hogar del self-audit (N1): `audit/self/` (superficie operador, fuera del scrub, git-tracked — cierra SELF-AUDIT-FILES).
- Índice N5: archivo NUEVO `satellites/asset-index.md`; `data-map.md` queda intacto (hace otro trabajo — corrección asentada en el análisis).
- Huérfanos asignados: herencia E-O1→builder, auto-GAP B7 y mecánica de adquisición builder → E1; adquisición-como-stage formal y hygiene → E3.
- Failure gallery se congela committeando lo untracked LOCAL en los repos de prueba (E0-01).

## E0 — Pre-flight (recortado)

| Item | Contenido → entregable · gate | Padres | Esf. | Estado |
|---|---|---|---|---|
| E0-01 | Congelar failure gallery: commit LOCAL de todo lo untracked (BUILD-SELF-ANALYSIS ×4 + extras de Onyx) en los repos de prueba · gate: `git status` limpio en los 5 | R-B-4, HARNESS-LESSON | S | done |

Regla E0-02 (no es sesión): el re-read del contrato `/design-sync` vigente se ejecuta JUSTO antes del primer item de kit (E1-09) — regla de frescura, residual R-07.

Gate E0: gallery congelada + suite de fixtures del repo replicable (verificada verde en la ronda pre-plan 2026-07-04).

## E1 — Verdad-máquina (builder core) · 3 olas

Ola 1 — fundacional (todo lo demás consume esto):

| Item | Contenido → entregable | Padres | Esf. |
|---|---|---|---|
| E1-01 | Postura NS-H escrita (spec corta; codificación scoper en E3-05). Desbloquea CONTRA-3/K-B-6 · **done** | NS-H, S1, C-O2 | S |
| E1-02 (×2) **done** | CONTRATO handoff v5 — cambio único lockstep: enum completo (verified-primary · relay · owner-confirmed / handoff-confirmed / proxy-relayed, modelo R-13) · persistencia del artefacto (`sources/handoff—<fecha>.md` + CHECKSUMS) · carriers sin frameworks nombrados (lado-contrato de CONTRA-6) · rutas de adquisición formales · directivas→gates. Incluye FIXTURES SINTÉTICOS de handoff en formato v5 con variantes opt-out (kit OFF) — reemplazan a los handoffs muertos. ENMIENDA (ronda v6): el contrato carga desde YA la representación de proposed-en-cuarentena (authored + hypothesis + GAP + ratificación-pendiente, NS-D) — congelarlo sin ella forzaría un segundo bump en v6 (T2) y rompería esta misma regla de contrato único. Propagación a las ~9 superficies del ladder + regen de fixtures | ENUM-GAPS, X3, R-B-2, CONTRA-6, S7, E-O3, R-13, C-X7, NS-D, ronda-v6-flag-2 | L |

Ola 2 — gates de verdad (NS-A/NS-B):

| Item | Contenido → entregable | Padres | Esf. |
|---|---|---|---|
| E1-03 (×2) **done** | EB-3: cada gate de prosa se vuelve ejecutable o se DEMOCIONA explícito; NOT-RUN estatus de primera clase en el ENTREGABLE (patrón import-guard exit-3; caso deny-lint deps npm = CB3 reproducible en clon fresco) | EB-3, CB3, X2, X4 | L |
| E1-04 **done** | Fidelity obligatoria sobre el set non-waivable (mark, paleta) + cierre del escape `--gap` pass-true (CONTRA-7) + regla screenshot-renderiza-el-canon + fix neutrales scheme-derive. ENMIENDA (ronda v6): definir el path SIN-FUENTE (modo CREATE, donde no existe captura Stage-5): master autorado = source-of-record del diff, o N/A-declarado — el gate obligatorio JAMÁS false-bloquea CREATE (W-1) | FIDELITY-NEVER-RAN, CONTRA-7, K-B-4, ronda-v6-flag-1 | M |
| E1-05 (×2) **done** | NS-B: sub-check R3 (selector existe en el archivo hasheado o `selector:none`; `page` no `line` en PDF) · MANIFEST de custodia generalizado a todo derivado (hash+URL del padre) · `relay` excluido del conteo R1 | C-X6, R-B-4, R-B-2 | L |
| E1-06 **done** | R1 por comparación de VALORES cross-source (normalización hex/oklch) | R1-FILES | M |
| E1-07 | NS-C ejecutable: el gate lee el handoff persistido y los fixtures de E1-02; kit OFF ⇒ cero artefactos Claude Design o el lint falla; fuera "OPTIONAL defaults YES" (SKILL.md:96/:133 + adapter + handoff-format:102) | C-X7, KIT-DEFAULT | M |

Ola 3 — periferia builder (paralelizable):

| Item | Contenido → entregable | Padres | Esf. |
|---|---|---|---|
| E1-08 | Bundle chico: P1–P3 one-liners · CONTRA-1 fail-loud (R6a jamás skip mudo) · CONTRA-4 · CONTRA-8 (prosa) · lint de GAP cross-refs en prosa (R-B-7) · ENMIENDA (ronda v6): declarar en token-spine.md el DEFERRAL de `.tokens.json` (la prosa :11 declara el target mientras templates/tools usan `.json` sin deferral — mata la CONTRA-9 candidata; la migración real es v6) | P1–P3, CONTRA-1/4/8, R-B-7, CONTRA-9-cand | S–M |
| E1-09 (×2) | Fixture e2e del kit (kit→npm build→R6c→package-validate→deny→upload-shape) + anti-gaming FONT_MISSING (K-B-6: borrar la referencia no premia) + resolución de CONTRA-3 vía postura E1-01. Pre-item: re-read /design-sync vigente (regla E0-02) | P8, GATE-GAMING, CONTRA-3 | M–L |
| E1-10 | Herencia E-O1 al builder: Stage 12 local-by-default, push gated en OK (hoy SKILL.md:372-374 dice "commit + open a PR") | E-O1 | S |
| E1-11 | Auto-GAP regulatorio: match clase-producto × clase-claim ⇒ GAP "claims reguladas" + guardrail keystone §5; JAMÁS bloquea el build | B7, R-16 | S–M |
| E1-12 | Mecánica de adquisición builder: MT-3-SKIP como gate de agente · ingest declarado no ejecutado ⇒ GAP (R-B-8) · fallback Drive documentado (EV-2) | MT-3-SKIP, R-B-8, EV-2 | M |
| E1-13 | Medición real: fontTools OS/2 usWeightClass + metric-compare (spec R-15) · cap-height del SVG · colorways sin falsa precisión | K-B-7/K-B-9, EB-2, R-15 | M |

Gate E1: suite de fixtures regenerada en verde REAL + replay del golden set local + wins-regression (muerden: W-1, W-5, W-8, W-10, W-12). Nota: CONTRA-2 y P7 NO cierran aquí — son NS-F, cierran en E2; en E1 solo re-scope interino del deny, etiquetado como tal.

## E2 — Superficies (NS-F/NS-G, T1/T3) · 3 olas

Ola 1 — NS-F core:

| Item | Contenido → entregable | Padres | Esf. |
|---|---|---|---|
| E2-01 | Manifest de superficies: template en el repo emitido + deny-lint toma su target-list DEL manifest (hoy prosa + scope auto-elegido, R-B-9) | NS-F, R-05, R-B-9 | M |
| E2-02 | Vocabulario epistémico sancionado + rediseño del binding del deny (cierra el bypass de ventana; taxonomía R-01) ⇒ CIERRE real de CONTRA-2 y P7 — X1 resuelto estructuralmente | X1, R-01, CONTRA-2, P7 | M–L |

Ola 2 — índice y prototype (N5 alimenta a N8):

| Item | Contenido → entregable | Padres | Esf. |
|---|---|---|---|
| E2-03 | Índice N5: `satellites/asset-index.md` NUEVO, emitido desde canon (T3), mapa del chain-of-custody (los records viven en sourceRefs/CHECKSUMS/MANIFEST de E1-05 — el índice agrega, cero re-homing), entra al alcance de R6a | N5, C-X6, T3 | M |
| E2-04 | Inversión de R8 (N8): enumerar canon+assets desde el asset-index ⇒ FALLAR por omisión; conserva dark toggle, demo-markers, panel Decisions-for-you, guía anotada | N8, BO1/BO2, C-O3/C-O4 | M–L |

Ola 3 — cerebros y operación (paralelizable):

| Item | Contenido → entregable | Padres | Esf. |
|---|---|---|---|
| E2-05/06 (×2) | Keystone visual N4 + regla imagery-IA N7, juntas: emitido desde canon, referencia el spine SIN pinnear (R-04), esqueleto tipo DESIGN.md, convención do/don'ts, presupuesto R-08, epistemia intacta (NS-F) · field-set de 5 ejes (R-12), referencia-assets como ground truth (W-4), descriptores en cuarentena para marcas sin identidad (NS-D), provenance por asset generado + postura disclosure con regla de frescura | N4, N7, NS-G, R-11, R-12, R-04, R-08, NS-D, W-4 | L |
| E2-07 | Mapa de ediciones N2: routing directriz→archivos→gates · columna resolution-target en el gap ledger (BO3) · update-protocol + docs timeless (BO4). Insumo: mapa R-04 | N2, BO3/BO4, R-04 | M |
| E2-08 | Self-audit N1 harness-backed (re-corre gates, verifica contra archivos — jamás confesión narrada); hogar `audit/self/` | N1, C-X5, SELF-AUDIT-FILES | M |

Gate E2: correr la suite v5 completa sobre los canons de la failure gallery — el diff debe CAZAR las fallas conocidas (markers scrubbed de X1 en Onyx/Cuenca/Radiotopia, R8 que pasaba con omisiones, R6a skip mudo de Klim) — y el golden set local sigue pasando limpio. Wins que muerden: W-2, W-5, W-9 (por vocabulario, no por ventana), W-11. Orden interno: E2-01→02→03→04; ola 3 paralela después.

## E3 — Scoper (NS-D/NS-E, N9/N10/N11) · 2 olas

Ola 1 — el mecanismo (secuencial):

| Item | Contenido → entregable | Padres | Esf. |
|---|---|---|---|
| E3-01 (×2) | Máquina de estados por dimensión: frame GENERADO del perfil (patrón KAOS/obstacle) + orden constrained-CAT (área por discrepancia, ítem improvisado dentro) + cierre por saturación (N probes consecutivos sin material nuevo) + probing por señales (ambigüedad/omisión/vaguedad). Estados: decidido / not-used / proposed-cuarentena / GAP — campo sin elicitar NACE GAP, auditable. Bancos = cantera jamás script. ENMIENDA (ronda v6): CODIFICAR el curator-wall como regla ESCRITA del repo — hoy 0 menciones (verified, ronda v6): es conducta observada del test, no regla; N9 y T2 (v6) heredan la regla escrita, no la conducta. ⚠️ SKILL.md a 499/500 líneas ⇒ el mecanismo vive en references nuevas, SKILL solo rutea | NS-D, NS-E, R-13, C-S5, C-X2, V5-01 | L |
| E3-02 | Proxy S2 + multi-decider S4: proxy responde lo factual; POSTURE/valores exigen dueño o degradan a hypothesis con provenance de quién respondió (enum de E1-02); consolidación ponderada por separado, conflicto ESCALADO como ítem, contacto principal scopea a-quién-preguntar | S2, S4, X3, R-13 | M |

Ola 2 — colgantes (paralelizable):

| Item | Contenido → entregable | Padres | Esf. |
|---|---|---|---|
| E3-03 | N11: todo instrumento = documento completo descargable, en toda etapa, cliente o intermediario (generaliza el gate 6 existente) | N11, C-O1, S7, C-S2 | M |
| E3-04 | Gates de proceso: compuerta de firma real (el texto existe ANTES de firmarse) · brief y handoff jamás en el mismo mensaje · machine-handoff obligatorio (anti E-S-4) · cláusulas solo elicitadas · specifics web/memoria siempre tagged (S8/R-S-4) | R-S-2, E-S-4, S8/R-S-4 | S–M |
| E3-05 | NS-H codificación scoper (de E1-01) + POSTURE como reach derivado (V5-01) + cierre total de CONTRA-6 (Aaker fuera de keystone-emit; el contrato salió limpio en E1-02). Va DESPUÉS de E2-05 (toca lo que keystone-emit v5 define) | NS-H, V5-01, CONTRA-6 | M |
| E3-06 | Adquisición como stage formal del skill, contra el contrato FINAL (rutas por material, fallbacks logueados) + default anti scope-bleed: "scope, don't build" | E-O3/E-O4, E-S-3/S9 | M |
| E3-07 | Hygiene: naming sin `-canon` (S6) · verbosidad (S10) · WHY-first (S11) · project-push (C-S3) · numeración estable (R-S-5) | SCOPER-HYGIENE | S |

Gate E3: scoper-only blind runs en Incógnito, sin build — ≥2 perfiles: (a) multi-decisor familiar vía proxy (muerde S2/S4/N11/W-13), (b) marca mínima/spare (muerde W-1 y el frame sobre perfil flaco). Harness verifica: cero campo mudo (toda dimensión terminó en uno de los 4 estados), cero valor autorado sin etiqueta, conflictos escalados no resueltos. Secuencia: E3 no arranca hasta cerrar E1-02; E2/E3 pueden traslaparse (solo comparten keystone-emit: E3-05 después de E2-05).

## E4 — Cierre v5

| Item | Contenido → entregable | Padres | Esf. |
|---|---|---|---|
| E4-01 | Integración: re-corrida de suite completa + golden set local en verde · RESIDENT/CLAUDE/README del repo actualizados · version bump → v0.5.0 | E-O2, N2 | M |
| E4-02 | Diseño fino del stress-test (sesión propia, contra análisis §16g y reglas §11): perfiles de las 2 marcas por mecanismo, protocolo blind (Incógnito ambos lados o asimetría declarada), harness del evaluador con disciplina EV-1, probe R-06 embebido, deltas de comparabilidad declarados | §16g, §11, M1, EV-1, R-06/C-X1 | M |
| E4-03+ | Corridas: (1) PyME familiar multi-decisor vía proxy · (2) marca sin identidad de imagery, oscura/phantom · (3) re-run del golden set local. R-06 gratis: marca 1 conocida vs 2 oscura | §16g | L |

Gate final — disposición de v5: veredicto por rector (NS-A…NS-H sostuvo / no sostuvo, con evidencia), failure gallery v5 nueva, golden set actualizado. Los hallazgos alimentan la ronda pre-plan v6 (análisis §16b).

## Wins-regression (corre en el gate de cada etapa)

| W | Check |
|---|---|
| W-1 | Marca spare: not-used respetado, cero sistema inventado (fixtures flat/sonic + run E3-b) |
| W-2 | Cero fake in-use; panel Decisions-for-you presente (grep sobre canons de la gallery, E2) |
| W-3 | Cero manifiesto inventado con elicitación completa (E3 runs) |
| W-4 | Referencia = ground truth, descripción derivada = hypothesis (fixture sonic + N7) |
| W-5 | Valores observados en cuarentena, jamás threadeados (lint E1-05) |
| W-6 | Battery §7b committeada honesta, sign-off no fingido (E1-03) |
| W-7 | EH del scoper bajo presión (E3 blind runs) |
| W-8 | E-O1/E-O3/E-O4 operativos (E1-10/E1-12) |
| W-9 | Markers sobreviven por VOCABULARIO sancionado, no por ventana (E2-02) |
| W-10 | OKLCH exactos (fidelity E1-04) |
| W-11 | Gaps auto-levantados con evidencia persistida (E2-08) |
| W-12 | audit-lint real + battery etiquetada honesta (E1-03) |
| W-13 | Machine block retenido hasta sign-off (E3-04) |
| W-14 | Licencia = dependencia + confirmación, jamás gate de capacidad (E1-01/E3-05) |

## Dimensionamiento (inferring — de la ronda pre-plan, recalibrar por etapa)

E0 ≈ 1 sesión · E1 ≈ 10–12 · E2 ≈ 8–9 · E3 ≈ 7 · E4 ≈ 4–6 · total ≈ 30–35 sesiones.

## Session log

- 2026-07-04 — v1 drafteado por Claude directo del retorno de la ronda pre-plan, sin trabajarlo con el operador: DESCARTADO como borrador (violación del workflow §16 — la creación del plan es chat, operador + Claude).
- 2026-07-04 — v2 trabajado en chat etapa por etapa y aprobado E0–E4. Decisiones del operador asentadas: todo local (cero push de repos de marca); handoffs originales no existen y NO se reconstruyen — fixtures sintéticos v5 en E1-02 y gate E2 sobre los canons de la gallery; reports v4 fuera del plan; hogares ratificados (sources/handoff, audit/self/, asset-index nuevo); huérfanos asignados. Riesgos de la ronda integrados: regla de contrato único (E1-02), CONTRA-2/P7 cierran en E2, N5 antes de N8, NS-H adelantada a E1-01, regla de fixtures por item, E3-05 después de E2-05. Pendiente: revisión final del operador → subida de análisis + plan a raíz de main (un PR) → E0-01.
- 2026-07-04 — A0: reglas del workflow de ejecución asentadas por instrucción del operador, 2026-07-04. Además: frontmatter corregido (estaba stale — la subida de los docs del ciclo a raíz de main ya ocurrió @ 6850056; status → EN EJECUCIÓN, next_action → E0-01).
- 2026-07-05 — **E1-06 done (high)** — R1 dejó de contar archivos: `corroborated` ⇒ el VALOR aparece en ≥2 fuentes non-relay distintas, verificado contra el CONTENIDO de los archivos hasheados (hex case-insensitive · `oklch()` con match numérico L±0.005/C±0.005/H±0.5, incl. forma porcentual de L · string directo o su primera familia quoted para font stacks). Fuentes binarias/ilegibles cuentan declarativas por archivo (límite documentado); relay jamás cuenta. Seed nuevo `r1value` (2 archivos reales hasheados, valor en ninguno → FAIL — la fabricación plausible con refs reales muere); fuentes de los 4 fixture-sets re-escritas para PORTAR los valores (aislamiento de reglas intacto: proposedbad/r2bad ahora solo disparan R2) + hashes propagados. Prosa lockstep en gap-protocol ("that agree" por fin machine-true — cierra el NIT que el verify de E1-02 había diferido aquí) + token-spine + validate-audit R1 + CLAUDE.md. Regresión completa en verde (audit 0/1/0/0 · gates clean 2).
- 2026-07-05 — **E1-05 done (ultracode)** — NS-B: la capa de citas dejó de ser decorativa y la custodia de derivados es machine-bound. (a) Sub-check de CITATION integrity en audit-lint R3: todo sourceRef con `selector` debe existir VERBATIM (containment) en el archivo hasheado o citar `"none"` (selector vacío = violación); `line` entero, ≥1 y jamás > EOF (conteo corregido por trailing-newline); PDF cita `page`, jamás `line`; binarios (NUL-detect) declarativos. Seeds: selghost·lineeof·pdfline (seeded a 20 ❌); fuentes de clean/completeness reescritas con labels reales + hashes recalculados y propagados (el check nuevo NO rompe clean). (b) Custodia: fila "custody manifest" en run-gates — rutas `acquire:cut|recover-wayback` del handoff persistido (regex anclado al syntax del contrato, prosa narrativa no dispara) → entrada en sources/MANIFEST.json con url+**sha256** del padre; shapes aceptados: array · {entries} · el wrapper {recovered} de source-recover.py (sin fallback Object.values); bind por igualdad exacta de path/basename (substring gameable eliminado). Fixtures custody/{pass,fail} (el PASS candadea el shape del sibling tool). MANIFEST generalizado en asset-acquisition (todo derivado: cut/wayback/export) + gap-protocol hard-rules + token-spine sourceRef gana `page`. (c) `relay` excluido de R1: ya había aterrizado en E1-02 con su schema (logueado allá). Verify adversarial (2 atacantes + juez, FAIL inicial): 7 fixes — BLOCKER: el gate false-FAILeaba el happy path del propio source-recover.py (wrapper {recovered}); MAJORs: bind substring gameable a PASS-vacío + hash del padre prometido en 3 prosas y no exigido; menores: regex ciego a prosa, off-by-one EOF, selector vacío, cero fixtures propios. Repros del juez re-corridos: j1→PASS · j2/j3→FAIL · j4→N/A. **Re-deferral explícito:** el binding fino verified-primary→primary-master (diferido por E1-02 DECIDIDO-10 "a E1-05") se re-difiere con dueño **E2-03** (asset-index/chain-of-custody es el hogar del linkage slot→master; enmienda asentada en la design note E1-02). Límite documentado sin dueño: validación positiva de `page` contra page-count (requiere parser PDF, fuera del scope zero-dep). Regresión completa en verde (audit 0/1/0/0 · gates clean 2 / violations 1 / custody pass-fail).
- 2026-07-05 — **E1-04 done (high)** — la fidelity es OBLIGATORIA sobre el set non-waivable y el escape del gate de verdad está muerto. (a) CONTRA-7 cerrado: `fidelity-diff.py` — `pass` registra SOLO la medición (outside+`--gap` ⇒ exit 0 como outcome TRACKED pero `pass:false`+`gap:GAP-NNN`; jamás flip a pass; e2e verificado con los fixtures reales: within exit 0/pass:true · out exit 1 · gap exit 0/pass:False/gap registrado); non-visual gana `measured:false`. (b) Obligatoriedad: `run-gates.mjs` §7a RECOMPUTA el veredicto de los números del propio scores.json (verdict-a-mano cazado: pass discrepante o sin números = FAIL) + fila nueva "§7a mandatory set" que parsea el handoff persistido (NON-WAIVABLE + MODE): ANALYZE sin medición = FAIL · non-waivable montado en `--gap` = FAIL ("never rides the escape") · non-visual declarado = PASS honesto (W-1/W-4, verificado con mini sónico) · **CREATE = NOT-RUN con instrucción "diff contra el master AUTORADO como source-of-record o declara N/A" — jamás false-block (enmienda ronda-v6 cumplida)**. (c) K-B-4: `scheme-derive.mjs` gana el post-derive legibility guard (todo rol text/fg derivado guarda ≥0.30 de ΔL contra el bg/surface más cercano; par colapsado se empuja, se loguea, sigue hypothesis+GAP) — fixture `scheme-derive/near-black` reproduce el caso invisible (0.94→0.06 sobre 0.01) y el guard lo corrige a 0.46. (d) Regla screenshot-renderiza-el-canon asentada en validate-audit §3a + bullet nuevo del content audit §4 (evidencia con paleta hand-tuned = fabricación). Fixtures: board-violations gana hand-verdict + handoff Delta con non-waivable jamás medido (9 FAIL); fake-grain al schema real del tool. Prosa lockstep: validate-audit §7a reescrito + CLAUDE.md (fidelity/scheme-derive). Regresión completa en verde (audit 0/1/0/0 · deny 0/1 · gates 2/1). Sin verify multi-agente (item M, régimen); los dientes nuevos quedaron con acceptance fixtures propios.
- 2026-07-05 — **E1-03 done (ultracode)** — el gate suite es ejecutable-o-demovido y el NOT-RUN es de primera clase EN el entregable. Mecanismo: `tools/run-gates.mjs` (runner zero-dep, shipped) corre cada gate ejecutable con exit codes REALES (0/1; exit-3 import-guard → NOT-RUN con la instrucción de instalación — CB3 en clon fresco reproducido: el deny cae a NOT-RUN(deps), jamás "clean" por grep manual), verifica evidencia committeada (§7a scores.json con `pass:true` obligatorio · §7b keystone estructural+FORM machine-run · battery no-vacía · `audit/agent-gates.md` con la caminata de cada gate DEMOVIDO: §1 contract-walk, §2 tolerance, §4 content-audit, output-agnostic, universality) y escribe `audit/gates/report.md` — el status board machine-generated, único claim legítimo de "gates green" (X2/X4: veredictos ALL-GREEN · INCOMPLETE — v0/DEMO shippable con board visible, jamás "done" — · BLOCKED). Demociones explícitas con el vocabulario congelado de E1-02 (agent-gate); validate-audit.md re-etiquetado por clase + §8 nuevo + Gate summary redefinido sobre el board; Stage 12 carga el board en el PR. Re-scope INTERINO del deny etiquetado (prototype/**/*.html + README; manifest = E2). Fixtures: clean extendido a exemplar completo (keystone 6-secciones + redteam + agent-gates; exit 2 con CERO FAIL — el kit [NO_DIST] ejercita NOT-RUN) + `gates/board-violations` (8 FAIL sembrados, exit 1). Verify adversarial (3 atacantes + juez, FAIL inicial): 17 fixes — bloqueantes: §7a ignoraba `pass` (outside-tolerance rendía ALL-GREEN), timeout→NOT-RUN, deny sin recursión en subdirs, GAPLINE case-insensitive gameable, Stage 12 sin board; 12 menores (fences enmascarados — false-FAIL real —, sibling ausente=FAIL, dist hueco=FAIL, vocabulario Class-vs-estatus, etc.). Todos los repros de gaming del scratchpad re-corridos: BLOCKED. Límite declarado con dueño backlog E2+: anti-tamper del validator del árbol cliente. Regresión completa en verde; SKILLs 408/499. Frontera respetada: `--gap` pass:true sigue pasando A PROPÓSITO (cierre = E1-04); W-6/W-12 muerden aquí (battery honesta committeada + lint real orquestado).
- 2026-07-05 — **A1: push/PR/merge del repo del skill autónomos por instrucción del operador** (al cierre de etapa, gates en verde como precondición; stops del operador reducidos a gasto real o acción física). E-O1 intacto: cero push de repos de marca. Bullets de Reglas de operación + workflow actualizados; push pendiente ejecutado (PR #61 de E0 mergeado; PR de E1 abierto y acumulando commits hasta el cierre de etapa).
- 2026-07-05 — **E1-02 done (ultracode)** — el contrato handoff v5 queda CONGELADO; diseño + evidencia + ronda adversarial en `design-note-e1-02-handoff-contract—2026-07-05.md` (raíz; §10 inventarios, §10bis 11 DECIDIDOs, §10ter desviaciones, §10quater verify). Entregables: enum 6 valores/3 tiers (verified-primary · proxy-relayed · handoff-confirmed; `proposed` en source = cuarentena NS-D; `relay` = atributo de sourceRef `origin:capture|relay`, DECIDIDO 1 — un rung no puede implementar la exclusión R1, no es contradicción plan↔análisis) · persistencia `sources/handoff—<fecha>.md`+CHECKSUMS (Stage 0 primero-persiste) · carriers sin frameworks (Personality (scored); Aaker fuera del contrato y sus espejos — keystone-emit mecánica queda a E3-05) · acquire:/fallback: formales · registro directivas→enforcement con vocabulario `parse-or-stop·lint·measured·agent-gate` (agent-gate = democión explícita, insumo E1-03) · 3 fixtures sintéticos de handoff (Alpha kit-on FULL · Beta kit-off v0/DEMO · Gamma sonic-spare) + fixtures de tokens con los rungs nuevos. Propagación real: 76 sitios del ladder inventariados por workflow (el "~9" del plan subestimaba), dueños actualizados (audit-lint enums+R1/R2/R3/R5 · token-spine · gap-protocol · handoff-format), resto literales-a-lockstep o pointers; RESIDENT/docs de ciclo intactos por régimen. Verify adversarial (5 atacantes + juez, FAIL inicial): 8 defectos grado mayor CONFIRMADOS y corregidos (miss TREATMENTS en el wire · evasión R1 por case ·  R3 sin binding al handoff · prosa R1-hash · 3 celdas over-claim del registro · fixture clean modelaba la traducción X3 prohibida · "verbatim" sin calificar · owner-confirmed sin artefacto de registro) + 8 menores; gates finales: audit-lint clean 0/seeded 1 (17 violaciones, dientes nuevos relaycasebad·hcbad·vpbad·proposedbad·relaybad) · flat/sonic 0 · deny clean 0/seeded 1 (rungs nuevos + forma JSON-quoted disparan; near-misses pasan) · scoper SKILL 499/500 · scrubs limpios. Adelantos logueados: exclusión R1-relay (era E1-05, viaja con su schema — regla de fixtures) · CONTRA-8 prosa (era E1-08, misma oración editada) · reglas normativas de acquire (R-B-8/EV-2 prosa; mecánica sigue en E1-12). Wins que muerden verificados: W-5 (cuarentena codificada+capada) · W-12 (lint real re-corrido) · W-1/W-4 (fixture sonic-spare en forma) · W-14 (postura E1-01 intacta). Nota: citas de línea del plan para E1-07 driftearon (handoff-format:102 → ~117; SKILL:96/135-136/280-281 vigentes al cierre de este item).
- 2026-07-05 — **E1-01 done** (branch `claude/v5-e1`). Postura NS-H escrita como spec corta en `font-acquisition.md` (§License posture nueva + Axis-2 re-ruteado + boundary re-scopeado a redistribución) y los 2 pasajes espejo de builder `SKILL.md` (WHAT per-font + Stage 4) alineados en el mismo commit — cero drift prosa↔prosa (clase CONTRA-8). En prosa shipped la postura entra con nombre legible ("license = dependency + confirmation, never a capability gate"), sin token NS-H (regla de scrub de IDs internos). Clave: file-ausente = dependencia real (fidelity GAP, igual que antes) vs license-sin-confirmar = GAP de confirmación visible que JAMÁS degrada render/capacidad; único gate real = redistribución (bundled/self-hosted); anti-gaming pre-sembrado (borrar la referencia jamás premia — hook para E1-09/K-B-6). Invariante W-14 conservado (GAP visible + solicitud de confirmación). Gates: SKILL.md 384/500 · cero ID interno · brand-scrub limpio · cero código/schema tocado (fixtures no disparan). Nota para E1-09: `validate-audit.md:18` define "build-grade" con "commercial-licensed font files" — reconciliación de esa arista va con CONTRA-3 en E1-09, no aquí. E1-02 NO arrancado (espera prompt propio del chat).
- 2026-07-05 — **E0 cerrado.** E0-01 done: gallery congelada con commits locales (onyx `025cc64` 7 files · cuenca `f709915` · klim `994cd3a` · radiotopia `3153b43` · essential ya limpio @ `ae2d7ee`); gate `git status` limpio 5/5; cero push (E-O1). Descubrimiento: los docs del ciclo en main (@ 6850056) difieren de las copias locales pre-subida (quedaron respaldadas en stash del repo del skill); main es canónico. RESIDENT actualizado (log del ciclo). Etapa vigente → E1; arranca E1-01 en `claude/v5-e1`.
- 2026-07-04 — Enmiendas post ronda pre-plan v6 (4 flags de la superficie no-leída, OK del operador): E1-04 path sin-fuente para CREATE (fidelity jamás false-bloquea, W-1) · E1-02 carga la representación proposed-en-cuarentena en el contrato (evita segundo bump en v6/T2) · E3-01 codifica el curator-wall como regla escrita (hoy 0 menciones en el repo) · E1-08 declara el deferral de .tokens.json (mata CONTRA-9 candidata). Limitations actualizado con las decisiones v6: resolver NO, OI-J post-v6, F4 = kit capability, mirror = GitHub Action. PLAN v6 preliminar tallándose en chat (F0–F4 + cierre).

## Limitations

- Este plan NO re-narra problemas ni evidencia — todo se resuelve por ID contra el análisis. NO cubre v6 (doc propio, preliminar tallado 2026-07-04, se finaliza post stress-test v5): diferidos v6 = T2, F4 (como capability del kit), mirror Drive (GitHub Action + asset-index), migración `.tokens.json` + verificación/reparación del hop downstream (web-stack-skills). Decisiones tomadas: resolver-adoption NO (P-J-01 — se revisita solo si un consumidor real lo exige); OI-J build-grade FUERA de v6, horizonte post-v6 gated en demanda real de marca no-visual-primaria.
- Los reports forenses y los handoffs originales del test v4 NO son insumos de este plan.
- Esfuerzos S/M/L y dimensionamiento = inferring; se recalibran al cierre de cada etapa.
