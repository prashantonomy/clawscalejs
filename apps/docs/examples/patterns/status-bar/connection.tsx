"use client";

import { StatusBar, StatusBarItem } from "@clawscale/react";

const states = [
  { icon: "tick-circle", intent: "success", text: "Connected to eu-central-1" },
  { icon: "warning-sign", intent: "warning", text: "Reconnecting, attempt 2 of 5" },
  { icon: "error", intent: "danger", text: "Offline since 14:05 UTC" },
] as const;

export default function StatusBarConnection() {
  return (
    <div style={{ display: "grid", gap: 16 }}>
      {states.map((state) => (
        <StatusBar key={state.text}>
          <StatusBarItem icon={state.icon} intent={state.intent} role="status">
            {state.text}
          </StatusBarItem>
          <StatusBarItem icon="database">analytics-prod</StatusBarItem>
        </StatusBar>
      ))}
    </div>
  );
}
