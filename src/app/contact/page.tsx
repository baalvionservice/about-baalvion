import { Metadata } from "next";
import ContactClient from "./contact-client";

export const metadata: Metadata = {
  title: "Contact Baalvion",
  description: "Initiate a strategic partnership or project briefing. Our global trade specialists are ready to architect your integration.",
};

export default function Page() {
  return <ContactClient />;
}
