"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  applicationFilters,
  products,
  type Application,
  type Architecture,
  type Comms,
} from "@/content/products";
import { ProductCard } from "./ProductCard";
import { Reveal } from "@/components/motion/Reveal.client";

const architectures: Architecture[] = ["MOSFET", "Contactor", "Telematics"];
const commOptions: Comms[] = ["CAN", "Isolated CAN", "Bluetooth", "4G"];

export function ProductExplorer() {
  const [apps, setApps] = useState<Application[]>([]);
  const [archs, setArchs] = useState<Architecture[]>([]);
  const [comms, setComms] = useState<Comms[]>([]);
  const [compare, setCompare] = useState<string[]>([]);
  const [showCompare, setShowCompare] = useState(false);

  const filtered = useMemo(
    () =>
      products.filter((p) => {
        if (apps.length && !apps.some((a) => p.applications.includes(a))) return false;
        if (archs.length && !archs.includes(p.architecture)) return false;
        if (comms.length && !comms.some((c) => p.comms.includes(c))) return false;
        return true;
      }),
    [apps, archs, comms]
  );

  const toggle = <T,>(list: T[], set: (v: T[]) => void, value: T) =>
    set(list.includes(value) ? list.filter((v) => v !== value) : [...list, value]);

  const toggleCompare = (slug: string) =>
    setCompare((c) =>
      c.includes(slug) ? c.filter((s) => s !== slug) : c.length >= 3 ? c : [...c, slug]
    );

  const compared = products.filter((p) => compare.includes(p.slug));

  return (
    <div>
      {/* Sticky filter bar */}
      <div className="sticky top-16 z-30 -mx-4 border-y border-grey-200 bg-white/70 px-4 py-4 backdrop-blur-xl backdrop-saturate-150 md:mx-0 md:rounded-[6px] md:border-x">
        <div className="flex flex-wrap items-center gap-x-8 gap-y-3">
          <FilterGroup
            legend="Application"
            options={applicationFilters}
            selected={apps}
            onToggle={(v) => toggle(apps, setApps, v)}
          />
          <FilterGroup
            legend="Architecture"
            options={architectures}
            selected={archs}
            onToggle={(v) => toggle(archs, setArchs, v)}
          />
          <FilterGroup
            legend="Communication"
            options={commOptions}
            selected={comms}
            onToggle={(v) => toggle(comms, setComms, v)}
          />
          {(apps.length || archs.length || comms.length) > 0 && (
            <button
              type="button"
              className="btn btn-ghost !min-h-[36px] !px-3"
              onClick={() => {
                setApps([]);
                setArchs([]);
                setComms([]);
              }}
            >
              Clear filters
            </button>
          )}
        </div>
      </div>

      {/* Result count */}
      <p className="micro-label mt-8" aria-live="polite">
        {filtered.length} SYSTEM{filtered.length === 1 ? "" : "S"} / PRODUCTION
      </p>

      {/* Catalogue */}
      <ul className="mt-6 grid gap-8 sm:grid-cols-2 xl:grid-cols-3">
        {filtered.map((p, i) => (
          <Reveal as="li" key={p.slug} at={0.88} delayMs={(i % 3) * 50}>
            <div className="relative h-full">
              <ProductCard product={p} />
              <label className="micro-label absolute right-4 top-4 flex min-h-[44px] cursor-pointer items-center gap-2 rounded-[4px] border border-grey-200 bg-white/90 px-3">
                <input
                  type="checkbox"
                  checked={compare.includes(p.slug)}
                  onChange={() => toggleCompare(p.slug)}
                  disabled={!compare.includes(p.slug) && compare.length >= 3}
                  className="h-4 w-4 accent-[var(--blue-700)]"
                />
                COMPARE
              </label>
            </div>
          </Reveal>
        ))}
      </ul>

      {/* Compare drawer trigger */}
      {compare.length >= 2 && (
        <div className="sticky bottom-4 z-30 mt-8 flex justify-center">
          <button
            type="button"
            className="btn btn-primary shadow-lg"
            onClick={() => setShowCompare((v) => !v)}
            aria-expanded={showCompare}
            aria-controls="compare-table"
          >
            {showCompare ? "Hide comparison" : `Compare ${compare.length} products`}
          </button>
        </div>
      )}

      {/* Comparison table */}
      {showCompare && compared.length >= 2 && (
        <div id="compare-table" className="mt-12 overflow-x-auto">
          <table className="spec-table min-w-[720px]">
            <caption className="micro-label mb-4 text-left">
              PRODUCT COMPARISON / DIFFERENCES IN BLUE
            </caption>
            <thead className="sticky top-16 bg-white/80 backdrop-blur-xl">
              <tr>
                <th scope="col">Specification</th>
                {compared.map((p) => (
                  <th scope="col" key={p.slug}>
                    <Link href={`/products/${p.slug}`} className="text-ink underline-offset-4 hover:underline">
                      {p.name}
                    </Link>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {(
                [
                  ["Cell count", (p) => p.cellCount],
                  ["System voltage", (p) => p.systemVoltage],
                  ["Continuous current", (p) => p.continuousCurrent],
                  ["Balancing current", (p) => p.balancingCurrent],
                  ["Architecture", (p) => p.architecture],
                  ["Communications", (p) => p.comms.join(" · ")],
                  ["Applications", (p) => p.applications.join(" · ")],
                ] as [string, (p: (typeof products)[number]) => string][]
              ).map(([label, get]) => {
                const values = compared.map(get);
                const differs = new Set(values).size > 1;
                return (
                  <tr key={label}>
                    <th scope="row">{label}</th>
                    {values.map((v, i) => (
                      <td
                        key={compared[i].slug}
                        className={`spec-value ${differs ? "!text-blue-700 border-l-2 border-l-blue-200" : ""}`}
                      >
                        {v}
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

function FilterGroup<T extends string>({
  legend,
  options,
  selected,
  onToggle,
}: {
  legend: string;
  options: readonly T[];
  selected: T[];
  onToggle: (v: T) => void;
}) {
  return (
    <fieldset className="flex flex-wrap items-center gap-2">
      <legend className="micro-label float-left mr-3">{legend}</legend>
      {options.map((opt) => {
        const active = selected.includes(opt);
        return (
          <button
            key={opt}
            type="button"
            aria-pressed={active}
            onClick={() => onToggle(opt)}
            className={`min-h-[36px] rounded-[4px] border px-3 text-[0.8125rem] font-[480] transition-colors duration-150 ${
              active
                ? "border-blue-700 bg-blue-50 text-blue-700"
                : "border-grey-200 bg-white text-grey-700 hover:border-grey-400"
            }`}
          >
            {opt}
          </button>
        );
      })}
    </fieldset>
  );
}
