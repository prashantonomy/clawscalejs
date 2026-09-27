"use client";

import { Spinner } from "@clawscale/react";

const SNAPSHOTS = [
  { region: "us-east-1", value: 1 },
  { region: "eu-west-1", value: 0.64 },
  { region: "ap-southeast-2", value: 0.18 },
];

export default function SpinnerValue() {
  return (
    <>
      {SNAPSHOTS.map(({ region, value }) => (
        <div key={region} style={{ display: "grid", gap: 8, justifyItems: "center", width: 120 }}>
          <Spinner aria-label={`${region} snapshot`} intent={value === 1 ? "success" : "primary"} value={value} />
          <span>{region}</span>
          <span>{Math.round(value * 100)}%</span>
        </div>
      ))}
    </>
  );
}
