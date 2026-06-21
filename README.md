# brand-system-skills

A Claude Code plugin marketplace that builds a **canonical, brand-agnostic, output-agnostic brand source**
for any brand — a four-layer canon plus a DTCG/OKLCH token spine that any consumer (a website, an app, a
slide deck, a print kit, a design tool) derives any artifact from. Greenfield or brownfield.

Sibling to [`web-stack-skills`](https://github.com/ccediland/web-stack-skills): the brand canon is the
upstream source of truth; web-stack-skills is a flagship downstream consumer that turns the canon into web
output. They share the same DTCG/OKLCH token spine, so a canon projects into web output with no lossy hop.

## The two skills

| Skill | Where | What it does |
|---|---|---|
| **brand-canon-builder** | Claude Code (filesystem + git) | Scaffolds and fills the brand canon: four layers + token spine + satellites + docs. Fills what's known, logs the rest as tracked gaps, emits DTCG tokens, optionally attaches a Claude Design library. |
| **brand-canon-scoper** | Claude.ai chat (no filesystem) | Scopes a brand in conversation and compiles one ready-to-paste handoff block that the builder runs in Claude Code. |

## What "canon" means here

Four questions, four layers, two satellites — nothing organized around an output:

- **INDEX** (*where do I start?*) — map, glossary, the derivation method, precedence.
- **ESSENCE** (*why?*) — meaning, voice, positioning.
- **PRIMITIVES** (*what?*) — every fixed atom (color, type, the mark, …) to full depth.
- **GRAMMAR** (*how?*) — generative rules + algorithms that decide any artifact, even unnamed ones.
- satellites: **DATA POINTER** (where volatile values live) · **PROJECTIONS** (who consumes the canon).

Plus a **DTCG / OKLCH token spine** (`tokens/base|semantic|component.json`) as the machine interchange
contract, with print colors authored and screen colors derived.

**The Lego principle:** the canon is always createable and valid — even for a brand with nothing. Whatever
is missing resolves to a goal, a tracked gap, and a skeleton slot, never a blocked empty shell.

## Install

```
/plugin marketplace add ccediland/brand-system-skills
/plugin install brand-system@brand-system-skills
```

Then, in Claude Code, just describe what you want — "set up a brand canon for …", "consolidate our brand
into a single source of truth", "build our design tokens" — and `brand-canon-builder` triggers. In
Claude.ai chat, ask to scope your brand and `brand-canon-scoper` will hand you a block for the builder.

## Status

See [`RESIDENT.md`](./RESIDENT.md) for architecture, decisions, integrations, and Open Items. MIT licensed.
