# Drive mirror — operation guide

The `drive-mirror` GitHub Action (`.github/workflows/drive-mirror.yml`) uploads this repo's **custodied brand
assets** — every file the asset index (`satellites/asset-index.md`) names that also carries a `CHECKSUMS.txt`
hash — to a Google **shared drive**, on each push to the default branch, and verifies the round-trip by
comparing the `sha256Checksum` Google computes against `CHECKSUMS.txt` on **both sides**.

**git is the source of truth. The Drive is a one-way mirror** — no bidirectional sync, no conflict resolution.
If a file differs, the git bytes win and overwrite the Drive copy. If you want a file in Drive, put it in the
repo and index it; nothing flows Drive → repo.

## What it does — and what it does NOT

Does:
- Mirror each custodied asset-index row to Drive, in a folder tree that **mirrors the asset index** (each file
  lands under the folder its `Drive` column names, or — when that column is `—` — under a subfolder named for
  the row's `Kind`; the file keeps its repo basename).
- Upload with the file's **real MIME type, never converting** — so every uploaded file keeps a real
  `sha256Checksum` Google can report back.
- **Verify the round-trip**: after upload it re-fetches each file's `sha256Checksum` and fails the job if any
  expected file is missing from Drive (an un-uploaded file never passes by silence) or its checksum differs
  (a stale mirror is a failure, not a warning).
- Re-upload only what changed (idempotent): a file whose Drive checksum already matches is skipped.

Does NOT:
- Sync Drive → repo, resolve conflicts, or delete Drive files the repo dropped (a mirror adds and updates; it
  is deliberately not a two-way sync).
- Touch Google **Docs-Editors native files** (`.gdoc/.gsheet/.gslides/.gform/…`). Those expose **no**
  `sha256Checksum`, so they are unverifiable — the mirror **excludes them by name** and logs each exclusion.
  (This is why the index should point at real exported files, not Google-native pointers.)

## Auth — two routes

### Route A (default): service account + a shared drive

**Why a shared drive is mandatory.** A Google **service account has no storage quota and cannot own Drive
files**; it can only write into a **shared drive** (or act on a user's behalf via OAuth). The tempting pattern —
"create a service account, share a *My Drive* folder with it, upload there" — is **broken by design**: the
upload fails with `storageQuotaExceeded` because the file would be owned by the quota-less service account.
This is documented behaviour, not a bug: see Google's Drive API error guide,
`developers.google.com/workspace/drive/api/guides/handle-errors` (the `storageQuotaExceeded` /
service-account-cannot-own-files note). **Use a shared drive.**

Setup:
1. In **Google Cloud Console** → *APIs & Services* → **Enable** the *Google Drive API* on a project.
2. *IAM & Admin* → *Service Accounts* → **Create service account** → *Keys* → **Add key → JSON**. Download the
   key file. (No IAM roles are needed — Drive access comes from the shared-drive membership below, not IAM.)
3. In **Google Drive**, create a **Shared drive** (Workspace required for shared drives). Add the service
   account's `client_email` (from the JSON) as a **member** with *Content manager* (or *Manager*).
4. Open the destination **folder inside that shared drive**; the **folder ID** is the last path segment of its
   URL: `https://drive.google.com/drive/folders/<THIS_IS_THE_FOLDER_ID>`.
5. Set the secrets (below).

### Route B (no Workspace): OAuth refresh token

Shared drives require Google **Workspace**. Without it, authorize as a **human user** with an OAuth refresh
token. Here the app uses the `drive.file` scope (see *Scopes* below), which can only touch files **it
created** — so the mirror does **not** write into a folder you pre-made; instead it **creates and owns its own
root folder** in your My Drive, named by `GDRIVE_ROOT_FOLDER_NAME`, and mirrors under it.
1. Cloud Console → *APIs & Services* → *OAuth consent screen* → **Create OAuth client ID** (type: *Desktop app*).
   Note the **client ID** and **client secret**.
2. **Publish the app to "In production"** (the *OAuth consent screen* → *Publishing status* → *Publish app*).
   Because the scope is `drive.file` (non-sensitive), this needs **no Google verification**, and it removes the
   **7-day refresh-token expiry** that a "Testing" app imposes — a mirror that runs on every push must not have
   its token die after a week.
3. Obtain a **refresh token** for scope `https://www.googleapis.com/auth/drive.file` (e.g. via the OAuth 2.0
   Playground with "Use your own OAuth credentials", or a one-off local script). Store the `refresh_token`.
4. Set `GDRIVE_ROOT_FOLDER_NAME` (e.g. `brand-canon-mirror`) and **leave `GDRIVE_FOLDER_ID` unset** — the app
   will create/find that root folder in your My Drive. Leave `GOOGLE_SERVICE_ACCOUNT_JSON` **unset** so the
   mirror uses the OAuth route.

## Scopes (and why not the "minimal" one everywhere)

- **Route A (service account): `https://www.googleapis.com/auth/drive`.** The mirror must write into the
  shared-drive folder **you pre-created** (`GDRIVE_FOLDER_ID`). The narrower `drive.file` scope only grants
  access to files the app itself created, so it **404s** the moment it references a folder it did not make —
  it cannot be used for a pre-existing destination. A **dedicated** service account with `drive` scope is
  still bounded in practice to the shared drives it is a **member of** (it owns nothing else and has no quota),
  so this is not the blanket-Drive access it sounds like. A service account needs no consent screen and no
  verification, so `drive` here costs nothing.
- **Route B (OAuth): `https://www.googleapis.com/auth/drive.file`.** A human OAuth app *can* stay on this
  non-sensitive scope precisely because it lets the app **create + own** its mirror tree — which is why Route B
  makes the app create its own root folder rather than target a pre-made one. Non-sensitive = publishable to
  production without verification = no 7-day token expiry.

Do **not** "simplify" Route A to `drive.file` — the pre-created shared-drive folder is out of that scope's
reach and the live mirror will 404 on its first run.

## Secrets (repo → Settings → Secrets and variables → Actions)

| Secret | Route | Value |
|---|---|---|
| `GDRIVE_FOLDER_ID` | A | the pre-created shared-drive folder's ID (last URL segment) |
| `GOOGLE_SERVICE_ACCOUNT_JSON` | A | the **entire** service-account key JSON, pasted verbatim |
| `GDRIVE_ROOT_FOLDER_NAME` | B | the name of the app-owned root folder to create in My Drive (e.g. `brand-canon-mirror`) |
| `GDRIVE_OAUTH_CLIENT_ID` | B | OAuth client ID |
| `GDRIVE_OAUTH_CLIENT_SECRET` | B | OAuth client secret |
| `GDRIVE_OAUTH_REFRESH_TOKEN` | B | the user refresh token |

The workflow passes these through `env:` only; they are never printed. If `GOOGLE_SERVICE_ACCOUNT_JSON` is set
it wins (Route A, using `GDRIVE_FOLDER_ID`); otherwise the OAuth secrets are used (Route B, creating the
`GDRIVE_ROOT_FOLDER_NAME` root).

## Trigger + branch

The Action fires on **push to `main`** by default (the `on.push.branches` and `paths` filters in the workflow).
If your default branch is not `main`, edit that one line. To dry-run the plan locally without any credentials:

    node tools/drive-mirror.mjs --plan .      # prints the mirror plan + the excluded (Docs-Editors) files

The gate suite runs this same `--plan` on every `node tools/run-gates.mjs`, so a broken plan (a stale custody
hash, a Drive-path collision) is caught before it ever reaches CI.
