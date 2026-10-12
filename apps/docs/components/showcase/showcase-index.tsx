"use client";

import { Button, Icon, Navbar, NavbarDivider, NavbarGroup, Tag, useTheme } from "@clawscale/react";
import { Classes } from "@clawscale/react/common";
import Link from "next/link";
import type { ComponentType } from "react";
import { LogoMark } from "@/components/docs/logo";
import { ThemePicker } from "@/components/docs/theme-picker";
import { showcases } from "@/lib/showcases";
import { site } from "@/lib/site";
import { PipelinesPreview } from "./previews";

const previews: Record<string, ComponentType> = {
  pipelines: PipelinesPreview,
};

const navLink = `${Classes.BUTTON} ${Classes.MINIMAL}`;

/** The list of showcases, one card each, with a live preview that follows the theme. */
export function ShowcaseIndex() {
  const { resolvedColorScheme, setColorScheme } = useTheme();
  return (
    <div className="showcase-index">
      <Navbar className="showcase-index-navbar">
        <NavbarGroup>
          <Link href="/" className="showcase-index-brand" aria-label="Clawscale home">
            <LogoMark size={24} />
            <span>Clawscale</span>
          </Link>
          <NavbarDivider />
          <Link href="/docs/" className={navLink}>
            <span className={Classes.BUTTON_TEXT}>Documentation</span>
          </Link>
          <Link href="/showcase/" className={`${navLink} ${Classes.ACTIVE}`} aria-current="page">
            <span className={Classes.BUTTON_TEXT}>Showcase</span>
          </Link>
        </NavbarGroup>
        <NavbarGroup align="end">
          <a href={site.repoUrl} target="_blank" rel="noreferrer" className={navLink}>
            <span className={Classes.BUTTON_TEXT}>GitHub</span>
          </a>
          <ThemePicker />
          <Button
            variant="minimal"
            aria-label="Toggle dark mode"
            onClick={() => setColorScheme(resolvedColorScheme === "dark" ? "light" : "dark")}
          >
            <Icon icon="moon" className="scheme-show-light" />
            <Icon icon="flash" className="scheme-show-dark" />
          </Button>
        </NavbarGroup>
      </Navbar>

      <main className="showcase-index-main">
        <header className="showcase-index-header">
          <h1>Showcase</h1>
          <p>
            Complete screens built only with Clawscale components. Each one works in every theme, accent and color
            scheme, so switch them from the navbar and open a screen.
          </p>
        </header>
        <ul className="showcase-index-grid">
          {showcases.map((showcase) => {
            const Preview = previews[showcase.slug];
            return (
              <li
                key={showcase.slug}
                className={`${Classes.CARD} ${Classes.ELEVATION_0} ${Classes.INTERACTIVE} showcase-index-card`}
              >
                <div className="showcase-index-preview">{Preview && <Preview />}</div>
                <div className="showcase-index-body">
                  <div className="showcase-index-title">
                    <h2>
                      <Link href={showcase.href} className="showcase-index-link">
                        {showcase.title}
                      </Link>
                    </h2>
                    <Tag minimal>{showcase.domain}</Tag>
                  </div>
                  <p>{showcase.description}</p>
                  <p className="showcase-index-highlights">Built with {showcase.highlights.join(", ")}.</p>
                </div>
              </li>
            );
          })}
        </ul>
      </main>
    </div>
  );
}
