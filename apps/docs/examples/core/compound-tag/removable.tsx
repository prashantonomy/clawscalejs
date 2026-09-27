"use client";

import { Button, CompoundTag } from "@clawscale/react";
import { useState } from "react";

const FILTERS = [
  { key: "status", value: "failed" },
  { key: "region", value: "eu-west-1" },
  { key: "owner", value: "data-platform" },
];

export default function CompoundTagRemovable() {
  const [filters, setFilters] = useState(FILTERS);
  if (filters.length === 0) {
    return <Button icon="reset" text="Restore filters" onClick={() => setFilters(FILTERS)} />;
  }
  return (
    <>
      {filters.map((filter) => (
        <CompoundTag
          key={filter.key}
          leftContent={filter.key}
          onRemove={() => setFilters((current) => current.filter((item) => item !== filter))}
        >
          {filter.value}
        </CompoundTag>
      ))}
    </>
  );
}
