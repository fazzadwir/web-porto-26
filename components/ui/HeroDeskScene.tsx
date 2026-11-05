"use client";

import { useEffect, useRef, useState } from "react";

/**
 * True when WebGL would run on a software rasteriser (SwiftShader, llvmpipe, GPU blocklisted).
 * There the scene stalls the main thread for seconds, so we keep the static poster instead.
 */
function hasFastWebGL(): boolean {
  try {
    const c = document.createElement("canvas");
    const gl =
      c.getContext("webgl2", { failIfMajorPerformanceCaveat: true }) ||
      c.getContext("webgl", { failIfMajorPerformanceCaveat: true });
    if (!gl) return false;
    const info = gl.getExtension("WEBGL_debug_renderer_info");
    const name = info ? String(gl.getParameter(info.UNMASKED_RENDERER_WEBGL)) : "";
    gl.getExtension("WEBGL_lose_context")?.loseContext();
    return !/swiftshader|llvmpipe|softpipe|software|basic render/i.test(name);
  } catch {
    return false;
  }
}

/** Phones, low-core CPUs and Save-Data users get a lighter render (DPR 1, no MSAA, smaller shadow map). */
function detectLowEnd(): boolean {
  const nav = navigator as Navigator & { deviceMemory?: number; connection?: { saveData?: boolean } };
  return (
    window.matchMedia("(pointer: coarse)").matches ||
    (nav.hardwareConcurrency ?? 8) <= 4 ||
    (nav.deviceMemory ?? 8) <= 4 ||
    Boolean(nav.connection?.saveData)
  );
}

/**
 * Live three.js desk that fades in over the hero poster.
 *
 * three.js (~160 KB gzip) and the scene build (geometry, PMREM, shader compile) are the
 * heaviest things on the home page, so nothing is downloaded until the page has loaded and
 * the browser is idle — and never on software-only WebGL, where the poster stays.
 */
export default function HeroDeskScene() {
  const mountRef = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    let cancelled = false;
    let cleanup: (() => void) | undefined;
    let idleId: number | undefined;

    const start = async () => {
      if (cancelled || !hasFastWebGL()) return;
      const { mountScene } = await import("@/components/ui/DesignDeskScene");
      if (cancelled) return;
      cleanup = mountScene(mount, { lowEnd: detectLowEnd() }, () => !cancelled && setReady(true));
    };
    const schedule = () => {
      // Safari has no requestIdleCallback
      idleId =
        typeof window.requestIdleCallback === "function"
          ? window.requestIdleCallback(() => void start(), { timeout: 2000 })
          : (globalThis.setTimeout(() => void start(), 300) as unknown as number);
    };
    if (document.readyState === "complete") schedule();
    else window.addEventListener("load", schedule, { once: true });

    return () => {
      cancelled = true;
      window.removeEventListener("load", schedule);
      if (idleId !== undefined) {
        if (typeof window.cancelIdleCallback === "function") window.cancelIdleCallback(idleId);
        else globalThis.clearTimeout(idleId);
      }
      cleanup?.();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className={`absolute inset-0 z-0 h-full w-full transition-opacity duration-700 ${ready ? "opacity-100" : "opacity-0"}`}
      aria-hidden="true"
    />
  );
}
