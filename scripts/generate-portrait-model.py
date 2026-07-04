#!/usr/bin/env python3
"""Generate the 3D portrait model used by the Portrait3D component.

Builds a depth-displaced, circular relief mesh from the portrait photo and its
depth map (src/assets/images/me-3d.jpg / me-3d-depth.jpg — the depth map was
produced with the Depth Anything V2 monocular depth-estimation model), then
exports it to public/models/ as:

- portrait.glb   (binary glTF — loaded at runtime by Portrait3D)
- portrait.gltf  (JSON glTF with embedded buffers, for tooling that prefers it)
- portrait.obj   (+ .mtl and texture, for DCC tools like Blender)

Usage: python3 scripts/generate-portrait-model.py

Requires: pip install trimesh pillow numpy
"""

from io import BytesIO
from pathlib import Path

import numpy as np
import trimesh
from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
PHOTO = ROOT / "src/assets/images/me-3d.jpg"
DEPTH = ROOT / "src/assets/images/me-3d-depth.jpg"
OUT_DIR = ROOT / "public/models"

# Must stay in sync with the Portrait3D component's camera framing.
PLANE_SIZE = 1.3
DEPTH_SCALE = 0.42
GRID = 161  # vertices per side
TEXTURE_SIZE = 1024


def build_mesh() -> trimesh.Trimesh:
    depth_img = Image.open(DEPTH).convert("L")
    depth = np.asarray(depth_img.resize((GRID, GRID), Image.BICUBIC), dtype=np.float32) / 255.0

    # Regular grid in the XY plane, displaced along Z by the depth map.
    # Row 0 of the image is the top of the portrait (+Y in glTF's Y-up space).
    idx = np.arange(GRID, dtype=np.float32) / (GRID - 1)
    u, v_img = np.meshgrid(idx, idx)  # v_img: 0 at top row
    x = (u - 0.5) * PLANE_SIZE
    y = (0.5 - v_img) * PLANE_SIZE
    z = (depth - 0.5) * DEPTH_SCALE
    vertices = np.stack([x, y, z], axis=-1).reshape(-1, 3)

    # trimesh uses OpenGL-style UVs (origin bottom-left) and converts on export.
    uv = np.stack([u, 1.0 - v_img], axis=-1).reshape(-1, 2)

    # Two triangles per grid cell.
    row = np.arange(GRID - 1)
    j, i = np.meshgrid(row, row)  # i: row (top→bottom), j: column
    tl = (i * GRID + j).ravel()
    tr = tl + 1
    bl = tl + GRID
    br = bl + 1
    faces = np.concatenate(
        [np.stack([tl, bl, tr], axis=-1), np.stack([tr, bl, br], axis=-1)]
    )

    # Keep only faces fully inside the circular avatar silhouette.
    uv_dist = np.linalg.norm(uv - 0.5, axis=1)
    inside = uv_dist <= 0.5
    faces = faces[inside[faces].all(axis=1)]

    photo = Image.open(PHOTO).convert("RGB").resize((TEXTURE_SIZE, TEXTURE_SIZE), Image.LANCZOS)
    # Round-trip through JPEG so exporters embed the texture as JPEG, not PNG.
    buf = BytesIO()
    photo.save(buf, format="JPEG", quality=88)
    buf.seek(0)
    photo = Image.open(buf)
    material = trimesh.visual.material.PBRMaterial(
        name="portrait",
        baseColorTexture=photo,
        metallicFactor=0.0,
        roughnessFactor=1.0,
    )
    visual = trimesh.visual.TextureVisuals(uv=uv, material=material)

    mesh = trimesh.Trimesh(vertices=vertices, faces=faces, visual=visual, process=False)
    mesh.remove_unreferenced_vertices()
    return mesh


def main() -> None:
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    mesh = build_mesh()
    print(f"mesh: {len(mesh.vertices)} vertices, {len(mesh.faces)} faces")

    mesh.export(OUT_DIR / "portrait.glb")

    gltf_files = trimesh.exchange.gltf.export_gltf(mesh, embed_buffers=True)
    for name, data in gltf_files.items():
        out = OUT_DIR / ("portrait.gltf" if name.endswith(".gltf") else name)
        out.write_bytes(data)

    mesh.export(OUT_DIR / "portrait.obj")

    for f in sorted(OUT_DIR.iterdir()):
        print(f"  {f.name}: {f.stat().st_size / 1024:.0f} KiB")


if __name__ == "__main__":
    main()
