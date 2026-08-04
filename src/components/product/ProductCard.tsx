import Link from "next/link";
import Image from "next/image";
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
            className={`micro-label flex items-center gap-1.5 rounded-full border px-2.5 py-1 ${
              product.application === "BESS"
                ? "border-teal text-teal"
                : "border-blue-700 text-blue-700"
            }`}
          >
            <Image 
              src={product.application === "BESS" ? "/images/icons/icon_bess.png" : "/images/icons/icon_automotive.png"}
              alt=""
              width={14}
              height={14}
              className="opacity-75 mix-blend-multiply"
            />
            {product.application}
          </span>
          <span className="type-small text-grey-400">{product.otherApplications}</span>
        </div>
        <h3 className="type-h4 mt-3 leading-snug group-hover:text-blue-700">{product.name}</h3>
        <dl className="mt-5 grid grid-cols-2 gap-x-5 gap-y-4 border-t border-grey-100 pt-5">
          <div>
            <dt className="micro-label flex items-center gap-1.5">
              <Image src="/images/icons/icon_voltage.png" alt="" width={12} height={12} className="opacity-60 mix-blend-multiply" />
              Nominal voltage
            </dt>
            <dd className="spec-value mt-1 text-ink">{product.nominalVoltage}</dd>
          </div>
          <div>
            <dt className="micro-label flex items-center gap-1.5">
              <Image src="/images/icons/icon_current.png" alt="" width={12} height={12} className="opacity-60 mix-blend-multiply" />
              Continuous current
            </dt>
            <dd className="spec-value mt-1 text-ink">{product.continuousCurrent}</dd>
          </div>
        </dl>
        <p className="spec-value mt-4 text-ink-soft flex items-center gap-1.5">
          <Image src="/images/icons/icon_cell.png" alt="" width={12} height={12} className="opacity-60 mix-blend-multiply" />
          {product.cellConfiguration}
        </p>
        <p className="micro-label micro-label--blue mt-auto pt-5">Full specification sheet →</p>
      </div>
    </Link>
  );
}
