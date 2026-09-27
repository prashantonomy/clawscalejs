"use client";

import { Link } from "@clawscale/react";

export default function LinkBasic() {
  return (
    <>
      <Link href="#run-log">Open run log</Link>
      <Link href="https://github.com/prashantonomy/clawscalejs" target="_blank" rel="noreferrer">
        Source on GitHub
      </Link>
    </>
  );
}
