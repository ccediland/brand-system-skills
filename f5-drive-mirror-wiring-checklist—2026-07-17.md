# F5 — Drive-mirror wiring checklist (round-trip gate runbook)

> Derived from the code (`tools/drive-mirror.mjs` + `.github/workflows/drive-mirror.yml`), not from memory of
> Google's UI. The operator runs this against a REAL brand repo + a REAL Drive to close gate F5 (the live
> sha256 round-trip that no fixture can prove). E-O1: this is NOT run here — the tool ships tested offline;
> the live leg is the operator's to exercise. The mirror is EMITTED per repo; every account/folder below is
> the operator's own, never the tool author's.

## What you are proving

A push to the brand repo's default branch uploads its custodied assets to a Google shared drive **without
conversion**, and the Action fails loudly if any file is missing or its `sha256Checksum` differs on either
side. Success = the Action run is green AND the files appear in Drive with matching checksums.

## Route A (default) — service account + shared drive

1. **Google Cloud Console → APIs & Services → Library → enable "Google Drive API"** on a project (any project).
2. **APIs & Services → Credentials → Create credentials → Service account.** Name it (e.g. `brand-mirror`).
   Skip the optional role grants (Drive access comes from shared-drive membership, not IAM).
3. Open the new service account → **Keys → Add key → Create new key → JSON → Create.** A `.json` downloads.
   This whole file is the `GOOGLE_SERVICE_ACCOUNT_JSON` secret. Note the `client_email` inside it.
4. **Google Drive → left rail → Shared drives → New** (needs Google **Workspace**; a personal Gmail has no
   shared drives → use Route B). Name it.
5. Open the shared drive → **Manage members → add the service account's `client_email`** → role **Content
   manager**.
6. Inside the shared drive, create (or pick) the destination **folder**. Open it; the URL is
   `https://drive.google.com/drive/folders/XXXXXXXX` — `XXXXXXXX` is the `GDRIVE_FOLDER_ID` secret.

## Route B (no Workspace) — OAuth refresh token + app-owned root folder

The `drive.file` scope only reaches files the app created, so on Route B the app **creates and owns its own
root folder** in your My Drive (it cannot write into a folder you pre-made).
1. Enable the Drive API (step A1).
2. **APIs & Services → OAuth consent screen** → External → create the app.
3. **Publish it: Publishing status → "Publish app" → In production.** With `drive.file` (non-sensitive) this
   needs NO Google verification, and it is REQUIRED — a "Testing" app's refresh token **expires after 7 days**
   and would kill the unattended mirror a week after setup.
4. **Credentials → Create credentials → OAuth client ID → Desktop app.** Save the **Client ID** + **Client secret**.
5. Mint a **refresh token** for scope `https://www.googleapis.com/auth/drive.file` — e.g. the OAuth 2.0
   Playground (gear → "Use your own OAuth credentials", paste client id/secret, authorize the `drive.file`
   scope, exchange for tokens) → copy the `refresh_token`.
6. Pick a `GDRIVE_ROOT_FOLDER_NAME` (e.g. `brand-canon-mirror`); the app creates/finds it in My Drive. **Do
   NOT set `GDRIVE_FOLDER_ID`** on Route B.

## Scopes

- **Route A (service account): `https://www.googleapis.com/auth/drive`** — required to write into the
  pre-created shared-drive folder (`drive.file` would 404 on a folder the app didn't create). A dedicated SA is
  still confined in practice to its shared-drive memberships; `drive` on an SA needs no verification.
- **Route B (OAuth): `https://www.googleapis.com/auth/drive.file`** — non-sensitive → publishable to
  production (no 7-day expiry); the app owns the files + root folder it creates.

## GitHub secrets (repo → Settings → Secrets and variables → Actions → New repository secret)

| Exact name | Route | Value |
|---|---|---|
| `GDRIVE_FOLDER_ID` | A | the pre-created shared-drive folder ID (last URL segment) |
| `GOOGLE_SERVICE_ACCOUNT_JSON` | A | the entire key JSON, pasted verbatim |
| `GDRIVE_ROOT_FOLDER_NAME` | B | name of the app-owned root folder to create in My Drive |
| `GDRIVE_OAUTH_CLIENT_ID` | B | OAuth client ID |
| `GDRIVE_OAUTH_CLIENT_SECRET` | B | OAuth client secret |
| `GDRIVE_OAUTH_REFRESH_TOKEN` | B | the refresh token |

Set only the secrets for your route. If `GOOGLE_SERVICE_ACCOUNT_JSON` is present the Action uses Route A
(`GDRIVE_FOLDER_ID`); otherwise it uses Route B (`GDRIVE_ROOT_FOLDER_NAME` + the OAuth secrets).

## Confirm the default branch

The workflow triggers on push to `main` (`.github/workflows/drive-mirror.yml`, `on.push.branches`). If the
repo's default branch is not `main`, edit that one line before relying on it.

## Fire the round-trip

1. Dry-run locally first (no creds): `node tools/drive-mirror.mjs --plan .` — confirm the plan lists the files
   you expect and excludes any Google-native ones. (`node tools/run-gates.mjs` runs this automatically.)
2. Push any change under `sources/** · assets/** · canon/** · CHECKSUMS.txt · satellites/asset-index.md` to
   the default branch (a trivial re-hash or a new asset).
3. **Actions tab → the `drive-mirror` run.** Green = every file uploaded and verified (sha256 match both
   sides). Red → read the log: a `MISSING` line (never uploaded), a `MISMATCH` line (stale), or an auth error.
4. Open the shared drive → the folder tree mirrors `satellites/asset-index.md` (a subfolder per `Kind`, or the
   per-row `Drive` column). Each file's checksum matches `CHECKSUMS.txt`.

## What green here certifies (gate F5)

Push → Drive → checksums match on both sides, zero conversion to Google-native formats (W-17). That is the
live round-trip the offline `--plan`/`--verify` legs and the fixtures could not prove.
