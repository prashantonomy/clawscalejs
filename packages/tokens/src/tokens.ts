/**
 * Clawscale design tokens: the token types and the default theme.
 *
 * Together with the other theme files (futuristic.ts), this is the single source of truth
 * for every `--cs-*` CSS variable. Change a value here, run `pnpm build`, and every package
 * picks it up. Contrast rules for every theme are enforced by `test/tokens.test.ts`.
 */

export const colorSchemes = ["light", "dark"] as const;
export type ColorScheme = (typeof colorSchemes)[number];

/** @deprecated Use `ColorScheme`. Since 0.2, a theme is a look such as "futuristic", and light and dark are color schemes. */
export type Theme = ColorScheme;

export const intents = ["primary", "success", "warning", "danger"] as const;
export type Intent = (typeof intents)[number];

/** Every color token. Each has a light and a dark value. The CSS variable is `--cs-color-<name>`. */
export type ColorToken =
  | "canvas"
  | "surface"
  | "surface-raised"
  | "surface-sunken"
  | "surface-hover"
  | "surface-active"
  | "surface-selected"
  | "border"
  | "border-strong"
  | "border-subtle"
  | "text"
  | "text-muted"
  | "text-subtle"
  | "text-disabled"
  | "text-inverse"
  | "focus"
  | "backdrop"
  | "selection"
  | "tooltip"
  | "tooltip-text"
  | "control"
  | "control-hover"
  | "control-active"
  | "control-border"
  | "control-border-hover"
  | "neutral"
  | "neutral-hover"
  | "neutral-active"
  | "neutral-on"
  | `${Intent}`
  | `${Intent}-hover`
  | `${Intent}-active`
  | `${Intent}-disabled`
  | `${Intent}-subtle`
  | `${Intent}-subtle-hover`
  | `${Intent}-border`
  | `${Intent}-text`
  | `${Intent}-on`;

export type ShadowToken = "0" | "1" | "2" | "3" | "4" | "control";

/** Categorical chart slots plus chart chrome. The CSS variable is `--cs-chart-<name>`. */
export type ChartToken =
  | "1"
  | "2"
  | "3"
  | "4"
  | "5"
  | "6"
  | "7"
  | "8"
  | "grid"
  | "axis"
  | "good"
  | "warning"
  | "serious"
  | "critical";

/** The tokens that change with the color scheme. */
export interface ColorSchemeTokens {
  color: Record<ColorToken, string>;
  shadow: Record<ShadowToken, string>;
  chart: Record<ChartToken, string>;
}

/** @deprecated Use `ColorSchemeTokens`. */
export type ThemeTokens = ColorSchemeTokens;

/* Intent solids are identical in both color schemes so white or dark text on them keeps its contrast. */
const intentSolids = {
  primary: { rest: "#3563E9", hover: "#2B55D6", active: "#2448BD", on: "#FFFFFF" },
  success: { rest: "#1B7F4E", hover: "#176E43", active: "#135D39", on: "#FFFFFF" },
  warning: { rest: "#F5A524", hover: "#E8971A", active: "#D48712", on: "#1A1C21" },
  danger: { rest: "#D23535", hover: "#BD2D2D", active: "#A42626", on: "#FFFFFF" },
} as const;

function solids(intent: Intent, disabled: string) {
  const s = intentSolids[intent];
  return {
    [intent]: s.rest,
    [`${intent}-hover`]: s.hover,
    [`${intent}-active`]: s.active,
    [`${intent}-disabled`]: disabled,
    [`${intent}-on`]: s.on,
  } as Record<Intent | `${Intent}-${"hover" | "active" | "disabled" | "on"}`, string>;
}

/*
 * Chart palettes come from the validated categorical order in the dataviz method:
 * adjacent CVD separation and normal-vision floors pass on both surfaces.
 * Slot order is the safety mechanism. Never reorder or cycle it.
 */
const chartLight = ["#3563E9", "#EB6834", "#1BAF7A", "#EDA100", "#E87BA4", "#008300", "#4A3AA7", "#E34948"];
const chartDark = ["#4A74F0", "#D95926", "#199E70", "#C98500", "#D55181", "#008300", "#9085E9", "#E66767"];

/** Maps eight categorical colors to the chart slots `1` to `8`. */
export function chartSlots(values: readonly string[]) {
  return Object.fromEntries(values.map((value, index) => [String(index + 1), value])) as Record<
    "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8",
    string
  >;
}

/** Status colors for charts are fixed across themes and color schemes, and always ship with an icon and a label. */
export const chartStatus = { good: "#0CA30C", warning: "#FAB219", serious: "#EC835A", critical: "#D03B3B" };

export const light: ColorSchemeTokens = {
  color: {
    canvas: "#F4F5F7",
    surface: "#FFFFFF",
    "surface-raised": "#FFFFFF",
    "surface-sunken": "#F6F7F9",
    "surface-hover": "rgba(20, 24, 31, 0.05)",
    "surface-active": "rgba(20, 24, 31, 0.09)",
    "surface-selected": "rgba(53, 99, 233, 0.10)",
    border: "#E3E6EA",
    "border-strong": "#CDD2D9",
    "border-subtle": "#ECEEF1",
    text: "#1A1C21",
    "text-muted": "#555D6A",
    "text-subtle": "#666F7C",
    "text-disabled": "#9AA1AC",
    "text-inverse": "#FFFFFF",
    focus: "#3563E9",
    backdrop: "rgba(15, 16, 19, 0.42)",
    selection: "rgba(53, 99, 233, 0.20)",
    tooltip: "#1F2228",
    "tooltip-text": "#F4F5F7",
    control: "#FFFFFF",
    "control-hover": "#F6F7F9",
    "control-active": "#EDEFF2",
    "control-border": "#CDD2D9",
    "control-border-hover": "#B7BEC8",
    neutral: "#5F6875",
    "neutral-hover": "#4C5460",
    "neutral-active": "#3E454F",
    "neutral-on": "#FFFFFF",
    ...solids("primary", "#9DB5F4"),
    "primary-subtle": "#EEF3FF",
    "primary-subtle-hover": "#E0E9FF",
    "primary-border": "#B8CBFA",
    "primary-text": "#2B55D6",
    ...solids("success", "#8CC4A7"),
    "success-subtle": "#E9F6EF",
    "success-subtle-hover": "#D9EFE3",
    "success-border": "#A8D8BD",
    "success-text": "#17744A",
    ...solids("warning", "#F9D291"),
    "warning-subtle": "#FEF6E5",
    "warning-subtle-hover": "#FCEBC6",
    "warning-border": "#F2CD84",
    "warning-text": "#9A5A00",
    ...solids("danger", "#E89A9A"),
    "danger-subtle": "#FDEEEE",
    "danger-subtle-hover": "#FADBDB",
    "danger-border": "#F1B0B0",
    "danger-text": "#B42A2A",
  },
  shadow: {
    "0": "0 0 0 1px rgba(17, 20, 26, 0.08)",
    "1": "0 0 0 1px rgba(17, 20, 26, 0.07), 0 1px 2px rgba(17, 20, 26, 0.06)",
    "2": "0 0 0 1px rgba(17, 20, 26, 0.07), 0 2px 4px -1px rgba(17, 20, 26, 0.06), 0 4px 12px -2px rgba(17, 20, 26, 0.08)",
    "3": "0 0 0 1px rgba(17, 20, 26, 0.07), 0 4px 8px -2px rgba(17, 20, 26, 0.08), 0 12px 28px -6px rgba(17, 20, 26, 0.14)",
    "4": "0 0 0 1px rgba(17, 20, 26, 0.07), 0 8px 16px -4px rgba(17, 20, 26, 0.10), 0 28px 56px -12px rgba(17, 20, 26, 0.22)",
    control: "0 1px 2px rgba(17, 20, 26, 0.06)",
  },
  chart: {
    ...chartSlots(chartLight),
    grid: "#E3E6EA",
    axis: "#BCC2CA",
    ...chartStatus,
  },
};

export const dark: ColorSchemeTokens = {
  color: {
    canvas: "#0F1013",
    surface: "#16171B",
    "surface-raised": "#1D1F24",
    "surface-sunken": "#121316",
    "surface-hover": "rgba(255, 255, 255, 0.06)",
    "surface-active": "rgba(255, 255, 255, 0.10)",
    "surface-selected": "rgba(99, 136, 255, 0.18)",
    border: "#2A2D33",
    "border-strong": "#3A3E46",
    "border-subtle": "#212328",
    text: "#E7E9EC",
    "text-muted": "#A3AAB4",
    "text-subtle": "#858D99",
    "text-disabled": "#5E6570",
    "text-inverse": "#0F1013",
    focus: "#7C9CFF",
    backdrop: "rgba(0, 0, 0, 0.62)",
    selection: "rgba(124, 156, 255, 0.32)",
    tooltip: "#2C2F36",
    "tooltip-text": "#F4F5F7",
    control: "#1F2127",
    "control-hover": "#262930",
    "control-active": "#2D3139",
    "control-border": "#363A42",
    "control-border-hover": "#464B55",
    neutral: "#555C68",
    "neutral-hover": "#626A77",
    "neutral-active": "#6E7684",
    "neutral-on": "#FFFFFF",
    ...solids("primary", "#2C3F75"),
    "primary-subtle": "rgba(92, 130, 255, 0.16)",
    "primary-subtle-hover": "rgba(92, 130, 255, 0.24)",
    "primary-border": "rgba(124, 156, 255, 0.45)",
    "primary-text": "#8AA8FF",
    ...solids("success", "#1F4A36"),
    "success-subtle": "rgba(46, 184, 120, 0.15)",
    "success-subtle-hover": "rgba(46, 184, 120, 0.22)",
    "success-border": "rgba(76, 195, 138, 0.45)",
    "success-text": "#4CC38A",
    ...solids("warning", "#5C4518"),
    "warning-subtle": "rgba(245, 165, 36, 0.14)",
    "warning-subtle-hover": "rgba(245, 165, 36, 0.22)",
    "warning-border": "rgba(245, 181, 74, 0.45)",
    "warning-text": "#F5B54A",
    ...solids("danger", "#5A2426"),
    "danger-subtle": "rgba(255, 99, 99, 0.14)",
    "danger-subtle-hover": "rgba(255, 99, 99, 0.22)",
    "danger-border": "rgba(255, 122, 122, 0.45)",
    "danger-text": "#FF8585",
  },
  shadow: {
    "0": "0 0 0 1px rgba(255, 255, 255, 0.07)",
    "1": "0 0 0 1px rgba(255, 255, 255, 0.07), 0 1px 2px rgba(0, 0, 0, 0.40)",
    "2": "0 0 0 1px rgba(255, 255, 255, 0.08), 0 2px 4px -1px rgba(0, 0, 0, 0.40), 0 4px 12px -2px rgba(0, 0, 0, 0.45)",
    "3": "0 0 0 1px rgba(255, 255, 255, 0.08), 0 4px 8px -2px rgba(0, 0, 0, 0.45), 0 12px 28px -6px rgba(0, 0, 0, 0.55)",
    "4": "0 0 0 1px rgba(255, 255, 255, 0.09), 0 8px 16px -4px rgba(0, 0, 0, 0.50), 0 28px 56px -12px rgba(0, 0, 0, 0.65)",
    control: "0 1px 2px rgba(0, 0, 0, 0.35)",
  },
  chart: {
    ...chartSlots(chartDark),
    grid: "#26292E",
    axis: "#3A3E46",
    ...chartStatus,
  },
};

/** Tokens that do not change with the color scheme. Values are plain, never `var()` references. */
export const shared = {
  font: {
    sans: '"Inter Variable", "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    mono: '"JetBrains Mono Variable", "JetBrains Mono", ui-monospace, "SFMono-Regular", Menlo, Consolas, monospace',
  },
  "font-size": {
    xs: "11px",
    sm: "12px",
    md: "13px",
    lg: "15px",
    xl: "18px",
    "2xl": "22px",
    "3xl": "28px",
    "4xl": "36px",
  },
  "font-weight": {
    regular: "400",
    medium: "500",
    semibold: "600",
    bold: "700",
  },
  "line-height": {
    tight: "1.25",
    normal: "1.4",
    relaxed: "1.6",
  },
  radius: {
    xs: "2px",
    sm: "4px",
    md: "6px",
    lg: "8px",
    xl: "12px",
    full: "9999px",
  },
  space: {
    unit: "4px",
    "1": "4px",
    "2": "8px",
    "3": "12px",
    "4": "16px",
    "5": "20px",
    "6": "24px",
    "8": "32px",
    "10": "40px",
  },
  "control-height": {
    sm: "24px",
    md: "30px",
    lg: "40px",
  },
  duration: {
    fast: "100ms",
    normal: "160ms",
    slow: "240ms",
  },
  ease: {
    standard: "cubic-bezier(0.2, 0, 0, 1)",
    out: "cubic-bezier(0, 0, 0.2, 1)",
  },
  /** The CSS `corner-shape` of rounded corners. `bevel` cuts them, where the browser supports it. */
  corner: {
    shape: "round",
  },
  /**
   * Short interface labels: buttons, tabs, column headers, section titles and form labels.
   * Text that shows data, such as tags, inputs and table cells, never takes these.
   */
  label: {
    transform: "none",
    tracking: "normal",
  },
} as const;

/** Every token group that does not change with the color scheme, with string values. */
export type SharedTokens = { [G in keyof typeof shared]: { [K in keyof (typeof shared)[G]]: string } };

/** Shared token overrides: any group, any subset of its tokens. */
export type SharedOverrides = { [G in keyof SharedTokens]?: Partial<SharedTokens[G]> };

/** A sequential ramp for magnitude, `--cs-chart-seq-100` to `--cs-chart-seq-700`. */
export type SequentialRamp = Record<"100" | "200" | "300" | "400" | "500" | "600" | "700", string>;

/** Sequential blue ramp for magnitude (heatmaps). Lightest step means near zero. */
export const sequentialBlue: SequentialRamp = {
  "100": "#CDE2FB",
  "200": "#9EC5F4",
  "300": "#6DA7EC",
  "400": "#3987E5",
  "500": "#256ABF",
  "600": "#184F95",
  "700": "#0D366B",
};

/** The default theme's tokens. `themes` in themes.ts holds every theme. */
export const tokens = { light, dark, shared, sequentialBlue } as const;

/** The default theme's categorical chart colors in their fixed order, for chart libraries that take arrays. */
export const chartPalette: Record<ColorScheme, readonly string[]> = {
  light: chartLight,
  dark: chartDark,
};

/**
 * A complete theme: a name, shared tokens, a light and a dark color scheme and a sequential ramp.
 * Every theme defines the same tokens, so components never need to know which theme is active.
 */
export interface ThemeDefinition {
  /** Identifier for the `data-cs-theme` attribute and the `theme` prop. Lowercase, no spaces. */
  name: string;
  /** Name for people, for example in a theme picker. */
  label: string;
  /** One sentence about the look. */
  description: string;
  shared: SharedTokens;
  light: ColorSchemeTokens;
  dark: ColorSchemeTokens;
  /** The same in both color schemes. */
  sequential: SequentialRamp;
  /**
   * Shared overrides that apply only when the browser supports a CSS feature,
   * keyed by an `@supports` condition such as `"(corner-shape: bevel)"`.
   */
  supports?: Record<string, SharedOverrides>;
}
