# scheme-derive legibility-guard acceptance (the invisible-derived-text class)

Light palette: background L=0.99, text-tertiary L=0.94 (a faint label — legitimate in light). Naive dark
invert-L yields background 0.01 and text-tertiary 0.06 — ΔL 0.05: invisible text on a near-black scheme.
The post-derive legibility guard must push text-tertiary's L to ≥0.30 away from the nearest bg role.

Self-test (output tokens/schemes/ is a run artifact, gitignored):
`cd fixtures/scheme-derive/near-black && node ../../../scheme-derive.mjs .`
→ expect a `legibility-guard` console line and night.json text-tertiary L ≥ 0.30 away from background's L.
