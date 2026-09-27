"use client";

import { HTMLSelect } from "@clawscale/react";

export default function HTMLSelectMinimal() {
  return (
    <>
      <HTMLSelect aria-label="Sort by" minimal options={["Last run", "Name", "Duration", "Failure rate"]} />
      <HTMLSelect
        aria-label="Group by"
        iconName="caret-down"
        minimal
        options={["No grouping", "Owner", "Region", "Status"]}
      />
    </>
  );
}
