"use client";

import { Sparkline } from "@clawscale/react";

const requests = [412, 438, 425, 461, 455, 490, 472, 508, 531, 519, 544, 562];

export default function SparklineFixedWidth() {
  return (
    <>
      <Sparkline data={requests} width={120} height={32} label="Requests per minute, last hour" />
      <Sparkline data={requests} width={64} height={16} label="Requests per minute, last hour" />
    </>
  );
}
