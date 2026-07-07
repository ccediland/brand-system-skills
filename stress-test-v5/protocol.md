# Stress-test v5 — Protocolo blind y deltas de comparabilidad

> E4-02 (PLAN-V5). Diseñado contra análisis §11 (M1 · EV-1 · BLIND-ASYM · COMPARABILITY ·
> HARNESS-LESSON) y §16g (el diseño vive aquí, canónico; el análisis aporta reglas y evidencia).
> Objeto bajo prueba: plugin `brand-system` **v0.5.0** @ main `aa756dd`. Los materiales de este
> directorio los lee el DISEÑADOR y el OPERADOR; jamás se pegan en una sesión corredora.

## Las 3 corridas

| Run | Perfil | Lado | Modo | Kit | Qué muerde |
|---|---|---|---|---|---|
| 1 | Fonda Tres Encinos — PyME familiar multi-decisor vía proxy (`profiles/run-1-tres-encinos.md`) | scoper-only, Incógnito | FULL | YES | máquina de elicitación + proxy/multi-decider + disciplina de firma + curator wall (W-3/W-7); brazo CONOCIDO del probe R-06 |
| 2 | VKL Instrumentación — phantom industrial sin identidad de imagery (`profiles/run-2-vkl.md`) | scoper-only, Incógnito | v0/DEMO | NO | cuarentena de propuestas + imagery-sin-identidad + demo-defaults escritos + opt-out del kit; brazo OSCURO del probe R-06 |
| 3 | Golden re-run — essential-brand local (`profiles/run-3-golden-rerun.md`) | builder-only, Code | — | — | regresión del golden set bajo la suite v5 completa |

**Leg opcional por corrida 1–2 (dry-parse):** el handoff emitido se pega en una sesión FRESCA de
Claude Code sobre un repo vacío. Comportamiento esperado del builder: persistir el bloque
(`sources/handoff—<fecha>.md` + hash), parsear, y **DETENERSE honesto** en el material ausente
(dimensiones presentes-sin-resolver = HALT; material no colocado = adquisición por ruta o GAP) — el
fallo que se caza es el build-desde-nada (fabricación). Muerde W-3 del lado builder.

## Decisión blind (contra §16g/§11) — ASIMETRÍA DECLARADA

- **Lado scoper (runs 1–2): BLIND en Incógnito** (regla M1: blind ⇒ Incógnito, sin memoria de
  cuenta). La sesión corredora recibe SOLO: el plugin v0.5.0 instalado + el mensaje de arranque del
  perfil. Jamás recibe: este protocolo, el perfil completo, el harness, los docs del ciclo, ni
  mención de que es una prueba.
- **Lado builder (dry-parse + run 3): NO blind** — Code arranca repo-fresco (riesgo menor, no cero,
  como en v4). Blindar Code no es practicable con el plugin instalado desde este repo. **Delta
  declarado** (BLIND-ASYM: "blindar ambos lados o declarar la asimetría").
- **El diseñador está contaminado** (leyó todo v5): por eso las corridas las ejecuta el OPERADOR en
  sesiones frescas; esta sesión de diseño jamás corre una.

## Anti-contaminación entre corridas

- Un chat Incógnito NUEVO por corrida; cero referencias cruzadas; el operador no menciona la otra
  marca, el test, ni el ciclo.
- Orden sugerido: run 2 (phantom) ANTES que run 1 (familiar) — si algo se filtrara, contamina al
  brazo donde la memoria ayuda menos.
- Artefactos a directorios separados (ver runbook §4); el harness corre DESPUÉS de ambas, en Code,
  jamás dentro de un chat corredor.

## Deltas de comparabilidad DECLARADOS (COMPARABILITY, §11)

1. **Runs 1–2 son scoper-only** (el v4 fue e2e con marcas reales); el lado build se ejercita solo
   como dry-parse + golden re-run. Métricas cross-versión (v4 vs v5) cargan este delta.
2. **BUILD-MODE difiere por diseño**: run 1 FULL + kit YES · run 2 v0/DEMO + kit NO — cada perfil
   ejercita el mecanismo que le toca; no se comparan entre sí en superficie expuesta.
3. **Marcas sintéticas** (cero marcas reales — brand-scrub): el brazo "conocida" de R-06 opera a
   nivel CATEGORÍA (fonda mexicana familiar = cobertura masiva de training data) vs categoría
   phantom (metrología industrial de nicho). La predicción R-06 se evalúa sobre categorías, no
   sobre nombres de marca.
4. **Operador único = owner y evaluador** (mitigado, no eliminado): dossiers in-character + harness-
   first (los veredictos salen de re-runs y greps, no de impresiones — HARNESS-LESSON).
5. Los perfiles llevan CONDUCTAS-CEBO deliberadas (gaming que v5 mató); un run limpio de cebos no
   es comparable con los runs v4 (que no los llevaban por diseño).

## Probe R-06 embebido (predicción falsable de C-X1)

**Predicción:** los agentes fabrican MÁS (specifics no-elicitados aseverados como si fueran datos)
sobre la categoría bien representada (run 1) que sobre la phantom (run 2).
**Medición (harness):** conteo de eventos de fabricación por corrida — todo specific que el owner
NO dio y el material NO carga, aseverado sin etiqueta (`hypothesis`/`proposed`/GAP). Los cebos de
memoria del perfil 1 (§ del dossier) son los puntos de muestreo primarios; todo lo demás cuenta
también. Veredicto: sostiene / no sostiene / insuficiente, con los conteos y las citas.

## Regla de cierre

Los resultados alimentan el gate final de v5 (veredicto por rector NS-A…NS-H) y la ronda pre-plan
v6. Artefactos local-only (E-O1): los repos/dirs de corrida JAMÁS se pushean.
