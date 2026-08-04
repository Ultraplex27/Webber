import type { Product } from "@/content/products";

/**
 * One genuine table per category (caption + row headers) rather than a
 * single long table, so the data stays navigable to screen readers. The
 * category/field set mirrors `Assets/Webber_BMS_Product_Data_Template.xlsx`
 * ("Products" sheet) 1:1, so intake data lands in the same place it's
 * confirmed. Fields not yet confirmed there are an em dash, never invented.
 */
const CATEGORIES: { category: string; rows: { field: string; value: (p: Product) => string }[] }[] = [
  {
    category: "Electrical",
    rows: [
      { field: "Typical nominal pack voltage", value: (p) => p.nominalVoltage },
      { field: "Variants", value: (p) => p.variants },
      { field: "Battery capacity range", value: (p) => p.batteryCapacity },
      { field: "Continuous current rating", value: (p) => p.continuousCurrent },
      { field: "Balancing current", value: (p) => p.balancingCurrent },
    ],
  },
  {
    category: "Architecture",
    rows: [
      { field: "Max cell configuration", value: (p) => p.cellConfiguration },
      { field: "Architecture", value: (p) => p.architecture },
    ],
  },
  {
    category: "Applications",
    rows: [
      { field: "Application", value: (p) => p.application },
      { field: "Other applications", value: (p) => p.otherApplications },
    ],
  },
  {
    category: "Communications",
    rows: [
      { field: "Communications", value: (p) => p.communications },
      { field: "Data storage", value: (p) => p.dataStorage },
    ],
  },
  {
    category: "Mechanical & environmental",
    rows: [
      { field: "Dimensions (L × W × H)", value: (p) => p.dimensions },
      { field: "Operating temperature", value: (p) => p.operatingTemperature },
    ],
  },
  {
    category: "Safety & compliance",
    rows: [
      { field: "Safety/protection features", value: (p) => p.safety },
      { field: "Certification/compliance", value: (p) => p.certification },
    ],
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
      <div className="gap-module grid items-start md:grid-cols-2 lg:grid-cols-3">
        {grouped.map((g) => (
          <table key={g.category} className="spec-card">
            <caption className="spec-card__caption">{g.category}</caption>
            <tbody>
              {g.rows.map((row) => (
                <tr key={row.field}>
                  <th scope="row">{row.field}</th>
                  <td>
                    <span className="spec-value whitespace-pre-line">{row.value}</span>
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
