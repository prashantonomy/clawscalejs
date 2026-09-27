"use client";

import { HTMLTable } from "@clawscale/react";
import { Playground, usePlayground } from "@/components/docs/playground";

const RUNS = [
  { pipeline: "ingest-orders", region: "us-east-1", rows: 1204331 },
  { pipeline: "enrich-customers", region: "eu-west-1", rows: 88412 },
  { pipeline: "export-ledger", region: "us-east-1", rows: 14602118 },
  { pipeline: "train-forecast", region: "ap-southeast-2", rows: 402990 },
];

export default function HtmlTablePlayground() {
  const [props, options] = usePlayground({
    bordered: { type: "boolean", label: "Bordered", default: false },
    compact: { type: "boolean", label: "Compact", default: false },
    interactive: { type: "boolean", label: "Interactive", default: false },
    striped: { type: "boolean", label: "Striped", default: false },
  });
  return (
    <Playground options={options}>
      <HTMLTable {...props}>
        <thead>
          <tr>
            <th>Pipeline</th>
            <th>Region</th>
            <th style={{ textAlign: "right" }}>Rows</th>
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
            </tr>
          ))}
        </tbody>
      </HTMLTable>
    </Playground>
  );
}
