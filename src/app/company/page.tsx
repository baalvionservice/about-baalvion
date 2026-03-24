import { Metadata } from "next";
import CompanyClient from "./company-client";

export const metadata: Metadata = {
  title: "About Baalvion | Company Overview",
  description: "Learn about Baalvion Industries, the architect of unified global trade infrastructure for the next century of international commerce.",
  openGraph: {
    title: "About Baalvion | Company Overview",
    description: "Learn about Baalvion Industries, the architect of unified global trade infrastructure for the next century of international commerce.",
    url: 'https://baalvion.nexus/company',
    siteName: 'Baalvion Nexus',
    images: [
      {
        url: 'https://picsum.photos/seed/baalvion-company/1200/630',
        width: 1200,
        height: 630,
        alt: 'Baalvion Industries Company',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "About Baalvion | Company Overview",
    description: "Learn about Baalvion Industries, the architect of unified global trade infrastructure for the next century of international commerce.",
    images: ['https://picsum.photos/seed/baalvion-company/1200/630'],
  },
};

export default function Page() {
  return <CompanyClient />;
}
