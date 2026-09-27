import { expect, type Page, test } from "@playwright/test";
import index from "../generated/docs-index.json" with { type: "json" };

/** Characters this project never shows. See scripts/prose.mjs. */
const FORBIDDEN = /[\u2014\u2013\u00B7\u2022\u2027\u2219\u22C5\u30FB\uFF65]/;

function collectErrors(page: Page): string[] {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(`pageerror: ${error.message}`));
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(`console: ${message.text()}`);
  });
  return errors;
}

const pages = [
  { href: "/", title: "Clawscale" },
  { href: "/showcase/", title: "Production pipelines" },
  { href: "/gallery/", title: "" },
  ...index.map((page) => ({ href: page.href, title: page.title })),
];

for (const { href, title } of pages) {
  test(`renders ${href}`, async ({ page }) => {
    const errors = collectErrors(page);
    const response = await page.goto(href);
    expect(response?.status()).toBe(200);
    if (title) await expect(page.locator("h1").first()).toHaveText(title);
    await page.waitForLoadState("networkidle");
    const text = await page.locator("body").innerText();
    const match = FORBIDDEN.exec(text);
    expect(
      match,
      `forbidden character near: ${match ? text.slice(Math.max(0, match.index - 40), match.index + 40) : ""}`,
    ).toBeNull();
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
    );
    expect(overflow, "page scrolls horizontally").toBeLessThanOrEqual(1);
    expect(errors).toEqual([]);
  });
}

test("every sidebar heading link points at a heading on its page", async ({ page }) => {
  for (const entry of index.filter((e) => e.headings.length > 0).slice(0, 40)) {
    await page.goto(entry.href);
    for (const heading of entry.headings) {
      await expect(page.locator(`[id="${heading.id}"]`), `${entry.href}#${heading.id}`).toHaveCount(1);
    }
  }
});
