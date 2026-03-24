
import { Metadata } from "next";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { SubPageHero, SubPageContent } from "@/components/sub-page-hero";

export const metadata: Metadata = {
  title: "Working at Baalvion | Careers",
  description: "Join the team architecting the future of global trade.",
};

export default function CareersPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main>
        <SubPageHero category="Talent" title="Working at Baalvion" />
        <SubPageContent />
      </main>
      <Footer />
    </div>
  );
}
