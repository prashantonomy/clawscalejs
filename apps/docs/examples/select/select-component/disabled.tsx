"use client";

import { Button } from "@clawscale/react";
import { Select } from "@clawscale/react/select";
import { useState } from "react";
import { DATASETS, type Dataset, filterDataset } from "../_data";
import { renderDataset } from "../_renderers";

export default function SelectDisabled() {
  const [dataset, setDataset] = useState<Dataset>();
  return (
    <Select<Dataset>
      items={DATASETS}
      itemDisabled="archived"
      itemPredicate={filterDataset}
      itemRenderer={renderDataset}
      onItemSelect={setDataset}
    >
      <Button endIcon="caret-down" icon="database" text={dataset?.name ?? "Select a dataset"} />
    </Select>
  );
}
