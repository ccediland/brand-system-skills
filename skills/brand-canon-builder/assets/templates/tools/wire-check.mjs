#!/usr/bin/env node
// wire-check.mjs — THE WIRE VERBATIM-CHECK (compiled-wire vs signed-brief; zero-dep Node).
//
// WHAT: verifies every ratification claim in the persisted handoff against the SIGNED BRIEF text it
//   carries — the compilation-seam gate: nothing enters ratified carriers unlabeled or unprovable after
//   the owner's last checkpoint. Checks, in order:
//     1. STRUCTURE — exactly ONE `— SIGNED BRIEF` header (the LAST block; an early/dup header is an attack
//        signal, FAIL); a brief slice carrying wire furniture FAILS; RATIFIED{ with no parseable WHY block
//        FAILS; ratification markers with no brief = FAIL. No markers AND no brief = N/A declared at the
//        END (a CREATE all-empty wire is never false-blocked — and vocabulary still scans).
//     2. Per-line `BRIEF{}` lineage in tag scope (WHY content lines · not-used(owner-declared) rows
//        ANYWHERE in the body · owner-confirmed VOICE-EXEMPLARS / WHAT slots): untagged line = FAIL;
//        every tag must parse to one of the THREE legal forms (a tag that certifies nothing = FAIL);
//        `verbatim` quotes must appear in the brief AND cover the value they certify (content-bind);
//        `anchor` needs substance (≥ 2 words · ≥ 12 chars; the brief's title line is not an anchor corpus).
//     3. WIRE-CHECK recompute + the identity markers === verified + demoted + unparseable(0); body-wide
//        reconciliation: every BRIEF{ tag in the body is WALKED (a tag parked out of scope = FAIL).
//     4. Wire vocabulary — single-literal enums, "n/a" banned as a field VALUE, `url:` needs a scheme,
//        `ingest:` out-of-set needs a NEW-INGEST declaration (NOTES block, multi-line), posture `→GAP`
//        needs a GAPS row naming the field (English name or the machine carrier `field:<name>`).
//   LIMIT (declared): this gate proves INTERNAL consistency (wire ↔ its carried brief); the brief's
//   AUTHENTICITY (it IS the owner-signed 7a text) is the Stage-0 hash + signing-discipline's job — a green
//   wire-check never substitutes for that.
//
// Usage: node tools/wire-check.mjs [repo-root | wire.md]   (default: cwd; repo-root reads the LATEST
//        sources/handoff—*.md by date-name). Exit 0 = PASS or N/A(declared) · exit 1 = FAIL.

import { readFileSync, readdirSync, existsSync, statSync } from 'node:fs';
import { join } from 'node:path';

const arg = process.argv[2] ?? process.cwd();
let wirePath = null;
if (arg.endsWith('.md')) {
  if (!existsSync(arg) || !statSync(arg).isFile()) { console.error(`wire-check: ERROR — wire file not found: ${arg}`); process.exit(1); }
  wirePath = arg;
} else {
  const dir = join(arg, 'sources');
  if (existsSync(dir)) {
    const cands = readdirSync(dir).filter((n) => /^handoff[—-].*\.md$/.test(n))
      .sort((a, b) => (a.replace(/\.md$/, '') < b.replace(/\.md$/, '') ? -1 : 1)); // sort sans extension: a same-day corrective suffix sorts AFTER its base
    if (cands.length) wirePath = join(dir, cands[cands.length - 1]);
  }
}
if (!wirePath) { console.log('wire-check: N/A — no persisted handoff (sources/handoff—*.md) and no wire file given.'); process.exit(0); }

const raw = readFileSync(wirePath, 'utf8');
const norm = (s) => String(s).normalize('NFC').replace(/\s+/g, ' ').trim(); // NFC: NFD briefs (PDF/macOS extraction) vs NFC-typed quotes are visually identical es-MX text

const problems = [];
const fail = (cls, msg) => problems.push(`[${cls}] ${msg}`);

// ---- split the wire body from the SIGNED BRIEF appendix (last-block rule, ENFORCED) ----
const briefHdrs = [...raw.matchAll(/^— SIGNED BRIEF\b.*$/gm)];
let body = raw, brief = null;
if (briefHdrs.length > 1) fail('structure', `${briefHdrs.length} "— SIGNED BRIEF" headers — the appendix is exactly ONE block, ALWAYS the last (an early header that swallows the body is an attack signal)`);
if (briefHdrs.length) {
  const hdr = briefHdrs[briefHdrs.length - 1]; // LAST header — the contract's own rule
  body = raw.slice(0, hdr.index);
  brief = raw.slice(hdr.index + hdr[0].length).replace(/````\s*$/m, ''); // tolerate a trailing fence
  if (/^— [A-Z]|RATIFIED\{|BRIEF\{|^WIRE-CHECK:/m.test(brief)) fail('structure', 'the SIGNED BRIEF slice contains wire furniture (a block header / RATIFIED{ / BRIEF{ / WIRE-CHECK:) — the appendix is client brief text only');
}
const briefNorm = brief == null ? null : norm(brief);
// the brief's own first non-empty line (its title) is NOT an anchor corpus — an always-present title must not ratify arbitrary prose
const briefAnchorCorpus = briefNorm == null ? null : norm((brief ?? '').split('\n').filter((l) => l.trim()).slice(1).join('\n'));

// ---- marker presence vs brief presence ----
const hasMarkers = /BRIEF\{|RATIFIED\{|confidence:\s*owner-confirmed/.test(body); // carrier FORM only — the word "owner-confirmed" in free prose is not a marker (W-15)
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
const notes = body.match(/^NOTES:[\s\S]*?(?=\n\s*\n|^— |^WIRE-CHECK:|$(?![\s\S]))/m)?.[0] ?? ''; // full NOTES block — a NEW-INGEST declaration may wrap
if (/RATIFIED\{/.test(body) && !why) fail('structure', 'RATIFIED{ present but no parseable "— WHY (essence)" block — a renamed/mangled header walks nothing and proves nothing');

// ---- per-line BRIEF{} lineage ----
let markers = 0, verified = 0, demoted = 0;
const misses = [];
// Tag grammar: every BRIEF{...} must parse to exactly one legal form — a tag that certifies nothing never counts.
// Quotes accept "…" or «…» (× the inner-ASCII-quote case: «…» carries signed words that contain ");
// capture runs to the LAST closing delimiter before } or ·.
const TAG_RE = /BRIEF\{\s*(?:(verbatim|anchor)\s*:\s*(?:"(.+?)"|«(.+?)»)\s*|(none)\b[^}]*)\}/g;
// strip only QUOTE-BEARING parentheticals — the cf.-smuggle vector needs a quoted fragment inside parens;
// a legitimate value like oklch(0.86 0 0) carries none and survives.
const stripParens = (s) => s.replace(/\([^)]*["«][^)]*\)/g, ' ');
const stripTags = (s) => s.replace(/BRIEF\{[^}]*\}/g, ' ');
const checkQuotesOn = (line, where, bind) => {
  // bind: null = no content-bind (not-used rows — the quote is the owner's declaration, external to row text)
  //       {scope, coverage} = verbatim quote must appear in scope (tags+parens stripped); coverage=true adds
  //       the ≥50%-of-value floor (a real fragment embedded in fabrication never legitimizes the line).
  const tags = [...line.matchAll(TAG_RE)];
  const rawTagCount = [...line.matchAll(/BRIEF\{/g)].length;
  if (tags.length < rawTagCount) fail('tag-grammar', `${where}: ${rawTagCount - tags.length} BRIEF{} tag(s) do not parse to verbatim:"…" | anchor:"…" | none — a marker that certifies nothing never counts: "${line.slice(0, 70)}"`);
  markers += rawTagCount;
  for (const t of tags) {
    if (t[4]) { demoted += 1; continue; } // none — compiled, hypothesis
    const kind = t[1], quote = t[2] ?? t[3];
    const corpus = kind === 'anchor' ? briefAnchorCorpus : briefNorm;
    const inBrief = corpus != null && corpus.includes(norm(quote));
    if (kind === 'anchor' && (norm(quote).length < 12 || norm(quote).split(' ').length < 2)) {
      fail('anchor-floor', `${where}: anchor:"${quote.slice(0, 40)}" lacks substance (≥ 2 words · ≥ 12 chars) — a trivial anchor ratifies nothing`);
      continue;
    }
    if (!inBrief) { misses.push(`${where}: ${kind}:"${quote.slice(0, 60)}" not found in the signed brief${kind === 'anchor' ? " (the brief's title line is not an anchor corpus)" : ''}`); continue; }
    if (kind === 'verbatim' && bind != null) {
      const content = norm(stripParens(stripTags(bind.scope)));
      if (!content.includes(norm(quote))) { fail('content-bind', `${where}: verbatim quote "${quote.slice(0, 60)}" is in the brief but NOT in the wire content it certifies — a real quote never legitimizes different content`); continue; }
      if (bind.coverage) {
        const value = norm(stripParens(stripTags(bind.value ?? ''))).replace(/[·\s]+$/, '');
        if (value && norm(quote).length < value.length * 0.5) { fail('content-bind', `${where}: verbatim quote covers <50% of the value it certifies ("${value.slice(0, 50)}") — a signed fragment embedded in compiled prose is anchor-or-demote territory, never verbatim`); continue; }
      }
    }
    verified += 1;
  }
};

if (why) {
  const lines = why.split('\n').slice(1); // drop the header line (it carries RATIFIED{...})
  for (const lineRaw of lines) {
    const line = lineRaw.trim();
    if (!line) continue;
    // guidance skip is NARROW: purely parenthetical AND not field-shaped AND tag-free (a '('-wrapped field is still content — the paren-evasion class)
    if (line.startsWith('(') && line.endsWith(')') && !/BRIEF\{/.test(line) && !/^\(\s*[A-Za-z][^:()]{0,40}:/.test(line)) continue;
    if (/^(WIRE-CHECK:|NOTES:)/.test(line)) continue;          // wire furniture, not WHY content (minimal wires may lack intervening blocks)
    if (/^PROPOSED\b/.test(line)) continue;                    // quarantine channel — BRIEF{} never applies
    if (/PROVENANCE\{[^}]*$/.test(line) || /confidence:\s*$/.test(line)) { fail('structure', `WHY: a PROVENANCE{/confidence: unit split across physical lines — a split token is a malformed record, not a legal wire: "${line.slice(0, 70)}"`); continue; }
    if (/^VOICE-EXEMPLARS\b/.test(line)) {
      if (/confidence:\s*owner-confirmed/.test(line) && !/BRIEF\{/.test(line))
        fail('untagged', `owner-confirmed VOICE-EXEMPLARS line has no BRIEF{} tag: "${line.slice(0, 70)}"`);
      checkQuotesOn(line, 'WHY/VOICE-EXEMPLARS', { scope: line });  // substring bind (the quote is the utterance inside a compound line)
      continue;
    }
    if (!/BRIEF\{/.test(line)) { fail('untagged', `WHY content line has no BRIEF{} tag (the wrapper confers nothing): "${line.slice(0, 70)}"`); continue; }
    if ([...line.matchAll(/BRIEF\{/g)].length > 1) { fail('structure', `WHY: ${[...line.matchAll(/BRIEF\{/g)].length} tags on one line — the emitted wire carries ONE field per line (a tagged field must not immunize an untagged neighbor): "${line.slice(0, 70)}"`); continue; }
    const value = line.slice(line.indexOf(':') + 1); // the value segment the verbatim covers
    checkQuotesOn(line, 'WHY', { scope: line, coverage: true, value });
  }
}
if (what) {
  // a WHAT slot spans physical lines (value line + `· PROVENANCE{…} · BRIEF{…}` continuations): reconstitute
  // the logical RECORD before scanning — a token split across lines is a malformed record, never a dodge.
  const rawLines = what.split('\n').slice(1).map((l) => l.trim()).filter(Boolean);
  const records = [];
  for (const l of rawLines) {
    if (l.startsWith('·') && records.length) records[records.length - 1] += ' ' + l;
    else records.push(l);
  }
  for (const rec of records) {
    if (/PROVENANCE\{[^}]*$/.test(rec) || /confidence:\s*$/.test(rec)) { fail('structure', `WHAT: a PROVENANCE{/confidence: unit split across records — malformed record: "${rec.slice(0, 70)}"`); continue; }
    if (/confidence:\s*owner-confirmed/.test(rec)) {
      if (!/BRIEF\{/.test(rec)) fail('untagged', `WHAT slot at owner-confirmed has no BRIEF{} tag: "${rec.slice(0, 70)}"`);
      else checkQuotesOn(rec, 'WHAT', { scope: rec });
    }
  }
}
if (dimMap) {
  const nuQuotes = [];
  for (const lineRaw of dimMap.split('\n')) {
    const line = lineRaw.trim();
    if (!line) continue;
    const nu = [...line.matchAll(/not-used\(owner-declared\)/g)].length;
    if (!nu) continue; // NOTE: no parenthetical skip here — a '('-wrapped not-used row is still a row
    const cites = [...line.matchAll(/BRIEF\{\s*verbatim\s*:\s*(?:"(.+?)"|«(.+?)»)/g)];
    if (cites.length < nu) fail('blanket', `${nu} not-used(owner-declared) row(s) but ${cites.length} BRIEF{ verbatim } citation(s) on: "${line.slice(0, 70)}" — a blanket never mints rows`);
    for (const c of cites) nuQuotes.push(norm(c[1] ?? c[2]));
    checkQuotesOn(line, 'DIMENSION MAP/not-used', null);
  }
  if (new Set(nuQuotes).size < nuQuotes.length) fail('blanket', 'the SAME confirming quote mints more than one not-used row — a dimension-specific declaration is per dimension (duplicated citation = a blanket in disguise)');
}
// not-used(owner-declared) OUTSIDE the DIMENSION MAP (CORE-ASSET lines etc.): same law — the literal mints
// an owner declaration wherever it appears, so it carries its citation wherever it appears.
for (const lineRaw of body.split('\n')) {
  const line = lineRaw.trim();
  if (!line || (dimMap && dimMap.includes(lineRaw))) continue;
  const nu = [...line.matchAll(/not-used\(owner-declared\)/g)].length;
  if (!nu) continue;
  const cites = [...line.matchAll(/BRIEF\{\s*verbatim\s*:\s*(?:"(.+?)"|«(.+?)»)/g)];
  if (cites.length < nu) fail('blanket', `${nu} not-used(owner-declared) outside the DIMENSION MAP with ${cites.length} citation(s): "${line.slice(0, 70)}" — the literal carries its quote wherever it mints`);
  else checkQuotesOn(line, 'not-used (body)', null);
}

// ---- WIRE-CHECK recompute + identities ----
const wc = body.match(/^WIRE-CHECK:\s*markers:\s*(\d+)\s*·\s*verified:\s*(\d+)\s*·\s*demoted:\s*(\d+)\s*·\s*misses:\s*(.+)$/m);
if (hasMarkers && brief != null) {
  if (!wc) fail('wire-check', 'no WIRE-CHECK line — the compile verbatim walk was not declared');
  else {
    const [dm, dv, dd] = [Number(wc[1]), Number(wc[2]), Number(wc[3])];
    if (dm !== markers || dv !== verified || dd !== demoted)
      fail('wire-check', `declared counts (markers:${dm} · verified:${dv} · demoted:${dd}) disagree with the recompute (markers:${markers} · verified:${verified} · demoted:${demoted}) — a hand-written check`);
    if (norm(wc[4]) !== 'none') fail('wire-check', `WIRE-CHECK declares misses ("${norm(wc[4])}") — a wire is never emitted with misses`);
  }
  // body-wide reconciliation: every tag in the body is WALKED — a marker parked outside the tag scope
  // (GAPS, HOW, a filled dimension) renders as verified lineage to a human while proving nothing.
  const bodyTags = body.split('\n').filter((l) => !/^\s*PROPOSED\b/.test(l.trim())).join('\n');
  const totalTags = [...bodyTags.matchAll(/BRIEF\{/g)].length;
  if (totalTags !== markers) fail('unwalked-markers', `${totalTags} BRIEF{ tag(s) in the body but only ${markers} walked — a tag outside the tag scope decorates, it never certifies`);
  if (!misses.length && markers !== verified + demoted) fail('wire-check', `identity broken: markers(${markers}) !== verified(${verified}) + demoted(${demoted}) with zero misses — some tag was counted but never certified`);
}
for (const miss of misses) fail('verbatim-miss', miss);

// ---- vocabulary (body only — the brief is client prose) ----
const vocabScope = body;
// "n/a" ban applies to the field-VALUE position (after :, ·, or start-of-value) — client prose inside an
// already-verified BRIEF{} quote is exempt (tag contents stripped), and prose mentions are the walk's job.
const naScope = vocabScope.replace(/BRIEF\{[^}]*\}/g, 'BRIEF{}');
for (const m of naScope.matchAll(/^.*[:·]\s*n\/a\b.*$/gim))
  fail('n/a', `"n/a" is not a wire field value (ambiguous: not-applicable vs not-elicited): "${m[0].trim().slice(0, 70)}"`);
for (const m of vocabScope.matchAll(/\bfidelity:\s*([^\s·]+)/g))
  if (!['build-grade', 'low-fi', 'pointer-only'].includes(m[1])) fail('vocab-fidelity', `fidelity:${m[1]} — enum is build-grade|low-fi|pointer-only (role:REFERENCE is a ROLE, not a fidelity)`);
for (const m of vocabScope.matchAll(/\burl:\s*([^\s·]+)/g))
  if (!/^https?:\/\//.test(m[1])) fail('vocab-url', `url:${m[1]} — a url carries a scheme or the item moves to ASSETS with an acquire: route / a GAPS row (never a placeholder)`);
for (const m of vocabScope.matchAll(/\bvisibility:\s*([^\s·]+)/g))
  if (!['low', 'moderate', 'high'].includes(m[1])) fail('vocab-visibility', `visibility:${m[1]} — ONE literal of low|moderate|high, never a range`);
const KNOWN_INGEST = ['vector-extract', 'computed-css', 'design-file-native', 'ocr-visual', 'font-match', 'none-needed'];
for (const m of vocabScope.matchAll(/\bingest:\s*([^\s·]+)/g))
  if (!KNOWN_INGEST.includes(m[1]) && !new RegExp(`NEW-INGEST:\\s*${m[1].replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`).test(notes))
    fail('vocab-ingest', `ingest:${m[1]} — outside the known set with no NEW-INGEST declaration in NOTES (extension by declaration, never drift)`);
for (const m of vocabScope.matchAll(/\broute-hint:\s*([^\s·]+)/g))
  if (!['procedural', 'generative', 'vector-trace', 'raster-required', 'unknown'].includes(m[1])) fail('vocab-route-hint', `route-hint:${m[1]} — ONE token of the enum (compounds banned; doubt is "unknown")`);
for (const m of vocabScope.matchAll(/\bexisting-material:\s*([^\s·]+)/g))
  if (!['y', 'n'].includes(m[1])) fail('vocab-existing-material', `existing-material:${m[1]} — enum is y|n; unelicited closes tagged-gap + a GAPS row`);
if (posture) {
  for (const m of posture.matchAll(/([a-z][a-z-]*):\s*→GAP/g)) {
    const named = gapsBlock && (gapsBlock.toLowerCase().includes(m[1].toLowerCase()) || gapsBlock.includes(`field:${m[1]}`));
    if (!named) fail('born-gap', `posture ${m[1]}:→GAP has no GAPS row naming "${m[1]}" (English name or the machine carrier field:${m[1]} — GAPS is client-language, the carrier is wire furniture) — a born gap ships visibly or not at all`);
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
