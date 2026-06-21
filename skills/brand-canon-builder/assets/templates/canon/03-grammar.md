# {{BRAND}} — Canon · 3 · GRAMMAR  (*how?*)

<!-- GUIDE: GRAMMAR is the OPPOSITE of a catalog. It holds generative rules that produce a correct answer
     for an output nobody anticipated. No rule may name an output. Each rule has a stable ID (G-<CAT>-<NN>)
     and is cited by ID elsewhere instead of restated. Algorithms (ALGO-<NAME>) are typed (inputs)→output
     procedures that apply rules mechanically. Fill the rules the brand needs; mark unused categories
     "not used" (the IDs stay reserved). Keep per-channel/per-output numbers OUT of canon — if you need a
     concrete number for one medium, it is non-canon reference, not a rule. -->

> If a rule only works by enumerating a use case, it is in the wrong place. A rule earns its place by
> deciding artifacts this canon never mentions (the universality test, INDEX).

## §1 Scheme system
- **G-SCHEME-01** — {{how atoms map onto semantic roles to form a scheme; the set of schemes (e.g. light/dark/contexts) as DERIVATIONS of the palette, not new colors}}
- **G-SCHEME-02** — {{which scheme is default; how/when a scheme switches; any allowed subset}}

## §2 Color & contrast
- **G-COLOR-01** — {{role assignment: which ink plays which semantic role per scheme}}
- **G-COLOR-02** — {{contrast floor: text/background pairings meet a minimum ratio, BY ROLE not by recolor}}
- **G-COLOR-03** — {{accent/attention discipline (e.g. the scarce ink is last and least)}}
- **G-COLOR-04** — {{tinting/derivation rules (how surfaces/tints are produced from inks)}}
- **G-COLOR-05** — {{print vs screen: print consumers read AUTHORED color values from tokens $extensions; screen consumers read OKLCH from $value (see token-spine)}}

## §3 Mark resolution
- **G-MARK-01** — {{the mark is used from approved files only; never recreated/recolored/distorted (see PRIMITIVES › Misuse)}}
- **G-MARK-02** — {{selection: which arrangement + treatment for a given space and background — generative, see ALGO-MARK-RESOLVE}}

## §4 Type pairing
- **G-TYPE-01** — {{how primary/secondary pair; one display register per piece; hierarchy rules}}

## §5 Motion *(optional)*
- **G-MOTION-01** — {{what may animate (e.g. opacity/transform only) and what may not}}
- **G-MOTION-02** — {{timing/easing discipline from tokens; calm vs energetic register}}
- **G-MOTION-03** — {{reduced-motion: a two-tier policy — see ALGO-MOTION-GATE}}

## §6 Composition & depth
- **G-COMPOSE-01** — {{spacing/rhythm: generous negative space; the grid discipline}}
- **G-COMPOSE-02** — {{hierarchy: how emphasis is built without breaking register}}
- **G-COMPOSE-03** — {{aliveness: restraint of register ≠ of energy (ESSENCE); not-static where it serves}}
- **G-COMPOSE-04** — {{premium depth (optional): surfaces use the elevation atoms; depth never on the mark}}

## §7 Pattern & imagery
- **G-PATTERN-01** *(optional)* — {{how the graphic-code pattern/texture is applied — palette-disciplined, supporting, never competing with the mark or harming legibility (see PRIMITIVES › Pattern)}}
- **G-IMG-01** — {{image grade/treatment; mark-over-image placement & contrast safety}}
- **G-IMG-02** — {{what generation is/ isn't allowed for (subjects vs backgrounds)}}

## §8 Voice
- **G-VOICE-01** — {{register applied: how copy sounds in any surface}}
- **G-VOICE-02** — {{anti-promise enforced: prohibited claims (see ESSENCE) — see ALGO-VOICE-CHECK}}
- **G-VOICE-03** — {{empty/error/edge states get direction in the brand voice, never mood-less filler}}

## §9 Interaction (medium-agnostic UX) *(optional)*
- **G-UX-01** — {{feedback: every action confirms in the brand's motion/voice register}}
- **G-UX-02** — {{graceful degradation: the experience holds when capabilities are absent (reduced motion, no JS, print)}}

## §10 Rule index & derivation algorithms

<!-- GUIDE: the mechanical-consumption layer. Each ALGO is a typed signature + ordered steps or a decision
     table + the G-* rules it enforces. Fill the algorithms the brand needs. -->

- **ALGO-SCHEME-DERIVE** `(mode, accent) → scheme + role tokens` — enforces G-SCHEME-01/02, G-COLOR-01.
  {{steps / decision table}}
- **ALGO-MARK-RESOLVE** `(space, background, priority) → arrangement + treatment + asset` — enforces
  G-MARK-01/02. {{decision table: by available space pick arrangement (lockup → wordmark/symbol → monogram
  → seal as space shrinks / per role); by background pick treatment (contrast-safe); below the legibility
  floor step up to a simpler arrangement.}}
- **ALGO-CONTRAST-ROLE** `(text role/size, background) → role token + min ratio` — enforces G-COLOR-02.
  {{table}}
- **ALGO-MOTION-GATE** `(effect kind) → run | reduce | off` — enforces G-MOTION-01/03. {{decision table
  keyed on effect class + reduced-motion behavior}}
- **ALGO-VOICE-CHECK** `(copy) → pass | fix` — enforces G-VOICE-02. {{reject-list (forbidden claims/terms)
  + require-list (register, lexicon)}}
- {{ADD BRAND-SPECIFIC ALGORITHMS (e.g. ALGO-PATTERN-COMPOSE, ALGO-ATMOSPHERE-COMPOSE) AS NEEDED}}

---
*Ratified by {{BRAND_OWNERS}} on {{DATE}}. Mirrored machine-readable in `canon/canon.json` (ruleIndex + algorithms). This layer is timeless.*
