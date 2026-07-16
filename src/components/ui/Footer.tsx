import Link from "next/link";
import { contact } from "@/content/company";
import { ReduceMotionToggle } from "@/components/motion/ReduceMotionToggle.client";

const columns = [
  {
    heading: "Products",
    links: [
      { href: "/products", label: "BMS catalogue" },
      { href: "/products#telematics", label: "Telematics" },
      { href: "/products#roadmap", label: "Roadmap" },
    ],
  },
  {
    heading: "Technology",
    links: [
      { href: "/technology", label: "First-principle design" },
      { href: "/technology#certification", label: "Certification" },
      { href: "/technology#validation", label: "Validation" },
    ],
  },
  {
    heading: "Company",
    links: [
      { href: "/company", label: "About" },
      { href: "/company#leadership", label: "Leadership" },
      { href: "/contact#careers", label: "Careers" },
    ],
  },
  {
    heading: "Contact",
    links: [
      { href: "/contact", label: "Talk to engineering" },
      { href: `mailto:${contact.email}`, label: contact.email },
      { href: "/privacy", label: "Privacy" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-grey-200 bg-canvas-soft">
      <div className="wrap section--tight">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-4">
          {columns.map((col) => (
            <nav key={col.heading} aria-label={col.heading}>
              <p className="micro-label mb-4">{col.heading}</p>
              <ul className="space-y-2">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link
                      href={l.href}
                      className="text-[0.9375rem] text-grey-700 transition-colors hover:text-ink"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-16 flex flex-col gap-6 border-t border-grey-200 pt-8 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="font-[560] tracking-tight text-ink">WEBBER ELECTRO CORP</p>
            <p className="micro-label mt-1">BATTERY INTELLIGENCE / 12V—1200V</p>
          </div>
          <div className="flex items-center gap-6">
            <ReduceMotionToggle />
            <p className="type-small">
              © {new Date().getFullYear()} Webber Electro Corp
            </p>
          </div>
        </div>

        {/* Footer trace with idling electron */}
        <div className="mt-8 flex items-center gap-0" aria-hidden="true">
          <div className="trace-line flex-1" />
          <span className="electron-dot ml-1" />
        </div>
      </div>
    </footer>
  );
}
