# brand-system-skills — CLAUDE.md (agent ops & guardrails)

> A Claude Code plugin marketplace whose skills build a generic, brand-agnostic, output-agnostic **brand
> canon** (four layers + DTCG/OKLCH token spine) for any brand. This repo is the SKILL/tooling — not a
> brand canon itself. Read `RESIDENT.md` first, then this file.

## Cómo verificar
Este repo no tiene build ni test suite propios — es el repo de SKILL/tooling; lo que construye corre
en los repos CLIENTE que emite, no aquí. El verde de este repo es:

- **El self-test de cada gate emitido**, contra sus propios fixtures (`tools/fixtures/`) — comando
  exacto por herramienta en `docs/tools-reference.md`. Ejemplo:
  `node skills/brand-canon-builder/assets/templates/tools/audit-lint.mjs
  skills/brand-canon-builder/assets/templates/tools/fixtures/clean` (exit 0) y `.../fixtures/seeded-violation` (exit 1).
- **`python3 ~/.claude/tools/audita.py revisa .`** — el verificador del doc-set de VenturEdge
  (RESIDENT/CLAUDE/BITACORA/MAPA, front matter, presupuestos de longitud).
- **El pre-commit global** (`core.hooksPath` → `~/.config/git/hooks`) corre gitleaks + format-hook en
  cada commit, automático — este repo no tiene un pre-commit propio.
- **El brand-scrub**: antes de commitear un cambio a `skills/`/`assets/templates/`, grep el árbol
  trackeado por cualquier nombre de marca real, ink o valor de token real — debe dar 0 hits (regla
  completa en `docs/guardrails-reference.md`).

El inventario de archivos vive en `MAPA.md` (generado); la arquitectura narrativa del repo, en `RESIDENT.md` → `## Repo map`. Aquí no se duplica ninguno de los dos.

## How the skills work (one line each)
- **brand-canon-builder** — scaffold the canon → fill what the brand's material/brief supports → log the
  rest as tracked `GAP-NNN` → emit the DTCG/OKLCH token spine → render the Stage-8 prototype as the **complete
  interactive brandbook** (manifest sections + "Decisions for you" panel, RV-5) → attach the Claude Design
  adapter (per the handoff's explicit kit slot — NO emits nothing, machine-reconciled) → validate.
- **brand-canon-scoper** — in chat (no filesystem), run the per-dimension **elicitation machine** (frame
  generated from the profile; every dimension ends in one honest terminal state — an unelicited field is
  BORN a gap) through the **client-surface flow** (one instrument, three checkpoints: gate 3.5 intake →
  gate 6 review → gate 7a Final Brand Brief, the BLOCKING client approval; every instrument a complete
  downloadable doc) → compile one ready-to-paste 7b handoff block for the builder, only after sign-off
  (the signing discipline: text-before-signature; the machine block is the ONLY path to the builder).

## Herramientas emitidas (resumen — detalle completo en `docs/tools-reference.md`)
El builder copia `assets/templates/tools/` a cada repo emitido como `tools/`. Una línea por herramienta:

- `run-gates.mjs` — corre y reporta la suite completa (status board, NOT-RUN de primera clase).
- `audit-lint.mjs` — el gate BLOQUEANTE de provenance/completeness/reconciliation (R0–R8).
- `source-recover.py` — recuperación de fuente archivada (Wayback CDX + SHA-256).
- `fidelity-diff.py` — fidelity MEDIDA (ΔE2000/SSIM/glyph metrics), no veredicto a mano.
- `wire-check.mjs` — verbatim-check del wire contra el brief firmado que carga.
- `tokens-project.mjs` — proyección STRING del spine para consumidores string-only (SD v5).
- `emit-cards.mjs` — cards offline `@dsCard`, cero red — la pierna offline del kit.
- `scheme-derive.mjs` — materializa cada esquema de color nombrado a un set OKLCH completo.
- `drive-mirror.mjs` — mirror opt-in a Google Drive de los assets custodiados, verify por SHA-256.

## Guardrails vigentes (resumen — razonamiento completo en `docs/guardrails-reference.md`)
Aplican al editar templates/skills de ESTE repo:

- **Brand-agnostic + output-agnostic, siempre.** Cero specifics de marca real en los templates; grep
  del árbol trackeado en 0 hits antes de commitear.
- **El contrato de tokens es load-bearing.** DTCG 2025.10, `$value` OKLCH estructurado (C-1); los
  schemes se MATERIALIZAN (`scheme-derive.mjs` + R7), nunca prosa.
- **Generative over catalog.** Nunca una sección de template por output; el need se absorbe como regla.
- **Integridad de instalación (Theme 2).** Un archivo shippeado no cita rutas no-shippeadas (`dev/`
  gitignored) ni un tool-repo URL propio.
- **Honestidad epistémica (Stage E).** Los campos owner-meaning resuelven a `owner-stated`/`none`/GAP
  — nunca inferidos por el scoper ni recordados de memoria.
- **Hygiene estructural (Stage G).** El banco de entrevista + baterías viven en `references/`
  (mantiene `SKILL.md` < 500 líneas); el `ingest:` de CONSUMERS es open-class.
- **Disciplina de proceso (Stage F).** TEMPO multi-sesión; el registro de cliente está firewalled del
  tono/velocidad del operador.
- **Espeja las convenciones de marketplace de `web-stack-skills`** para que interoperen.
- **El handoff es la interfaz única suficiente Chat→Code.** Todo carrier que emite tiene un
  consumidor NOMBRADO; DIMENSION-MAP sin resolver = HALT del builder.
- **Medium scoping resuelto por carrier**, nunca hardcodeado a `mark` — un medio sin producer
  build-grade emite un GAP declarado, jamás false-fail ni pase silencioso.
- **Stated-spec-read.** La verdad declarada de la marca (fuente/color nombrado) manda sobre metadata
  de herramienta (que solo corrobora).
- **Provenance spine.** 4 campos (`source, confidence, owner, freshness`) en cada dato + cada token
  emitido; un dato nunca se usa por encima de la confianza que ganó.
- **Dimension map adaptativo.** Toda dimensión resuelve a `filled`/`not-used(owner-declared)`/
  `tagged-gap` — ninguna se salta en silencio.
- **Captura fiel.** Vectores limpios vía PyMuPDF; el fidelity rating + provenance van por artefacto.
- **Reproduction router por tratamiento** (filtro SVG procedural / lib generativa / vector-trace /
  raster-required), validado por diff visual.
- **Keystone `.md` es output obligatorio** (Stage 8.5) — el think/speak/design + guardrail que cabe
  en el contexto de un Project.
- **Gate de fidelity + keystone (Stage 10).** Fidelity MEDIDA, nunca veredicto a mano; keystone con
  FORM-OF-RULE (≥1 regla when-X-then-Z por sección core).
- **Contraste decorativo (SPEC, sin gate ejecutable).** Banda de opacidad fija en PRIMITIVES,
  escalando a WCAG 3:1 cuando el device carga significado/estado.

## Provenance / build memory
Derived in a bounded Phase-4 job (method abstracted from one mature canon, coverage validated against a second),
then rebuilt v2 → v3 → v4; full lineage in `RESIDENT.md`. The work-log + v2 specs + the `F-001…F-026` backlog
live in the **gitignored `dev/`** directory — local provenance, not shipped.

## Flujo (Carlos)
Work on a `claude/<name>` branch, never main; open the PR **and merge it yourself** — Carlos gave permanent
merge authorization on 2026-08-30 («a cualquier otro merge-request, PR, branch que esté por surgir o pendiente
tienen mi OK»), superseding this doc's old wait-for-OK rule. Still ask before anything irreversible (delete,
force-push, prod). Respond to Carlos in es-MX (technical terms + code in English). Secrets in Infisical,
never in git/Drive.

**Workflow hub.** *(Updated 2026-08-31 — the v3 «Chat is the hub» rule is superseded by
`_meta/venturedge-framework/sistema.md §4`: **Code is the base**, and work starts on the surface where the
artifact's writer lives.)* Chat/scoper remains the client-facing elicitation surface by design (the scoper is
chat-only); everything filesystem/git/build/gates is Code. Composio from Chat: reads + light edits only;
canonical `.md` edits route to Code (clobber risk). Update RESIDENT + CLAUDE at the end of working sessions.

## Bitácora

Al cerrar cualquier sesión que haya tocado este repo, **agrega su entrada al final de
`BITACORA.md` sin preguntar y sin anunciarlo**. Una sesión sin entrada no cerró.

El formato está en la cabecera de ese archivo. Es **append-only**: nunca se edita ni se reordena
una entrada pasada, y una revisión posterior va abajo con su propia fecha — jamás como nota en la
cabecera.

Qué va dónde, con la prueba mecánica del estándar:

> ¿Lleva una **fecha**? → `BITACORA.md`.
> ¿Sigue siendo verdad en tres meses sin que nadie lo toque? → `RESIDENT.md`.
> ¿Es sobre cómo tocar los archivos? → aquí.

Esto no es burocracia: es lo que mantiene a `RESIDENT.md` atemporal. Un RESIDENT que carga la
narrativa de cada sesión cambia todos los días, y entonces el knowledge de su Project queda
desfasado siempre.
