"use client";

import { useState } from "react";
import { products, type Product } from "@/content/products";
import { ProductCard } from "./ProductCard";
import { Reveal } from "@/components/motion/Reveal.client";

type Category = "automotive" | "bess";
type AutomotiveSub = "all" | "2w" | "3w";
type BessSub = "all" | "12-24" | "48" | "96-102" | "120-500";

// "48" is widened past the literal 48V nameplate to the 40-67V a 16S LFP/NMC
// pack actually reports (nominal ~51.2V/59.2V), since that's the class of
// pack this band is meant to catch.
const BESS_BANDS: Record<Exclude<BessSub, "all">, [number, number]> = {
  "12-24": [12, 24],
  "48": [40, 67],
  "96-102": [96, 102],
  "120-500": [120, 500],
};

function numbersIn(value: string): number[] {
  return (value.match(/\d+(\.\d+)?/g) ?? []).map(Number);
}

function matchesAutomotive(product: Product, sub: AutomotiveSub): boolean {
  if (product.application !== "Automotive") return false;
  if (sub === "2w") return /2W/i.test(product.otherApplications);
  if (sub === "3w") return /3W/i.test(product.otherApplications);
  return true;
}

function matchesBess(product: Product, sub: BessSub): boolean {
  if (product.application !== "BESS") return false;
  if (sub === "all") return true;
  const [min, max] = BESS_BANDS[sub];
  return numbersIn(product.nominalVoltage).some((n) => n >= min && n <= max);
}

/** Single-page BMS catalogue. Details are intentionally kept in the cards. */
export function ProductExplorer() {
  const [activeCategory, setActiveCategory] = useState<Category | null>(null);
  const [automotiveSub, setAutomotiveSub] = useState<AutomotiveSub>("all");
  const [bessSub, setBessSub] = useState<BessSub>("all");

  const toggleCategory = (category: Category) =>
    setActiveCategory((current) => (current === category ? null : category));

  const visibleProducts =
    activeCategory === null
      ? products
      : products.filter((product) =>
          activeCategory === "automotive"
            ? matchesAutomotive(product, automotiveSub)
            : matchesBess(product, bessSub),
        );

  return (
    <div>
      <div className="flex flex-wrap items-center gap-3" aria-label="Application filters">
        <span className="micro-label mr-2">Application</span>
        <button
          type="button"
          aria-pressed={activeCategory === "automotive"}
          onClick={() => toggleCategory("automotive")}
          className={`rounded-[4px] border px-5 py-3 text-base font-medium transition-colors ${activeCategory === "automotive" ? "border-blue-700 bg-blue-50 text-blue-700" : "border-grey-200 bg-white text-grey-600 hover:border-blue-300 hover:text-blue-700"}`}
        >
          Automotive
        </button>
        <button
          type="button"
          aria-pressed={activeCategory === "bess"}
          onClick={() => toggleCategory("bess")}
          className={`rounded-[4px] border px-5 py-3 text-base font-medium transition-colors ${activeCategory === "bess" ? "border-blue-700 bg-blue-50 text-blue-700" : "border-grey-200 bg-white text-grey-600 hover:border-blue-300 hover:text-blue-700"}`}
        >
          BESS
        </button>
      </div>

      {activeCategory === "automotive" && (
        <div className="mt-3 flex flex-wrap items-center gap-2 pl-1" aria-label="Automotive sub-filters">
          <span className="micro-label mr-1 text-grey-400">Automotive</span>
          {(
            [
              ["all", "All"],
              ["2w", "Two-wheeler"],
              ["3w", "3-wheeler"],
            ] as [AutomotiveSub, string][]
          ).map(([value, label]) => (
            <button
              key={value}
              type="button"
              aria-pressed={automotiveSub === value}
              onClick={() => setAutomotiveSub(value)}
              className={`rounded-full border px-3 py-1.5 text-[0.75rem] font-medium transition-colors ${automotiveSub === value ? "border-blue-700 bg-blue-50 text-blue-700" : "border-grey-200 bg-white text-grey-500 hover:border-blue-300 hover:text-blue-700"}`}
            >
              {label}
            </button>
          ))}
        </div>
      )}

      {activeCategory === "bess" && (
        <div className="mt-3 flex flex-wrap items-center gap-2 pl-1" aria-label="BESS sub-filters">
          <span className="micro-label mr-1 text-grey-400">BESS</span>
          {(
            [
              ["all", "All"],
              ["12-24", "12V/24V"],
              ["48", "48V"],
              ["96-102", "96V/102V"],
              ["120-500", "120V–500V"],
            ] as [BessSub, string][]
          ).map(([value, label]) => (
            <button
              key={value}
              type="button"
              aria-pressed={bessSub === value}
              onClick={() => setBessSub(value)}
              className={`rounded-full border px-3 py-1.5 text-[0.75rem] font-medium transition-colors ${bessSub === value ? "border-blue-700 bg-blue-50 text-blue-700" : "border-grey-200 bg-white text-grey-500 hover:border-blue-300 hover:text-blue-700"}`}
            >
              {label}
            </button>
          ))}
        </div>
      )}

      <p className="micro-label mt-5" aria-live="polite">
        {visibleProducts.length === 0 ? "COMING SOON" : `${visibleProducts.length} BMS PRODUCTS`}
      </p>
      {visibleProducts.length > 0 && (
        <ul className="gap-module mt-6 grid sm:grid-cols-2 xl:grid-cols-3">
          {visibleProducts.map((product, index) => (
            <Reveal as="li" key={product.slug} at={0.88} delayMs={(index % 3) * 50}>
              <ProductCard product={product} />
            </Reveal>
          ))}
        </ul>
      )}
    </div>
  );
}
