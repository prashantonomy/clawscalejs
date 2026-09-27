"use client";

import { Button, MenuItem } from "@clawscale/react";
import { Select } from "@clawscale/react/select";
import { useState } from "react";
import { DATASETS, type Dataset, filterDataset } from "../_data";
import { renderDataset } from "../_renderers";

function createDataset(name: string): Dataset {
  return { id: `new-${name}`, name, owner: "you", region: "us-east-1", rows: 0 };
}

export default function SelectCreate() {
  const [items, setItems] = useState(DATASETS);
  const [dataset, setDataset] = useState<Dataset>();
  const handleSelect = (item: Dataset) => {
    if (!items.includes(item)) setItems([...items, item]);
    setDataset(item);
  };
  return (
    <Select<Dataset>
      items={items}
      itemsEqual="name"
      itemPredicate={filterDataset}
      itemRenderer={renderDataset}
      createNewItemFromQuery={createDataset}
      createNewItemRenderer={(query, active, handleClick) => (
        <MenuItem
          active={active}
          icon="add"
          onClick={handleClick}
          roleStructure="listoption"
          shouldDismissPopover={false}
          text={`Create "${query}"`}
        />
      )}
      onItemSelect={handleSelect}
    >
      <Button endIcon="caret-down" icon="database" text={dataset?.name ?? "Choose a destination"} />
    </Select>
  );
}
