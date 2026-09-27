"use client";

import { SwitchCard } from "@clawscale/react";

export default function ControlCardSwitch() {
  return (
    <>
      <SwitchCard defaultChecked style={{ width: 240 }}>
        Alert on failed runs
      </SwitchCard>
      <SwitchCard style={{ width: 240 }}>Alert on slow runs</SwitchCard>
    </>
  );
}
