import type { Metadata } from "next";
import Link from "next/link";
import { ProductExplorer } from "@/components/product/ProductExplorer.client";
import { SmartImage } from "@/components/ui/SmartImage.client";
import { Reveal } from "@/components/motion/Reveal.client";
import { SectionIntro, TechnicalLabel } from "@/components/ui/TechnicalLabel";
import { ClosingCta } from "@/components/ui/ClosingCta";
import { roadmapItems } from "@/content/products";

export const metadata: Metadata = {
  title: "Products — BMS 12V–1200V + Telematics",
  description:
    "One BMS stack from two-wheelers to grid-scale storage. 12V to 1200V battery intelligence, designed and deployed in India.",
  openGraph: { images: ["/og/og-products.png"] },
};

export default function ProductsPage() {
  return (
    <>
      {/* Hero */}
      <section className="section grid-bg border-b border-grey-200 pt-40">
        <div className="wrap">
          <TechnicalLabel blue className="mb-6">
            PRODUCT SYSTEMS / BMS + CONNECTIVITY
          </TechnicalLabel>
          <h1 className="type-h1 max-w-[14ch]">
            One BMS stack. From two-wheelers to grid-scale storage.
          </h1>
          <p className="type-lead mt-8">
            12V to 1200V battery intelligence, designed and deployed in India.
          </p>
        </div>
      </section>

      {/* Explorer + catalogue */}
      <section className="section--tight">
        <div className="wrap">
          <ProductExplorer />
        </div>
      </section>

      {/* Telematics */}
      <section id="telematics" className="section border-t border-grey-200 bg-canvas-soft">
        <div className="wrap grid items-center gap-16 lg:grid-cols-2">
          <Reveal>
            <SectionIntro
              label="TELEMATICS"
              title="The connection above the BMS."
              lead="4G/IoT telematics for live location, geofencing, system health and remote visibility."
            />
            <div className="mt-10 space-y-4">
              {["ASSET", "EDGE DEVICE", "WEBBER CLOUD/API"].map((layer, i) => (
                <div key={layer} className="flex items-center gap-4">
                  <span className="spec-value w-8 !text-grey-400">0{i + 1}</span>
                  <div className="spec-panel flex-1 px-5 py-4">
                    <span className="micro-label !text-ink-soft">{layer}</span>
                  </div>
                  {i < 2 && <span className="text-blue-600" aria-hidden="true">↓</span>}
                </div>
              ))}
            </div>
            <Link href="/products/telematics-4g" className="btn btn-secondary mt-8">
              View telematics platform
            </Link>
          </Reveal>
          <Reveal delayMs={100}>
            <SmartImage
              src="/images/telematics/dashboard.webp"
              alt="Webber fleet telematics dashboard showing live assets, geofencing and battery state"
              ratio="16 / 10"
              placeholderLabel="TELEMATICS DASHBOARD"
            />
          </Reveal>
        </div>
      </section>

      {/* Roadmap */}
      <section id="roadmap" className="section">
        <div className="wrap">
          <Reveal>
            <SectionIntro label="ROADMAP" title="The stack is expanding." />
          </Reveal>
          <ul className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {roadmapItems.map((item, i) => (
              <Reveal as="li" key={item.name} delayMs={i * 50} className="card p-6">
                <span className="micro-label inline-block rounded-[3px] border border-grey-300 bg-grey-50 px-2 py-1">
                  IN DEVELOPMENT
                </span>
                <h3 className="type-h4 mt-4">{item.name}</h3>
                <p className="type-body mt-2 !text-[0.9375rem]">{item.note}</p>
              </Reveal>
            ))}
          </ul>
          <p className="type-small mt-8 text-grey-400">
            Roadmap items are in development and not available for datasheet request.
          </p>
        </div>
      </section>

      <ClosingCta
        title="Need a configuration outside the catalogue?"
        body="Discuss voltage, current, packaging, communication and certification requirements."
        ctaLabel="Start an integration brief"
        ctaHref="/contact"
      />
    </>
  );
}
