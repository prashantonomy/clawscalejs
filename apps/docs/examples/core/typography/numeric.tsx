"use client";

import { Classes, ClawscaleClasses } from "@clawscale/react";

const latencies = ["1,111.11", "8,808.80", "4,141.71", "9,090.09"];

export default function TypographyNumeric() {
  return (
    <div style={{ display: "flex", gap: 48, textAlign: "right" }}>
      <div>
        <div className={Classes.TEXT_MUTED}>Default</div>
        {latencies.map((value) => (
          <div key={value}>{value} ms</div>
        ))}
      </div>
      <div className={ClawscaleClasses.NUMERIC}>
        <div className={Classes.TEXT_MUTED}>cs-numeric</div>
        {latencies.map((value) => (
          <div key={value}>{value} ms</div>
        ))}
      </div>
    </div>
  );
}
