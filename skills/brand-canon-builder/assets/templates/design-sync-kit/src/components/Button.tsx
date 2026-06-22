import * as React from "react";

/**
 * Example component. BUILDER: replace with the brand's real components. Note the rule it models — every
 * value resolves from a `var(--token-*)` custom property (the canon's token spine), never a literal color
 * or size. Re-theme by swapping the canon and re-projecting; never edit values here (kit = constant).
 */
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visual emphasis, mapped to semantic color tokens. */
  variant?: "primary" | "secondary" | "accent";
}

const STYLES: Record<NonNullable<ButtonProps["variant"]>, React.CSSProperties> = {
  primary: { background: "var(--color-brand)", color: "var(--color-brand-fg)", border: "1px solid transparent" },
  secondary: { background: "transparent", color: "var(--color-fg)", border: "1px solid var(--color-border)" },
  accent: { background: "var(--color-accent)", color: "var(--color-fg)", border: "1px solid transparent" },
};

export function Button({ variant = "primary", style, children, ...rest }: ButtonProps) {
  return (
    <button
      style={{
        font: "inherit",
        fontWeight: 600,
        borderRadius: "calc(var(--radius) - 0.25rem)",
        padding: "0.7em 1.25em",
        cursor: "pointer",
        ...STYLES[variant],
        ...style,
      }}
      {...rest}
    >
      {children}
    </button>
  );
}
