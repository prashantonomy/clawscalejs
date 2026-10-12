import { join } from "node:path";
import { Classes } from "@blueprintjs/core";
import { describe, expect, it } from "vitest";
import { inlineImports } from "../scripts/build-css.ts";

const source = inlineImports(join(import.meta.dirname, "..", "src", "styles", "index.css"));

describe("control styles", () => {
  it("style :indeterminate on checkboxes only", () => {
    // A radio is :indeterminate while nothing in its group is checked. A rule for every control
    // would show such radios as checked: a RadioGroup without a value, or RadioCards, whose
    // inputs get no name from the group.
    const selectors = [...source.replace(/\/\*[\s\S]*?\*\//g, "").matchAll(/([^{}]+)\{/g)]
      .flatMap((match) => (match[1] ?? "").split(","))
      .map((selector) => selector.trim())
      .filter((selector) => selector.includes(":indeterminate"));
    expect(selectors.length).toBeGreaterThan(0);
    for (const selector of selectors) expect(selector).toContain(`.${Classes.CHECKBOX}`);
  });
});
