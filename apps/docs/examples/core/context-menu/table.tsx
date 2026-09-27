"use client";

import { ContextMenu, HTMLTable, Menu, MenuDivider, MenuItem, Tag } from "@clawscale/react";

const runs = [
  { id: 4812, pipeline: "ingest-orders", status: "Running", intent: "primary" },
  { id: 4811, pipeline: "sessionize-events", status: "Failed", intent: "danger" },
  { id: 4810, pipeline: "nightly-rollup", status: "Succeeded", intent: "success" },
] as const;

export default function ContextMenuTable() {
  return (
    <HTMLTable compact interactive style={{ width: "100%" }}>
      <thead>
        <tr>
          <th>Run</th>
          <th>Pipeline</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {runs.map((run) => (
          <ContextMenu
            key={run.id}
            tagName="tr"
            content={
              <Menu>
                <MenuItem icon="document-open" text={`Open run ${run.id}`} />
                <MenuItem icon="console" text="View logs" />
                <MenuItem icon="refresh" text="Rerun" />
                <MenuDivider />
                <MenuItem disabled={run.status !== "Running"} icon="stop" intent="danger" text="Cancel run" />
              </Menu>
            }
          >
            <td>{run.id}</td>
            <td>{run.pipeline}</td>
            <td>
              <Tag intent={run.intent} minimal>
                {run.status}
              </Tag>
            </td>
          </ContextMenu>
        ))}
      </tbody>
    </HTMLTable>
  );
}
