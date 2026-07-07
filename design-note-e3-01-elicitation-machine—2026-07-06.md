# Design note — E3-01 · Máquina de estados de elicitación del scoper

> Checkpoint de diseño ANTES de implementar (disciplina E1-02). Padres: NS-D, NS-E, R-13, C-S5, C-X2,
> V5-01. Contratos intactos: handoff E1-02 CONGELADO (verificado §6) · análisis CONGELADO. Restricción
> dominante: scoper SKILL.md a 499/500 — el mecanismo vive en una reference NUEVA; toda edición al SKILL
> es line-neutral o lleva trade logueado.

## 1. Forma — DECIDIDO: la máquina vive en `references/elicitation-machine.md`; el SKILL solo rutea

El SKILL conserva el pipeline de gates (macro-estados, ya existentes en prosa `SKILL.md:83-106`); la
máquina NUEVA es la capa MICRO: el ciclo de vida de CADA dimensión dentro del frame de scope. No es un
rediseño del pipeline — es el mecanismo que el gate 4 (y por herencia 4a/4b) ejecuta, y el que gobierna
qué dimensión se abre, cómo se prueba, y con qué evidencia se cierra.

## 2. Estados y transiciones (por dimensión)

Estados del ciclo de vida (los 2 primeros son de proceso; los 4 terminales proyectan al wire):

| Estado | Semántica | Proyección al wire congelado |
|---|---|---|
| UNOPENED | en el frame, sin elicitar. **Born-GAP: si el scoping cierra aquí, shipea `tagged-gap` — el default ES el gap, jamás silencio** | `tagged-gap` |
| OPEN | elicitación en curso (probes emitidos, material llegando, sin saturar) | — (no puede cruzar el seam) |
| DECIDED | dato con fuente del owner + spine ganado | `filled` |
| NOT-USED | declaración explícita del owner (jamás inferida de silencio) | `not-used(owner-declared)` |
| PROPOSED-QUARANTINE | el owner PIDIÓ el draft; valor scoper-autorado etiquetado | línea PROPOSED + fila GAPS que monta + mapa `tagged-gap` (convención fixture Alpha/Beta) |
| GAP | necesaria pero ausente/sin confirmar/sin saturar al cierre | `tagged-gap` |

Transiciones con guardas (qué evidencia permite avanzar; qué regresa):

- **Frame-gen (Stage 2, patrón KAOS/obstacle):** el análisis del perfil GENERA el frame — para cada
  meta de canon, "¿qué impediría expresarla?" produce las dimensiones/reaches; las dimensiones entran
  UNOPENED. Guarda de meta-cobertura: el frame cubre cada capa del canon + treatments + horizons +
  posture + las 2 dimensiones permanentes; la pregunta abierta al owner ("¿qué no hemos nombrado?")
  cierra la generación y su confirmación la ratifica. El frame queda ABIERTO a altas nuevas hasta el
  gate 6 (una dimensión descubierta a media conversación ENTRA, no se pierde).
- **UNOPENED → OPEN (selección constrained-CAT):** la siguiente ÁREA = mayor discrepancia contra los
  targets de cobertura (pesan más: slots MUST del fidelity contract, capas de canon con delta
  necesita-vs-sabe más grande); el ÍTEM dentro del área se improvisa desde la cantera (bancos = cantera,
  jamás script — regla generalizada de la máquina).
- **OPEN → OPEN (loop de probing por señales):** ambigüedad / omisión / vaguedad en una respuesta
  DISPARA el siguiente probe (la ambigüedad es recurso para lo tácito, no ruido). Cada probe y su
  rendimiento (material nuevo sí/no) se registra en el ledger.
- **OPEN → DECIDED** · guarda: dato con utterance del owner detrás (EH-1 para campos owner-meaning) y
  spine en su status GANADO — jamás por encima.
- **OPEN → NOT-USED** · guarda: declaración explícita del owner.
- **OPEN → PROPOSED-QUARANTINE** · guarda doble: (a) el owner INVITÓ el draft (el modo propone dispara
  con "propónme", jamás por default — anti-false-fail de marcas spare) y (b) curator wall: el draft nace
  etiquetado `source:proposed · confidence:hypothesis` montado en un gap de lenguaje cliente.
- **OPEN → GAP (cierre por saturación):** N probes consecutivos sin material nuevo cierran el PROBING de
  la dimensión (default N=2, registrado por dimensión en el ledger — lo auditable es el REGISTRO, no la
  constante); si al saturar sigue sin resolverse, cierra GAP con su registro de saturación (probes
  emitidos · último material nuevo · por qué cerró).
- **Terminal → OPEN (reopen):** material nuevo (otra sesión, otro decider) re-abre; el ledger registra
  el reopen con fecha. Regresión por guarda: un dato que falla el EH self-check (owner-meaning sin
  utterance) SE RE-STATUSEA a GAP (`SKILL.md:407` ya lo ordena — la máquina le da el estado destino).

## 3. Dónde vive el estado (el scoper es chat — cero filesystem)

**El dimension ledger**: tabla corriente por dimensión (dimensión · estado · probes/rendimiento ·
último-material-nuevo · fuente/owner · señal pendiente) que vive en la superficie Internal status
(`SKILL.md:330` ya la define como hogar del mapa + spine) y se SNAPSHOTEA dentro de cada DELIVERABLE de
gate (fechado ISO + versionado, `SKILL.md:106`) — el estado es evidencia-de-proceso (TEMPO), no memoria
de conversación. Proyección final: DIMENSION MAP + GAPS del handoff; el ledger completo viaja en el
scoping-doc cuando existe (fila ya prevista del manifest, `handoff-format.md:71`). Cero carrier nuevo.

## 4. Modos de falla (degradan declarado, jamás callan)

| Falla | Comportamiento |
|---|---|
| Usuario salta fases ("ya compílalo") | Los gates BLOCKING no se saltan; la máquina responde emitiendo el ledger: todo UNOPENED/OPEN shipearía `tagged-gap` — se le DICE al owner qué pierde; el waive es suyo y waivea-a-GAP visible, jamás a silencio |
| Conversación interrumpida / sesión nueva | El estado = último snapshot del ledger en el último DELIVERABLE (el owner los conserva); se re-carga de ahí; lo posterior al snapshot se RE-elicita, jamás se adivina |
| Estado corrupto/ambiguo (snapshots en conflicto, fila contradictoria) | La dimensión REGRESA a OPEN y se re-confirma con el owner — la máquina nunca elige en silencio entre dos estados en conflicto |
| Saturación gameada (relleno para cerrar) | La saturación cierra el PROBING, no la verdad: cerrar saturada ≠ DECIDED — sin guarda EH-1 la dimensión cierra GAP |
| Punto ciego del frame (el perfil no sugirió una dimensión) | Pregunta abierta + confirmación del owner + la ley existente: dimensión no-enumerada = handoff-defect del scoper (`SKILL.md:170-174`) — la máquina agrega la caminata de meta-cobertura contra las capas del canon |

## 5. Enforcement (vocabulario del registro E1-02)

Honestidad estructural: el scoper corre en chat — TODO lo scoper-side es `agent-gate` por construcción
(no hay lint que corra ahí); lo que la máquina garantiza machine-true es su PROYECCIÓN al wire, que los
gates del builder ya vigilan:

| Pieza | Clase |
|---|---|
| Meta-cobertura del frame + registro de saturación + ledger snapshoteado | agent-gate (evidencia committeada en los DELIVERABLEs — la misma disciplina que `audit/agent-gates.md` del builder) |
| Resolución de toda dimensión en el wire | parse-or-stop (Stage 0 — ya en el registro, `handoff-format.md:211`) |
| Cuarentena etiquetada + capada | lint downstream (audit-lint R2 proposed-cap · R5 hypothesis→GAP) + regla del contrato (`handoff-format.md:143-146`) |
| Born-GAP (campo sin elicitar nace GAP) | agent-gate scoper-side · parse-or-stop + lint en el destino |
| Curator wall | agent-gate (regla ESCRITA — §7) |

## 6. Fronteras y contrato

- **Contrato handoff INTACTO — verificado contra los fixtures:** los 4 estados terminales proyectan
  sobre literales EXISTENTES del wire (filled · not-used(owner-declared) · tagged-gap · PROPOSED+gap);
  la convención cuarentena→(PROPOSED + fila GAPS + tagged-gap) es exactamente la de los fixtures
  Alpha/Beta. La máquina muta el PROCESO, no la emisión ⇒ los 3 fixtures se regenerarían idénticos —
  **regla de fixtures NO dispara**.
- **Seam E3-02 (proxy/multi-decider) NOMBRADO, no implementado:** la máquina registra fuente/owner por
  probe (el ledger ya carga la columna); la consolidación multi-voz y la degradación
  actitudinal-vía-proxy son Stage 5 / E3-02.
- **4a/4b heredan la máquina:** posture y horizons son dimensiones DEL frame; sus baterías son cantera
  (V5-01: el objetivo del PR-seed se conserva — campo sin elicitar nace GAP — con mecanismo NS-E).
- El builder no lee el método del scoper — consume el wire; nada del builder se toca en este item.

## 7. Curator wall — regla ESCRITA (enmienda ronda v6 cumplida)

Hogar: `references/process-discipline.md` (el doc de leyes de proceso — TA-1/TA-4 ya viven ahí), como
sección propia que la máquina referencia y el SKILL nombra line-neutral en su ley de frontera. Contenido
normativo: el scoper CURA y estructura lo que el owner y su material aportan; JAMÁS manufactura verdad
de marca. Bajo invitación directa ("decídelo tú", "invéntalo"), el muro sostiene: draftear SOLO al canal
de cuarentena etiquetado y SOLO a petición explícita; decidir/decretar/confirmar por el owner, nunca.
Hechos disconfirmantes se muestran, no se supavizan. Herederos por referencia: el modo propone del
elicitation-bank y los sucesores que generen opciones.

## 8. DECIDIDOs

1. **Proyección sin re-abrir el contrato** — los 4 estados terminales mapean a literales existentes;
   cuarentena usa la convención Alpha/Beta. Porqué: el contrato es CONGELADO y la realidad del wire ya
   carga los 4 destinos; re-abrirlo sería costo sin ganancia.
2. **Estado en el ledger + snapshots en DELIVERABLEs** — cero carrier nuevo, cero artefacto nuevo de
   contrato; TEMPO ya define evidencia-de-proceso como el reloj. Porqué: chat-based ⇒ lo durable es lo
   que el owner conserva; los DELIVERABLEs ya son fechados+versionados.
3. **Saturación con N=2 default, registrado por dimensión** — lo auditable es el registro (probes ·
   último material nuevo · por qué cerró), no la constante. Porqué: la fuente operacionaliza "N
   consecutivos sin material nuevo" con N pequeño; un N fijo grande sobre-entrevista marcas spare
   (anti-false-fail W-1).
4. **Machine reference nueva + SKILL line-neutral** — presupuesto 499/500 respetado por diseño: el
   ruteo monta en líneas existentes (§4 :262-268, §4a/4b :288-291, frontera :434), cada una editada sin
   crecer el conteo. Porqué: la restricción dominante del prompt es de primera clase.
5. **Curator wall en process-discipline.md** — es ley de proceso trans-stage (como TA-1/TA-4), no
   mecánica de gate-4; N9/T2 heredan la regla escrita por referencia. Porqué: un hogar por función; el
   machine reference la consume, no la posee.
6. **UNOPENED/OPEN jamás cruzan el seam** — solo estados terminales proyectan; un OPEN al momento de
   compilar es defecto del propio scoper (born-GAP lo resuelve: cierra GAP declarado). Porqué: el wire
   exige resolución total (parse-or-stop); la máquina garantiza que siempre HAY una resolución honesta.
