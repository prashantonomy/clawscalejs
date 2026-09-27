"use client";

import { Suggest } from "@clawscale/react/select";
import { useState } from "react";
import { DATASETS, type Dataset, filterDataset } from "../_data";
import { renderDataset } from "../_renderers";

export default function SuggestCloseOnSelect() {
  const [dataset, setDataset] = useState<Dataset | null>(null);
  return (
    <Suggest<Dataset>
      closeOnSelect={false}
      items={DATASETS}
      itemPredicate={filterDataset}
      itemRenderer={renderDataset}
      inputProps={{ placeholder: "Compare datasets" }}
      inputValueRenderer={(item) => item.name}
      onItemSelect={setDataset}
      selectedItem={dataset}
    />
  );
}
