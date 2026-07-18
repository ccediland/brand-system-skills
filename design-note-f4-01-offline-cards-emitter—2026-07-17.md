# Design note — F4-01: the offline static-cards emitter (2026-07-17)

Design/verify note for `tools/emit-cards.mjs` on branch `claude/v6-f4`. Records the spec DERIVED from the
frozen Onyx reference prototype, the numbered DECIDIDOs, and the pre-commit adversarial verify that gated the
work. No transcripts, no journals — the forensic lives local-only, off-repo (E-O1).

## The spec, DERIVED from the reference prototype (not invented)

The reference is the frozen Onyx workaround (`onyx-brand-canon` @ `025cc64`, `claude-design-upload/` — READ-ONLY,
E-O1). Its two committed reports say WHY it existed, and the derivation is theirs, not mine:

- **`DESIGN-SYNC-SKILL-REPORT.md` P4 (root cause):** *"the kit has no renderable cards; the builder produces
  nothing uploadable-as-is."* The kit ships REFERENCE card shapes (`_card-shape/preview-card.html` loads
  `window.{{globalName}}.<Name>` from a browser-global `_ds_bundle.js` + links `styles.css`); the real React
  components need a **networked** `npm install` + build (`dist/`) + the `/design-sync` converter to render. So
  offline — `[NO_DIST]` — nothing was reviewable. The author *"hand-authored four self-contained static cards
  from the canon."*
- **The report's F4 recommendation (the single most useful change):** *"ship a canon → static-card emitter …
  emit N self-contained `@dsCard` HTML cards … that render with no React, no bundle, no converter, no
  network. This makes the kit uploadable+reviewable in Claude Design directly, and is the offline fallback
  when `dist` can't build."*

So F4-01 = that emitter. The reference cards (Onyx `01-brand`…`04-components`) define the DOM contract: a
first-line `<!-- @dsCard group="X" -->` marker, an inline `<style>` with a `:root` OKLCH closure, the layer
content in `<body>`, zero `<script>`. **The one flaw I do NOT reproduce:** every Onyx card pulls fonts from a
remote `cdn.jsdelivr.net` `@font-face` — a hidden network dependency. F4-01 is TRULY offline: font STACKS with
system fallbacks, never a remote `@font-face`.

## DECIDIDOs

1. **Zero-dep Node tool, the house pattern** (sibling of `tokens-project`/`scheme-derive`/`wire-check`). Reads
   the canon from repo-root (`tokens/*.tokens.json` · `tokens/schemes/*.json` · `canon/canon.json` ·
   `canon/mark.svg`); writes to `design-sync-kit/cards/NN-<group>.html`. NO dependency on `dist/` or the
   network — the emitter IS the offline path that makes `[NO_DIST]` a reviewable handoff state.
2. **Truly offline (the improvement over the workaround).** ZERO remote refs: no `@font-face`/CDN, no
   `<script>`, no `<link>`, no `@import`, no `fetch`, no remote `src`/`href`. Fonts render via the canon's font
   STACK with system fallbacks. `emit-cards.mjs --check` re-verifies the guarantee; the emitter also
   self-verifies fail-closed after emit.
3. **Anti-determinism card set** (present-layer-derived, like R8): Brand (if `canon/mark.svg`) · Color (if
   colour tokens) · Type (if font tokens) · Components (if colours). A flat/sonic/no-mark brand emits fewer
   cards cleanly — never a fixed checklist.
4. **Provenance honesty (materialization confers nothing — T2 doctrine).** A value that is still uncertain
   (`audit-lint` R5's exact test — `hypothesis` OR source `inferred|matched|traced|proposed`) renders "·
   provisional" in sanctioned CLIENT vocabulary, never a GAP id / confidence grade / cycle-ID. A card never
   claims more confidence than its line. **This applies to schemes too** — `scheme-derive` materializes every
   scheme at `hypothesis` + GAP, so a materialized scheme is provisional until ratified (read from the scheme
   roles' confidence, not `canon.json` status alone).
5. **Client surface — no new plumbing.** Cards land under the EXISTING `design-sync-kit/** | client` surfaces
   row → `client-deny-lint --manifest` scrubs them automatically. NOT registered as `asset-index` Kind:asset
   (the PLAN frames them as a client surface; avoids an R8 `data-asset` obligation mismatch).
6. **Untrusted-value discipline (sanitizers).** A token `$value` is untrusted text placed into a CSS context;
   it is NEVER interpolated raw. A colour value must be a well-formed CSS colour, a font stack must match a
   strict allowlist — anything else is DROPPED (the face falls back to system; the colour var is omitted).
   This closes the `</style>`-breakout injection the verify found.
7. **Derived-artifact custody (F1-02 pattern).** Each card records one `sources/MANIFEST.json` entry per
   canonical input it consumes; because every card embeds the full colour closure, the colour-token file is a
   parent of EVERY card. The run-gates custody gate recomputes each parent hash → any canon change under a
   card = STALE FAIL. A layer REMOVAL is caught by PRUNING: on emit, the emitter deletes any of its own
   (`@dsCard`-first-line) cards whose layer is gone. The mark carries `id="brand-mark"` so `audit-lint` R6b
   reconciles it against `canon/mark.svg`.
8. **The gate + fixtures.** `--check` = the offline gate ([REMOTE_REF] · [DSCARD_MISSING]); run-gates §3c
   "static cards" row (N/A when no cards / no kit — a built kit needs none). Fixtures
   `tools/fixtures/gates/emit-cards/`: `clean` (4 cards + a hypothesis scheme; idempotent; --check + deny
   PASS) · `violation` (remote `@font-face` → --check FAIL · operator-vocab leak → deny FAIL). Wired into
   `references/design-sync-kit.md` Stage 8.

No wire-contract change — the emitter is builder-side, post-canon. The wire stays FROZEN.

## The pre-commit adversarial verify (the F4-01 lesson, applied)

4 fronts (client-leak · offline · provenance-honesty · custody-staleness) + a judge per finding, re-running
every repro from scratch; journal backed up to `/mnt/c`. It found **7 real defects; 5 blocked the commit, all
fixed and re-verified**, plus 2 non-blocking, fixed anyway (ultracode).

| # | Finding | Kind | Sev | Blocked | Resolution |
|---|---|---|---|---|---|
| 1·4 | A materialized (non-deferred) scheme is `hypothesis` by scheme-derive doctrine, but rendered as SETTLED — no "· provisional" marker (read only `canon.json` status) | confidence | BLOCKER | ✅ | **FIXED** — the scheme marker reads the roles' own confidence (`roles.some(isProvisional)`). Committed regression: the `clean` fixture's `night` scheme. |
| 2 | `mark.svg <image href="http:host">` (a special scheme WITHOUT `//`) is inlined and slips past the REMOTE regex — a live fetch | network | MAJOR | ✅ | **FIXED** — `--check` flags ANY non-`data:` URL scheme in a fetchable `src`/`href`/`xlink:href`/`url()` position. |
| 3 | A `fontFamily`/colour string `$value` is interpolated UNESCAPED into `<style>` — `serif;}</style><img src=http:…>` breaks out and injects a remote beacon | leak/injection | MAJOR | ✅ | **FIXED** — `safeColor`/`safeFont` allowlists; a value that isn't a well-formed colour/font is DROPPED, never emitted. |
| 6 | Removing a canon layer leaves a stale, unbound orphan card no gate flags | custody | MAJOR | ✅ | **FIXED** — the emitter PRUNES its own cards whose layer is gone (reconciles `cards/` to the present set). |
| 5 | The Components chrome inks render a proposed colour unmarked (contradicts the Color card) | confidence | MINOR | ❌ | **FIXED** — the Components note flags provisional chrome colours. |
| 7 | Brand/Type cards embed the colour closure but registered only mark/font as parents (a colour change wouldn't STALE them) | custody | NIT | ❌ | **FIXED** — the colour file is now a parent of EVERY card (§DECIDIDO 7). |

Post-fix re-run (exact judge repros, from scratch): injection payload → face DROPPED, 0 hits · `http:host`
mark → --check [REMOTE_REF] · hypothesis scheme → "· provisional" · layer removal → orphan pruned · colour
change → STALE on ALL 4 cards. Suite **36/36** · golden `8b78dba` 8 FAIL classes unchanged, porcelain 0.
Cards visually verified (4 renders reviewed).

## Residual

None blocking. The cards render the brand FONT via its stack; on a machine without the face installed they
fall back to the system stack (the offline-correct behaviour — the card ships no remote font; the caveat is
declared on the Type card). This is the documented Linux-font caveat, not a defect.
