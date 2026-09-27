"use client";

import { Button, Classes, ControlGroup, HTMLSelect, InputGroup } from "@clawscale/react";

export default function ControlGroupFill() {
  return (
    <ControlGroup fill>
      <HTMLSelect aria-label="Region" className={Classes.FIXED} options={["All regions", "eu-west-1", "us-east-1"]} />
      <InputGroup aria-label="Search datasets" leftIcon="search" placeholder="Search 1,204 datasets" />
      <Button className={Classes.FIXED} intent="primary" text="Search" />
    </ControlGroup>
  );
}
