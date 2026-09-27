"use client";

import { Classes } from "@clawscale/react";

export default function TypographyRunningText() {
  return (
    <div className={Classes.RUNNING_TEXT}>
      <p>
        Raw events stay in <code>events_raw</code> for 30 days before the nightly rollup.
      </p>
      <ul>
        <li>Hourly rollups keep 13 months of history.</li>
        <li>Deleted tenants are purged within 72 hours.</li>
      </ul>
      <blockquote>Restores from cold storage take up to 4 hours.</blockquote>
    </div>
  );
}
