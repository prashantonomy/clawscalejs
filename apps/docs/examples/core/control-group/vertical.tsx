"use client";

import { Button, ControlGroup, HTMLSelect, InputGroup } from "@clawscale/react";

export default function ControlGroupVertical() {
  return (
    <ControlGroup vertical style={{ width: 260 }}>
      <InputGroup aria-label="Dataset name" leftIcon="database" placeholder="Dataset name" />
      <HTMLSelect aria-label="Storage region" options={["eu-west-1", "us-east-1", "ap-southeast-2"]} />
      <Button intent="primary" text="Create dataset" />
    </ControlGroup>
  );
}
