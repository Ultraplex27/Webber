import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy policy for Webber Electro Corp.",
};

export default function PrivacyPage() {
  return (
    <section className="section pt-40">
      <div className="wrap max-w-3xl">
        <p className="micro-label micro-label--blue mb-6">LEGAL</p>
        <h1 className="type-h2">Privacy policy.</h1>
        <p className="type-body mt-8">
          This page is a placeholder. The production privacy policy, covering
          enquiry-form data handling, résumé storage, telematics data
          processing and cookie usage, must be supplied by Webber’s legal
          counsel before launch.
        </p>
      </div>
    </section>
  );
}
