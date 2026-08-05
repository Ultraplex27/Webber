import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProduct, products } from "@/content/products";
import { SpecificationTable } from "@/components/product/SpecificationTable";
import { ProductGallery } from "@/components/product/ProductGallery.client";
import { TechnicalLabel } from "@/components/ui/TechnicalLabel";
import { BlueprintMeasure } from "@/components/motion/BlueprintMeasure.client";
import { ClosingCta } from "@/components/ui/ClosingCta";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return {};
  return {
    title: `${product.name}: BMS specifications`,
    description: `${product.name} battery management system. Cell configuration ${product.cellConfiguration}, applications ${product.otherApplications}.`,
  };
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    brand: { "@type": "Brand", name: "Webber Electro Corp" },
    manufacturer: { "@type": "Organization", name: "Webber Electro Corp" },
  };

  return (
    <div className="pencil-grid">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Breadcrumb + hero */}
      <section className="section--tight border-b border-grey-200 pt-32">
        <div className="wrap">
          <nav aria-label="Breadcrumb" className="micro-label mb-8">
            <Link href="/products" className="hover:text-ink">
              PRODUCTS
            </Link>
            <span aria-hidden="true"> / </span>
            <span className="text-ink-soft">{product.name.toUpperCase()}</span>
          </nav>
          <div className="grid items-start gap-12 lg:grid-cols-2">
            <div>
              <TechnicalLabel blue className="mb-4">
                {product.application} / {product.otherApplications}
              </TechnicalLabel>
              <h1 className="type-h2">{product.name}</h1>
              {product.positioning !== "—" && (
                <p className="type-lead mt-6">{product.positioning}</p>
              )}
              <dl className="mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-[6px] border border-grey-200 bg-grey-200">
                {[
                  ["Nominal voltage", product.nominalVoltage],
                  ["Continuous current", product.continuousCurrent],
                  ["Cell configuration", product.cellConfiguration],
                  ["Battery capacity", product.batteryCapacity],
                ].map(([label, value]) => (
                  <div key={label} className="bg-white px-5 py-4">
                    <dd className="spec-value text-ink">{value}</dd>
                    <dt className="micro-label mt-1">{label}</dt>
                  </div>
                ))}
              </dl>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link href="/contact" className="btn btn-primary">
                  Request datasheet
                </Link>
                <Link href="/contact" className="btn btn-secondary">
                  Integration enquiry
                </Link>
              </div>
            </div>
            <ProductGallery name={product.name} images={product.images} />
          </div>
        </div>
      </section>

      {/* Specifications */}
      <section className="section--tight relative">
        <BlueprintMeasure label="01 / SPECIFICATIONS" />
        <div className="wrap">
          <h2 className="type-h3 mb-8">Full specifications</h2>
          <SpecificationTable product={product} />
        </div>
      </section>

      <ClosingCta
        title="Integrate this system."
        body="Share the operating envelope: voltage, current, packaging, communication, certification and volume, and our applications team will respond with an integration path."
        ctaLabel="Start an integration brief"
        ctaHref="/contact"
        measure="02 / INTEGRATION"
      />
    </div>
  );
}
