"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useMotion } from "@/components/motion/MotionProvider.client";
import { useIsDesktop } from "@/components/motion/useViewport";
import { getLenis } from "@/components/motion/lenisInstance";

/**
 * The home hero.
 *
 * Desktop with motion gets the cinematic sequence: the page opens on the big
 * Webber logo, which shrinks into the header masthead as a scroll-scrubbed
 * frame sequence plays (public/images/hero/frames + manifest.json, extracted
 * from Assets/hero-video — see docs/HERO-VIDEO-HIGGSFIELD.md), snapping through
 * five composed stops and resolving on the "Rewire the Planet" finale.
 *
 * Everywhere else (mobile, reduced motion, missing frames) gets a static hero
 * of the same copy. The h1 is server-rendered in both.
 */

const FRAMES_DIR = "/images/hero/frames";
const MASTHEAD = "/logos/webber-masthead.png";
/** Scroll fraction over which the big intro logo shrinks into the header corner. */
const INTRO_END = 0.12;
/** Composed stops: logo splash, sensing macro, metal-core plane, packs, finale. */
const SNAP_POINTS = [0, 0.24, 0.4, 0.62, 1];
/** Seconds the auto-playthrough takes to travel the whole pinned hero. */
const AUTOPLAY_SECONDS = 9;

type Mode = "probing" | "frames" | "static";

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
  const introLogoRef = useRef<HTMLImageElement>(null);
  const finaleRef = useRef<HTMLDivElement>(null);
  // Where the big intro logo flies to (the header masthead), computed on resize.
  const logoTargets = useRef({ tx: 0, ty: 0, scale: 0.32 });
  // Auto-playthrough runs at most once per page load.
  const autoplayed = useRef(false);
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

    const finePointer = window.matchMedia("(pointer: fine)").matches;

    // ---- auto-playthrough ---------------------------------------------------
    // On the first scroll the page glides itself through the pinned hero, so the
    // whole sequence plays without the viewer having to scrub 460vh by hand. Any
    // real input hands control straight back, so this assists rather than traps:
    // it drives the scroll position (not just the visuals), which is what lets
    // the viewer end up genuinely past the hero when it finishes.
    const auto = { active: false, raf: 0, graceUntil: 0 };

    const onUserInput = () => {
      // The gesture that *started* the playthrough keeps firing events (wheel
      // momentum); ignore its tail so it doesn't cancel itself immediately.
      if (performance.now() < auto.graceUntil) return;
      stopAuto();
    };

    function stopAuto() {
      if (!auto.active) return;
      auto.active = false;
      cancelAnimationFrame(auto.raf);
      // Re-target Lenis at where we are now, which halts its programmatic glide
      // without a jerk.
      getLenis()?.scrollTo(window.scrollY, { immediate: true, force: true });
      window.removeEventListener("wheel", onUserInput);
      window.removeEventListener("touchstart", onUserInput);
      window.removeEventListener("keydown", onUserInput);
    }

    const startAuto = () => {
      const el = wrapRef.current;
      if (!el) return;
      const total = el.offsetHeight - window.innerHeight;
      const endY = el.offsetTop + total;
      const startY = window.scrollY;
      const distance = endY - startY;
      if (distance <= 8 || total <= 0) return;

      auto.active = true;
      auto.graceUntil = performance.now() + 700;
      window.addEventListener("wheel", onUserInput, { passive: true });
      window.addEventListener("touchstart", onUserInput, { passive: true });
      window.addEventListener("keydown", onUserInput);

      const seconds = AUTOPLAY_SECONDS * (distance / total);
      const lenis = getLenis();
      if (lenis) {
        // linear easing so the footage plays at an even, video-like rate
        lenis.scrollTo(endY, {
          duration: seconds,
          easing: (t) => t,
          force: true,
          onComplete: stopAuto,
        });
        return;
      }
      const t0 = performance.now();
      const step = (now: number) => {
        if (!auto.active) return;
        const t = Math.min(1, (now - t0) / (seconds * 1000));
        window.scrollTo(0, startY + distance * t);
        if (t < 1) auto.raf = requestAnimationFrame(step);
        else stopAuto();
      };
      auto.raf = requestAnimationFrame(step);
    };

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
      // First sign of scrolling from the top: take over and play it through.
      if (!autoplayed.current && finePointer && p > 0.006) {
        autoplayed.current = true;
        startAuto();
      }

      currentF = p * (frameCount - 1);
      drawBlend(currentF);

      // Big intro logo shrinks + flies to the header masthead; the header logo
      // fades in as it lands, so it reads as one logo travelling to the corner.
      const t = logoTargets.current;
      const w = smooth(p, 0, INTRO_END);
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
      // Snap-assist so each scroll settles on the next stop — pointer devices
      // only (touch keeps native scrubbing to avoid fighting momentum). Snap
      // stays out of the auto-playthrough's way on its own: it only fires once
      // scrolling stops, which during the glide it never does.
      const trigger = ScrollTrigger.create({
        trigger: wrap,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.45,
        snap: finePointer
          ? {
              snapTo: SNAP_POINTS,
              duration: { min: 0.25, max: 0.7 },
              delay: 0.05,
              ease: "power1.inOut",
            }
          : undefined,
        onUpdate: (self) => apply(self.progress),
      });
      st = trigger;
      // Landing part-way in (a reload, or a #hash): the viewer is not at the
      // top, so there is nothing to play them through.
      if (trigger.progress > 0.02) autoplayed.current = true;
      apply(trigger.progress);
    })();

    return () => {
      cancelled = true;
      stopAuto();
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
          <canvas ref={canvasRef} aria-hidden="true" className="absolute inset-0 h-full w-full" />
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
          management system, sensing cell voltage, balancing cells, monitoring
          thermal state across a metal-core PCB, crossing an isolated CAN
          boundary and closing off a short-circuit path, then the board is
          assembled into a battery pack that powers a two-wheeler, a
          three-wheeler and grid-scale battery energy storage.
        </p>
      </section>
    </div>
  );
}
