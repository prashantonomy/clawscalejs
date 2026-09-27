"use client";

import { HTMLTable, Section, SectionCard } from "@clawscale/react";

const RUNS = [
  { id: 1284, status: "Succeeded", duration: "6 min 02 s", rows: "3.4M" },
  { id: 1283, status: "Failed", duration: "1 min 48 s", rows: "0" },
  { id: 1282, status: "Succeeded", duration: "5 min 51 s", rows: "3.3M" },
];

export default function SectionCards() {
  return (
    <Section icon="flows" title="refresh_revenue" subtitle="Last 3 runs">
      <SectionCard>Runs daily at 02:00 UTC. Median duration 6 min.</SectionCard>
      <SectionCard padded={false}>
        <HTMLTable compact style={{ width: "100%" }}>
          <thead>
            <tr>
              <th>Run</th>
              <th>Status</th>
              <th>Duration</th>
              <th>Rows</th>
            </tr>
          </thead>
          <tbody>
            {RUNS.map((run) => (
              <tr key={run.id}>
                <td>{run.id}</td>
                <td>{run.status}</td>
                <td>{run.duration}</td>
                <td>{run.rows}</td>
              </tr>
            ))}
          </tbody>
        </HTMLTable>
      </SectionCard>
    </Section>
  );
}
