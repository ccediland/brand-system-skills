---
name: bitacora-brand-system-skills
title: brand-system-skills — bitácora
description: >-
  Registro append-only de lo que pasó en este repo y cuándo. Es RASTRO, no fuente: los hechos
  atemporales viven en RESIDENT.md y las reglas en CLAUDE.md; aquí solo se referencian.
last_updated: 2026-08-31
status: vigente
supersede: ninguno
---

# brand-system-skills — bitácora

> **Append-only.** Se agrega al final; **nunca** se edita ni se reordena una entrada pasada. Si algo
> quedó mal, se corrige con una entrada nueva que referencia a la vieja.
>
> Un dictamen o una revisión posterior **es una entrada más, abajo y con su fecha** — jamás una nota
> pegada en esta cabecera. Una cabecera que reinterpreta lo de abajo contradice el append-only, y ya
> pasó una vez: un dictamen afirmaba «la única entrada» sobre un archivo que tenía cinco, y mintió el
> mismo día en que se escribió.

## Para qué sirve tener esto aparte

`RESIDENT.md` contesta *cómo es este proyecto hoy*. Si además carga la narrativa de lo que fue
pasando, cambia en cada sesión — y entonces el knowledge de su Project queda desfasado siempre y el
«Sync now» manual se vuelve diario. Con la bitácora aparte, el RESIDENT solo cambia cuando la forma
del proyecto cambia de verdad, y lo fechado —que es justo lo que envejece el knowledge— nunca entra
ahí.

## Formato

```markdown
## AAAA-MM-DD · <superficie> · <objetivo en una línea>

Hecho: <qué se produjo, en pasado, con cifras si las hay>
Decidido: <IDs de decisiones registradas, o "ninguna">
Pendiente: <lo que quedó abierto>
Siguiente: <la primera acción de la próxima sesión>
```

Superficie es una de: Code, Chat, Chrome, Cowork.

---

## 2026-08-31 · Code · Se siembra la bitácora, con lo que ya había pasado

Hecho: se crea este archivo como parte del doc-set de cinco del estándar de VenturEdge. La primera
entrada no se inventa: recoge los commits reales de esta sesión en el repo.

- Arreglar front matter y punteros que el auditor encontro (#78)

Decidido: ninguna en este repo (las del sistema viven en `_meta/venturedge-framework/decisiones.md`).
Pendiente: `MAPA.md`, el quinto documento del estándar, que aquí todavía no existe.
Siguiente: al cerrar la próxima sesión que toque este repo, agregar su entrada aquí — sin preguntar.

## 2026-08-31 · Code · Sesión de sistema

Hecho: 3 commit(s) en este repo, dentro de la sesión que cerró el doc-set de cinco en los
quince repos, escribió el criterio de dónde registrar un esfuerzo, y construyó el agregador de
avance sobre los dos dominios de Workspace.

- limpieza: sacar los volcados de sesion de Playwright MCP (#81)
- docs: MAPA.md, el quinto documento del estandar (#80)
- docs: BITACORA.md, el cuarto documento del estandar (#79)

Decidido: las del sistema viven en `_meta/venturedge-framework/decisiones.md` (`VE-2026-020` a
`VE-2026-033` se escribieron hoy).
Pendiente: lo que quedó abierto está en `pendientes.md` y como issues etiquetados por área.
Siguiente: al cerrar la próxima sesión que toque este repo, agregar su entrada aquí — sin preguntar.

## 2026-08-31 · Code · La caja de medios del builder, instalada y probada

Hecho: barrido exhaustivo (5 lectores) de los casos de medios que builder/scoper declaran, cruzado
contra la caja real de la máquina. Instalado lo que faltaba de sistema: Inkscape 1.4.3, pdf2svg,
rsvg-convert, woff2, dembrandt (npm, el extractor primario de tokens de sitio vivo), y el venv
`.venv/` de este repo con el stack que fidelity-diff.py exige (pymupdf 1.28.2, opencv 5.0, numpy,
scikit-image, pillow, fonttools, requests) — import-guard en verde (ya no exit 3) y pipeline real
probado: SVG→PDF con Inkscape, get_drawings() extrae los paths, pdf2svg de regreso, métricas OS/2
con fontTools. `.venv/` entra al .gitignore.

Encontrado y corregido: el `mark.svg` de la plantilla era XML inválido — el comentario contenía
`--` (por escribir `var(--color-brand)` dentro de un comentario). Inkscape lo toleraba; librsvg y
cualquier parser estricto rechazaban el archivo COMPLETO, y cada repo emitido lo heredaba. Barrido
de la clase en todo ~/proyectos: solo la plantilla madre estaba mal, los fixtures limpios.

Sin instalar, con razón: design-extract (0.1.0, demasiado verde — dembrandt lo cubre),
illustrator-parser-pdfcpu y token-transformer (deps por-proyecto npm, no de sistema; Ghostscript ya
está para EPS/.ai), Storybook/Chromatic/esbuild/Style Dictionary (viven en el package.json del kit
emitido). Firecrawl (fallback anti-bot) necesita cuenta/key de Carlos — issue abierto.
