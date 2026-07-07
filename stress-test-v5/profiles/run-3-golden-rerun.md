# Run 3 — Golden re-run (essential-brand local, builder-side)

> No hay cliente que encarnar: es la regresión del golden set bajo la suite v5 final. Lado Code,
> no-blind (delta declarado en `protocol.md`).

## Qué es

`~/proyectos/essential-brand` (LOCAL, commit `f24afd9` — re-baselineado en E2: 22 citas verbatim +
12 `selector:none` honestos) se re-corre bajo las herramientas v5 finales del plugin v0.5.0.

## Procedimiento (lo ejecuta el harness/Code, 3 comandos)

1. `node <skill>/assets/templates/tools/audit-lint.mjs ~/proyectos/essential-brand` → **exit 0
   esperado, 0 hallazgos** (0 real, no 0-por-supresión: los seeds de CITATION del skill siguen
   disparando en fixtures — el harness lo verifica aparte).
2. `node <skill>/assets/templates/tools/run-gates.mjs ~/proyectos/essential-brand` → **exit 1
   esperado** con las clases CONOCIDAS: sin visual-keystone · sin asset-index · sin agent-gates ·
   sin handoff persistido · deny INTERIM (es un repo emitido pre-v5 — el board debe decirlo
   honesto, no fingir verde). Cualquier clase NUEVA de FAIL = hallazgo a registrar.
3. Restaurar frozen: `git checkout -- audit/` en el repo (porcelain 0 al cerrar).

## Veredicto

- PASS del run: (1) audit-lint 0 · (2) run-gates BLOCKED exactamente por las clases conocidas ·
  (3) repo restaurado frozen. Desviaciones → hallazgos con ruta:línea al gate final.
