#!/usr/bin/env node
// emit-cards.mjs — the OFFLINE static-cards emitter (zero-dep Node, a capability of the design-sync KIT).
//
// WHAT: reads the canon (tokens/*.tokens.json · tokens/schemes/*.json · canon/canon.json · canon/mark.svg)
//   and writes N self-contained `@dsCard` static HTML cards to design-sync-kit/cards/NN-<group>.html — one
//   card per PRESENT canon layer (Brand if a mark · Color if colour tokens · Type if font tokens · Components
//   if colours/schemes). Each card renders with NO React, NO bundle, NO converter, NO NETWORK — a single
//   self-contained file. This is the offline path the kit lacked: the design-sync converter needs a networked
//   npm build (dist/) + a browser-global bundle to render its React cards, so `[NO_DIST]` left nothing
//   reviewable. These cards make `[NO_DIST]` a valid, reviewable handoff state (the offline fallback).
//
// WHY OFFLINE-STRICT: the frozen reference workaround (a hand-authored static set) still pulled fonts from a
//   remote CDN @font-face — a hidden network dependency. This emitter emits ZERO remote refs: fonts render via
//   the canon's font STACK with system fallbacks (never @font-face), no <script>, no <link>, no data: remote,
//   no fetch. `emit-cards.mjs --check <root>` re-verifies that offline guarantee ([REMOTE_REF]) + the
//   registration marker ([DSCARD_MISSING]) + non-emptiness ([EMPTY_CARDS]) — named codes, exit 0/1, like
//   package-validate.mjs.
//
// PROVENANCE HONESTY (materialization confers nothing — the T2 doctrine): a card reads confidence FROM each
//   consumed token; a value that is still uncertain (confidence "hypothesis", or source inferred/matched/
//   traced/proposed — audit-lint R5's exact test) renders with a sanctioned CLIENT marker ("· provisional"),
//   NEVER operator vocab (no GAP ids, no confidence grades, no cycle-IDs). A card never presents a draft as
//   settled and never claims more confidence than its line. The cards land under the existing
//   `design-sync-kit/** | client` surface row, so client-deny-lint --manifest scrubs them automatically.
//
// CUSTODY (derived-artifact, the tokens-project pattern): each card records one sources/MANIFEST.json entry
//   PER canonical input it consumed ({file: card, parent:{file: input, sha256}, tool: 'emit-cards.mjs'}); the
//   run-gates custody gate recomputes each parent hash, so ANY canon change under a card = STALE FAIL.
//
// Usage: node tools/emit-cards.mjs [repo-root]            # emit the cards + record custody
//        node tools/emit-cards.mjs --check [repo-root]    # verify emitted cards are offline + marked (no emit)

import { readFileSync, writeFileSync, existsSync, mkdirSync, readdirSync, statSync, rmSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { join, relative } from 'node:path';

const argv = process.argv.slice(2);
const CHECK = argv.includes('--check');
const ROOT = argv.find((a) => !a.startsWith('--')) ?? process.cwd();
const CARDS_DIR = join(ROOT, 'design-sync-kit', 'cards');
const CARDS_REL = 'design-sync-kit/cards';

// ---------- tiny helpers ----------
const readText = (p) => { try { return readFileSync(p, 'utf8'); } catch { return null; } };
const readJSON = (p) => { const t = readText(p); if (t == null) return null; try { return JSON.parse(t); } catch { return null; } };
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const humanize = (s) => String(s).replace(/[-_.]/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());

// C-1 canonical OKLCH string (byte-parity with tokens-project / audit-lint serializeValue)
const canonNum = (n) => { const x = Number(n); return Number.isFinite(x) ? String(x) : String(n).trim(); };
function oklchStr(v) {
  if (v != null && typeof v === 'object' && !Array.isArray(v) && v.colorSpace && Array.isArray(v.components)) {
    const a = v.alpha == null || Number(v.alpha) === 1 ? '' : ` / ${canonNum(v.alpha)}`;
    return `${String(v.colorSpace).toLowerCase()}(${v.components.map(canonNum).join(' ')}${a})`;
  }
  return typeof v === 'string' ? v : '';
}
const isAlias = (v) => typeof v === 'string' && /^\{.+\}$/.test(v.trim());
// audit-lint R5's exact "uncertain" test — a card marks these PROVISIONAL in client vocab, never operator vocab
const isProvisional = (t) => t.confidence === 'hypothesis' || ['inferred', 'matched', 'traced', 'proposed'].includes(t.source);

// SANITIZERS — a token $value is UNTRUSTED text placed into a CSS context; never interpolate it raw (a value
// like `serif;}</style><img src=…>` would break out of <style> and inject markup). A value that is not a
// well-formed CSS colour / font-family is DROPPED (the face falls back to the system stack; the colour var is
// omitted) — never emitted. Structured-OKLCH values are always safe (oklchStr emits `oklch(<numbers>)`).
const CSS_COLOR_RE = /^(?:#[0-9a-f]{3,8}|oklch\([0-9.\s/%]+\)|oklab\([0-9.\s/%-]+\)|rgba?\([0-9.,\s/%]+\)|hsla?\([0-9.,\s/%]+\)|[a-z]+)$/i;
const FONT_STACK_RE = /^[\w\s"',.-]+$/;                 // families, quotes, commas, spaces, dots, hyphens only
const safeColor = (str) => (typeof str === 'string' && CSS_COLOR_RE.test(str.trim()) ? str.trim() : null);
const safeFont = (str) => (typeof str === 'string' && FONT_STACK_RE.test(str.trim()) ? str.trim() : null);

// ---------- collect canon leaves ----------
function walkTokens(node, path, type, out) {
  if (node == null || typeof node !== 'object' || Array.isArray(node)) return;
  const t = node.$type ?? type;
  if (Object.prototype.hasOwnProperty.call(node, '$value')) {
    const brand = (node.$extensions && node.$extensions.brand) || {};
    const prov = brand.provenance || {};
    out.push({ path: path.join('.'), type: t, value: node.$value, isAlias: isAlias(node.$value),
      source: prov.source ?? null, confidence: prov.confidence ?? null, scheme: brand.scheme ?? null, role: brand.role ?? null });
    return;
  }
  for (const [k, v] of Object.entries(node)) if (!k.startsWith('$')) walkTokens(v, [...path, k], t, out);
}

function listJSON(dir) {
  const abs = join(ROOT, dir); const out = [];
  if (!existsSync(abs)) return out;
  for (const n of readdirSync(abs)) { try { if (statSync(join(abs, n)).isFile() && n.endsWith('.json')) out.push(join(dir, n)); } catch {} }
  return out.sort();
}

// resolve an alias {tier.category.name} to a terminal token (for semantic → base)
function buildResolver(leaves) {
  const byPath = new Map(leaves.map((t) => [t.path, t]));
  return function resolve(path, seen = new Set()) {
    if (seen.has(path)) return null; seen.add(path);
    const t = byPath.get(path); if (!t) return null;
    if (t.isAlias) return resolve(t.value.trim().replace(/^\{|\}$/g, ''), seen);
    return t;
  };
}

// ---------- the self-contained card shell (NO @font-face, NO remote, NO script) ----------
function cardShell(group, displayStack, bodyStack, bodyHtml, extraVars) {
  const disp = displayStack || 'Georgia, "Times New Roman", serif';
  const body = bodyStack || 'system-ui, -apple-system, "Segoe UI", Roboto, sans-serif';
  // FIRST LINE is the @dsCard marker (the design-sync registration path; a later live re-sync upgrades in place).
  return `<!-- @dsCard group="${esc(group)}" -->
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <style>
    :root { --fg:#1b1b1d; --bg:#ffffff; --surface:#f4f4f5; --muted:#6b7280; --line:#e4e4e7;
      --display:${disp}; --body:${body};${extraVars ? ' ' + extraVars : ''} }
    * { box-sizing:border-box } body { margin:0; font-family:var(--body); background:var(--bg); color:var(--fg) }
    .pad { padding:40px; max-width:64rem }
    .ey { font-family:var(--display); text-transform:uppercase; letter-spacing:.22em; font-size:.7rem; color:var(--muted); margin:0 0 22px }
    h1,h2 { font-family:var(--display); margin:0 }
    .note { color:var(--muted); font-size:.8rem; margin-top:16px; max-width:46rem }
    .prov { color:var(--muted); font-style:italic }
    .swatches { display:grid; grid-template-columns:repeat(auto-fill,minmax(150px,1fr)); gap:14px }
    .sw { border:1px solid var(--line); border-radius:2px; overflow:hidden }
    .sw .chip { height:96px } .sw .meta { padding:10px 12px; font-size:.78rem }
    .sw .val { color:var(--muted); font-size:.72rem; word-break:break-all }
    .mark-frame svg { width:160px; height:160px; max-width:100% }
    .row { display:flex; gap:14px; align-items:center; flex-wrap:wrap }
    button { font:inherit; font-weight:600; letter-spacing:.02em; border-radius:2px; padding:.8em 1.5em; cursor:pointer }
    input { font:inherit; padding:.7em 1em; border:1px solid var(--line); border-radius:2px; background:var(--surface); color:var(--fg) }
  </style>
</head>
<body>
<div class="pad">
<p class="ey">${esc(group)}</p>
${bodyHtml}
</div>
</body>
</html>
`;
}

const provSpan = (t) => (isProvisional(t) ? ' <span class="prov">· provisional</span>' : '');

// ---------- read the canon ----------
const tokenFiles = [...listJSON('tokens'), ...listJSON('tokens/schemes')];
const leaves = [];
for (const f of tokenFiles) { const j = readJSON(join(ROOT, f)); if (j) walkTokens(j, [], null, leaves); }
const resolve = buildResolver(leaves);
const inputs = new Set();               // canonical inputs a card consumes → custody parents (path per card handled below)

const colors = leaves.filter((t) => t.type === 'color' && !t.isAlias && !t.scheme && safeColor(oklchStr(t.value)));
const fonts = leaves.filter((t) => t.type === 'fontFamily' && typeof t.value === 'string' && !t.isAlias && safeFont(t.value));
const markSvgRaw = readText(join(ROOT, 'canon', 'mark.svg'));
const canonJson = readJSON(join(ROOT, 'canon', 'canon.json'));
const schemeDefs = (canonJson && canonJson.schemes && typeof canonJson.schemes === 'object') ? canonJson.schemes : {};
const schemeLeaves = leaves.filter((t) => t.scheme && t.type === 'color');

// font stacks: pick a display + a body stack from font-family tokens (by name hint, else first/last).
// The token $value IS already a valid CSS font-family list (e.g. `"Body Face", system-ui, sans-serif`) —
// pass it through verbatim; never strip quotes (an unbalanced quote corrupts the whole :root closure).
const pickFont = (hint) => (fonts.find((f) => new RegExp(hint, 'i').test(f.path)) || null);
const displayStack = (pickFont('display|head|title|serif') || fonts[0] || null)?.value || null;
const bodyStack = (pickFont('body|text|sans') || fonts[fonts.length - 1] || null)?.value || null;

// which token file(s) back a given set of leaves (for custody) — recompute by re-scanning each file
function inputsBacking(pred) {
  const files = [];
  for (const f of tokenFiles) { const j = readJSON(join(ROOT, f)); const tmp = []; if (j) walkTokens(j, [], null, tmp); if (tmp.some(pred)) files.push(f); }
  return files;
}

// ---------- render the present-layer card set (anti-determinism: present → a card, absent → skipped) ----------
const cards = []; // { idx, group, file, html, parents:Set }

// the colour closure: `--color-<name>: <oklch>` for every base colour token, so a mark/component that
// references `var(--color-brand)` resolves inside the self-contained card (no external styles.css needed).
const colorVars = colors.map((t) => `--color-${t.path.split('.').pop()}:${oklchStr(t.value)};`).join(' ');
const definedColorVars = new Set(colors.map((t) => `--color-${t.path.split('.').pop()}`));
const byL = colors.map((t) => ({ v: oklchStr(t.value), L: Array.isArray(t.value.components) ? Number(t.value.components[0]) : 0.5 }));
const lightestV = byL.slice().sort((a, b) => b.L - a.L)[0]?.v || '#ffffff';
const darkestV = byL.slice().sort((a, b) => a.L - b.L)[0]?.v || '#1b1b1d';

function addCard(idx, group, html, parents, extraVars) {
  const file = `${CARDS_REL}/${String(idx).padStart(2, '0')}-${group.toLowerCase()}.html`;
  cards.push({ idx, group, file, html: cardShell(group, displayStack, bodyStack, html, extraVars ?? colorVars), parents });
}

// 01 Brand — the single-sourced mark, inlined (R6b: byte-equal to canon/mark.svg). Skipped on a no-mark brand.
if (markSvgRaw && /<svg\b/i.test(markSvgRaw)) {
  let svg = (markSvgRaw.match(/<svg[\s\S]*<\/svg>/i) || [markSvgRaw])[0];
  // tag the emitted instance id="brand-mark" so audit-lint R6b RECONCILES it against canon/mark.svg (drift
  // caught: a hand-edited card mark fails). The INNER geometry is inlined verbatim, so it stays byte-equal.
  if (!/<svg\b[^>]*\bid=/i.test(svg)) svg = svg.replace(/<svg\b/i, '<svg id="brand-mark"');
  // resolve any var(--…) the mark references that no colour token defines — never leave a broken var. An
  // *-fg / *-contrast / *-on / paper role defaults to the lightest colour (a mark foreground); else darkest.
  const markVars = [...new Set([...svg.matchAll(/var\(\s*(--[\w-]+)/g)].map((m) => m[1]))]
    .filter((name) => !definedColorVars.has(name))
    .map((name) => `${name}:${/(-fg|-contrast|-on|paper|light)\b/i.test(name) ? lightestV : darkestV};`).join(' ');
  const body = `<div class="mark-frame" style="display:grid;place-items:center;min-height:12rem;background:var(--surface);border:1px solid var(--line);border-radius:2px;padding:2rem">${svg}</div>
<p class="note">The protected mark, single-sourced from the canon. Shown at rest; give it room to breathe.</p>`;
  addCard(1, 'Brand', body, ['canon/mark.svg'], colorVars + (markVars ? ' ' + markVars : ''));
}

// 02 Color — swatches from base colour tokens; provisional values marked in client vocab
if (colors.length) {
  const chips = colors.map((t) => {
    const val = oklchStr(t.value);
    return `<div class="sw"><div class="chip" style="background:${esc(val)}"></div><div class="meta"><b>${esc(humanize(t.path.split('.').pop()))}</b>${provSpan(t)}<br><span class="val">${esc(val)}</span></div></div>`;
  }).join('');
  const body = `<div class="swatches">${chips}</div>
<p class="note">The colour system, rendered from the canon. Values in OKLCH. Items marked <span class="prov">provisional</span> are proposals pending your confirmation.</p>`;
  addCard(2, 'Color', body, inputsBacking((t) => t.type === 'color' && !t.isAlias && !t.scheme));
}

// 03 Type — specimen from the font stacks
if (fonts.length) {
  const anyProv = fonts.some(isProvisional);
  const body = `<div style="font-family:var(--display);font-size:3.4rem;line-height:1.05">Aa Bb Cc</div>
<div style="font-family:var(--display);text-transform:uppercase;letter-spacing:.22em;font-size:1rem;margin:16px 0 6px">Display register</div>
<p style="font-size:1.05rem;max-width:42rem">Body — the quick brown fox jumps over the lazy dog. 0123456789. One display register per piece; display headlines get wide tracking, body and UI stay normal.</p>
<p class="note">Display: <b>${esc((displayStack || 'system').split(',')[0].replace(/"/g, ''))}</b> · Body: <b>${esc((bodyStack || 'system').split(',')[0].replace(/"/g, ''))}</b>. Fonts render from your installed faces; the card ships no remote font.${anyProv ? ' <span class="prov">A face marked provisional is pending your confirmation.</span>' : ''}</p>`;
  addCard(3, 'Type', body, inputsBacking((t) => t.type === 'fontFamily' && !t.isAlias));
}

// 04 Components — buttons + input + scheme swatches (Day/Night …), coloured from the palette
if (colors.length) {
  // pick an ink (darkest) + a paper (lightest) + an accent (most chromatic) for chrome from the palette
  const withL = colors.map((t) => ({ t, L: Array.isArray(t.value.components) ? Number(t.value.components[0]) : 0.5, C: Array.isArray(t.value.components) ? Number(t.value.components[1] || 0) : 0 }));
  const ink = withL.slice().sort((a, b) => a.L - b.L)[0];
  const paper = withL.slice().sort((a, b) => b.L - a.L)[0];
  const accent = withL.slice().sort((a, b) => b.C - a.C)[0];
  const inkV = oklchStr(ink.t.value), paperV = oklchStr(paper.t.value), accentV = oklchStr(accent.t.value);
  const schemeCards = Object.keys(schemeDefs).filter((k) => !k.startsWith('$') && k !== 'default').map((s) => {
    const def = schemeDefs[s]; const deferred = def && /^deferred$/i.test(String(def.status ?? ''));
    const roles = schemeLeaves.filter((t) => t.scheme === s);
    // PROVENANCE HONESTY: a scheme is provisional if deferred OR its rendered roles are still uncertain
    // (scheme-derive materializes every scheme at hypothesis + GAP until ratified — a materialized scheme is
    // NOT settled). Read confidence from the role tokens (isProvisional / R5), never canon.json status alone.
    const prov = deferred || !roles.length || roles.some(isProvisional);
    const strip = deferred || !roles.length
      ? `<div style="height:48px;display:grid;place-items:center;color:var(--muted);font-size:.75rem">provisional</div>`
      : `<div style="height:48px;display:flex">${roles.slice(0, 5).map((r) => `<span style="flex:1;background:${esc(safeColor(oklchStr(r.value)) || 'transparent')}"></span>`).join('')}</div>`;
    return `<div style="flex:1;min-width:180px;border:1px solid var(--line);border-radius:2px;overflow:hidden">${strip}<div style="padding:8px 12px;font-size:.78rem;color:var(--muted)">${esc(humanize(s))}${prov ? ' <span class="prov">· provisional</span>' : ''}</div></div>`;
  }).join('');
  // [5] the chrome inks (ink/paper/accent) can themselves be provisional — say so, never present a draft colour as settled
  const chromeProv = [ink, paper, accent].some((x) => isProvisional(x.t));
  const body = `<div class="row">
  <button style="background:${esc(inkV)};color:${esc(paperV)};border:1px solid transparent">Primary action</button>
  <button style="background:transparent;color:${esc(inkV)};border:1px solid ${esc(inkV)}">Secondary</button>
  <button style="background:${esc(accentV)};color:${esc(inkV)};border:1px solid transparent">Accent</button>
  <input placeholder="Search" />
</div>
${schemeCards ? `<div class="row" style="margin-top:28px">${schemeCards}</div>` : ''}
<p class="note">Components rendered from the palette${schemeCards ? ' and colour schemes' : ''}.${chromeProv ? ' Some colours shown here are <span class="prov">provisional</span> (proposals pending your confirmation).' : ''} A scheme marked <span class="prov">provisional</span> is pending your confirmation.</p>`;
  const parents = new Set([...inputsBacking((t) => t.type === 'color' && !t.isAlias)]);
  if (schemeLeaves.length) inputsBacking((t) => t.scheme).forEach((f) => parents.add(f));
  if (canonJson) parents.add('canon/canon.json');
  addCard(4, 'Components', body, [...parents]);
}

// ---------- --check mode: verify emitted cards are offline + marked (no emit) ----------
function checkCards() {
  const fails = [];
  if (!existsSync(CARDS_DIR)) return { fails: ['[NO_CARDS] design-sync-kit/cards/ absent — nothing emitted'], files: [] };
  const files = readdirSync(CARDS_DIR).filter((n) => n.endsWith('.html')).sort();
  if (!files.length) return { fails: ['[EMPTY_CARDS] design-sync-kit/cards/ has no .html card'], files: [] };
  // a remote/script/live ref makes the card non-offline. NOTE: `data:` URIs are INLINE (self-contained, not
  // remote) and are allowed; SVG `xmlns="http://www.w3.org/…"` namespace URIs are inert identifiers (never
  // dereferenced) and are stripped before the scan; the {{…}} converter carve-out never appears in EMITTED output.
  // Flag any FETCHABLE URL scheme in a card. NOT just `//`-bearing URLs: a browser fetches a special-scheme
  // URL written WITHOUT slashes too (`http:host/x` normalizes to host `host`), and `javascript:`/`ftp:` etc.
  // are all live. Detect ANY non-`data:` scheme in a src/href/xlink:href attribute OR a CSS url(); plus the
  // script/@font-face/@import/link/fetch/protocol-relative signals. `data:` (inline) and `#frag`/`var(`/
  // relative refs are allowed. xmlns namespace URIs are stripped first (inert identifiers, never fetched).
  const REMOTE = [
    /https?:\/\//i, /(?<![:a-z0-9])\/\/[a-z0-9.]/i, /<script\b/i, /@font-face/i, /@import\b/i, /<link\b/i, /\bfetch\s*\(/i,
    /\b(?:src|href|xlink:href)\s*=\s*["']?\s*(?!data:)[a-z][a-z0-9+.-]*:/i,  // scheme (with or without //) in a fetchable attr
    /\burl\(\s*["']?\s*(?!data:)[a-z][a-z0-9+.-]*:/i,                        // scheme in a CSS url()
  ];
  for (const n of files) {
    const raw = readText(join(CARDS_DIR, n)) || '';
    const first = raw.split('\n', 1)[0] || '';
    if (!/^<!--\s*@dsCard\s+group="[^"]+"\s*-->/.test(first)) fails.push(`[DSCARD_MISSING] ${n}: first line is not the <!-- @dsCard group="…" --> marker`);
    const scan = raw.replace(/\bxmlns(:\w+)?\s*=\s*"[^"]*"/gi, ''); // namespace URIs are inert, never fetched
    if (REMOTE.some((re) => re.test(scan))) fails.push(`[REMOTE_REF] ${n}: a remote/script/@font-face/@import/live reference (any non-data: URL scheme in a fetchable position) — a card must be self-contained offline`);
  }
  return { fails, files };
}

if (CHECK) {
  const { fails, files } = checkCards();
  for (const f of files) console.log(`  ok   ${f}`);
  if (fails.length) { for (const f of fails) console.error(`  FAIL ${f}`); console.error(`\nemit-cards --check: ${fails.length} problem(s).`); process.exit(1); }
  console.log(`\nemit-cards --check: ${files.length} card(s) offline + marked.`);
  process.exit(0);
}

// ---------- emit ----------
if (!cards.length) {
  console.log('emit-cards: no present canon layer (no mark, no colour/font tokens) — nothing to emit (honest, not a failure).');
  process.exit(0);
}
if (!existsSync(CARDS_DIR)) mkdirSync(CARDS_DIR, { recursive: true });

// RECONCILE cards/ to the present-layer set: a layer that DISAPPEARED from the canon leaves no card in this
// run, so PRUNE any of OUR previously-emitted cards (first line is the @dsCard marker) not in the current set —
// an orphan card is a stale derived artifact its custody entry no longer binds (a layer-removal is a canon
// change custody-by-hash cannot see). Only cards THIS emitter authored (the @dsCard first line) are pruned.
const wanted = new Set(cards.map((c) => c.file.split('/').pop()));
for (const n of readdirSync(CARDS_DIR)) {
  if (!/\.html$/.test(n) || wanted.has(n)) continue;
  const head = (readText(join(CARDS_DIR, n)) || '').split('\n', 1)[0] || '';
  if (/^<!--\s*@dsCard\s+group="[^"]+"\s*-->/.test(head)) { rmSync(join(CARDS_DIR, n)); console.log(`emit-cards: pruned orphan card design-sync-kit/cards/${n} (its canon layer is gone)`); }
}

// every card embeds the full colour closure (:root --color-*), so the colour-token file(s) are a parent of
// EVERY card — register them universally so a colour change is a STALE custody FAIL on all cards, not just Color.
const colorInputs = inputsBacking((t) => t.type === 'color' && !t.isAlias && !t.scheme);
const emitted = [];
for (const c of cards) {
  writeFileSync(join(ROOT, c.file), c.html);
  console.log(`emit-cards: ${c.file}  (@dsCard group="${c.group}")`);
  const parents = new Set([...c.parents, ...colorInputs]);      // dedupe (card × input), colour closure universal
  for (const p of parents) {
    const abs = join(ROOT, p);
    const sha = existsSync(abs) ? createHash('sha256').update(readFileSync(abs)).digest('hex') : null;
    if (sha) emitted.push({ file: c.file, parent: { file: p, sha256: sha }, tool: 'emit-cards.mjs' });
  }
}

// self-verify the offline guarantee before declaring success (fail-closed)
const post = checkCards();
if (post.fails.length) { for (const f of post.fails) console.error(`  FAIL ${f}`); console.error('\nemit-cards: emitted output failed its own offline check — aborting.'); process.exit(1); }

// custody: merge per-(card,input) entries into sources/MANIFEST.json (the tokens-project pattern)
if (emitted.length) {
  const mPath = join(ROOT, 'sources', 'MANIFEST.json');
  let manifest = existsSync(mPath) ? readJSON(mPath) : null;
  const notOurs = (e) => !(e && e.tool === 'emit-cards.mjs');
  // gather the FULL existing custody list from ANY shape (bare array · {entries} · source-recover's
  // {recovered}) so merging never leaves a dual-key manifest that shadows the recovered captures from
  // run-gates (the F6-01 collision). Write ONE canonical, stably-sorted `{entries}` (byte-idempotent).
  const wasArray = Array.isArray(manifest);
  const existing = wasArray ? manifest
    : (manifest && typeof manifest === 'object') ? [...(Array.isArray(manifest.entries) ? manifest.entries : []), ...(Array.isArray(manifest.recovered) ? manifest.recovered : [])]
    : [];
  const keyOf = (e) => `${e && e.file}|${(e && e.parent && (e.parent.file || e.parent.url)) || (e && e.url) || ''}|${(e && e.tool) || ''}`;
  const merged = [...existing.filter(notOurs), ...emitted].sort((a, b) => keyOf(a).localeCompare(keyOf(b)));
  manifest = wasArray ? merged : { entries: merged };
  if (!existsSync(join(ROOT, 'sources'))) mkdirSync(join(ROOT, 'sources'), { recursive: true });
  writeFileSync(mPath, JSON.stringify(manifest, null, 2) + '\n');
  console.log(`emit-cards: custody — ${emitted.length} derived entr${emitted.length === 1 ? 'y' : 'ies'} (card×input) recorded in sources/MANIFEST.json`);
}
console.log(`emit-cards: ${cards.length} card(s) emitted to ${CARDS_REL}/ — self-contained, offline, @dsCard-marked.`);
process.exit(0);
