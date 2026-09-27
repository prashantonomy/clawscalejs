"use client";

import { Button, MenuItem } from "@clawscale/react";
import { type ItemRenderer, Select } from "@clawscale/react/select";
import { useState } from "react";
import { DATASETS, type Dataset, filterDataset } from "../_data";

const renderDataset: ItemRenderer<Dataset> = (dataset, { handleClick, handleFocus, id, modifiers, ref }) => {
  if (!modifiers.matchesPredicate) return null;
  return (
    <MenuItem
      key={dataset.id}
      ref={ref}
      id={id}
      active={modifiers.active}
      disabled={modifiers.disabled}
      label={dataset.owner}
      onClick={handleClick}
      onFocus={handleFocus}
      roleStructure="listoption"
      text={dataset.name}
    />
  );
};

export default function SelectBasic() {
  const [dataset, setDataset] = useState<Dataset>();
  return (
    <Select<Dataset>
      items={DATASETS}
      itemPredicate={filterDataset}
      itemRenderer={renderDataset}
      noResults={<MenuItem disabled text="No datasets match." roleStructure="listoption" />}
      onItemSelect={setDataset}
    >
      <Button endIcon="caret-down" icon="database" text={dataset?.name ?? "Select a dataset"} />
    </Select>
  );
}
