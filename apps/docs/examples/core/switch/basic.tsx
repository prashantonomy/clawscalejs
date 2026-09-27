"use client";

import { Switch } from "@clawscale/react";
import { useState } from "react";

export default function SwitchBasic() {
  const [paused, setPaused] = useState(false);
  return (
    <div>
      <Switch checked={paused} label="Pause ingestion" onChange={(event) => setPaused(event.currentTarget.checked)} />
      <Switch defaultChecked label="Auto-scale workers" />
    </div>
  );
}
