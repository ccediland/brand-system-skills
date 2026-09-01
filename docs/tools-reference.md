# Referencia de herramientas — brand-system-skills

Material de referencia extraído de `CLAUDE.md` el 2026-09-01 (mudanza de contenido de la base v2,
`estandar.md §2`) para mantener `CLAUDE.md` dentro de su presupuesto de 150 líneas — `CLAUDE.md`
se auto-carga en cada sesión, esta referencia se lee bajo demanda. `CLAUDE.md` mantiene un puntero
+ resumen de una línea por herramienta; el detalle completo de cada gate (contrato, self-tests,
fixtures) vive aquí.

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
  - **R8 (RV-5, Stage D)** — brandbook completeness, fail by omission: every present canon section → a
    `data-canon-section`
    brandbook surface OR an open GAP, AND every `satellites/asset-index.md` entry of Kind `asset` → a
    `data-asset` surface or open GAP (enumerated FROM the index — derived per-brand, never a checklist).
    Reads present sections by machine signal (
    flat/monogram/sonic/non-visual pass clean); markers inside HTML comments / inert `<template>` are stripped
    before the scan; no `.html` is a vacuous PASS. See `references/validate-audit.md` §5a.
  - **R6d + R3-primary + deny-manifest (surfaces & index)** — the asset index's repo locations must resolve
    (R6d); a `verified-primary` token binds to a file the index marks `primary-master-for` (the slot→master
    linkage); the client-deny-lint takes its target list FROM `satellites/surfaces.md` `client` rows
    (`--manifest <root>`) — never auto-chosen — and its KEYED values bind per-LINE (window padding dead).
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
- **`node tools/wire-check.mjs [repo-root | wire.md]`** — the **wire verbatim-check** (v6 F2-01; zero-dep
  Node): verifies every ratification claim in the persisted handoff against the SIGNED BRIEF appendix it
  carries — per-line `BRIEF{ verbatim | anchor | none }` lineage in tag scope (WHY lines · not-used rows ·
  owner-confirmed VOICE-EXEMPLARS/WHAT slots; untagged line in scope = FAIL), quotes contained in the brief
  (whitespace-normalized) AND — for `verbatim` — in the line content they certify (content-bind: a real
  brief quote never legitimizes different content; not-used rows exempt — their quote is the owner's
  declaration), `not-used(owner-declared)` citations (a blanket never mints rows), the
  `WIRE-CHECK:` counts RECOMPUTED + the identity markers = verified + demoted + body-wide tag
  reconciliation (a hand-written check or a decorative out-of-scope tag FAILS), and the wire vocabulary
  (single-literal enums, space-tolerant match · "n/a" banned in field-VALUE position (verified quotes
  exempt) · `NEW-INGEST:` declaration for open-class extension · posture `→GAP` ⇒ a GAPS row naming the
  field or carrying `field:<name>`), plus the PRE-BRIEF SWEEP (every DIMENSION MAP `tagged-gap` dimension
  and every GAPS row named in the signed brief — a hidden gap = `silent-dimension`/`silent-gap` FAIL: the
  machine face of gate-3.5 emite-o-waive-con-ledger and the 7a sweep), and RE-EMISSION integrity (the split
  `sources/brief—*.md` must stay byte-faithful to its wire's appendix — an in-place "correction" of a signed
  brief = `reemission` FAIL; a real correction re-emits a new dated pair). Structure enforced: exactly ONE SIGNED BRIEF header (the last block),
  anchor substance floor, «…» for signed words containing ASCII quotes, one field per line. Markers with no
  brief = FAIL; no markers + no brief + vocab clean =
  N/A declared (an all-empty CREATE wire never false-blocks — W-15). Run at Stage 0 (persist time) and as a
  run-gates row. LIMIT: proves internal consistency (wire ↔ carried brief); authenticity = Stage-0 hash +
  signing discipline. Fixtures: `tools/fixtures/wire-check/` (8 FAIL + 1 N/A + the 3 handoff fixtures PASS);
  mode acceptance in `tools/fixtures/gates/`: `create-empty/` (all-empty CREATE wire → N/A, never false-blocked)
  and `t2-proposed/` (EXTEND/RECOMMEND twins: quarantined proposals PASS clean; a proposal canonized without a
  ratification act FAILs audit-lint R2/R3/R5).
- **`node tools/tokens-project.mjs [repo-root]`** — the **consumer STRING projection** (zero-dep Node): reads
  the spine (`tokens/*.tokens.json`) and writes `tokens/web/{base,semantic,component}.json` with every
  structured-OKLCH `$value` serialized to its C-1 canonical string (`oklch(L C H)` / `oklch(L C H / a)`;
  byte-parity with audit-lint's `serializeValue`), `hex` fallback dropped, `$extensions` dropped (values only).
  For string-only consumers (SD v5 rejects object `$value` — #1398/#1494; web-stack `astro-css-tokens`).
  Derived-artifact custody: entries in `sources/MANIFEST.json` with in-repo parent `{file, sha256}` — the
  run-gates custody row RECOMPUTES the parent hash (stale projection = FAIL). `operator` class in the
  surfaces manifest. Fixture: `tools/fixtures/tokens-project/demo/` (round-trip diff vs frozen `expected/`).
- **`node tools/emit-cards.mjs [repo-root]` / `--check`** — the **OFFLINE static-cards emitter** (F4-01;
  zero-dep Node, a capability of the design-sync KIT): renders self-contained `@dsCard` static HTML cards from
  the canon (`tokens/*.tokens.json` · `canon/mark.svg` · `canon/canon.json`) to `design-sync-kit/cards/NN-<group>.html`
  — one per PRESENT layer (Brand if a mark · Color · Type · Components), NO React/bundle/converter/**network**.
  The offline path that makes `[NO_DIST]` a reviewable handoff state; improves on the frozen reference workaround
  by being TRULY offline (font STACKS with system fallbacks, never a remote `@font-face`). Provenance-honest (an
  R5-uncertain value renders "· provisional" in client vocab, never a GAP id/grade); cards land under the
  `design-sync-kit/** | client` surface row (deny scrubs them). Custody: one `sources/MANIFEST.json` entry per
  (card × canonical input) — run-gates recomputes each parent hash (STALE FAIL on any canon change). The mark
  carries `id="brand-mark"` → audit-lint R6b reconciles it. `--check` = the offline gate ([REMOTE_REF] any
  remote/script/@font-face/@import ref · [DSCARD_MISSING] first-line marker); run-gates **static cards** row
  (N/A when no cards / no kit). Fixtures: `tools/fixtures/gates/emit-cards/` (`clean` idempotent + PASS ·
  `violation` remote `@font-face` → `--check` FAIL + operator-vocab leak → deny FAIL). Emitted at Stage 8
  alongside the React kit (`references/design-sync-kit.md`).
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
- **`node tools/drive-mirror.mjs [--plan | --verify <remote.json>] [repo-root]`** — the **Google-Drive asset
  mirror** (F5-01; zero-dep Node, Node ≥ 20 built-in `fetch`+`crypto`; the engine of the emitted
  `.github/workflows/drive-mirror.yml`). Mirrors the brand's **custodied assets** (asset-index rows whose
  `Repo location` is hashed in `CHECKSUMS.txt`) to a Google **shared drive** on push to the default branch, in
  a folder tree that mirrors the ASSET INDEX (per-row `Drive` column, else the row's `Kind`), and verifies the
  round-trip by `sha256Checksum` on BOTH sides. **No conversion** (real MIME, never `application/vnd.google-apps.*`,
  never a convert flag); Google Docs-Editors native files (`.gdoc/.gsheet/…`) have no `sha256Checksum` → **excluded
  by name, logged** (R-14). One-way mirror, not a sync (git = source of truth; P-J-01). Two auth routes via GitHub
  Secrets (service-account + shared drive — quota-less SA can't own files, `storageQuotaExceeded` on My Drive is
  the named trap; or OAuth refresh token). Scope: Route A (SA) uses `drive` — a pre-created shared-drive folder
  is out of `drive.file`'s reach (would 404), and a dedicated SA is confined in practice to its shared-drive
  memberships; Route B (OAuth) uses `drive.file` + an app-owned root folder (`GDRIVE_ROOT_FOLDER_NAME`),
  publishable to production to dodge the 7-day test-token expiry. **`--plan`** (OFFLINE): computes the plan,
  FAILs on a STALE custody hash, a Drive-path collision, or a broken index. **`--verify <remote.json>`** (OFFLINE):
  compares CHECKSUMS vs a recorded remote map — a MISSING remote entry (empty-pass guard) or a MISMATCH (stale) is
  a FAIL. The **live** leg (default mode) needs real Drive creds → the operator's F5 round-trip gate, never a
  build-time dep. run-gates **§3d "drive mirror plan"** row (N/A when the workflow is not emitted). Security: `push`
  to the default branch only — NEVER `pull_request_target` (secret-exfil vector); secrets only via `env:`, never
  logged. Fixtures `tools/fixtures/gates/drive-mirror/` (plan-clean + stale-custody + collision + verify-{clean,missing,stale}
  + the pre-merge-verify regression guards checksums-binary-stale + collision-double-slash).
  Doc: `.github/DRIVE-MIRROR.md` (emitted) · method `references/drive-mirror.md`.
