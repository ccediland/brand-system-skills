# notes/ — the design & verify trail (build provenance, by cycle stage)

Point-in-time design notes and adversarial-verify records, one per mechanism as it was built. They are
**provenance, not living docs** — each captures the decisions + the verify findings AT that stage; the durable
record is `RESIDENT.md` (`## v5` / `## v6` + `### Log del ciclo`) and the per-item `PLAN-V*.md` Session log.
Kept out of the repo root so a fresh reader sees the canonical docs first; referenced here by stage ID.

## v5 (E-stages — plugin 0.5.0)

- [design-note-e1-02-handoff-contract—2026-07-05.md](design-note-e1-02-handoff-contract—2026-07-05.md) — E1-02, the frozen Chat→Code handoff contract.
- [design-note-e1-03-gate-status—2026-07-05.md](design-note-e1-03-gate-status—2026-07-05.md) — E1-03, the gate status board (`run-gates.mjs`).
- [design-note-e2-05-06-visual-keystone—2026-07-06.md](design-note-e2-05-06-visual-keystone—2026-07-06.md) — E2-05/06, the VISUAL keystone.
- [design-note-e3-01-elicitation-machine—2026-07-06.md](design-note-e3-01-elicitation-machine—2026-07-06.md) — E3-01, the scoper elicitation state machine.

## v6 (F-stages — plugin 0.6.0)

- [design-note-f2-01-wire-contract-v6—2026-07-16.md](design-note-f2-01-wire-contract-v6—2026-07-16.md) — F2-01, the wire contract v6 (per-line BRIEF{} lineage, `wire-check.mjs`).
- [verify-note-f3-fix-ratification-content-bind—2026-07-17.md](verify-note-f3-fix-ratification-content-bind—2026-07-17.md) — F3 fix-pack, ratification content-bind (R3).
- [verify-note-oik-path-section-bind—2026-07-17.md](verify-note-oik-path-section-bind—2026-07-17.md) — OI-K, path-bind + section-scope of the content-bind.
- [design-note-f4-01-offline-cards-emitter—2026-07-17.md](design-note-f4-01-offline-cards-emitter—2026-07-17.md) — F4-01, the offline static-cards emitter (`emit-cards.mjs`).
- [design-note-f5-01-drive-mirror—2026-07-17.md](design-note-f5-01-drive-mirror—2026-07-17.md) — F5-01, the Drive mirror (`drive-mirror.mjs` + emitted Action).
- [f5-drive-mirror-wiring-checklist—2026-07-17.md](f5-drive-mirror-wiring-checklist—2026-07-17.md) — F5, the mirror user-acceptance runbook (opt-in wiring).
- [design-note-f6-01-integration—2026-07-18.md](design-note-f6-01-integration—2026-07-18.md) — F6-01, the v6 mechanisms exercised together (integration).

Not here (canonical, stays at root): `brand-system-skills-v5-analysis_2026-07-04.md` (the frozen v5 analysis —
part of the resume reading order in `RESIDENT.md`), `PLAN-V5.md` / `PLAN-V6.md`, `README.md`, `RESIDENT.md`,
`CLAUDE.md`.
