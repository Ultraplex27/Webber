"use client";

import { useState } from "react";
import { contact } from "@/content/company";

type Intent = "oem" | "bess" | "careers";

const intents: { id: Intent; title: string; body: string }[] = [
  {
    id: "oem",
    title: "OEM / Battery integration",
    body: "Integrate a Webber BMS into a vehicle or pack programme.",
  },
  {
    id: "bess",
    title: "BESS and energy systems",
    body: "Architect C&I or utility storage with 48–1200V intelligence.",
  },
  {
    id: "careers",
    title: "Careers",
    body: "Join the hardware, software or systems team.",
  },
];

/**
 * NOTE: no submission backend is wired yet. The form validates client-side and
 * shows the confirmation state; connect the POST target (API route / CRM)
 * before launch. A mailto fallback is always visible.
 */
export function ContactForms() {
  const [intent, setIntent] = useState<Intent>("oem");
  const [submittedRef, setSubmittedRef] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const ref = `WEC-${String(Math.floor(1000 + Math.random() * 9000))}`;
    setSubmittedRef(ref);
    e.currentTarget.reset();
    window.scrollTo({ top: 0 });
  };

  if (submittedRef) {
    return (
      <div className="spec-panel mx-auto max-w-xl p-10 text-center">
        <p className="micro-label micro-label--blue">ENQUIRY RECEIVED / REF {submittedRef}</p>
        <p className="type-body mx-auto mt-6">
          An applications or commercial team member will review the operating
          requirements.
        </p>
        <button
          type="button"
          className="btn btn-secondary mt-8"
          onClick={() => setSubmittedRef(null)}
        >
          Submit another enquiry
        </button>
      </div>
    );
  }

  return (
    <div>
      {/* Intent selector */}
      <div className="gap-module grid md:grid-cols-3" role="tablist" aria-label="Enquiry type">
        {intents.map((item) => (
          <button
            key={item.id}
            role="tab"
            aria-selected={intent === item.id}
            aria-controls="intent-form"
            onClick={() => setIntent(item.id)}
            className={`min-h-[120px] rounded-[6px] border p-6 text-left transition-colors duration-200 ${
              intent === item.id
                ? "border-blue-600 bg-blue-50"
                : "border-grey-200 bg-white/60 backdrop-blur-xl backdrop-saturate-150 hover:border-grey-400"
            }`}
          >
            <span className={`type-h4 !text-[1.1rem] block ${intent === item.id ? "text-blue-800" : ""}`}>
              {item.title}
            </span>
            <span className="type-small mt-2 block">{item.body}</span>
          </button>
        ))}
      </div>

      <form id="intent-form" role="tabpanel" className="mt-12" onSubmit={handleSubmit} noValidate={false}>
        {intent === "careers" ? <CareersFields /> : <EngineeringFields intent={intent} />}
        <div className="mt-10 flex flex-wrap items-center gap-6">
          <button type="submit" className="btn btn-primary">
            {intent === "careers" ? "Send application" : "Submit enquiry"}
          </button>
          <p className="type-small">
            Or email directly:{" "}
            <a href={`mailto:${contact.email}`} className="text-blue-700 underline-offset-4 hover:underline">
              {contact.email}
            </a>
          </p>
        </div>
      </form>
    </div>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
  children,
  span2,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  children?: React.ReactNode;
  span2?: boolean;
}) {
  const id = `f-${name}`;
  return (
    <div className={`flex flex-col gap-2 ${span2 ? "md:col-span-2" : ""}`}>
      <label htmlFor={id} className="micro-label !text-ink-soft">
        {label}
        {required && <span className="text-error"> *</span>}
      </label>
      {children ?? (
        <input
          id={id}
          name={name}
          type={type}
          required={required}
          className="min-h-[44px] rounded-[3px] border border-grey-300 bg-white px-4 text-[0.9375rem] text-ink placeholder:text-grey-400"
        />
      )}
    </div>
  );
}

function Select({ name, options, required }: { name: string; options: string[]; required?: boolean }) {
  return (
    <select
      id={`f-${name}`}
      name={name}
      required={required}
      className="min-h-[44px] rounded-[3px] border border-grey-300 bg-white px-3 text-[0.9375rem] text-ink"
      defaultValue=""
    >
      <option value="" disabled>
        Select…
      </option>
      {options.map((o) => (
        <option key={o}>{o}</option>
      ))}
    </select>
  );
}

function EngineeringFields({ intent }: { intent: "oem" | "bess" }) {
  return (
    <fieldset className="grid gap-6 md:grid-cols-2">
      <legend className="type-h4 mb-8">
        {intent === "oem" ? "Engineering enquiry: battery integration" : "Engineering enquiry: energy systems"}
      </legend>
      <Field label="NAME" name="name" required />
      <Field label="COMPANY" name="company" required />
      <Field label="WORK EMAIL" name="email" type="email" required />
      <Field label="PHONE" name="phone" type="tel" />
      <Field label="COUNTRY" name="country" required />
      <Field label="APPLICATION" name="application" required>
        <Select
          name="application"
          required
          options={
            intent === "oem"
              ? ["2-wheeler", "3-wheeler", "Drone", "Inverter", "Telecom", "Other"]
              : ["C&I BESS", "Utility BESS", "Microgrid", "Telecom backup", "Other"]
          }
        />
      </Field>
      <Field label="TARGET SYSTEM VOLTAGE" name="voltage" required>
        <Select name="voltage" required options={["12–48 V", "48–96 V", "96–400 V", "400–800 V", "800–1200 V"]} />
      </Field>
      <Field label="CONTINUOUS / PEAK CURRENT" name="current" />
      <Field label="CELL CHEMISTRY" name="chemistry">
        <Select name="chemistry" options={["LFP", "NMC", "LTO", "Other / undecided"]} />
      </Field>
      <Field label="ESTIMATED ANNUAL VOLUME" name="volume" />
      <Field label="DEVELOPMENT STAGE" name="stage">
        <Select name="stage" options={["Concept", "Prototype", "Validation", "Production", "Field upgrade"]} />
      </Field>
      <Field label="REQUIRED CERTIFICATION" name="certification" />
      <Field label="DESIRED START DATE" name="start" type="date" />
      <Field label="SYSTEM BRIEF / SPECIFICATION SHEET" name="file">
        <input
          id="f-file"
          name="file"
          type="file"
          accept=".pdf,.doc,.docx,.xls,.xlsx"
          className="min-h-[44px] rounded-[3px] border border-grey-300 bg-white px-3 py-2 text-[0.875rem] text-grey-700 file:mr-4 file:rounded-[3px] file:border-0 file:bg-blue-50 file:px-3 file:py-1.5 file:text-blue-700"
        />
      </Field>
      <Field label="MESSAGE" name="message" span2>
        <textarea
          id="f-message"
          name="message"
          rows={5}
          className="rounded-[3px] border border-grey-300 bg-white px-4 py-3 text-[0.9375rem] text-ink"
        />
      </Field>
    </fieldset>
  );
}

function CareersFields() {
  return (
    <fieldset className="grid gap-6 md:grid-cols-2">
      <legend className="type-h4 mb-8">Open application</legend>
      <Field label="NAME" name="name" required />
      <Field label="EMAIL" name="email" type="email" required />
      <Field label="SPECIALISATION" name="specialisation" required>
        <Select
          name="specialisation"
          required
          options={[
            "Hardware / power electronics",
            "Embedded software",
            "Battery algorithms",
            "Validation / test",
            "Product integration",
            "Manufacturing / operations",
            "Other",
          ]}
        />
      </Field>
      <Field label="PORTFOLIO / GITHUB / LINKEDIN" name="portfolio" type="url" />
      <Field label="RÉSUMÉ" name="resume" required>
        <input
          id="f-resume"
          name="resume"
          type="file"
          required
          accept=".pdf,.doc,.docx"
          className="min-h-[44px] rounded-[3px] border border-grey-300 bg-white px-3 py-2 text-[0.875rem] text-grey-700 file:mr-4 file:rounded-[3px] file:border-0 file:bg-blue-50 file:px-3 file:py-1.5 file:text-blue-700"
        />
      </Field>
      <Field label="MESSAGE" name="message" span2>
        <textarea
          id="f-message-careers"
          name="message"
          rows={5}
          placeholder="Explain the system, product or technical problem you are best equipped to solve."
          className="rounded-[3px] border border-grey-300 bg-white px-4 py-3 text-[0.9375rem] text-ink placeholder:text-grey-400"
        />
      </Field>
    </fieldset>
  );
}
