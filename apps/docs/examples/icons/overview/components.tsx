"use client";

import { Button, Tag } from "@clawscale/react";
import { CloudUploadIcon, DatabaseIcon, GitBranchIcon } from "@clawscale/react/icons";

export default function IconsComponents() {
  return (
    <>
      <DatabaseIcon />
      <CloudUploadIcon size={20} color="var(--cs-color-primary)" />
      <Button icon={<GitBranchIcon />} text="Create branch" />
      <Tag minimal icon={<DatabaseIcon />}>
        warehouse-prod
      </Tag>
    </>
  );
}
