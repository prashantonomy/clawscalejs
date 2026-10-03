import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";
import index from "../generated/docs-index.json" with { type: "json" };

/**
 * Accessibility audit of every docs page. Slower than a11y.spec.ts, so it is opt-in:
 *   A11Y_ALL=1 pnpm --filter @clawscale/docs exec playwright test e2e/a11y-all.spec.ts
 */
test.skip(!process.env.A11Y_ALL, "Set A11Y_ALL=1 to audit every page.");

const combinations = ["default", "futuristic"].flatMap((theme) =>
  (["light", "dark"] as const).map((colorScheme) => ({ theme, colorScheme })),
);

for (const { theme, colorScheme } of combinations) {
  for (const page of index) {
    test(`${page.href} has no serious accessibility violations in the ${theme} theme, ${colorScheme}`, async ({
      page: browser,
    }) => {
      await browser.addInitScript(
        ([themeName, scheme]) => {
          localStorage.setItem("clawscale-theme", themeName);
          localStorage.setItem("clawscale-color-scheme", scheme);
        },
        [theme, colorScheme] as const,
      );
      await browser.goto(page.href);
      await browser.waitForLoadState("networkidle");
      const results = await new AxeBuilder({ page: browser })
        .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
        // Known Blueprint issues, tracked upstream. Each exclusion is as narrow as possible.
        .exclude(".bp6-table-container") // grid without the roles axe expects
        .exclude(".bp6-breadcrumbs") // overflow spacer div inside the <ol>
        .exclude('[aria-controls^="listbox"]') // select targets put aria-expanded on a div without a role
        .exclude(".bp6-date-range-input") // aria-haspopup on a control group div
        .exclude(".bp6-timezone-select") // same select target wrapper
        .exclude(".bp6-timepicker-ampm-select") // AM and PM select without a label
        .exclude('[data-example="core/menu/submenus"]') // submenu items sit inside popover target spans
        // Text of an inactive control, exempt under WCAG 1.4.3. Blueprint forces its color with !important.
        .exclude(".bp6-form-group.bp6-disabled .bp6-form-helper-text")
        .analyze();
      const serious = results.violations
        .filter((v) => v.impact === "serious" || v.impact === "critical")
        .map(
          (v) =>
            `${v.id}: ${v.nodes
              .map((n) => n.target.join(" "))
              .slice(0, 3)
              .join(", ")}`,
        );
      expect(serious).toEqual([]);
    });
  }
}
