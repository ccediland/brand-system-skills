import * as React from "react";

/**
 * The brand mark. BUILDER: inline the geometry FROM the single source `canon/mark.svg` (Stage 3) — copy
 * it verbatim so prototype.html, this component, and mark.svg stay byte-equal; audit-lint R6b FAILS the
 * build on any divergence (the mark is single-sourced, never re-typed per artifact). Inline it (not an
 * <img src> to an asset dir) so previews render self-contained in the design pane. The mark is never
 * recreated, recolored, or distorted by a consumer — that is a GRAMMAR rule.
 */
export interface MarkProps {
  /** Rendered height in CSS units. */
  size?: number | string;
  /** Accessible label for the logo. */
  label?: string;
}

export function Mark({ size = 32, label = "Brand" }: MarkProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      role="img"
      aria-label={label}
      style={{ display: "block" }}
    >
      <rect x="2" y="2" width="28" height="28" rx="8" fill="var(--color-brand)" />
      <circle cx="16" cy="16" r="7" fill="var(--color-brand-fg)" />
    </svg>
  );
}
