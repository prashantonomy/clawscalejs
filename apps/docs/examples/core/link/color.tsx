"use client";

import { Classes, Link } from "@clawscale/react";

export default function LinkColor() {
  return (
    <>
      <Link href="#dataset">View dataset</Link>
      <Link color="success" href="#checks">
        12 checks passed
      </Link>
      <Link color="warning" href="#warnings">
        2 warnings
      </Link>
      <Link color="danger" href="#rejected">
        424 rows rejected
      </Link>
      <span className={Classes.TEXT_MUTED}>
        Owned by{" "}
        <Link color="inherit" href="#team">
          data-platform
        </Link>
      </span>
    </>
  );
}
