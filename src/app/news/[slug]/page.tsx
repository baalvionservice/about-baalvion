'use client';

import { useParams } from 'next/navigation';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const newsCategories: Record<string, { title: string; category: string }> = {
  updates: { title: 'Company news', category: 'Company news' },
  insights: { title: 'Global trade insights', category: 'Insights' },
  tech: { title: 'Technology & AI', category: 'Innovation' },
  finance: { title: 'Finance & Compliance', category: 'Markets' },
  sustainability: { title: 'Sustainability & ESG', category: 'Governance' },
  community: { title: 'Community & Partnerships', category: 'Nexus' },
  markets: { title: 'International Markets', category: 'Global expansion' },
  reports: { title: 'Featured Reports', category: 'Strategic' },
};

const mockNews = [
  {
    id: 1,
    title: 'What you need to know about Baalvion today: March 24, 2026',
    date: 'March 24, 2026',
    image: 'https://picsum.photos/seed/news1/600/400',
    category: 'Company news',
  },
  {
    id: 2,
    title: "Setting the record straight on Baalvion's global logistics partnership",
    date: 'March 18, 2026',
    image: 'https://picsum.photos/seed/news2/600/400',
    category: 'Company news',
  },
  {
    id: 3,
    title: "Get a behind-the-scenes look at Baalvion's innovations with the 'Nexus' podcast",
    date: 'March 17, 2026',
    image: 'https://picsum.photos/seed/news3/600/400',
    category: 'Company news',
  },
  {
    id: 4,
    title: 'Correcting the Financial Times report about recent Baalvion compliance protocols',
    date: 'March 11, 2026',
    image: 'https://picsum.photos/seed/news4/600/400',
    category: 'Company news',
  },
  {
    id: 5,
    title: 'Baalvion is investing $750 million in a global trade hub in Singapore',
    date: 'March 10, 2026',
    image: 'https://picsum.photos/seed/news5/600/400',
    category: 'Company news',
  },
  {
    id: 6,
    title: 'Baalvion increases investment in Europe to expand data center infrastructure',
    date: 'March 2, 2026',
    image: 'https://picsum.photos/seed/news6/600/400',
    category: 'Company news',
  },
  {
    id: 7,
    title: 'Baalvion to invest $12 billion in first strategic trade corridor in the Middle East',
    date: 'February 23, 2026',
    image: 'https://picsum.photos/seed/news7/600/400',
    category: 'Company news',
  },
  {
    id: 8,
    title: 'Baalvion announces fourth quarter results and platform expansion',
    date: 'February 5, 2026',
    image: 'https://picsum.photos/seed/news8/600/400',
    category: 'Company news',
  },
];

export default function NewsSubPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const item = newsCategories[slug] || { title: 'News', category: 'Baalvion' };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main className="pt-40 pb-24">
        <div className="section-container">
          {/* Page Title */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-0">
              {item.title}
            </h1>
          </div>

          {/* Results Header */}
          <div className="flex justify-between items-center mb-10 border-b border-gray-100 pb-4">
            <p className="text-sm font-medium text-gray-600">
              {mockNews.length} results - showing results 1 - {mockNews.length}
            </p>
            <div className="flex items-center gap-4 text-sm font-bold text-gray-900">
              <button className="flex items-center gap-1 opacity-40 cursor-not-allowed">
                <ChevronLeft className="w-4 h-4" /> Previous
              </button>
              <button className="flex items-center gap-1 hover:text-primary transition-colors">
                Next <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* News Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">
            {mockNews.map((news) => (
              <Link key={news.id} href={news.id === 1 ? '/news/updates/today' : `/news/${slug}/${news.id}`} className="group flex flex-col gap-4">
                <div className="aspect-[16/10] relative rounded-xl overflow-hidden bg-gray-100">
                  <Image
                    src={news.image}
                    alt={news.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    data-ai-hint="news coverage"
                  />
                </div>
                <div className="space-y-3">
                  <h3 className="text-lg font-bold leading-tight text-gray-900 group-hover:text-[#007185] transition-colors line-clamp-3">
                    {news.title}
                  </h3>
                  <p className="text-sm text-gray-500 font-medium">
                    {news.date}
                  </p>
                  <div className="pt-2">
                    <span className="inline-block px-3 py-1.5 bg-gray-50 border border-gray-100 rounded-md text-[10px] font-bold text-gray-700 uppercase tracking-wider">
                      {item.category}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Bottom Pagination */}
          <div className="mt-20 pt-8 border-t border-gray-100 flex justify-center">
             <div className="flex items-center gap-6 text-sm font-bold text-gray-900">
              <button className="flex items-center gap-1 opacity-40 cursor-not-allowed">
                <ChevronLeft className="w-4 h-4" /> Previous
              </button>
              <div className="flex items-center gap-4">
                <span className="text-primary">1</span>
                <span className="hover:text-primary cursor-pointer">2</span>
                <span className="hover:text-primary cursor-pointer">3</span>
              </div>
              <button className="flex items-center gap-1 hover:text-primary transition-colors">
                Next <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
