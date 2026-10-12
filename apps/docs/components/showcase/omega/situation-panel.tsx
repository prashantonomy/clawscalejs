"use client";

import {
  Button,
  Card,
  Collapse,
  Icon,
  type IconName,
  type Intent,
  Menu,
  MenuDivider,
  MenuItem,
  PopoverNext,
  PropertyList,
  PropertyListItem,
  Section,
  SectionCard,
  Tag,
} from "@clawscale/react";
import {
  type EnemyCoa,
  enemyCoas,
  type FriendlyCoa,
  formatHours,
  friendlyCoas,
  type ObjectId,
  situation,
} from "./data";
import { RichText } from "./rich-text";

export type SituationStatus = "active" | "resolving" | "resolved";

const statusTag: Record<SituationStatus, { label: string; intent: Intent; icon: IconName }> = {
  active: { label: "Active", intent: "warning", icon: "issue" },
  resolving: { label: "Resolving", intent: "primary", icon: "refresh" },
  resolved: { label: "Resolved", intent: "success", icon: "tick-circle" },
};

export interface SituationPanelProps {
  status: SituationStatus;
  /** Talon was found on route A, which confirms the first enemy course of action. */
  located: boolean;
  focusedRoute: EnemyCoa["route"] | null;
  expandedCoa: string | null;
  taskedCoas: ReadonlySet<string>;
  onResolve: () => void;
  onSelect: (id: ObjectId) => void;
  onFocusRoute: (route: EnemyCoa["route"] | null) => void;
  onExpandCoa: (id: string | null) => void;
  onCompare: (id: string) => void;
  onChooseCoa: (coa: FriendlyCoa) => void;
}

function enemyStatus(coa: EnemyCoa, located: boolean): { label: string; icon: IconName; intent: Intent } {
  if (!located) return { label: "Projected", icon: "route", intent: "none" };
  return coa.route === "a"
    ? { label: "Sighted on this route", icon: "eye-open", intent: "danger" }
    : { label: "Less likely after the sighting", icon: "disable", intent: "none" };
}

export function SituationPanel({
  status,
  located,
  focusedRoute,
  expandedCoa,
  taskedCoas,
  onResolve,
  onSelect,
  onFocusRoute,
  onExpandCoa,
  onCompare,
  onChooseCoa,
}: SituationPanelProps) {
  const tag = statusTag[status];
  return (
    <div className="omega-situation">
      <div className="omega-situation-header">
        <span className="omega-badge" data-affiliation="hostile" data-alert="true">
          <Icon icon="warning-sign" size={16} />
        </span>
        <div className="omega-inspector-heading">
          <h2>{situation.title}</h2>
          <span>Situation</span>
        </div>
        <Tag minimal intent={tag.intent} icon={tag.icon}>
          {tag.label}
        </Tag>
        <PopoverNext
          placement="bottom-end"
          content={
            <Menu aria-label="Situation actions">
              <MenuItem icon="tick-circle" text="Mark as resolved" disabled={status !== "active"} onClick={onResolve} />
              <MenuItem icon="people" text="Share" label="3" />
              <MenuItem icon="export" text="Export brief" />
              <MenuDivider />
              <MenuItem icon="archive" text="Archive" />
            </Menu>
          }
        >
          <Button icon="more" variant="minimal" size="small" aria-label="Situation actions" />
        </PopoverNext>
      </div>

      <PropertyList compact labelWidth={72} className="omega-situation-properties">
        <PropertyListItem label="Created">{situation.created}</PropertyListItem>
        <PropertyListItem label="Owner">{situation.owner}</PropertyListItem>
        <PropertyListItem label="Severity">
          <Tag minimal intent="danger">
            High
          </Tag>
        </PropertyListItem>
      </PropertyList>

      <Section compact collapsible title="Details" icon="align-left" className="omega-section">
        <SectionCard>
          <p className="omega-text">
            <RichText text={situation.details} onSelect={onSelect} />
          </p>
        </SectionCard>
      </Section>

      <Section
        compact
        collapsible
        title="Enemy courses of action"
        icon="flag"
        className="omega-section"
        rightElement={
          <Tag minimal round>
            {enemyCoas.length}
          </Tag>
        }
      >
        <SectionCard className="omega-coa-list">
          {enemyCoas.map((coa) => {
            const focused = focusedRoute === coa.route;
            const state = enemyStatus(coa, located);
            return (
              <Card key={coa.id} compact interactive selected={focused} className="omega-coa">
                <button
                  type="button"
                  className="omega-coa-button"
                  aria-pressed={focused}
                  onClick={() => onFocusRoute(focused ? null : coa.route)}
                >
                  <span className="omega-coa-row">
                    <span className="omega-coa-title">{coa.title}</span>
                    <Tag minimal intent={coa.assessment.intent}>
                      {coa.assessment.label}
                    </Tag>
                  </span>
                  <span className="omega-coa-meta">Hypothetical, proposed by {coa.proposedBy}</span>
                  <span className="omega-coa-state" data-intent={state.intent}>
                    <Icon icon={state.icon} size={12} />
                    {state.label}
                  </span>
                </button>
              </Card>
            );
          })}
        </SectionCard>
      </Section>

      <Section
        compact
        collapsible
        title="Friendly courses of action"
        icon="shield"
        className="omega-section"
        rightElement={
          <Tag minimal round>
            {friendlyCoas.length}
          </Tag>
        }
      >
        <SectionCard className="omega-coa-list">
          {friendlyCoas.map((coa) => {
            const expanded = expandedCoa === coa.id;
            const tasked = taskedCoas.has(coa.id);
            return (
              <Card key={coa.id} compact interactive selected={expanded} className="omega-coa">
                <button
                  type="button"
                  className="omega-coa-button"
                  aria-expanded={expanded}
                  aria-controls={`omega-coa-${coa.id}`}
                  onClick={() => onExpandCoa(expanded ? null : coa.id)}
                >
                  <span className="omega-coa-row">
                    <span className="omega-coa-title">{coa.title}</span>
                    <span className="omega-coa-tags">
                      <Tag minimal>{formatHours(coa.hours)}</Tag>
                      {tasked ? (
                        <Tag minimal intent="success" icon="tick">
                          Tasked
                        </Tag>
                      ) : (
                        coa.assessment && (
                          <Tag minimal intent={coa.assessment.intent}>
                            {coa.assessment.label}
                          </Tag>
                        )
                      )}
                    </span>
                  </span>
                  <span className="omega-coa-meta">Analyzed by {coa.analyst}</span>
                </button>
                <Collapse isOpen={expanded}>
                  <div className="omega-coa-body" id={`omega-coa-${coa.id}`}>
                    <PropertyList compact labelWidth={104}>
                      <PropertyListItem label="Estimated time">{formatHours(coa.hours)}</PropertyListItem>
                      <PropertyListItem label="Feasibility">{coa.feasibility}</PropertyListItem>
                      <PropertyListItem label="Expected risk">{coa.risk}</PropertyListItem>
                      <PropertyListItem label="Review status">{tasked ? "Submitted" : coa.review}</PropertyListItem>
                      <PropertyListItem label="Tasking">
                        <span className="omega-inline-icon">
                          <Icon icon={coa.tasking.icon} size={12} />
                          {coa.tasking.label}
                        </span>
                      </PropertyListItem>
                    </PropertyList>
                    <div className="omega-coa-actions">
                      <Button size="small" icon="gantt-chart" text="Compare" onClick={() => onCompare(coa.id)} />
                      <Button
                        size="small"
                        intent="primary"
                        icon={tasked ? "tick" : "take-action"}
                        text={tasked ? "Task order sent" : "Select"}
                        disabled={tasked || status === "resolved"}
                        onClick={() => onChooseCoa(coa)}
                      />
                    </div>
                  </div>
                </Collapse>
              </Card>
            );
          })}
        </SectionCard>
      </Section>
    </div>
  );
}
