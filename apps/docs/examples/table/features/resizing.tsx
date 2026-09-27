"use client";

import { Cell, Column, Table } from "@clawscale/react/table";
import { useState } from "react";
import { RUNS } from "../_data";

export default function TableResizing() {
  const [widths, setWidths] = useState([180, 130, 130]);
  return (
    <div style={{ height: 240 }}>
      <Table
        numRows={RUNS.length}
        columnWidths={widths}
        minColumnWidth={80}
        onColumnWidthChanged={(index, size) =>
          setWidths((current) => current.map((width, i) => (i === index ? size : width)))
        }
      >
        <Column name="Pipeline" cellRenderer={(row) => <Cell>{RUNS[row]?.pipeline}</Cell>} />
        <Column name="Region" cellRenderer={(row) => <Cell>{RUNS[row]?.region}</Cell>} />
        <Column name="Owner" cellRenderer={(row) => <Cell>{RUNS[row]?.owner}</Cell>} />
      </Table>
    </div>
  );
}
