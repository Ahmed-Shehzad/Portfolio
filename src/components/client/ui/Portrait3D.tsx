"use client";

import PortraitDepth from "@/assets/images/me-3d-depth.jpg";
import PortraitPhoto from "@/assets/images/me-3d.jpg";
import Image from "next/image";
import { memo, useEffect, useRef, useState } from "react";

/**
 * Portrait3D
 *
 * Renders the portrait photo as an interactive 3D model. The photograph is
 * projected onto a densely subdivided plane whose vertices are displaced by a
 * pre-computed depth map (generated with a monocular depth-estimation model),
 * producing a real volumetric relief of the face and shoulders. The mesh
 * gently tilts toward the pointer and idles with a subtle sway.
 *
 * Progressive enhancement:
 * - A regular optimized <Image> renders first (SSR-safe, priority-loadable).
 * - Three.js is loaded lazily on the client; the WebGL canvas fades in on top
 *   only when the renderer and textures are ready.
 * - Falls back to the static image when WebGL is unavailable or the user
 *   prefers reduced motion.
 */

const VERTEX_SHADER = /* glsl */ `
  uniform sampler2D uDepth;
  uniform float uDepthScale;
  varying vec2 vUv;

  void main() {
    vUv = uv;
    float depth = texture2D(uDepth, uv).r;
    vec3 displaced = position + vec3(0.0, 0.0, (depth - 0.5) * uDepthScale);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(displaced, 1.0);
  }
`;

const FRAGMENT_SHADER = /* glsl */ `
  uniform sampler2D uPhoto;
  varying vec2 vUv;

  void main() {
    // Circular mask so the relief keeps the round avatar silhouette.
    float dist = distance(vUv, vec2(0.5));
    float alpha = 1.0 - smoothstep(0.485, 0.5, dist);
    if (alpha <= 0.001) discard;

    vec4 color = texture2D(uPhoto, vUv);
    gl_FragColor = vec4(color.rgb, alpha);
  }
`;

/** Maximum tilt (radians) applied when the pointer reaches a viewport edge. */
const MAX_TILT = 0.3;
/** Peak-to-peak depth of the relief relative to the unit plane. */
const DEPTH_SCALE = 0.42;

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
        const THREE = await import("three");
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

        const loader = new THREE.TextureLoader();
        const [photoTexture, depthTexture] = await Promise.all([
          loader.loadAsync(PortraitPhoto.src),
          loader.loadAsync(PortraitDepth.src),
        ]);
        if (disposed) {
          photoTexture.dispose();
          depthTexture.dispose();
          renderer.dispose();
          renderer.domElement.remove();
          return;
        }
        photoTexture.colorSpace = THREE.SRGBColorSpace;

        const geometry = new THREE.PlaneGeometry(1.3, 1.3, 160, 160);
        const material = new THREE.ShaderMaterial({
          vertexShader: VERTEX_SHADER,
          fragmentShader: FRAGMENT_SHADER,
          uniforms: {
            uPhoto: { value: photoTexture },
            uDepth: { value: depthTexture },
            uDepthScale: { value: DEPTH_SCALE },
          },
          transparent: true,
        });
        const mesh = new THREE.Mesh(geometry, material);
        scene.add(mesh);

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
          mesh.rotation.y += (targetY - mesh.rotation.y) * 0.06;
          mesh.rotation.x += (targetX - mesh.rotation.x) * 0.06;

          renderer.render(scene, camera);
        };
        animationFrame = requestAnimationFrame(animate);

        setWebglActive(true);

        cleanup = () => {
          cancelAnimationFrame(animationFrame);
          window.removeEventListener("pointermove", handlePointerMove);
          observer.disconnect();
          resizeObserver.disconnect();
          geometry.dispose();
          material.dispose();
          photoTexture.dispose();
          depthTexture.dispose();
          renderer.dispose();
          renderer.domElement.remove();
        };
      };

      init().catch(() => {
        // WebGL init failed — the static image below remains visible.
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
