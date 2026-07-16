"use client";

import Link from "next/link";
import { useState } from "react";

interface RailStop {
  voltage: string;
  position: number; // percent along rail
  title: string;
  body: string;
}

const STOPS: RailStop[] = [
  {
    voltage: "12V",
    position: 0,
    title: "Compact systems",
    body: "Inverters, telecom backup and light electric platforms.",
  },
  {
    voltage: "96V",
    position: 27,
    title: "Mobility platforms",
    body: "Two-wheelers, three-wheelers, drones and swappable packs — 75K+ units deployed.",
  },
  {
    voltage: "400V",
    position: 55,
    title: "High-current systems",
    body: "Forklifts, heavy three-wheelers and C&I storage strings.",
  },
  {
    voltage: "800V",
    position: 78,
    title: "C&I storage",
    body: "Commercial and industrial BESS with isolated CAN and insulation monitoring.",
  },
  {
    voltage: "1200V",
    position: 100,
    title: "Utility storage",
    body: "Grid-scale BESS architecture with 4G/IoT telematics and fleet intelligence overlay.",
  },
];

export function VoltageRail() {
  const [active, setActive] = useState(1);
  const stop = STOPS[active];

  return (
    <div>
      {/* Rail */}
      <div
        role="tablist"
        aria-label="Voltage spectrum"
        className="relative mt-16 hidden md:block"
      >
        <div className="absolute left-0 right-0 top-[22px] h-px bg-grey-300" aria-hidden="true" />
        <div
          className="absolute top-[22px] h-px bg-blue-600 transition-all duration-300"
          style={{ width: `${stop.position}%`, boxShadow: "var(--trace-glow)" }}
          aria-hidden="true"
        />
        <div className="relative flex justify-between">
          {STOPS.map((s, i) => (
            <button
              key={s.voltage}
              role="tab"
              aria-selected={active === i}
              aria-controls="voltage-panel"
              onClick={() => setActive(i)}
              onMouseEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
              className="flex min-h-[44px] flex-col items-center gap-2 px-2"
            >
              <span
                className={`spec-value transition-colors ${
                  active === i ? "!text-blue-700" : ""
                }`}
              >
                {s.voltage}
              </span>
              <span
                className={`h-2.5 w-2.5 rounded-full border transition-colors ${
                  active === i
                    ? "border-blue-600 bg-blue-600"
                    : "border-grey-300 bg-white"
                }`}
                aria-hidden="true"
              />
            </button>
          ))}
        </div>
      </div>

      {/* Mobile: stacked buttons */}
      <div className="mt-10 flex flex-wrap gap-2 md:hidden" role="tablist" aria-label="Voltage spectrum">
        {STOPS.map((s, i) => (
          <button
            key={s.voltage}
            role="tab"
            aria-selected={active === i}
            aria-controls="voltage-panel"
            onClick={() => setActive(i)}
            className={`btn ${active === i ? "btn-primary" : "btn-secondary"} !min-h-[44px] !px-4`}
          >
            {s.voltage}
          </button>
        ))}
      </div>

      <div
        id="voltage-panel"
        role="tabpanel"
        className="spec-panel mt-10 flex flex-col gap-3 p-6 md:flex-row md:items-baseline md:gap-10 md:p-8"
        aria-live="polite"
      >
        <p className="spec-value shrink-0 !text-blue-700">{stop.voltage}</p>
        <div>
          <h3 className="type-h4">{stop.title}</h3>
          <p className="type-body mt-2">{stop.body}</p>
        </div>
        <Link href="/products" className="btn btn-ghost md:ml-auto md:shrink-0">
          View all products →
        </Link>
      </div>
    </div>
  );
}
