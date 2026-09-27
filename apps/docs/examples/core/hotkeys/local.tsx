"use client";

import { Card, CardList, HotkeysTarget } from "@clawscale/react";
import { useMemo, useState } from "react";

const PIPELINES = ["ingest-orders", "enrich-customers", "export-ledger", "train-forecast"];

export default function HotkeysLocal() {
  const [index, setIndex] = useState(0);
  const hotkeys = useMemo(
    () => [
      {
        combo: "j",
        group: "Pipeline list",
        label: "Select next pipeline",
        onKeyDown: () => setIndex((i) => Math.min(i + 1, PIPELINES.length - 1)),
      },
      {
        combo: "k",
        group: "Pipeline list",
        label: "Select previous pipeline",
        onKeyDown: () => setIndex((i) => Math.max(i - 1, 0)),
      },
    ],
    [],
  );
  return (
    <HotkeysTarget hotkeys={hotkeys}>
      {({ handleKeyDown, handleKeyUp }) => (
        <CardList compact tabIndex={0} onKeyDown={handleKeyDown} onKeyUp={handleKeyUp} style={{ maxWidth: 320 }}>
          {PIPELINES.map((name, i) => (
            <Card role="listitem" key={name} selected={i === index}>
              {name}
            </Card>
          ))}
        </CardList>
      )}
    </HotkeysTarget>
  );
}
