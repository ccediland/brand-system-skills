#!/usr/bin/env node
// drive-mirror.mjs — the ASSET MIRROR to a Google shared drive (zero-dep Node; the emitted GitHub Action's engine).
//
// WHAT: mirrors the brand's custodied source-of-record files (the marks, fonts, imagery, brandbooks, the
//   persisted handoff/brief — everything the ASSET INDEX names that also carries a CHECKSUMS.txt hash) to a
//   Google Drive folder, on push to the repo's default branch, and VERIFIES the round-trip by comparing the
//   `sha256Checksum` Drive computes for every uploaded file against the repo's CHECKSUMS.txt on BOTH sides.
//   git is the source of truth; the Drive is a mirror — one-way, no bidirectional sync, no conflict resolution
//   (that is a deliberate non-goal — the mirror is a workflow, not a sync system).
//
// FOLDER STRUCTURE mirrors the ASSET INDEX, never the repo tree (a repo tree duplicated in Drive is structure
//   with no owner): each file lands under the folder its asset-index `Drive` column names, or — when that
//   column is `—` — under a subfolder named for the row's `Kind`. The file keeps its repo basename.
//
// NO CONVERSION (R-14): every upload uses its real MIME type and `uploadType=multipart|media` — NEVER a
//   `application/vnd.google-apps.*` MIME, NEVER the legacy `?convert` flag. Google Docs-Editors native files
//   (`.gdoc/.gsheet/.gslides/.gform/.gdraw/.gsite/.gscript/.gjam/…`) expose NO `sha256Checksum` → they are
//   unverifiable → EXCLUDED BY NAME with a logged reason. Exclusion is DECLARED, never silent.
//
// THREE MODES (the first two are OFFLINE + deterministic — the gate + the fixtures exercise them; the live
//   leg needs real Drive credentials and is exercised by the operator at the live round-trip gate):
//   node tools/drive-mirror.mjs --plan   [repo-root]         # OFFLINE: compute + print the mirror plan;
//                                                            #   FAIL (exit 1) on a stale/absent custody hash,
//                                                            #   a target collision, or an unparseable index.
//   node tools/drive-mirror.mjs --verify <remote.json> [root] # OFFLINE: compare CHECKSUMS.txt vs the remote
//                                                            #   sha256Checksum map. A MISSING remote entry is
//                                                            #   a FAIL (an un-uploaded file can never pass by
//                                                            #   silence); a MISMATCH is a FAIL (a stale Drive
//                                                            #   copy never survives a changed binary).
//   node tools/drive-mirror.mjs          [repo-root]         # LIVE: auth → ensure folders → upload the
//                                                            #   missing/stale files (no conversion) → fetch
//                                                            #   each sha256Checksum → verify → report.
//
// LIVE CREDENTIALS (env — never a flag, never logged): GDRIVE_FOLDER_ID (the shared-drive destination folder)
//   plus ONE auth route:
//     · service account (default): GOOGLE_SERVICE_ACCOUNT_JSON (the key JSON, verbatim). A service account
//       has NO storage quota and cannot own Drive files → it MUST target a SHARED DRIVE (see .github/DRIVE-MIRROR.md).
//     · OAuth (no Workspace): GDRIVE_OAUTH_CLIENT_ID + GDRIVE_OAUTH_CLIENT_SECRET + GDRIVE_OAUTH_REFRESH_TOKEN.
//   Minimal scope: https://www.googleapis.com/auth/drive.file (the app sees only the files it created — exactly
//   the mirror it owns; least privilege).
//
// Exit: 0 = OK · 1 = plan/verify violation (or a live verify failure) · 2 = usage/config error.
// Zero external deps: Node ≥ 20 built-ins only (global fetch + node:crypto).

import { readFileSync, readdirSync, existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { createHash, createSign } from 'node:crypto';
import { join, resolve, basename } from 'node:path';

// ---------- Google Docs-Editors native formats: no bytes, no sha256Checksum → unverifiable → excluded ----------
const NATIVE_EXTS = new Set([
  'gdoc', 'gsheet', 'gslides', 'gform', 'gdraw', 'gmap', 'gsite', 'gscript', 'gjam', 'gtable', 'gnote',
  'fusiontable', 'shortcut',
]);
const NATIVE_MIME_PREFIX = 'application/vnd.google-apps.';

// ---------- a small, explicit extension→MIME map (unknown → octet-stream; NEVER a google-apps MIME) ----------
const MIME = {
  svg: 'image/svg+xml', png: 'image/png', jpg: 'image/jpeg', jpeg: 'image/jpeg', gif: 'image/gif',
  webp: 'image/webp', avif: 'image/avif', ico: 'image/x-icon', pdf: 'application/pdf',
  woff: 'font/woff', woff2: 'font/woff2', ttf: 'font/ttf', otf: 'font/otf', eot: 'application/vnd.ms-fontobject',
  json: 'application/json', txt: 'text/plain', md: 'text/markdown', css: 'text/css', csv: 'text/csv',
  html: 'text/html', xml: 'application/xml', zip: 'application/zip',
  docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  xlsx: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  pptx: 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
  mp4: 'video/mp4', mov: 'video/quicktime', mp3: 'audio/mpeg', wav: 'audio/wav',
};
const extOf = (p) => (p.split('.').pop() || '').toLowerCase();
const mimeOf = (p) => MIME[extOf(p)] || 'application/octet-stream';
const kindSlug = (k) => k.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '') || 'asset';

const read = (p) => { try { return readFileSync(p, 'utf8'); } catch { return null; } };
const sha256 = (p) => createHash('sha256').update(readFileSync(p)).digest('hex');
const isPlaceholder = (s) => s === '' || s === '—' || s === '-' || /[<>{}]/.test(s);
const normPath = (p) => String(p).replace(/^\.\//, '').replace(/^\/+/, '').trim();
// canonicalize a Drive folder path the SAME way the live resolver walks it (split on '/', drop empty
// segments) — else an internal `//` yields two distinct plan keys that collapse to ONE live folder, so a
// collision escapes detection and one file silently overwrites the other. Plan and live MUST agree.
const canonFolder = (p) => normPath(p).split('/').filter(Boolean).join('/');

// ---------- CHECKSUMS.txt → path→sha256 (sha256sum format: "<hash>  <path>") ----------
function loadChecksums(root) {
  const t = read(join(root, 'CHECKSUMS.txt')) || '';
  const m = new Map();
  for (const line of t.split('\n')) {
    // tolerate BOTH sha256sum text mode ("<hash>  path") and binary mode ("<hash> *path"): a `*` marker
    // must never be captured into the path (it would silently drop every custodied row — matches audit-lint).
    const mm = line.match(/^([0-9a-f]{64})\s+\*?(.+?)\s*$/i);
    if (mm) m.set(normPath(mm[2]), mm[1].toLowerCase());
  }
  return m;
}

// ---------- parse the asset index markdown table → rows ----------
// Columns (frozen order, satellites/asset-index.md): Entry | Kind | Repo location | Drive | Custody | primary-master-for
function loadAssetIndex(root) {
  const t = read(join(root, 'satellites', 'asset-index.md'));
  if (t == null) return { present: false, rows: [] };
  const rows = [];
  for (const raw of t.split('\n')) {
    const line = raw.trim();
    if (!line.startsWith('|')) continue;
    const cells = line.split('|').slice(1, -1).map((c) => c.trim());
    if (cells.length < 6) continue;
    if (/^-+$/.test(cells[0].replace(/[:\s-]/g, '') === '' ? '-' : cells[0])) continue; // separator row
    if (cells[0].toLowerCase() === 'entry') continue; // header row
    rows.push({ entry: cells[0], kind: cells[1], repo: cells[2], drive: cells[3], custody: cells[4] });
  }
  return { present: true, rows };
}

// ---------- build the mirror plan (OFFLINE, deterministic) ----------
// mirror set = asset-index rows whose Repo location is a real file AND is hashed in CHECKSUMS.txt (custody is
// the "verifiable source-of-record" signal). Non-custodied rows (deliverables, derived knowledge) are not the
// mirror's scope. Native Docs-Editors files that ARE custodied are excluded by name (unverifiable).
function buildPlan(root) {
  const idx = loadAssetIndex(root);
  const sums = loadChecksums(root);
  const mirror = [], excluded = [], problems = [];
  if (!idx.present) return { indexPresent: false, mirror, excluded, problems };

  const targets = new Map(); // "folder/name" → repoPath (collision detection)
  for (const r of idx.rows) {
    const repo = normPath(r.repo);
    if (isPlaceholder(r.repo) || !repo) continue;            // template placeholder row — nothing to mirror
    if (!sums.has(repo)) continue;                           // not under custody → not the mirror's scope

    const name = basename(repo);
    if (NATIVE_EXTS.has(extOf(repo))) {
      excluded.push({ repo, reason: `Google Docs-Editors native format (.${extOf(repo)}) — no sha256Checksum, unverifiable (R-14)` });
      continue;
    }
    if (!existsSync(join(root, repo))) {
      problems.push(`${repo}: named in the asset index + CHECKSUMS.txt but the file does not exist on disk (broken custody)`);
      continue;
    }
    const onDisk = sha256(join(root, repo));
    const declared = sums.get(repo);
    if (onDisk !== declared) {
      problems.push(`${repo}: CHECKSUMS.txt is STALE — on-disk sha256 ${onDisk.slice(0, 12)}… ≠ recorded ${declared.slice(0, 12)}… (re-hash before mirroring; the mirror never uploads bytes whose custody hash is wrong)`);
      continue;
    }
    const folder = isPlaceholder(r.drive) ? kindSlug(r.kind) : (canonFolder(r.drive) || kindSlug(r.kind));
    const key = `${folder}/${name}`;
    if (targets.has(key)) {
      problems.push(`Drive target collision: "${key}" claimed by both ${targets.get(key)} and ${repo} — two files cannot share one Drive path (disambiguate the asset-index Drive column)`);
      continue;
    }
    targets.set(key, repo);
    mirror.push({ repo, folder, name, sha256: onDisk, mime: mimeOf(repo), kind: r.kind });
  }
  return { indexPresent: true, mirror, excluded, problems };
}

// ---------- writers ----------
function writeReport(root, sub, name, obj) {
  const dir = join(root, 'audit', 'mirror');
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, name), JSON.stringify(obj, null, 2) + '\n');
  return join('audit', 'mirror', name);
}

// ============================ MODE: --plan (offline) ============================
function cmdPlan(root) {
  const { indexPresent, mirror, excluded, problems } = buildPlan(root);
  if (!indexPresent) { console.log('drive-mirror --plan: no satellites/asset-index.md — nothing to mirror (N/A)'); return 0; }
  for (const m of mirror) console.log(`  mirror  ${m.repo}  →  Drive:${m.folder}/${m.name}  [${m.mime}]  sha256:${m.sha256.slice(0, 12)}…`);
  for (const e of excluded) console.log(`  EXCLUDE ${e.repo}  —  ${e.reason}`);
  const rel = writeReport(root, 'mirror', 'plan.json', { mirror, excluded, problems, generatedBy: 'drive-mirror.mjs --plan' });
  if (problems.length) {
    for (const p of problems) console.log(`  ❌ ${p}`);
    console.log(`drive-mirror --plan: FAIL — ${problems.length} problem(s); ${mirror.length} mirrorable, ${excluded.length} excluded · plan at ${rel}`);
    return 1;
  }
  console.log(`drive-mirror --plan: OK — ${mirror.length} file(s) to mirror, ${excluded.length} excluded by name · plan at ${rel}`);
  return 0;
}

// ============================ MODE: --verify <remote.json> (offline) ============================
// remote.json: { "<folder>/<name>": "<sha256Checksum-from-Drive>", ... } — the map the live leg records after
// upload (or a fixture). Every planned file MUST appear AND match; a missing key is the empty-pass guard.
function cmdVerify(root, remoteFile) {
  const { indexPresent, mirror, problems } = buildPlan(root);
  if (problems.length) { for (const p of problems) console.log(`  ❌ ${p}`); console.log('drive-mirror --verify: FAIL — the plan itself is broken (fix --plan first)'); return 1; }
  if (!indexPresent) { console.log('drive-mirror --verify: no asset index — nothing to verify (N/A)'); return 0; }
  let remote;
  try { remote = JSON.parse(read(remoteFile) ?? ''); }
  catch { console.log(`drive-mirror --verify: cannot parse remote checksum map ${remoteFile}`); return 2; }
  if (!remote || typeof remote !== 'object' || Array.isArray(remote)) { console.log('drive-mirror --verify: remote map must be a JSON object { "<folder>/<name>": "<sha256>" }'); return 2; }

  const fails = [];
  for (const m of mirror) {
    const key = `${m.folder}/${m.name}`;
    const got = remote[key];
    if (got == null) { fails.push(`${key}: MISSING from the remote — the file never uploaded (an absent remote checksum is a FAIL, never a silent pass)`); continue; }
    if (String(got).toLowerCase() !== m.sha256) { fails.push(`${key}: sha256 MISMATCH — local ${m.sha256.slice(0, 12)}… ≠ Drive ${String(got).slice(0, 12)}… (stale mirror; the changed binary was not re-uploaded)`); continue; }
    console.log(`  ✅ ${key}  sha256:${m.sha256.slice(0, 12)}…`);
  }
  const rel = writeReport(root, 'mirror', 'verify.json', { checked: mirror.length, failures: fails, verifiedAt: 'offline' });
  if (fails.length) { for (const f of fails) console.log(`  ❌ ${f}`); console.log(`drive-mirror --verify: FAIL — ${fails.length}/${mirror.length} file(s) failed · report at ${rel}`); return 1; }
  console.log(`drive-mirror --verify: OK — ${mirror.length}/${mirror.length} round-trip checksums match · report at ${rel}`);
  return 0;
}

// ============================ LIVE leg (needs Drive credentials) ============================
const b64url = (buf) => Buffer.from(buf).toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');

// Returns { token, route }. Route A (service account) requests the FULL `drive` scope: the mirror must write
// into a destination folder the OPERATOR pre-created (a shared-drive folder), which `drive.file` (app-created
// files only) cannot reference → the live upload would 404 on first run. A dedicated SA's `drive` scope is
// still bounded in practice to the shared drives it is a MEMBER of, and needs no OAuth-verification. Route B
// (OAuth) carries whatever scope its refresh token was minted with — the doc pins that to `drive.file`, so the
// app must create + own its destination tree (see cmdLive's app-owned-root path), which keeps the OAuth app
// non-sensitive (publishable to production → no 7-day test-token expiry).
async function accessToken() {
  const saRaw = process.env.GOOGLE_SERVICE_ACCOUNT_JSON;
  if (saRaw) {
    let sa; try { sa = JSON.parse(saRaw); } catch { throw new Error('GOOGLE_SERVICE_ACCOUNT_JSON is not valid JSON'); }
    if (!sa.client_email || !sa.private_key) throw new Error('service-account JSON missing client_email/private_key');
    const now = Math.floor(Date.now() / 1000);
    const claim = { iss: sa.client_email, scope: 'https://www.googleapis.com/auth/drive', aud: 'https://oauth2.googleapis.com/token', iat: now, exp: now + 3600 };
    const head = { alg: 'RS256', typ: 'JWT' };
    const signingInput = `${b64url(JSON.stringify(head))}.${b64url(JSON.stringify(claim))}`;
    const sig = b64url(createSign('RSA-SHA256').update(signingInput).sign(sa.private_key));
    const res = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({ grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer', assertion: `${signingInput}.${sig}` }),
    });
    const j = await res.json();
    if (!res.ok || !j.access_token) throw new Error(`service-account token exchange failed (${res.status})`); // never log the body — it can echo the assertion
    return { token: j.access_token, route: 'sa' };
  }
  const { GDRIVE_OAUTH_CLIENT_ID: id, GDRIVE_OAUTH_CLIENT_SECRET: secret, GDRIVE_OAUTH_REFRESH_TOKEN: refresh } = process.env;
  if (id && secret && refresh) {
    const res = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({ client_id: id, client_secret: secret, refresh_token: refresh, grant_type: 'refresh_token' }),
    });
    const j = await res.json();
    if (!res.ok || !j.access_token) throw new Error(`OAuth refresh failed (${res.status})`);
    return { token: j.access_token, route: 'oauth' };
  }
  throw new Error('no credentials in env: set GOOGLE_SERVICE_ACCOUNT_JSON, or GDRIVE_OAUTH_CLIENT_ID/SECRET/REFRESH_TOKEN');
}

const DRIVE = 'https://www.googleapis.com/drive/v3';
const UPLOAD = 'https://www.googleapis.com/upload/drive/v3';
const shared = 'supportsAllDrives=true&includeItemsFromAllDrives=true';

async function driveGET(token, url) {
  const res = await fetch(url, { headers: { Authorization: `Bearer ${token}` } });
  if (!res.ok) throw new Error(`Drive GET ${res.status}`);
  return res.json();
}
async function findChild(token, parent, name, folder) {
  // supportsAllDrives + includeItemsFromAllDrives covers BOTH My Drive (OAuth route) and a shared drive (SA
  // route); no explicit corpora (which would need a driveId and break the My-Drive case).
  const q = encodeURIComponent(`name='${name.replace(/'/g, "\\'")}' and '${parent}' in parents and trashed=false` + (folder ? ` and mimeType='application/vnd.google-apps.folder'` : ''));
  const j = await driveGET(token, `${DRIVE}/files?q=${q}&fields=files(id,name,sha256Checksum)&${shared}`);
  return (j.files || [])[0] || null;
}
async function ensureFolder(token, parent, name) {
  const found = await findChild(token, parent, name, true);
  if (found) return found.id;
  const res = await fetch(`${DRIVE}/files?${shared}&fields=id`, {
    method: 'POST', headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, mimeType: 'application/vnd.google-apps.folder', parents: [parent] }),
  });
  if (!res.ok) throw new Error(`create folder "${name}" failed (${res.status})`);
  return (await res.json()).id;
}
// Route B (drive.file) has no access to an operator-precreated folder, so the app CREATES + owns its root
// folder by name at the account's My Drive root ('root' alias) — an app-created folder IS in drive.file scope.
async function ensureRootFolder(token, name) {
  const found = await findChild(token, 'root', name, true);
  if (found) return found.id;
  const res = await fetch(`${DRIVE}/files?${shared}&fields=id`, {
    method: 'POST', headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, mimeType: 'application/vnd.google-apps.folder', parents: ['root'] }),
  });
  if (!res.ok) throw new Error(`create root folder "${name}" failed (${res.status})`);
  return (await res.json()).id;
}
async function ensureFolderPath(token, rootId, path, cache) {
  let parent = rootId;
  for (const seg of path.split('/').filter(Boolean)) {
    const ck = `${parent}/${seg}`;
    if (!cache.has(ck)) cache.set(ck, await ensureFolder(token, parent, seg));
    parent = cache.get(ck);
  }
  return parent;
}
// Upload with the file's REAL mime, multipart, no conversion. Existing file → PATCH media (same id, new bytes).
async function uploadFile(token, parentId, m, absPath, existingId) {
  const bytes = readFileSync(absPath);
  if (existingId) {
    const res = await fetch(`${UPLOAD}/files/${existingId}?uploadType=media&${shared}&fields=id,sha256Checksum`, {
      method: 'PATCH', headers: { Authorization: `Bearer ${token}`, 'Content-Type': m.mime }, body: bytes,
    });
    if (!res.ok) throw new Error(`update ${m.name} failed (${res.status})`);
    return res.json();
  }
  const boundary = 'brandmirror' + b64url(createHash('sha1').update(m.repo).digest()).slice(0, 16);
  const meta = JSON.stringify({ name: m.name, parents: [parentId] }); // NO mimeType override → NO conversion
  const body = Buffer.concat([
    Buffer.from(`--${boundary}\r\nContent-Type: application/json; charset=UTF-8\r\n\r\n${meta}\r\n--${boundary}\r\nContent-Type: ${m.mime}\r\n\r\n`),
    bytes, Buffer.from(`\r\n--${boundary}--`),
  ]);
  const res = await fetch(`${UPLOAD}/files?uploadType=multipart&${shared}&fields=id,sha256Checksum`, {
    method: 'POST', headers: { Authorization: `Bearer ${token}`, 'Content-Type': `multipart/related; boundary=${boundary}` }, body,
  });
  if (!res.ok) throw new Error(`upload ${m.name} failed (${res.status})`);
  return res.json();
}

async function cmdLive(root) {
  const envFolderId = process.env.GDRIVE_FOLDER_ID;
  const rootName = process.env.GDRIVE_ROOT_FOLDER_NAME;
  if (!envFolderId && !rootName) { console.log('drive-mirror: set GDRIVE_FOLDER_ID (a shared-drive folder, Route A) or GDRIVE_ROOT_FOLDER_NAME (an app-owned root the drive.file OAuth route creates, Route B)'); return 2; }
  const { indexPresent, mirror, excluded, problems } = buildPlan(root);
  if (!indexPresent) { console.log('drive-mirror: no asset index — nothing to mirror'); return 0; }
  if (problems.length) { for (const p of problems) console.log(`  ❌ ${p}`); console.log('drive-mirror: FAIL — plan broken; nothing uploaded'); return 1; }
  for (const e of excluded) console.log(`  EXCLUDE ${e.repo} — ${e.reason}`);

  let token, route;
  try { ({ token, route } = await accessToken()); } catch (e) { console.log(`drive-mirror: auth failed — ${e.message}`); return 2; }
  // Route A (SA + drive scope): write into the operator-precreated GDRIVE_FOLDER_ID. Route B (drive.file):
  // an app-created root by name (a precreated folder is out of drive.file scope → 404). Prefer the explicit id.
  let rootId = envFolderId;
  try {
    if (!rootId) rootId = await ensureRootFolder(token, rootName);
  } catch (e) { console.log(`drive-mirror: could not resolve destination root — ${e.message}`); return 1; }
  const folderCache = new Map(), remote = {}, fails = [];
  for (const m of mirror) {
    try {
      const parent = await ensureFolderPath(token, rootId, m.folder, folderCache);
      const existing = await findChild(token, parent, m.name, false);
      let result = existing;
      if (!existing) result = await uploadFile(token, parent, m, join(root, m.repo), null);
      else if (existing.sha256Checksum !== m.sha256) result = await uploadFile(token, parent, m, join(root, m.repo), existing.id); // stale → re-upload
      // re-fetch the authoritative checksum Drive computed (never trust the upload response alone)
      const meta = await driveGET(token, `${DRIVE}/files/${result.id}?fields=sha256Checksum&${shared}`);
      remote[`${m.folder}/${m.name}`] = meta.sha256Checksum ?? null;
      if (meta.sha256Checksum == null) fails.push(`${m.folder}/${m.name}: Drive returned NO sha256Checksum (a conversion, or a Docs-Editors target slipped in) — unverifiable`);
    } catch (e) { fails.push(`${m.folder}/${m.name}: ${e.message}`); }
  }
  // verify BOTH sides from the recorded remote map (same logic as --verify)
  for (const m of mirror) {
    const got = remote[`${m.folder}/${m.name}`];
    if (got == null) { if (!fails.some((f) => f.startsWith(`${m.folder}/${m.name}:`))) fails.push(`${m.folder}/${m.name}: MISSING remote checksum (never uploaded)`); }
    else if (String(got).toLowerCase() !== m.sha256) fails.push(`${m.folder}/${m.name}: sha256 MISMATCH after upload (local ${m.sha256.slice(0, 12)}… ≠ Drive ${String(got).slice(0, 12)}…)`);
  }
  const rel = writeReport(root, 'mirror', 'report.json', { mirrored: mirror.length, excluded: excluded.length, failures: fails, remote });
  if (fails.length) { for (const f of fails) console.log(`  ❌ ${f}`); console.log(`drive-mirror: FAIL — ${fails.length} file(s) did not verify · report at ${rel}`); return 1; }
  console.log(`drive-mirror: OK — ${mirror.length} file(s) mirrored + verified (sha256 match both sides) via ${route}, ${excluded.length} excluded · report at ${rel}`);
  return 0;
}

// ---------- entry ----------
const argv = process.argv.slice(2);
if (argv.includes('--help') || argv.includes('-h')) {
  console.log('usage: drive-mirror.mjs [--plan | --verify <remote.json>] [repo-root]   (default: live mirror)');
  process.exit(0);
}
const roots = argv.filter((a) => !a.startsWith('--') && !a.startsWith('-'));
const main = async () => {
  if (argv.includes('--plan')) return cmdPlan(resolve(roots[0] || process.cwd()));
  if (argv.includes('--verify')) {
    const rf = roots[0];
    if (!rf) { console.log('drive-mirror --verify: needs <remote.json> [repo-root]'); return 2; }
    return cmdVerify(resolve(roots[1] || process.cwd()), resolve(rf));
  }
  return cmdLive(resolve(roots[0] || process.cwd()));
};
main().then((code) => process.exit(code)).catch((e) => { console.log(`drive-mirror: unexpected error — ${e.message}`); process.exit(2); });
