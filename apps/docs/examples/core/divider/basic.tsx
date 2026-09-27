"use client";

import { Divider } from "@clawscale/react";

export default function DividerBasic() {
  return (
    <div className="cs-numeric" style={{ width: "100%", maxWidth: 320 }}>
      <div>Rows scanned: 1,204,331</div>
      <Divider />
      <div>Rows written: 1,203,907</div>
      <Divider />
      <div>Rows rejected: 424</div>
    </div>
  );
}
