# Design note — F5-01: Drive mirror (GitHub Action emitted to the brand repo)

> v6 F5-01. The optional Drive mirror: a GitHub Action + zero-dep engine emitted to a brand repo that uploads
> the brand's custodied assets to a Google shared drive on push, and verifies the round-trip by sha256Checksum
> on both sides. Encuadre corregido por el home base: `brand-system-skills` es PÚBLICO — el Action es una
> PLANTILLA parametrizada, cada usuario cablea su propio Drive; cuenta+folder = parámetros, jamás stop de build.

## DECIDIDOs del home base (no re-litigados)

1. **Creds → GitHub Secrets nativo** (no Infisical). El Action ya corre en GitHub; sus secrets son la capacidad
   nativa. Infisical = nota opcional. (Enmienda al plan 2026-07-04 que decía "creds vía Infisical" — mismo
   encuadre equivocado que trató el mirror como infra propia.)
2. **Auth default = service account + DRIVE COMPARTIDO.** Restricción VERIFICADA
   (developers.google.com/workspace/drive/api/guides/handle-errors): una SA no tiene cuota y no puede ser dueña
   de archivos → shared drive o OAuth-en-nombre-de-humano. "Comparto una carpeta de Mi unidad con la SA" está
   ROTO de fábrica (`storageQuotaExceeded`) — el doc lo NOMBRA con evidencia (la trampa obvia). Ruta B: OAuth
   refresh token (sin Workspace). Scope: Route A (SA) = `drive` (un folder pre-creado está fuera de `drive.file`
   → 404; SA dedicada acotada a sus shared drives); Route B (OAuth) = `drive.file` + root folder app-owned
   (`GDRIVE_ROOT_FOLDER_NAME`), publicado a producción (evita expiración de 7 días). [Ajuste post-verify.]
3. **Estructura de folders = espejo del ASSET-INDEX, no del árbol del repo** (el asset-index ya es el registro
   canónico; la columna Drive lo cierra: por-fila `Drive`, o `Kind` si `—`). Docs-Editors nativos EXCLUIDOS por
   nombre (sin `sha256Checksum` → inverificables, R-14).

## Forma del entregable

- **`tools/drive-mirror.mjs`** (zero-dep, Node ≥ 20 `fetch`+`crypto`). Tres modos:
  - `--plan` (OFFLINE, determinista): plan = filas del asset-index cuyo `Repo location` está hasheado en
    CHECKSUMS (custody = la señal "source-of-record verificable"). Recomputa el sha256 en disco y lo cruza con
    CHECKSUMS (custody stale = FAIL local). Deriva folder (columna Drive, o `Kind`). Detecta colisión de
    destino. Excluye Docs-Editors por nombre (logueado, jamás silencio).
  - `--verify <remote.json>` (OFFLINE): compara CHECKSUMS vs el mapa remoto — remoto AUSENTE = FAIL
    (empty-pass guard), MISMATCH = FAIL (stale). Ambos guardias son W-17.
  - live (default): auth (SA JWT firmado con `crypto`, o OAuth refresh) → ensure folders → upload sin
    conversión (MIME real, multipart/media, NUNCA `application/vnd.google-apps.*`, NUNCA convert) → re-fetch de
    cada `sha256Checksum` → verify (mismo logic que `--verify`) → report. Un `sha256Checksum` nulo (hubo
    conversión) = FAIL.
- **`.github/workflows/drive-mirror.yml`** — trigger `push` a la rama default SOLO (jamás `pull_request_target`
  ni fork PR: el vector de exfil clásico), `permissions: contents:read`, `concurrency` serializa, secrets solo
  vía `env:` (jamás echo). Path-filtered a sources/assets/canon/CHECKSUMS/asset-index.
- **`.github/DRIVE-MIRROR.md`** (emitido) + **`references/drive-mirror.md`** (método) — 2 rutas de auth, la
  restricción de Google con evidencia, secrets, folder ID, scope mínimo, qué hace / qué NO.
- **run-gates §3d "drive mirror plan"** — corre `--plan` OFFLINE cuando el workflow está emitido (N/A si no);
  atrapa custody stale / colisión / índice roto ANTES del CI. El round-trip vivo = gate del operador.
- **Columna Drive del asset-index** — E2-03 base additiva; ahora nombrada como el mapa del mirror (cero ruptura
  de consumidores). Surface `.github/** | operator`.

## Qué quedó PARAMETRIZADO vs FIJO

| Parametrizado (por usuario/repo) | Fijo (contrato del mirror) |
|---|---|
| Cuenta Google · shared drive · folder ID (secret) | El set a mirrorear = asset-index ∩ CHECKSUMS |
| Ruta de auth (SA vs OAuth) + secrets | No-conversión (MIME real, exclusión Docs-Editors por nombre) |
| Rama default (`on.push.branches`) | Verify sha256 en AMBOS lados, sin empty-pass ni stale |
| Estructura fina (columna Drive por fila) | Folder tree = espejo del asset-index (Kind por defecto) |
| — | One-way mirror, jamás sync (P-J-01) · postura de seguridad del YAML |

## Frentes de seguridad / integridad (verify adversarial pre-merge)

6 atacantes (uno por frente) + juez por hallazgo. Journal respaldado a
`/mnt/c/Users/USER/verify-forensics/wf_8ac6a2b4-ffa--f5-verify` ANTES de lanzar. Los 4 frentes de SEGURIDAD
salieron LIMPIOS; los 2 de corrección/integridad cazaron **4 bloqueantes, TODOS corregidos** y re-verificados
(re-verify `wf_731f444b-23e`).

| # | Frente | Hallazgo | Veredicto | Fix |
|---|---|---|---|---|
| — | conversión | ¿upload convierte a Docs-Editors? | **LIMPIO** | no-conversión: MIME real, exclusión por nombre, `sha256Checksum` nulo = FAIL — ya correcto |
| — | empty-verify | ¿verify pasa vacío? | **LIMPIO** | verify itera el set esperado; remoto ausente = FAIL — ya correcto |
| — | stale-binary | ¿copia stale sobrevive? | **LIMPIO** | recompute plan + re-upload-on-mismatch + re-fetch — ya correcto |
| — | secret-exfil | ¿fork/PR exfiltra el secret? ¿secret en logs? | **LIMPIO** | `push` a rama default SOLO (jamás `pull_request_target`); secrets solo `env:`, jamás echo; errores nunca logean el body |
| B1 | google-broken | `drive.file` NO puede escribir a un folder pre-creado → live 404 en 1ª corrida | **BLOCKER → cerrado** | Route A (SA) usa scope `drive` (SA dedicada acotada a sus shared drives); Route B (OAuth) crea + posee su root folder (`GDRIVE_ROOT_FOLDER_NAME`), drive.file-compatible |
| B2 | google-broken | OAuth Route B: refresh token expira a 7 días (Testing) | **BLOCKER → cerrado** | doc instruye publicar a producción (drive.file no-sensible → sin verificación); scope se mantiene no-sensible |
| B3 | plan-integrity | parser CHECKSUMS tira líneas binary-mode (`hash *path`) → mirror vacío silencioso | **BLOCKER → cerrado** | regex consume `\*?` antes del path (calca audit-lint); fixture `checksums-binary-stale` muerde |
| B4 | plan-integrity | `//` interno en columna Drive escapa colisión → 2 archivos, 1 path vivo, pérdida silenciosa | **BLOCKER → cerrado** | `canonFolder` canonicaliza igual que el resolver vivo; fixture `collision-double-slash` muerde |

**La regla §Reglas :21 (verify PRE-merge) volvió a pagarse sola:** F5 habría mergeado dead-on-arrival (404 en la
1ª corrida del default) + con un empty-pass silencioso en un gate BLOCKING. Cazado y cerrado antes del merge.

## Límite declarado

El upload vivo + el round-trip real de `sha256Checksum` necesitan creds reales de Drive — el gate del operador
(round-trip en vivo), jamás dep de build. El engine prueba integridad plan/verify OFFLINE; la autenticidad del
mirror vivo es el cableado del operador + el check sha256-ambos-lados del leg vivo. Checklist de cableado:
`f5-drive-mirror-wiring-checklist—2026-07-17.md`.
