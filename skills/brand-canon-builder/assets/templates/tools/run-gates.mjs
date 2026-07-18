#!/usr/bin/env node
// run-gates.mjs — THE GATE-SUITE RUNNER & STATUS BOARD (NOT-RUN as a first-class status)
//
// Runs every EXECUTABLE gate of the Stage-10 suite against an EMITTED CLIENT REPO ROOT,
// captures each gate's REAL exit code, verifies the committed evidence the demoted
// agent-gates require, and writes the machine-generated status board to
// `audit/gates/report.md`. The board is the ONLY legitimate source of an
// "all gates green" claim — a narrated verdict with no board behind it is bookkeeping,
// not truth.
//
//   node tools/run-gates.mjs [repo-root]      # default repo-root = cwd
//
// Per-gate statuses (first-class, all of them honest):
//   PASS / FAIL        — the gate ran; its real exit code (0 / 1).
//   NOT-RUN(<reason>)  — the gate could not run (deps missing → the tool's own exit-3
//                        import-guard instruction is recorded; missing build precondition).
//                        NOT-RUN on a BLOCKING gate ⇒ the overall verdict can NOT be
//                        ALL-GREEN. It is a declarable state (a v0/DEMO hand-off ships
//                        WITH the board visible), never a silent pass and never a lie.
//   (demoted gates)    — rows whose Class column reads `agent-gate`: agent discipline, NOT
//                        machine enforcement (the enforcement-class vocabulary of the handoff
//                        contract). Their STATUS is PASS/FAIL by committed evidence
//                        (audit/agent-gates.md, section per gate) — evidence missing = FAIL.
//   N/A(<reason>)      — the gate does not apply to this brand's shape (kit opted out,
//                        no reproduced treatments, …). Anti-determinism: a flat / sonic /
//                        monogram-only brand resolves N/A, never a false FAIL.
//
// Overall verdict (exit code):
//   ALL-GREEN  (exit 0) — zero FAIL, zero NOT-RUN on blocking gates.
//   INCOMPLETE (exit 2) — zero FAIL, but ≥1 blocking gate NOT-RUN (honest, shippable as
//                         v0/DEMO with the board visible; not "done").
//   BLOCKED    (exit 1) — ≥1 FAIL.
//
// Sibling tools are resolved NEXT TO THIS SCRIPT (tools/), so the runner works from the
// emitted repo root and in the skill's own fixture self-tests. Zero-dep Node.
//
// Deny scope: the target list comes FROM the surface manifest (satellites/surfaces.md `client` rows);
// a repo without a manifest falls back to the DECLARED interim scope (prototype/**/*.html + README.md),
// labeled as such on the board — the linter never chooses its own scope silently.

import { readFileSync, readdirSync, existsSync, statSync, mkdirSync, writeFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { join, resolve, dirname, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';

const ROOT = resolve(process.argv[2] || process.cwd());
const TOOLS = dirname(fileURLToPath(import.meta.url));
const rel = (p) => relative(ROOT, p) || '.';

const rows = []; // { id, cls, blocking, status, detail }
const add = (id, cls, blocking, status, detail) => rows.push({ id, cls, blocking, status, detail });

const readText = (p) => { try { return readFileSync(p, 'utf8'); } catch { return null; } };
const listDir = (p) => { try { return readdirSync(p); } catch { return []; } };
const isDir = (p) => { try { return statSync(p).isDirectory(); } catch { return false; } };
const nonEmpty = (p) => { const t = readText(p); return t != null && t.trim().length > 0; };

// run a sibling tool as a child process; map its REAL exit code to a status
function runTool(script, args) {
  const abs = join(TOOLS, script);
  if (!existsSync(abs)) return { status: 'FAIL', detail: `tool ${script} not found beside the runner — the emitted tools/ set is incomplete (partial copy or tampering)` };
  const r = spawnSync(process.execPath, [abs, ...args], { encoding: 'utf8', timeout: 120000 });
  const out = `${r.stdout ?? ''}${r.stderr ?? ''}`.trim();
  if (r.error && r.error.code === 'ETIMEDOUT') return { status: 'FAIL', detail: 'gate timed out after 120s — a hung gate is a FAIL, never a missing precondition' };
  if (r.error) return { status: 'NOT-RUN', detail: `could not spawn node: ${r.error.message}` };
  if (r.status === 0) return { status: 'PASS', detail: lastLine(out) };
  if (r.status === 3) return { status: 'NOT-RUN', detail: `deps missing (exit 3) — ${lastLine(out)}` };
  if (r.status === 1) return { status: 'FAIL', detail: failLine(out) };
  return { status: 'FAIL', detail: `unexpected exit ${r.status} — ${failLine(out)}` };
}
const lastLine = (s) => (s.split('\n').filter(Boolean).pop() ?? '').slice(0, 300);
// on FAIL, surface the failing line (the last ❌/violation line), never a trailing "no violations" summary
const failLine = (s) => {
  const ls = s.split('\n').filter(Boolean);
  const bad = ls.filter((l) => l.includes('❌') || /FAIL|DENY/.test(l));
  return (bad.pop() ?? ls.pop() ?? '').slice(0, 300);
};

// ---------- 1. audit-lint (lint, BLOCKING) ----------
{
  const r = runTool('audit-lint.mjs', [ROOT]);
  add('audit-lint R0–R8', 'lint', true, r.status, r.detail);
}

// ---------- 2. client-deny-lint over the INTERIM scope (lint, BLOCKING) ----------
{
  // the target list comes FROM the surface manifest (satellites/surfaces.md `client` rows) — the linter
  // never chooses its own scope. A repo without a manifest falls back to the labeled interim scope.
  if (existsSync(join(ROOT, 'satellites', 'surfaces.md'))) {
    const r = runTool('client-deny-lint.mjs', ['--manifest', ROOT]);
    add('client-deny-lint', 'lint', true, r.status, `MANIFEST scope (satellites/surfaces.md client rows) · ${r.detail}`);
  } else {
    const scope = [];
    const walkHtml = (dir) => { for (const f of listDir(dir)) { const p = join(dir, f); if (isDir(p)) walkHtml(p); else if (f.endsWith('.html')) scope.push(p); } };
    const protoDir = join(ROOT, 'prototype');
    if (isDir(protoDir)) walkHtml(protoDir);
    const readme = join(ROOT, 'README.md');
    if (existsSync(readme)) scope.push(readme);
    if (!scope.length) {
      add('client-deny-lint', 'lint', true, 'N/A', 'no surface manifest and no interim-scope surfaces (prototype/**/*.html, README.md)');
    } else {
      const r = runTool('client-deny-lint.mjs', scope);
      add('client-deny-lint', 'lint', true, r.status, `INTERIM scope (${scope.map(rel).join(', ')}) — no satellites/surfaces.md manifest in this repo · ${r.detail}`);
    }
  }
}

// ---------- 2b. wire verbatim-check (lint, BLOCKING when a handoff is persisted) ----------
{
  // compiled-wire vs signed-brief: every ratification claim in the persisted handoff proves against the
  // SIGNED BRIEF text it carries (per-line BRIEF{} lineage · not-used citations · WIRE-CHECK recompute ·
  // wire vocabulary). The tool self-declares N/A on an all-empty wire (no markers, no brief) — never a
  // false block on CREATE.
  const srcDir = join(ROOT, 'sources');
  const handoffs = isDir(srcDir) ? readdirSync(srcDir).filter((n) => /^handoff[—-].*\.md$/.test(n)) : [];
  if (!handoffs.length) {
    add('wire verbatim-check', 'lint', false, 'N/A', 'no persisted handoff (sources/handoff—*.md) — nothing claims what a brief must prove');
  } else {
    const r = runTool('wire-check.mjs', [ROOT]);
    // anchor on the tool's own summary line, never a substring (a path containing "N/A" must not demote a PASS)
    const status = r.status === 'PASS' && /^wire-check: N\/A/.test(r.detail) ? 'N/A' : r.status;
    add('wire verbatim-check', 'lint', status !== 'N/A', status, r.detail);
  }
}

// ---------- 3. kit package-validate (lint, BLOCKING when the kit is present) ----------
{
  const kit = join(ROOT, 'design-sync-kit');
  if (!isDir(kit)) {
    add('kit package-validate', 'lint', false, 'N/A', 'no design-sync-kit/ in this repo (opt-out or not emitted)');
  } else if (!isDir(join(kit, 'dist'))) {
    add('kit package-validate', 'lint', true, 'NOT-RUN', '[NO_DIST] — build-ready state, not built: run `npm install && npm run build` in design-sync-kit/ first');
  } else if (!existsSync(join(kit, 'dist', 'index.es.js'))) {
    add('kit package-validate', 'lint', true, 'FAIL', 'dist/ present but dist/index.es.js missing — hollow build output');
  } else {
    const pv = join(kit, 'package-validate.mjs');
    if (!existsSync(pv)) { add('kit package-validate', 'lint', true, 'FAIL', 'design-sync-kit/ has dist/ but no package-validate.mjs'); }
    else {
      const r = spawnSync(process.execPath, [pv], { cwd: kit, encoding: 'utf8', timeout: 120000 });
      add('kit package-validate', 'lint', true, r.status === 0 ? 'PASS' : 'FAIL', lastLine(`${r.stdout ?? ''}${r.stderr ?? ''}`.trim()));
    }
  }
}

// ---------- 3b. kit opt-out reconciliation (lint, BLOCKING) — handoff DIRECTIVES beat defaults ----------
// The handoff's `Claude Design component library: <YES|NO>` slot is a DIRECTIVE, not advice: NO means
// ZERO Claude Design artifacts in the emitted repo (no kit dir, no adapter config, no consumer row).
// A skill default never overrides a carried opt-out — this row is the executable form of that precedence,
// read from the persisted handoff. An unfilled slot is a handoff DEFECT (the contract slot is explicit;
// no default fills it silently).
{
  const srcDir = join(ROOT, 'sources');
  const handoffs = listDir(srcDir).filter((f) => /^handoff—.+\.md$/.test(f)).sort();
  const hoText = handoffs.length ? (readText(join(srcDir, handoffs[handoffs.length - 1])) ?? '') : '';
  const slot = (hoText.match(/^\s*Claude Design component library:\s*(YES|NO)\b/mi) ?? [])[1] ?? null;
  if (!hoText) add('kit opt-out reconciliation', 'lint', true, 'N/A', 'no persisted handoff (sources/handoff—*.md) — no directive to reconcile');
  else if (!slot) add('kit opt-out reconciliation', 'lint', true, 'FAIL', 'the `Claude Design component library: <YES|NO>` slot is unfilled/absent in the persisted handoff — the directive slot is explicit; a skill default never fills it silently');
  else if (slot.toUpperCase() === 'NO') {
    const probs = [];
    if (isDir(join(ROOT, 'design-sync-kit'))) probs.push('design-sync-kit/ exists');
    if (isDir(join(ROOT, '.design-sync'))) probs.push('.design-sync/ adapter config exists');
    const proj = readText(join(ROOT, 'satellites', 'projections.md'));
    if (proj && /claude[\s-]?design/i.test(proj)) probs.push('satellites/projections.md registers Claude Design as a consumer');
    add('kit opt-out reconciliation', 'lint', true, probs.length ? 'FAIL' : 'PASS',
      probs.length ? `handoff says NO but the repo carries Claude Design artifacts: ${probs.join(' · ')} — an opt-out the build ignored` : 'handoff opt-out honored: zero Claude Design artifacts');
  } else add('kit opt-out reconciliation', 'lint', true, 'PASS', 'kit opted IN by the handoff — presence/health governed by the kit rows');
}

// ---------- 3c. static cards (lint, BLOCKING when emitted) — the OFFLINE @dsCard set (F4-01 emitter) ----------
// The offline static-cards emitter (tools/emit-cards.mjs) is what makes `[NO_DIST]` a reviewable handoff
// state: self-contained @dsCard HTML rendered from the canon, no React/bundle/converter/NETWORK. This row
// spawns `emit-cards.mjs --check` (offline guarantee: first-line @dsCard marker · zero remote/script/@font-face
// ref). N/A when no cards were emitted (a built kit needs none; an unbuilt one MAY carry them) — honest, never
// a false FAIL. Freshness (a card stale vs a changed canon) is the custody manifest row's job (parent-hash).
{
  const cardsDir = join(ROOT, 'design-sync-kit', 'cards');
  if (!isDir(join(ROOT, 'design-sync-kit'))) add('static cards', 'lint', false, 'N/A', 'no design-sync-kit/ in this repo (opt-out or not emitted)');
  else if (!isDir(cardsDir) || !listDir(cardsDir).some((f) => f.endsWith('.html'))) add('static cards', 'lint', false, 'N/A', 'no emitted static cards (design-sync-kit/cards/*.html) — the offline emitter has not run, or the kit built its dist');
  else { const r = runTool('emit-cards.mjs', ['--check', ROOT]); add('static cards', 'lint', r.status !== 'N/A', r.status, r.detail); }
}

// ---------- 4. §7a fidelity evidence — recomputed verdicts + the MANDATORY non-waivable set ----------
// `pass` is never trusted on its own: the runner RECOMPUTES the measurement from the recorded numeric
// metrics vs thresholds (a hand-written verdict — recorded pass disagreeing with its own numbers, or a
// verdict with no numbers — is a FAIL). A visual outside-tolerance with a declared GAP is a TRACKED
// outcome (evidence honest), but a NON-WAIVABLE slot never rides the GAP escape: the mandatory set is
// parsed from the persisted handoff (its NON-WAIVABLE line + MODE) — mark/palette-class slots are
// MEASURED, never string-matched, never hand-verdicted. In MODE: CREATE (no Stage-5 capture exists) the
// missing measurement is NOT-RUN (diff against the AUTHORED master as source-of-record, or declare the
// medium N/A) — the mandatory gate never false-blocks CREATE.
{
  const norm = (s) => String(s ?? '').toLowerCase().replace(/[^a-z0-9]+/g, '');
  const scans = []; // { t, rec, state: 'pass'|'declared-gap'|'tracked-gap'|'fail' }
  const fdir = join(ROOT, 'audit', 'fidelity');
  const bad = [];
  if (isDir(fdir)) {
    for (const t of listDir(fdir)) {
      const dir = join(fdir, t);
      if (!isDir(dir)) continue;
      let rec = null;
      try { rec = JSON.parse(readFileSync(join(dir, 'scores.json'), 'utf8')); } catch { /* missing/malformed */ }
      if (!rec || rec.verdict == null) { bad.push(`${t}: scores.json missing or carries no verdict`); scans.push({ t, rec, state: 'fail' }); continue; }
      if (rec.measured === false) { scans.push({ t, rec, state: 'declared-gap' }); continue; } // non-visual declared GAP — nothing to measure
      const m = rec.metrics, th = rec.thresholds;
      const computable = m && th && typeof m.deltaE2000_mean === 'number' && typeof th.deltaE2000_max === 'number';
      if (!computable) { bad.push(`${t}: no numeric metrics/thresholds in scores.json — a verdict without numbers is a hand-written verdict`); scans.push({ t, rec, state: 'fail' }); continue; }
      const computed = m.deltaE2000_mean <= th.deltaE2000_max
        && (!m.ssim_gated || (typeof m.ssim === 'number' && m.ssim >= (th.ssim_min ?? 0)))
        && ((m.mismatch_fraction ?? 0) <= (th.mismatch_max ?? 1))
        && (rec.glyph ? rec.glyph.pass !== false : true);
      if (computed !== (rec.pass === true)) { bad.push(`${t}: recorded pass ${JSON.stringify(rec.pass ?? null)} disagrees with the recomputed measurement (${computed ? 'within' : 'outside'} tolerance) — a hand-written verdict`); scans.push({ t, rec, state: 'fail' }); continue; }
      if (rec.pass === true) scans.push({ t, rec, state: 'pass' });
      else if (rec.gap) scans.push({ t, rec, state: 'tracked-gap' });
      else { bad.push(`${t}: verdict "${rec.verdict}" outside tolerance and UNTRACKED (no gap) — degrade or log a GAP`); scans.push({ t, rec, state: 'fail' }); }
    }
  }
  if (!isDir(fdir)) add('§7a fidelity evidence', 'measured', true, 'N/A', 'no audit/fidelity/ — no reproduced treatments (mandatory-set coverage judged below)');
  else if (!scans.length) add('§7a fidelity evidence', 'measured', true, 'N/A', 'audit/fidelity/ exists but holds no treatment dirs');
  else add('§7a fidelity evidence', 'measured', true, bad.length ? 'FAIL' : 'PASS',
    bad.length ? bad.join(' · ') : `${scans.length} treatment record(s): verdicts recomputed from their own numbers (${scans.filter((s) => s.state === 'tracked-gap').length} tracked-GAP, ${scans.filter((s) => s.state === 'declared-gap').length} declared non-visual)`);

  // the mandatory set — parsed from the persisted handoff
  const srcDir = join(ROOT, 'sources');
  const handoffs = listDir(srcDir).filter((f) => /^handoff—.+\.md$/.test(f)).sort();
  const hoText = handoffs.length ? (readText(join(srcDir, handoffs[handoffs.length - 1])) ?? '') : '';
  const mode = (hoText.match(/^MODE:\s*(ANALYZE|CREATE)\b/m) ?? [])[1] ?? null;
  const nwLine = hoText.split('\n').find((l) => /NON-WAIVABLE/.test(l)) ?? '';
  const nwTail = nwLine.split('—').slice(1).join('—');
  const carriers = nwTail.split('·').map((s) => s.trim()).filter((s) => s && !/not-used/i.test(s))
    .map((s) => ({ raw: s.replace(/\(.*?\)/g, '').trim(), paren: (s.match(/\(([^)]+)\)/) ?? [])[1] ?? null }))
    .filter((c) => c.raw); // graphic-code is a real slot like any other; not-used items were dropped above
  if (!hoText || !nwLine || !carriers.length) {
    add('§7a mandatory set', 'measured', true, 'N/A', !hoText ? 'no persisted handoff (sources/handoff—*.md) — the §1 walk owns the mandatory set' : 'no NON-WAIVABLE carriers declared — the §1 walk owns the set');
  } else {
    const probs = []; const notRun = [];
    for (const c of carriers) {
      const keys = [norm(c.raw), c.paren ? norm(c.paren) : null].filter(Boolean);
      const hit = scans.find((s) => keys.some((k) => norm(s.t).includes(k) || k.includes(norm(s.t)) || (s.rec && s.rec.carrier && (norm(s.rec.carrier).includes(k) || k.includes(norm(s.rec.carrier))))));
      const label = c.paren ? `${c.raw} (${c.paren})` : c.raw;
      if (!hit) {
        if (mode === 'CREATE') notRun.push(`${label}: mandatory measurement not yet run — CREATE mode: diff against the AUTHORED master (the source-of-record where no Stage-5 capture exists) or declare the medium N/A`);
        else probs.push(`${label}: mandatory fidelity NEVER RAN — the non-waivable set (mark, palette-class slots) is measured (ΔE/SSIM), never string-matched, never hand-verdicted`);
      } else if (hit.state === 'tracked-gap') probs.push(`${label}: outside tolerance riding the GAP escape — a NON-WAIVABLE slot never rides it (bring within tolerance or degrade the method honestly)`);
      else if (hit.state === 'fail') probs.push(`${label}: its evidence record failed above`);
      // 'pass' and 'declared-gap' (non-visual, no build-grade producer — a declared fidelity-blocking GAP per its role) are honest states
    }
    if (probs.length) add('§7a mandatory set', 'measured', true, 'FAIL', probs.join(' · '));
    else if (notRun.length) add('§7a mandatory set', 'measured', true, 'NOT-RUN', notRun.join(' · '));
    else add('§7a mandatory set', 'measured', true, 'PASS', `${carriers.length} non-waivable carrier(s) covered: measured within tolerance or declared per medium`);
  }
}

// ---------- 4b. custody manifest — every DERIVED capture carries its parent's hash+URL ----------
// A derived artifact (a wayback recovery, a cut/excerpt from a parent medium) whose parent's hash+URL
// live nowhere in the repo dies with the feed: the chain of custody must survive rotation. The persisted
// handoff DECLARES which acquisitions are derived (`acquire: cut …` / `recover-wayback …`); each such
// asset requires an entry in sources/MANIFEST.json carrying the PARENT's url (+ sha256 where the parent
// was fetched whole). Shape-checked here; the entry's truthfulness is the acquisition stage's discipline.
{
  const srcDir = join(ROOT, 'sources');
  const handoffs = listDir(srcDir).filter((f) => /^handoff—.+\.md$/.test(f)).sort();
  const hoText = handoffs.length ? (readText(join(srcDir, handoffs[handoffs.length - 1])) ?? '') : '';
  // anchored to the contract's frozen field syntax (colon-tight `acquire:cut`, `·`-separated fields) so
  // narrative prose mentioning the words never false-fires
  const derived = hoText.split('\n')
    .filter((l) => /acquire:(cut|recover-wayback)\b/.test(l) && l.includes('·'))
    .map((l) => ({ line: l.trim().slice(0, 80), path: (l.match(/path:\s*(\S+)/) ?? [])[1] ?? null }));
  const mfPath = join(srcDir, 'MANIFEST.json');
  let entries = null, badShape = null;
  if (existsSync(mfPath)) {
    try {
      const j = JSON.parse(readFileSync(mfPath, 'utf8'));
      // accepted shapes: a bare array · {entries:[...]} · source-recover.py's {recovered:[...]} wrapper.
      // NO Object.values fallback — mangling an unknown wrapper into fake entries hides the real problem.
      entries = Array.isArray(j) ? j : Array.isArray(j.entries) ? j.entries : Array.isArray(j.recovered) ? j.recovered : null;
      if (!entries) badShape = 'unrecognized MANIFEST shape — expected an array, {entries:[...]}, or {recovered:[...]}';
    } catch { badShape = 'sources/MANIFEST.json is unparseable'; }
  }
  const normPath = (p) => String(p ?? '').replace(/^\.\//, '');
  const baseName = (p) => normPath(p).split('/').pop();
  if (badShape) add('custody manifest', 'lint', true, 'FAIL', badShape);
  else if (!derived.length && !entries) add('custody manifest', 'lint', true, 'N/A', 'no derived acquisitions declared (cut / recover-wayback) and no MANIFEST — nothing to bind');
  else {
    const probs = [];
    if (entries) for (const e of entries) {
      if (!e || typeof e !== 'object') { probs.push('malformed MANIFEST entry (not an object)'); continue; }
      const url = e.url ?? (e.parent && e.parent.url);
      const hash = e.sha256 ?? (e.parent && e.parent.sha256);
      const inRepoParent = !url && e.parent && e.parent.file; // derived-from-spine projection (in-repo parent)
      if (!e.file) probs.push('MANIFEST entry with no file');
      else if (inRepoParent) {
        // in-repo parent custody is VERIFIED, not declared: the recorded parent hash must match the
        // parent file as it exists NOW — a stale projection (spine moved on) FAILS here.
        if (!e.parent.sha256) probs.push(`MANIFEST entry ${e.file}: in-repo parent ${e.parent.file} with no sha256 — custody dies with the feed`);
        else if (!existsSync(join(ROOT, e.parent.file))) probs.push(`MANIFEST entry ${e.file}: in-repo parent ${e.parent.file} does not exist`);
        else if (createHash('sha256').update(readFileSync(join(ROOT, e.parent.file))).digest('hex') !== e.parent.sha256)
          probs.push(`MANIFEST entry ${e.file}: STALE derived artifact — parent ${e.parent.file} hash mismatch (re-run the emitting tool)`);
      }
      else if (!url) probs.push(`MANIFEST entry ${e.file}: no parent url — custody dies with the feed`);
      else if (!hash) probs.push(`MANIFEST entry ${e.file}: no parent hash (sha256) — custody dies with the feed`);
    }
    for (const d of derived) {
      if (!d.path) { probs.push(`derived acquire with no path: "${d.line}"`); continue; }
      // exact path or basename equality (normalized) — a substring bind is gameable to a no-op
      const hit = (entries ?? []).some((e) => e && e.file && (normPath(e.file) === normPath(d.path) || baseName(e.file) === baseName(d.path)));
      if (!hit) probs.push(`derived acquisition ${d.path} has NO custody entry in sources/MANIFEST.json (parent url + hash)`);
    }
    // MT-3-class agent step, machine-conditioned: when ARCHIVED recovery was used (wayback routes declared
    // or captureTs-bearing entries), the identity/date verification is an AGENT step that must leave its
    // committed walk — an un-walked recovery gate is an assumption, not a verification.
    const usedArchive = derived.some((d) => /recover-wayback/.test(d.line)) || (entries ?? []).some((e) => e && e.captureTs);
    if (usedArchive) {
      const ev = readText(join(ROOT, 'audit', 'agent-gates.md')) ?? '';
      const m = ev.match(/^##+ .*identity.*date.*$/mi) ?? ev.match(/^##+ .*(source|archive) (identity|verification).*$/mi);
      if (!m) probs.push('archived-source recovery used, but audit/agent-gates.md carries no "source identity/date verification" section — the recovery identity/date gate is an AGENT step that must leave its committed walk (skipped-on-trust is the defect this closes)');
    }
    add('custody manifest', 'lint', true, probs.length ? 'FAIL' : 'PASS',
      probs.length ? probs.join(' · ') : `${derived.length} derived route(s) bound to custody entries; MANIFEST shape valid${usedArchive ? '; identity/date walk committed' : ''}`);
  }
}

// ---------- 5. §7b keystone structural + FORM-OF-RULE (lint, BLOCKING) ----------
{
  const candidates = listDir(ROOT).filter((f) => /(^|-)keystone\.md$/.test(f) && !/visual-keystone\.md$/.test(f));
  if (!candidates.length) {
    add('keystone structural', 'lint', true, 'FAIL', 'no <brand>-keystone.md at the repo root — the (verbal) keystone is a mandatory output');
    add('keystone form-of-rule', 'lint', true, 'FAIL', 'no keystone to check');
  } else {
    const text = readText(join(ROOT, candidates[0])) ?? '';
    // mask fenced code blocks (offset-preserving) so a ``` fence carrying "## " never miscounts sections
    const masked = text.replace(/(```|~~~)[\s\S]*?\1/g, (m) => m.replace(/[^\n]/g, ' '));
    const headings = [...masked.matchAll(/^## .+$/gm)].map((m) => ({ h: m[0], i: m.index }));
    const probs = [];
    if (headings.length !== 6) probs.push(`${headings.length} top-level sections (needs the 6-section schema)`);
    const guard = headings.findIndex((h) => /guardrail/i.test(h.h));
    if (guard === -1) probs.push('no GUARDRAIL section');
    else if (guard < headings.length - 2) probs.push('GUARDRAIL is buried mid-document (must sit in the high-recall tail: one of the last two sections)');
    const battery = join(ROOT, 'audit', 'redteam', 'battery.md');
    const refusal = join(ROOT, 'audit', 'redteam', 'expected-refusal-contract.md');
    if (!nonEmpty(battery)) probs.push('audit/redteam/battery.md absent or empty (an un-emitted battery is a well-formedness FAIL)');
    if (!nonEmpty(refusal)) probs.push('audit/redteam/expected-refusal-contract.md absent or empty');
    add('keystone structural', 'lint', true, probs.length ? 'FAIL' : 'PASS',
      probs.length ? probs.join(' · ') : `${candidates[0]} — 6 sections, guardrail in tail, battery + refusal contract committed (size budget stays a declared parameter)`);

    // FORM-OF-RULE (value-blind, medium-agnostic): a conditional-rule SHAPE or a visible GAP line satisfies
    // the form; brand content is never read. Sections resolved by heading keywords from the 6-section schema.
    const section = (re) => {
      const ix = headings.findIndex((h) => re.test(h.h));
      if (ix === -1) return null;
      return text.slice(headings[ix].i, ix + 1 < headings.length ? headings[ix + 1].i : text.length);
    };
    // RULE is a FORM floor (value-blind, never reads brand content) — prose that happens to contain
    // "when…use" satisfies the shape; the finer operability judgment is the agent-gate on top, and the
    // live keystone eval is the deferred run. GAPLINE is case-sensitive tracked form (a real GAP marker,
    // never lowercase prose like "a gap pending funding").
    const RULE = /\bwhen\b[^\n]{3,160}\b(then|choose|chooses|prefer|prefers|use|uses|pick|picks)\b/i;
    const GAPLINE = /\bGAP-\d+\b|\bGAP\b[^\n]*\bpending\b/;
    const formProbs = [];
    for (const [name, re] of [['THINK', /think/i], ['DESIGN', /design/i]]) {
      const s = section(re);
      if (s == null) { formProbs.push(`no ${name} section`); continue; }
      if (!RULE.test(s) && !GAPLINE.test(s)) formProbs.push(`${name}: no when-X-then-Z-shaped rule and no visible GAP line (bare adjectives are a malformed keystone)`);
    }
    const sp = section(/speak/i);
    if (sp == null) formProbs.push('no SPEAK section');
    else if (!(/on-brand/i.test(sp) && /off-brand/i.test(sp)) && !GAPLINE.test(sp)) formProbs.push('SPEAK: no on-brand/off-brand few-shot pair and no visible GAP line');
    add('keystone form-of-rule', 'lint', true, formProbs.length ? 'FAIL' : 'PASS',
      formProbs.length ? formProbs.join(' · ') : 'THINK/DESIGN carry a conditional-rule shape (or a visible GAP), SPEAK carries a pair (or a visible GAP) — form only, never brand content');
  }
}

// ---------- 5b. VISUAL keystone — the design brain (lint, BLOCKING; the second lobe of the set) ----------
// Mandatory resident-set member: exists · 7 sections (fences masked) · guardrail in the tail · ≥1 DO/DON'T
// pair or a visible GAP marker · the imagery section present (content or an explicit not-used line) · and
// ZERO pinned values (#hex / oklch() literals) — the brain REFERENCES the spine by token name; a pinned
// value stops following the spine (drift by construction). All form checks — brand content is never read.
{
  const vks = listDir(ROOT).filter((f) => /visual-keystone\.md$/.test(f));
  if (!vks.length) {
    add('visual keystone', 'lint', true, 'FAIL', 'no <brand>-visual-keystone.md at the repo root — the design brain is a mandatory member of the resident set (verbal + visual + asset index)');
  } else {
    const text = readText(join(ROOT, vks[0])) ?? '';
    const masked = text.replace(/(```|~~~)[\s\S]*?\1/g, (m) => m.replace(/[^\n]/g, ' '));
    const headings = [...masked.matchAll(/^## .+$/gm)].map((m) => ({ h: m[0], i: m.index }));
    const probs = [];
    if (headings.length !== 7) probs.push(`${headings.length} top-level sections (needs the 7-section schema)`);
    const guard = headings.findIndex((h) => /guardrail/i.test(h.h));
    if (guard === -1) probs.push('no VISUAL GUARDRAILS section');
    else if (guard < headings.length - 2) probs.push('guardrails buried mid-document (must sit in the high-recall tail)');
    const section = (re) => {
      const ix = headings.findIndex((h) => re.test(h.h));
      if (ix === -1) return null;
      return text.slice(headings[ix].i, ix + 1 < headings.length ? headings[ix + 1].i : text.length);
    };
    const GAPLINE = /\bGAP-\d+\b|\bGAP\b[^\n]*\bpending\b/;
    const dd = section(/do\s*\/\s*don/i);
    if (dd == null) probs.push('no DO / DON\'T section');
    else {
      // the section's own heading contains "DO / DON'T" — scan the BODY only, or the check is vacuous
      const body = dd.slice(dd.indexOf('\n') + 1);
      if (!(/\bDO\b[^\n]*\bDON'?T\b/i.test(body) || (/\bDO\b/.test(body) && /\bDON'?T\b/.test(body))) && !GAPLINE.test(body)) probs.push('DO/DON\'T carries no pair and no visible GAP marker (a brain without concrete pairs is adjectives)');
    }
    const im = section(/imagery/i);
    if (im == null) probs.push('no AI-IMAGERY section');
    else if (im.trim().split('\n').length < 2 && !/not-used/i.test(im)) probs.push('AI-IMAGERY section empty with no explicit not-used(owner-declared) line');
    // pins checked outside fences AND outside markdown link targets (an anchor fragment like #e2e-flow is
    // not a colour). Pin classes: the CSS absolute-colour family + DTCG component serialization + print inks.
    const masked2 = masked.replace(/\]\([^)\n]*\)/g, (m) => m.replace(/[^\n()\]]/g, ' '));
    const PIN_RE = /#[0-9a-f]{3,8}\b|\b(?:oklch|oklab|rgba?|hsla?|hwb|lch|lab|cmyk|color-mix)\s*\(|\bcolor\s*\(\s*(?:display-p3|srgb|rec2020|a98-rgb|prophoto-rgb|xyz)|\bcomponents\s*:\s*\[\s*[\d.]|\b(?:PMS|Pantone)\s*\d{2,4}\b/i;
    const pinM = masked2.match(PIN_RE);
    if (pinM) probs.push(`pinned value "${pinM[0]}" — the visual keystone references the spine BY TOKEN NAME, never by literal (a pin drifts)`);
    add('visual keystone', 'lint', true, probs.length ? 'FAIL' : 'PASS',
      probs.length ? probs.join(' · ') : `${vks[0]} — 7 sections, guardrails in tail, DO/DON'T pairs, imagery axis resolved, no pinned values in lint scope (outside fences/links)`);
  }
}

// ---------- 5c. asset index — the third member of the resident set (lint, BLOCKING) ----------
{
  if (!nonEmpty(join(ROOT, 'satellites', 'asset-index.md'))) add('asset index', 'lint', true, 'FAIL', 'satellites/asset-index.md absent or empty — the mandatory third member of the resident set (verbal + visual keystones + asset index)');
  else add('asset index', 'lint', true, 'PASS', 'resident-set third member present (row integrity is reconciled by audit-lint R6d/R8)');
}

// ---------- 6. §7b live red-team run (agent-gate; the live run is deferred) ----------
{
  const rdir = join(ROOT, 'audit', 'redteam');
  const runs = isDir(rdir) ? listDir(rdir).filter((d) => isDir(join(rdir, d)) && nonEmpty(join(rdir, d, 'results.md'))) : [];
  if (runs.length) add('red-team live run', 'agent-gate', false, 'PASS', `recorded run(s): ${runs.join(', ')} (per-attempt verdicts committed)`);
  else add('red-team live run', 'agent-gate', false, 'NOT-RUN', 'live instantiate-and-attack run deferred — the committed battery is gated above; an un-recorded run can never read as a silent pass');
}

// ---------- 7. demoted agent-gates — committed evidence required (audit/agent-gates.md) ----------
{
  // evidence bodies are FORM-checked only (≥40 chars: a titled-but-empty section is not a walk);
  // content is never judged — the committed record is the gate, its quality is the agent's discipline
  const SECTIONS = [
    ['core-asset contract walk (§1)', /core-asset/i, true],
    ['named tolerance (§2)', /named tolerance/i, false],
    ['content audit (§4)', /content audit/i, true],
    ['output-agnostic (§5)', /output-agnostic/i, false],
    ['universality stress test (§5)', /universality/i, false],
  ];
  const ev = join(ROOT, 'audit', 'agent-gates.md');
  const text = readText(ev);
  if (text == null) {
    for (const [id, , blocking] of SECTIONS) add(id, 'agent-gate', blocking, 'FAIL', 'audit/agent-gates.md absent — a demoted gate still leaves committed evidence of its walk; "a human said OK" with no trace is the hole this closes');
  } else {
    const heads = [...text.matchAll(/^##+ .+$/gm)].map((m) => ({ h: m[0], i: m.index }));
    for (const [id, re, blocking] of SECTIONS) {
      const ix = heads.findIndex((h) => re.test(h.h));
      if (ix === -1) { add(id, 'agent-gate', blocking, 'FAIL', `no section matching this gate in ${rel(ev)}`); continue; }
      const body = text.slice(heads[ix].i + heads[ix].h.length, ix + 1 < heads.length ? heads[ix + 1].i : text.length).trim();
      add(id, 'agent-gate', blocking, body.length >= 40 ? 'PASS' : 'FAIL',
        body.length >= 40 ? `evidence committed (${rel(ev)} — form-checked only; content is never judged)` : `section present but effectively empty in ${rel(ev)} (the walk must be recorded, not just titled)`);
    }
  }
}

// ---------- verdict + board ----------
const fails = rows.filter((r) => r.status === 'FAIL');
const blockingNotRun = rows.filter((r) => r.blocking && r.status === 'NOT-RUN');
const verdict = fails.length ? 'BLOCKED' : blockingNotRun.length ? 'INCOMPLETE' : 'ALL-GREEN';

const icon = { PASS: '✅', FAIL: '❌', 'NOT-RUN': '⏸', 'N/A': '–' };
const lines = [
  '# Gate status board — machine-generated (run-gates.mjs)',
  '',
  `Root: \`${ROOT}\``,
  `Verdict: **${verdict}** — ${fails.length} FAIL · ${blockingNotRun.length} blocking NOT-RUN · ${rows.length} gates.`,
  verdict === 'INCOMPLETE' ? '\n> INCOMPLETE is a declarable, honest state (a v0/DEMO ships WITH this board visible); it is never "done" and never a silent pass.' : '',
  '',
  '| Gate | Class | Blocking | Status | Detail |',
  '|---|---|---|---|---|',
  ...rows.map((r) => `| ${r.id} | ${r.cls} | ${r.blocking ? 'yes' : 'no'} | ${icon[r.status] ?? ''} ${r.status} | ${r.detail.replace(/\|/g, '\\|')} |`),
  '',
  'Statuses: PASS/FAIL = real exit codes · NOT-RUN(reason) = could not run, first-class and never a pass ·',
  'AGENT-GATE rows = explicitly demoted to agent discipline, verified by committed evidence · N/A = does not',
  'apply to this brand\'s shape (never a false fail).',
];
const outDir = join(ROOT, 'audit', 'gates');
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, 'report.md'), lines.filter((l) => l !== '').join('\n') + '\n');

for (const r of rows) console.log(`${(icon[r.status] ?? '') + ' ' + r.status}\t${r.id}${r.status !== 'PASS' ? ' — ' + r.detail.slice(0, 160) : ''}`);
console.log(`\nVerdict: ${verdict} — report at ${rel(join(outDir, 'report.md'))}`);
process.exit(verdict === 'ALL-GREEN' ? 0 : verdict === 'BLOCKED' ? 1 : 2);
