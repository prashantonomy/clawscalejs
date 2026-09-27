"use client";

import { Button, Menu, MenuItem, PopoverNext } from "@clawscale/react";
import { useState } from "react";

const regions = ["us-east-1", "us-west-2", "eu-west-1", "ap-south-1"];

export default function PopoverMatchTargetWidth() {
  const [region, setRegion] = useState("eu-west-1");
  return (
    <div style={{ width: "100%", maxWidth: 280 }}>
      <PopoverNext
        animation="minimal"
        arrow={false}
        fill
        matchTargetWidth
        placement="bottom-start"
        content={
          <Menu>
            {regions.map((name) => (
              <MenuItem active={name === region} key={name} text={name} onClick={() => setRegion(name)} />
            ))}
          </Menu>
        }
      >
        <Button alignText="start" endIcon="caret-down" icon="globe" text={region} />
      </PopoverNext>
    </div>
  );
}
