import type { Metadata } from "next";
import { ProductExplorer } from "@/components/product/ProductExplorer.client";
import { Reveal } from "@/components/motion/Reveal.client";
import { SectionIntro, TechnicalLabel } from "@/components/ui/TechnicalLabel";
import { BlueprintMeasure } from "@/components/motion/BlueprintMeasure.client";
import { ClosingCta } from "@/components/ui/ClosingCta";
import { roadmapItems } from "@/content/products";

export const metadata: Metadata = {
  title: "Products: BMS 12V–1200V",
  description:
    "One BMS stack from two-wheelers to grid-scale storage. 12V to 1200V battery intelligence, designed and deployed in India.",
  openGraph: { images: ["/og/og-products.png"] },
};

export default function ProductsPage() {
  return (
    <div className="pencil-grid">
      {/* Hero */}
      <section className="section border-b border-grey-200 pt-40">
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
      <section className="section--tight relative">
        <BlueprintMeasure label="01 / CATALOGUE" />
        <div className="wrap">
          <ProductExplorer />
        </div>
      </section>

      {/* Roadmap */}
      <section id="roadmap" className="section relative border-t border-grey-200 bg-canvas-soft/70">
        <BlueprintMeasure label="02 / ROADMAP" />
        <div className="wrap">
          <Reveal>
            <SectionIntro label="ROADMAP" title="The stack is expanding." />
          </Reveal>
          <ul className="gap-module mt-14 grid sm:grid-cols-2 lg:grid-cols-4">
            {roadmapItems.map((item, i) => (
              <Reveal as="li" key={item.name} delayMs={i * 50} className="card p-6">
                <span className="micro-label inline-block rounded-[3px] border border-grey-300 bg-grey-50 px-2 py-1">
                  IN DEVELOPMENT
                </span>
                <h3 className="type-h4 mt-4">{item.name}</h3>
                <p className="type-body mt-2 !text-[1rem]">{item.note}</p>
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
        measure="03 / INTEGRATION"
      />
    </div>
  );
}
