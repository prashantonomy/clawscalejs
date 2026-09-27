"use client";

import { Suggest } from "@clawscale/react/select";
import { useState } from "react";
import { DATASETS, type Dataset, filterDataset } from "../_data";
import { renderDataset } from "../_renderers";

export default function SuggestResetOnClose() {
  const [dataset, setDataset] = useState<Dataset | null>(null);
  return (
    <Suggest<Dataset>
      items={DATASETS}
      itemPredicate={filterDataset}
      itemRenderer={renderDataset}
      inputProps={{ placeholder: "Search datasets" }}
      inputValueRenderer={(item) => item.name}
      onItemSelect={setDataset}
      resetOnClose
      selectedItem={dataset}
    />
  );
}
