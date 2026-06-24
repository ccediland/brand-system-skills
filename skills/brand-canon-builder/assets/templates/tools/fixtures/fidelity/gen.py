#!/usr/bin/env python3
"""Generate the SYNTHETIC, brand-agnostic fidelity fixtures for fidelity-diff.py.

Pure generic geometry + colours — NO real brand mark, name, or palette. Run:
    python gen.py
Writes (next to this file):
  source.png        — the "Stage-5 source capture" stand-in (shapes with edges for ORB).
  within.png        — source + a tiny colour nudge → ΔE2000 well under the default 2.0 bound.
  within_shift.png  — source translated a few px → co-registration must absorb it (exploit case c).
  mid.png           — uniform Lab shift → ΔE2000 ≈ 3.5: OUTSIDE the default tier, WITHIN loose (case d).
  out.png           — source with a clearly different fill → ΔE2000 over every tier.

Deps: pillow, numpy, scikit-image (the same install fidelity-diff.py's visual path needs).
"""
import os
import numpy as np
from PIL import Image, ImageDraw
from skimage import color as skcolor

HERE = os.path.dirname(os.path.abspath(__file__))
W = H = 256


def base(rect_fill, circle_fill, bg=(238, 238, 238)):
    img = Image.new("RGB", (W, H), bg)
    d = ImageDraw.Draw(img)
    d.rounded_rectangle([40, 40, 160, 160], radius=24, fill=rect_fill)       # primary shape (edges/corners for ORB)
    d.ellipse([120, 120, 216, 216], fill=circle_fill)                        # secondary shape
    d.line([20, 230, 236, 200], fill=(60, 60, 60), width=4)                  # a diagonal for extra features
    d.line([20, 30, 110, 18], fill=(90, 90, 90), width=3)
    return img


def main():
    src = base((52, 96, 168), (210, 150, 60))                                # generic blue + amber
    src.save(os.path.join(HERE, "source.png"))

    base((54, 98, 170), (211, 151, 61)).save(os.path.join(HERE, "within.png"))     # +~2 per channel → tiny ΔE
    src.transform((W, H), Image.AFFINE, (1, 0, -3, 0, 1, -2)).save(             # 3px,2px translation
        os.path.join(HERE, "within_shift.png"))

    # mid: a UNIFORM Lab shift of the source (every pixel ≈ ΔE2000 3.5, none over 5) — outside default,
    # within loose. This is the honest "looser tier raises the bound" fixture (case d).
    lab = skcolor.rgb2lab(np.asarray(src, dtype="float64") / 255.0)
    lab[..., 0] += 2.5; lab[..., 1] += 2.0; lab[..., 2] += 2.0
    mid = (np.clip(skcolor.lab2rgb(lab), 0, 1) * 255).astype("uint8")
    Image.fromarray(mid).save(os.path.join(HERE, "mid.png"))

    base((150, 70, 70), (210, 150, 60)).save(os.path.join(HERE, "out.png"))        # rect → red → large ΔE

    print("wrote source.png within.png within_shift.png mid.png out.png")


if __name__ == "__main__":
    main()
