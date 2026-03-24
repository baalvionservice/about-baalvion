import { Metadata } from "next";
import PlatformClient from "./platform-client";

export const metadata: Metadata = {
  title: "Baalvion Platform | How It Works",
  description: "Explore the technology and strategic protocols behind the Baalvion Nexus Core.",
};

export default function Page() {
  return <PlatformClient />;
}
