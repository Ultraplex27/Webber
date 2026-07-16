import { awards } from "@/content/company";
import { Reveal } from "@/components/motion/Reveal.client";

/** Awards as technical credentials, not trophy cards. */
export function Recognition({ heading = "RECOGNISED BY INDUSTRY" }: { heading?: string }) {
  return (
    <section className="section--tight border-t border-grey-200">
      <div className="wrap">
        <p className="micro-label mb-10">{heading}</p>
        <ol className="grid gap-px overflow-hidden rounded-[6px] border border-grey-200 bg-grey-200 md:grid-cols-3">
          {awards.map((a, i) => (
            <Reveal key={a.title} as="li" delayMs={i * 50} className="bg-white p-8">
              <p className="spec-value !text-grey-400">0{i + 1}</p>
              <h3 className="type-h4 mt-4">{a.title}</h3>
              <p className="micro-label mt-3">{a.issuer}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
