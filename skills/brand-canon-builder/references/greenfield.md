# Greenfield — building a canon from a brief (or from nothing)

A greenfield brand arrives with little or nothing — an idea, a name, maybe a logo and a feeling. The Lego
property still holds: scaffold the full canon immediately, fill what the brief supports, and log the rest
as GAPs the owners can ratify. **Never invent brand truth to fill a slot.**

## 1. Scaffold first

Copy the full template set into the brand repo before eliciting anything. The skeleton — every layer, every
slot, the token spine, the satellites, the docs — exists from minute one. This is what makes the repo valid
even when empty.

## 2. Elicit in the order of the four questions

Interview (or read the SCOPER handoff) in derivation order, because later answers depend on earlier ones:

1. **Why (ESSENCE):** what is this brand, who is it for, what should it feel like, what must it never be /
   never claim, what is the one line it would want remembered. Decide the *meaning of each atom* here.
2. **What (PRIMITIVES):** the fixed atoms — colors (with roles + meaning), typefaces, the mark and its
   forms, any pattern, spacing feel. Capture measurable values straight into the token spine.
3. **How (GRAMMAR):** the combination rules implied by the above — scheme(s), contrast discipline, mark
   selection, type pairing, voice enforcement, and any motion/depth if the brand moves.

Ask only what changes the canon. Don't force optional dimensions — a brand with no motion writes "not used".

## 3. Decide colors on the OKLCH spine

Author colors as OKLCH (the spine). If the brand will print and declares a spot/CMYK build, capture that as
an **authored** value in `$extensions` (not re-derived from OKLCH); otherwise hex/rgb are **derived**. See
`token-spine.md`.

## 4. Fill, gap, stress-test

Fill every slot the brief supports; log a GAP for every unmet must-have with a proposed resolution; mark
genuinely-unused dimensions "not used". Run the universality stress test (three unnamed artifacts) before
declaring the first pass complete. Hand the owners a canon that is valid today and has a short, ratifiable
gap list — not a blocked, empty shell.
