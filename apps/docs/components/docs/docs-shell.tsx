"use client";

import { Button, Drawer, useHotkeys, useTheme } from "@clawscale/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { type ReactNode, useCallback, useMemo, useState } from "react";
import { repoFileUrl } from "@/lib/site";
import { LogoMark } from "./logo";
import { Search } from "./search";
import { Sidebar } from "./sidebar";

function EditLink() {
  const pathname = usePathname() ?? "/docs/";
  const route = pathname.endsWith("/") ? pathname : `${pathname}/`;
  return (
    <a
      className="docs-edit-link"
      href={repoFileUrl(`apps/docs/app${route}page.mdx`, "edit")}
      target="_blank"
      rel="noreferrer"
    >
      <Button icon="edit" size="small" variant="minimal" tabIndex={-1} text="Edit this page" />
    </a>
  );
}

/** Sidebar, mobile drawer, search and global hotkeys around every docs page. */
export function DocsShell({ children }: { children: ReactNode }) {
  const { resolvedTheme, setTheme } = useTheme();
  const [searchOpen, setSearchOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleTheme = useCallback(
    () => setTheme(resolvedTheme === "dark" ? "light" : "dark"),
    [resolvedTheme, setTheme],
  );
  const openSearch = useCallback(() => setSearchOpen(true), []);

  const hotkeys = useMemo(
    () => [
      { combo: "shift+d", global: true, label: "Toggle dark theme", onKeyDown: toggleTheme },
      { combo: "shift+s", global: true, label: "Search the docs", onKeyDown: openSearch, preventDefault: true },
      { combo: "mod+k", global: true, label: "Search the docs", onKeyDown: openSearch, preventDefault: true },
    ],
    [toggleTheme, openSearch],
  );
  useHotkeys(hotkeys);

  const sidebarProps = { resolvedTheme, onToggleTheme: toggleTheme, onSearch: openSearch };

  return (
    <div className="docs-shell">
      <header className="docs-mobile-bar">
        <Link href="/" className="docs-mobile-brand">
          <LogoMark size={28} />
          <span>Clawscale</span>
        </Link>
        <Button icon="search" variant="minimal" aria-label="Search" onClick={openSearch} />
        <Button icon="menu" variant="minimal" aria-label="Open navigation" onClick={() => setMenuOpen(true)} />
      </header>
      <aside className="docs-sidebar">
        <Sidebar {...sidebarProps} />
      </aside>
      <Drawer
        className="docs-mobile-drawer"
        isOpen={menuOpen}
        onClose={() => setMenuOpen(false)}
        position="left"
        size="min(320px, 88vw)"
        title="Navigation"
      >
        <Sidebar {...sidebarProps} onNavigate={() => setMenuOpen(false)} />
      </Drawer>
      <main className="docs-main" id="main">
        <div className="docs-page">
          <EditLink />
          <article className="docs-content">{children}</article>
        </div>
      </main>
      <Search isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </div>
  );
}
