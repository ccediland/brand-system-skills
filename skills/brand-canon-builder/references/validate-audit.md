# VALIDATE / AUDIT + fidelity gate (Stage 10)

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

This closes the loop: the scoper requests the asset inventory in the handoff, and the builder judges it here.

## 2. Layered-threshold fidelity policy

Fidelity tolerance is layered by what the element is — independent of the mechanism in §3:

- **Zero tolerance** on brand-defining elements: the brand's **primary-identity carrier(s)** — resolved from
  the DIMENSION MAP (e.g. visual mark | sonic-mark | motion-signature | other declared lead atom), NOT a
  hardcoded visual mark — and the primary color tokens, plus any **graphic-code** the handoff's CORE-ASSET
  FIDELITY CONTRACT lists on the `NON-WAIVABLE` line. Any divergence on a zero-tolerance element fails (the
  NON-WAIVABLE set holds even under `BUILD-MODE: v0/DEMO`). Where the build has no build-grade producer for the
  resolved carrier's medium (the current build is **visual-build-grade**), that carrier is a **declared
  fidelity-blocking GAP per its role** — never a false zero-tolerance fail on a visual mark the brand does not
  lead with, never a silent pass; the medium becomes a tracked horizon (§7b).
- **Higher tolerance** on gradients, illustration, and incidental imagery (perceptual difference is expected;
  judge against intent, not pixels).
- **Measured thresholds (MT-2).** These tiers are enforced as the NUMERIC bounds `tools/fidelity-diff.py` (§7a)
  checks against the Stage-5 source capture: **ΔE2000 ≤ 1.0** on the zero-tolerance set (the resolved
  primary-identity carrier + the primary colour tokens + any NON-WAIVABLE graphic-code), **≤ 2.0** default,
  raised on incidental imagery; plus an **SSIM / pixelmatch** structure bound per tier. Loosening a tier RAISES
  the bound — it NEVER removes the metric (a looser tier still measures; it does not waive measurement). A
  non-visual carrier has no pixels to measure and resolves to a declared GAP (§7a, medium-agnostic), never a
  false zero-tolerance fail.
- **Baselines** are per-component-variant and per-brand (the clone-per-brand model: each brand carries
  its own baselines, never shared across brands).
- **Named tolerance (auditable).** The zero-tolerance assignment — which elements §2 holds at zero tolerance
  for THIS brand (the resolved primary-identity carrier + the named primary color tokens + any NON-WAIVABLE
  graphic-code) — is NAMED in the committed Stage-10 audit artifact (alongside the §7a/§7b evidence), so the
  tolerance tiering is auditable, not silently re-decided each run.

## 3. The mechanism is shape-dependent (the reconciliation)

The kit shape (set in `.design-sync/config.json` `shape`, per `design-sync-kit.md`) decides *how* fidelity is
evidenced. Do not mandate Storybook by default.

### 3a. package-shape (the DEFAULT — no Storybook, no pixel-diff VRT required)

Fidelity evidence is the convergence of four sources — all already produced by Stages 8–9:

1. **Render real samples** — the deterministic HTML prototype (`assets/templates/prototype/`) is the
   evidence. Its **surface-set derives from the brand's primary medium**: a visual-primary brand confirms the
   real carrier, fonts, and imagery on the visual surfaces (hero / card / control set / type spread / color
   blocks). The current build is **visual-build-grade**: where the brand's primary medium is non-visual (sonic
   / motion), the prototype renders a visual *context* fallback and **declares the primary-medium sample a
   GAP** ("primary-medium render not yet a build-grade target — tracked horizon"); the §1/§2 fidelity gate
   accepts that declared GAP (fidelity-blocking per the carrier's role) rather than demanding a render the
   build cannot produce — no faked render, no silent pass.
2. **The `/design-sync` converter gates.** The CONCEPTUAL invariant is what binds — *a missing core face must
   hard-fail; a hollow/blank render must fail; the validator must exit clean* — whatever the live skill names
   the codes. The v2.1.185 names below are the CURRENT illustrative binding, not the method; re-pin them per
   the server-side/version-fluid caveat (`design-sync-kit.md` § Step 0). (The live tool stages these
   server-side into `.ds-sync/` and runs them on the uploaded bundle — converter/server-side, NOT kit-shipped;
   live-pinned names, Claude Code v2.1.185):
   - **`[FONT_MISSING]`** — must-resolve: the one defect the render check can't self-detect (every design
     would silently render in a fallback face). A missing core face is a fidelity-blocking GAP, never a
     silent fallback.
   - **the hollow-render gate** — `[RENDER]` (root empty), `[RENDER_BLANK]` (renders but the PNG is
     effectively blank), `[RENDER_THIN]` (mounted text is just the name / variants render identically): hollow
     previews are fixed within the validate iterations. (If a render-code variant isn't confirmed in the live
     skill at run time, use the generic confirmed code `[RENDER]` rather than invent one.)
   - the converter's **`package-validate.mjs` exits 0** (the server-side validate of the uploaded bundle).
   - the absolute Styled / Complete / Plausible grade per in-scope component.

   Plus the kit's **own offline pre-flight gate** — `npm run validate` (`package-validate.mjs`, shipped in
   `assets/templates/design-sync-kit/`): dist + `.d.ts` present, ≥1 component exported, every referenced
   font-family has a shipped `@font-face` (a local `[FONT_MISSING]`), and `styles.css` carries a non-hollow
   token closure → exit 0/1. This one is kit-shipped and runs with no `/design-sync` round-trip, so Stage 10
   can run it offline before any upload.
3. **The content audit** (§4).
4. **The CORE-ASSET FIDELITY CONTRACT pass/fail** (§1).

No pixel-diff VRT is required in package-shape — there is no reference render to diff against; the absolute
grade + the HTML-prototype samples + the contract are the gate.

(For brands carrying a reproduced TREATMENT, §7a adds a perceptual visual-diff against the source — a manual overlay, still no pixel-VRT and no Storybook dependency.)

### 3b. Storybook-shape (ONLY if the brand already ships Storybook + Playwright)

Per `design-sync-kit.md` / §4.6, escalate to Storybook-shape only when the brand already ships Storybook +
Playwright — which adds a pixel-match VRT oracle on top of 3a:

- Visual-regression via Storybook + Chromatic (default; free 5k snapshots/mo), or Percy / BackstopJS
  (free OSS) as alternatives.
- Apply the §2 layered thresholds (zero tolerance on the §2 primary-identity carrier + primary color tokens;
  higher on gradients/illustration) with per-component-variant + per-brand baselines.

Storybook-shape is the exception, not the default; never introduce a Storybook+Playwright dependency just to
get the oracle.

## 4. Content audit

A rule-by-rule audit of all written and visual content — authored AND generated — against:

- the GRAMMAR rules (`G-*` / `ALGO-*`) — every rule cited by ID; a piece of content that violates a rule
  is a finding;
- **ESSENCE / voice** — the anti-promise (forbidden claims), the lexicon (required + banned terms), and the
  voice don'ts.
- **font provenance** — every canonized font's `PROVENANCE.source ∈ {declared-spec | owner-stated | matched}`,
  never a raw `extract-vector` / `pdffonts`-table read promoted to canon. An outlined-font or agency-embedded
  layout-font regression (the studio's font reported in place of the brand's) surfaces here as a finding,
  mirroring the stated-spec-read rule.

Findings are fixed (regenerate / re-author) or logged as `GAP-NNN`; a content piece that contradicts the
ratified WHY is never silently kept.

## 5. Retained existing checks (keep as-is — do-not-regress)

- **Output-agnostic grep** — no layer/file/section named for an output.
- **DTCG validity** — the token files parse and the alias graph resolves (every `{…}` points to a real leaf).
- **Universality stress test** — three arbitrary artifacts the canon names nowhere (span media); each must
  resolve through the derivation method without being enumerated. (`gap-protocol.md`.)

## 5a. Provenance, completeness, reconciliation & scheme lint — the executable gate (MT-1/3/4/5 + SC-1, BLOCKING)

The provenance/completeness rules above are not prose-trust — they are an executable gate. Run, from the
emitted-repo root:

```
node tools/audit-lint.mjs        # exit 0 required; exit 1 fails the build
```

`audit-lint.mjs` (`assets/templates/tools/`) reads `tokens/*.json`, `canon/*.md` + `canon/canon.json`,
`RESIDENT.md` (the Open Items/Gaps table) and `CHECKSUMS.txt`, writes `audit/lint/report.md`, and enforces:

- **R0 (MT-3/4)** — every VALUE token (non-alias) carries `$extensions.brand.provenance` with `source` on the
  closed source enum and `confidence` ∈ `{hypothesis, corroborated, owner-confirmed}`. (Closes the "omit or
  typo the provenance block and evade every conditional rule below" bypass; aliases inherit and are exempt.)
- **R1 (MT-4)** — `confidence: corroborated` ⇒ ≥2 `sourceRef` entries with DISTINCT `file`.
- **R2 (MT-4)** — `source ∈ {inferred, matched}` ⇒ `confidence` is `hypothesis`.
- **R3 (MT-3)** — `source: computed-css` OR `confidence ∈ {corroborated, owner-confirmed}` ⇒ a `sourceRef`
  whose `sha256` is in `CHECKSUMS.txt` **bound to that exact `file` path** (a borrowed/ghost-file hash fails).
- **R4 (MT-5)** — every value/scheme named in a canon layer or ALGO maps to a token artifact OR an open `GAP-NNN`.
- **R5 (MT-5)** — every `hypothesis`/`inferred`/`matched`/`traced` token carries EXACTLY ONE open `GAP-NNN` in
  its own `$extensions.brand.gap` back-reference.
- **R6 (MT-1)** — cross-artifact RECONCILIATION (the drift gate; additionally reads `satellites/projections.md`,
  `canon/mark.svg`, and the generated `.html`/`.css` artifacts): **R6a** every `derived` projection's consumed
  `{tier.category.name}` alias resolves in the spine, and any pinned value byte-equals the spine-resolved value
  — a stale pin or a renamed/removed alias is DRIFT (`source: authored` rows are truth and are skipped); **R6b**
  the protected mark geometry is single-sourced — each rendered instance (the prototype's `#brand-mark`, the
  kit's `Mark.tsx`) is byte-equal (whitespace/JSX-normalized) to `canon/mark.svg`, the one renderable source
  (`canon.json`/PRIMITIVES § Mark stay metadata-only); **R6c** every LOCAL `@import`/`url()`/`href`/`src` in a
  generated artifact resolves to an existing file (no dangling import/asset).
- **R7 (SC-1)** — every scheme named in `canon.json › schemes` maps to a COMPLETE materialized role-token set
  OR a `status:"deferred"` + exactly one open `GAP-NNN`. A complete set = scheme-tagged tokens (under
  `scheme.<id>.*`, `$extensions.brand.scheme:"<id>"`, materialized by `tools/scheme-derive.mjs` as structured
  OKLCH) covering the SAME role-keys as the DEFAULT scheme's set; a partial/absent set with no deferred+GAP
  FAILS, naming the missing role-keys. The deferred escape is a tracked GAP (R0/R5 still apply to whatever
  tokens exist), never a bypass. A single-scheme (flat) brand materializes its one default set; a repo with no
  `schemes` block is a vacuous PASS. `audit-lint.mjs` also loads the per-scheme `tokens/schemes/*.json` sets.

**Prerequisite — `CHECKSUMS.txt` covers `sources/**`.** R3 is only meaningful if every source-of-record is
hashed: the build SHA-256-hashes every file under `sources/**` (incl. recovered `sources/wayback/**`) into
`CHECKSUMS.txt` (`asset-acquisition.md` § CHECKSUMS). A `corroborated`/`computed-css` token whose source is
absent from `CHECKSUMS.txt` fails R3. The lint is medium-agnostic and value-blind — a monogram-only /
single-ink / sonic-primary brand whose dimensions are `not-used(owner-declared)` passes clean (it names no
value the lint can fail on); it never asserts a specific value exists. **R6 is equally general** (anti-determinism
rector): a brand with no `satellites/projections.md`, or only `authored` rows, passes R6a; a brand with no
visual mark and no rendered mark instance is R6b **N/A → PASS** (never a false zero-mark fail on a sonic /
verbal / motion-primary brand); a self-contained artifact with no local refs passes R6c. R6 asserts only that
whatever DOES exist reconciles with its single source — never that a projection, a mark, or a value exists.

## 6. Client-confirmation is a HUMAN gate

Confirmation is never self-certification:

- The `/design-sync` converter generates a `.review.html` (iframes every preview card) and serves it
  locally via its own `storybook/http-serve.mjs` — a converter/server-side surface produced at sync time,
  not a kit-shipped file. Where no `/design-sync` round-trip has run, the kit-shipped deterministic HTML
  prototype (`assets/templates/prototype/`, §3a item 1) is the offline human-review surface. Hand whichever
  exists to the owner.
- The builder assembles the audit + the rendered samples + the open ratification GAPs into the PR and
  stops. Sign-off is human PR review.
- **Never auto-confirm; never auto-stamp "Ratified by…"** The default state is unratified-pending.

(The client-clean / scrub apparatus that strips build bleed is Stage 11 (`client-clean.md`); this
stage only references the human-gate principle and assembles the evidence.)

## 7. v3 fidelity additions — reproduction visual-diff + keystone red-team

Two v3 gates layered on top of §1–6.

### 7a. Reproduction measured-diff (treatments) — ties `reproduction-router.md`

Every brand TREATMENT the build reproduced (classified at Stage 5, reproduced at Stage 8 via
`reproduction-router.md`) is validated by a **MEASURED diff against the source artifact** (MT-2):
`tools/fidelity-diff.py` co-registers the reproduction onto the Stage-5 source capture (ORB feature match +
RANSAC homography, resampled to the same DPI) and computes **ΔE2000** (perceptual colour distance) + **SSIM /
pixelmatch** (structure), plus **fontTools per-glyph metrics** for type treatments. It measures against the
**Stage-5 source capture — NOT a pixel-VRT against a reference render** (none exists; see §3a). The build-time
tool's deps are import-guarded and its verdict persists as a committed `scores.json`, so the gate is auditable
later without re-running cv2. This is the reproduction half of the fidelity gate the router points at.

- **Within tolerance → pass.** Apply the §2 layered thresholds as the tool's **numeric bounds** (ΔE2000 ≤ 2.0
  default, ≤ 1.0 on a zero-tolerance core colour; SSIM/pixelmatch per tier): the computed scores must clear the
  tier's bound. Zero tolerance where the treatment is brand-defining (a mark's texture, a signature finish),
  higher tolerance on incidental texture/illustration — a looser tier RAISES the bound, it never waives the
  measurement.
- **Cannot be brought within tolerance → not done.** It degrades to a lower method (procedural → vector-trace →
  raster-required) or becomes a fidelity `GAP-NNN`. A procedural approximation passed off as the real treatment
  is a fail, never a pass.
- **Shape note.** In package-shape (the default) this is the **measured diff against the source capture** above
  — it does **not** introduce a pixel-VRT and does **not** mandate Storybook + Playwright. The Storybook-shape
  pixel-match VRT (§3b) stays the exception, used only when the brand already ships that stack.
- **Persisted evidence (BLOCKING — the measurement must leave a trace).** A human eyeballing an overlay is not
  auditable, and neither is a score nobody can re-read. For every reproduced treatment, `fidelity-diff.py`
  commits to the emitted repo at **`audit/fidelity/<treatment-id>/`**: (1) the Stage-5 **source capture**, (2)
  the **reproduction** render, (3) the registered **`diff.png`**, and (4) **`scores.json`** — the numeric ΔE2000
  / SSIM / glyph deltas, the §2 thresholds applied, and the recorded **verdict** (`within-tolerance` |
  `outside-tolerance → degraded to <method>` | `outside-tolerance → GAP-NNN`). `scores.json` IS the recorded
  verdict and is re-auditable WITHOUT re-running cv2. **Absence of the artifact for a reproduced treatment = §7a
  gate FAIL** (you cannot claim a measured diff that left no evidence). Cross-check `audit/fidelity/` against the
  authoritative reproduced-treatment set (Stage-5 classification → Stage-8 reproduction, each treatment carrying
  its provenance-spine entry): a treatment on that set with no artifact FAILS; a treatment dropped from the set
  must carry a `GAP-NNN`, never a silent disappearance. This is the persisted half of the reproduction gate
  `reproduction-router.md` § Validation points at — the router tunes parameters until within tolerance; §7a
  records the resulting scores + verdict + the images that prove it. **Medium-agnostic:** a non-visual primary
  carrier (sonic / motion / …) has no reproduction to measure — `fidelity-diff.py --medium non-visual` records a
  declared fidelity-blocking GAP for that carrier and PASSES, never a false outside-tolerance (the build-level
  block is owned by §1/§2 + §7b). (No artifact is required for a brand that reproduced no treatment — the
  directory is simply absent.)

### 7b. Keystone gate — exists, well-formed, red-team

The keystone `.md` (Stage 8.5, `keystone-emit.md`) is a mandatory output, so Stage 10 gates it.

- **Existence + STRUCTURAL well-formedness (BLOCKING, all postures).** The keystone is present and carries all
  six sections; the GUARDRAIL layer (§5) sits in the high-recall tail (not buried mid-document); the file is
  within the conservative size budget or has applied the degradation path (§6 REFERENCE split out). Absent or
  structurally malformed → the build FAILS.
- **CONTENT / operability well-formedness (BLOCKING, all postures).** Structure alone passes a
  structurally-perfect-but-operationally-hollow keystone — adjectives dressed as rules. This check audits that
  the core sections carry OPERABLE rules, mirroring `keystone-emit.md` §4:
  - **THINK (§2)** contains **≥1 when-X-then-Z decision rule** (a conditional trade-off rule), not bare
    adjectives.
  - **DESIGN-as (§4)** contains **≥1 when-X-then-Z decision rule** (a conditional design rule), not bare values
    or adjectives.
  - **SPEAK (§3)** contains **≥1 on-brand/off-brand few-shot pair** (the `keystone-emit.md` §3 minimum — §3
    mandates "pairs", i.e. at least one pair present).
  - **No core section is a bare adjective list.** Adjectives where a rule/pair is required = a malformed
    keystone → FAIL.
  - **FORM-OF-RULE only (rector guard).** This tests the SHAPE — that a conditional rule is present, that a pair
    is present — NEVER specific brand content. A monogram-only / sonic-primary / single-ink / wordmark-only brand
    must still pass this OPERABILITY check; it is medium-agnostic and names no brand-specific rule. **Operability
    is distinct from build-grade fidelity:** passing §7b means the keystone is *operable* for that shape, NOT
    that the build produces build-grade output for it. The brand's primary-carrier fidelity is gated separately
    by §1/§2 against the carrier the DIMENSION MAP resolves; where the build has no build-grade producer for that
    medium it emits a declared fidelity-blocking GAP and the medium is a TRACKED HORIZON — never advertised as
    required-to-pass build-grade.
  - **`not-used(owner-declared)` resolves CLEAN.** Where a section legitimately has no rule because its
    dimension is declared `not-used(owner-declared)` (cross-check the Stage-0 DIMENSION MAP), that is not a
    missing rule — it resolves CLEAN, never FAIL. A section whose carrier is `none` but whose dimension is NOT
    declared not-used must carry its tagged GAP slot (e.g. "trade-off rule pending owner ratification") — an
    emitted GAP line satisfies the form check; a silent empty section does not.
- **Red-team battery is EMITTED + COMMITTED (BLOCKING well-formedness, all postures).** The builder emits the
  battery + the expected-refusal contract as a PERSISTED artifact committed to the emitted repo at
  **`audit/redteam/`** — even when the live run is non-blocking. An empty or un-emitted battery is a
  **well-formedness FAIL** (a gate that ships no battery is the "looks-like-a-check-but-isn't" hole). The battery
  is the committed evidence that the guardrail layer was actually adversarially scoped; its EXISTENCE is gated
  NOW, independent of the live RUN (which is Phase-5-deferred, below).
- **Guardrail red-team (posture-gated).** The committed battery is derived from the keystone's §5 guardrail
  layer — persona / roleplay-jailbreak attempts ("ignore previous instructions" / persona-override / DAN-style)
  and injection attempts (untrusted external/retrieved text overriding the rules) — plus the **expected-refusal
  contract** (what the guardrail must refuse, and how, in character).
  - **Regulated trigger — fire on EITHER signal: the handoff POSTURE `profile == regulated` OR a
    non-empty `regulatory:` field** (a brand can be regulated-in-fact without the `regulated` profile label).
    When either trips: **BLOCKING + external human sign-off.** In-context guardrails reduce but do not
    eliminate jailbreak/injection risk, so such a keystone is never self-certified — the battery + the
    expected-refusal contract are assembled into the PR and **human red-team sign-off is required; the default
    state is unratified-pending** (mirrors §6).
  - **Non-regulated postures:** the battery runs; findings are fixed or logged as `GAP-NNN`; not build-blocking
    on its own. But IF the battery is run (pre-Phase-5 or at Phase 5), its result persists — a per-attempt
    refused/leaked verdict committed alongside the battery (`audit/redteam/<run>/results.md`). A run that left
    no recorded verdict is a well-formedness gap (symmetric with §7a): non-blocking on findings, but an
    unrecorded run cannot read as a silent pass.
  - **Live adversarial execution is Phase 5 — but its deferral does NOT void the committed artifacts.** This
    stage *builds, assembles, and COMMITS* the gate (battery + expected-refusal contract + posture-blocking
    rule) to `audit/redteam/`; the live instantiate-and-attack RUN is the Phase-5 guardrail red-team — a model
    has to actually run it. The builder does not fake a live jailbreak eval in Code. The Phase-5 deferral applies
    ONLY to the live run; the §7a fidelity artifact and the §7b battery's existence are gated NOW and their
    absence FAILS the build regardless of the deferred run.

## Gate summary

The build is done only when: every core asset is present + build-grade (§1); `[FONT_MISSING]` is
resolved for core faces; the hollow-render gate is clean and `package-validate.mjs` exits 0 — the kit's
offline `npm run validate` pre-upload, and the converter's server-side validate once a `/design-sync` round-trip
has run (package-shape) — or the pixel-match VRT passes the layered thresholds (Storybook-shape); the content audit has no open
rule/voice violations; the three retained checks pass; **`node tools/audit-lint.mjs` exits 0 (§5a — the MT-1/3/4/5 + SC-1
provenance, completeness, reconciliation & scheme gate: R0–R7 — every named scheme a complete materialized set or a deferred+GAP), with `CHECKSUMS.txt` hashing every file under
`sources/**` so the R3 source-of-record check is meaningful, and no R6 drift — every `derived` projection
reconciles with the spine, the protected mark is single-sourced from `canon/mark.svg`, and every asset ref
resolves;** **every reproduced treatment passes the §7a MEASURED diff (`tools/fidelity-diff.py`: ΔE2000 + SSIM/pixelmatch
+ glyph metrics against the Stage-5 source capture — not a pixel-VRT) (or degrades / logs a GAP) AND has
committed its persisted evidence to `audit/fidelity/<treatment-id>/`
(source + reproduction + `diff.png` + `scores.json` recorded verdict — absence FAILS); the keystone is present, six-section,
guardrail-in-tail, within budget (structural), AND passes the §7b CONTENT check (THINK + DESIGN-as each carry
≥1 when-X-then-Z rule, SPEAK ≥1 on/off-brand pair, no core section a bare adjective list — form-of-rule only,
`not-used(owner-declared)` resolves clean); the red-team battery + expected-refusal contract are EMITTED and
COMMITTED to `audit/redteam/` (empty/un-run battery = well-formedness FAIL); and, in a regulated posture, the
keystone carries human red-team sign-off (§7b)**; and the evidence + open ratification GAPs are assembled into
the PR for human sign-off. **Phase-5 dependency (explicit):** the LIVE red-team RUN (instantiate-and-attack) is
Phase-5-deferred and does NOT happen here; what is gated NOW is the §7a artifact + the §7b committed battery +
the §7b content check — their absence fails the build regardless of the deferred live run. Anything core unmet →
the build fails; non-core gaps log and the repo stays valid.
