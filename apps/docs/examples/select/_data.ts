import type { IconName } from "@clawscale/react";
import type { ItemPredicate } from "@clawscale/react/select";

/** A warehouse table. The item type of most select examples. */
export interface Dataset {
  id: string;
  name: string;
  owner: string;
  region: string;
  rows: number;
  archived?: boolean;
}

export const DATASETS: Dataset[] = [
  { id: "ds-108", name: "ad_impressions", owner: "marketing", region: "us-west-2", rows: 5_812_337_460 },
  { id: "ds-110", name: "churn_features", owner: "data-science", region: "us-east-1", rows: 2_106_554 },
  { id: "ds-111", name: "clickstream_2019", owner: "growth", region: "us-east-1", rows: 930_118_002, archived: true },
  { id: "ds-105", name: "inventory_snapshots", owner: "supply", region: "ap-southeast-1", rows: 9_551_203 },
  { id: "ds-103", name: "invoices", owner: "finance", region: "us-east-1", rows: 3_918_442 },
  { id: "ds-112", name: "legacy_orders", owner: "commerce", region: "us-east-1", rows: 310_442_019, archived: true },
  { id: "ds-101", name: "orders_daily", owner: "commerce", region: "us-east-1", rows: 48_211_904 },
  { id: "ds-104", name: "payment_events", owner: "finance", region: "us-west-2", rows: 212_004_118 },
  { id: "ds-109", name: "shipments", owner: "supply", region: "eu-central-1", rows: 14_229_870 },
  { id: "ds-106", name: "support_tickets", owner: "support", region: "eu-west-1", rows: 772_190 },
  { id: "ds-107", name: "user_profiles", owner: "identity", region: "us-east-1", rows: 18_440_921 },
  { id: "ds-102", name: "web_sessions", owner: "growth", region: "eu-west-1", rows: 1_204_556_031 },
];

export const REGIONS = ["us-east-1", "us-west-2", "eu-west-1", "eu-central-1", "ap-southeast-1"];

/** Matches the query against the name and the owner. An exact match compares the name only. */
export const filterDataset: ItemPredicate<Dataset> = (query, dataset, _index, exactMatch) => {
  const normalized = query.trim().toLowerCase();
  if (exactMatch) return dataset.name === normalized;
  return dataset.name.includes(normalized) || dataset.owner.includes(normalized);
};

const compact = new Intl.NumberFormat("en-US", { notation: "compact", maximumFractionDigits: 1 });

/** 48211904 becomes "48.2M". */
export function formatRows(rows: number): string {
  return compact.format(rows);
}

/** An action in the command palette example. */
export interface Command {
  id: string;
  title: string;
  group: string;
  icon: IconName;
}

export const COMMANDS: Command[] = [
  { id: "run", title: "Run pipeline", group: "Pipelines", icon: "play" },
  { id: "backfill", title: "Backfill the last 7 days", group: "Pipelines", icon: "history" },
  { id: "pause", title: "Pause schedule", group: "Pipelines", icon: "pause" },
  { id: "retry", title: "Retry failed tasks", group: "Runs", icon: "refresh" },
  { id: "logs", title: "Open run logs", group: "Runs", icon: "console" },
  { id: "export", title: "Export results as CSV", group: "Data", icon: "export" },
  { id: "lineage", title: "Show lineage", group: "Data", icon: "graph" },
  { id: "region", title: "Switch region", group: "Workspace", icon: "globe" },
  { id: "invite", title: "Invite a teammate", group: "Workspace", icon: "new-person" },
];
