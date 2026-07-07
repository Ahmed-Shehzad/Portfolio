#!/usr/bin/env python3
"""Generate the 3D portrait bust used by the Portrait3D component.

Pipeline (single photo -> sculpted, colored 3D bust):

1. RECONSTRUCT (offline, not part of this script): run the portrait photo
   through TripoSR (stabilityai/TripoSR, MIT), a single-image-to-3D model,
   to obtain a vertex-colored mesh `bust-raw.glb` plus the preprocessed
   `triposr-input.png` (foreground composited on neutral gray, masked with
   the depth map from src/assets/images/me-3d-depth.jpg).

2. POST-PROCESS (this script):
   - orient the mesh upright, face toward +Z
   - Taubin-smooth marching-cube ridges
   - align the input photo to the mesh's front view by maximizing
     silhouette IoU, then project the photo onto front-facing vertices so
     the face keeps the photo's true colors and detail
   - recolor TripoSR's hallucinated hair (white-ish) and background-gray
     halo with the real hair color
   - store colors linearized per the glTF COLOR_0 spec
   - decimate 50% with nearest-vertex color transfer
   - center, scale to a 1.15-unit height (matches the Portrait3D camera)

3. EXPORT to public/models/ as portrait-bust.glb (runtime),
   portrait-bust.gltf, and portrait-bust.obj (for DCC tools). The filename
   is versioned: /models/* is cached immutable for a year, so shape changes
   need a new name to reach returning visitors.

Usage:
  python3 scripts/generate-portrait-bust.py <bust-raw.glb> <triposr-input.png>

Requires: pip install trimesh pillow numpy scipy fast-simplification
"""

import sys
from pathlib import Path

import fast_simplification
import numpy as np
import trimesh
from PIL import Image
from scipy.ndimage import map_coordinates
from scipy.spatial import cKDTree

ROOT = Path(__file__).resolve().parent.parent
OUT_DIR = ROOT / "public/models"

# Must stay in sync with the Portrait3D component's camera framing.
BUST_HEIGHT = 1.15
HAIR_COLOR = np.array([0.09, 0.075, 0.07], dtype=np.float32)  # sRGB near-black


def srgb_to_linear(c: np.ndarray) -> np.ndarray:
    return np.where(c <= 0.04045, c / 12.92, ((c + 0.055) / 1.055) ** 2.4)


def load_mesh(path: str) -> trimesh.Trimesh:
    loaded = trimesh.load(path)
    return list(loaded.geometry.values())[0] if isinstance(loaded, trimesh.Scene) else loaded


def main(raw_glb: str, input_png: str) -> None:
    mesh = load_mesh(raw_glb)
    tripo_col = np.asarray(mesh.visual.vertex_colors, dtype=np.float32)[:, :3] / 255.0

    # TripoSR outputs with "up" along +X; roll upright, face stays +Z.
    mesh.apply_transform(trimesh.transformations.rotation_matrix(np.pi / 2, [0, 0, 1]))
    trimesh.smoothing.filter_taubin(mesh, lamb=0.5, nu=-0.53, iterations=8)

    v = np.asarray(mesh.vertices)
    n = np.asarray(mesh.vertex_normals)
    inp = np.asarray(Image.open(input_png).convert("RGB"), dtype=np.float32) / 255.0
    H, W = inp.shape[:2]

    # Foreground bbox of the input image (everything that isn't the gray bg).
    fg_in = ~np.all(np.abs(inp - 0.5) < 0.02, axis=-1)
    ys, xs = np.where(fg_in)
    x0, x1, y0, y1 = xs.min(), xs.max(), ys.min(), ys.max()

    mx0, mx1 = v[:, 0].min(), v[:, 0].max()
    my0, my1 = v[:, 1].min(), v[:, 1].max()

    def project(scale, dx, dy):
        u = ((v[:, 0] - mx0) / (mx1 - mx0) - 0.5) * scale + 0.5 + dx
        t = ((my1 - v[:, 1]) / (my1 - my0) - 0.5) * scale + 0.5 + dy
        px = np.clip(u * (x1 - x0) + x0, 0, W - 1)
        py = np.clip(t * (y1 - y0) + y0, 0, H - 1)
        return px, py

    def sample(px, py, idx=None):
        if idx is not None:
            px, py = px[idx], py[idx]
        return np.stack(
            [map_coordinates(inp[:, :, c], [py, px], order=1, mode="nearest") for c in range(3)],
            axis=-1,
        )

    frontal = n[:, 2] > 0.55
    sub = np.where(frontal)[0]
    if len(sub) > 9000:
        sub = sub[:: len(sub) // 9000]

    # Align by silhouette IoU: frontal vertices should land on (and cover) the
    # photo's foreground. Color matching is unreliable (gray-on-gray degenerates).
    GRID = 96
    fg_small = np.zeros((GRID, GRID), dtype=bool)
    fy, fx = np.where(fg_in)
    fg_small[(fy * GRID // H), (fx * GRID // W)] = True

    def iou(scale, dx, dy):
        px, py = project(scale, dx, dy)
        gx = np.clip((px[sub] * GRID / W).astype(int), 0, GRID - 1)
        gy = np.clip((py[sub] * GRID / H).astype(int), 0, GRID - 1)
        mesh_small = np.zeros((GRID, GRID), dtype=bool)
        mesh_small[gy, gx] = True
        return (mesh_small & fg_small).sum() / (mesh_small | fg_small).sum()

    def search(scales, dxs, dys):
        best = (-1.0, 1.0, 0.0, 0.0)
        for scale in scales:
            for dx in dxs:
                for dy in dys:
                    score = iou(scale, dx, dy)
                    if score > best[0]:
                        best = (score, scale, dx, dy)
        return best

    score, scale, dx, dy = search(
        np.linspace(0.85, 1.3, 10), np.linspace(-0.15, 0.15, 9), np.linspace(-0.18, 0.18, 11)
    )
    score, scale, dx, dy = search(
        np.linspace(scale - 0.06, scale + 0.06, 7),
        np.linspace(dx - 0.04, dx + 0.04, 7),
        np.linspace(dy - 0.04, dy + 0.04, 7),
    )
    print(f"alignment: scale={scale:.3f} dx={dx:.3f} dy={dy:.3f} (IoU {score:.3f})")

    px, py = project(scale, dx, dy)
    proj = sample(px, py)

    # Blend the projected photo over TripoSR colors by how much each vertex
    # faces the camera.
    w_front = np.clip(n[:, 2], 0.0, 1.0) ** 0.8

    neck_y = my0 + (my1 - my0) * 0.62
    head = v[:, 1] > neck_y
    bright = tripo_col.mean(axis=1) > 0.32
    lateral = n[:, 2] < 0.6
    base = tripo_col.copy()
    base[head & (bright | lateral)] = HAIR_COLOR

    # Head-zone vertices whose projected sample is the gray studio background
    # are hallucinated hair silhouette outside the real hair — color as hair.
    halo = head & np.all(np.abs(proj - 0.5) < 0.04, axis=-1)
    proj[halo] = HAIR_COLOR
    w_front[halo] = 1.0

    final_srgb = w_front[:, None] * proj + (1.0 - w_front[:, None]) * base
    final_linear = srgb_to_linear(np.clip(final_srgb, 0, 1))
    rgba = np.concatenate(
        [final_linear * 255.0, np.full((len(v), 1), 255.0)], axis=1
    ).astype(np.uint8)

    # Decimate 50% and transfer colors from the nearest original vertex.
    pts, faces = fast_simplification.simplify(
        np.asarray(mesh.vertices, dtype=np.float32),
        np.asarray(mesh.faces, dtype=np.int64),
        target_reduction=0.5,
    )
    _, idx = cKDTree(mesh.vertices).query(pts)
    bust = trimesh.Trimesh(vertices=pts, faces=faces, process=False)
    bust.visual = trimesh.visual.ColorVisuals(mesh=bust, vertex_colors=rgba[idx])

    bv = np.asarray(bust.vertices)
    bust.apply_translation(-(bv.min(axis=0) + bv.max(axis=0)) / 2)
    bust.apply_scale(BUST_HEIGHT / (bv[:, 1].max() - bv[:, 1].min()))
    print(f"bust: {len(bust.vertices)} vertices, {len(bust.faces)} faces")

    OUT_DIR.mkdir(parents=True, exist_ok=True)
    scene = trimesh.Scene({"bust": bust})
    scene.export(OUT_DIR / "portrait-bust.glb")
    gltf_files = trimesh.exchange.gltf.export_gltf(scene, embed_buffers=True)
    for name, data in gltf_files.items():
        (OUT_DIR / ("portrait-bust.gltf" if name.endswith(".gltf") else name)).write_bytes(data)
    scene.export(OUT_DIR / "portrait-bust.obj")
    for f in sorted(OUT_DIR.iterdir()):
        print(f"  {f.name}: {f.stat().st_size / 1024:.0f} KiB")


if __name__ == "__main__":
    if len(sys.argv) != 3:
        sys.exit(__doc__)
    main(sys.argv[1], sys.argv[2])
