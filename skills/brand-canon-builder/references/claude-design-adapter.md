# Claude Design adapter — the DEFAULT projection (canon → on-brand component library)

Claude Design (claude.ai/design) is Claude's design tool: a user prompts a design agent and it builds live
UI from real React. Out of the box it uses generic components. This add-on makes the design agent build with
the brand's own components, so every design it produces is on-brand and maps 1:1 onto shippable code. It
is one more consumer of the canon, brand-agnostic except inside the adapter itself.

## Default ON (v2 / F-026)

`OPTIONAL.Claude Design = YES` by default — the repo is born `/design-sync`-ready, and the compiled
component library is a default build output, not a deferrable gap. The old "Claude Design adapter? no"
default is retired. Emit the kit unless the owner explicitly opts out (e.g. a print-only or
not-yet-digital brand with no use for a live component library) — record the opt-out in `projections.md`.

The buildable package-shape scaffold is `assets/templates/design-sync-kit/`; the converter contract the
builder satisfies is `references/design-sync-kit.md`. This adapter is the canon→kit brief (token mapping,
conventions, runbook) the kit's `.design-sync/` consumes.

## Shape (abstracted from a real kit)

A component kit (a projection of the canon) plus a `.design-sync/` control directory:

- **`config.json`** — the machine adapter manifest (package name, global name, target project id, build
  command, source dir, the CSS entry, extra fonts, the conventions header pointer, and — only when a
  component actually needs one — a per-component `overrides.<Name>` tweak). There is exactly **one** config
  and it is the kit's own `.design-sync/config.json` (template:
  `assets/templates/design-sync-kit/.design-sync/config.json`; schema authority:
  `references/design-sync-kit.md`). This adapter directory ships no second config — a duplicate could
  contradict the kit's, and the converter validates only the kit's.
- **`conventions.md`** — the agent-facing header: the brand's GRAMMAR scoped to the kit (mood, scheme
  classes, the style-by-token-name idiom, where the truth lives, the hard brand rules, one idiomatic
  example). This is what keeps the design agent on-brand. Template: `…/conventions.md`.
- **`NOTES.md`** — the operational runbook + gotchas (re-sync in one pass; assets copied post-build; inline
  the mark as a data-URI; generated CSS entry; capture MIME patch; project-id bookkeeping). Template:
  `…/NOTES.md`.

## The invariant

kit = constant, canon = variable. The kit consumes tokens, the mark, and icons via `var(--*)` / asset
references and never redefines them. To re-theme, change the canon and re-project — never edit kit
values. This is exactly what makes the whole system a clone-per-brand template: swap the canon, rebuild the
kit.

## How to attach (builder steps)

1. Default ON — emit it unless the owner explicitly opted out (then skip and note the opt-out in
   `projections.md`).
2. Scaffold the buildable kit from `assets/templates/design-sync-kit/` (component source + one-command
   build + `.design-sync/` control dir, which already carries the single `config.json`). These adapter
   templates are the canon→kit brief (conventions + NOTES), not a second config — do not copy a config.json
   here.
3. Fill the `{{...}}` fields in the kit's `.design-sync/config.json` and `conventions.md` from the canon
   (tokens, schemes, mark rules, voice). Derive every line — invent nothing.
4. Register Claude Design as a consumer in `projections.md`.
5. Build best-effort (`npm run build` → `dist/`) if a Node toolchain is present; otherwise the build runs at
   `/design-sync` time (`[NO_DIST]` is recoverable, never a hard-fail). The owner runs `/design-sync` from
   the kit dir to upload. See `references/design-sync-kit.md` for the full converter contract.
