# VALIDATE / AUDIT + fidelity gate (Stage 10) — F-016 · F-022

Read when running Stage 10, the build's BLOCKING final quality stage. v1 ended at "canon built" and
rewarded rule-compliance over fidelity — it passed an asset-less skeleton. v2 judges the build on fidelity
(is the real mark / fonts / imagery present and on-brand?), consuming the scoper's `CORE-ASSET FIDELITY
CONTRACT`. The law: canon = skeleton; the real prototype + `/design-sync`-ready kit = deliverable — rule
compliance of an asset-less skeleton is not done.

## 1. The fidelity gate — consume the CORE-ASSET FIDELITY CONTRACT

Stage 0 already parsed the handoff's `CORE-ASSET FIDELITY CONTRACT`: the per-brand core slots, each
marked present-build-grade vs GAP (low-fi / missing). At Stage 10, walk it:

- **A core slot that is missing or low-fidelity is fidelity-blocking → the build FAILS.** Not "pass with
  gaps." Reaching "done" without the core assets is the bug, not the gap-logging.
- **Non-core gaps still log** as `GAP-NNN` and the repo stays valid (the Lego property holds) — only the
  *core* set blocks "done".
- "build-grade" = vector master + commercial-licensed font files + color profiles (incl. authored spot where
  declared) + clear-space/min-size + misuse list (per `asset-acquisition.md` / `font-acquisition.md`).

This closes the loop opened by F-020 (the scoper's asset-inventory request) → F-022 (the builder judges it).

## 2. Layered-threshold fidelity policy

Fidelity tolerance is layered by what the element is — independent of the mechanism in §3:

- **Zero tolerance** on brand-defining elements: the mark and the primary color tokens. Any
  divergence here fails.
- **Higher tolerance** on gradients, illustration, and incidental imagery (perceptual difference is expected;
  judge against intent, not pixels).
- **Baselines** are per-component-variant and per-brand (the clone-per-brand model: each brand carries
  its own baselines, never shared across brands).

## 3. The mechanism is shape-dependent (the reconciliation)

The kit shape (set in `.design-sync/config.json` `shape`, per `design-sync-kit.md`) decides *how* fidelity is
evidenced. Do not mandate Storybook by default.

### 3a. package-shape (the DEFAULT — no Storybook, no pixel-diff VRT required)

Fidelity evidence is the convergence of four sources — all already produced by Stages 8–9:

1. **Render real samples** — the deterministic HTML prototype (`assets/templates/prototype/`, F-025 / §4.6a)
   is the evidence. Open it and confirm the real mark, real fonts, and real imagery render on the real
   surfaces (hero / card / control set / type spread / color blocks).
2. **The kit's own `/design-sync` gates** (the kit ships them; live-pinned names, Claude Code v2.1.185):
   - **`[FONT_MISSING]`** — must-resolve: the one defect the render check can't self-detect (every design
     would silently render in a fallback face). A missing core face is a fidelity-blocking GAP, never a
     silent fallback.
   - **the hollow-render gate** — `[RENDER]` (root empty), `[RENDER_BLANK]` (renders but the PNG is
     effectively blank), `[RENDER_THIN]` (mounted text is just the name / variants render identically): hollow
     previews are fixed within the validate iterations. (If a render-code variant isn't confirmed in the live
     skill at run time, use the generic confirmed code `[RENDER]` rather than invent one.)
   - **`package-validate.mjs` exits 0.**
   - the absolute Styled / Complete / Plausible grade per in-scope component.
3. **The content audit** (§4).
4. **The CORE-ASSET FIDELITY CONTRACT pass/fail** (§1).

No pixel-diff VRT is required in package-shape — there is no reference render to diff against; the absolute
grade + the HTML-prototype samples + the contract are the gate.

### 3b. Storybook-shape (ONLY if the brand already ships Storybook + Playwright)

Per `design-sync-kit.md` / §4.6, escalate to Storybook-shape only when the brand already ships Storybook +
Playwright — which adds a pixel-match VRT oracle on top of 3a:

- Visual-regression via Storybook + Chromatic (default; free 5k snapshots/mo), or Percy / BackstopJS
  (free OSS) as alternatives.
- Apply the §2 layered thresholds (zero tolerance on mark + primary color tokens; higher on
  gradients/illustration) with per-component-variant + per-brand baselines.

Storybook-shape is the exception, not the default; never introduce a Storybook+Playwright dependency just to
get the oracle.

## 4. Content audit

A rule-by-rule audit of all written and visual content — authored AND generated — against:

- the GRAMMAR rules (`G-*` / `ALGO-*`) — every rule cited by ID; a piece of content that violates a rule
  is a finding;
- **ESSENCE / voice** — the anti-promise (forbidden claims), the lexicon (required + banned terms), and the
  voice don'ts.

Findings are fixed (regenerate / re-author) or logged as `GAP-NNN`; a content piece that contradicts the
ratified WHY is never silently kept.

## 5. Retained existing checks (keep as-is — do-not-regress)

- **Output-agnostic grep** — no layer/file/section named for an output.
- **DTCG validity** — the token files parse and the alias graph resolves (every `{…}` points to a real leaf).
- **Universality stress test** — three arbitrary artifacts the canon names nowhere (span media); each must
  resolve through the derivation method without being enumerated. (`gap-protocol.md`.)

## 6. Client-confirmation is a HUMAN gate (D-B6 · F-014)

Confirmation is never self-certification:

- The kit's `.review.html` (iframes every preview card, served locally) is the built-in human-review
  surface — hand it to the owner.
- The builder assembles the audit + the rendered samples + the open ratification GAPs into the PR and
  stops. Sign-off is human PR review.
- **Never auto-confirm; never auto-stamp "Ratified by…"** The default state is unratified-pending.

(The client-clean / scrub apparatus that strips build bleed — F-013/014/015 — is Stage 11 / PR-B5; this
stage only references the human-gate principle and assembles the evidence. The scrub itself is not implemented
here.)

## Gate summary

The build is done only when: every core asset is present + build-grade (§1); `[FONT_MISSING]` is
resolved for core faces; the hollow-render gate is clean and `package-validate.mjs` exits 0 (package-shape) or
the pixel-match VRT passes the layered thresholds (Storybook-shape); the content audit has no open
rule/voice violations; the three retained checks pass; and the evidence + open ratification GAPs are assembled
into the PR for human sign-off. Anything core unmet → the build fails; non-core gaps log and the repo
stays valid.
