import "./pipelines.css";
import type { Metadata } from "next";
import { PipelineConsole } from "@/components/showcase/pipelines/pipeline-console";

export const metadata: Metadata = {
  title: "Pipeline console",
  description: "A data platform console built entirely with Clawscale components.",
};

export default function PipelinesShowcasePage() {
  return <PipelineConsole />;
}
