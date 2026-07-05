#!/usr/bin/env python3
"""fidelity-diff.py — the MEASURED reproduction-fidelity gate (MT-2).

WHAT THIS DOES (the mechanics, MT-2)
  Stage 10 §7a used to record a HUMAN/perceptual "looks-fine" verdict. This tool
  replaces it with a MEASURED one. Given a reproduced TREATMENT's two images — the
  Stage-5 SOURCE capture and the build's REPRODUCTION render — it:
    1. Co-registers  — ORB feature match + RANSAC homography aligns the reproduction
                       onto the source's frame (absorbing a small shift/scale), then
                       resamples both to the same pixel grid (same-DPI), 8-bit.
    2. Measures      — ΔE2000 (CIEDE2000, perceptual colour distance) per co-registered
                       pixel; SSIM (structure); a pixel mismatch-fraction (pixelmatch-style).
                       For TYPE treatments, optional fontTools per-glyph metrics (advance,
                       bbox, contour-point delta as a serif/stem proxy) vs the source font.
    3. Verdicts      — against the §2 layered tiers: within-tolerance |
                       outside-tolerance (→ the build degrades to a lower method or logs a
                       GAP-NNN). Loosening a tier RAISES the bound; it never removes a metric.
    4. Persists      — writes audit/fidelity/<treatment-id>/scores.json (the numeric metrics
                       + thresholds + verdict — auditable later WITHOUT re-running cv2) and a
                       diff.png heatmap. This scores.json IS the §7a "recorded verdict".

  IMPORTANT — this measures the reproduction against the STAGE-5 SOURCE CAPTURE. It is NOT a
  pixel-VRT against a reference render (none exists — see validate-audit.md §3a). The source
  capture is the ground truth; the reproduction is judged against it.

MEDIUM-AGNOSTIC (anti-determinism rector)
  A brand whose PRIMARY identity carrier is NON-VISUAL (sonic / motion / haptic / scent / …)
  has no raster/vector reproduction to measure. Run with `--medium non-visual`: the tool emits
  a DECLARED fidelity-blocking GAP for that carrier (a tracked horizon) and PASSES (exit 0) —
  never a false `outside-tolerance`. The non-visual path needs NO cv2/skimage (stdlib only), so
  a sonic/verbal brand's repo validates in a minimal environment.

VERDICT / EXIT (exit codes drive the pipeline; the RECORDED `pass` field is the measurement alone)
  within-tolerance ......................... exit 0 · pass:true
  non-visual carrier → declared GAP ........ exit 0 · pass:true, measured:false (tracked horizon, never a false fail)
  outside-tolerance + --gap GAP-NNN ........ exit 0 · pass:FALSE, gap recorded (tracked, logged — the
                                             measurement NEVER flips to a pass; a NON-WAIVABLE slot never
                                             rides this escape — the gate runner enforces it)
  outside-tolerance (degrade or GAP) ....... exit 1 · pass:false (the build must act; evidence persisted)
  missing dependency ....................... exit 3  (clear `pip install …`, never a stack trace)
  usage / missing input image .............. exit 2

USAGE
  python fidelity-diff.py --treatment <id> --source <src.png> --reproduction <render.png> \
      [--out audit/fidelity] [--tier zero|default|loose] [--core-color] \
      [--degraded-to <method>] [--gap GAP-NNN] \
      [--font <repro.ttf> --source-font <src.ttf> --glyphs AaGgQ0]
  python fidelity-diff.py --treatment <id> --medium non-visual --carrier sonic-mark --gap GAP-NNN

DEPENDENCIES (visual path only; import-guarded): numpy, opencv-python-headless (cv2),
  scikit-image, pillow; fontTools only when --font is given. The non-visual path uses stdlib only.
"""

import argparse
import json
import os
import sys


# ---- §2 layered-threshold policy (brand-agnostic; loosening RAISES the bound, never removes it) ----
# mismatch_fraction = fraction of co-registered pixels that are CLEARLY different (per-pixel ΔE2000 > MISMATCH_DE,
# a perceptual "obviously wrong" bound) — a pixelmatch-style GROSS-divergence count, NOT a tier-edge count. This
# keeps edge-localized JPEG ringing / sub-degree skew (ΔE 2–5 at hard edges) from tripping a faithful repro.
MISMATCH_DE = 10.0
# ΔE2000 (perceptual COLOUR distance) is the strict PRIMARY metric; SSIM (structure) + mismatch_fraction (gross
# divergence) are secondary corroborators, kept deliberately looser than ΔE so a faithful repro with a small
# legitimate geometric residual (a 2% re-DPI scale, a sub-degree skew, JPEG edge ringing the co-registration
# could not fully absorb) is NOT failed on structure alone while its colour is right.
TIERS = {
    "zero": {
        "deltaE2000_max": 1.0,
        "ssim_min": 0.95,
        "mismatch_max": 0.02,
    },  # primary-identity carrier + primary colours + NON-WAIVABLE
    "default": {"deltaE2000_max": 2.0, "ssim_min": 0.85, "mismatch_max": 0.05},
    "loose": {
        "deltaE2000_max": 5.0,
        "ssim_min": 0.75,
        "mismatch_max": 0.10,
    },  # gradients / illustration / incidental imagery
}
FLAT_STD = 4.0  # source grayscale std below which there is no structure → SSIM is N/A (gate on ΔE only)
GLYPH_ADVANCE_TOL = 0.02  # 2% advance-width drift
GLYPH_BBOX_TOL = 0.03  # 3% glyph bbox drift


def load_deps():
    """Import the visual-path deps with a single clear message (exit 3), never a stack trace."""
    missing = []
    mods = {}
    try:
        import numpy as np

        mods["np"] = np
    except ImportError:
        missing.append(("numpy", "numpy"))
    try:
        import cv2

        mods["cv2"] = cv2
    except ImportError:
        missing.append(("cv2", "opencv-python-headless"))
    try:
        from skimage import color as skcolor
        from skimage.metrics import structural_similarity

        mods["skcolor"] = skcolor
        mods["ssim"] = structural_similarity
    except ImportError:
        missing.append(("scikit-image", "scikit-image"))
    try:
        from PIL import Image

        mods["Image"] = Image
    except ImportError:
        missing.append(("Pillow", "pillow"))
    if missing:
        names = ", ".join(m[0] for m in missing)
        pips = " ".join(m[1] for m in missing)
        sys.stderr.write(
            f"fidelity-diff: missing dependency for the visual diff: {names}\n"
            f"  install: pip install {pips}\n"
            f"  (the non-visual path — `--medium non-visual` — needs none of these.)\n"
        )
        sys.exit(3)
    return mods


def load_image(Image, np, path):
    """Load any PIL-readable raster to an 8-bit RGB array. (SVG must be pre-rasterized to PNG.)"""
    if path.lower().endswith(".svg"):
        sys.stderr.write(
            f"fidelity-diff: {path} is SVG — rasterize it to PNG first "
            f"(the build renders the reproduction to a raster before measuring).\n"
        )
        sys.exit(2)
    if not os.path.isfile(path):
        sys.stderr.write(f"fidelity-diff: input image not found: {path}\n")
        sys.exit(2)
    return np.asarray(Image.open(path).convert("RGB"), dtype="uint8")


def _de_field(skcolor, source, aligned):
    return skcolor.deltaE_ciede2000(
        skcolor.rgb2lab(source.astype("float64") / 255.0),
        skcolor.rgb2lab(aligned.astype("float64") / 255.0),
    )


def _mean_de(skcolor, np, source, aligned, mask):
    de = _de_field(skcolor, source, aligned)
    v = de[mask] if mask.any() else de.reshape(-1)
    return float(np.mean(v)) if v.size else 1e9


def _sane_homography(cv2, np, H, w, h):
    """Reject a degenerate ORB homography (implausible area ratio / corners flung off-frame)."""
    try:
        corners = np.float32([[0, 0], [w, 0], [w, h], [0, h]]).reshape(-1, 1, 2)
        wc = cv2.perspectiveTransform(corners, H).reshape(-1, 2)

        def area(p):
            x, y = p[:, 0], p[:, 1]
            return 0.5 * abs(np.dot(x, np.roll(y, 1)) - np.dot(y, np.roll(x, 1)))

        a0, a1 = area(corners.reshape(-1, 2)), area(wc)
        if a1 <= 0 or not (0.4 <= a1 / a0 <= 2.5):
            return False
        if (
            wc.min() < -0.5 * max(w, h)
            or wc[:, 0].max() > 1.5 * w
            or wc[:, 1].max() > 1.5 * h
        ):
            return False
        return True
    except cv2.error:
        return False


def coregister(cv2, np, skcolor, source, repro):
    """Align repro onto source's frame, then KEEP THE BEST of {ORB+RANSAC, phase-correlation, resize-only}
    by mean ΔE — registration may NEVER do worse than the un-warped resize (a bad/degenerate warp is rejected,
    not applied blindly). Returns (aligned_repro, valid_mask, info)."""
    h, w = source.shape[:2]
    repro_rs = cv2.resize(
        repro, (w, h), interpolation=cv2.INTER_AREA
    )  # shared grid for every candidate
    gs = cv2.cvtColor(source, cv2.COLOR_RGB2GRAY)
    gr = cv2.cvtColor(repro_rs, cv2.COLOR_RGB2GRAY)

    candidates = [
        (repro_rs, np.ones((h, w), bool), {"method": "resize-only"})
    ]  # baseline to beat

    try:  # ORB + RANSAC homography
        orb = cv2.ORB_create(nfeatures=2000)
        k1, d1 = orb.detectAndCompute(gr, None)
        k2, d2 = orb.detectAndCompute(gs, None)
        if d1 is not None and d2 is not None and len(k1) >= 8 and len(k2) >= 8:
            bf = cv2.BFMatcher(cv2.NORM_HAMMING, crossCheck=True)
            matches = sorted(bf.match(d1, d2), key=lambda m: m.distance)
            good = matches[: max(8, len(matches) // 2)]
            if len(good) >= 8:
                sp = np.float32([k1[m.queryIdx].pt for m in good]).reshape(-1, 1, 2)
                dp = np.float32([k2[m.trainIdx].pt for m in good]).reshape(-1, 1, 2)
                H, inl = cv2.findHomography(sp, dp, cv2.RANSAC, 3.0)
                if (
                    H is not None
                    and inl is not None
                    and int(inl.sum()) >= 8
                    and _sane_homography(cv2, np, H, w, h)
                ):
                    a = cv2.warpPerspective(repro_rs, H, (w, h))
                    m = (
                        cv2.warpPerspective(np.full((h, w), 255, "uint8"), H, (w, h))
                        > 0
                    )
                    candidates.append(
                        (
                            a,
                            m,
                            {
                                "method": "orb+ransac",
                                "matches": len(good),
                                "inliers": int(inl.sum()),
                            },
                        )
                    )
    except cv2.error:
        pass

    try:  # phase correlation (translation) — reject the ~half-image garbage shift a flat image returns
        shift, _ = cv2.phaseCorrelate(np.float32(gs), np.float32(gr))
        dx, dy = float(shift[0]), float(shift[1])
        if abs(dx) <= 0.25 * w and abs(dy) <= 0.25 * h:
            M = np.float32([[1, 0, -dx], [0, 1, -dy]])
            a = cv2.warpAffine(repro_rs, M, (w, h))
            m = cv2.warpAffine(np.full((h, w), 255, "uint8"), M, (w, h)) > 0
            candidates.append(
                (
                    a,
                    m,
                    {
                        "method": "phase-correlation",
                        "shift": [round(dx, 2), round(dy, 2)],
                    },
                )
            )
    except cv2.error:
        pass

    scored = [(c, _mean_de(skcolor, np, source, c[0], c[1])) for c in candidates]
    (aligned, mask, info), best = min(scored, key=lambda x: x[1])
    info["score_deltaE"] = round(best, 4)
    info["candidates"] = {
        c[2]["method"]: round(s, 4) for c, s in scored
    }  # auditable: every alignment's score
    return aligned, mask, info


def measure(mods, source, repro):
    np, cv2, skcolor, ssim = mods["np"], mods["cv2"], mods["skcolor"], mods["ssim"]
    aligned, mask, reg = coregister(cv2, np, skcolor, source, repro)

    de = _de_field(skcolor, source, aligned)
    valid = de[mask] if mask.any() else de.reshape(-1)
    de_mean = float(np.mean(valid))
    de_p95 = float(np.percentile(valid, 95))
    mismatch = (
        float(np.mean((de > MISMATCH_DE)[mask]))
        if mask.any()
        else float(np.mean(de > MISMATCH_DE))
    )

    # SSIM (structure) on grayscale — N/A (not gated) when the source is (near-)flat: a structureless carrier's
    # fidelity is its colour (ΔE), and SSIM is mathematically degenerate on zero-variance fields.
    gs = cv2.cvtColor(source, cv2.COLOR_RGB2GRAY)
    ga = cv2.cvtColor(aligned, cv2.COLOR_RGB2GRAY)
    if min(gs.shape) >= 7:
        ssim_val = float(ssim(gs, ga, data_range=255))
        ssim_gated = bool(np.std(gs) >= FLAT_STD)
    else:
        ssim_val, ssim_gated = (
            1.0,
            False,
        )  # too small for a windowed structure metric → gate on ΔE only

    return (
        aligned,
        mask,
        reg,
        de,
        {
            "deltaE2000_mean": round(de_mean, 4),
            "deltaE2000_p95": round(de_p95, 4),
            "ssim": round(ssim_val, 4),
            "ssim_gated": ssim_gated,
            "mismatch_fraction": round(mismatch, 4),
        },
    )


def glyph_metrics(font_path, source_font_path, glyphs):
    """Optional fontTools per-glyph deltas: advance width, bbox, contour-point count
    (a serif/stem proxy). Returns (metrics_dict, ok) or exits 3 if fontTools is absent."""
    try:
        from fontTools.ttLib import TTFont
        from fontTools.pens.boundsPen import BoundsPen
        from fontTools.pens.recordingPen import RecordingPen
    except ImportError:
        sys.stderr.write(
            "fidelity-diff: --font given but fontTools is missing: pip install fonttools\n"
        )
        sys.exit(3)

    def load(p):
        f = TTFont(p)
        return (
            f,
            (f.getBestCmap() or {}),
            f["hmtx"],
            f.getGlyphSet(),
            f["head"].unitsPerEm,
        )  # None cmap (symbol font) → {} → no comparable glyphs, not a crash

    fr, cr, hr, gr, er = load(font_path)
    fs, cs, hs, gs, es = load(source_font_path)
    per = {}
    worst_adv = worst_bbox = 0.0
    for ch in glyphs:
        cp = ord(ch)
        if cp not in cr or cp not in cs:
            continue
        gnr, gns = cr[cp], cs[cp]
        adv_r = hr[gnr][0] / er
        adv_s = hs[gns][0] / es
        adv_d = abs(adv_r - adv_s) / max(adv_s, 1e-9)

        def bounds(glyphset, name, upm):
            bp = BoundsPen(glyphset)
            glyphset[name].draw(bp)
            if bp.bounds is None:
                return (0, 0, 0, 0)
            return tuple(v / upm for v in bp.bounds)

        def npoints(glyphset, name):
            rp = RecordingPen()
            glyphset[name].draw(rp)
            return sum(
                len(args[0]) if args and isinstance(args[0], (list, tuple)) else 1
                for op, args in rp.value
                if op in ("lineTo", "curveTo", "qCurveTo", "moveTo")
            )

        br, bs = bounds(gr, gnr, er), bounds(gs, gns, es)
        bbox_d = max(abs(a - b) for a, b in zip(br, bs)) if bs != (0, 0, 0, 0) else 0.0
        pts_r, pts_s = npoints(gr, gnr), npoints(gs, gns)
        per[ch] = {
            "advance_delta": round(adv_d, 4),
            "bbox_delta": round(bbox_d, 4),
            "points_repro": pts_r,
            "points_source": pts_s,
        }
        worst_adv = max(worst_adv, adv_d)
        worst_bbox = max(worst_bbox, bbox_d)
    ok = worst_adv <= GLYPH_ADVANCE_TOL and worst_bbox <= GLYPH_BBOX_TOL
    return {
        "per_glyph": per,
        "worst_advance_delta": round(worst_adv, 4),
        "worst_bbox_delta": round(worst_bbox, 4),
        "advance_tol": GLYPH_ADVANCE_TOL,
        "bbox_tol": GLYPH_BBOX_TOL,
        "pass": ok,
    }, ok


def write_evidence(
    out_dir, treatment, payload, diff_png=None, mods=None, de=None, mask=None
):
    d = os.path.join(out_dir, treatment)
    os.makedirs(d, exist_ok=True)
    if diff_png is not None and mods is not None and de is not None:
        np, cv2 = mods["np"], mods["cv2"]
        # per-pixel ΔE2000 heatmap (0..~10 ΔE → 0..255), border zeroed
        norm = np.clip(de / 10.0, 0, 1) * 255.0
        if mask is not None:
            norm = norm * mask
        heat = cv2.applyColorMap(norm.astype("uint8"), cv2.COLORMAP_INFERNO)
        cv2.imwrite(os.path.join(d, diff_png), heat)
    with open(os.path.join(d, "scores.json"), "w") as fh:
        json.dump(payload, fh, indent=2, ensure_ascii=False)
    return os.path.join(d, "scores.json")


def main():
    ap = argparse.ArgumentParser(
        description="Measured reproduction-fidelity gate (MT-2)."
    )
    ap.add_argument(
        "--treatment",
        required=True,
        help="treatment id (the audit/fidelity/<id>/ slot)",
    )
    ap.add_argument("--source", help="Stage-5 SOURCE capture (raster)")
    ap.add_argument("--reproduction", help="the build's REPRODUCTION render (raster)")
    ap.add_argument(
        "--out",
        default="audit/fidelity",
        help="evidence root (default: audit/fidelity)",
    )
    ap.add_argument(
        "--tier", choices=list(TIERS), default="default", help="§2 layered tier"
    )
    ap.add_argument(
        "--core-color",
        action="store_true",
        help="zero-tolerance core colour (ΔE2000 ≤ 1.0), even within a looser tier",
    )
    ap.add_argument("--medium", choices=["visual", "non-visual"], default="visual")
    ap.add_argument(
        "--carrier",
        default="primary-identity carrier",
        help="carrier name (for the GAP note)",
    )
    ap.add_argument(
        "--degraded-to",
        default=None,
        help="resolution annotation if degraded to a lower method",
    )
    ap.add_argument(
        "--gap", default=None, help="GAP-NNN this treatment is logged under, if any"
    )
    ap.add_argument(
        "--font", default=None, help="reproduction font (optional glyph metrics)"
    )
    ap.add_argument(
        "--source-font", default=None, help="source font for the glyph comparison"
    )
    ap.add_argument(
        "--glyphs", default="AaGgQ0", help="glyphs to compare (default AaGgQ0)"
    )
    args = ap.parse_args()

    # ---- MEDIUM-AGNOSTIC: non-visual carrier → declared GAP, PASS (stdlib only, no cv2 needed) ----
    if args.medium == "non-visual":
        gap = args.gap or "GAP-NNN"
        payload = {
            "tool": "fidelity-diff.py",
            "treatment": args.treatment,
            "medium": "non-visual",
            "carrier": args.carrier,
            "measured": False,
            "gap": gap,
            "verdict": f"non-visual carrier → declared fidelity GAP ({gap}) — tracked horizon",
            "resolution": "declared-GAP",
            "pass": True,
            "note": (
                "primary carrier is non-visual (no raster/vector reproduction to measure); "
                "this is a declared fidelity-blocking GAP per the carrier's role, never a false "
                "outside-tolerance. validate-audit.md §1/§2 + §7b own the build-level decision."
            ),
        }
        path = write_evidence(args.out, args.treatment, payload)
        print(
            f"fidelity-diff: {args.treatment} — non-visual carrier → declared GAP ({gap}); PASS → {path}"
        )
        sys.exit(0)

    if not args.source or not args.reproduction:
        sys.stderr.write(
            "fidelity-diff: --source and --reproduction are required for a visual diff "
            "(or use --medium non-visual).\n"
        )
        sys.exit(2)

    mods = load_deps()
    source = load_image(mods["Image"], mods["np"], args.source)
    repro = load_image(mods["Image"], mods["np"], args.reproduction)

    aligned, mask, reg, de, metrics = measure(mods, source, repro)

    tier = dict(TIERS[args.tier])
    if args.core_color:
        tier["deltaE2000_max"] = min(
            tier["deltaE2000_max"], TIERS["zero"]["deltaE2000_max"]
        )
    tier["core_color"] = bool(args.core_color)

    glyph = None
    glyph_ok = True
    if args.font:
        if not args.source_font:
            sys.stderr.write(
                "fidelity-diff: --font needs --source-font to compare against.\n"
            )
            sys.exit(2)
        glyph, glyph_ok = glyph_metrics(args.font, args.source_font, args.glyphs)

    within = (
        metrics["deltaE2000_mean"] <= tier["deltaE2000_max"]
        and (
            not metrics["ssim_gated"] or metrics["ssim"] >= tier["ssim_min"]
        )  # SSIM N/A on a flat carrier
        and metrics["mismatch_fraction"] <= tier["mismatch_max"]
        and glyph_ok
    )

    # `pass` records the MEASUREMENT and nothing else: outside-tolerance is pass:false even when a
    # tracked GAP is declared. A declared GAP is a legitimate, logged outcome (exit 0 — the pipeline may
    # continue; never a tool false-fail) but it can NEVER flip the measurement to a pass — "pass": true
    # over a failed measurement is the exact bookkeeping-over-truth escape this record exists to kill.
    # validate-audit.md §1/§2/§7b + the gate runner own the build-level decision (a NON-WAIVABLE slot
    # never rides the GAP escape).
    tracked = None
    if within:
        verdict, resolution, exit_ok = "within-tolerance", "within-tolerance", True
    else:
        verdict = "outside-tolerance"
        if args.gap:
            deg = f" degraded to {args.degraded_to};" if args.degraded_to else ""
            resolution = f"outside-tolerance →{deg} tracked under {args.gap}"
            tracked = args.gap
            exit_ok = True
        elif args.degraded_to:
            resolution = f"outside-tolerance → degraded to {args.degraded_to} (re-measure the degraded render)"
            exit_ok = False
        else:
            resolution = (
                "outside-tolerance → degrade to a lower method or log a GAP-NNN"
            )
            exit_ok = False

    payload = {
        "tool": "fidelity-diff.py",
        "treatment": args.treatment,
        "medium": "visual",
        "measured": True,
        "tier": args.tier,
        "registration": reg,
        "metrics": {
            k: metrics[k]
            for k in (
                "deltaE2000_mean",
                "deltaE2000_p95",
                "ssim",
                "ssim_gated",
                "mismatch_fraction",
            )
        },
        "glyph": glyph,
        "thresholds": tier,
        "verdict": verdict,
        "resolution": resolution,
        "pass": bool(within),
        "gap": tracked,
        "source": args.source,
        "reproduction": args.reproduction,
        "diffImage": "diff.png",
        "note": (
            "measured against the Stage-5 SOURCE capture — NOT a pixel-VRT against a reference "
            "render (none exists; see validate-audit.md §3a)."
        ),
    }
    path = write_evidence(
        args.out,
        args.treatment,
        payload,
        diff_png="diff.png",
        mods=mods,
        de=de,
        mask=mask,
    )

    msg = (
        f"fidelity-diff: {args.treatment} [{args.tier}{'/core' if args.core_color else ''}] "
        f"ΔE2000 mean={metrics['deltaE2000_mean']} (≤{tier['deltaE2000_max']}) "
        f"SSIM={metrics['ssim']} (≥{tier['ssim_min']}) "
        f"mismatch={metrics['mismatch_fraction']} → {verdict} [{resolution}]"
    )
    (print if exit_ok else lambda m: sys.stderr.write(m + "\n"))(msg + f" → {path}")
    sys.exit(0 if exit_ok else 1)


if __name__ == "__main__":
    main()
