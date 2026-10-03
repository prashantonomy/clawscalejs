import { describe, expect, it } from "vitest";
import {
  type ColorSchemeTokens,
  chartPalettes,
  colorSchemes,
  contrastRatio,
  dark,
  defaultTheme,
  intents,
  light,
  parseColor,
  renderThemeCss,
  renderTokensCss,
  schemeValueVariables,
  sharedVariables,
  type ThemeDefinition,
  themeNames,
  themes,
  themeVariables,
} from "../src/index.ts";

const AA_TEXT = 4.5;
const AA_UI = 3;

const allThemes: ThemeDefinition[] = Object.values(themes);
const cases: Array<[string, string, ColorSchemeTokens]> = allThemes.flatMap((theme) =>
  colorSchemes.map((scheme) => [theme.name, scheme, theme[scheme]] as [string, string, ColorSchemeTokens]),
);

describe.each(cases)("%s theme, %s color scheme", (_theme, _scheme, t) => {
  const c = t.color;
  const surfaces = [c.canvas, c.surface, c["surface-raised"], c["surface-sunken"]];

  it("keeps body text at WCAG AA on every surface", () => {
    for (const surface of surfaces) {
      for (const text of [c.text, c["text-muted"], c["text-subtle"]]) {
        expect(contrastRatio(text, surface), `${text} on ${surface}`).toBeGreaterThanOrEqual(AA_TEXT);
      }
    }
  });

  it("keeps text readable on hover and selected rows", () => {
    for (const overlay of [c["surface-hover"], c["surface-active"], c["surface-selected"]]) {
      const ratio = contrastRatio(c.text, overlay, c.surface);
      expect(ratio, `text on ${overlay}`).toBeGreaterThanOrEqual(AA_TEXT);
    }
  });

  it.each(intents)("keeps %s solids readable in every state", (intent) => {
    for (const state of ["", "-hover", "-active"] as const) {
      const bg = c[`${intent}${state}`];
      expect(contrastRatio(c[`${intent}-on`], bg), `${intent}${state}`).toBeGreaterThanOrEqual(AA_TEXT);
    }
  });

  it.each(intents)("keeps %s text readable on surfaces and its subtle fill", (intent) => {
    const text = c[`${intent}-text`];
    expect(contrastRatio(text, c.surface)).toBeGreaterThanOrEqual(AA_TEXT);
    expect(contrastRatio(text, c[`${intent}-subtle`], c.surface)).toBeGreaterThanOrEqual(AA_TEXT);
    expect(contrastRatio(text, c[`${intent}-subtle-hover`], c.surface)).toBeGreaterThanOrEqual(AA_TEXT);
  });

  it("keeps text readable on controls and neutral fills", () => {
    for (const bg of [c.control, c["control-hover"], c["control-active"]]) {
      expect(contrastRatio(c.text, bg), `text on ${bg}`).toBeGreaterThanOrEqual(AA_TEXT);
    }
    for (const bg of [c.neutral, c["neutral-hover"], c["neutral-active"]]) {
      expect(contrastRatio(c["neutral-on"], bg), `neutral-on on ${bg}`).toBeGreaterThanOrEqual(AA_TEXT);
    }
  });

  it("keeps tooltips readable", () => {
    expect(contrastRatio(c["tooltip-text"], c.tooltip)).toBeGreaterThanOrEqual(AA_TEXT);
  });

  it("keeps the focus ring visible", () => {
    for (const surface of surfaces) {
      expect(contrastRatio(c.focus, surface), `focus on ${surface}`).toBeGreaterThanOrEqual(AA_UI);
    }
  });

  it("uses only colors the contrast math can read", () => {
    for (const value of Object.values(c)) expect(() => parseColor(value), value).not.toThrow();
  });
});

describe.each(allThemes.map((theme) => [theme.name, theme] as const))("%s theme definition", (name, theme) => {
  it("is registered under its own name", () => {
    expect(themes[name as keyof typeof themes]).toBe(theme);
    expect(name).toMatch(/^[a-z][a-z0-9-]*$/);
    expect(theme.label.length).toBeGreaterThan(0);
    expect(theme.description.length).toBeGreaterThan(0);
  });

  it("defines the same tokens as the default theme", () => {
    expect(Object.keys(sharedVariables(theme)).sort()).toEqual(Object.keys(sharedVariables(defaultTheme)).sort());
    for (const scheme of colorSchemes) {
      expect(Object.keys(themeVariables(theme, scheme)).sort()).toEqual(
        Object.keys(themeVariables(defaultTheme, "light")).sort(),
      );
    }
  });

  it("only overrides shared tokens that exist", () => {
    const known = new Set(Object.keys(sharedVariables(defaultTheme)));
    for (const overrides of Object.values(theme.supports ?? {})) {
      for (const [group, values] of Object.entries(overrides)) {
        for (const token of Object.keys(values ?? {}))
          expect(known, `--cs-${group}-${token}`).toContain(`--cs-${group}-${token}`);
      }
    }
  });

  it("keeps eight chart slots and fixed status colors", () => {
    for (const scheme of colorSchemes) {
      const chart = theme[scheme].chart;
      expect(["1", "2", "3", "4", "5", "6", "7", "8"].every((slot) => slot in chart)).toBe(true);
      expect(chart.good).toBe(defaultTheme[scheme].chart.good);
      expect(chart.critical).toBe(defaultTheme[scheme].chart.critical);
    }
  });
});

describe("chart palettes", () => {
  it("list every built-in theme's slots in order", () => {
    for (const name of themeNames) {
      for (const scheme of colorSchemes) {
        const slots = themes[name][scheme].chart;
        expect(chartPalettes[name][scheme]).toEqual(
          ["1", "2", "3", "4", "5", "6", "7", "8"].map((s) => slots[s as "1"]),
        );
      }
    }
  });
});

describe("css output", () => {
  const css = renderTokensCss();

  it("declares every shared token and both values of every color scheme token", () => {
    for (const name of Object.keys(sharedVariables())) expect(css).toContain(`${name}:`);
    for (const name of Object.keys(schemeValueVariables(defaultTheme))) expect(css).toContain(`${name}:`);
    expect(css).not.toContain("undefined");
  });

  it("picks each final token from its light and dark value", () => {
    for (const name of Object.keys(themeVariables(defaultTheme, "light"))) {
      expect(css).toContain(`${name}: var(--cs-is-dark, var(${name}-light)) var(--cs-is-light, var(${name}-dark));`);
    }
  });

  it("switches the color scheme under the dark and light selectors", () => {
    expect(css).toContain('[data-cs-color-scheme="dark"], [data-cs-theme="dark"] {\n  color-scheme: dark;');
    expect(css).toContain("--cs-is-dark: ;");
    expect(css).toContain(`--cs-color-canvas-dark: ${dark.color.canvas};`);
    expect(css).toContain(`--cs-color-canvas-light: ${light.color.canvas};`);
  });

  it("uses custom selectors when asked", () => {
    const custom = renderTokensCss({ darkSelector: ".my-dark", lightSelector: ".my-light" });
    expect(custom).toContain(".my-dark {");
    expect(custom).toContain(":root, .my-light {");
  });

  it("re-picks final tokens wherever the theme or color scheme changes", () => {
    expect(css).toMatch(/:root, \[data-cs-theme\], \[data-cs-color-scheme\], [^{]+\{\n {2}--cs-color-canvas: var/);
  });

  it("names the active theme", () => {
    expect(css).toContain("--cs-theme: default;");
  });
});

describe("theme css output", () => {
  const css = renderThemeCss(themes.futuristic);

  it("scopes a theme to its attribute", () => {
    expect(css).toContain(
      ':root[data-cs-theme="futuristic"], [data-cs-theme="futuristic"] {\n  --cs-theme: futuristic;',
    );
    expect(css).not.toContain("--cs-is-dark");
  });

  it("declares the theme's values for both color schemes", () => {
    for (const [name, value] of Object.entries(schemeValueVariables(themes.futuristic))) {
      expect(css).toContain(`${name}: ${value};`);
    }
  });

  it("puts feature-dependent overrides behind @supports", () => {
    expect(css).toContain("@supports (corner-shape: bevel) {");
    expect(css).toContain("--cs-corner-shape: bevel;");
  });
});

describe("deprecated names", () => {
  it("still read the default theme by color scheme", () => {
    expect(themeVariables("dark")).toEqual(themeVariables(defaultTheme, "dark"));
  });
});
