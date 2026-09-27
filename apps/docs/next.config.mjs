import createMDX from "@next/mdx";

/** Set by the docs deploy workflow, for example "/clawscale" on GitHub Pages. */
const basePath = process.env.DOCS_BASE_PATH ?? "";

/** @type {import("next").NextConfig} */
const nextConfig = {
  output: "export",
  basePath,
  trailingSlash: true,
  images: { unoptimized: true },
  pageExtensions: ["ts", "tsx", "mdx"],
  reactStrictMode: true,
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
};

// Plugins are passed by name so Turbopack can load them.
const withMDX = createMDX({
  options: {
    remarkPlugins: ["remark-gfm"],
    rehypePlugins: ["rehype-slug"],
  },
});

export default withMDX(nextConfig);
