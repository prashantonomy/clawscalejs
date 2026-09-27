import reactPackage from "@clawscale/react/package.json" with { type: "json" };

export const site = {
  name: "Clawscale",
  tagline: "A React UI system for data-dense software.",
  description: "Blueprint's components and principles, refined. Built for React and Next.js.",
  repoUrl: "https://github.com/prashantonomy/clawscalejs",
  branch: "main",
  version: reactPackage.version,
  blueprintVersion: reactPackage.dependencies["@blueprintjs/core"],
  basePath: process.env.NEXT_PUBLIC_BASE_PATH ?? "",
  /** Absolute URL of the deployed docs, used for the sitemap and llms.txt. */
  url: process.env.DOCS_SITE_URL ?? "https://prashantonomy.github.io/clawscalejs",
} as const;

/** GitHub URL for a file in this repository. */
export function repoFileUrl(path: string, mode: "blob" | "edit" = "blob"): string {
  return `${site.repoUrl}/${mode}/${site.branch}/${path}`;
}

/** Prefixes a site path with the deploy base path, for raw <a> and asset URLs. */
export function withBasePath(path: string): string {
  return `${site.basePath}${path}`;
}
