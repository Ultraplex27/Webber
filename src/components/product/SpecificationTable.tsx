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

/**
 * Specifications as one small table per category rather than a single long
 * table with rowspan'd category cells, which read as a data dump and left the
 * category column stranded beside its rows.
 *
 * Still genuine tables (each category is a table with a caption and row
 * headers), so the data stays navigable to screen readers and is not faked with
 * divs; the cards are only how they are presented.
 */
export function SpecificationTable({ product }: { product: Product }) {
  const grouped = CATEGORY_ORDER.map((cat) => ({
    cat,
    rows: product.specs.filter((s) => s.category === cat),
  })).filter((g) => g.rows.length > 0);

  const hasPending = product.specs.some((s) => s.pendingVerification);

  return (
    <div>
      <div className="gap-module grid md:grid-cols-2">
        {grouped.map((g) => (
          <table key={g.cat} className="spec-card">
            <caption className="spec-card__caption">{g.cat}</caption>
            <tbody>
              {g.rows.map((row) => (
                <tr key={row.field}>
                  <th scope="row">{row.field}</th>
                  <td>
                    <span className="spec-value">{row.value}</span>
                    {row.pendingVerification && (
                      <span
                        className="spec-tbc"
                        title="To be confirmed from controlled product data"
                      >
                        TBC
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ))}
      </div>
      {hasPending && (
        <p className="type-small mt-8 text-grey-400">
          TBC: indicative value pending confirmation from controlled product
          data. Request the datasheet for released specifications.
        </p>
      )}
    </div>
  );
}
