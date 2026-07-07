# Seeded brand — RESIDENT (SEEDED-VIOLATION fixture)

GAP-010 / GAP-011 / GAP-012 exist so the R2/R3 tokens are tracked (isolating their intended rule);
the R5 token deliberately has NO gap, and the R4 ghost value has NO gap.

## Open Items / Gaps

| ID      | Item                    | Why it matters     | Severity   | Provenance | Proposed resolution        | Status |
|---------|-------------------------|--------------------|------------|------------|----------------------------|--------|
| GAP-010 | r2bad provenance review | source discipline  | SHOULD     | builder    | owner ratifies or downgrades | OPEN   |
| GAP-011 | r3bad source-of-record  | hashed source      | MUST-HAVE  | builder    | hash + identity-verify       | OPEN   |
| GAP-012 | proposedbad quarantine  | proposed discipline | SHOULD     | builder    | owner ratifies or drops      | OPEN   |
| GAP-013 | selghost citation       | selector integrity  | SHOULD     | builder    | cite a real selector or none | OPEN   |
| GAP-014 | lineeof citation        | line integrity      | SHOULD     | builder    | cite a real line             | OPEN   |
| GAP-015 | pdfline citation        | page-not-line       | SHOULD     | builder    | cite page: on PDFs           | OPEN   |
| GAP-020 | scheme palettes (derived) | unratified        | SHOULD     | builder    | owner ratifies derived palette | OPEN   |
