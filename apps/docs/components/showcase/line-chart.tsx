"use client";

import { type KeyboardEvent, type PointerEvent, useState } from "react";
import type { Series } from "./data";
import { useElementWidth } from "./use-element-width";

export interface LineChartProps {
  /** Names the chart for screen readers. */
  label: string;
  series: Series[];
  labels: string[];
  height?: number;
  formatValue: (value: number) => string;
  formatTick: (value: number) => string;
}

/** Round tick values from zero: steps of 1, 2, 2.5 or 5 times a power of ten. */
export function niceScale(dataMax: number, tickCount = 4): { max: number; ticks: number[] } {
  const raw = Math.max(dataMax, 1e-9) / tickCount;
  const exponent = 10 ** Math.floor(Math.log10(raw));
  const fraction = raw / exponent;
  const step = (fraction <= 1 ? 1 : fraction <= 2 ? 2 : fraction <= 2.5 ? 2.5 : fraction <= 5 ? 5 : 10) * exponent;
  const max = Math.ceil(dataMax / step) * step;
  const ticks = Array.from({ length: Math.round(max / step) + 1 }, (_, i) => i * step);
  return { max, ticks };
}

const MARGIN = { top: 10, right: 104, bottom: 26, left: 44 };

/** Multi-series line chart: one y axis, legend, end labels, crosshair tooltip. */
export function LineChart({ label, series, labels, height = 220, formatValue, formatTick }: LineChartProps) {
  const [ref, width] = useElementWidth<HTMLDivElement>(640);
  const [active, setActive] = useState<number | null>(null);
  const innerWidth = Math.max(width - MARGIN.left - MARGIN.right, 40);
  const innerHeight = height - MARGIN.top - MARGIN.bottom;
  const { max, ticks } = niceScale(Math.max(...series.flatMap((s) => s.values)));
  const last = labels.length - 1;
  const x = (i: number) => MARGIN.left + (last > 0 ? (i / last) * innerWidth : innerWidth / 2);
  const y = (v: number) => MARGIN.top + innerHeight - (v / max) * innerHeight;
  const color = (i: number) => `var(--cs-chart-${i + 1})`;
  const labelEvery = Math.max(1, Math.ceil(labels.length / 6));

  // End labels only where they do not collide. The legend always carries identity.
  const ends = series.map((s, i) => ({ i, y: y(s.values.at(-1) ?? 0), text: s.label })).sort((a, b) => a.y - b.y);
  const shownEnds = ends.filter((end, index) => index === 0 || end.y - (ends[index - 1]?.y ?? -99) >= 14);

  const pick = (event: PointerEvent<SVGRectElement>) => {
    const box = event.currentTarget.getBoundingClientRect();
    const ratio = (event.clientX - box.left) / box.width;
    setActive(Math.min(last, Math.max(0, Math.round(ratio * last))));
  };

  const onKey = (event: KeyboardEvent<SVGSVGElement>) => {
    if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
    event.preventDefault();
    const step = event.key === "ArrowRight" ? 1 : -1;
    setActive((current) => Math.min(last, Math.max(0, (current ?? (step > 0 ? -1 : last + 1)) + step)));
  };

  const tooltipLeft = active === null ? 0 : x(active);
  const flip = tooltipLeft > width - 200;

  return (
    <div className="showcase-chart" ref={ref}>
      <div className="showcase-chart-legend">
        {series.map((s, i) => (
          <span key={s.id} className="showcase-chart-legend-item">
            <span className="showcase-chart-line-key" style={{ background: color(i) }} />
            {s.label}
          </span>
        ))}
      </div>
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
          {labels.map((text, i) =>
            i % labelEvery === 0 ? (
              <text key={text} x={x(i)} y={height - 6} textAnchor="middle" className="showcase-chart-tick">
                {text}
              </text>
            ) : null,
          )}
          {series.map((s, i) => (
            <path
              key={s.id}
              d={s.values.map((v, j) => `${j === 0 ? "M" : "L"}${x(j).toFixed(1)} ${y(v).toFixed(1)}`).join(" ")}
              fill="none"
              stroke={color(i)}
              strokeWidth={2}
              strokeLinejoin="round"
              strokeLinecap="round"
            />
          ))}
          {series.map((s, i) => (
            <circle
              key={s.id}
              cx={x(last)}
              cy={y(s.values.at(-1) ?? 0)}
              r={4}
              fill={color(i)}
              stroke="var(--cs-color-surface)"
              strokeWidth={2}
            />
          ))}
          {shownEnds.map((end) => (
            <text key={end.text} x={x(last) + 10} y={end.y} dy="0.32em" className="showcase-chart-end-label">
              {end.text}
            </text>
          ))}
          {active !== null && (
            <g pointerEvents="none">
              <line
                x1={x(active)}
                x2={x(active)}
                y1={MARGIN.top}
                y2={MARGIN.top + innerHeight}
                stroke="var(--cs-chart-axis)"
              />
              {series.map((s, i) => (
                <circle
                  key={s.id}
                  cx={x(active)}
                  cy={y(s.values[active] ?? 0)}
                  r={4}
                  fill={color(i)}
                  stroke="var(--cs-color-surface)"
                  strokeWidth={2}
                />
              ))}
            </g>
          )}
          <rect
            x={MARGIN.left}
            y={MARGIN.top}
            width={innerWidth}
            height={innerHeight}
            fill="transparent"
            onPointerMove={pick}
            onPointerLeave={() => setActive(null)}
          />
        </svg>
        {active !== null && (
          <div
            className="showcase-chart-tooltip"
            style={{ left: flip ? undefined : tooltipLeft + 12, right: flip ? width - tooltipLeft + 12 : undefined }}
          >
            <div className="showcase-chart-tooltip-title">{labels[active]}</div>
            {series.map((s, i) => (
              <div key={s.id} className="showcase-chart-tooltip-row">
                <span className="showcase-chart-line-key" style={{ background: color(i) }} />
                <strong>{formatValue(s.values[active] ?? 0)}</strong>
                <span>{s.label}</span>
              </div>
            ))}
          </div>
        )}
      </div>
      <table className="cs-visually-hidden">
        <caption>{label}</caption>
        <thead>
          <tr>
            <th>Time</th>
            {series.map((s) => (
              <th key={s.id}>{s.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {labels.map((text, i) => (
            <tr key={text}>
              <th>{text}</th>
              {series.map((s) => (
                <td key={s.id}>{formatValue(s.values[i] ?? 0)}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
