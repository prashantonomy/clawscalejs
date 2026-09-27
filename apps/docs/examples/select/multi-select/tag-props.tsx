"use client";

import { MultiSelect } from "@clawscale/react/select";
import { useState } from "react";
import { DATASETS, type Dataset, filterDataset } from "../_data";
import { renderCheckedDataset } from "../_renderers";

const BILLION = 1_000_000_000;

export default function MultiSelectTagProps() {
  const [selected, setSelected] = useState(() => DATASETS.slice(0, 2));
  const toggle = (dataset: Dataset) =>
    setSelected((current) =>
      current.includes(dataset) ? current.filter((item) => item !== dataset) : [...current, dataset],
    );
  return (
    <MultiSelect<Dataset>
      items={DATASETS}
      itemPredicate={filterDataset}
      itemRenderer={renderCheckedDataset(selected)}
      onItemSelect={toggle}
      onRemove={toggle}
      placeholder="Add datasets"
      selectedItems={selected}
      tagInputProps={{
        inputProps: { "aria-label": "Datasets" },
        tagProps: (_value, index) => {
          const large = (selected[index]?.rows ?? 0) > BILLION;
          return { icon: large ? "warning-sign" : undefined, intent: large ? "warning" : "none", minimal: true };
        },
      }}
      tagRenderer={(dataset) => dataset.name}
    />
  );
}
