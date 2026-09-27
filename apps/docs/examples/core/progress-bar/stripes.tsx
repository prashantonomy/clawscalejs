"use client";

import { ProgressBar } from "@clawscale/react";

export default function ProgressBarStripes() {
  return (
    <div style={{ display: "grid", gap: 16, width: "100%", maxWidth: 420 }}>
      <ProgressBar aria-label="Striped and animated" intent="primary" value={0.6} />
      <ProgressBar aria-label="Striped, not animated" intent="primary" value={0.6} animate={false} />
      <ProgressBar aria-label="Solid" intent="primary" value={0.6} stripes={false} />
    </div>
  );
}
