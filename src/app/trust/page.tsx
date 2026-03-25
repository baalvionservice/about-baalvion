import { Metadata } from "next";
import TrustClient from "./trust-client";

export const metadata: Metadata = {
  title: "Trust & Security | Baalvion",
  description:
    "Security, transparency, and international law are at the core of the Baalvion Nexus infrastructure.",
  openGraph: {
    title: "Trust & Security | Baalvion",
    description:
      "Security, transparency, and international law are at the core of the Baalvion Nexus infrastructure.",
    url: "https://baalvion.nexus/trust",
    siteName: "Baalvion Nexus",
    images: [
      {
        url: "https://picsum.photos/seed/baalvion-trust/1200/630",
        width: 1200,
        height: 630,
        alt: "Baalvion Trust and Governance",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Trust & Security | Baalvion",
    description:
      "Security, transparency, and international law are at the core of the Baalvion Nexus infrastructure.",
    images: ["https://picsum.photos/seed/baalvion-trust/1200/630"],
  },
};

export default function Page() {
  return <TrustClient />;
}
