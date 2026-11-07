// SEO-CRITICAL: the gallery is noindex (registry noindex list). Read SEO.md and ~/pensievelabs/seo/MASTER.md before changing it, then run pnpm --filter @clawscale/docs seo:check.
import type { Metadata } from "next";
import { Gallery } from "./gallery";

export const metadata: Metadata = {
  title: "Gallery",
  description: "Every Clawscale component on one page, for visual review.",
  robots: { index: false },
};

export default function GalleryPage() {
  return <Gallery />;
}
