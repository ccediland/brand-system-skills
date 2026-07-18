# Asset & detail-doc index (drive-mirror stale-custody fixture)

<!-- FIXTURE: the CHECKSUMS.txt hash for brandbook.txt does NOT match the on-disk bytes. The mirror never
     uploads bytes whose custody hash is wrong → `drive-mirror.mjs --plan` FAILS (stale custody, exit 1). -->

| Entry | Kind | Repo location | Drive (optional, same sha256) | Custody record | primary-master-for |
|---|---|---|---|---|---|
| brandbook (stated spec) | knowledge/source | sources/brandbook.txt | — | CHECKSUMS.txt | — |
