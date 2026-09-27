"use client";

import { Card, type Elevation, H5 } from "@clawscale/react";
import { Playground, usePlayground } from "@/components/docs/playground";

export default function CardPlayground() {
  const [{ elevation, ...props }, options] = usePlayground({
    interactive: { type: "boolean", label: "Interactive", default: false },
    selected: { type: "boolean", label: "Selected", default: false },
    compact: { type: "boolean", label: "Compact", default: false },
    elevation: { type: "segmented", label: "Elevation", options: ["0", "1", "2", "3", "4"], default: "0" },
  });
  return (
    <Playground options={options}>
      <Card {...props} elevation={Number(elevation) as Elevation} style={{ width: 300 }}>
        <H5>orders_daily</H5>
        <div className="cs-numeric">1,204,331 rows. Refreshed 12 minutes ago.</div>
      </Card>
    </Playground>
  );
}
