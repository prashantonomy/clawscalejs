"use client";

import { Button, Menu, MenuDivider, MenuItem, PopoverNext, type PopoverNextProps, useTheme } from "@clawscale/react";
import { type ThemeDefinition, themeAccents, themes } from "@clawscale/tokens";
import type { ReactElement } from "react";

/** Every built-in theme, the default first. A new theme in @clawscale/tokens shows up here by itself. */
const options: ThemeDefinition[] = Object.values(themes);

/** The theme after `current`, for the Shift + T hotkey. */
export function nextTheme(current: string): string {
  const index = options.findIndex((option) => option.name === current);
  return options[(index + 1) % options.length]?.name ?? current;
}

/** The name people see for a theme. */
export function themeLabel(name: string): string {
  return options.find((option) => option.name === name)?.label ?? name;
}

// One label per theme renders. These rules show the one that matches <html>, which ThemeScript
// sets before the page shows, so the first paint is right before React hydrates.
const labelCss = [
  ".docs-theme-label{display:none}",
  ...options.map(
    ({ name }) => `:root[data-cs-theme="${name}"] .docs-theme-label[data-theme="${name}"]{display:inline}`,
  ),
].join("\n");

/** The name of the active theme, correct on the first paint. */
export function ThemeLabel() {
  return (
    <>
      <style href="docs-theme-label" precedence="default">
        {labelCss}
      </style>
      {options.map(({ name, label }) => (
        <span key={name} className="docs-theme-label" data-theme={name}>
          {label}
        </span>
      ))}
    </>
  );
}

function ThemeMenu() {
  const { theme, setTheme, accent, setAccent } = useTheme();
  const accents = themeAccents(options.find((option) => option.name === theme) ?? themes.default);
  // A saved accent that this theme lacks falls back to the theme's own, listed first.
  const activeAccent = accents.some((option) => option.name === accent) ? accent : accents[0]?.name;
  return (
    <Menu aria-label="Theme and accent" className="docs-theme-menu">
      {options.map(({ name, label, description }) => (
        <MenuItem
          key={name}
          role="menuitemradio"
          aria-checked={name === theme}
          icon={name === theme ? "tick" : "blank"}
          multiline
          text={
            <>
              <span className="docs-theme-menu-label">{label}</span>
              <span className="docs-theme-menu-description">{description}</span>
            </>
          }
          onClick={() => setTheme(name)}
        />
      ))}
      <MenuDivider title="Accent" />
      {accents.map(({ name, label, light }) => (
        <MenuItem
          key={name}
          role="menuitemradio"
          aria-checked={name === activeAccent}
          aria-label={`${label} accent`}
          icon={name === activeAccent ? "tick" : "blank"}
          text={label}
          labelElement={<span className="docs-accent-swatch" style={{ backgroundColor: light.primary }} />}
          onClick={() => setAccent(name)}
        />
      ))}
    </Menu>
  );
}

export interface ThemePickerProps {
  /** The element that opens the menu. Defaults to a minimal button with the theme's name. */
  children?: ReactElement;
  className?: string;
  /** Stretches the target to the width of its container. */
  fill?: boolean;
  /** @default "bottom-end" */
  placement?: PopoverNextProps["placement"];
}

/** A dropdown of every theme and the accents of the active one. Both choices are saved. */
export function ThemePicker({ children, className, fill, placement = "bottom-end" }: ThemePickerProps) {
  const { theme } = useTheme();
  return (
    <PopoverNext className={className} content={<ThemeMenu />} fill={fill} placement={placement}>
      {children ?? (
        <Button
          aria-label={`Theme: ${themeLabel(theme)}`}
          endIcon="caret-down"
          icon="style"
          text={<ThemeLabel />}
          variant="minimal"
        />
      )}
    </PopoverNext>
  );
}
