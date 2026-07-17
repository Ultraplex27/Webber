import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { partners, team, timeline } from "@/content/company";
import { Recognition } from "@/components/home/Recognition";
import { SmartImage } from "@/components/ui/SmartImage.client";
import { Logo } from "@/components/ui/LogoRail";
import { Reveal } from "@/components/motion/Reveal.client";
import { SectionIntro, TechnicalLabel } from "@/components/ui/TechnicalLabel";
import { CountUp } from "@/components/motion/CountUp.client";
import { BlueprintMeasure } from "@/components/motion/BlueprintMeasure.client";

export const metadata: Metadata = {
  title: "Company: Built in India",
  description:
    "A 75+ person team engineering the control layer for global electrification: electronics and software for mobility, storage and connected energy systems.",
  openGraph: { images: ["/og/og-company.png"] },
};

const scaleMetrics = [
  {
    value: <CountUp value={75} suffix="+" />,
    label: "PEOPLE",
    body: "Hardware, software, product, integration and operations.",
  },
  {
    value: <CountUp value={75} suffix="K+" />,
    label: "DEPLOYMENTS",
    body: "Across two-wheelers, three-wheelers, ESS and drones.",
  },
  {
    value: "12V–1200V",
    label: "SYSTEM RANGE",
    body: "From compact mobility to high-voltage storage.",
  },
  {
    value: "AIS 156 PH-2",
    label: "COMPLIANCE",
    body: "Certified BMS variants in series production.",
  },
];

const mosaic = [
  { file: "hardware.webp", label: "HARDWARE", alt: "Engineer probing a BMS board at an oscilloscope" },
  { file: "firmware.webp", label: "FIRMWARE", alt: "Developer working on embedded firmware with a debugger attached to a board" },
  { file: "systems.webp", label: "SYSTEMS", alt: "Team reviewing a system schematic at a whiteboard" },
  { file: "validation.webp", label: "VALIDATION", alt: "Test rig with cell simulator and device under test" },
  { file: "integration.webp", label: "INTEGRATION", alt: "BMS being fitted into a vehicle battery pack" },
  { file: "operations.webp", label: "OPERATIONS", alt: "Production quality check of boards in ESD trays" },
];

export default function CompanyPage() {
  return (
    <div className="pencil-grid">
      {/* Hero */}
      <section className="section border-b border-grey-200 pt-40">
        <div className="wrap">
          <TechnicalLabel blue className="mb-6">
            COMPANY / BUILT IN INDIA
          </TechnicalLabel>
          <h1 className="type-h1 max-w-[13ch]">
            Engineering the control layer for global electrification.
          </h1>
          <p className="type-lead mt-8">
            A 75+ person team building electronics and software for mobility,
            storage and connected energy systems.
          </p>
        </div>
        <div className="wrap mt-16">
          <SmartImage
            src="/images/company/engineering-floor.webp"
            alt="The Webber engineering floor: benches, oscilloscopes and boards under test"
            ratio="16 / 7"
            loading="eager"
            placeholderLabel="ENGINEERING FLOOR"
          />
        </div>
      </section>

      {/* Founder-led narrative */}
      <section className="section relative">
        <BlueprintMeasure label="01 / FOUNDER" />
        <div className="wrap grid items-center gap-16 lg:grid-cols-[1fr_1.4fr]">
          <Reveal>
            <SmartImage
              src="/images/company/founder-portrait.webp"
              alt="Manuj Agrawal, Founder and CEO of Webber Electro Corp"
              ratio="4 / 5"
              placeholderLabel="FOUNDER PORTRAIT"
            />
          </Reveal>
          <Reveal delayMs={100}>
            <TechnicalLabel className="mb-6">FOUNDER</TechnicalLabel>
            <blockquote className="type-h3 max-w-[24ch]">
              “We started with a simple conviction: battery intelligence must be
              designed around the realities of the machine it protects.”
            </blockquote>
            <p className="type-small mt-4 text-grey-400">
              Draft statement, pending founder approval before publication.
            </p>
            <p className="spec-value mt-6">
              MANUJ AGRAWAL / FOUNDER &amp; CEO
            </p>
            <p className="type-body mt-8">
              Webber combines battery-domain engineering, power electronics,
              embedded software and field integration inside one
              product-development organisation.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Timeline */}
      <section className="section--tight relative border-t border-grey-200 bg-canvas-soft/70">
        <BlueprintMeasure label="02 / MILESTONES" />
        <div className="wrap">
          <Reveal>
            <SectionIntro label="MILESTONES" title="The company timeline." />
          </Reveal>
          <ol className="mt-14 space-y-0">
            {timeline.map((t, i) => (
              <Reveal as="li" key={`${t.year}-${t.event}`} delayMs={i * 40}>
                <div className="grid grid-cols-[64px_1fr] gap-6 border-t border-grey-200 py-6 md:grid-cols-[96px_280px_1fr]">
                  <span className="spec-value !text-blue-700">{t.year}</span>
                  <h3 className="type-h4 !text-[1.1rem]">{t.event}</h3>
                  <p className="type-body col-span-2 !text-[0.9375rem] md:col-span-1">
                    {t.detail}
                    {"pending" in t && t.pending ? (
                      <span className="micro-label ml-2 !text-grey-400">DATE TBC</span>
                    ) : null}
                  </p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* Operating scale */}
      <section className="section relative">
        <BlueprintMeasure label="03 / OPERATING SCALE" />
        <div className="wrap grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {scaleMetrics.map((m) => (
            <Reveal key={m.label}>
              <p className="spec-value !text-[2.25rem] !leading-none text-ink">{m.value}</p>
              <p className="micro-label micro-label--blue mt-3">{m.label}</p>
              <p className="type-body mt-3 !text-[0.9375rem]">{m.body}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Leadership grid */}
      <section
        id="leadership"
        className="section relative border-t border-grey-200 bg-canvas-soft/70"
      >
        <BlueprintMeasure label="04 / LEADERSHIP" />
        <div className="wrap">
          <Reveal>
            <SectionIntro label="LEADERSHIP" title="Role relevance, not long biographies." />
          </Reveal>
          <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {team.map((member, i) => (
              <Reveal
                as="li"
                key={member.slug}
                delayMs={(i % 3) * 50}
                className="card flex gap-4 p-5"
              >
                <Image
                  src={`/images/company/leadership/${member.slug}.webp`}
                  alt={`${member.name}, ${member.role}`}
                  width={160}
                  height={200}
                  className="h-28 w-24 shrink-0 rounded-[4px] border border-grey-200 object-cover object-top"
                />
                <div>
                  <h3 className="type-h4 !text-[1.15rem]">{member.name}</h3>
                  <p className="micro-label micro-label--blue mt-1">{member.role}</p>
                  <p className="type-small mt-3">{member.credentials}</p>
                  <p className="type-small mt-1 text-grey-700">{member.focus}</p>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* The wider team mosaic */}
      <section className="section relative">
        <BlueprintMeasure label="05 / THE WIDER TEAM" />
        <div className="wrap">
          <Reveal>
            <SectionIntro label="THE WIDER TEAM" title="Documentary, not stock." />
          </Reveal>
          <ul className="mt-14 grid grid-cols-2 gap-4 lg:grid-cols-3">
            {mosaic.map((m, i) => (
              <Reveal as="li" key={m.file} delayMs={(i % 3) * 50}>
                <figure className="relative">
                  <SmartImage
                    src={`/images/company/mosaic/${m.file}`}
                    alt={m.alt}
                    ratio="4 / 3"
                    placeholderLabel={m.label}
                  />
                  <figcaption className="micro-label absolute bottom-3 left-3 bg-white/90 px-2 py-1">
                    {m.label}
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* Partner ecosystem */}
      <section className="section--tight relative border-t border-grey-200 bg-canvas-soft/70">
        <BlueprintMeasure label="06 / ECOSYSTEM" />
        <div className="wrap">
          <Reveal>
            <SectionIntro label="ECOSYSTEM" title="Partners, organised by role." />
          </Reveal>
          <div className="mt-12 overflow-x-auto">
            <table className="spec-table min-w-[560px]">
              <thead>
                <tr>
                  <th scope="col">Role</th>
                  <th scope="col">Partners</th>
                </tr>
              </thead>
              <tbody>
                {partners.map((p) => (
                  <tr key={p.role}>
                    <td className="align-middle text-ink-soft">{p.role}</td>
                    <td>
                      {/* White cards so partner logos with solid backgrounds
                          sit cleanly against the tinted table rows */}
                      <ul className="flex flex-wrap items-start gap-4">
                        {p.names.map((name, i) => (
                          <li key={name} className="flex flex-col items-center gap-2">
                            <span className="logo-card logo-card--sm">
                              <Logo name={name} logo={p.logos[i]} />
                            </span>
                            <span className="micro-label text-center">{name}</span>
                          </li>
                        ))}
                      </ul>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <Recognition heading="AWARDS" measure="07 / AWARDS" />

      {/* Careers CTA */}
      <section className="section relative border-t border-grey-200">
        <BlueprintMeasure label="08 / JOIN US" accent />
        <div className="wrap">
          <Reveal>
            <h2 className="type-h2 max-w-[24ch]">
              The energy transition is a hardware problem, a software problem
              and a people problem.
            </h2>
            <p className="type-lead mt-6">Join the team solving all three.</p>
            <Link href="/contact#careers" className="btn btn-primary mt-10">
              View open roles
            </Link>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
