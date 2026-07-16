import type { Metadata } from "next";
import { HeroShell } from "@/components/hero/HeroShell.client";
import { ProofStrip } from "@/components/home/ProofStrip";
import { VoltageRail } from "@/components/home/VoltageRail.client";
import { FirstPrinciples } from "@/components/home/FirstPrinciples.client";
import { TelematicsPanel } from "@/components/home/TelematicsPanel";
import { Recognition } from "@/components/home/Recognition";
import { ClosingCta } from "@/components/ui/ClosingCta";
import { LogoRail } from "@/components/ui/LogoRail";
import { Reveal } from "@/components/motion/Reveal.client";
import { SectionIntro } from "@/components/ui/TechnicalLabel";
import { customerLogos, partners } from "@/content/company";

export const metadata: Metadata = {
  title: "Webber Electrocorp",
  description:
    "One control layer, mobility to grid. BMS from 12V to 1200V, 75K+ deployments, engineered in India for electric mobility and energy storage worldwide.",
};

const partnerLogoItems = partners.flatMap((group) =>
  group.names.map((name, i) => ({ name, logo: group.logos[i] }))
);

export default function HomePage() {
  return (
    <>
      <HeroShell />
      <ProofStrip />

      {/* Trajectory — no financial figures on the showcase site */}
      <section className="section">
        <div className="wrap">
          <Reveal>
            <SectionIntro
              label="ENGINEERING THAT SCALES"
              title="From mobility electronics to a connected electrification stack."
              lead="Webber is moving from mobility-focused electronics towards a connected electrification stack spanning vehicles, telecom and battery energy storage."
            />
          </Reveal>
        </div>
      </section>

      {/* OEM and ecosystem proof */}
      <section className="section--tight border-t border-grey-200 bg-canvas-soft">
        <div className="wrap">
          <p className="micro-label mb-12">BUILT ALONGSIDE THE ELECTRIFICATION ECOSYSTEM</p>
          <div className="space-y-10">
            <LogoRail label="DEPLOYED WITH" items={customerLogos} />
            <div className="rule" />
            <LogoRail label="ENGINEERED WITH" items={partnerLogoItems} />
          </div>
        </div>
      </section>

      {/* Voltage-spectrum product teaser */}
      <section className="section">
        <div className="wrap">
          <Reveal>
            <SectionIntro
              label="ONE STACK. MULTIPLE ENERGY SYSTEMS."
              title="Modular battery intelligence, 12V to 1200V."
              lead="Modular battery intelligence for compact mobility, high-current platforms and stationary storage."
            />
          </Reveal>
          <VoltageRail />
        </div>
      </section>

      {/* First-principle technology */}
      <section className="section border-t border-grey-200 bg-canvas-soft">
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

      {/* Connected intelligence */}
      <section className="section">
        <div className="wrap grid items-center gap-16 lg:grid-cols-[1fr_1.2fr]">
          <Reveal>
            <SectionIntro
              label="FROM BATTERY DATA TO FLEET DECISIONS"
              title="Connected intelligence above the BMS."
              lead={
                <>
                  4G/IoT telematics today.
                  <br />
                  Predictive BESS intelligence next.
                </>
              }
            />
          </Reveal>
          <Reveal delayMs={100}>
            <TelematicsPanel />
          </Reveal>
        </div>
      </section>

      <Recognition />

      <ClosingCta
        title="Build the next energy platform with Webber."
        body="BMS integration, telematics or storage architecture — start with an engineering conversation."
        ctaLabel="Talk to engineering"
        ctaHref="/contact"
      />
    </>
  );
}
