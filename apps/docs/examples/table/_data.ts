import type { Intent } from "@clawscale/react";

export type RunStatus = "succeeded" | "failed" | "running" | "queued";

/** One run of a data pipeline. The row type of the table examples. */
export interface PipelineRun {
  id: string;
  pipeline: string;
  status: RunStatus;
  rows: number;
  /** Seconds. */
  duration: number;
  region: string;
  owner: string;
  started: string;
  message: string;
}

export const RUNS: PipelineRun[] = [
  {
    id: "run-4821",
    pipeline: "orders_daily",
    status: "succeeded",
    rows: 48_211_904,
    duration: 252,
    region: "us-east-1",
    owner: "commerce",
    started: "2026-09-27 02:00",
    message: "Loaded 48,211,904 rows into warehouse.orders_daily from s3://lake-us-east-1/orders/dt=2026-09-26/.",
  },
  {
    id: "run-4822",
    pipeline: "web_sessions",
    status: "running",
    rows: 612_004_118,
    duration: 1_340,
    region: "eu-west-1",
    owner: "growth",
    started: "2026-09-27 02:05",
    message: "Reading topic web.sessions.v3, partition dt=2026-09-26. 612,004,118 rows so far.",
  },
  {
    id: "run-4823",
    pipeline: "invoice_sync",
    status: "failed",
    rows: 0,
    duration: 38,
    region: "us-east-1",
    owner: "finance",
    started: "2026-09-27 02:10",
    message: 'Column "currency_code" does not exist in billing.invoices_v2. The source schema changed at 01:58 UTC.',
  },
  {
    id: "run-4824",
    pipeline: "payment_events",
    status: "succeeded",
    rows: 212_004_118,
    duration: 1_873,
    region: "us-west-2",
    owner: "finance",
    started: "2026-09-27 02:15",
    message: "Merged 212,004,118 rows into warehouse.payment_events, including 1,204 late updates.",
  },
  {
    id: "run-4825",
    pipeline: "inventory_snapshot",
    status: "succeeded",
    rows: 9_551_203,
    duration: 611,
    region: "ap-southeast-1",
    owner: "supply",
    started: "2026-09-27 02:20",
    message: "Wrote a snapshot of 9,551,203 SKUs across 42 warehouses to warehouse.inventory_snapshots.",
  },
  {
    id: "run-4826",
    pipeline: "support_tickets",
    status: "queued",
    rows: 0,
    duration: 0,
    region: "eu-west-1",
    owner: "support",
    started: "",
    message: "Waiting for a free worker in eu-west-1. Three runs are ahead in the queue.",
  },
  {
    id: "run-4827",
    pipeline: "user_profiles",
    status: "succeeded",
    rows: 18_440_921,
    duration: 402,
    region: "us-east-1",
    owner: "identity",
    started: "2026-09-27 02:30",
    message: "Deduplicated 18,440,921 profiles. 3,812 merges are flagged for review.",
  },
  {
    id: "run-4828",
    pipeline: "ad_impressions",
    status: "failed",
    rows: 3_120_554,
    duration: 2_904,
    region: "us-west-2",
    owner: "marketing",
    started: "2026-09-27 02:35",
    message: "Executor ran out of memory after 3,120,554 rows. Retry with a larger executor or a smaller partition.",
  },
  {
    id: "run-4829",
    pipeline: "shipments",
    status: "succeeded",
    rows: 14_229_870,
    duration: 733,
    region: "eu-central-1",
    owner: "supply",
    started: "2026-09-27 02:40",
    message: "Loaded 14,229,870 rows into warehouse.shipments from the carrier API.",
  },
  {
    id: "run-4830",
    pipeline: "churn_features",
    status: "running",
    rows: 2_106_554,
    duration: 95,
    region: "us-east-1",
    owner: "data-science",
    started: "2026-09-27 02:45",
    message: "Computing 64 features for 2,106,554 accounts. Stage 2 of 3.",
  },
  {
    id: "run-4831",
    pipeline: "fx_rates",
    status: "succeeded",
    rows: 4_380,
    duration: 12,
    region: "eu-central-1",
    owner: "finance",
    started: "2026-09-27 02:50",
    message: "Fetched 4,380 exchange rates for 146 currencies.",
  },
  {
    id: "run-4832",
    pipeline: "vendor_contracts",
    status: "succeeded",
    rows: 41_806,
    duration: 21,
    region: "eu-central-1",
    owner: "legal",
    started: "2026-09-27 02:55",
    message: "Parsed 41,806 contract records. Nothing changed since the last run.",
  },
];

/** Cell intent for each status. */
export const STATUS_INTENT: Record<RunStatus, Intent> = {
  succeeded: "success",
  failed: "danger",
  running: "primary",
  queued: "none",
};

const grouped = new Intl.NumberFormat("en-US");

/** 48211904 becomes "48,211,904". Missing values render empty. */
export function formatRows(rows?: number): string {
  return rows === undefined ? "" : grouped.format(rows);
}

/** 252 becomes "4m 12s". Zero and missing values render empty. */
export function formatDuration(seconds?: number): string {
  if (!seconds) return "";
  const minutes = Math.floor(seconds / 60);
  const rest = String(seconds % 60).padStart(2, "0");
  return minutes > 0 ? `${minutes}m ${rest}s` : `${seconds}s`;
}
