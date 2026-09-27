"use client";

import type { CSSProperties, HTMLAttributes, ReactNode } from "react";
import { ClawscaleClasses } from "./classes.js";
import { cx } from "./cx.js";

export interface PropertyListProps extends HTMLAttributes<HTMLDListElement> {
  /**
   * "horizontal" puts each label beside its value. "vertical" stacks them.
   * @default "horizontal"
   */
  layout?: "horizontal" | "vertical";
  /**
   * Width of the label column in the horizontal layout.
   * @default 120
   */
  labelWidth?: number | string;
  /** Tighter rows for inspectors and side panels. */
  compact?: boolean;
  /** Alternate row backgrounds. */
  striped?: boolean;
}

export interface PropertyListItemProps extends Omit<HTMLAttributes<HTMLDivElement>, "children"> {
  /** The property name. */
  label: ReactNode;
  /** The property value. */
  children?: ReactNode;
  /** Render the value in the monospace font, for IDs and hashes. */
  monospace?: boolean;
}

/** A key and value list for inspectors, detail panels and summaries. */
export function PropertyList({
  layout = "horizontal",
  labelWidth = 120,
  compact = false,
  striped = false,
  className,
  style,
  ...htmlProps
}: PropertyListProps) {
  const width = typeof labelWidth === "number" ? `${labelWidth}px` : labelWidth;
  return (
    <dl
      className={cx(ClawscaleClasses.PROPERTY_LIST, className)}
      data-layout={layout}
      data-compact={compact || undefined}
      data-striped={striped || undefined}
      style={{ "--cs-property-label-width": width, ...style } as CSSProperties}
      {...htmlProps}
    />
  );
}

/** One row of a `PropertyList`. */
export function PropertyListItem({
  label,
  children,
  monospace = false,
  className,
  ...htmlProps
}: PropertyListItemProps) {
  return (
    <div className={cx(ClawscaleClasses.PROPERTY, className)} {...htmlProps}>
      <dt className={ClawscaleClasses.PROPERTY_LABEL}>{label}</dt>
      <dd className={cx(ClawscaleClasses.PROPERTY_VALUE, monospace && ClawscaleClasses.MONOSPACE)}>{children}</dd>
    </div>
  );
}
