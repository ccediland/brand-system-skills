# Verify note — F3 fix-pack: content-bind on the ratification act (2026-07-17)

Design/verify note for the post-F3 fix-pack on branch `claude/v6-f3-fix`. Records the adjudicated F3 defect
(§A, closed), the pre-existing baseline backlog it sits in (§B, declared), the incomplete coverage of the
original post-F3 verify, and the NEW pre-merge adversarial verify that gated this merge (§C). No transcripts,
no journals — the forensic lives local-only, off-repo (E-O1).

## The one mechanism

A **content-bind on the ratification act** in `audit-lint` R3, plus a **`ratified-proposal`** source terminal,
plus an **executable RATIFY loop** in `gap-protocol.md`. A token citing a `sources/ratification—<date>.md`
record must (1) point at a file that EXISTS and (2) have its CANONICAL value NAMED in that record's text —
the post-handoff analog of the wire verbatim-check's `BRIEF{}` content-bind. The matcher is a STRICT,
content-bind-local helper (`ratificationNamesValue`) — not the lenient R1 `valueInText` (see §C).

**Source-axis DECIDIDO — `proposed → ratified-proposal` (new enum value), NOT a carve in R2/R5.** Preserves
the `proposed` = quarantine invariant untouched (no dual-state muddying); the "was a proposal" lineage lives
permanently in the name (re-labeling to `owner-stated` erases the origin and is byte-identical to laundering —
provably the wrong terminal); earns its rise by a content-bound record, never by a label. Not a wire-contract
change (the ratification record is a Stage-0 `sources/` artifact, sibling to the signed-brief split).

## §A — the F3 defect, ADJUDICATED and CLOSED

Two findings from the original post-F3 harvest, adjudicated by the home base as ONE hole (both SOSTIENEN).

### A-F3-01 · BLOCKER · CLOSED
- **Claim:** a token carrying a value the ratification record never names ships at `confidence:owner-confirmed`
  by citing a genuine, correctly-hashed `sources/ratification—<date>.md`; audit-lint (R0–R8) + wire-check both
  PASS — no content-bind on the ratification act equivalent to the wire's `BRIEF{}`.
- **Evidence (file:line):** `audit-lint.mjs:296-308` (R3 bound hash→path only) · `audit-lint.mjs:242` (R1
  `valueInText` fired only on `corroborated`) · doctrine gap `gap-protocol.md:110-115`.
- **Fix:** R3 content-bind — the record must NAME the token's value (`ratificationNamesValue`) AND EXIST
  (`audit-lint.mjs` R3 content-bind loop). `gap-protocol.md § ratification loop` rewritten executable.
- **Fixture:** `fixtures/gates/t2-proposed/ratified-mismatch/` (blue token, record ratifies only terracotta).
- **Repro re-run:** `node audit-lint.mjs fixtures/gates/t2-proposed/ratified-mismatch` → **exit 1** on R3's
  content-bind alone; `.../ratified-clean` → **exit 0** (the legit RATIFY shape). Pre-fix the mismatch → exit 0.

### A-F3-02 · MAJOR · CLOSED
- **Claim:** following § Draft-from-recommendation's RATIFY exit literally (`confidence:owner-confirmed`,
  `source` untouched at `proposed`) gives audit-lint **exit 1** (R2 cap + R5), and no reference defines the
  ratified-proposal's `source` value — so a compliant builder is forced into the `owner-stated` relabel that
  A-F3-01 shows is the laundering shape.
- **Evidence (file:line):** `gap-protocol.md:110` (RATIFY exit named only the confidence axis).
- **Fix:** `source: ratified-proposal` terminal (audit-lint `SOURCE_ENUM` + R2 not-capped + R3
  ratification-bound + confidence owner-confirmed enforced); `gap-protocol.md § ratification loop` names the
  source axis explicitly and was RUN against the linter.
- **Fixture:** `fixtures/gates/t2-proposed/ratified-clean/` (the RATIFY happy path, exit 0 — previously
  un-lintable).
- **Repro re-run:** the legit ratified shape → **exit 0** (was exit 1 pre-fix).

## §B — the pre-existing baseline backlog (DECLARED, no fix here)

The original harvest surfaced 12 pre-existing baseline limits (predating F3, applying equally to ANALYZE).
Per P-J-01 (measure & declare, no extra mechanism), the fix closes only what its own mechanism reaches; the
rest are declared backlog. Two were RE-MEASURED against the fix:
- **E1 (ghost ratification record)** — a nonexistent `sources/ratification—*` with a fabricated CHECKSUMS
  hash. **CLOSED for ratification records** by the content-bind's `existsSync` requirement (repro: cite an
  absent record → exit 1). E1 for OTHER hashed files (ghost handoff) SURVIVES — R3 string-compares the hash
  without `existsSync` for non-ratification files (declared-open, unchanged by the fix).
- **E2 (owner-confirmed bound to the handoff/declared-spec alone, value never content-checked)** — SURVIVES;
  the golden legitimately carries owner-confirmed tokens citing `declared-spec`/handoff without a content-bind,
  so closing it would break the golden. Declared-open, NOT made worse by the fix.

The remaining 10 (one line each, repro pointers in the local harvest): B2 gap-ref escapes the brief-sweep ·
D1 fidelity master by path-not-hash · D2 §7a parser drops carriers to N/A on format · D3 `--medium non-visual`
self-asserted · D4 create.md §5 self-grading limit undeclared · E4 cross-wired gap · E5 fabricated
`BRIEF{verbatim}` on a PROPOSED line · E6 wire vocab does not force the PROPOSED provenance signature · E7
CREATE-wire with PROPOSED earns N/A · A2 WHAT-slot `proposed·owner-confirmed` passes wire-check. All
`contract_delta=0`, all baseline — backlog candidates for a later hardening pass, not this fix.

## §C — the NEW pre-merge adversarial verify (the F3 lesson, applied)

F3 merged with the §A BLOCKER because its verify ran AFTER merge. This fix ran a pre-merge adversarial verify
(3 fronts + a judge per finding, re-running every repro from scratch). It found **6 REAL new-in-fix holes** —
all in the FIRST implementation, which reused the lenient R1 `valueInText` for the content-bind. **4 blocked
the merge and were fixed; 2 were downgraded to declared-open residuals.** The convergent root cause and its
fix: a ratification seal is the TOP trust rung and needs a STRICT matcher, separate from R1 corroboration
(which is intentionally lenient — ≥2 agreeing sources tolerate slack). `ratificationNamesValue` was added
(content-bind-local; `valueInText` untouched, so R1's per-weight-face corroboration is unregressed).

### Judge table

| # | Finding | Sev | Verdict | Blocked merge | Resolution |
|---|---|---|---|---|---|
| 3 | Content-bind bypassed by the hex fallback — fabricated OKLCH ships owner-confirmed (valueInText short-circuits on the hex hit before checking components) | BLOCKER | CONFIRMED | ✅ yes | **FIXED** — strict matcher requires OKLCH components, never a hex-only hit. Fixture `ratified-hex-held/` (exit 1). |
| 2 | `valueInText` string branch launders a font family via substring-in-word ("Ares" ⊂ "shares") — a record silent on type ratifies it | MAJOR | CONFIRMED | ✅ yes | **FIXED** — string match is word-bounded (quoted-family or `\b`-bounded token). |
| 5 | Hex short-circuit launders a fabricated PRIMARY oklch under the seal (hex-OR-oklch, hex wins) | MAJOR | CONFIRMED | ✅ yes | **FIXED** — same strict-matcher change as #3. |
| 6 | Content-bind vacuous for every non-color ratified-proposal token (numeric / dimension-object) — `valueInText` `return true` default | MAJOR | CONFIRMED | ✅ yes | **FIXED** — strict matcher checks numbers/dimensions/arrays; an unverifiable shape FAILs, never a vacuous pass. |
| 1 | Content-bind checks value PRESENCE, not per-slot — a value the record names as REJECTED / for another slot passes | MAJOR | DOWNGRADED | ❌ no | **DECLARED-OPEN** (residual, contract_delta) — see below. |
| 4 | Content-bind does not bind the record to the token PATH — one record ratifies any slot carrying its value | MINOR | DOWNGRADED | ❌ no | **DECLARED-OPEN** (same axis as #1). |

### Post-fix re-run (the exact judge repros, re-run from scratch)
- hex-held fabricated OKLCH → **exit 1** · font "Ares"-in-"shares" → **exit 1** · non-color number/dimension →
  **exit 1** · legit number/dimension/font legitimately named → **exit 0** · `ratified-clean` → **exit 0** ·
  `ratified-mismatch` → **exit 1** · golden `fixtures/clean` → **exit 0** · `r1-font-norm` (R1 leniency
  intact) → **exit 0**. Suite 28/28.

### Declared-open residual (findings #1 + #4): per-slot binding
The content-bind is now VALUE-strict but not SLOT-bound: a record ratifying value X for slot A can be cited by
another token (slot B) also carrying X, and a value the record names in a "rejected" block still matches. The
judge downgraded both to non-blocking; closing them fully requires the ratification record to NAME the token's
slot/path near the value — a record-shape convention (`contract_delta` on #1). Deferred as a tracked residual
(RESIDENT OI-K) for operator adjudication, NOT expanded here (P-J-01: no extra mechanism without a decision).

### Original post-F3 verify — coverage was INCOMPLETE (recorded for honesty)
The verify that surfaced §A crashed with WSL: 5 attackers started, **3 returned results** (fronts B/D/E), front
A was rescued from its transcript (near-complete), front C was partial (2 of 4 attacks — value-swap and
reopen-rule un-run), and **the Judge phase never ran**. §A was adjudicated by the home base, not that verify's
judges. This pre-merge verify (§C) is the first COMPLETE adversarial pass on this mechanism; its front
`value-swap-C3` also covers the original front C's un-run attack 3.
