// SEO-CRITICAL: the 404 page drops the canonical. Read SEO.md and ~/pensievelabs/seo/MASTER.md before changing it, then run pnpm --filter @clawscale/docs seo:check.
import { AnchorButton, NonIdealState } from "@clawscale/react";
import type { Metadata } from "next";
import { withBasePath } from "@/lib/site";

/** The 404 page has no URL of its own, so it drops the self canonical and Open Graph URL from the root layout. */
export const metadata: Metadata = { alternates: { canonical: null }, openGraph: null, twitter: null };

export default function NotFound() {
  return (
    <main className="docs-not-found">
      <NonIdealState
        icon="search"
        title="Page not found"
        description="The page moved or never existed."
        action={<AnchorButton href={withBasePath("/docs/")} intent="primary" text="Go to the docs" />}
      />
    </main>
  );
}
