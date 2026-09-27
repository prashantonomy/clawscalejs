// @vitest-environment jsdom
import { act, render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { ClawscaleProvider, FocusStyleManager, getThemeScript, useTheme } from "../src/index.ts";

function mockSystemTheme(dark: boolean) {
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
  const { theme, resolvedTheme, setTheme } = useTheme();
  return (
    <div>
      <span data-testid="state">{`${theme}/${resolvedTheme}`}</span>
      <button type="button" onClick={() => setTheme("dark")}>
        dark
      </button>
      <button type="button" onClick={() => setTheme("light")}>
        light
      </button>
    </div>
  );
}

const root = () => document.documentElement;

beforeEach(() => {
  localStorage.clear();
  root().className = "";
  root().removeAttribute("data-cs-theme");
  mockSystemTheme(false);
});

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("ClawscaleProvider", () => {
  it("applies the light theme by default", async () => {
    render(
      <ClawscaleProvider>
        <ThemeButtons />
      </ClawscaleProvider>,
    );
    await act(async () => {});
    expect(root()).toHaveAttribute("data-cs-theme", "light");
    expect(root()).not.toHaveClass("bp6-dark");
  });

  it("follows the system preference", async () => {
    mockSystemTheme(true);
    render(
      <ClawscaleProvider>
        <ThemeButtons />
      </ClawscaleProvider>,
    );
    await act(async () => {});
    expect(screen.getByTestId("state")).toHaveTextContent("system/dark");
    expect(root()).toHaveClass("bp6-dark");
  });

  it("saves and applies a chosen theme", async () => {
    render(
      <ClawscaleProvider>
        <ThemeButtons />
      </ClawscaleProvider>,
    );
    await userEvent.click(screen.getByRole("button", { name: "dark" }));
    expect(localStorage.getItem("clawscale-theme")).toBe("dark");
    expect(root()).toHaveClass("bp6-dark");
    expect(root()).toHaveAttribute("data-cs-theme", "dark");
    await userEvent.click(screen.getByRole("button", { name: "light" }));
    expect(root()).not.toHaveClass("bp6-dark");
  });

  it("restores the saved theme", async () => {
    localStorage.setItem("clawscale-theme", "dark");
    render(
      <ClawscaleProvider>
        <ThemeButtons />
      </ClawscaleProvider>,
    );
    await act(async () => {});
    expect(screen.getByTestId("state")).toHaveTextContent("dark/dark");
  });

  it("respects a controlled theme", async () => {
    const onThemeChange = vi.fn();
    render(
      <ClawscaleProvider theme="light" onThemeChange={onThemeChange}>
        <ThemeButtons />
      </ClawscaleProvider>,
    );
    await userEvent.click(screen.getByRole("button", { name: "dark" }));
    expect(onThemeChange).toHaveBeenCalledWith("dark");
    expect(screen.getByTestId("state")).toHaveTextContent("light/light");
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
      <ClawscaleProvider applyToDocument={false} defaultTheme="dark">
        <ThemeButtons />
      </ClawscaleProvider>,
    );
    await act(async () => {});
    expect(root()).not.toHaveAttribute("data-cs-theme");
  });
});

describe("getThemeScript", () => {
  it("applies the saved theme when run", () => {
    localStorage.setItem("clawscale-theme", "dark");
    new Function(getThemeScript())();
    expect(root()).toHaveClass("bp6-dark");
    expect(root()).toHaveAttribute("data-cs-theme", "dark");
  });

  it("falls back to the default theme", () => {
    new Function(getThemeScript({ defaultTheme: "light" }))();
    expect(root()).toHaveAttribute("data-cs-theme", "light");
  });
});
