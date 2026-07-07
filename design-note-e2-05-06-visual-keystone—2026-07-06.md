---
name: design-note-e2-05-06-visual-keystone
description: Design note de E2-05/06 (PLAN-V5) — el keystone visual (N4, el cerebro de diseño) + la regla imagery-IA (N7/R-12) como su sección residente. Checkpoint pre-implementación; la impl se verifica contra este doc. Doc interno del ciclo (raíz, no shipped).
last_updated: 2026-07-06
applies_to: PLAN-V5 E2-05/06 · branch claude/v5-e2 · contrato handoff CONGELADO (cero cambios)
status: diseño — drift diseño↔impl se corrige en el mismo commit
---

# Design note — E2-05/06 · Visual keystone + regla imagery-IA

IDs: N4, N7, NS-G, R-11, R-12, R-04, R-08, NS-D, W-4. Restricciones: contrato congelado (la cuarentena
proposed→hypothesis+GAP ya existe — R2; cero campos nuevos del handoff) · manifest de superficies E2-01
(clase ai-facing manda: el deny NO corre en keystones) · CONTRA-2 cerrado · regla de fixtures · scrub F21/F22.

## 1. Forma — DECIDIDO: la regla imagery-IA es §6 DEL keystone visual, no un archivo aparte

NS-G define el SET residente: keystone verbal + keystone visual + asset-index (3 archivos, R-08: POCOS
archivos consolidados ≪ context window, tolerantes a attachment directo). La "regla imagery-IA" del plan es
una REGLA, no un doc: meterla como cuarto archivo diluiría el presupuesto residente y partiría el cerebro
visual en dos. Vive como §6 del visual keystone.

- **Archivo emitido:** `<brand>-visual-keystone.md` (raíz del repo emitido; el glob `*-keystone.md` del
  manifest de superficies ya lo clasifica ai-facing → epistemia intacta, deny no corre).
- **Template:** `assets/templates/keystone/visual-keystone.md` · **emit spec:** sección nueva en
  `references/keystone-emit.md` (Stage 8.5 emite AMBOS keystones — el set NS-G; la IA del cliente carga los
  dos FORZOSO + consulta el asset-index).
- **Esqueleto (tipo DESIGN.md, R-11 — do/don'ts + el porqué + el cuándo-no):**
  §1 Metadata & deployment (carga forzosa del par + puntero al asset-index) · §2 DESIGN PRINCIPLES (el
  porqué: intent por átomo + significado ESSENCE, como razonamiento) · §3 TOKENS & USAGE (referencia el
  spine POR NOMBRE `{tier.cat.name}` — **JAMÁS pinnea valores, R-04**) · §4 DO / DON'T (pares concretos
  derivados de GRAMMAR `G-*`/`ALGO-*` + Misuse, cada par CITA su regla; forma when-X-then-Z) · §5
  APPLICATION DECISION METHOD (generativo N7: cómo decidir CUALQUIER superficie — derivación, ejemplos
  ilustrativos jamás catálogo, fallback recommend-and-ratify para lo indefinido, white-space declarado) ·
  §6 AI-IMAGERY RULE (abajo) · §7 VISUAL GUARDRAILS (cola high-recall: misuse hard-stops, protección del
  mark, refusal-in-character).

## 2. §6 AI-IMAGERY RULE — field-set de 5 ejes (R-12)

1. **STYLE** — los reference-assets del asset-index son el GROUND TRUTH a igualar (espejo W-4: "the
   reference set is the look to match, not sources to edit"); descriptores DERIVADOS entran etiquetados
   (`hypothesis` + provenance); marca SIN identidad de imagery ⇒ todo descriptor nace
   `source: proposed` + `hypothesis` + GAP (NS-D — el canal ya existe, cero contrato nuevo).
2. **FORBIDDEN** (clases abiertas ilustrativas) — sin apariencia física alterada de personas reales; sin
   retratos reales/landmarks sin clearance; sin "estilo de <artista>"; marks SOLO de fuentes aprobadas
   (= el asset-index); frontera edición↔fabricación + disciplina reverse-image-check.
3. **PERMITTED** — el espacio positivo (contextos/sujetos/composiciones según la identidad o propuestas en
   cuarentena).
4. **REVIEW routed by risk** — clases de riesgo → quién revisa (personas reales/regulado/high-stakes ⇒
   sign-off humano; decorativo ⇒ ligero); parametrizado por POSTURE.
5. **DISCLOSURE / PROVENANCE** — por asset GENERADO: registro {herramienta, prompt-ref, fecha, revisor} en
   una fila del asset-index (`Kind: generated-imagery`; custodia igual que todo derivado) + postura de
   disclosure con **PINS RE-VERIFICADOS 2026-07-06** (regla de frescura EJECUTADA — delta real vs el
   análisis: EU AI Act Art. 50 aplica 2026-08-02 y el AI Omnibus de mayo-2026 da a sistemas pre-mercado
   hasta 2026-12-02 para el marcado machine-readable; **CA SB 942 movida por AB 853 a operativa 2026-08-02**
   — no "desde 2026-01" — con obligaciones de hosting 2027-01-01; C2PA/SynthID = mecanismos de clase, con el
   límite declarado: certifican la historia DECLARADA, no la verdad). El template ordena RE-verificar estos
   pins en cada build (son version-fluid).

## 3. Enforcement (machine donde es forma; agente donde es juicio)

- run-gates: fila nueva **"visual keystone structural"** (lint, BLOCKING): `<brand>-visual-keystone.md`
  existe (mandatorio — NS-G) · 7 secciones `##` (fences enmascarados) · GUARDRAIL en la cola (una de las
  últimas dos) · §4 carga ≥1 par DO/DON'T o GAP visible · §6 presente (contenido O línea explícita
  not-used(owner-declared) — anti-determinismo: imagery not-used resuelve limpio).
- **Regla R-04 machine:** el visual keystone NO pinnea — cero literales `#hex` / `oklch(...)` (nombres de
  token solamente). Un literal = pin que driftea = FAIL.
- La fila "keystone structural" existente se re-ancla al keystone VERBAL (excluye `-visual-`).
- Fixtures: clean gana `demo-visual-keystone.md` (mínimo válido) + fila en su asset-index? (no — el
  keystone ya tiene fila "keystone (verbal brain)"; se agrega la visual) · board-violations gana
  `bad-visual-keystone.md` (guardrail enterrado + un `#hex` pin + sin DO/DON'T) → filas FAIL nuevas.

## 4. Modos de falla

| Falla | Comportamiento |
|---|---|
| Visual keystone ausente | FAIL (mandatorio NS-G) |
| Valores pinneados (#hex/oklch) | FAIL — R-04: el cerebro REFERENCIA el spine, jamás lo copia |
| DO/DON'T vacío | FAIL forma (o GAP visible — NS-D) |
| Marca sin identidad de imagery | §6 = descriptores proposed+GAP (cuarentena) o not-used declarado — jamás false-fail |
| Pins legales stale | el template ordena re-verificar por build (regla de frescura, fechada) |
| Deny sobre el keystone | NO ocurre (ai-facing, manifest E2-01) — CONTRA-2 sigue muerto |

## 5. Fronteras

- Cero cambios al contrato handoff (la cuarentena ya viaja; POSTURE ya existe).
- keystone-emit §verbal intacto salvo la sección nueva del par/set (E3-05 tocará Aaker-mecánica después).
- El inventario de aplicación derivado del perfil (N10 pleno) es del scoper (E3-01); aquí solo el MÉTODO
  generativo de decisión (§5).
