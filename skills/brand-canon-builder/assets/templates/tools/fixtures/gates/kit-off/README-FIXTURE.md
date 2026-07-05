# kit-off — opt-out reconciliation acceptance (handoff DIRECTIVES beat defaults)

`clean/`: persisted handoff says `Claude Design component library: NO` and the repo carries zero Claude
Design artifacts → the reconciliation row PASSes (other rows of these minimal repos fail on unrelated
mandatory artifacts — only the opt-out row is asserted here).
`violation/`: same NO, but the repo carries `design-sync-kit/` AND a projections row registering Claude
Design → the reconciliation row FAILS (the opt-out-ignored class; exit 1).
Self-test: `node run-gates.mjs fixtures/gates/kit-off/clean` → opt-out row PASS ·
`…/kit-off/violation` → opt-out row FAIL. The synthetic kit-off handoff (`fixtures/handoff/`) is the
contract-side input these mirror.
