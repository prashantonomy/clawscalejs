import { Colors } from "@clawscale/react/common";
import { defaultTheme, themeVariables } from "@clawscale/tokens";
import { expect, test } from "@playwright/test";
import index from "../generated/docs-index.json" with { type: "json" };

/**
 * Color audit of every page in both themes and both color schemes. Opt-in, like a11y-all.spec.ts:
 *   COLORS_ALL=1 pnpm --filter @clawscale/docs exec playwright test e2e/colors-all.spec.ts
 *
 * It fails on two kinds of colors that skip the Clawscale tokens:
 * - Derived colors. Blueprint derives some with a lightness shift, for example
 *   `oklch(from var(--bp-intent-warning-rest) calc(l + 0.19) c h)`. The shift suits Blueprint's
 *   palette, not always ours. Such colors compute to oklch(), while Clawscale tokens compute to rgb(),
 *   so any oklch() color that is not a Clawscale token fails, alpha aside.
 * - Blueprint's own blue, green, orange and red, which some rules set directly.
 */
test.skip(!process.env.COLORS_ALL, "Set COLORS_ALL=1 to audit every page.");

const allowed = [
  // Derived on purpose: the left half of a compound tag is a darker shade of its intent.
  ".bp6-compound-tag-left",
  // Blueprint forces the buttons of intent toasts to its palette with !important, so the toast keeps it too.
  '.bp6-toast[class*="bp6-intent-"], .bp6-toast[class*="bp6-intent-"] *',
  // Intent icons on a tooltip's dark fill keep Blueprint's light variants.
  ".bp6-tooltip .bp6-icon, .bp6-tooltip .bp6-icon *",
];

const toRgb = (hex: string) => {
  const n = Number.parseInt(hex.slice(1), 16);
  return `rgb(${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255})`;
};
const blueprintPalette = Object.entries(Colors)
  .filter(([name]) => /^(BLUE|GREEN|ORANGE|RED)\d$/.test(name))
  .map(([, hex]) => toRgb(hex));

const colorTokens = Object.keys(themeVariables(defaultTheme, "light")).filter((name) => name.startsWith("--cs-color-"));
const pages = ["/", "/gallery/", "/showcase/", ...index.map((page) => page.href)];
const combinations = ["default", "futuristic"].flatMap((theme) =>
  (["light", "dark"] as const).map((colorScheme) => ({ theme, colorScheme })),
);

for (const { theme, colorScheme } of combinations) {
  test.describe(`${theme} theme, ${colorScheme}`, () => {
    test.beforeEach(async ({ page }) => {
      await page.addInitScript(
        ([themeName, scheme]) => {
          localStorage.setItem("clawscale-theme", themeName);
          localStorage.setItem("clawscale-color-scheme", scheme);
        },
        [theme, colorScheme] as const,
      );
    });

    for (const href of pages) {
      test(`${href} uses only token colors`, async ({ page }) => {
        await page.goto(href);
        await page.waitForLoadState("networkidle");
        const leaks = await page.evaluate(
          ({ tokens, allowedSelectors, blueprintColors }) => {
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
                if (prop !== "color" && value === style.color) continue;
                const width = prop === "borderTopColor" ? style.borderTopWidth : style.borderBottomWidth;
                if (prop.startsWith("border") && width === "0px") continue;
                const fromPalette = blueprintColors.includes(value);
                if (!fromPalette && (!value.includes("oklch(") || isToken(value))) continue;
                const classes = [...element.classList].filter((name) => name.startsWith("bp6-")).join(".");
                const kind = fromPalette ? " (Blueprint palette)" : "";
                found.add(`${element.tagName.toLowerCase()}${classes ? `.${classes}` : ""} ${prop}: ${value}${kind}`);
              }
            }
            return [...found];
          },
          { tokens: colorTokens, allowedSelectors: allowed, blueprintColors: blueprintPalette },
        );
        expect(leaks).toEqual([]);
      });
    }
  });
}
