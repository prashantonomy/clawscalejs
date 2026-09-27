import "@clawscale/react/styles.css";
import "@clawscale/react/fonts.css";
import "./globals.css";
import { ThemeScript } from "@clawscale/react";
import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Providers } from "./providers";

export const metadata: Metadata = {
  title: {
    default: "Clawscale",
    template: "%s | Clawscale",
  },
  description: "A React UI system for data-dense software. Built on Blueprint.",
  icons: { icon: `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/favicon.svg` },
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
