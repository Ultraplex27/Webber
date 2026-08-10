"use client";

import Link from "next/link";
import { useRef } from "react";

const HOLD_MS = 3000;

/**
 * A continuously playing hero keeps the opening cinematic without making page
 * progress depend on scroll position. The source footage lives in /public so
 * the browser can stream it natively; looping is driven manually (rather than
 * the `loop` attribute) so the last frame holds for HOLD_MS before restarting.
 */
export function HeroShell() {
  const videoRef = useRef<HTMLVideoElement>(null);

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
        poster="/images/hero/frames/frame-0180.webp"
        aria-hidden="true"
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
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/72 to-white/20"
      />

      <div className="wrap relative z-10">
        <p className="micro-label micro-label--blue mb-6">BATTERY MANAGEMENT SYSTEMS</p>
        <h1 className="type-display max-w-[10ch]">Rewire the Planet.</h1>
        <p className="type-lead mt-8 max-w-[46ch]">
          Electronics and software engineered in India, powering electric mobility and
          energy storage worldwide.
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
    </section>
  );
}
