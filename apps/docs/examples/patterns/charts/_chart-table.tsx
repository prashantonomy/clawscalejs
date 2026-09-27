export interface ChartTableProps {
  /** Names the chart, for example "Throughput by region, rows per second". */
  caption: string;
  /** Column headers. The first one labels the row headers. */
  columns: string[];
  /** One array per row. The first cell becomes the row header. */
  rows: string[][];
}

/** A chart's data as a table that only screen readers see. */
export function ChartTable({ caption, columns, rows }: ChartTableProps) {
  return (
    <table className="cs-visually-hidden">
      <caption>{caption}</caption>
      <thead>
        <tr>
          {columns.map((column) => (
            <th key={column} scope="col">
              {column}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map(([header, ...cells]) => (
          <tr key={header}>
            <th scope="row">{header}</th>
            {cells.map((cell, index) => (
              <td key={columns[index + 1]}>{cell}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
