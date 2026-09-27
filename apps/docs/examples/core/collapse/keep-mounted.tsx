"use client";

import { Button, Collapse, InputGroup } from "@clawscale/react";
import { useState } from "react";

export default function CollapseKeepMounted() {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <div style={{ width: "100%", maxWidth: 360 }}>
      <Button
        aria-expanded={isOpen}
        icon="filter"
        text={isOpen ? "Hide filters" : "Show filters"}
        onClick={() => setIsOpen(!isOpen)}
      />
      <Collapse isOpen={isOpen} keepChildrenMounted>
        <div style={{ paddingTop: 8 }}>
          <InputGroup leftIcon="search" placeholder="Filter by pipeline" aria-label="Filter by pipeline" />
        </div>
      </Collapse>
    </div>
  );
}
