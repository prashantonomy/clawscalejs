"use client";

import { Cell, Column, Table, Utils } from "@clawscale/react/table";
import { useState } from "react";
import { RUNS } from "../_data";

type Field = "pipeline" | "status" | "region" | "owner";

const COLUMNS: { field: Field; name: string }[] = [
  { field: "pipeline", name: "Pipeline" },
  { field: "status", name: "Status" },
  { field: "region", name: "Region" },
  { field: "owner", name: "Owner" },
];

export default function TableReordering() {
  const [columns, setColumns] = useState(COLUMNS);
  return (
    <div style={{ height: 240 }}>
      <Table
        numRows={RUNS.length}
        enableColumnReordering
        cellRendererDependencies={[columns]}
        onColumnsReordered={(from, to, length) =>
          setColumns((current) => Utils.reorderArray(current, from, to, length) ?? current)
        }
      >
        {columns.map(({ field, name }) => (
          <Column key={field} id={field} name={name} cellRenderer={(row) => <Cell>{RUNS[row]?.[field]}</Cell>} />
        ))}
      </Table>
    </div>
  );
}
