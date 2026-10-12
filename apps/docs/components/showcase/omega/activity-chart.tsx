"use client";

import { type KeyboardEvent, useState } from "react";
import { niceScale } from "../nice-scale";
import type { ActivityChartData } from "./data";
import { useElementSize } from "./use-element-size";

const MARGIN = { top: 8, right: 4, bottom: 22, left: 32 };
const HEIGHT = 132;

/** A rounded bar path: 4px radius at the data end, square at the baseline. */
function barPath(x: number, top: number, width: number, baseline: number): string {
  const r = Math.min(4, width / 2, baseline - top);
  return `M${x} ${baseline}V${top + r}Q${x} ${top} ${x + r} ${top}H${x + width - r}Q${x + width} ${top} ${x + width} ${top + r}V${baseline}Z`;
}

/** Columns against a reference baseline. Columns above the baseline take the warning color. */
export function ActivityChart({ data }: { data: ActivityChartData }) {
  const [ref, { width }] = useElementSize<HTMLDivElement>({ width: 300, height: HEIGHT });
  const [active, setActive] = useState<number | null>(null);
  const innerWidth = Math.max(width - MARGIN.left - MARGIN.right, 40);
  const innerHeight = HEIGHT - MARGIN.top - MARGIN.bottom;
  const baselineY = MARGIN.top + innerHeight;
  const { max, ticks } = niceScale(Math.max(...data.values, data.baseline), 3);
  const band = innerWidth / data.values.length;
  const barWidth = Math.max(2, Math.min(18, band - 4));
  const y = (value: number) => baselineY - (value / max) * innerHeight;
  const labelEvery = Math.max(1, Math.ceil((data.values.length * 34) / innerWidth));
  const unit = (value: number) => `${value} ${data.unit}`;

  const onKey = (event: KeyboardEvent<SVGSVGElement>) => {
    if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
    event.preventDefault();
    const step = event.key === "ArrowRight" ? 1 : -1;
    const last = data.values.length - 1;
    setActive((current) => Math.min(last, Math.max(0, (current ?? (step > 0 ? -1 : last + 1)) + step)));
  };

  const activeValue = active === null ? null : (data.values[active] ?? 0);
  const activeCenter = active === null ? 0 : MARGIN.left + band * active + band / 2;

  return (
    <div className="omega-chart" ref={ref}>
      <div className="omega-chart-legend">
        <span>
          <span className="omega-chart-key" data-series="value" />
          {data.title}
        </span>
        <span>
          <span className="omega-chart-key" data-series="above" />
          Above average
        </span>
        <span>
          <span className="omega-chart-key" data-series="baseline" />
          {data.baselineLabel}, {data.baseline}
        </span>
      </div>
      <div className="omega-chart-plot">
        <svg
          width={width}
          height={HEIGHT}
          role="img"
          aria-label={`${data.title}. Use the arrow keys to read values.`}
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
              <text x={MARGIN.left - 6} y={y(tick)} dy="0.32em" textAnchor="end" className="omega-chart-tick">
                {tick}
              </text>
            </g>
          ))}
          {data.values.map((value, i) => {
            const center = MARGIN.left + band * i + band / 2;
            return (
              <g key={data.labels[i]} onPointerEnter={() => setActive(i)}>
                <rect x={MARGIN.left + band * i} y={MARGIN.top} width={band} height={innerHeight} fill="transparent" />
                <path
                  d={barPath(center - barWidth / 2, y(value), barWidth, baselineY)}
                  fill={value > data.baseline ? "var(--cs-chart-warning)" : "var(--cs-chart-1)"}
                  fillOpacity={active === null || active === i ? 1 : 0.55}
                />
                {i % labelEvery === 0 && (
                  <text x={center} y={HEIGHT - 6} textAnchor="middle" className="omega-chart-tick">
                    {data.labels[i]}
                  </text>
                )}
              </g>
            );
          })}
          <line
            className="omega-chart-baseline"
            x1={MARGIN.left}
            x2={MARGIN.left + innerWidth}
            y1={y(data.baseline)}
            y2={y(data.baseline)}
          />
        </svg>
        {active !== null && activeValue !== null && (
          <div
            className="omega-chart-tooltip"
            style={{ left: Math.min(Math.max(activeCenter - 70, 0), width - 150) }}
            role="status"
          >
            <div className="omega-chart-tooltip-title">{data.labels[active]}</div>
            <strong>{unit(activeValue)}</strong>
            <div>
              {activeValue === data.baseline
                ? "At the average"
                : `${Math.abs(activeValue - data.baseline)} ${activeValue > data.baseline ? "above" : "below"} average`}
            </div>
          </div>
        )}
      </div>
      <div className="cs-visually-hidden">
        <table>
          <caption>{data.title}</caption>
          <tbody>
            {data.labels.map((label, i) => (
              <tr key={label}>
                <th>{label}</th>
                <td>{unit(data.values[i] ?? 0)}</td>
              </tr>
            ))}
            <tr>
              <th>{data.baselineLabel}</th>
              <td>{unit(data.baseline)}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
