"use client";

import { OL, UL } from "@clawscale/react";

export default function HtmlLists() {
  return (
    <>
      <UL>
        <li>us-east-1</li>
        <li>eu-west-1</li>
        <li>ap-southeast-2</li>
      </UL>
      <OL>
        <li>Extract orders from the source database</li>
        <li>Remove duplicates by order ID</li>
        <li>Load into orders_daily</li>
      </OL>
    </>
  );
}
