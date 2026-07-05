Use the brand-canon-builder skill to build a brand canon in this repo.

BRAND: Fixture Alpha
OWNERS: demo-owner (all slots)   UNRESOLVED CONFLICTS: none
MODE: ANALYZE   BUILD-MODE: FULL
TARGET REPO: .

— MATERIAL MANIFEST (two tracks; dead/auth-walled/Downloads pointers forbidden) —
  ASSETS (in-repo before build OR acquired by the builder per its declared route; checksummed):
    brandbook · role:REFERENCE · fresh:shipped · path:sources/brandbook.txt · fidelity:build-grade · sha256:53a4a22b50142bc3e33cfced76a04ed5f549f13ce9abc11af9061d30d17c64e9 · ingest:ocr-visual · acquire:pre-placed · fallback:none→GAP
    site-css · role:RAW · fresh:shipped · path:sources/site.css · fidelity:build-grade · sha256:a63598ad09e097c44ce2263b651e64279c139706c316c990ae45813e8f2373fc · ingest:computed-css · acquire:fetch https://example.invalid/styles.css · fallback:owner-delivery
    wordmark-master · role:REFERENCE · fresh:stated-old · path:assets/wordmark.svg · fidelity:build-grade · sha256:to-hash-on-acquire · ingest:vector-extract · acquire:recover-wayback https://example.invalid/press-kit (era-pin 2019-01→2021-06) · fallback:owner-delivery
  CONSUMERS (live surfaces the brand ships today; verified by reachability, not a checksum):
    site · url:https://example.invalid · role:CONSUMER · fresh:shipped · bidirectional:n · promotion-path:none · ingest:computed-css

— WHY (essence) — RATIFIED{ by: demo-owner · how: in-session sign-off · date: 2026-01-15 } —
  Category/positioning: a placeholder utility brand · Audience: fixture readers · Feel (is / never): plain / ornate
  Anti-promise: never claims delight · One line (onliness): the only brand that exists to exercise gates · RTB: it ships fixtures
  Voice (register/lexicon/don'ts): flat register · says "check" · never says "magic"
  Personality (scored attributes on an owner-ratified scale): steady 4/5 · plain 5/5 · warm 2/5
  Differential scales (formal↔casual): formal-leaning · Resonance: calm reliability
  VALUE TRADE-OFFS: when trading clarity vs charm the brand chooses clarity
  VOICE-EXEMPLARS (per audience): fixture readers → on-brand:"The gate passed." / off-brand:"Magic happened!" · PROVENANCE{ confidence:owner-confirmed }
  PROPOSED (quarantine — only what the owner asked the scoper to draft): seasonal accent → a muted seasonal tint · PROVENANCE{ source:proposed · confidence:hypothesis } · gap: seasonal accent pending ratification

— WHAT (primitives) — POINTERS + OWNER-PROVIDED ONLY (scoper never sampled) —
  ink: present:y · intent:text ink · owner value:none · source:sources/brandbook.txt
    · PROVENANCE{ source:declared-spec · confidence:owner-confirmed · owner:demo-owner · freshness:shipped }
  paper: present:y · intent:ground · owner value:none · source:sources/brandbook.txt (primary master — read exact)
    · PROVENANCE{ source:declared-spec · confidence:verified-primary · owner:demo-owner · freshness:shipped }
  night-ink: present:y · intent:dark-scheme ink · owner value:oklch(0.86 0 0) · source:this handoff
    · PROVENANCE{ source:owner-stated · confidence:owner-confirmed · owner:demo-owner · freshness:shipped }
  signal: present:y · intent:status hue · owner value:oklch(0.70 0.12 145) · source:this handoff (proxy answered)
    · PROVENANCE{ source:owner-stated · confidence:proxy-relayed · owner:demo-owner (via proxy: demo-manager) · freshness:shipped }
  brand-blue: present:y · intent:primary hue · owner value:none · source:sources/site.css + sources/brandbook.txt
    · PROVENANCE{ source:computed-css · confidence:corroborated · owner:demo-owner · freshness:shipped }
  body-face: present:y · intent:reading face · owner value:none · source:sources/site.css
    · PROVENANCE{ source:matched · confidence:hypothesis · owner:demo-owner · freshness:stated-old }
  mark forms present: wordmark
  per-mark GEOMETRY (owner-provided + PROVENANCE; builder Stage 6 reads, does not re-hunt):
    wordmark: clear-space:0.5x cap-height · min-size digital:24px · min-size physical:none · construction-ref:none · PROVENANCE{ confidence:proxy-relayed }
  per-font: Body Face: license:OFL-1.1

— HOW (grammar) —
  Schemes: day + night · contrast/imagery rule: plain photography, no illustration · mark-selection rule: wordmark everywhere
  voice enforcement: lexicon list · motion: not used · depth: not used
  generative-rule seeds (if/then): if mode=dark then surface=elevated

— TREATMENTS (visual/textural, for the reproduction router) —
  grain-overlay: observed-on:brandbook · route-hint:procedural · PROVENANCE{ confidence:hypothesis }

— DIMENSION MAP (every dimension resolves; none skipped silently; scoper owns completeness) —
  color: filled · type: filled · iconography: not-used(owner-declared) · motion: not-used(owner-declared)
  pattern: tagged-gap · imagery: filled
  applied-expression/social: not-used(owner-declared)
  consultation-surface: always-required

— HORIZONS (category-detected; one-line + gap by default) —
  packaging: not-relevant · existing-material:n
  merch: direction one-line (plain utility goods) · existing-material:n

— POSTURE (guardrail layer) —
  profile:b2b-formal · visibility:low · audiences:fixture readers, maintainers · regulatory:none · stance:neutral · never-topics:none · refusal-style:plain decline

— CORE-ASSET FIDELITY CONTRACT (this brand's must-haves) —
  wordmark: present build-grade
  NON-WAIVABLE even in v0/DEMO: the brand's PRIMARY-IDENTITY CARRIER(S) — visual mark (wordmark) · graphic-code

— GAPS (client-language; builder formalizes to GAP-NNN) —
  pattern language — why: never defined · severity:SHOULD · provenance:handoff-deliberate · proposed: draft from existing spacing rhythm
  seasonal accent — why: owner asked for a draft · severity:SHOULD · provenance:handoff-deliberate · proposed: the PROPOSED muted seasonal tint above

— OPTIONAL —
  print-collateral: not used
  Claude Design component library: YES
  existing-component-stack: none

NOTES: synthetic fixture handoff (Fixture Alpha) — full-surface v5 contract instance; zero real brand content.
