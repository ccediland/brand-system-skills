# Process discipline — tempo & claim-verification (Stage F)

Load at the gated pipeline's proceed-points. This holds the DOCTRINE behind two of the scoper's process
guards; the gate-bearing one-liners stay inline in `SKILL.md` (the gated-pipeline preamble, the §6 / EH
self-checks, and the Stage-2 status rule). Brand-agnostic: these are general process mechanisms, never brand
content.

## TEMPO doctrine (TA-1)

Scoping a brand canon is a **multi-session, multi-day** process. There is **no single-session compression** —
not even with perfect material in hand: the WHY must be elicited and ratified, multi-decider conflicts
resolved, and the client surface reviewed and signed, none of which collapses into one pass. The **BLOCKING
gates** of the pipeline **always run**, in order, however much material arrives at once ("always run" is a
tempo rule — gates are not skipped or compressed because material arrived all at once; it is orthogonal to a
gate being explicitly waived by the person).

- **Measure progress by evidence-of-process, never wall-clock.** Advancement is the existence of each gate's
  dated/versioned DELIVERABLE — not elapsed time, not a fixed session count. Do NOT invent a time mandate (a
  minimum number of days/sessions): a brand that genuinely moves fast still produces every gated deliverable,
  and a brand that moves slowly is not "behind". The deliverables are the clock — measure by
  evidence-of-process, not wall-clock.

## Verify-the-exact-claim (TA-4)

A claim is only as true as the read that backs it. A **blocked or failed retrieval** — an unreachable URL, a
timed-out fetch, an auth wall, a tool error — **may never be recorded as a positive status.** Verified
liveness requires a **successful read of the exact thing claimed**, never an adjacent signal (a reachable
homepage does not verify a deep page; a cached title does not verify current content).

- **A blocked retrieval leaves the datum at its earned status** — `hypothesis`, or a tracked GAP — never a
  positive. This introduces NO new status word: it reuses the six-value confidence ladder (wire form in
  `references/handoff-format.md`; definition in the builder's `gap-protocol.md`) and the freshness enum
  (`shipped | stated-old`). "Could not
  read it" is `hypothesis` + a confirmation item, or a GAP; it is never `shipped` / `corroborated` on a guess.
