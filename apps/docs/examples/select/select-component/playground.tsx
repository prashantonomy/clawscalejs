"use client";

import { Button, MenuItem } from "@clawscale/react";
import { Select } from "@clawscale/react/select";
import { useState } from "react";
import { Playground, usePlayground } from "@/components/docs/playground";
import { DATASETS, type Dataset, filterDataset } from "../_data";
import { renderDataset } from "../_renderers";

export default function SelectPlayground() {
  const [dataset, setDataset] = useState<Dataset>();
  const [props, options] = usePlayground({
    filterable: { type: "boolean", label: "Filterable", default: true },
    disabled: { type: "boolean", label: "Disabled", default: false },
    fill: { type: "boolean", label: "Fill", default: false },
    resetOnClose: { type: "boolean", label: "Reset on close", default: false },
    resetOnQuery: { type: "boolean", label: "Reset on query", default: true },
    resetOnSelect: { type: "boolean", label: "Reset on select", default: false },
    popover: { type: "heading", label: "Popover" },
    minimal: { type: "boolean", label: "Minimal", default: false },
    matchTargetWidth: { type: "boolean", label: "Match target width", default: false },
  });
  const { minimal, matchTargetWidth, ...selectProps } = props;
  return (
    <Playground options={options}>
      <div style={{ width: 280, textAlign: "center" }}>
        <Select<Dataset>
          {...selectProps}
          items={DATASETS}
          itemPredicate={filterDataset}
          itemRenderer={renderDataset}
          noResults={<MenuItem disabled text="No datasets match." roleStructure="listoption" />}
          onItemSelect={setDataset}
          popoverProps={{ minimal, matchTargetWidth }}
        >
          <Button
            alignText="start"
            disabled={props.disabled}
            endIcon="caret-down"
            fill={props.fill}
            icon="database"
            text={dataset?.name ?? "Select a dataset"}
          />
        </Select>
      </div>
    </Playground>
  );
}
