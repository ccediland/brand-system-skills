# Reproduction router — treatment → method (Stages 5 & 8)

Read when a brand carries a visual/textural TREATMENT (texture, finish, effect) the build must reproduce.
A treatment is observed in Stage 5 (applied-design harvest) and reproduced in Stage 8 (the prototype +
kit). This reference routes any treatment to one of four reproduction methods, validates the result, and
draws an explicit boundary where code cannot reproduce it.

**Scope (honest).** The taxonomy + four methods below are the **visual axis** and are visual-build-grade. A
brand whose primary treatment is **non-visual** — a motion signature (timing/easing identity) or a sonic
treatment — is handled by the *primary-medium axis* (below): routed to an EXPLICIT declared GAP (a tracked
horizon, fidelity-blocking per the carrier's role), never silently dropped and never forced through a visual
method.

Anti-determinism: this is a router over a general taxonomy, not a per-brand recipe. A specific brand's
texture is only an instance the router classifies; never hardcode one brand's filter values as the method.
Every treatment the builder reproduces carries the provenance spine (`gap-protocol.md`): it was observed
(`confidence: hypothesis`) until the owner confirms it is a brand line.

## Treatment taxonomy (what to classify)

- **Textures** — rock, paper, fabric, grunge, distressed, grain.
- **Hand-drawn / organic** — ink, brush, pencil, watercolor, sketch, ink-blots, roughened edges.
- **Lighting / dimensional** — gloss, emboss, 3D, metallic / foil.
- **Optical** — glow / neon, blur / glassmorphism, glitch.
- **Print artifacts** — halftone, risograph, grain.
- **Flat / geometric** — solid fills, geometric construction (usually no treatment to reproduce).
- **Photographic** — photography, photo-real composition.

## The router (treatment → method)

| Method | Use for | Technique |
|---|---|---|
| **Procedural (SVG/CSS filter primitives)** | natural texture · 3D/gloss/emboss/metallic · organic/liquid/glitch distortion · glass · color grading · compositing | the filter map below; resolution-independent, scriptable, performance-bounded |
| **Generative library** (rough.js-class) | hand-drawn / sketchy strokes, wireframe aesthetics | rough.js (`roughness`, `bowing`, `fillStyle`, `seed` for deterministic re-render); Canvas + SVG |
| **Vector-trace from the source artifact** | a specific bespoke artwork the brand OWNS (a custom pattern, a bespoke mark) | trace/extract from the source (capture tooling, `asset-acquisition.md`) — the source vector is the master, never synthesized from scratch |
| **Raster-asset-required** | complex hand-made illustration · photography · any treatment whose identity depends on specific non-procedural artwork | source the real raster asset; it cannot be faithfully generated in code |

### Procedural filter map (SVG filter primitives)

- **Natural texture** (clouds, marble, granite, paper, grain): `feTurbulence` (Perlin/fractal noise;
  `baseFrequency`, `numOctaves`, `type=fractalNoise|turbulence`, `seed`, `stitchTiles`). Stretched noise
  (`baseFrequency="0.1 0.01"`) mimics wood/fabric grain. These parameter values are an ILLUSTRATIVE starting
  recipe per class — tuned per artifact by the §7a visual-diff until within tolerance, never applied blind.
- **3D / gloss / emboss / metallic**: `feDiffuseLighting` + `feSpecularLighting` (with
  `feDistantLight`/`fePointLight`/`feSpotLight`), using noise as a bump/surface map.
- **Organic / liquid / sketchy distortion, glitch, roughened edges**: `feDisplacementMap` driven by
  `feTurbulence` (R/G channels displace X/Y); horizontal-stretched noise + channel split gives
  glitch/chromatic aberration.
- **Glass / glassmorphism**: `feGaussianBlur` + noise + `feDisplacementMap` (refraction) — richer than a
  flat CSS `backdrop-filter: blur()`.
- **Color grading / duotone / halftone-ish**: `feColorMatrix` (and `feComponentTransfer`).
- **Compositing the stack**: `feComposite` (incl. arithmetic) + `feMerge` / `feBlend`.

## Primary-medium axis — honest scope (non-visual treatments)

The taxonomy and four methods above are the **visual axis**. A brand whose PRIMARY identity carrier is
non-visual is routed here, not forced through a visual method. The cases below are ILLUSTRATIVE instances of
the non-visual class (an OPEN capability class mirroring the DIMENSION-MAP carrier set, never an exhaustive
two-member floor):

- **Motion signature** (e.g. a timing/easing identity, a signature animation): reproduction would be
  timing/easing curves validated by a frame-diff — **not yet a build-grade target** in this build. Route to an
  EXPLICIT declared GAP (`primary-medium reproduction not yet build-grade — tracked horizon`), fidelity-blocking
  per the carrier's role (`validate-audit.md` §1/§2).
- **Sonic treatment** (e.g. a sound logo, a sonic texture): out-of-code for this build (a raster-equivalent
  boundary) → route to a declared GAP, never a silent absence.
- **Any other non-visual lead carrier** the DIMENSION MAP resolves that this visual-build-grade build has no
  producer for (e.g. haptic/tactile, spatial/AR/interaction-pattern, scent/olfactory): route to the SAME
  declared GAP (tracked horizon), fidelity-blocking per the carrier's role — never dropped for lack of a row.

This keeps the router HONEST: a non-visual primary treatment is a tracked horizon carrying a declared,
role-blocking GAP — it never falls outside the §7a gate silently, and is never approximated by a visual filter
passed off as the real thing. (The medium-agnostic *reasoning* layers already handle these brands; only the
build-grade *reproduction* is scoped — see RESIDENT `## v3` and `keystone-emit.md` §4.)

## Validation (every reproduction)

Validate each reproduction by **visual diff against the source artifact** (overlay / perceptual
comparison); tune filter parameters until within tolerance. A reproduction that cannot be brought within
tolerance is not done — it either degrades to a lower method (procedural → vector-trace → raster) or becomes
a fidelity GAP. This visual-diff check is the reproduction half of the Stage-10 fidelity gate
(`validate-audit.md` §7a). **The verdict must leave a trace:** §7a commits the source capture + the
reproduction render + the recorded within/outside-tolerance verdict to `audit/fidelity/<treatment-id>/` in the
emitted repo; absence of that artifact for a reproduced treatment FAILS the gate.

## Boundaries (where the router stops)

- **Fidelity boundary — raster-required.** Photographic imagery, complex hand-made illustration, and any
  treatment whose identity depends on specific non-procedural artwork CANNOT be faithfully reproduced in
  code. Route to raster-asset-required and, if the asset is missing, log a fidelity GAP — never fake it with
  a procedural approximation passed off as the real treatment.
- **Performance boundary — constrain or rasterize.** `feTurbulence`/displacement stacks are CPU-heavy
  (multi-octave noise, large filter regions, and animation can fall back to CPU, cause jank, and
  overheat/drain mobile devices). For production: keep filter regions small, limit octaves/blur radius,
  avoid animating large filtered areas, and bake to a static raster where a static asset is cheaper. A
  treatment that is correct but too expensive for its surface is baked to raster, not shipped as a live
  filter.

## Frontier

The router reproduces what the scoper OBSERVED and pointed at (the handoff's TREATMENTS block, each at
`confidence: hypothesis`). It never invents a treatment the brand does not have, and never promotes an
observed one-off to a brand rule without owner confirmation. A bespoke artwork is traced from the brand's
own source vector (the master), never synthesized — synthesizing a brand's graphic-code pattern from scratch
is a dead-end (it invents instead of reproducing).
