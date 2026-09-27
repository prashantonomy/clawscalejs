"use client";

import { Button, Classes, Drawer, DrawerSize } from "@clawscale/react";
import { useState } from "react";

const sizes = [
  { label: "Small", size: DrawerSize.SMALL },
  { label: "Standard", size: DrawerSize.STANDARD },
  { label: "Large", size: DrawerSize.LARGE },
];

export default function DrawerSizes() {
  const [isOpen, setIsOpen] = useState(false);
  const [size, setSize] = useState<string>(DrawerSize.SMALL);
  return (
    <>
      {sizes.map((option) => (
        <Button
          key={option.label}
          text={`${option.label} (${option.size})`}
          onClick={() => {
            setSize(option.size);
            setIsOpen(true);
          }}
        />
      ))}
      <Drawer icon="history" isOpen={isOpen} onClose={() => setIsOpen(false)} size={size} title="Run history">
        <div className={Classes.DRAWER_BODY}>
          <p style={{ margin: 16 }}>This drawer is {size} wide.</p>
        </div>
      </Drawer>
    </>
  );
}
