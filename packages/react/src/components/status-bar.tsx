"use client";

import { Icon, type IconName, type Intent, type MaybeElement } from "@blueprintjs/core";
import type { ButtonHTMLAttributes, HTMLAttributes, ReactNode } from "react";
import { ClawscaleClasses } from "./classes.js";
import { cx } from "./cx.js";

export interface StatusBarProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
}

export interface StatusBarItemProps extends Omit<ButtonHTMLAttributes<HTMLElement>, "type"> {
  /** Icon name or element shown before the text. */
  icon?: IconName | MaybeElement;
  /** Colors the icon to show state. */
  intent?: Intent;
  /** Renders a button when set. */
  onClick?: ButtonHTMLAttributes<HTMLElement>["onClick"];
  children?: ReactNode;
}

/** A thin bar along the bottom of an app for connection state, counts and quick settings. */
export function StatusBar({ className, children, ...htmlProps }: StatusBarProps) {
  return (
    <div className={cx(ClawscaleClasses.STATUS_BAR, className)} {...htmlProps}>
      {children}
    </div>
  );
}

/** One entry in a `StatusBar`. Becomes a button when it has `onClick`. */
export function StatusBarItem({ icon, intent, onClick, className, children, ...htmlProps }: StatusBarItemProps) {
  const content = (
    <>
      {icon != null && <Icon icon={icon} intent={intent} size={12} />}
      {children != null && <span>{children}</span>}
    </>
  );
  const classes = cx(ClawscaleClasses.STATUS_BAR_ITEM, className);
  if (onClick) {
    return (
      <button type="button" className={classes} onClick={onClick} {...htmlProps}>
        {content}
      </button>
    );
  }
  return (
    <span className={classes} {...(htmlProps as HTMLAttributes<HTMLSpanElement>)}>
      {content}
    </span>
  );
}

/** Pushes the following items to the right edge of a `StatusBar`. */
export function StatusBarSpacer() {
  return <span className={ClawscaleClasses.STATUS_BAR_SPACER} aria-hidden="true" />;
}
