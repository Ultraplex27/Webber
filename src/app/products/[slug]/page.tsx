import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProduct, products } from "@/content/products";
import { deploymentLabel } from "@/components/product/ProductCard";
import { SpecificationTable } from "@/components/product/SpecificationTable";
import { SmartImage } from "@/components/ui/SmartImage.client";
import { TechnicalLabel } from "@/components/ui/TechnicalLabel";
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
    title: `${product.name} — ${product.family} (${product.systemVoltage})`,
    description: product.positioning,
  };
}

const views = [
  { file: "front.webp", label: "Front three-quarter view" },
  { file: "top.webp", label: "Top view" },
  { file: "connector.webp", label: "Connector-side view" },
] as const;

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
    <>
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
              alt={`${product.name} — front three-quarter view`}
              ratio="4 / 3"
              loading="eager"
              placeholderLabel={product.name.toUpperCase()}
            />
          </div>
        </div>
      </section>

      {/* Key metrics rail */}
      <section className="border-b border-grey-200 bg-canvas-soft" aria-label="Key metrics">
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

      {/* Specification table */}
      <section className="section--tight">
        <div className="wrap grid gap-16 lg:grid-cols-[2fr_1fr]">
          <div>
            <h2 className="type-h3 mb-8">Full specifications</h2>
            <SpecificationTable product={product} />
          </div>
          <aside className="space-y-8">
            <div>
              <TechnicalLabel className="mb-4">PRODUCT VIEWS</TechnicalLabel>
              <div className="space-y-4">
                {views.slice(1).map((v) => (
                  <SmartImage
                    key={v.file}
                    src={`${product.imageDir}/${v.file}`}
                    alt={`${product.name} — ${v.label}`}
                    ratio="4 / 3"
                    placeholderLabel={v.label.toUpperCase()}
                  />
                ))}
              </div>
            </div>
            <div>
              <TechnicalLabel className="mb-4">MECHANICAL</TechnicalLabel>
              <SmartImage
                src={`${product.imageDir}/dimensions.svg`}
                alt={`${product.name} dimension drawing`}
                ratio="4 / 3"
                placeholderLabel="DIMENSION DRAWING"
              />
            </div>
          </aside>
        </div>
      </section>

      <ClosingCta
        title="Integrate this system."
        body="Share the operating envelope — voltage, current, packaging, communication, certification and volume — and our applications team will respond with an integration path."
        ctaLabel="Start an integration brief"
        ctaHref="/contact"
      />
    </>
  );
}
