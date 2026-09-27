"use client";

import { Button, ButtonGroup } from "@clawscale/react";
import { Playground, SIZES, usePlayground } from "@/components/docs/playground";

export default function ButtonGroupPlayground() {
  const [props, options] = usePlayground({
    fill: { type: "boolean", label: "Fill", default: false },
    vertical: { type: "boolean", label: "Vertical", default: false },
    variant: { type: "select", label: "Variant", options: ["solid", "outlined", "minimal"], default: "solid" },
    alignText: { type: "segmented", label: "Align text", options: ["start", "center", "end"], default: "center" },
    size: { type: "segmented", label: "Size", options: SIZES, default: "medium" },
  });
  return (
    <Playground options={options}>
      <ButtonGroup {...props}>
        <Button icon="database" text="Datasets" />
        <Button icon="flow-linear" text="Pipelines" />
        <Button icon="dashboard" endIcon="caret-down" text="Dashboards" />
      </ButtonGroup>
    </Playground>
  );
}
