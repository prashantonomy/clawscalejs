"use client";

import { SegmentedControl } from "@clawscale/react";
import { Cell, Column, RegionCardinality, SelectionModes, Table } from "@clawscale/react/table";
import { useState } from "react";
import { RUNS } from "../_data";

const MODES = {
  All: SelectionModes.ALL,
  Rows: SelectionModes.ROWS_ONLY,
  Columns: SelectionModes.COLUMNS_ONLY,
  Cells: [RegionCardinality.CELLS],
  None: SelectionModes.NONE,
};

type Mode = keyof typeof MODES;

export default function TableSelection() {
  const [mode, setMode] = useState<Mode>("Rows");
  return (
    <>
      <div>
        <SegmentedControl
          inline
          size="small"
          options={Object.keys(MODES).map((label) => ({ label, value: label }))}
          value={mode}
          onValueChange={(value) => setMode(value as Mode)}
        />
      </div>
      <div style={{ height: 240 }}>
        <Table numRows={RUNS.length} selectionModes={MODES[mode]}>
          <Column name="Pipeline" cellRenderer={(row) => <Cell>{RUNS[row]?.pipeline}</Cell>} />
          <Column name="Status" cellRenderer={(row) => <Cell>{RUNS[row]?.status}</Cell>} />
          <Column name="Owner" cellRenderer={(row) => <Cell>{RUNS[row]?.owner}</Cell>} />
        </Table>
      </div>
    </>
  );
}
