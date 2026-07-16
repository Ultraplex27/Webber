"use client";

import { useMotion } from "./MotionProvider.client";

export function ReduceMotionToggle() {
  const { userReduced, toggleReduced } = useMotion();
  return (
    <button
      type="button"
      onClick={toggleReduced}
      aria-pressed={userReduced}
      className="flex min-h-[44px] items-center gap-2 text-[0.875rem] text-grey-500 transition-colors hover:text-ink"
    >
      <span
        className={`inline-block h-3.5 w-6 rounded-full border transition-colors ${
          userReduced ? "border-blue-700 bg-blue-700" : "border-grey-300 bg-grey-100"
        }`}
        aria-hidden="true"
      >
        <span
          className={`block h-3 w-3 rounded-full bg-white shadow-sm transition-transform ${
            userReduced ? "translate-x-[10px]" : "translate-x-0"
          }`}
        />
      </span>
      Reduce motion
    </button>
  );
}
