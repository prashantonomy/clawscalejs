import "./landing.css";
import type { Metadata } from "next";
import Link from "next/link";
import { LogoMark } from "@/components/docs/logo";
import { Wireframes } from "@/components/landing/wireframes";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: "Clawscale: a React UI system for data-dense software" },
};

export default function Home() {
  return (
    <div className="landing">
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
        </div>
      </main>
      <footer className="landing-footer">
        <LogoMark size={40} />
        <p>
          Clawscale is an open source project built on{" "}
          <a href="https://blueprintjs.com" target="_blank" rel="noreferrer">
            Blueprint
          </a>{" "}
          by Palantir.
        </p>
        <p className="landing-footnote">Version {site.version}. Apache 2.0 license.</p>
        <span className="landing-rule" aria-hidden="true" />
      </footer>
    </div>
  );
}
