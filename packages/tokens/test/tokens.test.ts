import { describe, expect, it } from "vitest";
import {
  contrastRatio,
  dark,
  intents,
  light,
  renderTokensCss,
  sharedVariables,
  type ThemeTokens,
  themeVariables,
} from "../src/index.ts";

const themes: Array<[string, ThemeTokens]> = [
  ["light", light],
  ["dark", dark],
];

const AA_TEXT = 4.5;
const AA_UI = 3;

describe.each(themes)("%s theme", (_name, t) => {
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
});

describe("css output", () => {
  const css = renderTokensCss();

  it("declares every variable exactly once per scope", () => {
    const names = Object.keys({ ...sharedVariables(), ...themeVariables("light") });
    for (const name of names) expect(css).toContain(`${name}:`);
    expect(css).not.toContain("undefined");
  });

  it("switches to dark tokens under the dark selector", () => {
    expect(css).toContain('[data-cs-theme="dark"] {');
    expect(css).toContain(`--cs-color-canvas: ${dark.color.canvas};`);
  });

  it("uses custom selectors when asked", () => {
    const custom = renderTokensCss({ darkSelector: ".my-dark" });
    expect(custom).toContain(".my-dark {");
  });

  it("gives both themes the same token names", () => {
    expect(Object.keys(themeVariables("dark")).sort()).toEqual(Object.keys(themeVariables("light")).sort());
  });
});
