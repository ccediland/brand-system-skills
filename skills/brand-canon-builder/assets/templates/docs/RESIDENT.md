---
name: {{brand}}-resident
description: Living resident doc for the {{BRAND}} brand canon — the source of truth for identity, voice,
  and design system. Use when any session touches the {{BRAND}} brand, its canon, its tokens, or its
  consumers. Canonical at the source; any mirror is read-only.
last_updated: {{DATE}}
applies_to: Repo {{ORG}}/{{BRAND_REPO}} — source of truth for the {{BRAND}} brand
canonical: github
---

# {{BRAND}} — RESIDENT

> Living doc: what this brand canon is, how it is structured, the decisions that govern it, and what is
> still open. The repo is the source; consumers mirror. Timeless content is undated; volatile state is
> dated and isolated.

## TL;DR
- This repo is the source of truth for the {{BRAND}} brand. `tokens.json` (DTCG, OKLCH spine) is the truth
  for measurable primitives; the `canon/*.md` layers are the truth for meaning and rules.
- Four-layer canon (INDEX/ESSENCE/PRIMITIVES/GRAMMAR) + 2 satellites (DATA POINTER, PROJECTIONS).
  Output-agnostic; generative, not a catalog.

## Architecture & why
- **Four questions → four layers:** *where-start* (INDEX), *why* (ESSENCE), *what* (PRIMITIVES), *how*
  (GRAMMAR). Every fixed truth is defined once, to full depth, in exactly one layer; nothing is named for
  an output. The four-question logic is the law — not the file count.
- **Dual legibility:** prose (`canon/*.md`) + machine mirror (`tokens.json`, `canon/canon.json`).
  Disagreement = a bug.
- **Generative over catalog:** stable `G-*` rules + `ALGO-*` algorithms so consumers apply the canon
  mechanically and it decides artifacts it never names (the universality test).
- **Token spine:** DTCG `base/semantic/component`; OKLCH literal in `$value`; print values authored in
  `$extensions`. See `projections.md` for the interchange contract.

## Integrations / ritual
- Consumers are registered in `projections.md`; bidirectional consumers have a promotion path back to canon.
- {{compile/build ritual if any; how mirrors refresh}}

## Decisions (brand-level)
| Decision | Why | Date |
|---|---|---|
| {{...}} | {{...}} | {{DATE}} |

## Open Items / Gaps
<!-- GUIDE: every empty must-have slot and every unratified decision is a GAP here. See gap-protocol. -->
| ID | Item | Why it matters | Severity | Proposed resolution | Status |
|---|---|---|---|---|---|
| GAP-001 | {{...}} | {{...}} | {{MUST-HAVE \| SHOULD \| NICE}} | {{...}} | {{OPEN \| CLOSED (ratified)}} |

## Change log
- {{DATE}} — canon scaffolded; {{what was filled vs left as gaps}}.

## Conventions of this doc
Timeless content is undated; the Open Items and Change log are the volatile sections and are dated. Nothing
external should cite the volatile state as permanent.
