"use client";

import { Icon, Tag } from "@clawscale/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import index from "@/generated/docs-index.json" with { type: "json" };
import { type NavPackage, type NavPage, nav, packageForPath } from "@/lib/nav";
import { site } from "@/lib/site";
import { LogoMark } from "./logo";

function normalize(path: string): string {
  return path.endsWith("/") ? path : `${path}/`;
}

function PageHeadings({ href }: { href: string }) {
  const entry = index.find((page) => page.href === href);
  if (!entry || entry.headings.length === 0) return null;
  return (
    <ul className="docs-nav-headings">
      {entry.headings.map((heading) => (
        <li key={heading.id} data-depth={heading.depth}>
          <a className="docs-nav-heading" href={`#${heading.id}`}>
            {heading.text}
          </a>
        </li>
      ))}
    </ul>
  );
}

function NavItem({ page, pathname, onNavigate }: { page: NavPage; pathname: string; onNavigate?: () => void }) {
  const active = pathname === page.href;
  return (
    <li>
      <Link
        aria-current={active ? "page" : undefined}
        className="docs-nav-item"
        data-active={active || undefined}
        href={page.href}
        onClick={onNavigate}
      >
        <span className="docs-nav-item-title">{page.title}</span>
        {page.badge && (
          <Tag minimal intent={page.badge === "new" ? "success" : "danger"} className="docs-nav-badge">
            {page.badge}
          </Tag>
        )}
      </Link>
      {active && <PageHeadings href={page.href} />}
    </li>
  );
}

function NavPackageSection({
  pkg,
  pathname,
  expanded,
  onNavigate,
}: {
  pkg: NavPackage;
  pathname: string;
  expanded: boolean;
  onNavigate?: () => void;
}) {
  const active = pathname === pkg.href;
  return (
    <li className="docs-nav-package" data-expanded={expanded || undefined}>
      <Link
        aria-current={active ? "page" : undefined}
        className="docs-nav-package-link"
        data-active={active || undefined}
        href={pkg.href}
        onClick={onNavigate}
      >
        <span className="docs-nav-package-icon">
          <Icon icon={pkg.icon} size={12} />
        </span>
        <span className="docs-nav-package-title">{pkg.title}</span>
        {pkg.meta && <span className="docs-nav-package-meta">{pkg.meta}</span>}
      </Link>
      {active && <PageHeadings href={pkg.href} />}
      {expanded && (
        <ul className="docs-nav-groups">
          {pkg.groups.map((group, i) => (
            <li key={group.title ?? i}>
              {group.title && <div className="docs-nav-section">{group.title}</div>}
              <ul className="docs-nav-pages">
                {group.pages.map((page) => (
                  <NavItem key={page.href} page={page} pathname={pathname} onNavigate={onNavigate} />
                ))}
              </ul>
            </li>
          ))}
        </ul>
      )}
    </li>
  );
}

export interface SidebarProps {
  theme: string;
  resolvedColorScheme: "light" | "dark";
  onToggleTheme: () => void;
  onToggleColorScheme: () => void;
  onSearch: () => void;
  /** Called after a link is followed, to close the mobile drawer. */
  onNavigate?: () => void;
}

export function Sidebar({
  theme,
  resolvedColorScheme,
  onToggleTheme,
  onToggleColorScheme,
  onSearch,
  onNavigate,
}: SidebarProps) {
  const pathname = normalize(usePathname() ?? "/");
  const activePackage = packageForPath(pathname)?.id ?? "clawscale";

  return (
    <div className="docs-sidebar-inner">
      <div className="docs-brand">
        <Link href="/" className="docs-brand-mark" aria-label="Clawscale home" onClick={onNavigate}>
          <LogoMark size={40} />
        </Link>
        <div className="docs-brand-text">
          <div className="docs-brand-row">
            <Link href="/" className="docs-brand-name" onClick={onNavigate}>
              Clawscale
            </Link>
            <Tag minimal round className="docs-brand-version">
              v{site.version}
            </Tag>
          </div>
          <a className="docs-brand-link" href={site.repoUrl} target="_blank" rel="noreferrer">
            View on GitHub
          </a>
        </div>
      </div>

      <div className="docs-sidebar-actions">
        {/* Both variants render. CSS shows the right one from the attributes on <html>, so the first paint is correct. */}
        <button
          type="button"
          className="docs-sidebar-action"
          onClick={onToggleColorScheme}
          aria-label={resolvedColorScheme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
        >
          <Icon icon="moon" className="scheme-show-light" />
          <Icon icon="flash" className="scheme-show-dark" />
          <span className="docs-sidebar-action-label">
            <span className="scheme-show-light">Dark mode</span>
            <span className="scheme-show-dark">Light mode</span>
          </span>
          <kbd className="docs-hint">⇧D</kbd>
        </button>
        <button
          type="button"
          className="docs-sidebar-action"
          onClick={onToggleTheme}
          aria-label={theme === "futuristic" ? "Switch to the default theme" : "Switch to the futuristic theme"}
        >
          <Icon icon="rocket-slant" className="theme-show-default" />
          <Icon icon="style" className="theme-show-futuristic" />
          <span className="docs-sidebar-action-label">
            <span className="theme-show-default">Futuristic theme</span>
            <span className="theme-show-futuristic">Default theme</span>
          </span>
          <kbd className="docs-hint">⇧T</kbd>
        </button>
        <button type="button" className="docs-sidebar-action" onClick={onSearch}>
          <Icon icon="search" />
          <span className="docs-sidebar-action-label">Search...</span>
          <kbd className="docs-hint">⇧S</kbd>
        </button>
      </div>

      <nav className="docs-nav" aria-label="Documentation">
        <ul className="docs-nav-packages">
          {nav.map((pkg) => (
            <NavPackageSection
              key={pkg.id}
              pkg={pkg}
              pathname={pathname}
              expanded={pkg.id === activePackage}
              onNavigate={onNavigate}
            />
          ))}
        </ul>
      </nav>
    </div>
  );
}
