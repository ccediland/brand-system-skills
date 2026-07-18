# CREATE — authoring a canon from the ratified handoff (the rare exception)

Entered only when the handoff says `MODE: CREATE` — a genuinely new brand, or an explicit "design us a
new brand." This is never the default; ANALYZE is (`analyze.md`). The brand arrives with little or nothing
published — an idea, a name, maybe a logo and a feeling — but it does not arrive without a brief: the
scoper has already run the intake and ratified the WHY. CREATE authors *from that ratified handoff* — at
each line's own `BRIEF{}` status (the signing act ratifies nothing per wrapper; a `none — compiled` line
authors at `hypothesis`) — it does not start a fresh interview. The Lego property still holds: scaffold the full canon immediately, fill
what the handoff supports, and log the rest as GAPs the owners can ratify. Never invent brand truth to
fill a slot, and never re-elicit or re-infer the WHY — a GAP in the handoff stays a GAP.

## 1. Scaffold first

Copy the full template set into the brand repo before authoring anything. The skeleton — every layer, every
slot, the token spine, the satellites, the docs — exists from minute one. This is what makes the repo valid
even when empty. (Stage 1 also creates `assets/` and `sources/`, per the `assets/`+`sources/` convention — even in CREATE,
any owner-supplied logo/font lands there.)

## 2. Consume the handoff in the order of the four questions

The scoper handoff is the brief. Read it in derivation order, because later answers depend on earlier ones —
consume, don't re-interview:

1. **Why (ESSENCE):** fill directly from the handoff's `WHY (essence) — RATIFIED` block — what the brand is,
   who it is for, how it should feel, what it must never be / never claim, the one line it wants remembered,
   the onliness, the RTB, the voice — each line consumed AT its `BRIEF{}` status (verified lines fill as
   inherited ratification; `none — compiled` lines fill at `hypothesis`). The *meaning of each atom* is set
   here, from the ratified WHY — never re-derived by the builder.
2. **What (PRIMITIVES):** the fixed atoms — colors (with roles + meaning), typefaces, the mark and its
   forms, any pattern, spacing feel. Take owner-provided values (declared Pantone, `authored-print`) as
   truth; capture measurable values into the token spine. `intent` from the handoff seeds per-atom meaning.
3. **How (GRAMMAR):** the combination rules implied by the above — scheme(s), contrast discipline, mark
   selection, type pairing, voice enforcement, and any motion/depth if the brand moves. Seed `G-*`/`ALGO-*`
   from the handoff's `generative-rule seeds (if/then)`.

Fill only what the handoff supports. Don't force optional dimensions — a brand with no motion writes "not
used". Anything the handoff leaves open is a GAP, not a builder guess.

## 3. Decide colors on the OKLCH spine

Author colors as OKLCH (the spine). If the brand will print and declares a spot/CMYK build, capture that as
an authored value in `$extensions` (not re-derived from OKLCH); otherwise hex/rgb are derived. See
`token-spine.md`.

## 4. Fill, gap, stress-test

Fill every slot the brief supports; log a GAP for every unmet must-have with a proposed resolution; mark
genuinely-unused dimensions "not used". Run the universality stress test (three unnamed artifacts) before
declaring the first pass complete. Hand the owners a canon that is valid today and has a short, ratifiable
gap list — not a blocked, empty shell.

## 5. Per-stage seams — CREATE downstream (what changes after authoring, and what doesn't)

The stages downstream of authoring consume the SAME machinery as ANALYZE; CREATE changes only where the
source-of-record comes from. Stage by stage:

- **Treatments (Stages 5/8 — `reproduction-router.md` § Mode seam):** there is no Stage-5 capture to
  harvest; a treatment is AUTHORED (designed from the ratified WHY) and the router still picks its
  production method by class — method selection is mode-agnostic. The vector-trace row is inapplicable
  unless the owner supplied artwork (then it is an owner-supplied asset, handled as in ANALYZE).
- **Fidelity (Stage 10 §7a) — EXECUTE the no-source branch, don't just cite it:** for every NON-WAIVABLE
  carrier with an authored master, the AUTHORED MASTER IS the source-of-record: run
  `python tools/fidelity-diff.py --treatment <id> --source <authored master render/export> --reproduction
  <emitted artifact>` so every rendered instance measures against the master (drift between the master
  and what the prototype/kit actually renders is exactly what the gate exists to catch); persist
  `audit/fidelity/<id>/scores.json` like any run. Where a carrier has NO authored master yet (a pure GAP),
  leave the runner's honest NOT-RUN (its instruction names this branch) or declare the medium N/A — never
  a hand verdict, never silence, and NEVER a FAIL for lacking what CREATE by definition lacks (W-15).
- **Audit (Stage 10):** the wire verbatim-check resolves honestly by the wire's own content — an
  all-empty CREATE wire (no ratification markers, no signed brief) is N/A(declared); a CREATE wire WITH a
  ratified WHY carries its brief and gets the full check like any wire. audit-lint runs unchanged — the
  provenance discipline below is what it will find.
- **Kit (Stage 8):** unchanged — the `Claude Design component library:` slot is read from the persisted
  handoff (destination-elicited, scoper-side) and reconciled by the existing gate; cards/prototype render
  from the AUTHORED canon exactly as they would from a harvested one.
- **Keystone (Stage 8.5):** mode-agnostic BY CONSTRUCTION (`keystone-emit.md` § Mode note) — it reads
  every datum's confidence FROM the token/canon/carrier, never from how the datum was obtained. In CREATE
  most carriers arrive `hypothesis`/GAP, so the keystone ships LABELED rules/pairs and tagged GAPs — never
  a fabricated settled voice.

## 6. Provenance discipline — CREATE (what authored truth is, and what it can never claim)

Everything the builder generates in CREATE is **builder-authored**: it enters the spine/canon at
`source: "authored"` (the source axis) · `confidence: "hypothesis"` (the epistemic axis — the two are
orthogonal), riding a client-language gap ("pending owner ratification"). Owner-supplied values in the
handoff keep the status their wire line earned (`BRIEF{}`/PROVENANCE per line) — authoring never upgrades
them. What CREATE output can NEVER claim: `verbatim` or `owner-confirmed` without an owner act —
structurally impossible under the v6 wire (an owner-confirmed claim needs a verified `BRIEF{}` line; the
builder never stamps ratified rungs on its own output), and a discipline here regardless: an authored
value that later pleases the owner is RATIFIED then (tier-2, recorded), never retroactively relabeled as
having been theirs. And the standing law, unchanged by any seam in this file: the WHY is never re-elicited
(a GAP in the handoff STAYS a GAP — authoring fills expression slots the ratified WHY supports, it never
manufactures the WHY itself), and no downstream seam re-opens elicitation.
