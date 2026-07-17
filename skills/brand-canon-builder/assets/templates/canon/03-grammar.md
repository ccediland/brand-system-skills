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
- **G-PATTERN-01** *(optional)* — {{how the graphic-code pattern/texture is applied — palette-disciplined, supporting, never competing with the mark or harming legibility}}. It meets PRIMITIVES › Pattern's **decorative contrast band** (the brand-fixed opacity/contrast band; escalate to WCAG 3:1 when it carries meaning/state) — resolved by `ALGO-CONTRAST-ROLE`'s graphic-code row (§10), no longer ratio-less.
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

- **ALGO-SCHEME-DERIVE** `(base palette, scheme def {mode, dominant}) → the scheme's semantic role-token set` — enforces G-SCHEME-01/02, G-COLOR-01. RUNNABLE: `tools/scheme-derive.mjs` (zero-dep Node — NOT Style Dictionary) implements this exactly and writes one `tokens/schemes/<id>.tokens.json` per non-deferred scheme.
  1. Map each semantic COLOUR role to its base anchor's OKLCH (read the `semantic` colour aliases → `base`).
  2. Remap LIGHTNESS by `mode`, preserving C and H (gamut-clamped at the hex fallback): **light** = identity; **dark** = invert L on neutral roles (C < 0.04) and lift non-`dominant` chromatic roles +0.08 for legibility (the `dominant` ink keeps its L, staying recognizable); **contrast** = push neutral roles to the L extreme (max separation).
  3. Emit each role as a structured-OKLCH object `{colorSpace:"oklch", components, alpha, hex}` (hex via OKLCH→sRGB), tagged `$extensions.brand.scheme:"<id>"`, entering at `confidence:"hypothesis"` + the scheme's tracking GAP (a derived palette is unratified until the owner confirms it).
  4. A scheme with `status:"deferred"` emits NO set — it carries a logged `GAP-NNN` (a tracked horizon). `audit-lint` R7 fails any named scheme lacking a COMPLETE set (role-key parity with the default) or a deferred+GAP. Single-scheme/flat brands materialize one default set; no schemes ⇒ nothing to derive.
- **ALGO-MARK-RESOLVE** `(space, background, priority) → arrangement + treatment + asset` — enforces
  G-MARK-01/02. {{decision table: by available space pick arrangement (lockup → wordmark/symbol → monogram
  → seal as space shrinks / per role); by background pick treatment (contrast-safe); below the legibility
  floor step up to a simpler arrangement.}}
- **ALGO-CONTRAST-ROLE** `(role/size or graphic-code device, background) → role token + min ratio/band` — enforces G-COLOR-02, G-PATTERN-01.
  {{table — text-role rows: each text/background pairing meets the role's minimum ratio, BY ROLE not by recolor; the legal bar is WCAG 2.x AA}}
  - **graphic-code / decorative row (additive, C-3):** a decorative graphic-code device (pattern · texture · screen · tint) → its **PRIMITIVES brand-fixed opacity/contrast band** is the PRIMARY rule; **escalate to WCAG 3:1 (SC 1.4.11)** when the device carries meaning or state (encodes status, is interactive). APCA Lc 15 is an INTERNAL perceptual reference only; **WCAG 2.x AA remains the legal bar — no APCA substitution.** Spec-level: enforced by review against PRIMITIVES › Pattern, not an executable gate.
- **ALGO-MOTION-GATE** `(effect kind) → run | reduce | off` — enforces G-MOTION-01/03. {{decision table
  keyed on effect class + reduced-motion behavior}}
- **ALGO-VOICE-CHECK** `(copy) → pass | fix` — enforces G-VOICE-02. {{reject-list (forbidden claims/terms)
  + require-list (register, lexicon)}}
- {{ADD BRAND-SPECIFIC ALGORITHMS (e.g. ALGO-PATTERN-COMPOSE, ALGO-ATMOSPHERE-COMPOSE) AS NEEDED}}

---
*Ratified by {{BRAND_OWNERS}} on {{DATE}}. Mirrored machine-readable in `canon/canon.json` (ruleIndex + algorithms). This layer is timeless.*
