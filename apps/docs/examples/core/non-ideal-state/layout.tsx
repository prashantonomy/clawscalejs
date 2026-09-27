"use client";

import { NonIdealState, Switch } from "@clawscale/react";
import { useState } from "react";

export default function NonIdealStateLayout() {
  const [horizontal, setHorizontal] = useState(true);
  return (
    <>
      <Switch
        checked={horizontal}
        label="Horizontal layout"
        onChange={(event) => setHorizontal(event.currentTarget.checked)}
      />
      <NonIdealState
        layout={horizontal ? "horizontal" : "vertical"}
        icon="timeline-line-chart"
        title="No metrics yet"
        description="Metrics appear after the first run of refresh_revenue finishes."
      />
    </>
  );
}
