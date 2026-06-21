# Claude Design adapter — the optional projection add-on

Claude Design (claude.ai/design) is Claude's design tool: a user prompts a design agent and it builds live
UI from real React. Out of the box it uses generic components. This **optional** add-on makes the design
agent build with the **brand's own** components, so every design it produces is on-brand and maps 1:1 onto
shippable code. It is one more consumer of the canon — **never mandatory**, and brand-agnostic except inside
the adapter itself.

## When to attach it

Attach only when the brand wants a live, on-brand component library in Claude Design. A print-only or
not-yet-digital brand skips it entirely; the canon is complete without it.

## Shape (abstracted from a real kit)

A component **kit** (a projection of the canon) plus a `.design-sync/` control directory:

- **`config.json`** — the machine adapter manifest (package name, global name, target project id, build
  command, source dir, the generated CSS entry, extra fonts, the conventions header pointer, per-component
  overrides). Template: `assets/templates/claude-design-adapter/config.json`.
- **`conventions.md`** — the agent-facing header: the brand's GRAMMAR scoped to the kit (mood, scheme
  classes, the style-by-token-name idiom, where the truth lives, the hard brand rules, one idiomatic
  example). This is what keeps the design agent on-brand. Template: `…/conventions.md`.
- **`NOTES.md`** — the operational runbook + gotchas (re-sync in one pass; assets copied post-build; inline
  the mark as a data-URI; generated CSS entry; capture MIME patch; project-id bookkeeping). Template:
  `…/NOTES.md`.

## The invariant

**kit = constant, canon = variable.** The kit consumes tokens, the mark, and icons via `var(--*)` / asset
references and **never redefines** them. To re-theme, change the canon and re-project — never edit kit
values. This is exactly what makes the whole system a clone-per-brand template: swap the canon, rebuild the
kit.

## How to attach (builder steps)

1. Confirm the brand wants it (else skip).
2. Copy the adapter templates into the brand repo's kit directory (`.design-sync/`).
3. Fill the `{{...}}` fields in `config.json` and `conventions.md` from the canon (tokens, schemes, mark
   rules, voice). Derive every line — invent nothing.
4. Register Claude Design as a consumer in `projections.md`.
5. Hand off: the brand owner runs `/design-sync` from the kit dir (the design-sync skill does the upload).
   Building the component kit itself is the brand's web/stack work, not this builder's job — this adapter
   only provides the canon-faithful brief, token mapping, and conventions the kit and the sync consume.
