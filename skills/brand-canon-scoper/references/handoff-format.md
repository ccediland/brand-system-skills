# Handoff format

The scoper's only output is ONE self-contained, machine-readable block. The person places the material in
the target repo per the manifest, then pastes this block into Claude Code (in or next to the target repo) to
invoke `brand-canon-builder`.

This block is the output of **gate 7b** — produced ONLY after the Final Brand Brief (gate 7a) has the owner's BLOCKING approval; nothing compiles before that sign-off.

This is a contract, not prose. LLMs do not reliably infer intent from prose, diagrams, or a Figma file —
the builder needs an explicit, deterministic, auditable block: declared constraints, named responsibilities
per canon layer, generative rules as the bridge from intent to appearance, fidelity/provenance flags so the
build can FAIL, and the mode + ratification + "not used" declarations made explicit. It keeps the v1
single-block property: one fenced block, self-contained.

## What the block must carry
1. **Deterministic structure** — one machine-readable block, predictable shape (not prose).
2. **Token-spine readiness** — fields shaped for the builder's DTCG `$value`/`$type` spine, aliases,
   primitive/semantic tiering; OKLCH authored + HEX fallback derived by the builder.
3. **Declared constraints** — allowed/forbidden stated explicitly, never implied.
4. **Named responsibilities** per canon layer (INDEX / ESSENCE / PRIMITIVES / GRAMMAR).
5. **Generative-rule seeds (`if/then`)** mapping context → token override, where the owner stated rules.
6. **GAP register** — the delta between needed slots and what exists, in client language (the builder
   formalizes to `GAP-NNN`).
7. **Fidelity/provenance flags** per asset (the wire triple `build-grade | low-fi | pointer-only`; absence
   is a GAP, never a pseudo-grade) so the build can FAIL on a missing core asset.
8. **Auditability** — mode, owner ratification, and "not used" declarations explicit, so the build is
   auditable against intent.
9. **Two-track manifest** — in-repo ASSETS carry a `sha256` (verified before reading); LIVE CONSUMERS (the
   surfaces the brand ships today) carry a `url` verified by REACHABILITY, not a checksum. Dead/ephemeral
   pointers (Claude.ai chats, local Downloads, auth-walled) stay forbidden.
10. **Per-datum provenance** — the 4-field spine (source / confidence / owner / freshness) on every
    primitive and gap, so the builder never uses a datum at a status it has not earned. The six-value
    confidence ladder and the `proposed` quarantine channel are defined once in the builder's
    `gap-protocol.md` § The provenance spine; this contract carries the same literals at the wire.
11. **Exhaustive dimension map** — every dimension resolves to filled / not-used / tagged-gap; none skipped.
    The SCOPER owns DIMENSION-MAP completeness — the builder STOPs only on a present-but-unresolved dimension,
    so an un-enumerated dimension is the scoper's defect, never a silent pass.
12. **Build-mode + non-waivables** — FULL vs v0/DEMO declared; the primary-identity carrier (resolved from the DIMENSION MAP, not assumed a visual mark) + graphic-code fidelity-blocking regardless.
13. **Owner rule-values the gate/keystone need** — per-mark geometry, per-font license, voice-exemplars,
    value trade-offs, personality scores, posture visibility + audiences: each carried as a typed slot with
    provenance, so the builder reads them instead of re-hunting, and absence is a GAP, never a fabrication.
14. **A ratification RECORD, not a ratification label** — the WHY header carries who signed off, how, and
    when — and confers NOTHING on the text: the builder inherits PER LINE by its verified `BRIEF{}` tag
    (`verbatim`/`anchor` verified → `handoff-confirmed`, or `proxy-relayed` where a proxy answered;
    `none — compiled` → `hypothesis`), never `owner-confirmed` on handoff text alone, never per wrapper.
15. **A persistence afterlife** — the builder persists this block VERBATIM to `sources/handoff—<date>.md`,
    splits the SIGNED BRIEF appendix to `sources/brief—<date>.md`, hashes BOTH into `CHECKSUMS.txt`
    (Stage 0), and runs `node tools/wire-check.mjs` before parsing: the handoff is the TOP of the chain of
    custody, the hashed source-of-record every handoff-carried datum can cite (sourceRefs bind to the
    HANDOFF — it contains the appendix; the split brief file is the human-readable check target), and the
    artifact later gates read (never a paste that dies in chat).
16. **An acquisition route per material** — every ASSETS item declares HOW it gets into the repo
    (`acquire:` + `fallback:`), so acquisition is executable and a failed route degrades to its declared
    fallback or an open GAP, never silence.
17. **Directives bind to enforcement** — the § Directives registry names each imperative carrier, its
    normative consequence, and the mechanism class that enforces it today.
18. **The signed brief travels IN the wire** — the `— SIGNED BRIEF —` appendix (always the LAST block)
    carries the signed 7a text verbatim, so every ratification claim in the wire is CHECKABLE against the
    text it claims, in one paste (single sufficient interface; the dry-parse inherits the check for free).
    Stage 0 splits it to `sources/brief—<date>.md` + CHECKSUMS — two persisted artifacts, one paste.
19. **Per-line lineage + a recomputable check** — every ratification-bearing line carries its own `BRIEF{}`
    evidence tag (the `RATIFIED{}` wrapper confers nothing), and the `WIRE-CHECK:` line declares the
    scoper's compile walk in counts the builder RECOMPUTES (`tools/wire-check.mjs` — Stage 0 + the board).

The scoper passes pointers + owner-volunteered values only. It never samples a primitive; the builder
extracts measured values from the pointed-to sources.

## Template

````
Use the brand-canon-builder skill to build a brand canon in this repo.

BRAND: <name>
OWNERS: <who ratifies per slot>   UNRESOLVED CONFLICTS: <slots still split | none>
MODE: <ANALYZE | CREATE>   BUILD-MODE: <FULL | v0/DEMO>
TARGET REPO: <real path | "create repo <name>">

— MATERIAL MANIFEST (two tracks; dead/auth-walled/Downloads pointers forbidden) —
  ASSETS (in-repo before build OR acquired by the builder per its declared route; checksummed):
    <item> · role:<REFERENCE|RAW> · fresh:<shipped|stated-old> · path:<repo path> · fidelity:<build-grade|low-fi|pointer-only> · sha256:<hash | to-hash-on-acquire> · ingest:<vector-extract|computed-css|design-file-native|ocr-visual|font-match|none-needed> · acquire:<pre-placed | fetch <url> | recover-wayback <url + era-pin> | cut <media-url @ locator> | owner-delivery | <other declared route>> · fallback:<declared route | owner-delivery | none→GAP>   (acquire/fallback are an OPEN capability class — a failed route degrades to its declared fallback or an open GAP, never silence)
    scoping-doc (when one exists) · role:REFERENCE · path:sources/scoping—<date>.md · sha256:<hash> · acquire:pre-placed   (the scoper's full human-readable scoping .md — the lean machine block below never under-captures what this carries)
  CONSUMERS (live surfaces the brand ships today; verified by reachability, not a checksum):
    <surface> · url:<live url> · role:CONSUMER · fresh:<shipped|stated-old> · bidirectional:<y/n> · promotion-path:<… | none> · ingest:<computed-css | ocr-visual | …>   (computed-css BY DEFAULT — a CSS-readable live site; a live-but-raster surface reachable by `url:` but not computed-style-readable, e.g. an image feed / gallery, declares `ocr-visual`. `ingest:` on CONSUMERS is the SAME open class as the ASSETS track — vector-extract|computed-css|design-file-native|ocr-visual|font-match|none-needed — never a closed css/raster enum; a future live medium is not excluded.)

— WHY (essence) — RATIFIED{ by:<owner name/role | proxy:<who, for whom>> · how:<in-session sign-off | written approval (cited)> · date:<ISO> }   (a RECORD of the signing act, not a label: it confers NO status on the text — every content line carries its own `BRIEF{}` lineage tag below; the builder inherits per LINE, never per wrapper) —
  Category/positioning: <…> · BRIEF{ verbatim:"<quote>" | anchor:"<brief fragment>" | none — compiled, hypothesis }
  Audience: <…> · BRIEF{ … }   Feel (is / never): <…> · BRIEF{ … }   Anti-promise: <…> · BRIEF{ … }
  One line (onliness): <…> · BRIEF{ … }   RTB: <…> · BRIEF{ … }   Voice (register/lexicon/don'ts): <…> · BRIEF{ … }
  Personality (scored attributes on an owner-ratified scale — ANY scale the owner ratifies or the scoper derives from the profile; a named framework is an illustration, never a required input): <…> · BRIEF{ … }
  Differential scales (formal↔casual etc.): <…> · BRIEF{ … }   Resonance: <…> · BRIEF{ … }
  VALUE TRADE-OFFS: <1–2 owner-confirmed "when trading X vs Y the brand chooses Z" | none> · BRIEF{ … }
  (every WHY content line ends in ONE `BRIEF{}` tag — `verbatim:"<quote>"` = the content IS the signed words (the quote must appear in the SIGNED BRIEF, whitespace-normalized) · `anchor:"<brief fragment>"` = content compiled FROM that passage (the cited fragment must appear in the SIGNED BRIEF; semantic fidelity of the compilation stays governed by gate 7a + the signing discipline) · `none — compiled, hypothesis` = scoper-shaped without an anchor: LEGAL but the builder inherits it at `hypothesis`, never `handoff-confirmed`. An untagged WHY line is a wire defect — the check FAILS it, never inherits silently.)
  VOICE-EXEMPLARS (per audience): <audience> → on-brand:<utterance> / off-brand:<utterance> · PROVENANCE{ confidence:<owner-confirmed | hypothesis> } · BRIEF{ … — required at owner-confirmed } | none
  PROPOSED (quarantine — only what the owner asked the scoper to draft): <slot> → <draft value> · PROVENANCE{ source:proposed · confidence:hypothesis } · gap:<client-language gap this rides> | none   (quarantine channel UNCHANGED from v5 — `BRIEF{}` never applies here; a proposal's lineage is its `source: proposed` label)

— WHAT (primitives) — POINTERS + OWNER-PROVIDED ONLY (scoper never sampled) —
  <slot>: present:<y/n> · intent:<meaning> · owner value:<… | none> · source:<repo pointer>
    · PROVENANCE{ source:<declared-spec|owner-stated|extracted-vector|computed-css|design-file|matched|traced|inferred|proposed> · confidence:<hypothesis|corroborated|verified-primary|proxy-relayed|handoff-confirmed|owner-confirmed> · owner:<who ratifies> · freshness:<shipped|stated-old> }   (handoff-confirmed is a BUILDER-side inheritance label — the scoper never stamps it. A WHAT slot at `confidence:owner-confirmed` ALSO carries `· BRIEF{ verbatim:"…" | anchor:"…" }` — its ratification came through the gate-6 promote the signed brief records; slots at hypothesis/corroborated/proxy-relayed/verified-primary are exempt: their evidence is material/sourceRefs, not the brief)
  mark forms present: <wordmark/symbol/lockup/secondary/monogram/seal>
  per-mark GEOMETRY (owner-provided + PROVENANCE; builder Stage 6 reads, does not re-hunt):
    <mark>: clear-space:<… | none> · min-size digital:<… | none> · min-size physical:<… | none> · construction-ref:<repo pointer | none> · PROVENANCE{ confidence:<owner-confirmed | proxy-relayed | hypothesis> }   (geometry is factual — a proxy may confirm it)
  per-font: <face>: license:<declared SPDX/license id (e.g. OFL-1.1, Apache-2.0, Ubuntu) | owner-supplied | unlicensed→GAP>

— HOW (grammar) —
  Schemes · contrast/imagery rule · mark-selection rule · voice enforcement · motion:<… | not used> · depth:<… | not used>
  generative-rule seeds (if/then): <e.g. if mode=dark then surface=elevated | none stated>

— TREATMENTS (visual/textural, for the reproduction router) —
  <treatment>: observed-on:<manifest item> · route-hint:<procedural|generative|vector-trace|raster-required|unknown> · PROVENANCE{ confidence:<hypothesis|corroborated|verified-primary|proxy-relayed|handoff-confirmed|owner-confirmed> } · none

— DIMENSION MAP (every dimension resolves; none skipped silently; scoper owns completeness) —
  <dimension>: <filled | not-used(owner-declared) · BRIEF{ verbatim:"<confirming quote>" } | tagged-gap>
  applied-expression/social: <filled(media-attached) | not-used(owner-declared) · BRIEF{ verbatim:"…" } | tagged-gap>   (must resolve explicitly)
  consultation-surface: always-required   (PERMANENT — never resolves to filled/not-used/tagged-gap; gate 5 is unconditional, RV-4)
  (every `not-used(owner-declared)` row REQUIRES its `BRIEF{ verbatim:"<confirming quote>" }` — the owner's
  dimension-specific declaration as it appears in the SIGNED BRIEF; a quote the brief does not contain FAILS.
  A blanket never mints rows: if the confirming line is not in the signed brief, the row is `tagged-gap`.)

— HORIZONS (category-detected; one-line + gap by default) —
  <horizon>: <direction one-line | not-relevant | tagged-gap> · existing-material:<y/n>

— POSTURE (guardrail layer; detected, not hardcoded; `profile` is an OPEN capability class — record an unlisted posture verbatim) —
  profile:<low-profile|high-visibility|regulated|activist|playful|b2b-formal|<other-detected>  (illustrative set, not a closed list)> · visibility:<low|moderate|high — ONE literal, never a range> · audiences:<ordered priority list> · regulatory:<named instrument — owner-stated (cited) | →GAP | none>  (owner-stated-or-GAP, never memory-asserted — EH-2) · stance:<takes positions | neutral> · never-topics:<owner-stated value | owner-declared none | →GAP> · refusal-style:<owner-stated value | owner-declared none | →GAP>
  ("n/a" is NOT a wire literal — anywhere: it is ambiguous between not-applicable and not-elicited, the
  exact exploit class. An unelicited posture field ships `→GAP`, and every `→GAP` posture field REQUIRES a
  GAPS-block row naming that field — born-gap ships visibly, never as a placeholder.)

— CORE-ASSET FIDELITY CONTRACT (this brand's must-haves) —
  <core slot>: <present build-grade | GAP low-fi/pointer-only/absent → fidelity-blocking>
  NON-WAIVABLE even in v0/DEMO: the brand's PRIMARY-IDENTITY CARRIER(S) — resolved from the DIMENSION MAP (e.g. visual mark | sonic-mark | motion-signature | other declared lead atom) · graphic-code
  (Where the build has no build-grade producer for the resolved carrier's medium, that carrier is a DECLARED fidelity-blocking GAP per its role — never a false zero-tolerance fail on a visual mark the brand does not lead with, and never a silent pass.)

— GAPS (client-language; builder formalizes to GAP-NNN) —
  <what's missing> — why:<…> · severity:<MUST/SHOULD/NICE> · provenance:<handoff-deliberate|handoff-defect|builder|skill-scope> · proposed:<…>

— OPTIONAL (every dimension resolves EXPLICITLY — no skill default ever fills a slot; in v0/DEMO the scoper resolves momentum dims to demo-default-yes and scope-expanding dims to demo-default-no, as WRITTEN values) —
  <dimension>: not used | demo-default-yes | scope-expanding(demo-default-no)
  Claude Design component library: <YES | NO>   (an EXPLICIT slot the scoper fills — a directive, not advice; UNFILLED = a handoff defect the reconciliation gate fails, never a silent default; NO means ZERO Claude Design artifacts in the emitted repo — machine-checked, see § Directives)
  existing-component-stack: <storybook+playwright | other | none>   (default none → builder emits package-shape; storybook+playwright → builder may emit Storybook-shape — Stage 8 reads this, never re-hunts it)

NOTES: <… · NEW-INGEST: <token> — <why this new medium needs it> (REQUIRED for any `ingest:` token outside the known set — the open class admits new mediums by DECLARATION, never by silent drift)>

WIRE-CHECK: markers:<n> · verified:<n> · demoted:<n> · misses:<none | list>   (the scoper's compile verbatim walk, declared — the builder RECOMPUTES from the persisted artifacts; a discrepancy is a hand-written check and FAILS)

— SIGNED BRIEF (verbatim; ALWAYS the LAST block of the wire — everything from this header to the end of the fence is the signed Final Brand Brief text, byte-faithful) —
<the full signed 7a brief text>
````

## Rules

These rules ADD to the v2 invariants (pointers-only, MODE ANALYZE/CREATE, real TARGET REPO + manifest
in-repo, RATIFIED-WHY-only, flag authored print, CORE-ASSET FIDELITY CONTRACT fidelity-blocking, GAPS in
client language, an explicit Claude Design library slot, one fenced self-contained block). Where a newer rule
hardens an older one, the newer wins.

- **The block is persisted, hashed, and cited — never a paste that dies in chat.** At Stage 0 the builder
  writes the received block VERBATIM to `sources/handoff—<date>.md` (ISO date of receipt; successive
  handoffs = new files, custody history) and it enters `CHECKSUMS.txt` with everything under `sources/**`.
  It is the TOP of the chain of custody: `handoff-confirmed`/`proxy-relayed` data binds to it (the lint's
  hashed-source rule), and `sources/` is operator surface — outside the client scrub. Stage 0 ALSO splits
  the SIGNED BRIEF appendix to `sources/brief—<date>.md` (hashed too — the check's human-readable target;
  sourceRef binding STAYS on the handoff, which contains the appendix) and runs `tools/wire-check.mjs`
  immediately — a FAIL is stop-and-report. Citing the persisted
  handoff replaces any builder transcription of it (a transcription is `origin: relay` custody, never an
  independent source).
- **Ratification is a record, not a label — and it is inherited PER LINE (v6).** The WHY header's
  `RATIFIED{by · how · date}` names who signed off, how, and when — the ACT. What each line is worth is its
  own `BRIEF{}` tag: a line whose `verbatim`/`anchor` VERIFIES against the SIGNED BRIEF enters the build at
  `handoff-confirmed` — or `proxy-relayed` where a proxy answered (a proxy confirms FACTUAL slots;
  attitudinal/posture/value slots need the owner or degrade to `hypothesis` + GAP); a `none — compiled`
  line enters at `hypothesis`; an untagged line in scope is a wire defect (STOP). `handoff-confirmed` is a
  per-line CEILING, never a block grant. The builder never stamps `owner-confirmed` on handoff text alone.
- **Scoper proposals cross the seam in quarantine.** A value the scoper authored (because the owner asked
  for a draft/recommendation) travels in the WHY `PROPOSED` line or a WHAT slot at
  `source: proposed · confidence: hypothesis` riding a client-language gap — labeled, operative, never
  canon until ratified. An unlabeled scoper-authored value is a contract defect.
- **The wrapper confers nothing; lines prove their lineage (v6).** `RATIFIED{by·how·date}` records the
  signing ACT only. Every WHY content line, every `not-used(owner-declared)` row, every owner-confirmed
  VOICE-EXEMPLAR and WHAT slot carries its own `BRIEF{}` tag: `verbatim:"<quote>"` (the quote must appear
  in the SIGNED BRIEF, whitespace-normalized) · `anchor:"<brief fragment>"` (the cited passage must appear;
  the compilation's semantic fidelity stays a gate-7a/signing-discipline matter — the machine proves the
  anchor EXISTS) · `none — compiled, hypothesis` (legal, DEMOTED: the builder inherits `hypothesis`, never
  `handoff-confirmed`). An untagged line in tag scope is a wire defect — the check FAILS it. This is the
  compilation-seam fix: nothing enters ratified carriers unlabeled after the owner's last checkpoint.
- **Vocabulary is sanctioned; drift is a defect (v6).** Enum fields carry ONE literal from their set —
  never ranges (`low-moderate`), compounds (`font-match/trace`), placeholders (`PENDIENTE`), or "n/a"
  (banned globally as a field value: ambiguous between not-applicable and not-elicited). A pending URL is
  an ASSETS row with an `acquire:` route or a GAPS row, never a placeholder value. Open-class fields admit
  a new token ONLY with an explicit `NEW-INGEST:` (or equivalent) declaration in NOTES — extension by
  declaration, never by silent drift. An unelicited field is born a gap and SHIPS as a GAPS row (posture
  `→GAP` fields require a GAPS row naming the field).

- **Two manifest tracks; never a DEAD pointer.** In-repo ASSETS carry `sha256` (the builder verifies before
  reading). LIVE CONSUMERS — the surfaces the brand actually ships today (site, app, active feed) — carry a
  `url` and are verified by REACHABILITY, not a checksum: the builder confirms each url resolves before reading
  it. What stays forbidden is the *dead/ephemeral* pointer — a Claude.ai chat link, a local Downloads path, an
  auth-walled resource — because the Code-side builder cannot reach it. (Closes the v2 dead-end: resource handoff
  by a dead URL — not by penalizing the live surface the brand runs on.)
- **Media is attached or live + its ingestion declared.** Social/applied expression never crosses the seam as
  prose. A static asset is placed in `assets/`/`sources/` (checksummed); a live surface is carried in CONSUMERS
  (reachability-checked). Either way it carries an `ingest:` field telling the builder how to read it
  (vector-extract / computed-css / design-file-native / ocr-visual / font-match / none-needed). (Closes the v2 dead-end:
  applied expression passed as prose degraded across the seam.)
- **Provenance on every primitive and every gap.** WHAT carries the 4-field spine
  (source / confidence / owner / freshness) on the six-value ladder; observed expression enters as
  `hypothesis`; the builder never promotes a one-off to a line without tier-2 ratification
  (`owner-confirmed`, or `handoff-confirmed` where the wire carries that exact value ON A LINE whose
  `BRIEF{ verbatim | anchor }` VERIFIED against the SIGNED BRIEF (the wire-check pass); carriage at
  `hypothesis`/`corroborated` confers nothing, and a `BRIEF{ none — compiled }` line confers nothing —
  `proxy-relayed` ratifies factual slots only). This is the root-cause fix (lost epistemic status).
- **`BUILD-MODE: v0/DEMO` changes what the scoper WRITES, never what the builder assumes:** momentum
  dimensions resolve to the written value `demo-default-yes`, genuinely scope-expanding ones to
  `demo-default-no` — every OPTIONAL slot arrives explicit; the builder obeys filled slots and STOPS on an
  unfilled directive (no skill default fills it). The brand's primary-identity carrier (resolved from the DIMENSION MAP, not assumed a
  visual mark) and graphic-code stay fidelity-blocking even in demo (the NON-WAIVABLE line of the fidelity
  contract). FULL is the normal mode.
- **The DIMENSION MAP is exhaustive and the scoper owns its completeness.** Every dimension resolves to
  `filled` / `not-used(owner-declared)` / `tagged-gap` — including `applied-expression/social`, which must
  resolve to `filled(media-attached)` / `not-used` / `tagged-gap` explicitly. A builder that receives a
  *present-but-unresolved* dimension STOPS and reports — this is the live anti-determinism mechanism, not
  decoration. But the builder can only stop on a dimension that is *present*: an un-enumerated dimension is the
  SCOPER's defect (a `handoff-defect` GAP), never a silent pass — completeness is the scoper's accountability.
- **Freshness value enum is pinned: `shipped | stated-old`.** The field NAMES stay (`fresh:` in the manifest,
  `freshness:` in PROVENANCE), but the value is one of exactly these two literals at every hop — manifest,
  provenance spine, and downstream. `shipped` = fresh/live; `stated-old` = declared but not the current shipped
  reality.
- **TREATMENTS, HORIZONS, POSTURE are capability-class blocks, not brand instances.** They carry the
  scoper's observations + route-hints + detected posture as hypotheses for the builder's router / horizon
  detector / guardrail layer; none asserts a brand-specific value as settled truth.
- **Regulatory instruments are owner-stated-or-GAP, never memory-asserted (EH-2).** The POSTURE `regulatory:`
  field carries a NAMED legal/regulatory instrument only when the owner or their material supplied it
  (`source: owner-stated`, cited to that source; `confidence` stays `hypothesis` until owner ratification, like
  all posture data); otherwise it is `none` or a tagged GAP. The scoper never recalls a regulation from model
  memory — the builder's posture→severity gate (EH-3, a forward seam) will read this field, so a memory-guessed
  name would poison a downstream BLOCKING decision. No regulatory exposure → `regulatory: none`, never a forced
  GAP.
- One block, fenced, self-contained. After it, tell the person: place the material in the target repo per the
  manifest (with checksums) — or leave placement to the builder where an item declares an executable
  `acquire:` route — then open Claude Code there and paste this; it runs brand-canon-builder (which persists
  the block under `sources/`, splits the SIGNED BRIEF to `sources/brief—<date>.md`, and runs
  `tools/wire-check.mjs` before parsing).

## The compile verbatim walk (gate 7b — mandatory, BEFORE emission)

The last step of the 7b compile, run BEFORE the block is shown to anyone. The scoper walks every
ratification-bearing line of the compiled wire against the signed brief text (both exist in-chat at this
point — text-before-signature guarantees the brief; the wire was just compiled):

1. **Collect the markers.** Every `BRIEF{}` tag in tag scope (WHY lines · `not-used(owner-declared)` rows ·
   owner-confirmed VOICE-EXEMPLARS and WHAT slots) — plus a sweep for UNTAGGED lines in scope (an untagged
   line is fixed or demoted NOW, never emitted).
2. **Verify each.** `verbatim`/`anchor` quotes: located in the signed brief text (whitespace-normalized,
   exact wording). A miss has exactly two honest exits: FIX the tag (the line's real lineage — often
   `none — compiled, hypothesis`) or FIX the line (re-quote what the brief actually says). Never emit a miss.
3. **Declare the result.** Write the `WIRE-CHECK:` line — `markers` (tags walked) · `verified`
   (verbatim/anchor hits) · `demoted` (`none — compiled, hypothesis` lines) · `misses` (MUST be `none` at
   emission; a wire emitted with misses is a contract defect).

The walk is agent-gate by construction (chat-side); what makes it honest is that the builder RECOMPUTES the
same counts from the persisted artifacts (`tools/wire-check.mjs` at Stage 0 + the run-gates row) — a declared
count the recompute contradicts is caught as a hand-written check (the §7a-recompute pattern). Emitting the
wire without the walk (or without the `WIRE-CHECK:` line) fails the machine check downstream.

## Directives — the enforcement registry

Some carriers are DATA (values the builder reads); these are DIRECTIVES (imperatives the builder obeys).
Every directive binds to the mechanism class that enforces it **today** — one of:
`parse-or-stop (Stage 0)` · `lint (an executable tool — tools/audit-lint.mjs, tools/wire-check.mjs, the runner's own rows)` · `measured (the fidelity gate)` ·
`agent-gate (declared agent discipline — honest first-class status: NOT machine enforcement)`.
A directive whose row says `agent-gate` is exactly as strong as the agent's discipline and is a standing
candidate for mechanization; the registry never claims a gate that does not exist.

| Directive | Normative consequence | Enforced today by |
|---|---|---|
| `MODE: ANALYZE \| CREATE` | drives the whole Stage-2 path | parse-or-stop (Stage 0) |
| `BUILD-MODE: FULL \| v0/DEMO` | v0/DEMO OPTIONAL degradation; NON-WAIVABLES hold regardless | parse-or-stop + measured (fidelity gate) |
| `TARGET REPO` | a non-real target stops the build | parse-or-stop (Stage 0) |
| DIMENSION MAP resolution | a present-but-unresolved dimension HALTs | parse-or-stop (Stage 0) |
| `sha256:` per ASSET | the builder verifies before reading; the persisted handoff itself is hashed | agent-gate (Stage 0 — verify before reading) + lint (token sourceRefs: hashed, path-bound — not the manifest itself) |
| `ingest:` per item | the declared method routes acquisition — never re-derived | agent-gate (Stage 3) |
| `acquire:` + `fallback:` per ASSET | a failed route degrades to the declared fallback or an open GAP, never silence | agent-gate (Stage 3) |
| CORE-ASSET FIDELITY CONTRACT | missing core asset FAILS the build per its role | measured (fidelity gate) + agent-gate (Stage 10 walks the contract) |
| `Claude Design component library: <YES\|NO>` | NO ⇒ ZERO Claude Design artifacts in the emitted repo; unfilled = handoff defect | lint (the runner's opt-out reconciliation over the persisted handoff) |
| `existing-component-stack:` | kit shape read, never re-hunted | agent-gate (Stage 8) |
| POSTURE `regulatory:` | seeds the keystone guardrail + the regulated red-team gate | agent-gate (Stage 8.5 + Stage 10 — §7b evidence committed) |
| `consultation-surface: always-required` | the external-review gate never resolves away | agent-gate (scoper gate 5, unconditional) |
| `— SIGNED BRIEF —` appendix (last block) | Stage 0 splits it to `sources/brief—<date>.md` + CHECKSUMS; ratification markers with NO appendix = FAIL | lint (tools/wire-check.mjs — Stage 0 + run-gates row) |
| `BRIEF{}` per-line lineage tags | untagged line in scope FAILS; `verbatim`/`anchor` quotes must appear in the signed brief; `none` demotes to hypothesis; `not-used(owner-declared)` requires its confirming quote | lint (tools/wire-check.mjs) |
| `WIRE-CHECK:` declared counts | recomputed from the persisted artifacts; discrepancy = hand-written check, FAIL | lint (tools/wire-check.mjs) |
| Wire vocabulary (single-literal enums · no "n/a" · `NEW-INGEST:` declaration for open-class extension · posture `→GAP` ⇒ GAPS row) | out-of-vocabulary literal FAILS with its class named | lint (tools/wire-check.mjs) |
