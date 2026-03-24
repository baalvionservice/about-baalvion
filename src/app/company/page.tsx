import { Metadata } from "next";
import CompanyClient from "./company-client";

export const metadata: Metadata = {
  title: "About Baalvion | Company Overview",
  description: "Learn about Baalvion Industries, the architect of unified global trade infrastructure for the next century of international commerce.",
};

export default function Page() {
  return <CompanyClient />;
}
