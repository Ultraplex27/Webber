"use client";

import { useState } from "react";
import { products } from "@/content/products";
import { ProductCard } from "./ProductCard";
import { Reveal } from "@/components/motion/Reveal.client";

/** Single-page BMS catalogue. Details are intentionally kept in the cards. */
export function ProductExplorer() {
  const [activeFilters, setActiveFilters] = useState<("vehicle" | "ess")[]>([]);
  const toggleFilter = (filter: "vehicle" | "ess") =>
    setActiveFilters((current) =>
      current.includes(filter) ? current.filter((item) => item !== filter) : [...current, filter],
    );
  const visibleProducts =
    activeFilters.length === 0
      ? products
      : products.filter((product) =>
          activeFilters.some((filter) =>
            filter === "vehicle"
              ? /2W|3W|Forklift/i.test(product.applications)
              : /ESS/i.test(product.applications),
          ),
        );

  return (
    <div>
      <div className="flex flex-wrap items-center gap-2" aria-label="Application filters">
        <span className="micro-label mr-2">Application</span>
        <button type="button" aria-pressed={activeFilters.includes("vehicle")} onClick={() => toggleFilter("vehicle")} className={`rounded-[3px] border px-3 py-1.5 text-[0.75rem] font-medium transition-colors ${activeFilters.includes("vehicle") ? "border-blue-700 bg-blue-50 text-blue-700" : "border-grey-200 bg-white text-grey-600 hover:border-blue-300 hover:text-blue-700"}`}>
          Vehicle
        </button>
        <button type="button" aria-pressed={activeFilters.includes("ess")} onClick={() => toggleFilter("ess")} className={`rounded-[3px] border px-3 py-1.5 text-[0.75rem] font-medium transition-colors ${activeFilters.includes("ess") ? "border-blue-700 bg-blue-50 text-blue-700" : "border-grey-200 bg-white text-grey-600 hover:border-blue-300 hover:text-blue-700"}`}>
          ESS
        </button>
      </div>
      <p className="micro-label mt-5" aria-live="polite">{visibleProducts.length} BMS PRODUCTS</p>
      <ul className="gap-module mt-6 grid sm:grid-cols-2 xl:grid-cols-3">
        {visibleProducts.map((product, index) => (
          <Reveal as="li" key={product.slug} at={0.88} delayMs={(index % 3) * 50}>
            <ProductCard product={product} />
          </Reveal>
        ))}
      </ul>
    </div>
  );
}
