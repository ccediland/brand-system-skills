# tokens-project fixture — object→string round-trip proof

Own acceptance fixture of `tools/tokens-project.mjs` (the consumer STRING projection of the spine).
The spine here is a minimal 3-tier set carrying every transform-relevant case:

- structured-OKLCH with `hex` fallback → the string projection must DROP the hex (`oklch(0.62 0.13 255)`),
- structured-OKLCH with `alpha: 0.5` → must project the alpha form (`oklch(0.7 0.1 20 / 0.5)`),
- plain-string dimension, fontFamily stack, and `{tier.category.name}` aliases → pass through untouched,
- `$extensions` (provenance) → dropped from the projection (provenance lives in the spine).

## Run + verify (from this directory)

    node ../../../tokens-project.mjs .
    diff -u expected/base.json tokens/web/base.json
    diff -u expected/semantic.json tokens/web/semantic.json
    diff -u expected/component.json tokens/web/component.json
    diff -u expected/MANIFEST.json sources/MANIFEST.json

All four diffs empty = PASS. `expected/` is the frozen truth (tracked); `tokens/web/` and `sources/`
are run artifacts (gitignored). The custody entries' `sha256` are the PARENT spine files' hashes —
deterministic, so the MANIFEST diff is byte-stable.
