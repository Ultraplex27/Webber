"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useSyncExternalStore,
  type ReactNode,
} from "react";

interface MotionContextValue {
  /** true when animations should run (client hydrated, no reduced-motion request) */
  motionOn: boolean;
  /** the user's explicit override, persisted locally */
  userReduced: boolean;
  toggleReduced: () => void;
}

const MotionContext = createContext<MotionContextValue>({
  motionOn: false,
  userReduced: false,
  toggleReduced: () => {},
});

export function useMotion() {
  return useContext(MotionContext);
}

const STORAGE_KEY = "webber-reduce-motion";
const USER_EVENT = "webber-reduce-motion-change";

function subscribeSystemReduced(cb: () => void) {
  const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
}

function subscribeUserReduced(cb: () => void) {
  window.addEventListener(USER_EVENT, cb);
  window.addEventListener("storage", cb);
  return () => {
    window.removeEventListener(USER_EVENT, cb);
    window.removeEventListener("storage", cb);
  };
}

// Server snapshots return "reduced" so SSR/hydration renders static-safe.
function useSystemReduced() {
  return useSyncExternalStore(
    subscribeSystemReduced,
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    () => true
  );
}

function useUserReduced() {
  return useSyncExternalStore(
    subscribeUserReduced,
    () => localStorage.getItem(STORAGE_KEY) === "true",
    () => false
  );
}

// Hydration flag as an external-store snapshot (true on client, false on server).
function useHydrated() {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );
}

export function MotionProvider({ children }: { children: ReactNode }) {
  const hydrated = useHydrated();
  const systemReduced = useSystemReduced();
  const userReduced = useUserReduced();
  const lenisRef = useRef<{ destroy: () => void } | null>(null);

  const motionOn = hydrated && !userReduced && !systemReduced;

  // Reflect state on <html> so CSS can react (reveal-init, electron pulse, …)
  useEffect(() => {
    document.documentElement.dataset.motion = motionOn ? "on" : "off";
    document.documentElement.dataset.reducedMotion = String(userReduced);
  }, [motionOn, userReduced]);

  // Lenis: desktop-pointer devices only, and only while motion is on.
  useEffect(() => {
    if (!motionOn) return;
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    const wideEnough = window.innerWidth >= 1024;
    if (!finePointer || !wideEnough) return;

    let rafId = 0;
    let cancelled = false;
    (async () => {
      const [{ default: Lenis }, { gsap }, { ScrollTrigger }] = await Promise.all([
        import("lenis"),
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);
      if (cancelled) return;
      const lenis = new Lenis({ lerp: 0.12 });
      lenisRef.current = lenis;
      gsap.registerPlugin(ScrollTrigger);
      lenis.on("scroll", ScrollTrigger.update);
      const raf = (time: number) => {
        lenis.raf(time);
        rafId = requestAnimationFrame(raf);
      };
      rafId = requestAnimationFrame(raf);
    })();

    return () => {
      cancelled = true;
      cancelAnimationFrame(rafId);
      lenisRef.current?.destroy();
      lenisRef.current = null;
    };
  }, [motionOn]);

  const toggleReduced = useCallback(() => {
    const next = !(localStorage.getItem(STORAGE_KEY) === "true");
    localStorage.setItem(STORAGE_KEY, String(next));
    window.dispatchEvent(new Event(USER_EVENT));
  }, []);

  return (
    <MotionContext.Provider value={{ motionOn, userReduced, toggleReduced }}>
      {children}
    </MotionContext.Provider>
  );
}
