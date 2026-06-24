import * as React from "react";

/** CLEAN fixture Mark — geometry inlined VERBATIM from canon/mark.svg (R6b byte-equal, modulo JSX self-closing). */
export function Mark({ size = 32, label = "Brand" }: { size?: number | string; label?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" role="img" aria-label={label}>
      <rect x="2" y="2" width="28" height="28" rx="8" fill="var(--color-brand)" />
      <circle cx="16" cy="16" r="7" fill="var(--color-brand-fg)" />
    </svg>
  );
}
