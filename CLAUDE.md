# brand-system-skills — CLAUDE.md (agent ops & guardrails)

> A Claude Code plugin marketplace whose skills build a generic, brand-agnostic, output-agnostic **brand
> canon** (four layers + DTCG/OKLCH token spine) for any brand. This repo is the SKILL/tooling — not a
> brand canon itself. Read `RESIDENT.md` first, then this file.

## Repo map
- `.claude-plugin/marketplace.json` · `plugin.json` — marketplace + plugin manifests (mirror `web-stack-skills`).
- `skills/brand-canon-builder/` — Code-side builder: `SKILL.md`, `references/` (the method knowledge),
  `assets/templates/` (the canon skeletons + DTCG token spine + satellites + docs + prototype + design-sync
  kit + Claude Design adapter + `tools/` — emitted gates `audit-lint.mjs` · `source-recover.py`, with
  `tools/fixtures/` the gate's own clean + seeded-violation acceptance proof, not emitted to clients).
- `skills/brand-canon-scoper/` — Chat-side scoper: `SKILL.md` + `references/` (`handoff-format.md`,
  `elicitation-bank.md`, `detection-batteries.md` — the interview bank + detection batteries externalized at SH-1).
- `README.md` (human front door) · `RESIDENT.md` (living architecture, decisions, Open Items — the single durable record).
- The v3 root docs (`v3-execution-plan.md`, `v3-research-foundation.md`, `v3-system-audit—2026-06-23.md`) were
  removed in the v4 consolidation, and the v4 roadmap (`v4-roadmap.md`) was retired at the v4 ship; their record
  lives in the closed-PR + git history + `RESIDENT.md` (`## v3` / `## v4`).

## How the skills work (one line each)
- **brand-canon-builder** — scaffold the canon → fill what the brand's material/brief supports → log the
  rest as tracked `GAP-NNN` → emit the DTCG/OKLCH token spine → render the Stage-8 prototype as the **complete
  interactive brandbook** (manifest sections + "Decisions for you" panel, RV-5) → attach the Claude Design
  adapter (per the handoff's explicit kit slot — NO emits nothing, machine-reconciled) → validate.
- **brand-canon-scoper** — in chat (no filesystem), interview + emit the **client-surface flow** (one
  instrument, three checkpoints: gate 3.5 intake → gate 6 review → gate 7a Final Brand Brief, the BLOCKING
  client approval) → compile one ready-to-paste 7b handoff block for the builder, only after sign-off.

## Tooling — emitted gates (run from the EMITTED client repo root)
The builder copies `assets/templates/tools/` into every emitted repo as `tools/` (Stage 1; never `tools/fixtures/`):
- **`node tools/run-gates.mjs`** — the Stage-10 **suite runner & status board**: runs every executable gate
  (real exit codes), verifies the committed evidence of every demoted agent-gate (`audit/agent-gates.md`),
  machine-checks keystone structure/form + the committed red-team battery, and writes `audit/gates/report.md`
  — the only legitimate "gates green" claim. Statuses: PASS/FAIL · **NOT-RUN(reason)** (first-class: deps
  missing records the tool's own exit-3 install line — never substituted by a manual "clean") ·
  N/A(declared); rows with Class `agent-gate` PASS/FAIL by committed evidence. Exit 0 ALL-GREEN ·
  2 INCOMPLETE (honest v0/DEMO state) · 1 BLOCKED.
  Self-test from THIS repo: `node …/tools/run-gates.mjs …/tools/fixtures/clean` (exit 2 — INCOMPLETE, zero
  FAIL: the un-built kit records NOT-RUN `[NO_DIST]`) and `…/fixtures/gates/board-violations` (exit 1 —
  keystone structural+form FAIL + agent-gates FAIL + §7a pass:false FAIL). Fresh-clone acceptance: copy
  `run-gates.mjs` + `audit-lint.mjs` + `client-deny-lint.mjs` to a
  deps-less dir and re-run — the deny row records NOT-RUN(deps) with the npm install line, never "clean".
- **`node tools/audit-lint.mjs`** — the BLOCKING Stage-10 **provenance, completeness & reconciliation gate**
  (MT-1/3/4/5 + SC-1 + RV-5; rules R0–R8). Exits 1 on any violation, writing `audit/lint/report.md`. Reads `tokens/*.json`,
  `canon/*.md` + `canon/canon.json`, `RESIDENT.md`, `CHECKSUMS.txt`, and (for R6) `satellites/projections.md`,
  `canon/mark.svg`, and the generated `.html`/`.css` artifacts. Zero-dep Node. Self-test from THIS repo:
  `node skills/brand-canon-builder/assets/templates/tools/audit-lint.mjs skills/brand-canon-builder/assets/templates/tools/fixtures/clean`
  (exit 0) and `…/fixtures/seeded-violation` (exit 1).
  - **R0–R5 (MT-3/4/5)** — provenance & completeness (each value token's provenance block on closed enums;
    corroborated ⇒ the VALUE found in ≥2 distinct non-relay sources (R1 searches the hashed files —
    normalized hex/oklch/string; `origin:"relay"` refs = custody, never counted; binary sources count
    declaratively); inferred/matched/proposed ⇒ hypothesis; any confidence above hypothesis ⇒ ≥1
    path-bound sha256 sourceRef (R3 — for handoff-confirmed/proxy-relayed it must be the persisted handoff;
    R3 also checks CITATION integrity: a cited selector exists in the hashed file or is "none", a line never
    points past EOF, a PDF cites page never line);
    value→token/GAP; one GAP back-ref). See `references/validate-audit.md` §5a.
  - **R6 (MT-1) — cross-artifact reconciliation / drift.** **R6a** every `derived` projection in
    `satellites/projections.md` consumes only aliases that resolve in the spine, and any pinned value byte-equals
    the spine-resolved value — **both sides routed through one canonical serializer (`serializeValue`, C-1) so a
    structured-OKLCH `$value` reconciles against a pinned `oklch(L C H)` / `oklch(L C H / a)` form; never
    `String(object)`** (drift FAILS); `source: authored` rows are truth and are **skipped** (the authored
    carve-out). **R6b** the protected mark geometry is single-sourced from **`canon/mark.svg`** — each rendered
    instance (prototype `#brand-mark`, kit `Mark.tsx`) must be byte-equal to it; a brand with **no visual mark
    and no rendered instance is N/A → PASS** (medium-agnostic — never a false fail on a sonic/verbal brand).
    **R6c** every local `@import`/`url()`/`href`/`src` in a generated artifact resolves to an existing file.
    `canon/mark.svg` is the ONE renderable mark source; `canon.json`/PRIMITIVES § Mark stay metadata-only. The
    projection registry's `consumes`/`source` columns are the machine linkage R6a reads.
  - **R8 (RV-5, Stage D)** — prototype completeness: every present canon section → a `data-canon-section`
    brandbook surface OR an open GAP. Reads present sections by machine signal (never a fixed checklist —
    flat/monogram/sonic/non-visual pass clean); markers inside HTML comments / inert `<template>` are stripped
    before the scan; no `.html` is a vacuous PASS. See `references/validate-audit.md` §5a.
- **`python tools/source-recover.py <url> [--from --to]`** — MT-3 **archived-source recovery**: Wayback CDX +
  raw `id_` fetch, occupant disambiguation, SHA-256 → `sources/MANIFEST.json`. Identity/date verification is an
  AGENT step (Stage 3), not the script's. Dep: `requests`.
- **`python tools/fidelity-diff.py --treatment <id> --source <src.png> --reproduction <render.png>`** — MT-2 the
  **measured reproduction-fidelity gate** (the §7a verdict; build-time, not a runtime/client dep). Co-registers
  the reproduction onto the **Stage-5 source capture** (ORB+RANSAC) and computes **ΔE2000** + **SSIM/pixelmatch**
  (+ **fontTools** glyph metrics for type). Verdict vs the §2 tiers (ΔE2000 ≤ 2.0 default, ≤ 1.0 core colour;
  loosening RAISES the bound, never waives it) → `within-tolerance` (exit 0) / `outside-tolerance` (exit 1;
  with `--gap` exit 0 as a TRACKED outcome — the record never flips to a pass) / non-visual carrier
  `--medium non-visual` → declared GAP (exit 0, `measured:false`).
  Writes **`audit/fidelity/<treatment-id>/scores.json`** (numeric scores + thresholds + verdict — re-auditable
  WITHOUT cv2; `pass` records the MEASUREMENT alone — `--gap` keeps exit 0 for pipeline continuation but the
  record stays `pass:false` + `gap:GAP-NNN`, and the runner recomputes the verdict from the numbers, so a
  hand-written pass is caught) + a `diff.png` heatmap. The NON-WAIVABLE set is measured mandatorily (runner
  parses the persisted handoff; CREATE mode diffs against the AUTHORED master or records NOT-RUN — never a
  false block). It measures against the SOURCE capture — **not a pixel-VRT** (§3a). Deps
  (numpy, opencv-python-headless, scikit-image, pillow; fontTools for `--font`) are **import-guarded**: missing →
  a clear `pip install …` + exit 3, never a stack trace; the non-visual path needs none of them. Self-test
  fixtures + generator: `tools/fixtures/fidelity/` (`gen.py` → source/within/within_shift/mid/out `.png`).
- **`node tools/scheme-derive.mjs [repo-root]`** — SC-1 the **ALGO-SCHEME-DERIVE materializer** (Stage C-2;
  build-time, zero-dep Node, **NOT Style Dictionary**). Reads `canon/canon.json › schemes` + `tokens/base.json`
  + `tokens/semantic.json` (role→anchor); for each NON-deferred scheme derives the semantic colour roles in
  OKLCH by `{mode, dominant}` (light=identity · dark=invert-L on neutrals + lift non-dominant chromatic ·
  contrast=push neutrals to the L extreme; C/H preserved, hex via in-process OKLCH→sRGB; **post-derive
  legibility guard**: a derived text/fg role keeps ≥0.30 L-separation from the scheme's nearest bg/surface
  role — a collapsed pair is pushed apart, logged, still hypothesis+GAP; fixture:
  `tools/fixtures/scheme-derive/near-black/`) and writes
  `tokens/schemes/<id>.json` — every token a structured-OKLCH object tagged **`$extensions.brand.scheme:"<id>"`**,
  entering at `confidence:"hypothesis"` + the scheme's tracking GAP. A `status:"deferred"` scheme emits no set
  (carries a GAP). **audit-lint R7** (loaded from `tokens/schemes/*.json` too) fails any named scheme without a
  COMPLETE set (role-key parity with the default) or a deferred+GAP; single-scheme/flat brands pass clean.

## Standing guardrails (apply when editing THIS repo's templates/skills)
- **Brand-agnostic + output-agnostic, always.** The templates must contain zero real brand specifics and no
  output/medium-named sections. Before committing changes to the templates/skills, grep the tracked tree for
  any real brand name, ink, or token value that may have crept in — it must be 0 hits (a standing pre-commit
  gate). This covers `.gitignore`, configs, and every dotfile too: a brand-scrub *pattern* must generalize
  (`**/brandbook*.pdf`), never name a brand (the M2 leak hid in `.gitignore`). Example/illustrative token
  values must be obviously generic (never a real brand's exact OKLCH/hex/Pantone).
- **Token contract is load-bearing.** Keep the DTCG token templates (DTCG 2025.10) valid and projecting cleanly
  into downstream consumers: colour `$value` is the **structured-OKLCH object** `{colorSpace, components, alpha,
  hex}` (C-1; `hex` = sRGB fallback, not a second source of truth; other spaces live in `$extensions.brand.spaces`
  flagged `source:"authored"|"derived"`); composite values (shadows) stay plain strings (the SD `-value`/`-unit`
  split bug); `{tier.category.name}`
  aliases; category names on the namespace convention (a single-value category projects a bare `--<prefix>`
  singleton, e.g. one radius → `--radius`; a multi-value one projects `--<prefix>-<name>`). Schemes are
  MATERIALIZED — N named schemes → N complete role-token sets via `tools/scheme-derive.mjs` (zero-dep), enforced
  by `audit-lint` R7; the Resolver Module is deferred (SD-v5 lag, issue #1590 / OI-H). Structured-colour + scheme
  architecture: RESIDENT `## v4`; token shape: `references/token-spine.md`.
- **Generative over catalog.** Never add a per-output section to a template; absorb the need as a rule.
- **Install integrity (Theme 2).** A shipped file must point at zero unshipped paths — never cite `dev/`
  (gitignored) from `skills/`; if a method lives only in `dev/`, harvest it into the shipped reference that owns
  that stage. Client-emitted templates (`canon.json`, the kit, docs templates) must carry no tool-repo URL/org
  (`brand-system-skills`/`ccediland`) — the Stage-11 client-clean grep depends on it. The `.design-sync` config
  is single-sourced in the kit (`design-sync-kit/.design-sync/config.json`); the adapter references it, never a
  duplicate. No gate (validate-audit.md) may name an artifact that isn't shipped or honestly attributed — the kit
  ships a real offline `package-validate.mjs`.
- **Epistemic honesty (Stage E — EH-1/EH-2/EH-3).** Scoper: an **EH self-check (BLOCKING, gate-7a precondition)**
  holds that owner-meaning fields (personality / differential / resonance / intended meaning) and named
  regulatory instruments resolve to `owner-stated`(cited) / owner-declared `none` / GAP — never scoper-derived,
  never memory-asserted, never above `hypothesis` without ratification (EH-1/EH-2); the `regulatory:` carrier is
  owner-stated-cited-or-GAP. Builder: `validate-audit.md §7b` makes the regulated trigger inherit **MUST-HAVE**
  to the enabling regulatory GAP (gated — `regulatory: none` forces nothing; no new `BLOCKING` severity), binds
  the keystone §5 regulated-claim constraints + refusal policy to that cited `regulatory:` carrier (or GAP, never
  memory-recalled), and adds visual-guardrail + over-refusal axes to the red-team battery (EH-3). **R9 — the
  EXECUTABLE posture→GAP-severity gate (a `posture` block in `canon.json` + Severity-column parsing in
  `audit-lint`) is DEFERRED to Phase-5 with the live red-team RUN;** EH-3 ships as prose, so `audit-lint` stays
  R0–R8.
- **Structural hygiene (Stage G — SH-1/SH-2/SH-3).** SH-1: the scoper interview bank + detection batteries
  live in `references/` (keeps `SKILL.md` < 500). SH-2: a **live-but-raster CONSUMER surface** (image feed /
  gallery — reachable by `url:` but not computed-style-readable) declares `ingest:ocr-visual`; the CONSUMERS
  `ingest:` is the **same open class** as the ASSETS track (not css-only), and the builder routes by the
  declared `ingest:` — kept in lockstep across `handoff-format.md` (schema), `builder/SKILL.md` (routing) and
  `asset-acquisition.md` (the ingest-token map). SH-3: the scoper does **not** trigger for brand-voice-only
  guideline generation (discriminator = whole-task-vs-part-of-canon, never brand age) — and never suppresses
  full-canon scoping that includes voice.
- **Process discipline (Stage F — TA-1…4).** Multi-session tempo (progress is evidence-of-process, never
  wall-clock); the client register is firewalled from operator terseness/speed/assumption preferences (the §6
  self-check scans register leakage; operator directness governs the internal surface only); proceed-assumptions
  surface as explicit CONFIRM lines; a blocked/failed retrieval is never a positive status. Doctrine in
  `scoper/references/process-discipline.md`.
- **Mirror web-stack-skills' marketplace conventions** so the two interoperate (same manifest/skill layout).
- **Handoff = single sufficient interface.** Keep the Chat→Code seam closed both ways: every carrier the handoff
  emits has a NAMED builder consumer (parsed in Stage 0); the builder never reads an uncarried field. Two-track
  manifest — ASSETS (in-repo, `sha256`) / CONSUMERS (live `url:`, reachability-checked, not checksummed): a
  DEAD/auth-walled pointer is forbidden, a live surface is not. DIMENSION-MAP present-but-unresolved → builder
  HALTs. Carrier enums stay capability classes (font `license:` = a declared SPDX id, not a closed floor;
  freshness = `shipped | stated-old`); the kit shape is a carried datum (`existing-component-stack:`) read at
  Stage 8, never re-hunted; keystone voice/value derive from the WHY exemplars, GAP where absent — never fabricate.
- **Medium scoping (carrier-resolved).** Every layer that gates or renders identity acts on the brand's
  PRIMARY-IDENTITY CARRIER(S) resolved from the DIMENSION MAP — an OPEN class (visual mark \| sonic-mark \|
  motion-signature \| other), never a hardcoded `mark`. The build is visual-build-grade; a carrier whose medium
  has no build-grade producer (sonic/motion) → a DECLARED fidelity-blocking GAP (OI-J), never a false-fail nor a
  silent pass. §7b keystone OPERABILITY (medium-agnostic) stays distinct from build-grade FIDELITY (§1/§2,
  visual). Posture `profile:` is open-class with an `<other-detected>` escape — no closed enum-as-floor.
- **Stated-spec-read.** Read the brand's declared truth (named font, declared hex/Pantone) via OCR/visual;
  `pdffonts`/embedded-font tables corroborate only — outlined type makes them report the studio's layout font or
  nothing.
- **Provenance spine (4 fields per datum).** Every datum + every emitted token carries
  `$extensions.brand.provenance` {source, confidence, owner, freshness}. `authored|derived` is the SOURCE axis
  ONLY, ORTHOGONAL to the confidence ladder — six values in three tiers, byte-identical at every hop, no extra
  value/synonym: `hypothesis` → `corroborated` · `verified-primary` (evidence-earned) → `proxy-relayed` ·
  `handoff-confirmed` · `owner-confirmed` (ratified; who/how). An `authored` value can still be `hypothesis`.
  `source: proposed` = the quarantine channel (pipeline-authored proposal: capped at `hypothesis` + open GAP,
  never canonized without ratification). Observed expression enters as `hypothesis`; a one-off → brand line
  needs tier-2 ratification; ratification carried by the handoff lands as `handoff-confirmed`/`proxy-relayed` —
  the builder never stamps `owner-confirmed` on handoff text alone (the handoff itself is persisted to
  `sources/handoff—<date>.md` + hashed, the top of the chain of custody); a datum is never used above the
  status it earned; the keystone READS its confidence FROM the token, never recalls it. Full definition:
  `builder/references/gap-protocol.md` § The provenance spine.
- **Adaptive dimension map.** Every brand dimension resolves explicitly to `filled` / `not-used(owner-declared)`
  / `tagged-gap` — none skipped silently; an unresolved dimension STOPS the builder. The dimension catalogue is
  an illustrative instance of the mechanism, never a closed universe (anti-determinism).
- **Faithful capture.** Clean vectors via PyMuPDF `page.get_drawings()` or copy-region-to-new-doc (a full-page
  Inkscape open yields a bloated, non-isolated SVG); image font-matching for unnamed faces; a fidelity rating +
  provenance per artifact.
- **Reproduction router (treatment→method).** Procedural SVG filters (`feTurbulence` texture · `feDisplacementMap`
  organic/glitch · `feDiffuse`+`feSpecularLighting` 3D/gloss/emboss · `feGaussianBlur` glass · `feColorMatrix` grading)
  / generative lib (rough.js) / vector-trace / raster-required; validate by visual diff. `feTurbulence` is
  CPU-heavy → constrain or rasterize; photography + bespoke illustration are raster-required.
- **Keystone `.md` (mandatory output, Stage 8.5).** A single attachable think/speak/design + guardrail file
  (6-section schema in `references/keystone-emit.md`), kept within a Claude Project's resident context (RAG
  trip-point unpublished → size is a parameter, calibrated in Phase 5; data first, instructions last for recall).
- **Fidelity + keystone gate (Stage 10, `references/validate-audit.md` §7).** Reproduction fidelity is MEASURED
  against the source capture (`tools/fidelity-diff.py`, ΔE2000/SSIM — NOT a pixel-VRT, no eyeball verdict);
  persisted evidence to `audit/fidelity/<treatment-id>/`, absence = FAIL. Keystone gate: present · 6-section ·
  guardrail-in-tail · within budget, PLUS a §7b FORM-OF-RULE content check (THINK + DESIGN-as each ≥1
  when-X-then-Z rule, SPEAK ≥1 on/off-brand pair, no bare-adjective core). Guardrail red-team battery +
  expected-refusal contract COMMITTED to `audit/redteam/` even when non-blocking (empty = FAIL), posture-gated
  (regulated → BLOCK + human sign-off; the live run is Phase-5, deferral does not void the committed artifacts).
- **Decorative contrast (SPEC — no executable gate).** A graphic-code device's contrast lives in PRIMITIVES ›
  Pattern as a brand-fixed opacity/contrast band (PRIMARY), escalating to WCAG 3:1 (SC 1.4.11) when it carries
  meaning/state; resolved by GRAMMAR `ALGO-CONTRAST-ROLE`'s graphic-code row + `G-PATTERN-01`. APCA Lc 15 is an internal reference
  only; WCAG 2.x AA is the legal bar — no APCA substitution.

## Provenance / build memory
Derived in a bounded Phase-4 job (method abstracted from one mature canon, coverage validated against a second),
then rebuilt v2 → v3 → v4; full lineage in `RESIDENT.md`. The work-log + v2 specs + the `F-001…F-026` backlog
live in the **gitignored `dev/`** directory — local provenance, not shipped.

## Flujo (Carlos)
Work on a `claude/<name>` branch, never main; PR + wait for OK before merge. Respond to Carlos in es-MX
(technical terms + code in English). Secrets in Infisical, never in git/Drive.

**Workflow hub (v3).** Chat is the hub; design decisions happen in Chat. Hand big or filesystem/git/build tasks
to Claude Code (it returns results to Chat) — including non-repo tasks better suited to Code. From Chat, use
Composio GitHub **con calma**: reads + light edits only; route big repo work to Code. Editing canonical `.md`
(RESIDENT/CLAUDE) via Composio carries clobber risk → read-then-merge, or route to Code. Update RESIDENT + CLAUDE
at the end of each chat — especially on a context/compute hand-off, which Carlos decides (Claude may only suggest
a fresh chat when context is legitimately heavy).
