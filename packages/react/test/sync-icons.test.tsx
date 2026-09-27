import { Icon } from "@blueprintjs/core";
import { renderToString } from "react-dom/server";
import { describe, expect, it } from "vitest";

describe("@clawscale/react/sync-icons", () => {
  it("renders icon paths during server rendering once imported", async () => {
    expect(renderToString(<Icon icon="database" />)).not.toContain("<path");
    await import("../src/sync-icons.ts");
    expect(renderToString(<Icon icon="database" />)).toContain("<path");
    expect(renderToString(<Icon icon="database" size={20} />)).toContain("<path");
  });

  it("ignores unknown icon names", async () => {
    await import("../src/sync-icons.ts");
    expect(renderToString(<Icon icon={"not-an-icon" as "add"} />)).not.toContain("<path");
  });
});
