import { Metadata } from "next";
import ProjectsClient from "./projects-client";

export const metadata: Metadata = {
  title: "Baalvion Projects | Execution Layer",
  description: "Explore our strategic initiatives resolving terminal fragmentation in global commerce and financial clearing.",
};

export default function Page() {
  return <ProjectsClient />;
}
