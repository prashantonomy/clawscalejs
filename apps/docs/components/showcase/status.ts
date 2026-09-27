import type { IconName, Intent } from "@clawscale/react";
import type { PipelineStatus } from "./data";

/** Status always ships with an icon and a label, never color alone. */
export const statusStyle: Record<PipelineStatus, { intent: Intent; icon: IconName; label: string }> = {
  running: { intent: "primary", icon: "play", label: "Running" },
  succeeded: { intent: "success", icon: "tick-circle", label: "Succeeded" },
  failed: { intent: "danger", icon: "error", label: "Failed" },
  paused: { intent: "none", icon: "pause", label: "Paused" },
  queued: { intent: "warning", icon: "time", label: "Queued" },
};
