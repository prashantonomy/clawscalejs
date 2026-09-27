"use client";

import { Icon } from "@clawscale/react";

export default function IconsSizes() {
  return (
    <div style={{ alignItems: "flex-end", display: "flex", gap: 24 }}>
      {[12, 16, 20, 32, 48].map((size) => (
        <div key={size} style={{ display: "grid", gap: 8, justifyItems: "center" }}>
          <Icon icon="globe-network" size={size} />
          <span style={{ color: "var(--cs-color-text-muted)", fontSize: "var(--cs-font-size-xs)" }}>{size}px</span>
        </div>
      ))}
    </div>
  );
}
