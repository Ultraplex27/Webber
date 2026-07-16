"use client";

import { useState } from "react";

interface SmartImageProps {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  /** aspect ratio, e.g. "4 / 3" — applied to the placeholder frame */
  ratio?: string;
  /** label shown on the technical placeholder when the asset is missing */
  placeholderLabel?: string;
  loading?: "lazy" | "eager";
}

/**
 * Renders the real asset when it exists; falls back to a technical
 * placeholder tile when the file has not been generated yet
 * (see IMAGE-ASSETS.md for the asset manifest).
 */
export function SmartImage({
  src,
  alt,
  className = "",
  imgClassName = "",
  ratio = "4 / 3",
  placeholderLabel,
  loading = "lazy",
}: SmartImageProps) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={`grid-bg relative overflow-hidden rounded-[6px] border border-grey-200 bg-grey-50 ${className}`}
        style={{ aspectRatio: ratio }}
      >
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 p-4 text-center">
          <svg
            width="48"
            height="36"
            viewBox="0 0 48 36"
            fill="none"
            aria-hidden="true"
          >
            <rect x="1" y="1" width="46" height="34" rx="2" stroke="#BAC4D1" />
            <path d="M6 24 L16 14 L24 22 L30 16 L42 28" stroke="#94A0B2" strokeWidth="1" />
            <circle cx="36" cy="10" r="3" stroke="#2E7BFF" />
          </svg>
          <span className="micro-label">
            {placeholderLabel ?? "ASSET PENDING"}
          </span>
        </div>
      </div>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element -- graceful onError fallback needs a plain img
    <img
      src={src}
      alt={alt}
      loading={loading}
      onError={() => setFailed(true)}
      className={`${className} ${imgClassName}`}
      style={{ aspectRatio: ratio, objectFit: "cover", width: "100%" }}
    />
  );
}
