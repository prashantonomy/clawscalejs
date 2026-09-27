/**
 * Deterministic sample data for the showcase. A seeded generator keeps server
 * and client output identical, so nothing depends on the real clock.
 */

export type PipelineStatus = "running" | "succeeded" | "failed" | "paused" | "queued";
export type TimeRange = "1h" | "24h" | "7d" | "30d";

export interface Pipeline {
  id: string;
  name: string;
  domain: string;
  owner: string;
  region: string;
  schedule: string;
  source: string;
  destination: string;
  status: PipelineStatus;
  lastRunMinutesAgo: number;
  durationSeconds: number;
  rows: number;
  sla: number;
  trend: number[];
  error?: string;
}

export interface Run {
  id: string;
  status: PipelineStatus;
  startedMinutesAgo: number;
  durationSeconds: number;
  rows: number;
}

export interface Series {
  id: string;
  label: string;
  values: number[];
}

function mulberry32(seed: number) {
  let state = seed >>> 0;
  return () => {
    state = (state + 0x6d2b79f5) >>> 0;
    let t = state;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function hash(text: string): number {
  let h = 2166136261;
  for (let i = 0; i < text.length; i++) h = Math.imul(h ^ text.charCodeAt(i), 16777619);
  return h >>> 0;
}

export const regions = ["us-east-1", "eu-central-1", "ap-south-1"] as const;
export const owners = ["data-platform", "billing", "growth", "ml-infra", "finance-ops"] as const;
const domains = ["Orders", "Billing", "Marketing", "Machine learning"] as const;
const sources = ["postgres.orders", "kafka.events", "s3.raw-logs", "salesforce.accounts", "bigquery.ads"];
const destinations = ["warehouse.analytics", "lake.curated", "warehouse.finance", "feature-store"];
const schedules = ["Every 5 minutes", "Hourly", "Daily at 02:00 UTC", "Every 15 minutes", "Continuous"];
const errors = [
  "Schema drift: column customer_tier is missing in source.",
  "Timeout after 900 s waiting for upstream partition 2026-09-26.",
  "Permission denied writing to warehouse.finance.",
];

const names = [
  "ingest-orders",
  "orders-enrichment",
  "refunds-daily",
  "billing-sync",
  "invoice-rollup",
  "tax-exports",
  "campaign-attribution",
  "ad-spend-import",
  "email-events",
  "feature-backfill",
  "embedding-refresh",
  "model-scoring",
  "session-stitching",
  "inventory-snapshot",
  "fx-rates",
  "churn-signals",
  "ledger-close",
  "search-index",
  "audit-export",
  "clickstream-compact",
  "partner-feeds",
  "pricing-history",
  "support-tickets",
  "usage-metering",
];

const statusCycle: PipelineStatus[] = [
  "running",
  "succeeded",
  "succeeded",
  "running",
  "failed",
  "succeeded",
  "queued",
  "succeeded",
  "paused",
  "running",
  "succeeded",
  "failed",
];

export const pipelines: Pipeline[] = names.map((name, index) => {
  const random = mulberry32(hash(name));
  const status = statusCycle[index % statusCycle.length] as PipelineStatus;
  const base = 40 + Math.round(random() * 600);
  const trend = Array.from({ length: 14 }, () => Math.round(base * (0.7 + random() * 0.6)));
  const pipeline: Pipeline = {
    id: `pl_${hash(name).toString(16).slice(0, 6)}`,
    name,
    domain: domains[Math.floor(index / 6) % domains.length] as string,
    owner: owners[index % owners.length] as string,
    region: regions[index % regions.length] as string,
    schedule: schedules[index % schedules.length] as string,
    source: sources[index % sources.length] as string,
    destination: destinations[index % destinations.length] as string,
    status,
    lastRunMinutesAgo: 1 + Math.round(random() * 180),
    durationSeconds: status === "queued" ? 0 : base,
    rows: status === "queued" ? 0 : Math.round(20_000 + random() * 4_800_000),
    sla: status === "failed" ? 0.9 + random() * 0.05 : 0.97 + random() * 0.03,
    trend,
  };
  if (status === "failed") pipeline.error = errors[index % errors.length] as string;
  return pipeline;
});

export function runsFor(pipeline: Pipeline): Run[] {
  const random = mulberry32(hash(`${pipeline.id}-runs`));
  return Array.from({ length: 8 }, (_, index) => {
    const failed = index === 0 ? pipeline.status === "failed" : random() < 0.12;
    return {
      id: `run_${(hash(`${pipeline.id}-${index}`) >>> 8).toString(16)}`,
      status: index === 0 ? pipeline.status : failed ? "failed" : "succeeded",
      startedMinutesAgo: pipeline.lastRunMinutesAgo + index * 60,
      durationSeconds: pipeline.trend[pipeline.trend.length - 1 - index] ?? pipeline.durationSeconds,
      rows: failed ? 0 : Math.round(pipeline.rows * (0.8 + random() * 0.4)),
    };
  });
}

const rangePoints: Record<TimeRange, { count: number; label: (i: number) => string }> = {
  "1h": { count: 12, label: (i) => `09:${String(i * 5).padStart(2, "0")}` },
  "24h": { count: 24, label: (i) => `${String(i).padStart(2, "0")}:00` },
  "7d": { count: 28, label: (i) => `Sep ${20 + Math.floor(i / 4)} ${String((i % 4) * 6).padStart(2, "0")}h` },
  "30d": { count: 30, label: (i) => `${i < 3 ? "Aug" : "Sep"} ${i < 3 ? 29 + i : i - 2}` },
};

export function timeLabels(range: TimeRange): string[] {
  const { count, label } = rangePoints[range];
  return Array.from({ length: count }, (_, i) => label(i));
}

/** Rows per second by region, in thousands. */
export function throughput(range: TimeRange): Series[] {
  const { count } = rangePoints[range];
  const scale = { "us-east-1": 18, "eu-central-1": 12, "ap-south-1": 7 } as const;
  return regions.map((region) => {
    const random = mulberry32(hash(`${region}-${range}`));
    const values = Array.from({ length: count }, (_, i) => {
      const daily = Math.sin((i / count) * Math.PI * 2 - 1.2) * 0.35 + 1;
      return Math.round(scale[region] * daily * (0.9 + random() * 0.2) * 10) / 10;
    });
    return { id: region, label: region, values };
  });
}

/** Completed runs per bucket across every pipeline. */
export function runsPerBucket(range: TimeRange): number[] {
  const { count } = rangePoints[range];
  const random = mulberry32(hash(`runs-${range}`));
  return Array.from({ length: count }, (_, i) => Math.round(120 + Math.sin(i / 3) * 40 + random() * 60));
}

export function formatDuration(seconds: number): string {
  if (seconds <= 0) return "0s";
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return m > 0 ? `${m}m ${String(s).padStart(2, "0")}s` : `${s}s`;
}

export function formatAgo(minutes: number): string {
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  return hours < 24 ? `${hours}h ago` : `${Math.floor(hours / 24)}d ago`;
}

const numberFormat = new Intl.NumberFormat("en-US");
const compactFormat = new Intl.NumberFormat("en-US", { notation: "compact", maximumFractionDigits: 1 });

export const formatNumber = (value: number) => numberFormat.format(value);
export const formatCompact = (value: number) => compactFormat.format(value);
