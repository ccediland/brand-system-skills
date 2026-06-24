# GAP protocol — how missing things are tracked, the provenance spine, and the universality test

The canon is always valid even when incomplete (the Lego property). Anything missing is not a silent
hole — it is a tracked GAP with a proposed resolution. The brand owners *decide* design questions and the
decision is *stamped*; only non-design human decisions (legal, budget) are out of scope.

## The provenance spine (every datum carries it)

Generalizes v2's per-color `source:"authored"|"derived"` flag to *every* datum the builder records, not just
colors. Each datum carries four fields:

- **source** — where it came from: `declared-spec` (the brand's stated truth) / `owner-stated` /
  `extracted-vector` / `computed-css` / `design-file` / `matched` / `traced` / `inferred`.
- **confidence** — `hypothesis` (observed/derived, unconfirmed) → `corroborated` → `owner-confirmed` (the
  owner ratified it). **The ladder is a GATE, not a gloss (MT-4, enforced by `tools/audit-lint.mjs` R1/R2):**
  `corroborated` requires **≥2 _distinct_ source artifacts that agree** — two references to the *same* file is
  one source, not corroboration; and a value whose `source` is `inferred` or `matched` is **capped at
  `hypothesis`** — it may never be stamped `corroborated`/`owner-confirmed` on inference alone (a
  `source: inferred` + `confidence: corroborated` token is the exact contradiction the lint rejects).
- **owner** — who ratifies it (the Accountable for that slot, from the handoff `OWNERS`).
- **freshness** — the pinned value enum `shipped | stated-old` (`shipped` = fresh/live; `stated-old` =
  declared but not the current shipped reality). The same two literals are used at every hop — the handoff
  manifest `fresh:`, the handoff PROVENANCE `freshness:`, and the build — so a value never drifts label.

Hard rules:
- **Observed expression enters as `hypothesis`, never as a finding.** A sampled color, a matched font, a
  harvested treatment — all enter at `hypothesis` and are owner-confirmed before they become canonical brand
  truth.
- **Promoting an observed one-off to a brand *line* (a rule) requires `owner-confirmed`.** The builder never
  crystallizes an unconfirmed observation as a GRAMMAR rule on its own.
- **A datum is never used at a status it has not earned.** The `authored|derived` flag in the token spine
  (`token-spine.md`) is this spine's color-specific projection: `source: declared-spec`/`owner-stated` →
  `authored` (never re-derived); `source: computed-css`/`matched`/`inferred` → `derived`.
- **No `corroborated`/`computed-css` value without a hashed, identity-verified source-of-record (MT-3,
  `audit-lint.mjs` R3).** Any token at `confidence: corroborated`/`owner-confirmed`, or with `source:
  computed-css`, MUST carry a `$extensions.brand.sourceRef` whose `sha256` is listed in `CHECKSUMS.txt` — and
  the build SHA-256-hashes **every file under `sources/**`** into `CHECKSUMS.txt` (`asset-acquisition.md`), so
  the source-of-record is auditable. The source must be **identity-and-date verified** before it is trusted:
  the snapshot is confirmed the right brand (not a prior/later occupant) and its capture date reconciled
  against the page's self-reported "Last Published" — `tools/source-recover.py` surfaces those signals, the
  Stage-3 agent adjudicates them. An unhashed or unverified source keeps the value at `hypothesis` or makes it
  a GAP; it is never silently promoted.

## Logging a gap

Add a row to the Open Items / Gaps table in `RESIDENT.md`:

```
| ID      | Item            | Why it matters        | Severity   | Provenance        | Proposed resolution | Status |
| GAP-007 | <what's missing>| <why it's a must-have>| MUST-HAVE  | <provenance tag>  | <how to resolve>    | OPEN   |
```

- **ID:** `GAP-<NNN>`, zero-padded, sequential, never reused.
- **Severity:** MUST-HAVE / SHOULD / NICE (see `coverage-checklist.md`).
- **Provenance tag (where the gap originated):** `handoff-deliberate` (the scoper/owner deferred it on
  purpose) / `handoff-defect` (the handoff should have carried it but didn't) / `builder` (surfaced during
  the build) / `skill-scope` (outside what the skill can resolve). Seeds from the handoff's per-gap
  provenance tag; the builder owns the `GAP-NNN` formalization.
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
