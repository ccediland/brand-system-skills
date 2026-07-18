# Asset & detail-doc index (drive-mirror verify-missing fixture)

<!-- FIXTURE: the remote checksum map OMITS assets/logo.svg — the file never uploaded. An absent remote
     checksum can never pass by silence → `drive-mirror.mjs --verify remote.json` FAILS (empty-pass guard,
     exit 1). This is the W-17 empty-round-trip guard. -->

| Entry | Kind | Repo location | Drive (optional, same sha256) | Custody record | primary-master-for |
|---|---|---|---|---|---|
| brandbook (stated spec) | knowledge/source | sources/brandbook.txt | — | CHECKSUMS.txt | — |
| mark master | asset | assets/logo.svg | — | CHECKSUMS.txt + R6b single-source | mark |
