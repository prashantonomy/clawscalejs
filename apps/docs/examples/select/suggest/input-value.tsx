"use client";

import { Suggest } from "@clawscale/react/select";
import { useState } from "react";
import { DATASETS, type Dataset, filterDataset } from "../_data";
import { renderDataset } from "../_renderers";

export default function SuggestInputValue() {
  const [dataset, setDataset] = useState(() => DATASETS.find((item) => item.name === "orders_daily") ?? null);
  return (
    <Suggest<Dataset>
      items={DATASETS}
      itemPredicate={filterDataset}
      itemRenderer={renderDataset}
      inputValueRenderer={(item) => `${item.owner}.${item.name}`}
      onItemSelect={setDataset}
      selectedItem={dataset}
    />
  );
}
