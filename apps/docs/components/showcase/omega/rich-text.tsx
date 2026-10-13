"use client";

import type { ObjectId, RichText as RichTextData } from "./data";

/** Text with mentions of map objects. Each mention is a button that selects its object. */
export function RichText({ text, onSelect }: { text: RichTextData; onSelect: (id: ObjectId) => void }) {
  return text.map((part, i) =>
    typeof part === "string" ? (
      part
    ) : (
      // biome-ignore lint/suspicious/noArrayIndexKey: parts are static and never reorder.
      <button key={i} type="button" className="omega-mention" onClick={() => onSelect(part.id)}>
        {part.text}
      </button>
    ),
  );
}
