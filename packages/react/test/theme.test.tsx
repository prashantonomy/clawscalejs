// @vitest-environment jsdom
import { act, render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { ClawscaleProvider, FocusStyleManager, getThemeScript, useTheme } from "../src/index.ts";

function mockSystemColorScheme(dark: boolean) {
  vi.stubGlobal(
    "matchMedia",
    vi.fn().mockImplementation((query: string) => ({
      matches: dark && query.includes("dark"),
      media: query,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    })),
  );
}

function ThemeButtons() {
  const { theme, setTheme, colorScheme, resolvedColorScheme, setColorScheme } = useTheme();
  return (
    <div>
      <span data-testid="state">{`${theme}/${colorScheme}/${resolvedColorScheme}`}</span>
      <button type="button" onClick={() => setColorScheme("dark")}>
        dark
      </button>
      <button type="button" onClick={() => setColorScheme("light")}>
        light
      </button>
      <button type="button" onClick={() => setTheme("futuristic")}>
        futuristic
      </button>
      <button type="button" onClick={() => setTheme("default")}>
        default
      </button>
    </div>
  );
}

/** Code written for 0.1, when `theme` was the color scheme. */
function LegacyToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  return (
    <button type="button" onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}>
      toggle
    </button>
  );
}

const root = () => document.documentElement;
const state = () => screen.getByTestId("state").textContent;

beforeEach(() => {
  localStorage.clear();
  root().className = "";
  root().removeAttribute("data-cs-theme");
  root().removeAttribute("data-cs-color-scheme");
  mockSystemColorScheme(false);
  vi.spyOn(console, "warn").mockImplementation(() => {});
});

afterEach(() => {
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

describe("ClawscaleProvider", () => {
  it("applies the default theme in the light color scheme by default", async () => {
    render(
      <ClawscaleProvider>
        <ThemeButtons />
      </ClawscaleProvider>,
    );
    await act(async () => {});
    expect(state()).toBe("default/system/light");
    expect(root()).toHaveAttribute("data-cs-theme", "default");
    expect(root()).toHaveAttribute("data-cs-color-scheme", "light");
    expect(root()).not.toHaveClass("bp6-dark");
  });

  it("follows the system color scheme", async () => {
    mockSystemColorScheme(true);
    render(
      <ClawscaleProvider>
        <ThemeButtons />
      </ClawscaleProvider>,
    );
    await act(async () => {});
    expect(state()).toBe("default/system/dark");
    expect(root()).toHaveClass("bp6-dark");
    expect(root()).toHaveAttribute("data-cs-color-scheme", "dark");
  });

  it("saves and applies a chosen color scheme", async () => {
    render(
      <ClawscaleProvider>
        <ThemeButtons />
      </ClawscaleProvider>,
    );
    await userEvent.click(screen.getByRole("button", { name: "dark" }));
    expect(localStorage.getItem("clawscale-color-scheme")).toBe("dark");
    expect(root()).toHaveClass("bp6-dark");
    expect(root()).toHaveAttribute("data-cs-color-scheme", "dark");
    await userEvent.click(screen.getByRole("button", { name: "light" }));
    expect(root()).not.toHaveClass("bp6-dark");
  });

  it("saves and applies a chosen theme, independent of the color scheme", async () => {
    render(
      <ClawscaleProvider>
        <ThemeButtons />
      </ClawscaleProvider>,
    );
    await userEvent.click(screen.getByRole("button", { name: "futuristic" }));
    expect(localStorage.getItem("clawscale-theme")).toBe("futuristic");
    expect(root()).toHaveAttribute("data-cs-theme", "futuristic");
    await userEvent.click(screen.getByRole("button", { name: "dark" }));
    expect(state()).toBe("futuristic/dark/dark");
    await userEvent.click(screen.getByRole("button", { name: "default" }));
    expect(root()).toHaveAttribute("data-cs-theme", "default");
    expect(root()).toHaveAttribute("data-cs-color-scheme", "dark");
  });

  it("restores the saved theme and color scheme", async () => {
    localStorage.setItem("clawscale-theme", "futuristic");
    localStorage.setItem("clawscale-color-scheme", "dark");
    render(
      <ClawscaleProvider>
        <ThemeButtons />
      </ClawscaleProvider>,
    );
    await act(async () => {});
    expect(state()).toBe("futuristic/dark/dark");
  });

  it("moves a color scheme saved before 0.2 to its own key", async () => {
    localStorage.setItem("clawscale-theme", "dark");
    render(
      <ClawscaleProvider>
        <ThemeButtons />
      </ClawscaleProvider>,
    );
    await act(async () => {});
    expect(state()).toBe("default/dark/dark");
    expect(localStorage.getItem("clawscale-color-scheme")).toBe("dark");
    expect(localStorage.getItem("clawscale-theme")).toBeNull();
  });

  it("respects a controlled theme and color scheme", async () => {
    const onThemeChange = vi.fn();
    const onColorSchemeChange = vi.fn();
    render(
      <ClawscaleProvider
        theme="default"
        colorScheme="light"
        onThemeChange={onThemeChange}
        onColorSchemeChange={onColorSchemeChange}
      >
        <ThemeButtons />
      </ClawscaleProvider>,
    );
    await userEvent.click(screen.getByRole("button", { name: "dark" }));
    await userEvent.click(screen.getByRole("button", { name: "futuristic" }));
    expect(onColorSchemeChange).toHaveBeenCalledWith("dark");
    expect(onThemeChange).toHaveBeenCalledWith("futuristic");
    expect(state()).toBe("default/light/light");
  });

  it("uses the stored keys it is given, and saves nothing for null", async () => {
    render(
      <ClawscaleProvider themeStorageKey="app-theme" colorSchemeStorageKey={null}>
        <ThemeButtons />
      </ClawscaleProvider>,
    );
    await userEvent.click(screen.getByRole("button", { name: "futuristic" }));
    await userEvent.click(screen.getByRole("button", { name: "dark" }));
    expect(localStorage.getItem("app-theme")).toBe("futuristic");
    expect(localStorage.getItem("clawscale-color-scheme")).toBeNull();
    expect(localStorage.length).toBe(1);
  });

  it("shows focus rings for keyboard focus only by default", async () => {
    render(<ClawscaleProvider>content</ClawscaleProvider>);
    await act(async () => {});
    expect(FocusStyleManager.isActive()).toBe(true);
  });

  it("can always show focus rings", async () => {
    render(<ClawscaleProvider focusRings="always">content</ClawscaleProvider>);
    await act(async () => {});
    expect(FocusStyleManager.isActive()).toBe(false);
  });

  it("leaves the document alone when asked", async () => {
    render(
      <ClawscaleProvider applyToDocument={false} defaultTheme="futuristic" defaultColorScheme="dark">
        <ThemeButtons />
      </ClawscaleProvider>,
    );
    await act(async () => {});
    expect(state()).toBe("futuristic/dark/dark");
    expect(root()).not.toHaveAttribute("data-cs-theme");
    expect(root()).not.toHaveAttribute("data-cs-color-scheme");
  });

  it("warns when a theme's stylesheet is missing", async () => {
    vi.useFakeTimers();
    try {
      render(<ClawscaleProvider defaultTheme="futuristic">content</ClawscaleProvider>);
      await act(async () => {});
      await act(async () => {
        vi.advanceTimersByTime(1000);
      });
      expect(console.warn).toHaveBeenCalledWith(expect.stringContaining("@clawscale/react/themes/futuristic.css"));
    } finally {
      vi.useRealTimers();
    }
  });
});

describe("ClawscaleProvider with the API from before 0.2", () => {
  it("reads a color scheme passed as theme", async () => {
    render(
      <ClawscaleProvider theme="dark">
        <ThemeButtons />
      </ClawscaleProvider>,
    );
    await act(async () => {});
    expect(state()).toBe("default/dark/dark");
    expect(root()).toHaveClass("bp6-dark");
    expect(console.warn).toHaveBeenCalledWith(expect.stringContaining('colorScheme="dark"'));
  });

  it("reads a color scheme passed as defaultTheme", async () => {
    render(
      <ClawscaleProvider defaultTheme="dark">
        <ThemeButtons />
      </ClawscaleProvider>,
    );
    await act(async () => {});
    expect(state()).toBe("default/dark/dark");
  });

  it("keeps a toggle built on resolvedTheme and setTheme working", async () => {
    render(
      <ClawscaleProvider>
        <LegacyToggle />
      </ClawscaleProvider>,
    );
    await userEvent.click(screen.getByRole("button", { name: "toggle" }));
    expect(root()).toHaveClass("bp6-dark");
    expect(localStorage.getItem("clawscale-color-scheme")).toBe("dark");
    await userEvent.click(screen.getByRole("button", { name: "toggle" }));
    expect(root()).not.toHaveClass("bp6-dark");
    expect(root()).toHaveAttribute("data-cs-theme", "default");
  });

  it("keeps a controlled color scheme in theme and onThemeChange working", async () => {
    const onThemeChange = vi.fn();
    render(
      <ClawscaleProvider theme="light" onThemeChange={onThemeChange}>
        <LegacyToggle />
      </ClawscaleProvider>,
    );
    await userEvent.click(screen.getByRole("button", { name: "toggle" }));
    expect(onThemeChange).toHaveBeenCalledWith("dark");
  });

  it("saves the color scheme under storageKey", async () => {
    render(
      <ClawscaleProvider storageKey="app-theme">
        <ThemeButtons />
      </ClawscaleProvider>,
    );
    await userEvent.click(screen.getByRole("button", { name: "dark" }));
    expect(localStorage.getItem("app-theme")).toBe("dark");
  });
});

describe("getThemeScript", () => {
  const run = (options?: Parameters<typeof getThemeScript>[0]) => new Function(getThemeScript(options))();

  it("applies the saved theme and color scheme when run", () => {
    localStorage.setItem("clawscale-theme", "futuristic");
    localStorage.setItem("clawscale-color-scheme", "dark");
    run();
    expect(root()).toHaveClass("bp6-dark");
    expect(root()).toHaveAttribute("data-cs-theme", "futuristic");
    expect(root()).toHaveAttribute("data-cs-color-scheme", "dark");
  });

  it("falls back to the defaults", () => {
    run({ defaultTheme: "futuristic", defaultColorScheme: "light" });
    expect(root()).toHaveAttribute("data-cs-theme", "futuristic");
    expect(root()).toHaveAttribute("data-cs-color-scheme", "light");
  });

  it("reads a color scheme saved before 0.2 under the theme key", () => {
    localStorage.setItem("clawscale-theme", "dark");
    run();
    expect(root()).toHaveAttribute("data-cs-theme", "default");
    expect(root()).toHaveAttribute("data-cs-color-scheme", "dark");
  });

  it("maps the options from before 0.2", () => {
    localStorage.setItem("app-theme", "dark");
    run({ storageKey: "app-theme", defaultTheme: "light" });
    expect(root()).toHaveAttribute("data-cs-theme", "default");
    expect(root()).toHaveAttribute("data-cs-color-scheme", "dark");
  });

  it("still applies the defaults when storage is unavailable", () => {
    vi.spyOn(Storage.prototype, "getItem").mockImplementation(() => {
      throw new Error("denied");
    });
    run({ defaultTheme: "futuristic", defaultColorScheme: "dark" });
    expect(root()).toHaveAttribute("data-cs-theme", "futuristic");
    expect(root()).toHaveClass("bp6-dark");
  });
});
