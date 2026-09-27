/**
 * Docs navigation. Order here is the order in the sidebar.
 * Every entry needs a page at app<href>page.mdx, and every page needs an entry.
 * `pnpm --filter @clawscale/docs generate` fails when they drift apart.
 */
import type { IconName } from "@clawscale/react";

export interface NavPage {
  title: string;
  href: string;
  badge?: "new" | "deprecated";
}

export interface NavGroup {
  /** Small uppercase label above the pages, like COMPONENTS. */
  title?: string;
  pages: NavPage[];
}

export interface NavPackage {
  id: string;
  title: string;
  icon: IconName;
  /** Overview page for the package. */
  href: string;
  /** Shown on the right of the package row. */
  meta?: string;
  groups: NavGroup[];
}

const core = (slug: string, title: string, badge?: NavPage["badge"]): NavPage => ({
  title,
  href: `/docs/core/${slug}/`,
  ...(badge ? { badge } : {}),
});

export const nav: NavPackage[] = [
  {
    id: "clawscale",
    title: "Clawscale",
    icon: "home",
    href: "/docs/",
    groups: [
      {
        pages: [
          { title: "Getting started", href: "/docs/getting-started/" },
          { title: "Next.js", href: "/docs/nextjs/" },
          { title: "Theming", href: "/docs/theming/" },
          { title: "Design principles", href: "/docs/principles/" },
          { title: "Migrating from Blueprint", href: "/docs/migrating/" },
          { title: "Reading the docs", href: "/docs/reading-the-docs/" },
        ],
      },
    ],
  },
  {
    id: "core",
    title: "Core",
    icon: "cube",
    href: "/docs/core/",
    meta: "@clawscale/react",
    groups: [
      {
        pages: [
          core("accessibility", "Accessibility"),
          core("classes", "Classes"),
          core("colors", "Colors"),
          core("typography", "Typography"),
          core("tokens", "Tokens"),
        ],
      },
      {
        title: "Components",
        pages: [
          core("breadcrumbs", "Breadcrumbs"),
          core("buttons", "Buttons"),
          core("button-group", "Button group"),
          core("callout", "Callout"),
          core("card", "Card"),
          core("card-list", "Card list"),
          core("control-card", "Control card"),
          core("collapse", "Collapse"),
          core("divider", "Divider"),
          core("editable-text", "Editable text"),
          core("entity-title", "Entity title"),
          core("html", "HTML elements"),
          core("html-table", "HTML table"),
          core("hotkeys", "Hotkeys"),
          core("icon", "Icon"),
          core("link", "Link", "new"),
          core("menu", "Menu"),
          core("navbar", "Navbar"),
          core("non-ideal-state", "Non-ideal state"),
          core("overflow-list", "Overflow list"),
          core("panel-stack", "Panel stack"),
          core("progress-bar", "Progress bar"),
          core("resize-sensor", "Resize sensor"),
          core("section", "Section"),
          core("skeleton", "Skeleton"),
          core("spinner", "Spinner"),
          core("tabs", "Tabs"),
          core("tag", "Tag"),
          core("compound-tag", "Compound tag"),
          core("text", "Text"),
          core("tree", "Tree"),
        ],
      },
      {
        title: "Form controls",
        pages: [
          core("form-group", "Form group"),
          core("control-group", "Control group"),
          core("label", "Label"),
          core("checkbox", "Checkbox"),
          core("radio", "Radio"),
          core("html-select", "HTML select"),
          core("segmented-control", "Segmented control"),
          core("slider", "Slider"),
          core("switch", "Switch"),
        ],
      },
      {
        title: "Form inputs",
        pages: [
          core("input-group", "Input group"),
          core("text-area", "Text area"),
          core("file-input", "File input"),
          core("numeric-input", "Numeric input"),
          core("tag-input", "Tag input"),
        ],
      },
      {
        title: "Overlays",
        pages: [
          core("overlay", "Overlay"),
          core("portal", "Portal"),
          core("alert", "Alert"),
          core("context-menu", "Context menu"),
          core("dialog", "Dialog"),
          core("drawer", "Drawer"),
          core("popover", "Popover"),
          core("toast", "Toast"),
          core("tooltip", "Tooltip"),
        ],
      },
      {
        title: "Context",
        pages: [
          core("clawscale-provider", "Clawscale provider"),
          core("blueprint-provider", "Blueprint provider"),
          core("hotkeys-provider", "Hotkeys provider"),
          core("overlays-provider", "Overlays provider"),
          core("portal-provider", "Portal provider"),
        ],
      },
      {
        title: "Hooks",
        pages: [
          core("use-theme", "useTheme"),
          core("use-hotkeys", "useHotkeys"),
          core("use-overlay-stack", "useOverlayStack"),
        ],
      },
    ],
  },
  {
    id: "patterns",
    title: "Patterns",
    icon: "dashboard",
    href: "/docs/patterns/",
    meta: "Clawscale",
    groups: [
      {
        pages: [
          { title: "Metric", href: "/docs/patterns/metric/" },
          { title: "Delta", href: "/docs/patterns/delta/" },
          { title: "Sparkline", href: "/docs/patterns/sparkline/" },
          { title: "Property list", href: "/docs/patterns/property-list/" },
          { title: "Status bar", href: "/docs/patterns/status-bar/" },
          { title: "Charts", href: "/docs/patterns/charts/" },
        ],
      },
    ],
  },
  {
    id: "datetime",
    title: "Datetime",
    icon: "calendar",
    href: "/docs/datetime/",
    meta: "/datetime",
    groups: [
      {
        pages: [
          { title: "Date picker", href: "/docs/datetime/date-picker/" },
          { title: "Date input", href: "/docs/datetime/date-input/" },
          { title: "Date range picker", href: "/docs/datetime/date-range-picker/" },
          { title: "Date range input", href: "/docs/datetime/date-range-input/" },
          { title: "Time picker", href: "/docs/datetime/time-picker/" },
          { title: "Timezone select", href: "/docs/datetime/timezone-select/" },
        ],
      },
    ],
  },
  {
    id: "icons",
    title: "Icons",
    icon: "star",
    href: "/docs/icons/",
    meta: "/icons",
    groups: [
      {
        pages: [
          { title: "Icons list", href: "/docs/icons/icons-list/" },
          { title: "Loading icons", href: "/docs/icons/loading-icons/" },
        ],
      },
    ],
  },
  {
    id: "select",
    title: "Select",
    icon: "th-list",
    href: "/docs/select/",
    meta: "/select",
    groups: [
      {
        pages: [
          { title: "Select", href: "/docs/select/select-component/" },
          { title: "Suggest", href: "/docs/select/suggest/" },
          { title: "Multi select", href: "/docs/select/multi-select/" },
          { title: "Omnibar", href: "/docs/select/omnibar/" },
          { title: "Query list", href: "/docs/select/query-list/" },
        ],
      },
    ],
  },
  {
    id: "table",
    title: "Table",
    icon: "th",
    href: "/docs/table/",
    meta: "/table",
    groups: [
      {
        pages: [
          { title: "Features", href: "/docs/table/features/" },
          { title: "API", href: "/docs/table/api/" },
        ],
      },
    ],
  },
];

/** Every page in sidebar order, package overviews included. */
export function allPages(): NavPage[] {
  return nav.flatMap((pkg) => [{ title: pkg.title, href: pkg.href }, ...pkg.groups.flatMap((g) => g.pages)]);
}

/** The package that owns a path, used to highlight the active package. */
export function packageForPath(pathname: string): NavPackage | undefined {
  const normalized = pathname.endsWith("/") ? pathname : `${pathname}/`;
  return nav.find(
    (pkg) => pkg.href === normalized || pkg.groups.some((g) => g.pages.some((p) => p.href === normalized)),
  );
}
