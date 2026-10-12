import { teal, themeAccents, themeNames, themes } from "@clawscale/tokens";
import { expect, test } from "@playwright/test";
import { showcases } from "../lib/showcases";

test.describe("color scheme", () => {
  test("toggles with Shift+D and survives a reload", async ({ page }) => {
    await page.goto("/docs/");
    const html = page.locator("html");
    await expect(html).toHaveAttribute("data-cs-color-scheme", /light|dark/);
    const start = await html.getAttribute("data-cs-color-scheme");
    const next = start === "dark" ? "light" : "dark";
    await page.keyboard.press("Shift+D");
    await expect(html).toHaveAttribute("data-cs-color-scheme", next);
    await expect(html).toHaveClass(next === "dark" ? /bp6-dark/ : /^(?!.*bp6-dark)/);
    await page.reload();
    await expect(html).toHaveAttribute("data-cs-color-scheme", next);
  });

  test("applies the saved color scheme before hydration", async ({ page }) => {
    await page.addInitScript(() => localStorage.setItem("clawscale-color-scheme", "dark"));
    await page.goto("/docs/", { waitUntil: "domcontentloaded" });
    await expect(page.locator("html")).toHaveClass(/bp6-dark/);
  });

  test("reads a color scheme saved before 0.2", async ({ page }) => {
    await page.addInitScript(() => localStorage.setItem("clawscale-theme", "dark"));
    await page.goto("/docs/", { waitUntil: "domcontentloaded" });
    await expect(page.locator("html")).toHaveAttribute("data-cs-color-scheme", "dark");
    await expect(page.locator("html")).toHaveAttribute("data-cs-theme", "default");
  });
});

test.describe("theme", () => {
  test("cycles with Shift+T, independent of the color scheme, and survives a reload", async ({ page }) => {
    await page.addInitScript(() => localStorage.setItem("clawscale-color-scheme", "dark"));
    await page.goto("/docs/");
    await page.waitForLoadState("networkidle");
    const html = page.locator("html");
    await expect(html).toHaveAttribute("data-cs-theme", "default");
    const next = themeNames[1 % themeNames.length] ?? "default";
    await page.keyboard.press("Shift+T");
    await expect(html).toHaveAttribute("data-cs-theme", next);
    await expect(html).toHaveAttribute("data-cs-color-scheme", "dark");
    await page.reload();
    await expect(html).toHaveAttribute("data-cs-theme", next);
  });

  test("applies the saved theme before hydration", async ({ page }) => {
    await page.addInitScript(() => localStorage.setItem("clawscale-theme", "harbor"));
    await page.goto("/showcase/", { waitUntil: "domcontentloaded" });
    await expect(page.locator("html")).toHaveAttribute("data-cs-theme", "harbor");
  });

  test("applies the saved accent before hydration", async ({ page }) => {
    await page.addInitScript(() => localStorage.setItem("clawscale-accent", "teal"));
    await page.goto("/showcase/", { waitUntil: "domcontentloaded" });
    await expect(page.locator("html")).toHaveAttribute("data-cs-accent", "teal");
  });

  test("lists every theme and the active theme's accents, and saves both picks", async ({ page }) => {
    await page.goto("/showcase/");
    await page.waitForLoadState("networkidle");
    const html = page.locator("html");
    const menu = page.getByRole("menu", { name: "Theme and accent" });
    await page.getByRole("button", { name: "Theme: Default" }).click();
    for (const theme of Object.values(themes)) {
      await expect(menu.getByRole("menuitemradio", { name: new RegExp(`^${theme.label}`) })).toBeVisible();
    }
    await expect(menu.getByRole("menuitemradio", { name: /^Default/ })).toHaveAttribute("aria-checked", "true");
    await menu.getByRole("menuitemradio", { name: /^Ledger/ }).click();
    await expect(html).toHaveAttribute("data-cs-theme", "ledger");

    await page.getByRole("button", { name: "Theme: Ledger" }).click();
    await expect(menu.getByRole("menuitemradio", { name: / accent$/ })).toHaveCount(themeAccents(themes.ledger).length);
    await expect(menu.getByRole("menuitemradio", { name: "Violet accent", exact: true })).toHaveAttribute(
      "aria-checked",
      "true",
    );
    await menu.getByRole("menuitemradio", { name: "Teal accent", exact: true }).click();
    await expect(html).toHaveAttribute("data-cs-accent", "teal");
    const primary = await page.evaluate(() =>
      getComputedStyle(document.documentElement).getPropertyValue("--cs-color-primary").trim().toLowerCase(),
    );
    expect(primary).toBe(teal.light.primary.toLowerCase());

    await page.reload();
    await expect(html).toHaveAttribute("data-cs-theme", "ledger");
    await expect(html).toHaveAttribute("data-cs-accent", "teal");
  });
});

test.describe("search", () => {
  test("finds a page with Shift+S", async ({ page }) => {
    await page.goto("/docs/");
    await page.waitForLoadState("networkidle");
    await page.keyboard.press("Shift+S");
    const input = page.getByPlaceholder("Search components, guides and headings");
    await expect(input).toBeVisible();
    await input.fill("segmented control");
    await page.keyboard.press("Enter");
    await expect(page).toHaveURL(/\/docs\/core\/segmented-control\/$/);
  });
});

test.describe("examples", () => {
  test("copies example source", async ({ page, context }) => {
    await context.grantPermissions(["clipboard-read", "clipboard-write"]);
    await page.goto("/docs/core/buttons/");
    const example = page.locator('[data-example="core/buttons/basic"]');
    await example.getByRole("button", { name: "Copy code" }).click();
    const copied = await page.evaluate(() => navigator.clipboard.readText());
    expect(copied).toContain('import { Button } from "@clawscale/react";');
    expect(copied).not.toContain("use client");
  });

  test("updates a playground", async ({ page }) => {
    await page.goto("/docs/core/buttons/");
    const playground = page.locator('[data-example="core/buttons/playground"]');
    await playground.getByLabel("Disabled").check({ force: true });
    await expect(playground.getByRole("button", { name: "Refresh data" })).toBeDisabled();
  });
});

test.describe("showcase index", () => {
  test("lists every showcase and opens one", async ({ page }) => {
    await page.goto("/showcase/");
    for (const showcase of showcases) {
      await expect(page.getByRole("link", { name: showcase.title, exact: true })).toBeVisible();
    }
    await page.getByRole("link", { name: "Pipeline console", exact: true }).click();
    await expect(page).toHaveURL(/\/showcase\/pipelines\/$/);
    await expect(page.locator("h1")).toHaveText("Production pipelines");
  });
});

test.describe("pipeline console showcase", () => {
  test("selects a pipeline and filters by status", async ({ page }) => {
    await page.goto("/showcase/pipelines/");
    await page.waitForLoadState("networkidle");
    const inspector = page.getByRole("complementary", { name: "Pipeline details" });
    await expect(inspector).toContainText("Last run failed");

    await page.locator(".bp6-table-cell", { hasText: "ingest-orders" }).first().click();
    await expect(inspector).toContainText("ingest-orders");

    await page.getByLabel("Status").selectOption("failed");
    const count = await page.locator(".showcase-table-card .bp6-tag").first().innerText();
    await expect(page.locator(".showcase-cell-status")).toHaveCount(Number(count));
  });
});
