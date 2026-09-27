"use client";

const runs = [
  { pipeline: "orders-daily", region: "us-east-1", status: "Succeeded", failed: false },
  { pipeline: "events-hourly", region: "eu-west-1", status: "Failed", failed: true },
  { pipeline: "billing-sync", region: "ap-south-1", status: "Succeeded", failed: false },
];

const panel = {
  background: "var(--cs-color-surface)",
  border: "1px solid var(--cs-color-border)",
  borderRadius: "var(--cs-radius-lg)",
  boxShadow: "var(--cs-shadow-1)",
  padding: "var(--cs-space-1) 0",
  width: 340,
};

const row = { display: "flex", gap: "var(--cs-space-3)", padding: "var(--cs-space-2) var(--cs-space-4)" };

export default function TokensCustomElement() {
  return (
    <div style={panel}>
      {runs.map((run) => (
        <div key={run.pipeline} style={row}>
          <span style={{ flex: 1, fontWeight: "var(--cs-font-weight-medium)" }}>{run.pipeline}</span>
          <span style={{ color: "var(--cs-color-text-muted)" }}>{run.region}</span>
          <span style={{ color: run.failed ? "var(--cs-color-danger-text)" : "var(--cs-color-success-text)" }}>
            {run.status}
          </span>
        </div>
      ))}
    </div>
  );
}
