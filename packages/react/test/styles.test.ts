import { existsSync, readdirSync, readFileSync } from "node:fs";
import { createRequire } from "node:module";
import { join } from "node:path";
import { Classes } from "@blueprintjs/core";
import { sharedVariables, themeVariables } from "@clawscale/tokens";
import { beforeAll, describe, expect, it } from "vitest";
import { blueprintPatches, buildStyles, inlineImports } from "../scripts/build-css.ts";
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
const stripComments = (css: string) => css.replace(/\/\*[\s\S]*?\*\//g, "");

describe("dist/styles.css", () => {
  let built = "";
  beforeAll(() => {
    built = buildStyles();
  });

  it("puts Blueprint in a layer before the Clawscale layer", () => {
    const blueprint = built.indexOf("@layer blueprint");
    const clawscale = built.indexOf("@layer clawscale");
    expect(blueprint).toBeGreaterThan(-1);
    expect(clawscale).toBeGreaterThan(blueprint);
  });

  it("strips @charset and keeps no rules outside the layers", () => {
    expect(built).not.toContain("@charset");
    const withoutBanner = built.replace(/^\/\*![\s\S]*?\*\//, "").trimStart();
    expect(withoutBanner.startsWith("@layer")).toBe(true);
  });

  it("restates Blueprint's dark text colors last in its layer", () => {
    // The minifier drops Blueprint's original rule, since the restated one has the same selector.
    const layer = built.slice(built.indexOf("@layer blueprint{"), built.indexOf("@layer clawscale{"));
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

describe("Clawscale style sources", () => {
  it("keeps generated table borders up to date", () => {
    expect(readFileSync(tableBordersPath, "utf8"), "Run: pnpm --filter @clawscale/react generate").toBe(
      renderTableBorders(),
    );
  });

  it("keeps generated dark text colors up to date", () => {
    expect(readFileSync(darkTextPath, "utf8"), "Run: pnpm --filter @clawscale/react generate").toBe(renderDarkText());
  });

  it("imports every style file from index.css", () => {
    const imported = [...readFileSync(join(stylesDir, "index.css"), "utf8").matchAll(/@import "\.\/([^"]+)";/g)].map(
      (m) => join(stylesDir, m[1] as string),
    );
    const unused = styleFiles().filter(
      (file) => !file.endsWith("index.css") && !imported.includes(file) && !blueprintPatches.includes(file),
    );
    expect(unused).toEqual([]);
  });

  it(`uses Blueprint's current class namespace (${namespace})`, () => {
    const namespaces = new Set([...source.matchAll(/\.(bp\d+)-/g)].map((m) => m[1]));
    expect([...namespaces]).toEqual([namespace]);
  });

  it("only references --cs-* variables that tokens define", () => {
    const defined = new Set([...Object.keys(sharedVariables()), ...Object.keys(themeVariables("light"))]);
    const unknown = [...new Set([...source.matchAll(/var\((--cs-[a-z0-9-]+)/g)].map((m) => m[1] as string))].filter(
      (name) => !defined.has(name) && !componentVariables.has(name),
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

  it("never uses !important", () => {
    expect(stripComments(source)).not.toContain("!important");
  });

  it("never styles bare elements that Blueprint components render", () => {
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
    for (const [, selectorList] of stripComments(source).matchAll(/([^{}@]+)\{[^{}]*\}/g)) {
      for (const selector of (selectorList ?? "").split(",")) {
        if (rendered.has(selector.trim())) offenders.push(selector.trim());
      }
    }
    expect(offenders).toEqual([]);
  });
});
