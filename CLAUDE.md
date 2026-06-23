# brand-system-skills — CLAUDE.md (agent ops & guardrails)

> A Claude Code plugin marketplace whose skills build a generic, brand-agnostic, output-agnostic **brand
> canon** (four layers + DTCG/OKLCH token spine) for any brand. This repo is the SKILL/tooling — not a
> brand canon itself. Read `RESIDENT.md` first, then this file.

## Repo map
- `.claude-plugin/marketplace.json` · `plugin.json` — marketplace + plugin manifests (mirror `web-stack-skills`).
- `skills/brand-canon-builder/` — Code-side builder: `SKILL.md`, `references/` (the method knowledge),
  `assets/templates/` (the canon skeletons + DTCG token spine + satellites + docs + prototype + design-sync
  kit + Claude Design adapter).
- `skills/brand-canon-scoper/` — Chat-side scoper: `SKILL.md` + `references/handoff-format.md`.
- `README.md` (human front door) · `RESIDENT.md` (living architecture, decisions, Open Items).
- `v3-execution-plan.md` (root) — the v3 execution plan (detailed gated phases + session log).

## How the skills work (one line each)
- **brand-canon-builder** — scaffold the canon → fill what the brand's material/brief supports → log the
  rest as tracked `GAP-NNN` → emit the DTCG/OKLCH token spine → attach the Claude Design adapter (default
  ON) → validate.
- **brand-canon-scoper** — in chat (no filesystem), interview + compile one ready-to-paste handoff block for
  the builder.

## Standing guardrails (apply when editing THIS repo's templates/skills)
- **Brand-agnostic + output-agnostic, always.** The templates must contain zero real brand specifics and no
  output/medium-named sections. Before committing changes to the templates/skills, grep the tracked tree for
  any real brand name, ink, or token value that may have crept in — it must be 0 hits. Example/illustrative
  token values must be obviously generic (never a real brand's exact OKLCH/hex/Pantone).
- **Token contract is load-bearing.** Keep the DTCG token templates valid and projecting cleanly into
  downstream consumers: OKLCH literal in `$value`; plain-string values; `{tier.category.name}` aliases;
  category names on the namespace convention; `source:"authored"|"derived"` on extension color spaces. See
  `skills/brand-canon-builder/references/token-spine.md`.
- **Generative over catalog.** Never add a per-output section to a template; absorb the need as a rule.
- **Mirror web-stack-skills' marketplace conventions** so the two interoperate (same manifest/skill layout).

## Provenance / build memory
This repo was derived in a bounded "Phase 4" job — abstracting the method from one mature brand canon and
validating coverage against a second, independently-authored one — then rebuilt in v2 into an analyze →
extract → prototype + Design-syncable library engine (the v2 pipeline is complete; see `RESIDENT.md`). The
full work-log, the v2 specs (`v2-build-spec.md`, `v2-intake-spec.md`), and the granular backlog
(`v2-backlog.md`, F-001…F-026) live in the **gitignored `dev/`** directory — local provenance, not shipped.

## v3 (in progress) — see `v3-execution-plan.md`
v3 builds on the shipped v2 skills (does not restart them). Rectoral rule for ALL v3 work: **anti-determinism** —
build and research the general capability class, never a single-brand instance; the brand is illustration only.
The rules below are guardrails/gotchas; the staged plan + rationale live in `v3-execution-plan.md` (root) and
`RESIDENT.md ## v3`.
- **Stated-spec-read.** Read the brand's declared truth (named font, declared hex/Pantone) via OCR/visual; treat
  `pdffonts`/embedded-font tables as corroboration only — outlined type makes them report the studio's layout
  font or nothing.
- **Faithful capture.** Clean vectors via PyMuPDF `page.get_drawings()` or copy-region-to-new-doc (a full-page
  Inkscape open yields a bloated, non-isolated SVG); image font-matching for unnamed faces; fidelity rating +
  provenance per artifact.
- **Reproduction router (treatment→method).** Procedural SVG filters (`feTurbulence` texture · `feDisplacementMap`
  organic/glitch · `feDiffuse`+`feSpecularLighting` 3D/gloss/emboss · `feGaussianBlur` glass · `feColorMatrix`
  grading) / generative lib (rough.js) / vector-trace / raster-required. Validate by visual diff. `feTurbulence`
  is CPU-heavy → constrain or rasterize; photography + bespoke illustration are raster-required.
- **Keystone `.md` (mandatory v3 output).** A single attachable think/speak/design + guardrail file; keep it
  within a Claude Project's resident context (RAG trip-point unpublished → budget the size; data first,
  instructions last for recall).
- **Tokens/scheme.** Keep the v2 DTCG/OKLCH spine; OKLCH is the general scheme-derivation engine (light/dark,
  high-contrast, sub-brand). SD v5 / DTCG 2025.10 already pinned (issue #1590 — `color/oklch`, never `color/css`).

## Flujo (Carlos)
Work on a `claude/<name>` branch, never main; PR + wait for OK before merge. Respond to Carlos in es-MX
(technical terms + code in English). Secrets in Infisical, never in git/Drive.

**Workflow hub (v3).** Chat is the hub; design decisions happen in Chat. Hand big or filesystem/git/build tasks
to Claude Code (it returns results to Chat) — including non-repo tasks better suited to Code. From Chat, use
Composio GitHub **con calma**: reads + light edits only; route big repo work to Code. Editing canonical `.md`
(RESIDENT/CLAUDE) via Composio carries clobber risk → read-then-merge, or route to Code. Update RESIDENT + CLAUDE
at the end of each chat — especially on a context/compute hand-off, which Carlos decides (Claude may only suggest
a fresh chat when context is legitimately heavy).
