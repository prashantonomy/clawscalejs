import type { MetadataRoute } from "next";
import { allPages } from "@/lib/nav";
import { site } from "@/lib/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["/", "/showcase/", ...allPages().map((page) => page.href)];
  return paths.map((path) => ({ url: `${site.url}${path}` }));
}
