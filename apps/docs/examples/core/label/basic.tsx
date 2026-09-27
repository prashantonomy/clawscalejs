"use client";

import { Classes, HTMLSelect, Label } from "@clawscale/react";

export default function LabelBasic() {
  return (
    <div style={{ width: 280 }}>
      <Label>
        Dataset
        <input className={Classes.INPUT} placeholder="warehouse.orders_daily" />
      </Label>
      <Label>
        Retention <span className={Classes.TEXT_MUTED}>(days)</span>
        <HTMLSelect defaultValue={90} options={[7, 30, 90, 365]} />
      </Label>
    </div>
  );
}
