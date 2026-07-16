import type { Metadata } from "next";
import { ContactForms } from "@/components/contact/ContactForms.client";
import { Reveal } from "@/components/motion/Reveal.client";
import { SectionIntro, TechnicalLabel } from "@/components/ui/TechnicalLabel";
import { contact, jobs } from "@/content/company";

export const metadata: Metadata = {
  title: "Contact & Careers — Build with Webber",
  description:
    "Integrate a BMS, architect storage or join the team. Engineering enquiries, direct contact and open roles at Webber Electro Corp.",
};

export default function ContactPage() {
  const jobsJsonLd = jobs.map((job) => ({
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: job.role,
    datePosted: job.posted,
    employmentType: "FULL_TIME",
    hiringOrganization: {
      "@type": "Organization",
      name: "Webber Electro Corp",
      sameAs: "https://webberec.com",
    },
    jobLocation: {
      "@type": "Place",
      address: { "@type": "PostalAddress", addressCountry: "IN" },
    },
  }));

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jobsJsonLd) }}
      />

      {/* Hero */}
      <section className="section--tight border-b border-grey-200 pt-40">
        <div className="wrap">
          <TechnicalLabel blue className="mb-6">
            CONTACT / CAREERS
          </TechnicalLabel>
          <h1 className="type-h1 max-w-[10ch]">Build with Webber.</h1>
          <p className="type-lead mt-8">
            Whether you are integrating a BMS, architecting storage or joining
            the team, start here.
          </p>
        </div>
      </section>

      {/* Intent selector + forms */}
      <section id="enquiry" className="section--tight">
        <div className="wrap max-w-5xl">
          <ContactForms />
        </div>
      </section>

      {/* Direct contact */}
      <section className="section--tight border-t border-grey-200 bg-canvas-soft">
        <div className="wrap grid gap-10 md:grid-cols-2">
          <div>
            <TechnicalLabel className="mb-3">GENERAL ENQUIRIES</TechnicalLabel>
            <a href={`mailto:${contact.email}`} className="spec-value !text-[1.25rem] text-blue-700 underline-offset-4 hover:underline">
              {contact.email}
            </a>
          </div>
          <div>
            <TechnicalLabel className="mb-3">PHONE</TechnicalLabel>
            <a href={`tel:${contact.phone.replace(/\s/g, "")}`} className="spec-value !text-[1.25rem] text-ink">
              {contact.phone}
            </a>
          </div>
        </div>
      </section>

      {/* Careers */}
      <section id="careers" className="section">
        <div className="wrap">
          <Reveal>
            <SectionIntro
              label="CAREERS"
              title="Work on systems that move."
              lead="Hardware, embedded software, battery algorithms, validation, product integration and manufacturing."
            />
          </Reveal>
          <ul className="mt-14 space-y-px overflow-hidden rounded-[6px] border border-grey-200 bg-grey-200">
            {jobs.map((job) => (
              <li key={job.slug} className="bg-white">
                <a
                  href="#enquiry"
                  className="grid gap-2 p-6 transition-colors hover:bg-blue-50 md:grid-cols-[2fr_1fr_1fr_1fr_1fr]"
                >
                  <span className="type-h4 !text-[1.05rem]">{job.role}</span>
                  <span className="micro-label self-center">{job.department}</span>
                  <span className="micro-label self-center">{job.location}</span>
                  <span className="micro-label self-center">{job.experience}</span>
                  <span className="micro-label self-center">{job.type}</span>
                </a>
              </li>
            ))}
          </ul>

          <div className="spec-panel mt-14 p-8">
            <h3 className="type-h4">Don’t see your role?</h3>
            <p className="type-body mt-3">
              Send a concise note explaining the system, product or technical
              problem you are best equipped to solve — use the Careers option in
              the enquiry form above.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
