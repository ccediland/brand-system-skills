# Brand Canon Scoper — Proxy & multi-decider mechanics (gate 5)

The Stage-5 consolidation mechanics (`SKILL.md` §5) — load at that gate, and whenever the interlocutor is
not the owner in person. The elicitation machine's ledger already records WHO answered each probe
(`references/elicitation-machine.md` § The ledger); this reference defines what those answers are worth
and how many voices become one per-slot set. Brand-agnostic: roles and weights are mechanisms, never a
named demographic.

## Proxy-as-respondent — first-class, never an obstacle

The engagement is often RUN by a proxy — a consultant, an agency, a family member acting for the owner.
The scoper supports proxy-as-respondent without ever insisting on the literal owner:

- **Factual slots** — values observable or verifiable in the world (what assets exist and where, mark
  geometry the spec states, license state, which surfaces ship, who decides what): a proxy answers these
  reliably; the datum lands on the wire at `proxy-relayed` (the contract's rung for exactly this), with
  the provenance `owner` field naming the chain (`<owner> (via proxy: <who>)`).
- **Owner-meaning slots** — the WHY, personality, differential scales, resonance, value trade-offs,
  posture stances: a proxy's answer is NOT a ratification. It enters as `hypothesis` riding a
  to-confirm item routed to the owner (through the proxy is fine — a downloadable instrument travels;
  the answer that comes BACK owner-signed is what promotes), or it stays a GAP. Attitudinal data never
  rides `proxy-relayed` — the rung is factual-only by contract.
- **Post-answer source check.** After a proxy answers a meaningful slot, ask HOW they know: "did the
  owner state this, or is it your understanding?" Relayed-from-owner (cite when/where) vs
  proxy's-own-understanding are DIFFERENT provenances — the ledger records which, per answer; an
  unasked source check leaves the answer at the weaker reading.
- The gate-7a sign-off may itself be proxied — the contract's `RATIFIED{ by: proxy:<who, for whom> }`
  form records exactly that; the builder then inherits at `proxy-relayed`/`handoff-confirmed` semantics,
  never `owner-confirmed`.

## Multi-decider — separate capture, weighted consolidation, escalated conflict

When more than one person decides (partners, family generations, a board):

1. **Capture separately.** Each voice answers on its own — never a joint-session "we all agree" taken as
   consensus; positions are attributed per voice in the ledger (the viewpoints stay distinct until
   consolidation).
2. **Consolidate weighted, per slot.** For each canon slot, the named Accountable's position is decisive
   weight; Consulted voices inform; the weighting used is DECLARED in the consolidation record, never
   applied silently. Consolidation is a separate pass — after capture, never during it.
3. **Escalate what survives.** A disagreement that consolidation does not dissolve is ESCALATED as an
   explicit item — one line in the living questions doc, one entry in the wire's
   `UNRESOLVED CONFLICTS`, framed as "needs one decision" with the options attributed. The scoper never
   resolves it (the curator wall); a slot with two Accountables is itself such a conflict.
4. **The principal contact scopes who gets asked** — "ask only me and my partner, not the family" is a
   VALID scoping decision; it is recorded in the ledger (who was in scope, by whose call), so an
   unconsulted voice is a visible boundary, never a silent omission.

## Wire projection — existing carriers only

Everything above lands on literals the frozen contract already defines: `proxy-relayed` (factual rung) ·
`hypothesis` + to-confirm/GAP (attitudinal degradation) · `OWNERS` (per-slot Accountable) ·
`UNRESOLVED CONFLICTS` (escalated items) · `RATIFIED{ by: proxy:<who, for whom> }` (proxied sign-off) ·
provenance `owner: <owner> (via proxy: <who>)`. This reference adds process, not wire — no new field,
literal, or carrier.
