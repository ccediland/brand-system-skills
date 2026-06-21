# Handoff format

The scoper's only output is ONE self-contained, ready-to-paste block. The person pastes it into Claude Code
(in or next to the target repo) to invoke `brand-canon-builder`. Keep it complete but lean — capture what
changes the canon; let the builder elicit the rest and log gaps.

## Template

````
Use the brand-canon-builder skill to build a brand canon in this repo.

BRAND: <name>
OWNERS: <who ratifies design decisions>
MODE: <greenfield | brownfield>
TARGET REPO: <path or "this repo">

— WHY (essence) —
Category/positioning: <…>
Audience: <…>
Feel (is / never): <…> / <…>
Never claim (anti-promise): <…>
One line to be remembered by: <…>

— WHAT (primitives) —
Colors (value + intended meaning; mark Pantone/CMYK as authored if they print by them):
  - <name>: <hex/OKLCH> — <meaning> <[authored print: <pantone/cmyk>]>
Typefaces: display=<…>, body=<…>
Mark: forms present <wordmark/symbol/primary lockup/secondary/monogram/seal>; asset location <…>
Pattern/texture: <describe | none>
Spacing/feel: <…>

— HOW (grammar) —
Schemes: <e.g. light only | light+dark>
Voice do/don't: <…>
Uses motion? <yes+describe | no>   Uses surface depth? <yes | no>

— OPTIONAL —
Physical trust object: <describe | none>
Claude Design component library wanted? <yes | no>

— BROWNFIELD ONLY —
Sources (URL/location + which is freshest/shipped):
  - <repo/brandbook/library> — <fresh? shipped to prod?>
Known conflicts to reconcile: <…>

NOTES: <anything else the builder should know>
````

## Rules
- Fill only what the person actually provided; leave a field blank rather than inventing — the builder logs
  blanks as gaps for the owners to ratify.
- Record exact color values when known, and flag any Pantone/CMYK the brand prints by as **authored** (those
  are color truth and won't be re-derived from OKLCH).
- One block, fenced, self-contained. After it, tell the person: open Claude Code in the target repo and
  paste this; it will run brand-canon-builder.
