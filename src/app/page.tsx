import { Metadata } from "next";
import HomePageClient from "./home-page-client";

export const metadata: Metadata = {
  title: "Baalvion — Global Trade Infrastructure Platform",
  description: "Baalvion builds global trade infrastructure connecting businesses, finance, compliance, and intelligence into one unified platform.",
  openGraph: {
    title: "Baalvion — Global Trade Infrastructure Platform",
    description: "Baalvion builds global trade infrastructure connecting businesses, finance, compliance, and intelligence into one unified platform.",
    url: 'https://baalvion.nexus',
    siteName: 'Baalvion Nexus',
    images: [
      {
        url: 'https://picsum.photos/seed/baalvion-home/1200/630',
        width: 1200,
        height: 630,
        alt: 'Baalvion Nexus Home',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Baalvion — Global Trade Infrastructure Platform",
    description: "Baalvion builds global trade infrastructure connecting businesses, finance, compliance, and intelligence into one unified platform.",
    images: ['https://picsum.photos/seed/baalvion-home/1200/630'],
  },
};

export default function Page() {
  return <HomePageClient />;
}
