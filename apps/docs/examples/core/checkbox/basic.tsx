"use client";

import { Checkbox } from "@clawscale/react";

export default function CheckboxBasic() {
  return (
    <div>
      <Checkbox defaultChecked label="Retry failed tasks" />
      <Checkbox label="Notify owners on failure" />
      <Checkbox defaultChecked label="Skip weekends" />
    </div>
  );
}
