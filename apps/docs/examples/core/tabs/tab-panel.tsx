"use client";

import { Card, Tab, type TabId, TabPanel, Tabs } from "@clawscale/react";
import { useState } from "react";

const PANELS: Record<string, string> = {
  preview: "First 100 of 3.4M rows.",
  schema: "24 columns. Primary key order_id.",
  lineage: "Upstream raw.orders. Downstream finance.revenue.",
};

export default function TabsTabPanel() {
  const [tab, setTab] = useState<TabId>("preview");
  return (
    <>
      <Tabs id="dataset-view" selectedTabId={tab} onChange={setTab}>
        <Tab id="preview" title="Preview" />
        <Tab id="schema" title="Schema" />
        <Tab id="lineage" title="Lineage" />
      </Tabs>
      <Card>
        <TabPanel id={tab} selectedTabId={tab} parentId="dataset-view" panel={<p>{PANELS[tab]}</p>} />
      </Card>
    </>
  );
}
