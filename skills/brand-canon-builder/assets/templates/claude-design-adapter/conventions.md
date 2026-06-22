# {{BRAND}} Design System — conventions (for the design agent)

<!-- GUIDE: This header is injected for the Claude Design agent so every design it builds is on-brand and
     made of the brand's real parts. It is the canon's GRAMMAR, scoped to the component kit. Derive every
     line from the canon — do not invent. Keep it short and idiomatic. -->

Mood (one line): {{from ESSENCE › Mood}}

## Setup & schemes
The kit ships {{N}} application scheme(s) ({{e.g. light / dark}}) as classes — apply `{{.scheme-class}}`
on a container to switch. Defaults to {{default scheme}}.

## Style by token name (never hardcode values)
Compose with the custom-property contract from `tokens/` — never literal colors or sizes:
- **Surfaces / text:** `var(--{{semantic-color-background}})`, `var(--{{semantic-color-foreground}})`
- **Action / accent / focus:** `var(--{{semantic-color-action}})`, `var(--{{semantic-color-accent}})`
- **Type:** `var(--{{semantic-font-family-heading}})`, `var(--{{semantic-font-family-body}})`
- **Space / radius / elevation:** `var(--{{spacing}})`, `var(--{{radius}})`, `var(--{{shadow}})`
- **Motion (opt-in):** {{motion classes/vars, if the brand moves}}

## Where the truth lives
Tokens in `tokens/`; per-component API in each component's `.d.ts` + `.prompt.md`. The repo is the source;
this kit re-projects it.

## Hard brand rules
- Use the mark component only — never recreate, recolor, or distort the mark.
- {{attention/accent ink discipline, e.g. the scarce ink is last and least}}
- Voice: {{anti-promise + lexicon — forbidden claims/terms}}

## Example
```jsx
{{one idiomatic, on-brand usage example with a real component}}
```
