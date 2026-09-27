"use client";

import { Button, ButtonGroup } from "@clawscale/react";

export default function ButtonGroupVertical() {
  return (
    <ButtonGroup vertical alignText="start">
      <Button icon="database" text="Datasets" />
      <Button icon="flow-linear" text="Pipelines" />
      <Button icon="dashboard" text="Dashboards" />
      <Button icon="cog" text="Settings" />
    </ButtonGroup>
  );
}
