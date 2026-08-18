"use client";

import { useRef, useState } from "react";

const HOLD_MS = 3000;

/**
 * Pillar call-outs cross-fade in sync with the hero video's three acts — a
 * BMS board install, a 2W/3W street ride, then a fleet + BESS yard — instead
 * of being tied to scroll position like the old canvas-scrubbed hero. Each
 * `time` is that act's rough midpoint in the ~5.6s clip (confirmed by eye
 * against the extracted frames); whichever pillar's `time` the video is
 * currently closest to is shown, so the copy just tracks playback. The last
 * pillar holds through the post-loop pause.
 */
const PILLARS = [
  {
    time: 1.0,
    label: "ENGINEERING THAT SCALES",
    accent: "From mobility electronics",
    heading: "to a connected grid stack.",
  },
  {
    time: 3.0,
    label: "TWO-WHEELERS & THREE-WHEELERS",
    accent: "75K+ BMS units riding",
    heading: "today, 12V–96V.",
  },
  {
    time: 4.8,
    label: "ENERGY STORAGE SYSTEMS",
    accent: "Isolated CAN monitoring,",
    heading: "sized for the grid.",
  },
] as const;

/**
 * A continuously playing hero keeps the opening cinematic without making page
 * progress depend on scroll position. The source footage lives in /public so
 * the browser can stream it natively; looping is driven manually (rather than
 * the `loop` attribute) so the last frame holds for HOLD_MS before restarting.
 */
export function HeroShell() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [activePillar, setActivePillar] = useState(0);

  const trackTime = () => {
    const t = videoRef.current?.currentTime ?? 0;
    let nearest = 0;
    let nearestDist = Infinity;
    PILLARS.forEach((pillar, i) => {
      const d = Math.abs(t - pillar.time);
      if (d < nearestDist) {
        nearestDist = d;
        nearest = i;
      }
    });
    setActivePillar((current) => (current === nearest ? current : nearest));
  };

  return (
    <section
      className="relative flex min-h-screen items-end overflow-hidden bg-ink py-24 sm:items-center"
      aria-label="Webber battery intelligence from 12V to 1200V"
    >
      <video
        ref={videoRef}
        className="absolute inset-0 h-full w-full object-cover"
        autoPlay
        muted
        playsInline
        poster="/images/hero/frames/frame-0167.webp"
        aria-hidden="true"
        onTimeUpdate={trackTime}
        onEnded={() => {
          window.setTimeout(() => {
            const video = videoRef.current;
            if (!video) return;
            video.currentTime = 0;
            video.play();
          }, HOLD_MS);
        }}
      >
        <source src="/videos/webber-hero.mp4" type="video/mp4" />
      </video>
      {/* A light scrim, just enough to keep the white/teal text legible over
          any frame — the video itself stays visible, not washed out. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-r from-black/55 via-black/20 to-transparent"
      />

      <div className="wrap relative z-10">
        <div className="relative min-h-[168px] max-w-[460px]" aria-hidden="true">
          {PILLARS.map((pillar, i) => (
            <div
              key={pillar.label}
              className={`absolute inset-0 transition-all duration-700 ease-out motion-reduce:transition-none ${
                activePillar === i ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
              }`}
            >
              <p className="micro-label !text-white/60 mb-3">{pillar.label}</p>
              <p className="font-display font-bold tracking-tight text-white text-[clamp(1.75rem,4.5vw,3.5rem)] leading-[1.12]">
                <span className="text-spindle">{pillar.accent}</span> {pillar.heading}
              </p>
            </div>
          ))}
        </div>

        {/* SEO / a11y heading: not shown visually, conveyed by the pillar
            copy above instead. */}
        <h1 className="sr-only">
          Rewire the Planet. Battery management systems from 12V to 1200V by
          Webber Electro Corp.
        </h1>
      </div>
    </section>
  );
}
