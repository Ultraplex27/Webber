"use client";

import { useState } from "react";
import { contact } from "@/content/company";

type Status = "idle" | "sending" | "sent" | "error";

const APPLICATION_OPTIONS = ["2 Wheeler", "3 Wheeler", "ESS", "Forklifts", "Telecom", "Others"];
const VOLTAGE_OPTIONS = [
  "12V", "24V", "48V", "60V", "72V", "96V", "102V", "120V",
  "150V–180V", "250V–300V", "350V–450V", "450V–500V",
];
const CURRENT_OPTIONS = ["30A", "45A", "60A", "80A", "125A", "150A", "200A", "250A", "300A", "500A"];
const CHEMISTRY_OPTIONS = ["NMC", "LFP"];

/**
 * Submits directly to FormSubmit (https://formsubmit.co) — no backend of our
 * own, no API keys. The destination inbox (`contact.email`) must click the
 * one-time activation link FormSubmit emails it the first time this form is
 * submitted; submissions before that click are silently swallowed by
 * FormSubmit, not lost by this code.
 */
const ENDPOINT = `https://formsubmit.co/ajax/${contact.email}`;

export function ContactForms() {
  const [status, setStatus] = useState<Status>("idle");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("sending");
    const form = e.currentTarget;
    try {
      const res = await fetch(ENDPOINT, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: new FormData(form),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("sent");
      form.reset();
    } catch {
      setStatus("error");
    }
  };

  if (status === "sent") {
    return (
      <div className="spec-panel max-w-xl p-10 text-center">
        <p className="micro-label micro-label--blue">MESSAGE SENT</p>
        <p className="type-body mx-auto mt-6">
          Thanks for reaching out — our team will get back to you shortly.
        </p>
        <button
          type="button"
          className="btn btn-secondary mt-8"
          onClick={() => setStatus("idle")}
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form className="max-w-xl" onSubmit={handleSubmit}>
      <input type="hidden" name="_subject" value="New enquiry from webberec.com" />
      <input type="hidden" name="_template" value="table" />
      <input type="hidden" name="_captcha" value="false" />
      <input type="text" name="_honey" className="hidden" tabIndex={-1} autoComplete="off" />

      <fieldset className="grid gap-6">
        <Field label="NAME" name="name" required />
        <Field label="EMAIL" name="email" type="email" required />
        <Field label="PHONE NUMBER" name="phone" type="tel" />
        <div className="grid grid-cols-2 gap-6">
          <SelectField label="APPLICATION" name="application" options={APPLICATION_OPTIONS} />
          <SelectField label="NOMINAL VOLTAGE" name="nominal_voltage" options={VOLTAGE_OPTIONS} />
        </div>
        <div className="grid grid-cols-2 gap-6">
          <SelectField label="NOMINAL CURRENT" name="nominal_current" options={CURRENT_OPTIONS} />
          <SelectField label="CELL CHEMISTRY" name="cell_chemistry" options={CHEMISTRY_OPTIONS} />
        </div>
        <Field label="MESSAGE" name="message" required>
          <textarea
            id="f-message"
            name="message"
            rows={5}
            required
            className="rounded-[3px] border border-grey-300 bg-white px-4 py-3 text-base text-ink"
          />
        </Field>
      </fieldset>

      <div className="mt-10 flex flex-wrap items-center gap-6">
        <button type="submit" className="btn btn-primary" disabled={status === "sending"} aria-disabled={status === "sending"}>
          {status === "sending" ? "Sending…" : "Submit"}
        </button>
        <p className="type-small">
          Or email directly:{" "}
          <a href={`mailto:${contact.email}`} className="text-blue-700 underline-offset-4 hover:underline">
            {contact.email}
          </a>
        </p>
      </div>
      {status === "error" && (
        <p className="type-small mt-4 text-error">
          Something went wrong sending that — please try again, or use the
          email link above.
        </p>
      )}
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
  children,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  children?: React.ReactNode;
}) {
  const id = `f-${name}`;
  return (
    <div className="flex flex-col gap-2">
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
          className="min-h-[44px] rounded-[3px] border border-grey-300 bg-white px-4 text-base text-ink placeholder:text-grey-400"
        />
      )}
    </div>
  );
}

function SelectField({
  label,
  name,
  options,
}: {
  label: string;
  name: string;
  options: string[];
}) {
  const id = `f-${name}`;
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="micro-label !text-ink-soft">
        {label}
      </label>
      <select
        id={id}
        name={name}
        defaultValue=""
        className="min-h-[44px] rounded-[3px] border border-grey-300 bg-white px-4 text-base text-ink"
      >
        <option value="" disabled>
          Select…
        </option>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </div>
  );
}
