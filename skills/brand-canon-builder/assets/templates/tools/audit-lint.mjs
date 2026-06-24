#!/usr/bin/env node
// audit-lint.mjs — PROVENANCE & COMPLETENESS GATE (MT-3 / MT-4 / MT-5)
//
// THIS IS THE GATE. It turns the builder's prose provenance rules into executable
// checks that FAIL on violation. Run it against an EMITTED CLIENT REPO ROOT (not the
// tool/template repo). It exits 1 on any violation and 0 when clean, and writes a
// human-readable violation report to `audit/lint/report.md` under the linted root.
//
//   node tools/audit-lint.mjs [repo-root]      # default repo-root = cwd
//
// Reads (all relative to repo-root, all optional — a missing input is reported, never a crash):
//   tokens/*.json          DTCG token files (base / semantic / component)
//   canon/*.md             the canon layers (prose)
//   canon/canon.json       the machine mirror (schemes / algorithms / ruleIndex)
//   RESIDENT.md            the Open Items / Gaps table (GAP-NNN + Status)
//   CHECKSUMS.txt          sha256 of every source-of-record file (incl. sources/**)
//
// Rules (each is a real check; a rule that FAILs is listed with the offending token/value):
//   R1 (MT-4)  confidence == "corroborated"  ⇒  ≥2 sourceRef entries with DISTINCT `file`.
//   R2 (MT-4)  source ∈ {inferred, matched}  ⇒  confidence MUST be "hypothesis".
//   R3 (MT-3)  source == "computed-css" OR confidence ∈ {corroborated, owner-confirmed}
//              ⇒  carry a sourceRef whose `sha256` appears in CHECKSUMS.txt.
//   R4 (MT-5)  every value/scheme NAMED in a canon layer or an ALGO maps to EITHER a
//              token artifact OR an open GAP-NNN in RESIDENT.md.
//   R5 (MT-5)  every token at confidence "hypothesis" OR source ∈ {inferred, matched, traced}
//              maps to EXACTLY ONE open GAP-NNN.
//
// ANTI-DETERMINISM RECTOR (load-bearing): every rule is GENERAL. The linter never asserts
// that a specific value/ink/scheme exists. A monogram-only / single-ink / sonic-primary brand
// passes CLEAN — `not-used(owner-declared)` dimensions simply produce no named values to map,
// owner-confirmed declared truth carries its source-of-record, and there are no uncertain
// tokens to track. Zero brand-specific content is encoded here.

import { readFileSync, readdirSync, existsSync, mkdirSync, writeFileSync, statSync } from 'node:fs';
import { join, resolve, relative } from 'node:path';

const ROOT = resolve(process.argv[2] || process.cwd());

// ---------- tiny fs/json helpers (no deps) ----------
const readText = (p) => { try { return readFileSync(p, 'utf8'); } catch { return null; } };
const readJSON = (p) => { const t = readText(p); if (t == null) return null; try { return JSON.parse(t); } catch (e) { parseErrors.push(`${rel(p)}: ${e.message}`); return null; } };
const rel = (p) => relative(ROOT, p) || '.';
const parseErrors = [];

function listFiles(dir, ext) {
  const out = [];
  const abs = join(ROOT, dir);
  if (!existsSync(abs)) return out;
  for (const name of readdirSync(abs)) {
    const p = join(abs, name);
    let st; try { st = statSync(p); } catch { continue; }
    if (st.isFile() && name.endsWith(ext)) out.push(p);
  }
  return out.sort();
}

// ---------- collect token leaves ----------
// A leaf is a plain object carrying `$value`. Path = the non-`$` keys down to it.
const tokens = [];        // { path, file, value, source, confidence, sourceRefs[], gaps[], scheme }
const tokenPaths = new Set();

function normRefs(v) {
  if (v == null) return [];
  return Array.isArray(v) ? v : [v];
}
function walkTokens(node, path, file) {
  if (node == null || typeof node !== 'object' || Array.isArray(node)) return;
  if (Object.prototype.hasOwnProperty.call(node, '$value')) {
    const brand = (node.$extensions && node.$extensions.brand) || {};
    const prov = brand.provenance || {};
    const t = {
      path: path.join('.'),
      file,
      value: node.$value,
      source: prov.source ?? null,
      confidence: prov.confidence ?? null,
      sourceRefs: normRefs(brand.sourceRef),
      gaps: normRefs(brand.gap).map((g) => String(g).match(/GAP-\d+/i)?.[0]?.toUpperCase()).filter(Boolean),
      scheme: brand.scheme ?? null,
    };
    tokens.push(t);
    tokenPaths.add(t.path);
    return; // a leaf does not nest further tokens
  }
  for (const [k, v] of Object.entries(node)) {
    if (k.startsWith('$')) continue;
    walkTokens(v, [...path, k], file);
  }
}

const tokenFiles = listFiles('tokens', '.json');
for (const f of tokenFiles) {
  const j = readJSON(f);
  if (j) walkTokens(j, [], rel(f));
}

// ---------- CHECKSUMS.txt → set of sha256 hashes ----------
const checksumText = readText(join(ROOT, 'CHECKSUMS.txt')) || '';
const checksumHashes = new Set();
const checksumPaths = [];
for (const line of checksumText.split('\n')) {
  const m = line.match(/\b([a-f0-9]{64})\b/i);
  if (m) checksumHashes.add(m[1].toLowerCase());
  const pm = line.match(/\b[a-f0-9]{64}\b[ \t*]+(\S.*)$/i);
  if (pm) checksumPaths.push(pm[1].trim());
}

// ---------- RESIDENT.md → GAP-NNN ledger ----------
// A GAP is OPEN when its row carries the OPEN status and none of the terminal states.
const residentText = readText(join(ROOT, 'RESIDENT.md')) || '';
const openGaps = new Set();        // ids
const openGapRows = [];            // { id, row }
for (const line of residentText.split('\n')) {
  const ids = [...line.matchAll(/GAP-\d+/gi)].map((m) => m[0].toUpperCase());
  if (!ids.length) continue;
  const isTerminal = /\b(CLOSED|DROPPED|DEFERRED|RESOLVED|OUT)\b/i.test(line);
  const isOpen = /\bOPEN\b/i.test(line) && !isTerminal;
  if (isOpen) for (const id of new Set(ids)) { openGaps.add(id); openGapRows.push({ id, row: line }); }
}

// ---------- canon layers → named values & schemes ----------
const canonMd = listFiles('canon', '.md');
const aliasRe = /\{([a-z][a-z0-9]*\.[a-z0-9-]+(?:\.[a-z0-9-]+)+)\}/gi; // {tier.category.name}
const namedAliases = [];   // { alias, where, line, gapOnLine }
for (const f of canonMd) {
  const text = readText(f) || '';
  text.split('\n').forEach((line, i) => {
    for (const m of line.matchAll(aliasRe)) {
      const gapOnLine = [...line.matchAll(/GAP-\d+/gi)].map((g) => g[0].toUpperCase());
      namedAliases.push({ alias: m[1], where: rel(f), line: i + 1, gapOnLine });
    }
  });
}
// token-internal aliases (semantic/component $value) are named values too — they must resolve.
for (const t of tokens) {
  if (typeof t.value === 'string') {
    const m = t.value.match(/^\{([a-z][a-z0-9]*\.[a-z0-9-]+(?:\.[a-z0-9-]+)+)\}$/i);
    if (m) namedAliases.push({ alias: m[1], where: t.file, line: t.path, gapOnLine: [] });
  }
}

const canonJson = readJSON(join(ROOT, 'canon', 'canon.json'));
const canonJsonRaw = readText(join(ROOT, 'canon', 'canon.json')) || '';
// aliases anywhere in canon.json (covers algorithms / ruleIndex / grammar references)
for (const m of canonJsonRaw.matchAll(aliasRe)) {
  namedAliases.push({ alias: m[1], where: 'canon/canon.json', line: 0, gapOnLine: [] });
}
// named schemes = keys under canon.json.schemes (excluding $-notes and the `default` pointer)
const namedSchemes = [];
if (canonJson && canonJson.schemes && typeof canonJson.schemes === 'object') {
  for (const k of Object.keys(canonJson.schemes)) {
    if (k.startsWith('$') || k === 'default') continue;
    namedSchemes.push(k);
  }
}
const defaultScheme = canonJson?.schemes?.default ?? null;
const hasSemanticColorSet = tokens.some((t) => t.path.startsWith('semantic.'));

// ---------- run the rules ----------
const results = [];   // { id, title, status: 'PASS'|'FAIL'|'SKIP', violations: [] }
const add = (id, title, violations, note) =>
  results.push({ id, title, status: violations.length ? 'FAIL' : 'PASS', violations, note });

// R1 (MT-4): corroborated ⇒ ≥2 sourceRef with distinct `file`.
{
  const v = [];
  for (const t of tokens) {
    if (t.confidence !== 'corroborated') continue;
    const files = new Set(t.sourceRefs.map((r) => r && r.file).filter(Boolean));
    if (files.size < 2)
      v.push(`${t.path} (${t.file}) — confidence "corroborated" but ${files.size} distinct sourceRef file(s) [${[...files].join(', ') || 'none'}]; needs ≥2`);
  }
  add('R1', 'MT-4 · corroborated ⇒ ≥2 distinct source artifacts', v);
}

// R2 (MT-4): source ∈ {inferred, matched} ⇒ confidence == hypothesis.
{
  const v = [];
  for (const t of tokens) {
    if (!['inferred', 'matched'].includes(t.source)) continue;
    if (t.confidence !== 'hypothesis')
      v.push(`${t.path} (${t.file}) — source "${t.source}" capped at "hypothesis" but confidence is "${t.confidence ?? 'none'}"`);
  }
  add('R2', 'MT-4 · inferred/matched capped at hypothesis', v);
}

// R3 (MT-3): computed-css OR confidence ∈ {corroborated, owner-confirmed} ⇒ hashed source-of-record.
{
  const v = [];
  for (const t of tokens) {
    const gated = t.source === 'computed-css' || ['corroborated', 'owner-confirmed'].includes(t.confidence);
    if (!gated) continue;
    const hashed = t.sourceRefs.some((r) => r && r.sha256 && checksumHashes.has(String(r.sha256).toLowerCase()));
    if (!hashed) {
      const why = t.sourceRefs.length
        ? `sourceRef sha256 [${t.sourceRefs.map((r) => r && r.sha256).filter(Boolean).join(', ') || 'none'}] not in CHECKSUMS.txt`
        : 'no $extensions.brand.sourceRef';
      v.push(`${t.path} (${t.file}) — source "${t.source ?? '–'}" / confidence "${t.confidence ?? '–'}" requires a hashed, identity-verified source-of-record: ${why}`);
    }
  }
  add('R3', 'MT-3 · computed-css/corroborated/owner-confirmed ⇒ hashed source-of-record', v);
}

// R4 (MT-5): every named value/scheme maps to a token artifact OR an open GAP.
{
  const v = [];
  // named values (aliases)
  for (const a of namedAliases) {
    if (tokenPaths.has(a.alias)) continue;                 // maps to a token artifact
    const gaps = [...a.gapOnLine, ...openGapRows.filter((g) => g.row.includes(a.alias)).map((g) => g.id)];
    const openHit = gaps.some((g) => openGaps.has(g));
    if (!openHit)
      v.push(`named value {${a.alias}} (${a.where}${a.line ? ':' + a.line : ''}) maps to neither a token artifact nor an open GAP-NNN`);
  }
  // named schemes
  for (const s of namedSchemes) {
    const materialized =
      tokens.some((t) => t.scheme === s) ||
      (s === defaultScheme && hasSemanticColorSet);
    const gapHit = openGapRows.some((g) => g.row.includes(s)) || openGaps.has(s.toUpperCase());
    if (!materialized && !gapHit)
      v.push(`named scheme "${s}" (canon.json › schemes) maps to neither a token set (no token tagged $extensions.brand.scheme:"${s}", not the default) nor an open GAP-NNN`);
  }
  add('R4', 'MT-5 · every named value/scheme → token artifact OR open GAP', v,
      `${namedAliases.length} named value ref(s), ${namedSchemes.length} named scheme(s) checked`);
}

// R5 (MT-5): uncertain token ⇒ exactly one open GAP-NNN.
{
  const v = [];
  for (const t of tokens) {
    const uncertain = t.confidence === 'hypothesis' || ['inferred', 'matched', 'traced'].includes(t.source);
    if (!uncertain) continue;
    const mapped = new Set([
      ...t.gaps.filter((g) => openGaps.has(g)),
      ...openGapRows.filter((g) => g.row.includes(t.path)).map((g) => g.id).filter((g) => openGaps.has(g)),
    ]);
    if (mapped.size !== 1)
      v.push(`${t.path} (${t.file}) — uncertain (confidence "${t.confidence ?? '–'}", source "${t.source ?? '–'}") maps to ${mapped.size} open GAP-NNN [${[...mapped].join(', ') || 'none'}]; must be exactly 1`);
  }
  add('R5', 'MT-5 · every hypothesis/inferred/matched/traced token → exactly one open GAP', v);
}

// ---------- report ----------
const failed = results.filter((r) => r.status === 'FAIL');
const stamp = process.env.AUDIT_LINT_DATE || ''; // deterministic: caller may pin a date; else omit
const lines = [];
lines.push('# audit-lint report — provenance & completeness gate (MT-3/4/5)');
lines.push('');
lines.push(`Linted root: \`${ROOT}\`${stamp ? ` · ${stamp}` : ''}`);
lines.push(`Inputs: ${tokenFiles.length} token file(s), ${canonMd.length} canon layer(s), ` +
  `canon.json ${canonJson ? 'present' : 'absent'}, RESIDENT.md ${residentText ? 'present' : 'absent'}, ` +
  `CHECKSUMS.txt ${checksumText ? `${checksumHashes.size} hash(es)` : 'absent'}.`);
lines.push(`Tokens scanned: ${tokens.length}. Open GAPs: ${openGaps.size ? [...openGaps].sort().join(', ') : 'none'}.`);
lines.push('');
lines.push(`**Verdict: ${failed.length ? `FAIL (${failed.length} rule(s) violated)` : 'CLEAN'}** — exit ${failed.length ? 1 : 0}.`);
lines.push('');
for (const r of results) {
  lines.push(`## ${r.id} — ${r.title} · ${r.status}`);
  if (r.note) lines.push(`_${r.note}_`);
  if (r.violations.length) for (const x of r.violations) lines.push(`- ❌ ${x}`);
  else lines.push('- ✅ no violations');
  lines.push('');
}
if (parseErrors.length) {
  lines.push('## Parse errors');
  for (const e of parseErrors) lines.push(`- ⚠️ ${e}`);
  lines.push('');
}
const report = lines.join('\n');

try {
  mkdirSync(join(ROOT, 'audit', 'lint'), { recursive: true });
  writeFileSync(join(ROOT, 'audit', 'lint', 'report.md'), report + '\n');
} catch (e) {
  process.stderr.write(`audit-lint: could not write audit/lint/report.md: ${e.message}\n`);
}

// stdout summary
process.stdout.write(report + '\n');
process.exit(failed.length ? 1 : 0);
