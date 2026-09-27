// @vitest-environment jsdom
import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import {
  Delta,
  Metric,
  PropertyList,
  PropertyListItem,
  Sparkline,
  StatusBar,
  StatusBarItem,
  StatusBarSpacer,
} from "../src/index.ts";

describe("Delta", () => {
  it("marks growth as good by default", () => {
    render(<Delta value={4.2} />);
    const delta = screen.getByText("4.2%").closest(".cs-delta");
    expect(delta).toHaveAttribute("data-direction", "up");
    expect(delta).toHaveAttribute("data-tone", "good");
  });

  it("treats growth as bad when down is good", () => {
    render(<Delta value={3} goodDirection="down" format={(v) => `${v} ms`} />);
    expect(screen.getByText("3 ms").closest(".cs-delta")).toHaveAttribute("data-tone", "bad");
  });

  it("keeps the sign available to screen readers", () => {
    render(<Delta value={-1.5} />);
    expect(screen.getByText("-")).toHaveClass("cs-visually-hidden");
  });

  it("shows the sign when the icon is hidden", () => {
    render(<Delta value={2} hideIcon />);
    expect(screen.getByText("+")).not.toHaveClass("cs-visually-hidden");
  });

  it("is neutral at zero", () => {
    render(<Delta value={0} />);
    expect(screen.getByText("0.0%").closest(".cs-delta")).toHaveAttribute("data-tone", "neutral");
  });
});

describe("Metric", () => {
  it("renders label, value, unit, delta and caption", () => {
    render(<Metric label="Throughput" value="12,480" unit="rows/s" delta={8.2} caption="vs last hour" />);
    expect(screen.getByText("Throughput")).toHaveClass("cs-metric-label");
    expect(screen.getByText("rows/s")).toHaveClass("cs-metric-unit");
    expect(screen.getByText("8.2%")).toBeInTheDocument();
    expect(screen.getByText("vs last hour")).toBeInTheDocument();
  });

  it("renders a sparkline for trend data", () => {
    const { container } = render(<Metric label="Rows" value="1" trend={[1, 3, 2]} />);
    expect(container.querySelector(".cs-sparkline")).not.toBeNull();
  });

  it("shows a skeleton while loading", () => {
    const { container } = render(<Metric label="Rows" value="1" loading />);
    expect(container.querySelector(".cs-metric-value")?.className).toContain("skeleton");
    expect(container.querySelector(".cs-metric")).toHaveAttribute("aria-busy", "true");
  });
});

describe("Sparkline", () => {
  it("describes its data for assistive technology", () => {
    render(<Sparkline data={[4, 9, 2]} label="Requests" />);
    expect(screen.getByRole("img")).toHaveAttribute("aria-label", "Requests. Low 2, high 9, last 2");
  });

  it("fills the container when no width is given", () => {
    render(<Sparkline data={[1, 2]} />);
    expect(screen.getByRole("img")).toHaveAttribute("width", "100%");
  });

  it("handles empty and flat data", () => {
    const { rerender } = render(<Sparkline data={[]} label="Empty" />);
    expect(screen.getByRole("img")).toHaveAttribute("aria-label", "Empty");
    rerender(<Sparkline data={[5, 5, 5]} />);
    expect(screen.getByRole("img").querySelector(".cs-sparkline-line")).not.toBeNull();
  });
});

describe("PropertyList", () => {
  it("renders a definition list with the label width", () => {
    const { container } = render(
      <PropertyList labelWidth={96}>
        <PropertyListItem label="Owner">data-platform</PropertyListItem>
        <PropertyListItem label="Run ID" monospace>
          run_8f2c91
        </PropertyListItem>
      </PropertyList>,
    );
    const list = container.querySelector("dl");
    expect(list?.style.getPropertyValue("--cs-property-label-width")).toBe("96px");
    expect(screen.getByText("Owner").tagName).toBe("DT");
    expect(screen.getByText("run_8f2c91")).toHaveClass("cs-monospace");
  });
});

describe("StatusBar", () => {
  it("renders buttons only for clickable items", async () => {
    const onClick = vi.fn();
    render(
      <StatusBar>
        <StatusBarItem>Connected</StatusBarItem>
        <StatusBarSpacer />
        <StatusBarItem onClick={onClick}>UTC</StatusBarItem>
      </StatusBar>,
    );
    expect(screen.queryByRole("button", { name: "Connected" })).toBeNull();
    await userEvent.click(screen.getByRole("button", { name: "UTC" }));
    expect(onClick).toHaveBeenCalledOnce();
  });
});
