# brand-system-skills — CLAUDE.md (agent ops & guardrails)

> A Claude Code plugin marketplace whose skills build a generic, brand-agnostic, output-agnostic **brand
> canon** (four layers + DTCG/OKLCH token spine) for any brand. This repo is the SKILL/tooling — not a
> brand canon itself. Read `RESIDENT.md` first, then this file.

## Repo map
- `.claude-plugin/marketplace.json` · `plugin.json` — marketplace + plugin manifests (mirror `web-stack-skills`).
- `skills/brand-canon-builder/` — Code-side builder: `SKILL.md`, `references/` (the method knowledge),
  `assets/templates/` (the canon skeletons + DTCG token spine + satellites + docs + Claude Design adapter).
- `skills/brand-canon-scoper/` — Chat-side scoper: `SKILL.md` + `references/handoff-format.md`.
- `README.md` (human front door) · `RESIDENT.md` (living architecture, decisions, Open Items).

## How the skills work (one line each)
- **brand-canon-builder** — scaffold the canon → fill what the brand's material/brief supports → log the
  rest as tracked `GAP-NNN` → emit the DTCG/OKLCH token spine → optionally attach Claude Design → validate.
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
This repo was derived in a bounded "Phase 4" job by abstracting the method from one mature brand canon and
validating coverage against a second, independently-authored one. The full work-log, decision log, and the
build's Compact Instructions live in the **gitignored `dev/`** directory (kept on disk, not shipped). If you
are resuming that build mid-flight, read `dev/build-memory.md` and `dev/work-log—2026-06-21.md` first.

## Flujo (Carlos)
Work on a `claude/<name>` branch, never main; PR + wait for OK before merge. Respond to Carlos in es-MX
(technical terms + code in English). Secrets in Infisical, never in git/Drive.
