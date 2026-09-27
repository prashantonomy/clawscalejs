"use client";

import { Button } from "@clawscale/react";

export default function ButtonsIntent() {
  return (
    <>
      <Button text="Default" />
      <Button intent="primary" text="Primary" />
      <Button intent="success" text="Success" />
      <Button intent="warning" text="Warning" />
      <Button intent="danger" text="Danger" />
    </>
  );
}
