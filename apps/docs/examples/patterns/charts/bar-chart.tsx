"use client";

import { Classes, ClawscaleClasses } from "@clawscale/react";

const runs = [
  312, 298, 276, 264, 251, 270, 355, 512, 734, 918, 1046, 1122, 1180, 1204, 1236, 1190, 1102, 986, 842, 701, 588, 472,
  401, 346,
];
const hour = (index: number) => `${String(index).padStart(2, "0")}:00`;

const width = 560;
const height = 200;
const left = 48;
const top = 8;
const baseline = 172;
const max = 1600;
const ticks = [0, 400, 800, 1200, 1600];
const band = (width - left) / runs.length;
const y = (value: number) => baseline - (value / max) * (baseline - top);
const count = new Intl.NumberFormat("en-US");
const peak = Math.max(...runs);
const peakX = left + (runs.indexOf(peak) + 0.5) * band;

/** A bar with a square base and 4px rounded corners at its data end. */
function bar(x: number, barTop: number, w: number) {
  const r = Math.min(4, w / 2, baseline - barTop);
  return `M${x} ${baseline}V${barTop + r}a${r} ${r} 0 0 1 ${r} ${-r}h${w - 2 * r}a${r} ${r} 0 0 1 ${r} ${r}V${baseline}Z`;
}

export default function ChartsBarChart() {
  const summary = runs.map((value, index) => `${hour(index)} ${count.format(value)}`).join(", ");
  return (
    <figure style={{ fontSize: "var(--cs-font-size-sm)", margin: 0, maxWidth: width }}>
      <figcaption style={{ marginBottom: 8 }}>
        <strong>Pipeline runs per hour</strong> <span className={Classes.TEXT_MUTED}>Last 24 hours, UTC</span>
      </figcaption>
      <svg
        viewBox={`0 0 ${width} ${height}`}
        width="100%"
        role="img"
        aria-label={`Pipeline runs per hour: ${summary}`}
        className={ClawscaleClasses.NUMERIC}
      >
        <g stroke="var(--cs-chart-grid)" shapeRendering="crispEdges">
          {ticks.map((tick) => (
            <path key={tick} d={`M${left} ${y(tick)}H${width}`} />
          ))}
        </g>
        <g fill="var(--cs-chart-1)">
          {runs.map((value, index) => (
            <path key={hour(index)} d={bar(left + index * band + 1, y(value), band - 2)}>
              <title>{`${hour(index)}: ${count.format(value)} runs`}</title>
            </path>
          ))}
        </g>
        <path d={`M${left} ${baseline}H${width}`} stroke="var(--cs-chart-axis)" shapeRendering="crispEdges" />
        <g fill="var(--cs-color-text-muted)">
          {ticks.map((tick) => (
            <text key={tick} x={left - 8} y={y(tick)} dy="0.32em" textAnchor="end">
              {count.format(tick)}
            </text>
          ))}
          {[0, 6, 12, 18].map((at) => (
            <text key={at} x={left + (at + 0.5) * band} y={height - 8} textAnchor="middle">
              {hour(at)}
            </text>
          ))}
        </g>
        <text x={peakX} y={y(peak) - 6} textAnchor="middle" fill="var(--cs-color-text)">
          {count.format(peak)}
        </text>
      </svg>
    </figure>
  );
}
