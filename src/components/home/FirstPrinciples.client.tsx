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
        <DialDiagram active={active} progress={progress} />
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
      {/* Index/label line stays the small tracked micro-label; the Problem/
          Approach/Advantage labels below match the body copy's own font,
          size and case, just bold, instead of the shouting all-caps
          mono/tracking treatment — headline stays display, so the card
          reads as two fonts, not three. */}
      <p className="micro-label micro-label--blue !font-sans">
        0{index + 1} / {d.label}
      </p>
      <h3 className="type-h4 mt-4">{d.headline}</h3>
      <dl className="mt-6 space-y-4">
        <div>
          <dt className="type-body font-bold">The problem</dt>
          <dd className="type-body mt-1">{d.problem}</dd>
        </div>
        <div>
          <dt className="type-body font-bold">The approach</dt>
          <dd className="type-body mt-1">{d.approach}</dd>
        </div>
        <div>
          <dt className="type-body font-bold">The system advantage</dt>
          <dd className="type-body mt-1">{d.advantage}</dd>
        </div>
      </dl>
    </article>
  );
}

const STOP_ANGLES = [-135, -67.5, 0, 67.5, 135];
const SWEEP_START = STOP_ANGLES[0];
const SWEEP_END = STOP_ANGLES[STOP_ANGLES.length - 1];
const TICK_COUNT = 37; // spaced so every 9th tick lands exactly on a stop (270/36 * 9 = 67.5)
const DIAL_CX = 290;
const DIAL_CY = 180;
const R_BEZEL = 75;
const R_FACE = 64;
const R_POINTER = 52;
const R_TICK_IN = 86;
const R_TICK_OUT = 96;
const R_TICK_OUT_MAJOR = 106;
const R_ICONS = 150;

/** Point at `angleDeg` (0 = up, clockwise-positive) and radius `r` from the dial center. */
function polar(angleDeg: number, r: number) {
  const rad = (angleDeg * Math.PI) / 180;
  return { x: DIAL_CX + r * Math.sin(rad), y: DIAL_CY - r * Math.cos(rad) };
}

/**
 * Rotary knob styled like a physical instrument dial: a dense tick ring
 * fills continuously with scroll `progress` (a level-meter reading of how
 * far through the section you are), while a single pointer sits on the
 * knob face and steps to each of the 5 stops as `active` changes — the
 * same prop that drives which label glows, so the pointer and the glowing
 * label can never disagree (the previous version interpolated the pointer
 * toward the *next* stop for a fraction's worth of scroll while the
 * *current* stop was still the one glowing, which read as a visual bug).
 * The step itself animates via a CSS transition on the pointer's rotation,
 * not manual angle interpolation, so it still turns smoothly.
 */
function DialDiagram({ active, progress }: { active: number; progress: number }) {
  const iconNames: TechnicalIconName[] = ["parallel", "charge", "balance", "thermal", "isolation"];
  const labels = ["PARALLEL", "CHARGE", "BALANCE", "METAL CORE", "ISOLATION"];
  const pointerAngle = STOP_ANGLES[active];
  const fillAngle = SWEEP_START + Math.min(1, Math.max(0, progress)) * (SWEEP_END - SWEEP_START);

  return (
    <svg viewBox="0 0 580 360" className="block w-full" aria-hidden="true">
      <defs>
        <linearGradient id="knob-bezel" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#215090" />
          <stop offset="100%" stopColor="#0F253F" />
        </linearGradient>
        <radialGradient id="knob-face" cx="35%" cy="30%" r="75%">
          <stop offset="0%" stopColor="#2c5a94" />
          <stop offset="100%" stopColor="#0F253F" />
        </radialGradient>
        <filter id="board-glow" x="-80%" y="-80%" width="260%" height="260%">
          <feGaussianBlur stdDeviation="4" />
        </filter>
      </defs>
      {/* tick ring: dense minor ticks, every 9th is a longer "stop" tick; fills as progress advances */}
      {Array.from({ length: TICK_COUNT }, (_, i) => {
        const angle = SWEEP_START + (i / (TICK_COUNT - 1)) * (SWEEP_END - SWEEP_START);
        const major = i % 9 === 0;
        const filled = angle <= fillAngle + 0.01;
        const inner = polar(angle, R_TICK_IN);
        const outer = polar(angle, major ? R_TICK_OUT_MAJOR : R_TICK_OUT);
        return (
          <line
            key={i}
            x1={inner.x}
            y1={inner.y}
            x2={outer.x}
            y2={outer.y}
            stroke={filled ? "#215090" : "var(--grey-300)"}
            strokeWidth={major ? 2 : 1}
            strokeLinecap="round"
            style={{ transition: "stroke 200ms linear" }}
          />
        );
      })}

      {/* knob body: dark bezel + lit face, the only "boxed" surface left */}
      <circle cx={DIAL_CX} cy={DIAL_CY} r={R_BEZEL} fill="url(#knob-bezel)" />
      <circle cx={DIAL_CX} cy={DIAL_CY} r={R_FACE} fill="url(#knob-face)" stroke="rgba(255,255,255,.18)" />

      {/* pointer: steps to the active stop, smoothly animated by CSS transition */}
      <g style={{ transformOrigin: `${DIAL_CX}px ${DIAL_CY}px`, transform: `rotate(${pointerAngle}deg)`, transition: "transform 550ms var(--ease-ui-out)" }}>
        <circle cx={DIAL_CX} cy={DIAL_CY - R_POINTER} r="9" fill="var(--blue-500)" opacity=".45" filter="url(#board-glow)" />
        <path d={`M ${DIAL_CX} ${DIAL_CY - R_POINTER - 8} l 8 13 h -16 Z`} fill="#ffffff" />
      </g>

      {/* five stops: icon + label, fixed positions around the dial */}
      {STOP_ANGLES.map((angle, i) => {
        const iconPt = polar(angle, R_ICONS);
        const isActive = active === i;
        return (
          <g key={i}>
            <foreignObject x={iconPt.x - 22} y={iconPt.y - 22} width="44" height="44">
              <div
                className="flex h-full w-full items-center justify-center"
                style={{ color: isActive ? "#215090" : "var(--grey-500)", transition: "color 400ms var(--ease-ui-out)" }}
              >
                <TechnicalIcon name={iconNames[i]} className="h-9 w-9" />
              </div>
            </foreignObject>
            <text
              x={iconPt.x}
              y={iconPt.y + 38}
              textAnchor="middle"
              style={{ font: `${isActive ? 600 : 500} 10px var(--font-sans)`, letterSpacing: "0.08em", fill: isActive ? "#215090" : "var(--grey-500)", transition: "fill 400ms var(--ease-ui-out)" }}
            >
              {labels[i]}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
