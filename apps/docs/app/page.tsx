// SEO-CRITICAL: the home page title, description and JSON-LD (company, WebSite, project). Read SEO.md and
// ~/pensievelabs/seo/MASTER.md before changing it, then run pnpm --filter @clawscale/docs seo:check.
import "./landing.css";
import { Classes } from "@clawscale/react/common";
import type { Metadata } from "next";
import Link from "next/link";
import { LogoMark } from "@/components/docs/logo";
import { ThemePicker } from "@/components/docs/theme-picker";
import { Wireframes } from "@/components/landing/wireframes";
import { site } from "@/lib/site";
import registry from "@/seo/registry.json" with { type: "json" };

const description =
  "Clawscale (clawscalejs) is an open source React UI system for data-dense software, built on Blueprint and made by Pensieve Labs.";

export const metadata: Metadata = {
  title: { absolute: "Clawscale: a React UI system for data-dense software" },
  description,
};

const property = registry.properties.find((p) => p.id === "clawscale");
const organization = registry.organization;

/**
 * schema.org JSON-LD for the home page only: the company node in full (registry values, never retyped),
 * this site's WebSite node and the project. Other pages carry no JSON-LD.
 */
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    organization,
    {
      "@type": "WebSite",
      "@id": `${site.url}/#website`,
      name: property?.name,
      alternateName: property?.alternateName,
      url: `${site.url}/`,
      publisher: { "@id": organization["@id"] },
    },
    {
      "@type": "SoftwareSourceCode",
      "@id": `${site.url}/#software`,
      name: site.name,
      description,
      url: `${site.url}/`,
      codeRepository: site.repoUrl,
      license: "https://www.apache.org/licenses/LICENSE-2.0",
      programmingLanguage: "TypeScript",
      runtimePlatform: "React",
      version: site.version,
      publisher: { "@id": organization["@id"] },
    },
  ],
};

export default function Home() {
  return (
    <div className="landing">
      <script
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: static JSON built from seo/registry.json and lib/site.ts, with "<" escaped.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <main className="landing-hero">
        <Wireframes />
        <div className="landing-center">
          <LogoMark size={64} className="landing-logo" />
          <h1 className="landing-title">Clawscale</h1>
          <p className="landing-tagline">{site.tagline}</p>
          <p className="landing-subtitle">{site.description}</p>
          <nav className="landing-links" aria-label="Primary">
            <Link href="/docs/">Documentation</Link>
            <span className="landing-separator" aria-hidden="true" />
            <Link href="/showcase/">Showcase</Link>
            <span className="landing-separator" aria-hidden="true" />
            <a href={site.repoUrl} target="_blank" rel="noreferrer">
              GitHub
            </a>
          </nav>
          {/* The hero is always dark, so the theme button is too, whatever the color scheme. */}
          <div className={`landing-theme ${Classes.DARK}`} data-cs-color-scheme="dark">
            <ThemePicker placement="bottom" />
          </div>
        </div>
      </main>
      <footer className="landing-footer">
        <LogoMark size={40} />
        <p>
          Clawscale is an open source project by{" "}
          <a href="https://pensievelabs.org/" target="_blank" rel="noreferrer">
            Pensieve Labs
          </a>
          , built on{" "}
          <a href="https://blueprintjs.com" target="_blank" rel="noreferrer">
            Blueprint
          </a>{" "}
          by Palantir.
        </p>
        <p>
          Part of{" "}
          <a href="https://pensievelabs.org/open-source" target="_blank" rel="noreferrer">
            Pensieve open source
          </a>
          .
        </p>
        <p className="landing-footnote">Version {site.version}. Apache 2.0 license.</p>
        <span className="landing-rule" aria-hidden="true" />
      </footer>
    </div>
  );
}
