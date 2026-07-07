// package-validate.mjs — the kit's OWN offline pre-flight gate (run via `npm run validate`).
//
// This is the kit-shipped, toolchain-free honesty check the fidelity gate can run BEFORE any
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
//   [CSS_BUNDLE_UNREACHABLE] — styles.css @imports "./_ds_bundle.css" (the compiled component CSS); without
//                     that import the component styles never reach the render
//
// Best-effort by design: run it after `npm run build`. A missing dist is recoverable ([NO_DIST] → run build).

import { readFile, stat, readdir } from "node:fs/promises";
import path from "node:path";

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
  const exported = [...barrel.matchAll(/export\s*\{([^}]*)\}/g)]
    .flatMap((m) => m[1].split(","))
    .map((s) => s.trim().split(/\s+as\s+/).pop().trim())
    .filter((n) => /^[A-Z]\w*$/.test(n));
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
  // families referenced by --font-* custom properties (--font-fallback-* is the DECLARED-substitute
  // channel, not a reference — handled below)
  const referenced = new Set();
  for (const m of css.matchAll(/--font[\w-]*:\s*([^;]+);/g)) {
    if (/^--font-fallback/.test(m[0])) continue;
    for (const fam of m[1].split(",")) {
      const name = fam.trim().replace(/^["']|["']$/g, "");
      if (name && !SYSTEM.has(name.toLowerCase())) referenced.add(name);
    }
  }
  // ANTI-GAMING: the requirement ALSO comes from the TOKEN SPINE (../tokens/*.json fontFamily leaves) —
  // outside this kit. Deleting a styles.css reference never removes the spine's requirement, so
  // "renaming your way past the gate" (dropping the reference and shipping a silent system fallback)
  // fails exactly like a missing face.
  const requiredBySpine = new Set();
  try {
    const tokDir = path.join("..", "tokens");
    for (const f of await readdir(tokDir)) {
      if (!f.endsWith(".json")) continue;
      let j; try { j = JSON.parse(await readFile(path.join(tokDir, f), "utf8")); } catch { continue; }
      (function walk(n, inheritedType) {
        if (n == null || typeof n !== "object") return;
        const type = n.$type ?? inheritedType;
        if (type === "fontFamily" && typeof n.$value === "string" && !/^\{.+\}$/.test(n.$value.trim())) {
          const first = (n.$value.match(/^"([^"]+)"/) ?? [])[1] ?? n.$value.split(",")[0].trim().replace(/^["']|["']$/g, "");
          if (first && !SYSTEM.has(first.toLowerCase())) requiredBySpine.add(first);
        }
        for (const [k, v] of Object.entries(n)) {
          if (!k.startsWith("$") && v && typeof v === "object") walk(v, type);
        }
      })(j, null);
    }
  } catch { /* no ../tokens — a standalone kit validates its own closure only */ }
  for (const f of requiredBySpine) referenced.add(f);
  // Declared-substitute channel (license-as-dependency posture): a non-redistributable face ships a DECLARED fallback in the bundled
  // files — `--font-fallback-<slug>: "<Real Family>" …;` names the real face and what serves it. That is a
  // VALID, honest exit-0 state (license gates redistribution, never capability); the real face still renders
  // locally. FONT_MISSING now means: a required family with NEITHER a shipped @font-face NOR a declared
  // fallback — a real defect, never a by-design deadlock.
  const fallbackDeclared = new Set(
    [...css.matchAll(/--font-fallback[\w-]*:\s*["']([^"']+)["']/g)].map((m) => m[1].trim().toLowerCase())
  );
  const missing = [...referenced].filter((f) => !declared.has(f.toLowerCase()) && !fallbackDeclared.has(f.toLowerCase()));
  if (missing.length === 0) ok(`every required font-family (styles.css refs + ${requiredBySpine.size} spine-required) has a shipped @font-face or a declared fallback`);
  else fail("FONT_MISSING", `font-family with no @font-face and no declared fallback: ${missing.join(", ")}${[...missing].some((f) => requiredBySpine.has(f)) ? " (spine-required — deleting the styles.css reference does not remove the requirement)" : ""} — a core face missing is a fidelity GAP, never a silent fallback`);

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
