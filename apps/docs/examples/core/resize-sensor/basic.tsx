"use client";

import { ResizeSensor } from "@clawscale/react";
import { useState } from "react";

export default function ResizeSensorBasic() {
  const [width, setWidth] = useState<number>();
  return (
    <ResizeSensor onResize={(entries) => setWidth(entries[0]?.contentRect.width)}>
      <div
        style={{
          border: "1px dashed var(--cs-color-border-strong)",
          borderRadius: "var(--cs-radius-md)",
          maxWidth: "100%",
          minWidth: 160,
          overflow: "hidden",
          padding: 16,
          resize: "horizontal",
          width: 320,
        }}
      >
        Observed width: <strong>{width === undefined ? "measuring" : `${Math.round(width)} px`}</strong>
      </div>
    </ResizeSensor>
  );
}
