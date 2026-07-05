---
name: design-note-e1-02-handoff-contract
description: Design note del contrato handoff v5 (PLAN-V5 E1-02) — forma, semántica, enforcement y modos de falla. Checkpoint de reversa barata; la implementación se verifica contra este doc. Doc interno del ciclo (raíz, no shipped); los IDs internos son legítimos aquí.
last_updated: 2026-07-05
applies_to: PLAN-V5 E1-02 · baseline claude/v5-e1 @ cd2f161
status: diseño — se actualiza en el mismo commit si la implementación se desvía (cero drift)
---

# Design note — E1-02 · Contrato handoff v5 (cambio único lockstep)

Requisitos por ID contra el análisis congelado: ENUM-GAPS, X3, R-B-2, CONTRA-6, S7, E-O3, R-13, C-X7,
NS-D (enmienda ronda-v6-flag-2). Restricciones: regla de fixtures · scrub F21/F22 (cero IDs internos en
prosa shipped) · postura NS-H (E1-01) intacta · machine-true (self-attestation no satisface; proxy explícito
sí). Regla de contrato único: TODO cambio de contrato ocurre aquí; E1-05/06/07/12 y E3-02/05 consumen este
contrato congelado.

## 1. Forma del contrato

El contrato del handoff v5 es la suma de CUATRO piezas, cada una con un dueño único (nada se duplica, todo
lo demás apunta):

| Pieza | Dueño único (archivo) | Qué define |
|---|---|---|
| Template + directivas + registro directiva→enforcement | `scoper/references/handoff-format.md` | la superficie literal que el scoper emite y el builder parsea |
| Semántica del spine (enums, reglas de promoción, cuarentena) | `builder/references/gap-protocol.md` § The provenance spine | la definición canónica de source/confidence/owner/freshness |
| Espejo máquina de los enums + triggers R0–R5 | `builder/assets/templates/tools/audit-lint.mjs` | los Sets ejecutables y sus reglas gatilladas |
| Persistencia + custodia | `handoff-format.md` §Rules (regla) + builder `SKILL.md` Stage 0 (acción) | el handoff como source-of-record hasheado |

Toda otra superficie que hoy re-enumera el ladder se degrada a POINTER (cita al dueño) o a nombre de TIER
— el anti-CONTRA-8 estructural: menos sitios con literales = menos drift posible. Sitios que DEBEN cargar
literales (template del handoff, código, fixtures) quedan en lockstep por esta regla de cambio único.

## 2. Enum v5 (ENUM-GAPS, X3, R-B-2, R-13, NS-D)

### 2a. Confidence — 6 valores, 3 tiers (orden parcial, no cadena estricta)

```
tier 0 (sin confirmar):   hypothesis
tier 1 (evidencia ganada): corroborated · verified-primary
tier 2 (ratificación):     proxy-relayed · handoff-confirmed · owner-confirmed
```

- `hypothesis` — observado/derivado/propuesto, sin confirmar. (Sin cambio.)
- `corroborated` — el valor aparece en ≥2 fuentes independientes NO-relay. (R1; comparación de VALORES es E1-06.)
- `verified-primary` — **NUEVO**: leído EXACTO del master primario oficial del slot (top-truth de brand
  archaeology, sin owner vivo). Exige sourceRef hasheado al archivo registrado como primario del slot
  (binding fino de primario = custodia E1-05; hoy lo sostiene R3-hash + declaración explícita).
- `proxy-relayed` — **NUEVO**: confirmado por un proxy en nombre del dueño. Fiable en lo FACTUAL; los
  campos actitudinales/POSTURE/valores lo degradan a `hypothesis`+GAP (mecánica scoper = E3-02; el contrato
  solo da el vocabulario).
- `handoff-confirmed` — **NUEVO**: ratificación HEREDADA del handoff firmado (gate 7a) — el builder no la
  presenció; el registro es el handoff persistido. Machine-check: sourceRef → `sources/handoff—<fecha>.md`
  en CHECKSUMS (R3 ya lo cubre al existir la persistencia). Resuelve X3: lo heredado deja de disfrazarse de
  `owner-confirmed`.
- `owner-confirmed` — RE-SCOPED: ratificación real REGISTRADA por el pipeline (sign-off presenciado en
  sesión o registro de ratificación committeado). Ya no absorbe la herencia del handoff.

Regla de promoción v5 (reemplaza "brand line requiere owner-confirmed"): una línea de marca (regla) requiere
**tier 2**; `proxy-relayed` solo ratifica slots factuales; el ranking dentro del tier 2 es
`owner-confirmed > handoff-confirmed ≥ proxy-relayed` para resolución de conflictos.

### 2b. Source — +1 valor: `proposed` (NS-D)

`SOURCE_ENUM += proposed` — valor AUTORADO por el pipeline (scoper o builder) como PROPUESTA en cuarentena.
DECIDIDO: el concepto NS-D "source: authored" aterriza como literal `proposed`, NO `authored` — `authored`
ya significa lo CONTRARIO en el spine (verdad del owner que jamás se re-deriva, proyección
declared-spec/owner-stated). Colisión semántica real; `proposed` la evita sin tocar el eje v2.

Representación de cuarentena (completa, machine-true):
`source: proposed` ⇒ (a) `confidence: hypothesis` FORZADA (R2 extiende su cap-set a
{inferred, matched, proposed}) · (b) GAP abierto obligatorio (R5 ya lo exige para hypothesis) · (c) la
ratificación pendiente vive como el gap OPEN con `Proposed resolution` = el borrador (lifecycle existente;
cero estado nuevo). Quién lo propuso: el origin-tag del gap (`handoff-deliberate` = scoper-propuesto vía
handoff · `builder` = builder-propuesto). Cubre R-S-3 (posture acuñada → proposed+hypothesis+GAP).

### 2c. `relay` — atributo de sourceRef, NO valor de confidence ni de source

DECIDIDO: `relay` marca al ARTEFACTO (una transcripción del builder), no al dato. Cada entrada de sourceRef
gana `origin: <capture | relay>` (ausente = capture, back-compat). R1 EXCLUYE los refs `origin: relay` del
conteo de fuentes distintas — la exclusión (1 línea) se implementa AQUÍ con su fixture seeded, no en E1-05
(regla de fixtures: el schema y su diente viajan juntos; E1-05 conserva selector-existe + MANIFEST custodia
generalizado + page-no-line). Desviación del plan LOGUEADA en Session log.
La persistencia del handoff (§3) mata la necesidad legítima del relay: en vez de transcribir, se cita
`sources/handoff—<fecha>.md`.

### 2d. Triggers R0–R5 actualizados (lockstep con el enum)

- R0: enums nuevos aceptados (SOURCE +proposed · CONFIDENCE +verified-primary/handoff-confirmed/proxy-relayed).
- R1: excluye `origin: relay` del conteo (§2c).
- R2: cap-set = {inferred, matched, **proposed**} ⇒ hypothesis.
- R3: trigger = source==computed-css OR confidence ∈ **todo tier 1+2** (antes: corroborated·owner-confirmed;
  ahora + verified-primary·handoff-confirmed·proxy-relayed) ⇒ sha256 path-bound. Todo lo arriba de
  hypothesis exige registro hasheado.
- R4/R5: sin cambio de lógica (R5 cubre proposed vía hypothesis).

## 3. Persistencia del artefacto (S7, decisión del operador)

- Stage 0 escribe el bloque recibido VERBATIM a `sources/handoff—<fecha>.md` (fecha ISO = día de
  recepción/persistencia) ANTES de parsear; entra a `CHECKSUMS.txt` por la regla existente que hashea todo
  `sources/**`. Handoffs sucesivos = archivos nuevos (historia de custodia); el más reciente es el operativo.
- Es la CIMA de la chain-of-custody: todo dato handoff-carried puede citarlo como sourceRef;
  `handoff-confirmed` lo EXIGE (§2a). `sources/` = superficie operador (fuera del scrub cliente).
- Doble artefacto S7: el handoff persistido es el prompt máquina lean; el `.md` de scoping completo legible
  viaja como ASSET del manifest (`role:REFERENCE` + sha256) cuando existe — el template lo nombra.

## 4. Carriers sin frameworks nombrados (CONTRA-6, lado contrato)

`Personality (Aaker-5 scored: sincerity/…)` → **`Personality (scored attributes on an owner-ratified scale)`**
— clase de capacidad: cualquier escala que el owner ratifique o que el scoper derive del perfil; un framework
nombrado es ilustración, jamás input obligatorio. Espejos que citan el carrier por nombre (builder SKILL
Stage 0 · scoper SKILL 7b · keystone-emit slot) se renombran en el MISMO commit (alineación de nombre
solamente; el rediseño del mecanismo de keystone-emit es E3-05).

## 5. Rutas de adquisición formales (E-O3; enforcement E1-12)

Cada item de ASSETS gana `acquire:` — clase abierta (rector): `pre-placed | fetch <url> | recover-wayback
<url + era-pin> | cut <media-url @ locator> | owner-delivery | <otra ruta declarada>` + `fallback:<ruta |
owner-delivery | none>`. Regla normativa: una ruta declarada que falla degrada a su fallback declarado o a
GAP abierto — jamás silencio (el gate de agente correspondiente se mecaniza en E1-12; el contrato declara la
regla y el campo).

## 6. Directivas→enforcement (C-X7/NS-C, lado contrato)

`handoff-format.md` gana un **registro de directivas**: tabla Directiva · Consecuencia normativa ·
Enforcement. Vocabulario de enforcement (nuevo, primera clase — alimenta E1-03):

`parse-or-stop (Stage 0)` · `lint (tools/audit-lint.mjs)` · `measured (fidelity gate)` ·
`agent-gate (disciplina de agente — NO es enforcement máquina; estatus honesto de primera clase)`

Honestidad temporal: cada fila declara el enforcement QUE EXISTE HOY. El opt-out del kit hoy =
`agent-gate (Stage 8)`; cuando el lint de opt-outs exista (E1-07 lo mecaniza leyendo el handoff persistido
+ estos fixtures), la fila flipa a `lint` — cero prosa-adelante-del-código, cero forward-pointers en prosa
shipped. El slot del kit se vuelve EXPLÍCITO y parseable: `Claude Design component library: <YES|NO>` con
semántica normativa declarada (NO ⇒ cero artefactos Claude Design). Lo que este item NO toca (DECIDIDO 6):
el template CONSERVA los literales OPTIONAL viejos (`not used | demo-default-yes |
scope-expanding(demo-default-no)`) y las 3 declaraciones del default OPTIONAL-YES (header del bloque, la
cola "unfilled defaults YES" del slot, la regla BUILD-MODE v0/DEMO) — retirarlas es entregable EXPLÍCITO de
E1-07, no de este contrato.

## 7. Ratificación registrada (X3/R-13, lado contrato)

El header del WHY deja de ser el token suelto "RATIFIED": carga registro —
`RATIFIED{ by:<owner-name/role | proxy:<quién>> · how:<in-session sign-off | written-approval (citada)> ·
date:<ISO> }`. Lo que el builder hereda de ahí entra como `handoff-confirmed` (o `proxy-relayed` si
respondió proxy) — jamás `owner-confirmed` sin registro propio. El modelado completo proxy/multi-decider
(quién puede responder qué) es E3-02; aquí solo el vocabulario + el registro.

## 8. Fixtures sintéticos (reemplazan los handoffs muertos)

Hogar: `builder/assets/templates/tools/fixtures/handoff/` (NO se emite — Stage 1 ya excluye fixtures/).
Marca sintética obviamente genérica (cero valores de marca real — standing brand-scrub):

- `full-kit-on—handoff.md` — MODE ANALYZE · FULL · kit YES · ejercita: enum v5 completo (un token por rung),
  acquire: rutas, RATIFIED{} registrado, treatments, posture, dimension map completa.
- `demo-kit-off—handoff.md` — v0/DEMO · **kit NO** (la variante opt-out que consume el gate E1-07) ·
  carrier en cuarentena (`source: proposed`).
- `spare-sonic—handoff.md` — marca flaca sonic-primary: not-used masivo declarado, carrier primario
  no-visual (muerde W-1/W-4 en forma).

Además fixtures de TOKENS para el lint: `clean/` gana tokens con los rungs nuevos (verified-primary,
handoff-confirmed, proxy-relayed, proposed+hypothesis+GAP, sourceRef origin:relay legítimo no contado);
`seeded-violation/` gana violaciones: verified-primary sin sha256 (R3) · proposed+corroborated (R2) ·
corroborated cuyo segundo file es origin:relay (R1).

## 9. Modos de falla (diseño explícito)

| Falla | Comportamiento v5 |
|---|---|
| Handoff sin persistir en el repo emitido | los tokens `handoff-confirmed` no resuelven R3 (no hay hash del handoff en CHECKSUMS) ⇒ lint FAIL; además E1-07 hará del archivo un prerequisito duro |
| Valor heredado etiquetado owner-confirmed | etiqueta deshonesta: owner-confirmed exige registro de ratificación propio; el rung correcto es handoff-confirmed — auditable contra el handoff persistido |
| Transcripción del builder inflando corroboración | sourceRef origin:relay excluido del conteo R1 ⇒ corroborated cae a 1 fuente ⇒ FAIL |
| Propuesta del pipeline threadeada como verdad | source:proposed capado a hypothesis (R2) + GAP obligatorio (R5); promoverla = flip a tier 2 con registro |
| Opt-out del kit ignorado | contrato: slot explícito YES/NO + regla normativa + fixture kit-OFF; exit-code = E1-07 |
| Ruta de adquisición falla en silencio | regla declarada: fallback declarado o GAP — jamás silencio (mecánica E1-12) |
| Enum drift entre superficies | literales solo en dueños declarados (§1); el resto apunta — el cambio único es la ley |

## 10. Inventarios (FASE 1 — levantados por workflow de 5 agentes + critic de completitud; citas verificadas por muestreo, cero falsas)

### 10a. Superficies del ladder — 76 sitios (el "~9" del plan era subestimación; lista completa en el
journal del workflow `wf_12d4894e-890`). Dueños canónicos: `audit-lint.mjs:44-45` (máquina) ·
`token-spine.md:103-104` (doc tokens) · `handoff-format.md:68` (wire) · `gap-protocol.md:12-14` (doctrina).
Clases de sitios a tocar: reglas condicionales que nombran valores (R1/R2/R3/R5 en audit-lint + validate-audit
§146-153 + token-spine:123-157 + gap-protocol:18-36 + CLAUDE.md:37-39 + coverage-checklist:61) ·
re-enumeraciones (scoper SKILL:46-47/53 · builder SKILL:247/333 · keystone-emit:78 · keystone.md:17/33-34 ·
process-discipline:32 · client-clean:50-53) · regexes del deny (client-deny-lint:104/114/119) · fixtures
(clean · seeded-violation · client-deny ×2 + reports regenerados por re-run). NO se tocan: RESIDENT.md
(histórico + régimen por-etapa), PLAN-V5/V6 y análisis (docs de ciclo; análisis congelado), dev/ (gitignored),
completeness/flat+sonic (fixtures R8, tokens sin cambio). Colisión de labels detectada: la clase `ingest:`
re-usa `computed-css` — sin acción (cambio aditivo, cero renames).

### 10b. Self-attestations — 52 sitios en 4 clases: (1) parse/obedience claims sin gate (Stage 0 completo,
builder SKILL:93-152) · (2) directivas OPTIONAL sin consumidor ejecutable (SKILL:96/136/281 ·
handoff-format:102 · adapter:10) · (3) ratificación por fe (SKILL:101/115/234 · handoff-format:7/60 · scoper
SKILL:103/417/420 · analyze:8 · create:6 · keystone-emit:103) · (4) no-persistencia (handoff-format:4/27/154 ·
SKILL:314/348/378 — el handoff muere en el paste; validate-audit:11 el gate BLOCKING camina un contrato que
solo existió en chat). El contrato v5 SUBORDINA (1)–(4) a un artefacto auditable (persistencia §3 + registro
§6 + rungs §2); la MECANIZACIÓN de cada clase es E1-03/05/06/07/12 — este item no la reclama.

### 10c. Consumidores — 86 sitios: Stage 0 parsea TODO (builder SKILL:92-152, bloque por bloque); references
que leen carriers (asset-acquisition ingest-map:54-66 · font-acquisition license:39 · keystone-emit carriers:36-74 ·
validate-audit:11/27/31/282/304/311 · analyze/create/reproduction-router/design-sync-kit/adapter); templates
emitidos que heredan (keystone.md:18-120 · docs/RESIDENT:52 · projections:24); cero tools leen el handoff hoy
(confirmado — E1-07 será el primero, sobre el handoff persistido de este contrato). Sitios CONTRA-6 (carrier
Personality): handoff-format:62 · builder SKILL:116-117 · scoper SKILL:271/422 · keystone-emit:38/46 ·
keystone.md:30/44 · elicitation-bank:49 — rename de carrier en todos; mecánica keystone/bancos intacta (E3-05).

## 10bis. Decisiones de diseño (DECIDIDO — con porqué)

1. **`relay` = atributo de sourceRef (`origin: capture|relay`), NO rung del enum.** El plan lo lista dentro
   de "enum completo"; el análisis dice "etiqueta/rung" (indeciso). Type-check mecánico: R1 cuenta ARCHIVOS
   por sourceRef; un valor de confidence es por-token y no puede marcar cuál ref es transcripción — un rung
   `relay` no puede implementar la exclusión R1. No es contradicción plan↔análisis (ambos concuerdan en el
   REQUISITO: transcripciones fuera del conteo, hasheables, jamás fuente independiente); es la única lectura
   implementable. Se reporta al chat como DECIDIDO, reversible barato si el chat resuelve distinto.
2. **NS-D "source: authored" aterriza como literal `proposed`.** `authored` ya significa verdad-del-owner en
   el eje del spine (v2) — trust OPUESTO. Colisión real; el concepto NS-D se conserva íntegro.
3. **La exclusión R1 de relay se implementa AQUÍ (1 línea + fixture seeded), no en E1-05.** Regla de
   fixtures: el schema (`origin:`) y su diente viajan juntos o el fixture no puede ejercitarlo. E1-05
   conserva selector-existe + MANIFEST custodia + page-no-line.
4. **El builder jamás emite `owner-confirmed` con autoridad solo-handoff.** Ratificación handoff-carried →
   `handoff-confirmed` (o `proxy-relayed` si respondió proxy — sobrevive, no se re-etiqueta); `owner-confirmed`
   en el repo emitido exige registro de ratificación presenciado/committeado por el build. El scoper SÍ puede
   emitir `owner-confirmed` en el handoff (presenció el sign-off 7a). Ranking de conflicto:
   owner-confirmed > handoff-confirmed > proxy-relayed.
5. **Deny-lint se extiende en cobertura, no en binding.** Los 3 rungs nuevos + `proposed` entran a las
   regexes de valores (KEYED) y `relay` a la clase ASSET (origin-key); el REDISEÑO del binding es E2-02.
   Cobertura es propagación de enum (lockstep); dejar un rung nuevo fuera del deny = regresión del firewall.
6. **OPTIONAL: sintaxis de slot determinista SIN quitar el default.** `Claude Design component library:
   <YES | NO>` parseable + registro de directivas; el retiro de "OPTIONAL defaults YES" (handoff-format:102,
   SKILL:96/135-136/280-281, adapter) es entregable EXPLÍCITO de E1-07 — no se le come.
7. **Registro de directivas con vocabulario de enforcement de primera clase:** `parse-or-stop · lint ·
   measured · agent-gate` — `agent-gate` = disciplina de agente declarada honestamente como NO-máquina
   (la democión explícita que E1-03 necesita como estatus). Cada fila declara el enforcement QUE EXISTE HOY;
   cero prosa-adelante-del-código.
8. **RESIDENT.md intacto en este item** (régimen por gate/etapa; sus menciones del ladder son registro
   histórico append-only). Los docs de ciclo y el análisis tampoco se tocan.
9. **Orden de enumeración alineado al Set de audit-lint en todo sitio literal tocado** (el critic detectó
   orden divergente token-spine vs handoff-format; byte-identical aplica a valores — el orden se unifica de
   paso para legibilidad de diffs futuros).
10. **verified-primary exige sourceRef hasheado al master primario del slot**; el binding fino de
    "primario-ness" llega con la custodia E1-05 — hoy lo sostiene R3-hash + la declaración del CORE-ASSET
    FIDELITY CONTRACT. Asignador típico: el builder (el scoper no samplea); el wire lo admite por
    byte-identical-en-todo-hop.
11. **Marcas sintéticas de fixtures = "Fixture Alpha/Beta/Gamma"** — inequívocamente genéricas,
    scrub-proof (cero colisión con marcas reales).

## 10ter. Desviaciones de implementación (asentadas en el mismo bloque de commits — cero drift)

- **CONTRA-8 (client-clean.md:50-53) se corrigió AQUÍ, no en E1-08:** la propagación del enum tocaba
  exactamente esas líneas; dejar la descripción del binding invertida mientras se editaba la misma oración
  habría propagado alrededor de un bug conocido. E1-08 pierde ese sub-entregable (logueado).
- **La sección `acquire-route` de asset-acquisition.md carga las reglas normativas "ruta fallida → fallback
  o GAP, jamás silencio" y "ruta declarada no ejecutada = GAP" (R-B-8/EV-2):** el campo sin su semántica de
  falla era contrato incompleto. E1-12 conserva la mecanización (MT-3-SKIP como gate de agente + verificación).
- **El 7b del scoper SKILL se convirtió en POINTER al contrato** (ya no re-enumera cada carrier) — aplicación
  directa del §1 de esta nota; además el SKILL rozaba el tope SH-1 (quedó 499/500).
- **Los reports de fixtures (`audit/lint/report.md` ×4) se regeneraron por re-run del lint** — el critic del
  inventario los marcó como superficie de regen obligatoria; verificado: seeded lista las 3 violaciones
  nuevas (relaybad→R1 · proposedbad→R2 · vpbad→R3) + las 5 viejas; clean/flat/sonic exit 0.
- **client-deny fixtures:** seeds nuevos disparan en las 3 clases (confidence-grade ×3 rungs nuevos ·
  provenance-verb `proposed` · asset-origin `relay` vía origin-key) y los near-misses de copy legítimo
  ("our proposed timeline", "relay race") pasan — clean exit 0 / seeded exit 1, corrida real.

## 10quater. Ronda de verify adversarial (pre-commit — 5 atacantes + juez; veredicto inicial FAIL → fixes aplicados)

Defectos CONFIRMADOS del cambio, todos corregidos en el mismo bloque de commits:
1. TREATMENTS del template wire conservaba el enum pre-v5 (miss de propagación en el archivo DUEÑO) → enum
   completo; espejos "hypothesis until owner-confirmed" alineados (builder SKILL ×2, reproduction-router).
2. Exclusión R1 de relay evadible por case/whitespace (`origin:"Relay"` contaba como capture) → normalización
   (`refOrigin`) + R0 valida `origin` contra `{capture|relay}` + seeded `relaycasebad`.
3. R3 no ataba handoff-confirmed/proxy-relayed al handoff persistido (cualquier archivo hasheado pasaba;
   3 prosas lo prometían) → `HANDOFF_BOUND_CONFIDENCE` en R3 (el ref que satisface debe ser
   `sources/handoff—*`) + seeded `hcbad`.
4. Prosa nueva "≥2 distinct non-relay hashed sources" mezclaba R1 (cuenta) con R3 (hash) → separadas en
   CLAUDE.md + builder SKILL.
5. Registro de directivas: 3 celdas over-claim (`sha256 → lint` · `CORE-ASSET + lint` · `regulatory measured`)
   → re-atribuidas a agent-gate/lint-token honestos.
6. El fixture clean modelaba la traducción X3 PROHIBIDA (ink owner-confirmed heredado del handoff) → ink =
   handoff-confirmed atado al handoff persistido; `tint` queda como ejemplar owner-confirmed.
7. "carries verbatim" calificado en gap-protocol + handoff-format: solo carriage A CONFIANZA RATIFICADA
   confiere tier-2 (hypothesis/corroborated en el wire no confieren nada).
8. `owner-confirmed` sin artefacto de registro definido → definición nombra `sources/ratification—<date>.md`
   hasheado como sourceRef natural del rung (binding máquina fino queda con la custodia E1-05).
9-16. Menores: anotación "never scoper-stamped" en el enum wire · ORIGIN_KEY del deny acepta la forma
   JSON-quoted (+seed) · README de fixtures corregido (5 rungs scoper-stampable) + treatment real en
   full-kit + placeholders `<dimension>` nombrados · line-refs del clean corregidos (14/16/18) ·
   token-spine "enters at earned confidence" · §6 de esta nota reescrito (arriba).

Adjudicados FUERA de scope (dueño): comparación de valores R1 → E1-06 · selector/line + primario-ness →
E1-05 · retiro del default OPTIONAL-YES + mecanización del opt-out → E1-07 · mecanización acquire/fallback →
E1-12 · modelado proxy/multi-decider → E3-02 · run vivo §7b → Phase-5. Falso positivo descartado: "archaeology
sin tier-2 alcanzable" es el estado epistémico honesto por diseño, no defecto.

## 11. Qué NO hace este item (fronteras)

- NO compara valores cross-source en R1 (E1-06) · NO valida selector-existe ni generaliza MANIFEST (E1-05,
  salvo la exclusión relay §2c que viaja con su schema) · NO mecaniza el gate de opt-outs (E1-07) · NO
  mecaniza rutas de adquisición (E1-12) · NO rediseña keystone-emit ni saca Aaker de su mecánica (E3-05) ·
  NO modela el flujo proxy/multi-decider del scoper (E3-02) · NO toca la postura NS-H (E1-01, congelada).
- El análisis está CONGELADO: cero ediciones; requisitos resueltos por ID.
