import type { Product } from "@/content/products";

/**
 * One genuine table per category (caption + row headers) rather than a
 * single long table, so the data stays navigable to screen readers. The
 * category/field set mirrors `docs/Webber_BMS_Product_Data_Template.xlsx`
 * 1:1, so intake data lands in the same place it's confirmed. Fields not
 * yet confirmed by the April 2026 profile or a controlled datasheet stay an
 * em dash rather than an invented value.
 */
const CATEGORIES: { category: string; rows: { field: string; value: (p: Product) => string }[] }[] = [
  {
    category: "Overview",
    rows: [
      { field: "Product family", value: (p) => p.family },
      { field: "Status", value: (p) => p.status },
    ],
  },
  {
    category: "Electrical",
    rows: [
      { field: "Nominal pack voltage range", value: (p) => p.nominalVoltage },
      { field: "Battery capacity range", value: (p) => p.batteryCapacity },
      { field: "Continuous current rating", value: (p) => p.continuousCurrent },
    ],
  },
  {
    category: "Balancing",
    rows: [{ field: "Balancing current", value: (p) => p.balancingCurrent }],
  },
  {
    category: "Architecture",
    rows: [
      { field: "Cell configuration", value: (p) => p.cellConfiguration },
      { field: "Architecture", value: (p) => p.architecture },
    ],
  },
  {
    category: "Applications",
    rows: [{ field: "Applications", value: (p) => p.applications }],
  },
  {
    category: "Communications",
    rows: [{ field: "Communications", value: (p) => p.communications }],
  },
  {
    category: "Mechanical",
    rows: [{ field: "Dimensions (L × W × H)", value: (p) => p.dimensions }],
  },
  {
    category: "Environmental",
    rows: [
      { field: "Operating temperature", value: (p) => p.operatingTemperature },
      { field: "Ingress protection", value: (p) => p.ingressProtection },
    ],
  },
  {
    category: "Safety",
    rows: [{ field: "Safety/protection features", value: (p) => p.safety }],
  },
  {
    category: "Compliance",
    rows: [{ field: "Certification/compliance", value: (p) => p.certification }],
  },
  {
    category: "Deployment",
    rows: [{ field: "Deployment / availability", value: (p) => p.deployment }],
  },
];

export function SpecificationTable({ product }: { product: Product }) {
  const grouped = CATEGORIES.map((g) => ({
    category: g.category,
    rows: g.rows.map((row) => ({ field: row.field, value: row.value(product) })),
  }));

  const hasUnconfirmed = grouped.some((g) => g.rows.some((row) => row.value === "—"));

  return (
    <div>
      <div className="gap-module grid md:grid-cols-2">
        {grouped.map((g) => (
          <table key={g.category} className="spec-card">
            <caption className="spec-card__caption">{g.category}</caption>
            <tbody>
              {g.rows.map((row) => (
                <tr key={row.field}>
                  <th scope="row">{row.field}</th>
                  <td>
                    <span className="spec-value">{row.value}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ))}
      </div>
      {hasUnconfirmed && (
        <p className="type-small mt-8 text-grey-400">
          —: not yet confirmed from controlled product data. Request the
          datasheet for released specifications.
        </p>
      )}
    </div>
  );
}
