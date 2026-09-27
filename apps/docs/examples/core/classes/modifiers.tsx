"use client";

import { Classes } from "@clawscale/react";

const card = { display: "grid", gap: 6, width: 300 };

export default function ClassesModifiers() {
  return (
    <>
      <div className={`${Classes.CARD} ${Classes.ELEVATION_2}`} style={card}>
        <h5 className={Classes.HEADING}>orders-daily</h5>
        <div className={Classes.TEXT_MUTED}>Finished 6 min ago in eu-west-1</div>
        <div>1,284,093 rows exported</div>
      </div>
      <div className={`${Classes.CARD} ${Classes.ELEVATION_2}`} style={card}>
        <h5 className={`${Classes.HEADING} ${Classes.SKELETON}`}>orders-hourly</h5>
        <div className={Classes.SKELETON}>Finished 2 min ago in eu-west-1</div>
        <div className={Classes.SKELETON}>84,120 rows exported</div>
      </div>
    </>
  );
}
