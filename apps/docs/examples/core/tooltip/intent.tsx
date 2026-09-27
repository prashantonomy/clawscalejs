"use client";

import { Tag, Tooltip } from "@clawscale/react";

const statuses = [
  { intent: "primary", label: "Queued", hint: "12 runs wait for a free worker" },
  { intent: "success", label: "Healthy", hint: "24 of 24 replicas passed their health check" },
  { intent: "warning", label: "Degraded", hint: "p95 latency is 1.8 s, above the 1 s target" },
  { intent: "danger", label: "Failing", hint: "4 of the last 5 runs failed" },
] as const;

export default function TooltipIntent() {
  return (
    <>
      {statuses.map((status) => (
        <Tooltip content={status.hint} intent={status.intent} key={status.label}>
          <Tag intent={status.intent} minimal>
            {status.label}
          </Tag>
        </Tooltip>
      ))}
    </>
  );
}
