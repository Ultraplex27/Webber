import { CountUp } from "@/components/motion/CountUp.client";
import { BlueprintMeasure } from "@/components/motion/BlueprintMeasure.client";

const metrics = [
  { value: 75, suffix: "K+", label: "BMS deployments" },
  { text: "12V–1200V", label: "System range" },
  { value: 75, suffix: "+", label: "Engineers and operators" },
  { text: "AIS 156 PH-2", label: "Certified BMS variants" },
] as const;

export function ProofStrip() {
  return (
    <section
      id="proof"
      className="relative border-y border-grey-200 bg-canvas-soft/70"
      aria-label="Key metrics"
    >
      <BlueprintMeasure label="01 / FIELD DATA" />
      <div className="wrap">
        <dl className="grid grid-cols-2 divide-grey-200 md:grid-cols-4 md:divide-x">
          {metrics.map((m) => (
            <div key={m.label} className="px-2 py-8 md:px-8">
              <dd className="spec-value !text-[1.75rem] !leading-tight text-ink order-first">
                {"text" in m ? (
                  m.text
                ) : (
                  <CountUp value={m.value} suffix={m.suffix} />
                )}
              </dd>
              <dt className="micro-label mt-2">{m.label}</dt>
            </div>
          ))}
        </dl>
        <p className="type-small pb-4 text-grey-400">
          Deployment figures supplied by Webber.
        </p>
      </div>
    </section>
  );
}
