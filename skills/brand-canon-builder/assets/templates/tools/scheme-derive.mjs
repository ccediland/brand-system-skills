#!/usr/bin/env node
// scheme-derive.mjs — ALGO-SCHEME-DERIVE materializer (Stage C-2, SC-1).
//
// WHAT THIS DOES
//   Turns N named canon schemes into N COMPLETE materialized role-token sets. For each
//   NON-deferred scheme in `canon/canon.json › schemes`, it derives the semantic COLOUR role
//   tokens in OKLCH from the base palette (per the scheme's {mode, dominant}) and writes a
//   per-scheme file `tokens/schemes/<id>.tokens.json` — every token a structured-OKLCH object tagged
//   `$extensions.brand.scheme:"<id>"`. audit-lint R7 then checks role-key parity with the default.
//
//   ALGO-SCHEME-DERIVE (mirror of 03-grammar.md §10 + canon.json.algorithms):
//     in  = (base palette OKLCH, scheme def {mode, dominant})
//     out = the scheme's semantic role-token set (structured-OKLCH, hex fallback computed)
//     mode governs LIGHTNESS: light = identity; dark = invert L on neutral roles (C<0.04) and
//       lift non-dominant chromatic roles +0.08 for legibility (dominant keeps its L); contrast =
//       push neutral roles to the L extreme. C and H are preserved (gamut-clamped at hex).
//     dominant names the lead ink role (kept at source L in dark mode). Enforces G-SCHEME-01/02, G-COLOR-01.
//     POST-DERIVE LEGIBILITY GUARD (derived modes): every text/fg role keeps ≥0.30 L-separation from the
//       scheme's nearest bg/surface role — the naive per-role invert preserves each L but can collapse the
//       PAIR on near-black/near-white palettes (invisible derived text). A too-close fg is pushed away
//       (clamped; C/H kept), logged, and stays hypothesis + the scheme's GAP — never silently emitted.
//
//   ZERO-DEP Node — NOT Style Dictionary, NOT Dispersa. Structured colour is written DIRECTLY
//   (raw SD trips the object -value/-unit split bug). OKLCH→sRGB hex is computed in-process.
//
//   USAGE:  node tools/scheme-derive.mjs [repo-root]      # default repo-root = cwd
//
//   A scheme with `status:"deferred"` emits NO set (it carries a logged GAP instead). Derived
//   palettes enter at confidence:"hypothesis" + the scheme's tracking GAP (`schemes.<id>.gap`): a
//   freshly-derived palette is unratified until the owner confirms it (the hypothesis→owner-confirmed
//   ladder). ANTI-DETERMINISM: derives the SHAPE of a scheme, never brand-specific values; a
//   single-scheme (flat) brand materializes one default set and is done.

import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { join, resolve } from 'node:path';

const ROOT = resolve(process.argv[2] || process.cwd());
const readJSON = (p) => JSON.parse(readFileSync(join(ROOT, p), 'utf8'));

// ---- OKLCH → sRGB hex (zero-dep; standard OKLab matrices) ----
function oklchToHex(L, C, H) {
  const hr = (H * Math.PI) / 180;
  const a = C * Math.cos(hr), b = C * Math.sin(hr);
  const l_ = L + 0.3963377774 * a + 0.2158037573 * b;
  const m_ = L - 0.1055613458 * a - 0.0638541728 * b;
  const s_ = L - 0.0894841775 * a - 1.2914855480 * b;
  const l = l_ ** 3, m = m_ ** 3, s = s_ ** 3;
  const lin = [
    4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s,
    -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s,
    -0.0041960863 * l - 0.7034186147 * m + 1.7076147010 * s,
  ];
  const gamma = (c) => (c <= 0.0031308 ? 12.92 * c : 1.055 * Math.pow(c, 1 / 2.4) - 0.055);
  const hx = (c) => Math.round(Math.min(1, Math.max(0, gamma(c))) * 255).toString(16).padStart(2, '0');
  return `#${hx(lin[0])}${hx(lin[1])}${hx(lin[2])}`;
}

// ---- read a token's OKLCH components (structured-OKLCH $value from C-1, or a legacy string) ----
function components(token) {
  const v = token && token.$value;
  if (v && typeof v === 'object' && v.colorSpace === 'oklch' && Array.isArray(v.components)) return v.components.slice(0, 3).map(Number);
  if (typeof v === 'string') { const m = v.match(/oklch\(([^)]+)\)/i); if (m) return m[1].trim().split(/[\s,]+/).slice(0, 3).map(Number); }
  return null;
}
const leaf = (obj, dotted) => dotted.split('.').reduce((o, k) => (o == null ? o : o[k]), obj);
const round4 = (n) => Math.round(n * 1e4) / 1e4;

// ---- ALGO-SCHEME-DERIVE: remap one role's OKLCH by mode + dominant ----
function deriveRole(role, [L, C, H], mode, dominant) {
  const neutral = C < 0.04;            // a (near-)greyscale anchor is a neutral role (bg/fg)
  let nl = L;
  if (mode === 'dark') {
    if (neutral) nl = round4(1 - L);
    else if (role !== dominant) nl = round4(Math.min(0.95, L + 0.08)); // lift non-dominant chromatic; dominant keeps its L
  } else if (mode === 'contrast') {
    if (neutral) nl = L >= 0.5 ? 1 : 0; // push neutrals to the extreme
  }
  return [nl, round4(C), round4(H)];
}

function main() {
  const canon = readJSON('canon/canon.json');
  const schemes = (canon && canon.schemes) || {};
  const base = readJSON('tokens/base.tokens.json');
  const semantic = readJSON('tokens/semantic.tokens.json');
  const roleSet = ((semantic.semantic || {}).color) || {};

  // role → base-anchor OKLCH, from the semantic colour aliases
  const roleAnchors = {};
  for (const [role, t] of Object.entries(roleSet)) {
    if (role.startsWith('$')) continue;
    const ref = typeof t.$value === 'string' && t.$value.match(/^\{(.+)\}$/);
    if (!ref) continue;
    const comps = components(leaf(base, ref[1]));
    if (comps) roleAnchors[role] = comps;
  }

  const written = [], deferred = [];
  for (const [id, def] of Object.entries(schemes)) {
    if (id.startsWith('$') || id === 'default') continue;
    if (def && /^deferred$/i.test(String(def.status || ''))) { deferred.push(id); continue; }
    const mode = (def && def.mode) || 'light';
    const dominant = (def && def.dominant) || null;
    const gap = (def && def.gap) || null;
    const color = { $type: 'color' };
    for (const [role, comps] of Object.entries(roleAnchors)) {
      const [L, C, H] = deriveRole(role, comps, mode, dominant);
      const brand = {
        scheme: id, role,
        provenance: { source: 'declared-spec', confidence: 'hypothesis', owner: 'ALGO-SCHEME-DERIVE (derived) — pending owner ratification', freshness: 'shipped' },
        spaces: { hex: { value: oklchToHex(L, C, H), source: 'derived' } },
      };
      if (gap) brand.gap = gap;
      color[role] = {
        $value: { colorSpace: 'oklch', components: [L, C, H], alpha: 1, hex: oklchToHex(L, C, H) },
        $description: `${id} scheme · ${role} (derived from the base palette by ALGO-SCHEME-DERIVE; ${mode} mode)`,
        $extensions: { brand },
      };
    }
    // POST-DERIVE LEGIBILITY GUARD (derived modes only). The naive per-role transform can collapse a
    // text/fg role onto a bg/surface role on near-black / near-white palettes (invert-L preserves the
    // per-role L but not the PAIRWISE separation). Every derived text/fg role must keep ≥ MIN_DL of L
    // against the scheme's nearest bg/surface role; a closer pair gets its fg L pushed away (clamped,
    // C/H preserved). The adjusted value stays a hypothesis carrying the scheme's GAP — the owner
    // ratifies; the guard only refuses to EMIT an invisible derived pairing. Role recognition is by
    // semantic ROLE NAME class (fg/text vs bg/surface), never by brand content.
    if (mode !== 'light') {
      const MIN_DL = 0.30;
      const FG = /text|fg|foreground|ink|on[-_]/i;
      const BG = /bg|background|surface|paper|ground|canvas/i;
      const entries = Object.entries(color).filter(([k]) => !k.startsWith('$'));
      const bgs = entries.filter(([k]) => BG.test(k) && !FG.test(k));
      if (bgs.length) {
        for (const [role, tok] of entries) {
          if (!FG.test(role) || BG.test(role)) continue;
          const L = tok.$value.components[0];
          let nearest = null;
          for (const [bgRole, bgTok] of bgs) {
            const d = Math.abs(L - bgTok.$value.components[0]);
            if (!nearest || d < nearest.d) nearest = { bgRole, bl: bgTok.$value.components[0], d };
          }
          if (nearest && nearest.d < MIN_DL) {
            const nl = round4(Math.min(1, Math.max(0, nearest.bl >= 0.5 ? nearest.bl - 0.45 : nearest.bl + 0.45)));
            const [, C2, H2] = tok.$value.components.length === 3 ? tok.$value.components : [0, 0, 0];
            tok.$value.components = [nl, C2, H2];
            tok.$value.hex = oklchToHex(nl, C2, H2);
            tok.$extensions.brand.spaces.hex.value = tok.$value.hex;
            tok.$description += ` · legibility-guard: L ${L} → ${nl} (was ${round4(nearest.d)} ΔL from ${nearest.bgRole}; floor ${MIN_DL})`;
            console.log(`scheme-derive: ${id}.${role} legibility-guard — L ${L} → ${nl} (ΔL vs ${nearest.bgRole} was ${round4(nearest.d)} < ${MIN_DL})`);
          }
        }
      }
    }
    const out = { scheme: { [id]: { color } } };
    const dir = join(ROOT, 'tokens', 'schemes');
    if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
    const rel = `tokens/schemes/${id}.tokens.json`;
    writeFileSync(join(ROOT, rel), JSON.stringify(out, null, 2) + '\n');
    written.push({ id, mode, roles: Object.keys(color).filter((k) => !k.startsWith('$')), file: rel });
  }

  for (const w of written) console.log(`scheme-derive: ${w.file} — ${w.mode} · roles [${w.roles.join(', ')}]`);
  if (deferred.length) console.log(`scheme-derive: deferred (no set, carries a GAP): ${deferred.join(', ')}`);
  if (!written.length && !deferred.length) console.log('scheme-derive: no schemes block — nothing to materialize (flat brand).');
}

main();
