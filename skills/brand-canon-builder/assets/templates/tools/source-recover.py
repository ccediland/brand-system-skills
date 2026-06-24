#!/usr/bin/env python3
"""source-recover.py — archived-source recovery for the MT-3 identity+date gate.

WHAT THIS DOES (the mechanics, MT-3)
  When a brand's live site is dead, blocked, or bot-walled, the build recovers the
  source-of-record from the Internet Archive (Wayback). Given a URL (+ optional date
  window) this script:
    1. CDX query   — lists every 200 capture, collapsed by digest.
    2. Raw fetch   — pulls each capture's *raw* bytes via the `id_` modifier
                     (web.archive.org/web/<ts>id_/<url>), with NO Wayback chrome/overlay.
    3. Disambiguate— flags 3xx redirects, registrar-parking / suspendedpage markers, and
                     digest discontinuities across the timeline; surfaces the page's own
                     self-ID signals (<title>, og:site_name, copyright owner) and its
                     self-reported "Last Published" / updated date.
    4. Hash + write— SHA-256s each fetched file and writes sources/MANIFEST.json with
                     {file, url, captureTs, digest, sha256, status, selfPublished, identitySignals}.

WHAT THIS DOES *NOT* DO (read this — it is the whole point of MT-3)
  IDENTITY VERIFICATION IS AN AGENT STEP, NOT THIS SCRIPT'S. This script only SURFACES
  signals and dates; it never decides "this is the right brand." The builder (Stage 3,
  `references/asset-acquisition.md` › Archived-source recovery) must:
    - read the surfaced identitySignals and confirm the capture is the intended brand
      (not a prior/later occupant of the domain — the CDX-occupant trap), and
    - reconcile `captureTs` against the page's self-reported `selfPublished` ("Last
      Published") date BEFORE any value harvested from this source is trusted.
  Only after that human/agent identity+date pass may a token derived here be recorded at
  `source: computed-css` (and never above `hypothesis` without owner ratification). If the
  pass fails or is ambiguous, the value is a GAP, not a guess. The hashes this script
  writes are what `audit-lint.mjs` (R3) later checks against `CHECKSUMS.txt`.

USAGE
  python source-recover.py <url> [--from YYYYMMDD] [--to YYYYMMDD] \
      [--out sources] [--max N] [--all] [--timeout 30]

  Default: recover the single most-recent 200 capture in range. `--all` recovers every
  digest-distinct capture; `--max N` caps it. Exit 0 on ≥1 recovered file, 2 if none.

DEPENDENCIES: requests (HTTP); stdlib hashlib/json/argparse/re/sys/datetime/urllib.
"""

import argparse
import hashlib
import json
import os
import re
import sys
from urllib.parse import urlparse, quote

try:
    import requests
except ImportError:
    sys.stderr.write("source-recover: needs `requests` (pip install requests)\n")
    sys.exit(3)

CDX = "https://web.archive.org/cdx/search/cdx"
WB = "https://web.archive.org/web/{ts}id_/{url}"

# Registrar-parking / suspended-domain markers — a capture matching these is very likely a
# DIFFERENT occupant of the domain, not the brand. Surfaced, not auto-trusted.
PARKING_MARKERS = [
    "suspendedpage.cgi", "domain is parked", "this domain is for sale",
    "this domain may be for sale", "buy this domain", "parkingcrew", "sedoparking",
    "hugedomains", "godaddy.com/domains", "the domain has expired", "parked free",
    "domainparking", "is parked free, courtesy of",
]


def cdx_query(url, dt_from, dt_to, timeout, cdx_limit):
    params = {
        "url": url,
        "output": "json",
        "filter": "statuscode:200",
        "collapse": "digest",
        "fl": "timestamp,original,digest,statuscode,mimetype",
    }
    if dt_from:
        params["from"] = dt_from
    if dt_to:
        params["to"] = dt_to
    if cdx_limit:
        # bound the response (negative = the last N captures), so a heavily-archived URL
        # returns a tractable, recent timeline instead of thousands of rows.
        params["limit"] = cdx_limit
    r = requests.get(CDX, params=params, timeout=timeout)
    r.raise_for_status()
    rows = r.json()
    if not rows:
        return []
    header, *data = rows
    return [dict(zip(header, row)) for row in data]


def digest_discontinuities(captures):
    """Boundaries where the content digest changes between consecutive captures — a
    discontinuity can mark an occupant change (or a real redesign). Surfaced for the agent."""
    out = []
    prev = None
    for c in captures:
        if prev is not None and c["digest"] != prev["digest"]:
            out.append({"from": prev["timestamp"], "to": c["timestamp"],
                        "fromDigest": prev["digest"], "toDigest": c["digest"]})
        prev = c
    return out


def extract_signals(body):
    """Surface the page's OWN identity + date claims. Never adjudicate them."""
    text = body if isinstance(body, str) else body.decode("utf-8", "replace")
    signals = []

    def grab(pattern, label, flags=re.I | re.S):
        m = re.search(pattern, text, flags)
        if m:
            val = re.sub(r"\s+", " ", m.group(1)).strip()[:200]
            if val:
                signals.append({"signal": label, "value": val})
            return val
        return None

    grab(r"<title[^>]*>(.*?)</title>", "title")
    grab(r'<meta[^>]+property=["\']og:site_name["\'][^>]+content=["\'](.*?)["\']', "og:site_name")
    grab(r'<meta[^>]+name=["\']application-name["\'][^>]+content=["\'](.*?)["\']', "application-name")
    grab(r'<meta[^>]+name=["\']generator["\'][^>]+content=["\'](.*?)["\']', "generator")
    grab(r"(?:©|&copy;|copyright)\s*([0-9]{4}[^<\n,.]{0,60})", "copyright")

    # self-reported publish/update date (Webflow writes "Last Published:" into the HTML head)
    self_pub = (grab(r"Last Published:\s*([^<\n]+)", "last-published")
                or grab(r"Last\s+Modified:\s*([^<\n]+)", "last-modified")
                or grab(r"Last\s+Updated:\s*([^<\n]+)", "last-updated"))

    parked = [m for m in PARKING_MARKERS if m in text.lower()]
    if parked:
        signals.append({"signal": "PARKING-MARKER", "value": ", ".join(parked)})

    return signals, self_pub, bool(parked)


def safe_name(url, ts):
    p = urlparse(url)
    stem = (p.netloc + p.path).strip("/").replace("/", "_") or "index"
    stem = re.sub(r"[^A-Za-z0-9._-]", "-", stem)[:120]
    ext = ".html"
    if "." in os.path.basename(p.path):
        ext = ""  # the path already carries an extension
    return f"{stem}—{ts}{ext}"  # em-dash before the capture timestamp


def recover(capture, out_dir, timeout):
    ts, original = capture["timestamp"], capture["original"]
    url = WB.format(ts=ts, url=original)
    # allow_redirects=False so an archived 3xx is FLAGGED, never silently followed off-brand
    r = requests.get(url, timeout=timeout, allow_redirects=False)
    status = r.status_code
    redirect_to = r.headers.get("Location") if 300 <= status < 400 else None
    body = r.content
    sha256 = hashlib.sha256(body).hexdigest()
    signals, self_pub, parked = extract_signals(body)

    fname = safe_name(original, ts)
    fpath = os.path.join(out_dir, fname)
    with open(fpath, "wb") as fh:
        fh.write(body)

    skip = []
    if redirect_to:
        skip.append(f"3xx→{redirect_to}")
    if parked:
        skip.append("parking-marker")

    return {
        "file": os.path.relpath(fpath),
        "url": original,
        "captureTs": ts,
        "digest": capture.get("digest"),
        "sha256": sha256,
        "status": status,
        "mimetype": capture.get("mimetype"),
        "selfPublished": self_pub,            # the page's OWN claim — reconcile vs captureTs (agent step)
        "identitySignals": signals,           # surfaced, NOT adjudicated
        "occupantFlags": skip,                # non-empty ⇒ likely wrong occupant; agent must disambiguate
        "trusted": False,                     # ALWAYS false here — trust is conferred by the Stage-3 agent pass
    }


def main():
    ap = argparse.ArgumentParser(description="Wayback archived-source recovery (MT-3 mechanics).")
    ap.add_argument("url")
    ap.add_argument("--from", dest="dt_from", default=None, help="YYYYMMDD lower bound")
    ap.add_argument("--to", dest="dt_to", default=None, help="YYYYMMDD upper bound")
    ap.add_argument("--out", default="sources", help="output dir (default: sources)")
    ap.add_argument("--max", type=int, default=1, help="max captures to recover (default 1)")
    ap.add_argument("--all", action="store_true", help="recover every digest-distinct capture")
    ap.add_argument("--timeout", type=int, default=30)
    ap.add_argument("--cdx-limit", type=int, default=-50,
                    help="bound CDX rows (negative = last N captures; default -50). 0 = unbounded")
    args = ap.parse_args()

    os.makedirs(args.out, exist_ok=True)

    try:
        captures = cdx_query(args.url, args.dt_from, args.dt_to, args.timeout, args.cdx_limit)
    except Exception as e:
        sys.stderr.write(f"source-recover: CDX query failed: {e}\n")
        sys.exit(2)

    if not captures:
        sys.stderr.write(f"source-recover: no 200 captures for {args.url} in range\n")
        sys.exit(2)

    discontinuities = digest_discontinuities(captures)
    captures.sort(key=lambda c: c["timestamp"])  # chronological
    selected = captures if args.all else captures[-args.max:]  # most-recent N

    entries = []
    for c in selected:
        try:
            entries.append(recover(c, args.out, args.timeout))
        except Exception as e:
            sys.stderr.write(f"source-recover: fetch failed for {c['timestamp']}: {e}\n")

    manifest = {
        "$note": ("IDENTITY VERIFICATION IS AN AGENT STEP. These entries are surfaced signals + "
                  "hashes; the builder (Stage 3) confirms brand identity and reconciles captureTs "
                  "vs selfPublished BEFORE any value is trusted. No entry is 'trusted' here."),
        "query": {"url": args.url, "from": args.dt_from, "to": args.dt_to},
        "capturesFound": len(captures),
        "digestDiscontinuities": discontinuities,   # occupant-change candidates — agent disambiguates
        "recovered": entries,
    }
    manifest_path = os.path.join(args.out, "MANIFEST.json")
    with open(manifest_path, "w") as fh:
        json.dump(manifest, fh, indent=2, ensure_ascii=False)

    print(f"source-recover: {len(captures)} capture(s) found, {len(entries)} recovered → {manifest_path}")
    for e in entries:
        flags = (" [" + ", ".join(e["occupantFlags"]) + "]") if e["occupantFlags"] else ""
        print(f"  {e['captureTs']}  {e['sha256'][:16]}…  {e['file']}{flags}")
    if discontinuities:
        print(f"  ⚠ {len(discontinuities)} digest discontinuity(ies) — verify occupant identity across the timeline")
    sys.exit(0 if entries else 2)


if __name__ == "__main__":
    main()
