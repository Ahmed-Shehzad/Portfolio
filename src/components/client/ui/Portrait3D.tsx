"use client";

import PortraitPhoto from "@/assets/images/me-3d.jpg";
import Image from "next/image";
import { memo, useEffect, useRef, useState } from "react";
import type { Mesh, MeshStandardMaterial } from "three";

/**
 * Portrait3D
 *
 * Renders the portrait as an interactive 3D model loaded from a glTF binary
 * (public/models/portrait.glb). The model is a circular relief mesh baked
 * from the portrait photo and a depth map produced by a monocular
 * depth-estimation model — see scripts/generate-portrait-model.py, which also
 * exports .gltf and .obj variants of the same model. The mesh gently tilts
 * toward the pointer and idles with a subtle sway.
 *
 * Progressive enhancement:
 * - A regular optimized <Image> renders first (SSR-safe, priority-loadable).
 * - Three.js and the model are loaded lazily on the client; the WebGL canvas
 *   fades in on top only when the model is ready.
 * - Falls back to the static image when WebGL is unavailable or the user
 *   prefers reduced motion.
 */

const MODEL_URL = "/models/portrait.glb";

/** Maximum tilt (radians) applied when the pointer reaches a viewport edge. */
const MAX_TILT = 0.3;

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

      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const probe = document.createElement("canvas");
      const gl = probe.getContext("webgl2") ?? probe.getContext("webgl");
      if (!gl) return;

      let disposed = false;
      let cleanup: (() => void) | undefined;

      const init = async () => {
        const [THREE, { GLTFLoader }] = await Promise.all([
          import("three"),
          import("three/addons/loaders/GLTFLoader.js"),
        ]);
        if (disposed || !containerRef.current) return;

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(30, 1, 0.1, 10);
        camera.position.z = 2.4;

        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.setSize(container.clientWidth, container.clientHeight);
        renderer.domElement.style.position = "absolute";
        renderer.domElement.style.inset = "0";
        renderer.domElement.setAttribute("aria-hidden", "true");
        container.appendChild(renderer.domElement);

        const gltf = await new GLTFLoader().loadAsync(MODEL_URL);
        const model = gltf.scene;

        // Swap the glTF PBR materials for unlit ones so the photo texture
        // keeps its exact colors without scene lighting.
        const disposables: Array<{ dispose: () => void }> = [];
        model.traverse((object) => {
          const mesh = object as Mesh;
          if (!mesh.isMesh) return;
          const pbrMaterial = mesh.material as MeshStandardMaterial;
          const photoTexture = pbrMaterial.map;
          mesh.material = new THREE.MeshBasicMaterial({ map: photoTexture });
          pbrMaterial.dispose();
          disposables.push(mesh.geometry, mesh.material);
          if (photoTexture) disposables.push(photoTexture);
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

          const idleX = Math.sin(elapsed * 0.6) * 0.04;
          const idleY = Math.cos(elapsed * 0.45) * 0.05;
          const targetY = pointerTarget.x * MAX_TILT + idleY;
          const targetX = pointerTarget.y * MAX_TILT * 0.7 + idleX;
          model.rotation.y += (targetY - model.rotation.y) * 0.06;
          model.rotation.x += (targetX - model.rotation.x) * 0.06;

          renderer.render(scene, camera);
        };
        animationFrame = requestAnimationFrame(animate);

        setWebglActive(true);

        cleanup = () => {
          cancelAnimationFrame(animationFrame);
          window.removeEventListener("pointermove", handlePointerMove);
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
