"use client";

import { Cell, Column, EditableCell, Table } from "@clawscale/react/table";
import { useState } from "react";
import { RUNS } from "../_data";

export default function TableEditable() {
  const [owners, setOwners] = useState(() => RUNS.map((run) => run.owner));
  const rename = (row: number, owner: string) =>
    setOwners((current) => current.map((value, index) => (index === row ? owner : value)));
  return (
    <div style={{ height: 240 }}>
      <Table numRows={RUNS.length} cellRendererDependencies={[owners]}>
        <Column name="Pipeline" cellRenderer={(row) => <Cell>{RUNS[row]?.pipeline}</Cell>} />
        <Column
          name="Owner"
          cellRenderer={(row) => <EditableCell value={owners[row]} onConfirm={(owner) => rename(row, owner)} />}
        />
      </Table>
    </div>
  );
}
