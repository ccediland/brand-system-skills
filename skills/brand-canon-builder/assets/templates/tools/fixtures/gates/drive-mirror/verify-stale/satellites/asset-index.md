# Asset & detail-doc index (drive-mirror verify-stale fixture)

<!-- FIXTURE: the remote checksum for assets/logo.svg does NOT match the local sha256 — a stale Drive copy
     (the changed binary was never re-uploaded). A mismatch is never tolerated → `drive-mirror.mjs --verify
     remote.json` FAILS (stale mirror, exit 1). -->

| Entry | Kind | Repo location | Drive (optional, same sha256) | Custody record | primary-master-for |
|---|---|---|---|---|---|
| brandbook (stated spec) | knowledge/source | sources/brandbook.txt | — | CHECKSUMS.txt | — |
| mark master | asset | assets/logo.svg | — | CHECKSUMS.txt + R6b single-source | mark |
