"use client";

import { Switch } from "@clawscale/react";

export default function SwitchSize() {
  return (
    <>
      <Switch defaultChecked label="Medium" size="medium" />
      <Switch defaultChecked label="Large" size="large" />
    </>
  );
}
