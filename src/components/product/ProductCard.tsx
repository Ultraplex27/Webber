import type { Product } from "@/content/products";
import { SmartImage } from "@/components/ui/SmartImage.client";

export function ProductCard({ product }: { product: Product }) {
  return (
    <article className="card flex h-full flex-col overflow-hidden">
      <div className="flex aspect-[4/3] items-center justify-center bg-white p-4">
        <SmartImage
          src={product.image}
          alt={`${product.name} BMS render`}
          ratio="4 / 3"
          fit="contain"
          className="h-full w-full object-center"
          placeholderLabel={product.name.toUpperCase()}
        />
      </div>
      <div className="p-6">
        <h3 className="type-h4">{product.name}</h3>
        <dl className="mt-6 grid grid-cols-2 gap-x-5 gap-y-5 border-t border-grey-100 pt-5">
          <div><dt className="micro-label">Nominal pack voltage range</dt><dd className="spec-value mt-1 text-ink">{product.nominalVoltage}</dd></div>
          <div><dt className="micro-label">Battery capacity range</dt><dd className="spec-value mt-1 text-ink">{product.batteryCapacity}</dd></div>
          <div><dt className="micro-label">Cell configuration</dt><dd className="spec-value mt-1 text-ink">{product.cellConfiguration}</dd></div>
          <div><dt className="micro-label">Applications</dt><dd className="spec-value mt-1 text-ink">{product.applications}</dd></div>
        </dl>
      </div>
    </article>
  );
}
