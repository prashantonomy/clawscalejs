import "./showcase.css";
import type { Metadata } from "next";
import { ShowcaseIndex } from "@/components/showcase/showcase-index";

export const metadata: Metadata = {
  title: "Showcase",
  description: "Complete screens built entirely with Clawscale components.",
};

export default function ShowcasePage() {
  return <ShowcaseIndex />;
}
