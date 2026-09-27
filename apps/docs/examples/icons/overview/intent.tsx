"use client";

import { Icon } from "@clawscale/react";

const statuses = [
  { icon: "tick-circle", intent: "success", label: "Healthy" },
  { icon: "warning-sign", intent: "warning", label: "Degraded" },
  { icon: "error", intent: "danger", label: "Down" },
  { icon: "wrench", intent: "primary", label: "Maintenance" },
] as const;

export default function IconsIntent() {
  return (
    <>
      {statuses.map(({ icon, intent, label }) => (
        <span key={label} style={{ alignItems: "center", display: "inline-flex", gap: 6 }}>
          <Icon icon={icon} intent={intent} />
          {label}
        </span>
      ))}
      <span style={{ alignItems: "center", display: "inline-flex", gap: 6 }}>
        <Icon icon="pause" color="var(--cs-color-text-muted)" />
        Paused
      </span>
    </>
  );
}
