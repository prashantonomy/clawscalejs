"use client";

import { Button, TagInput } from "@clawscale/react";
import { useState } from "react";

const DEFAULT_DATASETS = ["orders_daily", "customer_profiles", "events_raw"];

export default function TagInputRightElement() {
  const [datasets, setDatasets] = useState(DEFAULT_DATASETS);
  const clearButton = (
    <Button aria-label="Clear datasets" icon="cross" variant="minimal" onClick={() => setDatasets([])} />
  );
  return (
    <TagInput
      inputProps={{ "aria-label": "Datasets" }}
      leftIcon="database"
      placeholder="Add datasets"
      rightElement={datasets.length > 0 ? clearButton : undefined}
      values={datasets}
      onChange={(values) => setDatasets(values.map(String))}
    />
  );
}
