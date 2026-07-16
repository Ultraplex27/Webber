"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useMotion } from "@/components/motion/MotionProvider.client";
import { useIsDesktop } from "@/components/motion/useViewport";
import { HeroPoster } from "./HeroPoster";

/**
 * Scroll-scrubbed hero with three progressive modes:
 *
 *  1. "frames" — canvas scrubbing of the extracted video frame sequence
 *     (public/images/hero/frames/ + manifest.json; see HERO-VIDEO-HIGGSFIELD.md)
 *  2. "scenes" — 13 keyframe stills crossfading (public/images/hero/seq/;
 *     see HERO-SEQUENCE-ASSETS.md) when no frame sequence exists
 *  3. "poster" — static composition on mobile / reduced motion / missing assets
 *
 * All modes server-render the same copy; labels and copy are overlaid HTML.
 */

const FRAMES_DIR = "/images/hero/frames";
const SEQ_DIR = "/images/hero/seq";

interface Scene {
  file: string;
  from: number;
  to: number;
  driftX: number;
  driftY: number;
}

const SCENES: Scene[] = [
  { file: "scene-01-white-field.webp", from: 0.0, to: 0.1, driftX: -20, driftY: 0 },
  { file: "scene-02-board-approach.webp", from: 0.1, to: 0.2, driftX: -26, driftY: -10 },
  { file: "scene-03-sensing-macro.webp", from: 0.2, to: 0.3, driftX: -34, driftY: 0 },
  { file: "scene-04-balancing.webp", from: 0.3, to: 0.38, driftX: -30, driftY: 6 },
  { file: "scene-05-thermal.webp", from: 0.38, to: 0.46, driftX: -30, driftY: 0 },
  { file: "scene-06-isolation.webp", from: 0.46, to: 0.53, driftX: -26, driftY: -6 },
  { file: "scene-07-protection.webp", from: 0.53, to: 0.62, driftX: -26, driftY: 0 },
  { file: "scene-08-pack-assembly.webp", from: 0.62, to: 0.72, driftX: 0, driftY: -14 },
  { file: "scene-09-pack-charged.webp", from: 0.72, to: 0.78, driftX: 0, driftY: -8 },
  { file: "scene-10-vehicle-2w.webp", from: 0.78, to: 0.84, driftX: 14, driftY: 0 },
  { file: "scene-11-vehicle-3w.webp", from: 0.84, to: 0.885, driftX: 14, driftY: 0 },
  { file: "scene-12-bess.webp", from: 0.885, to: 0.945, driftX: 0, driftY: -10 },
  { file: "scene-13-network.webp", from: 0.945, to: 1.0, driftX: -12, driftY: 0 },
];

const FADE = 0.022;

/** Energy-pulse waypoints (scenes mode only — the video bakes its own pulse). */
const PULSE_PATH: { p: number; x: number; y: number }[] = [
  { p: 0.0, x: 40, y: 55 },
  { p: 0.1, x: 55, y: 50 },
  { p: 0.2, x: 30, y: 55 },
  { p: 0.3, x: 35, y: 42 },
  { p: 0.38, x: 58, y: 55 },
  { p: 0.46, x: 62, y: 45 },
  { p: 0.53, x: 45, y: 48 },
  { p: 0.62, x: 70, y: 40 },
];

type Mode = "probing" | "frames" | "scenes" | "poster";

function clamp01(v: number) {
  return Math.min(1, Math.max(0, v));
}
function smooth(p: number, a: number, b: number) {
  const t = clamp01((p - a) / (b - a));
  return t * t * (3 - 2 * t);
}
function frameSrc(i: number) {
  return `${FRAMES_DIR}/frame-${String(i + 1).padStart(4, "0")}.webp`;
}

export function HeroShell() {
  const { motionOn } = useMotion();
  const isDesktop = useIsDesktop();
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const introRef = useRef<HTMLDivElement>(null);
  const finaleRef = useRef<HTMLDivElement>(null);
  const sceneRefs = useRef<(HTMLImageElement | null)[]>([]);
  const pulseRef = useRef<HTMLDivElement>(null);
  const [mode, setMode] = useState<Mode>("probing");
  const [frameCount, setFrameCount] = useState(0);

  const wantsCinematic = motionOn && isDesktop;
  const cinematic = wantsCinematic && (mode === "frames" || mode === "scenes");

  // Probe assets: frame-sequence manifest first, then keyframes, else poster.
  useEffect(() => {
    if (!wantsCinematic || mode !== "probing") return;
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch(`${FRAMES_DIR}/manifest.json`);
        if (res.ok) {
          const m = (await res.json()) as { count?: number };
          if (!cancelled && m.count && m.count > 1) {
            setFrameCount(m.count);
            setMode("frames");
            return;
          }
        }
      } catch {
        /* fall through to keyframe probe */
      }
      const probe = new Image();
      probe.onload = () => !cancelled && setMode("scenes");
      probe.onerror = () => !cancelled && setMode("poster");
      probe.src = `${SEQ_DIR}/${SCENES[0].file}`;
    })();
    return () => {
      cancelled = true;
    };
  }, [wantsCinematic, mode]);

  useEffect(() => {
    if (!cinematic) return;
    const wrap = wrapRef.current;
    if (!wrap) return;

    let st: { kill: () => void; progress: number } | null = null;
    let ro: ResizeObserver | null = null;
    let cancelled = false;

    // ---- frames mode: progressive loader + blended canvas painter -----------
    // HTMLImageElement (not ImageBitmap) keeps frames compressed in memory — a
    // 361-frame ImageBitmap cache would decode to gigabytes. The browser's own
    // decode cache keeps nearby frames warm while scrubbing.
    const images: (HTMLImageElement | null)[] = new Array(frameCount).fill(null);
    const loadedFlags: boolean[] = new Array(frameCount).fill(false);
    let currentF = 0; // fractional frame position
    let lastDrawnF = -1;

    const nearestLoaded = (idx: number) => {
      for (let d = 0; d < frameCount; d++) {
        if (idx - d >= 0 && loadedFlags[idx - d]) return idx - d;
        if (idx + d < frameCount && loadedFlags[idx + d]) return idx + d;
      }
      return -1;
    };

    const paint = (
      ctx: CanvasRenderingContext2D,
      img: HTMLImageElement,
      cw: number,
      ch: number,
      alpha: number
    ) => {
      const scale = Math.max(cw / img.naturalWidth, ch / img.naturalHeight);
      const dw = img.naturalWidth * scale;
      const dh = img.naturalHeight * scale;
      ctx.globalAlpha = alpha;
      ctx.drawImage(img, (cw - dw) / 2, (ch - dh) / 2, dw, dh);
    };

    // Draw fractional frame f by crossfading frame ⌊f⌋ → ⌈f⌉ (removes stepping).
    const drawBlend = (f: number, force = false) => {
      if (!force && Math.abs(f - lastDrawnF) < 0.006) return;
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      const cw = canvas.width;
      const ch = canvas.height;

      const i0 = Math.floor(f);
      const frac = f - i0;
      const i1 = Math.min(i0 + 1, frameCount - 1);

      const use0 = loadedFlags[i0] ? i0 : nearestLoaded(i0);
      if (use0 < 0) return; // nothing loaded near here yet
      const use1 = loadedFlags[i1] ? i1 : -1;

      ctx.globalAlpha = 1;
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, cw, ch);
      paint(ctx, images[use0]!, cw, ch, 1);
      // source-over with alpha = frac gives a true linear crossfade
      if (use1 >= 0 && use1 !== use0 && frac > 0.001) {
        paint(ctx, images[use1]!, cw, ch, frac);
      }
      ctx.globalAlpha = 1;
      lastDrawnF = f;
    };

    const loadFrame = (i: number) =>
      new Promise<void>((resolve) => {
        if (loadedFlags[i]) return resolve();
        const img = new Image();
        const done = () => {
          images[i] = img;
          loadedFlags[i] = true;
          if (Math.abs(i - currentF) < 3) drawBlend(currentF, true);
          resolve();
        };
        img.onload = () => {
          // Prime the decode so the first paint of this frame never stalls.
          if (img.decode) img.decode().then(done, done);
          else done();
        };
        img.onerror = () => resolve();
        img.src = frameSrc(i);
      });

    const loadProgressively = async () => {
      // coarse-to-fine passes so scrubbing works almost immediately
      for (const stride of [16, 4, 1]) {
        const batch: Promise<void>[] = [];
        for (let i = 0; i < frameCount; i += stride) batch.push(loadFrame(i));
        await Promise.all(batch);
        if (cancelled) return;
      }
    };

    const resizeCanvas = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = Math.round(canvas.clientWidth * dpr);
      canvas.height = Math.round(canvas.clientHeight * dpr);
      drawBlend(currentF, true);
    };

    // ---- shared per-progress application ------------------------------------
    const apply = (p: number) => {
      if (mode === "frames") {
        currentF = p * (frameCount - 1);
        drawBlend(currentF);
      } else {
        SCENES.forEach((s, i) => {
          const el = sceneRefs.current[i];
          if (!el) return;
          const fadeIn = s.from === 0 ? 1 : smooth(p, s.from - FADE, s.from + FADE);
          const fadeOut = s.to === 1 ? 0 : smooth(p, s.to - FADE, s.to + FADE);
          const opacity = clamp01(fadeIn - fadeOut);
          el.style.opacity = String(opacity);
          if (opacity > 0) {
            const local = clamp01((p - s.from) / (s.to - s.from));
            const scale = 1.06 - 0.06 * local;
            el.style.transform = `translate3d(${s.driftX * (local - 0.5)}px, ${
              s.driftY * (local - 0.5)
            }px, 0) scale(${scale})`;
          }
        });
        const pulse = pulseRef.current;
        if (pulse) {
          let k = 0;
          while (k < PULSE_PATH.length - 2 && PULSE_PATH[k + 1].p < p) k++;
          const a = PULSE_PATH[k];
          const b = PULSE_PATH[k + 1];
          const t = smooth(p, a.p, b.p);
          pulse.style.left = `${a.x + (b.x - a.x) * t}%`;
          pulse.style.top = `${a.y + (b.y - a.y) * t}%`;
          pulse.style.opacity = String(0.9 * (1 - smooth(p, 0.6, 0.66)));
        }
      }

      if (introRef.current) {
        const out = clamp01((p - 0.02) / 0.1);
        introRef.current.style.opacity = String(1 - out);
        introRef.current.style.transform = `translateY(${out * -40}px)`;
        introRef.current.style.pointerEvents = out > 0.6 ? "none" : "auto";
      }
      if (finaleRef.current) {
        const inn = clamp01((p - 0.94) / 0.05);
        finaleRef.current.style.opacity = String(inn);
        finaleRef.current.style.transform = `translateY(${(1 - inn) * 24}px)`;
        finaleRef.current.style.pointerEvents = inn > 0.5 ? "auto" : "none";
      }
    };

    (async () => {
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);
      if (cancelled) return;
      gsap.registerPlugin(ScrollTrigger);
      if (mode === "frames") {
        resizeCanvas();
        ro = new ResizeObserver(resizeCanvas);
        if (canvasRef.current) ro.observe(canvasRef.current);
        void loadProgressively();
      }
      const trigger = ScrollTrigger.create({
        trigger: wrap,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.45,
        onUpdate: (self) => apply(self.progress),
      });
      st = trigger;
      apply(trigger.progress);
    })();

    return () => {
      cancelled = true;
      st?.kill();
      ro?.disconnect();
    };
  }, [cinematic, mode, frameCount]);

  return (
    <div ref={wrapRef} className={cinematic ? "relative h-[460vh]" : "relative"} data-hero>
      <section
        className={`${
          cinematic ? "sticky top-0 h-screen" : "relative min-h-screen"
        } flex flex-col justify-center overflow-hidden bg-canvas`}
        aria-label="Webber — battery intelligence from 12V to 1200V"
      >
        {/* Poster: LCP-safe base layer; the sequence covers it once active */}
        <HeroPoster
          className={cinematic ? "opacity-0 transition-opacity duration-700" : "opacity-100"}
        />

        {/* Frame-sequence canvas */}
        {mode === "frames" && cinematic && (
          <canvas
            ref={canvasRef}
            aria-hidden="true"
            className="absolute inset-0 h-full w-full"
          />
        )}

        {/* Keyframe crossfade stack */}
        {mode === "scenes" && cinematic && (
          <div className="absolute inset-0" aria-hidden="true">
            {SCENES.map((s, i) => (
              // eslint-disable-next-line @next/next/no-img-element -- scrubbed full-bleed keyframes, opacity driven imperatively
              <img
                key={s.file}
                ref={(el) => {
                  sceneRefs.current[i] = el;
                }}
                src={`${SEQ_DIR}/${s.file}`}
                alt=""
                decoding="async"
                fetchPriority={i === 0 ? "high" : "low"}
                draggable={false}
                className="absolute inset-0 h-full w-full object-cover opacity-0 will-change-[opacity,transform]"
              />
            ))}
            <div
              ref={pulseRef}
              className="pointer-events-none absolute h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-0"
              style={{ background: "var(--energy-glow)" }}
            >
              <div
                className="absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full"
                style={{ background: "var(--energy-white)", boxShadow: "var(--trace-glow)" }}
              />
            </div>
          </div>
        )}

        {/* Intro copy — server-rendered, present from first paint */}
        <div ref={introRef} className="wrap relative z-10">
          <p className="micro-label micro-label--blue mb-6">
            BATTERY MANAGEMENT SYSTEMS
          </p>
          <h1 className="type-display max-w-[10ch]">Rewire the Planet.</h1>
          <p className="type-lead mt-8 max-w-[46ch]">
            Electronics and software engineered in India, powering electric
            mobility and energy storage worldwide.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link href="/products" className="btn btn-primary">
              Explore the BMS stack
            </Link>
            <Link href="/contact" className="btn btn-secondary">
              Talk to engineering
            </Link>
          </div>
        </div>

        {/* Finale copy, with a soft white backdrop for legibility over linework */}
        {cinematic && (
          <div
            ref={finaleRef}
            className="pointer-events-none absolute inset-x-0 top-1/2 z-10 -translate-y-1/2 opacity-0"
          >
            <div
              className="absolute -inset-y-24 inset-x-0"
              style={{
                background:
                  "radial-gradient(ellipse 60% 100% at 30% 50%, rgba(255,255,255,0.92) 0%, rgba(255,255,255,0.75) 55%, transparent 100%)",
              }}
              aria-hidden="true"
            />
            <div className="wrap relative">
              <p className="micro-label mb-6">ONE CONTROL LAYER. MOBILITY TO GRID.</p>
              <p className="type-h1 max-w-[10ch]">Rewire the Planet.</p>
              <div className="mt-10 flex flex-wrap gap-4">
                <Link href="/products" className="btn btn-primary">
                  Explore the BMS stack
                </Link>
                <Link href="/contact" className="btn btn-secondary">
                  Talk to engineering
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Skip link for the pinned sequence */}
        {cinematic && (
          <a
            href="#proof"
            className="micro-label absolute bottom-6 right-6 z-20 flex min-h-[44px] items-center border border-grey-200 bg-white/85 px-4 transition-colors hover:border-grey-400"
          >
            SKIP TO SYSTEMS ↓
          </a>
        )}

        {/* Screen-reader summary of the visual sequence */}
        <p className="sr-only">
          Animated sequence: an energy pulse travels through a Webber battery
          management system — sensing cell voltage, balancing cells, monitoring
          thermal state across a metal-core PCB, crossing an isolated CAN
          boundary and closing off a short-circuit path — then the board is
          assembled into a battery pack that powers a two-wheeler, a
          three-wheeler and grid-scale battery energy storage.
        </p>
      </section>
    </div>
  );
}
