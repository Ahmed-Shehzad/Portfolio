"use client";

import PortraitPhoto from "@/assets/images/me-3d.jpg";
import Image from "next/image";
import { memo, useEffect, useRef, useState } from "react";
import type { Mesh, MeshStandardMaterial } from "three";

/**
 * Portrait3D
 *
 * Renders the portrait as an interactive 3D model loaded from a glTF binary
 * (public/models/portrait.glb). The model is a solid medallion — a circular
 * relief baked from the portrait photo and a depth map, mounted in a dark
 * cylindrical casing — so it stays believable from every angle. See
 * scripts/generate-portrait-model.py, which also exports .gltf and .obj
 * variants of the same model.
 *
 * Interaction:
 * - Drag (mouse or touch) spins the medallion a full 360° with momentum.
 * - When idle, it eases back to face the visitor, tilting gently toward the
 *   pointer with a subtle sway.
 *
 * Progressive enhancement:
 * - A regular optimized <Image> renders first (SSR-safe, priority-loadable).
 * - Three.js and the model are loaded lazily on the client; the WebGL canvas
 *   fades in on top only when the model is ready.
 * - Falls back to the static image when WebGL is unavailable. With reduced
 *   motion the idle sway and pointer tilt are disabled but drag still works.
 */

const MODEL_URL = "/models/portrait.glb";

/** Maximum tilt (radians) applied when the pointer reaches a viewport edge. */
const MAX_TILT = 0.3;
/** Pitch limit (radians) while dragging, to keep the pose readable. */
const MAX_PITCH = 0.7;
/** Idle time after a drag before the medallion eases back to face front. */
const RETURN_DELAY_MS = 2200;
const TWO_PI = Math.PI * 2;

interface Portrait3DProps {
  alt: string;
  width?: number;
  height?: number;
  className?: string;
}

export const Portrait3D = memo(
  ({ alt, width = 150, height = 150, className = "" }: Portrait3DProps) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [webglActive, setWebglActive] = useState(false);

    useEffect(() => {
      const container = containerRef.current;
      if (!container || typeof window === "undefined") return;

      const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      const probe = document.createElement("canvas");
      const gl = probe.getContext("webgl2") ?? probe.getContext("webgl");
      if (!gl) return;

      let disposed = false;
      let cleanup: (() => void) | undefined;

      const init = async () => {
        const [THREE, { GLTFLoader }, { RoomEnvironment }] = await Promise.all([
          import("three"),
          import("three/addons/loaders/GLTFLoader.js"),
          import("three/addons/environments/RoomEnvironment.js"),
        ]);
        if (disposed || !containerRef.current) return;

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(30, 1, 0.1, 10);
        // Far enough back that the full medallion (casing radius ~0.69) stays
        // in frame at any rotation angle.
        camera.position.z = 2.65;

        // Lighting only affects the bronze casing — the photo relief is unlit
        // so it keeps the exact colors of the original picture.
        scene.add(new THREE.AmbientLight(0xffffff, 0.5));
        const keyLight = new THREE.DirectionalLight(0xffffff, 1.4);
        keyLight.position.set(1.5, 1.5, 2.5);
        scene.add(keyLight);

        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.setSize(container.clientWidth, container.clientHeight);
        renderer.domElement.style.position = "absolute";
        renderer.domElement.style.inset = "0";
        renderer.domElement.setAttribute("aria-hidden", "true");
        container.appendChild(renderer.domElement);

        // Image-based environment so the metal casing picks up realistic
        // reflections instead of flat shading.
        const pmrem = new THREE.PMREMGenerator(renderer);
        const environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
        scene.environment = environment;
        pmrem.dispose();

        const gltf = await new GLTFLoader().loadAsync(MODEL_URL);
        const model = gltf.scene;

        const disposables: Array<{ dispose: () => void }> = [environment];
        model.traverse((object) => {
          const mesh = object as Mesh;
          if (!mesh.isMesh) return;
          const material = mesh.material as MeshStandardMaterial;
          if (mesh.name === "relief") {
            // Photo relief: swap the glTF PBR material for an unlit one so
            // the picture keeps its exact colors without scene lighting.
            const photoTexture = material.map;
            mesh.material = new THREE.MeshBasicMaterial({
              map: photoTexture,
              side: THREE.DoubleSide,
            });
            material.dispose();
            if (photoTexture) disposables.push(photoTexture);
            disposables.push(mesh.material);
          } else {
            // Casing: keep the lit PBR material for the engraved bronze rim
            // and back. The export carries no normals and its winding culls
            // badly from behind, so compute normals and render both faces.
            if (!mesh.geometry.attributes.normal) mesh.geometry.computeVertexNormals();
            material.side = THREE.DoubleSide;
            if (material.map) disposables.push(material.map);
            disposables.push(material);
          }
          disposables.push(mesh.geometry);
        });

        if (disposed) {
          disposables.forEach((resource) => resource.dispose());
          renderer.dispose();
          renderer.domElement.remove();
          return;
        }
        scene.add(model);

        const pointerTarget = { x: 0, y: 0 };
        const handlePointerMove = (event: PointerEvent) => {
          pointerTarget.x = (event.clientX / window.innerWidth) * 2 - 1;
          pointerTarget.y = (event.clientY / window.innerHeight) * 2 - 1;
        };
        window.addEventListener("pointermove", handlePointerMove, { passive: true });

        // Drag-to-spin state: yaw is unbounded so the medallion can turn a
        // full 360°; pitch is clamped so the pose stays readable.
        const spin = { yaw: 0, pitch: 0, velocity: 0, lastX: 0, lastY: 0 };
        let dragging = false;
        let lastInteraction = 0;

        const handleDragStart = (event: PointerEvent) => {
          dragging = true;
          spin.lastX = event.clientX;
          spin.lastY = event.clientY;
          container.setPointerCapture(event.pointerId);
          container.style.cursor = "grabbing";
        };
        const handleDragMove = (event: PointerEvent) => {
          if (!dragging) return;
          const deltaYaw = (event.clientX - spin.lastX) * 0.01;
          spin.yaw += deltaYaw;
          spin.velocity = deltaYaw;
          spin.pitch = Math.max(
            -MAX_PITCH,
            Math.min(MAX_PITCH, spin.pitch + (event.clientY - spin.lastY) * 0.006)
          );
          spin.lastX = event.clientX;
          spin.lastY = event.clientY;
          lastInteraction = performance.now();
        };
        const handleDragEnd = () => {
          dragging = false;
          lastInteraction = performance.now();
          container.style.cursor = "grab";
        };
        container.style.cursor = "grab";
        container.style.touchAction = "none";
        container.addEventListener("pointerdown", handleDragStart);
        container.addEventListener("pointermove", handleDragMove);
        container.addEventListener("pointerup", handleDragEnd);
        container.addEventListener("pointercancel", handleDragEnd);

        let inView = true;
        const observer = new IntersectionObserver((entries) => {
          inView = entries[0]?.isIntersecting ?? true;
        });
        observer.observe(container);

        const resizeObserver = new ResizeObserver(() => {
          renderer.setSize(container.clientWidth, container.clientHeight);
        });
        resizeObserver.observe(container);

        let animationFrame = 0;
        let elapsed = 0;
        let lastTime = performance.now();
        const animate = (time: number) => {
          animationFrame = requestAnimationFrame(animate);
          const delta = Math.min((time - lastTime) / 1000, 0.1);
          lastTime = time;
          if (!inView) return;
          elapsed += delta;

          if (!dragging) {
            // Keep spinning with momentum, then ease back to face front.
            spin.yaw += spin.velocity;
            spin.velocity *= 0.95;
            if (time - lastInteraction > RETURN_DELAY_MS) {
              const front = Math.round(spin.yaw / TWO_PI) * TWO_PI;
              spin.yaw += (front - spin.yaw) * 0.04;
              spin.pitch += (0 - spin.pitch) * 0.04;
            }
          }

          const idleX = reducedMotion ? 0 : Math.sin(elapsed * 0.6) * 0.04;
          const idleY = reducedMotion ? 0 : Math.cos(elapsed * 0.45) * 0.05;
          const tiltY = reducedMotion ? 0 : pointerTarget.x * MAX_TILT;
          const tiltX = reducedMotion ? 0 : pointerTarget.y * MAX_TILT * 0.7;
          const targetY = spin.yaw + tiltY + idleY;
          const targetX = spin.pitch + tiltX + idleX;
          const ease = dragging ? 0.4 : 0.06;
          model.rotation.y += (targetY - model.rotation.y) * ease;
          model.rotation.x += (targetX - model.rotation.x) * ease;

          renderer.render(scene, camera);
        };
        animationFrame = requestAnimationFrame(animate);

        setWebglActive(true);

        cleanup = () => {
          cancelAnimationFrame(animationFrame);
          window.removeEventListener("pointermove", handlePointerMove);
          container.removeEventListener("pointerdown", handleDragStart);
          container.removeEventListener("pointermove", handleDragMove);
          container.removeEventListener("pointerup", handleDragEnd);
          container.removeEventListener("pointercancel", handleDragEnd);
          observer.disconnect();
          resizeObserver.disconnect();
          disposables.forEach((resource) => resource.dispose());
          renderer.dispose();
          renderer.domElement.remove();
        };
      };

      init().catch(() => {
        // Model or WebGL init failed — the static image below remains visible.
      });

      return () => {
        disposed = true;
        cleanup?.();
      };
    }, []);

    return (
      <div ref={containerRef} className={`relative ${className}`} style={{ width, height }}>
        <Image
          src={PortraitPhoto}
          alt={alt}
          width={width}
          height={height}
          priority
          className={`size-full rounded-full object-cover transition-opacity duration-500 ${
            webglActive ? "opacity-0" : "opacity-100"
          }`}
        />
      </div>
    );
  }
);

Portrait3D.displayName = "Portrait3D";

export default Portrait3D;
