// SEO-CRITICAL: sets the title pattern, canonical, Open Graph and site name of every page. Read SEO.md and
// ~/pensievelabs/seo/MASTER.md before changing it, then run pnpm --filter @clawscale/docs seo:check.
import "@clawscale/react/styles.css";
import "@clawscale/react/themes/beak.css";
import "@clawscale/react/themes/ledger.css";
import "@clawscale/react/fonts.css";
import "./globals.css";
import { ThemeScript } from "@clawscale/react";
import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { site } from "@/lib/site";
import { Providers } from "./providers";

/**
 * Every page inherits a self canonical and Open Graph URL. Next.js resolves "./" against the page's
 * route and appends it to the path of metadataBase, so both follow DOCS_SITE_URL and its base path.
 * og:title, og:description and the twitter tags take the page's own title and description.
 * A page title is the page's own name with no brand suffix (MASTER.md section 4). The home page
 * sets its own title and publishes the JSON-LD (app/page.tsx).
 */
export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Clawscale",
    template: "%s",
  },
  description: "A React UI system for data-dense software. Built on Blueprint.",
  icons: { icon: `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/favicon.svg` },
  alternates: { canonical: "./" },
  openGraph: { type: "website", siteName: site.name, url: "./" },
  twitter: { card: "summary" },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F4F5F7" },
    { media: "(prefers-color-scheme: dark)", color: "#0F1013" },
  ],
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <ThemeScript />
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
