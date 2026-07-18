# Drive mirror — emit the Google-Drive asset mirror (Stage 8/9, emitted infra)

Read when emitting the optional **Drive mirror**: a GitHub Action that uploads the brand's custodied assets to
a Google shared drive on every push, and verifies the round-trip by `sha256Checksum` on both sides. This is
**emitted client infra**, parameterized per repo — never the tool-author's account. Each user wires their own
Drive; the account and folder are parameters + a doc section, never a build decision or a build blocker.

## What gets emitted (Stage 1 copies all of it; fill nothing brand-specific)

- `.github/workflows/drive-mirror.yml` — the Action. Trigger: `push` to the default branch, path-filtered to
  `sources/** · assets/** · canon/** · CHECKSUMS.txt · satellites/asset-index.md`. `permissions: contents:read`.
- `tools/drive-mirror.mjs` — the zero-dep engine (plan / verify / live modes).
- `.github/DRIVE-MIRROR.md` — the operation guide (auth routes, the shared-drive requirement + evidence,
  secret names, folder-ID, minimal scope, what it does / does NOT).

If the repo opts out of the mirror, delete the workflow file — `run-gates.mjs` then records the mirror row N/A.

## The mirror contract (what the engine enforces)

- **Mirror set = every asset-index row whose `Repo location` is a real file AND is hashed in `CHECKSUMS.txt`.**
  Custody presence is the "verifiable source-of-record" signal; deliverables and derived knowledge (not in
  CHECKSUMS) are out of scope. This keeps the mirror to material a checksum can prove.
- **Folder tree mirrors the ASSET INDEX, not the repo tree** (a duplicated repo tree is structure with no
  owner). Each file lands under the folder its `Drive` column names, or — when `—` — under a subfolder named
  for the row's `Kind`; the file keeps its repo basename. A two-file collision on one Drive path is a plan
  FAIL (disambiguate via the `Drive` column).
- **No conversion (R-14).** Uploads use the file's real MIME, `uploadType=multipart|media`, never a
  `application/vnd.google-apps.*` MIME, never a `convert` flag — so every upload keeps a real `sha256Checksum`.
  Google **Docs-Editors native files** (`.gdoc/.gsheet/.gslides/…`) have no `sha256Checksum` → **excluded by
  name, logged, never silent** (an unverifiable file is never mirrored as if it were verified).
- **Round-trip verify, both sides, no empty pass.** After upload the engine re-fetches each file's
  `sha256Checksum` and fails if any expected file is **missing** (an un-uploaded file never passes by silence)
  or **mismatched** (a stale Drive copy never survives a changed binary). This is the W-17 guard.
- **One-way mirror, not a sync** (P-J-01): git is the source of truth; no Drive → repo flow, no conflict
  resolution, no deletion of dropped files. A workflow, not a sync system.

## Auth (parameters, never a build decision)

Two routes, both via **GitHub Secrets** (native to the Action — no external secret manager imposed on an
arbitrary user; a secret manager is an optional note, not a requirement). Three Google traps this had to
route around (all documented-broken patterns — name them, do not ship into them):

- **Route A (default): service account + shared drive, scope `drive`.** A service account has **no storage
  quota and cannot own Drive files** — it MUST target a **shared drive**. The "share a My-Drive folder with
  the SA" pattern is broken by construction (`storageQuotaExceeded`; evidence:
  `developers.google.com/workspace/drive/api/guides/handle-errors`). SCOPE: the mirror writes into a folder the
  operator **pre-created**, which the narrower `drive.file` scope (app-created files only) **404s** — so Route A
  uses the full `drive` scope. A **dedicated** SA with `drive` is still bounded in practice to the shared drives
  it is a member of, and needs no consent screen / no verification.
- **Route B (no Workspace): OAuth, scope `drive.file`, app-owned root.** Shared drives need Workspace; without
  it, authorize as a human user. To keep `drive.file` viable (non-sensitive → the OAuth app can be **published
  to production without verification**, which avoids the **7-day refresh-token expiry** a "Testing" app imposes),
  the app must **create + own** its destination tree — so Route B makes the app create a root folder by name
  (`GDRIVE_ROOT_FOLDER_NAME`) in the user's My Drive rather than target a pre-made folder (which drive.file
  would 404). Never leave Route B on "Testing" (token dies in a week) and never point it at a pre-created folder.

Secrets: `GDRIVE_FOLDER_ID` + `GOOGLE_SERVICE_ACCOUNT_JSON` (A) or `GDRIVE_ROOT_FOLDER_NAME` +
`GDRIVE_OAUTH_CLIENT_ID`/`_SECRET`/`_REFRESH_TOKEN` (B). The engine returns the auth route it used; the SA JWT
carries `drive`, OAuth carries whatever its refresh token was minted with (pin that to `drive.file`).

## Security posture (do not weaken)

- Trigger is `push` to the default branch **only** — NEVER `pull_request_target` (nor fork `pull_request`):
  those run untrusted fork code with access to this repo's secrets (the classic exfil vector).
- Secrets travel only through `env:`; the engine never prints credential material or token-endpoint bodies.
- `concurrency` serializes runs so two pushes can't race the same folder.

## Gate wiring + verification boundary

`run-gates.mjs` §3d runs `drive-mirror.mjs --plan` (OFFLINE, no creds) whenever the workflow is present, so a
plan that would break in CI — a **stale custody hash**, a **Drive-path collision**, a broken index — is caught
before the live round-trip. `--verify <remote.json>` re-checks a recorded remote checksum map offline. Both
offline modes are fixture-exercised (`tools/fixtures/gates/drive-mirror/`).

**LIMIT:** the live upload + real `sha256Checksum` round-trip needs real Drive credentials — the operator's
live round-trip gate, never a build-time dependency. The engine proves plan/verify integrity offline; authenticity
of the live mirror is the operator's wiring + the sha256 both-sides check the live leg runs.
