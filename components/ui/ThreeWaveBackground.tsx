"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

// ─────────────────────────────────────────────
// Change these constants → hard refresh (Cmd+Shift+R) to apply
// OR pass as props for live updates
// ─────────────────────────────────────────────
const COLS = 120;
const ROWS = 120;
const SPACING = 1;
const WAVE_SPEED = 0.018;

interface ThreeWaveProps {
  /** Dot hex color e.g. 0xffffff */
  dotColor?: number;
  dotSize?: number;
  waveAmplitude?: number;
  opacity?: number;
}

export default function ThreeWaveBackground({
  dotColor = 0xffaa00,
  dotSize = 0.12,
  waveAmplitude = 0.9,
  opacity = 1,
}: ThreeWaveProps) {
  const mountRef = useRef<HTMLDivElement>(null);

  // Mutable refs read every frame — changes propagate instantly, no needsUpdate quirks
  const colorRef = useRef(dotColor);
  const sizeRef = useRef(dotSize);
  const amplitudeRef = useRef(waveAmplitude);
  const opacityRef = useRef(opacity);

  // Keep refs in sync with props on every render (no useEffect needed)
  colorRef.current = dotColor;
  sizeRef.current = dotSize;
  amplitudeRef.current = waveAmplitude;
  opacityRef.current = opacity;

  // ── One-time scene setup ─────────────────────────────────
  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    // Scene
    const scene = new THREE.Scene();

    // Camera
    const camera = new THREE.PerspectiveCamera(
      55,
      mount.clientWidth / mount.clientHeight,
      0.1,
      200,
    );
    camera.position.set(0, 18, 32);
    camera.lookAt(0, 0, 0);

    // Renderer
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    // Geometry — flat particle grid
    const total = COLS * ROWS;
    const positions = new Float32Array(total * 3);
    let idx = 0;
    for (let row = 0; row < ROWS; row++) {
      for (let col = 0; col < COLS; col++) {
        positions[idx] = (col - COLS / 2) * SPACING;
        positions[idx + 1] = 0;
        positions[idx + 2] = (row - ROWS / 2) * SPACING;
        idx += 3;
      }
    }
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

    // Material — initial values from refs (already synced with props)
    const material = new THREE.PointsMaterial({
      color: colorRef.current,
      size: sizeRef.current,
      opacity: opacityRef.current,
      sizeAttenuation: true,
      transparent: true,
      depthWrite: false,
    });

    const points = new THREE.Points(geometry, material);
    scene.add(points);

    // ── Animation loop ────────────────────────────────────
    let time = 0;
    let frameId = 0;

    const animate = () => {
      frameId = requestAnimationFrame(animate);
      time += WAVE_SPEED;

      // Pull latest values from refs every frame — instant, no Three.js lifecycle needed
      material.color.setHex(colorRef.current);
      material.size = sizeRef.current;
      material.opacity = opacityRef.current;

      const pos = geometry.attributes.position.array as Float32Array;
      const amp = amplitudeRef.current;

      for (let row = 0; row < ROWS; row++) {
        for (let col = 0; col < COLS; col++) {
          const i = (row * COLS + col) * 3;
          const x = pos[i];
          const z = pos[i + 2];
          pos[i + 1] =
            Math.sin(x * 0.5 + time) * amp * 0.6 +
            Math.cos(z * 0.45 + time * 0.9) * amp * 0.5 +
            Math.sin((x + z) * 0.3 + time * 1.2) * amp * 0.3;
        }
      }

      geometry.attributes.position.needsUpdate = true;
      material.needsUpdate = true;
      points.rotation.y = time * 0.06;
      renderer.render(scene, camera);
    };

    animate();

    // Resize handler
    const handleResize = () => {
      if (!mount) return;
      camera.aspect = mount.clientWidth / mount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mount.clientWidth, mount.clientHeight);
    };
    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("resize", handleResize);
      renderer.dispose();
      geometry.dispose();
      material.dispose();
      if (mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div
      ref={mountRef}
      className="absolute inset-0 z-0 w-full h-full overflow-hidden"
      aria-hidden="true"
    />
  );
}
