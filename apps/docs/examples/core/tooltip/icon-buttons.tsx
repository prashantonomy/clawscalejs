"use client";

import { Button, ButtonGroup, type IconName, Tooltip } from "@clawscale/react";

const actions: [IconName, string][] = [
  ["refresh", "Refresh"],
  ["filter", "Filter rows"],
  ["download", "Download CSV"],
  ["cog", "Table settings"],
];

export default function TooltipIconButtons() {
  return (
    <ButtonGroup variant="minimal">
      {actions.map(([icon, label]) => (
        <Tooltip content={label} key={icon} placement="bottom">
          <Button aria-label={label} icon={icon} />
        </Tooltip>
      ))}
    </ButtonGroup>
  );
}
