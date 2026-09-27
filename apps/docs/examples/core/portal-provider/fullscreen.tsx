"use client";

import { Button, Card, H6, Menu, MenuItem, PopoverNext, PortalProvider } from "@clawscale/react";
import { useState } from "react";

const ranges = ["Last hour", "Last 24 hours", "Last 7 days"];

export default function PortalProviderFullscreen() {
  const [panel, setPanel] = useState<HTMLDivElement | null>(null);
  const [range, setRange] = useState("Last hour");
  const toggleFullscreen = () => {
    if (document.fullscreenElement) document.exitFullscreen();
    else panel?.requestFullscreen?.();
  };
  return (
    <Card ref={setPanel} style={{ display: "flex", alignItems: "center", gap: 8, width: "100%", maxWidth: 480 }}>
      <H6 style={{ flex: 1, margin: 0 }}>Throughput, us-east-1</H6>
      <PortalProvider portalContainer={panel ?? undefined}>
        <PopoverNext
          animation="minimal"
          arrow={false}
          placement="bottom-end"
          content={
            <Menu>
              {ranges.map((name) => (
                <MenuItem active={name === range} key={name} text={name} onClick={() => setRange(name)} />
              ))}
            </Menu>
          }
        >
          <Button endIcon="caret-down" text={range} />
        </PopoverNext>
      </PortalProvider>
      <Button aria-label="Toggle full screen" icon="fullscreen" onClick={toggleFullscreen} />
    </Card>
  );
}
