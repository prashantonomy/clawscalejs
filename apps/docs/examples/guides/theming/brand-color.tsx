"use client";

import { Button, ButtonGroup, Card, Switch, Tag, useTheme } from "@clawscale/react";
import type { CSSProperties } from "react";

// Light and dark values side by side. The card picks the pair for the color scheme around it.
const brand = {
  "--cs-color-primary-light": "#0E7C6B",
  "--cs-color-primary-dark": "#0E7C6B",
  "--cs-color-primary-hover-light": "#0B6B5C",
  "--cs-color-primary-hover-dark": "#0B6B5C",
  "--cs-color-primary-active-light": "#095A4D",
  "--cs-color-primary-active-dark": "#095A4D",
  "--cs-color-primary-on-light": "#FFFFFF",
  "--cs-color-primary-on-dark": "#FFFFFF",
  "--cs-color-primary-text-light": "#0B6B5C",
  "--cs-color-primary-text-dark": "#4FD1B8",
  "--cs-color-primary-subtle-light": "rgba(14, 124, 107, 0.12)",
  "--cs-color-primary-subtle-dark": "rgba(79, 209, 184, 0.16)",
  "--cs-color-focus-light": "#0E7C6B",
  "--cs-color-focus-dark": "#4FD1B8",
} as CSSProperties;

export default function BrandColor() {
  // Restating the current theme makes the card pick its tokens again, from the values above.
  const { theme } = useTheme();
  return (
    <Card data-cs-theme={theme} style={{ ...brand, display: "grid", gap: 12, width: 340 }}>
      <ButtonGroup>
        <Button intent="primary" text="Deploy" />
        <Button intent="primary" variant="outlined" text="Preview" />
      </ButtonGroup>
      <Switch defaultChecked label="Auto-scale workers" />
      <Tag minimal intent="primary">
        us-east-1
      </Tag>
    </Card>
  );
}
