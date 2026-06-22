# {{BRAND}} — DATA POINTER  *(satellite · not canon)*

<!-- GUIDE: This file points at volatile values; it NEVER stores them, not even as a snapshot. The canon
     describes the MODEL of the data (what exists, what it means); the VALUES live in the source system and
     are read from there. This keeps the canon timeless: prices, hours, inventory, contact details change
     without ever touching a canon layer. If the brand has no volatile data yet, keep the table empty and
     log it as a NICE gap. -->

> Rule: read the value from its source, not from this repo. The canon defines the model; the values
> live outside. Never freeze a volatile value into a canon layer.

## Where the data lives

| Datum (model) | Today (source) | Tomorrow (intended datastore) | Notes |
|---|---|---|---|
| {{e.g. pricing}} | {{e.g. a sheet / json file}} | {{e.g. a database table}} | {{1:1 mapping invariant across the migration}} |

## Inventory (what volatile data exists)

<!-- GUIDE: enumerate the TYPES of volatile data, anchored to whatever spine the brand uses (geography,
     product line, time). Values stay out. -->
| Datum | Entity | Notes |
|---|---|---|
| {{...}} | {{...}} | {{...}} |

## Out of canon (unratified)

<!-- GUIDE: park here any business-model artifact not yet ratified by the brand owners. It is not canon
     until ratified; keep it on the REMOVE manifest (projections.md) until then. -->
- {{...}}

## Future-proofing

Expansion = add records to the source, never edit the canon. Geography / product lines / time are data,
not text in a layer.
