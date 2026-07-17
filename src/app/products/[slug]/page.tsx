import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProduct, products } from "@/content/products";
import { deploymentLabel } from "@/components/product/ProductCard";
import { SpecificationTable } from "@/components/product/SpecificationTable";
import { SmartImage } from "@/components/ui/SmartImage.client";
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
    title: `${product.name}: ${product.family} (${product.systemVoltage})`,
    description: product.positioning,
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

  const dep = deploymentLabel(product);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.positioning,
    brand: { "@type": "Brand", name: "Webber Electro Corp" },
    category: product.family,
    manufacturer: { "@type": "Organization", name: "Webber Electro Corp" },
  };

  return (
    <div className="pencil-grid">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Breadcrumb + positioning */}
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
                {product.family.toUpperCase()} / {product.applications.join(" + ")}
              </TechnicalLabel>
              <h1 className="type-h2">{product.name}</h1>
              <p className="type-lead mt-6">{product.positioning}</p>
              {dep && <p className="micro-label mt-8">{dep}</p>}
              <div className="mt-10 flex flex-wrap gap-4">
                <Link href="/contact" className="btn btn-primary">
                  Request datasheet
                </Link>
                <Link href="/contact" className="btn btn-secondary">
                  Integration enquiry
                </Link>
              </div>
            </div>
            <SmartImage
              src={`${product.imageDir}/front.webp`}
              alt={`${product.name}, front three-quarter view`}
              ratio="4 / 3"
              loading="eager"
              placeholderLabel={product.name.toUpperCase()}
            />
          </div>
        </div>
      </section>

      {/* Key metrics rail */}
      <section
        className="relative border-b border-grey-200 bg-canvas-soft/70"
        aria-label="Key metrics"
      >
        <BlueprintMeasure label="01 / KEY METRICS" />
        <div className="wrap">
          <dl className="grid grid-cols-2 divide-grey-200 md:grid-cols-4 md:divide-x">
            {product.keyMetrics.map((m) => (
              <div key={m.label} className="px-2 py-6 md:px-8">
                <dd className="spec-value !text-[1.35rem] text-ink order-first">{m.value}</dd>
                <dt className="micro-label mt-1">{m.label}</dt>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Specifications */}
      <section className="section--tight relative">
        <BlueprintMeasure label="02 / SPECIFICATIONS" />
        <div className="wrap">
          <h2 className="type-h3 mb-8">Full specifications</h2>
          <SpecificationTable product={product} />

          {/* Mechanical drawing: the hero already shows the board itself, so the
              only view worth repeating here is the dimensioned outline. */}
          <div className="mt-14">
            <TechnicalLabel className="mb-4">
              MECHANICAL / ORTHOGRAPHIC OUTLINE
            </TechnicalLabel>
            <div className="card p-6">
              <SmartImage
                src={`${product.imageDir}/dimensions.svg`}
                alt={`${product.name} dimension drawing`}
                ratio="16 / 9"
                fit="contain"
                placeholderLabel="DIMENSION DRAWING"
              />
            </div>
          </div>
        </div>
      </section>

      <ClosingCta
        title="Integrate this system."
        body="Share the operating envelope: voltage, current, packaging, communication, certification and volume, and our applications team will respond with an integration path."
        ctaLabel="Start an integration brief"
        ctaHref="/contact"
        measure="03 / INTEGRATION"
      />
    </div>
  );
}
