"use client";

import { Cell, Column, Table } from "@clawscale/react/table";
import { formatRows, RUNS } from "../_data";

export default function TableStriped() {
  return (
    <div style={{ height: 240 }}>
      <Table className="bp6-table-striped" numRows={RUNS.length}>
        <Column name="Pipeline" cellRenderer={(row) => <Cell>{RUNS[row]?.pipeline}</Cell>} />
        <Column name="Region" cellRenderer={(row) => <Cell>{RUNS[row]?.region}</Cell>} />
        <Column name="Rows" cellRenderer={(row) => <Cell>{formatRows(RUNS[row]?.rows)}</Cell>} />
      </Table>
    </div>
  );
}
