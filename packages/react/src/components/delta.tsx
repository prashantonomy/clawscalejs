"use client";

import type { HTMLAttributes, ReactNode } from "react";
import { ClawscaleClasses } from "./classes.js";
import { cx } from "./cx.js";

export interface DeltaProps extends HTMLAttributes<HTMLSpanElement> {
  /** The change. Positive values point up, negative values point down. */
  value: number;
  /**
   * Formats the absolute value.
   * @default value => `${value.toFixed(1)}%`
   */
  format?: (absoluteValue: number) => ReactNode;
  /**
   * The direction that counts as good. Use "down" for costs, latency or error rates.
   * @default "up"
   */
  goodDirection?: "up" | "down";
  /** Show muted text whatever the direction. */
  neutral?: boolean;
  /** Hide the arrow and show a plus or minus sign instead. */
  hideIcon?: boolean;
}

const defaultFormat = (value: number) => `${value.toFixed(1)}%`;

const arrowPaths = {
  up: "M4 1.5 7.5 6.5h-7z",
  down: "M4 6.5 .5 1.5h7z",
  flat: "M1 3.25h6v1.5H1z",
} as const;

/** A signed change with an arrow, colored by whether the change is good or bad. */
export function Delta({
  value,
  format = defaultFormat,
  goodDirection = "up",
  neutral = false,
  hideIcon = false,
  className,
  ...htmlProps
}: DeltaProps) {
  const direction = value > 0 ? "up" : value < 0 ? "down" : "flat";
  const tone = neutral || direction === "flat" ? "neutral" : direction === goodDirection ? "good" : "bad";
  const sign = direction === "up" ? "+" : direction === "down" ? "-" : "";
  return (
    <span
      className={cx(ClawscaleClasses.DELTA, ClawscaleClasses.NUMERIC, className)}
      data-direction={direction}
      data-tone={tone}
      {...htmlProps}
    >
      {!hideIcon && (
        <svg className={ClawscaleClasses.DELTA_ICON} width="8" height="8" viewBox="0 0 8 8" aria-hidden="true">
          <path d={arrowPaths[direction]} fill="currentColor" />
        </svg>
      )}
      <span>
        {sign && <span className={hideIcon ? undefined : ClawscaleClasses.VISUALLY_HIDDEN}>{sign}</span>}
        {format(Math.abs(value))}
      </span>
    </span>
  );
}
