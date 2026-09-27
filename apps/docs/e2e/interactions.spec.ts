import { expect, test } from "@playwright/test";

test.describe("theme", () => {
  test("toggles with Shift+D and survives a reload", async ({ page }) => {
    await page.goto("/docs/");
    const html = page.locator("html");
    await expect(html).toHaveAttribute("data-cs-theme", /light|dark/);
    const start = await html.getAttribute("data-cs-theme");
    const next = start === "dark" ? "light" : "dark";
    await page.keyboard.press("Shift+D");
    await expect(html).toHaveAttribute("data-cs-theme", next);
    await expect(html).toHaveClass(next === "dark" ? /bp6-dark/ : /^(?!.*bp6-dark)/);
    await page.reload();
    await expect(html).toHaveAttribute("data-cs-theme", next);
  });

  test("applies the saved theme before hydration", async ({ page }) => {
    await page.addInitScript(() => localStorage.setItem("clawscale-theme", "dark"));
    await page.goto("/docs/", { waitUntil: "domcontentloaded" });
    await expect(page.locator("html")).toHaveClass(/bp6-dark/);
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

test.describe("showcase", () => {
  test("selects a pipeline and filters by status", async ({ page }) => {
    await page.goto("/showcase/");
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
