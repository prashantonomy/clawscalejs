/**
 * The futuristic theme: a heads-up display for mission control.
 *
 * Dark is deep space: near-black blue surfaces, cyan hairlines and luminous intent fills
 * with dark text. Light is a clean room: cool gray surfaces and deep cyan accents.
 * Corners are cut, not rounded, where the browser supports `corner-shape`.
 * Contrast rules for these values are enforced by `test/tokens.test.ts`, like every theme.
 */
import {
  type ColorSchemeTokens,
  chartSlots,
  chartStatus,
  type SequentialRamp,
  type SharedTokens,
  shared,
  type ThemeDefinition,
} from "./tokens.js";

/*
 * Categorical chart colors. Same hue order in both color schemes, stepped for each surface.
 * The order was searched with the dataviz validator: every adjacent pair clears CVD Delta E 11.5
 * and the normal-vision floor 26 in both schemes, and the first three slots pass all-pairs.
 * Slot order is the safety mechanism. Never reorder or cycle it.
 */
const chartLight = ["#0084A7", "#DD6301", "#6A29C5", "#3E9804", "#DB2C87", "#DB9901", "#0A54DD", "#D40924"];
const chartDark = ["#0EA6BC", "#DF6E07", "#995CF6", "#67A902", "#E43A97", "#BD8A05", "#0174F8", "#E62B34"];

const light: ColorSchemeTokens = {
  color: {
    canvas: "#E6ECEF",
    surface: "#F7FBFC",
    "surface-raised": "#FFFFFF",
    "surface-sunken": "#F0F4F7",
    "surface-hover": "rgba(2, 100, 130, 0.06)",
    "surface-active": "rgba(2, 100, 130, 0.11)",
    "surface-selected": "rgba(2, 119, 151, 0.12)",
    border: "#CAD6DD",
    "border-strong": "#A8BBC5",
    "border-subtle": "#DBE5E9",
    text: "#061D28",
    "text-muted": "#36515F",
    "text-subtle": "#4C6876",
    "text-disabled": "#96A8B2",
    "text-inverse": "#FFFFFF",
    focus: "#0087AD",
    backdrop: "rgba(3, 20, 30, 0.45)",
    selection: "rgba(2, 119, 151, 0.22)",
    tooltip: "#081D28",
    "tooltip-text": "#E6F4F9",
    control: "#FFFFFF",
    "control-hover": "#F1F6F8",
    "control-active": "#E4EDF0",
    "control-border": "#AEC1CB",
    "control-border-hover": "#86A0AD",
    neutral: "#445C68",
    "neutral-hover": "#374E5A",
    "neutral-active": "#2A414C",
    "neutral-on": "#FFFFFF",
    primary: "#027797",
    "primary-hover": "#036884",
    "primary-active": "#045871",
    "primary-disabled": "#94C7DB",
    "primary-on": "#FFFFFF",
    "primary-subtle": "#E2F4FA",
    "primary-subtle-hover": "#CCEBF5",
    "primary-border": "#8BC8DE",
    "primary-text": "#036884",
    success: "#0B764D",
    "success-hover": "#056641",
    "success-active": "#015636",
    "success-disabled": "#9DCAB1",
    "success-on": "#FFFFFF",
    "success-subtle": "#E4F7EC",
    "success-subtle-hover": "#D2F1DF",
    "success-border": "#96D5B2",
    "success-text": "#0C6944",
    warning: "#F0AD15",
    "warning-hover": "#E39F08",
    "warning-active": "#D19006",
    "warning-disabled": "#F0D49B",
    "warning-on": "#1C1200",
    "warning-subtle": "#FDF5DF",
    "warning-subtle-hover": "#FBEAC2",
    "warning-border": "#EFC876",
    "warning-text": "#8A5601",
    danger: "#BD1F3D",
    "danger-hover": "#A81032",
    "danger-active": "#900D2A",
    "danger-disabled": "#E6A3A7",
    "danger-on": "#FFFFFF",
    "danger-subtle": "#FEEDEE",
    "danger-subtle-hover": "#FEDADC",
    "danger-border": "#F2A6AB",
    "danger-text": "#AC1635",
  },
  shadow: {
    "0": "0 0 0 1px rgba(0, 95, 130, 0.12)",
    "1": "0 0 0 1px rgba(0, 95, 130, 0.12), 0 1px 2px rgba(6, 28, 39, 0.06)",
    "2": "0 0 0 1px rgba(0, 95, 130, 0.13), 0 2px 4px -1px rgba(6, 28, 39, 0.06), 0 4px 12px -2px rgba(6, 28, 39, 0.08)",
    "3": "0 0 0 1px rgba(0, 95, 130, 0.14), 0 4px 8px -2px rgba(6, 28, 39, 0.08), 0 12px 28px -6px rgba(6, 28, 39, 0.14)",
    "4": "0 0 0 1px rgba(0, 95, 130, 0.15), 0 8px 16px -4px rgba(6, 28, 39, 0.10), 0 28px 56px -12px rgba(6, 28, 39, 0.22)",
    control: "0 1px 2px rgba(6, 28, 39, 0.06)",
  },
  chart: {
    ...chartSlots(chartLight),
    grid: "#D5E0E6",
    axis: "#A2B8C4",
    ...chartStatus,
  },
};

const dark: ColorSchemeTokens = {
  color: {
    canvas: "#03090F",
    surface: "#07121A",
    "surface-raised": "#0A1923",
    "surface-sunken": "#050D14",
    "surface-hover": "rgba(64, 214, 255, 0.07)",
    "surface-active": "rgba(64, 214, 255, 0.12)",
    "surface-selected": "rgba(64, 214, 255, 0.16)",
    border: "#163844",
    "border-strong": "#205564",
    "border-subtle": "#0E252F",
    text: "#DDF3F9",
    "text-muted": "#A3C4D0",
    "text-subtle": "#81A5B4",
    "text-disabled": "#415965",
    "text-inverse": "#03090F",
    focus: "#2DE2FF",
    backdrop: "rgba(1, 5, 9, 0.74)",
    selection: "rgba(45, 226, 255, 0.28)",
    tooltip: "#0C212C",
    "tooltip-text": "#DDF3F9",
    control: "#040D15",
    "control-hover": "#08151E",
    "control-active": "#0D1E28",
    "control-border": "#19404E",
    "control-border-hover": "#206173",
    neutral: "#244151",
    "neutral-hover": "#2A4C5E",
    "neutral-active": "#30586B",
    "neutral-on": "#DDF3F9",
    primary: "#0FD4F1",
    "primary-hover": "#49E4FC",
    "primary-active": "#05B8D4",
    "primary-disabled": "#003C4B",
    "primary-on": "#01161D",
    "primary-subtle": "rgba(15, 212, 241, 0.12)",
    "primary-subtle-hover": "rgba(15, 212, 241, 0.20)",
    "primary-border": "rgba(15, 212, 241, 0.50)",
    "primary-text": "#5FE6FC",
    success: "#32E696",
    "success-hover": "#67F4AB",
    "success-active": "#14CA80",
    "success-disabled": "#133F2B",
    "success-on": "#011A0E",
    "success-subtle": "rgba(50, 230, 150, 0.12)",
    "success-subtle-hover": "rgba(50, 230, 150, 0.20)",
    "success-border": "rgba(50, 230, 150, 0.45)",
    "success-text": "#6EEEAB",
    warning: "#FFB848",
    "warning-hover": "#FFCB77",
    "warning-active": "#EE9E10",
    "warning-disabled": "#4F3815",
    "warning-on": "#1C1200",
    "warning-subtle": "rgba(255, 184, 72, 0.12)",
    "warning-subtle-hover": "rgba(255, 184, 72, 0.20)",
    "warning-border": "rgba(255, 184, 72, 0.45)",
    "warning-text": "#FEC66B",
    danger: "#FE4F6D",
    "danger-hover": "#FF7585",
    "danger-active": "#E8395C",
    "danger-disabled": "#572128",
    "danger-on": "#1C030A",
    "danger-subtle": "rgba(254, 79, 109, 0.13)",
    "danger-subtle-hover": "rgba(254, 79, 109, 0.21)",
    "danger-border": "rgba(254, 79, 109, 0.50)",
    "danger-text": "#FF8798",
  },
  shadow: {
    "0": "0 0 0 1px rgba(64, 214, 255, 0.12)",
    "1": "0 0 0 1px rgba(64, 214, 255, 0.14), 0 1px 2px rgba(0, 0, 0, 0.60)",
    "2": "0 0 0 1px rgba(64, 214, 255, 0.18), 0 4px 12px -2px rgba(0, 0, 0, 0.70), 0 0 24px -6px rgba(64, 214, 255, 0.14)",
    "3": "0 0 0 1px rgba(64, 214, 255, 0.22), 0 12px 28px -6px rgba(0, 0, 0, 0.75), 0 0 32px -8px rgba(64, 214, 255, 0.18)",
    "4": "0 0 0 1px rgba(64, 214, 255, 0.26), 0 28px 56px -12px rgba(0, 0, 0, 0.80), 0 0 48px -12px rgba(64, 214, 255, 0.22)",
    control: "0 0 0 0 transparent",
  },
  chart: {
    ...chartSlots(chartDark),
    grid: "#0A1D26",
    axis: "#1C4351",
    ...chartStatus,
  },
};

/** Sequential cyan ramp for magnitude. Lightest step means near zero. */
const sequential: SequentialRamp = {
  "100": "#D3F1FC",
  "200": "#9EDCF2",
  "300": "#64C3E2",
  "400": "#1EA8CD",
  "500": "#0688A7",
  "600": "#066881",
  "700": "#034A5D",
};

const sharedTokens: SharedTokens = {
  ...shared,
  font: {
    sans: '"Oxanium Variable", "Oxanium", ui-sans-serif, system-ui, -apple-system, "Segoe UI", sans-serif',
    mono: shared.font.mono,
  },
  /* Small radii read as hard edges where corners cannot be cut. See `supports` below. */
  radius: {
    xs: "1px",
    sm: "2px",
    md: "2px",
    lg: "3px",
    xl: "4px",
    full: "9999px",
  },
  duration: {
    fast: "90ms",
    normal: "140ms",
    slow: "220ms",
  },
  corner: {
    shape: "bevel",
  },
  label: {
    transform: "uppercase",
    tracking: "0.08em",
  },
};

export const futuristic: ThemeDefinition = {
  name: "futuristic",
  label: "Futuristic",
  description: "A heads-up display for mission control: cut corners, cyan light and luminous data.",
  shared: sharedTokens,
  light,
  dark,
  sequential,
  supports: {
    /* Where corners can be cut, larger radii become chamfers. */
    "(corner-shape: bevel)": {
      radius: { xs: "2px", sm: "4px", md: "6px", lg: "10px", xl: "14px" },
    },
  },
};

/** The futuristic theme's categorical chart colors in their fixed order. */
export const futuristicChartPalette: Record<"light" | "dark", readonly string[]> = {
  light: chartLight,
  dark: chartDark,
};
