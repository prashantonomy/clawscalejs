"use client";

import {
  HTMLTable,
  Navbar,
  NavbarGroup,
  NavbarHeading,
  StatusBar,
  StatusBarItem,
  StatusBarSpacer,
} from "@clawscale/react";

const runs = [
  { pipeline: "orders-sync", status: "Succeeded", duration: "4m 12s" },
  { pipeline: "billing-export", status: "Running", duration: "11m 03s" },
  { pipeline: "search-reindex", status: "Failed", duration: "26m 30s" },
  { pipeline: "ledger-close", status: "Succeeded", duration: "8m 55s" },
];

export default function StatusBarAppFrame() {
  return (
    <div style={{ border: "1px solid var(--cs-color-border)", display: "flex", flexDirection: "column", height: 240 }}>
      <Navbar>
        <NavbarGroup>
          <NavbarHeading>Pipeline runs</NavbarHeading>
        </NavbarGroup>
      </Navbar>
      <div style={{ flex: 1, overflow: "auto" }}>
        <HTMLTable compact style={{ width: "100%" }}>
          <tbody>
            {runs.map((run) => (
              <tr key={run.pipeline}>
                <td>{run.pipeline}</td>
                <td>{run.status}</td>
                <td style={{ textAlign: "right" }}>{run.duration}</td>
              </tr>
            ))}
          </tbody>
        </HTMLTable>
      </div>
      <StatusBar>
        <StatusBarItem icon="tick-circle" intent="success" role="status">
          Connected
        </StatusBarItem>
        <StatusBarItem icon="database">analytics-prod</StatusBarItem>
        <StatusBarSpacer />
        <StatusBarItem>4 runs</StatusBarItem>
        <StatusBarItem>UTC</StatusBarItem>
      </StatusBar>
    </div>
  );
}
