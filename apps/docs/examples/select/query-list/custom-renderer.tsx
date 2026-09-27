"use client";

import { Card, Classes, InputGroup, Menu, MenuItem } from "@clawscale/react";
import { type ItemListRenderer, QueryList, renderFilteredItems } from "@clawscale/react/select";
import { useState } from "react";
import { DATASETS, type Dataset, filterDataset, formatRows } from "../_data";
import { renderCheckedDataset } from "../_renderers";

const scrollable = { maxHeight: 216, overflowY: "auto" } as const;

const renderList: ItemListRenderer<Dataset> = (list) => {
  const rows = list.filteredItems.reduce((sum, dataset) => sum + dataset.rows, 0);
  return (
    <>
      <div className={Classes.TEXT_MUTED} style={{ margin: "12px 4px 4px" }}>
        {list.filteredItems.length} of {list.items.length} datasets, {formatRows(rows)} rows
      </div>
      <Menu aria-label="Datasets" role="listbox" ulRef={list.itemsParentRef} {...list.menuProps} style={scrollable}>
        {renderFilteredItems(list, <MenuItem disabled text="No datasets match." roleStructure="listoption" />)}
      </Menu>
    </>
  );
};

export default function QueryListCustomRenderer() {
  const [dataset, setDataset] = useState<Dataset>();
  return (
    <QueryList<Dataset>
      items={DATASETS}
      itemPredicate={filterDataset}
      itemRenderer={renderCheckedDataset(dataset ? [dataset] : [])}
      itemListRenderer={renderList}
      listId="dataset-browser"
      onItemSelect={setDataset}
      renderer={(props) => (
        <Card compact onKeyDown={props.handleKeyDown} onKeyUp={props.handleKeyUp} style={{ width: 340 }}>
          <InputGroup
            aria-activedescendant={props.activeItemId}
            aria-label="Filter datasets"
            aria-controls={props.listId}
            leftIcon="search"
            placeholder="Filter datasets"
            value={props.query}
            onChange={props.handleQueryChange}
          />
          {props.itemList}
        </Card>
      )}
    />
  );
}
