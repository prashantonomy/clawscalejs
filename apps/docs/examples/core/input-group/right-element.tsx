"use client";

import { Button, InputGroup, Tag } from "@clawscale/react";

const CONNECTION = "postgres://warehouse.internal:5432/analytics";

export default function InputGroupRightElement() {
  return (
    <>
      <InputGroup
        aria-label="Connection string"
        defaultValue={CONNECTION}
        readOnly
        rightElement={
          <Button
            aria-label="Copy connection string"
            icon="duplicate"
            variant="minimal"
            onClick={() => navigator.clipboard.writeText(CONNECTION)}
          />
        }
      />
      <InputGroup
        aria-label="Filter events"
        defaultValue="status:failed"
        leftIcon="filter"
        rightElement={<Tag minimal>1,204 events</Tag>}
      />
    </>
  );
}
