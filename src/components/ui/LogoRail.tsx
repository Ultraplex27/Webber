"use client";

import { useCallback, useRef, useState } from "react";

interface LogoItem {
  name: string;
  logo: string;
  /** Multiplier on the area-normalized target size, for logos that still read as too big/small next to the rest after auto-sizing (e.g. a wordmark whose horizontal sprawl draws the eye more than its area suggests). Defaults to 1. */
  scale?: number;
}

/**
 * Auto-scrolling logo carousel on white cards. The track holds two identical
 * copies of the set; a CSS transform shifts by exactly half for a seamless
 * loop. Pauses on hover / keyboard focus, and stops (becoming a scrollable
 * row) under reduced motion — see the .marquee rules in globals.css.
 */
export function LogoRail({
  items,
  label,
  reverse = false,
}: {
  items: readonly LogoItem[];
  label: string;
  reverse?: boolean;
}) {
  const sequence = [...items, ...items];
  return (
    <div>
      <p className="micro-label mb-5">{label}</p>
      <div className="marquee" aria-label={label}>
        <ul className={`marquee-track ${reverse ? "marquee-track--reverse" : ""}`}>
          {sequence.map((item, i) => (
            <li
              key={`${item.name}-${i}`}
              className="logo-card"
              aria-hidden={i >= items.length ? true : undefined}
            >
              <Logo {...item} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/**
 * Per-variant target box: partner/customer logos range from tall square
 * marks to wide flat wordmarks, so sizing every logo to the same *height*
 * (the obvious first move) left wordmarks like "Baxy Mobility" or "Texas
 * Instruments" rendering 3-4x wider — and visually much bigger — than a
 * square mark like Trontek's. Instead each logo is scaled so its rendered
 * box has roughly the same *area*, clamped so extreme aspect ratios (a
 * banner-wide wordmark, a tall narrow monogram) still fit the card.
 */
const SIZE = {
  base: { area: 6200, minH: 26, maxH: 84, minW: 60, maxW: 220 },
  sm: { area: 2200, minH: 17, maxH: 48, minW: 40, maxW: 150 },
} as const;

/** A single logo image, area-normalized to its variant's target box, with a typographic fallback if the file is missing. */
export function Logo({
  name,
  logo,
  scale = 1,
  size = "base",
}: LogoItem & { size?: keyof typeof SIZE }) {
  const [failed, setFailed] = useState(false);
  const [dims, setDims] = useState<{ w: number; h: number } | null>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  const measure = useCallback(
    (naturalWidth: number, naturalHeight: number) => {
      const { minH, maxH, minW, maxW } = SIZE[size];
      const area = SIZE[size].area * scale * scale;
      const aspect = naturalWidth / naturalHeight;
      // Natural (unclamped) box for this logo at the target area.
      const h0 = Math.sqrt(area / aspect);
      const w0 = h0 * aspect;
      // Clamping h and w independently in sequence can push the second
      // clamp back out of the first one's bound (e.g. a portrait logo
      // widened to hit minW ends up taller than maxH again). Instead find
      // one uniform scale factor that respects all four bounds; when the
      // min- and max-bounds conflict (an extreme aspect ratio can't hit
      // both), keep the card intact by honoring the max bounds.
      const upper = Math.min(maxH / h0, maxW / w0);
      const lower = Math.max(minH / h0, minW / w0);
      const factor = lower <= upper ? Math.min(Math.max(1, lower), upper) : upper;
      setDims({ w: w0 * factor, h: h0 * factor });
    },
    [size, scale],
  );

  const handleLoad = () => {
    const img = imgRef.current;
    if (img) measure(img.naturalWidth, img.naturalHeight);
  };

  if (failed) {
    return <span className="micro-label text-grey-500">{name}</span>;
  }
  return (
    // eslint-disable-next-line @next/next/no-img-element -- static logo asset with a text fallback
    <img
      ref={imgRef}
      src={logo}
      alt={name}
      className="max-h-full max-w-full object-contain"
      style={dims ? { width: dims.w, height: dims.h } : undefined}
      loading="lazy"
      draggable={false}
      onLoad={handleLoad}
      onError={() => setFailed(true)}
    />
  );
}
