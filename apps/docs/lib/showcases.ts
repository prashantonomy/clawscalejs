/**
 * Showcases: complete screens built only with Clawscale components.
 * The /showcase/ index, the sitemap and the end-to-end page lists read this list.
 * Every entry needs a page at app<href>page.tsx.
 */

export interface Showcase {
  /** Folder under app/showcase/ and components/showcase/. */
  slug: string;
  title: string;
  /** What the screen is, in one sentence. */
  description: string;
  href: string;
  /** The kind of software, shown as a tag. */
  domain: string;
  /** Components the screen leans on. */
  highlights: string[];
}

export const showcases: Showcase[] = [
  {
    slug: "pipelines",
    title: "Pipeline console",
    description:
      "A data platform console: pipeline health, throughput charts, a table with a frozen column and an inspector.",
    href: "/showcase/pipelines/",
    domain: "Data platform",
    highlights: ["Table", "Metric", "Sparkline", "Tree", "PropertyList", "StatusBar"],
  },
];
