import { Metadata } from "next";
import ContactClient from "./contact-client";

export const metadata: Metadata = {
  title: "Contact Baalvion",
  description: "Initiate a strategic partnership or project briefing. Our global trade specialists are ready to architect your integration.",
  openGraph: {
    title: "Contact Baalvion",
    description: "Initiate a strategic partnership or project briefing. Our global trade specialists are ready to architect your integration.",
    url: 'https://baalvion.nexus/contact',
    siteName: 'Baalvion Nexus',
    images: [
      {
        url: 'https://picsum.photos/seed/baalvion-contact/1200/630',
        width: 1200,
        height: 630,
        alt: 'Establish Nexus Link',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Contact Baalvion",
    description: "Initiate a strategic partnership or project briefing. Our global trade specialists are ready to architect your integration.",
    images: ['https://picsum.photos/seed/baalvion-contact/1200/630'],
  },
};

export default function Page() {
  return <ContactClient />;
}
