import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

const pages = ["/", "/docs/", "/docs/core/buttons/", "/docs/core/tag/", "/docs/patterns/metric/", "/showcase/"];

for (const theme of ["light", "dark"] as const) {
  for (const href of pages) {
    test(`${href} has no serious accessibility violations in the ${theme} theme`, async ({ page }) => {
      await page.addInitScript((value) => localStorage.setItem("clawscale-theme", value), theme);
      await page.goto(href);
      await page.waitForLoadState("networkidle");
      const results = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
        // Blueprint's Table renders a grid without the roles axe expects; tracked upstream.
        .exclude(".bp6-table-container")
        // Blueprint's Breadcrumbs put an overflow spacer div inside their <ol>; tracked upstream.
        .exclude(".bp6-breadcrumbs")
        .analyze();
      const serious = results.violations
        .filter((v) => v.impact === "serious" || v.impact === "critical")
        .map(
          (v) =>
            `${v.id}: ${v.help} (${v.nodes
              .map((n) => n.target.join(" "))
              .slice(0, 3)
              .join(", ")})`,
        );
      expect(serious).toEqual([]);
    });
  }
}
