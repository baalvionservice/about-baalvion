import { Metadata } from "next";
import PlatformClient from "./platform-client";

export const metadata: Metadata = {
  title: "Baalvion Platform | How It Works",
  description: "Explore the technology and strategic protocols behind the Baalvion Nexus Core.",
  openGraph: {
    title: "Baalvion Platform | How It Works",
    description: "Explore the technology and strategic protocols behind the Baalvion Nexus Core.",
    url: 'https://baalvion.nexus/platform',
    siteName: 'Baalvion Nexus',
    images: [
      {
        url: 'https://picsum.photos/seed/baalvion-platform/1200/630',
        width: 1200,
        height: 630,
        alt: 'Baalvion Nexus Platform',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Baalvion Platform | How It Works",
    description: "Explore the technology and strategic protocols behind the Baalvion Nexus Core.",
    images: ['https://picsum.photos/seed/baalvion-platform/1200/630'],
  },
};

export default function Page() {
  return <PlatformClient />;
}
