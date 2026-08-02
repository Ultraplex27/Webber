"use client";

import { useEffect, useRef, useState } from "react";
import { differentiators } from "@/content/differentiators";
import { useMotion } from "@/components/motion/MotionProvider.client";
import { useIsDesktop } from "@/components/motion/useViewport";
import { TechnicalIcon, type TechnicalIconName } from "@/components/ui/TechnicalIcon";

/**
 * Sticky board cross-section: each scroll beat highlights one differentiator.
 * Falls back to a simple stacked list under reduced motion / mobile.
 */
export function FirstPrinciples() {
  const { motionOn } = useMotion();
  const isDesktop = useIsDesktop();
  const wrapRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [progress, setProgress] = useState(0);
  const sticky = motionOn && isDesktop;

  useEffect(() => {
    if (!sticky) return;
    const el = wrapRef.current;
    if (!el) return;
    const onScroll = () => {
      const rect = el.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      const p = Math.min(1, Math.max(0, -rect.top / total));
      setProgress(p);
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
        <BoardDiagram active={active} progress={progress} />
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
function BoardDiagram({ active, progress }: { active: number; progress: number }) {
  const iconNames: TechnicalIconName[] = ["parallel", "charge", "balance", "thermal", "isolation"];
  const labels = ["PARALLEL", "CHARGE", "BALANCE", "METAL CORE", "ISOLATION"];
  const zones = [
    { x: 30, y: 150, w: 110, h: 70 },
    { x: 170, y: 60, w: 120, h: 70 },
    { x: 320, y: 150, w: 110, h: 70 },
    { x: 170, y: 240, w: 120, h: 60 },
    { x: 460, y: 130, w: 80, h: 110 },
  ];
  return (
    <div className="relative overflow-hidden rounded-[8px] border border-blue-200 bg-[linear-gradient(135deg,#215090_0%,#0F253F_100%)] p-[1px] shadow-[0_20px_50px_rgba(15,37,63,0.16)]">
      <div className="absolute inset-x-0 top-0 h-px bg-white/55" />
      <svg viewBox="0 0 580 360" className="relative block w-full" aria-hidden="true">
      <defs>
        <linearGradient id="board-active" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#215090" />
          <stop offset="100%" stopColor="#0F253F" />
        </linearGradient>
        <filter id="board-glow" x="-80%" y="-80%" width="260%" height="260%">
          <feGaussianBlur stdDeviation="4" />
        </filter>
      </defs>
      <rect x="10" y="30" width="560" height="300" rx="6" fill="rgba(255,255,255,.94)" stroke="rgba(179,205,235,.78)" />
      <rect x="30" y="43" width={Math.max(0, 520 * progress)} height="2" rx="1" fill="url(#board-active)" style={{ transition: "width 160ms linear" }} />
      {/* connective traces */}
      <g stroke="var(--grey-300)" fill="none" strokeWidth="1">
        <path d="M140 185 H 170" />
        <path d="M230 130 V 150" />
        <path d="M290 185 H 320" />
        <path d="M230 220 V 240" />
        <path d="M430 185 H 460" />
      </g>
      {zones.map((z, i) => (
        <g key={i} style={{ opacity: active === i ? 1 : 0.64, transformOrigin: `${z.x + z.w / 2}px ${z.y + z.h / 2}px`, transform: active === i ? "scale(1.2)" : "scale(.94)", transition: "opacity 420ms var(--ease-ui-out), transform 420ms var(--ease-ui-out)" }}>
          {active === i && <rect x={z.x - 5} y={z.y - 5} width={z.w + 10} height={z.h + 10} rx="6" fill="var(--blue-500)" opacity=".28" filter="url(#board-glow)" />}
          <rect
            x={z.x}
            y={z.y}
            width={z.w}
            height={z.h}
            rx="3"
            fill={active === i ? "url(#board-active)" : "var(--canvas)"}
            stroke={active === i ? "#215090" : "var(--grey-300)"}
            style={{ transition: "all 400ms var(--ease-ui-out)" }}
          />
          <foreignObject x={z.x + z.w / 2 - 17} y={z.y + 10} width="34" height="34">
            <div
              className="flex h-full w-full items-center justify-center"
              style={{ color: active === i ? "#ffffff" : "var(--grey-500)", transition: "color 400ms var(--ease-ui-out)" }}
            >
              <TechnicalIcon name={iconNames[i]} className="h-7 w-7" />
            </div>
          </foreignObject>
          <text x={z.x + z.w / 2} y={z.y + z.h - 12} textAnchor="middle" style={{ font: "500 8px var(--font-mono)", letterSpacing: "0.08em", fill: active === i ? "#ffffff" : "var(--grey-500)", transition: "fill 400ms var(--ease-ui-out)" }}>
            {labels[i]}
          </text>
        </g>
      ))}
      </svg>
      <div className="flex items-center justify-between border-t border-white/20 px-4 py-2 text-[9px] font-medium tracking-[.12em] text-white/80">
        <span>WEBBER ENERGY ARCHITECTURE</span>
        <span>0{active + 1} / 05</span>
      </div>
    </div>
  );
}
