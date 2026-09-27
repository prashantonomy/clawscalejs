"use client";

import { Checkbox } from "@clawscale/react";

export default function CheckboxDisabled() {
  return (
    <div>
      <Checkbox defaultChecked disabled label="Encrypt at rest (required by policy)" />
      <Checkbox disabled label="Allow public read access" />
      <Checkbox disabled indeterminate label="Apply to 3 of 8 buckets" />
    </div>
  );
}
