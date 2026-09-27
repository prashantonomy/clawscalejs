"use client";

import { ClawscaleClasses, Delta, HTMLTable } from "@clawscale/react";

const pipelines = [
  { name: "orders-sync", runtime: "4m 12s", change: -8.4 },
  { name: "billing-export", runtime: "11m 03s", change: 12.9 },
  { name: "events-compact", runtime: "2m 47s", change: 0 },
  { name: "search-reindex", runtime: "26m 30s", change: 3.2 },
];

export default function DeltaTable() {
  return (
    <HTMLTable compact>
      <thead>
        <tr>
          <th>Pipeline</th>
          <th style={{ textAlign: "right" }}>Runtime</th>
          <th style={{ textAlign: "right" }}>vs last week</th>
        </tr>
      </thead>
      <tbody>
        {pipelines.map((pipeline) => (
          <tr key={pipeline.name}>
            <td>{pipeline.name}</td>
            <td className={ClawscaleClasses.NUMERIC} style={{ textAlign: "right" }}>
              {pipeline.runtime}
            </td>
            <td style={{ textAlign: "right" }}>
              <Delta value={pipeline.change} goodDirection="down" />
            </td>
          </tr>
        ))}
      </tbody>
    </HTMLTable>
  );
}
