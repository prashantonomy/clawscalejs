"use client";

import { Cell, Column, JSONFormat, Table, TruncatedFormat } from "@clawscale/react/table";
import { RUNS } from "../_data";

export default function TableFormats() {
  return (
    <div style={{ height: 240 }}>
      <Table numRows={RUNS.length} columnWidths={[140, 280, 240]}>
        <Column name="Pipeline" cellRenderer={(row) => <Cell>{RUNS[row]?.pipeline}</Cell>} />
        <Column
          name="Message"
          cellRenderer={(row) => (
            <Cell>
              <TruncatedFormat detectTruncation>{RUNS[row]?.message}</TruncatedFormat>
            </Cell>
          )}
        />
        <Column
          name="Record"
          cellRenderer={(row) => (
            <Cell>
              <JSONFormat detectTruncation>{RUNS[row]}</JSONFormat>
            </Cell>
          )}
        />
      </Table>
    </div>
  );
}
