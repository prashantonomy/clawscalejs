"use client";

import { HTMLTable } from "@clawscale/react";

const RUNS = [
  { pipeline: "ingest-orders", region: "us-east-1", rows: 1204331, errors: 0 },
  { pipeline: "enrich-customers", region: "eu-west-1", rows: 88412, errors: 3 },
  { pipeline: "export-ledger", region: "us-east-1", rows: 14602118, errors: 0 },
  { pipeline: "train-forecast", region: "ap-southeast-2", rows: 402990, errors: 12 },
];

export default function HtmlTableBasic() {
  return (
    <HTMLTable>
      <thead>
        <tr>
          <th>Pipeline</th>
          <th>Region</th>
          <th style={{ textAlign: "right" }}>Rows</th>
          <th style={{ textAlign: "right" }}>Errors</th>
        </tr>
      </thead>
      <tbody>
        {RUNS.map((run) => (
          <tr key={run.pipeline}>
            <td>{run.pipeline}</td>
            <td>{run.region}</td>
            <td className="cs-numeric" style={{ textAlign: "right" }}>
              {run.rows.toLocaleString("en-US")}
            </td>
            <td className="cs-numeric" style={{ textAlign: "right" }}>
              {run.errors}
            </td>
          </tr>
        ))}
      </tbody>
    </HTMLTable>
  );
}
