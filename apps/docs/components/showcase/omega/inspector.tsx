"use client";

import {
  Button,
  Callout,
  Icon,
  type IconName,
  type Intent,
  ProgressBar,
  PropertyList,
  PropertyListItem,
  Section,
  SectionCard,
  Tag,
} from "@clawscale/react";
import type { ReactNode } from "react";
import { ActivityChart } from "./activity-chart";
import type { Affiliation, MapObject, ObjectId } from "./data";
import { RichText } from "./rich-text";
import { SensorFrame, ShipProfile } from "./ship-drawings";

export const affiliationStyle: Record<Affiliation, { label: string; intent: Intent }> = {
  hostile: { label: "Hostile", intent: "danger" },
  friendly: { label: "Friendly", intent: "primary" },
  civilian: { label: "Civilian", intent: "none" },
};

export interface ObjectStatus {
  label: string;
  intent: Intent;
  icon: IconName;
}

export interface InspectorProps {
  object: MapObject;
  status?: ObjectStatus;
  /** Progress of a running task, from 0 to 1. */
  progress?: { label: string; value: number };
  /** Talon only: a frame from Lark 21 once it finds the ship. */
  located?: boolean;
  observationDismissed: boolean;
  onSelect: (id: ObjectId) => void;
  onClose: () => void;
  onCenter: () => void;
  onProjectRoutes: () => void;
  onTaskAsset: () => void;
  onReviewObservation: () => void;
  onDismissObservation: () => void;
}

function Block({ title, icon, children }: { title: string; icon: IconName; children: ReactNode }) {
  return (
    <Section compact collapsible title={title} icon={icon} className="omega-section">
      <SectionCard>{children}</SectionCard>
    </Section>
  );
}

export function Inspector({
  object,
  status,
  progress,
  located,
  observationDismissed,
  onSelect,
  onClose,
  onCenter,
  onProjectRoutes,
  onTaskAsset,
  onReviewObservation,
  onDismissObservation,
}: InspectorProps) {
  const affiliation = affiliationStyle[object.affiliation];
  const isShip = object.icon === "ship";

  return (
    <aside className="omega-panel omega-inspector" aria-label="Object details">
      <header className="omega-inspector-header">
        <span className="omega-badge" data-affiliation={object.affiliation} data-alert={object.area ? true : undefined}>
          <Icon icon={object.icon} size={16} />
        </span>
        <div className="omega-inspector-heading">
          <h2>{object.name}</h2>
          <span>{object.type}</span>
        </div>
        <Button icon="cross" variant="minimal" size="small" aria-label="Close details" onClick={onClose} />
      </header>

      <div className="omega-inspector-tags">
        <Tag minimal intent={affiliation.intent}>
          {affiliation.label}
        </Tag>
        {status && (
          <Tag minimal intent={status.intent} icon={status.icon}>
            {status.label}
          </Tag>
        )}
      </div>

      <div className="omega-inspector-actions">
        {object.id === "talon" ? (
          <>
            <Button icon="route" text="Project location" size="small" onClick={onProjectRoutes} />
            <Button icon="drone-uav" text="Task asset" size="small" onClick={onTaskAsset} />
          </>
        ) : (
          <Button icon="locate" text="Center on map" size="small" onClick={onCenter} />
        )}
      </div>

      <div className="omega-inspector-body">
        {object.callout && (
          <Callout compact intent={object.callout.intent} icon="warning-sign">
            {object.callout.text}
          </Callout>
        )}

        {progress && (
          <div className="omega-progress">
            <div className="omega-progress-label">
              <span>{progress.label}</span>
              <strong className="cs-numeric">{Math.round(progress.value * 100)}%</strong>
            </div>
            <ProgressBar
              aria-label={progress.label}
              value={progress.value}
              intent="primary"
              stripes={false}
              animate={false}
            />
          </div>
        )}

        {located && object.id === "talon" && (
          <Block title="Sensor feed" icon="mobile-video">
            <SensorFrame label="Destroyer, 94% match" />
            <PropertyList compact labelWidth={92}>
              <PropertyListItem label="Source">Lark 21, electro-optical</PropertyListItem>
              <PropertyListItem label="Model">Ship detection, Halcyon AI</PropertyListItem>
              <PropertyListItem label="Match">Destroyer, 94%</PropertyListItem>
              <PropertyListItem label="Course">055, 12 kn</PropertyListItem>
            </PropertyList>
          </Block>
        )}

        <Block title="Details" icon="properties">
          {isShip && <ShipProfile length={object.properties.find((p) => p.label === "Length")?.value ?? "120 m"} />}
          {object.description && (
            <p className="omega-text">
              <RichText text={object.description} onSelect={onSelect} />
            </p>
          )}
          <PropertyList compact labelWidth={92}>
            {object.properties.map((property) => (
              <PropertyListItem key={property.label} label={property.label}>
                {property.link ? (
                  <button
                    type="button"
                    className="omega-mention"
                    onClick={() => property.link && onSelect(property.link)}
                  >
                    {property.value}
                  </button>
                ) : (
                  property.value
                )}
              </PropertyListItem>
            ))}
          </PropertyList>
          {object.armament && (
            <ul className="omega-list">
              {object.armament.map((item) => (
                <li key={item}>
                  <Icon icon="dot" size={12} />
                  {item}
                </li>
              ))}
            </ul>
          )}
        </Block>

        {object.report && (
          <Block title="Intelligence report" icon="document">
            <div className="omega-report">
              {object.report.map((paragraph) => (
                <p key={String(paragraph[0])}>
                  <RichText text={paragraph} onSelect={onSelect} />
                </p>
              ))}
            </div>
          </Block>
        )}

        {object.chart && (
          <Block title="Activity" icon="timeline-bar-chart">
            <ActivityChart data={object.chart} />
          </Block>
        )}

        {object.observation && !observationDismissed && (
          <Block title="Observations" icon="predictive-analysis">
            <div className="omega-observation">
              <div className="omega-observation-model">
                <strong>{object.observation.model}</strong>
                <span>{object.observation.vendor}</span>
              </div>
              <p>{object.observation.text}</p>
              <div className="omega-observation-actions">
                {object.observation.imagery && (
                  <Button text="Review imagery" size="small" intent="primary" onClick={onReviewObservation} />
                )}
                <Button text="Dismiss" size="small" variant="minimal" onClick={onDismissObservation} />
              </div>
            </div>
          </Block>
        )}
      </div>
    </aside>
  );
}
