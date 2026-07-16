import type { Metadata } from "next";
import { differentiators } from "@/content/differentiators";
import { SmartImage } from "@/components/ui/SmartImage.client";
import { Reveal } from "@/components/motion/Reveal.client";
import { SectionIntro, TechnicalLabel } from "@/components/ui/TechnicalLabel";
import { ClosingCta } from "@/components/ui/ClosingCta";
import {
  ArchitectureFlow,
  ChargingCurveChart,
  DispersionChart,
  IsolationDiagram,
} from "@/components/technology/TechCharts";

export const metadata: Metadata = {
  title: "Technology — First-Principle BMS Design",
  description:
    "Safety is a system, not a checklist. Battery control architectures designed around real operating conditions — paralleling, charging control, high-current balancing, metal-core thermal design and isolation.",
  openGraph: { images: ["/og/og-technology.png"] },
};

const patentLedger = [
  { tech: "Metal-core PCB architecture", status: "Patented", note: "Patent number to be published after legal confirmation" },
  { tech: "Battery paralleling without CAN dependency", status: "Status under confirmation", note: "Published as proprietary architecture until filing status is confirmed" },
  { tech: "Enhanced charging algorithm", status: "Status under confirmation", note: "Published as proprietary algorithm until filing status is confirmed" },
  { tech: "Balancing algorithms", status: "Trade secret / proprietary", note: "" },
];

const labShots = [
  { file: "thermal-testing.webp", label: "Thermal testing" },
  { file: "dead-short-testing.webp", label: "Dead-short testing" },
  { file: "vibration.webp", label: "Vibration" },
  { file: "environmental-cycling.webp", label: "Environmental cycling" },
  { file: "hil-validation.webp", label: "Hardware-in-loop validation" },
  { file: "end-of-line.webp", label: "Production end-of-line testing" },
];

const moduleVisuals: Record<string, React.ReactNode> = {
  charging: <ChargingCurveChart />,
  balancing: <DispersionChart />,
  isolation: <IsolationDiagram />,
  thermal: (
    <SmartImage
      src="/images/technology/thermal-comparison.webp"
      alt="Thermal map comparison: standard FR-4 board versus cooler metal-core board"
      ratio="16 / 9"
      placeholderLabel="THERMAL MAP / FR-4 VS METAL-CORE"
    />
  ),
  paralleling: (
    <svg viewBox="0 0 400 220" className="w-full" role="img" aria-label="Two battery packs operating in parallel without inter-pack CAN communication">
      {[40, 230].map((x, i) => (
        <g key={i}>
          <rect x={x} y="50" width="130" height="90" rx="4" fill="var(--grey-50)" stroke="var(--grey-300)" />
          <text x={x + 14} y="75" style={{ font: "500 10px var(--font-mono)", letterSpacing: "0.08em", fill: "var(--grey-500)" }}>
            PACK {i + 1}
          </text>
          <text x={x + 14} y="95" style={{ font: "500 12px var(--font-mono)", fill: "var(--ink-soft)" }}>
            SOC {i === 0 ? "84%" : "51%"}
          </text>
          <path d={`M${x + 65} 140 V 175`} stroke="var(--blue-600)" strokeWidth="2" />
        </g>
      ))}
      <path d="M105 175 H 295" stroke="var(--blue-600)" strokeWidth="2" />
      <text x="140" y="200" style={{ font: "500 10px var(--font-mono)", letterSpacing: "0.08em", fill: "var(--blue-700)" }}>
        SHARED BUS / NO INTER-PACK CAN
      </text>
      {/* struck-through CAN link */}
      <path d="M170 95 H 230" stroke="var(--grey-400)" strokeDasharray="4 4" />
      <line x1="190" y1="82" x2="210" y2="108" stroke="var(--error)" strokeWidth="1.5" />
    </svg>
  ),
};

export default function TechnologyPage() {
  return (
    <>
      {/* Hero */}
      <section className="section border-b border-grey-200 pt-40">
        <div className="wrap grid items-center gap-16 lg:grid-cols-2">
          <div>
            <TechnicalLabel blue className="mb-6">
              FIRST-PRINCIPLE DESIGN
            </TechnicalLabel>
            <h1 className="type-h1 max-w-[12ch]">
              Safety is a system, not a checklist.
            </h1>
            <p className="type-lead mt-8">
              Battery control architectures designed around real operating
              conditions — not ideal laboratory assumptions.
            </p>
          </div>
          <SmartImage
            src="/images/technology/board-exploded.webp"
            alt="Exploded BMS board stack showing copper, metal-core layer, isolation boundaries and protection zones"
            ratio="4 / 3"
            loading="eager"
            placeholderLabel="EXPLODED BOARD STACK"
          />
        </div>
      </section>

      {/* Architecture overview */}
      <section className="section bg-canvas-soft">
        <div className="wrap">
          <Reveal className="text-center">
            <TechnicalLabel className="mb-6">SYSTEM ARCHITECTURE</TechnicalLabel>
            <h2 className="type-h3 mx-auto max-w-[20ch]">
              From cell measurement to fleet decision.
            </h2>
          </Reveal>
          <Reveal delayMs={100} className="mt-14">
            <ArchitectureFlow />
          </Reveal>
        </div>
      </section>

      {/* Differentiator modules */}
      <section className="section">
        <div className="wrap space-y-24">
          {differentiators.map((d, i) => (
            <Reveal key={d.id}>
              <article className="grid items-center gap-12 lg:grid-cols-2">
                <div className={i % 2 === 1 ? "lg:order-2" : ""}>
                  <TechnicalLabel blue className="mb-4">
                    0{i + 1} / {d.label}
                  </TechnicalLabel>
                  <h2 className="type-h3">{d.headline}</h2>
                  <dl className="mt-8 space-y-5">
                    <div>
                      <dt className="micro-label">THE PROBLEM</dt>
                      <dd className="type-body mt-1">{d.problem}</dd>
                    </div>
                    <div>
                      <dt className="micro-label">THE APPROACH</dt>
                      <dd className="type-body mt-1">{d.approach}</dd>
                    </div>
                    <div>
                      <dt className="micro-label">THE SYSTEM ADVANTAGE</dt>
                      <dd className="type-body mt-1">{d.advantage}</dd>
                    </div>
                  </dl>
                  <p className="spec-value mt-6 inline-block border border-grey-200 bg-grey-50 px-3 py-2">
                    {d.ipStatus}
                  </p>
                </div>
                <div className={`card p-6 ${i % 2 === 1 ? "lg:order-1" : ""}`}>
                  {moduleVisuals[d.id]}
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Patent ledger */}
      <section className="section--tight border-t border-grey-200">
        <div className="wrap">
          <Reveal>
            <SectionIntro
              label="INTELLECTUAL PROPERTY"
              title="Patent ledger."
              lead="Precise legal states only — no technology is presented as 'patentable'. All statuses pending legal confirmation before publication."
            />
          </Reveal>
          <div className="mt-12 overflow-x-auto">
            <table className="spec-table min-w-[640px]">
              <thead>
                <tr>
                  <th scope="col">Technology</th>
                  <th scope="col">Status</th>
                  <th scope="col">Note</th>
                </tr>
              </thead>
              <tbody>
                {patentLedger.map((row) => (
                  <tr key={row.tech}>
                    <td className="text-ink-soft">{row.tech}</td>
                    <td className="spec-value">{row.status}</td>
                    <td className="type-small">{row.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Certification */}
      <section id="certification" className="section bg-canvas-soft">
        <div className="wrap grid gap-16 lg:grid-cols-2">
          <Reveal>
            <SectionIntro
              label="COMPLIANCE"
              title={
                <>
                  Engineered for certification.
                  <br />
                  Validated for deployment.
                </>
              }
            />
          </Reveal>
          <Reveal delayMs={100}>
            <div className="card p-8">
              <TechnicalLabel blue className="mb-4">
                AIS 156 / PHASE 2
              </TechnicalLabel>
              <h3 className="type-h4">WBMS-SW 16S/24S certified variants</h3>
              <dl className="mt-6 space-y-3">
                {[
                  ["Applicable variants", "WBMS-SW 16S / 24S (certified configuration)"],
                  ["Functional scope", "µSD card and buzzer integration per AIS 156 PH-2"],
                  ["Test laboratory", "To be published"],
                  ["Certificate reference", "To be published"],
                ].map(([k, v]) => (
                  <div key={k} className="flex flex-col gap-1 border-b border-grey-100 pb-3 sm:flex-row sm:justify-between">
                    <dt className="micro-label">{k}</dt>
                    <dd className="spec-value sm:text-right">{v}</dd>
                  </div>
                ))}
              </dl>
              <p className="type-small mt-6 text-grey-400">
                Certification applies to tested configurations only. Individual products do not
                inherit certification from other tested configurations — confirm applicability per
                variant with our applications team.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Validation and testing */}
      <section id="validation" className="section">
        <div className="wrap">
          <Reveal>
            <SectionIntro
              label="VALIDATION"
              title={
                <>
                  Designed at the bench.
                  <br />
                  Proven in the field.
                </>
              }
              lead="Every design passes through thermal, abuse, vibration and environmental testing, hardware-in-loop validation, production end-of-line testing — and 75K+ systems of field data feed back into the next revision."
            />
          </Reveal>
          <ul className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {labShots.map((shot, i) => (
              <Reveal as="li" key={shot.file} delayMs={(i % 3) * 50}>
                <figure>
                  <SmartImage
                    src={`/images/technology/lab/${shot.file}`}
                    alt={shot.label}
                    ratio="3 / 2"
                    placeholderLabel={shot.label.toUpperCase()}
                  />
                  <figcaption className="micro-label mt-3">{shot.label.toUpperCase()}</figcaption>
                </figure>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* Software and data layer */}
      <section className="section--tight border-t border-grey-200 bg-canvas-soft">
        <div className="wrap">
          <Reveal>
            <SectionIntro
              label="SOFTWARE + DATA"
              title={
                <>
                  Edge decisions in milliseconds.
                  <br />
                  Fleet insight over millions of events.
                </>
              }
              lead="Firmware makes protection decisions at the edge. 4G/IoT telematics streams system health to the cloud, where fault detection and trend analysis run today — with predictive-maintenance models in development for BESS."
            />
          </Reveal>
        </div>
      </section>

      <ClosingCta
        title="Bring us the operating envelope."
        body="Voltage. Current. Packaging. Thermal constraints. Communication. Certification. Deployment volume."
        ctaLabel="Speak with the engineering team"
        ctaHref="/contact"
      />
    </>
  );
}
