"use client";

import { Card, H5 } from "@clawscale/react";
import { useState } from "react";

const DATASETS = [
  { name: "orders_daily", rows: "1,204,331 rows" },
  { name: "customers", rows: "88,412 rows" },
  { name: "ledger_entries", rows: "14,602,118 rows" },
];

export default function CardInteractive() {
  const [selected, setSelected] = useState("orders_daily");
  return (
    <>
      {DATASETS.map((dataset) => (
        <Card
          key={dataset.name}
          interactive
          selected={dataset.name === selected}
          onClick={() => setSelected(dataset.name)}
          style={{ width: 200 }}
        >
          <H5>{dataset.name}</H5>
          <span className="cs-numeric">{dataset.rows}</span>
        </Card>
      ))}
    </>
  );
}
