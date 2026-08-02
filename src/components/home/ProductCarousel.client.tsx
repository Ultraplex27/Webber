"use client";

import Link from "next/link";
import { useEffect, useLayoutEffect, useRef } from "react";
import { products } from "@/content/products";
import { ProductCard } from "@/components/product/ProductCard";

/**
 * Infinite-looping product carousel: the track renders three back-to-back
 * copies of the product list and starts scrolled into the middle copy.
 * Prev/next always animate one card at a time; once the settled position
 * drifts into the outer copies, we silently snap back to the equivalent
 * card in the middle copy (identical markup, so the jump is invisible) —
 * that's what makes stepping past either end loop instead of dead-ending.
 */
const LOOP_COPIES = 3;
const middleStart = products.length;
const extended = Array.from({ length: products.length * LOOP_COPIES }, (_, i) => ({
  key: `${products[i % products.length].slug}-${i}`,
  product: products[i % products.length],
}));

export function ProductCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);

  const cardStep = () => {
    const track = trackRef.current;
    const first = track?.children[0] as HTMLElement | undefined;
    if (!track || !first) return 0;
    const gap = parseFloat(getComputedStyle(track).columnGap || "0");
    return first.offsetWidth + gap;
  };

  // Start already inside the middle copy, before first paint, so there's no
  // flash of the first copy's start.
  useLayoutEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    track.scrollLeft = middleStart * cardStep();
  }, []);

  // Snap any settled scroll position in an outer copy back to its
  // equivalent in the middle copy, instantly and invisibly.
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    let settleTimer: ReturnType<typeof setTimeout>;
    const normalize = () => {
      const step = cardStep();
      if (step <= 0) return;
      const idx = Math.round(track.scrollLeft / step);
      if (idx < middleStart || idx >= middleStart + products.length) {
        const normalized =
          middleStart + (((idx - middleStart) % products.length) + products.length) % products.length;
        track.scrollLeft = normalized * step;
      }
    };
    const onScroll = () => {
      clearTimeout(settleTimer);
      settleTimer = setTimeout(normalize, 120);
    };
    track.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      track.removeEventListener("scroll", onScroll);
      clearTimeout(settleTimer);
    };
  }, []);

  const step = (dir: 1 | -1) => {
    const track = trackRef.current;
    const s = cardStep();
    if (!track || s <= 0) return;
    const current = Math.round(track.scrollLeft / s);
    track.scrollTo({ left: (current + dir) * s, behavior: "smooth" });
  };

  return (
    <div>
      <div className="relative">
        <div
          ref={trackRef}
          className="flex snap-x snap-mandatory gap-6 overflow-x-auto pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          role="region"
          aria-label="Product carousel"
        >
          {extended.map(({ key, product }, i) => {
            // Only the middle copy is the "real" one for assistive tech —
            // the clones either side exist purely so the loop has somewhere
            // to scroll into, and would otherwise read each product 3x.
            const isClone = i < middleStart || i >= middleStart + products.length;
            return (
              <div
                key={key}
                className="w-[280px] shrink-0 snap-start sm:w-[320px]"
                aria-hidden={isClone || undefined}
                inert={isClone ? true : undefined}
              >
                <ProductCard product={product} />
              </div>
            );
          })}
        </div>

        <button
          type="button"
          aria-label="Previous product"
          onClick={() => step(-1)}
          className="absolute -left-2 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-grey-200 bg-white/90 text-blue-700 shadow-sm backdrop-blur-sm transition-colors hover:border-blue-300 sm:-left-5"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
        <button
          type="button"
          aria-label="Next product"
          onClick={() => step(1)}
          className="absolute -right-2 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-grey-200 bg-white/90 text-blue-700 shadow-sm backdrop-blur-sm transition-colors hover:border-blue-300 sm:-right-5"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M9 6l6 6-6 6" />
          </svg>
        </button>
      </div>

      <div className="mt-8 flex justify-center">
        <Link href="/products" className="btn btn-secondary">
          View all products
        </Link>
      </div>
    </div>
  );
}
