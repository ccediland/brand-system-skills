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
token — the files are owned by that user's own (quota-bearing) *My Drive*.
1. Cloud Console → *APIs & Services* → *OAuth consent screen* (External, add yourself as a test user) →
   *Credentials* → **Create OAuth client ID** (type: *Desktop app*). Note the **client ID** and **client secret**.
2. Obtain a **refresh token** for scope `https://www.googleapis.com/auth/drive.file` (e.g. via the OAuth 2.0
   Playground with "Use your own OAuth credentials", or a one-off local script). Store the `refresh_token`.
3. The `GDRIVE_FOLDER_ID` is a folder in your own Drive (URL as above).
4. Leave `GOOGLE_SERVICE_ACCOUNT_JSON` **unset** so the mirror uses the OAuth route.

## Minimal scope

`https://www.googleapis.com/auth/drive.file` — the app sees only the files **it created**. That is exactly the
mirror it owns; it never reads the rest of your Drive. Least privilege, and enough for idempotent updates of
the mirror's own files. (The broader `drive` scope is **not** needed.)

## Secrets (repo → Settings → Secrets and variables → Actions)

| Secret | Route | Value |
|---|---|---|
| `GDRIVE_FOLDER_ID` | both | the destination folder's ID (last URL segment) |
| `GOOGLE_SERVICE_ACCOUNT_JSON` | A | the **entire** service-account key JSON, pasted verbatim |
| `GDRIVE_OAUTH_CLIENT_ID` | B | OAuth client ID |
| `GDRIVE_OAUTH_CLIENT_SECRET` | B | OAuth client secret |
| `GDRIVE_OAUTH_REFRESH_TOKEN` | B | the user refresh token |

The workflow passes these through `env:` only; they are never printed. If `GOOGLE_SERVICE_ACCOUNT_JSON` is set
it wins (Route A); otherwise the three OAuth secrets are used (Route B).

## Trigger + branch

The Action fires on **push to `main`** by default (the `on.push.branches` and `paths` filters in the workflow).
If your default branch is not `main`, edit that one line. To dry-run the plan locally without any credentials:

    node tools/drive-mirror.mjs --plan .      # prints the mirror plan + the excluded (Docs-Editors) files

The gate suite runs this same `--plan` on every `node tools/run-gates.mjs`, so a broken plan (a stale custody
hash, a Drive-path collision) is caught before it ever reaches CI.
