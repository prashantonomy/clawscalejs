"use client";

import { Classes, ClawscaleClasses } from "@clawscale/react";
import { ChartTable } from "./_chart-table";

/** Each region keeps its slot, so hiding one never repaints the others. */
const series = [
  { name: "us-east-1", slot: 1, values: [6050, 5900, 5850, 6100, 6600, 7300, 8100, 8700, 9000, 9200, 9350, 9400] },
  { name: "eu-west-1", slot: 2, values: [4500, 4800, 5200, 5600, 6000, 6300, 6400, 6350, 6250, 6200, 6150, 6100] },
  { name: "ap-south-1", slot: 3, values: [5400, 5300, 5000, 4600, 4200, 3900, 3700, 3500, 3400, 3300, 3250, 3200] },
].map((s) => ({ ...s, color: `var(--cs-chart-${s.slot})`, last: s.values.at(-1) ?? 0 }));
const hours = Array.from({ length: 12 }, (_, index) => `${String(index + 1).padStart(2, "0")}:00`);

const width = 560;
const height = 200;
const left = 40;
const right = 456;
const top = 8;
const baseline = 172;
const max = 10000;
const ticks = [0, 2500, 5000, 7500, 10000];
const x = (index: number) => left + (index * (right - left)) / (hours.length - 1);
const y = (value: number) => baseline - (value / max) * (baseline - top);
const line = (values: number[]) => values.map((value, index) => `${index ? "L" : "M"}${x(index)} ${y(value)}`).join("");
const count = new Intl.NumberFormat("en-US");
const compact = new Intl.NumberFormat("en-US", { notation: "compact" });

export default function ChartsLineChart() {
  return (
    <figure style={{ fontSize: "var(--cs-font-size-sm)", margin: 0, maxWidth: width }}>
      <figcaption>
        <strong>Throughput by region</strong> <span className={Classes.TEXT_MUTED}>Rows per second, UTC</span>
      </figcaption>
      <div style={{ display: "flex", gap: 16, margin: "8px 0" }}>
        {series.map((s) => (
          <span key={s.name} style={{ alignItems: "center", display: "inline-flex", gap: 6 }}>
            <span style={{ background: s.color, height: 2, width: 12 }} />
            {s.name}
          </span>
        ))}
      </div>
      <svg viewBox={`0 0 ${width} ${height}`} width="100%" className={ClawscaleClasses.NUMERIC} aria-hidden="true">
        <g stroke="var(--cs-chart-grid)" shapeRendering="crispEdges">
          {ticks.map((tick) => (
            <path key={tick} d={`M${left} ${y(tick)}H${right}`} />
          ))}
        </g>
        <path d={`M${left} ${baseline}H${right}`} stroke="var(--cs-chart-axis)" shapeRendering="crispEdges" />
        <g fill="var(--cs-color-text-muted)">
          {ticks.map((tick) => (
            <text key={tick} x={left - 8} y={y(tick)} dy="0.32em" textAnchor="end">
              {compact.format(tick)}
            </text>
          ))}
          {[2, 5, 8, 11].map((at) => (
            <text key={at} x={x(at)} y={height - 8} textAnchor="middle">
              {hours[at]}
            </text>
          ))}
        </g>
        {series.map(({ name, color, last, values }) => (
          <g key={name}>
            <path d={line(values)} fill="none" stroke={color} strokeWidth={2} strokeLinejoin="round" />
            <circle cx={right} cy={y(last)} r={4} fill={color} stroke="var(--cs-color-surface)" strokeWidth={2} />
            <text x={right + 10} y={y(last)} dy="0.32em" fill="var(--cs-color-text)">
              {name}
            </text>
            {values.map((value, index) => (
              <circle key={hours[index]} cx={x(index)} cy={y(value)} r={12} fill="transparent">
                <title>{`${name}, ${hours[index]}: ${count.format(value)} rows/s`}</title>
              </circle>
            ))}
          </g>
        ))}
      </svg>
      <ChartTable
        caption="Throughput by region, rows per second"
        columns={["Hour (UTC)", ...series.map((s) => s.name)]}
        rows={hours.map((hour, index) => [hour, ...series.map((s) => count.format(s.values[index] ?? 0))])}
      />
    </figure>
  );
}
