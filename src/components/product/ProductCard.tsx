import Link from "next/link";
import type { Product } from "@/content/products";
import { SmartImage } from "@/components/ui/SmartImage.client";

export function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      href={`/products/${product.slug}`}
      className="card group flex h-full flex-col overflow-hidden transition-colors hover:border-blue-300"
    >
      <div className="flex aspect-[4/3] items-center justify-center bg-white p-4">
        <SmartImage
          src={product.images[0]}
          alt={`${product.name} BMS render`}
          ratio="4 / 3"
          fit="contain"
          className="h-full w-full object-center"
          placeholderLabel={product.name.toUpperCase()}
        />
      </div>
      <div className="flex flex-1 flex-col p-6">
        <div className="flex flex-wrap items-center gap-2">
          <span
            className={`micro-label rounded-full border px-2.5 py-1 ${
              product.application === "BESS"
                ? "border-teal text-teal"
                : "border-blue-700 text-blue-700"
            }`}
          >
            {product.application}
          </span>
          <span className="type-small text-grey-400">{product.otherApplications}</span>
        </div>
        <h3 className="type-h4 mt-3 min-h-[3.9rem] leading-snug group-hover:text-blue-700">{product.name}</h3>
        <dl className="mt-5 grid grid-cols-2 gap-x-5 gap-y-4 border-t border-grey-100 pt-5">
          <div><dt className="micro-label">Nominal voltage</dt><dd className="spec-value mt-1 text-ink">{product.nominalVoltage}</dd></div>
          <div><dt className="micro-label">Continuous current</dt><dd className="spec-value mt-1 text-ink">{product.continuousCurrent}</dd></div>
        </dl>
        <p className="spec-value mt-4 text-ink-soft">{product.cellConfiguration}</p>
        <p className="micro-label micro-label--blue mt-auto pt-5">Full specification sheet →</p>
      </div>
    </Link>
  );
}
