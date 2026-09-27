import "./showcase.css";
import type { Metadata } from "next";
import { Showcase } from "@/components/showcase/showcase";

export const metadata: Metadata = {
  title: "Showcase",
  description: "A data platform console built entirely with Clawscale components.",
};

export default function ShowcasePage() {
  return <Showcase />;
}
