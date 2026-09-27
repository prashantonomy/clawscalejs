"use client";

import { Classes, EditableText, H5 } from "@clawscale/react";
import { useState } from "react";

const TABLE_NAME = /^[a-z][a-z0-9_]*$/;

export default function EditableTextIntent() {
  const [name, setName] = useState("orders daily");
  const valid = TABLE_NAME.test(name);
  return (
    <div>
      <H5>
        <EditableText intent={valid ? "success" : "danger"} value={name} onChange={setName} />
      </H5>
      <div className={Classes.TEXT_MUTED}>
        {valid ? "Valid table name" : "Use lowercase letters, digits and underscores"}
      </div>
    </div>
  );
}
