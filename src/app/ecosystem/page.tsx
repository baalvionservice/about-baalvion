import { Metadata } from "next";
import EcosystemClient from "./ecosystem-client";

export const metadata: Metadata = {
  title: "Baalvion Ecosystem | Platforms & Structure",
  description: "A standardized blueprint of the Baalvion Nexus, architected for transparency, scalability, and modular integration across global markets.",
};

export default function Page() {
  return <EcosystemClient />;
}
