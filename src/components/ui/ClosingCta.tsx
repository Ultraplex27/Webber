import Link from "next/link";
import { Reveal } from "@/components/motion/Reveal.client";

interface ClosingCtaProps {
  title: React.ReactNode;
  body: React.ReactNode;
  ctaLabel: string;
  ctaHref: string;
}

/** Wide white CTA with a blue trace entering from the left, terminating at the button. */
export function ClosingCta({ title, body, ctaLabel, ctaHref }: ClosingCtaProps) {
  return (
    <section className="section border-t border-grey-200">
      <div className="wrap">
        <Reveal>
          <h2 className="type-h2 max-w-[18ch]">{title}</h2>
          <p className="type-lead mt-6">{body}</p>
          <div className="mt-12 flex items-center gap-6">
            <div className="trace-line hidden flex-1 md:block" aria-hidden="true" />
            <Link href={ctaHref} className="btn btn-primary">
              {ctaLabel}
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
