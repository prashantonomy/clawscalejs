"use client";

import { Button, ProgressBar } from "@clawscale/react";
import { getToaster } from "./_toaster";

export default function ToastUpdate() {
  const exportCsv = async () => {
    const toaster = await getToaster();
    const key = toaster.show({ icon: "export", message: <ProgressBar intent="primary" value={0} />, timeout: 0 });
    let progress = 0;
    const timer = setInterval(() => {
      progress += 0.25;
      if (progress < 1) {
        toaster.show({ icon: "export", message: <ProgressBar intent="primary" value={progress} />, timeout: 0 }, key);
        return;
      }
      clearInterval(timer);
      toaster.show({ icon: "tick", intent: "success", message: "Exported orders_daily.csv (412 MB)." }, key);
    }, 600);
  };
  return <Button icon="export" text="Export CSV" onClick={exportCsv} />;
}
