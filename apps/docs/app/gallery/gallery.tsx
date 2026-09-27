"use client";

import {
  Alert,
  AnchorButton,
  Breadcrumbs,
  Button,
  ButtonGroup,
  Callout,
  Card,
  CardList,
  Checkbox,
  Classes,
  CompoundTag,
  ControlGroup,
  Delta,
  DialogBody,
  DialogFooter,
  Divider,
  EditableText,
  EntityTitle,
  FileInput,
  FormGroup,
  H1,
  H2,
  H3,
  H4,
  H5,
  HTMLSelect,
  HTMLTable,
  Icon,
  InputGroup,
  KeyComboTag,
  Menu,
  MenuDivider,
  MenuItem,
  Metric,
  Navbar,
  NavbarDivider,
  NavbarGroup,
  NavbarHeading,
  NonIdealState,
  NumericInput,
  PopoverNext,
  ProgressBar,
  PropertyList,
  PropertyListItem,
  Radio,
  RadioGroup,
  RangeSlider,
  Section,
  SectionCard,
  SegmentedControl,
  Slider,
  Sparkline,
  Spinner,
  StatusBar,
  StatusBarItem,
  StatusBarSpacer,
  Switch,
  Tab,
  Tabs,
  Tag,
  TagInput,
  TextArea,
  Toast2,
  Tooltip,
  Tree,
  useTheme,
} from "@clawscale/react";
import { DateRangePicker } from "@clawscale/react/datetime";
import { Select } from "@clawscale/react/select";
import { Cell, Column, Table } from "@clawscale/react/table";
import { type ReactNode, useState } from "react";
import { withBasePath } from "@/lib/site";

const intents = ["none", "primary", "success", "warning", "danger"] as const;

function Block({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="gallery-block" data-block={title}>
      <h2 className="gallery-block-title">{title}</h2>
      <div className="gallery-block-body">{children}</div>
    </section>
  );
}

function Row({ children }: { children: ReactNode }) {
  return <div className="gallery-row">{children}</div>;
}

const regions = ["us-east-1", "us-west-2", "eu-central-1", "ap-south-1"];
const tableRows = [
  ["ingest-orders", "Running", "1,284", "12.4 ms"],
  ["billing-sync", "Queued", "342", "48.1 ms"],
  ["ml-features", "Failed", "0", "0.0 ms"],
  ["audit-export", "Running", "9,120", "3.2 ms"],
  ["search-index", "Paused", "57", "210.9 ms"],
];

export function Gallery() {
  const { resolvedTheme, setTheme } = useTheme();
  const [tags, setTags] = useState<ReactNode[]>(["prod", "eu-central-1"]);
  const [range, setRange] = useState<[number, number]>([20, 70]);
  const [tab, setTab] = useState<string>("overview");
  const [segment, setSegment] = useState("day");
  const [region, setRegion] = useState(regions[0] ?? "");

  return (
    <div className="gallery">
      <Navbar>
        <NavbarGroup>
          <NavbarHeading>Gallery</NavbarHeading>
          <NavbarDivider />
          <Button variant="minimal" icon="home" text="Home" />
          <Button variant="minimal" icon="document" text="Files" />
        </NavbarGroup>
        <NavbarGroup align="right">
          <InputGroup leftIcon="search" placeholder="Search" size="small" />
          <NavbarDivider />
          <Button
            variant="minimal"
            icon={resolvedTheme === "dark" ? "flash" : "moon"}
            aria-label="Toggle theme"
            onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
          />
        </NavbarGroup>
      </Navbar>

      <div className="gallery-grid">
        <Block title="Buttons">
          <Row>
            {intents.map((intent) => (
              <Button key={intent} intent={intent} text={intent === "none" ? "Default" : intent} />
            ))}
          </Row>
          <Row>
            {intents.map((intent) => (
              <Button key={intent} intent={intent} variant="outlined" text="Outlined" />
            ))}
          </Row>
          <Row>
            {intents.map((intent) => (
              <Button key={intent} intent={intent} variant="minimal" icon="refresh" text="Minimal" />
            ))}
          </Row>
          <Row>
            <Button icon="add" text="Small" size="small" />
            <Button icon="add" text="Medium" />
            <Button icon="add" text="Large" size="large" />
            <Button icon="cog" aria-label="Settings" />
            <Button loading text="Loading" />
            <Button disabled text="Disabled" />
            <AnchorButton href="#" endIcon="share" text="Anchor" />
          </Row>
          <Row>
            <ButtonGroup>
              <Button icon="align-left" />
              <Button icon="align-center" active />
              <Button icon="align-right" />
            </ButtonGroup>
            <ButtonGroup variant="outlined">
              <Button text="Day" />
              <Button text="Week" />
              <Button text="Month" />
            </ButtonGroup>
            <ButtonGroup variant="minimal">
              <Button icon="grid-view" aria-label="Grid" active />
              <Button icon="list" aria-label="List" />
              <Button icon="trash" intent="danger" aria-label="Delete" />
            </ButtonGroup>
            <SegmentedControl
              options={[
                { label: "Day", value: "day" },
                { label: "Week", value: "week" },
                { label: "Month", value: "month" },
              ]}
              value={segment}
              onValueChange={setSegment}
              small
            />
          </Row>
        </Block>

        <Block title="Inputs">
          <FormGroup
            label="Pipeline name"
            labelFor="gallery-name"
            labelInfo="(required)"
            helperText="Letters and dashes."
          >
            <InputGroup id="gallery-name" placeholder="ingest-orders" leftIcon="flow-linear" />
          </FormGroup>
          <Row>
            <InputGroup placeholder="Filter rows" leftIcon="filter" rightElement={<Tag minimal>42</Tag>} />
            <InputGroup intent="danger" defaultValue="bad value" />
          </Row>
          <Row>
            <NumericInput defaultValue={12} min={0} max={100} />
            <HTMLSelect options={regions} value={region} onChange={(e) => setRegion(e.currentTarget.value)} />
            <FileInput text="Choose file" />
          </Row>
          <ControlGroup fill>
            <HTMLSelect aria-label="Column" className={Classes.FIXED} options={["Name", "Owner", "Status"]} />
            <InputGroup aria-label="Filter value" placeholder="Contains" fill />
            <Button aria-label="Apply filter" className={Classes.FIXED} icon="arrow-right" intent="primary" />
          </ControlGroup>
          <TagInput values={tags} onChange={setTags} leftIcon="tag" placeholder="Add tags" />
          <TextArea placeholder="Notes" fill rows={2} />
        </Block>

        <Block title="Controls">
          <Row>
            <Checkbox label="Checked" defaultChecked />
            <Checkbox label="Unchecked" />
            <Checkbox label="Indeterminate" indeterminate />
            <Checkbox label="Disabled" disabled />
          </Row>
          <Row>
            <Switch label="Live updates" defaultChecked />
            <Switch label="Off" />
            <Switch label="Disabled" disabled defaultChecked />
          </Row>
          <RadioGroup inline name="gallery-format" selectedValue="csv" onChange={() => {}} label="Format">
            <Radio label="CSV" value="csv" />
            <Radio label="Parquet" value="parquet" />
            <Radio label="JSON" value="json" />
          </RadioGroup>
          <Slider
            min={0}
            max={100}
            stepSize={1}
            labelStepSize={25}
            value={40}
            onChange={() => {}}
            handleHtmlProps={{ "aria-label": "Worker count" }}
          />
          <RangeSlider
            min={0}
            max={100}
            stepSize={1}
            labelStepSize={25}
            value={range}
            onChange={setRange}
            handleHtmlProps={{ start: { "aria-label": "Minimum" }, end: { "aria-label": "Maximum" } }}
          />
        </Block>

        <Block title="Tags and feedback">
          <Row>
            {intents.map((intent) => (
              <Tag key={intent} intent={intent}>
                {intent}
              </Tag>
            ))}
          </Row>
          <Row>
            {intents.map((intent) => (
              <Tag key={intent} intent={intent} minimal icon="dot">
                {intent}
              </Tag>
            ))}
          </Row>
          <Row>
            <Tag round interactive onRemove={() => {}}>
              removable
            </Tag>
            <CompoundTag leftContent="env" intent="primary">
              production
            </CompoundTag>
            <KeyComboTag combo="mod+k" />
            <Delta value={4.2} />
            <Delta value={-1.3} />
            <Delta value={0.8} goodDirection="down" />
          </Row>
          <Row>
            <ProgressBar value={0.62} intent="primary" />
          </Row>
          <Row>
            <ProgressBar value={0.35} intent="success" stripes={false} />
          </Row>
          <Row>
            <Spinner size={20} />
            <Spinner size={20} intent="primary" />
            <span className={Classes.SKELETON}>Loading text</span>
          </Row>
        </Block>

        <Block title="Callouts">
          <Callout title="Heads up" icon="info-sign">
            New regions are available for pipelines.
          </Callout>
          {intents.slice(1).map((intent) => (
            <Callout key={intent} intent={intent} title={`${intent} callout`} compact>
              Short, crisp message.
            </Callout>
          ))}
        </Block>

        <Block title="Cards and sections">
          <Card>
            <H5>Card</H5>
            <p className={Classes.TEXT_MUTED}>Default elevation, with a short description.</p>
            <Button text="Open" size="small" />
          </Card>
          <Card interactive elevation={2}>
            Interactive card, elevation 2
          </Card>
          <Section title="Section" subtitle="With cards" collapsible rightElement={<Button size="small" text="Edit" />}>
            <SectionCard>
              <PropertyList compact>
                <PropertyListItem label="Owner">data-platform</PropertyListItem>
                <PropertyListItem label="Run ID" monospace>
                  run_8f2c91
                </PropertyListItem>
                <PropertyListItem label="Region">eu-central-1</PropertyListItem>
              </PropertyList>
            </SectionCard>
          </Section>
          <CardList compact>
            <Card interactive>First item</Card>
            <Card interactive>Second item</Card>
            <Card interactive>Third item</Card>
          </CardList>
        </Block>

        <Block title="Metrics">
          <div className="gallery-metrics">
            <Card>
              <Metric
                label="Throughput"
                value="12,480"
                unit="rows/s"
                delta={8.2}
                caption="vs last hour"
                trend={[4, 6, 5, 8, 7, 9, 11, 10, 12, 13]}
              />
            </Card>
            <Card>
              <Metric
                label="p95 latency"
                value="182"
                unit="ms"
                delta={3.1}
                goodDirection="down"
                caption="vs last hour"
                trend={[12, 11, 13, 12, 15, 14, 16, 15, 17, 18]}
                trendColor="var(--cs-chart-2)"
              />
            </Card>
          </div>
          <Row>
            <Sparkline data={[3, 5, 4, 6, 8, 7, 9, 12, 11, 14]} width={120} />
            <Sparkline data={[9, 7, 8, 6, 5, 6, 4, 3, 4, 2]} width={120} color="var(--cs-chart-3)" area />
          </Row>
        </Block>

        <Block title="Menu and overlays">
          <div className="gallery-overlays">
            <Menu className={Classes.ELEVATION_2}>
              <MenuItem icon="new-text-box" text="New pipeline" label="⌘N" />
              <MenuItem icon="duplicate" text="Duplicate" active />
              <MenuItem icon="edit" text="Rename" />
              <MenuItem icon="export" text="Export">
                <MenuItem text="CSV" />
                <MenuItem text="Parquet" />
              </MenuItem>
              <MenuDivider title="Danger zone" />
              <MenuItem icon="trash" text="Delete" intent="danger" />
            </Menu>
            <div className="gallery-overlay-stack">
              <PopoverNext
                isOpen
                autoFocus={false}
                enforceFocus={false}
                usePortal={false}
                placement="bottom-start"
                content={<div className="gallery-popover">Popover content with a short note.</div>}
              >
                <Button text="Popover" endIcon="caret-down" />
              </PopoverNext>
              <div className="gallery-tooltip-spacer" />
              <Tooltip isOpen usePortal={false} content="Tooltip text" placement="right">
                <Button icon="help" text="Tooltip" variant="outlined" />
              </Tooltip>
            </div>
          </div>
          <div className={Classes.DIALOG} style={{ margin: 0, width: "100%" }}>
            <div className={Classes.DIALOG_HEADER}>
              <Icon icon="trash" />
              <h1 className={Classes.HEADING}>Delete pipeline?</h1>
              <Button variant="minimal" icon="cross" aria-label="Close" />
            </div>
            <DialogBody>This removes the pipeline and its run history.</DialogBody>
            <DialogFooter
              actions={[<Button key="c" text="Cancel" />, <Button key="d" intent="danger" text="Delete" />]}
            />
          </div>
          <Toast2 message="Pipeline saved." intent="success" icon="tick" onDismiss={() => {}} />
        </Block>

        <Block title="Navigation">
          <Breadcrumbs
            items={[
              { text: "Workspace", icon: "folder-close", href: "#" },
              { text: "Pipelines", href: "#" },
              { text: "ingest-orders" },
            ]}
          />
          <Tabs id="gallery-tabs" selectedTabId={tab} onChange={(id) => setTab(String(id))}>
            <Tab id="overview" title="Overview" />
            <Tab id="runs" title="Runs" tagContent={12} />
            <Tab id="settings" title="Settings" />
          </Tabs>
          <EntityTitle icon="database" title="orders_2026" subtitle="Table in analytics" />
          <Tree
            contents={[
              {
                id: 1,
                label: "analytics",
                icon: "database",
                isExpanded: true,
                childNodes: [
                  { id: 2, label: "orders", icon: "th", isSelected: true, secondaryLabel: "1.2M" },
                  { id: 3, label: "customers", icon: "th", secondaryLabel: "88K" },
                ],
              },
              { id: 4, label: "raw", icon: "folder-close", hasCaret: true },
            ]}
          />
        </Block>

        <Block title="HTML table">
          <HTMLTable compact striped interactive className="gallery-table">
            <thead>
              <tr>
                <th>Pipeline</th>
                <th>Status</th>
                <th className="cs-numeric">Rows</th>
                <th className="cs-numeric">Latency</th>
              </tr>
            </thead>
            <tbody>
              {tableRows.map(([name, status, rows, latency]) => (
                <tr key={name}>
                  <td>{name}</td>
                  <td>
                    <Tag minimal intent={status === "Running" ? "success" : status === "Failed" ? "danger" : "none"}>
                      {status}
                    </Tag>
                  </td>
                  <td className="cs-numeric">{rows}</td>
                  <td className="cs-numeric">{latency}</td>
                </tr>
              ))}
            </tbody>
          </HTMLTable>
        </Block>

        <Block title="Data table">
          <div className="gallery-data-table">
            <Table numRows={tableRows.length} enableRowHeader>
              <Column name="Pipeline" cellRenderer={(r) => <Cell>{tableRows[r]?.[0]}</Cell>} />
              <Column name="Status" cellRenderer={(r) => <Cell>{tableRows[r]?.[1]}</Cell>} />
              <Column name="Rows" cellRenderer={(r) => <Cell>{tableRows[r]?.[2]}</Cell>} />
              <Column name="Latency" cellRenderer={(r) => <Cell>{tableRows[r]?.[3]}</Cell>} />
            </Table>
          </div>
        </Block>

        <Block title="Date range picker">
          <DateRangePicker shortcuts={false} />
        </Block>

        <Block title="Select and empty state">
          <Select<string>
            items={regions}
            itemRenderer={(item, { handleClick, modifiers }) => (
              <MenuItem
                key={item}
                text={item}
                active={modifiers.active}
                onClick={handleClick}
                roleStructure="listoption"
              />
            )}
            onItemSelect={setRegion}
            filterable={false}
          >
            <Button text={region} endIcon="double-caret-vertical" />
          </Select>
          <NonIdealState
            icon="search"
            title="No results"
            description="Try a different filter."
            action={<Button icon="refresh" text="Reset filters" />}
          />
        </Block>

        <Block title="Typography">
          <H1>Heading one</H1>
          <H2>Heading two</H2>
          <H3>Heading three</H3>
          <H4>Heading four</H4>
          <p>
            Body text with <a href={withBasePath("/docs/core/tokens/")}>the tokens reference</a>,{" "}
            <code className={Classes.CODE}>inline code</code> and <span className={Classes.TEXT_MUTED}>muted text</span>
            .
          </p>
          <EditableText placeholder="Click to edit" />
          <Divider />
        </Block>
      </div>

      <StatusBar>
        <StatusBarItem icon="tick-circle" intent="success">
          Connected
        </StatusBarItem>
        <StatusBarItem icon="database">analytics</StatusBarItem>
        <StatusBarSpacer />
        <StatusBarItem onClick={() => {}}>UTF-8</StatusBarItem>
        <StatusBarItem icon="notifications" onClick={() => {}}>
          3
        </StatusBarItem>
      </StatusBar>
      <Alert isOpen={false}>Hidden alert keeps the import checked.</Alert>
    </div>
  );
}
