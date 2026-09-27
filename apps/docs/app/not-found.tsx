import { AnchorButton, NonIdealState } from "@clawscale/react";
import { withBasePath } from "@/lib/site";

export default function NotFound() {
  return (
    <main className="docs-not-found">
      <NonIdealState
        icon="search"
        title="Page not found"
        description="The page moved or never existed."
        action={<AnchorButton href={withBasePath("/docs/")} intent="primary" text="Go to the docs" />}
      />
    </main>
  );
}
