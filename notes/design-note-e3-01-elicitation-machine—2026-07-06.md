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
| PROPOSED-QUARANTINE | el owner PIDIÓ el draft; valor scoper-autorado etiquetado | línea PROPOSED (o slot WHAT) + el gap de lenguaje cliente que monta — la regla de cuarentena del contrato verbatim; una propuesta jamás resuelve ni re-escribe la fila del mapa de su dimensión [corregido por verify F1 — la versión original agregaba "mapa tagged-gap", elemento que los fixtures Alpha/Beta contradicen] |
| GAP | necesaria pero ausente/sin confirmar/sin saturar al cierre | `tagged-gap` |

Transiciones con guardas (qué evidencia permite avanzar; qué regresa):

- **Frame-gen (Stage 2, patrón KAOS/obstacle):** el análisis del perfil GENERA el frame — para cada
  meta de canon, "¿qué impediría expresarla?" produce las dimensiones/reaches; las dimensiones entran
  UNOPENED. Guarda de meta-cobertura: el frame cubre cada capa del canon + treatments + horizons +
  posture + applied-expression/social + consultation-surface — esta última EXENTA del lifecycle
  (FIXED `always-required`: jamás UNOPENED/OPEN, jamás probada, proyecta su literal PERMANENT verbatim;
  born-GAP no le aplica) [corregido por verify SM-01]. La pregunta abierta al owner ("¿qué no hemos
  nombrado?") cierra la generación y su confirmación la ratifica. El frame queda ABIERTO a altas nuevas
  hasta el compile 7b (una dimensión descubierta a media conversación — incluso durante la revisión
  gate-6/7a, mostrada al owner como delta — ENTRA, no se pierde) [corregido por verify SM-06].
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

- **Contrato handoff INTACTO — verificado contra los fixtures (post-verify):** los estados terminales
  proyectan sobre literales EXISTENTES del wire — en el DIMENSION MAP: filled ·
  not-used(owner-declared) · tagged-gap; en su bloque propio cuando la dimensión vive en otro bloque
  (HORIZONS `direction|not-relevant|tagged-gap` · POSTURE `none`/`→GAP` · `filled(media-attached)`)
  [corregido por verify WIRE-03]; cuarentena = PROPOSED + gap que monta, SIN elemento de mapa
  [corregido por verify F1]; el bloque OPTIONAL y los 2 slots directiva quedan FUERA del lifecycle
  (resuelven por su propia regla del contrato) [corregido por verify WIRE-04]. La máquina muta el
  PROCESO, no la emisión ⇒ los 3 fixtures se regenerarían idénticos — **regla de fixtures NO dispara**.
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
Hechos disconfirmantes se muestran, no se supavizan. Herederos por referencia: las propuestas en
cuarentena de hoy y cualquier futuro modo propone [corregido por verify F4 — el elicitation-bank no
carga un modo propone hoy].

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

## 9. §verify — adversarial verify de la máquina (2026-07-07, convención E1-02 §10quater)

Workflow de 4 atacantes (gaming de guardas · soundness formal · cumplimiento del contrato congelado ·
consistencia/presupuesto/honestidad) + juez con repro propio por hallazgo (34 crudos → 22 confirmados,
4 falsos positivos). **Veredicto inicial: FAIL — 2 BLOCKER + 9 MAJOR + 6 MINOR + 5 NIT; los 22
corregidos en el acto** (marcas `[corregido por verify …]` inline en esta note donde tocaban al spec).

| # | Sev | Defecto | Fix aplicado |
|---|---|---|---|
| F1 | BLOCKER | La proyección de PROPOSED-QUARANTINE inventaba un tercer elemento del wire ("+ tagged-gap en el mapa") que el contrato no define y los fixtures Alpha/Beta CONTRADICEN — la afirmación "los fixtures se regenerarían idénticos" era falsa | Cláusula eliminada; la proyección queda en la regla de cuarentena del contrato verbatim (una propuesta jamás re-escribe la fila del mapa); note §2/§6 reconciliadas |
| SM-01 | BLOCKER | consultation-surface forzada al lifecycle (UNOPENED→…) sin estado capaz de proyectar su literal PERMANENT `always-required` — una corrida literal la compilaba `tagged-gap`, fila que el contrato PROHÍBE | Exención escrita en § The frame: entra al frame por meta-cobertura pero vive FUERA del lifecycle; proyecta su literal verbatim; born-GAP no le aplica |
| WIRE-03 | MAJOR | La columna "projects onto" era universal pero solo válida para filas del DIMENSION MAP — horizons (`not-relevant`), posture (`none`/`→GAP`) y media (`filled(media-attached)`) tienen literales propios | Columna scopeada al MAP + regla: dimensión con hogar en otro bloque termina en los literales de SU bloque |
| WIRE-04 | MAJOR | "EVERY dimension in scope" + born-GAP contradecía el bloque OPTIONAL (demo-defaults son valores ESCRITOS sin fuente owner — inalcanzables vía guarda DECIDED) y el slot Claude Design (UNFILLED = defecto, no gap) | OPTIONAL + 2 slots directiva EXENTOS del lifecycle — resuelven por su propia regla del contrato |
| SM-03 | MAJOR | Sin transición para material owner-volunteered en dimensión UNOPENED (un "no usamos motion" espontáneo no tenía camino y podía shipear tagged-gap) | Transición nueva UNOPENED→OPEN (material-triggered), fuera del orden por discrepancia |
| SM-06 | MAJOR | Frame cerraba a altas en gate 6 — una dimensión surgida en la ventana gate-6→7b (donde más emergen) no tenía destino | Frame abierto hasta el compile 7b; solo post-seam es handoff-defect |
| SM-05 | MAJOR | Reopen sin conciencia de gate: material post-firma-7a divergía el bloque compilado del brief firmado sin re-ratificar | Reopen post-7a re-abre la línea del brief: 7b no compila hasta re-ratificar (o waive → GAP registrado) |
| GM-03 | MAJOR | "or owner-supplied material" en la guarda DECIDED dejaba que campos owner-meaning decidieran desde prosa de material (contradice EH-1) | Material solo decide slots factual/observable; owner-meaning exige UTTERANCE real — el material SIEMBRA, no decide |
| GM-01 | MAJOR | Semántica de waive indefinida para los self-checks de integridad — "waives INTO visible gaps" era falso para un check de status waiveado | Waive = solo COBERTURA; los gates de integridad de status (EH, client-surface, gate 5, curator wall) JAMÁS waiveables |
| GM-05 | MAJOR | El preámbulo permitía literalmente compilar con 7a waiveado — el contrato lo prohíbe y ningún texto resolvía el conflicto | 7a jamás waiveable-INTO-compile: waive de 7a = STOP, no skip |
| GM-02 | MAJOR | La guarda NOT-USED aceptaba un blanket ("marca el resto not-used") — lavaba born-gaps en filas limpias sin gap ni STOP del builder | Especificidad por dimensión: la declaración es sobre ESA dimensión nombrada al owner; blanket se responde CON el ledger + ruta waive-a-gaps-visibles |
| GM-04 | MINOR | Ambigüedad ruta-vs-valor: el `proposed:` de GAPS (ruta de resolución) vs el draft de valor del curator wall | Oración en el wall: proposed-resolution nombra RUTA, jamás valor drafteado; el valor solo viaja en PROPOSED etiquetado |
| GM-07 | MINOR | "gate-6 promote" invocado 2 veces sin definición | Definido en la máquina: el owner confirma el ITEM en To-confirm → `owner-confirmed` citando esa confirmación; sin superficie no hay promote |
| GM-08 | MINOR | Invitación del modo propone sin autoridad ni alcance (blanket de sesión 1 la satisfacía) | Invitación por SLOT del Accountable; blanket no autoriza más allá de lo nombrado |
| SM-08 | MINOR | Guard-regression escondida en el bullet de reopen, sin el destino owner-declared `none` que el SKILL permite | Bullet propio terminal→GAP-o-NOT-USED + corrupt→OPEN como transición |
| F3 | MINOR | Ruteo de carga incoherente (la máquina siembra Stage 2 pero decía cargarse en gate 4; SKILL §2 sin directiva de carga) | "Load it at Stage 2 … through gate 4" + parenthetical line-neutral en SKILL §2 |
| WIRE-06 | MINOR | "committed evidence"/"ships with its ledger record" over-claimeaban (deliverables chat-side; el wire no carga ledger) | Honesto: evidencia registrada en deliverables que el owner conserva; proyección al wire = MAP + GAPS solamente |
| GM-10 | NIT | N de saturación sin dueño (N=1 post-hoc formalmente auditable) | N se fija ANTES del primer probe; desviación registrada con razón |
| SM-10 | NIT | Contador de saturación tras reopen sin especificar | Reopen RESETEA el contador; probes previos quedan como historia |
| F4 | NIT | La note citaba un "modo propone del elicitation-bank" que no existe (grep 0) | Note corregida: herederos = cuarentena de hoy + cualquier futuro modo propone |
| WIRE-09 | NIT | Celda del stage-table decía "Layer-mapped interview" (framing retirado) | "Frame-generated interview (runs the elicitation machine)" — line-neutral |
| F5 | NIT | El compile guard perdió el framing de accountability del DECIDIDO 6 | Parenthetical: OPEN al compilar = defecto de proceso del scoper, registrado en el ledger |

- **Falsos positivos (4):** liveness de OPEN (la progresión de gates + waive son salidas definidas) ·
  reload de snapshot pegado (propiedad inherente del estado chat-side, declarada honesta) · la mitad
  DECIDED de GM-02 ("márcalo todo decided" no aporta dato al que la guarda se ancle; valor
  scoper-supplied ya prohibido) · GM-01 como BLOCKER (degradado: el payload ya lo prohíben EH-1/EH-2/el
  wall — el waive saltaba la auditoría, no la ley).
- **Re-pro post-fix:** los 22 verificados EN DISCO por marca textual (24 greps, 24/24 = 1 hit); SKILL
  499/500; sin duplicados por las ediciones sucesivas (7 headings únicos, 10 transiciones únicas).
- **Verificado-NEGATIVO:** contrato congelado intacto — ningún fix tocó handoff-format.md ni los 3
  fixtures; los literales de los fixtures quedan DENTRO del vocabulario de proyección post-fix.
