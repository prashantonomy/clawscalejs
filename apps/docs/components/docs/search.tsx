"use client";

import { MenuItem } from "@clawscale/react";
import { type ItemPredicate, type ItemRenderer, Omnibar } from "@clawscale/react/select";
import { useRouter } from "next/navigation";
import { useMemo } from "react";
import index from "@/generated/docs-index.json" with { type: "json" };
import { nav } from "@/lib/nav";

interface SearchItem {
  id: string;
  title: string;
  href: string;
  context: string;
}

function buildItems(): SearchItem[] {
  const packageFor = new Map<string, string>();
  for (const pkg of nav) {
    packageFor.set(pkg.href, pkg.title);
    for (const group of pkg.groups) for (const page of group.pages) packageFor.set(page.href, pkg.title);
  }
  return index.flatMap((page) => [
    { id: page.href, title: page.title, href: page.href, context: packageFor.get(page.href) ?? "" },
    ...page.headings.map((heading) => ({
      id: `${page.href}#${heading.id}`,
      title: heading.text,
      href: `${page.href}#${heading.id}`,
      context: page.title,
    })),
  ]);
}

/** Lower is better. Pages rank above headings; headings match on their own text only. */
export function rank(item: SearchItem, query: string): number {
  const q = query.toLowerCase().trim();
  const title = item.title.toLowerCase();
  const offset = item.href.includes("#") ? 3 : 0;
  if (title === q) return offset;
  if (title.startsWith(q)) return offset + 1;
  if (title.includes(q)) return offset + 2;
  if (!offset && item.context.toLowerCase().includes(q)) return 6;
  return -1;
}

const filterItem: ItemPredicate<SearchItem> = (query, item) => rank(item, query) >= 0;

const renderItem: ItemRenderer<SearchItem> = (item, { handleClick, handleFocus, modifiers }) => {
  if (!modifiers.matchesPredicate) return null;
  return (
    <MenuItem
      key={item.id}
      active={modifiers.active}
      icon={item.href.includes("#") ? "header-two" : "document"}
      label={item.context}
      onClick={handleClick}
      onFocus={handleFocus}
      roleStructure="listoption"
      text={item.title}
    />
  );
};

export function Search({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const router = useRouter();
  const items = useMemo(buildItems, []);
  return (
    <Omnibar<SearchItem>
      isOpen={isOpen}
      items={items}
      itemPredicate={filterItem}
      itemRenderer={renderItem}
      inputProps={{ placeholder: "Search components, guides and headings" }}
      itemListPredicate={(query, list) =>
        query.trim() === ""
          ? list.filter((item) => !item.href.includes("#")).slice(0, 12)
          : list
              .map((item, index) => ({ item, index, score: rank(item, query) }))
              .filter(({ score }) => score >= 0)
              .sort((a, b) => a.score - b.score || a.index - b.index)
              .slice(0, 40)
              .map(({ item }) => item)
      }
      noResults={<MenuItem disabled text="No results." roleStructure="listoption" />}
      onClose={onClose}
      onItemSelect={(item) => {
        onClose();
        router.push(item.href);
      }}
      resetOnSelect
    />
  );
}
