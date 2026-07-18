# Asset & detail-doc index (drive-mirror checksums-binary-stale fixture)

<!-- FIXTURE (regression guard, verify blocker #3): CHECKSUMS.txt is in sha256sum BINARY mode ("<hash> *path").
     The parser MUST read the `*path` line (a `*` captured into the path would silently drop the row and mirror
     0 files at exit 0 — the empty-pass bug). Here the recorded hash is WRONG, so a correct parser recomputes
     the on-disk bytes, sees the mismatch, and FAILS (exit 1, STALE). A parser that drops binary-mode lines
     would find nothing custodied and pass at exit 0 — so this fixture BITES only the fixed parser. -->

| Entry | Kind | Repo location | Drive (optional, same sha256) | Custody record | primary-master-for |
|---|---|---|---|---|---|
| brandbook (stated spec) | knowledge/source | sources/brandbook.txt | — | CHECKSUMS.txt | — |
