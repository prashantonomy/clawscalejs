"use client";

import { Sparkline } from "@clawscale/react";

const queued = [120, 180, 90, 240, 310, 150, 80, 60, 210, 170, 90, 70];
const running = [34, 36, 35, 38, 40, 39, 41, 42, 40, 43, 44, 45];

export default function SparklineArea() {
  return (
    <>
      <Sparkline data={queued} width={120} height={32} area min={0} label="Queued jobs, last 12 hours" />
      <Sparkline data={running} width={120} height={32} area min={0} label="Running workers, last 12 hours" />
    </>
  );
}
