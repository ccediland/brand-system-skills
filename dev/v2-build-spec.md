# v2 build spec — brand-canon-builder

> Version 1.0 · 2026-06-21 · research-grounded · brand/country/client-blind
> Consumed by a Claude Code session that rewrites `skills/brand-canon-builder/` to v2.
> Sibling of `dev/v2-intake-spec.md` (the scoper side, already merged). Together they cover WS0–WS5.

## §0 — Purpose & consumers

This document specifies the v2 rewrite of `brand-canon-builder` (the Code-side skill). It is the design
authority a Claude Code session executes; it is not itself shipped to a client.

It closes the workstreams the intake-spec did not: **WS2** (post-build validate/audit), **WS3**
(client-clean output), **WS4** (distribution/install/deps), **WS5** (real assets + brand fidelity), plus the
builder half of the WS0 doctrine and the WS1 handoff bridge. The granular evidence is `dev/v2-backlog.md`
(F-001…F-026); the reframe and surface roadmap are `RESIDENT.md › ## v2`.

The builder consumes the **machine-readable handoff** the v2 scoper now emits
(`skills/brand-canon-scoper/references/handoff-format.md`, merged). This spec assumes that contract verbatim.

## §1 — Scope & invariants

**The center of gravity (the inversion).** The first real run proved v1 ships a *hollow skeleton*:
structurally correct, but unpresentable — placeholder mark, fallback fonts, generic renders — and every gate
passed on it. v2 makes the builder an engine that **analyzes published brand work across mediums → extracts
the real assets → produces a real, presentable prototype and a `/design-sync`-ready component-library source,
by default.** The four-layer canon remains the **skeleton**, never the deliverable.

**Hard invariants — do NOT regress** (validated in the v1 run; the reframe adds on top, never removes):

| Invariant | Source |
|---|---|
| Output-agnostic: no layer/file/section named for an output; coverage absorbed as generative rules | architecture.md |
| Generative over catalog: `G-*` rules + `ALGO-*` algorithms, stable IDs, rule-ID citation (`ruleIndex`) | architecture.md |
| Dual legibility: prose `canon/*.md` + machine mirror (`tokens.json`, `canon.json`); disagreement = bug | architecture.md |
| DTCG/OKLCH token spine: OKLCH literal in `$value`, plain-string values, `{tier.cat.name}` aliases, namespace-aligned categories, OKLCH-preserving transform (never `color/css`) | token-spine.md |
| Authored/derived: per-entry `source:"authored"\|"derived"` in `$extensions`; authored spot/CMYK never re-derived | token-spine.md |
| Lego property: repo always valid; every missing must-have = a tracked `GAP-NNN`, never a silent hole, never fabricated brand truth | gap-protocol.md |
| Universality stress test (three unnamed artifacts spanning media) as the real completeness net | gap-protocol.md |
| Brand-scrub: junk only, gated behind human OK, facts preserved | brownfield.md |
| Expanded taxonomy exercised: wordmark/symbol/lockup/secondary/monogram/seal/pattern/physical reproduction | coverage-checklist.md |
| Motion/depth: first-class but optional; reserved-or-used; emitted DTCG-valid even without a consumer | token-spine.md |

**Brand-blind.** Every rule encoded brand/country/client-neutral. The builder clones per brand by swapping
the canon; it must stay strictly brand- and output-agnostic.

**Blast radius & staging.** This rewrite is far larger than the scoper's (which was 2 files). It touches
`SKILL.md`, ~7 references (some rewritten, some new), `assets/templates/`, repo-meta, and introduces a real
pipeline (PDF extraction, font acquisition) and a prototype/kit emitter. **The spec is one document; the
execution is staged into reviewable PRs** (§6). No mega-PR.

## §2 — Doctrine (WS0 / F-023·024·025·026)

Four doctrinal shifts, mirrored from and consistent with the scoper:

1. **Analyze published work is the default; CREATE is the rare exception.** The brand almost never arrives
   blank. Default = analyze its published expression across mediums → harvest → refine → transform → improve
   into a canon + real assets. CREATE (author brand truth from the ratified WHY) is entered **only on the
   handoff's explicit `MODE: CREATE`**. The greenfield-vs-brownfield top dichotomy is **retired** (Dead-end).

2. **Mode = ANALYZE | CREATE; coverage is per-layer.** Read `MODE` from the handoff. Within either mode,
   completeness is measured **per canon layer** (INDEX/ESSENCE/PRIMITIVES/GRAMMAR — sourceable / partial /
   elicit-only / empty), never by artifact type.

3. **A real prototype and a `/design-sync`-ready library are default build outputs — not deferrable gaps.**
   "Placeholder here" as a default is unacceptable (F-025). The deliverable includes a presentable prototype
   (real mark, real fonts, real imagery on real surfaces) and the repo is **born `/design-sync`-able**
   (F-026). The optional "Claude Design adapter? no" default is **retired** (Dead-end).

4. **No-placeholder-default + never invent brand truth.** These coexist: assets are *extracted/acquired/
   harvested* (not invented), and what genuinely cannot be sourced is a **fidelity GAP**, not a fabricated
   value and not a silent pass. Proceeding to "done" without core assets is the bug — not the gap-logging.

## §3 — The builder pipeline (rewritten, gated)

Fixed sequence. **BLOCKING** gates must pass (or be explicitly waived by the owner via the handoff/PR)
before the build is declared complete. Gates 3, 4, 8, 10, 11 are new or materially strengthened in v2.

| # | Stage | What happens | Gate |
|---|---|---|---|
| 0 | Ingest handoff + locate target | Parse the machine-readable contract; confirm real target repo + brand + owners | parse-or-stop |
| 1 | Scaffold (always) | Copy the full template set; fill header fields — the Lego baseplate | — |
| 2 | Read material in-repo | Read placed material from `assets/` (binaries) + `sources/` (references); never Project knowledge | — |
| 3 | **Asset extraction** | Extract embedded vectors/images from source PDFs (+ SVG/vector sources) → `assets/`; inventory by slot | **BLOCKING** (core) |
| 4 | **Font acquisition** | Resolve named faces → fetch+self-host open; use handoff-provided licensed files; else fidelity GAP | **BLOCKING** (core) |
| 5 | Applied-design harvest | Observe live consumers (site/social) the scoper pointed at: layout, imagery, composition, type-in-use | — |
| 6 | Fill the canon | ANALYZE (harvest) or CREATE (author from ratified WHY); builder **extracts** measured primitives; meaning in prose, values in tokens; mirror to `canon.json` | — |
| 7 | Token spine | Author base/semantic/component (OKLCH spine, authored/derived) — unchanged invariant | — |
| 8 | **Prototype + `/design-sync`-ready kit** | Emit a self-contained presentable prototype (F-025) + the component-library source + adapter (default) + build manifest (F-026) | **BLOCKING** (prototype) |
| 9 | Coverage + gaps | Formalize the handoff's client-language gaps → `GAP-NNN` (two-ledger); walk must-haves | — |
| 10 | **VALIDATE / AUDIT** | Output-agnostic + DTCG + universality (existing) **+ fidelity gate + content audit + render real samples**; assemble the client-confirmation evidence | **BLOCKING** |
| 11 | **Client-clean / scrub** | Scrub reference-brand bleed, tool self-attribution, scaffolding chatter; **never auto-stamp ratification** | **BLOCKING** |
| 12 | Commit + PR | Commit on `claude/<name>`; open a PR carrying the audit + samples + open ratification GAPs | emit once 0–11 clear |

## §4 — Stage detail

### §4.1 Handoff contract consumption (F-003·006·007·008 bridge)

The handoff is the **canonical brief**. Parse every block of
`skills/brand-canon-scoper/references/handoff-format.md` and act on it; do not re-derive what it already
ratifies:

- `MODE` → §4.2. `TARGET REPO` → the real repo (never invent a tree). `OWNERS` / `UNRESOLVED CONFLICTS` →
  ratification bookkeeping; unresolved conflicts are open GAPs, never builder-decided.
- `MATERIAL MANIFEST` → the in-repo paths (`assets/`/`sources/`) the builder reads in stage 2. **Material
  lives in the repo, never in Project knowledge** (F-007). If the manifest points anywhere the builder
  cannot read, stop and report — do not proceed against a phantom source.
- `WHY (essence) — RATIFIED` → fill ESSENCE from it directly. **The builder never re-elicits or re-infers
  the WHY**; if a WHY field is a GAP in the handoff, it stays a GAP (owner ratifies), never a builder guess.
- `WHAT (primitives) — POINTERS + OWNER-PROVIDED ONLY` → the builder **extracts** measured values from the
  pointed-to sources (its half of the frontier). Owner-provided values (e.g. declared Pantone, flagged
  `authored-print`) are taken as truth and written `source:"authored"` (never re-derived). `intent` seeds
  the per-atom meaning in ESSENCE.
- `HOW (grammar)` + `generative-rule seeds (if/then)` → seed `G-*`/`ALGO-*`; promote each seed to a stable
  rule ID. `CORE-ASSET FIDELITY CONTRACT` → drives the fidelity gate (§4.7). `GAPS (client-language)` → the
  builder owns formalization into `GAP-NNN` (the two-ledger split: scoper writes client language, builder
  assigns IDs). `OPTIONAL` (incl. `Claude Design component library: default YES`) → §4.6.

**Material-placement convention (D2, reconciled builder-side).** Document, in `SKILL.md` and `brownfield`→
`analyze.md`, that source material is read from **`assets/`** (binaries: marks, fonts, imagery) and
**`sources/`** (references: brandbook PDFs, exported docs). The scoper asserts this placement; the builder
must read from it. The scaffold (stage 1) creates both directories.

### §4.2 Mode reconciliation (F-024)

Replace `Step 0` greenfield/brownfield detection with: **read `MODE` from the handoff** (default ANALYZE if
a direct-to-Code run with no handoff and published material exists). Rename the two reference files so they
stop reasserting the retired dichotomy:

- `references/brownfield.md` → **`references/analyze.md`** — the ANALYZE default: inventory sources,
  harvest decisions (meaning→ESSENCE, atoms→PRIMITIVES/tokens, rules→GRAMMAR), **harvest applied design from
  live consumers** (§4.5), reconcile precedence (fresher/shipped wins specifics; identity wins meaning; repo
  wins over external brandbook; abstract to universal before promoting), harvest-before-remove (brand-scrub
  gated). This is the existing brownfield logic **plus** the applied-design harvest it was missing (F-021).
- `references/greenfield.md` → **`references/create.md`** — the CREATE exception: author the canon from the
  **ratified handoff WHY** (not a fresh interview — the scoper already elicited it), fill what the brief
  supports, GAP the rest. "Elicit in four-question order" becomes "consume the handoff in four-question
  order."

The asset/font/library stages (§4.3–§4.6) are **mode-independent** — they run in both ANALYZE and CREATE —
so they live in `SKILL.md` + their own references, not inside analyze/create.

### §4.3 Asset extraction pipeline (F-018) — BLOCKING for core assets

The single largest v1 miss: zero asset extraction although a PDF renderer already ran for color. Make
extraction a **first-class build step**:

- **Toolchain (portable):** PyMuPDF (`fitz`) primary — extracts embedded raster images, vector drawings, and
  embedded font programs from PDFs; `pdfimages`/`pdftocairo` (poppler) as the documented fallback. Declare
  this dependency in `SKILL.md` and the distribution doc (§5.4 / F-011).
- **What to extract, per the scoper's inventory:** wordmark, symbol, primary/secondary lockups, monogram,
  seal, icons, pattern/texture, type specimens. Prefer the **vector master**; place each under `assets/`
  with a slot name and a fidelity tag (build-grade vector vs reference raster).
- **Non-PDF sources:** SVG used directly; AI/EPS converted where tooling allows, else GAP. Raster-only of a
  core slot is reference-only per the scoper's rubric → **cannot be rebuilt to a master** → fidelity GAP.
- **Frontier:** the builder extracts measured/derived values (geometry, palette from the authored source);
  it does not re-elicit intent. Owner-declared authored print values win over anything sampled.

### §4.4 Font acquisition (F-019) — BLOCKING for core type

Named faces must stop punting to fallback stacks. The step:

1. Resolve each named face to a source.
2. **Open/libre faces** (Google Fonts, OFL, etc.): fetch, **self-host** under `assets/fonts/`, include the
   license file, wire `@font-face`/token `fontFamily`.
3. **Commercial faces:** use the licensed files **if the handoff provided them** (placed in `assets/`).
   **Never embed an unlicensed commercial font.** If absent, log a **MUST-HAVE fidelity GAP** ("acquire
   commercial license for <face>, surfaces: web/desktop/app") with the foundry/purchase pointer. The build
   does not pirate to pass a gate — this keeps the operator clear of licensing liability.

### §4.5 Applied-design harvest (F-021)

The scoper **points** at live consumers (site, social) flagged as bidirectional design-intent sources; the
builder **harvests** their applied design (v1 harvested facts but ignored design):

- Observe and promote (abstracted to universal, stripped of stack/medium): layout/composition patterns,
  imagery/photography direction (lighting, tone, framing, what is avoided), type-in-use vs declared,
  the lived aesthetic. Feed GRAMMAR (rules) and ESSENCE (meaning); capture measurable atoms into tokens.
- Where lived expression diverges from stated intent, log the divergence (a gap to reconcile), never silently
  overwrite the ratified WHY. Never fabricate — harvest only what the references actually show.

### §4.6 Real prototype + `/design-sync`-ready kit, by default (F-025·026) — BLOCKING (prototype)

**Grounding (D-B1).** `web-stack-skills` was verified: it builds Astro 6 + Cloudflare *sites* (its
`astro-css-tokens` ingests the DTCG spine into CSS vars/Tailwind), **not** the compiled component-library
package `/design-sync` needs. So the compile is **not** delegable there today, and the builder must **not**
become a full React/Storybook/npm build toolchain (that breaks stack-agnosticism and is brittle). The
resolution splits F-025 from F-026 and right-sizes each:

- **F-025 — the presentable prototype (the builder produces it, deterministically, no toolchain).** Emit a
  **self-contained HTML prototype**: inline CSS from the OKLCH token values, the real extracted mark as
  inline SVG/data-URI, acquired fonts via `@font-face`/data-URI, harvested imagery — rendering the brand on
  a handful of **real surfaces** (hero, card, button/control set, type spread, color blocks). Zero build
  step; one file the builder writes directly. This is the artifact you show a client and that sells the
  service, and it doubles as the fidelity gate's "render real samples" evidence (§4.7).
- **F-026 — born `/design-sync`-ready (the builder emits the kit *source* + adapter + build manifest, as a
  projection).** Upgrade the Claude Design adapter from **optional to DEFAULT** (`OPTIONAL.Claude Design = YES`
  unless explicit owner opt-out). Emit: the adapter (`config.json`/`conventions.md`/`NOTES.md`, filled from
  the canon), the **component-library source scaffold** (components consuming tokens/mark via `var(--*)`/asset
  refs — `kit = constant, canon = variable`, never redefining values), and a **one-command build manifest**
  (`package.json` + build command) so the dist is one `npm run build` away. The compile to dist/Storybook is
  a documented single command run in the **consumer's Node env** — attempted **best-effort** by the builder
  if a toolchain is present, but **never a hard-fail dependency** (npm/network absence must not fail the
  build). The library source lives in a kit dir as a projection; the canon names no stack.
- **Forward pointer (OI):** a companion skill that compiles a component-library package from a canon kit is a
  real gap in the ecosystem (web-stack-skills builds sites, not libraries). Track it; do not make the builder
  depend on it.

### §4.7 Fidelity gate + VALIDATE/AUDIT stage (F-016·022) — BLOCKING

v1 ended at "canon built" and rewarded rule-compliance over fidelity. Add a real final stage that consumes
the scoper's `CORE-ASSET FIDELITY CONTRACT`:

- **Fidelity gate:** for each core slot the contract marks must-have, confirm **present + build-grade**. A
  **missing or low-fidelity core asset FAILS the build** — it does not "pass with gaps." Non-core gaps still
  log normally (Lego holds); the bug is proceeding to "done" without the core mark/fonts/imagery.
- **Content audit:** rule-by-rule audit of **all written and visual content** (authored and generated) —
  does each piece obey the GRAMMAR rules and the ESSENCE/voice? Flag violations.
- **Render real samples:** the §4.6 prototype is the evidence; confirm it renders the real assets on-brand.
- **Existing checks retained:** output-agnostic grep (no medium-named section), DTCG validity (alias graph
  resolves), universality stress test (three unnamed artifacts spanning media).
- **Client-confirmation = a human gate, not a self-certification (D-B6).** The builder (Code-side) assembles
  the audit + samples + the open ratification GAPs into the PR and **stops**. Sign-off happens by human
  review of the PR; the builder never auto-confirms and never auto-stamps "Ratified by…" (F-014). If the
  engagement loops client interaction through the Chat-side scoper, confirmation can route there; the
  builder's responsibility ends at producing the auditable evidence + PR + open GAPs.

### §4.8 Client-clean / scrub (F-013·014·015) — BLOCKING

The produced **client** repo must be clean of all build apparatus:

- **Reference-brand bleed (F-013):** strip any method-reference brand's specifics (e.g. a naming rule) that
  leaked into the client canon. The reference brands exist only in this tool's provenance, never in output.
- **Tool self-attribution (F-015):** the client `README.md`/`RESIDENT.md` must **not** credit the build tool
  or the skill. Scrub the docs templates' tool-attribution lines.
- **Scaffolding chatter:** remove `{{PLACEHOLDER}}` leftovers, TODO scaffolding notes, and skeleton chatter
  from client-facing files.
- **Ratification gate (F-014):** never auto-write a "Ratified by…" stamp; ratification is stamped only on
  real owner sign-off (§4.7). Default state is unratified-pending.

## §5 — Laws & boundaries

### §5.1 The scoper/builder frontier (builder side)

| The builder MUST | The builder MUST NOT |
|---|---|
| Extract measured/derived primitive values from the pointed-to sources | Re-elicit or re-infer the WHY (the scoper elicited + ratified it) |
| Take owner-provided values (declared Pantone, `authored-print`) as truth, `source:"authored"` | Re-derive an authored print value from OKLCH |
| Formalize the handoff's client-language gaps into `GAP-NNN` | Invent brand truth to fill a slot, or silently pass a missing core asset |
| Harvest applied design from the live consumers the scoper pointed at | Decide an `UNRESOLVED CONFLICT` itself (that is an open GAP for the owner) |
| Read material only from the in-repo `assets/`/`sources/` | Read from Project knowledge or a tree the manifest didn't place |

### §5.2 Canon = skeleton, prototype + library = deliverable

State as law in `SKILL.md` and `architecture.md`: the four-layer canon is the **source skeleton**; the
**deliverable** is the real, presentable prototype + the `/design-sync`-ready kit projected from it. Rule-
compliance of an asset-less skeleton is **not** done. This inverts v1's implicit "canon = product" stance.

### §5.3 Preserve the do-not-regress invariants

Everything in §1's invariant table is a **regression check** for the rewrite. The reframe adds the asset/
prototype/fidelity layer **on top**; it must not weaken output-agnosticism, the generative model, dual
legibility, the DTCG/OKLCH spine, the Lego property, the universality test, brand-scrub, or rule-ID citation.

### §5.4 Distribution / install / deps (WS4 / F-001·011)

Repo-meta, not just `SKILL.md`:

- **Scoper availability (F-001):** installing the Code plugin does **not** make the Chat-side scoper
  available in claude.ai. Document this in the marketplace `README.md` and **publish a zip ready for
  claude.ai upload** of the scoper skill.
- **Builder install path (F-011):** validate the Code install path (the v1 run executed the method by hand —
  an eval-validity caveat). Declare the **portable PDF-render dependency** (PyMuPDF primary, poppler
  fallback) in the skill and the install docs.
- **Manifests:** keep `.claude-plugin/marketplace.json` + `plugin.json` consistent with any new references/
  templates added.

## §6 — Acceptance map + staged PR plan

**Finding → file change:**

| Finding | Where it lands |
|---|---|
| F-024 (mode) | `SKILL.md` Step 0/2 → ANALYZE/CREATE; rename `brownfield.md`→`analyze.md`, `greenfield.md`→`create.md`; `architecture.md` skeleton-vs-deliverable note |
| F-003/006/007/008 (handoff bridge) | `SKILL.md` Stage 0 handoff parse; `assets/`+`sources/` read convention (D2) |
| F-018 (PDF extraction) | new `references/asset-extraction.md`; `SKILL.md` Stage 3; dependency declaration |
| F-019 (fonts) | new `references/font-acquisition.md`; `SKILL.md` Stage 4 |
| F-021 (applied design) | `analyze.md` applied-design harvest; `SKILL.md` Stage 5 |
| F-025/026 (prototype + library) | new `references/prototype-and-design-sync.md`; `claude-design-adapter.md` optional→default; new prototype + kit templates under `assets/templates/`; `SKILL.md` Stage 8 |
| F-016/022 (validate/audit + fidelity) | new `references/validate-audit.md`; `SKILL.md` Stage 10; consume `CORE-ASSET FIDELITY CONTRACT` |
| F-013/014/015 (client-clean) | new `references/client-clean.md`; scrub `assets/templates/docs/*`; `SKILL.md` Stage 11 |
| F-001/011 (distribution) | marketplace `README.md`, `plugin.json`, dependency docs, scoper zip |
| do-not-regress set | regression checks across all of the above |

**Staged PRs (dependency order):**

| PR | Scope | Model |
|---|---|---|
| PR-B1 | Mode + handoff reconciliation: `SKILL.md` Step 0/2, rename analyze/create, D2 convention, architecture note | Opus (method) |
| PR-B2 | Asset extraction (F-018) + font acquisition (F-019): references + SKILL stages + dependency | Opus + scaffolding |
| PR-B3 | Applied-design harvest (F-021) + prototype + `/design-sync`-ready kit (F-025/026): references + templates + adapter default | Opus + scaffolding |
| PR-B4 | Validate/audit (F-016) + fidelity gates (F-022): reference + SKILL stage + contract consumption | Opus (method) |
| PR-B5 | Client-clean/scrub (F-013/014/015): reference + docs-template scrub + ratification gate | Opus (method) |
| PR-B6 | Distribution/install/deps (F-001/011): marketplace README, manifests, scoper zip, dependency docs | cheap/fast tier |

Each PR independently reviewable and mergeable; PR-B1 is the spine everything else builds on.

## §7 — Decisions (resolved)

Resolved with operator judgment per the delegation; rationale one line each.

- **D-B1 — where the component library is compiled:** *Refined hybrid.* Builder emits a self-contained HTML
  prototype (F-025, deterministic) **and** the kit source + default adapter + one-command build manifest
  (F-026); the dist compile is a documented single command in the consumer Node env, best-effort by the
  builder, never a hard-fail dependency. *Grounded:* `web-stack-skills` builds sites, not libraries, so
  delegation isn't available and the builder must not become a build toolchain.
- **D-B2 — how much prototype:** the self-contained presentable prototype only (real assets on real
  surfaces); not the owner's production app. The shippable library is the kit source + the one-command build.
- **D-B3 — font legal boundary:** acquire only open/libre (self-host + license file) or handoff-provided
  licensed commercial files; unlicensed commercial = MUST-HAVE fidelity GAP, never pirated.
- **D-B4 — PDF toolchain:** PyMuPDF primary, poppler fallback; SVG direct, AI/EPS convert-or-GAP, raster-only
  core = fidelity GAP; live sites/social are harvested (observed), not asset-extracted.
- **D-B5 — reference files:** rename `brownfield.md`→`analyze.md`, `greenfield.md`→`create.md`; asset/font/
  prototype steps live mode-independently in `SKILL.md` + own references.
- **D-B6 — client-confirmation:** Code-side produces the auditable evidence + PR + open ratification GAPs and
  stops; sign-off is a human PR gate; no auto-stamp.
- **D-B7 — staging:** six PRs in dependency order (§6); PR-B1 first.

**Residual open items (for the Code execution / future):** a companion skill to compile a component-library
package from a canon kit (the ecosystem gap behind D-B1); whether the prototype's surface set should be
parameterized per brand (default: the fixed five above).

## §8 — Provenance

Grounded in: the v1 real-run findings (`dev/v2-backlog.md` F-001…F-026) and `RESIDENT.md › ## v2`
(reframe, workstreams, Dead-ends, decisions); the merged scoper handoff contract
(`skills/brand-canon-scoper/references/handoff-format.md`) and intake spec (`dev/v2-intake-spec.md`); the
builder's current `SKILL.md` + references (architecture, token-spine, gap-protocol, coverage-checklist,
brownfield, greenfield, claude-design-adapter); the same research round behind the intake spec (Brand Key/
Keller/Aaker/Neumeier/Wheeler; W3C/DTCG 2025.10 + OKLCH; Lahdelma/Rythm LLM-consumable design systems); and
a direct read of `ccediland/web-stack-skills` confirming it builds sites, not `/design-sync` component
libraries (the D-B1 grounding).
