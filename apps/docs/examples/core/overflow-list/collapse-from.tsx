"use client";

import { type Intent, OverflowList, Tag } from "@clawscale/react";

const RUNS: { id: number; intent: Intent }[] = [
  { id: 1275, intent: "success" },
  { id: 1276, intent: "success" },
  { id: 1277, intent: "danger" },
  { id: 1278, intent: "success" },
  { id: 1279, intent: "success" },
  { id: 1280, intent: "warning" },
  { id: 1281, intent: "success" },
  { id: 1282, intent: "success" },
  { id: 1283, intent: "danger" },
  { id: 1284, intent: "success" },
];

export default function OverflowListCollapseFrom() {
  return (
    <OverflowList
      items={RUNS}
      style={{ gap: 4, width: 280 }}
      overflowRenderer={(older) => (
        <Tag minimal style={{ flexShrink: 0 }}>
          {older.length} older
        </Tag>
      )}
      visibleItemRenderer={(run) => (
        <Tag key={run.id} minimal intent={run.intent} style={{ flexShrink: 0 }}>
          #{run.id}
        </Tag>
      )}
    />
  );
}
