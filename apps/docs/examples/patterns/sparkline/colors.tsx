"use client";

import { Sparkline } from "@clawscale/react";

const regions = [
  { name: "us-east-1", data: [8120, 8340, 8290, 8610, 8580, 8870, 8930, 9050, 9120, 9260, 9310, 9400] },
  { name: "eu-west-1", data: [6480, 6420, 6510, 6390, 6300, 6340, 6250, 6220, 6180, 6150, 6120, 6100] },
  { name: "ap-southeast-2", data: [3900, 3700, 3500, 3400, 3450, 3300, 3250, 3300, 3200, 3150, 3250, 3200] },
  { name: "us-west-2", data: [2100, 2250, 2400, 2380, 2500, 2620, 2580, 2700, 2760, 2840, 2810, 2900] },
];

export default function SparklineColors() {
  return (
    <div style={{ display: "grid", gap: 8 }}>
      {regions.map((region, index) => (
        <div key={region.name} style={{ alignItems: "center", display: "flex", gap: 12 }}>
          <Sparkline
            data={region.data}
            width={120}
            color={`var(--cs-chart-${index + 1})`}
            label={`Throughput, ${region.name}`}
          />
          {region.name}
        </div>
      ))}
    </div>
  );
}
