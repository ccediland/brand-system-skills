# Asset & detail-doc index (drive-mirror verify-clean fixture)

<!-- FIXTURE: the remote checksum map (remote.json) carries a matching sha256 for EVERY mirrored file →
     `drive-mirror.mjs --verify remote.json` → exit 0 (round-trip integrity confirmed). -->

| Entry | Kind | Repo location | Drive (optional, same sha256) | Custody record | primary-master-for |
|---|---|---|---|---|---|
| brandbook (stated spec) | knowledge/source | sources/brandbook.txt | — | CHECKSUMS.txt | — |
| mark master | asset | assets/logo.svg | — | CHECKSUMS.txt + R6b single-source | mark |
