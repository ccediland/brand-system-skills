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
   esperado** con las clases CONOCIDAS: sin visual-keystone · sin asset-index · sin agent-gates
   (×5 filas) · deny INTERIM · keystone structural — `audit/redteam/expected-refusal-contract.md`
   ausente en el golden (clase conocida INTERINA hasta el re-baseline E3 pendiente del pre-plan v6;
   el golden sí tiene `battery.md`) — (es un repo emitido pre-v5 — el board debe decirlo honesto,
   no fingir verde). Nota tools v5: la ausencia de handoff persistido emite **N/A**, no FAIL
   (`run-gates.mjs:138,202`) — retirada de las clases esperadas (gate final 2026-07-16, veredicto
   EV-1 §2e H2-r3). Cualquier clase NUEVA de FAIL = hallazgo a registrar.
3. Restaurar frozen: `git checkout -- audit/ && git clean -fd audit/gates/` en el repo (porcelain 0
   al cerrar; run-gates v5 escribe `audit/gates/report.md` untracked y el checkout no lo elimina —
   veredicto EV-1 §2e H3-r3).

## Veredicto

- PASS del run: (1) audit-lint 0 · (2) run-gates BLOCKED exactamente por las clases conocidas ·
  (3) repo restaurado frozen. Desviaciones → hallazgos con ruta:línea al gate final.
