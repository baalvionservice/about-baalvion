import { Metadata } from "next";
import ProjectsClient from "./projects-client";

export const metadata: Metadata = {
  title: "Baalvion Projects | Execution Layer",
  description: "Explore our strategic initiatives resolving terminal fragmentation in global commerce and financial clearing.",
  openGraph: {
    title: "Baalvion Projects | Execution Layer",
    description: "Explore our strategic initiatives resolving terminal fragmentation in global commerce and financial clearing.",
    url: 'https://baalvion.nexus/projects',
    siteName: 'Baalvion Nexus',
    images: [
      {
        url: 'https://picsum.photos/seed/baalvion-projects/1200/630',
        width: 1200,
        height: 630,
        alt: 'Baalvion Strategic Portfolio',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Baalvion Projects | Execution Layer",
    description: "Explore our strategic initiatives resolving terminal fragmentation in global commerce and financial clearing.",
    images: ['https://picsum.photos/seed/baalvion-projects/1200/630'],
  },
};

export default function Page() {
  return <ProjectsClient />;
}
