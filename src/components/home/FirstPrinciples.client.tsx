"use client";

import { useEffect, useRef, useState } from "react";
import { differentiators } from "@/content/differentiators";
import { useMotion } from "@/components/motion/MotionProvider.client";
import { useIsDesktop } from "@/components/motion/useViewport";

/**
 * Sticky board cross-section: each scroll beat highlights one differentiator.
 * Falls back to a simple stacked list under reduced motion / mobile.
 */
export function FirstPrinciples() {
  const { motionOn } = useMotion();
  const isDesktop = useIsDesktop();
  const wrapRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const sticky = motionOn && isDesktop;

  useEffect(() => {
    if (!sticky) return;
    const el = wrapRef.current;
    if (!el) return;
    const onScroll = () => {
      const rect = el.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      const p = Math.min(1, Math.max(0, -rect.top / total));
      setActive(Math.min(differentiators.length - 1, Math.floor(p * differentiators.length)));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [sticky]);

  if (!sticky) {
    return (
      <div className="mt-16 space-y-6">
        {differentiators.map((d, i) => (
          <DiffPanel key={d.id} d={d} index={i} active />
        ))}
      </div>
    );
  }

  return (
    <div ref={wrapRef} className="relative mt-16" style={{ height: "220vh" }}>
      <div className="sticky top-16 grid min-h-[80vh] grid-cols-2 items-center gap-16">
        <BoardDiagram active={active} />
        <div className="relative">
          {differentiators.map((d, i) => (
            <div
              key={d.id}
              className="transition-opacity duration-500"
              style={{
                opacity: active === i ? 1 : 0,
                position: active === i ? "relative" : "absolute",
                inset: 0,
                pointerEvents: active === i ? "auto" : "none",
              }}
              aria-hidden={active !== i}
            >
              <DiffPanel d={differentiators[i]} index={i} active={active === i} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function DiffPanel({
  d,
  index,
  active,
}: {
  d: (typeof differentiators)[number];
  index: number;
  active: boolean;
}) {
  return (
    <article className={`card p-8 ${active ? "border-blue-200" : ""}`}>
      <p className="micro-label micro-label--blue">
        0{index + 1} / {d.label}
      </p>
      <h3 className="type-h4 mt-4">{d.headline}</h3>
      <dl className="mt-6 space-y-4">
        <div>
          <dt className="micro-label">THE PROBLEM</dt>
          <dd className="type-body mt-1">{d.problem}</dd>
        </div>
        <div>
          <dt className="micro-label">THE APPROACH</dt>
          <dd className="type-body mt-1">{d.approach}</dd>
        </div>
        <div>
          <dt className="micro-label">THE SYSTEM ADVANTAGE</dt>
          <dd className="type-body mt-1">{d.advantage}</dd>
        </div>
      </dl>
      <p className="spec-value mt-6 border-t border-grey-200 pt-4">{d.ipStatus}</p>
    </article>
  );
}

/** Abstract board cross-section; the active zone lights up. */
function BoardDiagram({ active }: { active: number }) {
  const zones = [
    { x: 30, y: 150, w: 110, h: 70 },
    { x: 170, y: 60, w: 120, h: 70 },
    { x: 320, y: 150, w: 110, h: 70 },
    { x: 170, y: 240, w: 120, h: 60 },
    { x: 460, y: 130, w: 80, h: 110 },
  ];
  return (
    <svg viewBox="0 0 580 360" className="w-full" aria-hidden="true">
      <rect x="10" y="30" width="560" height="300" rx="6" fill="var(--grey-50)" stroke="var(--grey-300)" />
      {/* connective traces */}
      <g stroke="var(--grey-300)" fill="none" strokeWidth="1">
        <path d="M140 185 H 170" />
        <path d="M230 130 V 150" />
        <path d="M290 185 H 320" />
        <path d="M230 220 V 240" />
        <path d="M430 185 H 460" />
      </g>
      {zones.map((z, i) => (
        <g key={i}>
          <rect
            x={z.x}
            y={z.y}
            width={z.w}
            height={z.h}
            rx="3"
            fill={active === i ? "var(--blue-50)" : "var(--canvas)"}
            stroke={active === i ? "var(--blue-500)" : "var(--grey-300)"}
            style={{ transition: "all 400ms var(--ease-ui-out)" }}
          />
          <text
            x={z.x + z.w / 2}
            y={z.y + z.h / 2 + 4}
            textAnchor="middle"
            style={{
              font: "500 10px var(--font-mono)",
              letterSpacing: "0.08em",
              fill: active === i ? "var(--blue-700)" : "var(--grey-500)",
              transition: "fill 400ms var(--ease-ui-out)",
            }}
          >
            {["PARALLEL", "CHARGE", "BALANCE", "METAL CORE", "ISO"][i]}
          </text>
        </g>
      ))}
    </svg>
  );
}
