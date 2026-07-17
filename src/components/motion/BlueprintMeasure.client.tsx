"use client";

import { useEffect, useRef, useState } from "react";
import { useMotion } from "./MotionProvider.client";

/**
 * Self-drafting blueprint annotation.
 *
 * A CAD-style dimension line that draws itself down the left margin as its
 * section enters view: extension caps, arrowheads and a rotated mono callout,
 * as if the page were being drafted. Applied to consecutive sections it forms
 * a thread the eye can follow to the bottom of the page.
 *
 * Lives in the wrap's padding so it never collides with content, and is hidden
 * below lg where there is no margin to spare.
 *
 *   <section className="section relative">
 *     <BlueprintMeasure label="02 / TRAJECTORY" />
 */
export function BlueprintMeasure({
  label,
  accent = false,
}: {
  label: string;
  /** Blue instead of grey. Use on at most one section, where the thread resolves. */
  accent?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { motionOn } = useMotion();
  const [drawn, setDrawn] = useState(false);

  useEffect(() => {
    if (!motionOn) return;
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setDrawn(true);
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -12% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [motionOn]);

  // Without motion the drawing is simply already complete.
  const on = drawn || !motionOn;
  const stroke = accent ? "var(--blue-500)" : "var(--grey-400)";
  const X = 7; // px: the dimension line's axis within this column

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none absolute inset-y-0 left-3 hidden select-none lg:block"
    >
      {/* dimension line: draws top to bottom */}
      <span
        className="absolute top-0 w-px origin-top"
        style={{
          left: X,
          height: "100%",
          background: stroke,
          transform: `scaleY(${on ? 1 : 0})`,
          transition: "transform 850ms var(--ease-technical)",
        }}
      />

      {/* arrowheads, pointing out to the extension caps */}
      <span
        className="absolute top-0"
        style={{
          left: X - 3,
          width: 0,
          height: 0,
          borderLeft: "3px solid transparent",
          borderRight: "3px solid transparent",
          borderBottom: `6px solid ${stroke}`,
          opacity: on ? 1 : 0,
          transition: "opacity 300ms var(--ease-ui-out) 780ms",
        }}
      />
      <span
        className="absolute bottom-0"
        style={{
          left: X - 3,
          width: 0,
          height: 0,
          borderLeft: "3px solid transparent",
          borderRight: "3px solid transparent",
          borderTop: `6px solid ${stroke}`,
          opacity: on ? 1 : 0,
          transition: "opacity 300ms var(--ease-ui-out) 780ms",
        }}
      />

      {/* extension caps */}
      {(["top", "bottom"] as const).map((pos) => (
        <span
          key={pos}
          className="absolute left-0 h-px origin-left"
          style={{
            [pos]: 0,
            width: 15,
            background: stroke,
            transform: `scaleX(${on ? 1 : 0})`,
            transition: "transform 320ms var(--ease-ui-out) 800ms",
          }}
        />
      ))}

      {/* rotated mono callout */}
      <span
        className="micro-label absolute top-1/2 whitespace-nowrap"
        style={{
          left: X + 6,
          writingMode: "vertical-rl",
          transform: `translateY(-50%) rotate(180deg) translateX(${on ? 0 : 5}px)`,
          color: accent ? "var(--blue-600)" : "var(--grey-500)",
          opacity: on ? 1 : 0,
          transition:
            "opacity 420ms var(--ease-ui-out) 880ms, transform 420ms var(--ease-ui-out) 880ms",
        }}
      >
        {label}
      </span>
    </div>
  );
}
