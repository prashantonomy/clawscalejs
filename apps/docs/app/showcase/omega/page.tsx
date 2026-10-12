import "./omega.css";
import type { Metadata } from "next";
import { Omega } from "@/components/showcase/omega/omega";

export const metadata: Metadata = {
  title: "Omega",
  description:
    "A defense analysis workspace built entirely with Clawscale components. Every name and place is fictional.",
};

export default function OmegaShowcasePage() {
  return <Omega />;
}
