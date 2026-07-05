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
// INTERIM deny scope: the client-surface manifest does not exist yet, so the deny gate
// runs over the DECLARED interim scope (prototype/**/*.html + the repo README.md) and the
// board labels it "interim scope". Widening to a real manifest is a later, tracked change —
// the label keeps the claim honest until then.

import { readFileSync, readdirSync, existsSync, statSync, mkdirSync, writeFileSync } from 'node:fs';
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
  const scope = [];
  const walkHtml = (dir) => { for (const f of listDir(dir)) { const p = join(dir, f); if (isDir(p)) walkHtml(p); else if (f.endsWith('.html')) scope.push(p); } };
  const protoDir = join(ROOT, 'prototype');
  if (isDir(protoDir)) walkHtml(protoDir);
  const readme = join(ROOT, 'README.md');
  if (existsSync(readme)) scope.push(readme);
  if (!scope.length) {
    add('client-deny-lint', 'lint', true, 'N/A', 'no client surfaces found under the interim scope (prototype/**/*.html, README.md)');
  } else {
    const r = runTool('client-deny-lint.mjs', scope);
    add('client-deny-lint', 'lint', true, r.status, `INTERIM scope (${scope.map(rel).join(', ')}) — pending the client-surface manifest · ${r.detail}`);
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

// ---------- 4. §7a fidelity evidence presence (measured, BLOCKING) ----------
{
  const fdir = join(ROOT, 'audit', 'fidelity');
  if (!isDir(fdir)) {
    add('§7a fidelity evidence', 'measured', true, 'N/A', 'no audit/fidelity/ — no reproduced treatments (a brand that reproduced none commits none)');
  } else {
    const bad = [];
    let n = 0;
    for (const t of listDir(fdir)) {
      const dir = join(fdir, t);
      if (!isDir(dir)) continue;
      n++;
      let rec = null;
      try { rec = JSON.parse(readFileSync(join(dir, 'scores.json'), 'utf8')); } catch { /* missing/malformed */ }
      if (!rec || rec.verdict == null) bad.push(`${t}: scores.json missing or carries no verdict`);
      // the machine pass field is the gate, never the verdict string alone (a declared-GAP pass:true
      // still passes here — the mandatory-set / --gap-escape tightening is gated separately)
      else if (rec.pass !== true) bad.push(`${t}: verdict "${rec.verdict}" is not a pass (pass: ${JSON.stringify(rec.pass ?? null)})`);
    }
    if (n === 0) add('§7a fidelity evidence', 'measured', true, 'N/A', 'audit/fidelity/ exists but holds no treatment dirs');
    else add('§7a fidelity evidence', 'measured', true, bad.length ? 'FAIL' : 'PASS',
      bad.length ? bad.join(' · ') : `${n} treatment dir(s), each with a recorded PASSING verdict (mandatory-set coverage is gated separately)`);
  }
}

// ---------- 5. §7b keystone structural + FORM-OF-RULE (lint, BLOCKING) ----------
{
  const candidates = listDir(ROOT).filter((f) => /(^|-)keystone\.md$/.test(f));
  if (!candidates.length) {
    add('keystone structural', 'lint', true, 'FAIL', 'no <brand>-keystone.md at the repo root — the keystone is a mandatory output');
    add('keystone form-of-rule', 'lint', true, 'FAIL', 'no keystone to check');
  } else {
    const text = readText(join(ROOT, candidates[0])) ?? '';
    // mask fenced code blocks (offset-preserving) so a ``` fence carrying "## " never miscounts sections
    const masked = text.replace(/```[\s\S]*?```/g, (m) => m.replace(/[^\n]/g, ' '));
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
