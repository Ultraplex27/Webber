"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { useMotion } from "./MotionProvider.client";

interface RevealProps {
  children: ReactNode;
  /** viewport trigger point as a fraction of viewport height (default 0.82) */
  at?: number;
  delayMs?: number;
  className?: string;
  as?: "div" | "section" | "li" | "span";
}

/** Fade-and-rise entrance at 82% viewport (spec: Reveal, 420–600ms). */
export function Reveal({
  children,
  at = 0.82,
  delayMs = 0,
  className = "",
  as: Tag = "div",
}: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);
  const { motionOn } = useMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!motionOn) {
      el.style.opacity = "";
      el.style.transform = "";
      return;
    }
    el.style.opacity = "0";
    el.style.transform = "translateY(24px)";
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const node = entry.target as HTMLElement;
          node.style.transition = `opacity 520ms var(--ease-ui-out) ${delayMs}ms, transform 520ms var(--ease-ui-out) ${delayMs}ms`;
          node.style.opacity = "1";
          node.style.transform = "translateY(0)";
          io.unobserve(node);
        }
      },
      { rootMargin: `0px 0px -${Math.round((1 - at) * 100)}% 0px` }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [motionOn, at, delayMs]);

  return (
    <Tag ref={ref as never} className={className}>
      {children}
    </Tag>
  );
}
