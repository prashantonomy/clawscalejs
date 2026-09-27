"use client";

import { Tab, Tabs } from "@clawscale/react";

export default function TabsVertical() {
  return (
    <Tabs id="workspace-tabs" vertical>
      <Tab id="general" title="General" panel={<p>Workspace name, time zone and default region.</p>} />
      <Tab id="members" title="Members" panel={<p>42 members in 5 groups.</p>} />
      <Tab id="connections" title="Connections" panel={<p>Kafka, Postgres and S3 sources.</p>} />
      <Tab id="billing" title="Billing" panel={<p>1,820 compute hours this month.</p>} />
    </Tabs>
  );
}
