# {{BRAND}} — Canon · 0 · INDEX  (*where do I start?*)

<!-- GUIDE: This is the entry point to the brand canon. It is output-agnostic: nothing here (or in any
     canon layer) may be organized around a specific output (no "website", "business card", "Instagram"
     sections). If you find yourself coupling a truth to an output, you have made a mistake — move the
     truth up into a layer and let GRAMMAR derive the output. Fill {{...}}; delete every <!-- GUIDE --> and
     resolve or log every <!-- GAP --> before declaring a layer complete. -->

> The single, canonical, output-agnostic source of truth for the {{BRAND}} brand. Any consumer — a human,
> a design agent, a build pipeline — derives every decision from here. If this system can decide an
> artifact it never names, it is working; if it can only decide artifacts it enumerates, it is broken.

## The system in one breath

| Layer | Question it answers | What it holds | File |
|---|---|---|---|
| **INDEX** | *where do I start?* | this map, the glossary, the derivation method, precedence | `canon/00-index.md` |
| **ESSENCE** | *why?* | meaning, intent, voice, positioning — the brand's reasons | `canon/01-essence.md` |
| **PRIMITIVES** | *what?* | every fixed atom defined once to full depth (color, type, mark, …) | `canon/02-primitives.md` |
| **GRAMMAR** | *how?* | generative rules + algorithms that combine primitives for any medium | `canon/03-grammar.md` |
| DATA POINTER *(satellite, not canon)* | *where do volatile values live?* | a pointer to data that changes; never the values | `data-map.md` |
| PROJECTIONS *(satellite, not canon)* | *who consumes this, and how?* | registry of consumers + the interchange contract | `projections.md` |

The measurable atoms (numbers, colors, scales) live machine-readable in `tokens.json` (the spine).
The rules and meaning live machine-readable in `canon/canon.json` (mirror of ESSENCE + GRAMMAR).

## Dual legibility

Every truth exists twice: as canonical prose (`canon/*.md`) and as a machine mirror
(`tokens.json` for measurable primitives, `canon/canon.json` for rules and meaning). If the prose and the
machine mirror ever disagree, that is a bug, not a choice — reconcile to the layer that owns the truth
(see Precedence).

## How to make any decision (the derivation method)

1. **Read ESSENCE** for the intent — what is this for, what should it feel like, what must it never do.
2. **Pull the PRIMITIVES** involved (the atoms: which inks, which type, which mark form).
3. **Apply the GRAMMAR** — the rules (`G-*`) and algorithms (`ALGO-*`) combine those atoms into an answer.
   Grammar is generative: it produces a correct answer for an artifact nobody anticipated.
4. **If a value is volatile** (a price, a phone number, a location), resolve it from the DATA POINTER —
   never invent it, never freeze it into the canon.
5. **If you are building a consumer** (a website, a slide deck, a print kit), you are making a
   PROJECTION: re-project faithfully from the canon and register it in `projections.md`.

Universality test (the gate every decision must pass): *given only this system, could an arbitrary
agent make a correct, on-brand decision for an artifact this canon never mentions?* If the only way to
answer is to enumerate the use case, the rule belongs in GRAMMAR, not in a list.

## Precedence (when sources disagree)

1. **Canon wins over any projection.** A website, export, or brandbook PDF never overrides the canon.
2. **Within canon:** PRIMITIVES win on *values*, ESSENCE wins on *meaning*, GRAMMAR wins on *combination*.
   A conflict between layers is a bug to fix, not a tie to break.
3. **The machine spine is the single source for measurable primitives.** `tokens.json` is authoritative;
   every CSS / JSON / theme file is a projection of it, generated, never hand-edited and back-ported.
4. **A registered consumer may be bidirectional** — both a downstream consumer of the canon AND an
   upstream source of design intent eligible for promotion back into the canon (see `projections.md`).

## Glossary (the system's own vocabulary)

<!-- GUIDE: Define the abstraction NOUNS this canon uses, so any reader shares the vocabulary. These are
     method terms, not brand content. Keep/trim to what this brand actually uses. -->

- **Atom / primitive** — a fixed, output-independent unit defined once to full depth in PRIMITIVES.
- **Scheme** — a named mapping of atoms onto semantic roles (e.g. a light or dark application context).
- **Mark** — the brand's identifying graphic system (see PRIMITIVES § Mark for the arrangement taxonomy).
- **Treatment** — a coloring/application of a mark form (distinct from the form itself).
- **Rule (`G-*`)** — a stable, generative grammar rule, cited by ID instead of restated.
- **Algorithm (`ALGO-*`)** — a typed `(inputs) → output` procedure that applies one or more rules.
- **Projection** — any consumer artifact derived from the canon (never a second source of truth).
- **Token** — a measurable primitive in `tokens.json` (DTCG); the interchange spine.
- {{ADD BRAND-SPECIFIC METHOD TERMS IF ANY}}

## Maintenance

Edit the layer docs and the token/`canon.json` mirrors directly. Never edit a projection and back-port it.
Any compiled/bundled master is *generated* by a build step, never hand-edited. Decisions are decided and
stamped by the brand owners; open gaps are tracked, never left as silent holes (see `gap-protocol` /
the Open Items in `RESIDENT.md`).

---
*Ratified by {{BRAND_OWNERS}} on {{DATE}}. Volatile state lives dated in `RESIDENT.md`; this layer is timeless.*
