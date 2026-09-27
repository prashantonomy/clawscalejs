"use client";

import { FormGroup, HTMLSelect } from "@clawscale/react";

const DATASETS = ["orders_daily", "customer_profiles", "events_raw", "inventory_snapshots"];

export default function HTMLSelectFill() {
  return (
    <FormGroup label="Source dataset" labelFor="html-select-dataset">
      <HTMLSelect fill id="html-select-dataset" options={DATASETS} />
    </FormGroup>
  );
}
