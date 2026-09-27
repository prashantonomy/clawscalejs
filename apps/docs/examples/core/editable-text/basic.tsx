"use client";

import { Classes, EditableText, H4 } from "@clawscale/react";
import { useState } from "react";

const INITIAL_NAME = "Revenue by region";

export default function EditableTextBasic() {
  const [saved, setSaved] = useState(INITIAL_NAME);
  return (
    <div>
      <H4>
        <EditableText
          defaultValue={INITIAL_NAME}
          maxLength={60}
          placeholder="Name this dashboard"
          onConfirm={setSaved}
        />
      </H4>
      <div className={Classes.TEXT_MUTED}>Saved name: {saved}</div>
    </div>
  );
}
