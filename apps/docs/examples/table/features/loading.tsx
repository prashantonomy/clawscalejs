"use client";

import { Switch } from "@clawscale/react";
import { Cell, Column, Table, TableLoadingOption } from "@clawscale/react/table";
import { useState } from "react";
import { formatRows, RUNS } from "../_data";

const EVERYTHING = [TableLoadingOption.CELLS, TableLoadingOption.COLUMN_HEADERS, TableLoadingOption.ROW_HEADERS];

export default function TableLoading() {
  const [loading, setLoading] = useState(true);
  return (
    <>
      <Switch checked={loading} label="Loading" onChange={(event) => setLoading(event.currentTarget.checked)} />
      <div style={{ height: 240 }}>
        <Table numRows={RUNS.length} loadingOptions={loading ? EVERYTHING : []}>
          <Column name="Pipeline" cellRenderer={(row) => <Cell>{RUNS[row]?.pipeline}</Cell>} />
          <Column name="Region" cellRenderer={(row) => <Cell>{RUNS[row]?.region}</Cell>} />
          <Column name="Rows" cellRenderer={(row) => <Cell>{formatRows(RUNS[row]?.rows)}</Cell>} />
        </Table>
      </div>
    </>
  );
}
