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
7. **Fidelity/provenance flags** per asset (build-grade vs reference vs missing) so the build can FAIL on a
   missing core asset.
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
    when; what the builder inherits from it enters the build as `handoff-confirmed` (or `proxy-relayed`
    where a proxy answered), never `owner-confirmed` on handoff text alone.
15. **A persistence afterlife** — the builder persists this block VERBATIM to `sources/handoff—<date>.md`
    and hashes it into `CHECKSUMS.txt` (Stage 0) before parsing: the handoff is the TOP of the chain of
    custody, the hashed source-of-record every handoff-carried datum can cite, and the artifact later gates
    read (never a paste that dies in chat).
16. **An acquisition route per material** — every ASSETS item declares HOW it gets into the repo
    (`acquire:` + `fallback:`), so acquisition is executable and a failed route degrades to its declared
    fallback or an open GAP, never silence.
17. **Directives bind to enforcement** — the § Directives registry names each imperative carrier, its
    normative consequence, and the mechanism class that enforces it today.

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
    <item> · role:<REFERENCE|RAW> · fresh:<shipped|stated-old> · path:<repo path> · fidelity:<build-grade|low-fi|pointer-only> · sha256:<hash | to-hash-on-acquire> · ingest:<vector-extract|computed-css|design-file-native|ocr-visual|font-match|n/a> · acquire:<pre-placed | fetch <url> | recover-wayback <url + era-pin> | cut <media-url @ locator> | owner-delivery | <other declared route>> · fallback:<declared route | owner-delivery | none→GAP>   (acquire/fallback are an OPEN capability class — a failed route degrades to its declared fallback or an open GAP, never silence)
    scoping-doc (when one exists) · role:REFERENCE · path:sources/scoping—<date>.md · sha256:<hash> · acquire:pre-placed   (the scoper's full human-readable scoping .md — the lean machine block below never under-captures what this carries)
  CONSUMERS (live surfaces the brand ships today; verified by reachability, not a checksum):
    <surface> · url:<live url> · role:CONSUMER · fresh:<shipped|stated-old> · bidirectional:<y/n> · promotion-path:<… | none> · ingest:<computed-css | ocr-visual | …>   (computed-css BY DEFAULT — a CSS-readable live site; a live-but-raster surface reachable by `url:` but not computed-style-readable, e.g. an image feed / gallery, declares `ocr-visual`. `ingest:` on CONSUMERS is the SAME open class as the ASSETS track — vector-extract|computed-css|design-file-native|ocr-visual|font-match|n/a — never a closed css/raster enum; a future live medium is not excluded.)

— WHY (essence) — RATIFIED{ by:<owner name/role | proxy:<who, for whom>> · how:<in-session sign-off | written approval (cited)> · date:<ISO> }   (a RECORD, not a label: the builder inherits this as handoff-confirmed / proxy-relayed, never owner-confirmed) —
  Category/positioning · Audience · Feel (is / never) · Anti-promise · One line (onliness) · RTB · Voice (register/lexicon/don'ts)
  Personality (scored attributes on an owner-ratified scale — ANY scale the owner ratifies or the scoper derives from the profile; a named framework is an illustration, never a required input) · Differential scales (formal↔casual etc.) · Resonance
  VALUE TRADE-OFFS: <1–2 owner-confirmed "when trading X vs Y the brand chooses Z" | none>
  VOICE-EXEMPLARS (per audience): <audience> → on-brand:<utterance> / off-brand:<utterance> · PROVENANCE{ confidence:<owner-confirmed | hypothesis> } | none
  PROPOSED (quarantine — only what the owner asked the scoper to draft): <slot> → <draft value> · PROVENANCE{ source:proposed · confidence:hypothesis } · gap:<client-language gap this rides> | none

— WHAT (primitives) — POINTERS + OWNER-PROVIDED ONLY (scoper never sampled) —
  <slot>: present:<y/n> · intent:<meaning> · owner value:<… | none> · source:<repo pointer>
    · PROVENANCE{ source:<declared-spec|owner-stated|extracted-vector|computed-css|design-file|matched|traced|inferred|proposed> · confidence:<hypothesis|corroborated|verified-primary|proxy-relayed|handoff-confirmed|owner-confirmed> · owner:<who ratifies> · freshness:<shipped|stated-old> }   (handoff-confirmed is a BUILDER-side inheritance label — the scoper never stamps it)
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
  <dimension>: <filled | not-used(owner-declared) | tagged-gap>
  applied-expression/social: <filled(media-attached) | not-used(owner-declared) | tagged-gap>   (must resolve explicitly)
  consultation-surface: always-required   (PERMANENT — never resolves to filled/not-used/tagged-gap; gate 5 is unconditional, RV-4)

— HORIZONS (category-detected; one-line + gap by default) —
  <horizon>: <direction one-line | not-relevant | tagged-gap> · existing-material:<y/n>

— POSTURE (guardrail layer; detected, not hardcoded; `profile` is an OPEN capability class — record an unlisted posture verbatim) —
  profile:<low-profile|high-visibility|regulated|activist|playful|b2b-formal|<other-detected>  (illustrative set, not a closed list)> · visibility:<low|moderate|high> · audiences:<ordered priority list> · regulatory:<named instrument — owner-stated (cited) | →GAP | none>  (owner-stated-or-GAP, never memory-asserted — EH-2) · stance:<takes positions | neutral> · never-topics:<…> · refusal-style:<…>

— CORE-ASSET FIDELITY CONTRACT (this brand's must-haves) —
  <core slot>: <present build-grade | GAP low-fi/missing → fidelity-blocking>
  NON-WAIVABLE even in v0/DEMO: the brand's PRIMARY-IDENTITY CARRIER(S) — resolved from the DIMENSION MAP (e.g. visual mark | sonic-mark | motion-signature | other declared lead atom) · graphic-code
  (Where the build has no build-grade producer for the resolved carrier's medium, that carrier is a DECLARED fidelity-blocking GAP per its role — never a false zero-tolerance fail on a visual mark the brand does not lead with, and never a silent pass.)

— GAPS (client-language; builder formalizes to GAP-NNN) —
  <what's missing> — why:<…> · severity:<MUST/SHOULD/NICE> · provenance:<handoff-deliberate|handoff-defect|builder|skill-scope> · proposed:<…>

— OPTIONAL (every dimension resolves EXPLICITLY — no skill default ever fills a slot; in v0/DEMO the scoper resolves momentum dims to demo-default-yes and scope-expanding dims to demo-default-no, as WRITTEN values) —
  <dimension>: not used | demo-default-yes | scope-expanding(demo-default-no)
  Claude Design component library: <YES | NO>   (an EXPLICIT slot the scoper fills — a directive, not advice; UNFILLED = a handoff defect the reconciliation gate fails, never a silent default; NO means ZERO Claude Design artifacts in the emitted repo — machine-checked, see § Directives)
  existing-component-stack: <storybook+playwright | other | none>   (default none → builder emits package-shape; storybook+playwright → builder may emit Storybook-shape — Stage 8 reads this, never re-hunts it)

NOTES: <…>
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
  hashed-source rule), and `sources/` is operator surface — outside the client scrub. Citing the persisted
  handoff replaces any builder transcription of it (a transcription is `origin: relay` custody, never an
  independent source).
- **Ratification is a record, not a label.** The WHY header's `RATIFIED{by · how · date}` names who signed
  off, how, and when. Data the builder inherits from the signed block enters the build as
  `handoff-confirmed` — or `proxy-relayed` where a proxy answered (a proxy confirms FACTUAL slots;
  attitudinal/posture/value slots need the owner or degrade to `hypothesis` + GAP). The builder never stamps
  `owner-confirmed` on handoff text alone.
- **Scoper proposals cross the seam in quarantine.** A value the scoper authored (because the owner asked
  for a draft/recommendation) travels in the WHY `PROPOSED` line or a WHAT slot at
  `source: proposed · confidence: hypothesis` riding a client-language gap — labeled, operative, never
  canon until ratified. An unlabeled scoper-authored value is a contract defect.

- **Two manifest tracks; never a DEAD pointer.** In-repo ASSETS carry `sha256` (the builder verifies before
  reading). LIVE CONSUMERS — the surfaces the brand actually ships today (site, app, active feed) — carry a
  `url` and are verified by REACHABILITY, not a checksum: the builder confirms each url resolves before reading
  it. What stays forbidden is the *dead/ephemeral* pointer — a Claude.ai chat link, a local Downloads path, an
  auth-walled resource — because the Code-side builder cannot reach it. (Closes the v2 dead-end: resource handoff
  by a dead URL — not by penalizing the live surface the brand runs on.)
- **Media is attached or live + its ingestion declared.** Social/applied expression never crosses the seam as
  prose. A static asset is placed in `assets/`/`sources/` (checksummed); a live surface is carried in CONSUMERS
  (reachability-checked). Either way it carries an `ingest:` field telling the builder how to read it
  (vector-extract / computed-css / design-file-native / ocr-visual / font-match). (Closes the v2 dead-end:
  applied expression passed as prose degraded across the seam.)
- **Provenance on every primitive and every gap.** WHAT carries the 4-field spine
  (source / confidence / owner / freshness) on the six-value ladder; observed expression enters as
  `hypothesis`; the builder never promotes a one-off to a line without tier-2 ratification
  (`owner-confirmed`, or `handoff-confirmed` where the signed block carries that exact value AT RATIFIED
  confidence — inside the RATIFIED WHY or a slot the wire stamps `owner-confirmed`; carriage at
  `hypothesis`/`corroborated` confers nothing — `proxy-relayed` ratifies factual slots only). This is the
  root-cause fix (lost epistemic status).
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
  the block under `sources/` before parsing).

## Directives — the enforcement registry

Some carriers are DATA (values the builder reads); these are DIRECTIVES (imperatives the builder obeys).
Every directive binds to the mechanism class that enforces it **today** — one of:
`parse-or-stop (Stage 0)` · `lint (tools/audit-lint.mjs)` · `measured (the fidelity gate)` ·
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
