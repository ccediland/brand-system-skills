# v3 System Audit — brand-system-skills

- **Title:** v3 System Audit — full-tree re-verification against current main
- **Date:** 2026-06-23
- **Scope:** AUDIT-ONLY (read-only; no files modified). Findings feed a later fix-pass.
- **Base SHA:** `5bf4edd` (branch `v3/system-audit`, post-PR-#24)
- **Rector (lens for everything):** anti-determinism — the repo's job is general/capability-class mechanisms with the brand only as illustration. A defect is any closed enum-as-floor, a fixed value/recipe presented as THE method, or brand-specific truth baked into a general mechanism.
- **Note on examples:** all illustrations below use a generic placeholder brand (`<brand>`); no real brand is named.

---

## 1. Executive verdict

**QUALIFIED YES for the visual default path; NOT YET for the full medium-agnostic promise.** For the brands the system was built from — visual identities with a static mark, the default ANALYZE path — current main delivers its end-to-end promise in-band (canon + token spine + prototype + /design-sync kit + mandatory keystone) with **zero blockers** on that path; the residuals there are one MAJOR keystone-carrier orphan plus MINOR/NIT completeness items. But the broader "any brand" / medium-agnostic claim (which the §7b operability gate explicitly asserts for a sonic-primary brand) is **not yet delivered**: a sonic/motion-primary brand hits **2 structural BLOCKERs** — the visual-only fidelity floor and the visual-only render evidence (§5). This is a strict improvement over #19: all five of its BLOCKER grounds are dead; the two new blockers are a different, narrower class (one brand shape, not the default pipeline).

Audit #19 returned a **QUALIFIED NO** resting on five grounds. Re-verified against current main (post-Theme-1→6, PRs #20–#24), **all five are RESOLVED**, which flips the verdict:

1. **"Handoff is not a single sufficient interface for ANALYZE."** RESOLVED. The handoff now carries a two-track manifest — checksummed `ASSETS` plus a reachability-verified `CONSUMERS url:` track with `bidirectional:`/`promotion-path:` carriers (`handoff-format.md` L55-56, L110-115). The "never URLs" rule is scoped to dead/auth-walled/Downloads; builder Stage 0 and `analyze.md` consume the live url directly.
2. **"`dev/` dangles the full spec (~13 cites)."** RESOLVED. A grep of `SKILL.md` + all 14 references returns **zero** `dev/` pointers; the pipeline spec and Stage-8 re-pin locator are now inline.
3. **"Orphaned BUILD-MODE + DIMENSION-MAP."** RESOLVED. Stage 0 parses BUILD-MODE (v0/DEMO degradation threaded to S8/S9), DIMENSION MAP (present-but-unresolved → HALT), and HORIZONS.
4. **"Fabricated keystone pairs."** RESOLVED. WHY now carries VALUE-TRADE-OFFS + VOICE-EXEMPLARS; keystone §2/§3 emit a tagged GAP where the carrier is `none`, never a fabrication.
5. **"Stale public surface."** RESOLVED. v0.3.0 in lockstep across both manifests; keystone foregrounded in manifest + README; greenfield cited only as retired; `canon.json` `$schema` intentionally omitted with a client-local note.

**The MAJOR residual on the visual path:** the WHY block emits **Personality (Aaker-5 scored), Differential scales, and Resonance**, and both skills assert these are consumed by the keystone — but no slot in `keystone-emit.md` or the `keystone.md` template ingests them (the MAJOR orphan). This degrades the completeness of the keystone's think/voice derivation but reinstates none of the original blockers. Two MINORs accompany it (`plugin.json` doc drift; CREATE-mode treatment-classification ambiguity).

**Medium-agnostic stress (dimension E).** Walked against four different-shaped brands — sonic/motion-primary · digital-native-no-print · monogram-only · single-ink. The system is **medium-agnostic in its reasoning layers** (the canon, the illustrative coverage floor, the §7b keystone operability gate, the token provenance spine) but **visual-static-centric in its deliverable and gate layers**. Digital-native/no-print is genuinely first-class; single-ink and monogram-only degrade *gracefully* (breakage confined to the prototype/kit layer); a **sonic/motion-primary brand degrades hardest** — the NON-WAIVABLE static-`mark` floor (`handoff-format.md` L91, `validate-audit.md` L28-29) and the visual-only "render real samples" evidence (`prototype.html`, `validate-audit.md` L44) both gate-fail it, and the keystone §4 DESIGN-as + the reproduction-router taxonomy carry no motion/sonic slot. These are the 2 BLOCKER + 2 MAJOR in §5: they do not touch the visual default path, but they gate the medium-agnostic promise the §7b gate advertises — the gap is between an aspiration the reasoning layers already honor and the gate/deliverable layers that don't.

---

## 2. Functional pipeline trace

**Headline:** the pipeline can take a real brand in → harvest/extract → produce a faithful, complete, promise-matching output (canon + token spine + prototype + /design-sync kit + mandatory keystone) in a single in-band pass. Every emitted handoff carrier has a named Stage-0 consumer except the three WHY personality carriers.

### Per-stage table (15 stages)

| Stage | Reads | Writes | Verdict | Note |
|---|---|---|---|---|
| Scoper INPUT (elicitation → handoff) | owner interview, material protocol, asset inventory, posture+horizon detection, three-surface review | one fenced handoff block per `handoff-format.md` | flows | Frontier law holds: elicits intent + points, never samples values. Scoper owns DIMENSION-MAP completeness. |
| Stage 0 — Ingest handoff & locate target | every handoff block | parsed brief routed downstream | flows | Every carrier has a named consumer; BUILD-MODE/DIMENSION-MAP/all-5-ingest-tokens now parsed (prior F3/F49 resolved). |
| Stage 1 — Scaffold | `assets/templates/` | full repo skeleton | flows | All cited templates verified on disk. |
| Stage 2 — Read material & fill by MODE | in-repo `assets/`+`sources/` + reachable CONSUMERS url; `analyze.md`/`create.md` | filled prose + `canon.json` mirror | flows | `analyze.md` consumes `fresh:`/`bidirectional:`/`promotion-path:` directly. S2/S6 overlap documented + adjudicated. |
| Stage 3 — Asset acquisition (BLOCKING) | `ingest:` token else detected source-type; stated-spec-read | best-fidelity asset per slot + fidelity GAP | flows | ingest-token map covers all 5 (was 3/5 orphan). |
| Stage 4 — Font acquisition (BLOCKING) | per-font `license:` (capability-class SPDX id); stated-spec name | self-hosted faces + license or MUST-HAVE GAP | flows | Two orthogonal axes; deny-by-default; not a closed `OFL\|owner\|GAP` floor. |
| Stage 5 — Applied-design harvest | live consumers + TREATMENTS block | GRAMMAR + ESSENCE + token atoms + classified treatments | partial | Prose is consumer-centric; CREATE-mode handoff-carried treatment has ambiguous classification home though Stage 0 routes it here. |
| Stage 6 — Fill canon (extraction synthesis) | S2-5 outputs + WHAT GEOMETRY owner values | measured values → tokens + meaning → prose | flows | GEOMETRY read from handoff not re-hunted (resolves F5). No double-fill. |
| Stage 7 — Token spine | extracted/owner color+type values | DTCG base/semantic/component, OKLCH `$value`, per-token provenance | flows | `authored\|derived` orthogonal to confidence ladder; documented SD-lag fallback keeps main buildable. |
| Stage 8 — Prototype + /design-sync kit (BLOCKING) | canon+tokens+assets+OPTIONAL | `prototype.html` + `design-sync-kit/` | flows | All kit templates ship incl. real offline `package-validate.mjs`; single config; re-pin step acknowledges server-side fluidity. |
| Stage 8.5 — Keystone emit (BLOCKING) | canon/tokens/assets; WHY VALUE-TRADE-OFFS→§2, VOICE-EXEMPLARS→§3, POSTURE→§5, HORIZONS→§6 | `<brand>-keystone.md`, GAP where carrier `none` | partial | VALUE-TRADE-OFFS/VOICE-EXEMPLARS consumed with GAP-not-fabrication (resolves F4). BUT Personality/Differential/Resonance promised consumed yet have no keystone slot. |
| Stage 9 — Coverage + gaps | handoff GAPS + coverage-checklist + universality test | GAP-NNN rows in `RESIDENT.md` | flows | Coverage floor explicitly illustrative; universality stress test is the real gate. |
| Stage 10 — Validate/audit + fidelity gate (BLOCKING) | FIDELITY CONTRACT, prototype, kit gates, keystone, treatments, POSTURE | pass/fail + `audit/fidelity/` + `audit/redteam/` evidence + PR | flows | Shape-dependent; §7a/§7b artifacts gated NOW, live red-team Phase-5-deferred; regulated trigger generalized to profile OR non-empty `regulatory:`. |
| Stage 11 — Client-clean / scrub (BLOCKING) | generated client repo | scrubbed repo | flows | Grep zero tool-attribution/bleed/`{{}}`; templates neutral as backstop. |
| Stage 12 — Commit + PR | stage outputs + audit evidence | `claude/<name>` commit + PR | flows | Human PR review is sign-off; never auto-stamps ratified. |

### Per-seam table

| Seam | Verdict | Note |
|---|---|---|
| scoper interview → handoff block | clean | Frontier law holds; three-surface review gates pre-compile. |
| handoff → Stage 0 parse | clean | Every emitted block has a named consumer; prior BLOCKER orphans resolved. |
| MANIFEST CONSUMERS url → Stage 2/5 harvest | clean | Two-track manifest; "never URLs" scoped to dead/auth-walled/Downloads; resolves prior single-sufficient-interface BLOCKER. |
| WHY VALUE-TRADE-OFFS / VOICE-EXEMPLARS → keystone §2/§3 | clean | Consumed with GAP-not-fabrication; resolves prior keystone-fabrication BLOCKER. |
| WHY Personality/Differential/Resonance → keystone THINK/SPEAK | **orphan** | Emitted in handoff WHY (L60), promised consumed (builder SKILL L109-110, scoper SKILL L242-244), but no slot in `keystone-emit.md` or `keystone.md`. |
| WHAT GEOMETRY + per-font license → Stage 6/4 | clean | Owner-provided rule-values read not re-hunted; resolves F5. |
| POSTURE visibility+audiences → keystone §5 / Stage10 §7b | clean | Both consumed; regulated trigger generalized to profile OR non-empty `regulatory:`. |
| TREATMENTS → Stage 5 → Stage 8 → Stage 10 §7a | lossy | Seam holds via Stage-0 routing but Stage-5 prose is harvest-from-live-consumers; CREATE-mode carried treatment ambiguous. |
| `ingest:` enum → asset-acquisition matrix | clean | All 5 tokens mapped (was 3/5); declared token wins, conflict flagged. |
| kit → fidelity gate / client-clean | clean | `package-validate.mjs` real + offline; gate consumes kit gates; scrub strips tool attribution. |

### ORPHANS

- **WHY Personality** (Aaker-5 scored) — emitted in handoff WHY, promised consumed by SKILL.md L109-110, no slot in `keystone-emit.md`/`keystone.md`.
- **WHY Differential scales** — emitted, promised, no keystone consumption slot.
- **WHY Resonance** — emitted, promised, no keystone consumption slot.

### DANGLES

- None. No shipped file points into `dev/` or any other absent target (prior F2 dangle resolved).

---

## 3. 100% file coverage ledger

Every file in `ALL_FILES` (57 files) appears exactly once.

### Root + v3 docs

| File | Verdict | Note |
|---|---|---|
| `.claude-plugin/marketplace.json` | CURRENT | v0.3.0, keystone + ANALYZE/CREATE in description, no greenfield; lockstep with `plugin.json`. F20/F23/F24 fixed. |
| `.claude-plugin/plugin.json` | CURRENT | v0.3.0 matches marketplace.json; names both skills + the keystone deliverable. (Note: doc repo-maps still cite it — see §5; the file itself is sound.) |
| `.gitignore` | GAP | L11 `**/la-gruta*.pdf` hardcodes the real n=1 brand name — only brand-name hit in `git grep`; L12 generic `brandbook*.pdf` already covers intent. Leak. |
| `CLAUDE.md` | DRIFT | Repo map L8 names `plugin.json` as shipped manifest — drift residue (see §5 MINOR). Otherwise current. |
| `LICENSE` | CURRENT | Standard MIT, 2026; matches README/RESIDENT. No contract surface. |
| `README.md` | CURRENT | Human front door reflects v3: keystone foregrounded (L5/35), /design-sync version-fluid caveat present (F50 fixed). |
| `RESIDENT.md` | CURRENT | Compacted (#22), synced through #24: ZERO-BLOCKER state, Decisions carry Themes 1-6, OI-I tracks F10/F32/F38. |
| `v3-execution-plan.md` | CURRENT | Resynced to Phase 5 (F26/F56 fixed); Next actions 1-4 Done; `status: active` correct for in-progress plan. |
| `v3-research-foundation.md` | DELIBERATE-DEBT | `status: reference (frozen research output)`; pre-#20 framing intentionally frozen. One literal `feTurbulence baseFrequency="0.1 0.01"` (L59) mirrors F34 (see §5 NIT). |

### Builder SKILL + references

| File | Verdict | Note |
|---|---|---|
| `skills/brand-canon-builder/SKILL.md` | CURRENT | Stages 0-12 match references; consumes every handoff carrier; provenance ladder byte-identical. (Two locators flagged in §5: L312 regulated enum; L109-110 orphan promise.) |
| `.../references/analyze.md` | CURRENT | ANALYZE reads two-track manifest, `fresh:` enum, `bidirectional:`/`promotion-path:` from handoff; harvest at hypothesis confidence. |
| `.../references/architecture.md` | CURRENT | Four-question canon + Lego law; coverage floor framed ILLUSTRATIVE; per-token provenance spine cited. |
| `.../references/asset-acquisition.md` | CURRENT | Source-agnostic matrix + stated-spec-read + ingest-token map (5 tokens). No leaks. |
| `.../references/claude-design-adapter.md` | CURRENT | Default-ON adapter; single-sources the kit config; forbids duplicate config. (§Shape conventions.md location ambiguity noted in §5 MAJOR.) |
| `.../references/client-clean.md` | CURRENT | Stage 11 scrub greps tool URL/skill names/bleed/`{{}}`; no auto-stamped ratification. |
| `.../references/coverage-checklist.md` | CURRENT | Illustrative floor as prompt for universality stress test, not a gate (F16 fixed). |
| `.../references/create.md` | CURRENT | CREATE rare-exception: consume ratified WHY, never re-interview, scaffold-first, gap-then-stress-test. |
| `.../references/design-sync-kit.md` | CURRENT | v2.1.185 live-pin + Step-0 re-pin; config strict-key list matches template; `package-validate.mjs` offline gate (F13 fixed). |
| `.../references/font-acquisition.md` | CURRENT | Reads declared `license:` (SPDX as capability class) + separate →GAP routing; deny-by-default. |
| `.../references/gap-protocol.md` | CURRENT | 4-field provenance spine; 7-col gap table WITH Provenance column. (RESIDENT template lags — see §5 MAJOR.) |
| `.../references/keystone-emit.md` | CURRENT | 6-section schema as general capability; GAP-not-fabricate; confidence READ from `$extensions`. (Orphan: no Personality/Differential/Resonance slot — §5 MAJOR.) |
| `.../references/reproduction-router.md` | CURRENT | Router over general taxonomy; visual-diff evidence to `audit/fidelity/`. (Literal `feTurbulence` value-as-method persists — F34, §5 MINOR.) |
| `.../references/token-spine.md` | CURRENT | DTCG 2025.10 + OKLCH literal `$value` lag caveat; per-token provenance. (Radius namespace `--radius-` vs shipped `--radius` — F32, §5 MINOR.) |
| `.../references/validate-audit.md` | CURRENT | Fidelity gate; §7a/§7b artifacts gated; regulated trigger fires on profile OR non-empty `regulatory:`. |

### Scoper SKILL + reference

| File | Verdict | Note |
|---|---|---|
| `skills/brand-canon-scoper/SKILL.md` | CURRENT | Rewritten to v3: provenance spine, retired greenfield, two-track roles, DIMENSION MAP, VALUE-TRADE-OFFS/VOICE-EXEMPLARS. (F10 instrument not instantiated; L300 posture open-class lives only here — §5; L313 F54 NIT.) |
| `skills/brand-canon-scoper/references/handoff-format.md` | CURRENT | Two-track manifest, full PROVENANCE on WHAT, WHY carriers incl. Aaker-5/Differential/Resonance, POSTURE visibility+audiences. (Posture `profile:` closed pipe-list — §5 MINOR.) |

### Canon + keystone + satellite templates

| File | Verdict | Note |
|---|---|---|
| `.../templates/canon/00-index.md` | CURRENT | Output-agnostic INDEX; binds data-map→DATA POINTER + projections→PROJECTIONS; all placeholders generic. |
| `.../templates/canon/01-essence.md` | CURRENT | Qualitative ESSENCE; pushes volatile values to data-map, measurable atoms to PRIMITIVES. |
| `.../templates/canon/02-primitives.md` | CURRENT | PRIMITIVES carries mark Geometry/clear-space/min-sizes/misuse (the GEOMETRY destination, F5). OKLCH-canonical color. |
| `.../templates/canon/03-grammar.md` | CURRENT | Generative GRAMMAR with stable `G-*`/`ALGO-*` IDs + anti-catalog guard (resolves prior F14 source). |
| `.../templates/canon/canon.json` | CURRENT | `$schema` removed + `$description` forbids tool-repo URL (F25 fixed); `version:0.1.0` is the client's own. |
| `.../templates/keystone/keystone.md` | CURRENT | Mandatory 6-section keystone; ladder byte-identical (F18); §4 points at named layers (F14); GAP-SLOTs forbid fabrication (F4/F8); §6 confidence READ (F37). (No Personality/Differential/Resonance slot — §5 MAJOR; posture L78 closed pipe-list — §5 MINOR.) |
| `.../templates/satellites/data-map.md` | CURRENT | DATA POINTER points at volatile values, never stores; model-vs-value discipline. No defect. |
| `.../templates/satellites/projections.md` | CURRENT | PROJECTIONS registry: bidirectional-consumer + promotion-path, OKLCH-preserving transform. (L31 closed out-of-scope enum — §5 NIT.) |

### Design-sync kit

| File | Verdict | Note |
|---|---|---|
| `.../design-sync-kit/.design-sync/config.json` | CURRENT | Matches v2.1.185 pin; strict-config + libOverrides note; all `{{placeholder}}` (F12 dead). |
| `.../design-sync-kit/.design-sync/conventions.md` | CURRENT | `readmeHeader` source (the copy /design-sync actually consumes); concrete spine token names. (`--radius` bare — F32, §5.) |
| `.../design-sync-kit/.design-sync/previews/Button.tsx` | CURRENT | Authored preview, NO `@dsCard` marker (converter stamps it); generic content. |
| `.../design-sync-kit/README-KIT.md` | CURRENT | Maps kit to v2.1.185 contract; documents `npm run validate` + `package-validate.mjs` (F13 phantom resolved). |
| `.../design-sync-kit/_card-shape/floor-card.html` | CURRENT | Honest floor card; first line `@dsCard`; all `var(--token,fallback)`. |
| `.../design-sync-kit/_card-shape/preview-card.html` | CURRENT | Reference emitted-card shape; `@dsCard` + `[DSCARD_MISSING]` contract. |
| `.../design-sync-kit/build.mjs` | CURRENT | esbuild + ts-morph `.d.ts`; best-effort `[NO_DIST]`; HTML prototype as deterministic fidelity artifact. |
| `.../design-sync-kit/package-validate.mjs` | CURRENT | Offline gate (F13 fixed) with capability-class codes. (Barrel regex undercounts multi-name `export {}` — §5 NIT.) |
| `.../design-sync-kit/package.json` | CURRENT | `files[]` includes validate script; `version 0.0.0` kit-instance seed, decoupled from tool v0.3.0. |
| `.../design-sync-kit/src/components/Button.tsx` | CURRENT | EXAMPLE the builder replaces; every value resolves from `var(--token-*)`. Uses `--radius` (F32). |
| `.../design-sync-kit/src/components/Mark.tsx` | CURRENT | Placeholder mark; explicit BUILDER-replace instruction; GRAMMAR rule encoded; no brand baked in. |
| `.../design-sync-kit/src/index.ts` | CURRENT | Barrel mapping each export to a discovered component; invent-nothing. |
| `.../design-sync-kit/styles.css` | CURRENT | Import closure; commented `@font-face` honest GAP; OKLCH placeholders flagged generic. (`--radius` bare — F32, §5.) |
| `.../design-sync-kit/tsconfig.json` | CURRENT *(not assessed — verdict inferred)* | Standard TS config for the kit's esbuild/ts-morph build; no contract surface or brand value; consistent with `build.mjs`/`package.json`. |

### Adapter + emitted client docs + prototype + tokens

| File | Verdict | Note |
|---|---|---|
| `.../claude-design-adapter/NOTES.md` | CURRENT | Unique adapter runbook; single config source; brand-agnostic; cssEntry aligns. |
| `.../claude-design-adapter/conventions.md` | DRIFT | Duplicate of the kit's `.design-sync/conventions.md` and materially drifted (abstract placeholder token names, stale Setup section). Dead, lagging copy. §5 MAJOR. |
| `.../templates/docs/CLAUDE.md` | CURRENT | Emitted client dev doc; matches Stage-11 scrub rules; live token contract; generic placeholders. |
| `.../templates/docs/README.md` | CURRENT | Emitted client front-door; four-layer map + spine. (Mandatory keystone missing from "Start here" — §5 MAJOR; undefined jargon — §5 MINOR.) |
| `.../templates/docs/RESIDENT.md` | CURRENT | Carries live v3 spine, `audit/fidelity` + `audit/redteam` dirs, GAP-NNN. (Gaps table missing the 7th Provenance column gap-protocol mandates — §5 MAJOR.) |
| `.../templates/prototype/prototype.html` | CURRENT | Self-contained fidelity artifact; OKLCH placeholders; missing build-grade image framed as GAP. Uses `--radius` (F32). |
| `.../templates/tokens/base.json` | CURRENT | OKLCH literal `$value` + `$extensions.brand.provenance` on representative tokens (F17); orthogonality demonstrated. |
| `.../templates/tokens/semantic.json` | CURRENT | Role-named aliases (`{base.category.name}`, leaf-pointing); themeable layer. Generic. |
| `.../templates/tokens/component.json` | CURRENT | Aliases SEMANTIC never base directly; intentionally minimal. Valid DTCG. |

**Row count: 57.**

---

## 4. Audit #19 reconciliation

Status legend: **FIXED** = remediated on current main · **STALE** = no longer applies · **LIVE** = still open · **SUPERSEDED** = folded into another finding.

| Finding | Severity | Status | Note |
|---|---|---|---|
| F1 | — | FIXED | CONSUMERS `url:` track added; two-track manifest; "never URL" reconciled to reachability test (PR #20). |
| F2 | — | FIXED | Zero `dev/v2-build-spec.md` refs; §3 pipeline + re-pin inline (PR #21). |
| F3 | — | FIXED | Stage 0 parses BUILD-MODE + DIMENSION MAP (parse-or-stop HALT) (PR #20). |
| F4 | — | FIXED | WHY carries VOICE-EXEMPLARS; keystone §3 GAP-not-fabricate (PR #23). |
| F5 | — | FIXED | per-mark GEOMETRY + per-font license carried; read not re-hunted (PR #20/#23). |
| F6 | — | FIXED | graphic-code added to NON-WAIVABLE set, holds under v0/DEMO (PR #23). |
| F7 | — | FIXED | `bidirectional:`/`promotion-path:` carriers for analyze.md §5 (PR #20). |
| F8 | — | FIXED | WHY carries VALUE TRADE-OFFS; keystone §2 GAP where `none` (PR #23). |
| F9 | — | FIXED | POSTURE carries `visibility:` + `audiences:`; §5 parameterized (PR #20/#23). |
| F10 | MAJOR | LIVE | Scoper external client instrument SPECIFIED but never INSTANTIATED (no worked glossed Spanish block). Self-tracked as Theme 7, deliberately deferred. |
| F11 | — | FIXED | ingest-token map routes all 5 tokens to matrix rows (PR #21). |
| F12 | — | FIXED | Only one `config.json` ships; adapter no longer ships a rival config (PR #21). |
| F13 | — | FIXED | `package-validate.mjs` ships as a real offline gate, wired via `npm run validate` (PR #21). |
| F14 | — | FIXED | keystone §4 sources named canon layers, not "design rationale" (PR #23). |
| F15 | — | FIXED | §7b content check: hollow/adjective-only keystone now FAILS (PR #23). |
| F16 | — | FIXED | coverage table reframed ILLUSTRATIVE; universality test is the real gate (PR #24). |
| F17 | — | FIXED | per-token `$extensions.brand.provenance` emitted; source⊥confidence (PR #23). |
| F18 | — | FIXED | out-of-enum `confirmed` replaced by full ladder at every hop (PR #23). |
| F19 | — | FIXED | persisted evidence to `audit/fidelity/` + red-team emit/commit to `audit/redteam/` (PR #23). |
| F20 | — | FIXED | marketplace.json no longer says "greenfield or brownfield"; ANALYZE/CREATE framing (PR #24). |
| F21 | — | FIXED | zero forward-pointer tokens remain (PR #24). |
| F22 | — | FIXED | zero internal build-tracking tokens (`PR-B*`/`F-0NN`/`GATE-2`) remain (PR #24). |
| F23 | — | FIXED | both manifest descriptions foreground the keystone deliverable (PR #24). |
| F24 | — | FIXED | both manifests bumped lockstep to 0.3.0 (PR #24). |
| F25 | — | FIXED | `canon.json` `$schema` removed; client-local relative pointer recommended (PR #21). |
| F26 | — | FIXED | execution plan resynced to Phase 5; completed phases marked Done (PR #24). |
| F27 | — | FIXED | Stage 0 parses HORIZONS; keystone §6 sources the HORIZONS block (PR #20). |
| F28 | — | FIXED | WHY carries Aaker-5/Differential/Resonance as typed slots (PR #20/#23). *(See §5 MAJOR: emitted but the keystone has no consumption slot.)* |
| F29 | MINOR | FIXED | §7b fires on `profile==regulated` OR non-empty `regulatory:` (PR #20). |
| F30 | MINOR | LIVE | No `existing-component-stack:` carrier; kit-shape decision re-hunts the brand fact (defaults harmlessly to package-shape). |
| F31 | MINOR | LIVE | `motion:` still a single prose line; LIVE-but-accepted for the not-used default. |
| F32 | MINOR | LIVE | Only `--radius` now diverges from the `--radius-` spine convention (color/font families aligned). |
| F33 | MINOR | LIVE | Stage 2/6 note scrubbed of build chatter but still cites "the spec's §3 table" + deferral chatter. |
| F34 | MINOR | LIVE | `reproduction-router.md` still presents `feTurbulence baseFrequency="0.1 0.01"` as the per-class method; no "illustrative, tuned per artifact" clause. RECTOR-relevant. |
| F35 | MINOR | LIVE | §3a still leads with v2.1.185-pinned render codes; the conceptual invariant not hoisted above them. |
| F36 | MINOR | FIXED | freshness pinned `shipped \| stated-old` byte-identical at every hop. |
| F37 | MINOR | FIXED | keystone asset-line confidence READ from `$extensions...provenance.confidence`, not recalled. |
| F38 | MINOR | LIVE | Scoper §3 fidelity rubric still visual-only; no first-class non-visual (sonic/motion/verbal) fidelity slot at intake. |
| F39 | NIT | LIVE | No Stage-10 check asserting every font's `PROVENANCE.source ∈ {declared-spec\|owner-stated\|matched}`. |
| F40 | NIT | LIVE | No cheap Stage-3 SVG path-count/byte sanity check to catch full-page-clip-as-mark. |
| F41 | NIT | LIVE | Persisted-evidence half closed (F19); traced-vs-synth discrimination still operator-perceptual, not mechanical. |
| F42 | NIT | FIXED | `applied-expression/social` dimension must resolve explicitly. |
| F43 | NIT | FIXED | two-track manifest verifies ASSETS (sha256) + CONSUMERS (reachability) with stop-and-report. |
| F44 | NIT | FIXED | scoper owns DIMENSION-MAP completeness; builder can only STOP on unresolved dimension. |
| F45 | NIT | LIVE | Gate-side fixed (OR-trigger) but `SKILL.md` L312 still hardcodes closed `health/finance/legal` enum. RECTOR-relevant. |
| F46 | MINOR | LIVE | §7a names the tier per treatment, but no committed per-element zero-tolerance manifest for §2 baselines. |
| F47 | MINOR | LIVE | scoper SKILL grew 417→460 lines; H4 `4a`/`4b` persist; no top-of-file reference-load block. |
| F48 | NIT | LIVE | `design-sync-kit.md` still titles "(Stage 8b)" vs SKILL's "(a)/(b)" — two sublabels for one artifact. |
| F49 | MINOR | FIXED | Stage 0 parse-side of F3 closed: DIMENSION MAP/HORIZONS/BUILD-MODE all parsed with actions. |
| F50 | MINOR | FIXED | README Requirements carry the /design-sync server-side/version-fluid honesty. |
| F51 | NIT | SUPERSEDED | Folds into F33: Stage 6 double-fill ambiguity adjudicated in present prose; residual chatter tracked under F33. |
| F52 | NIT | LIVE | scoper frontmatter description 1010/1024 chars — ~1.4% headroom; standing NIT. |
| F54 | NIT | LIVE | scoper L313 declares posture `confidence: owner-confirmed` mid-interview, short-circuiting gate-6 promotion. |
| F55 | NIT | LIVE | Both SKILLs lean on `**bold**` (101 instances) vs md-house-style DROP — defensible practitioner deviation. |
| F56 | NIT | SUPERSEDED | Folds into F26: execution-plan `home_base`/state corrected; no Chat-design-pending impression. |

*(F53 was not present in the #19 ledger as carried into this batch; all 56 carried IDs above are accounted for.)*

### New emergent issues

- **F10 is the lone surviving F1–F28 defect and is self-tracked** (MAJOR): of F1–F28 only F10 remains LIVE, named in `v3-execution-plan.md` (L8/L37/L48/L89) as Theme 7 gating the Phase-5 run. Honest deferral, not regression — but the surface most dependent on owner-language tone fidelity still ships with no exemplar while manifests advertise a complete v3 product. Confirm Theme 7 lands before any release tag.
- **CONSUMERS-track manifest hardcodes `ingest:computed-css`** (NIT): correct in practice (live surfaces always read computed-style) but the invariant is never stated, so a reader could mistake the fixed value for an oversight. One clause would remove the ambiguity. No functional defect.
- **F45 anti-determinism leak survived the F29 remediation** (MINOR): the gate side was fixed but `SKILL.md` L312 still hardcodes the closed `health/finance/legal` enum — the exact closed-enum-as-floor the rector forbids (children's products/political/safety-critical/jurisdiction-specific are regulated-in-fact yet unlisted). Never tracked closed in RESIDENT OI-I; an accounting gap, not deliberate scoping.
- **Storybook-vs-package shape keys on an un-carried brand-fact (F30)** (MINOR): the kit-shape decision gates on whether the brand "already ships Storybook + Playwright" with no typed handoff carrier — a live counterexample to the "single sufficient interface" claim now asserted across RESIDENT/CLAUDE/SKILL. Defaults harmlessly, so MINOR.
- **F45 regulated-list fixed as a side-effect of F9/F29 POSTURE work** (NIT, positive): the §7b OR-trigger, the keystone size budget framed as a PARAMETER, and the generic `example-brand-owner` placeholder confirm the F1–F28 remediation introduced no new closed-enum/fixed-recipe leaks.
- **F22 token-scrub did NOT over-strip** (NIT, positive): zero build-tracking tokens remain AND `CORE-ASSET FIDELITY CONTRACT` survives as a named contract in 9 places with no dangling `see D-B6`/`GATE-2` references. Over-strip hypothesis checked and refuted.

---

## 5. Severity-ranked findings ledger

**Tally: 2 BLOCKER · 6 MAJOR · 10 MINOR · 4 NIT** (deduplicated across dimensions A/B/C/D/E/F). The 2 BLOCKERs are **scoped to the medium-agnostic promise** (a sonic/motion-primary brand); the visual default path carries **zero blockers** — see §1.

| Severity | File + locator | Finding | Proposed fix | Origin |
|---|---|---|---|---|
| BLOCKER *(medium-agnostic / sonic-motion shape; not the visual default path)* | `handoff-format.md` L91 + `validate-audit.md` L28-29 (`NON-WAIVABLE even in v0/DEMO: mark · graphic-code`) (dim E) | **Visual-mark floor blocks a sonic/motion-primary brand.** A static visual `mark` is hardcoded non-waivable in ~5 places, so a brand whose lead identity is a sound logo / signature animation fails a zero-tolerance Stage-10 gate on an element it does not lead with, while its actual identity carrier (sound/motion) has no gate at all. Contradicts the §7b operability gate, which explicitly names a sonic-primary brand as required-to-pass. | Generalize the non-waivable line to "the brand's primary-identity carrier(s)" resolved from the DIMENSION MAP (mark OR sonic-mark OR motion-signature) so the floor tracks the brand's actual lead atom. | NEWLY-FOUND |
| BLOCKER *(medium-agnostic / sonic-motion shape; not the visual default path)* | `prototype/prototype.html` L19-20 + `validate-audit.md` L44 (dim E) | **"Render real samples" is visual-only.** The Stage-10 fidelity evidence is one HTML file rendering five hardcoded static-visual surfaces (hero/card/control/type/color) with no sound/motion render or capture path — yet this prototype IS the gate's evidence, so a sonic/motion-primary brand cannot produce the artifact the BLOCKING gate consumes. | Derive the prototype surface-set from the brand's primary medium (an `<audio>`/waveform block for sonic, a CSS/Lottie motion block for motion-primary) and let the gate accept the medium-appropriate sample. | NEWLY-FOUND |
| MAJOR | `keystone-emit.md` §2 (L34-40)/§3 (L42-44); cross-ref builder `SKILL.md` L109-110, scoper `SKILL.md` L242-244, `handoff-format.md` L60 (dims A, C-F28 tail) | **Orphaned WHY carriers.** Personality (Aaker-5 scored), Differential scales, and Resonance are emitted in the handoff WHY and BOTH skills assert they seed the keystone's THINK/SPEAK, but neither `keystone-emit.md` nor `keystone.md` has any slot ingesting them. Three owner-elicited carriers are emitted-but-unconsumed at the most owner-visible deliverable. | Add Personality/differential placements as named inputs to §2 (THINK) operative rules and Aaker-5 + Resonance to §3 (SPEAK) voice attributes, with matching `keystone.md` slots — OR strike the "keystone consume them"/"seed the keystone's THINK/SPEAK" promises if scoper-internal only. | NEWLY-FOUND |
| MAJOR | `.gitignore` L11 (dim B) | **Brand-name leak.** `**/la-gruta*.pdf` bakes the real n=1 derivation brand's name into the brand-agnostic tool repo — the only brand-name hit in `git grep` over the tracked tree; violates CLAUDE.md's 0-brand-name guardrail and the anti-determinism rector. L12 generic `brandbook*.pdf` already discharges the intent. | Delete L11; rely on `**/brandbook*.pdf` plus a broad `**/*-brandbook*.pdf` / `reference-*.pdf` pattern. Re-run the 0-brand-name grep as a commit gate. | NEWLY-FOUND |
| MAJOR | `templates/docs/RESIDENT.md` Open Items / Gaps table vs `gap-protocol.md` § Logging a gap (dim B) | **Template-vs-protocol drift.** Emitted gaps table is 6 columns; `gap-protocol.md` mandates a 7th `Provenance` column (origin tag `handoff-deliberate \| handoff-defect \| builder \| skill-scope`). Every scaffolded client repo inherits a ledger that structurally cannot hold the origin tag, so it is silently dropped at every build. | Add the `Provenance` column between Severity and Proposed resolution, with a placeholder enum cell in the GAP-001 example row. | NEWLY-FOUND |
| MAJOR | `claude-design-adapter/conventions.md` (full file) + `claude-design-adapter.md` §Shape/step 3; also surfaces in `templates/docs/README.md` "Start here" L8-14 + builder `SKILL.md` emitted-tree (dim B, dim D) | **Duplicate-drifted conventions.md + keystone omission.** (a) Two `conventions.md` exist; `config.json` `readmeHeader` wires the KIT copy, so the adapter-dir copy is dead weight that has materially drifted (abstract placeholder token names vs the kit's concrete spine; stale "Setup & schemes"; `{{placeholder}}` import example). The reference §Shape/step 3 is itself ambiguous about which path. (b) Separately, the mandatory `<brand>-keystone.md` is absent from the emitted client README "Start here" map AND the SKILL emitted-tree — the inherited front door under-represents the north-star output. | Single-source `conventions.md` (keep only the kit copy, delete the adapter-dir copy, fix §Shape to point at the kit path); add a `<brand>-keystone.md` line to README "Start here" and the SKILL emitted-tree. | NEWLY-FOUND |
| MAJOR | `keystone/keystone.md` L60-71 §4 DESIGN-as (Color/Type/Spacing/Treatment) + `keystone-emit.md` §4 (L45-50) (dim E) | **Keystone DESIGN-as has no motion/sonic slot.** The keystone's operable "design AS the brand" core enumerates four visual-static dimensions and offers no slot for motion or sonic *reasoning*, though the token spine already carries motion tokens — a motion/sonic-primary brand's defining design logic has nowhere to land, so the keystone under-delivers exactly where that brand is strongest. | Add a generative "primary-medium (motion / sonic / other)" decision-rule slot to §4, filled when used and `not-used(owner-declared)` otherwise, so DESIGN-as spans the brand's actual primary medium. | NEWLY-FOUND |
| MAJOR | `reproduction-router.md` L13-30 (treatment taxonomy + four methods) (dim E; distinct from F34) | **Reproduction router is a closed visual taxonomy.** The faithful-rendering engine classifies only visual/textural treatments → SVG-filter / rough.js / vector-trace / raster; a motion signature (timing/easing identity) or a sonic treatment has no class or method, so it routes nowhere and falls outside the §7a visual-diff silently. (Distinct from F34, which is the literal filter value *inside* the visual axis.) | Add a primary-medium axis (motion → timing/easing reproduction + frame-diff; sonic → out-of-code/raster-equivalent boundary) OR explicitly scope the router visual-only and route non-visual treatments to a declared GAP rather than silent absence. | NEWLY-FOUND |
| MINOR | `handoff-format.md` L87 + `keystone.md` L78 + `keystone-emit.md` §5; open-class framing lives ONLY at scoper `SKILL.md` L300-302 (dim F) | **Posture `profile:` closed-enum-as-floor (determinism leak).** The 6-value pipe-list `<low-profile\|high-visibility\|regulated\|activist\|playful\|b2b-formal>` travels downstream stripped of its open-class framing — no escape token, no "not a closed set" qualifier at the points a parser/filler reads it. A brand whose posture has no slot (luxury-exclusive, civic, youth-subculture, faith-based) is force-fit. Distinct from the by-design pinned enums (freshness, provenance ladder) because posture is meant to be detected/open. | At each consumption point append `\| <other-detected>` (or `\| …`) and a one-clause "illustrative capability class, not a closed set — record the detected posture even if unlisted," mirroring scoper L300. | NEWLY-FOUND |
| MINOR | builder `SKILL.md` L312 (dims C2, C-emergent) | **Regulated closed enum (determinism leak).** The gate side was generalized (§7b OR-trigger), but the SKILL summary still hardcodes `Regulated postures (health/finance/legal): BLOCKING` — the closed-enum-as-floor the rector forbids; children's-products/political/safety-critical/jurisdiction-specific are regulated-in-fact yet unlisted. | Replace the parenthetical with "any posture flagged `regulatory:` non-empty OR a detected high-stakes domain," matching the §7b OR-trigger it points at. | CARRIED-OVER-LIVE (F45) |
| MINOR | `token-spine.md` L44-46 vs `styles.css` :root, `conventions.md` L17, `Button.tsx`, `floor-card.html` (dim B) | **Radius namespace drift.** Spine declares `border-radius → --radius-` (category prefix) but the kit declares/consumes a bare `--radius`; `--color-*`/`--font-*` families now align, so radius is the lone non-conforming name and the "maps cleanly" guarantee fails only there. | Rename to `--radius-md` so it sits under the `--radius-` category, OR add a spine note that a single radius value may project a bare `--radius` singleton and document that alias. | CARRIED-OVER-LIVE (F32, partial) |
| MINOR | `reproduction-router.md` L34-35; also `v3-research-foundation.md` L59 (dims C2, F, B-NIT) | **Fixed filter recipe as method (determinism leak).** `feTurbulence baseFrequency="0.1 0.01"` is presented as the technique that "mimics wood/fabric grain" — a literal value stated as the per-class method; no "illustrative starting parameter, tuned per artifact by visual-diff, never applied blind" clause. The same literal recurs in the frozen research doc that the build phases consume. | Add the "illustrative, tuned per artifact" clause to the router; mirror it onto `v3-research-foundation.md` L59 when the OI-I coverage pass touches it, so both carry the same caveat. | CARRIED-OVER-LIVE (F34) |
| MINOR | builder `SKILL.md` Stage 5 (L194-202) vs Stage 0 routing (L137-139) (dim A) | **CREATE-mode treatment classification ambiguous.** Stage 5 frames classification exclusively as harvesting "from the live consumers." In CREATE mode (no live consumers) a handoff-carried TREATMENT still needs classification; Stage 0 routes TREATMENTS→Stage 5 regardless, but a literal reader could skip Stage 5 as consumer-only and leave the treatment unclassified before Stage 8. | Add a Stage-5 clause: "In CREATE mode (or where a TREATMENT is handoff-carried with no live consumer), classify the handoff TREATMENTS block directly against `reproduction-router.md` regardless of whether a live-consumer harvest ran." | NEWLY-FOUND |
| MINOR | `CLAUDE.md` L8; `RESIDENT.md` L52 (dim A) | **plugin.json doc drift.** Both repo maps list `plugin.json` as a shipped manifest. The file does exist (verified) and is sound, but the maps were flagged in the prior audit as part of the "public surface lies" cluster; the drift residue is that the maps and the actual shipped surface should be reconciled to match the mirror convention they cite. | Confirm `plugin.json` is intended to ship (it is present and current); if so the maps are correct and this closes — otherwise reconcile the map. *(Downgraded from the prior framing: file is present.)* | CARRIED-OVER-LIVE (F5 residual / #5) |
| MINOR | `templates/docs/README.md` L12; `docs/CLAUDE.md` L7/L21-22; `docs/RESIDENT.md` L18/L31 (dim D) | **Undefined jargon in inherited client docs.** `DTCG`, `OKLCH`, "OKLCH-preserving transform", "never color/css" appear with zero expansion; a non-design client owner inherits these as living docs with no glossary. | Gloss on first use in README ("DTCG — the W3C design-token standard; OKLCH — a perceptual color space"); add a one-line "see `canon/00-index.md` glossary" pointer in CLAUDE/RESIDENT. | NEWLY-FOUND |
| MINOR | `v3-research-foundation.md` L14/L146 vs shipped `base.json`/`CLAUDE.md` (dim D) | **Structured-color may read as shipped.** L146 presents DTCG structured-color objects as the native target and L14/L144 state "DTCG 2025.10 as the token target" without flagging at that point that the shipped spine deferred structured-color (OKLCH literal in `$value`). Not a true contradiction (L159 pre-discloses the SD-v5 lag) but a skim could mislead. | Add a one-clause forward-reference at L146 noting structured-color objects were deferred per the L159 tooling-lag boundary — `$value` stays an OKLCH literal, structured spaces live in `$extensions`. | NEWLY-FOUND |
| MINOR | `coverage-checklist.md` L25-27 rows 3 & 5 (dim E) | **Floor rows still smuggle a default cardinality/form.** Despite the F16 illustrative-floor reframe, row 3 frames color as "primary + secondary/accent" and row 5 the mark as "wordmark + symbol + primary lockup"; a single-ink or monogram-only brand fills these by negating a baked-in default rather than meeting a neutrally-stated need. (Row-wording residual of F16, not a regression of it.) | Reword rows 3/5 count- and form-neutral ("the brand's ink set, ≥1, each with role + meaning"; "the brand's mark form(s), whichever it uses"). | NEWLY-FOUND |
| MINOR | `prototype/prototype.html` L43/L76/L113 + `tokens/base.json` font-family (display + body) (dim E) | **Type spread assumes a primary+secondary pairing.** The prototype + base tokens assume `--font-display` + `--font-body`; a single-typeface brand renders a redundant duplicate and the type spread implies a pairing it lacks — a small fidelity untruth in the client-facing artifact. | Let display/body collapse to one face when single-typeface (alias body→display) and adjust the type-spread copy to not assert a pairing. | NEWLY-FOUND |
| NIT | `package-validate.mjs` barrel regex `/export\s*\{\s*([A-Z]\w*)/g` (dim B) | **Latent barrel undercount.** The regex catches only the first PascalCase id per `export { ... }` block. The shipped `src/index.ts` is one-per-line so it counts right, but a consolidated `export { Mark, Button }` would undercount (report 1, not 2). | Iterate `/export\s*\{([^}]*)\}/g`, split the capture on commas, filter PascalCase — robust to multi-name braces. | NEWLY-FOUND |
| NIT | `handoff-format.md` L54/L56; `asset-acquisition.md` L61 (dim C1 emergent) | **Undocumented `ingest:computed-css` invariant.** The CONSUMERS line fixes `ingest:computed-css` while the ASSETS line carries the full enum; correct in practice but never stated, so the single value reads as a possible oversight. | Add a one-clause note: "live surfaces are always read computed-css; static media uses the ASSETS enum." | NEWLY-FOUND |
| NIT | `satellites/projections.md` L31 (dim D) | **Closed out-of-scope enum (determinism leak, mild).** "engineering concerns (security, performance, SEO, hosting) are out of design-system scope" reads as a fixed list where the intent is the general class; an accessibility-runtime or i18n concern is the same class but unlisted. | Reframe as open: "engineering/runtime concerns (e.g. security, performance, SEO, hosting — not exhaustive) are out of scope; they belong to the consumer, derived from but never coupled into the canon." | NEWLY-FOUND |
| NIT | scoper `SKILL.md` L313 (dim C2) | **Posture confidence short-circuit (F54).** Declares posture data `confidence: owner-confirmed` mid-interview, conflating "owner said it in-session" with "owner ratified at gate-6," short-circuiting the promotion semantics. | Add a carve-out: in-session statement enters as owner-stated/corroborated, promoted to owner-confirmed at the gate-6 To-confirm pass. | CARRIED-OVER-LIVE (F54) |

**Carried vs new (22 findings):** **5 carried-over-LIVE** from #19 — F45 (MINOR), F32 (MINOR), F34 (MINOR), F54 (NIT), plus the F5/#5 `plugin.json` residual (MINOR, downgraded — the file is present and sound). **17 newly-found** across dimensions A/B/D/E/F: 2 BLOCKER + 6 MAJOR + 6 MINOR + 3 NIT. Dimension E (medium-agnostic / second-brand-shape stress) contributes 6 of the new findings: both BLOCKERs + 2 MAJOR (keystone §4, reproduction-router taxonomy) + 2 MINOR (coverage rows, type pairing).

---

## 6. What is genuinely solid

Do not touch the following in a fix-pass — verified holding on current main:

- **All five prior BLOCKERs are dead.** Two-track manifest (F1/F7/F43), no `dev/` dangle (F2), BUILD-MODE/DIMENSION-MAP/HORIZONS parsed (F3/F27/F49), keystone GAP-not-fabrication (F4/F8), and the public surface (v0.3.0 lockstep, keystone foregrounded, greenfield retired, `$schema` omitted) all confirmed (F20/F23/F24/F25).
- **The handoff is a single sufficient interface** for both ANALYZE and CREATE (one documented counterexample, F30, defaults harmlessly).
- **The provenance spine is coherent end-to-end:** the 4-field block (`source/confidence/owner/freshness`) is emitted on tokens (F17), READ not recalled by the keystone (F37), with the confidence ladder `hypothesis \| corroborated \| owner-confirmed` byte-identical at every hop (F18), and `source(authored\|derived)` correctly orthogonal to it.
- **Anti-determinism posture is materially stronger than #19.** The three known leaks are genuinely reframed: coverage table is ILLUSTRATIVE with the universality stress test as the real gate (F16); the SVG-filter is "an instance the router classifies" with the header guard (F34 partial); the regulated red-team trigger fires on profile OR non-empty `regulatory:` (F45 gate-side, F29). A tree-wide brand-leak grep returns zero real-brand specifics except the single `.gitignore` line.
- **The /design-sync kit is real and offline-gated.** `package-validate.mjs` ships and is wired (F13); a single `config.json` with no rival copy (F12); `@dsCard` contract, `build.mjs` best-effort `[NO_DIST]`, and the HTML prototype as the deterministic fidelity artifact all consistent across template + reference.
- **The token templates and canon templates are clean DTCG/OKLCH**, with generic obviously-replace placeholders, the SD-tooling-lag fallback documented so main stays buildable, and the satellites (`data-map`, `projections`) parsing and wiring as live not-canon roles via `00-index.md`.
- **The fidelity/audit gate persists evidence** (`audit/fidelity/<treatment-id>/`, `audit/redteam/`) as a blocking well-formedness check, shape-dependent rather than mandating Storybook/pixel-VRT, with the live red-team run correctly Phase-5-deferred.
- **The build-tracking scrub was complete and surgical** (F22): zero internal tokens remain, yet the named `CORE-ASSET FIDELITY CONTRACT` cross-skill anchor survives intact in 9 places.
- **The reasoning layers are genuinely medium-agnostic** even where the gates are not (dim E): the §7b operability content-check tests form-of-rule only and explicitly names monogram-only / sonic-primary / single-ink / wordmark-only brands as required-to-pass, resolving `not-used(owner-declared)` CLEAN; digital-native/no-print is first-class (the token spine supports an all-`derived` brand with no Pantone/print source assumed); single-ink and monogram-only degrade gracefully at the canon/coverage/keystone core. The non-visual-shape breakage is confined to the prototype / kit / fidelity-floor layer — the reasoning core does not need touching, only the deliverable/gate layer.
