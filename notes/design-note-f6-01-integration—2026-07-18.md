# Design note — F6-01: integration (the v6 mechanisms exercised together) + docs + bump v0.6.0

> v6 F6-01, the cycle-close integration. The five v6 stages built mechanisms designed to be orthogonal (compile
> seam · CREATE/T2 · emitter · mirror on the F1 spine) but never run through one flow at once. F6-01 answers:
> **does any mechanism step on another?** Treated as a mechanism stage → adversarial integration verify.

## The integration flow (offline, over the `clean` fixture)

`clean` already crosses every mechanism — a full canon + kit + `sources/` (handoff + signed brief) +
`asset-index` + `.github/workflows/drive-mirror.yml`, AND a `proposed` (quarantine) colour token. So the flow
is real, not staged-for-the-test. Staged to `$TMPDIR` (the committed fixture is never mutated), then:
`emit-cards.mjs` (F4) → `tokens-project.mjs` (F1) → `drive-mirror.mjs --plan` (F5) → `run-gates.mjs` (whole board).
Harness committed at `tools/fixtures/integration/README-INTEGRATION.md` (offline, always-on).

## What the integration revealed

The adversarial verify found ONE real collision — invisible in every isolated fixture, visible only running the
mechanisms together (see the judge table below): the derived-artifact custody producers left a dual-key
`{recovered, entries}` MANIFEST that let a precedence reader shadow `source-recover.py`'s recovered captures,
silently skipping the MT-3 identity/date gate. Fixed at both the reader (union) and the producers (one canonical
sorted key). With that reconciliation, the four cross-mechanism properties hold:

1. **Status survives proposed → card (no leak).** The `proposed` "Seasonal" colour renders in `02-color.html`
   with the sanctioned CLIENT marker `· provisional` — never a GAP id or a confidence grade — while every
   settled colour renders clean. The emitter reads confidence FROM the token; quarantine status reaches the
   client surface intact and the deny-lint (client scrub) passes (`provisional` is sanctioned client vocab).
2. **Proposed never reaches the mirror.** The mirror set is `asset-index ∩ CHECKSUMS` = the `sources/**`
   records; the proposed token lives in `tokens/` (not an asset-index row) → not mirrored. And the mirror
   copies bytes + stamps no status, so even an indexed proposed-derived file could not leak a false status
   THROUGH it.
3. **The custody producers coexist — one canonical MANIFEST (after the fix).** `emit-cards.mjs` and
   `tokens-project.mjs` both write `sources/MANIFEST.json`, each filtering out only ITS OWN `tool` rows,
   folding in every existing entry from ANY key (`{entries}` · bare array · `source-recover.py`'s
   `{recovered}`), and writing back ONE canonical, stably-sorted `{entries}` array — so they never clobber each
   other AND never leave a dual-key object (all 10 entries survive, byte-identical regardless of order/re-runs).
   The third producer, ratification records, takes a DIFFERENT path (`CHECKSUMS.txt` + R3 content-bind). This
   was the sharpest collision candidate (two producers, one shared file) — and it is where the verify found the
   blocker: before the fix, a `{recovered, entries}` dual-key let a precedence reader shadow the recovered
   captures. Now the reader unions every key and the producers never dual-key it.
4. **Every gate passes together.** `run-gates.mjs` returns zero FAIL with the whole board at once: audit-lint
   R0–R8 (R5 caps the proposed token), deny, wire-check, static cards (§3c), drive mirror plan (§3d), custody
   manifest (recomputes EVERY card + projection parent hash in one pass — cross-producer consistency),
   keystones, asset index, §1–§5. Verdict INCOMPLETE only for `[NO_DIST]` + the deferred red-team run — never a FAIL.

## Disposition of the 9 root notes (DECIDIDO)

The repo root should not carry 9 loose design/verify notes when v0.6.0 ships. DECIDIDO: a `notes/` folder holds
the per-stage design & verify notes + the F5 mirror wiring runbook (10 files), with `notes/README.md` as the
index (by cycle stage/ID). They are provenance, not living docs — kept, not deleted; the durable record stays
`RESIDENT.md` + the `PLAN-V*.md` Session log. Stays at root (canonical): `brand-system-skills-v5-analysis`
(part of the RESIDENT resume reading order), `PLAN-V5/V6`, `README`, `RESIDENT`, `CLAUDE`.

## Version bump v0.6.0

The plugin version lives in exactly two mirrored manifests: `.claude-plugin/plugin.json` and
`.claude-plugin/marketplace.json` (both were `0.5.0`). Bumped both to `0.6.0`. Every other `0.5.0` in the tree
is historical record (README version history · PLAN-V6 baseline line · RESIDENT `## v5` · PLAN-V5 ·
stress-test-v5) and correctly stays. README `## Status` + RESIDENT (`## v6`, TL;DR, repo map, reading order) +
CLAUDE (repo map, fixtures) updated to v6.

## Adversarial integration verify

4 atacantes (status-leak · double-custody · bump-stale · doc-drift) + juez por hallazgo. Journal respaldado a
`/mnt/c/Users/USER/verify-forensics/wf_fe9f2fb9-7c6--f6-integration` ANTES de lanzar. status-leak · bump-stale
· doc-drift salieron LIMPIOS; double-custody cazó **1 BLOCKER + 1 nit, ambos corregidos + re-verify CLEAR**.

| # | Frente | Hallazgo | Veredicto | Fix |
|---|---|---|---|---|
| — | status-leak | ¿proposed→card→manifest→mirror filtra status? | **LIMPIO** | proposed → card `provisional` (vocab cliente) · nunca al mirror (no en asset-index) · deny scrubbea — ya correcto |
| — | bump-stale | ¿strings v0.5.0 stale que mienten? | **LIMPIO** | los 2 manifests → 0.6.0 matched; el resto de 0.5.0 = registro histórico legítimo |
| — | doc-drift | ¿docs afirman lo que v6 ya no hace? | **LIMPIO** | tools-list/refs/paths verificados; notes/ resuelve; índice apunta a 11 existentes |
| B1 | double-custody | **`{recovered}` de source-recover SOMBREADO** por el `entries` de emit-cards/tokens-project → dual-key → run-gates lee por precedencia, `usedArchive` false, **el agent-gate MT-3 de identidad/fecha se salta en silencio (gate BLOCKING verde solo)** | **BLOCKER → cerrado** | reader UNE `entries` ∪ `recovered` ∪ bare-array (jamás sombra); productores gatheran de toda clave + escriben un `{entries}` canónico ordenado (sin dual-key). Fixture `custody/recovered-shadow` muerde |
| B2 | double-custody | MANIFEST no byte-idempotente (orden de bloques según último productor) | **nit → cerrado** | el sort estable del productor lo hace byte-idéntico sin importar orden ni re-corrida (HA=HB=HA2 verificado) |

**El verify de INTEGRACIÓN se pagó solo:** un mecanismo (F4/F1, custody de derivados) SÍ pisaba a otro
(Stage-3/MT-3 recovery custody) — invisible en cada fixture aislado, visible SOLO al correr los mecanismos
juntos. Cazado y cerrado antes del gate. El resto de la integración: **cero pisos, mecanismos ortogonales
confirmado** (con esta reconciliación de la forma del MANIFEST).

**Re-verify del fix (10 checks CLOSED + 1 residual):** el reader-unión + producer-canonicalization es sólido
(union safe en toda forma malformada · productores nunca dropean entries · byte-idempotente · sort no crashea ·
captureTs/url/sha256 sobreviven el flatten · el fixture muerde) — CERO hueco nuevo introducido. El re-verify
NOMBRÓ un residual **PRE-EXISTENTE fuera de scope → OI-L:** `source-recover.py` re-corrido tras un productor
Stage-8 clobbea las filas `entries` (nunca lee el MANIFEST; `json.dump` sobrescribe). Mitigado por orden de
pipeline (recover=Stage 3 antes de produce=Stage 8). Por P-J-01 se NOMBRA (candidato F6-03/backlog), NO se
tapa aquí — el fix recomendado es plegar source-recover al mismo contrato union-preserving.
