"use client";

import { Link } from "@clawscale/react";

export default function LinkUnderline() {
  return (
    <>
      <Link href="#always">Always underlined</Link>
      <Link underline="hover" href="#hover">
        Underlined on hover
      </Link>
      <Link underline="none" href="#none">
        Never underlined
      </Link>
    </>
  );
}
