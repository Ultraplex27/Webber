import type { Metadata } from "next";
import { HeroShell } from "@/components/hero/HeroShell.client";
import { ProofStrip } from "@/components/home/ProofStrip";
import { ProductCarousel } from "@/components/home/ProductCarousel.client";
import { FirstPrinciples } from "@/components/home/FirstPrinciples.client";
import { Recognition } from "@/components/home/Recognition";
import { ClosingCta } from "@/components/ui/ClosingCta";
import { LogoRail } from "@/components/ui/LogoRail";
import { Reveal } from "@/components/motion/Reveal.client";
import { BlueprintMeasure } from "@/components/motion/BlueprintMeasure.client";
import { SectionIntro } from "@/components/ui/TechnicalLabel";
import { customerLogos, partners } from "@/content/company";

export const metadata: Metadata = {
  title: "Webber Electrocorp",
  description:
    "One control layer, mobility to grid. BMS from 12V to 1200V, 100K+ deployments, engineered in India for electric mobility and energy storage worldwide.",
};

const partnerLogoItems = partners.flatMap((group) =>
  group.names.map((name, i) => ({ name, logo: group.logos[i] })),
);

export default function HomePage() {
  return (
    <>
      <HeroShell />
      {/* Everything below the hero sits on drafting paper, carrying the grid
          from the hero footage down the page. */}
      <div className="pencil-grid">
        <ProofStrip />

        {/* Product carousel */}
        <section className="section relative border-t border-grey-200 bg-canvas-soft/70">
          <BlueprintMeasure label="02 / PRODUCTS" />
          <div className="wrap">
            <Reveal>
              <SectionIntro
                label="ONE STACK. MULTIPLE ENERGY SYSTEMS."
                title="Modular battery intelligence, 12V to 1200V."
                lead="Modular battery intelligence for compact mobility, high-current platforms and stationary storage."
              />
            </Reveal>
            <div className="mt-16">
              <ProductCarousel />
            </div>
          </div>
        </section>

        {/* OEM and ecosystem proof */}
        <section className="section--tight relative">
          <BlueprintMeasure label="03 / ECOSYSTEM" />
          <div className="wrap">
            <p className="micro-label mb-12">
              BUILT ALONGSIDE THE ELECTRIFICATION ECOSYSTEM
            </p>
            <div className="space-y-12">
              <LogoRail label="DEPLOYED WITH" items={customerLogos} />
              <LogoRail
                label="ENGINEERED WITH"
                items={partnerLogoItems}
                reverse
              />
            </div>
          </div>
        </section>

        {/* First-principle technology */}
        <section className="section relative border-t border-grey-200 bg-canvas-soft/70">
          <BlueprintMeasure label="04 / FIRST PRINCIPLES" />
          <div className="wrap">
            <Reveal>
              <SectionIntro
                label="FIRST-PRINCIPLE DESIGN"
                title={
                  <>
                    Not assembled from a checklist.
                    <br />
                    Designed from first principles.
                  </>
                }
              />
            </Reveal>
            <FirstPrinciples />
          </div>
        </section>

        <Recognition measure="05 / RECOGNITION" />

        <ClosingCta
          title="Build the next energy platform with Webber."
          body="BMS integration or storage architecture: start with an engineering conversation."
          ctaLabel="Talk to engineering"
          ctaHref="/contact"
          measure="06 / BUILD WITH WEBBER"
        />
      </div>
    </>
  );
}
