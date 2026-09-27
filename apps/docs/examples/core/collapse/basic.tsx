"use client";

import { Button, Collapse, Pre } from "@clawscale/react";
import { useState } from "react";

export default function CollapseBasic() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div style={{ width: "100%", maxWidth: 480 }}>
      <Button
        aria-expanded={isOpen}
        endIcon={isOpen ? "chevron-up" : "chevron-down"}
        text={isOpen ? "Hide run log" : "Show run log"}
        onClick={() => setIsOpen(!isOpen)}
      />
      <Collapse isOpen={isOpen}>
        <Pre>
          {`02:00:04  extract    1,204,331 rows
02:03:12  transform  1,203,907 rows
02:04:40  load       done in 4m 36s`}
        </Pre>
      </Collapse>
    </div>
  );
}
