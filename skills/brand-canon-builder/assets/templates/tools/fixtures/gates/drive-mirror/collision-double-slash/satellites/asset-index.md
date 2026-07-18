# Asset & detail-doc index (drive-mirror collision-double-slash fixture)

<!-- FIXTURE (regression guard, verify blocker #4): two rows share the basename logo.svg; their Drive columns
     are `brand/marks` and `brand//marks` — different STRINGS, but the live folder resolver drops the empty
     segment so BOTH resolve to the one Drive path `brand/marks/logo.svg`. The plan MUST canonicalize the
     folder the same way the live leg walks it, else the two rows produce two distinct keys, the collision
     check never fires, and file 2 silently overwrites file 1 in Drive (data loss). A correct plan collapses
     the `//` and FAILS on the collision (exit 1). A plan that keys on the raw string passes at exit 0 — so
     this fixture BITES only the fixed engine. -->

| Entry | Kind | Repo location | Drive (optional, same sha256) | Custody record | primary-master-for |
|---|---|---|---|---|---|
| logo (source capture) | asset | sources/logo.svg | brand/marks | CHECKSUMS.txt | — |
| logo (master) | asset | assets/logo.svg | brand//marks | CHECKSUMS.txt | mark |
