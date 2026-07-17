"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useMotion } from "@/components/motion/MotionProvider.client";

/**
 * Click-to-explode board reveal for the metal-core section.
 *
 * The Kling clip (assembled Webber board → four exploded layers) is played back
 * as a frame sequence on a canvas, driven by a click/tap toggle rather than
 * scroll. Sub-frame crossfade blending keeps the motion continuous. Reduced
 * motion snaps between assembled and exploded instantly; no-JS / no-frames
 * falls back to the assembled board still.
 */

const FRAMES_DIR = "/images/technology/exploded-frames";
const ASSEMBLED_POSTER = "/images/products/wbms-sw-16s/front.webp";

/**
 * `balloon` is where each layer's callout sits, as a percentage of the frame,
 * measured against the fully-exploded frame. The board box carries the video's
 * own 1780/1160 aspect, so the footage fills it exactly and these percentages
 * track the artwork at any size. Each sits in the white space left of its layer
 * and reaches it with a leader line, as on an exploded assembly drawing.
 */
const LAYERS = [
  {
    label: "COMPONENT LAYER",
    note: "MOSFET power stage, sensing, connectors and control.",
    balloon: { x: 9, y: 13 },
  },
  {
    label: "COPPER CIRCUIT",
    note: "High-current routing, pours and balancing network.",
    balloon: { x: 8, y: 40 },
  },
  {
    label: "DIELECTRIC",
    note: "Insulation isolating the circuit from the core.",
    balloon: { x: 8.5, y: 54 },
  },
  {
    label: "ALUMINIUM METAL CORE",
    note: "Spreads and extracts heat structurally: 2× thermal.",
    balloon: { x: 9, y: 71 },
  },
];

const DURATION = 1500; // ms for a full explode / reassemble
const easeInOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

export function ExplodedReveal({ variant = "full" }: { variant?: "full" | "media" }) {
  const { motionOn } = useMotion();
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const posterRef = useRef<HTMLImageElement>(null);
  const layerRefs = useRef<(HTMLLIElement | null)[]>([]);
  const balloonRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [exploded, setExploded] = useState(false);
  const [framesReady, setFramesReady] = useState(false);
  // Tilt-to-flat entrance: the board lies back, then settles level, like
  // hardware being laid out on the drafting table.
  const [settled, setSettled] = useState(false);

  // mutable animation state (kept in refs to avoid re-renders per frame)
  const state = useRef({
    count: 0,
    images: [] as (HTMLImageElement | null)[],
    loaded: [] as boolean[],
    progress: 0, // 0 = assembled, 1 = exploded
    lastDrawn: -1,
    rafId: 0,
    firstDrawn: false,
  });

  const nearestLoaded = useCallback((idx: number) => {
    const s = state.current;
    for (let d = 0; d < s.count; d++) {
      if (idx - d >= 0 && s.loaded[idx - d]) return idx - d;
      if (idx + d < s.count && s.loaded[idx + d]) return idx + d;
    }
    return -1;
  }, []);

  const draw = useCallback(
    (progress: number, force = false) => {
      const s = state.current;
      if (s.count === 0) return;
      const f = progress * (s.count - 1);
      if (!force && Math.abs(f - s.lastDrawn) < 0.004) return;
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      const cw = canvas.width;
      const ch = canvas.height;
      const i0 = Math.floor(f);
      const frac = f - i0;
      const i1 = Math.min(i0 + 1, s.count - 1);
      const use0 = s.loaded[i0] ? i0 : nearestLoaded(i0);
      if (use0 < 0) return;
      const use1 = s.loaded[i1] ? i1 : -1;

      const paint = (img: HTMLImageElement, alpha: number) => {
        const scale = Math.min(cw / img.naturalWidth, ch / img.naturalHeight);
        const dw = img.naturalWidth * scale;
        const dh = img.naturalHeight * scale;
        ctx.globalAlpha = alpha;
        ctx.drawImage(img, (cw - dw) / 2, (ch - dh) / 2, dw, dh);
      };

      ctx.globalAlpha = 1;
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, cw, ch);
      paint(s.images[use0]!, 1);
      if (use1 >= 0 && use1 !== use0 && frac > 0.001) paint(s.images[use1]!, frac);
      ctx.globalAlpha = 1;
      s.lastDrawn = f;

      if (!s.firstDrawn) {
        s.firstDrawn = true;
        setFramesReady(true);
        if (posterRef.current) posterRef.current.style.opacity = "0";
      }
    },
    [nearestLoaded]
  );

  const updateCaptions = useCallback((progress: number) => {
    LAYERS.forEach((_, i) => {
      const el = layerRefs.current[i];
      if (el) {
        const on = progress >= 0.3 + i * 0.16;
        el.style.opacity = on ? "1" : "0.3";
        el.style.transform = on ? "translateX(0)" : "translateX(-6px)";
      }
      // Balloons only mean anything once the layers have actually separated, so
      // hold them back until the tail of the explode.
      const b = balloonRefs.current[i];
      if (b) {
        const t = Math.min(1, Math.max(0, (progress - 0.72) / 0.24));
        b.style.opacity = String(t);
        b.style.transform = `translateY(-50%) translateX(${(1 - t) * -8}px)`;
      }
    });
  }, []);

  const animateTo = useCallback(
    (target: 0 | 1) => {
      const s = state.current;
      cancelAnimationFrame(s.rafId);
      if (!motionOn) {
        s.progress = target;
        draw(target, true);
        updateCaptions(target);
        return;
      }
      const start = s.progress;
      const delta = target - start;
      const t0 = performance.now();
      const step = (now: number) => {
        const t = Math.min(1, (now - t0) / DURATION);
        s.progress = start + delta * easeInOut(t);
        draw(s.progress);
        updateCaptions(s.progress);
        if (t < 1) s.rafId = requestAnimationFrame(step);
      };
      s.rafId = requestAnimationFrame(step);
    },
    [motionOn, draw, updateCaptions]
  );

  const toggle = useCallback(() => {
    setExploded((prev) => {
      animateTo(prev ? 0 : 1);
      return !prev;
    });
  }, [animateTo]);

  // Settle the board flat once it comes into view. Deliberately an entrance
  // rather than a scroll-linked tilt: the board sits at the top of the page, so
  // a scroll-driven angle would have almost no runway and would leave the board
  // stuck at an angle for anyone who never scrolls, hurting both the visual and
  // its click target.
  useEffect(() => {
    if (!motionOn) return;
    const el = wrapRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setSettled(true);
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -12% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [motionOn]);

  // Without motion the board is simply already level.
  const level = settled || !motionOn;

  // Size the canvas to its box (device-pixel aware).
  useEffect(() => {
    const resize = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = Math.round(canvas.clientWidth * dpr);
      canvas.height = Math.round(canvas.clientHeight * dpr);
      draw(state.current.progress, true);
    };
    resize();
    const ro = new ResizeObserver(resize);
    if (canvasRef.current) ro.observe(canvasRef.current);
    return () => ro.disconnect();
  }, [draw]);

  // Load the frame sequence when the section nears the viewport.
  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    const s = state.current;
    let cancelled = false;

    const start = async () => {
      try {
        const res = await fetch(`${FRAMES_DIR}/manifest.json`);
        if (!res.ok) return;
        const m = (await res.json()) as { count?: number };
        const count = m.count ?? 0;
        if (!count || cancelled) return;
        s.count = count;
        s.images = new Array(count).fill(null);
        s.loaded = new Array(count).fill(false);

        const loadFrame = (i: number) =>
          new Promise<void>((resolve) => {
            const img = new Image();
            const done = () => {
              s.images[i] = img;
              s.loaded[i] = true;
              if (i === 0) draw(s.progress, true);
              resolve();
            };
            img.onload = () => (img.decode ? img.decode().then(done, done) : done());
            img.onerror = () => resolve();
            img.src = `${FRAMES_DIR}/frame-${String(i + 1).padStart(4, "0")}.webp`;
          });

        await loadFrame(0);
        for (const stride of [8, 2, 1]) {
          const batch: Promise<void>[] = [];
          for (let i = 0; i < count; i += stride) if (!s.loaded[i]) batch.push(loadFrame(i));
          await Promise.all(batch);
          if (cancelled) return;
        }
      } catch {
        /* keep the assembled poster */
      }
    };

    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          io.disconnect();
          void start();
        }
      },
      { rootMargin: "300px" }
    );
    io.observe(wrap);
    return () => {
      cancelled = true;
      io.disconnect();
      cancelAnimationFrame(s.rafId);
    };
  }, [draw]);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      toggle();
    }
  };

  const board = (
    <div className="relative" style={{ perspective: "1400px" }}>
      <div
        role="button"
        tabIndex={0}
        aria-pressed={exploded}
        aria-label={
          exploded
            ? "Reassemble the battery management board"
            : "Explode the battery management board to view its four layers"
        }
        onClick={toggle}
        onKeyDown={onKeyDown}
        className="group relative block w-full cursor-pointer overflow-hidden rounded-[6px] border border-grey-200 bg-white"
        style={{
          aspectRatio: "1780 / 1160",
          transformOrigin: "50% 100%",
          transform: level ? "rotateX(0deg) scale(1)" : "rotateX(14deg) scale(0.95)",
          transition:
            "transform 1100ms var(--ease-technical), opacity 700ms var(--ease-ui-out)",
          opacity: level ? 1 : 0,
        }}
      >
        {/* Assembled poster: visible until the first canvas frame is drawn */}
        {/* eslint-disable-next-line @next/next/no-img-element -- swapped out for the canvas on load */}
        <img
          ref={posterRef}
          src={ASSEMBLED_POSTER}
          alt="Assembled Webber battery management board"
          className="absolute inset-0 h-full w-full object-contain transition-opacity duration-500"
        />
        <canvas
          ref={canvasRef}
          aria-hidden="true"
          className={`absolute inset-0 h-full w-full transition-opacity duration-300 ${
            framesReady ? "opacity-100" : "opacity-0"
          }`}
        />

        {/* Balloon callouts: circled item numbers on leader lines, as on an
            exploded assembly drawing. Keyed to the numbered layer list. */}
        <div aria-hidden="true">
          {LAYERS.map((l, i) => (
            <div
              key={l.label}
              ref={(el) => {
                balloonRefs.current[i] = el;
              }}
              className="pointer-events-none absolute flex items-center opacity-0"
              style={{
                left: `${l.balloon.x}%`,
                top: `${l.balloon.y}%`,
                width: "8%",
                transform: "translateY(-50%)",
                transition: "opacity 260ms var(--ease-ui-out)",
              }}
            >
              <span className="flex h-[26px] w-[26px] shrink-0 items-center justify-center rounded-full border border-blue-600 bg-white/90 text-[11px] font-[550] leading-none text-blue-700">
                {i + 1}
              </span>
              <span className="h-px flex-1 bg-blue-300" />
            </div>
          ))}
        </div>

        {/* Affordance chip */}
        <span className="pointer-events-none absolute bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-full border border-grey-200 bg-white/90 px-4 py-2 backdrop-blur-sm transition-colors group-hover:border-blue-300">
          <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true" fill="none">
            {exploded ? (
              <path d="M7 1v5M7 8v5M2 7h3M9 7h3" stroke="var(--blue-600)" strokeWidth="1.5" strokeLinecap="round" />
            ) : (
              <path d="M7 1v3M7 10v3M1 7h3M10 7h3M4 4l2 2M10 4L8 6M4 10l2-2M10 10L8 8" stroke="var(--blue-600)" strokeWidth="1.5" strokeLinecap="round" />
            )}
          </svg>
          <span className="micro-label micro-label--blue">
            {exploded ? "CLICK TO REASSEMBLE" : "CLICK TO EXPLODE"}
          </span>
        </span>
      </div>
    </div>
  );

  // Media-only (e.g. beside hero copy): the board plus a compact key, since
  // without it the balloon numbers would reference nothing.
  if (variant === "media") {
    return (
      <div ref={wrapRef} className="relative">
        {board}
        <ol className="mt-5 grid grid-cols-2 gap-x-6 gap-y-2">
          {LAYERS.map((l, i) => (
            <li
              key={l.label}
              ref={(el) => {
                layerRefs.current[i] = el;
              }}
              className="flex items-center gap-2 transition-all duration-300"
              style={{ opacity: 0.3 }}
            >
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-blue-600 text-[10px] font-[550] leading-none text-blue-700">
                {i + 1}
              </span>
              <span className="micro-label">{l.label}</span>
            </li>
          ))}
        </ol>
      </div>
    );
  }

  return (
    <div ref={wrapRef} className="grid items-center gap-10 lg:grid-cols-[1.6fr_1fr]">
      {board}
      <ol className="space-y-5">
        {LAYERS.map((l, i) => (
          <li
            key={l.label}
            ref={(el) => {
              layerRefs.current[i] = el;
            }}
            className="border-l-2 border-blue-200 pl-4 transition-all duration-300"
            style={{ opacity: 0.3 }}
          >
            <p className="micro-label micro-label--blue flex items-center gap-2">
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-blue-600 text-[10px] font-[550] leading-none">
                {i + 1}
              </span>
              {l.label}
            </p>
            <p className="type-body mt-1 !text-[0.9375rem]">{l.note}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}
