"use client";

import { HotkeysTarget, KeyComboTag, Tag } from "@clawscale/react";
import { useMemo, useState } from "react";

export default function HotkeysGlobal() {
  const [paused, setPaused] = useState(false);
  const hotkeys = useMemo(
    () => [{ combo: "p", global: true, label: "Pause or resume ingestion", onKeyDown: () => setPaused((p) => !p) }],
    [],
  );
  return (
    <HotkeysTarget hotkeys={hotkeys}>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <span>Press</span>
        <KeyComboTag combo="p" />
        <span>anywhere on the page.</span>
        <Tag minimal intent={paused ? "warning" : "success"}>
          {paused ? "Ingestion paused" : "Ingestion running"}
        </Tag>
      </div>
    </HotkeysTarget>
  );
}
