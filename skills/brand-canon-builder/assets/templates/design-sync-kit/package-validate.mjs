// package-validate.mjs — the kit's OWN offline pre-flight gate (run via `npm run validate`).
//
// This is the kit-shipped, toolchain-free honesty check the Stage-10 fidelity gate can run BEFORE any
// /design-sync round-trip — distinct from the live converter's own `.ds-sync/package-validate.mjs` (which
// the /design-sync tool stages server-side and runs on the uploaded bundle). This one only inspects what
// the kit can see locally, so the gate is honest + offline-runnable.
//
// Checks (each → a named [CODE], exit 0 if all pass, exit 1 on any fail):
//   [NO_DIST]       — the build emitted dist/index.es.js (the thing /design-sync ingests)
//   [NO_DTS]        — the .d.ts tree exists (the component API the converter reads)
//   [ZERO_MATCH]    — at least one PascalCase component is exported from the barrel (non-hollow lib)
//   [FONT_MISSING]  — every font-family referenced in styles.css resolves to a shipped @font-face / system
//                     stack (a referenced custom family with no @font-face is a fidelity-blocking GAP)
//   [RENDER_THIN]   — styles.css carries a real token closure (not just the @import) so designs aren't hollow
//
// Best-effort by design: run it after `npm run build`. A missing dist is recoverable ([NO_DIST] → run build).

import { readFile, stat } from "node:fs/promises";

const fails = [];
const ok = (msg) => console.log(`  ok   ${msg}`);
const fail = (code, msg) => { fails.push(code); console.error(`  FAIL ${code} — ${msg}`); };

async function exists(p) {
  try { await stat(p); return true; } catch { return false; }
}
async function read(p) {
  try { return await readFile(p, "utf8"); } catch { return null; }
}

// 1) dist + d.ts — what /design-sync ingests
if (await exists("dist/index.es.js")) ok("dist/index.es.js present");
else fail("NO_DIST", "dist/index.es.js missing — run `npm run build` first");

if (await exists("dist/index.d.ts")) ok("dist/index.d.ts present");
else fail("NO_DTS", "dist/index.d.ts missing — the converter reads the .d.ts tree as the component API");

// 2) at least one exported component (non-hollow lib)
const barrel = await read("src/index.ts");
if (barrel) {
  const exported = [...barrel.matchAll(/export\s*\{\s*([A-Z]\w*)/g)].map((m) => m[1]);
  if (exported.length) ok(`barrel exports ${exported.length} component(s): ${exported.join(", ")}`);
  else fail("ZERO_MATCH", "src/index.ts exports no PascalCase component — the library is hollow");
} else {
  fail("ZERO_MATCH", "src/index.ts not found — no component barrel");
}

// 3) styles.css closure: every referenced font-family has a shipped @font-face (or is a system stack)
const cssRaw = await read("styles.css");
// Strip CSS comments first: a commented-out @font-face is NOT a shipped face (don't let it mask a GAP).
const css = cssRaw == null ? null : cssRaw.replace(/\/\*[\s\S]*?\*\//g, "");
if (css) {
  const SYSTEM = new Set([
    "system-ui", "sans-serif", "serif", "monospace", "ui-sans-serif", "ui-serif",
    "ui-monospace", "cursive", "fantasy", "inherit", "initial", "-apple-system",
  ]);
  const declared = new Set(
    [...css.matchAll(/@font-face\s*\{[^}]*?font-family:\s*["']?([^;"'}]+)["']?/gis)].map((m) =>
      m[1].trim().toLowerCase()
    )
  );
  // families referenced by --font-* custom properties
  const referenced = new Set();
  for (const m of css.matchAll(/--font[\w-]*:\s*([^;]+);/g)) {
    for (const fam of m[1].split(",")) {
      const name = fam.trim().replace(/^["']|["']$/g, "");
      if (name && !SYSTEM.has(name.toLowerCase())) referenced.add(name);
    }
  }
  const missing = [...referenced].filter((f) => !declared.has(f.toLowerCase()));
  if (missing.length === 0) ok("every referenced font-family has a shipped @font-face (or is a system stack)");
  else fail("FONT_MISSING", `font-family with no @font-face: ${missing.join(", ")} — a core face missing is a fidelity GAP, never a silent fallback`);

  // 4) real token closure present (not just the @import line) so designs render non-hollow
  if (/:root\s*\{[^}]*--color-/s.test(css)) ok("styles.css carries a token closure (non-hollow)");
  else fail("RENDER_THIN", "styles.css has no :root token closure — designs would render hollow");

  if (!/@import\s+["']\.\/_ds_bundle\.css["']/.test(css))
    fail("CSS_BUNDLE_UNREACHABLE", 'styles.css must `@import "./_ds_bundle.css"` (the compiled component CSS)');
  else ok('styles.css @imports "./_ds_bundle.css"');
} else {
  fail("RENDER_THIN", "styles.css not found — no import closure");
}

if (fails.length) {
  console.error(`\npackage-validate: ${fails.length} gate(s) failed → [${fails.join("] [")}]`);
  process.exit(1);
}
console.log("\npackage-validate: all kit pre-flight gates pass.");
process.exit(0);
