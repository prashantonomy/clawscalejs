"use client";

import { Classes, ClawscaleClasses } from "@clawscale/react";

const slots = [1, 2, 3, 4, 5, 6, 7, 8];

export default function ChartsPalette() {
  return (
    <div style={{ display: "grid", gap: 8, gridTemplateColumns: "repeat(4, minmax(0, 1fr))" }}>
      {slots.map((slot) => (
        <div key={slot} style={{ display: "grid", gap: 6 }}>
          <div style={{ background: `var(--cs-chart-${slot})`, borderRadius: "var(--cs-radius-sm)", height: 32 }} />
          <span className={`${ClawscaleClasses.MONOSPACE} ${Classes.TEXT_MUTED}`}>--cs-chart-{slot}</span>
        </div>
      ))}
    </div>
  );
}
