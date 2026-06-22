<!--
  conventions.md — the readmeHeader source (wired via .design-sync/config.json `readmeHeader`).
  The live /design-sync workflow has an "Author the conventions header" step that prepends this file
  verbatim to the generated README the design agent reads. It is the canon's GRAMMAR scoped to the kit;
  it is what keeps every design the agent builds on-brand. BUILDER: derive every line from the canon —
  invent nothing. Keep it short and idiomatic.
-->

# {{BRAND}} Design System — conventions (for the design agent)

**Mood (one line):** {{from ESSENCE › Mood}}

## Style by token name (never hardcode values)
Compose only with the custom-property contract from the token spine — never literal colors or sizes:
- **Surfaces / text:** `var(--color-bg)`, `var(--color-surface)`, `var(--color-fg)`, `var(--color-muted)`
- **Brand / accent:** `var(--color-brand)` / `var(--color-brand-fg)`, `var(--color-accent)`
- **Type:** `var(--font-display)`, `var(--font-body)`
- **Shape:** `var(--radius)`; spacing on the brand's scale

## Schemes
{{N}} application scheme(s) ({{e.g. light / dark}}); default {{default scheme}}.

## Where the truth lives
Tokens in `styles.css` / the canon's `tokens/`; per-component API in each component's `.d.ts` + `.prompt.md`.
The repo is the source; the kit re-projects it.

## Hard brand rules
- Use the **Mark** component only — never recreate, recolor, or distort the mark.
- {{accent/ink discipline, e.g. the scarce ink is last and least}}
- Voice: {{anti-promise + lexicon — forbidden claims/terms}}

## Example
```jsx
import { Button, Mark } from "{{@scope/brand-ds-kit}}";
<Mark size={40} />
<Button variant="primary">On-brand action</Button>
```
