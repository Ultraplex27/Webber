import type { Metadata } from "next";
import { ContactForms } from "@/components/contact/ContactForms.client";
import { TechnicalLabel } from "@/components/ui/TechnicalLabel";
import { BlueprintMeasure } from "@/components/motion/BlueprintMeasure.client";
import { contact } from "@/content/company";

export const metadata: Metadata = {
  title: "Contact: Build with Webber",
  description:
    "Integrate a BMS or architect storage. Engineering enquiries and direct contact for Webber Electro Corp.",
};

export default function ContactPage() {
  return (
    <div className="pencil-grid">
      {/* Hero */}
      <section className="section--tight border-b border-grey-200 pt-40">
        <div className="wrap text-center">
          <TechnicalLabel blue className="mb-6">
            CONTACT
          </TechnicalLabel>
          <h1 className="type-h1 mx-auto max-w-[10ch]">Build with Webber.</h1>
          <p className="type-lead mx-auto mt-8 max-w-[46ch]">
            Send a message and our engineering team will get back to you.
          </p>
        </div>
      </section>

      {/* Contact form + direct contact */}
      <section id="enquiry" className="section--tight relative">
        <BlueprintMeasure label="01 / ENQUIRY" />
        <div className="wrap">
          <h2 className="type-h3 mb-10">Send us a message</h2>
          <div className="grid items-start gap-12 lg:grid-cols-[1fr_320px]">
            <ContactForms />

            <div className="spec-panel p-8 lg:sticky lg:top-24">
              <TechnicalLabel blue className="mb-6">
                DIRECT CONTACT
              </TechnicalLabel>
              <div className="space-y-6">
                <div>
                  <TechnicalLabel className="mb-2">EMAIL</TechnicalLabel>
                  <a
                    href={`mailto:${contact.email}`}
                    className="spec-value block text-blue-700 underline-offset-4 hover:underline"
                  >
                    {contact.email}
                  </a>
                </div>
                <div>
                  <TechnicalLabel className="mb-2">PHONE</TechnicalLabel>
                  <a
                    href={`tel:${contact.phone.replace(/\s/g, "")}`}
                    className="spec-value block text-ink"
                  >
                    {contact.phone}
                  </a>
                </div>
                <div>
                  <TechnicalLabel className="mb-2">ADDRESS</TechnicalLabel>
                  <p className="spec-value text-ink">{contact.address}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
