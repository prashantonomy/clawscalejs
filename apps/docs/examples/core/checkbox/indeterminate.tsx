"use client";

import { Checkbox } from "@clawscale/react";
import { useState } from "react";

const DATASETS = ["orders_daily", "customer_profiles", "events_raw", "inventory_snapshots"];

export default function CheckboxIndeterminate() {
  const [selected, setSelected] = useState(["orders_daily", "events_raw"]);
  const toggle = (name: string, checked: boolean) =>
    setSelected((current) => (checked ? [...current, name] : current.filter((item) => item !== name)));
  return (
    <div>
      <Checkbox
        checked={selected.length === DATASETS.length}
        indeterminate={selected.length > 0 && selected.length < DATASETS.length}
        label={`Select all (${selected.length} of ${DATASETS.length})`}
        onChange={(event) => setSelected(event.currentTarget.checked ? DATASETS : [])}
      />
      <div style={{ paddingLeft: 26 }}>
        {DATASETS.map((name) => (
          <Checkbox
            key={name}
            checked={selected.includes(name)}
            label={name}
            onChange={(event) => toggle(name, event.currentTarget.checked)}
          />
        ))}
      </div>
    </div>
  );
}
