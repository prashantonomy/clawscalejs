import { test } from "@playwright/test";

/**
 * Full-page screenshots for visual review, written to apps/docs/screenshots/.
 * Run with: pnpm --filter @clawscale/docs screenshots (after pnpm build:docs).
 */
test.skip(!process.env.SCREENSHOTS, "Set SCREENSHOTS=1 to capture screenshots.");

const pages = [
  { name: "gallery", href: "/gallery/" },
  { name: "showcase", href: "/showcase/" },
  { name: "landing", href: "/" },
  { name: "buttons", href: "/docs/core/buttons/" },
];

for (const theme of ["light", "dark"] as const) {
  for (const { name, href } of pages) {
    test(`${name} in the ${theme} theme`, async ({ page }) => {
      await page.addInitScript((value) => localStorage.setItem("clawscale-theme", value), theme);
      await page.goto(href);
      await page.waitForLoadState("networkidle");
      // Tables and sliders measure the DOM after mount.
      await page.waitForTimeout(1000);
      await page.screenshot({ path: `screenshots/${name}-${theme}.png`, fullPage: true });
    });
  }
}
