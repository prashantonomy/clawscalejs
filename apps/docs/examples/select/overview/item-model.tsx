"use client";

import { Button, MenuItem } from "@clawscale/react";
import { type ItemPredicate, type ItemRenderer, Select, Suggest } from "@clawscale/react/select";
import { useState } from "react";
import { DATASETS, type Dataset } from "../_data";

const filterDataset: ItemPredicate<Dataset> = (query, dataset) => dataset.name.includes(query.trim().toLowerCase());

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
      text={dataset.name}
    />
  );
};

export default function SelectItemModel() {
  const [dataset, setDataset] = useState<Dataset | null>(null);
  const list = { items: DATASETS, itemPredicate: filterDataset, itemRenderer: renderDataset, onItemSelect: setDataset };
  return (
    <>
      <Select<Dataset> {...list}>
        <Button endIcon="caret-down" icon="database" text={dataset?.name ?? "Select a dataset"} />
      </Select>
      <Suggest<Dataset> {...list} inputValueRenderer={(item) => item.name} selectedItem={dataset} />
    </>
  );
}
