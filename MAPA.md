---
name: brand-system-skills-mapa
title: brand-system-skills — MAPA
description: Qué archivos hay en este repo y para qué sirve cada uno. Se lee para ubicarse sin barrer el repo entero. Las filas las genera `mapa.py`; la columna «Qué es» se escribe a mano.
last_updated: 2026-09-01
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
| `BITACORA.md` | Qué pasó y cuándo, append-only. | raíz |
| `CLAUDE.md` | Cómo tocar este repo sin romperlo. | raíz |
| `LICENSE` | Licencia. | andamio |
| `PLAN-V5.md` | Plan de la versión 5 del catálogo. Histórico. | evidencia |
| `PLAN-V6.md` | Plan de la versión 6. El vigente. | raíz |
| `README.md` | Qué es el catálogo de skills de marca, para alguien de fuera. | raíz |
| `RESIDENT.md` | **Cómo es el catálogo hoy y por qué, y hacia dónde va (`## Rumbo`).** Solo lo atemporal — el índice de decisiones y la narrativa histórica viven en `BITACORA.md`. | raíz |
| `brand-system-skills-v5-analysis_2026-07-04.md` | Análisis fechado de la v5. Evidencia: no se reescribe. | evidencia |
| `docs/guardrails-reference.md` | Los ~18 guardrails de `CLAUDE.md` en su forma completa (razonamiento + detalle); `CLAUDE.md` solo trae el resumen de una línea cada uno. | raíz |
| `docs/tools-reference.md` | Las 9 herramientas de gate que el builder emite a cada repo cliente, documentadas en detalle (contrato, self-tests, fixtures); `CLAUDE.md` solo trae el resumen. | raíz |
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
