
import { Metadata } from "next";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { SubPageHero, SubPageContent } from "@/components/sub-page-hero";

const newsItems: Record<string, { title: string; category: string }> = {
  'updates': { title: 'Company Updates', category: 'News & Press' },
  'insights': { title: 'Global Trade Insights', category: 'Intelligence' },
  'tech': { title: 'Technology & AI', category: 'Innovation' },
  'finance': { title: 'Finance & Compliance', category: 'Markets' },
  'sustainability': { title: 'Sustainability & ESG', category: 'Governance' },
  'community': { title: 'Community & Partnerships', category: 'Nexus' },
  'markets': { title: 'International Markets', category: 'Global expansion' },
  'reports': { title: 'Featured Reports', category: 'Strategic' },
};

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const item = newsItems[slug] || { title: 'News', category: 'Baalvion' };
  return {
    title: `${item.title} | Baalvion News`,
    description: `Latest ${item.title.toLowerCase()} from the Baalvion Nexus.`,
  };
}

export default async function NewsSubPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = newsItems[slug] || { title: 'News', category: 'Baalvion' };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main>
        <SubPageHero category={item.category} title={item.title} />
        <SubPageContent />
      </main>
      <Footer />
    </div>
  );
}
