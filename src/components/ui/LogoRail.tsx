"use client";

import { useState } from "react";

interface LogoItem {
  name: string;
  logo: string;
}

/** Restrained logo row; missing SVGs fall back to typographic chips. */
export function LogoRail({ items, label }: { items: readonly LogoItem[]; label: string }) {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:gap-8">
      <p className="micro-label w-40 shrink-0">{label}</p>
      <ul className="flex flex-wrap items-center gap-x-6 gap-y-4">
        {items.map((item) => (
          <li key={item.name} className="flex h-20 w-44 items-center justify-center">
            <Logo {...item} />
          </li>
        ))}
      </ul>
    </div>
  );
}

function Logo({ name, logo }: LogoItem) {
  const [failed, setFailed] = useState(false);
  if (failed) {
    return (
      <span className="micro-label border border-grey-200 px-3 py-2 text-grey-500">
        {name}
      </span>
    );
  }
  return (
    // eslint-disable-next-line @next/next/no-img-element -- logo files are static assets with a text fallback
    <img
      src={logo}
      alt={name}
      className="max-h-14 max-w-full object-contain opacity-90 transition-opacity hover:opacity-100"
      loading="lazy"
      onError={() => setFailed(true)}
    />
  );
}
