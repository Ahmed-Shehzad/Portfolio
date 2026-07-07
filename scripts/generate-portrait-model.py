#!/usr/bin/env python3
"""Generate the 3D portrait model used by the Portrait3D component.

Builds a solid, 360°-viewable portrait medallion:

- Front: a depth-displaced circular relief baked from the portrait photo and
  its depth map (src/assets/images/me-3d.jpg / me-3d-depth.jpg — the depth map
  was produced with the Depth Anything V2 monocular depth-estimation model).
- Casing: a dark cylindrical backing with a rim and back face, so the model
  reads as a physical medallion from every angle instead of a hollow shell.

Exports to public/models/ as:

- portrait-medallion.glb   (binary glTF — loaded at runtime by Portrait3D)
- portrait-medallion.gltf  (JSON glTF with embedded buffers, for tooling)
- portrait-medallion.obj   (+ .mtl and texture, for DCC tools like Blender)

The filename is versioned: /models/* is cached immutable for a year, so
shape changes need a new name to reach returning visitors.

Usage: python3 scripts/generate-portrait-model.py

Requires: pip install trimesh pillow numpy
"""

from io import BytesIO
from pathlib import Path

import numpy as np
import trimesh
from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parent.parent
PHOTO = ROOT / "src/assets/images/me-3d.jpg"
DEPTH = ROOT / "src/assets/images/me-3d-depth.jpg"
OUT_DIR = ROOT / "public/models"

# Must stay in sync with the Portrait3D component's camera framing.
PLANE_SIZE = 1.3
DEPTH_SCALE = 0.42
GRID = 161  # vertices per side
TEXTURE_SIZE = 1024

# Casing dimensions, derived from the relief's depth range ±DEPTH_SCALE/2.
CASING_RADIUS = (PLANE_SIZE / 2) * 1.06
CASING_FRONT_Z = -0.16  # just behind the relief's lowest (background) surface
CASING_THICKNESS = 0.14

# Antique bronze palette for the casing texture.
BRONZE_BASE = (125, 94, 51)
BRONZE_LIGHT = (196, 156, 99)
BRONZE_DARK = (74, 53, 26)


def build_relief() -> trimesh.Trimesh:
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
    faces = np.concatenate([np.stack([tl, bl, tr], axis=-1), np.stack([tr, bl, br], axis=-1)])

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


def _circular_text(draw, text: str, center: float, radius: float, font, fill) -> None:
    """Draw text along the top arc of a circle, centered at 12 o'clock."""
    from PIL import Image

    step = 2 * np.pi / max(len(text), 1) * 0.37  # angular spacing per character
    start = -step * (len(text) - 1) / 2
    for i, ch in enumerate(text):
        angle = start + i * step  # 0 = top, positive clockwise
        glyph = Image.new("RGBA", (96, 96), (0, 0, 0, 0))
        gdraw = ImageDraw.Draw(glyph)
        gdraw.text((48, 48), ch, font=font, fill=fill, anchor="mm")
        rotated = glyph.rotate(-np.degrees(angle), resample=Image.BICUBIC)
        x = center + radius * np.sin(angle)
        y = center - radius * np.cos(angle)
        draw._image.paste(rotated, (int(x) - 48, int(y) - 48), rotated)


def build_back_texture() -> Image.Image:
    """Engraved coin-style back: reeded rim, circumferential name, monogram."""
    size = 1024
    c = size / 2
    tex = Image.new("RGB", (size, size), BRONZE_BASE)
    draw = ImageDraw.Draw(tex)

    # Radial shading: brighter center fading to darker edge.
    yy, xx = np.mgrid[0:size, 0:size]
    r = np.sqrt((xx - c) ** 2 + (yy - c) ** 2) / c
    t = np.clip(r, 0, 1) ** 1.6
    base = np.array(BRONZE_BASE, dtype=np.float32)
    light = np.array(BRONZE_LIGHT, dtype=np.float32)
    dark = np.array(BRONZE_DARK, dtype=np.float32)
    shaded = light * (1 - t)[..., None] * 0.35 + base * 0.75 + dark * t[..., None] * 0.25
    tex = Image.fromarray(np.clip(shaded, 0, 255).astype(np.uint8))
    draw = ImageDraw.Draw(tex)

    # Reeded rim: fine radial ticks like a coin edge.
    for k in range(240):
        a = 2 * np.pi * k / 240
        x1, y1 = c + 0.945 * c * np.sin(a), c - 0.945 * c * np.cos(a)
        x2, y2 = c + 0.995 * c * np.sin(a), c - 0.995 * c * np.cos(a)
        shade = BRONZE_DARK if k % 2 else BRONZE_LIGHT
        draw.line([(x1, y1), (x2, y2)], fill=shade, width=3)

    # Rule circles framing the text band.
    for radius, width, shade in [
        (0.93, 4, BRONZE_DARK),
        (0.70, 3, BRONZE_DARK),
        (0.68, 2, BRONZE_LIGHT),
    ]:
        bb = [c - radius * c, c - radius * c, c + radius * c, c + radius * c]
        draw.ellipse(bb, outline=shade, width=width)

    try:
        font_text = ImageFont.truetype(
            "/usr/share/fonts/truetype/dejavu/DejaVuSerif-Bold.ttf", 58
        )
        font_mono = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSerif-Bold.ttf", 260)
    except OSError:
        font_text = ImageFont.load_default()
        font_mono = ImageFont.load_default()

    draw._image = tex
    _circular_text(draw, "MUHAMMAD AHMED SHEHZAD", c, 0.815 * c, font_text, BRONZE_DARK)

    # Engraved monogram: dark glyph with a light catch-light offset.
    draw.text((c + 4, c + 6), "MAS", font=font_mono, fill=tuple(int(v * 0.7) for v in BRONZE_DARK), anchor="mm")
    draw.text((c - 2, c - 3), "MAS", font=font_mono, fill=BRONZE_LIGHT, anchor="mm")
    draw.text((c, c), "MAS", font=font_mono, fill=BRONZE_DARK, anchor="mm")

    # Plain-bronze corner patch sampled by the wall and front-ring UVs.
    draw.rectangle([0, 0, 28, 28], fill=BRONZE_BASE)

    buf = BytesIO()
    tex.save(buf, format="JPEG", quality=90)
    buf.seek(0)
    return Image.open(buf)


def build_casing() -> trimesh.Trimesh:
    # Built by hand instead of trimesh.creation.cylinder: its caps are fans of
    # 160 sliver triangles from the center, which degrade on some rasterizers.
    # Concentric rings keep every triangle well-shaped.
    sections = 160
    rings = 6
    z_front = CASING_FRONT_Z
    z_back = CASING_FRONT_Z - CASING_THICKNESS
    theta = np.linspace(0.0, 2.0 * np.pi, sections, endpoint=False)
    cos_t, sin_t = np.cos(theta), np.sin(theta)

    # UV of the plain-bronze corner patch (OpenGL convention, bottom-left
    # origin) used by every surface except the engraved back cap.
    plain_uv = [0.014, 0.986]

    vertices: list[list[float]] = []
    uv: list[list[float]] = []
    faces: list[list[int]] = []

    def back_uv(x: float, y: float) -> list[float]:
        # Readable when viewed from behind (-Z): world +x maps to texture left.
        return [0.5 - x / (2 * CASING_RADIUS), 0.5 + y / (2 * CASING_RADIUS)]

    def add_cap(z: float, facing_forward: bool) -> None:
        base = len(vertices)
        vertices.append([0.0, 0.0, z])
        uv.append(plain_uv if facing_forward else back_uv(0.0, 0.0))
        for k in range(1, rings + 1):
            r = CASING_RADIUS * k / rings
            for c, s in zip(cos_t, sin_t):
                vertices.append([r * c, r * s, z])
                uv.append(plain_uv if facing_forward else back_uv(r * c, r * s))

        def ring_start(k: int) -> int:
            return base + 1 + (k - 1) * sections

        first = ring_start(1)
        for i in range(sections):
            a, b = first + i, first + (i + 1) % sections
            faces.append([base, a, b] if facing_forward else [base, b, a])
        for k in range(1, rings):
            inner, outer = ring_start(k), ring_start(k + 1)
            for i in range(sections):
                a, b = inner + i, inner + (i + 1) % sections
                c, d = outer + i, outer + (i + 1) % sections
                if facing_forward:
                    faces.extend([[a, c, d], [a, d, b]])
                else:
                    faces.extend([[a, d, c], [a, b, d]])

    add_cap(z_front, facing_forward=True)
    add_cap(z_back, facing_forward=False)

    # Side wall with its own vertices so the rim edge stays sharp.
    wall_front = len(vertices)
    for c, s in zip(cos_t, sin_t):
        vertices.append([CASING_RADIUS * c, CASING_RADIUS * s, z_front])
        uv.append(plain_uv)
    wall_back = len(vertices)
    for c, s in zip(cos_t, sin_t):
        vertices.append([CASING_RADIUS * c, CASING_RADIUS * s, z_back])
        uv.append(plain_uv)
    for i in range(sections):
        a, b = wall_front + i, wall_front + (i + 1) % sections
        c, d = wall_back + i, wall_back + (i + 1) % sections
        faces.extend([[a, c, d], [a, d, b]])

    material = trimesh.visual.material.PBRMaterial(
        name="casing",
        baseColorTexture=build_back_texture(),
        metallicFactor=0.9,
        roughnessFactor=0.45,
    )
    casing = trimesh.Trimesh(
        vertices=np.array(vertices, dtype=np.float64),
        faces=np.array(faces, dtype=np.int64),
        visual=trimesh.visual.TextureVisuals(uv=np.array(uv, dtype=np.float64), material=material),
        process=False,
    )
    return casing


def main() -> None:
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    relief = build_relief()
    casing = build_casing()
    scene = trimesh.Scene({"relief": relief, "casing": casing})
    vertices = len(relief.vertices) + len(casing.vertices)
    faces = len(relief.faces) + len(casing.faces)
    print(f"model: {vertices} vertices, {faces} faces")

    scene.export(OUT_DIR / "portrait-medallion.glb")

    gltf_files = trimesh.exchange.gltf.export_gltf(scene, embed_buffers=True)
    for name, data in gltf_files.items():
        out = OUT_DIR / ("portrait-medallion.gltf" if name.endswith(".gltf") else name)
        out.write_bytes(data)

    scene.export(OUT_DIR / "portrait-medallion.obj")

    for f in sorted(OUT_DIR.iterdir()):
        print(f"  {f.name}: {f.stat().st_size / 1024:.0f} KiB")


if __name__ == "__main__":
    main()
