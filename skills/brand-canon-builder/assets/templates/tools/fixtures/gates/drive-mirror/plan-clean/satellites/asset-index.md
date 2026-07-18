# Asset & detail-doc index (drive-mirror plan-clean fixture)

<!-- FIXTURE: exercises the OFFLINE mirror plan — two custodied files mirror (one via a Drive-column
     override, one via the Kind default), and one Google Docs-Editors native file (.gsheet) is EXCLUDED
     BY NAME (no sha256Checksum → unverifiable, R-14). `drive-mirror.mjs --plan` → exit 0, exclusion logged. -->

| Entry | Kind | Repo location | Drive (optional, same sha256) | Custody record | primary-master-for |
|---|---|---|---|---|---|
| brandbook (stated spec) | knowledge/source | sources/brandbook.txt | — | CHECKSUMS.txt | — |
| mark master | asset | assets/logo.svg | brand/marks | CHECKSUMS.txt + R6b single-source | mark |
| roadmap (Google Sheet) | knowledge/source | sources/roadmap.gsheet | — | CHECKSUMS.txt | — |
