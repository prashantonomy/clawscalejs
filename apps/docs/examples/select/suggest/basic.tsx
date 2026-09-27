"use client";

import { MenuItem } from "@clawscale/react";
import { type ItemRenderer, Suggest } from "@clawscale/react/select";
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

export default function SuggestBasic() {
  const [dataset, setDataset] = useState<Dataset | null>(null);
  return (
    <Suggest<Dataset>
      items={DATASETS}
      itemPredicate={filterDataset}
      itemRenderer={renderDataset}
      inputProps={{ placeholder: "Search datasets" }}
      inputValueRenderer={(item) => item.name}
      noResults={<MenuItem disabled text="No datasets match." roleStructure="listoption" />}
      onItemSelect={setDataset}
      selectedItem={dataset}
    />
  );
}
