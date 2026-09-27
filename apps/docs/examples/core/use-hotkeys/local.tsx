"use client";

import { Card, Classes, KeyComboTag, Menu, MenuItem, useHotkeys } from "@clawscale/react";
import { useMemo, useState } from "react";

const pipelines = ["ingest-orders", "sessionize-events", "nightly-rollup", "export-finance"];

export default function UseHotkeysLocal() {
  const [selected, setSelected] = useState(0);
  const hotkeys = useMemo(
    () => [
      {
        combo: "down",
        group: "Pipeline list",
        label: "Select next pipeline",
        preventDefault: true,
        onKeyDown: () => setSelected((index) => Math.min(index + 1, pipelines.length - 1)),
      },
      {
        combo: "up",
        group: "Pipeline list",
        label: "Select previous pipeline",
        preventDefault: true,
        onKeyDown: () => setSelected((index) => Math.max(index - 1, 0)),
      },
    ],
    [],
  );
  const { handleKeyDown, handleKeyUp } = useHotkeys(hotkeys);

  return (
    <Card onKeyDown={handleKeyDown} onKeyUp={handleKeyUp} style={{ width: "100%", maxWidth: 300 }} tabIndex={0}>
      <Menu>
        {pipelines.map((name, index) => (
          <MenuItem active={index === selected} icon="data-lineage" key={name} text={name} />
        ))}
      </Menu>
      <p className={Classes.TEXT_MUTED} style={{ margin: "8px 0 0" }}>
        Focus the card, then press <KeyComboTag combo="up" minimal /> or <KeyComboTag combo="down" minimal />.
      </p>
    </Card>
  );
}
