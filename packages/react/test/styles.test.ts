import { existsSync, readdirSync, readFileSync } from "node:fs";
import { createRequire } from "node:module";
import { join } from "node:path";
import { Classes } from "@blueprintjs/core";
import { defaultTheme, sharedVariables, themes, themeVariables } from "@clawscale/tokens";
import { beforeAll, describe, expect, it } from "vitest";
import {
  blueprintPatches,
  buildStyles,
  buildThemeStyles,
  inlineImports,
  liftKeyframes,
  themeNames,
  themesDir,
} from "../scripts/build-css.ts";
import { darkTextPath, renderDarkText } from "../scripts/generate-dark-text.ts";
import { renderTableBorders, tableBordersPath } from "../scripts/generate-table-borders.ts";

const root = join(import.meta.dirname, "..");
const stylesDir = join(root, "src", "styles");
const require = createRequire(join(root, "package.json"));
const namespace = Classes.DARK.replace(/-dark$/, "");

/** CSS variables that components set inline, so no token defines them. */
const componentVariables = new Set(["--cs-property-label-width"]);

function styleFiles(dir = stylesDir): string[] {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) =>
    entry.isDirectory()
      ? styleFiles(join(dir, entry.name))
      : entry.name.endsWith(".css")
        ? [join(dir, entry.name)]
        : [],
  );
}

const source = inlineImports(join(stylesDir, "index.css"));
const themeSources = themeNames().map((name) => [name, inlineImports(join(themesDir, name, "index.css"))] as const);
const allSources = [["base", source] as const, ...themeSources];
const stripComments = (css: string) => css.replace(/\/\*[\s\S]*?\*\//g, "");

describe("dist/styles.css", () => {
  let built = "";
  beforeAll(() => {
    built = buildStyles();
  });

  it("orders the layers: Blueprint, the Clawscale base, then themes", () => {
    const blueprint = built.indexOf("@layer blueprint");
    const base = built.indexOf("@layer clawscale.base");
    const themesLayer = built.indexOf("clawscale.themes");
    expect(blueprint).toBeGreaterThan(-1);
    expect(base).toBeGreaterThan(blueprint);
    expect(themesLayer).toBeGreaterThan(base);
  });

  it("strips @charset and keeps no rules outside the layers", () => {
    expect(built).not.toContain("@charset");
    const withoutBanner = built.replace(/^\/\*![\s\S]*?\*\//, "").trimStart();
    expect(withoutBanner.startsWith("@layer")).toBe(true);
  });

  it("restates Blueprint's dark text colors last in its layer", () => {
    // The minifier drops Blueprint's original rule, since the restated one has the same selector.
    const layer = built.slice(built.indexOf("@layer blueprint{"), built.indexOf("@layer clawscale.base{"));
    const helper = ".bp6-dark .bp6-form-group .bp6-form-helper-text";
    const last = layer.lastIndexOf(helper);
    expect(last).toBeGreaterThan(-1);
    expect(layer.slice(last + helper.length)).toMatch(/^[^{]*\{color:var\(--bp-typography-color-muted\)\}/);
  });

  it("ships the icon fonts it references", () => {
    const fonts = [...built.matchAll(/url\("?\.\/(assets\/[^")]+)"?\)/g)].map((m) => m[1] as string);
    expect(fonts.length).toBeGreaterThan(0);
    for (const font of fonts) expect(existsSync(join(root, "dist", font)), font).toBe(true);
  });
});

describe("theme stylesheets", () => {
  it("exist for every theme in @clawscale/tokens but the default", () => {
    expect(themeNames()).toEqual(
      Object.keys(themes)
        .filter((name) => name !== defaultTheme.name)
        .sort(),
    );
  });

  it.each(themeNames())("%s keeps the layer order, whichever file loads first", (name) => {
    const css = buildThemeStyles(name);
    const order = css.indexOf("@layer blueprint");
    expect(order).toBeGreaterThan(-1);
    expect(css.indexOf("clawscale.base")).toBeGreaterThan(order);
    expect(css.indexOf("@layer clawscale.themes{")).toBeGreaterThan(css.indexOf("clawscale.base"));
  });

  it.each(themeNames())("%s declares its tokens and scopes its rules to the theme", (name) => {
    const css = buildThemeStyles(name);
    expect(css).toContain(`--cs-theme:${name}`);
    expect(css).toContain(`@scope([data-cs-theme=${name}]) to ([data-cs-theme]:not([data-cs-theme=${name}],`);
  });

  it.each(themeNames())("%s keeps keyframes outside @scope", (name) => {
    const css = buildThemeStyles(name);
    const scope = css.indexOf("@scope");
    for (const match of css.matchAll(/@keyframes/g)) expect(match.index).toBeLessThan(scope);
  });

  it("lifts nested keyframes out of a stylesheet", () => {
    const { rules, keyframes } = liftKeyframes(".a{color:red}@keyframes x{from{opacity:0}to{opacity:1}}.b{color:blue}");
    expect(rules).toBe(".a{color:red}.b{color:blue}");
    expect(keyframes).toEqual(["@keyframes x{from{opacity:0}to{opacity:1}}"]);
  });
});

describe("Clawscale style sources", () => {
  it("keeps generated table borders up to date", () => {
    expect(readFileSync(tableBordersPath, "utf8"), "Run: pnpm --filter @clawscale/react generate").toBe(
      renderTableBorders(),
    );
  });

  it("keeps generated dark text colors up to date", () => {
    expect(readFileSync(darkTextPath, "utf8"), "Run: pnpm --filter @clawscale/react generate").toBe(renderDarkText());
  });

  it("imports every style file from the index.css of its folder", () => {
    const importsOf = (dir: string) =>
      [...readFileSync(join(dir, "index.css"), "utf8").matchAll(/@import "\.\/([^"]+)";/g)].map((m) =>
        join(dir, m[1] as string),
      );
    const imported = [importsOf(stylesDir), ...themeNames().map((name) => importsOf(join(themesDir, name)))].flat();
    const unused = styleFiles().filter(
      (file) => !file.endsWith("index.css") && !imported.includes(file) && !blueprintPatches.includes(file),
    );
    expect(unused).toEqual([]);
  });

  it.each(allSources)(`%s uses Blueprint's current class namespace (${namespace})`, (_name, css) => {
    const namespaces = new Set([...css.matchAll(/\.(bp\d+)-/g)].map((m) => m[1]));
    expect([...namespaces]).toEqual([namespace]);
  });

  it.each(allSources)("%s only references --cs-* variables that tokens or the file itself define", (name, css) => {
    const defined = new Set([...Object.keys(sharedVariables()), ...Object.keys(themeVariables(defaultTheme, "light"))]);
    // A theme may declare helpers of its own, such as --cs-fx-glow.
    const local = new Set(name === "base" ? [] : [...css.matchAll(/(--cs-[a-z0-9-]+)\s*:/g)].map((m) => m[1]));
    const unknown = [...new Set([...css.matchAll(/var\((--cs-[a-z0-9-]+)/g)].map((m) => m[1] as string))].filter(
      (variable) => !defined.has(variable) && !local.has(variable) && !componentVariables.has(variable),
    );
    expect(unknown).toEqual([]);
  });

  it("only bridges --bp-* tokens that Blueprint defines", () => {
    const blueprintCss = readFileSync(require.resolve("@blueprintjs/core/lib/css/blueprint.css"), "utf8");
    const bridge = readFileSync(join(stylesDir, "bridge.css"), "utf8");
    const declared = [...bridge.matchAll(/(--bp\d*-[a-z0-9-]+)\s*:/g)].map((m) => m[1] as string);
    expect(declared.length).toBeGreaterThan(50);
    for (const name of declared) expect(blueprintCss, name).toContain(`${name}:`);
  });

  it.each(allSources)("%s never uses !important", (_name, css) => {
    expect(stripComments(css)).not.toContain("!important");
  });

  it.each(allSources)("%s never styles bare elements that Blueprint components render", (_name, css) => {
    // A rule on a bare element would beat Blueprint's component rules for that element.
    // Scope it with a Blueprint class or exclude Blueprint classes, as base.css does for links.
    const rendered = new Set([
      "a",
      "button",
      "input",
      "select",
      "textarea",
      "label",
      "li",
      "ul",
      "ol",
      "table",
      "td",
      "th",
      "tr",
      "span",
      "div",
      "svg",
      "path",
      "h1",
      "h2",
      "h3",
      "h4",
      "h5",
      "h6",
      "p",
    ]);
    const offenders: string[] = [];
    for (const [, selectorList] of stripComments(css).matchAll(/([^{}@]+)\{[^{}]*\}/g)) {
      for (const selector of (selectorList ?? "").split(",")) {
        if (rendered.has(selector.trim())) offenders.push(selector.trim());
      }
    }
    expect(offenders).toEqual([]);
  });
});
