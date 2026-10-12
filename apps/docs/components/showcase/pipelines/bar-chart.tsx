"use client";

import { type KeyboardEvent, useState } from "react";
import { niceScale } from "./line-chart";
import { useElementWidth } from "./use-element-width";

export interface BarChartProps {
  /** Names the chart for screen readers. The card title names the series. */
  label: string;
  values: number[];
  labels: string[];
  height?: number;
  formatValue: (value: number) => string;
  formatTick: (value: number) => string;
}

const MARGIN = { top: 10, right: 12, bottom: 26, left: 44 };

/** A rounded bar path: 4px radius at the data end, square at the baseline. */
function barPath(x: number, top: number, width: number, baseline: number): string {
  const r = Math.min(4, width / 2, baseline - top);
  return `M${x} ${baseline}V${top + r}Q${x} ${top} ${x + r} ${top}H${x + width - r}Q${x + width} ${top} ${x + width} ${top + r}V${baseline}Z`;
}

/** Single-series column chart with a tooltip per bar. */
export function BarChart({ label, values, labels, height = 220, formatValue, formatTick }: BarChartProps) {
  const [ref, width] = useElementWidth<HTMLDivElement>(420);
  const [active, setActive] = useState<number | null>(null);
  const innerWidth = Math.max(width - MARGIN.left - MARGIN.right, 40);
  const innerHeight = height - MARGIN.top - MARGIN.bottom;
  const baseline = MARGIN.top + innerHeight;
  const { max, ticks } = niceScale(Math.max(...values));
  const band = innerWidth / values.length;
  const barWidth = Math.max(2, Math.min(24, band - 2));
  const y = (v: number) => baseline - (v / max) * innerHeight;
  const labelEvery = Math.max(1, Math.ceil(values.length / 6));

  const onKey = (event: KeyboardEvent<SVGSVGElement>) => {
    if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
    event.preventDefault();
    const step = event.key === "ArrowRight" ? 1 : -1;
    setActive((current) =>
      Math.min(values.length - 1, Math.max(0, (current ?? (step > 0 ? -1 : values.length)) + step)),
    );
  };

  const activeCenter = active === null ? 0 : MARGIN.left + band * active + band / 2;

  return (
    <div className="showcase-chart" ref={ref}>
      <div className="showcase-chart-plot">
        <svg
          width={width}
          height={height}
          role="img"
          aria-label={`${label}. Use the arrow keys to read values.`}
          // biome-ignore lint/a11y/noNoninteractiveTabindex: focus lets keyboard users read values with the arrow keys.
          tabIndex={0}
          onKeyDown={onKey}
          onBlur={() => setActive(null)}
          onPointerLeave={() => setActive(null)}
        >
          {ticks.map((tick) => (
            <g key={tick}>
              <line
                x1={MARGIN.left}
                x2={MARGIN.left + innerWidth}
                y1={y(tick)}
                y2={y(tick)}
                stroke={tick === 0 ? "var(--cs-chart-axis)" : "var(--cs-chart-grid)"}
              />
              <text x={MARGIN.left - 8} y={y(tick)} dy="0.32em" textAnchor="end" className="showcase-chart-tick">
                {formatTick(tick)}
              </text>
            </g>
          ))}
          {values.map((value, i) => {
            const center = MARGIN.left + band * i + band / 2;
            return (
              <g key={labels[i]} onPointerEnter={() => setActive(i)}>
                <rect x={MARGIN.left + band * i} y={MARGIN.top} width={band} height={innerHeight} fill="transparent" />
                <path
                  d={barPath(center - barWidth / 2, y(value), barWidth, baseline)}
                  fill="var(--cs-chart-1)"
                  fillOpacity={active === null || active === i ? 1 : 0.55}
                />
                {i % labelEvery === 0 && (
                  <text x={center} y={height - 6} textAnchor="middle" className="showcase-chart-tick">
                    {labels[i]}
                  </text>
                )}
              </g>
            );
          })}
        </svg>
        {active !== null && (
          <div
            className="showcase-chart-tooltip"
            style={{ left: Math.min(Math.max(activeCenter - 60, 0), width - 140), top: -8 }}
          >
            <div className="showcase-chart-tooltip-title">{labels[active]}</div>
            <div className="showcase-chart-tooltip-row">
              <span className="showcase-chart-bar-key" />
              <strong>{formatValue(values[active] ?? 0)}</strong>
              <span>runs</span>
            </div>
          </div>
        )}
      </div>
      <table className="cs-visually-hidden">
        <caption>{label}</caption>
        <tbody>
          {labels.map((text, i) => (
            <tr key={text}>
              <th>{text}</th>
              <td>{formatValue(values[i] ?? 0)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
