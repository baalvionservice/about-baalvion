import { Metadata } from "next";
import EcosystemClient from "./ecosystem-client";

export const metadata: Metadata = {
  title: "Baalvion Ecosystem | Platforms & Structure",
  description: "A standardized blueprint of the Baalvion Nexus, architected for transparency, scalability, and modular integration across global markets.",
  openGraph: {
    title: "Baalvion Ecosystem | Platforms & Structure",
    description: "A standardized blueprint of the Baalvion Nexus, architected for transparency, scalability, and modular integration across global markets.",
    url: 'https://baalvion.nexus/ecosystem',
    siteName: 'Baalvion Nexus',
    images: [
      {
        url: 'https://picsum.photos/seed/baalvion-ecosystem/1200/630',
        width: 1200,
        height: 630,
        alt: 'Baalvion Nexus Ecosystem',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Baalvion Ecosystem | Platforms & Structure",
    description: "A standardized blueprint of the Baalvion Nexus, architected for transparency, scalability, and modular integration across global markets.",
    images: ['https://picsum.photos/seed/baalvion-ecosystem/1200/630'],
  },
};

export default function Page() {
  return <EcosystemClient />;
}
