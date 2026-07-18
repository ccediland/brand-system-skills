# GAP protocol — how missing things are tracked, the provenance spine, and the universality test

The canon is always valid even when incomplete (the Lego property). Anything missing is not a silent
hole — it is a tracked GAP with a proposed resolution. The brand owners *decide* design questions and the
decision is *stamped*; only non-design human decisions (legal, budget) are out of scope.

## The provenance spine (every datum carries it)

Generalizes v2's per-color `source:"authored"|"derived"` flag to *every* datum the builder records, not just
colors. Each datum carries four fields:

- **source** — where it came from: `declared-spec` (the brand's stated truth) / `owner-stated` /
  `extracted-vector` / `computed-css` / `design-file` / `matched` / `traced` / `inferred` / `proposed`
  (**the quarantine channel** — a value AUTHORED by the pipeline itself, scoper or builder, as a proposal:
  it operates today, labeled, and is never canon until ratified. Distinct from the token spine's `authored`
  flag, which marks *owner*-declared truth — the opposite trust level) / `ratified-proposal` (**the RATIFY
  terminal** of the `proposed` lineage — a proposal an owner ratified post-handoff; it keeps the "was a
  proposal" origin in the name, and is the ONE source by which that lineage rises above `hypothesis`, earned
  by a content-bound `sources/ratification—<date>.md` record — see § Draft-from-recommendation).
- **confidence** — a six-value ladder in three tiers (byte-identical at every hop; no extra value/synonym):
  - **tier 0 — unconfirmed:** `hypothesis` (observed / derived / proposed, unconfirmed).
  - **tier 1 — evidence-earned:** `corroborated` (the VALUE — not just the citation — appears in ≥2
    independent non-relay sources; the lint searches the hashed files themselves) ·
    `verified-primary` (read EXACTLY from the slot's official primary master — the top truth of brand
    archaeology when no living owner can ratify; its sourceRef is the hashed primary master).
  - **tier 2 — ratified (who/how the ratification happened):** `proxy-relayed` (a proxy confirmed on the
    owner's behalf — reliable for FACTUAL slots; attitudinal/posture/value slots degrade to `hypothesis` +
    GAP) · `handoff-confirmed` (ratification INHERITED PER LINE from the signed handoff — granted only by a
    line whose `BRIEF{ verbatim | anchor }` tag VERIFIED against the wire's SIGNED BRIEF (the wire-check); a
    `BRIEF{ none — compiled }` line confers `hypothesis` only; the record is the persisted
    handoff, `sources/handoff—<date>.md`, hashed in `CHECKSUMS.txt` — it contains the brief appendix, split
    to `sources/brief—<date>.md` for the check) · `owner-confirmed` (ratification the
    pipeline itself witnessed and recorded — the record is a committed artifact under `sources/`
    (e.g. `sources/ratification—<date>.md`, hashed in `CHECKSUMS.txt`), the natural sourceRef target for
    this rung). Conflict ranking: `owner-confirmed` > `handoff-confirmed` >
    `proxy-relayed`.

  **The ladder is a GATE, not a gloss (MT-4, enforced by `tools/audit-lint.mjs` R1/R2/R3):**
  `corroborated` requires **≥2 _distinct_ non-relay source artifacts that agree — and "agree" is checked
  against the file CONTENT (the value must be found in each text source; normalized hex/oklch), never a
  file count** — two references to the
  *same* file is one source, a builder transcription (`origin: relay`, below) is custody but never an
  independent source; a value whose `source` is `inferred`, `matched` or `proposed` is **capped at
  `hypothesis`** — it may never rise on inference or self-authorship alone (a `source: inferred` +
  `confidence: corroborated` token is the exact contradiction the lint rejects); and **anything above
  `hypothesis` requires a hashed, path-bound source-of-record** (R3). **The builder never stamps
  `owner-confirmed` on handoff authority alone:** ratification carried by the handoff enters the build as
  `handoff-confirmed` PER its line's VERIFIED `BRIEF{}` tag — a `none — compiled` line enters `hypothesis`
  (or stays `proxy-relayed` as carried — the weaker label survives, it is not
  re-labeled); `owner-confirmed` in the emitted repo requires a ratification the build witnessed/committed.
- **owner** — who ratifies it (the Accountable for that slot, from the handoff `OWNERS`).
- **freshness** — the pinned value enum `shipped | stated-old` (`shipped` = fresh/live; `stated-old` =
  declared but not the current shipped reality). The same two literals are used at every hop — the handoff
  manifest `fresh:`, the handoff PROVENANCE `freshness:`, and the build — so a value never drifts label.

Hard rules:
- **Observed expression enters as `hypothesis`, never as a finding.** A sampled color, a matched font, a
  harvested treatment — all enter at `hypothesis` and need tier-2 ratification before they become canonical
  brand truth.
- **Promoting an observed one-off to a brand *line* (a rule) requires tier-2 ratification** —
  `owner-confirmed`, or `handoff-confirmed` (a value the signed handoff carries ON A LINE whose
  `BRIEF{ verbatim | anchor }` verified against the SIGNED BRIEF — the wire-check pass; carriage at
  `hypothesis`/`corroborated` confers nothing, and a `BRIEF{ none — compiled }` line confers nothing); `proxy-relayed`
  ratifies factual slots only. The builder never crystallizes an unconfirmed observation as a GRAMMAR rule
  on its own.
- **A pipeline-authored proposal lives in quarantine, fully labeled.** `source: proposed` +
  `confidence: hypothesis` (R2-forced) + exactly one open GAP (R5) whose *Proposed resolution* carries the
  draft — ratification pending IS the open gap; who proposed it is the gap's Provenance origin-tag
  (`handoff-deliberate` = scoper-proposed via handoff · `builder` = builder-proposed). Never threaded into
  the spine as settled; conflicts are ESCALATED as items, never silently resolved.
- **A datum is never used at a status it has not earned.** The `authored|derived` flag in the token spine
  (`token-spine.md`) is this spine's color-specific projection: `source: declared-spec`/`owner-stated`/`ratified-proposal` →
  `authored` (never re-derived; a ratified proposal is owner-declared truth); `source: computed-css`/`matched`/`inferred`/`proposed` → `derived`.
- **No above-`hypothesis` or `computed-css` value without a hashed, identity-verified source-of-record
  (MT-3, `audit-lint.mjs` R3).** Any token above `confidence: hypothesis`, or with `source: computed-css`,
  MUST carry a `$extensions.brand.sourceRef` whose `sha256` is listed in `CHECKSUMS.txt` — and
  the build SHA-256-hashes **every file under `sources/**`** into `CHECKSUMS.txt` (`asset-acquisition.md`), so
  the source-of-record is auditable. The source must be **identity-and-date verified** before it is trusted:
  the snapshot is confirmed the right brand (not a prior/later occupant) and its capture date reconciled
  against the page's self-reported "Last Published" — `tools/source-recover.py` surfaces those signals, the
  Stage-3 agent adjudicates them. An unhashed or unverified source keeps the value at `hypothesis` or makes it
  a GAP; it is never silently promoted.
- **Citations are real, or omitted.** A sourceRef's `selector` exists VERBATIM in the hashed file or is
  omitted / `"none"`; a `line` never points past EOF; a PDF cites `page`, never `line`. The lint checks it
  (a citation layer nothing verifies certifies the emitter's say-so — the hash chain becomes circular).
- **Every DERIVED capture records its parent's hash+URL in `sources/MANIFEST.json`** (a cut/excerpt, a
  wayback recovery, a transformed export): the chain of custody must survive feed rotation — a derived
  file whose parent lives only in a narration dies with the feed. The gate runner binds the handoff's
  declared `acquire: cut | recover-wayback` routes to their custody entries.
- **A sourceRef is a capture or a relay — declared.** Each sourceRef entry may carry `origin: <capture |
  relay>` (absent = `capture`). `relay` marks an artifact the builder itself transcribed (a dictation, a
  re-typed palette): hashable custody, NEVER an independent source — R1 excludes relay refs from the
  corroboration count. The persisted handoff (`sources/handoff—<date>.md`, the top of the chain of custody)
  removes the legitimate need for relays: cite it directly instead of transcribing it.

## Draft-from-recommendation — materializing a quarantined proposal (the T2 flow)

An EXTEND/RECOMMEND (T2) handoff is an ANALYZE wire whose owner invited extension proposals: they arrive
in the WHY `PROPOSED` line(s) (or a WHAT slot at `source: proposed`), each riding a client-language gap.
The builder MAY materialize working drafts from them — tokens, a treatment render, kit cards, prototype
surfaces — so the owner has something concrete to react to. The rules:

- **Everything materialized inherits the proposal's status**: `source: "proposed"` ·
  `confidence: "hypothesis"` (R2-forced), riding the SAME open GAP the proposal rode in on (several
  artifacts may back-reference one gap — one proposal, one gap). The scoper's gap keeps its
  `handoff-deliberate` origin; a draft the builder itself originates is `builder`-origin — same channel,
  same cap.
- **Materialization confers NOTHING.** Rendering a draft, committing it, shipping it in the prototype —
  none of it is ratification; the draft and every derivative stay quarantined (`audit-lint` R2/R5 hold
  the cap and the gap-linkage mechanically). Analyzed-existing values keep their original provenance —
  a draft never upgrades, edits, or re-labels a neighbor, and a ratified line is never re-litigated by a
  proposal (a GAP in the handoff stays a GAP until the OWNER's act closes it).
- **The ratification loop — post-first-feedback.** The owner's first feedback on a draft has exactly two
  exits, both machine-checked (the RATIFY exit below is written to PASS `audit-lint` R2/R3/R5 as stated —
  run the prose against the linter, never a shape it rejects):
  - **RATIFY** — a witnessed, recorded act (`sources/ratification—<date>.md`, hashed into `CHECKSUMS.txt` —
    the `owner-confirmed` record shape above). The token's provenance moves — as ONE atomic shape — to:
    **`source: "ratified-proposal"`** (the RATIFY terminal of the proposed lineage: it PRESERVES the
    "was a proposal" origin in the name — **never re-labeled to `owner-stated`, which erases the origin and
    is byte-identical to laundering**) · **`confidence: "owner-confirmed"`** · a **MANDATORY `sourceRef` to
    that hashed ratification record** · gap **`CLOSED (ratified)`**. `ratified-proposal` is the ONE source by
    which a proposed lineage rises above `hypothesis`; it is earned by the content-bound record, never by a
    label. On the authored↔derived axis it is `authored` (the owner's recorded act makes it owner-declared
    truth). `source: "proposed"` itself stays hypothesis-capped forever (R2) — quarantine, never canon.

    **The ratification record shape (MANDATORY — `audit-lint` R3's content-bind enforces it; the post-handoff
    analog of the wire's `BRIEF{}` verbatim).** The record MUST carry **exactly one TOP-LEVEL
    `## What was ratified` section**, and inside it, **one FLAT line per ratified token that names BOTH the
    token's SLOT and its CANONICAL value, each in its OWN backtick span, on the SAME line** — e.g.
    `` - `color.accent-seasonal` = `oklch(0.68 0.09 45)` `` (a colour's canonical value is the OKLCH
    components — a hex fallback alone never ratifies; a dimension is `` `37px` ``, a string its quoted family).
    The bind is machine-checked four ways:
    - **VALUE** — the token's value must appear in the line's VALUE SPAN (the first backtick span AFTER the
      slot span). Anything later on the line — a change-history parenthetical ("revised up from …"), the hex
      fallback, a second value — is annotation and never ratifies (a record naming value X does not ratify a
      token carrying value Y, even when Y co-occurs on the ratified line).
    - **SLOT (path-bind)** — the value must sit on a line that also names THIS token's path (a record
      ratifying value X for slot A does not ratify slot B that merely carries X).
    - **SECTION-SCOPE** — only lines INSIDE `## What was ratified` ratify. A value the owner names in a
      rejected / "alternatives — NOT chosen" or `— SUPERSEDED` block does NOT ratify it (the exact inversion
      the reject-block attack exploits).
    - **HEADING** — the section heading is bound EXACTLY: the literal text "What was ratified" (case-
      insensitive, optional trailing colon), a TOP-LEVEL `##` (a nested `###` is inert), and EXACTLY ONE per
      record. A trailing qualifier (`— SUPERSEDED 2026-03-01`), a nested/duplicate heading, or NO such
      section is a **malformed record → FAIL** (never a vacuous pass). Rejected-alternatives and superseded
      blocks live in their OWN sibling sections for the human record and are inert to the gate.

    Do NOT group ratified slots under ATX sub-headings (`### Colours`) — a heading of ANY level ends the
    section; group with **bold** labels (`**Colours**`) or a flat list. Slot and value each in their own
    backtick span (never the whole assignment in one span); the value is the first span after the slot.
  - **ADJUST** — a revised draft value, still `source: "proposed"` + `confidence: "hypothesis"`, gap OPEN.

  Silence, enthusiasm in prose, or the owner USING the draft promote nothing — the scoper's curator wall,
  inherited here as written.

## Logging a gap

Add a row to the Open Items / Gaps table in `RESIDENT.md`:

```
| ID      | Item            | Why it matters        | Severity   | Provenance        | Proposed resolution | Resolution target | Status |
| GAP-007 | <what's missing>| <why it's a must-have>| MUST-HAVE  | <provenance tag>  | <how to resolve>    | <file/section that receives the fill> | OPEN   |
```

- **ID:** `GAP-<NNN>`, zero-padded, sequential, never reused.
- **Severity:** MUST-HAVE / SHOULD / NICE (see `coverage-checklist.md`).
- **Provenance tag (where the gap originated):** `handoff-deliberate` (the scoper/owner deferred it on
  purpose) / `handoff-defect` (the handoff should have carried it but didn't) / `builder` (surfaced during
  the build) / `skill-scope` (outside what the skill can resolve). Seeds from the handoff's per-gap
  provenance tag; the builder owns the `GAP-NNN` formalization.
- **Resolution target (the instructive column):** WHICH file/section — existing or to-create — receives the
  answer when it arrives ("change/do this HERE when you have it"). Its reader is a NEW session's agent (or a
  human dev) landing the fix cold; a gap without a landing spot invites the fix to drift into the wrong layer.
- **Status lifecycle:** `OPEN` → `CLOSED (ratified)` when the owners decide and the canon is filled. Other
  terminal states: `DROPPED (OUT)` (decided not to do), `DEFERRED (NICE)`.
- Never fabricate content to close a gap. An empty slot with an honest GAP beats invented brand truth.

## When to log vs. fill

- If the published material (ANALYZE) or the ratified handoff (CREATE) gives the answer → fill the slot
  (with its provenance spine).
- If it does not, and the item is a must-have → log a MUST-HAVE gap with a proposed resolution the
  owners can ratify in one pass.
- If the brand genuinely does not use a dimension → write "not used" in the slot (not a gap).
- If a value exists only as an unconfirmed observation → fill at `confidence: hypothesis` and add a
  confirmation item; never silently promote it.

## The universality stress test (run before declaring done)

Pick three arbitrary artifacts the canon names nowhere — deliberately spanning media (e.g. one digital,
one print, one spatial/experiential). For each, walk the derivation method (ESSENCE → PRIMITIVES → GRAMMAR
→ DATA POINTER) and confirm the canon yields a correct, on-brand decision without enumerating that
artifact.

- If all three resolve → coverage holds.
- If one can't resolve → you found a real completeness gap (a missing rule or atom, not a missing
  catalog entry). Log it and, if a must-have, resolve it. A new section for that specific artifact is the
  wrong fix — add the generative rule/atom that was missing.

This test, not a longer checklist, is the real completeness guarantee.
