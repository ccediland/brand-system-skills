# Asset & detail-doc index — the ONE consultation map (emitted from the canon, never hand-maintained)

<!-- GUIDE: every brand resource — visual assets (marks, fonts, imagery, video) AND the knowledge docs that
     go DEEPER than the keystone (history, rules, catalogs, pricing, identity docs) — gets ONE row here.
     The repo location is MANDATORY; the Drive mirror column is OPTIONAL and ADDITIVE (same sha256 as the
     repo copy, so the mirror never breaks custody). Custody points at where the chain-of-custody RECORD
     already lives (sourceRefs / CHECKSUMS.txt / sources/MANIFEST.json) — this index AGGREGATES, it never
     re-homes a record. `primary-master-for` names the canon slot this file is the OFFICIAL primary master
     of (the gate binds `verified-primary` tokens to files marked here) — `—` for everything else.
     Emitted from the canon at build time (a hand-edited index is drift by construction); rows enter the
     reconciliation gate's scope: every repo path must resolve. -->

| Entry | Kind | Repo location | Drive (optional, same sha256) | Custody record | primary-master-for |
|---|---|---|---|---|---|
| brandbook (stated spec) | knowledge/source | sources/<brandbook file> | — | CHECKSUMS.txt | <slot | —> |
| mark master | asset | canon/mark.svg | — | CHECKSUMS.txt + R6b single-source | mark |
| persisted handoff | knowledge/source | sources/handoff—<date>.md | — | CHECKSUMS.txt (top of custody; contains the SIGNED BRIEF appendix) | — |
| persisted signed brief | knowledge/source | sources/brief—<date>.md | — | CHECKSUMS.txt (Stage-0 split of the appendix — the wire-check target) | — |
| token spine | knowledge | tokens/ | — | per-token provenance blocks | — |
