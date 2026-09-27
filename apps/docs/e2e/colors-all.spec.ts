import { themeVariables } from "@clawscale/tokens";
import { expect, test } from "@playwright/test";
import index from "../generated/docs-index.json" with { type: "json" };

/**
 * Derived color audit of every page in both themes. Opt-in, like a11y-all.spec.ts:
 *   COLORS_ALL=1 pnpm --filter @clawscale/docs exec playwright test e2e/colors-all.spec.ts
 *
 * Blueprint derives some colors with a lightness shift, for example
 * `oklch(from var(--bp-intent-warning-rest) calc(l + 0.19) c h)`. The shift suits Blueprint's
 * palette, not always ours. Such colors compute to oklch(), while Clawscale tokens compute to rgb(),
 * so the audit fails on any oklch() color that is not a Clawscale token, alpha aside.
 */
test.skip(!process.env.COLORS_ALL, "Set COLORS_ALL=1 to audit every page.");

// Derived on purpose: the left half of a compound tag is a darker shade of its intent.
const allowed = [".bp6-compound-tag-left"];

const colorTokens = Object.keys(themeVariables("light")).filter((name) => name.startsWith("--cs-color-"));
const pages = ["/", "/gallery/", "/showcase/", ...index.map((page) => page.href)];

for (const theme of ["light", "dark"] as const) {
  test.describe(`${theme} theme`, () => {
    test.beforeEach(async ({ page }) => {
      await page.addInitScript((value) => localStorage.setItem("clawscale-theme", value), theme);
    });

    for (const href of pages) {
      test(`${href} uses no derived colors`, async ({ page }) => {
        await page.goto(href);
        await page.waitForLoadState("networkidle");
        const leaks = await page.evaluate(
          ({ tokens, allowedSelectors }) => {
            const parse = (value: string) => {
              const match = /oklch\(([\d.]+)%? ([\d.]+) ([\d.]+|none)/.exec(value);
              return match
                ? { l: Number(match[1]), c: Number(match[2]), h: match[3] === "none" ? 0 : Number(match[3]) }
                : null;
            };
            const probe = document.createElement("span");
            document.body.append(probe);
            const palette = tokens.flatMap((name) => {
              probe.style.color = `oklch(from var(${name}) l c h)`;
              const color = parse(getComputedStyle(probe).color);
              return color ? [color] : [];
            });
            probe.remove();
            const isToken = (value: string) => {
              const color = parse(value);
              if (!color) return true;
              return palette.some(
                (token) =>
                  Math.abs(token.l - color.l) < 0.003 &&
                  Math.abs(token.c - color.c) < 0.003 &&
                  (color.c < 0.01 || Math.abs(token.h - color.h) < 1),
              );
            };
            const props = [
              "color",
              "backgroundColor",
              "borderTopColor",
              "borderBottomColor",
              "fill",
              "stroke",
            ] as const;
            const found = new Set<string>();
            for (const element of document.querySelectorAll("body *")) {
              if (allowedSelectors.some((selector) => element.matches(selector))) continue;
              const style = getComputedStyle(element);
              for (const prop of props) {
                const value = style[prop];
                if (!value.includes("oklch(") || (prop !== "color" && value === style.color)) continue;
                if (isToken(value)) continue;
                const classes = [...element.classList].filter((name) => name.startsWith("bp6-")).join(".");
                found.add(`${element.tagName.toLowerCase()}${classes ? `.${classes}` : ""} ${prop}: ${value}`);
              }
            }
            return [...found];
          },
          { tokens: colorTokens, allowedSelectors: allowed },
        );
        expect(leaks).toEqual([]);
      });
    }
  });
}
