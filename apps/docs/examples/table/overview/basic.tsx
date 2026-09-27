"use client";

import { Cell, Column, Table } from "@clawscale/react/table";
import { formatDuration, formatRows, RUNS, STATUS_INTENT } from "../_data";

const numeric = { textAlign: "right" } as const;

export default function TableBasic() {
  return (
    <div style={{ height: 300 }}>
      <Table numRows={RUNS.length}>
        <Column name="Pipeline" cellRenderer={(row) => <Cell>{RUNS[row]?.pipeline}</Cell>} />
        <Column
          name="Status"
          cellRenderer={(row) => {
            const status = RUNS[row]?.status;
            return <Cell intent={status && STATUS_INTENT[status]}>{status}</Cell>;
          }}
        />
        <Column name="Rows" cellRenderer={(row) => <Cell style={numeric}>{formatRows(RUNS[row]?.rows)}</Cell>} />
        <Column
          name="Duration"
          cellRenderer={(row) => <Cell style={numeric}>{formatDuration(RUNS[row]?.duration)}</Cell>}
        />
      </Table>
    </div>
  );
}
