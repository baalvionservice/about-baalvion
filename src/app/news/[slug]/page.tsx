'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { ChevronLeft, ChevronRight, Loader2, Newspaper } from 'lucide-react';
import { Article } from '@/lib/db';
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

export default function NewsSubPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  
  const item = newsCategories[slug] || { title: 'News', category: 'Baalvion' };

  useEffect(() => {
    fetch(`/api/news?category=${slug}`)
      .then(res => res.json())
      .then(data => {
        setArticles(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [slug]);

  if (loading) return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <Loader2 className="w-10 h-10 animate-spin text-primary" />
        <p className="text-gray-400 text-xs font-bold uppercase tracking-widest">Syncing Intelligence...</p>
      </div>
    </div>
  );

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
              {articles.length} results - showing results 1 - {articles.length}
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
          {articles.length === 0 ? (
            <div className="py-32 text-center bg-gray-50 rounded-2xl border border-dashed border-gray-200">
              <Newspaper className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 font-medium">No strategic updates found in this category nexus.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">
              {articles.map((news) => (
                <Link key={news.id} href={`/news/${slug}/${news.slug}`} className="group flex flex-col gap-4">
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
          )}

          {/* Bottom Pagination */}
          {articles.length > 0 && (
            <div className="mt-20 pt-8 border-t border-gray-100 flex justify-center">
               <div className="flex items-center gap-6 text-sm font-bold text-gray-900">
                <button className="flex items-center gap-1 opacity-40 cursor-not-allowed">
                  <ChevronLeft className="w-4 h-4" /> Previous
                </button>
                <div className="flex items-center gap-4">
                  <span className="text-primary">1</span>
                </div>
                <button className="flex items-center gap-1 opacity-40 cursor-not-allowed">
                  Next <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}