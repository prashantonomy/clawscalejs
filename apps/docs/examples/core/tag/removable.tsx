"use client";

import { Button, Tag } from "@clawscale/react";
import { useState } from "react";

const DATASETS = ["orders_daily", "customers", "payments", "refunds"];

export default function TagRemovable() {
  const [datasets, setDatasets] = useState(DATASETS);
  if (datasets.length === 0) {
    return <Button icon="reset" text="Restore datasets" onClick={() => setDatasets(DATASETS)} />;
  }
  return (
    <>
      {datasets.map((name) => (
        <Tag key={name} onRemove={() => setDatasets((current) => current.filter((item) => item !== name))}>
          {name}
        </Tag>
      ))}
    </>
  );
}
