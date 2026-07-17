/**
 * Lenis owns the scroll position on desktop, so anything that wants to drive
 * scroll programmatically (the hero's auto-playthrough) has to go through it
 * rather than calling window.scrollTo and fighting its smoothing loop.
 *
 * MotionProvider registers the instance here when it starts Lenis and clears it
 * on teardown; consumers must treat null as "no smooth scroll, drive it
 * yourself".
 */
export interface LenisLike {
  scrollTo: (
    target: number,
    opts?: {
      duration?: number;
      easing?: (t: number) => number;
      immediate?: boolean;
      force?: boolean;
      onComplete?: () => void;
    }
  ) => void;
}

let instance: LenisLike | null = null;

export function setLenis(l: LenisLike | null) {
  instance = l;
}

export function getLenis() {
  return instance;
}
