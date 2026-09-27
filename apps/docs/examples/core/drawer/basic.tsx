"use client";

import { Button, Classes, Drawer, DrawerSize, PropertyList, PropertyListItem, Tag } from "@clawscale/react";
import { useState } from "react";

export default function DrawerBasic() {
  const [isOpen, setIsOpen] = useState(false);
  const close = () => setIsOpen(false);
  return (
    <>
      <Button icon="panel-stats" text="Inspect deployment" onClick={() => setIsOpen(true)} />
      <Drawer icon="cloud-upload" isOpen={isOpen} onClose={close} size={DrawerSize.SMALL} title="api-gateway v2.14.0">
        <div className={Classes.DRAWER_BODY}>
          <PropertyList compact style={{ margin: 16 }}>
            <PropertyListItem label="Status">
              <Tag intent="success" minimal>
                Healthy
              </Tag>
            </PropertyListItem>
            <PropertyListItem label="Regions">us-east-1, eu-west-1</PropertyListItem>
            <PropertyListItem label="Replicas">24 of 24 ready</PropertyListItem>
            <PropertyListItem label="Commit" monospace>
              8f3c2a1
            </PropertyListItem>
            <PropertyListItem label="Deployed">27 Sep, 09:42 UTC</PropertyListItem>
          </PropertyList>
        </div>
        <div className={Classes.DRAWER_FOOTER} style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}>
          <Button text="View logs" onClick={close} />
          <Button intent="danger" text="Roll back" onClick={close} />
        </div>
      </Drawer>
    </>
  );
}
