"use client";

import { useState } from "react";

interface LogoItem {
  name: string;
  logo: string;
}

/**
 * Auto-scrolling logo carousel on white cards. The track holds two identical
 * copies of the set; a CSS transform shifts by exactly half for a seamless
 * loop. Pauses on hover / keyboard focus, and stops (becoming a scrollable
 * row) under reduced motion — see the .marquee rules in globals.css.
 */
export function LogoRail({
  items,
  label,
  reverse = false,
}: {
  items: readonly LogoItem[];
  label: string;
  reverse?: boolean;
}) {
  const sequence = [...items, ...items];
  return (
    <div>
      <p className="micro-label mb-5">{label}</p>
      <div className="marquee" aria-label={label}>
        <ul className={`marquee-track ${reverse ? "marquee-track--reverse" : ""}`}>
          {sequence.map((item, i) => (
            <li
              key={`${item.name}-${i}`}
              className="logo-card"
              aria-hidden={i >= items.length ? true : undefined}
            >
              <Logo {...item} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function Logo({ name, logo }: LogoItem) {
  const [failed, setFailed] = useState(false);
  if (failed) {
    return <span className="micro-label text-grey-500">{name}</span>;
  }
  return (
    // eslint-disable-next-line @next/next/no-img-element -- static logo asset with a text fallback
    <img
      src={logo}
      alt={name}
      className="max-h-full max-w-full object-contain"
      loading="lazy"
      draggable={false}
      onError={() => setFailed(true)}
    />
  );
}
