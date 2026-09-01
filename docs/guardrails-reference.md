# Referencia de guardrails — brand-system-skills

Material de referencia extraído de `CLAUDE.md` el 2026-09-01 (mudanza de contenido de la base v2,
`estandar.md §2`) para mantener `CLAUDE.md` dentro de su presupuesto de 150 líneas. `CLAUDE.md`
mantiene la lista de guardrails vigentes en una línea cada uno; el razonamiento y detalle completo
de cada uno vive aquí — léela antes de tocar los templates/skills de este repo, no solo el resumen.

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
