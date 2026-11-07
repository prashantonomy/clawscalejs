import "./showcase.css";
import type { Metadata } from "next";
import { ShowcaseIndex } from "@/components/showcase/showcase-index";

export const metadata: Metadata = {
  title: "Showcase",
  description:
    "Complete screens built entirely with Clawscale components, with realistic data. Every name, place and number is fictional.",
};

export default function ShowcasePage() {
  return <ShowcaseIndex />;
}
