# CREATE — authoring a canon from the ratified handoff (the rare exception)

Entered **only** when the handoff says `MODE: CREATE` — a genuinely new brand, or an explicit "design us a
new brand." This is never the default; ANALYZE is (`analyze.md`). The brand arrives with little or nothing
published — an idea, a name, maybe a logo and a feeling — but it does **not** arrive without a brief: the
scoper has already run the intake and **ratified the WHY**. CREATE authors *from that ratified handoff*, it
does not start a fresh interview. The Lego property still holds: scaffold the full canon immediately, fill
what the handoff supports, and log the rest as GAPs the owners can ratify. **Never invent brand truth to
fill a slot, and never re-elicit or re-infer the WHY** — a GAP in the handoff stays a GAP.

## 1. Scaffold first

Copy the full template set into the brand repo before authoring anything. The skeleton — every layer, every
slot, the token spine, the satellites, the docs — exists from minute one. This is what makes the repo valid
even when empty. (Stage 1 also creates `assets/` and `sources/`, per the D2 convention — even in CREATE,
any owner-supplied logo/font lands there.)

## 2. Consume the handoff in the order of the four questions

The scoper handoff is the brief. Read it in derivation order, because later answers depend on earlier ones —
**consume, don't re-interview**:

1. **Why (ESSENCE):** fill directly from the handoff's `WHY (essence) — RATIFIED` block — what the brand is,
   who it is for, how it should feel, what it must never be / never claim, the one line it wants remembered,
   the onliness, the RTB, the voice. The *meaning of each atom* is set here, from the ratified WHY — never
   re-derived by the builder.
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
an **authored** value in `$extensions` (not re-derived from OKLCH); otherwise hex/rgb are **derived**. See
`token-spine.md`.

## 4. Fill, gap, stress-test

Fill every slot the brief supports; log a GAP for every unmet must-have with a proposed resolution; mark
genuinely-unused dimensions "not used". Run the universality stress test (three unnamed artifacts) before
declaring the first pass complete. Hand the owners a canon that is valid today and has a short, ratifiable
gap list — not a blocked, empty shell.
