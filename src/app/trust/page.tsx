import { Metadata } from "next";
import TrustClient from "./trust-client";

export const metadata: Metadata = {
  title: "Trust & Security | Baalvion",
  description: "Security, transparency, and international law are at the core of the Baalvion Nexus infrastructure.",
};

export default function Page() {
  return <TrustClient />;
}
