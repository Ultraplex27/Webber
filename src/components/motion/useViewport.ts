"use client";

import { useSyncExternalStore } from "react";

function subscribeResize(cb: () => void) {
  window.addEventListener("resize", cb);
  return () => window.removeEventListener("resize", cb);
}

/** true on ≥1024px viewports; false during SSR. */
export function useIsDesktop() {
  return useSyncExternalStore(
    subscribeResize,
    () => window.innerWidth >= 1024,
    () => false
  );
}

let webglSupport: boolean | null = null;

/** Cached WebGL capability probe (deterministic after first call). */
export function hasWebgl(): boolean {
  if (webglSupport === null) {
    try {
      const c = document.createElement("canvas");
      webglSupport = !!(c.getContext("webgl2") || c.getContext("webgl"));
    } catch {
      webglSupport = false;
    }
  }
  return webglSupport;
}
