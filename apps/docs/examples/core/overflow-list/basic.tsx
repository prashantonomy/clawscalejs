"use client";

import { Boundary, Button, Menu, MenuItem, OverflowList, PopoverNext } from "@clawscale/react";

const STAGES = ["Extract", "Validate", "Deduplicate", "Enrich", "Join", "Aggregate", "Publish"];

export default function OverflowListBasic() {
  return (
    <div
      style={{
        border: "1px dashed var(--cs-color-border-strong)",
        maxWidth: "100%",
        minWidth: 96,
        overflow: "hidden",
        padding: 4,
        resize: "horizontal",
        width: 400,
      }}
    >
      <OverflowList
        items={STAGES}
        collapseFrom={Boundary.END}
        visibleItemRenderer={(stage) => <Button key={stage} style={{ flexShrink: 0 }} variant="minimal" text={stage} />}
        overflowRenderer={(hidden) => (
          <PopoverNext
            placement="bottom-end"
            content={
              <Menu>
                {hidden.map((stage) => (
                  <MenuItem key={stage} text={stage} />
                ))}
              </Menu>
            }
          >
            <Button variant="minimal" icon="more" aria-label={`${hidden.length} more stages`} />
          </PopoverNext>
        )}
      />
    </div>
  );
}
