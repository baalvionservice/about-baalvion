import { Metadata } from "next";
import HomePageClient from "./home-page-client";

export const metadata: Metadata = {
  title: "Baalvion — Global Trade Infrastructure Platform",
  description: "Baalvion builds global trade infrastructure connecting businesses, finance, compliance, and intelligence into one unified platform.",
  openGraph: {
    title: "Baalvion — Global Trade Infrastructure Platform",
    description: "Baalvion builds global trade infrastructure connecting businesses, finance, compliance, and intelligence into one unified platform.",
  }
};

export default function Page() {
  return <HomePageClient />;
}
