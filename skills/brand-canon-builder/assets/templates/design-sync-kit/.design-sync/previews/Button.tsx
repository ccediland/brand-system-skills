// Authored preview for the Button component — one file per scoped component.
// Per the live /design-sync contract: authored previews/<Name>.tsx are YOURS and carry NO generated
// marker. The converter compiles this into the uploaded <Name>.html and stamps the first-line
// `<!-- @dsCard group="…" -->` marker itself (see _card-shape/preview-card.html for the emitted shape;
// a card missing that first line is [DSCARD_MISSING]).
//
// Each named export = one labeled card cell, graded on Styled / Complete / Plausible. Real props +
// realistic content (never foo/test); sweep the primary variant axis. BUILDER: author 2–6 per scoped
// component, ported from the repo's own usage examples where they exist.
import * as React from "react";
import { Button } from "../../src/components/Button.js";

export const Primary = () => <Button variant="primary">Get started</Button>;
export const Secondary = () => <Button variant="secondary">Learn more</Button>;
export const Accent = () => <Button variant="accent">Highlighted</Button>;
export const Disabled = () => <Button variant="primary" disabled>Unavailable</Button>;
