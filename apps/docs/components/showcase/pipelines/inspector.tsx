"use client";

import {
  Button,
  Callout,
  EntityTitle,
  H5,
  HTMLTable,
  Menu,
  MenuDivider,
  MenuItem,
  PopoverNext,
  ProgressBar,
  PropertyList,
  PropertyListItem,
  Sparkline,
  Tab,
  Tabs,
  Tag,
} from "@clawscale/react";
import { useState } from "react";
import { formatAgo, formatDuration, formatNumber, type Pipeline, runsFor } from "./data";
import { statusStyle } from "./status";

function Details({ pipeline }: { pipeline: Pipeline }) {
  return (
    <div className="showcase-inspector-section">
      <PropertyList labelWidth={96}>
        <PropertyListItem label="Owner">{pipeline.owner}</PropertyListItem>
        <PropertyListItem label="Schedule">{pipeline.schedule}</PropertyListItem>
        <PropertyListItem label="Source" monospace>
          {pipeline.source}
        </PropertyListItem>
        <PropertyListItem label="Destination" monospace>
          {pipeline.destination}
        </PropertyListItem>
        <PropertyListItem label="Region">{pipeline.region}</PropertyListItem>
        <PropertyListItem label="Last run">{formatAgo(pipeline.lastRunMinutesAgo)}</PropertyListItem>
        <PropertyListItem label="Pipeline ID" monospace>
          {pipeline.id}
        </PropertyListItem>
      </PropertyList>
      <div className="showcase-inspector-block">
        <div className="showcase-inspector-label">
          <span>Freshness SLA</span>
          <strong className="cs-numeric">{(pipeline.sla * 100).toFixed(1)}%</strong>
        </div>
        <ProgressBar
          aria-label="Freshness SLA"
          value={pipeline.sla}
          intent={pipeline.sla < 0.95 ? "danger" : pipeline.sla < 0.98 ? "warning" : "success"}
          stripes={false}
        />
      </div>
      <div className="showcase-inspector-block">
        <div className="showcase-inspector-label">
          <span>Duration, last 14 runs</span>
          <strong className="cs-numeric">{formatDuration(pipeline.trend.at(-1) ?? 0)}</strong>
        </div>
        <Sparkline data={pipeline.trend} height={40} area label={`${pipeline.name} duration trend`} />
      </div>
    </div>
  );
}

function Runs({ pipeline }: { pipeline: Pipeline }) {
  return (
    <HTMLTable compact className="showcase-runs">
      <thead>
        <tr>
          <th>Run</th>
          <th>Status</th>
          <th className="showcase-num">Duration</th>
        </tr>
      </thead>
      <tbody>
        {runsFor(pipeline).map((run) => {
          const status = statusStyle[run.status];
          return (
            <tr key={run.id}>
              <td className="cs-monospace">{run.id}</td>
              <td>
                <Tag minimal intent={status.intent} icon={status.icon}>
                  {status.label}
                </Tag>
              </td>
              <td className="showcase-num">{formatDuration(run.durationSeconds)}</td>
            </tr>
          );
        })}
      </tbody>
    </HTMLTable>
  );
}

export function Inspector({ pipeline }: { pipeline: Pipeline }) {
  const [tab, setTab] = useState("details");
  const status = statusStyle[pipeline.status];
  return (
    <aside className="showcase-inspector" aria-label="Pipeline details">
      <div className="showcase-inspector-header">
        <EntityTitle
          icon="flow-linear"
          title={pipeline.name}
          subtitle={`${pipeline.domain} pipeline`}
          heading={H5}
          ellipsize
        />
        <Tag minimal intent={status.intent} icon={status.icon}>
          {status.label}
        </Tag>
      </div>
      <div className="showcase-inspector-actions">
        <Button icon="play" intent="primary" text="Run now" size="small" />
        <Button
          icon={pipeline.status === "paused" ? "play" : "pause"}
          text={pipeline.status === "paused" ? "Resume" : "Pause"}
          size="small"
        />
        <PopoverNext
          placement="bottom-end"
          content={
            <Menu>
              <MenuItem icon="edit" text="Edit schedule" />
              <MenuItem icon="duplicate" text="Duplicate" />
              <MenuItem icon="history" text="Backfill" label="7d" />
              <MenuDivider />
              <MenuItem icon="trash" intent="danger" text="Delete pipeline" />
            </Menu>
          }
        >
          <Button icon="more" size="small" variant="minimal" aria-label="More actions" />
        </PopoverNext>
      </div>
      {pipeline.error && (
        <Callout intent="danger" icon="error" title="Last run failed" compact className="showcase-inspector-callout">
          {pipeline.error}
        </Callout>
      )}
      <Tabs id="showcase-inspector-tabs" selectedTabId={tab} onChange={(id) => setTab(String(id))}>
        <Tab id="details" title="Details" panel={<Details pipeline={pipeline} />} />
        <Tab id="runs" title="Runs" tagContent={8} panel={<Runs pipeline={pipeline} />} />
      </Tabs>
      <div className="showcase-inspector-footer">
        <span>Rows last run</span>
        <strong className="cs-numeric">{formatNumber(pipeline.rows)}</strong>
      </div>
    </aside>
  );
}
