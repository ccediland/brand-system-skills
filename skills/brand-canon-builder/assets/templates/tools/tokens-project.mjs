#!/usr/bin/env node
// tokens-project.mjs — consumer STRING projection of the DTCG spine (zero-dep Node).
//
// WHAT: reads the spine (`tokens/base.tokens.json` · `semantic.tokens.json` · `component.tokens.json`)
//   and writes `tokens/web/{base,semantic,component}.json` — the SAME token tree with every
//   structured-OKLCH `$value` object serialized to the plain OKLCH string form a string-only
//   consumer ingests (`oklch(L C H)` / `oklch(L C H / a)`; serialization byte-matches the
//   audit-lint C-1 canonical serializer, so R6a-style reconciliation holds across the hop).
// WHY: downstream consumers built on Style Dictionary v5 reject object `$value` (SD splits
//   objects into `-value`/`-unit` sub-vars — SD bugs #1398/#1494); the web-stack contract
//   (astro-css-tokens) requires plain-string `$value`. The spine stays structured (DTCG 2025.10,
//   C-1) — this projection is a DERIVED consumer artifact, never a second source of truth.
// RULES: values only — `$extensions` (provenance) is dropped from the projection (provenance
//   lives in the spine; a consumer render artifact carries values, like emitted CSS does);
//   `hex` fallback is NOT propagated (the consumer's no-fallback OKLCH policy); alias strings
//   `{tier.category.name}`, dimensions, fontFamily stacks and composite strings pass through
//   untouched. Missing tier files are skipped with an honest log line, never fabricated.
// CUSTODY: every emitted file is recorded in `sources/MANIFEST.json` (derived-artifact custody,
//   parent path + parent sha256 + tool), merged into the existing MANIFEST shape (array | {entries}).
//
// Usage: node tools/tokens-project.mjs [repo-root]   (default: cwd)

import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { join } from 'node:path';

const ROOT = process.argv[2] ?? process.cwd();

// ---- C-1 canonical serialization (byte-parity with audit-lint serializeValue) ----
const canonNum = (n) => { const x = Number(n); return Number.isFinite(x) ? String(x) : String(n).trim(); };
const canonAlpha = (a) => (a == null || Number(a) === 1 ? '' : ` / ${canonNum(a)}`);
function projectValue(v) {
  if (v != null && typeof v === 'object' && !Array.isArray(v) && v.colorSpace && Array.isArray(v.components)) {
    return `${String(v.colorSpace).toLowerCase()}(${v.components.map(canonNum).join(' ')}${canonAlpha(v.alpha)})`;
  }
  return v; // strings (aliases, dimensions, stacks, composites) and non-color shapes pass through
}

function projectNode(node) {
  if (node == null || typeof node !== 'object' || Array.isArray(node)) return node;
  const out = {};
  for (const [k, v] of Object.entries(node)) {
    if (k === '$extensions') continue;            // provenance stays in the spine
    if (k === '$value') { out[k] = projectValue(v); continue; }
    out[k] = k.startsWith('$') ? v : projectNode(v);
  }
  return out;
}

const TIERS = [
  { src: 'tokens/base.tokens.json', dst: 'tokens/web/base.json' },
  { src: 'tokens/semantic.tokens.json', dst: 'tokens/web/semantic.json' },
  { src: 'tokens/component.tokens.json', dst: 'tokens/web/component.json' },
];

const emitted = [];
for (const { src, dst } of TIERS) {
  const abs = join(ROOT, src);
  if (!existsSync(abs)) { console.log(`tokens-project: ${src} absent — tier skipped (honest, not fabricated).`); continue; }
  const raw = readFileSync(abs, 'utf8');
  const tree = JSON.parse(raw);
  const outDir = join(ROOT, 'tokens', 'web');
  if (!existsSync(outDir)) mkdirSync(outDir, { recursive: true });
  writeFileSync(join(ROOT, dst), JSON.stringify(projectNode(tree), null, 2) + '\n');
  emitted.push({ file: dst, parent: { file: src, sha256: createHash('sha256').update(raw).digest('hex') }, tool: 'tokens-project.mjs' });
  console.log(`tokens-project: ${dst} ← ${src}`);
}

if (emitted.length) {
  // derived-artifact custody: merge into sources/MANIFEST.json without disturbing its shape
  const mPath = join(ROOT, 'sources', 'MANIFEST.json');
  let manifest = null;
  if (existsSync(mPath)) { try { manifest = JSON.parse(readFileSync(mPath, 'utf8')); } catch { manifest = null; } }
  const notOurs = (e) => !(e && e.tool === 'tokens-project.mjs');
  // gather the FULL existing custody list from ANY shape (bare array · {entries} · source-recover's
  // {recovered}) — merging into `entries` while leaving a `recovered` key would create a dual-key manifest
  // that shadows the recovered captures from run-gates (the F6-01 collision). Write back ONE canonical,
  // stably-sorted `{entries}` (byte-idempotent: order no longer depends on which producer ran last).
  const wasArray = Array.isArray(manifest);
  const existing = wasArray ? manifest
    : (manifest && typeof manifest === 'object') ? [...(Array.isArray(manifest.entries) ? manifest.entries : []), ...(Array.isArray(manifest.recovered) ? manifest.recovered : [])]
    : [];
  const keyOf = (e) => `${e && e.file}|${(e && e.parent && (e.parent.file || e.parent.url)) || (e && e.url) || ''}|${(e && e.tool) || ''}`;
  const merged = [...existing.filter(notOurs), ...emitted].sort((a, b) => keyOf(a).localeCompare(keyOf(b)));
  manifest = wasArray ? merged : { entries: merged };
  if (!existsSync(join(ROOT, 'sources'))) mkdirSync(join(ROOT, 'sources'), { recursive: true });
  writeFileSync(mPath, JSON.stringify(manifest, null, 2) + '\n');
  console.log(`tokens-project: custody — ${emitted.length} derived entr${emitted.length === 1 ? 'y' : 'ies'} recorded in sources/MANIFEST.json`);
} else {
  console.log('tokens-project: no spine tier found under tokens/ — nothing to project.');
}
