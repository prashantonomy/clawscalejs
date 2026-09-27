"use client";

import { Button, type ToastProps } from "@clawscale/react";
import { getToaster } from "./_toaster";

const toasts: [string, ToastProps][] = [
  ["Primary", { intent: "primary", icon: "cloud-upload", message: "Deploying api-gateway v2.14.0 to 8 regions." }],
  ["Success", { intent: "success", icon: "tick", message: "Backfill finished: 90 partitions of orders_daily." }],
  ["Warning", { intent: "warning", icon: "warning-sign", message: "eu-west-1 uses 85% of its storage quota." }],
  ["Danger", { intent: "danger", icon: "error", message: "Run 4811 failed: schema mismatch in events_raw." }],
];

export default function ToastIntent() {
  const show = async (toast: ToastProps) => (await getToaster()).show(toast);
  return (
    <>
      {toasts.map(([label, toast]) => (
        <Button intent={toast.intent} key={label} text={label} onClick={() => show(toast)} />
      ))}
    </>
  );
}
