"use client";

import { Button, Classes, Drawer, DrawerSize } from "@clawscale/react";
import { useState } from "react";

const positions = ["top", "right", "bottom", "left"] as const;

export default function DrawerPosition() {
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState<(typeof positions)[number]>("right");
  return (
    <>
      {positions.map((value) => (
        <Button
          key={value}
          text={`From ${value}`}
          onClick={() => {
            setPosition(value);
            setIsOpen(true);
          }}
        />
      ))}
      <Drawer
        icon="notifications"
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        position={position}
        size={DrawerSize.SMALL}
        title="Alerts"
      >
        <div className={Classes.DRAWER_BODY}>
          <p style={{ margin: 16 }}>3 open alerts in eu-west-1. The oldest fired 42 min ago.</p>
        </div>
      </Drawer>
    </>
  );
}
