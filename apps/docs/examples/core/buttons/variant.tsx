"use client";

import { Button } from "@clawscale/react";

export default function ButtonsVariant() {
  return (
    <>
      <Button intent="primary" text="Solid" />
      <Button intent="primary" variant="outlined" text="Outlined" />
      <Button intent="primary" variant="minimal" text="Minimal" />
    </>
  );
}
