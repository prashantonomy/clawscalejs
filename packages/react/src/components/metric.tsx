"use client";

import { Classes } from "@blueprintjs/core";
import type { HTMLAttributes, ReactNode } from "react";
import { ClawscaleClasses } from "./classes.js";
import { cx } from "./cx.js";
import { Delta, type DeltaProps } from "./delta.js";
import { Sparkline } from "./sparkline.js";

export interface MetricProps extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
  /** What the number measures. */
  label: ReactNode;
  /** The headline value. Pass it formatted. */
  value: ReactNode;
  /** Unit shown after the value, such as "ms" or "GB". */
  unit?: ReactNode;
  /** Change since the comparison period. Renders a `Delta`. */
  delta?: number;
  /** Formats the delta. See `Delta`. */
  deltaFormat?: DeltaProps["format"];
  /**
   * Direction that counts as good for the delta.
   * @default "up"
   */
  goodDirection?: DeltaProps["goodDirection"];
  /** Short context under the value, such as "vs last week". */
  caption?: ReactNode;
  /** Trend data. Renders a `Sparkline` under the value. */
  trend?: readonly number[];
  /**
   * Sparkline color.
   * @default "var(--cs-chart-1)"
   */
  trendColor?: string;
  /**
   * Visual size.
   * @default "medium"
   */
  size?: "small" | "medium" | "large";
  /** Show a skeleton instead of the value. */
  loading?: boolean;
}

/** A labeled headline number with an optional change and trend. */
export function Metric({
  label,
  value,
  unit,
  delta,
  deltaFormat,
  goodDirection,
  caption,
  trend,
  trendColor,
  size = "medium",
  loading = false,
  className,
  ...htmlProps
}: MetricProps) {
  const hasFooter = delta !== undefined || caption !== undefined;
  return (
    <div className={cx(ClawscaleClasses.METRIC, className)} data-size={size} aria-busy={loading} {...htmlProps}>
      <div className={ClawscaleClasses.METRIC_LABEL}>{label}</div>
      <div className={cx(ClawscaleClasses.METRIC_VALUE, loading && Classes.SKELETON)}>
        {value}
        {unit != null && <span className={ClawscaleClasses.METRIC_UNIT}>{unit}</span>}
      </div>
      {hasFooter && (
        <div className={ClawscaleClasses.METRIC_FOOTER}>
          {delta !== undefined && <Delta value={delta} format={deltaFormat} goodDirection={goodDirection} />}
          {caption != null && <span className={ClawscaleClasses.METRIC_CAPTION}>{caption}</span>}
        </div>
      )}
      {trend && trend.length > 0 && (
        <Sparkline
          className={ClawscaleClasses.METRIC_TREND}
          data={trend}
          color={trendColor}
          height={28}
          area
          label={typeof label === "string" ? `${label} trend` : "Trend"}
        />
      )}
    </div>
  );
}
