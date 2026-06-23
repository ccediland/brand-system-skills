---
name: brand-system-skills-v3-research-foundation
description: "Frozen v3 research foundation for brand-system-skills — the resolved, brand-agnostic methods, taxonomies, standards, capability boundaries, and primary sources behind the v3 build, across six capability areas. The execution plan (v3-execution-plan.md) phases draw from this; durable decisions are mirrored in RESIDENT.md ## v3."
last_updated: 2026-06-22
applies_to: Repo ccediland/brand-system-skills — v3 of the brand-canon scoper/builder skills
status: reference (frozen research output; the build phases consume it)
---

> Frozen research output behind v3 (identify -> pre-research -> Research mode). Six general capability classes resolved with methods, explicit capability boundaries, and primary sources. Anti-determinism honored throughout: every resolution is a general capability/method/taxonomy with a boundary, never a single-brand instance. The five gated phases that consume this are in `v3-execution-plan.md`; the durable decisions are mirrored in `RESIDENT.md` `## v3`. This is reference material for the build, not an instruction file.

# Brand-Canon Skillset v3: Research Foundation for the /ai-roadmap

## TL;DR
- All six subtasks resolve to general, brand-agnostic capability classes with chosen methods and explicit boundaries: (1) a source-typed capture decision tree governed by a "read the brand's own stated truth via OCR/visual, tool metadata only corroborates" rule; (2) a treatment→reproduction decision tree routing any visual/textural treatment to procedural SVG-filter, generative-library, vector-trace, or raster-required; (3) a single keystone Markdown brand-file schema spanning think/speak/design + guardrails; (4) a posture-parameterized guardrail layer with a functional-requirements tier above personality; (5) an adaptive horizon-detection method seeded by a synthesized base taxonomy; (6) DTCG 2025.10 as the token target plus OKLCH as the general scheme-derivation engine.
- The most consequential primary anchors are firm: the W3C/DTCG Design Tokens Specification reached its first stable version 2025.10 on 28 October 2025 (theming via resolvers, modern color spaces incl. OKLCH, `.tokens`/`.tokens.json`, `application/design-tokens+json`); SVG Filter Effects primitives (feTurbulence, feDisplacementMap, feDiffuse/feSpecularLighting, feGaussianBlur, feColorMatrix, feComposite/feMerge) are resolution-independent but performance-bounded; PyMuPDF `page.get_drawings()` extracts vector line-art; and Claude consumes attached `.md` in-context by default, switching to a project-knowledge-search (RAG) tool near the context-window limit.
- The governing anti-determinism constraint holds throughout: every deliverable is a capability class, a taxonomy/space, or a decision method spanning all brands, with a stated capability boundary — no single-brand instances.

## Key Findings

1. **Capture is a per-source decision tree, not one extractor.** The skill must branch on six source archetypes (vector PDF brandbook, raster-only, live website, design file, social images, nothing) and in every branch obey a "stated-spec-read" rule: the brand's printed/declared truth (typeface NAME, declared HEX/Pantone) is authoritative; tool metadata (pdffonts, embedded-font tables) is corroboration only, because brand type is frequently outlined/flattened to shapes and font tables then report the studio's layout font or fail.
2. **Any treatment maps to one of four reproduction routes.** Procedural (SVG/CSS filter primitives) for natural texture, 3D/gloss/emboss, organic distortion, glass, grading, and compositing; generative library (rough.js-class) for hand-drawn/sketchy; vector-trace for brand-owned specific artwork; raster-asset-required for complex illustration/photography. The boundary is explicit and validated by visual diff.
3. **The keystone brand file must go beyond voice into design-reasoning and brand-thinking, plus a guardrail layer**, optimized as a single attachable Markdown file for a Claude Project (Opus 4.x).
4. **Guardrails are parameterized by posture and detected, not hardcoded**, with a functional-requirements tier placed ABOVE personality to prevent tonal dissonance.
5. **Horizons are detected adaptively** from a synthesized base taxonomy (Brand Key, Keller CBBE, Aaker, Neumeier, Wheeler), prompted one-line-plus-tracked-gap by default, with existing-material detection.
6. **DTCG 2025.10 is the token target; OKLCH is the general scheme-derivation method**, with light/dark, high-contrast, and sub-brand as worked cases of one transformation space.

---

## Subtask 1 — Multi-Source Brand-Asset Capture

### The decision tree (per source archetype)

**Branch A — Polished vector PDF brandbook.** Best capture: programmatic vector extraction with PyMuPDF `page.get_drawings()`, which returns a list of path dictionaries (draw commands, stroke/fill color, width, opacity) explicitly designed to comply with the `Shape` class attributes so one page's line art can be faithfully re-created on another. For clean isolated assets, avoid full-page bloated SVG: use Inkscape's copy-region-to-new-document approach — per Wikipedia's Graphics Lab PDF-conversion guide, "In order to reduce the size of the resulting image, it is almost always better to copy and paste the portion of interest into a new Inkscape document rather than try to delete the unwanted content and crop the canvas" — or `dvisvgm --pdf --output=file.svg file.pdf` (optionally `--optimize=all`, with the caveat that dvisvgm converts fonts to paths rather than embedding them, and can produce smaller SVGs on complex PDFs). Optimize output with SVGO (Node, plugin architecture, `multipass`) or svgcleaner (Rust, faster, strictly lossless by default, and able to repair SVGs SVGO cannot). Stated-spec-read rule: read the typeface name and declared HEX/Pantone from the page text/swatches via PyMuPDF text extraction or OCR; treat `pdffonts` output as corroboration only.

**Branch B — Raster-only logos.** No vector source exists. Path: (1) read stated specs from any accompanying text; (2) for unnamed faces, image-based font matching — WhatTheFont (MyFonts, deep-learning matcher over a large catalog; best for clean printed/sans/serif) and Fontspring Matcherator (indie/OpenType strength); fall back to vision-model naming for hand-lettered/custom; (3) if the logo must become vector, raster→vector trace, then fidelity-rate as reconstructed.

**Branch C — Live website.** Capture computed CSS truth directly (declared hex, font-family stacks, spacing) as the most authoritative machine-readable source; corroborate with rendered screenshots for OCR/visual read of any image-baked type. Note that JS-rendered content can defeat naive scraping.

**Branch D — Design file (Figma/Illustrator).** Highest-fidelity source: extract native styles/variables (Figma tokens, AI layer structure). Map directly to the token spine (Subtask 6). Stated-spec-read still applies: layer names and style names are the brand's declared truth.

**Branch E — Social-media images.** Lowest-fidelity, derived source: OCR/visual read for color and type cues; image font-matching for type; treat all captures as low-confidence pending owner confirmation.

**Branch F — Nothing (create-from-scratch).** No capture; route to generative authoring constrained by the brand-thinking/positioning section of the keystone file (Subtask 3) and token authoring (Subtask 6).

### Fidelity rating + provenance (per artifact)
Assign each captured artifact a fidelity tier (e.g., DECLARED → EXTRACTED-VECTOR → MATCHED → TRACED/RECONSTRUCTED → INFERRED) and a provenance record (source type, capture method, tool, whether the value is the brand's stated truth vs. tool-derived, confidence, and confirmation status). Tool metadata is never promoted above a stated spec.

**General recommended capability + boundary + source.** Capability: a source-typed capture decision tree with a stated-spec-read rule (OCR/visual read of named specs authoritative; pdffonts/font-table metadata corroborative only) and a per-artifact fidelity+provenance stamp. Boundary: where no stated spec and no vector source exist (Branches B/E), capture degrades to MATCHED-/INFERRED and MUST be owner-confirmed before canonization; outlined/flattened type cannot be recovered as a named font by metadata and may be unidentifiable even by image matchers (script/connected faces especially). Sources: PyMuPDF docs + Artifex blog (`get_drawings`); Inkscape CLI/Wiki + Wikipedia Graphics Lab (copy-region; dvisvgm `--pdf`); SVGO + svgcleaner repos; MyFonts WhatTheFont, Fontspring Matcherator; Adobe community threads on outlined-font identification failure.

---

## Subtask 2 — Treatment → Reproduction-Method Decision Tree

### Taxonomy of brand visual/textural treatments
Textures (rock, paper, fabric, grunge, distressed); hand-drawn/organic (ink, brush, pencil, watercolor, sketch, ink-blots, roughened edges); lighting/dimensional (gloss, emboss, 3D, metallic/foil); optical (glow/neon, blur/glassmorphism, glitch); print artifacts (halftone, risograph, grain); flat/geometric; photographic.

### The decision tree (treatment → method)
- **Procedural (SVG/CSS filter primitives)** — resolution-independent, scriptable, but performance-bounded:
  - Natural texture (clouds, marble, granite, paper, grain): `feTurbulence` (Perlin/fractal noise; `baseFrequency`, `numOctaves`, `type=fractalNoise|turbulence`, `seed`, `stitchTiles`). Stretched noise (`baseFrequency="0.1 0.01"`) mimics wood/fabric grain.
  - 3D / gloss / emboss / metallic: `feDiffuseLighting` + `feSpecularLighting` (with `feDistantLight`/`fePointLight`/`feSpotLight`), using noise as a bump/surface map.
  - Organic / liquid / sketchy distortion, glitch, roughened edges: `feDisplacementMap` driven by `feTurbulence` (R/G channels displace X/Y); horizontal-stretched noise + channel split gives glitch/chromatic aberration.
  - Glass / glassmorphism: `feGaussianBlur` + noise + `feDisplacementMap` (refraction) — richer than flat CSS `backdrop-filter: blur()`.
  - Color grading / duotone / halftone-ish: `feColorMatrix` (and `feComponentTransfer`).
  - Compositing the stack: `feComposite` (incl. arithmetic) + `feMerge`/`feBlend`.
- **Generative library (rough.js-class)** — hand-drawn/sketchy strokes, wireframe aesthetics. Per the rough-stuff/rough README, "Rough.js is a small (<9 kB) graphics library that lets you draw in a sketchy, hand-drawn-like, style"; it draws lines/curves/arcs/polygons/ellipses + SVG paths with `roughness`, `bowing`, `fillStyle`, and an optional `seed` for deterministic re-render, working in both Canvas and SVG.
- **Vector trace from the source artifact** — for specific artwork the brand owns (a custom pattern, a bespoke mark): trace/extract from the source (Subtask 1 tooling), not synthesized.
- **Raster-asset-required** — complex illustration or photography that cannot be faithfully generated in code.

### Fidelity validation + boundary
Validate each reproduction by visual diff against the source artifact (overlay/perceptual comparison), tuning filter parameters until within tolerance. Explicit capability boundary — what CANNOT be faithfully reproduced in code and must be sourced as a raster asset: photographic imagery, complex hand-made illustration, and any treatment whose identity depends on specific non-procedural artwork. A second, performance boundary: `feTurbulence`/displacement stacks are CPU-heavy (multi-octave noise, large filter regions, and animation can fall back to CPU, cause jank, and overheat/drain mobile devices); for production, keep filter regions small, limit octaves/blur radius, avoid animating large filtered areas, and bake to raster where a static asset is cheaper.

**General recommended capability + boundary + source.** Capability: a treatment-taxonomy→method router (procedural SVG-filter / generative-library / vector-trace / raster-required) with visual-diff validation. Boundary: procedural reproduction is bounded by (a) fidelity — photography and bespoke illustration are raster-required, and (b) performance — heavy filter stacks must be constrained or rasterized. Sources: W3C SVG 1.1 Filter Effects + MDN feTurbulence/feDisplacementMap; Codrops/CSS-Tricks/LogRocket-class tutorials on texture, glass, glitch; rough.js repo/site; SVG-filter performance reporting (GSAP forums, practitioner write-ups).

---

## Subtask 3 — AI-Knowledge Brand File Schema (think, speak, AND design as the brand)

### How Claude consumes the attached file (mechanics that drive the schema)
- **Project knowledge is in-context by default and switches to a project-knowledge-search (RAG) tool near the context-window limit.** Per Anthropic's Claude Help Center ("Retrieval augmented generation (RAG) for projects"): "When your project knowledge approaches the context window limit, Claude will automatically enable RAG mode to expand your project's capacity by up to 10x while maintaining quality responses... If your project knowledge later drops below the context window threshold, Claude can automatically convert back to context-based processing." Anthropic does not publish an exact token/percentage trip-point — activation is "handled automatically based on the size of your project knowledge." Implication: keep the keystone file comfortably within context so it is fully resident, not chunked/retrieved.
- **Flagship window is large** (Anthropic support docs list Opus 4.x at ~500K tokens in chat and up to ~1M in Claude Code/API; 200K baseline for older models), but long-context recall shows position effects ("lost in the middle"). Anthropic's own long-context guidance is to place data first and put the question/active instructions at the end of the prompt where recall is highest, and to use quote-extraction scratchpads. Implication: position durable behavioral rules and active instructions for high recall; do not bury guardrails mid-document.
- **Behavior vs. reference split**: Anthropic recommends concise project *instructions* for role/guidelines/behavior and *knowledge files* for reference content ("Keep project instructions concise: Claude performs best when you use project instructions for general context around your project, key guidelines, and Claude's role"). Implication: the keystone `.md` is a hybrid — its guardrail/behavioral layer is written to also work as project instructions, while its reference sections (tokens, examples) can live as knowledge.
- **Agent Skills option**: if delivered as a Skill, use the SKILL.md 3-level progressive-disclosure model — `name`+`description` YAML metadata always pre-loaded into the system prompt (~100 tokens/skill), the SKILL.md body loaded on trigger (under ~5K tokens), and bundled files/scripts read or executed via bash only as needed (effectively unbounded, never entering context unless read). The trigger decision is made from the YAML `description`. This is the mechanism the two-skill skillset (chat-side scoper, Code-side builder) should target; write tight, "what it does + when to use it" descriptions.

### The recommended keystone `.md` schema (single file)
1. **Front-matter / metadata** — brand name, version, provenance/epistemic-status pointer, intended consumption (Project knowledge + instructions).
2. **THINK AS THE BRAND (operative reasoning)** — essence, positioning, values rendered as decision rules ("when trading off X vs Y, the brand chooses…"), not adjectives. Derivable from Brand Key essence/discriminator + Aaker/Keller.
3. **SPEAK AS THE BRAND (voice)** — 3–5 voice attributes with behavioral definitions; persona description; audience-scoped registers; banned vocabulary / hard "never" list; on-brand vs off-brand comparison pairs (few-shot); a reusable prompt library. (This is the well-established machine-readable-voice core; the schema subsumes it.)
4. **DESIGN AS THE BRAND (visual/design reasoning)** — derived from the design-token canon (Subtask 6): how the brand makes color, type, spacing, and asset decisions (e.g., "primary reserved for X; chroma ceilings; type-scale ratio; when to use texture vs flat"). Reasoning, not just values.
5. **OPERATIONAL GUARDRAIL LAYER** (Subtask 4) — functional requirements above personality, refusal policy, posture settings, injection resistance.
6. **REFERENCE** — token spine pointer, asset inventory + fidelity/provenance (Subtask 1), horizon map (Subtask 5).

**General recommended capability + boundary + source.** Capability: a single-file Markdown keystone schema with think/speak/design layers + a guardrail layer, structured for Claude Project consumption (full-context residency, behavioral rules positioned for high recall, optionally packaged as a SKILL.md). Boundary: a single attachable file maximizes faithful embodiment only while it stays within the resident context window; beyond that it is silently chunked by RAG and guarantees of full-document adherence weaken — so the file must be size-budgeted and the load-bearing behavioral rules must not be buried. Sources: Anthropic support docs (RAG for projects; context-window sizes; project-instructions guidance); Anthropic engineering (Agent Skills, progressive disclosure; long-context prompting); Glean/Monigle (dual human/machine companion docs; behavioral voice, persona, hard-limits, comparison pairs, audience context, prompt library) [SECONDARY for the voice-doc pattern].

---

## Subtask 4 — Guardrail Layer Parameterized by Brand Posture

### Posture space
Low-profile/conservative; high-visibility/aggressive; regulated/compliance-heavy (health, finance, legal); activist/opinionated; playful/irreverent; B2B-formal.

### The parameterized guardrail structure
- **Functional-requirements tier ABOVE personality.** Per Klaviyo's engineering account ("How we taught our AI agent to speak your brand's language"), "Your first, most important decision is what *not* to do" — the risk is "the inappropriate application of tone to stressful situations. We call this 'tonal dissonance.'" Klaviyo's fix was a "universal requirement prompt that acts as the AI's primary directive, above all personality... your job comes first, your personality second," validated by an LLM-as-a-judge after "evaluations showed a small degradation in correctness when tone was added." So the layer is ordered: functional/factual requirements → refusal/safety → audience register → personality. This mirrors the LLM "instruction hierarchy" principle: Wallace et al. (OpenAI, *The Instruction Hierarchy*, arXiv:2404.13208) show LLMs "often consider system prompts... to be the same priority as text from untrusted users," and that an explicit privileged-instruction hierarchy "drastically increases robustness... while imposing minimal degradations on standard capabilities."
- **In-character refusal policy** — decline + offer an alternative path while holding voice (refuse the request, preserve the brand register).
- **Audience-scoped registers** — explicit how-the-brand-speaks-to: staff, customers, press, government/regulators, community. Each a named register block.
- **Off-limits topics + hard limits** — banned claims, banned vocabulary, regulated-claim constraints (parameterized heavily for the regulated posture).
- **Prompt-injection / roleplay-jailbreak resistance** — treat external/retrieved text as untrusted; safety/functional rules apply irrespective of any requested persona; reject "ignore previous instructions"/DAN-style persona overrides; the brand persona itself must not be a vector that lowers safety.
- **Exposure/visibility posture setting** — a parameter governing how forward/assertive the brand is in public (low-profile vs high-visibility), feeding tone ceilings.

### Posture-elicitation question set (detect, don't hardcode)
A scoper question battery that infers posture, e.g.: regulatory exposure ("Are claims you make legally constrained? By whom?"); risk appetite ("When in doubt, does the brand stay quiet or speak boldly?"); stance ("Does the brand take public positions on issues?"); humor/irreverence tolerance; formality default; audiences served and their relative priority; topics the brand will never discuss; how the brand should refuse. Answers set the posture parameters above.

**General recommended capability + boundary + source.** Capability: a posture-parameterized guardrail layer (functional tier above personality; in-character refusal; audience registers; hard limits; injection resistance; visibility setting) plus a posture-elicitation question set that detects the brand's profile. Boundary: in-context guardrails reduce but do not eliminate jailbreak/injection risk (persona prompts measurably increase attack success; instruction-hierarchy training raises robustness but is not absolute), so high-stakes/regulated postures still require external validation/human review rather than relying on the file alone. Sources: Klaviyo engineering blog (tonal dissonance, functional-above-personality, LLM-as-judge); OpenAI "Instruction Hierarchy" (arXiv 2404.13208); prompt-injection/persona-jailbreak literature (tldrsec defenses; persona-prompt attack studies) [SECONDARY for attack specifics].

---

## Subtask 5 — Detect, Prompt, and Ingest the Open-Ended Space of Brand Horizons

### Why a method, not a checklist
A fixed checklist causes tunnel vision and category mismatch (you would not ask an IT firm about a retail salsa line). The skill needs an adaptive method.

### Synthesized BASE brand-system dimension taxonomy (with provenance)
A category-neutral spine assembled from established frameworks, used as the seed set the method adapts from:
- **Positioning/essence/values** ← Unilever Brand Key (competitive environment, target, consumer insight, benefits, values & personality, reason-to-believe, discriminator, essence; + root strengths).
- **Equity build-stages (awareness→associations→judgments/feelings→resonance)** ← Keller CBBE pyramid.
- **Identity system + brand personality + brand-as-product/organization/person/symbol; brand architecture/sub-brands** ← David Aaker.
- **Essence/onlyness/difference** ← Marty Neumeier (The Brand Gap).
- **Touchpoint enumeration (logo, typography, color, packaging, signage/environments, digital, social, vehicles, uniforms, etc.) + five-phase process** ← Alina Wheeler, Designing Brand Identity (700+ touchpoint illustrations; "who are you / who needs to know / why should they care / how will they find out").

### Horizon space (open-ended, category-dependent)
Merch/uniforms; packaging; retail/product lines; motion/animation; sonic/audio branding (sonic logo/audio mnemonic, brand music, voice persona, environmental soundscape — derived cross-modally from the visual/values identity rather than developed in parallel); environmental/signage/spatial design; naming architecture/sub-brands; partnerships/co-branding; plus novel category-specific horizons.

### The detection-and-prompt method
1. **Detect relevant horizons by category.** From the brand's category + the base taxonomy, generate the candidate horizon set (e.g., hospitality → uniforms, signage, sonic, menu/packaging; SaaS → motion, naming architecture, partner co-branding). Suppress irrelevant horizons.
2. **Prompt lightly by default.** For each relevant horizon, offer a one-line direction + a tracked gap by default; deepen only when the brand already has material or asks. This prevents tunnel vision and over-scoping.
3. **Detect existing material.** Actively probe for assets a naive run would miss (existing uniforms, gift-shop merch, hold music, signage), so the canon ingests what already exists rather than re-inventing it.

**General recommended capability + boundary + source.** Capability: an adaptive horizon-detection-and-prompt method seeded by a synthesized base taxonomy (Brand Key + Keller + Aaker + Neumeier + Wheeler), with category-scoped relevance, one-line-plus-tracked-gap prompting, and existing-material detection. Boundary: detection is bounded by category knowledge — genuinely novel/idiosyncratic horizons can be missed, so the method must include an open "other horizons?" elicitation and owner confirmation rather than presenting its generated set as exhaustive. Sources: Unilever Brand Key; Keller CBBE; Aaker brand identity system; Neumeier The Brand Gap; Wheeler Designing Brand Identity; sonic-branding practitioner literature (cross-modal derivation) [SECONDARY for sonic specifics].

---

## Subtask 6 — Design-Token Standardization + General Scheme Derivation

### Token-format target: W3C/DTCG Design Tokens Specification 2025.10
- **Status/anchor.** First stable version, announced by the W3C Design Tokens Community Group: "San Francisco, CA – October 28, 2025 – The Design Tokens Community Group today announced the first stable version of the Design Tokens Specification (2025.10)," developed by "more than 20 editors" representing Adobe, Amazon, Google, Microsoft, Meta, Figma, Sketch, Salesforce, Shopify, Tokens Studio and others. The spec is "considered stable" and "intended for implementation." Files use `.tokens` or `.tokens.json` and media type `application/design-tokens+json`. JSON syntax; `$value`/`$type`/`$description`; atomic + composite types (color, dimension, fontFamily, fontWeight, duration, cubicBezier, number; border, shadow, gradient, typography, transition, strokeStyle); aliases via `{group.token}` references.
- **Theming via the Resolver module.** 2025.10 introduces resolvers (sets + modifiers + `resolutionOrder`) as the standard mechanism for theming/modes — superseding ad-hoc duplicated "modes," and adding fallbacks (e.g., dark-protanopia → dark) and dedup. A resolver declares sets (`$ref` to token files) and modifiers (e.g., `theme: {light, dark}` contexts with a default). Aliases MUST NOT be resolved until after set/modifier ordering is flattened; circular aliases are disallowed.
- **Modern color spaces.** Structured color values with `colorSpace` (srgb, display-p3, **oklch**, oklab, hsl, lab, lch, …), `components`, optional `alpha` and `hex` fallback — making perceptual-space authoring native.
- **Tooling reality.** Reference implementations: Style Dictionary, Tokens Studio, Terrazzo. Per Style Dictionary's own docs, "As of version 4, Style Dictionary has first-class support for the DTCG format. Important note: the latest format 2025.10 does not have full support yet in Style Dictionary. This is a work in progress in v5." Terrazzo is actively implementing resolvers + full 2025.10. Adopters incl. Figma, Penpot, Sketch, Framer, zeroheight, Supernova, Knapsack.

### Compiled spine + machine-readable mirror
Author a layered token architecture (primitive/base → semantic/alias → component) in DTCG 2025.10; compile the human-facing spine and a machine-readable mirror (the keystone file's DESIGN-AS layer references the semantic tokens and their decision rules). Use resolvers for every theme dimension, not just light/dark.

### General perceptual scheme-derivation method: OKLCH
OKLCH (L = perceptual lightness 0–1, C = chroma, H = hue 0–360; built on OKLab) is perceptually uniform: equal numeric steps ≈ equal perceived steps, and lightness/chroma are decoupled from hue (unlike HSL, where equal-L colors differ in brightness and hue drifts across a lightness ramp). This makes one general transformation engine cover the whole scheme space:
- **Light → dark (worked case).** Invert/redistribute L while preserving H and C so a `violet-600` stays recognizably violet instead of muddy gray-purple; tune chroma for dark backgrounds.
- **High-contrast/accessibility (worked case).** Push L separation between fore/background to meet contrast targets while holding H/C identity; validate with contrast models (WCAG, and APCA via OKLCH-native tooling such as apcach).
- **Sub-brand / seasonal (worked case).** Rotate H (and/or shift C) by fixed degrees from a single authored scheme to generate sibling palettes that share L/C and therefore feel like one family; equal-C harmonic sets keep visual weight consistent.
- **Reorganizing an ad-hoc palette.** From observation, place each existing color in OKLCH, infer the intended L-ramp/H-families, snap to a coherent token scale, and confirm with the owner (stated-spec/owner-confirmation rule from Subtask 1).

**General recommended capability + boundary + source.** Capability: target DTCG 2025.10 (`.tokens.json`, structured color incl. OKLCH, aliases, resolver-based theming) for the spine and machine-readable mirror, plus an OKLCH perceptual scheme-derivation engine that treats light/dark, high-contrast, and sub-brand/seasonal as cases of one L/C/H transformation, and can re-coherence an ad-hoc palette. Boundary: (a) tooling lag — full 2025.10/resolver support is still landing (Style Dictionary 2025.10 support is a "work in progress in v5"), so a pipeline may need a fallback transformer; (b) gamut — highly saturated OKLCH values can fall outside sRGB and need gamut-mapping/fallbacks for non-P3 displays; (c) derivation proposes, owner confirms — generated alternate schemes are recommendations requiring confirmation, not authoritative brand truth. Sources: W3C DTCG announcement + Format/Resolver/Glossary modules 2025.10; Style Dictionary + Terrazzo + zeroheight docs; OKLCH literature (Evil Martians, Ottosson/OKLab, Tailwind v4 OKLCH default, APCA/apcach).

## Recommendations
- **Stage 1 — lock the spine.** Adopt DTCG 2025.10 as the canonical token format and OKLCH as the color authoring/derivation space now; build the compiler against Style Dictionary v4 (first-class DTCG) with a documented fallback for not-yet-supported 2025.10/resolver features, re-evaluating when Style Dictionary v5 ships full support. Benchmark to change course: if resolver support stalls in tooling, ship modes via a custom transformer (or Terrazzo) rather than blocking.
- **Stage 2 — build the two skills around Claude mechanics.** Chat-side scoper = elicitation (posture battery + horizon detection + stated-spec capture prompts). Code-side builder = capture/extract/compile (PyMuPDF/Inkscape/dvisvgm/SVGO/svgcleaner + token compile + keystone-file emit). Package as SKILL.md with tight, "what + when" `description` triggers; keep the keystone brand file within resident context and position guardrails/active instructions for high recall (data first, instructions last).
- **Stage 3 — validation gates.** Visual-diff every procedural reproduction; owner-confirm every MATCHED/INFERRED capture and every derived scheme; red-team the guardrail layer with persona/injection prompts for regulated/high-visibility postures.
- **Thresholds that change the plan:** if the keystone file exceeds the resident window (RAG kicks in), split reference sections into retrievable knowledge and keep only behavioral rules + design-reasoning in-context. If feTurbulence stacks cause runtime jank on target surfaces, bake to raster. If full DTCG-2025.10 resolver support does not land in the chosen build tool, keep the custom-transformer fallback in place.

## Caveats
- Several supporting sources are practitioner/secondary (Codrops, CSS-Tricks, LogRocket, Atom Writer, Glean, Monigle, design-tool blogs) and are used for pattern evidence, not as primary authority; vendor brand-AI marketing (Klaviyo product surfaces, Glean) is cited only as evidence of an industry pattern and marked accordingly. The Klaviyo *engineering* account of tonal dissonance is treated as credible practitioner engineering, distinct from its product marketing.
- Anthropic does not publish an exact RAG trip-point or a single explicit instruction-precedence list; the behavior-vs-reference split and high-recall positioning are from Anthropic docs, but the precise precedence ordering (instructions > knowledge > conversation) is well-supported by model behavior yet partly inferred from secondary write-ups.
- The DTCG resolver and full 2025.10 support are new (Oct 2025) and still propagating through tooling; treat tool conformance as a moving target through 2026.
- Model/version details (Opus 4.x window sizes) come from Anthropic support docs that list multiple in-flight model names; treat exact figures as point-in-time. Anthropic's published long-context recall numbers predate Opus 4.x (run on Claude 2), so the qualitative position-effect guidance holds but the specific accuracy figures are not representative of current models.
- The anti-determinism constraint was honored: every resolution is a general capability/method/taxonomy with a boundary; the anonymous restaurant stress-test instance produced no single-brand artifacts in this research.

---

## Appendix A — Research scope, source priority, and subtask briefs (from pre-research)

This appendix records the pre-research framing that produced the findings above, so the scope boundaries survive — in particular, **what was researched as a general capability vs. what is a roadmap-level design decision** (the latter is NOT in this doc; it lives in `RESIDENT.md` `## v3` Decisions).

### Governing constraint
Anti-determinism: every answer is a general capability class, a space/taxonomy, or a decision method spanning all brands — never a single-brand instance. The anonymous restaurant was a stress-test instance only. The pre-research itself was re-leveled once after instance-level determinism was caught in the first pass.

### Stated assumptions
The keystone is a single attachable in-context file for a Claude Project (Opus 4.x), not fine-tuning/RLHF. Repo deliverables are dense structured English. The brand instance is an anonymous stress test, not the objective.

### Scope IN (researched as general capabilities — resolved in the sections above)
(1) multi-source capture + stated-spec-read + fidelity/provenance; (2) treatment→reproduction decision tree + capability boundary; (3) keystone `.md` schema (think/speak/design + guardrails); (4) posture-parameterized guardrails + posture elicitation; (5) adaptive horizon detection + base taxonomy; (6) DTCG 2025.10 tokens + OKLCH scheme derivation.

### Scope OUT (NOT researched — these are roadmap-level DESIGN DECISIONS, recorded in `RESIDENT.md` `## v3`, not findings here)
- The data-provenance / epistemic-status model (the v3 spine) — a design decision, not external research.
- The internal-vs-external two-surface document split — a design decision.
- The `v0/DEMO`-as-engagement framing (OPTIONAL defaults YES, with the mark + graphic-code carve-out) — a design decision.
- Also excluded: general branding-theory restatement (frameworks already identified); model fine-tuning/RLHF (the target is an in-context file); SaaS brand-AI procurement/pricing (Jasper, Omneky, Glean) except as a marked [SECONDARY] industry pattern.

### Source priority (applied throughout)
1. Primary specs/standards — W3C/DTCG Design Tokens 2025.10, W3C SVG Filter Effects, MDN.
2. Primary library/tool docs — PyMuPDF/Artifex, Inkscape, dvisvgm, rough.js and similar generative libs, SVGO/svgcleaner, image-based font-ID tools.
3. Anthropic docs for the Claude/Projects target (Opus 4.x; Project-knowledge mechanics; how an attached `.md` is consumed).
4. Credible practitioner engineering — Klaviyo (tonal dissonance / prompt hierarchy), Codrops/CSS-Tricks/Smashing (SVG filters), zeroheight (tokens).
5. [SECONDARY] brand-AI vendor marketing (Glean, Jasper, Omneky) — only as evidence of an industry pattern.

### The six subtask briefs (what each one researched, with its resolution target)
1. **Multi-source capture** — decision tree per source archetype (vector PDF, raster-only, live website, design file, social images, none); the stated-spec-read rule (named font / declared color authoritative; `pdffonts`/embedded-font tables corroborative only, since brand type is often outlined/flattened); clean vector extraction (PyMuPDF `get_drawings`, dvisvgm, Inkscape copy-region, SVGO/svgcleaner); image font-matching (WhatTheFont, Matcherator); fidelity+provenance per artifact. → the per-source capture decision tree.
2. **Treatment → reproduction-method tree** — taxonomy of treatments (textures, hand-drawn/organic, lighting/dimensional, optical, print-artifacts, flat, photographic) mapped to procedural SVG/CSS filter / generative library (rough.js) / vector-trace / raster-required; visual-diff validation; explicit code-can't boundary. → the treatment→method tree + boundary.
3. **AI-knowledge brand-file schema** — a single Markdown file letting an AI speak, design, AND think as the brand, plus a guardrail layer; how a Claude Project consumes an attached `.md` (context vs retrieval). → the keystone `.md` schema.
4. **Guardrails by posture** — functional-requirements tier above personality (anti tonal-dissonance), in-character refusal, audience registers, hard limits, injection resistance, visibility setting; posture detected not hardcoded. → parameterized structure + posture-elicitation set.
5. **Horizon detect/prompt/ingest** — adaptive detection by category, one-line+tracked-gap prompting, existing-material detection; base taxonomy from Brand Key / Keller / Aaker / Neumeier / Wheeler. → the method + base taxonomy.
6. **Tokens + scheme derivation** — DTCG 2025.10 (resolvers, OKLCH-native, `.tokens.json`) for the spine + machine-readable mirror; OKLCH as one perceptual scheme-derivation engine (light/dark, high-contrast, sub-brand). → token format + derivation method.

### Success criterion (completion test)
Each subtask yields a general recommended capability/method with sources and an explicit boundary, sufficient for the `/ai-roadmap` to list it as a v3 feature with a chosen method — with no subtask left at "investigate further," and no finding phrased as a single-brand solution.
