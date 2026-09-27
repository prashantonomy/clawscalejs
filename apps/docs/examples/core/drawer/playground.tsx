"use client";

import { Button, Classes, Drawer, DrawerSize } from "@clawscale/react";
import { useState } from "react";
import { Playground, usePlayground } from "@/components/docs/playground";

export default function DrawerPlayground() {
  const [isOpen, setIsOpen] = useState(false);
  const [props, options] = usePlayground({
    position: { type: "segmented", label: "Position", options: ["top", "right", "bottom", "left"], default: "right" },
    size: {
      type: "select",
      label: "Size",
      options: [DrawerSize.SMALL, DrawerSize.STANDARD, DrawerSize.LARGE],
      default: DrawerSize.SMALL,
    },
    isCloseButtonShown: { type: "boolean", label: "Close button", default: true },
    hasBackdrop: { type: "boolean", label: "Backdrop", default: true },
    canEscapeKeyClose: { type: "boolean", label: "Close on escape", default: true },
    canOutsideClickClose: { type: "boolean", label: "Close on outside click", default: true },
    autoFocus: { type: "boolean", label: "Auto focus", default: true },
    enforceFocus: { type: "boolean", label: "Enforce focus", default: true },
  });
  return (
    <Playground options={options}>
      <Button icon="panel-stats" text="Inspect pipeline" onClick={() => setIsOpen(true)} />
      <Drawer {...props} icon="data-lineage" isOpen={isOpen} onClose={() => setIsOpen(false)} title="ingest-orders">
        <div className={Classes.DRAWER_BODY}>
          <p style={{ margin: 16 }}>Last run 4812 loaded 1,284,112 rows in 6 min 42 s.</p>
        </div>
      </Drawer>
    </Playground>
  );
}
