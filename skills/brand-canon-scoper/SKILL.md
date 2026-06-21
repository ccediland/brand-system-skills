---
name: brand-canon-scoper
description: Scope a brand in conversation (no filesystem needed) and compile a single ready-to-paste handoff block that the brand-canon-builder skill runs in Claude Code to build the brand canon. Use this in Claude.ai chat — or any conversation without a working filesystem/git — when someone wants to start a brand system, design system, brand canon, brand guidelines, or design tokens but isn't in a coding environment yet. Triggers on "help me scope our brand", "I want to start a brand system but I'm in chat", "gather what we need for our design system", "prep our brand for the builder". Its ONLY job is to interview, collect the brand's material and intent, and emit one structured handoff — it does not build the canon itself.
---

# Brand Canon Scoper

A thin front door for building a brand canon from a conversation. It does **one thing**: interview the
person, gather their brand material and intent, and compile a single **ready-to-paste handoff block** they
take into Claude Code, where the `brand-canon-builder` skill does the actual build (filesystem + git).

Use this when there's no working filesystem (e.g. Claude.ai chat). If you're already in Claude Code with a
filesystem, skip the scoper and use `brand-canon-builder` directly.

## What it does NOT do
It does not scaffold files, write tokens, or build the canon. No filesystem work. It scopes and hands off.

## Workflow

### 1. Detect greenfield vs brownfield
Ask whether the brand already has material (existing repos, a brandbook PDF, a design library, a live site)
or is starting fresh. This sets what to collect.

### 2. Interview in four-question order
Collect just enough to seed the build — the builder will elicit deeper and log gaps for anything missing, so
**don't over-interview**. Go in derivation order:

- **Why (essence):** what is this brand, who's it for, how should it feel, what must it never be or claim,
  the one line it wants remembered.
- **What (primitives):** colors (and what each should mean), typefaces, the mark/logo and its forms, any
  pattern/texture, overall spacing feel. Capture any exact values they already have (hex/OKLCH, Pantone/CMYK
  if they print).
- **How (grammar):** any combination rules they already follow (light/dark, contrast habits, when which
  logo, voice do's/don'ts), and whether the brand uses motion or surface depth at all.

For brownfield, also collect: the repo URLs / file locations / the brandbook, and which source is freshest /
shipped to production (that wins on specifics).

### 3. Note optional dimensions
Ask only briefly whether the brand uses motion, surface depth, dark mode, a physical trust object, or wants
a Claude Design component library. "Not used" is a fine answer and keeps the canon honest.

### 4. Compile the handoff
Produce ONE fenced block following `references/handoff-format.md`, then tell the person exactly what to do
with it: open Claude Code in (or create) the target repo and paste the block — it will invoke
`brand-canon-builder`. Keep the block self-contained: everything the builder needs to start, nothing it
should discover for itself.

## Principle
Scope, don't build. Collect what changes the canon and hand it off cleanly; let the builder do the rigorous,
filesystem-bound work (scaffold → fill → tokens → gaps → validate).
