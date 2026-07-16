import Link from "next/link";
import type { Product } from "@/content/products";
import { SmartImage } from "@/components/ui/SmartImage.client";

export function deploymentLabel(p: Product): string | null {
  switch (p.deployment.kind) {
    case "rounded":
      return `DEPLOYED / ${p.deployment.label} SYSTEMS`;
    case "series-production":
      return "FIELD STATUS / SERIES PRODUCTION";
    case "field-deployed":
      return "FIELD STATUS / FIELD DEPLOYED";
    default:
      return null;
  }
}

export function ProductCard({ product }: { product: Product }) {
  const dep = deploymentLabel(product);
  return (
    <article className="card flex h-full flex-col overflow-hidden transition-colors duration-200 hover:border-blue-300">
      <SmartImage
        src={`${product.imageDir}/front.webp`}
        alt={`${product.name} — front three-quarter view`}
        ratio="4 / 3"
        placeholderLabel={product.name.toUpperCase()}
      />
      <div className="flex flex-1 flex-col p-6">
        <h3 className="type-h4">{product.name}</h3>
        <p className="micro-label mt-1">
          {product.family.toUpperCase()} / {product.applications.join(" + ")}
        </p>
        <ul className="mt-5 space-y-1.5">
          <li className="spec-value">{product.cellCount}</li>
          <li className="spec-value">{product.continuousCurrent}</li>
          {product.balancingCurrent !== "—" && (
            <li className="spec-value">{product.balancingCurrent} balancing</li>
          )}
          {product.certificationNote && (
            <li className="spec-value !text-blue-700">{product.certificationNote}</li>
          )}
        </ul>
        {dep && <p className="micro-label mt-4">{dep}</p>}
        <div className="mt-auto pt-6">
          <Link
            href={`/products/${product.slug}`}
            className="btn btn-secondary w-full"
          >
            View specifications
          </Link>
        </div>
      </div>
    </article>
  );
}
