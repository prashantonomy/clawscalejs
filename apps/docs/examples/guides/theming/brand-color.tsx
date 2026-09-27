"use client";

import { Button, ButtonGroup, Card, Switch, Tag, useTheme } from "@clawscale/react";
import type { CSSProperties } from "react";

const teal = {
  light: { text: "#0B6B5C", subtle: "rgba(14, 124, 107, 0.12)" },
  dark: { text: "#4FD1B8", subtle: "rgba(79, 209, 184, 0.16)" },
};

export default function BrandColor() {
  const { resolvedTheme } = useTheme();
  const brand = {
    "--cs-color-primary": "#0E7C6B",
    "--cs-color-primary-hover": "#0B6B5C",
    "--cs-color-primary-active": "#095A4D",
    "--cs-color-primary-text": teal[resolvedTheme].text,
    "--cs-color-primary-subtle": teal[resolvedTheme].subtle,
    "--cs-color-focus": "#0E7C6B",
  } as CSSProperties;

  return (
    <Card data-cs-theme={resolvedTheme} style={{ ...brand, display: "grid", gap: 12, width: 340 }}>
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
