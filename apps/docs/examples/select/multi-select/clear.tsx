"use client";

import { MultiSelect } from "@clawscale/react/select";
import { useState } from "react";
import { DATASETS, type Dataset, filterDataset } from "../_data";
import { renderCheckedDataset } from "../_renderers";

export default function MultiSelectClear() {
  const [selected, setSelected] = useState(() => DATASETS.slice(8, 11));
  const toggle = (dataset: Dataset) =>
    setSelected((current) =>
      current.includes(dataset) ? current.filter((item) => item !== dataset) : [...current, dataset],
    );
  return (
    <MultiSelect<Dataset>
      items={DATASETS}
      itemPredicate={filterDataset}
      itemRenderer={renderCheckedDataset(selected)}
      onClear={() => setSelected([])}
      onItemSelect={toggle}
      onRemove={toggle}
      tagInputProps={{ inputProps: { "aria-label": "Datasets" } }}
      placeholder="Add datasets"
      selectedItems={selected}
      tagRenderer={(dataset) => dataset.name}
    />
  );
}
