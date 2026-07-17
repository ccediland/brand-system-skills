# Brand Canon Scoper — The elicitation machine (per-dimension state machine)

The method the gate-4 Elicitation instrument RUNS (`SKILL.md` §4; its frame step seeds the Stage-2
dimension map). Load it at Stage 2 (frame generation) and keep it loaded through gate 4. The gated
pipeline (`SKILL.md` § The gated pipeline) is
the MACRO sequence — stages and BLOCKING gates; this machine is the MICRO layer inside it: the lifecycle
of EVERY dimension in scope, from "named" to exactly one honest terminal state. Brand-agnostic by
construction: the machine is the mechanism; any brand only fills it in.

## The frame — generated from the profile, never walked from a checklist

The space of dimensions to elicit is GENERATED per client, not enumerated from a fixed list (a fixed
battery over-fits minimal brands and under-fits unusual ones — the anti-determinism rule applied to the
interview layer):

1. **Generate.** Analyze the client's profile (category, offering, audiences, material already surfaced)
   and derive the scope reaches this brand plausibly needs — the obstacle pattern (KAOS-style goal/obstacle
   analysis, van Lamsweerde & Letier): for each thing the canon must express, ask *what would prevent this
   brand from expressing it?* — each obstacle names a dimension to resolve. A restaurant plausibly reaches
   menus and uniforms; a law firm, document templates; retail, shelf display — ILLUSTRATIONS of derivation,
   never a category script.
2. **Meta-coverage guarantee.** The generated frame must cover every canon layer (INDEX / ESSENCE /
   PRIMITIVES / GRAMMAR), the treatments, the horizons, the posture, the explicitly-named
   `applied-expression/social` dimension, and `consultation-surface` — with one exemption:
   `consultation-surface` is FIXED (`always-required`, RV-4). It enters the frame for meta-coverage but
   sits OUTSIDE the lifecycle — never UNOPENED or OPEN, never probed; it projects the verbatim PERMANENT
   literal, and the compile guard's born-gap semantics never apply to it. A frame missing a layer is
   regenerated, not patched silently.
3. **Close the generation.** Ask the owner the open question ("what haven't we named?"); their
   confirmation ratifies the frame. The frame stays OPEN to additions until the 7b compile — a dimension
   discovered mid-flow, even during the gate-6/7a review (surfaced to the owner as a delta), ENTERS the
   frame and starts its lifecycle; it is never parked in prose. Only a dimension discovered after the
   seam is a `handoff-defect`.

Every dimension in the frame starts UNOPENED. An un-enumerated dimension remains the scoper's own defect
(`handoff-defect` — `SKILL.md` §2); the frame walk exists to make that class structurally rare.

## States — every dimension is in exactly one

| State | Meaning | Projects onto the handoff as |
|---|---|---|
| **UNOPENED** | in the frame, not yet elicited. **Born-gap: a dimension never opened ships as a gap — the default IS the gap, never silence** | `tagged-gap` |
| **OPEN** | elicitation in progress: probes issued, material arriving, not yet saturated | — (never crosses the seam; see § Compile guard) |
| **DECIDED** | a datum with an owner source behind it, carried at its EARNED spine status | `filled` |
| **NOT-USED** | the owner explicitly declared the brand does not use this dimension | `not-used(owner-declared) · BRIEF{ verbatim:"<confirming quote>" }` — the quote must appear in the signed brief, or the row compiles `tagged-gap` |
| **PROPOSED-QUARANTINE** | the owner ASKED for a draft; the scoper-authored value travels labeled | the WHY `PROPOSED` line (or a WHAT slot) at `source: proposed · confidence: hypothesis` riding a client-language gap — the contract's quarantine rule verbatim; a proposal never resolves or re-rows its dimension (the map row reflects whatever state the dimension itself earned) |
| **GAP** | needed but absent, unconfirmed, or unresolved at saturation | `tagged-gap` |

The four terminal states are the honest answers; OPEN and UNOPENED are process states. The "projects
onto" column names the DIMENSION MAP literals; a frame dimension whose home is another block terminates
onto THAT block's own contract literals — HORIZONS' `direction | not-relevant | tagged-gap`; POSTURE's
`none` / `→GAP` (EVERY posture gap ships as a GAPS-block row naming the field — both the `→GAP` literal
and a field with no gap literal of its own; the wire-check enforces the naming);
`filled(media-attached)` for media-carried dimensions. The OPTIONAL block never runs the lifecycle: it
resolves by the contract's own rule (scoper-WRITTEN `not used` / `demo-default-yes` /
`scope-expanding(demo-default-no)` under v0/DEMO), and the two directive slots (`Claude Design component
library`, `existing-component-stack`) MUST be filled — a gap there is a handoff defect, never a
resolution. Every terminal state lands on literals the contract defines — including the v6 evidence the
contract now demands with them (a NOT-USED row's confirming quote; the `BRIEF{}` lineage on ratified
lines): the machine produces the evidence, the contract carries it.

## Transitions — guards decide, prose never does

- **UNOPENED → OPEN (discrepancy-ordered selection).** Pick the next AREA by largest discrepancy against
  the coverage targets (constrained-CAT pattern, Kingsbury & Zara: area first, item improvised within):
  the fidelity contract's must-have slots and the canon layer with the biggest needed-vs-known delta
  outrank nice-to-haves. The ITEM asked within the area is improvised from the quarry (see § The quarry)
  against this brand's profile — never read off a script.
- **UNOPENED → OPEN (material-triggered).** Owner-volunteered material or an explicit owner declaration
  arriving for an unopened dimension opens it out of discrepancy order, recorded in the ledger as its
  first probe-yield; the terminal guards then apply as usual — an explicit "we don't use X" satisfies
  the NOT-USED guard.
- **OPEN → OPEN (signal-triggered probing).** Ambiguity, omission, or vagueness in an answer TRIGGERS the
  next probe (ambiguity is a resource pointing at tacit knowledge — Ferrari, Spoletini & Gnesi). Each
  probe and its yield (new material: y/n) is recorded in the ledger.
- **OPEN → DECIDED.** Guard: the datum has a real owner utterance behind it — or, for factual/observable
  slots ONLY, owner-supplied material — and carries the four-field spine at its earned status (the § EH
  self-check axes). An owner-meaning field with no real owner UTTERANCE stays un-DECIDED regardless of
  confidence: owner-supplied material SEEDS elicitation for those fields, never decides them.
- **OPEN → NOT-USED.** Guard: an explicit owner declaration about THAT dimension, named to the owner —
  never inferred from silence, a shrug, or category assumption. The guard CAPTURES the owner's declaration
  verbatim and routes it into the Final Brand Brief (gates 6–7a) — the wire row will carry that quote as
  `BRIEF{ verbatim }` and the wire-check verifies it against the signed brief: a declaration that never
  reached the brief cannot mint the row (it compiles `tagged-gap`). A blanket "mark the rest not-used" is
  answered WITH the ledger (showing what "the rest" is), offering the waive-to-visible-gaps route
  instead — a blanket never mints `not-used(owner-declared)` rows (and machine-side, a blanket line is not
  in the brief per-dimension, so the check kills what the discipline misses).
- **OPEN → PROPOSED-QUARANTINE.** Double guard: (a) the owner explicitly invited the draft for THAT slot
  ("propose one for us" — by, or relayed from, the slot's Accountable; a standing blanket invitation
  authorizes nothing beyond the slots it named) — proposing is never the default path; and (b) the
  curator wall (`references/process-discipline.md` § The curator wall): the draft is born labeled
  `source: proposed · confidence: hypothesis`, riding a client-language gap, pending ratification.
- **OPEN → GAP (saturation close, auditable).** N consecutive probes yielding no new material close the
  dimension's PROBING (operationalized saturation, Francis et al. 2010; default N=2, set per dimension
  BEFORE its first probe — any deviation from the default is recorded with its reason; what is auditable
  is the RECORD: probes issued · last new material · why it closed, in the ledger). A dimension saturated
  but unresolved closes as GAP with that record. Saturation ends the questioning, not the truth: a
  saturated close never upgrades to DECIDED without the DECIDED guard.
- **terminal → OPEN (reopen).** New material (a later session, a newly surfaced voice, a corrected fact)
  reopens the dimension; the ledger records the reopen and its date, and the reopen RESETS the
  dimension's saturation counter (prior probes remain in the ledger as history). A reopen after the
  gate-7a sign-off re-opens the affected line of the Final Brand Brief: 7b does not compile until that
  line re-ratifies (or the owner waives it — it then ships GAP with the reopen recorded); a reopen never
  silently diverges the compiled block from the signed brief.
- **terminal → GAP or NOT-USED (guard-regression).** A datum that fails the EH self-check
  (`SKILL.md` § EH self-check) re-statuses to GAP — or to an owner-declared `none` (NOT-USED, with its
  confirming quote) where the owner closed the field; those are the self-check's own two destinations. Corrupt or conflicting state
  records regress the dimension to OPEN (see § Failure modes) — a transition, not just table behavior.

**The gate-6 promote.** A datum rises above `hypothesis` only when the owner confirms that ITEM on the
gate-6 To-confirm surface; the promoted datum cites that confirmation and lands `owner-confirmed` — and the
confirmation must be RECORDED in the Final Brand Brief text: a promoted WHAT slot's wire line carries
`BRIEF{ verbatim | anchor }` that the wire-check verifies against the signed brief (a promote the brief
does not record cannot ship at owner-confirmed). An
item absent from the To-confirm surface is not promoted — there is no mid-interview or silent promote.

**Compile guard.** Gate 7b compiles only terminal states. Any dimension still OPEN or UNOPENED at compile
time resolves by its born-gap semantics: it ships as `tagged-gap`, explicitly, its reason recorded in the
ledger (a dimension still OPEN at compile is the scoper's own process defect — the gap ships, and the
ledger records why). The machine guarantees there is ALWAYS an honest resolution, so the downstream
parse-or-stop on the dimension map never receives an unresolved row from a well-run scoping.

## The ledger — where state lives (the scoper is chat-side; no filesystem)

The **dimension ledger** is the running per-dimension table: dimension · state · probes and yield ·
last-new-material · source/owner per answer (who answered — feeds the Stage-5 consolidation) · pending
signal. It lives on the **Internal status surface** (`SKILL.md` §6 — the operator surface that already
carries the dimension map + spine) and is SNAPSHOTTED inside every gate DELIVERABLE (dated ISO +
versioned, per the pipeline rule). State is evidence-of-process (the TEMPO doctrine): the deliverables
the owner keeps ARE the durable memory. Final projection: the handoff's DIMENSION MAP + GAPS blocks; the
full ledger travels in the scoping-doc when one exists (its manifest row is already in the contract). No
new carrier, no new artifact class.

## Failure modes — each degrades declared, never silent

| Failure | Behavior |
|---|---|
| The person skips ahead ("just compile it") | BLOCKING gates do not compress; the machine answers WITH the ledger: everything UNOPENED/OPEN would ship as a tagged gap — the owner is told exactly what a skip costs. A waive drops COVERAGE only (unopened/open dimensions → visible gaps, never silence); the status-integrity gates — the EH self-check, the §6 client-surface self-check, gate 5, the curator wall — are NEVER waivable: a waive changes what is elicited, never what a recorded datum's status claims. And gate 7a's approval is never waivable-INTO-compile: a waived 7a is a STOP, not a skip — without the sign-off, 7b never emits (the contract already forbids it) |
| Interrupted conversation / new session | State = the ledger snapshot in the last emitted DELIVERABLE; reload it and continue. Anything after that snapshot is RE-elicited, never reconstructed from memory |
| Corrupt or ambiguous state (conflicting snapshots, a self-contradicting row) | The affected dimension REGRESSES to OPEN and is re-confirmed with the owner — the machine never silently picks between two conflicting states |
| Gamed saturation (filler answers to close fast) | Saturation closes the probing only; without the DECIDED guard (a real owner source) the dimension closes GAP — filler can end the interview, never mint a decision |
| Frame blind spot (the profile analysis missed a dimension) | The open question + owner confirmation catch it at generation; one discovered later ENTERS the frame (it stays open to the 7b compile); one discovered after the seam is the scoper's `handoff-defect` — the existing accountability, unchanged |

## Enforcement — what is machine, what is honestly agent-side

The scoper runs in chat: everything scoper-side is **agent-gate** by construction (declared agent
discipline — the honest first-class status; there is no lint that runs in a conversation). What the
machine makes machine-checkable is its PROJECTION, which the builder's existing gates already hold:

| Piece | Enforced by |
|---|---|
| Frame meta-coverage · saturation records · ledger snapshots in deliverables | agent-gate (recorded evidence in the dated deliverables the owner keeps — chat-side; wire projection is DIMENSION MAP + GAPS only) |
| Every dimension resolved on the wire | parse-or-stop (builder Stage 0 — the dimension-map HALT already in the § Directives registry) |
| Quarantined proposals labeled + capped + riding a gap | lint downstream (the builder's audit-lint proposed-cap and gap-linkage rules) + the contract rule (`references/handoff-format.md` § Rules) |
| Born-gap (an unelicited field ships as a gap) | agent-gate scoper-side; parse-or-stop + lint at the destination |
| Compiled block ≡ signed brief (per-line lineage · not-used quotes · WIRE-CHECK counts) | agent-gate scoper-side (the 7b compile verbatim walk) + lint downstream (`tools/wire-check.mjs` — Stage 0 + the board row) |
| The curator wall | agent-gate (`references/process-discipline.md` § The curator wall — the written rule) |

## The quarry — banks feed the machine, they never drive it

`references/elicitation-bank.md` and `references/detection-batteries.md` are the QUARRY: method-sourced
question material the machine improvises from once the frame and the discrepancy order have picked the
area. No bank item is mandatory; no named framework is a required input (any scale the owner ratifies
carries); posture and horizons are dimensions OF the frame — their batteries are quarry under this same
rule, and an unelicited posture/horizon field is born a gap like any other. The bank is where questions
COME FROM; the machine is what decides WHETHER, WHEN, and WHY one is asked.
