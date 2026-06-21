# GAP protocol — how missing things are tracked, and the universality test

The canon is **always valid even when incomplete** (the Lego property). Anything missing is not a silent
hole — it is a tracked GAP with a proposed resolution. The brand owners *decide* design questions and the
decision is *stamped*; only non-design human decisions (legal, budget) are out of scope.

## Logging a gap

Add a row to the **Open Items / Gaps** table in `RESIDENT.md`:

```
| ID      | Item            | Why it matters        | Severity   | Proposed resolution | Status |
| GAP-007 | <what's missing>| <why it's a must-have>| MUST-HAVE  | <how to resolve>    | OPEN   |
```

- **ID:** `GAP-<NNN>`, zero-padded, sequential, never reused.
- **Severity:** MUST-HAVE / SHOULD / NICE (see `coverage-checklist.md`).
- **Status lifecycle:** `OPEN` → `CLOSED (ratified)` when the owners decide and the canon is filled. Other
  terminal states: `DROPPED (OUT)` (decided not to do), `DEFERRED (NICE)`.
- Never fabricate content to close a gap. An empty slot with an honest GAP beats invented brand truth.

## When to log vs. fill

- If the source material (brownfield) or the brief (greenfield) gives the answer → **fill the slot**.
- If it does not, and the item is a must-have → **log a MUST-HAVE gap** with a proposed resolution the
  owners can ratify in one pass.
- If the brand genuinely does not use a dimension → write **"not used"** in the slot (not a gap).

## The universality stress test (run before declaring done)

Pick **three arbitrary artifacts the canon names nowhere** — deliberately spanning media (e.g. one digital,
one print, one spatial/experiential). For each, walk the derivation method (ESSENCE → PRIMITIVES → GRAMMAR
→ DATA POINTER) and confirm the canon yields a correct, on-brand decision **without enumerating that
artifact**.

- If all three resolve → coverage holds.
- If one can't resolve → you found a real completeness gap (a missing rule or atom, not a missing
  catalog entry). Log it and, if a must-have, resolve it. **A new section for that specific artifact is the
  wrong fix** — add the generative rule/atom that was missing.

This test, not a longer checklist, is the real completeness guarantee.
