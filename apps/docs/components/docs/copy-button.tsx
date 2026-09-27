"use client";

import { Button, Tooltip } from "@clawscale/react";
import { useEffect, useState } from "react";

export function CopyButton({ text, label = "Copy code" }: { text: string; label?: string }) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const timer = setTimeout(() => setCopied(false), 1500);
    return () => clearTimeout(timer);
  }, [copied]);

  return (
    <Tooltip content={copied ? "Copied" : label} placement="top" compact>
      <Button
        aria-label={label}
        className="docs-icon-button"
        icon={copied ? "tick" : "duplicate"}
        size="small"
        variant="minimal"
        onClick={() => {
          void navigator.clipboard.writeText(text).then(() => setCopied(true));
        }}
      />
    </Tooltip>
  );
}
