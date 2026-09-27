"use client";

import { Cell, Column, Table } from "@clawscale/react/table";
import { formatDuration, formatRows, type PipelineRun, RUNS } from "../_data";

const COLUMNS: [name: string, value: (run: PipelineRun) => string][] = [
  ["Pipeline", (run) => run.pipeline],
  ["Status", (run) => run.status],
  ["Rows", (run) => formatRows(run.rows)],
  ["Duration", (run) => formatDuration(run.duration)],
  ["Region", (run) => run.region],
  ["Owner", (run) => run.owner],
  ["Started", (run) => run.started],
  ["Run", (run) => run.id],
];

export default function TableFrozen() {
  return (
    <div style={{ height: 220 }}>
      <Table numRows={RUNS.length} numFrozenColumns={1} numFrozenRows={2}>
        {COLUMNS.map(([name, value]) => (
          <Column
            key={name}
            name={name}
            cellRenderer={(row) => {
              const run = RUNS[row];
              return <Cell>{run && value(run)}</Cell>;
            }}
          />
        ))}
      </Table>
    </div>
  );
}
