"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useMotion } from "@/components/motion/MotionProvider.client";
import { useIsDesktop } from "@/components/motion/useViewport";

/**
 * The home hero.
 *
 * Desktop with motion gets the cinematic sequence: the page opens on the big
 * Webber logo, which shrinks into the header masthead as a freely
 * scroll-scrubbed frame sequence plays (public/images/hero/frames +
 * manifest.json, extracted from Assets/hero-video/Webber Hero Video.mp4) —
 * BMS board with energy pulse, a rider on a two-wheeler, an ESS container
 * yard, and a white CAD/blueprint finale. Pillar call-out copy (PILLAR_COPY)
 * fades in and out as the scrub passes each stop's SNAP_POINTS position;
 * nothing forces the scroll itself to jump there anymore.
 *
 * Everywhere else (mobile, reduced motion, missing frames) gets a static hero
 * of the same copy. The h1 is server-rendered in both.
 */

const FRAMES_DIR = "/images/hero/frames";
const MASTHEAD = "/logos/webber-masthead.png";
/** Scroll fraction over which the big intro logo shrinks into the header corner. */
const INTRO_END = 0.12;
/**
 * Must match `count` in public/images/hero/frames/manifest.json — every
 * frame-number-based fraction below is computed from this. Re-derive them
 * (via frameFraction) if the sequence is ever re-extracted at a different
 * frame count.
 */
const FRAME_TOTAL = 246;
/** Scroll fraction at which 1-indexed frame `n` of FRAME_TOTAL is shown. */
function frameFraction(n: number) {
  return (n - 1) / (FRAME_TOTAL - 1);
}
/** Composed stops: start (logo/board), scooter+rider (frame 103), ESS yard (frame 166), finale (last frame). */
const SNAP_POINTS = [0, frameFraction(103), frameFraction(166), 1];

/** Pillar call-outs that appear only while lingering at their snap point. */
const PILLAR_COPY = [
  {
    center: frameFraction(24),
    label: "ENGINEERING THAT SCALES",
    heading: "From mobility electronics to a connected electrification stack.",
    body: "Webber is moving from mobility-focused electronics towards a connected electrification stack spanning vehicles, telecom and battery energy storage.",
  },
  {
    center: SNAP_POINTS[1],
    label: "TWO-WHEELERS & THREE-WHEELERS",
    heading: "Battery intelligence for daily mobility.",
    body: "75K+ BMS units riding today, 12V–96V, cell to controller.",
  },
  {
    center: SNAP_POINTS[2],
    label: "ENERGY STORAGE SYSTEMS",
    heading: "From C&I strings to utility-scale BESS.",
    body: "Isolated CAN and insulation monitoring — sized for the grid.",
  },
] as const;

type Mode = "probing" | "frames" | "static";

function clamp01(v: number) {
  return Math.min(1, Math.max(0, v));
}
function smooth(p: number, a: number, b: number) {
  const t = clamp01((p - a) / (b - a));
  return t * t * (3 - 2 * t);
}
/** 1 while p sits within `hold` of `center`, easing to 0 over the next `ramp`. */
function bump(p: number, center: number, hold: number, ramp: number) {
  const dist = Math.abs(p - center);
  return 1 - smooth(dist, hold, hold + ramp);
}
function frameSrc(i: number) {
  return `${FRAMES_DIR}/frame-${String(i + 1).padStart(4, "0")}.webp`;
}

export function HeroShell() {
  const { motionOn } = useMotion();
  const isDesktop = useIsDesktop();
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const introBgRef = useRef<HTMLDivElement>(null);
  const introLogoRef = useRef<HTMLImageElement>(null);
  const finaleRef = useRef<HTMLDivElement>(null);
  const pillarRefs = useRef<(HTMLDivElement | null)[]>([]);
  // Where the big intro logo flies to (the header masthead), computed on resize.
  const logoTargets = useRef({ tx: 0, ty: 0, scale: 0.32 });
  const [mode, setMode] = useState<Mode>("probing");
  const [frameCount, setFrameCount] = useState(0);

  const wantsCinematic = motionOn && isDesktop;
  const cinematic = wantsCinematic && mode === "frames";

  // Probe the frame manifest; without it the hero stays static.
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
        /* fall through */
      }
      if (!cancelled) setMode("static");
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

    // The persistent header masthead logo we hand off to (rendered by Header).
    const headerLogo = document.querySelector<HTMLElement>("[data-hero-logo-target]");

    // Measure where the big intro logo must fly to (centre of the header logo).
    const computeLogoTargets = () => {
      const img = introLogoRef.current;
      if (!img || !headerLogo) return;
      const bigW = img.offsetWidth;
      if (!bigW) return;
      const hr = headerLogo.getBoundingClientRect();
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      logoTargets.current = {
        scale: hr.width / bigW,
        tx: hr.left + hr.width / 2 - vw / 2,
        ty: hr.top + hr.height / 2 - vh / 2,
      };
    };

    // ---- progressive loader + blended canvas painter ------------------------
    // HTMLImageElement (not ImageBitmap) keeps frames compressed in memory; a
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

    const apply = (p: number) => {
      currentF = p * (frameCount - 1);
      drawBlend(currentF);

      // Big intro logo shrinks + flies to the header masthead; the header logo
      // fades in as it lands, so it reads as one logo travelling to the corner.
      const t = logoTargets.current;
      const w = smooth(p, 0, INTRO_END);
      // Solid white behind the opening logo, clearing on the first scroll so
      // the footage underneath isn't revealed until the viewer starts moving.
      if (introBgRef.current) {
        introBgRef.current.style.opacity = String(1 - w);
      }
      if (introLogoRef.current) {
        const scale = 1 + (t.scale - 1) * w;
        introLogoRef.current.style.transform = `translate3d(${t.tx * w}px, ${t.ty * w}px, 0) scale(${scale})`;
        introLogoRef.current.style.opacity = String(1 - smooth(p, INTRO_END * 0.72, INTRO_END));
      }
      if (headerLogo) {
        headerLogo.style.opacity = String(smooth(p, INTRO_END * 0.72, INTRO_END));
      }

      if (finaleRef.current) {
        const inn = clamp01((p - 0.94) / 0.05);
        finaleRef.current.style.opacity = String(inn);
        finaleRef.current.style.transform = `translateY(${(1 - inn) * 24}px)`;
        finaleRef.current.style.pointerEvents = inn > 0.5 ? "auto" : "none";
      }

      // Pillar call-outs: fade in only while lingering at their own snap
      // point, fade out again once the scroll moves on toward the next one.
      PILLAR_COPY.forEach((pillar, i) => {
        const el = pillarRefs.current[i];
        if (!el) return;
        const b = bump(p, pillar.center, 0.03, 0.06);
        el.style.opacity = String(b);
        el.style.transform = `translateY(${(1 - b) * 16}px)`;
      });
    };

    (async () => {
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);
      if (cancelled) return;
      gsap.registerPlugin(ScrollTrigger);
      resizeCanvas();
      ro = new ResizeObserver(resizeCanvas);
      if (canvasRef.current) ro.observe(canvasRef.current);
      void loadProgressively();
      computeLogoTargets();
      window.addEventListener("resize", computeLogoTargets);
      // Plain free scrubbing — no auto-jump to the next stop. SNAP_POINTS is
      // still used to time the pillar call-outs and finale as the viewer
      // scrubs past them (see apply/bump above), just not to force scroll.
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
      window.removeEventListener("resize", computeLogoTargets);
      // Restore the header logo when leaving the cinematic hero.
      if (headerLogo) headerLogo.style.opacity = "";
    };
  }, [cinematic, frameCount]);

  return (
    <div ref={wrapRef} className={cinematic ? "relative h-[460vh]" : "relative"} data-hero>
      <section
        className={`${
          cinematic ? "sticky top-0 h-screen" : "relative min-h-screen"
        } flex flex-col justify-center overflow-hidden`}
        aria-label="Webber battery intelligence from 12V to 1200V"
      >
        {cinematic && (
          <canvas ref={canvasRef} aria-hidden="true" className="absolute inset-0 z-0 h-full w-full" />
        )}

        {cinematic && (
          /* Solid white behind the opening logo splash; fades out on the
             first scroll to reveal the footage underneath. */
          <div
            ref={introBgRef}
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 z-[5] bg-white"
          />
        )}

        {/* SEO / a11y heading: always in the DOM, conveyed visually by the hero */}
        <h1 className="sr-only">
          Rewire the Planet. Battery management systems from 12V to 1200V by
          Webber Electro Corp.
        </h1>

        {cinematic ? (
          /* Opening splash: the big Webber logo, which shrinks into the header
             masthead as the scroll sequence begins. */
          <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center">
            {/* eslint-disable-next-line @next/next/no-img-element -- transformed imperatively each scroll frame */}
            <img
              ref={introLogoRef}
              src={MASTHEAD}
              alt=""
              aria-hidden="true"
              fetchPriority="high"
              draggable={false}
              className="w-[min(78vw,520px)] will-change-transform"
            />
          </div>
        ) : (
          /* Static hero: mobile / reduced motion / no frames. No masthead here —
             the header already carries it, and the cinematic splash is the only
             place the lockup earns a second showing. */
          <div className="wrap relative z-10">
            <p className="micro-label micro-label--blue mb-6">
              BATTERY MANAGEMENT SYSTEMS
            </p>
            <p className="type-display max-w-[10ch]" aria-hidden="true">
              Rewire the Planet.
            </p>
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
        )}

        {/* Pillar call-outs: brief copy that appears only while parked on the
            two-wheeler/three-wheeler and ESS snap points, gone otherwise. */}
        {cinematic &&
          PILLAR_COPY.map((pillar, i) => (
            <div
              key={pillar.label}
              ref={(el) => {
                pillarRefs.current[i] = el;
              }}
              className="pointer-events-none absolute inset-x-0 bottom-0 z-10 opacity-0"
              aria-hidden="true"
            >
              {/* Backdrop runs flush to the section's actual bottom edge (not
                  just to the text block) so it never leaves a strip of raw,
                  unfaded footage showing between the text and the bottom. */}
              <div
                className="absolute inset-x-0 -top-28 bottom-0"
                style={{
                  background:
                    "linear-gradient(0deg, rgba(255,255,255,0.92) 0%, rgba(255,255,255,0.92) 55%, transparent 100%)",
                }}
                aria-hidden="true"
              />
              <div className="wrap relative pb-[14%]">
                <p className="micro-label micro-label--blue mb-4">{pillar.label}</p>
                <p className="type-h2 max-w-[34ch]">{pillar.heading}</p>
                <p className="type-body mt-3 max-w-[40ch]">{pillar.body}</p>
              </div>
            </div>
          ))}

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
          Animated sequence: a blue energy pulse travels along a Webber
          battery management system circuit board, then carries the camera
          out into the real world it powers — a rider on an electric
          two-wheeler, a loaded electric three-wheeler, a battery energy
          storage system container yard, and a drone lifting off — before
          resolving into a white technical line drawing of all four
          platforms together.
        </p>
      </section>
    </div>
  );
}
