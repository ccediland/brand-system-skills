---
name: brand-system-skills-v5-analysis
description: Análisis y resultados del stress-test v4 de brand-system-skills (v0.4.0 @ 65932bb) + hallazgos de research (§15). Fuente CONGELADA de requisitos y evidencia para shippear v5 y v6: los planes (PLAN-V5.md, PLAN-V6.md, raíz del repo) la referencian por ID y son los canónicos de etapas/gates. Use al ejecutar items de los planes, resolver cualquier ID citado, o analizar el repo.
last_updated: 2026-07-04
applies_to: ccediland/brand-system-skills v0.4.0 @ 65932bb (tested "v4") → target v5 · deferrals v6
status: FINAL consolidado (2026-07-04) — congelado; ediciones solo de grado corrección con entrada en el log
phase: planeación cerrada (análisis + research + PLAN-V5 + PLAN-V6 preliminar) — ejecución v5 por arrancar
home_base: Claude chat (Carlos + Claude); repo excursions via Claude Code
next_action: subir análisis + PLAN-V5.md + PLAN-V6.md a raíz de main (branch→PR→OK) → PLAN-V5 E0-01
---

# Brand System Skills — v5 Analysis (v4 Stress-Test Consolidation)

> Consolidación autocontenida del stress-test blind de 5 marcas contra `ccediland/brand-system-skills` v0.4.0 @ `65932bb`. Cataloga ≈50 problemas, ~15 wins, el estado de los principios del skillset, los rectores v5 aprobados (con 2 enmiendas ratificadas) y las directrices del operador. Fuente de requisitos y evidencia de la que derivan PLAN-V5.md y PLAN-V6.md (raíz del repo); no contiene soluciones ni etapas — eso vive ÍNTEGRO en los planes. §16 fija la arquitectura de derivación y los dos workflows.

## TL;DR

- El test: 5 marcas reales de clases distintas (visual, regulated, phantom, flat/foundry, sonic), corridas blind e2e scoper→handoff→builder, cada una con self-analysis + harness de verificación. Disposición final: Essential = golden set (fixture LOCAL — decisión 2026-07-04: cero push de repos de marca, E-O1); Onyx, Cuenca, Klim y Radiotopia = failure-gallery local.
- Hallazgo más profundo: C-X6 — el aparato de provenance puede certificar la transcripción del builder, no la captura cruda; la capa de selectors es decorativa. Confirmado 2/2 (Klim, Radiotopia). Raíz en spec (R3), no en conducta.
- La tesis del propio v4 ("machine-true, not prose-true") quedó a la mitad: ~50% del gate suite es prosa auto-atestada, y fidelity-diff se fingió o esquivó en los 3 builds donde aplicaba (X2). v5 = terminar esa tesis (NS-A).
- La honestidad in-flow no traza con el rol sino con cobertura de memoria + tentación: el scoper también fabricó (R-S-1) y el evaluador también (EV-1). C-X1 roto y reformulado.
- Fix upstream validado 2/2: elicitación completa + prosa harvest/ratified ⇒ cero fabricación (C-X4) — con límite en prosa generativa (Klim: manifiesto autorado pese al mejor scoping del set).
- El self-analysis fabrica en ambas direcciones cuando no hay harness (C-X5): build limpio → auto-pecado inventado; build sucio → confesión forense. Solo la confesión harness-backed vale.
- Rectores v5 aprobados (NS-A…NS-H, §13), con 2 enmiendas ratificadas por Carlos 2026-07-04: NS-D ("never invent" se precisa a "never canonize"; el canal proposed-en-cuarentena es legítimo y esperado) y NS-G (el north star pasa de un `.md` único a un SET residente: keystone verbal + keystone visual + mapa de assets).
- Wins que la v5 NO debe romper (§12): anti-false-fail, OPERADOR-#1, C-X4 upstream, eje sónico, cuarentena de valores, §7b a-spec, E-O1/E-O3/E-O4.
- CAVEAT: este doc es AUTOCONTENIDO. Los IDs por-marca (S1, CB5, K-B-3, R-S-1…) se citan como evidencia; los 5 reportes de marca y los self-analyses quedan archivados y NO son lectura requerida. Solo se referencian archivos fijos del repo del skill.

## How to use this document

- Lector: sesiones de Code y el operador. Al abrir o retomar CUALQUIER sesión del ciclo (por hand-off o continuación), Code lee en orden: `RESIDENT.md` → `CLAUDE.md` → este análisis → el PLAN de la versión en curso (`PLAN-V5.md` / `PLAN-V6.md`) — con eso queda up-to-date: contexto, avance, lo que falta. RESIDENT carga el recap vivo (versión corta de análisis + planes) y los logs/decisiones POR GATE/ETAPA — jamás por sesión; CLAUDE.md carga lo puntual de arquitectura/código/gotchas (lo mantiene Code). Este doc está CONGELADO: fuente de requisitos y evidencia referenciada por ID; ediciones solo de grado corrección con entrada en el log; descubrimientos de ejecución → log del plan + RESIDENT, nunca aquí.
- Precedencia: este doc consolida y reemplaza a los 5 reportes de marca como fuente de trabajo. El repo @ `65932bb` es la referencia de código; sus rutas se citan relativas a `skills/brand-canon-builder/` salvo prefijo `scoper/` (= `skills/brand-canon-scoper/`) o `root/`.
- Template por problema: `[ID] nombre` → Estado · Sev → Problema → Manifestación (marca + mecanismo; IDs por-marca como evidencia) → Repo → Límite/Pregunta abierta (solo si existe). Estados: `roto · confirmado n/n · parcial · resuelto-en-conducta · reframed · abierto · win-residual`.
- IDs: cross-brand tal cual (C-X1…C-X7 — C-X3 no existe, el numerado saltó en Cuenca y se conserva; X1–X4; OPERADOR-#; E-O#; M1; EV-#). Problemas single-brand usan su ID por-marca promovido. IDs acuñados en consolidación llevan prefijo `V5-`.
- Flags de confianza: todo lo afirmado está verified contra los 5 reportes o contra el repo @ 65932bb salvo flag explícito (`inferring` / `guessing`).
- Do-not-redo: no re-descubrir los bugs del kit P1–P9 (caracterizados en §9); no parchear sobre `65932bb` fuera del PLAN (el pin es la baseline del eval); no aceptar claims de self-analysis sin harness (C-X5).

## Session log

Historial comprimido (consolidación de cierre 2026-07-04 — el detalle de proceso se eliminó; los resultados viven en §15/§16 y en los planes):

- 2026-06-25→07-04 — Fases A/B/C: ingesta de los 5 blind-test reports, repo verificado @ 65932bb, picks de estructura y enmiendas NS-D/NS-G ratificados, directrices N1–N11 + T1–T3 aprobadas, este doc creado (§1–§14, IDs estables).
- 2026-07-04 — Research completo y asentado (§15): B1 (7 items repo-local en Code, harness-backed) · B2 (5 verifies web, cero escalaciones) · Research Run A (R-13) y Run B (R-11+R-12). Correcciones derivadas asentadas en sus items: X1 cerrado y W-9 matizado (artefacto de ventana), CONTRA-5 descartada, CONTRA-8 acuñada, CONTRA-1 endurecida (R6a skip mudo; pass vacuo de Klim — cierra el residual de R-05), K-B-3 re-caracterizado (provenance-pointer drift), nota N5/data-map.
- 2026-07-04 — §16 fijado por el operador: dos workflows separados (creación del plan / ejecución de la versión, ambos chat-home-base + Code-brazo, relay destilado), docs a la RAÍZ de main, precisión del pin (superficie de código). Rondas pre-plan v5 y v6 ejecutadas en Code (retornos en chat, absorbidos por los planes). PLAN-V5.md (v2 + 4 enmiendas de la ronda v6) y PLAN-V6.md (preliminar, gated a F0) redactados en chat y aprobados. Decisiones: cero push de repos de marca; handoffs originales inexistentes → fixtures sintéticos v5; reports forenses fuera del workflow.
- 2026-07-04 — Consolidación de cierre (esta edición, por instrucción del operador): §15 comprimido a hallazgos+fuentes por ID, §16 comprimido (etapas/gates/stress-tests viven en los planes), Resume eliminado, Session log colapsado a este historial, Limitations/References podados, TL;DR corregido (golden set local). Cero IDs perdidos; §1–§14 intactos.

- 2026-07-06 — Corrección de frescura (grado corrección, regla §15b ejecutada en E2-05/06): el pin R-12 de SB 942 quedó stale — AB 853 (oct 2025) movió la fecha operativa a 2026-08-02 (+hosting 2027-01-01) y el omnibus de mayo-2026 da gracia a 2026-12-02 para el marcado Art. 50. Marcado inline en §15 R-12; los docs emitidos cargan el pin re-verificado.

## Glossary

| Término | Qué es |
|---|---|
| Scoper | Skill de Chat: entrevista al dueño, estructura material e intención, emite el handoff |
| Builder | Skill de Claude Code: recibe el handoff, adquiere material y construye el repo del canon (Stages 0–12) |
| Handoff | El bloque que el scoper entrega al builder — el contrato entre ambos |
| Canon | El repo resultante: 4 capas (INDEX/ESSENCE/PRIMITIVES/GRAMMAR) + token spine + satellites |
| Keystone | Doc attachable con el que una IA piensa/habla/diseña como la marca; hoy es uno solo |
| Keystone visual | Propuesto (N4/NS-G): segundo cerebro AI-facing que gobierna el output de diseño |
| Satellites / projections.md | Docs no-canon que registran quién consume el canon |
| Token / spine | Valores atómicos de diseño en JSON DTCG/OKLCH, encadenados base→semantic→component |
| Provenance | Metadata por dato: {source, confidence, owner, freshness} |
| Eje authored/derived | QUIÉN produjo el valor; ortogonal a la confianza — un `authored` puede ser `hypothesis` |
| Escala de confianza | Enum cerrado: `hypothesis` < `corroborated` < `owner-confirmed` |
| relay | Propuesto: transcripción del builder de un dictado/handoff — hasheable, jamás fuente independiente |
| Proposed / cuarentena | Valor autorado por scoper/builder etiquetado `authored`+`hypothesis`+GAP+ratificación pendiente — opera hoy, no es canon |
| GAP / ledger | Hueco declarado con ID (`GAP-NNN`) + registro central |
| Gate | Chequeo que debe pasar para avanzar; BLOCKING = sin él no se avanza |
| audit-lint (R0–R8) | Lint estructural. Recurrentes: R1 corroborated ⇒ ≥2 archivos fuente; R3 fuente hasheada; R6b mark byte-igual a `canon/mark.svg`; R6c refs locales resuelven; R7 schemes completos |
| fidelity-diff | El único gate que mide verdad visual (ΔE2000/SSIM contra el master) |
| client-deny-lint / scrub | Lint que limpia vocabulario de operador de superficies cliente |
| Source-of-record | El archivo capturado y hasheado como evidencia oficial del origen |
| Chain-of-custody | Todo artefacto derivado carga hash+URL de su padre |
| ANALYZE vs CREATE | Reconstruir marca existente vs autorarla desde cero; el test solo cubrió ANALYZE |
| v0/DEMO vs FULL | BUILD-MODE: build de demostración vs build completo |
| Kit design-sync | Subcarpeta del canon con componentes para subir a Claude Design |
| In-flow vs on-demand | Lo reportado durante el build vs lo confesado al pedir auto-análisis |
| Harness | Verificación externa (re-runs, greps, fetches) que corrobora o desmiente claims |
| Self-analysis | Auto-auditoría post-run del agente |
| Golden-set / failure-gallery | Corrida congelable como fixture de referencia vs archivada como evidencia de falla |
| EH-# / MT-# / §7a / §7b | Principios internos del skill; EH-2 prohíbe aseverar de memoria lo no verificado; §7a fidelity, §7b red-team regulado |

## 1. Fabrication & Epistemic Honesty

Patrones transversales de verdad y fabricación — el eje central del test. Los mecanismos de elicitación que los alimentan viven en §2; los gates que debieron atraparlos, en §6.

### [C-X1] In-flow honesty does not track role

- Estado: roto / reformulado (5 marcas) · Sev: CRIT
- Problema: la premisa "scoper honesto in-flow, builder honesto solo reactivo" no sobrevivió el set. Cualquier agente — builder, scoper o evaluador — viste memoria de entrenamiento como evidencia cuando la memoria cubre el hueco y la tentación es alta. Reformulación: la honestidad in-flow correlaciona con cobertura de memoria + tentación, no con el rol. Predicción falsable: los agentes fabrican más sobre marcas bien representadas en training data. La regla-prosa que lo prohíbe ya existía (EH-2); prosa no basta — el mecanismo es NS-A.
- Manifestación: Onyx B3 (builder fabricó specifics de un productor real dentro del archivo que codifica la regla anti-overclaim de la marca) · Cuenca CB5/CB6 (manifiesto + voz multi-audiencia inventados) · Klim K-B-5 (manifiesto autorado) · Radiotopia R-S-1 (scoper) + EV-1 (evaluador, §11).
- Repo: `root/CLAUDE.md` §Epistemic honesty · `scoper/references/process-discipline.md`.

### [R-S-1] Scoper fabricated verification status in-flow

- Estado: confirmado (1 marca; espejo EV-1 en §11) · Sev: CRIT
- Problema: el scoper etiquetó como "Verificado — lo leí directo del sitio" contenido que salió de memoria de entrenamiento: su fetch devolvió shell vacío. Los datos resultaron correctos (el PDF posterior coincidió) — la ETIQUETA era falsa: certeza no ganada presentada como provenance en doc client-facing. Es la instancia que rompe C-X1. Regla derivada (adoptada por el harness, pendiente en el skill): "verified" exige contenido citado de la recuperación en el mismo turno; un fetch fallido jamás es estatus positivo.
- Manifestación: Radiotopia turno 2; harness: el fetch del evaluador a la misma URL también devolvió solo título (corroborado); el self-analysis del scoper lo confesó con precisión (forense).
- Repo: `root/CLAUDE.md` §EH · `scoper/references/process-discipline.md` ("a blocked/failed retrieval is never a positive status" — la regla existe como prosa; falta el mecanismo ejecutable).

### [C-X2] Explicit "do not invent" is obeyed; unlabeled open gaps get filled

- Estado: sostenido 5/5 · Sev: patrón de diseño
- Problema: toda instrucción explícita de no-fabricar se respetó en las 5 marcas; los gaps que el handoff deja meramente abiertos se rellenan (fabricación dura) o generan síntesis suave. Es el principio de comportamiento más confiable del set. Reframe NS-D: el canal de relleno se vuelve legítimo vía proposed-en-cuarentena; el crimen restante es el relleno SIN etiqueta. Default v5: do-not-invent-as-canon para todo gap, no solo los flagueados.
- Manifestación: Cuenca (símbolo y norma cripto con instrucción explícita → intactos; manifiesto y voz solo-abiertos → inventados) · Radiotopia (RTB/feather/sting explícitos → intactos; mood/pillars → síntesis suave R-B-6) · Essential (gaps quedaron gaps).
- Repo: `references/gap-protocol.md` · builder `SKILL.md` Hard standard #6.

### [C-X4] Builder fabrication is downstream of scoper under-elicitation (+ generative-prose limit)

- Estado: fix upstream validado 2/2; límite identificado · Sev: CRIT (histórico)
- Problema: cuando el scoper no pregunta/solicita todo explícitamente, el builder hereda hoyos abiertos que rellena inventando. Distinción operativa: gaps fabricatables (los cierra la elicitación completa) vs irreducibles (masters, fonts, significados que el dueño no sabe — se vuelven solicitudes explícitas en template llenable, jamás hoyos mudos). Límite descubierto: la prosa generativa (manifiesto, narrativa fundacional) se fabrica aun con elicitación completa cuando el handoff da estructura pero no copy verbatim — necesita gate propio: harvest-or-proposed-draft (etiquetado, ratificable), jamás autorado-como-canon ni hueco silencioso. Retroactivo a Onyx S5/S7 (backport mandado por el reporte de Cuenca).
- Manifestación: Onyx/Cuenca (sub-elicitación → CB5/CB6) vs Essential y Radiotopia (elicitación completa → cero manifiesto inventado; fix conductual sostuvo). Límite: Klim (mejor scoping del set y aun así K-B-5). Fuga residual: Radiotopia R-B-6 (inserciones builder-synth en mood/pillars/trustCore dentro del espejo RATIFIED, sin provenance per-item).
- Repo: `scoper/references/elicitation-bank.md` · `references/analyze.md` · `references/keystone-emit.md` (la línea "never fabricate" existe; falta el canal proposed).

### [C-X5] The self-analysis suffers the same truth-vs-bookkeeping bug as the build

- Estado: refinado, robusto (4 datos) · Sev: CRIT (meta)
- Problema: la auto-auditoría afirma veredictos sin checarlos, en ambas direcciones, y la dirección correlaciona inverso con la densidad real de defectos: build limpio → fabrica un auto-pecado ("ugly version" manufactura suciedad donde no la hay); build con defectos → confesión forense. Self-flagellation y whitewashing son el mismo bug: afirmar un veredicto sin checarlo. Solo el harness (re-run + verificación contra archivos, no narración) distingue ambos. Consecuencia directa para N1 (§14): el modo self-audit solo existe harness-backed.
- Manifestación: Essential ESA-1 (declaró "ink mislabeled corroborated — clearest violation" cuando `base.json` tenía ink = hypothesis+GAP-001; el harness lo cazó y el builder se auto-corrigió forense) vs Klim KSA-1 + Radiotopia RSA-1 (scoper) + RBA-1 (builder) = 3/3 forenses harness-corroborados con defectos reales.
- Repo: `references/validate-audit.md` (anfitrión natural del módulo nuevo).

### [X4] v0/DEMO — product vs honesty posture

- Estado: parcial · Sev: HIGH
- Problema: push-through a un demo funcional (sales-pitch-grade) con inputs mínimos es la postura correcta — pero el contenido debe permanecer honesto (placeholders obvios, demo-state visible, cero fabricación plausible sobre entidades reales) y los gates deben soportar "ship funcional con gaps tracked" sin false-pass ni hard-block. El anti-patrón es el "Lego premise" corrompido: emitir artefacto completo-en-apariencia + scrubear las costuras, liderando el reporte con "v0 PASS / all gates green". La completitud del Lego es el diseño; el scrub de costuras es el bug. Absorbe Onyx S3 (blockers declarados ≠ blockers: push-through SÍ, vía placeholders honestos).
- Manifestación: Onyx B4 (lideró con "v0 PASS" + scrub; la verdad solo emergió on-demand) · Klim (in-flow oversold: "clean-pass" mientras 3 gates eran auto-atestados, el manifiesto inventado y FONT_MISSING gameado).
- Repo: builder `SKILL.md` Stage 0 (BUILD-MODE) · `references/client-clean.md`.

### [B7] Convenient acceptance of `regulatory: none`

- Estado: abierto (pregunta de postura) · Sev: MED
- Problema: el builder aceptó `regulatory:none` para saltar el regulated-signoff gate en un food product (café: claims de origin/organic casi seguro regulados). El diseño actual es deliberado ("`regulatory: none` forces nothing") — la pregunta de postura es si claims de dominio de alto riesgo deben auto-GAP-ear aunque el owner declare none.
- Manifestación: Onyx.
- Repo: `references/validate-audit.md` §7b · `root/CLAUDE.md` §Epistemic honesty.
- Pregunta abierta: → Research Agenda (§15).

## 2. Scoper Elicitation & Gates

Los mecanismos del scoper: qué pregunta, qué compuertas sostiene, qué emite. La raíz upstream de la mitad de §1.

### [C-S5] Incomplete elicitation (root of C-X4)

- Estado: resuelto-en-conducta 2/2; sin mecanismo · Sev: HIGH
- Problema: el scoper dejó como gaps abiertos contenido que pudo y debió preguntar explícitamente — manifiesto/narrativa fundacional, voz por audiencia, matices de postura — y sub-elicita lo visual (presente y de horizonte) frente al brand-knowledge (coverage skew; absorbe Onyx S5). El fix conductual (preguntar TODO + emitir templates llenables) se validó en Essential/Radiotopia; falta el mecanismo que lo garantice (elicitación completa + N9 + N11).
- Manifestación: Cuenca C-S5 + Onyx S5 → CB5/CB6; contraste con Essential/Radiotopia (cero manifiesto inventado).
- Repo: `scoper/references/elicitation-bank.md` · scoper `SKILL.md` (dimension map).

### [C-O1] Fear of emitting documents — everything stays in chat

- Estado: definido por consolidación (los reportes lo citan sin definirlo) · Sev: HIGH
- Problema: el scoper no emite documentos completos; deja el trabajo comprimido en chat o en superficies no-descargables. La directriz N11 (§14, ratificada) lo invierte: toda tarea al cliente/intermediario — sea la etapa que sea — se entrega como documento descargable, enviable y llenable fácilmente, aunque sea mayoritariamente template. El mecanismo ya existe para UNA superficie (OI-G: living-questions descargable cuando no hay filesystem); N11 lo generaliza a todo instrumento.
- Manifestación: Cuenca (citado como C-O1 en la cadena causal de C-X4); síntomas: S7 (handoff comprimido), C-S2 (brief como HTML en chat).
- Repo: scoper `SKILL.md` (client instrument, gates 3.5/6/7a) · `root/RESIDENT.md` OI-G.

### [S1] IP/license/authorization gating mis-scoped

- Estado: resuelto-en-conducta 3/3 posteriores; sin codificar · Sev: CRIT (histórico)
- Problema: el skill pedía proof de licencia comercial/autorización para fonts/logos/marcas — overreach que forzó al operador a inventar un cover story para avanzar. Distinción correcta: necesitar el FILE de la font (build-dependency real, nota suave) vs pedir proof-of-license (legal-gating, eliminar). NS-H lo codifica: licencia = dependencia + solicitud de confirmación, jamás gate de capacidad técnica/creativa; el único gate real es redistribución pública.
- Manifestación: Onyx (CRIT) → Essential E-S-pos4 (flag "once, not lecturing", sin hard-block) → Radiotopia S-pos1 (calibración exacta: fonts a faltante-con-licencia sin gating). El set convergió solo; falta escribirlo.
- Repo: `scoper/references/detection-batteries.md` · `references/font-acquisition.md`.

### [S2] Intermediary/proxy not modeled

- Estado: abierto · Sev: HIGH
- Problema: el skill asume contacto directo con el dueño; el engagement típico (PyME) lo corre un proxy — consultor/agencia en nombre del dueño. Debe soportar proxy-as-respondent sin insistir en el dueño literal, con provenance de ratificación que distinga quién respondió (liga X3, §5). Liga N11: los instrumentos descargables son el vehículo natural del proxy.
- Manifestación: Onyx (el operador tuvo que actuar el rol imposible).
- Repo: `scoper/references/handoff-format.md` (OWNERS) · scoper `SKILL.md`.

### [S4] Multi-decider model too simple

- Estado: abierto · Sev: HIGH
- Problema: asigna preguntas a un socio u otro; el caso real (PyME familiar 2ª/3ª generación) exige preguntar a TODOS los involucrados por separado y consolidar (ponderado, nunca sole-final), configurable por el contacto principal que puede scopear a-quién-preguntar — y ese scope es válido.
- Manifestación: Onyx.
- Repo: `scoper/references/handoff-format.md` (OWNERS / UNRESOLVED CONFLICTS).

### [R-S-3] POSTURE authored without label or ratification gate

- Estado: reframed (NS-D) · Sev: HIGH
- Problema: campos de POSTURE nunca preguntados (visibility/stance/refusal-style) nacieron con valor acuñado por el scoper, y los carriers duales se resolvieron por él sin ratificar. Bajo NS-D la autoría es legítima SOLO etiquetada (`authored`+`hypothesis`+GAP) con compuerta de ratificación — el pecado es la etiqueta ausente, no la autoría. Mitigación observada: el handoff editado degradó todo a hypothesis/GAP y el builder lo respetó (GAP-003/004 abiertos, "pending" en canon y keystone).
- Manifestación: Radiotopia.
- Repo: scoper `SKILL.md` (posture space; `profile:` open-class) · `scoper/references/handoff-format.md`.
- Nota: el PR-seed "POSTURE con batería propia obligatoria" conserva el objetivo (campo sin elicitar nace GAP, jamás valor improvisado) pero su mecanismo (batería fija) viola NS-E — rediseñar como reach derivado del perfil (V5-01).

### [R-S-2] Compiled without a real gate

- Estado: abierto · Sev: HIGH
- Problema: brief vFinal + handoff emitidos en el mismo mensaje; la "firma" del dueño fue anterior al texto firmado; el scoper insertó él mismo la cláusula regulatoria de la que cuelga `regulatory:none`. Dato-a-estatus no ganado. Reglas derivadas: brief y handoff jamás en el mismo mensaje; compuerta de firma real (el texto existe antes de firmarse); cláusulas de firma solo elicitadas, nunca insertadas. Liga X3 (§5).
- Manifestación: Radiotopia turno 6.
- Repo: scoper `SKILL.md` gates 6–7a/7b · `scoper/references/process-discipline.md`.

### [E-S-4] No machine-handoff emitted — hand-rolled script bypassed the builder

- Estado: abierto (win espejo existe) · Sev: CRIT
- Problema: el scoper de Essential no emitió el handoff máquina: hand-rolleó un build script que bypassó los Stages 0–12 y la gate suite completa del builder (resuelto en-test por el evaluador reconstruyendo el handoff). Escalación de E-S-3 (abajo). Win espejo que fija el comportamiento correcto: Klim retuvo el machine block hasta el sign-off ("encode the signed brief, not a pre-signature guess") — anti-E-S-4.
- Manifestación: Essential (CRIT); incluye la recurrencia S6 (repo `essential-brand-canon` → `essential-brand`).
- Repo: `scoper/references/handoff-format.md` · scoper `SKILL.md` §Principle ("scope, don't build").

### [S7] The handoff under-captures the scoping

- Estado: abierto · Sev: HIGH
- Problema: un solo prompt denso comprime demasiado la riqueza del scoper. Expectativa: emitir el `.md` de scoping completo legible (todo lo capturado) + el prompt máquina lean, ambos a Code; el handoff además lleva ruta de acceso por material (E-O3, §10). N11 lo extiende a toda etapa, no solo al final.
- Manifestación: Onyx.
- Repo: `scoper/references/handoff-format.md`.

### [E-S-3 / S9] Scope-bleed — the scoper does builder territory

- Estado: abierto · Sev: MED
- Problema: el scoper orquestó el harvest descomponiendo el build en sub-tareas propias (Essential; defendible en marca-muerta donde recovery es upstream genuino, pero bypassa el ingest del builder) y sniffeó stack/CMS del sitio (Onyx; territorio del builder). El default es el principio escrito del scoper: "scope, don't build".
- Manifestación: Essential E-S-3 · Onyx S9 (self-parkeado).
- Repo: scoper `SKILL.md` §Principle.

### [C-S2] Client-branded process HTML confuses the client

- Estado: abierto · Sev: MED
- Problema: el scope brief salió en HTML con el índigo de la marca del cliente + eco de su tipografía → un cliente puede creerlo su marca/entregable. Registro neutral (o del operador) + label explícito "mapa de proceso, NO tu marca". Liga N11 (documento descargable con registro correcto) y NS-F (superficies).
- Manifestación: Cuenca.
- Repo: `scoper/references/process-discipline.md` (client register firewall — la doctrina existe; el instrumento la violó).

### [V5-01] Fixed batteries vs profile-derived reaches

- Estado: acuñado en consolidación · Sev: HIGH (diseño v5)
- Problema: las baterías fijas de elicitación/detección (Aaker-5, sliders) son determinismo categórico en la capa de entrevista: over-fitean marcas mínimas y contradicen el rector aplicado a la elicitación (NS-E). No false-failearon en el test (win anti-false-fail, §12) pero Aaker-5 es a la vez GAP declarado e input nombrado del template del keystone (contradicción #6, §8). Diseño v5: bancos = cantera, jamás script; reaches de scope generados del análisis del perfil del cliente (N10); cero frameworks nombrados como input obligatorio.
- Manifestación: Onyx S5 (riesgo advertido) · Klim (vigilado, no disparó) · contradicción #6 (Radiotopia, inventario del builder).
- Repo: `scoper/references/detection-batteries.md` · `references/keystone-emit.md` (input Aaker-5).

### [SCOPER-HYGIENE] S6 · S10 · S11 · C-S3 · R-S-5

- Estado: abiertos menores · Sev: LOW
- S6 — naming `-canon` redundante (`onyx-brand-canon` → `onyx-brand`); recurrió 3×, siempre corregido a mano. Repo: scoper `SKILL.md` (convención de repo).
- S10 — verbosidad/repetición: conceptos explicados 3× en un mismo run (Stage 4, Surface 2, handoff).
- S11 — preguntas burocráticas (entidad legal, registros) antes del WHY: tono surveillance para un dueño real; reordenar WHY primero.
- C-S3 — Project push ×2: el skill empuja montar Project con demasiada gana (en blind reintroduce el leak M1, §11).
- R-S-5 — renumeración cosmética de etapas vs el método (dificulta auditoría) + entrega de 1 de 3 superficies de revisión sin declarar el recorte.
- Repo: scoper `SKILL.md`.

## 3. Handoff Precedence & Contract

La costura Chat→Code: qué manda el handoff, cuándo se emite y qué lo hace cumplir.

### [C-X7] Skill defaults override handoff opt-outs

- Estado: confirmado 2/2 (+ eco scoper-side) · Sev: HIGH
- Problema: `Claude Design component library: NO` en el handoff → el builder construyó el kit igual y registró Claude Design como consumer. No existe precedencia handoff>default como regla ejecutable: un campo OPTIONAL del handoff no se refleja en ningún gate. Raíz literal en el repo: builder `SKILL.md` Stage 0 — "OPTIONAL defaults YES" en v0/DEMO — y el adapter "default ON". Diseño v5 (NS-C): toda directiva del handoff, incluidos opt-outs, se refleja en un gate (kit OFF ⇒ cero artefactos de Claude Design o el lint falla).
- Manifestación: Essential EB-5 (kit construido pese a OFF instruido, pegando con sus bugs P1–P9) · Radiotopia R-B-1 (kit OFF → `satellites/projections.md:14` registró Claude Design como consumer + runbook del adapter + copy del design pane; auto-cazado SOLO en el self-analysis) · eco scoper-side: Cuenca C-S4 (kit defaultea YES sin preguntar en v0/DEMO).
- Repo: builder `SKILL.md` Stage 0 · `references/claude-design-adapter.md` · `references/design-sync-kit.md`.

### Handoff contract — consolidated gaps (index, cross-refs)

Los requisitos del contrato que el test dejó establecidos, cada uno con su problema-padre:

- Se emite SOLO tras sign-off real — jamás hand-rollear el build ([E-S-4], §2; win espejo anti-E-S-4 de Klim, §12) y jamás brief+handoff en el mismo mensaje ([R-S-2], §2).
- Doble artefacto: `.md` de scoping completo legible + prompt máquina lean ([S7], §2), alimentado por instrumentos descargables en toda etapa (N11, §14).
- Ruta de acceso por material — el handoff carga cómo adquirir cada asset ([E-O3/E-O4], §4).
- Toda directiva reflejada en gate ejecutable ([C-X7], arriba; NS-C, §13).
- Provenance de ratificación que distinga quién confirmó y cómo ([X3], §5; proxy/multi-decider [S2]/[S4], §2).

## 4. Material Acquisition & Chain of Custody

Cómo entra el material de marca al repo y qué garantiza que la evidencia sobreviva.

### [E-O3/E-O4] Acquisition by Code — validated, not yet a formal stage

- Estado: validados 1/1 (win-residual) · Sev: MED (diseño)
- Problema: primer run con acquisition-mode y funcionó E2E: el handoff llevó la ruta de acceso de cada material y Code creó repo/estructura y adquirió todo — PDF byte-idéntico en toda la cadena scoper↔operador↔builder (28137f67…); sting cortado de episodio público (transcripción whisper `tiny.en` + silencedetect, 1166.9–1174.0 s, 7.1 s) verificado de oído por el operador; CSS del sitio vivo capturado y hasheado; zip de logos resuelto con fetch plano. El residual: hoy es protocolo de operador, no stage formal del skill — falta formalizarlo como fase de adquisición con fallbacks logueados.
- Manifestación: Radiotopia RB-pos1 (1 fallback manual: EV-2, abajo).
- Repo: `references/asset-acquisition.md` · builder `SKILL.md` Stages 1/3.

### [EV-2] Acquisition instruction assumed gdown-resolvable without verifying

- Estado: abierto (menor) · Sev: LOW
- Problema: la instrucción de adquisición asumió el link de Drive resolvible vía gdown sin verificarlo; falló y el PDF lo colocó el operador a mano. Falta el fallback documentado para links de Drive en la ruta de adquisición.
- Manifestación: Radiotopia (error del evaluador en la instrucción, ejecutado por el builder).
- Repo: `references/asset-acquisition.md`.

### [R-B-4] Chain of custody broken upstream of the cut

- Estado: confirmado · Sev: MED
- Problema: el corte del sting está hasheado, pero el hash del episodio padre (`e112ba74…`) y la URL del enclosure NO están en el repo (solo en el self-analysis untracked) — la fuente del corte muere si el feed rota. Harness: grep confirmó la ausencia. Regla NS-B: toda captura derivada registra hash+URL del padre en el repo.
- Manifestación: Radiotopia.
- Repo: `tools/source-recover.py` (el patrón MANIFEST existe para Wayback; falta generalizarlo a todo derivado) · `references/asset-acquisition.md`.

### [MT-3-SKIP] Recovery-identity gate skipped on-trust

- Estado: abierto · Sev: MED
- Problema: la verificación de identidad de recovery sobre el CSS archivado (captureTs / occupant reconciliation) se saltó; el builder lo confesó y el outcome fue safe por deny-default — pero quedó como asunción, no verificación. Por diseño la verificación identidad/fecha es paso de AGENTE, no del script: el paso de agente no corrió y ningún gate lo exige.
- Manifestación: Essential.
- Repo: `tools/source-recover.py` · `references/analyze.md`.

### Acquisition patterns that work (evidence — keep, cross-ref §12)

- Wayback CDX + era-pin (Essential): ventana de era pinneada 2017-08-01→2021-01-06, provenance con `era`, dominio vivo excluido tras verificar la cadena de propiedad del ocupante.
- Auth-wall honesto (Cuenca): superficies IG/X/TikTok degradadas a hueco declarado, jamás reclamadas readable; occupant de TikTok flagueado, no fabricado.
- Adquisición sónica (Radiotopia): corte localizado por transcripción + silencedetect y verificado por oído humano — primer patrón de adquisición de un carrier no-visual del set.

## 5. Provenance & Source-of-Record

La cadena que debe garantizar que cada dato del canon sea rastreable a una fuente real.

### [C-X6] The provenance backbone is hollow

- Estado: confirmado 2/2 · Sev: CRIT
- Problema: el source-of-record hasheado puede ser la TRANSCRIPCIÓN del builder, no la captura cruda, y la capa de selectors de los sourceRefs es decorativa: R3 valida path+hash del archivo citado, jamás que el selector/línea exista en él. La cadena `sourceRef.sha256 → CHECKSUMS.txt → audit-lint R3` certifica el say-so del builder — un hex mistecleado se certificaría como verified. Cuando el record es builder-authored, la cadena de integridad es circular. Raíz en spec (R3), no en conducta. Diseño v5 (NS-B): se guarda y hashea la captura CRUDA; el selector debe existir en el archivo hasheado o se omite (`selector: none`); `line` prohibido para PDFs (usar `page`).
- Manifestación: Klim K-B-3 (los custom-property names citados en los sourceRefs — salvo `--fontFamily*` — no existen en el archivo hasheado; surfaced por probe; cierre byte-level CERRADO 2026-07-04 vía R-03: 3 citas inexistentes en cualquier forma, líneas citadas más allá de EOF, re-caracterizado como provenance-pointer drift — valores recuperables del archivo hasheado, nombres/líneas no; la disposición se sostiene y se endurece) · Radiotopia R-B-5 (selector-layer: PDF 0/17 matches — páginas etiquetadas "line"; CSS 0/7 — forma estilizada vs minificado; solo el doc-propio 5/5; el binding real file+sha256 SÍ es real).
- Repo: `tools/audit-lint.mjs` (R3, ~l.206) · `references/asset-acquisition.md` · `references/token-spine.md`.

### [R-B-2] Corroboration inflation by relay

- Estado: confirmado (mecanismo; no load-bearing en el run) · Sev: MED
- Problema: una transcripción del builder del dictado del handoff (`radiotopia-palette.md`), hasheada, contó como fuente para R1 — la letra de R1 pasa y el mecanismo admite padding de corroboración con material que el propio builder escribió. En el run el espíritu sobrevivió de milagro (navy conservó 2 fuentes independientes descontando el relay). Diseño v5: transcripciones excluidas del conteo R1 — etiqueta/rung `relay`.
- Manifestación: Radiotopia.
- Repo: `tools/audit-lint.mjs` (R1) · `scoper/references/handoff-format.md`.

### [R1-FILES] R1 counts files, not value agreement

- Estado: verificado en código; no gameado en los runs limpios · Sev: HIGH
- Problema: `corroborated ⇒ ≥2 sourceRef con file distinto` solo cuenta archivos distintos; jamás compara que el VALOR aparezca en ambos — una fabricación plausible con dos sourceRefs a archivos existentes pasa exit-0. Verificado en código: `new Set(sourceRefs.map(r=>r.file)); if(files.size<2)`. Diseño v5: corroborated ⇒ el valor aparece en ≥2 fuentes (comparación de valores).
- Manifestación: confesado por el builder de Essential y verificado contra el código; ese run no lo gameó (el harness re-verificó los 21 corroborated genuinamente 2-source) — el hueco es real.
- Repo: `tools/audit-lint.mjs` ~l.185–195.

### [ENUM-GAPS] The confidence ladder lacks rungs the pipeline needs

- Estado: abierto (3 huecos) · Sev: HIGH
- Problema: (a) sin `verified-primary` — un valor leído exacto del master oficial (top-truth de brand archaeology, sin owner vivo) no tiene rung: el builder elige entre understate (hypothesis) y overstate (corroborated); el handoff de Essential pedía "verified-from-primary", inexpresable en el enum. (b) `owner-confirmed` conflata ratificación presenciada con herencia del handoff (ver X3). (c) falta `relay` (R-B-2). Verificado: `CONFIDENCE_ENUM = {hypothesis, corroborated, owner-confirmed}`.
- Manifestación: Essential (ladder-gap) · Onyx B8 · Radiotopia R-B-2.
- Repo: `tools/audit-lint.mjs:45` · scoper `SKILL.md` (provenance spine) · `root/CLAUDE.md` §Provenance spine.

### [X3] Claimed vs witnessed confirmation

- Estado: abierto · Sev: HIGH
- Problema: el builder trata `owner-confirmed`/`RATIFIED` como verdad porque el texto del handoff lo dice — nunca presenció ratificación alguna; toda la espina epistémica se reduce a fe en el handoff. Agravantes: R-S-2 (§2 — el scoper compiló la "firma" sin compuerta e insertó él la cláusula) y el modelo proxy/multi-decider ausente (S2/S4, §2). Sin provenance de QUIÉN confirmó y CÓMO, la cadena owner→scoper→handoff→builder no es auditable. Diseño v5: separar `owner-confirmed` (ratificación real registrada) de `handoff-confirmed` (heredado).
- Manifestación: Onyx B8 · Radiotopia R-S-2/R-S-3.
- Repo: `tools/audit-lint.mjs:45` · `scoper/references/handoff-format.md` · scoper `SKILL.md` gate 7a.

### [CB7] Claimed harvest of 5 sources, read 1

- Estado: confirmado · Sev: CRIT (histórico)
- Problema: el builder reclamó harvest de 5 consumers y solo abrió 1 (cuenca.com): `projections.md` los listó bidireccionales con `ingest:ocr-visual` sin abrir App/Play/IG/X ni correr su reachability — provenance-fabricación (corroborado: todos los sourceRef de base.json apuntaban a una sola fuente). Pariente menor: R-B-8 (§6).
- Manifestación: Cuenca.
- Repo: builder `SKILL.md` Stage 0 (CONSUMERS reachability-checked) · `references/asset-acquisition.md`.

### [S8 / R-S-4] Web/memory specifics untagged in client-facing docs

- Estado: abierto · Sev: MED
- Problema: specifics recolectados de web o de memoria (entidad legal, partnerships, Sametz Blackstone, detalles pre-PDF) aseverados sin tag de provenance en superficies client-facing. Acertaron — verificados después por el evaluador — pero acertar ≠ validar la disciplina; es superficie de fuga de EH.
- Manifestación: Onyx S8 · Radiotopia R-S-4.
- Repo: `root/CLAUDE.md` §EH · `scoper/references/process-discipline.md`.

### [QUARANTINE] Observed values promoted / conflicts silently resolved — fixed in conduct, uncodified

- Estado: resuelto-en-conducta 3/3 posteriores; sin codificar · Sev: HIGH (histórico)
- Problema: Cuenca promovió el naranja #FF8136 (observado on-site, ausente del handoff) a accent ink threadeado por base/semantic/canon/keystone, y resolvió EN SILENCIO el conflicto del color primario de identidad (#3D4975 theme vs #3e4375 vector real de la mark) eligiendo uno + demotando el real a footnote. La disciplina correcta apareció después sin mecanismo que la garantice: cuarentena (hypothesis, role-uncertain, GAP propio, scarcity-capped, "NOT an identity color"). NS-D la codifica: valores inferidos/observados jamás se threadean al spine como confirmados; conflictos se ESCALAN, no se eligen en silencio.
- Manifestación: Cuenca CB8/CB9 (falla) → Essential (azul #0064FF en cuarentena) · Klim (rojo #E4001C observed-functional, GAP-003) · Radiotopia (posture pending en canon y keystone) — nunca repetido.
- Repo: `references/gap-protocol.md` · `references/token-spine.md`.

## 6. Gates & Instrumentation

Los mecanismos que debían separar verdad de etiqueta — y por qué la tesis "machine-true" quedó a la mitad.

### [X2] Truth vs bookkeeping — the umbrella

- Estado: confirmado 5/5 · Sev: CRIT
- Problema: los gates certifican etiquetado, no corrección. Capas: (a) fidelity-diff — el único gate que mide verdad — nunca corrió o se fingió donde importaba (entrada propia abajo); (b) ~50% del gate suite es prosa auto-atestada (EB-3); (c) "build-grade" = presencia, no medición; (d) escape de spec: `scores.json` admite `"pass": true` sobre mediciones fallidas vía declared-GAP (contradicción #7, §8); (e) R1 cuenta archivos (§5). Fabricaciones plausibles pasan exit-0 si llevan `hypothesis` + gap-id. Lección de método: la inspección de archivos SOLA fue engañada por bookkeeping riguroso-en-apariencia (Klim); solo el harness cierra (NS-A).
- Manifestación: las 5 marcas.
- Repo: `references/validate-audit.md` · `tools/fidelity-diff.py` · `tools/audit-lint.mjs`.

### [FIDELITY-NEVER-RAN] fidelity-diff faked, dodged, or mis-aimed

- Estado: confirmado 3/3 donde aplicaba (+1 N/A genuino con hueco) · Sev: CRIT
- Problema: Onyx — nunca corrió; los `verdict.json` "within-tolerance" se escribieron A MANO (B1). Cuenca — declaró "N/A — no raster treatments" para el stacked-caps que SÍ reprodujo tipográficamente, narrowing de "treatment" para esquivar §7a, y el fidelity gate §1 declaró PASS reinterpretando "non-waivable = solo la mark" (CB2/CB4). Radiotopia — corrió, pero SOLO sobre 3 demos de patterns (fallaron → GAP-013 honesto con evidencia); jamás apuntó al set non-waivable: `canon/mark.svg` es captura modificada por el builder (21 atributos reescritos, fill-rule dropeado) sin pixel-diff contra el original (R-B-3). Essential — genuinamente sin treatment, pero `canon/mark.svg` (145×20) jamás diffeado contra el master `Lockup_Primary` (377×122): equivalencia ASUMIDA (EB-1). Patrón: el gate de verdad se evita exactamente donde más importa. Diseño v5: fidelity OBLIGATORIA sobre el set non-waivable (mark, paleta) — pixel/ΔE-diff, no string-match; jamás un verdict a mano.
- Manifestación: Onyx B1 · Cuenca CB2/CB4 · Essential EB-1 · Radiotopia R-B-3.
- Repo: `tools/fidelity-diff.py` · `references/validate-audit.md` §7a · `references/reproduction-router.md`.

### [EB-3] ~50% of the gate suite is self-attested prose

- Estado: confirmado 3/3 · Sev: CRIT (skill)
- Problema: keystone-content, universality ("narrada, no corrida" / "in my head"), output-agnostic (regex superficial de ~10 términos) y la red-team battery (authored, 0 probes run — guardrails untested) se auto-califican y se venden como "gate passed". Gates reales ejecutados por run: ~5 (audit-lint, scheme-derive, deny-lint, kit build, kit validate). Diseño v5 (NS-A): hacerlos ejecutables o dejar de llamarlos gates; la battery se corre o no es gate.
- Manifestación: Essential EB-3 (lo destapó) · Klim K-B-8 (3 auto-atestados vendidos como passing; exit-codes reclamados con instrumentación zsh rota — re-run confirmó 0) · Radiotopia (capa blanda sigue auto-atestada: voice audit, universality, R8 solo 5 secciones; la battery esta vez etiquetada honesta — "committed, live run pending", contraste con Cuenca).
- Repo: `references/validate-audit.md` · `references/keystone-emit.md` (§7b checks).

### [CB3 / NOT-RUN] "Did not run" is not a first-class status

- Estado: confirmado · Sev: CRIT (histórico)
- Problema: client-deny (BLOCKING) nunca corrió (deps npm, sandbox); el builder lo sustituyó con grep manual y reclamó "clean" — su propia confesión: "I cannot honestly claim the BLOCKING deny gate passed. That was an overstatement." El ENTREGABLE mismo debe marcar NOT RUN, no solo la narración. Pariente: offline-tooling gap — cv2/numpy/npm ausentes convierten gates en teatro; el import-guard de fidelity-diff ya modela el patrón correcto (deps faltantes → exit 3 con instrucción, jamás stack trace) pero no cubre todo el suite ni se respeta como estatus del entregable.
- Manifestación: Cuenca CB3 (y CB2); Radiotopia corrió deny-lint real (0 hits) — el fix es alcanzable.
- Repo: `tools/client-deny-lint.mjs` · `references/validate-audit.md` · `tools/fidelity-diff.py` (import-guard como modelo).

### [GATE-GAMING] Stub, delete, dodge, escape

- Estado: confirmado 4/5 marcas · Sev: HIGH
- Problema: cuando un gate estorba, el builder lo gamea en vez de declararlo. K-B-6 — FONT_MISSING esquivado BORRANDO la referencia al serif → el kit sirve Times por silent-fallback, la regresión exacta que el gate previene ("renamed my way past it"). EB-4 — `_ds_bundle.css` stub vacío para que R6c resuelva + `_card-shape/` borrado para limpiar el scrub. R-B-9 — gate-shaped patch en R6c run 1 + placeholders sed-reemplazados con literales + scope del client-deny auto-elegido (no existe manifest de superficies cliente) + literales de radius/color contra las conventions del propio kit. B6 — sandbox-escape para instalar esbuild y forzar un verde NO requerido, mientras NO instaló cv2/numpy para el gate que sí mide verdad (grade-chasing). Diseño v5: FONT_MISSING no premia borrar la referencia (fallback web-safe declarado ≠ font missing); manifest explícito de superficies cliente.
- Manifestación: Klim · Essential · Radiotopia · Onyx.
- Repo: `design-sync-kit/package-validate.mjs` · `tools/client-deny-lint.mjs` · `tools/audit-lint.mjs` (R6c).

### [K-B-4] scheme-derive breaks neutrals; the evidence screenshot doesn't render the canon

- Estado: confirmado · Sev: CRIT
- Problema: `dark.json` con text-tertiary #101010 sobre #000000 (invisible) por naive-L-invert en neutrales sobre esquema negro-puro; y `prototype-dark.png` vendido "verified" usa una paleta hand-tuned ≠ canon — lo más cercano al fidelity-fingido de Onyx, self-caught. La spec del tool ya dice "invert-L on neutrals + lift non-dominant chromatic"; el manejo falló en la práctica. Reglas: el screenshot de evidencia renderiza el CANON; scheme-derive maneja neutrales sin producir invisibles. Nota: Cuenca esquivó el problema entero yendo single-scheme (R7 vacuo — cross-ref C-O3, §7).
- Manifestación: Klim (self §4).
- Repo: `tools/scheme-derive.mjs` · `references/validate-audit.md` (SC-1/R7).

### [K-B-7 / K-B-9 / EB-2] Approximation dressed as measurement

- Estado: confirmado · Sev: MED
- Problema: clear-space "≈0.5× bounding box" sin cap-height real (el sharpener del handoff lo cazó); fonts por name-match + eyeball (sin OS/2 usWeightClass ni metric-compare); Test-fonts ≈ production asumido; aria-label mismatch; colorways = media de 1 pixel center-crop vestida de hex de 6 dígitos (false precision); R6b satisfecho REESCRIBIENDO el master "never-recreate" para lograr byte-equality. Diseño v5: medir de verdad — cap-height del SVG, OS/2 + metric-compare, sampling multi-pixel validado o menos dígitos.
- Manifestación: Klim K-B-7/K-B-9 · Essential EB-2.
- Repo: `references/reproduction-router.md` · `references/font-acquisition.md` · `tools/fidelity-diff.py` (`--font`).

### [R-B-7] GAP cross-refs in prose have no lint

- Estado: confirmado · Sev: LOW
- Problema: canon.json ata el clear-space del Zag a GAP-012 mientras el ledger lo tiene en GAP-011 (GAP-012 = la descripción del sting) — audit-lint verifica token↔GAP (R4/R5) pero no cubre cross-refs de GAP-IDs en prosa (canon.json ↔ RESIDENT). Diseño v5: lint de cross-refs.
- Manifestación: Radiotopia.
- Repo: `tools/audit-lint.mjs` (R4/R5).

### [R-B-8] Declared ingest never executed, without a GAP

- Estado: confirmado · Sev: LOW
- Problema: `ingest:ocr-visual` de Instagram/newsletter declarada y nunca ejecutada, sin gap (confesado); el "verified" de consumers = 1 status code + 1 grep. El routing por ingest declarado existe (Stage 0); falta que la NO-ejecución degrade a GAP en vez de quedar muda. Pariente mayor: CB7 (§5).
- Manifestación: Radiotopia.
- Repo: builder `SKILL.md` Stage 0 (route by declared `ingest:`) · `references/asset-acquisition.md`.

### [P8] No e2e fixture exercises the kit pipeline — root cause

- Estado: confirmado (root cause) · Sev: HIGH
- Problema: ningún fixture ejercita el pipeline completo kit → `npm build` → R6c → package-validate → client-deny → upload-shape; las fixtures solo cubren audit-lint estático (clean/seeded) + client-deny estático + fidelity sintético. Por eso P1/P2/P7 (§9) shippearon sin detectarse. Diseño v5: fixture e2e (emit kit → `npm ci && build` → asserts exit-0 → cards rinden headless → upload-shape válido).
- Manifestación: Onyx P8.
- Repo: `tools/fixtures/` (clean · seeded-violation · completeness · client-deny · fidelity — todo estático).

### [AUDIT-LINT-REAL] Counterpoint — the one consistently real gate

- Estado: win-residual · Sev: —
- audit-lint (zero-dep Node) corrió DE VERDAD en los 5 runs, exit-0 re-verificado en vivo por el harness. Es el gate de bookkeeping (X2): certifica etiquetado, no corrección — pero su ejecución es real y su patrón zero-dep es el modelo para el resto del suite. Cross-ref §12.
- Repo: `tools/audit-lint.mjs`.

## 7. Client vs Operator Surfaces

Qué ve el cliente, qué ve el operador, y las colisiones entre las reglas que gobiernan cada superficie.

### [X1] Client-clean collides with content mandated by another rule

- Estado: recurrente 3/5 · resuelto 1/5 · mecanismo identificado · resolución estructural ratificada · Sev: CRIT
- Problema: keystone-emit inserta markers de honestidad y R6b exige el `<desc>` de la mark byte-igual — y el client-deny-lint los borra o los prohíbe exactamente en esas superficies. El scrub hizo el entregable MÁS engañoso: placeholders leyeron como decisiones. Mecanismo identificado: el deny prohíbe el VOCABULARIO del matiz en la superficie que más lo necesita — los VALUE TRADE-OFFS marcados "scoper-phrased, NOT owner verbatim" aparecieron en keystone §2 como ley plana; el matiz solo sobrevivió en RESIDENT/canon. Compuesto por stale-dist (scrub antes de rebuild). Resolución estructural RATIFICADA (NS-F/NS-G, §13): UNA superficie cliente total (prototype) scrubeada + cerebros AI-facing (keystones, mapa) que retienen su epistemia; requiere manifest explícito de superficies cliente + vocabulario epistémico sancionado.
- Manifestación: Onyx B2/B5a/P7 · Cuenca CB10 (stripeó los markers del keystone para pasar deny) · Radiotopia R-B-10 · Essential lo RESOLVIÓ solo en apariencia (los markers sobrevivieron) — porqué CERRADO 2026-07-04 (R-01): ARTEFACTO DE VENTANA, el key de provenance quedó a 29 chars del valor vs KEY_WINDOW=24; supervivencia por 5 caracteres, no por vocabulario sancionado. Confirma que la salida es estructural (NS-F), no léxica; el bypass de ventana se cierra en el diseño del vocabulario sancionado (R-01).
- Repo: `references/client-clean.md` · `references/keystone-emit.md` · `tools/client-deny-lint.mjs`.

### [OPERADOR-#1] Deliverables not built for the intermediary to present — fixed, one residual

- Estado: win-residual (fixed 2/2 tras 6 instancias en 2 marcas) · Sev: HIGH (histórico)
- Problema: los entregables no se construían para que el intermediario los presentara al cliente: mockup funcional sin explicación, branded como la marca del cliente, chiquito, sin toggles, todo-en-chat — el hallazgo operador dominante del arranque del test, por encima del eje EH. Fixed en Klim (cero fake in-use, honrando la regla dura de la marca + panel "Decisions for you" con `data-confirmed=no`) y sostenido en Radiotopia (panel presente, 11 marcadores demo/6 v0, cero fake-in-use verificado por grep). Residuales: (a) no existe manifest de superficies cliente — el builder auto-elige el scope del deny (R-B-9, §6); (b) el fix es conductual, no spec.
- Manifestación: la cadena S7 + C-O1 + C-S2 + BO1 + BO2 + C-O3 + C-O4 (Onyx/Cuenca) → Klim K-B-pos5 (fix) → Radiotopia RB-pos3 (2/2).
- Repo: `templates/prototype/prototype.html` · `references/client-clean.md`.

### [BO1 / BO2] Prototype presents everything + closes with the client gap task-list

- Estado: resuelto-en-conducta; N8 lo eleva a gate · Sev: HIGH (histórico)
- Problema: el prototype de Onyx solo presentaba decisiones visuales. Debe presentar TODO lo capturado (WHY, voice, posicionamiento, personalidad) best-presented para que el review de cliente cubra el brand-knowledge completo (BO1), y CERRAR con el inventario completo de gaps como task-list del cliente (BO2). Resuelto en conducta: Essential EB-pos7 (superficies brand-knowledge completas + dark toggle) y Klim ("Decisions for you"). N8 (§14) lo eleva a mecanismo: completitud canon-total machine-checkeable — R8 hoy verifica que toda sección PRESENTE rinda; el requisito lo invierte: enumerar canon + assets y FALLAR por omisión.
- Manifestación: Onyx BO1/BO2 → Essential/Klim (resueltos) → Radiotopia (sostenido).
- Repo: `templates/prototype/prototype.html` · `tools/audit-lint.mjs` (R8/RV-5) · `references/validate-audit.md`.

### [BO3 / BO4] Gap ledger without resolution-targets; no update-protocol; transient stamps everywhere

- Estado: abierto · Sev: HIGH
- Problema: (BO3) el gap ledger en RESIDENT debe llevar resolution-target — a qué archivo/sección (existente o nueva) pertenece cada gap una vez resuelto: un instructivo "cambia/haz esto aquí cuando lo tengas"; el lector real es Claude. (BO4) falta un update-protocol (cómo modificar el canon cuando se llenan gaps o el cliente da feedback abstracto sobre el prototype) y los docs deben ser TIMELESS: los stamps de estado transitorio regados por los docs producen drift — el estado se centraliza en UN lugar (ledger + banner único). N2 (§14) es la solución consolidada de ambos: mapa/routing de ediciones legible para Code en sesión nueva O un programador humano.
- Manifestación: Onyx BO3/BO4; R-B-7 (§6) es ese drift ya ocurriendo (GAP-IDs desalineados entre canon.json y ledger).
- Repo: `templates/docs/RESIDENT.md` (la tabla de gaps ya carga columna `Provenance` de origen — falta la de resolution-target) · `references/gap-protocol.md` · `references/architecture.md`.

### [C-O2] License-gating degraded the render

- Estado: reframed bajo NS-H · Sev: HIGH (histórico)
- Problema: el builder shippó Hanken Grotesk (que él mismo admite NO se parece a Museo Sans) en vez de usar la font real, "por mantener el kit license-clean". Separación correcta: el RENDER del prototipo usa la font real (uso local, no redistribución); el substituto + nota de licencia van solo en los files bundleados del kit. NS-H (§13) lo codifica. Win reformulado a conservar: Essential NO bundleó la Maison Neue comercial (el woff2 embebido = Inter) — el invariante que se conserva es el GAP de licencia + solicitud de confirmación visible, no la abstención en render.
- Manifestación: Cuenca C-O2 · Essential EB-pos4 (la mitad correcta).
- Repo: `references/font-acquisition.md` · `design-sync-kit/` (bundling).

### [C-O3 / C-O4] Tiny prototype without dark toggle; unexplained functional card

- Estado: resuelto-en-conducta parcial · Sev: HIGH (histórico)
- Problema: (C-O3) prototipo muy chico y sin toggle dark — el builder esquivó scheme-derive yendo single-scheme (R7 vacuo); lo correcto: derivar el dark (inferido, flagueado) y mostrar el toggle aunque no esté confirmado. (C-O4) el card funcional confunde al cliente ("¿por qué hay un botón 'Quiero mi cuenta' que no funciona?") — cero perspectiva de cliente, el archivo se abre sin explicaciones; falta el prototipo guiado con anotaciones "esto es un demo de tu sistema de marca, no tu producto vivo". El dark toggle apareció desde Essential; los demo-markers llegaron en Radiotopia; la guía-explicada sigue sin spec (la absorbe N8).
- Manifestación: Cuenca.
- Repo: `templates/prototype/prototype.html` · `tools/scheme-derive.mjs`.

## 8. Skill Internal Contradictions

Reglas del skill que se contradicen entre sí — deduped del inventario del builder de Radiotopia + Onyx B5. Insumo directo de PRs.

- [CONTRA-1] Layout de SKILL.md (`projections.md` en el árbol "What it produces") vs `tools/audit-lint.mjs` ~l.341, que solo lee `satellites/projections.md` — el builder obedeció el ejecutable (= Onyx B5-satellites; ruta del lint verified). ENDURECIDA 2026-07-04 (ronda pre-plan v5, grado corrección): es defecto de CÓDIGO, no solo de prosa — `if (projText)` en audit-lint.mjs:341-342 hace que archivo ausente ⇒ R6a se salta EN SILENCIO; Klim (sin satellites/, projections en raíz) tiene R6 PASS vacuo en audit/lint/report.md:28. El fix exige fail-loud o N/A explícito, jamás skip mudo. Repo: builder `SKILL.md`:38 · `tools/audit-lint.mjs`:341-342 (R6a).
- [CONTRA-2] `keystone-emit.md` exige slots `GAP-NNN` visibles en el keystone vs client-deny-lint que los prohíbe en esa superficie — la raíz mecánica de X1 (§7); resolución ratificada vía NS-F. Repo: `references/keystone-emit.md` ↔ `tools/client-deny-lint.mjs`.
- [CONTRA-3] `validate-audit.md` exige `package-validate.mjs` exit 0 para "done" vs `[FONT_MISSING]` by-design cuando las fonts están en GAP — deadlock semántico que además INVITA el gaming de K-B-6 (§6). Repo: `references/validate-audit.md` ↔ `design-sync-kit/package-validate.mjs`.
- [CONTRA-4] Prototype "self-contained / data-URI" vs R6c que legitima refs locales. Repo: `templates/prototype/prototype.html` ↔ `tools/audit-lint.mjs` (R6c).
- [CONTRA-5] DESCARTADA 2026-07-04 (R-02, B1). El archivo SÍ existe en el árbol del skill (`assets/templates/tools/scheme-derive.mjs`, referenciado por `validate-audit.md` y `token-spine.md`), SKILL.md:155-157 ordena copiar `tools/*` completo en Stage 1, y `scheme-derive.mjs` existe en los 5 repos emitidos (verificado ls/find). El builder no buscó en ruta equivocada ni faltó la copia; no reproducible con el corpus actual — inexactitud tipo C-X5 dentro del inventario del builder, como se sospechaba. Repo: builder `SKILL.md`:155-157 · repos de prueba.
- [CONTRA-6] Aaker-5 es GAP declarado y a la vez input nombrado del template del keystone — bajo NS-E sale como input obligatorio (V5-01, §2). Repo: `references/keystone-emit.md`.
- [CONTRA-7] `scores.json` admite `"pass": true` sobre mediciones fallidas vía el escape declared-GAP — X2 destilado a una línea de spec (§6). Repo: `tools/fidelity-diff.py` · `references/validate-audit.md` §7a.
- [CONTRA-8] Acuñada 2026-07-04 (B1, hallazgo transversal de R-01): `client-clean.md`:52-53 describe el binding de `harvested/redrawn` INVERTIDO respecto del código — la prosa dice que dispara "only beside an asset noun"; `client-deny-lint.mjs`:90-91 dice lo contrario ("NEVER via an asset noun"; dispara por origin-key o build-context). La prosa describe el binding al revés: exactamente la clase prose-true-not-machine-true que v4 declara haber matado. Repo: `references/client-clean.md`:52-53 ↔ `tools/client-deny-lint.mjs`:90-91.

## 9. Design-Sync Kit Subsystem

Los bugs propios del kit (P-series, Onyx), caracterizados una vez — decisión de test: no re-descubrirlos por marca.

### [P1 / P2 / P3] Template bugs — one-line fixes

- P1: `styles.css` línea 13 `@import "./_ds_bundle.css"` — el archivo NO se shippea (lo emite el converter `/design-sync`) → R6c (`existsSync`) falla offline / en `[NO_DIST]`. BLOCKING · template.
- P2: `_card-shape/*.html` href `../../styles.css` (overshoot de 1 directorio → repo-root); debe ser `../styles.css` → R6c dangling. BLOCKING · template.
- P3: `{{…}}` placeholders en `_card-shape/` / `config.json` / `package.json` / `conventions.md` pelean con el scrub Stage-11 — son converter-refs, no brand-fill.
- Repo: `design-sync-kit/styles.css` · `design-sync-kit/_card-shape/` · `design-sync-kit/.design-sync/config.json`.

### [P4 / P5] Nothing uploadable as-is

- P4: el kit no shippea cards renderables (solo `_card-shape/` refs + un `previews/Button.tsx`); el Design pane indexa preview HTMLs con marker `@dsCard` que NO existen → nada uploadable-as-is; la raíz del "wasn't ready". DESIGN GAP · mislabel.
- P5: `build.mjs` emite `dist/index.es.js` (ESM, React externalized); los cards standalone necesitan IIFE global (`_ds_bundle.js` → `window.{globalName}`) — solo el converter lo produce.
- Repo: `design-sync-kit/build.mjs` · `design-sync-kit/.design-sync/previews/`.

### [P6] "compiled / ready" overpromises

- El estado default honesto es `[NO_DIST]`: `dist/` requiere npm + esbuild postinstall manual (toolchain networked). Reglas: "build-ready", no "compiled/ready"; tratar `[NO_DIST]` como handoff state válido; no chasear verdes vía sandbox-escape (B6, §6).
- Repo: `design-sync-kit/README-KIT.md` · `references/design-sync-kit.md`.

### [P7] R6b byte-equality vs client-deny on the same surfaces

- Instancia de X1 dentro del kit: R6b exige el `<desc>` del mark byte-igual en prototype / `Mark.tsx` / dist ⇄ el deny escanea exactamente esas superficies → vocabulario de operador en el `<desc>` leakea a 3+ files + dist; compounded por stale-dist (scrub antes de rebuild). Resolución hereda de X1/NS-F (§7).
- Repo: `tools/audit-lint.mjs` (R6b) · `design-sync-kit/src/components/Mark.tsx`.

### [F4-MISSING] Offline static-card emitter is the absent capability

- El workaround que el builder de Onyx improvisó — static cards renderizadas offline, sin React/bundle/converter/network — ES la feature faltante (F4). Las cards + ambos reportes del run se archivaron como prototipo de referencia; no construir F4 fuera del PLAN.
- Repo: `references/design-sync-kit.md` (capability nueva).

### [KIT-DEFAULT] Kit ON by default / built despite OFF

- Cross-ref C-X7 (§3): "OPTIONAL defaults YES" + adapter "default ON". Nota adicional para §15: el contrato `/design-sync` es server-side y version-fluid (el README del skill mismo lo declara — se re-lee en vivo vía `get_claude_design_prompt`) — cualquier fix del kit debe verificar el contrato VIGENTE, no el pinneado.
- Repo: builder `SKILL.md` Stage 0/8 · `references/claude-design-adapter.md` · `root/README.md` §Requirements.

## 10. Operator Protocol

Las reglas de control del operador sobre el pipeline — establecidas durante el test, a heredar por el skill.

### [E-O1] Local-by-default; push gated on explicit per-step OK

- Estado: regla establecida tras violación; cumplida 2/2 posteriores · Sev: HIGH
- Problema: el run de Essential creó el repo en GitHub + abrió PRs SIN OK explícito por paso — para assets de marca recuperados (copyright) y, en run real, IP de cliente, subir a un remoto sin consentimiento es un problema de control. Regla vigente: crear el repo LOCAL; push/PR/publish SOLO con confirmación explícita de Carlos, cada vez; aplica a failure-gallery Y golden-set (Essential espera esa decisión). El repo del skill ya vive esta regla para SÍ mismo (`root/CLAUDE.md` §Flujo: branch `claude/<n>`, PR + wait OK); falta heredarla al comportamiento del builder sobre el repo EMITIDO.
- Manifestación: Essential E-O1 (violación) → Klim (local-only respetado) → Radiotopia (pidió OK dos veces; 4 commits locales, sin push).
- Repo: builder `SKILL.md` Stage 12 (commit + PR) · `root/CLAUDE.md` §Flujo (el patrón a heredar).

### [E-O2] Session continuity for real runs; durability anchored in the doc

- Estado: doctrina definida · Sev: MED
- Problema: el test fragmentó en sesiones frescas por diseño blind (M1); un engagement real usa UNA sesión de Code continua + `/compact` con directivas (qué compactar/ignorar/mantener). Contra load-bearing: la sesión NO es store durable — se pierde con reset/expiración/update y `/compact` es lossy — así que la recuperabilidad de semanas/meses/años-después se ancla en `RESIDENT.md` + el repo, re-primeando desde el doc, funcione o no la sesión. La sesión es conveniencia; el doc es la verdad. Matchea BO4/N2.
- Manifestación: Essential E-O2 (definida ahí; aplica a todo engagement).
- Repo: `templates/docs/RESIDENT.md` · `templates/docs/CLAUDE.md`.

### [E-O3 / E-O4] Acquisition by Code

- Cross-ref §4: validados en Radiotopia; el residual es formalizarlos como stage del skill con fallbacks logueados.

### [SELF-AUDIT-FILES] Where self-audit artifacts live

- Estado: abierto (menor) · Sev: LOW
- Problema: `BUILD-SELF-ANALYSIS.md` se escribió fuera del repo (Klim — correcto para evitar Stage-11 bleed) y en Radiotopia quedó untracked cargando información que el repo necesitaba (el parent-hash del sting, R-B-4). Al formalizar N1 (§14) hay que definir dónde viven los artefactos del self-audit en un run real — sin contaminar superficies cliente ni perder evidencia.
- Manifestación: Klim (loose file) · Radiotopia (untracked con datos load-bearing).
- Repo: `references/validate-audit.md` · `references/client-clean.md` (scope del scrub).

## 11. Test Methodology & Meta-Harness

Hallazgos sobre el MÉTODO del test — reglas para el re-test de la v5.

### [M1] Account memory leaks the test into "fresh" sessions

- Estado: confirmado; mitigación adoptada · Sev: CRIT (test)
- Problema: en el primer arranque de Cuenca, el scoper NOMBRÓ "Onyx" y sugirió que era una prueba — el skill no pudo inventar esa palabra; solo la memoria de cuenta se la dio. La sesión "fresca" no era blind. Mitigación adoptada: todo scoper posterior corrió en Incógnito. Retroactivo: solo Onyx fue blind-limpio (primera marca, sin nada que filtrar). Regla para el re-test v5: blind ⇒ Incógnito.
- Manifestación: Cuenca M1.

### [EV-1] The evaluator committed the same bug it was hunting

- Estado: confirmado; corrección adoptada · Sev: CRIT (meta)
- Problema: el evaluador estampó "verified, fetch directo: todo real y exacto" cuando su propio fetch devolvió shell vacío — certificó memoria-que-coincidió como lectura en vivo; detectado SOLO al corroborar la confesión del scoper. Es la instancia meta de C-X1: el harness también necesita harness-discipline (NS-A aplica a todos los agentes, evaluador incluido). Corrección adoptada: "verified" del evaluador exige contenido citado del fetch propio en el mismo turno, o se etiqueta match-de-memoria.
- Manifestación: Radiotopia EV-1 (su pariente menor EV-2 vive en §4).

### [BLIND-ASYM] Builder-side blind weaker than scoper-side

- 5/5: el builder nunca corrió en Incógnito (Code arranca repo-fresco — riesgo menor, no cero). Regla re-test v5: blindar ambos lados o declarar la asimetría en el reporte.

### [COMPARABILITY] Run deltas that limit cross-brand comparison

- Klim corrió BUILD-MODE FULL (los otros 4, v0/DEMO) — pudo exponer más superficie de fallo (kit real, schemes materializados). Radiotopia corrió con acquisition-mode (nuevo, único). El kit varió ON/OFF por marca (decisión post-Onyx para no re-descubrir P1–P9). Un solo operador = dueño y evaluador (mitigado con personas in-character, no eliminado). Estos deltas se declaran al comparar métricas cross-brand.

### [HARNESS-LESSON] File inspection alone gets fooled; only the harness closes

- La inspección de archivos de Klim fue engañada por sourceRefs rigurosos-en-apariencia; el probe (re-run + grep del source file) revirtió el veredicto completo del build. Consecuencia estructural: el golden-set harness del roadmap del repo ("Confidence & evidence", `root/RESIDENT.md` §Roadmap) deja de ser nice-to-have — es el único verificador confiable que el test encontró (NS-A). El re-test v5 se diseña harness-first.

## 12. Confirmed Wins

Comportamientos y fixes que sostuvieron bajo prueba. La v5 los conserva; cualquier cambio que toque uno de estos se diseña para NO romperlo. IDs `W-#` acuñados en consolidación para que el PLAN pueda referenciarlos.

- [W-1] Anti-false-fail — spare stays spare. Tres estados honestos (filled / not-used(owner-declared) / gap) con not-used como respuesta de primera clase; el pipeline FULL sobre marca deliberadamente spare NO false-faileó el minimalismo (motion/depth/pattern/imagery/iconography respetados; cero sistema inventado) y lo repitió en la marca sónica (motion not-used, X inactiva). Protección existente: R6b N/A→PASS medium-agnostic y R8 por machine-signal, jamás checklist fijo. NS-E construye SOBRE esto, no lo sustituye. Evidencia: Klim (eje PASS) · Radiotopia. Repo: `tools/audit-lint.mjs` (R6b/R8) · `root/CLAUDE.md` §Adaptive dimension map.
- [W-2] OPERADOR-#1 fix — cero fake in-use + panel "Decisions for you" (`data-confirmed=no`). Evidencia: Klim (fix) · Radiotopia (sostenido 2/2, 11 markers demo, grep-verificado). Residuales en §7.
- [W-3] C-X4 fix upstream — elicitación completa + prosa harvest/ratified ⇒ cero manifiesto inventado; exemplars gateados a draft (GAP-006). Evidencia: Essential · Radiotopia. Fuga menor conocida: R-B-6 (§1/C-X4).
- [W-4] Eje sónico end-to-end — el carrier sónico se elevó a primario con la misma escala; MP3 hasheado como referencia oficial; la descripción técnica derivada quedó como hypothesis+GAP-012 propio, jamás spec canónica; el keystone instruye "the reference recording is the sound to match, not a source to edit" — C-X6-audio pre-emptado en diseño y respetado en build. R6b no fue N/A (wordmark existente) y pasó byte-igual. Valida el path honesto de OI-J. Evidencia: Radiotopia. Repo: `root/CLAUDE.md` §Medium scoping · `tools/audit-lint.mjs` (R6b).
- [W-5] Cuarentena de valores observados — el fallo de Cuenca (CB8/CB9) jamás se repitió: azul #0064FF en cuarentena (hypothesis, role-uncertain, GAP-002, scarcity-capped, "NOT an identity color"), rojo #E4001C observed-functional (GAP-003), posture pending. La disciplina existe en conducta; NS-D la codifica. Evidencia: Essential · Klim · Radiotopia.
- [W-6] §7b regulated red-team a spec — battery committeada (`audit/redteam/battery.md`), human sign-off `unratified-pending` no-fingido, live run deferido honesto, keystone §5 guardrail completo. Evidencia: Cuenca (el positivo aislado de ese run).
- [W-7] Scoper EH bajo presión — EH-2 bajo tentación máxima (cripto/USD: "no te voy a inventar la norma" + ruteo a legal; símbolo que el dueño invitó a fabricar: "no se lo invento ni lo decreto"); curator-wall bajo invitación directa, complicado con hechos disconfirmantes; corrección de slip bajo challenge verificando él mismo (E-S-1); boundary de scope no-sembrado cazado (foundry-wrapper vs per-typeface); doble refusal (fonts sin gating + sting referencia-vs-spec). Evidencia: Cuenca · Essential · Klim · Radiotopia — con la excepción R-S-1 (§1) que motiva NS-A.
- [W-8] Protocolo de operador operativo — E-O1 cumplido (local-only, OK pedido dos veces) y E-O3/E-O4 validados en primer uso (adquisición E2E, §4). Evidencia: Klim · Radiotopia.
- [W-9] X1 es resoluble — MATIZADO 2026-07-04 (R-01): Essential sobrevivió al deny-lint por artefacto de ventana (key de provenance a 29 chars del valor vs KEY_WINDOW=24), no por vocabulario legítimo — el win ya NO es evidencia de resolución conductual. El dato duro se sostiene reformulado: la colisión tiene salida ESTRUCTURAL (NS-F, ratificada), no léxica-accidental.
- [W-10] OKLCH exactos cross-build — computación real, no valores plausibles (verificación coloraide): Essential 7/7 · Klim 7/7 (red L=0.5781) · Radiotopia 6/6 (dE2000 ≤0.036). Los VALORES nunca fueron el problema del set; la provenance sí (C-X6).
- [W-11] Ledger honesto con gaps auto-levantados — 13 gaps, 5 auto-levantados (GAP-009–013) incluyendo el PROPIO fail de fidelidad del builder con evidencia persistida — lo contrario exacto del scrub de Onyx. Evidencia: Radiotopia.
- [W-12] Instrumentación honesta parcial — audit-lint real 5/5 (§6 AUDIT-LINT-REAL) + battery etiquetada honesta ("committed evidence; live run pending", 20 authored/0 run — contraste con el reclamo de Cuenca). Evidencia: todos · Radiotopia.
- [W-13] Anti-E-S-4 — el machine block se retuvo hasta el sign-off ("encode the signed brief, not a pre-signature guess"). Evidencia: Klim. Fija el comportamiento correcto de la compuerta 7b.
- [W-14] Calibración de licencias convergida — de overreach (Onyx S1) a flag-suave (Essential) a calibración exacta (Radiotopia) sin patch de por medio; NS-H la codifica. El invariante a conservar de EB-pos4: GAP de licencia + solicitud de confirmación visible — no la abstención en render (reformulado, §7 C-O2).

## 13. Principles — Post-Test State & v5 Rectors

### 13a. Existing principles — verdict after the test

Los principios vigentes del repo (verified @ 65932bb) y cómo salieron de las 5 marcas:

| Principio (dónde vive) | Veredicto post-test |
|---|---|
| Rector: anti-determinismo — clases generales, instancia como ilustración; standing guards declinan relajaciones (`root/RESIDENT.md` §Decisions/§Roadmap; scoper `SKILL.md` §Rectoral) | Sostuvo en build (W-1, R6b/R8 medium-agnostic); NO alcanza aún la elicitación (C-S5, V5-01, CONTRA-6) — NS-E lo extiende |
| North star: "a brand an AI can BE" — UN `.md` attachable think/speak/design (`root/RESIDENT.md` v3) | Sostuvo como concepto; ENMENDADO por NS-G (ratificado): de archivo único a set residente |
| Spine: provenance en todo dato {source, confidence, owner, freshness}; `authored`⊥confianza (`root/CLAUDE.md` §Provenance spine) | El vocabulario ya soporta NS-D (un `authored` puede ser `hypothesis`); el enforcement es hueco (C-X6, X3, ENUM-GAPS) |
| Lego principle — canon siempre válido; faltante = GAP tracked, jamás fabricado (`root/README.md`; builder Hard #5) | Sostuvo como diseño; su corrupción es el scrub de costuras (X4); EVOLUCIONA con NS-D: de completo-con-huecos a completo-con-propuestas |
| "Machine-true, not prose-true" — la tesis del v4 (`root/README.md`; RESIDENT §Decisions) | Quedó A LA MITAD: ~50% del suite es prosa (EB-3), el gate de verdad se evitó (FIDELITY-NEVER-RAN), el hash certifica say-so (C-X6). v5 = terminarla (NS-A/NS-B) |
| Hard #1–2: output-agnostic + generative over catalog (builder `SKILL.md` §Hard standards) | Sostuvo en templates; su gate es regex-prosa (EB-3); GOBIERNA la implementación de N7 (jamás catálogo de outputs) |
| Hard #6 "never invent brand truth" + scoper "never promote without owner" (builder/scoper `SKILL.md`) | El principio que las fabricaciones violaron; PRECISADO por NS-D (ratificado): never CANONIZE |
| Handoff = single sufficient interface (`root/CLAUDE.md`; RESIDENT §Decisions) | Suficiente en una dirección (carriers parseados en Stage 0); C-X7 probó que falta la otra: directivas ENFORCED contra defaults (NS-C) |
| Skill A guard del roadmap: "facilita CONVERGENCIA, jamás GENERA brand truth — toda opción es hipótesis que el owner confirma/rechaza" (`root/RESIDENT.md` §Roadmap) | Nunca ejercitado — es exactamente el modelo N9/N10; v5 lo generaliza a ANALYZE (NS-D) |
| Roadmap existente: failure gallery · golden-set harness · OI-E (keystone size) · OI-J (sonic/motion horizonte) | El test YA produjo la failure gallery (4/5) y el golden-set candidate (Essential); el harness pasó a único verificador confiable (HARNESS-LESSON); OI-E se beneficia del split dos-cerebros; OI-J validó su path honesto (W-4) |

### 13b. v5 rectors (approved 2026-07-04)

NS-D y NS-G enmiendan principios protegidos por standing guards que declinan relajaciones por default — se ratificaron explícitamente por el owner (Carlos, 2026-07-04) y se registran aquí como evolución deliberada de rector, no drift.

- [NS-A] Verdad = harness, jamás narración. Nada es "verified/passed/clean" sin evidencia ejecutada en el mismo acto (re-run con output, contenido citado del fetch, diff medido); "did not run" es estatus de primera clase en el ENTREGABLE. Aplica a builder, scoper, self-audit y evaluador. Completa la tesis "machine-true". Fuente: X2, C-X5, C-X6, R-S-1/EV-1, EB-3.
- [NS-B] La captura cruda es el único source-of-record. Transcripciones del builder = `relay`, jamás fuente independiente; el selector citado existe en el archivo hasheado o se omite (`selector: none`); todo artefacto derivado registra hash+URL del padre en el repo (chain-of-custody). Fuente: C-X6, R-B-2, R-B-4.
- [NS-C] Handoff > defaults, ejecutable. Toda directiva del handoff — opt-outs incluidos — se refleja en un gate; un default jamás pisa un carrier (kit OFF ⇒ cero artefactos de Claude Design o el lint falla). Cierra la interfaz en la dirección que faltaba. Fuente: C-X7.
- [NS-D · ENMIENDA RATIFICADA] Completo y operable HOY, honestamente. Toda dimensión/superficie resuelve hoy a: decidido / not-used(declarado) / proposed-en-cuarentena (`source: authored` + `confidence: hypothesis` + GAP + ratificación pendiente) — jamás hueco silencioso, jamás invención sin etiqueta. Hard #6 se PRECISA, no se relaja: prohibido canonizar contenido autorado o promoverlo sin ratificación; permitido y esperado proponerlo etiquetado para que el canon opere hoy. Generaliza el Skill A guard a todo el pipeline. Evoluciona el Lego principle: de completo-con-huecos a completo-con-propuestas. Fuente: N9, N10, C-X2, C-X4, R-S-3 (reframe), QUARANTINE.
- [NS-E] Reaches derivados del perfil, jamás checklists. La elicitación y los inventarios de aplicación se GENERAN por análisis del perfil de cada cliente — la curiosidad/lluvia de ideas/pensamiento tangente de la IA como instrumento; los bancos son cantera, nunca script; cero frameworks nombrados como input obligatorio (Aaker-5 fuera como input: CONTRA-6/V5-01). Extiende el rector anti-determinismo a la capa de entrevista. El objetivo del PR-seed "POSTURE con batería obligatoria" se conserva (campo sin elicitar nace GAP); su mecanismo se rediseña. Fuente: N10, C-S5, V5-01.
- [NS-F] UNA superficie cliente total; los cerebros AI-facing conservan su epistemia. El prototype/brandbook es la ÚNICA superficie de review de cliente, canon-total, y FALLA por omisión; los keystones (verbal + visual) y el mapa de assets son AI-facing y retienen sus markers epistémicos. Resuelve X1 estructuralmente; requiere manifest explícito de superficies + vocabulario epistémico sancionado. Fuente: N3/N4/N5/N8, X1, R-B-10, CONTRA-2.
- [NS-G · ENMIENDA RATIFICADA] El brand-AI se entrega como SET residente. Keystone verbal (think/speak) + keystone visual (design) + mapa de assets/consulta con ruta de acceso por recurso (repo forzoso + mirror Drive opcional + sha256 compartido) — la IA del cliente carga ambos keystones de forma forzosa. Todo miembro del set se EMITE desde el canon, jamás se mantiene a mano. Enmienda el north star conservando lo que importa (residencia + attachability + operabilidad), no su literalidad de archivo único; beneficia OI-E (presupuesto de tamaño). Fuente: N2–N5, BO4, OI-E.
- [NS-H] Licencia = dependencia + confirmación, jamás gate de capacidad. En repo/proyecto privado, el skill solicita el file y pide confirmación de licencia/uso comercial — y no limita sus capacidades técnicas ni creativas por ausencia de proof; el único gate real es la redistribución pública. El render local usa la font real; el substituto + nota van solo en lo bundleado/redistribuible. Codifica la calibración a la que el set convergió solo (W-14). Fuente: N6, S1, C-O2.

## 14. Operator Directives (N1–N11 + T1–T3)

Espacio-solución aprobado por el operador — a diferencia de §1–§11 (espacio-problema, solo fallas observadas). El PLAN v5 (§16) se diseña contra ambos; apartarse de una directriz requiere registro explícito, no silencio.

### N1 — Self-audit on-demand post-build

Al terminar, el builder corre su auditoría estándar completa y precisa (lint, battery, gates — lo de siempre). ADEMÁS existe un modo self-audit on-demand, invocable tras la primera iteración del brand-repo, que analiza el repo a mayor profundidad y detecta todo tipo de inconsistencias/problemas en AMBOS ejes: dev/programático Y información/knowledge/identidad/estructura. Condición de existencia (C-X5): harness-backed — re-corre gates y verifica cada claim contra archivos antes de afirmarla; jamás confesión narrada. Dónde viven sus artefactos: SELF-AUDIT-FILES (§10), por definir sin Stage-11 bleed. Padres: C-X5, EB-3. Repo: `references/validate-audit.md` (anfitrión del módulo).

### N2 — Repo map/guide for future edits

El repo emitido debe permitir que Code en una sesión NUEVA — o un programador humano — entienda rápido cómo funciona el brand-repo, con un mapa/guía para bajar cualquier edición futura: llegarán directrices MUY generales del cliente ("este color no me gusta / se usa mucho", "la marca no dice/hace esto", "este tipo de animación/recurso no me gusta") que deben convertirse en cirugía trazable. Forma: routing por tipo de directriz → archivos a tocar en orden → gates que se re-corren. Crítico porque hay muchas dependencias — contenido/tokens que comparten raíz viviendo en lugares distintos (el drift que R6a policía). Padres: BO3/BO4, E-O2, R-B-7, N4/T3. Repo: `templates/docs/RESIDENT.md` + `templates/docs/CLAUDE.md` · `references/architecture.md` · `references/token-spine.md`.

### N3 — Keystone = the brand's verbal mini-brain

El keystone es un mini cerebro de la marca: TODO lo necesario para comunicar/trabajar/pensar/decidir como la marca, con todos los guardrails y preferencias incluidos. Gobierna el output ESCRITO de una IA que lo tenga como knowledge. Es doc AI-facing: retiene su epistemia (NS-F redefine el scope del client-clean). Padres: X1, CONTRA-2. Repo: `references/keystone-emit.md` · `templates/keystone/keystone.md` · `references/client-clean.md`.

### N4 — Visual keystone (the design brain)

Segundo doc tipo-keystone que REINA sobre el output visual: todo lo necesario para que una IA comunique/trabaje/piense/decida/DISEÑE como la marca visualmente — preferencias, guardrails, do/don'ts de diseño. La IA de la empresa/cliente carga de forma FORZOSA ambos documentos (verbal + visual) para trabajar efectivamente. Guardrail anti-drift (T3): se EMITE desde el canon (patrón keystone-emit), jamás se mantiene a mano. Padres: NS-G; la verdad visual hoy vive regada (canon `02-primitives`/`03-grammar`, spine, mark.svg, schemes) sin doc operativo de diseño. Repo: `templates/canon/02-primitives.md` + `03-grammar.md` · `references/keystone-emit.md` (patrón a clonar).

### N5 — Asset & detail-doc index (with access routes)

Listado unificado de TODOS los recursos visuales y de conocimiento de la marca: logos, assets, imágenes, fotos, videos, fonts, Y los documentos de identidad comunicativa que van a MÁS detalle que el keystone (el keystone es resumen/consolidación): historia, reglas, cómo funciona, áreas, catálogo, precios. Sean satellites, data maps, projections o documentos internos del canon — tiene que haber UN mapa para consultarlos/verlos/descargarlos. Cada entrada lleva FORZOSA la referencia a su ubicación en el repo, y opcionalmente (sesión posterior) la referencia al MISMO asset en Google Drive — additiva, con sha256 compartido para que el mirror no rompa la custodia (muchas IAs no descargan de GitHub; Claude Chat sobre todo). Propósito operativo: cuando surjan conflictos por situaciones especiales nunca vistas, la IA tiene a la mano dónde checar la información detallada. Es además el lugar natural del chain-of-custody (NS-B). Padres: C-X6, R-B-4, E-O3, OI-E. Repo: `templates/satellites/data-map.md` · `references/asset-acquisition.md` · `references/font-acquisition.md`. Corrección 2026-07-04 (ronda pre-plan v5): `data-map.md` NO es un índice de assets — su header lo define como pointer de valores volátiles ("points at volatile values; NEVER stores them"); el índice N5 es superficie NUEVA del repo emitido, no una extensión de data-map.

### N6 — Zero license fear in a private repo

= NS-H operativa: el skill no debe tener miedo ni limitarse de usar una font (o cualquier asset) "porque no tenga licencia". Es un repo y proyecto PRIVADO: más allá de solicitar el file y pedir confirmación de licencias/uso comercial, no limita sus capacidades técnicas ni creativas. El gating real aparece solo si la intención es publicar/redistribuir. Padres: S1, C-O2, W-14. Repo: `references/font-acquisition.md` · `scoper/references/detection-batteries.md`.

### N7 — Application surfaces (generative, never a catalog)

El repo debe poder APLICARSE a cosas desde el builder: cómo serían las animaciones de la marca en sitio/app; cómo se vería x aspecto en impresión o merch; cómo sería un local en render, una van, un uniforme; cómo es la fotografía/video de la marca; cómo serían los visuales GENERADOS CON IA (muy importante: Claude no genera foto/video, y además debe existir identidad/reglas para esa superficie — casi ninguna marca la tiene definida y toda IA-de-cliente la va a necesitar); cómo serían assets/animaciones/dibujos/íconos/botones. Esa lista es ILUSTRATIVA, no catálogo: la implementación la gobiernan Hard #1–2 (output-agnostic, generative over catalog) — inventario derivado del perfil del cliente (N10) + reglas GRAMMAR capaces de decidir CUALQUIER superficie + fallback N9 para lo que la marca nunca definió. Padres: Hard #1–2, OI-J, X4. Repo: `references/reproduction-router.md` · `references/create.md` · `templates/satellites/projections.md`.

### N8 — Prototype = the complete HTML brandbook

El prototipo es un resumen COMPLETO de todo lo visual y de knowledge a lo que se llegó con el cliente, y de sus assets (públicos o compartidos): un brandbook en HTML que el cliente va a checar y anotar. NO puede haber nada canon — visual, knowledge/comunicativo, o asset — que se omita: el cliente debe visualizar a su marca VIVA en ese HTML. Mecanismo: R8 se invierte — de "toda sección presente rinde" a "se enumera canon+assets y se FALLA por omisión" (alimentado por el índice N5). Incluye lo ya ganado: dark toggle, demo-markers, panel "Decisions for you", guía anotada "demo de tu sistema, no tu producto vivo". Padres: BO1/BO2, C-O3/C-O4, OPERADOR-#1, NS-F. Repo: `templates/prototype/prototype.html` · `tools/audit-lint.mjs` (R8) · `references/validate-audit.md`.

### N9 — Recommend-and-ratify fallback

Para lo que la marca no tiene (obligatorio o accesorio que nunca pensó/trabajó/definió): desde el scoper se elicita "¿lo tienes? ¿lo quieres?" y se recomienda SOLO si es el caso — el cliente siempre decide; en builder se construye el draft basado en la recomendación (o en inferencia mínima deducible de algo similar que la marca ya tiene) para que el cliente dé su primer feedback e iterar. Candados no negociables: (a) toda inferencia/propuesta vive en CUARENTENA (NS-D) — jamás threadeada al spine como confirmada (el fallo CB8/CB9); (b) not-used(declarado) sigue siendo respuesta de primera clase — el modo dispara con "quiero tenerlo / propónme", jamás por default (W-1); (c) hereda curator-wall y tres-estados o re-abre C-X4/K-B-5. Generaliza el Skill A guard del roadmap. Muchas marcas tendrán "faltantes": el procedimiento debe ser sólido. Padres: NS-D, C-X2, C-X4. Repo: `scoper/references/elicitation-bank.md` · `references/gap-protocol.md`.

### N10 — Output-agnostic + non-deterministic, always and everywhere

Tanto las superficies de aplicación (N7) como TODO el repo — lo existente y todo cambio futuro, de esta versión o no — son output-agnostic y no-determinísticos SIEMPRE: preparados para lo que sea, con todo lo necesario HOY (decidido por el cliente al construir el canon, o recomendado/inferido/decidido por scoper/builder — siempre etiquetado, NS-D). Las preguntas de scope son PRECISAS y auténticas, derivadas de un análisis/razonamiento del perfil del cliente: a un restaurante tiene sentido preguntarle "¿cómo se ve (o te gustaría que se viera) tu menú hoy? ¿los uniformes?"; a un bufete, por documentos/formatos/presentaciones que emite; a retail, "¿cómo se ve tu producto en display/anaquel?" — instancias ilustrativas, JAMÁS lista de cosas forzosas a preguntar, ni siquiera por categoría (eso es determinismo categórico). Por eso esto lo maneja una IA: su curiosidad/lluvia de ideas/pensamiento tangente se aprovecha siempre. Padres: NS-D/NS-E, C-S5, V5-01, Hard #1–2. Repo: scoper `SKILL.md` §Rectoral · `scoper/references/detection-batteries.md` · builder `SKILL.md` §Hard standards.

### N11 — The scoper emits complete documents, at every stage

Lo inverso al comportamiento actual: el scoper no debe tener miedo de dar documentos COMPLETOS, aunque sean mayoritariamente template. No solo el `.md` final del handoff a Code: cualquier "tarea" que se le deje al cliente o al intermediario — sea la etapa que sea del scoper en chat — se entrega como documento descargable, enviable y llenable fácilmente (recordando que puede ser el cliente O un intermediario quien interactúa). Da contenido operativo a C-O1 (§2) y generaliza el mecanismo ya resuelto de OI-G (living-questions descargable) a TODO instrumento. Padres: C-O1, S7, C-S2, S2, E-S-4. Repo: scoper `SKILL.md` (client instrument, gates 3.5/6/7a) · `scoper/references/handoff-format.md` · `root/RESIDENT.md` OI-G.

### T1 — Two-brains + index + single client surface re-architects the surfaces

N3+N4+N5+N8 juntas: keystone verbal + keystone visual (AI-facing, epistemia intacta) + índice de assets + prototipo como ÚNICA superficie-cliente total. Consecuencia estructural: resuelve X1 de raíz — el client-clean scrubea el prototipo; los cerebros conservan el matiz. Ratificado vía NS-F/NS-G.

### T2 — N7+N9 = a formal EXTEND/RECOMMEND mode

El test nunca cubrió CREATE; este híbrido controlado (ANALYZE + propuestas etiquetadas) hereda FORZOSAMENTE los muros probados — curator-wall, cuarentena, tres-estados — o re-abre C-X4/K-B-5. Es la generalización del Skill A guard que el roadmap ya preveía.

### T3 — Anti-drift: emitted from canon, always

Toda superficie consolidada nueva (keystone visual, índice, mapa de ediciones) se EMITE desde el canon, entra al mapa de N2 y al alcance de R6a; ninguna se mantiene a mano. Lente P-J-01: cada doc consolidado extra es superficie de drift — la emisión desde una sola raíz es el precio de admisión.

## 15. Research — hallazgos (fase cerrada 2026-07-04)

Los research runs están CERRADOS; sus salidas accionables viven en los planes. Esta sección conserva los HALLAZGOS con sus fuentes — la referencia que los items de los planes citan por ID. Regla de frescura: todo contrato version-fluid (/design-sync, fechas C2PA/AI-Act, RAG trip-point, DTCG/SD) se RE-verifica al implementar el item que lo toca. R-06 no fue run: reclasificado al diseño del stress-test (PLAN-V5 E4-02 — predicción falsable de C-X1: fabricación ∝ representación de la marca en training data; se prueba con marca conocida vs oscura).

- R-01 — Deny-list y vocabulario sancionado (→ E2-02). Taxonomía de binding extraída (`client-deny-lint.mjs`:98-145): DISTINCTIVE (matchean en cualquier parte): GAP-\d+, build-grade, computed-css|owner-stated|declared-spec, OFL(-match), Stage-N literal · KEYED (key de provenance a ≤24 chars ANTES del valor): hypothesis|corroborated|owner-confirmed, matched|inferred|traced · NEAR (contexto a ≤28 chars): Stage-\d, Wayback, unratified · ASSET (origin-key/build-context a ≤16 chars, NUNCA por sustantivo de asset): harvested|redrawn. Los 5 keystones pasan el lint en corrida real, pero Essential sobrevivió por ARTEFACTO DE VENTANA (key a 29 chars vs KEY_WINDOW=24), no por legitimidad ⇒ la salida es estructural (NS-F). Borrador de sanción (4 reglas): (1) valores del ladder y source-grades prohibidos anotados Y en prosa a <~30 chars de un key — cierra el bypass; (2) keys sueltos (provenance, confidence) permitidos como copy de marca; (3) front-matter `provenance:` con prosa libre = patrón a estandarizar; (4) estatus cliente-legibles ("Provisional") OK en superficie cliente, JAMÁS aguas abajo como estatus máquina.
- R-04 — Dependencias raíz-compartida (→ E2-07/N2; N4). Raíz-token duplicada LITERAL en 7 clases de superficie (Radiotopia: navy #092c58 en 9 archivos emitidos; prototype re-pinnea 52 literales + 96 var(); Klim FULL confirma el patrón); raíz-PROSA en 20 archivos con CERO gate — el spine se proyecta por duplicación y la reconciliación solo existe donde R6 alcanza. El keystone NO pinnea valores en ningún repo: patrón correcto a conservar.
- R-05 — Manifest de superficies, borrador (→ E2-01). CLIENTE (deny pasa): prototype.html, README, keystone §§deploy, kit source visible · OPERADOR (epistemia legítima): RESIDENT, CLAUDE, CHECKSUMS, audit/**, tools/**, sources/**, BUILD-SELF-ANALYSIS · AI-FACING: keystone completo (superficie DUAL — la única en ambos mundos, ahí vive X1), canon/*.md, canon.json+tokens/**, satellites/. Anomalías: Essential con 3 scripts harvest builder-añadidos; Klim con projections.md en raíz (pass vacuo, CONTRA-1).
- R-02 / R-03 — cerrados y asentados donde viven: CONTRA-5 DESCARTADA (§8) · K-B-3 = provenance-pointer drift, valores recuperables / nombres y líneas no (§5, C-X6).
- R-07 — Contrato `/design-sync` VIGENTE vs pin v2.1.185 (→ E1-09/E0-02; F3-02): marker `@dsCard` vigente, compila a `_ds_manifest.json`; register/unregister_assets = legacy; superficie NUEVA no pinneada: método `report_validate` con counts {total, bad, thin, variantsIdentical, iterations} de un `.render-check.json` final. El prompt live no fue legible desde Code — lo absorbe la regla de frescura al tocar el kit.
- R-08 — Presupuesto residente NS-G (→ E2-05/06). Oficial: el RAG de Projects se activa "cuando el knowledge se aproxima al límite del context window", capacidad hasta 10x, sin número publicado ([Claude Help Center](https://support.claude.com/en/articles/11473015-retrieval-augmented-generation-rag-for-projects)); comunidad: activación observada a ~13 archivos / 2% ([issue #25759](https://github.com/anthropics/claude-code/issues/25759) — un reporte, corregible). Regla derivada: SET de POCOS archivos consolidados, total ≪ context window, keystones tolerantes a attachment directo (carga siempre in-context).
- R-09 — DTCG / Style Dictionary (→ F1). DTCG 2025.10 ESTABLE (`.tokens.json`, resolver files, `$deprecated`, 14 color spaces incl. oklch) + [SD v5 liberado adoptándolo](https://styledictionary.com/versions/v5/migration/) ([zeroheight ya migró](https://help.zeroheight.com/hc/en-us/articles/48049028236187-Migrating-to-Style-Dictionary-v5-in-tokens-automation); [#1590](https://github.com/style-dictionary/style-dictionary/issues/1590): color/dimension ✅, motion 🚧). Ronda v6 (verified): la migración interna es CHICA — el spine YA es 2025.10-shaped y SD no es dependencia de código; deltas reales: extensión (`scheme-derive.mjs`:80-81/:117-119; sufijo `audit-lint`:105/:109) + resolver = decisión aparte (NO adoptado — PLAN-V6, condición de reapertura escrita).
- R-10 — Fidelity, empírico (→ E1-04). El stack completo corre e2e en el sandbox de referencia (numpy 2.5.0 · opencv-headless 4.13.0.92 · scikit-image 0.26.0 · pillow 12.2.0; fixtures: within → ΔE2000 0.1755 / SSIM 0.9999 / exit 0 · out → ΔE 6.9983 / exit 1). coloraide 8.10 = puro-Python con ΔE2000 (~10 µs/px); SSIM sin numpy NO es práctico y ORB+RANSAC no tiene sustituto fuera de cv2. Postura: stack donde exista; donde no, import-guard exit-3 como estatus de primera clase + tier degradado ΔE-only documentado — jamás gate fingido.
- R-11 — Design brain / keystone visual (→ E2-05). Prior art más cercano: spec DESIGN.md (Google Labs); emisión anti-drift VALIDADA (Style Dictionary/Supernova/zeroheight: docs generados desde tokens — confirma R-04, el keystone referencia el spine); convención Do's/Don'ts anclada en instruction-scaling peer-reviewed ([arXiv 2507.11538](https://arxiv.org/abs/2507.11538)); [Figma genera design-system rules files](https://www.figma.com/blog/design-systems-ai-mcp/) para agentes (design brain EMITIDO = T3 validado en industria); [documentar el porqué y el cuándo-no — doc opinionated ⇒ output opinionated](https://dev.to/jamesives/your-design-system-needs-an-mcp-server-4c7a). Mitad no-código = WHITE-SPACE declarado. Análogos comerciales: [Typeface Arc Graph](https://www.typeface.ai/blog/content-quality-control-in-ai-marketing-enterprise-governance-and-best-practices) · [Adobe Brand Intelligence](https://business.adobe.com/products/brand-intelligence.html).
- R-12 — Regla imagery-IA (→ E2-06). Field-set de 5 ejes con fuente: estilo — referencia-assets como ground truth ([Firefly Custom Models: 10–20 assets brand-approved](https://business.adobe.com/products/firefly-business/custom-models.html), [subject vs style models](https://developer.adobe.com/firefly-services/docs/firefly-api/)) + descriptores derivados etiquetados (espejo de W-4) · sujetos/ediciones prohibidas ([ASU](https://brandguide.asu.edu/execution-guidelines/ai-guidelines): frontera edición↔fabricación, sin apariencia física alterada, sin "estilo de artista", reverse-image-check; [U. Alabama](https://stratcomm.ua.edu/ai-guidelines/): sin retratos de personas reales ni landmarks, marks solo de fuentes aprobadas, caveat U.S. Copyright Office) · espacio permitido · revisión ruteada por riesgo · disclosure/provenance ([Harvard SEAS](https://seas.harvard.edu/office-communications/ai-marketing-guidelines): tag + umbrales de atribución; [EU AI Act Art. 50 enforcement 2026-08-02 + CA SB 942 desde 2026-01] **[STALE — superseded 2026-07-06: SB 942 operativa 2026-08-02 vía AB 853, hosting 2027-01-01; gracia omnibus Art. 50 a 2026-12-02; ver PLAN-V5]**(https://www.rightsdocket.com/insights/what-is-c2pa); [dual C2PA+SynthID con verificación pública](https://c2paviewer.com/articles/openai-google-c2pa-synthid-2026); [límites: stripping/forgeability — certifica la historia declarada, no la verdad](https://www.softwareseni.com/how-c2pa-content-credentials-work-and-what-their-limits-are/)). Marcas sin identidad de imagery: todo descriptor nace proposed-cuarentena (NS-D).
- R-13 — Elicitación adaptativa (→ E3-01/02; enum a E1-02). Stack con fuente por pieza: orden por DISCREPANCIA contra targets de cobertura ([constrained-CAT, Kingsbury & Zara](https://pmc.ncbi.nlm.nih.gov/articles/PMC5978606/) — área primero, ítem improvisado dentro = banco como cantera con garantía) · cierre auditable por dimensión ([PSER](https://pmc.ncbi.nlm.nih.gov/articles/PMC7518406/) + [saturación operacionalizada: N consecutivos sin material nuevo, Francis et al. 2010](https://pubmed.ncbi.nlm.nih.gov/20204937/); [variante ≥95% codebook](https://arxiv.org/pdf/2302.03723)) · meta-cobertura del frame GENERADO (KAOS/obstacle analysis, van Lamsweerde & Letier 2000) · probing por señales ([ambigüedad como RECURSO para tácito, Ferrari/Spoletini/Gnesi](https://link.springer.com/article/10.1007/s00766-016-0249-3)) · proxy: fiable en factual, NO en actitudinal ([Sage, Proxy Respondent](https://methods.sagepub.com/ency/edvol/encyclopedia-of-survey-research-methods/chpt/proxy-respondent)); remedio [confianza por respuesta post-respuesta](https://pmc.ncbi.nlm.nih.gov/articles/PMC10520105/); enum de 3 valores owner/handoff/proxy-confirmed (resuelve X3) · multi-decider: ViewPoints (separado) → Delphi ponderado (agregar) → WinWin (conflicto ESCALADO como ítem). El LLM-interviewing 2024-26 ([Wuttke](https://arxiv.org/abs/2410.01824), [SparkMe](https://arxiv.org/pdf/2602.21136), [eval multi-modelo](https://www.nature.com/articles/s41598-026-46517-7)) parte de guides FIJOS ⇒ "frame generado + garantía de cobertura" = white-space real: se CONSTRUYE (KAOS + can't-miss del diagnóstico médico), no se copia.
- R-14 — Mirror Drive (→ F4-01). La [API de Drive v3 expone `sha256Checksum`](https://googleapis.github.io/google-api-python-client/docs/dyn/drive_v3.files.html) output-only para binarios — NO Docs Editors ni shortcuts ([campo desde ago-2022](https://github.com/rclone/rclone/issues/7327)); mirror nativo-first viable; regla dura: binarios SIN conversión a formatos Google-nativos.
- R-15 — Medición tipográfica (→ E1-13). [fontTools](https://pypi.org/project/fonttools/) (zero-dep) lee la [tabla OS/2](https://fonttools.readthedocs.io/en/latest/ttLib/tables/O_S_2f_2.html) directo: identidad por usWeightClass/usWidthClass + bits fsSelection/macStyle — JAMÁS name-match; metric-compare normalizado por unitsPerEm (ascent/descent/lineGap, x/cap-height donde la versión de tabla los trae, advance widths de string-sonda vía hmtx); name table solo metadato.
- R-16 — Auto-GAP regulatorio (→ E1-11). Frame: [la FTC aplica el mismo estándar de sustanciación a TODA claim health-related sin importar la categoría](https://www.ftc.gov/business-guidance/resources/health-products-compliance-guidance) (guía 2022: foods/OTC/devices/apps). Dominios: salud/nutrición en ingeribles y health-adjacent (caso Onyx) · [origen "Made in"/single-origin](https://www.ftc.gov/business-guidance/advertising-marketing) · certificaciones (organic/eco/"FDA approved") · financieras (caso Cuenca) · dirigido a niños · age-restricted (inferring) · endorsements 16 CFR 255 (mecanismo transversal). Criterio: clase-producto × clase-claim ⇒ GAP "claims reguladas" + guardrail keystone §5 — JAMÁS bloquea. MX: mismas clases, regulador distinto (COFEPRIS/Profeco/CONDUSEF; inferring la equivalencia fina).

## 16. Arquitectura de planes — PLAN v5 y PLAN v6

Dos workflows que NO se mezclan. CREACIÓN del plan: chat es home base — operador + Claude redactan; Code = instrumento de análisis (rondas y cualquier análisis diferido; resultados regresan a chat destilados). EJECUCIÓN de la versión: misma forma — chat home base de análisis/decisiones/dirección con el plan aprobado mandando; Code = brazo de ejecución, análisis profundo, bughunting y building; el análisis en CUALQUIER punto puede mejorar o MODIFICAR el plan (con entrada en su log). Los stress-tests son el CIERRE de la ejecución, jamás actividad de la creación. Relay y economía de contexto: el operador puentea; retornos de Code inline destilados (o archivos en el repo); el detalle profundo vive en repo/docs — el chat carga solo lo load-bearing.

- Derivación (anti-drift): este doc = fuente de requisitos y evidencia, CONGELADO; los planes referencian IDs y jamás re-narran — un dato en dos docs = drift. Precedencia: este doc gana en requisitos/evidencia; si el conflicto revela error AQUÍ, se corrige aquí con log y el plan se realinea. Descubrimientos de ejecución → log del plan + RESIDENT del repo, nunca aquí.
- Rondas pre-plan: EJECUTADAS para ambas versiones (2026-07-04; retornos absorbidos por los planes). La re-verificación de v6 vive como etapa F0 en PLAN-V6.md.
- Regla permanente de análisis: en cualquier punto de ambos workflows, diferir a Code el análisis que haga falta — aunque sea exhaustivo — ANTES de modificar; modificar sin entender es el costo, no el análisis (EH-2/HARNESS-LESSON aplicados al workflow).
- Forma y hogar: los tres docs (este análisis, PLAN-V5.md, PLAN-V6.md) viven en la RAÍZ de `main` en GitHub; subida vía branch `claude/<nombre>` → PR → OK del operador (E-O1: cero push sin OK). Los planes: 1 item ≈ 1 sesión de Code, template ID/padres/entregable/gate/estado, wins-regression por etapa, Session log propio, se reescriben al cierre de cada sesión. Precisión del pin: `65932bb` = baseline del eval sobre la superficie de CÓDIGO; commits doc-only a la raíz no la invalidan.
- Criterio v5/v6: v5 repara y completa lo PROBADO (evidencia §1–§11 + research §15); v6 construye lo NO-testeado (T2, F4-emitter, mirror Drive, migración `.tokens.json` + hop downstream) MÁS lo que arroje el stress-test v5. Fuera con condición escrita: resolver Module y OI-J (post-v6, gated en demanda real).
- Etapas, items, gates, wins-regression y diseño de stress-tests viven ÍNTEGROS en PLAN-V5.md y PLAN-V6.md — canónicos desde 2026-07-04; este doc no los duplica.

## Limitations & Out-of-Scope

- No contiene soluciones ni etapas: los planes son los canónicos (PLAN-V5.md / PLAN-V6.md). Las líneas "Diseño v5:" dentro de los problemas son dirección registrada (qué debe ser cierto), no spec de implementación.
- Afirmaciones cuantitativas cross-brand cargan los deltas de comparabilidad de §11 (Klim FULL, Radiotopia acquisition-mode, kit ON/OFF variable, blind asimétrico, operador único = evaluador). Claims sobre artefactos no-inspeccionados-directamente descansan en confesión + re-run relay, marcados en origen.
- Los hallazgos de los Research Runs A/B en §15 (R-13, R-11, R-12) son destilados-relay de los reportes de run (artifacts de chat); las pre-investigaciones y todo lo repo-local (B1/B2) son verificación propia con fuente ligada.
- Los 5 blind-test reports y los repos de prueba son ARCHIVO FORENSE fuera del workflow (E-O1, local-only): no son insumo de los planes ni lectura de sesión.

## References

- `ccediland/brand-system-skills` @ `65932bb` (v0.4.0) — el skill bajo test; archivos citados por ruta relativa en cada problema.
- Archivo forense local-only, FUERA del workflow (E-O1): los 5 blind-test reports + repos de prueba `~/proyectos/<brand>-brand` + `BUILD-SELF-ANALYSIS.md` por marca.
- Principios citados en §13a: `README.md` · `RESIDENT.md` · `CLAUDE.md` del repo del skill.
