import * as Blueprint from "@blueprintjs/core";
import { describe, expect, it } from "vitest";
import * as common from "../src/common.ts";

describe("@clawscale/react/common", () => {
  it("matches Blueprint's constants", () => {
    expect(common.Classes.DARK).toBe(Blueprint.Classes.DARK);
    expect(common.Classes.BUTTON).toBe(Blueprint.Classes.BUTTON);
    expect(common.Intent).toEqual(Blueprint.Intent);
    expect(common.Position).toEqual(Blueprint.Position);
    expect(common.Alignment).toEqual(Blueprint.Alignment);
    expect(common.Elevation).toEqual(Blueprint.Elevation);
  });

  it("builds a theme script that targets Blueprint's dark class", () => {
    const script = common.getThemeScript({ themeStorageKey: "app-theme", defaultColorScheme: "dark" });
    expect(script).toContain('"app-theme"');
    expect(script).toContain(JSON.stringify(Blueprint.Classes.DARK));
    expect(script).toContain('"dark"');
    expect(script).toContain("data-cs-theme");
    expect(script).toContain("data-cs-color-scheme");
  });
});
