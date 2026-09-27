"use client";

import { Navbar, NavbarDivider, NavbarGroup, NavbarHeading, Tab, type TabId, TabPanel, Tabs } from "@clawscale/react";
import { useState } from "react";

const panels: Record<string, string> = {
  preview: "First 100 rows of orders_daily.",
  schema: "24 columns. Partitioned by order_date.",
  lineage: "Built from raw.orders and raw.customers.",
  history: "Last refreshed 12 minutes ago.",
};

export default function TabsFill() {
  const [tab, setTab] = useState<TabId>("preview");
  return (
    <div style={{ width: "100%" }}>
      <Navbar>
        <NavbarGroup>
          <NavbarHeading>orders_daily</NavbarHeading>
          <NavbarDivider />
          <Tabs id="dataset-nav" fill selectedTabId={tab} onChange={setTab}>
            <Tab id="preview" title="Preview" />
            <Tab id="schema" title="Schema" />
            <Tab id="lineage" title="Lineage" />
            <Tab id="history" title="History" />
          </Tabs>
        </NavbarGroup>
      </Navbar>
      <TabPanel id={tab} parentId="dataset-nav" selectedTabId={tab} panel={<p>{panels[tab]}</p>} />
    </div>
  );
}
