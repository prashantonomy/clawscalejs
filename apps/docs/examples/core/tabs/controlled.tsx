"use client";

import { Button, Tab, type TabId, Tabs } from "@clawscale/react";
import { useState } from "react";

export default function TabsControlled() {
  const [tab, setTab] = useState<TabId>("summary");
  return (
    <>
      <Tabs id="run-tabs" selectedTabId={tab} onChange={setTab}>
        <Tab id="summary" title="Summary" panel={<p>Run 1283 of refresh_revenue failed after 1 min 48 s.</p>} />
        <Tab id="logs" title="Logs" panel={<p>06:17:11 ERROR column amount has 12 null values</p>} />
        <Tab id="config" title="Config" panel={<p>Source raw.orders. Target curated.revenue_by_region.</p>} />
      </Tabs>
      <div>
        <Button disabled={tab === "logs"} icon="console" text="Show the error" onClick={() => setTab("logs")} />
      </div>
    </>
  );
}
