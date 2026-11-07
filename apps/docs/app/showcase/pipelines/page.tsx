import "./pipelines.css";
import type { Metadata } from "next";
import { PipelineConsole } from "@/components/showcase/pipelines/pipeline-console";

export const metadata: Metadata = {
  title: "Pipeline console",
  description:
    "A data platform console built entirely with Clawscale components: pipeline health, throughput charts, a frozen column table and an inspector.",
};

export default function PipelinesShowcasePage() {
  return <PipelineConsole />;
}
