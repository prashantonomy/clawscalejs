"use client";

import { Checkbox } from "@clawscale/react";

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export default function CheckboxInline() {
  return (
    <div>
      {DAYS.map((day, index) => (
        <Checkbox key={day} defaultChecked={index < 5} inline label={day} />
      ))}
    </div>
  );
}
