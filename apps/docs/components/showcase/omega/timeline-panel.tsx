"use client";

import { Button, ButtonGroup, Icon, Slider, Tab, Tabs } from "@clawscale/react";
import { useState } from "react";
import {
  type CollectionEvent,
  type FriendlyCoa,
  formatHours,
  formatTime,
  friendlyCoas,
  NOW,
  type Phase,
  sources,
  TIMELINE_HOURS,
} from "./data";
import { useElementSize } from "./use-element-size";

export type TimelineTab = "coas" | "collection";

const ROW = 30;
const AXIS = 22;
const PAD = { left: 8, right: 56 };

function useScale(hours: number) {
  const [ref, { width }] = useElementSize<HTMLDivElement>({ width: 640, height: 0 });
  const inner = Math.max(width - PAD.left - PAD.right, 80);
  const x = (hour: number) => PAD.left + (hour / hours) * inner;
  return { ref, width, inner, x };
}

interface CoaGanttProps {
  focusedCoa: string | null;
  taskedCoas: ReadonlySet<string>;
  onFocusCoa: (id: string) => void;
}

/** Courses of action as bars over the next 24 hours, one phase per segment. */
function CoaGantt({ focusedCoa, taskedCoas, onFocusCoa }: CoaGanttProps) {
  const { ref, width, inner, x } = useScale(24);
  const [hover, setHover] = useState<{ coa: FriendlyCoa; phase: Phase } | null>(null);
  const height = friendlyCoas.length * ROW + AXIS;
  const step = inner < 420 ? 4 : 2;
  const ticks = Array.from({ length: 24 / step + 1 }, (_, i) => i * step);

  return (
    <div className="omega-gantt">
      <div className="omega-gantt-labels">
        {friendlyCoas.map((coa) => (
          <button
            key={coa.id}
            type="button"
            className="omega-gantt-label"
            aria-pressed={focusedCoa === coa.id}
            onClick={() => onFocusCoa(coa.id)}
          >
            {taskedCoas.has(coa.id) && <Icon icon="tick" intent="success" size={12} />}
            <span>{coa.title}</span>
          </button>
        ))}
        <span className="omega-gantt-axis-label">Hours from now</span>
      </div>
      <div className="omega-gantt-plot" ref={ref}>
        <svg width={width} height={height} role="img" aria-label="Courses of action over the next 24 hours">
          {ticks.map((tick) => (
            <g key={tick}>
              {tick % 4 === 0 && (
                <line x1={x(tick)} x2={x(tick)} y1={0} y2={height - AXIS} stroke="var(--cs-chart-grid)" />
              )}
              <text x={x(tick)} y={height - 6} textAnchor="middle" className="omega-chart-tick">
                {tick}
              </text>
            </g>
          ))}
          {friendlyCoas.map((coa, row) => {
            const focused = focusedCoa === coa.id;
            const y = row * ROW + 7;
            return (
              <g key={coa.id} className="omega-gantt-row" data-focused={focused || undefined}>
                {coa.phases.map((phase) => {
                  const left = x(phase.start) + 1;
                  const barWidth = Math.max(x(phase.end) - x(phase.start) - 2, 2);
                  const fits = barWidth > phase.label.length * 6.4 + 12;
                  return (
                    <g
                      key={phase.label}
                      onPointerEnter={() => setHover({ coa, phase })}
                      onPointerLeave={() => setHover(null)}
                    >
                      <rect className="omega-gantt-bar" x={left} y={y} width={barWidth} height={16} rx={3} />
                      {fits && (
                        <text x={left + 6} y={y + 8} dy="0.34em" className="omega-gantt-bar-label">
                          {phase.label}
                        </text>
                      )}
                    </g>
                  );
                })}
                <text x={x(coa.hours) + 6} y={y + 8} dy="0.34em" className="omega-gantt-end">
                  {formatHours(coa.hours)}
                </text>
              </g>
            );
          })}
        </svg>
        {hover && (
          <div
            className="omega-chart-tooltip"
            style={{
              left: Math.min(x(hover.phase.start), width - 190),
              top: friendlyCoas.indexOf(hover.coa) * ROW + 28,
            }}
          >
            <div className="omega-chart-tooltip-title">{hover.coa.title}</div>
            <strong>{hover.phase.label}</strong>
            <div>
              {formatHours(hover.phase.start)} to {formatHours(hover.phase.end)}
            </div>
          </div>
        )}
        <div className="cs-visually-hidden">
          <table>
            <caption>Phases of each course of action, in hours from now</caption>
            <tbody>
              {friendlyCoas.flatMap((coa) =>
                coa.phases.map((phase) => (
                  <tr key={`${coa.id}-${phase.label}`}>
                    <th>
                      {coa.title}, {phase.label}
                    </th>
                    <td>
                      {formatHours(phase.start)} to {formatHours(phase.end)}
                    </td>
                  </tr>
                )),
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

interface CollectionTimelineProps {
  hour: number;
  events: CollectionEvent[];
  onHour: (hour: number) => void;
}

/** Collection events by source over five days, with a playhead that drives the map. */
function CollectionTimeline({ hour, events, onHour }: CollectionTimelineProps) {
  const { ref, width, x } = useScale(TIMELINE_HOURS);
  const [hover, setHover] = useState<CollectionEvent | null>(null);
  const height = sources.length * ROW + AXIS;
  const days = [0, 1, 2, 3, 4];

  return (
    <div className="omega-gantt">
      <div className="omega-gantt-labels">
        {sources.map((source, i) => (
          <span key={source.id} className="omega-gantt-label" data-static="true">
            <span className="omega-chart-key" style={{ background: `var(--cs-chart-${i + 1})` }} />
            <span>{source.label}</span>
            <span className="omega-count">{events.filter((event) => event.source === source.id).length}</span>
          </span>
        ))}
        <span className="omega-gantt-axis-label">Days, Zulu time</span>
      </div>
      <div className="omega-gantt-plot" ref={ref}>
        <svg width={width} height={height} role="img" aria-label="Collection events by source over five days">
          <rect
            className="omega-timeline-future"
            x={x(NOW)}
            y={0}
            width={Math.max(x(TIMELINE_HOURS) - x(NOW), 0)}
            height={height - AXIS}
          />
          {days.map((day) => (
            <g key={day}>
              <line
                x1={x(day * 24)}
                x2={x(day * 24)}
                y1={0}
                y2={height - AXIS}
                stroke={day === 0 ? "var(--cs-chart-axis)" : "var(--cs-chart-grid)"}
              />
              <text x={x(day * 24 + 12)} y={height - 6} textAnchor="middle" className="omega-chart-tick">
                {14 + day} Apr
              </text>
            </g>
          ))}
          <text x={x(NOW) + 4} y={10} className="omega-chart-tick">
            Now
          </text>
          {events.map((event) => {
            const row = sources.findIndex((source) => source.id === event.source);
            const cx = x(event.hour);
            const cy = row * ROW + 15;
            return (
              <g
                key={event.id}
                className="omega-event"
                onPointerEnter={() => setHover(event)}
                onPointerLeave={() => setHover(null)}
              >
                <rect x={cx - 12} y={cy - 12} width={24} height={24} fill="transparent" />
                <rect
                  x={cx - 5}
                  y={cy - 5}
                  width={10}
                  height={10}
                  rx={2}
                  fill={`var(--cs-chart-${row + 1})`}
                  stroke="var(--cs-color-surface)"
                  strokeWidth={2}
                  opacity={event.hour <= hour ? 1 : 0.35}
                />
              </g>
            );
          })}
          <line className="omega-playhead" x1={x(hour)} x2={x(hour)} y1={0} y2={height - AXIS} />
        </svg>
        {hover && (
          <div className="omega-chart-tooltip" style={{ left: Math.min(Math.max(x(hover.hour) - 90, 0), width - 220) }}>
            <div className="omega-chart-tooltip-title">{formatTime(hover.hour)}</div>
            <div>{hover.text}</div>
          </div>
        )}
        <div className="omega-scrubber" style={{ marginLeft: PAD.left, marginRight: PAD.right }}>
          <Slider
            min={0}
            max={TIMELINE_HOURS}
            stepSize={0.25}
            value={hour}
            labelRenderer={false}
            onChange={(value) => onHour(Math.min(value, NOW))}
            handleHtmlProps={{ "aria-label": "Timeline position, in hours from 14 Apr" }}
          />
        </div>
        <div className="cs-visually-hidden">
          <table>
            <caption>Collection events</caption>
            <tbody>
              {events.map((event) => (
                <tr key={event.id}>
                  <th>{formatTime(event.hour)}</th>
                  <td>
                    {sources.find((source) => source.id === event.source)?.label}: {event.text}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export interface TimelinePanelProps extends CoaGanttProps, CollectionTimelineProps {
  tab: TimelineTab;
  onTab: (tab: TimelineTab) => void;
  collapsed: boolean;
  onCollapsed: (collapsed: boolean) => void;
  playing: boolean;
  onPlaying: (playing: boolean) => void;
}

export function TimelinePanel({
  tab,
  onTab,
  collapsed,
  onCollapsed,
  playing,
  onPlaying,
  hour,
  events,
  onHour,
  focusedCoa,
  taskedCoas,
  onFocusCoa,
}: TimelinePanelProps) {
  return (
    <section className="omega-panel omega-timeline" aria-label="Timeline" data-collapsed={collapsed || undefined}>
      <Tabs
        id="omega-timeline-tabs"
        selectedTabId={tab}
        onChange={(id) => {
          onTab(id as TimelineTab);
          onCollapsed(false);
        }}
        renderActiveTabPanelOnly
      >
        <Tab
          id="coas"
          icon="gantt-chart"
          title="Courses of action"
          panel={<CoaGantt focusedCoa={focusedCoa} taskedCoas={taskedCoas} onFocusCoa={onFocusCoa} />}
        />
        <Tab
          id="collection"
          icon="timeline-events"
          title="Collection"
          panel={<CollectionTimeline hour={hour} events={events} onHour={onHour} />}
        />
      </Tabs>
      <div className="omega-timeline-tools">
        {tab === "collection" && !collapsed && (
          <>
            <span className="omega-timeline-time">{formatTime(hour)}</span>
            <ButtonGroup>
              <Button
                icon="step-backward"
                size="small"
                aria-label="Back 6 hours"
                onClick={() => onHour(Math.max(hour - 6, 0))}
              />
              <Button
                icon={playing ? "pause" : "play"}
                size="small"
                text={playing ? "Pause" : "Play"}
                onClick={() => onPlaying(!playing)}
              />
              <Button
                icon="step-forward"
                size="small"
                aria-label="Forward 6 hours"
                onClick={() => onHour(Math.min(hour + 6, NOW))}
              />
            </ButtonGroup>
          </>
        )}
        <Button
          icon={collapsed ? "chevron-up" : "chevron-down"}
          variant="minimal"
          size="small"
          aria-label={collapsed ? "Expand the timeline" : "Collapse the timeline"}
          aria-expanded={!collapsed}
          onClick={() => onCollapsed(!collapsed)}
        />
      </div>
    </section>
  );
}
