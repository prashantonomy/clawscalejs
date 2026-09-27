"use client";

import { Button, ButtonGroup } from "@clawscale/react";

export default function ButtonGroupBasic() {
  return (
    <ButtonGroup>
      <Button icon="play" text="Run" />
      <Button icon="pause" text="Pause" />
      <Button icon="stop" text="Stop" />
    </ButtonGroup>
  );
}
