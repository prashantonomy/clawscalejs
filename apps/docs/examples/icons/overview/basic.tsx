"use client";

import { Icon } from "@clawscale/react";

const stages = [
  { icon: "import", label: "Ingest" },
  { icon: "data-lineage", label: "Transform" },
  { icon: "database", label: "Load" },
  { icon: "cloud-upload", label: "Publish" },
] as const;

export default function IconsBasic() {
  return (
    <>
      {stages.map(({ icon, label }) => (
        <span key={label} style={{ alignItems: "center", display: "inline-flex", gap: 6 }}>
          <Icon icon={icon} />
          {label}
        </span>
      ))}
      <Icon icon="lock" title="Encrypted at rest" />
    </>
  );
}
