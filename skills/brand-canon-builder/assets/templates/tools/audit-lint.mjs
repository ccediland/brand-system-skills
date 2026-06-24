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
//   R0 (MT-3/4) every VALUE token (non-alias) carries $extensions.brand.provenance with
//               source ∈ the closed source enum and confidence ∈ {hypothesis,corroborated,
//               owner-confirmed} — closes the "omit/typo the provenance and evade every rule" hole.
//   R1 (MT-4)  confidence == "corroborated"  ⇒  ≥2 sourceRef entries with DISTINCT `file`.
//   R2 (MT-4)  source ∈ {inferred, matched}  ⇒  confidence MUST be "hypothesis".
//   R3 (MT-3)  source == "computed-css" OR confidence ∈ {corroborated, owner-confirmed}
//              ⇒  a sourceRef whose `sha256` is listed in CHECKSUMS.txt FOR THAT EXACT `file`
//              (hash bound to the claimed path — a borrowed/ghost-file hash does not satisfy it).
//   R4 (MT-5)  every value/scheme NAMED in a canon layer or an ALGO maps to EITHER a
//              token artifact OR an open GAP-NNN in RESIDENT.md.
//   R5 (MT-5)  every token at confidence "hypothesis" OR source ∈ {inferred, matched, traced}
//              carries EXACTLY ONE open GAP-NNN in its own $extensions.brand.gap back-reference.
//
// ANTI-DETERMINISM RECTOR (load-bearing): every rule is GENERAL. The linter never asserts
// that a specific value/ink/scheme exists. A monogram-only / single-ink / sonic-primary brand
// passes CLEAN — `not-used(owner-declared)` dimensions produce no named values to map,
// owner-confirmed declared truth carries its source-of-record, and there are no uncertain
// tokens to track. Zero brand-specific content is encoded here.

import { readFileSync, readdirSync, existsSync, mkdirSync, writeFileSync, statSync } from 'node:fs';
import { join, resolve, relative } from 'node:path';

const ROOT = resolve(process.argv[2] || process.cwd());

// closed enums (mirror gap-protocol.md § The provenance spine — "no fourth value/synonym")
const SOURCE_ENUM = new Set(['declared-spec', 'owner-stated', 'extracted-vector', 'computed-css', 'design-file', 'matched', 'traced', 'inferred']);
const CONFIDENCE_ENUM = new Set(['hypothesis', 'corroborated', 'owner-confirmed']);

// ---------- tiny fs/json helpers (no deps) ----------
const parseErrors = [];
const readText = (p) => { try { return readFileSync(p, 'utf8'); } catch { return null; } };
const rel = (p) => relative(ROOT, p) || '.';
const readJSON = (p) => { const t = readText(p); if (t == null) return null; try { return JSON.parse(t); } catch (e) { parseErrors.push(`${rel(p)}: ${e.message}`); return null; } };

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

// word/token-boundary mention (so a shorter alias/scheme isn't a substring of a longer one)
function rowMentions(haystack, needle) {
  if (!needle) return false;
  const esc = String(needle).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  return new RegExp(`(?<![\\w.-])${esc}(?![\\w.-])`).test(haystack);
}
const isAliasValue = (v) => typeof v === 'string' && /^\{.+\}$/.test(v.trim());
const normRefs = (v) => (v == null ? [] : Array.isArray(v) ? v : [v]);

// ---------- collect token leaves ----------
const tokens = [];
const tokenPaths = new Set();

function walkTokens(node, path, file) {
  if (node == null || typeof node !== 'object' || Array.isArray(node)) return;
  if (Object.prototype.hasOwnProperty.call(node, '$value')) {
    const brand = (node.$extensions && node.$extensions.brand) || {};
    const prov = brand.provenance;
    const t = {
      path: path.join('.'),
      file,
      value: node.$value,
      isAlias: isAliasValue(node.$value),
      provenancePresent: prov != null && typeof prov === 'object',
      source: prov && prov.source != null ? prov.source : null,
      confidence: prov && prov.confidence != null ? prov.confidence : null,
      sourceRefs: normRefs(brand.sourceRef),
      gaps: normRefs(brand.gap).map((g) => String(g).match(/GAP-\d+/i)?.[0]?.toUpperCase()).filter(Boolean),
      scheme: brand.scheme ?? null,
    };
    tokens.push(t);
    tokenPaths.add(t.path);
    return;
  }
  for (const [k, v] of Object.entries(node)) {
    if (k.startsWith('$')) continue;
    walkTokens(v, [...path, k], file);
  }
}

const tokenFiles = listFiles('tokens', '.json');
for (const f of tokenFiles) { const j = readJSON(f); if (j) walkTokens(j, [], rel(f)); }
const hasColorToken = tokens.some((t) => t.path.split('.').includes('color'));

// ---------- CHECKSUMS.txt → path→sha256 map (sha256sum format: "<hash>  <path>") ----------
const checksumText = readText(join(ROOT, 'CHECKSUMS.txt')) || '';
const checksumByPath = new Map();
for (const line of checksumText.split('\n')) {
  const m = line.match(/^\s*([a-f0-9]{64})\s+\*?(.+?)\s*$/i);
  if (m) checksumByPath.set(m[2].replace(/^\.\//, ''), m[1].toLowerCase());
}

// ---------- RESIDENT.md → GAP-NNN ledger (status read from its OWN table cell) ----------
const residentText = readText(join(ROOT, 'RESIDENT.md')) || '';
const openGaps = new Set();
const openGapRows = [];
for (const line of residentText.split('\n')) {
  const ids = [...line.matchAll(/GAP-\d+/gi)].map((m) => m[0].toUpperCase());
  if (!ids.length) continue;
  // isolate the Status: the last non-empty pipe cell of a table row, else a `Status:`-anchored token, else the line.
  let statusCell = line;
  if (line.includes('|')) {
    const cells = line.split('|').map((c) => c.trim()).filter((c) => c.length);
    if (cells.length) statusCell = cells[cells.length - 1];
  } else {
    const sm = line.match(/Status\s*[:=]\s*(.+)$/i);
    if (sm) statusCell = sm[1];
  }
  const isTerminal = /\b(CLOSED|DROPPED|DEFERRED|RESOLVED|OUT)\b/i.test(statusCell);
  const isOpen = /\bOPEN\b/i.test(statusCell) && !isTerminal;
  if (isOpen) for (const id of new Set(ids)) { openGaps.add(id); openGapRows.push({ id, row: line }); }
}

// ---------- canon layers → named values & schemes ----------
const aliasRe = /\{([a-z][a-z0-9]*\.[a-z0-9-]+(?:\.[a-z0-9-]+)+)\}/gi; // {tier.category.name}
const namedAliases = [];
for (const f of listFiles('canon', '.md')) {
  const text = readText(f) || '';
  text.split('\n').forEach((line, i) => {
    for (const m of line.matchAll(aliasRe)) {
      const gapOnLine = [...line.matchAll(/GAP-\d+/gi)].map((g) => g[0].toUpperCase());
      namedAliases.push({ alias: m[1], where: rel(f), line: i + 1, gapOnLine });
    }
  });
}
for (const t of tokens) {
  if (typeof t.value === 'string') {
    const m = t.value.match(/^\{([a-z][a-z0-9]*\.[a-z0-9-]+(?:\.[a-z0-9-]+)+)\}$/i);
    if (m) namedAliases.push({ alias: m[1], where: t.file, line: t.path, gapOnLine: [] });
  }
}
const canonJson = readJSON(join(ROOT, 'canon', 'canon.json'));
const canonJsonRaw = readText(join(ROOT, 'canon', 'canon.json')) || '';
for (const m of canonJsonRaw.matchAll(aliasRe)) namedAliases.push({ alias: m[1], where: 'canon/canon.json', line: 0, gapOnLine: [] });
const namedSchemes = [];
if (canonJson && canonJson.schemes && typeof canonJson.schemes === 'object') {
  for (const k of Object.keys(canonJson.schemes)) { if (k.startsWith('$') || k === 'default') continue; namedSchemes.push(k); }
}
const defaultScheme = canonJson?.schemes?.default ?? null;

// ---------- run the rules ----------
const results = [];
const add = (id, title, violations, note) => results.push({ id, title, status: violations.length ? 'FAIL' : 'PASS', violations, note });

// R0 (MT-3/4): every value (non-alias) token carries provenance on the closed enums.
{
  const v = [];
  for (const t of tokens) {
    if (t.isAlias) continue; // pure aliases inherit provenance from the base leaf they point at
    if (!t.provenancePresent) { v.push(`${t.path} (${t.file}) — no $extensions.brand.provenance block (every value token must carry one)`); continue; }
    if (!SOURCE_ENUM.has(t.source)) v.push(`${t.path} (${t.file}) — provenance.source "${t.source ?? 'missing'}" is not on the closed source enum`);
    if (!CONFIDENCE_ENUM.has(t.confidence)) v.push(`${t.path} (${t.file}) — provenance.confidence "${t.confidence ?? 'missing'}" is not on the ladder {hypothesis|corroborated|owner-confirmed}`);
  }
  add('R0', 'MT-3/4 · every value token carries provenance on the closed source/confidence enums', v);
}

// R1 (MT-4): corroborated ⇒ ≥2 sourceRef with distinct `file`.
{
  const v = [];
  for (const t of tokens) {
    if (t.confidence !== 'corroborated') continue;
    const files = new Set(t.sourceRefs.map((r) => r && r.file).filter(Boolean));
    if (files.size < 2) v.push(`${t.path} (${t.file}) — confidence "corroborated" but ${files.size} distinct sourceRef file(s) [${[...files].join(', ') || 'none'}]; needs ≥2`);
  }
  add('R1', 'MT-4 · corroborated ⇒ ≥2 distinct source artifacts', v);
}

// R2 (MT-4): source ∈ {inferred, matched} ⇒ confidence == hypothesis.
{
  const v = [];
  for (const t of tokens) {
    if (!['inferred', 'matched'].includes(t.source)) continue;
    if (t.confidence !== 'hypothesis') v.push(`${t.path} (${t.file}) — source "${t.source}" capped at "hypothesis" but confidence is "${t.confidence ?? 'none'}"`);
  }
  add('R2', 'MT-4 · inferred/matched capped at hypothesis', v);
}

// R3 (MT-3): computed-css OR confidence ∈ {corroborated, owner-confirmed} ⇒ hashed source-of-record (hash bound to its own file path).
{
  const v = [];
  for (const t of tokens) {
    const gated = t.source === 'computed-css' || ['corroborated', 'owner-confirmed'].includes(t.confidence);
    if (!gated) continue;
    const hashed = t.sourceRefs.some((r) => {
      if (!r || !r.file || !r.sha256) return false;
      const have = checksumByPath.get(String(r.file).replace(/^\.\//, ''));
      return !!have && have === String(r.sha256).toLowerCase();
    });
    if (!hashed) {
      const refs = t.sourceRefs.map((r) => (r && r.file ? `${r.file}#${r.sha256 ? String(r.sha256).slice(0, 12) : 'no-sha'}` : 'malformed')).join(', ');
      v.push(`${t.path} (${t.file}) — source "${t.source ?? '–'}" / confidence "${t.confidence ?? '–'}" requires a sourceRef whose sha256 is in CHECKSUMS.txt FOR THAT file [${refs || 'no sourceRef'}]`);
    }
  }
  add('R3', 'MT-3 · computed-css/corroborated/owner-confirmed ⇒ hashed source-of-record (path-bound)', v);
}

// R4 (MT-5): every named value/scheme maps to a token artifact OR an open GAP.
{
  const v = [];
  for (const a of namedAliases) {
    if (tokenPaths.has(a.alias)) continue;
    const openHit = a.gapOnLine.some((g) => openGaps.has(g)) || openGapRows.some((g) => rowMentions(g.row, a.alias));
    if (!openHit) v.push(`named value {${a.alias}} (${a.where}${a.line ? ':' + a.line : ''}) maps to neither a token artifact nor an open GAP-NNN`);
  }
  for (const s of namedSchemes) {
    const materialized = tokens.some((t) => t.scheme === s) || (s === defaultScheme && hasColorToken);
    const gapHit = openGapRows.some((g) => rowMentions(g.row, s));
    if (!materialized && !gapHit) v.push(`named scheme "${s}" (canon.json › schemes) maps to neither a token set (no token tagged $extensions.brand.scheme:"${s}", not the default backed by color tokens) nor an open GAP-NNN`);
  }
  add('R4', 'MT-5 · every named value/scheme → token artifact OR open GAP', v, `${namedAliases.length} named value ref(s), ${namedSchemes.length} named scheme(s) checked`);
}

// R5 (MT-5): uncertain token ⇒ exactly one open GAP-NNN via its own gap back-reference.
{
  const v = [];
  for (const t of tokens) {
    const uncertain = t.confidence === 'hypothesis' || ['inferred', 'matched', 'traced'].includes(t.source);
    if (!uncertain) continue;
    const mapped = new Set(t.gaps.filter((g) => openGaps.has(g)));
    if (mapped.size !== 1) v.push(`${t.path} (${t.file}) — uncertain (confidence "${t.confidence ?? '–'}", source "${t.source ?? '–'}") carries ${mapped.size} open GAP-NNN back-reference [${[...mapped].join(', ') || 'none'}]; must be exactly 1 (set $extensions.brand.gap)`);
  }
  add('R5', 'MT-5 · every hypothesis/inferred/matched/traced token → exactly one open GAP', v);
}

// ---------- R6 (MT-1): cross-artifact reconciliation & drift ----------
// THE RECONCILIATION GATE. A downstream artifact may not DRIFT from its single source.
// Like R0–R5 it is GENERAL (anti-determinism rector): it asserts NO specific projection,
// mark, or value exists — only that whatever DOES exist reconciles with the spine / its
// single source. A brand with no projections, no visual mark, or only `authored` values
// passes CLEAN. Three checks, reported under one rule with [R6a]/[R6b]/[R6c]-tagged messages:
//   R6a — every `derived` projection's consumed alias resolves in the spine, and any pinned
//         value byte-equals the spine-resolved value. `authored` projections are truth → skipped.
//   R6b — the protected mark geometry is single-sourced: each rendered instance is byte-equal
//         (whitespace/JSX-normalized) to canon/mark.svg. No mark source + no instances ⇒ N/A PASS.
//   R6c — every LOCAL @import / url() / href / src in a generated .html/.css artifact resolves.

// spine resolver — follow aliases to a terminal $value (null if it does not resolve)
const tokenByPath = new Map(tokens.map((t) => [t.path, t]));
function resolveSpineValue(path, seen = new Set()) {
  if (seen.has(path)) return null;                 // alias cycle → unresolved
  seen.add(path);
  const t = tokenByPath.get(path);
  if (!t) return null;                             // dangling / renamed reference
  if (t.isAlias) return resolveSpineValue(String(t.value).trim().replace(/^\{|\}$/g, ''), seen);
  return t.value;
}

// canonical value serializer (the structured-OKLCH lockstep, Stage C-1). Turns a $value into ONE stable
// string so a projection pin byte-compares against a structured OR a legacy-string spine value. Migration-
// tolerant: accepts a DTCG structured-colour object {colorSpace, components, alpha, hex} AND a legacy literal
// string. Canonical form: `<space>(c c c)` / `<space>(c c c / a)`; numbers normalized (0.30→0.3), alpha 1 or
// absent dropped on BOTH branches, colourSpace lowercased, arrays bracketed — so both sides agree. Never String(object).
const canonNum = (n) => { const x = Number(n); return Number.isFinite(x) ? String(x) : String(n).trim(); };
const canonAlpha = (a) => (a == null || Number(a) === 1 ? '' : ` / ${canonNum(a)}`);
function serializeValue(v) {
  if (v == null) return '';
  if (typeof v === 'object' && !Array.isArray(v)) {
    if (v.colorSpace && Array.isArray(v.components)) {
      return `${String(v.colorSpace).toLowerCase()}(${v.components.map(canonNum).join(' ')}${canonAlpha(v.alpha)})`;
    }
    return JSON.stringify(v);                         // any other object → stable JSON
  }
  if (Array.isArray(v)) return `[${v.map(canonNum).join(', ')}]`; // cubic-bezier etc. → bracketed bare numbers (author-matchable)
  const s = String(v).trim().replace(/\s+/g, ' ');
  const sb = s.match(/^\[(.*)\]$/);                   // a bracketed-array pin → same bracketed canonical form
  if (sb) return `[${sb[1].split(/[\s,]+/).filter(Boolean).map(canonNum).join(', ')}]`;
  const m = s.match(/^([a-z][a-z-]*)\(([^)]*)\)$/i);  // colour/timing func string → normalize numeric args + alpha
  if (!m) return s;                                   // plain string (font stack, hex, …) → whitespace-normalized
  const fn = m[1].toLowerCase();
  const parts = m[2].trim().split(/\s*\/\s*/);
  const nums = parts[0].trim().split(/[\s,]+/).filter(Boolean).map(canonNum);
  if (fn === 'cubic-bezier') return `[${nums.join(', ')}]`; // cubicBezier func form ≡ the DTCG array form (unambiguous, safe)
  return `${fn}(${nums.join(' ')}${canonAlpha(parts[1])})`;
}

// recursive file walk (skips inputs / build / dot dirs; never throws on a bad entry)
function walkFiles(exts, skip = new Set(['node_modules', 'sources', 'audit'])) {
  const out = [];
  const rec = (abs) => {
    let entries; try { entries = readdirSync(abs, { withFileTypes: true }); } catch { return; }
    for (const e of entries) {
      const p = join(abs, e.name);
      if (e.isDirectory()) { if (!skip.has(e.name) && !e.name.startsWith('.')) rec(p); }
      else if (e.isFile() && exts.some((x) => e.name.endsWith(x))) out.push(p);
    }
  };
  rec(ROOT);
  return out;
}

// extract the inner geometry of an <svg> (optionally the one carrying a given id), then normalize
const extractSvgInner = (text, id) => {
  if (text == null) return null;
  const re = id
    ? new RegExp(`<svg\\b[^>]*\\bid=["']${id}["'][^>]*>([\\s\\S]*?)<\\/svg>`, 'i')
    : /<svg\b[^>]*>([\s\S]*?)<\/svg>/i;
  const m = text.match(re);
  return m ? m[1] : null;
};
const normGeom = (inner) => (inner == null ? null : inner
  .replace(/<!--[\s\S]*?-->/g, '')                                    // strip comments
  .replace(/>\s+</g, '><')                                           // no whitespace between tags
  .replace(/<([a-z][\w:-]*)((?:\s[^<>]*?)?)>\s*<\/\1\s*>/gi, '<$1$2/>') // explicit-empty <tag></tag> ≡ self-closing <tag/>
  .replace(/\s*\/>/g, '/>')                                          // JSX " />" → "/>"
  .replace(/\s+/g, ' ')                                              // collapse remaining whitespace runs
  .trim());

{
  const v = [];

  // ---- R6a · projection drift ----
  let derivedProjCount = 0;
  const projText = readText(join(ROOT, 'satellites', 'projections.md'));
  if (projText) {
    let inReg = false, header = null;
    for (const line of projText.split('\n')) {
      if (/^##\s/.test(line)) { inReg = /projection\s+registry/i.test(line); header = null; continue; }
      if (!inReg || !line.trim().startsWith('|')) continue;
      const cells = line.split('|').slice(1, -1).map((c) => c.trim());
      if (!cells.length || /^[-:\s]+$/.test(cells.join(''))) continue;        // separator row
      if (!header) { header = cells.map((c) => c.toLowerCase()); continue; }  // header row
      const ci = header.findIndex((h) => h.includes('consumes'));
      const si = header.findIndex((h) => h.includes('source'));
      const name = (cells[0] || '(unnamed)').replace(/`/g, '');
      const consumesCell = ci >= 0 ? (cells[ci] || '') : '';
      const sourceCell = si >= 0 ? (cells[si] || '') : '';
      if (name.includes('{{') || consumesCell.includes('{{')) continue;       // template placeholder row
      if (/\bauthored\b/i.test(sourceCell)) continue;                         // carve-out: authored is truth, not re-derived
      derivedProjCount++;
      // Parse the consumes cell by ALIAS BOUNDARIES — NOT by `;`, because `;` can appear inside a value
      // (e.g. a CSS transition list). Drop markdown code backticks (display only, never semantic); each
      // {alias}'s pin is the text from after it up to the NEXT {alias}. Quotes are part of the value and
      // are NEVER stripped (a quoted CSS font stack must byte-equal its own quoted spine value).
      const cellClean = consumesCell.replace(/`/g, '');
      const am = [...cellClean.matchAll(/\{([a-z][a-z0-9_.\-]*)\}/gi)];
      for (let i = 0; i < am.length; i++) {
        const alias = am[i][1];
        const segStart = am[i].index + am[i][0].length;
        const segEnd = i + 1 < am.length ? am[i + 1].index : cellClean.length;
        const seg = cellClean.slice(segStart, segEnd).trim().replace(/;\s*$/, '').trim(); // strip only the trailing separator
        const pin = seg.startsWith('=') ? seg.slice(1).trim() : null;
        const resolved = resolveSpineValue(alias);
        if (resolved == null) {
          v.push(`[R6a] projection "${name}" (satellites/projections.md) consumes {${alias}} which does not resolve to a spine leaf (drift: renamed/removed token)`);
        } else if (pin != null && pin !== '' && serializeValue(pin) !== serializeValue(resolved)) {  // serialize BOTH sides (structured-OKLCH lockstep, C-1)
          v.push(`[R6a] projection "${name}" (satellites/projections.md) pins {${alias}}="${pin}" but the spine resolves it to "${serializeValue(resolved)}" (drift)`);
        }
      }
    }
  }

  // ---- R6b · protected mark single-source ----
  const markSrc = readText(join(ROOT, 'canon', 'mark.svg'));
  const canonical = markSrc == null ? null : normGeom(extractSvgInner(markSrc) ?? markSrc);
  const instances = [];
  // HTML: only an <svg> that ITSELF carries id="brand-mark" is a mark instance (not a <section id="brand-mark"> anchor).
  for (const f of walkFiles(['.html', '.htm'])) {
    const text = readText(f);
    if (text && /<svg\b[^>]*\bid=["']brand-mark["']/i.test(text)) instances.push({ file: rel(f), inner: normGeom(extractSvgInner(text, 'brand-mark')) });
  }
  // Kit: the brand-mark component is the kit's Mark.{tsx,jsx,js} — a Mark.* OUTSIDE the kit is a different/decorative component.
  for (const f of walkFiles(['.tsx', '.jsx', '.js'])) {
    if (!(f.includes('/design-sync-kit/') && /\/Mark\.(?:tsx|jsx|js)$/.test(f))) continue;
    const text = readText(f);
    if (text && /<svg\b/.test(text)) instances.push({ file: rel(f), inner: normGeom(extractSvgInner(text)) });
  }
  if (canonical == null) {
    // No canonical source → a violation only if something DOES render a mark (else N/A: sonic/verbal/no-mark brand).
    for (const ins of instances) v.push(`[R6b] ${ins.file} renders a brand mark but no canonical single-source canon/mark.svg exists (mark geometry not single-sourced)`);
  } else {
    for (const ins of instances) {
      if (ins.inner == null) v.push(`[R6b] ${ins.file} — could not extract mark geometry to reconcile against canon/mark.svg`);
      else if (ins.inner !== canonical) v.push(`[R6b] ${ins.file} — mark geometry diverges from canon/mark.svg (re-typed/drifted, not single-sourced at the fill-step)`);
    }
  }

  // ---- R6c · asset refs resolve ----
  // Match ASSET refs only — CSS @import / url(), and href/src/data on asset-loading elements.
  // Deliberately NOT a generic href: an <a href="/about"> is NAVIGATION, not an asset, and must not be policed.
  const refRe = /@import\s+(?:url\(\s*)?["']?([^"')\s]+)|url\(\s*["']?([^"')\s]+)|<(?:link|img|script|use|image|source|track|embed|iframe|object|video|audio)\b[^>]*?\b(?:xlink:href|href|src|data)\s*=\s*["']?([^"')\s]+)/gi;
  const safeDecode = (u) => { try { return decodeURIComponent(u); } catch { return u; } };
  const isLocalRef = (u) => u && !/^(?:[a-z][a-z0-9+.\-]*:|\/\/|#|data:)/i.test(u) && !u.startsWith('var(') && u !== 'currentColor';
  const looksLikePath = (u) => /\//.test(u) || /^\.\.?\//.test(u) || /\.[a-z0-9]{1,8}([?#].*)?$/i.test(u); // a slash or a file-extension-like suffix
  for (const f of walkFiles(['.html', '.htm', '.css'])) {
    const text = readText(f); if (!text) continue;
    const dir = f.slice(0, f.lastIndexOf('/'));
    const seen = new Set(); let m; refRe.lastIndex = 0;
    while ((m = refRe.exec(text))) {
      const raw = m[1] || m[2] || m[3]; const u = safeDecode(raw);
      if (!isLocalRef(raw) || !isLocalRef(u)) continue;  // reject if raw OR decoded is non-local (e.g. %23 → #, an in-SVG fragment)
      if (!looksLikePath(u)) continue;                   // only check refs that look like a local file path
      const clean = u.split(/[?#]/)[0]; if (!clean || seen.has(clean)) continue; seen.add(clean);
      const target = clean.startsWith('/') ? join(ROOT, clean) : join(dir, clean);
      if (!existsSync(target)) v.push(`[R6c] ${rel(f)} references "${raw}" which does not resolve to an existing file (dangling import/asset)`);
    }
  }

  add('R6', 'MT-1 · cross-artifact reconciliation — R6a projection drift · R6b mark single-source · R6c asset refs resolve', v,
    `${derivedProjCount} derived projection(s), ${instances.length} mark instance(s), canon/mark.svg ${canonical == null ? 'absent (N/A unless a mark is rendered)' : 'present'}`);
}

// ---------- report ----------
const failed = results.filter((r) => r.status === 'FAIL');
const stamp = process.env.AUDIT_LINT_DATE || '';
const lines = [];
lines.push('# audit-lint report — provenance & completeness gate (MT-3/4/5)');
lines.push('');
lines.push(`Linted root: \`${ROOT}\`${stamp ? ` · ${stamp}` : ''}`);
lines.push(`Inputs: ${tokenFiles.length} token file(s), ${listFiles('canon', '.md').length} canon layer(s), ` +
  `canon.json ${canonJson ? 'present' : 'absent'}, RESIDENT.md ${residentText ? 'present' : 'absent'}, ` +
  `CHECKSUMS.txt ${checksumText ? `${checksumByPath.size} path(s)` : 'absent'}.`);
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
if (parseErrors.length) { lines.push('## Parse errors'); for (const e of parseErrors) lines.push(`- ⚠️ ${e}`); lines.push(''); }
const report = lines.join('\n');

try {
  mkdirSync(join(ROOT, 'audit', 'lint'), { recursive: true });
  writeFileSync(join(ROOT, 'audit', 'lint', 'report.md'), report + '\n');
} catch (e) {
  process.stderr.write(`audit-lint: could not write audit/lint/report.md: ${e.message}\n`);
}

process.stdout.write(report + '\n');
process.exit(failed.length ? 1 : 0);
