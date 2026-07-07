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
//               verified-primary,proxy-relayed,handoff-confirmed,owner-confirmed}; a present
//               sourceRef.origin must be on {capture|relay} (normalized) — closes the
//               "omit/typo the provenance and evade every rule" hole, origin included.
//   R1 (MT-4)  confidence == "corroborated"  ⇒  ≥2 sourceRef entries with DISTINCT `file`,
//              excluding refs marked `origin:"relay"` (a builder transcription is custody, never
//              an independent source — no corroboration padding with self-written files).
//   R2 (MT-4)  source ∈ {inferred, matched, proposed}  ⇒  confidence MUST be "hypothesis"
//              (`proposed` = the quarantine channel: pipeline-authored, operative, never canon).
//   R3 (MT-3)  source == "computed-css" OR confidence above "hypothesis"
//              ⇒  a sourceRef whose `sha256` is listed in CHECKSUMS.txt FOR THAT EXACT `file`
//              (hash bound to the claimed path — a borrowed/ghost-file hash does not satisfy it).
//              handoff-confirmed/proxy-relayed bind to the persisted handoff under sources/.
//   R4 (MT-5)  every value/scheme NAMED in a canon layer or an ALGO maps to EITHER a
//              token artifact OR an open GAP-NNN in RESIDENT.md.
//   R5 (MT-5)  every token at confidence "hypothesis" OR source ∈ {inferred, matched, traced,
//              proposed} carries EXACTLY ONE open GAP-NNN in its own $extensions.brand.gap back-reference.
//
// ANTI-DETERMINISM RECTOR (load-bearing): every rule is GENERAL. The linter never asserts
// that a specific value/ink/scheme exists. A monogram-only / single-ink / sonic-primary brand
// passes CLEAN — `not-used(owner-declared)` dimensions produce no named values to map,
// owner-confirmed declared truth carries its source-of-record, and there are no uncertain
// tokens to track. Zero brand-specific content is encoded here.

import { readFileSync, readdirSync, existsSync, mkdirSync, writeFileSync, statSync } from 'node:fs';
import { join, resolve, relative } from 'node:path';

const ROOT = resolve(process.argv[2] || process.cwd());

// closed enums (mirror gap-protocol.md § The provenance spine — "no extra value/synonym")
// source: `proposed` = pipeline-authored proposal in quarantine (capped at hypothesis + open GAP).
// confidence tiers: 0 unconfirmed = hypothesis · 1 evidence-earned = corroborated, verified-primary ·
//   2 ratified = proxy-relayed, handoff-confirmed, owner-confirmed (who/how the ratification happened).
const SOURCE_ENUM = new Set(['declared-spec', 'owner-stated', 'extracted-vector', 'computed-css', 'design-file', 'matched', 'traced', 'inferred', 'proposed']);
const CONFIDENCE_ENUM = new Set(['hypothesis', 'corroborated', 'verified-primary', 'proxy-relayed', 'handoff-confirmed', 'owner-confirmed']);
// every confidence above hypothesis requires a hashed, path-bound source-of-record (R3)
const HASH_GATED_CONFIDENCE = new Set(['corroborated', 'verified-primary', 'proxy-relayed', 'handoff-confirmed', 'owner-confirmed']);
// handoff-inherited rungs must bind to the persisted handoff itself (R3)
const HANDOFF_BOUND_CONFIDENCE = new Set(['handoff-confirmed', 'proxy-relayed']);
// sources that may never rise above hypothesis on their own (R2)
const HYPOTHESIS_CAPPED_SOURCES = new Set(['inferred', 'matched', 'proposed']);
// sourceRef origin axis (normalized; absent = capture). A typo'd origin must not silently count as capture.
const ORIGIN_ENUM = new Set(['capture', 'relay']);
const refOrigin = (r) => String((r && r.origin) ?? 'capture').trim().toLowerCase();
const isHandoffFile = (f) => /^sources\/handoff—/.test(String(f ?? '').replace(/^\.\//, ''));

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
// C-2: per-scheme materialized sets live one level down in tokens/schemes/ — load them too so the
// scheme-tagged tokens are subject to R0–R6 (provenance/etc.) and visible to R7's role-key parity check.
const schemeFiles = listFiles('tokens/schemes', '.json');
for (const f of schemeFiles) { const j = readJSON(f); if (j) walkTokens(j, [], rel(f)); }
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
const ledgerGaps = new Set(); // every GAP id the ledger knows, ANY status (for dangling-reference checks)
for (const line of residentText.split('\n')) {
  const ids = [...line.matchAll(/GAP-\d+/gi)].map((m) => m[0].toUpperCase());
  if (!ids.length) continue;
  for (const id of ids) ledgerGaps.add(id);
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
    if (!CONFIDENCE_ENUM.has(t.confidence)) v.push(`${t.path} (${t.file}) — provenance.confidence "${t.confidence ?? 'missing'}" is not on the ladder {hypothesis|corroborated|verified-primary|proxy-relayed|handoff-confirmed|owner-confirmed}`);
    for (const r of t.sourceRefs) {
      if (r && r.origin != null && !ORIGIN_ENUM.has(refOrigin(r))) v.push(`${t.path} (${t.file}) — sourceRef.origin "${r.origin}" is not on the origin axis {capture|relay} (a typo'd origin must not silently count as an independent capture)`);
    }
  }
  add('R0', 'MT-3/4 · every value token carries provenance on the closed source/confidence enums', v);
}

// R1 (MT-4): corroborated ⇒ the VALUE appears in ≥2 distinct non-relay sources — counting files was
// never corroboration (a plausible fabrication with two refs to existing files passed): each counted
// TEXT source must actually CONTAIN the token's value (hex case-insensitive, or an oklch() whose numbers
// match the components, or the string value / its first quoted family). A binary/unreadable source stays
// declarative (counts by file — a documented limit); a relay ref never counts at all.
const OKLCH_RE = /oklch\(\s*([\d.]+)%?\s+([\d.]+)\s+([\d.]+)/gi;
function valueInText(txt, value) {
  if (value == null) return true; // nothing derivable — declarative
  if (typeof value === 'object' && Array.isArray(value.components)) {
    const hex6 = typeof value.hex === 'string' ? value.hex.slice(0, 7).toLowerCase() : null;
    if (hex6 && txt.toLowerCase().includes(hex6)) return true;
    const [L, C, H] = value.components;
    for (const m of txt.matchAll(OKLCH_RE)) {
      let l = parseFloat(m[1]); if (m[0].includes('%')) l /= 100;
      if (Math.abs(l - L) <= 0.005 && Math.abs(parseFloat(m[2]) - C) <= 0.005 && Math.abs(parseFloat(m[3]) - H) <= 0.5) return true;
    }
    return false;
  }
  if (typeof value === 'string') {
    if (txt.includes(value)) return true;
    const fam = value.match(/^"([^"]+)"/); // a font stack corroborates on its first quoted family
    if (!fam) return false;
    if (txt.includes(fam[1])) return true;
    // normalized containment: a source naming per-weight faces ("MaisonNeue-book") genuinely corroborates
    // the canonized family ("Maison Neue") — compare alphanumeric-lowercase, family contained in source
    const normFam = fam[1].toLowerCase().replace(/[^a-z0-9]+/g, '');
    return normFam.length >= 4 && txt.toLowerCase().replace(/[^a-z0-9]+/g, '').includes(normFam);
  }
  return true; // other shapes (composite strings already covered above) — declarative
}
{
  const v = [];
  for (const t of tokens) {
    if (t.confidence !== 'corroborated') continue;
    const counted = t.sourceRefs.filter((r) => r && refOrigin(r) !== 'relay');
    const relayN = t.sourceRefs.length - counted.length;
    const bearing = new Set(); const lacking = [];
    for (const r of counted) {
      if (!r.file) continue;
      const fileRel = String(r.file).replace(/^\.\//, '');
      const p = join(ROOT, fileRel);
      const txt = existsSync(p) && !/\.pdf$/i.test(fileRel) ? readText(p) : null;
      if (txt == null || txt.includes('\u0000')) { bearing.add(fileRel); continue; } // binary/unreadable: declarative
      if (valueInText(txt, t.value)) bearing.add(fileRel);
      else lacking.push(fileRel);
    }
    if (bearing.size < 2) v.push(`${t.path} (${t.file}) — confidence "corroborated" but the value is found in only ${bearing.size} distinct non-relay source(s)${relayN ? ` (${relayN} relay ref(s) excluded)` : ''}${lacking.length ? ` — cited file(s) that do NOT contain the value: [${lacking.join(', ')}]` : ''}; corroboration is VALUE agreement across ≥2 independent sources, never a file count`);
  }
  add('R1', 'MT-4 · corroborated ⇒ the value appears in ≥2 distinct non-relay sources', v);
}

// R2 (MT-4): source ∈ {inferred, matched, proposed} ⇒ confidence == hypothesis.
// (`proposed` is the quarantine channel: a pipeline-authored proposal operates today but may never be
// canonized without ratification — the cap plus its open GAP (R5) IS the quarantine.)
{
  const v = [];
  for (const t of tokens) {
    if (!HYPOTHESIS_CAPPED_SOURCES.has(t.source)) continue;
    if (t.confidence !== 'hypothesis') v.push(`${t.path} (${t.file}) — source "${t.source}" capped at "hypothesis" but confidence is "${t.confidence ?? 'none'}"`);
  }
  add('R2', 'MT-4 · inferred/matched/proposed capped at hypothesis', v);
}

// R3 (MT-3): computed-css OR any confidence above hypothesis ⇒ hashed source-of-record (hash bound to
// its own file path). handoff-confirmed/proxy-relayed MUST bind to the persisted handoff
// (sources/handoff—<date>.md, hashed in CHECKSUMS.txt — enforced here); verified-primary MUST bind to a
// file the asset index marks as a PRIMARY MASTER (satellites/asset-index.md `primary-master-for` column —
// the slot→master linkage lives there; repos without an index keep the hash-only floor, noted).
const primaryMasters = new Set();
let assetIndexPresent = false;
{
  const idx = readText(join(ROOT, 'satellites', 'asset-index.md'));
  if (idx != null) {
    assetIndexPresent = true;
    for (const line of idx.split('\n')) {
      if (!line.trim().startsWith('|')) continue;
      const cells = line.split('|').slice(1, -1).map((c) => c.trim());
      if (cells.length < 6 || /^[-:\s]*$/.test(cells[0])) continue;
      const loc = cells[2].replace(/`/g, '').trim();
      const pm = cells[5].replace(/`/g, '').trim();
      if (pm && pm !== '—' && pm !== '-' && !/^</.test(pm) && !/^Repo location$/i.test(cells[2])) primaryMasters.add(loc.replace(/^\.\//, ''));
    }
  }
}
{
  const v = [];
  for (const t of tokens) {
    const gated = t.source === 'computed-css' || HASH_GATED_CONFIDENCE.has(t.confidence);
    if (!gated) continue;
    // handoff-inherited rungs must bind to the persisted handoff itself, not just any hashed file;
    // verified-primary must bind to an index-marked primary master (when the index exists)
    const mustBeHandoff = HANDOFF_BOUND_CONFIDENCE.has(t.confidence);
    const mustBePrimary = t.confidence === 'verified-primary' && assetIndexPresent && primaryMasters.size > 0;
    const hashed = t.sourceRefs.some((r) => {
      if (!r || !r.file || !r.sha256) return false;
      if (mustBeHandoff && !isHandoffFile(r.file)) return false;
      if (mustBePrimary && !primaryMasters.has(String(r.file).replace(/^\.\//, ''))) return false;
      const have = checksumByPath.get(String(r.file).replace(/^\.\//, ''));
      return !!have && have === String(r.sha256).toLowerCase();
    });
    if (!hashed) {
      const refs = t.sourceRefs.map((r) => (r && r.file ? `${r.file}#${r.sha256 ? String(r.sha256).slice(0, 12) : 'no-sha'}` : 'malformed')).join(', ');
      v.push(`${t.path} (${t.file}) — source "${t.source ?? '–'}" / confidence "${t.confidence ?? '–'}" requires a sourceRef whose sha256 is in CHECKSUMS.txt FOR THAT file${mustBeHandoff ? ' AND that file must be the persisted handoff (sources/handoff—<date>.md)' : ''}${mustBePrimary ? ' AND that file must be marked primary-master-for in satellites/asset-index.md (a verified-primary read binds to the slot\'s OFFICIAL master, not any hashed file)' : ''} [${refs || 'no sourceRef'}]`);
    }
  }
  // R3 CITATION-INTEGRITY sub-check (every sourceRef, every token): a cited selector must EXIST in the
  // hashed file or be omitted / "none" (a selector layer that nothing verifies is decorative — the hash
  // chain would certify the emitter's say-so); a cited line must not point past EOF; a PDF cites `page`,
  // never `line`. Binary/unreadable files keep their citations declarative (no text to check).
  for (const t of tokens) {
    for (const r of t.sourceRefs) {
      if (!r || !r.file) continue;
      const fileRel = String(r.file).replace(/^\.\//, '');
      const isPdf = /\.pdf$/i.test(fileRel);
      if (isPdf && r.line != null) { v.push(`${t.path} (${t.file}) — sourceRef ${fileRel} cites "line": ${r.line} on a PDF — cite "page", never "line" (line numbers are meaningless in a PDF)`); }
      const p = join(ROOT, fileRel);
      if (!existsSync(p)) continue; // a missing file is the hash check's finding, not a citation finding
      if (isPdf) continue;
      const txt = readText(p);
      if (txt == null || txt.includes('\u0000')) continue; // binary: citation stays declarative
      if (r.selector != null && String(r.selector).trim() === '') {
        v.push(`${t.path} (${t.file}) — sourceRef ${fileRel} cites an EMPTY selector — omit it or cite "none"`);
      } else if (r.selector != null && String(r.selector) !== 'none' && !txt.includes(String(r.selector))) {
        v.push(`${t.path} (${t.file}) — sourceRef selector "${r.selector}" does not exist in the hashed file ${fileRel} (cite a selector the file actually contains, or "none")`);
      }
      if (r.line != null) {
        const nLines = txt.split('\n').length - (txt.endsWith('\n') ? 1 : 0);
        const ln = Number(r.line);
        if (!Number.isInteger(ln) || ln < 1 || ln > nLines) {
          v.push(`${t.path} (${t.file}) — sourceRef ${fileRel} cites line ${r.line} outside the file (${nLines} line(s))`);
        }
      }
    }
  }
  add('R3', 'MT-3 · computed-css / any confidence above hypothesis ⇒ hashed source-of-record (path-bound)', v);
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
  // dangling GAP cross-references: a GAP-NNN cited in prose (canon layers, canon.json, satellites) that
  // NO ledger row carries (any status) is prose↔ledger drift — a mis-numbered gap reads as tracked while
  // nothing tracks it.
  const proseFiles = [...listFiles('canon', '.md'), ...listFiles('canon', '.json'), ...listFiles('satellites', '.md')];
  for (const f of proseFiles) {
    const txt = readText(f); if (!txt) continue;
    for (const id of new Set([...txt.matchAll(/GAP-\d+/gi)].map((x) => x[0].toUpperCase()))) {
      if (!ledgerGaps.has(id)) v.push(`dangling GAP reference ${id} in ${rel(f)} — no RESIDENT.md ledger row carries it (any status): the prose cites a gap nothing tracks`);
    }
  }
  add('R4', 'MT-5 · every named value/scheme → token artifact OR open GAP; GAP cross-refs resolve to the ledger', v, `${namedAliases.length} named value ref(s), ${namedSchemes.length} named scheme(s) checked`);
}

// R5 (MT-5): uncertain token ⇒ exactly one open GAP-NNN via its own gap back-reference.
{
  const v = [];
  for (const t of tokens) {
    const uncertain = t.confidence === 'hypothesis' || ['inferred', 'matched', 'traced', 'proposed'].includes(t.source);
    if (!uncertain) continue;
    const mapped = new Set(t.gaps.filter((g) => openGaps.has(g)));
    if (mapped.size !== 1) v.push(`${t.path} (${t.file}) — uncertain (confidence "${t.confidence ?? '–'}", source "${t.source ?? '–'}") carries ${mapped.size} open GAP-NNN back-reference [${[...mapped].join(', ') || 'none'}]; must be exactly 1 (set $extensions.brand.gap)`);
  }
  add('R5', 'MT-5 · every hypothesis/inferred/matched/traced/proposed token → exactly one open GAP', v);
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

  // ---- R6a · projection drift (NEVER a silent skip: an absent registry is declared N/A; a MISLOCATED
  // one — projections.md at the repo root instead of satellites/ — is a violation, because it silently
  // escapes every R6a reconciliation while looking present) ----
  let derivedProjCount = 0;
  let r6aNote = null;
  const projText = readText(join(ROOT, 'satellites', 'projections.md'));
  if (!projText) {
    if (readText(join(ROOT, 'projections.md')) != null) {
      v.push('[R6a] projections.md found at the REPO ROOT — the registry lives at satellites/projections.md; a mislocated registry silently escapes reconciliation (vacuous pass)');
    } else {
      r6aNote = 'R6a: satellites/projections.md ABSENT → N/A (no projection registry to reconcile) — declared, never a silent skip';
    }
  }
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

  // ---- R6d · asset-index reconciliation: the consultation map's repo locations must RESOLVE ----
  // (satellites/asset-index.md is emitted from the canon and is in-scope here: a row pointing at a file
  // that does not exist is drift — the one map clients' AIs consult must never dangle. Placeholder rows
  // — angle-bracket templates — are skipped; an absent index is N/A.)
  {
    const idx = readText(join(ROOT, 'satellites', 'asset-index.md'));
    if (idx != null) {
      for (const line of idx.split('\n')) {
        if (!line.trim().startsWith('|')) continue;
        const cells = line.split('|').slice(1, -1).map((c) => c.trim());
        if (cells.length < 3 || /^[-:\s]*$/.test(cells[0]) || /^Entry$/i.test(cells[0])) continue;
        const loc = cells[2].replace(/`/g, '').trim();
        if (!loc || loc === '—' || loc === '-' || /[<>]/.test(loc)) continue; // placeholder/template rows
        const p = join(ROOT, loc.replace(/\/$/, ''));
        if (!existsSync(p)) v.push(`[R6d] asset-index entry "${cells[0]}" points at "${loc}" which does not exist — the consultation map must never dangle`);
      }
    }
  }
  add('R6', 'MT-1 · cross-artifact reconciliation — R6a projection drift · R6b mark single-source · R6c asset refs resolve · R6d asset-index resolves', v,
    `${derivedProjCount} derived projection(s), ${instances.length} mark instance(s), canon/mark.svg ${canonical == null ? 'absent (N/A unless a mark is rendered)' : 'present'}${r6aNote ? ' · ' + r6aNote : ''}`);
}


// R7 (SC-1): every named scheme → a COMPLETE materialized role-token set (role-key parity with the
// DEFAULT scheme) OR status:"deferred" + exactly one open GAP. The deferred escape is a tracked GAP,
// never a bypass; the default scheme itself must be materialized (it defines the parity). General /
// value-blind: a single-scheme (flat) brand materializes one default set and passes; no schemes block ⇒ vacuous.
{
  const v = [];
  const schemeDefs = (canonJson && canonJson.schemes && typeof canonJson.schemes === 'object') ? canonJson.schemes : {};
  const isDeferred = (def) => def && typeof def === 'object' && /^deferred$/i.test(String(def.status ?? ''));
  const roleKeysOf = (s) => new Set(
    tokens.filter((t) => t.scheme === s && t.path.startsWith(`scheme.${s}.`))
          .map((t) => t.path.slice(`scheme.${s}.`.length)));
  const named = Object.keys(schemeDefs).filter((k) => !k.startsWith('$') && k !== 'default');
  const ref = defaultScheme ? roleKeysOf(defaultScheme) : new Set();
  const liveNamed = named.filter((s) => !isDeferred(schemeDefs[s]));
  if (defaultScheme && liveNamed.length && ref.size === 0) {
    v.push(`[R7] default scheme "${defaultScheme}" has NO materialized role-token set (no token tagged $extensions.brand.scheme:"${defaultScheme}" under scheme.${defaultScheme}.*); it defines the role-key parity every scheme must meet`);
  }
  for (const s of named) {
    if (isDeferred(schemeDefs[s])) {
      // Bind the deferred scheme to its DECLARED tracking GAP id (schemes.<id>.gap), then require that exact
      // id be OPEN — NOT a name-match in RESIDENT prose (which collides with ordinary words / sibling rows).
      const gapId = (schemeDefs[s].gap ? String(schemeDefs[s].gap).match(/GAP-\d+/i)?.[0]?.toUpperCase() : null) || null;
      if (!gapId) v.push(`[R7] scheme "${s}" is status:"deferred" but declares no tracking GAP (set canon.json › schemes.${s}.gap to its open GAP-NNN) — deferred is a tracked GAP, not a bypass`);
      else if (!openGaps.has(gapId)) v.push(`[R7] scheme "${s}" is status:"deferred" with tracking GAP ${gapId}, but ${gapId} is not OPEN in RESIDENT.md — a deferred scheme needs exactly one OPEN tracking GAP`);
      continue;
    }
    const keys = roleKeysOf(s);
    if (keys.size === 0) { v.push(`[R7] scheme "${s}" (canon.json › schemes) has NO materialized token set and is not status:"deferred" + GAP — run scheme-derive.mjs, or mark it deferred`); continue; }
    const missing = [...ref].filter((k) => !keys.has(k));
    if (missing.length) v.push(`[R7] scheme "${s}" materialized set is INCOMPLETE — missing role-key(s) [${missing.join(', ')}] present in the default scheme "${defaultScheme}" (N schemes ⇒ N COMPLETE sets, or status:"deferred" + GAP)`);
  }
  add('R7', 'SC-1 · every named scheme → a COMPLETE materialized set (role-key parity with default) OR status:"deferred" + one open GAP', v, `${named.length} named scheme(s); default "${defaultScheme ?? '—'}" role-keys: ${ref.size}`);
}

// R8 (RV-5): prototype completeness — every PRESENT canon section (by brand-content-blind machine signal) is
// rendered as a brandbook surface (a [data-canon-section="<id>"] element in a generated .html) OR carries an
// open GAP-NNN deferral (data-gap). ANTI-DETERMINISM (rector): the present-set is DERIVED from machine signals
// (tokens / canon.json / canon files), NEVER a fixed brandbook checklist — a not-used/absent section needs no
// surface (a flat brand has no schemes section; a sonic / no-mark brand needs no mark section). Shaped like
// R4/R7 (present → satisfied OR open GAP). Value-blind: reads section PRESENCE, never brand content. The doc
// sections (lexicon/misuse/think) are tagged for clarity but NOT machine-required here — their presence is not
// brand-content-blind detectable, so gating them would false-fail minimal brands.
{
  const v = [];
  const present = [];
  if (listFiles('canon', '.md').some((f) => /\/01-[^/]*\.md$/i.test(f))) present.push(['essence', 'canon/01-*.md essence layer present']);
  if (hasColorToken) present.push(['color', 'color tokens present']);
  if (tokens.some((t) => /(?:^|\.)(?:typography|type|font[a-z-]*|line-height)(?:\.|$)/i.test(t.path))) present.push(['type', 'typography/font tokens present']);
  if (existsSync(join(ROOT, 'canon', 'mark.svg'))) present.push(['mark', 'canon/mark.svg present']);
  if (namedSchemes.length >= 1) present.push(['schemes', `canon.json names ${namedSchemes.length} scheme(s)`]);

  // collect prototype surface markers from generated HTML: id -> { surfaced, gaps:Set }
  const markers = new Map();
  const htmlFiles = walkFiles(['.html', '.htm']);
  for (const f of htmlFiles) {
    const raw = readText(f); if (!raw) continue;
    // a marker that lives ONLY inside an HTML comment or an inert <template> is NOT a rendered surface — strip
    // both before matching (mirrors R6b's comment-strip). The <meta>/<html>-attr edge stays a documented residual.
    const text = raw.replace(/<!--[\s\S]*?-->/g, '').replace(/<template\b[^>]*>[\s\S]*?<\/template>/gi, '');
    for (const m of text.matchAll(/data-canon-section\s*=\s*["']([a-z][a-z0-9-]*)["']([^>]*)/gi)) {
      const id = m[1].toLowerCase();
      const gapM = (m[2] || '').match(/data-gap\s*=\s*["'](GAP-\d+)["']/i);
      const rec = markers.get(id) || { surfaced: false, gaps: new Set() };
      if (gapM) rec.gaps.add(gapM[1].toUpperCase()); else rec.surfaced = true;
      markers.set(id, rec);
    }
  }
  // INVERTED enumeration from the ASSET INDEX: the brandbook FAILS BY OMISSION against the index — every
  // index entry of Kind `asset` (a client-visible brand resource the map says EXISTS) must render a
  // [data-asset="<slug>"] surface OR carry an open-GAP deferral. Still anti-determinist: the index is
  // DERIVED per-brand from what exists (never a fixed checklist), so a spare brand enumerates little and
  // passes clean; a repo without an index keeps the present-set floor above.
  const assetEntries = [];
  {
    const idx = readText(join(ROOT, 'satellites', 'asset-index.md'));
    if (idx != null) {
      for (const line of idx.split('\n')) {
        if (!line.trim().startsWith('|')) continue;
        const cells = line.split('|').slice(1, -1).map((c) => c.trim());
        if (cells.length < 3 || /^[-:\s]*$/.test(cells[0]) || /^Entry$/i.test(cells[0]) || /[<>]/.test(cells.join(''))) continue;
        if (/\basset\b/i.test(cells[1])) assetEntries.push(cells[0].toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''));
      }
    }
  }
  const assetMarkers = new Map();
  for (const f of htmlFiles) {
    const raw = readText(f); if (!raw) continue;
    const text = raw.replace(/<!--[\s\S]*?-->/g, '').replace(/<template\b[^>]*>[\s\S]*?<\/template>/gi, '');
    for (const m of text.matchAll(/data-asset\s*=\s*["']([a-z][a-z0-9-]*)["']([^>]*)/gi)) {
      const id = m[1].toLowerCase();
      const gapM = (m[2] || '').match(/data-gap\s*=\s*["'](GAP-\d+)["']/i);
      const rec = assetMarkers.get(id) || { surfaced: false, gaps: new Set() };
      if (gapM) rec.gaps.add(gapM[1].toUpperCase()); else rec.surfaced = true;
      assetMarkers.set(id, rec);
    }
  }
  if (htmlFiles.length) {  // no generated prototype yet (e.g. pre-Stage-8 / non-visual build) ⇒ R8 vacuous
    for (const [id, why] of present) {
      const rec = markers.get(id);
      if (rec && rec.surfaced) continue;                                // rendered as a brandbook surface
      if (rec && [...rec.gaps].some((g) => openGaps.has(g))) continue;  // deferred to an OPEN GAP
      v.push(`[R8] canon section "${id}" is present (${why}) but the generated prototype renders no [data-canon-section="${id}"] surface and declares no open GAP — a present canon section must be a brandbook surface OR carry an open GAP-NNN deferral (data-gap)`);
    }
    for (const slug of assetEntries) {
      const rec = assetMarkers.get(slug);
      if (rec && rec.surfaced) continue;
      if (rec && [...rec.gaps].some((g) => openGaps.has(g))) continue;
      v.push(`[R8] asset-index entry "${slug}" (Kind: asset) renders no [data-asset="${slug}"] brandbook surface and declares no open GAP — the client must SEE every asset the map says exists (fail by omission, enumerated FROM the index)`);
    }
  }
  add('R8', 'RV-5 · brandbook completeness — every present canon section AND every indexed asset → a surface OR an open GAP (fail by omission)', v,
    `${present.length} present section(s) [${present.map((p) => p[0]).join(', ') || '—'}]; ${assetEntries.length} indexed asset(s); ${markers.size + assetMarkers.size} surface marker(s); ${htmlFiles.length} html file(s)`);
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
