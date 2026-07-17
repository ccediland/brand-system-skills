#!/usr/bin/env node
// wire-check.mjs — THE WIRE VERBATIM-CHECK (compiled-wire vs signed-brief; zero-dep Node).
//
// WHAT: verifies every ratification claim in the persisted handoff against the SIGNED BRIEF text it
//   carries — the compilation-seam gate: nothing enters ratified carriers unlabeled or unprovable after
//   the owner's last checkpoint. Checks, in order:
//     1. SIGNED BRIEF presence — ratification markers with no brief = FAIL (the fabrication surface);
//        no markers AND no brief = N/A declared (a CREATE all-empty wire is never false-blocked).
//     2. Per-line `BRIEF{}` lineage in tag scope (WHY content lines · not-used(owner-declared) rows ·
//        owner-confirmed VOICE-EXEMPLARS / WHAT slots): untagged line = FAIL; `verbatim:"…"`/`anchor:"…"`
//        quotes must appear in the brief (whitespace-normalized); `none — compiled` = legal demotion.
//     3. WIRE-CHECK recompute — the scoper's declared counts vs this tool's recompute; discrepancy =
//        a hand-written check, FAIL (the §7a-recompute pattern).
//     4. Wire vocabulary — single-literal enums (fidelity/visibility/route-hint/existing-material),
//        "n/a" banned globally, `url:` needs a scheme, `ingest:` out-of-set needs a NEW-INGEST declaration,
//        posture `→GAP` fields need a GAPS row naming the field. The SIGNED BRIEF text is client prose —
//        the vocabulary scan STOPS at its header.
//
// Usage: node tools/wire-check.mjs [repo-root | wire.md]   (default: cwd; repo-root reads the LATEST
//        sources/handoff—*.md). Exit 0 = PASS or N/A(declared) · exit 1 = FAIL.

import { readFileSync, readdirSync, existsSync, statSync } from 'node:fs';
import { join } from 'node:path';

const arg = process.argv[2] ?? process.cwd();
let wirePath = null;
if (arg.endsWith('.md') && existsSync(arg) && statSync(arg).isFile()) wirePath = arg;
else {
  const dir = join(arg, 'sources');
  if (existsSync(dir)) {
    const cands = readdirSync(dir).filter((n) => /^handoff—.*\.md$/.test(n)).sort();
    if (cands.length) wirePath = join(dir, cands[cands.length - 1]);
  }
}
if (!wirePath) { console.log('wire-check: N/A — no persisted handoff (sources/handoff—*.md) and no wire file given.'); process.exit(0); }

const raw = readFileSync(wirePath, 'utf8');
const norm = (s) => String(s).replace(/\s+/g, ' ').trim();

// ---- split the wire body from the SIGNED BRIEF appendix (last-block rule) ----
const briefHdr = raw.match(/^— SIGNED BRIEF\b.*$/m);
let body = raw, brief = null;
if (briefHdr) {
  body = raw.slice(0, briefHdr.index);
  brief = raw.slice(briefHdr.index + briefHdr[0].length).replace(/````\s*$/m, ''); // tolerate a trailing fence
}
const briefNorm = brief == null ? null : norm(brief);

const problems = [];
const fail = (cls, msg) => problems.push(`[${cls}] ${msg}`);

// ---- marker presence vs brief presence ----
// (the N/A verdict is decided at the END: vocabulary rules apply to ANY wire, ratified or not —
// an all-empty CREATE wire is N/A only when it is ALSO vocabulary-clean)
const hasMarkers = /BRIEF\{|RATIFIED\{|owner-confirmed/.test(body);
if (hasMarkers && brief == null) fail('no-brief', 'ratification markers present but the wire carries NO SIGNED BRIEF appendix — a claim with nothing to check it against');
if (brief != null && briefNorm.length === 0) fail('no-brief', 'SIGNED BRIEF appendix is EMPTY');

// ---- block slicing ----
const blockOf = (name) => {
  const m = body.match(new RegExp(`^— ${name}[\\s\\S]*?(?=^— |$(?![\\s\\S]))`, 'm'));
  return m ? m[0] : null;
};
const why = blockOf('WHY \\(essence\\)');
const what = blockOf('WHAT \\(primitives\\)');
const dimMap = blockOf('DIMENSION MAP');
const posture = blockOf('POSTURE');
const gapsBlock = blockOf('GAPS');
const notes = body.match(/^NOTES:.*$/m)?.[0] ?? '';

// ---- per-line BRIEF{} lineage ----
let markers = 0, verified = 0, demoted = 0;
const misses = [];
const checkQuotesOn = (line, where) => {
  for (const m of line.matchAll(/(verbatim|anchor):"([^"]+)"/g)) {
    if (briefNorm != null && briefNorm.includes(norm(m[2]))) verified += 1;
    else { misses.push(`${where}: ${m[1]}:"${m[2].slice(0, 60)}" not found in the signed brief`); }
  }
  for (const _ of line.matchAll(/BRIEF\{\s*none\b/g)) demoted += 1;
  markers += [...line.matchAll(/BRIEF\{/g)].length;
};

if (why) {
  const lines = why.split('\n').slice(1); // drop the header line (it carries RATIFIED{...})
  for (const lineRaw of lines) {
    const line = lineRaw.trim();
    if (!line || line.startsWith('(')) continue;              // parenthetical guidance, not content
    if (/^(WIRE-CHECK:|NOTES:)/.test(line)) continue;          // wire furniture, not WHY content (minimal wires may lack intervening blocks)
    if (/^PROPOSED\b/.test(line)) continue;                    // quarantine channel — BRIEF{} never applies
    if (/^VOICE-EXEMPLARS\b/.test(line)) {
      if (/confidence:\s*owner-confirmed/.test(line) && !/BRIEF\{/.test(line))
        fail('untagged', `owner-confirmed VOICE-EXEMPLARS line has no BRIEF{} tag: "${line.slice(0, 70)}"`);
      checkQuotesOn(line, 'WHY/VOICE-EXEMPLARS');
      continue;
    }
    if (!/BRIEF\{/.test(line)) { fail('untagged', `WHY content line has no BRIEF{} tag (the wrapper confers nothing): "${line.slice(0, 70)}"`); continue; }
    checkQuotesOn(line, 'WHY');
  }
}
if (what) {
  for (const lineRaw of what.split('\n')) {
    const line = lineRaw.trim();
    if (/confidence:\s*owner-confirmed/.test(line)) {
      if (!/BRIEF\{/.test(line)) fail('untagged', `WHAT slot at owner-confirmed has no BRIEF{} tag: "${line.slice(0, 70)}"`);
      else checkQuotesOn(line, 'WHAT');
    }
  }
}
if (dimMap) {
  for (const lineRaw of dimMap.split('\n')) {
    const line = lineRaw.trim();
    if (!line || line.startsWith('(')) continue;
    const nu = [...line.matchAll(/not-used\(owner-declared\)/g)].length;
    if (!nu) continue;
    const cites = [...line.matchAll(/BRIEF\{\s*verbatim:"([^"]+)"/g)];
    if (cites.length < nu) fail('blanket', `${nu} not-used(owner-declared) row(s) but ${cites.length} BRIEF{ verbatim } citation(s) on: "${line.slice(0, 70)}" — a blanket never mints rows`);
    checkQuotesOn(line, 'DIMENSION MAP/not-used');
  }
}

// ---- WIRE-CHECK recompute ----
const wc = body.match(/^WIRE-CHECK:\s*markers:(\d+)\s*·\s*verified:(\d+)\s*·\s*demoted:(\d+)\s*·\s*misses:(.+)$/m);
if (hasMarkers && brief != null) {
  if (!wc) fail('wire-check', 'no WIRE-CHECK line — the compile verbatim walk was not declared');
  else {
    const [dm, dv, dd] = [Number(wc[1]), Number(wc[2]), Number(wc[3])];
    if (dm !== markers || dv !== verified || dd !== demoted)
      fail('wire-check', `declared counts (markers:${dm} · verified:${dv} · demoted:${dd}) disagree with the recompute (markers:${markers} · verified:${verified} · demoted:${demoted}) — a hand-written check`);
    if (norm(wc[4]) !== 'none') fail('wire-check', `WIRE-CHECK declares misses ("${norm(wc[4])}") — a wire is never emitted with misses`);
  }
}
for (const miss of misses) fail('verbatim-miss', miss);

// ---- vocabulary (body only — the brief is client prose) ----
const vocabScope = body;
// "n/a" ban scans wire text with BRIEF{} tag contents stripped (a verbatim quote may legitimately
// carry client prose) — any remaining n/a as wire text is the banned placeholder.
const naScope = vocabScope.replace(/BRIEF\{[^}]*\}/g, 'BRIEF{}');
for (const m of naScope.matchAll(/^.*\bn\/a\b.*$/gim))
  fail('n/a', `"n/a" is not a wire literal (ambiguous: not-applicable vs not-elicited): "${m[0].trim().slice(0, 70)}"`);
for (const m of vocabScope.matchAll(/fidelity:([^\s·]+)/g))
  if (!['build-grade', 'low-fi', 'pointer-only'].includes(m[1])) fail('vocab-fidelity', `fidelity:${m[1]} — enum is build-grade|low-fi|pointer-only (role:REFERENCE is a ROLE, not a fidelity)`);
for (const m of vocabScope.matchAll(/\burl:([^\s·]+)/g))
  if (!/^https?:\/\//.test(m[1])) fail('vocab-url', `url:${m[1]} — a url carries a scheme or the item moves to ASSETS with an acquire: route / a GAPS row (never a placeholder)`);
for (const m of vocabScope.matchAll(/visibility:([^\s·]+)/g))
  if (!['low', 'moderate', 'high'].includes(m[1])) fail('vocab-visibility', `visibility:${m[1]} — ONE literal of low|moderate|high, never a range`);
const KNOWN_INGEST = ['vector-extract', 'computed-css', 'design-file-native', 'ocr-visual', 'font-match', 'none-needed'];
for (const m of vocabScope.matchAll(/ingest:([^\s·]+)/g))
  if (!KNOWN_INGEST.includes(m[1]) && !new RegExp(`NEW-INGEST:\\s*${m[1].replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`).test(notes))
    fail('vocab-ingest', `ingest:${m[1]} — outside the known set with no NEW-INGEST declaration in NOTES (extension by declaration, never drift)`);
for (const m of vocabScope.matchAll(/route-hint:([^\s·]+)/g))
  if (!['procedural', 'generative', 'vector-trace', 'raster-required', 'unknown'].includes(m[1])) fail('vocab-route-hint', `route-hint:${m[1]} — ONE token of the enum (compounds banned; doubt is "unknown")`);
for (const m of vocabScope.matchAll(/existing-material:([^\s·]+)/g))
  if (!['y', 'n'].includes(m[1])) fail('vocab-existing-material', `existing-material:${m[1]} — enum is y|n; unelicited closes tagged-gap + a GAPS row`);
if (posture) {
  for (const m of posture.matchAll(/([a-z][a-z-]*):→GAP/g)) {
    if (!gapsBlock || !gapsBlock.toLowerCase().includes(m[1].toLowerCase()))
      fail('born-gap', `posture ${m[1]}:→GAP has no GAPS row naming "${m[1]}" — a born gap ships visibly or not at all`);
  }
}

// ---- verdict ----
if (problems.length) {
  for (const p of problems) console.log(`❌ ${p}`);
  console.log(`wire-check: FAIL — ${problems.length} problem(s) · ${wirePath}`);
  process.exit(1);
}
if (!hasMarkers && brief == null) {
  console.log('wire-check: N/A (declared) — no ratification markers, no SIGNED BRIEF, vocabulary clean: nothing claims what a brief must prove (an all-empty CREATE wire passes here honestly).');
  process.exit(0);
}
console.log(`wire-check: PASS — markers:${markers} · verified:${verified} · demoted:${demoted} · misses:0 · ${wirePath}`);
process.exit(0);
