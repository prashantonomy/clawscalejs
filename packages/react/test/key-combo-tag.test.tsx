// @vitest-environment jsdom
import { act } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import { renderToString } from "react-dom/server";
import { afterEach, describe, expect, it, vi } from "vitest";
import { KeyComboTag } from "../src/index.ts";

afterEach(() => {
  vi.restoreAllMocks();
  document.body.innerHTML = "";
});

describe("KeyComboTag", () => {
  it("hydrates without a mismatch when the visitor is on another platform", async () => {
    // The server renders PC keys. A Mac visitor's browser must accept that HTML first.
    const serverHtml = renderToString(<KeyComboTag combo="shift+k" />);
    expect(serverHtml).toContain("shift");
    expect(serverHtml).not.toContain("<svg");

    vi.spyOn(navigator, "platform", "get").mockReturnValue("MacIntel");
    const container = document.createElement("div");
    container.innerHTML = serverHtml;
    document.body.append(container);
    const errors: unknown[] = [];
    await act(async () => {
      hydrateRoot(container, <KeyComboTag combo="shift+k" />, { onRecoverableError: (error) => errors.push(error) });
    });

    expect(errors).toEqual([]);
    // After hydration the Mac visitor sees the shift symbol.
    expect(container.querySelector("svg")).not.toBeNull();
  });

  it("shows the visitor's keys right away when mounted on the client", () => {
    vi.spyOn(navigator, "platform", "get").mockReturnValue("MacIntel");
    const container = document.createElement("div");
    document.body.append(container);
    act(() => {
      createRoot(container).render(<KeyComboTag combo="shift+k" />);
    });
    expect(container.querySelector("svg")).not.toBeNull();
  });
});
