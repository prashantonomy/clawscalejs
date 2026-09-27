"use client";

import { Button, ControlGroup, HTMLSelect, InputGroup } from "@clawscale/react";

export default function ControlGroupBasic() {
  return (
    <ControlGroup>
      <HTMLSelect aria-label="Filter field" options={["Owner", "Status", "Region", "Dataset"]} />
      <InputGroup aria-label="Filter value" leftIcon="filter" placeholder="Filter pipelines" />
      <Button aria-label="Apply filter" icon="arrow-right" />
    </ControlGroup>
  );
}
