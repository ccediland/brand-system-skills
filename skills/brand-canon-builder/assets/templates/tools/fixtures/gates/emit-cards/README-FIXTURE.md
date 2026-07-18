# emit-cards — the offline static-cards emitter (F4-01) acceptance

Twin minimal repos for `tools/emit-cards.mjs`, the OFFLINE `@dsCard` static-cards emitter (a capability of the
design-sync kit). Zero real brand content (Fixture demo). Each card is a self-contained HTML file rendered from
the canon (tokens + `canon/mark.svg`) with NO React, NO bundle, NO converter, NO NETWORK — the offline path
that makes `[NO_DIST]` a reviewable handoff state.

`clean/` — a minimal emitted repo (4 colours incl. one `proposed`/`hypothesis` draft · a display + body font ·
a mark) with the EMITTED cards frozen under `design-sync-kit/cards/`:
- `node ../../../emit-cards.mjs clean` re-emits BYTE-IDENTICAL cards (idempotent) — the self-test.
- `node ../../../emit-cards.mjs --check clean` → **exit 0**: every card's first line is the
  `<!-- @dsCard group="…" -->` marker and carries ZERO remote/script/@font-face/@import reference (the offline
  guarantee). 4 cards: 01-brand (the single-sourced mark, id="brand-mark" so audit-lint R6b reconciles it) ·
  02-color (swatches; the `proposed` draft renders "· provisional" in client vocab, never a GAP id) · 03-type
  (specimen from the font stacks; the card ships no remote font) · 04-components (buttons + scheme swatches).
- `node ../../../client-deny-lint.mjs clean/design-sync-kit/cards` → **exit 0**: the cards carry zero operator
  vocabulary (they land under the existing `design-sync-kit/** | client` surface row).
- run-gates board: **static cards PASS** · **custody manifest PASS** (each card records one
  `sources/MANIFEST.json` entry per canonical input; a canon change under a card → STALE FAIL).

`violation/` — the same repo with two DEFECT cards, one per failure mode:
- `05-remote.html` carries a remote CDN `@font-face` → `emit-cards --check` → **exit 1 [REMOTE_REF]** (a card
  that reaches the network is not offline — the exact compromise the frozen Onyx workaround still shipped).
- `02-color.html`'s note leaks operator vocabulary (`source: proposed`, `confidence: hypothesis`, `GAP-001`,
  `build-grade`) → `client-deny-lint` → **exit 1** (a client surface must read as brand copy — provisional
  status is sanctioned client vocab only, never the ladder/GAP/build plumbing).
