"use client";

import { type Intent, ProgressBar } from "@clawscale/react";
import { Fragment } from "react";

const SYNCS: { table: string; intent?: Intent; value: number }[] = [
  { table: "customers", value: 0.35 },
  { table: "orders", intent: "primary", value: 0.6 },
  { table: "payments", intent: "success", value: 1 },
  { table: "events", intent: "warning", value: 0.45 },
  { table: "refunds", intent: "danger", value: 0.2 },
];

export default function ProgressBarIntent() {
  return (
    <div
      style={{
        alignItems: "center",
        display: "grid",
        gap: "12px 16px",
        gridTemplateColumns: "80px 1fr",
        maxWidth: 420,
        width: "100%",
      }}
    >
      {SYNCS.map((sync) => (
        <Fragment key={sync.table}>
          <span>{sync.table}</span>
          <ProgressBar aria-label={`${sync.table} sync`} intent={sync.intent} value={sync.value} />
        </Fragment>
      ))}
    </div>
  );
}
