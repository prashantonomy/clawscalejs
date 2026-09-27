"use client";

import type { SVGProps } from "react";
import { ClawscaleClasses } from "./classes.js";
import { cx } from "./cx.js";

export interface SparklineProps extends Omit<SVGProps<SVGSVGElement>, "values" | "color" | "min" | "max"> {
  /** Data points, oldest first. */
  data: readonly number[];
  /** Width in pixels. Leave unset to fill the container. */
  width?: number;
  /**
   * Height in pixels.
   * @default 24
   */
  height?: number;
  /**
   * Line color. Any CSS color, such as a token.
   * @default "var(--cs-chart-1)"
   */
  color?: string;
  /** Fill the area under the line. */
  area?: boolean;
  /**
   * Mark the last point with a dot.
   * @default true
   */
  showLastPoint?: boolean;
  /** Bottom of the value range. Defaults to the smallest value. */
  min?: number;
  /** Top of the value range. Defaults to the largest value. */
  max?: number;
  /** Accessible name, for example "Requests over the last 24 hours". */
  label?: string;
}

const PAD = 3;
const FLUID_WIDTH = 100;

/** A word-sized trend line for tables, metrics and dense layouts. */
export function Sparkline({
  data,
  width,
  height = 24,
  color = "var(--cs-chart-1)",
  area = false,
  showLastPoint = true,
  min,
  max,
  label,
  className,
  style,
  ...svgProps
}: SparklineProps) {
  const fluid = width === undefined;
  const w = fluid ? FLUID_WIDTH : width;
  const lo = min ?? Math.min(...data);
  const hi = max ?? Math.max(...data);
  const span = hi - lo || 1;
  const step = data.length > 1 ? w / (data.length - 1) : 0;
  const points = data.map((value, index) => {
    const x = data.length > 1 ? index * step : w / 2;
    const y = PAD + (1 - (value - lo) / span) * (height - PAD * 2);
    return [Number(x.toFixed(2)), Number(y.toFixed(2))] as const;
  });
  const line = points.map(([x, y], index) => `${index === 0 ? "M" : "L"}${x} ${y}`).join(" ");
  const last = points.at(-1);
  const first = points[0];
  const summary =
    data.length > 0
      ? `${label ? `${label}. ` : ""}Low ${Math.min(...data)}, high ${Math.max(...data)}, last ${data.at(-1)}`
      : (label ?? "No data");

  return (
    <svg
      className={cx(ClawscaleClasses.SPARKLINE, className)}
      width={fluid ? "100%" : w}
      height={height}
      viewBox={`0 0 ${w} ${height}`}
      preserveAspectRatio="none"
      role="img"
      aria-label={summary}
      overflow="visible"
      style={{ color, ...style }}
      {...svgProps}
    >
      {area && first && last && (
        <path
          className={ClawscaleClasses.SPARKLINE_AREA}
          d={`${line} L${last[0]} ${height} L${first[0]} ${height} Z`}
          fill="currentColor"
          stroke="none"
        />
      )}
      {points.length > 1 && (
        <path
          className={ClawscaleClasses.SPARKLINE_LINE}
          d={line}
          fill="none"
          stroke="currentColor"
          strokeWidth={1.5}
          strokeLinejoin="round"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
        />
      )}
      {showLastPoint && last && (
        <path
          className={ClawscaleClasses.SPARKLINE_DOT}
          d={`M${last[0]} ${last[1]}h0`}
          stroke="currentColor"
          strokeWidth={5}
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
        />
      )}
    </svg>
  );
}
