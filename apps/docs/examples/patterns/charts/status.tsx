"use client";

import { Icon } from "@clawscale/react";

const states = [
  { token: "--cs-chart-good", icon: "tick-circle", label: "42 healthy" },
  { token: "--cs-chart-warning", icon: "warning-sign", label: "3 degraded" },
  { token: "--cs-chart-serious", icon: "error", label: "1 failing" },
  { token: "--cs-chart-critical", icon: "cross-circle", label: "1 down" },
] as const;

export default function ChartsStatus() {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 20 }}>
      {states.map((state) => (
        <span key={state.token} style={{ alignItems: "center", display: "inline-flex", gap: 6 }}>
          <Icon icon={state.icon} color={`var(${state.token})`} />
          {state.label}
        </span>
      ))}
    </div>
  );
}
