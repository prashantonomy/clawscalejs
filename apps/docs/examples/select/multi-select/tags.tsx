"use client";

import { MenuItem } from "@clawscale/react";
import { type ItemRenderer, MultiSelect } from "@clawscale/react/select";
import { useState } from "react";
import { DATASETS, type Dataset, filterDataset } from "../_data";

export default function MultiSelectTags() {
  const [selected, setSelected] = useState(() => DATASETS.slice(6, 8));
  const toggle = (dataset: Dataset) =>
    setSelected((current) =>
      current.includes(dataset) ? current.filter((item) => item !== dataset) : [...current, dataset],
    );
  const renderDataset: ItemRenderer<Dataset> = (dataset, { handleClick, handleFocus, id, modifiers, ref }) => {
    if (!modifiers.matchesPredicate) return null;
    return (
      <MenuItem
        key={dataset.id}
        ref={ref}
        id={id}
        active={modifiers.active}
        label={dataset.owner}
        onClick={handleClick}
        onFocus={handleFocus}
        roleStructure="listoption"
        selected={selected.includes(dataset)}
        shouldDismissPopover={false}
        text={dataset.name}
      />
    );
  };
  return (
    <MultiSelect<Dataset>
      items={DATASETS}
      itemPredicate={filterDataset}
      itemRenderer={renderDataset}
      onItemSelect={toggle}
      onRemove={toggle}
      tagInputProps={{ inputProps: { "aria-label": "Datasets" } }}
      placeholder="Add datasets"
      selectedItems={selected}
      tagRenderer={(dataset) => dataset.name}
    />
  );
}
