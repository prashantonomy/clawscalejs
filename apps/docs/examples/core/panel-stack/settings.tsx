"use client";

import { Card, Icon, Menu, MenuItem, type PanelProps, PanelStack, Switch } from "@clawscale/react";

function AlertsPanel() {
  return (
    <div style={{ padding: 16 }}>
      <Switch defaultChecked label="Email on failure" />
      <Switch label="Slack on success" />
      <Switch defaultChecked label="Page on SLA breach" />
    </div>
  );
}

function RetentionPanel({ closePanel }: PanelProps<object>) {
  return (
    <Menu>
      {["7 days", "30 days", "90 days", "1 year"].map((period) => (
        <MenuItem key={period} text={period} onClick={closePanel} />
      ))}
    </Menu>
  );
}

function SettingsPanel({ openPanel }: PanelProps<object>) {
  const next = <Icon icon="chevron-right" />;
  const openAlerts = () => openPanel({ title: "Alerts", renderPanel: AlertsPanel });
  const openRetention = () => openPanel({ title: "Retention", renderPanel: RetentionPanel });
  return (
    <Menu>
      <MenuItem icon="notifications" text="Alerts" labelElement={next} onClick={openAlerts} />
      <MenuItem icon="history" text="Retention" labelElement={next} onClick={openRetention} />
    </Menu>
  );
}

export default function PanelStackSettings() {
  // Panels are absolutely positioned. The grid stretches the stack to the size of the card.
  return (
    <Card style={{ display: "grid", height: 220, overflow: "hidden", padding: 0, width: 300 }}>
      <PanelStack initialPanel={{ title: "Pipeline settings", renderPanel: SettingsPanel }} />
    </Card>
  );
}
