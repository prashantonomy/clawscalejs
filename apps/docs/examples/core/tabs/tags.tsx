"use client";

import { Tab, Tabs } from "@clawscale/react";

export default function TabsTags() {
  return (
    <Tabs id="dataset-tabs">
      <Tab id="columns" title="Columns" tagContent={24} panel={<p>order_id, amount, region and 21 more.</p>} />
      <Tab id="partitions" title="Partitions" tagContent="1.2K" panel={<p>One partition per day since 2023.</p>} />
      <Tab id="alerts" title="Alerts" tagContent={3} panel={<p>3 open alerts on freshness and row count.</p>} />
    </Tabs>
  );
}
