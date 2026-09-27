"use client";

import { ProgressBar } from "@clawscale/react";
import { useEffect, useState } from "react";

const PARTITIONS = 120;

export default function ProgressBarValue() {
  const [tick, setTick] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => setTick((current) => (current >= 40 ? 0 : current + 1)), 300);
    return () => clearInterval(timer);
  }, []);
  const done = Math.min(tick * 4, PARTITIONS);
  const finished = done === PARTITIONS;
  return (
    <div style={{ display: "grid", gap: 8, width: "100%", maxWidth: 420 }}>
      <span>
        Backfill: {done} of {PARTITIONS} partitions
      </span>
      <ProgressBar
        aria-label="Backfill progress"
        intent={finished ? "success" : "primary"}
        stripes={!finished}
        value={done / PARTITIONS}
      />
    </div>
  );
}
