import { db } from "@/lib/db";
import { Metadata } from "next";
import ProjectDetailClient from "./project-detail-client";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const project = db.projects.getById(id);
  
  return {
    title: project ? `${project.name} | Baalvion Project` : "Project Brief",
    description: project?.description || "Explore strategic infrastructure initiatives within the Baalvion Nexus.",
    openGraph: {
      title: project ? `${project.name} | Baalvion Project` : "Project Brief",
      description: project?.description || "Explore strategic infrastructure initiatives within the Baalvion Nexus.",
    }
  };
}

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <ProjectDetailClient id={id} />;
}
