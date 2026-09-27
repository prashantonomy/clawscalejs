"use client";

import {
  Breadcrumbs,
  Button,
  Card,
  HTMLSelect,
  Icon,
  InputGroup,
  KeyComboTag,
  Menu,
  MenuItem,
  Metric,
  Navbar,
  NavbarDivider,
  NavbarGroup,
  NonIdealState,
  SegmentedControl,
  StatusBar,
  StatusBarItem,
  StatusBarSpacer,
  Switch,
  Tag,
  Tree,
  type TreeNodeInfo,
  useHotkeys,
  useTheme,
} from "@clawscale/react";
import Link from "next/link";
import { useMemo, useRef, useState } from "react";
import { LogoMark } from "@/components/docs/logo";
import { BarChart } from "./bar-chart";
import {
  formatCompact,
  formatNumber,
  type PipelineStatus,
  pipelines,
  regions,
  runsPerBucket,
  type TimeRange,
  throughput,
  timeLabels,
} from "./data";
import { Inspector } from "./inspector";
import { LineChart } from "./line-chart";
import { PipelinesTable } from "./pipelines-table";
import { statusStyle } from "./status";

const ranges: TimeRange[] = ["1h", "24h", "7d", "30d"];
const statuses = Object.keys(statusStyle) as PipelineStatus[];

function workspaceTree(): TreeNodeInfo[] {
  const domains = [...new Set(pipelines.map((p) => p.domain))];
  return [
    {
      id: "production",
      label: "Production",
      icon: "folder-open",
      isExpanded: true,
      secondaryLabel: String(pipelines.length),
      childNodes: domains.map((domain) => ({
        id: domain,
        label: domain,
        icon: "layers",
        secondaryLabel: String(pipelines.filter((p) => p.domain === domain).length),
        isSelected: domain === "Orders",
      })),
    },
    { id: "staging", label: "Staging", icon: "folder-close", hasCaret: true, secondaryLabel: "11" },
    { id: "sandbox", label: "Sandbox", icon: "folder-close", hasCaret: true, secondaryLabel: "4" },
  ];
}

export function Showcase() {
  const { resolvedTheme, setTheme } = useTheme();
  const [range, setRange] = useState<TimeRange>("24h");
  const [region, setRegion] = useState("all");
  const [status, setStatus] = useState("all");
  const [query, setQuery] = useState("");
  const [live, setLive] = useState(true);
  const [selectedId, setSelectedId] = useState(pipelines.find((p) => p.status === "failed")?.id);
  const searchRef = useRef<HTMLInputElement>(null);
  const tree = useMemo(workspaceTree, []);

  useHotkeys(
    useMemo(
      () => [
        {
          combo: "mod+k",
          global: true,
          label: "Search pipelines",
          preventDefault: true,
          onKeyDown: () => searchRef.current?.focus(),
        },
      ],
      [],
    ),
  );

  const filtered = pipelines.filter(
    (p) =>
      (region === "all" || p.region === region) &&
      (status === "all" || p.status === status) &&
      p.name.includes(query.trim().toLowerCase()),
  );
  const selected = pipelines.find((p) => p.id === selectedId) ?? filtered[0];

  const labels = timeLabels(range);
  const series = throughput(range).filter((s) => region === "all" || s.id === region);
  const totals = labels.map((_, i) => series.reduce((sum, s) => sum + (s.values[i] ?? 0), 0));
  const runs = runsPerBucket(range);
  const failed = filtered.filter((p) => p.status === "failed").length;
  const sla = filtered.length > 0 ? filtered.reduce((sum, p) => sum + p.sla, 0) / filtered.length : 0;

  return (
    <div className="showcase">
      <Navbar className="showcase-navbar">
        <NavbarGroup>
          <Link href="/" className="showcase-brand" aria-label="Clawscale home">
            <LogoMark size={24} />
            <span>Pipeline console</span>
          </Link>
          <NavbarDivider />
          <nav className="showcase-nav-tabs" aria-label="Sections">
            <Button variant="minimal" text="Overview" />
            <Button variant="minimal" active aria-current="page" text="Pipelines" />
            <Button variant="minimal" text="Datasets" />
            <Button
              variant="minimal"
              text="Alerts"
              endIcon={
                <Tag minimal round>
                  {failed}
                </Tag>
              }
            />
          </nav>
        </NavbarGroup>
        <NavbarGroup align="end" className="showcase-navbar-end">
          <InputGroup
            inputRef={searchRef}
            leftIcon="search"
            placeholder="Search pipelines"
            size="small"
            value={query}
            onValueChange={setQuery}
            rightElement={<KeyComboTag className="showcase-search-hint" combo="mod+k" minimal />}
            aria-label="Search pipelines"
          />
          <Button icon="notifications" variant="minimal" aria-label="Notifications" />
          <Button
            variant="minimal"
            aria-label="Toggle theme"
            onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
          >
            <Icon icon="moon" className="theme-show-light" />
            <Icon icon="flash" className="theme-show-dark" />
          </Button>
          <span className="showcase-avatar" role="img" aria-label="Signed in as Ada Kovac">
            AK
          </span>
        </NavbarGroup>
      </Navbar>

      <div className="showcase-body">
        <nav className="showcase-sidebar" aria-label="Workspaces">
          <div className="showcase-sidebar-title">Workspaces</div>
          <Tree contents={tree} />
          <div className="showcase-sidebar-title">Saved views</div>
          <Menu className="showcase-views">
            <MenuItem icon="error" text="Failed today" label={String(failed)} />
            <MenuItem icon="time" text="Slow runs" label="4" />
            <MenuItem icon="person" text="Owned by me" label="7" />
            <MenuItem icon="star" text="Pinned" label="3" />
          </Menu>
        </nav>

        <main className="showcase-main">
          <header className="showcase-header">
            <div>
              <Breadcrumbs
                items={[{ text: "Workspaces", icon: "folder-close" }, { text: "Production" }, { text: "Pipelines" }]}
              />
              <h1 className="showcase-title">Production pipelines</h1>
            </div>
            <div className="showcase-header-actions">
              <Button icon="download" text="Export" variant="minimal" />
              <Button icon="add" intent="primary" text="New pipeline" />
            </div>
          </header>

          <search className="showcase-filters">
            <SegmentedControl
              aria-label="Time range"
              options={ranges.map((value) => ({ label: value, value }))}
              value={range}
              onValueChange={(value) => setRange(value as TimeRange)}
              small
            />
            <HTMLSelect
              aria-label="Region"
              value={region}
              onChange={(event) => setRegion(event.currentTarget.value)}
              options={[{ label: "All regions", value: "all" }, ...regions.map((r) => ({ label: r, value: r }))]}
            />
            <HTMLSelect
              aria-label="Status"
              value={status}
              onChange={(event) => setStatus(event.currentTarget.value)}
              options={[
                { label: "All statuses", value: "all" },
                ...statuses.map((s) => ({ label: statusStyle[s].label, value: s })),
              ]}
            />
            <Switch checked={live} label="Live" onChange={(event) => setLive(event.currentTarget.checked)} />
            {(region !== "all" || status !== "all" || query) && (
              <Button
                icon="cross"
                text="Clear filters"
                variant="minimal"
                size="small"
                onClick={() => {
                  setRegion("all");
                  setStatus("all");
                  setQuery("");
                }}
              />
            )}
          </search>

          <section className="showcase-metrics" aria-label="Key metrics">
            <Card>
              <Metric
                label="Throughput"
                value={formatCompact((totals.at(-1) ?? 0) * 1000)}
                unit="rows/s"
                delta={6.2}
                caption="vs previous period"
                trend={totals}
              />
            </Card>
            <Card>
              <Metric
                label="p95 run latency"
                value="182"
                unit="ms"
                delta={3.4}
                goodDirection="down"
                caption="vs previous period"
                trend={[160, 158, 170, 166, 175, 171, 180, 177, 182]}
                trendColor="var(--cs-chart-2)"
              />
            </Card>
            <Card>
              <Metric
                label="Failed pipelines"
                value={String(failed)}
                delta={1}
                deltaFormat={(value) => `${value} since yesterday`}
                goodDirection="down"
              />
            </Card>
            <Card>
              <Metric label="Freshness SLA" value={`${(sla * 100).toFixed(1)}%`} delta={-0.4} caption="target 98%" />
            </Card>
          </section>

          <section className="showcase-charts">
            <Card className="showcase-chart-card">
              <div className="showcase-card-header">
                <h2>Throughput by region</h2>
                <span>Rows per second, thousands</span>
              </div>
              <LineChart
                label="Throughput by region in thousands of rows per second"
                series={series}
                labels={labels}
                formatValue={(v) => `${v.toFixed(1)}K rows/s`}
                formatTick={(v) => (v === 0 ? "0" : `${v}K`)}
              />
            </Card>
            <Card className="showcase-chart-card">
              <div className="showcase-card-header">
                <h2>Completed runs</h2>
                <span>All pipelines, per interval</span>
              </div>
              <BarChart
                label="Completed runs per interval"
                values={runs}
                labels={labels}
                formatValue={formatNumber}
                formatTick={(v) => formatNumber(Math.round(v))}
              />
            </Card>
          </section>

          <Card className="showcase-table-card">
            <div className="showcase-card-header">
              <h2>Pipelines</h2>
              <Tag minimal round>
                {filtered.length}
              </Tag>
              <span className="showcase-card-spacer" />
              <Button icon="refresh" variant="minimal" size="small" text={live ? "Live" : "Refresh"} />
            </div>
            {filtered.length > 0 ? (
              <PipelinesTable pipelines={filtered} selectedId={selected?.id} onSelect={setSelectedId} />
            ) : (
              <NonIdealState icon="search" title="No pipelines match" description="Change or clear the filters." />
            )}
          </Card>
        </main>

        {selected && <Inspector pipeline={selected} />}
      </div>

      <StatusBar className="showcase-statusbar">
        <StatusBarItem icon="tick-circle" intent="success">
          Connected
        </StatusBarItem>
        <StatusBarItem icon="globe">{regions.length} regions</StatusBarItem>
        <StatusBarItem icon="flow-linear">{pipelines.length} pipelines</StatusBarItem>
        <StatusBarSpacer />
        <StatusBarItem icon="refresh">{live ? "Live, synced 12s ago" : "Paused"}</StatusBarItem>
        <StatusBarItem onClick={() => {}}>UTC</StatusBarItem>
        <StatusBarItem icon="notifications" onClick={() => {}}>
          {failed}
        </StatusBarItem>
      </StatusBar>
    </div>
  );
}
