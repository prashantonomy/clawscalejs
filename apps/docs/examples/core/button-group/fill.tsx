"use client";

import { Button, ButtonGroup, Classes } from "@clawscale/react";

export default function ButtonGroupFill() {
  return (
    <div style={{ width: "100%", maxWidth: 480 }}>
      <ButtonGroup fill>
        <Button icon="th" text="Table" />
        <Button icon="timeline-line-chart" text="Chart" />
        <Button icon="map" text="Map" />
        <Button className={Classes.FIXED} icon="more" aria-label="More views" />
      </ButtonGroup>
    </div>
  );
}
