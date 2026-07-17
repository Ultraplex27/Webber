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

function subscribeHover(cb: () => void) {
  const mq = window.matchMedia("(hover: hover)");
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
}

/**
 * True when the device can genuinely hover (mouse/trackpad). Touch reports no
 * hover, so hover-driven affordances must keep a tap path. False during SSR,
 * which makes tap the safe default until we know better.
 */
export function useCanHover() {
  return useSyncExternalStore(
    subscribeHover,
    () => window.matchMedia("(hover: hover)").matches,
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
