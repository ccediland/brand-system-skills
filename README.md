# brand-system-skills

[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](./LICENSE) [![Claude Code plugin](https://img.shields.io/badge/Claude_Code-plugin-d97757.svg)](https://github.com/ccediland/brand-system-skills) [![Sibling: web-stack-skills](https://img.shields.io/badge/sibling-web--stack--skills-555.svg)](https://github.com/ccediland/web-stack-skills)

A Claude Code plugin that turns any brand into a **canonical, brand-agnostic, output-agnostic source of
truth** — a four-layer brand canon plus a DTCG/OKLCH token spine — and then builds a **real, presentable
prototype, a `/design-sync`-ready component library, and a single attachable keystone `.md` an AI can think,
speak, and design *as* the brand** from it. Any consumer (a website, an app, a slide deck, a print kit, a
design tool, or an AI assistant) derives any artifact from the same source, with no lossy hop. It analyzes a
brand's published work by default, or authors from a ratified brief on request.

Sibling to [`web-stack-skills`](https://github.com/ccediland/web-stack-skills): the brand canon is the
upstream source of truth; web-stack-skills is a flagship downstream consumer that turns the canon into web
output. They share the same DTCG/OKLCH token spine, so a canon projects into web output cleanly.

## The two skills

| Skill | Where | What it does |
|---|---|---|
| **brand-canon-builder** | Claude Code (filesystem + git) | Analyzes existing brand work, extracts the real assets, and builds the canon — four layers + token spine + satellites + docs — then emits a real prototype, a compiled, `/design-sync`-ready component library, and the attachable keystone `.md` an AI thinks / speaks / designs *as* the brand. Fills what the brand's material supports, logs the rest as tracked gaps, and fails the build if a core asset (the mark, the fonts) is missing rather than shipping an empty skeleton. |
| **brand-canon-scoper** | Claude.ai chat (no filesystem) | Scopes a brand in conversation and compiles one ready-to-paste handoff block that the builder runs in Claude Code. |

## What "canon" means here

Four questions, four layers, two satellites — nothing organized around an output:

- **INDEX** (*where do I start?*) — map, glossary, the derivation method, precedence.
- **ESSENCE** (*why?*) — meaning, voice, positioning.
- **PRIMITIVES** (*what?*) — every fixed atom (color, type, the mark, …) to full depth.
- **GRAMMAR** (*how?*) — generative rules + algorithms that decide any artifact, even unnamed ones.
- satellites: **DATA POINTER** (where volatile values live) · **PROJECTIONS** (who consumes the canon).

Plus a **DTCG / OKLCH token spine** (`tokens/base|semantic|component.json`) as the machine interchange
contract — print colors authored, screen colors derived.

**The deliverable is not the skeleton.** The canon is the source skeleton; the deliverables are the real
prototype, the `/design-sync`-ready library, and the keystone `.md` (an AI that can *be* the brand —
think/speak/design plus an operational guardrail layer), all projected from it. A rule-compliant canon with
no real assets is not done.

**The Lego principle:** the canon is always creatable and valid — even for a brand with nothing. Whatever is
missing resolves to a goal, a tracked gap, and a skeleton slot, never a blocked empty shell.

## Machine-true, not prose-true

Most brand systems *describe* their discipline; this one **ships executable gates into the emitted repo**, so the
output validates itself and stays regression-ready. Each gate exits non-zero on violation and runs locally (or in
the emitted repo's CI):

- **Provenance, completeness & reconciliation** — `audit-lint` (zero-dep, R0–R8, BLOCKING): every value token
  carries hashed provenance; a `corroborated` value needs ≥2 distinct cited sources; every named value or scheme
  resolves to a real token or an open `GAP-NNN`; downstream projections may not drift from the token spine; every
  present canon section surfaces in the brandbook or an open gap.
- **Measured fidelity** — `fidelity-diff.py`: a reproduction is scored against its real source by **ΔE2000 + SSIM
  + glyph metrics**, not an eyeball verdict, with the thresholds and result committed as re-auditable evidence.
- **Materialized colour schemes** — `scheme-derive.mjs`: every named scheme becomes a complete OKLCH-derived
  token set (or a tracked gap) — no scheme ships as prose.
- **Client-surface firewall** — `client-deny-lint.mjs`: build-grade operator vocabulary can't leak into anything
  a client reviews.

Every gate is **brand-agnostic** — it tests the *shape* of a rule, never specific brand content — so a
monogram-only, single-ink, or sonic-primary brand passes clean.

## Install

```
/plugin marketplace add ccediland/brand-system-skills
/plugin install brand-system@brand-system-skills
```

Then, in Claude Code, just describe what you want — "set up a brand canon for …", "consolidate our brand
into a single source of truth", "build our design tokens" — and `brand-canon-builder` triggers. In Claude.ai
chat, ask to scope your brand and `brand-canon-scoper` hands you a block for the builder.

## Requirements

- **Claude Code** — latest recommended. The `/design-sync` integration (compiling the component library into
  Claude Design) requires a recent Claude Code that ships `/design-sync`. That contract is server-side and
  version-fluid — the command re-reads it live via `get_claude_design_prompt`, so its field and script names
  can shift between releases and the builder re-pins them at run time (don't treat a pinned setup as frozen).
- **Node ≥ 18** — only for building the emitted component-library kit (esbuild + ts-morph); the canon itself
  needs no toolchain.

## Status

**`v0.4.0`** — v4 shipped: the executable gates above (machine-true provenance + measured fidelity + materialized
schemes + the client-surface firewall) and the two-surface scoper flow. See [`RESIDENT.md`](./RESIDENT.md) for
architecture, decisions, integrations, and Open Items. MIT licensed.
