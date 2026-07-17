# Design note — F2-01 · Contrato wire v6 (costura de compilación; cambio único lockstep)

> Cierra la costura que el gate v5 probó rota (patrón rector 1: inflación en el paso de COMPILACIÓN —
> specifics sin etiqueta entrando a carriers `RATIFIED{}` después del último checkpoint del owner, donde
> ningún gate corría). Insumos por ID: EV1-F13 (mecanismo — el wrapper hereda ratificación a paráfrasis) ·
> EV1-F03/F04 (fabricaciones habilitadas por F13) · EV1-F10 (blanket acuña not-used) · EV1-F12 (6 clases
> de literal fuera de vocabulario) · EV1-F07 ("n/a" no sancionada; born-gap sin fila GAPS). Regla de
> contrato único v6: este item es EL cambio; F2-02/F2-03 y T2 (F3) consumen el contrato congelado que sale
> de aquí. La cuarentena `proposed` de v5 (E1-02) se EXTIENDE, jamás se reemplaza.

## 1. El mecanismo en una línea

El wire deja de poder AFIRMAR ratificación que no puede PROBAR: el texto firmado viaja dentro del wire
(appendix), cada línea ratificada carga su evidencia (`BRIEF{}` por línea), y un check ejecutable
(`tools/wire-check.mjs`) verifica cada claim contra el texto firmado — el scoper lo camina antes de emitir
(y declara su resultado en una línea recomputable), el builder lo re-corre al persistir (Stage 0) y en el
board (run-gates). El dry-parse lo hereda gratis.

## 2. Decisiones de diseño (DECIDIDO — con porqué)

- **DECIDIDO-1 — El brief firmado viaja DENTRO del wire**: bloque nuevo `— SIGNED BRIEF —` como ÚLTIMO
  bloque del wire (regla last-block: todo lo que sigue al header hasta el cierre del fence es el texto
  firmado, verbatim). Porqué: "handoff = single sufficient interface" (v5) — un segundo paste rompería el
  seam y el dry-parse; y EV1-F08 probó que un manifest apuntando a un .docx externo deja la cima de
  custodia ambigua. Stage 0 lo SEPARA a `sources/brief—<fecha>.md` + hash en CHECKSUMS (dos artefactos
  persistidos, un solo paste).
- **DECIDIDO-2 — Tag `BRIEF{}` por línea (la herencia del wrapper muere)**: toda línea de contenido del
  WHY termina en ` · BRIEF{ verbatim:"<quote>" | anchor:"<fragmento del brief>" | none — compiled,
  hypothesis }`. `verbatim` = el contenido SON las palabras firmadas (quote contenida en el brief,
  whitespace-normalizada); `anchor` = contenido compilado DESDE ese pasaje del brief (el fragmento citado
  debe existir en el brief); `none` = paráfrasis del scoper sin ancla — LEGAL pero el builder la hereda a
  `hypothesis`, jamás `handoff-confirmed` (la democión explícita que EV1-F13 pedía). Línea sin tag dentro
  del WHY = FAIL (jamás silencio). El wrapper `RATIFIED{by·how·date}` queda como RECORD del acto de firma
  — deja de conferir estatus al texto.
- **DECIDIDO-3 — Alcance del tag (qué líneas lo cargan)**: (a) todas las líneas de contenido del WHY;
  (b) filas `not-used(owner-declared)` del DIMENSION MAP → `· BRIEF{ verbatim:"<cita confirmatoria>" }`
  OBLIGATORIA (la cita debe existir en el brief — mata EV1-F10: el blanket de chat no está en el brief
  firmado, así que no puede acuñar filas); (c) VOICE-EXEMPLARS con `confidence:owner-confirmed`;
  (d) slots WHAT con `confidence:owner-confirmed` (su ratificación viene del gate-6 promote, que el brief
  registra). EXENTOS: PROPOSED (ya viaja `source:proposed·hypothesis` — cuarentena v5 intacta), OPTIONAL
  (resolución escrita del scoper, fuera del lifecycle), HORIZONS (detectados), slots WHAT a
  hypothesis/corroborated/proxy-relayed/verified-primary (su evidencia son sourceRefs/material, no el
  brief).
- **DECIDIDO-4 — Línea `WIRE-CHECK` recomputable (anti-verdict-a-mano, patrón §7a)**: el wire carga, justo
  antes del SIGNED BRIEF, `WIRE-CHECK: markers:<n> · verified:<n> · demoted:<n> · misses:<none|lista>` —
  el resultado declarado del walk del scoper. El builder RECOMPUTA; discrepancia = FAIL ("a hand-written
  wire-check"). El walk scoper-side es agent-gate por construcción (chat); la línea lo vuelve verificable.
- **DECIDIDO-5 — El check es tool propio `tools/wire-check.mjs`** (zero-dep, patrón deny/scheme-derive):
  corre standalone en Stage 0 (al persistir — el dry-parse lo corre ahí) y como fila BLOCKING de
  run-gates (`spawnSync`, como el deny). No inline en run-gates: Stage 0 lo necesita sin correr la suite.
- **DECIDIDO-6 — Veredicto por clase de literal (EV1-F12)**:
  | Clase (run 1) | Veredicto | Regla v6 |
  |---|---|---|
  | `fidelity:reference` | CORRECT | enum queda `build-grade\|low-fi\|pointer-only`; el rubric prose "build-grade/reference/missing" (v3 F10) se UNIFICA al enum del wire (reference→low-fi, missing→pointer-only/GAP) — la clase nació de ese drift |
  | `url:PENDIENTE` | CORRECT | `url:` debe portar esquema (`http(s)://`); URL pendiente = el ítem va en ASSETS con `acquire:` o fila GAPS — jamás placeholder |
  | `visibility:low-moderate` | CORRECT | literal ÚNICO del enum `low\|moderate\|high`; la indecisión es provenance (hypothesis) o GAP, no un rango |
  | `ingest:vector-trace` | CORRECT + regla open-class | token fuera del set conocido exige declaración explícita `NEW-INGEST: <token> — <razón>` en NOTES (anti-determinismo sin drift mudo); `vector-trace` es route-hint, no ingest |
  | `existing-material:pendiente` | CORRECT | enum `y\|n`; sin elicitar ⇒ el horizonte cierra `tagged-gap` + fila GAPS |
  | `route-hint:font-match/trace` | CORRECT | UN token del enum; compuestos prohibidos; la duda es `unknown` (ya existe) |
- **DECIDIDO-7 — "n/a" BANEADA globalmente como valor de campo (EV1-F07)**: ambigua por construcción
  (¿no-aplica o no-elicitado? — el exploit exacto del run 1). El único uso legítimo del wire (`ingest:n/a`)
  se renombra `none-needed` (lockstep SH-2: schema + routing del builder + ingest-token map). Campo sin
  elicitar NACE gap y SHIPEA como fila GAPS (born-gap literal); campo POSTURE con `→GAP` exige fila GAPS
  que nombre el campo (machine-checked).
- **DECIDIDO-8 — Guard CREATE/W-15**: wire sin marcadores de ratificación Y sin SIGNED BRIEF → el check
  emite N/A declarado (exit 0), jamás bloquea el todo-vacío. Marcadores presentes SIN brief → FAIL (la
  superficie exacta de F03). Con brief → check completo.
- **DECIDIDO-9 — Stage 0 del builder**: persistir wire → separar appendix a `sources/brief—<fecha>.md` →
  ambos a CHECKSUMS → correr `node tools/wire-check.mjs` INMEDIATAMENTE; FAIL = stop-and-report.
  Registro § Directives: fila nueva "verbatim-check compilado-vs-brief" → `lint (tools/wire-check.mjs —
  Stage 0 + fila run-gates)`.
- **DECIDIDO-10 — Regen de TODOS los wires de fixture al contrato v6** (regla de fixtures): Alpha/Beta/
  Gamma + los persistidos de gates/custody/{pass,fail} y gates/kit-off/{clean,violation} (sus filas
  propias siguen disparando su clase); fixtures NUEVOS que MUERDEN en `fixtures/wire-check/`.

## 3. Modos de falla (diseño explícito)

| Falla | Comportamiento |
|---|---|
| Línea WHY sin tag `BRIEF{}` | FAIL (untagged inside RATIFIED scope) — jamás herencia silenciosa |
| Quote `verbatim`/`anchor` no contenida en el brief | FAIL (el claim de ratificación no prueba) |
| `not-used(owner-declared)` sin cita o con cita ausente del brief | FAIL (blanket no acuña) |
| Marcadores de ratificación sin SIGNED BRIEF | FAIL (superficie F03) |
| Wire todo-vacío sin marcadores ni brief | N/A declarado (W-15 — CREATE jamás false-bloqueado) |
| `WIRE-CHECK` declarada ≠ recompute | FAIL (verdict-a-mano) |
| Literal fuera de vocabulario (las 6 clases + "n/a") | FAIL con nombre de clase |
| POSTURE `→GAP` sin fila GAPS que nombre el campo | FAIL (born-gap sin shipear) |
| Democión legítima (`BRIEF{ none }`) | PASS — cuenta en `demoted:` del WIRE-CHECK; el builder hereda hypothesis |

## 4. Inventarios (levantados por workflow — 6 barridos + critic; se asientan al cierre)

[PENDIENTE — se llena con el retorno del workflow de inventario]

## 5. Ronda de verify adversarial

[PENDIENTE — atacantes + juez contra el diseño implementado; tabla al cierre]

## 6. Qué NO hace este item (fronteras)

- F2-02 (gate-3.5 emite-o-waive-con-ledger + barrido pre-brief) y F2-03 (reemisión post-firma EV1-F08 ·
  no-✔ EV1-F14 · registro-cliente EV1-F09 · tabla destino⇒kit-slot EV1-F05) consumen este contrato — no
  se adelantan aquí.
- T2 (F3-02): consume `proposed`-cuarentena v5 + provenance por línea de aquí; CERO bump propio.
- La equivalencia semántica de una paráfrasis anclada (`anchor`) sigue siendo juicio de agente — el
  machine check prueba que el ancla EXISTE, no que la paráfrasis sea fiel; esa fidelidad la gobiernan la
  disciplina de firma (v5 E3-04) y el gate 7a. Límite declarado, no promesa.
