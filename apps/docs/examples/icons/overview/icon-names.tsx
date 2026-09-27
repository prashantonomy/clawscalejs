"use client";

import { Code, Icon } from "@clawscale/react";
import { type IconName, IconNames } from "@clawscale/react/icons";

type JobKind = "ingest" | "transform" | "export";

const jobIcons: Record<JobKind, IconName> = {
  ingest: IconNames.Import,
  transform: IconNames.DataLineage,
  export: IconNames.Export,
};

const jobs: { name: string; kind: JobKind }[] = [
  { name: "orders_raw", kind: "ingest" },
  { name: "orders_daily", kind: "transform" },
  { name: "finance_extract", kind: "export" },
];

export default function IconsIconNames() {
  return (
    <div style={{ display: "grid", gap: 8 }}>
      {jobs.map(({ name, kind }) => (
        <span key={name} style={{ alignItems: "center", display: "flex", gap: 8 }}>
          <Icon icon={jobIcons[kind]} />
          <Code>{name}</Code>
        </span>
      ))}
    </div>
  );
}
