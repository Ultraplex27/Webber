import type { Product, SpecRow } from "@/content/products";

const CATEGORY_ORDER: SpecRow["category"][] = [
  "Electrical",
  "Balancing",
  "Architecture",
  "Communications",
  "Sensing",
  "Safety",
  "Environmental",
  "Mechanical",
  "Compliance",
  "Deployment",
];

export function SpecificationTable({ product }: { product: Product }) {
  const grouped = CATEGORY_ORDER.map((cat) => ({
    cat,
    rows: product.specs.filter((s) => s.category === cat),
  })).filter((g) => g.rows.length > 0);

  const hasPending = product.specs.some((s) => s.pendingVerification);

  return (
    <div className="overflow-x-auto">
      <table className="spec-table">
        <caption className="sr-only">Full specifications for {product.name}</caption>
        <thead>
          <tr>
            <th scope="col" className="w-40">Category</th>
            <th scope="col" className="w-52">Field</th>
            <th scope="col">Value</th>
          </tr>
        </thead>
        <tbody>
          {grouped.map((g) =>
            g.rows.map((row, i) => (
              <tr key={`${g.cat}-${row.field}`}>
                {i === 0 ? (
                  <th scope="rowgroup" rowSpan={g.rows.length} className="align-top">
                    {g.cat}
                  </th>
                ) : null}
                <td className="text-grey-700">{row.field}</td>
                <td className="spec-value">
                  {row.value}
                  {row.pendingVerification && (
                    <span className="micro-label ml-2 !text-grey-400" title="To be confirmed from controlled product data">
                      TBC*
                    </span>
                  )}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      {hasPending && (
        <p className="type-small mt-3 text-grey-400">
          *TBC — indicative value pending confirmation from controlled product data. Request the
          datasheet for released specifications.
        </p>
      )}
    </div>
  );
}
