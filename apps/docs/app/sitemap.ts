// SEO-CRITICAL: the sitemap Google reads, under the base path. Read SEO.md and ~/pensievelabs/seo/MASTER.md before changing it, then run pnpm --filter @clawscale/docs seo:check.
import type { MetadataRoute } from "next";
import { allPages } from "@/lib/nav";
import { showcases } from "@/lib/showcases";
import { site } from "@/lib/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    "/",
    "/showcase/",
    ...showcases.map((showcase) => showcase.href),
    ...allPages().map((page) => page.href),
  ];
  return paths.map((path) => ({ url: `${site.url}${path}` }));
}
