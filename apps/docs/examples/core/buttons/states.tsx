"use client";

import { Button } from "@clawscale/react";

export default function ButtonsStates() {
  return (
    <>
      <Button active text="Active" />
      <Button disabled text="Disabled" />
      <Button loading text="Loading" />
      <Button intent="primary" loading text="Saving" />
    </>
  );
}
