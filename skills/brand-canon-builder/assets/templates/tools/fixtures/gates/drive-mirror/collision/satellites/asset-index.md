# Asset & detail-doc index (drive-mirror collision fixture)

<!-- FIXTURE: two rows of the same Kind carry the same basename (logo.svg) with no disambiguating Drive
     column, so both resolve to the same Drive path `asset/logo.svg`. Two files cannot share one Drive
     path → `drive-mirror.mjs --plan` FAILS (target collision, exit 1). -->

| Entry | Kind | Repo location | Drive (optional, same sha256) | Custody record | primary-master-for |
|---|---|---|---|---|---|
| logo (source capture) | asset | sources/logo.svg | — | CHECKSUMS.txt | — |
| logo (master) | asset | assets/logo.svg | — | CHECKSUMS.txt | mark |
