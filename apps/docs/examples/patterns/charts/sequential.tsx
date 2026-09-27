"use client";

import { Classes, ClawscaleClasses } from "@clawscale/react";

const steps = [100, 200, 300, 400, 500, 600, 700];

export default function ChartsSequential() {
  return (
    <div style={{ display: "grid", gap: 2, gridTemplateColumns: "repeat(7, minmax(0, 1fr))", maxWidth: 480 }}>
      {steps.map((step) => (
        <div key={step} style={{ display: "grid", gap: 6 }}>
          <div style={{ background: `var(--cs-chart-seq-${step})`, height: 32 }} />
          <span className={`${ClawscaleClasses.NUMERIC} ${Classes.TEXT_MUTED}`}>{step}</span>
        </div>
      ))}
    </div>
  );
}
