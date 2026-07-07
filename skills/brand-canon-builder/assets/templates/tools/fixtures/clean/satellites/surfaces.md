# Surface manifest — who reads each surface (the deny-lint target list lives HERE, never auto-chosen)

<!-- GUIDE: every emitted surface belongs to exactly one class. The client-deny-lint takes its target list
     FROM the `client` rows of this table (via --manifest) — the linter never decides its own scope. Keep
     the table current when a surface is added: an unlisted client-facing surface silently escapes the
     firewall. Classes:
       client    — the owner/client reads it: FULLY scrubbed (zero operator vocabulary; sanctioned client
                   vocabulary only). The prototype/brandbook is THE total client review surface.
       ai-facing — an AI loads it to think/speak/design as the brand: epistemics INTACT (provenance,
                   confidence, GAP markers stay — scrubbing them makes the brain dumber and the deliverable
                   more misleading). The deny-lint does NOT run here.
       operator  — build/operator plumbing: full epistemics, full build vocabulary. -->

| Surface (path or glob) | Class | Note |
|---|---|---|
| prototype/*.html | client | the complete interactive brandbook — THE total client review surface |
| README.md | client | the repo's human front door |
| *-keystone.md | ai-facing | the brand's verbal mini-brain — epistemics intact by design |
| canon/*.md | ai-facing | the four-layer canon |
| canon/canon.json | ai-facing | machine mirror |
| tokens/** | ai-facing | the DTCG spine (provenance blocks live here) |
| satellites/*.md | ai-facing | registries (projections, this manifest, the asset index) |
| design-sync-kit/** | client | kit source is visible in Claude Design — scrubbed like client copy |
| RESIDENT.md | operator | living operator doc |
| CLAUDE.md | operator | dev doc |
| CHECKSUMS.txt | operator | custody hashes |
| sources/** | operator | sources of record (incl. the persisted handoff) |
| audit/** | operator | gate evidence, agent-gate walks, boards |
| tools/** | operator | the emitted gate suite |
