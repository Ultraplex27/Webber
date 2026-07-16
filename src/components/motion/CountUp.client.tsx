"use client";

import { useEffect, useRef, useState } from "react";
import { useMotion } from "./MotionProvider.client";

interface CountUpProps {
  /** numeric end value */
  value: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  durationMs?: number;
  className?: string;
}

/** Counter that runs once when it reaches 72% of viewport (spec). */
export function CountUp({
  value,
  decimals = 0,
  prefix = "",
  suffix = "",
  durationMs = 1100,
  className = "",
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const { motionOn } = useMotion();
  const [display, setDisplay] = useState(0);
  const ran = useRef(false);

  useEffect(() => {
    if (!motionOn) return;
    const el = ref.current;
    if (!el || ran.current) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (!entries.some((e) => e.isIntersecting) || ran.current) return;
        ran.current = true;
        io.disconnect();
        const start = performance.now();
        const tick = (now: number) => {
          const t = Math.min(1, (now - start) / durationMs);
          // ease-technical
          const eased = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
          setDisplay(value * eased);
          if (t < 1) requestAnimationFrame(tick);
          else setDisplay(value);
        };
        requestAnimationFrame(tick);
      },
      { rootMargin: "0px 0px -28% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [motionOn, value, durationMs]);

  // Without motion (SSR, reduced motion) show the final value directly.
  const shown = motionOn ? display : value;
  const formatted = shown.toLocaleString("en-IN", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });

  return (
    <span ref={ref} className={className}>
      {prefix}
      {formatted}
      {suffix}
    </span>
  );
}
