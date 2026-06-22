// One-command build for the F-026 package-shape kit.
// Emits dist/index.es.js (esbuild) + the .d.ts tree (ts-morph), the two things /design-sync ingests.
//
// BEST-EFFORT, NEVER A HARD-FAIL of the canon build: if a toolchain dep is missing, this exits non-zero
// and the converter later reports [NO_DIST] (recoverable — "run the build first"). The deterministic
// fidelity artifact is the HTML prototype (assets/templates/prototype/), which depends on none of this.
//
// Deps (installed in the kit, per the live /design-sync contract): esbuild + ts-morph + @types/react.

import { build } from "esbuild";
import { Project } from "ts-morph";

const ENTRY = "src/index.ts";
const OUT = "dist/index.es.js";

// 1) Bundle to a single ESM file with React/JSX externalised (the host provides React).
await build({
  entryPoints: [ENTRY],
  outfile: OUT,
  bundle: true,
  format: "esm",
  platform: "browser",
  jsx: "automatic",
  external: ["react", "react-dom", "react/jsx-runtime"],
  logLevel: "info",
});
console.log(`[build] wrote ${OUT}`);

// 2) Emit the .d.ts tree the converter reads as the component API contract.
const project = new Project({ tsConfigFilePath: "tsconfig.json" });
const result = project.emitToMemory({ emitOnlyDtsFiles: true });
let n = 0;
for (const file of result.getFiles()) {
  await import("node:fs/promises").then((fs) =>
    fs.mkdir(file.filePath.replace(/\/[^/]+$/, ""), { recursive: true }).then(() =>
      fs.writeFile(file.filePath, file.text)
    )
  );
  n++;
}
console.log(`[build] wrote ${n} .d.ts file(s)`);
