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
    description: `${product.name} battery management system. Cell configuration ${product.cellConfiguration}, applications ${product.applications}.`,
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
                {product.cellConfiguration} / {product.applications}
              </TechnicalLabel>
              <h1 className="type-h2">{product.name}</h1>
              <div className="mt-10 flex flex-wrap gap-4">
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
