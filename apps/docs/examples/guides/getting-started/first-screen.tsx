"use client";

import { Button, Card, H5, Tag } from "@clawscale/react";

export default function FirstScreen() {
  return (
    <Card style={{ width: 320 }}>
      <H5>Nightly export</H5>
      <p>
        Last run finished in 4m 12s.{" "}
        <Tag minimal intent="success">
          healthy
        </Tag>
      </p>
      <Button intent="primary" icon="play" text="Run now" />
    </Card>
  );
}
