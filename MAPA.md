---
name: brand-system-skills-mapa
title: brand-system-skills — MAPA
description: Qué archivos hay en este repo y para qué sirve cada uno. Se lee para ubicarse sin barrer el repo entero. Las filas las genera `mapa.py`; la columna «Qué es» se escribe a mano.
last_updated: 2026-08-31
status: vigente
supersede: ninguno
---

# brand-system-skills — MAPA

Qué hay aquí y para qué sirve. Una fila describe **la unidad más pequeña con un
propósito distinto**: un archivo si es único, un directorio si sus archivos son
homogéneos (ahí la fila dice cuántos son y qué convención siguen).

**La columna `Autoridad` es la que hay que leer antes de editar nada:**

| Valor | Significa |
|---|---|
| `raíz` | Fuente de verdad. Se edita aquí. |
| `proyección` | Generado desde otra cosa. **No se edita aquí** — se corrige la fuente. |
| `evidencia` | Registro congelado de algo que pasó. No se actualiza. |
| `andamio` | Config, scaffold, herramienta. Se toca cuando estorba. |

<!-- MAPA:INICIO — filas generadas por mapa.py. La columna «Qué es» se escribe a mano y se conserva. -->
| Ruta | Qué es | Autoridad |
|---|---|---|
| `.claude-plugin/marketplace.json` | Declara este repo como marketplace de plugins de Claude Code. | andamio |
| `.claude-plugin/plugin.json` | Manifiesto del plugin: qué skills expone. | andamio |
| `.gitignore` | Qué no entra. | andamio |
| `.playwright-mcp/page-2026-07-18T03-04-36-915Z.yml` | Volcado de una sesión de Playwright MCP del 18-jul. Basura de sesión que se coló al repo. | evidencia |
| `.playwright-mcp/page-2026-07-18T03-06-58-163Z.yml` | Ídem. | evidencia |
| `.playwright-mcp/page-2026-07-18T03-07-43-945Z.yml` | Ídem. | evidencia |
| `.playwright-mcp/page-2026-07-18T03-18-20-164Z.yml` | Ídem. Los cuatro son candidatos a limpieza. | evidencia |
| `BITACORA.md` | Qué pasó y cuándo, append-only. | raíz |
| `CLAUDE.md` | Cómo tocar este repo sin romperlo. | raíz |
| `LICENSE` | Licencia. | andamio |
| `PLAN-V5.md` | Plan de la versión 5 del catálogo. Histórico. | evidencia |
| `PLAN-V6.md` | Plan de la versión 6. El vigente. | raíz |
| `README.md` | Qué es el catálogo de skills de marca, para alguien de fuera. | raíz |
| `RESIDENT.md` | **Cómo es el catálogo hoy y por qué.** 593 líneas contra un tope de 200 — su narrativa histórica pertenece a `BITACORA.md`. | raíz |
| `brand-system-skills-v5-analysis_2026-07-04.md` | Análisis fechado de la v5. Evidencia: no se reescribe. | evidencia |
| `notes/` | Notas de trabajo del catálogo. | raíz |
| `skills/` | **El catálogo.** Las skills de sistema de marca: el scoper que entrevista al dueño y el builder que construye el canon de cuatro capas más su espina de tokens. | raíz |
| `stress-test-v5/failure-gallery-v5.md` | Galería de fallos encontrados en el stress-test. | evidencia |
| `stress-test-v5/harness-ev1.md` | El arnés de prueba. | raíz |
| `stress-test-v5/profiles/run-1-tres-encinos.md` | Corrida 1 del stress-test. Evidencia fechada. | evidencia |
| `stress-test-v5/profiles/run-2-vkl.md` | Corrida 2. | evidencia |
| `stress-test-v5/profiles/run-3-golden-rerun.md` | Corrida 3, la de referencia. | evidencia |
| `stress-test-v5/protocol.md` | El protocolo del stress-test. | raíz |
| `stress-test-v5/runbook.md` | Cómo correrlo. | raíz |
<!-- MAPA:FIN -->
