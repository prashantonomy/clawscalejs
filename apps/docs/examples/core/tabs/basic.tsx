"use client";

import { Tab, Tabs } from "@clawscale/react";

export default function TabsBasic() {
  return (
    <Tabs id="pipeline-tabs" defaultSelectedTabId="runs">
      <Tab id="overview" title="Overview" panel={<p>ingest_orders loads raw orders from Kafka every hour.</p>} />
      <Tab id="runs" title="Runs" panel={<p>1,284 runs in the last 90 days. 99.2% succeeded.</p>} />
      <Tab id="lineage" title="Lineage" panel={<p>Reads raw.orders. Writes curated.orders_daily.</p>} />
      <Tab id="settings" title="Settings" disabled />
    </Tabs>
  );
}
