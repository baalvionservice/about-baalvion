'use client';

import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { Share2, Globe, ArrowRight, ChevronRight, ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

const moreNews = [
  {
    id: 3,
    title: "Get a behind-the-scenes look at Baalvion's innovations with the 'Nexus' podcast",
    date: 'March 17, 2026',
    image: 'https://picsum.photos/seed/news3/600/400',
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
];

export default function TodayNewsPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main className="pt-48 pb-0">
        <div className="max-w-4xl mx-auto px-6 mb-24">
          {/* Main Headline */}
          <div className="space-y-4 mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-[#111111] leading-tight tracking-tight">
              What you need to know about Baalvion today: March 24, 2026
            </h1>
            <p className="text-xl text-gray-500 font-medium">
              Here are the latest headlines from Baalvion News
            </p>
          </div>

          {/* Share Button */}
          <div className="flex justify-end mb-8">
            <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-sm hover:bg-gray-50 transition-colors text-xs font-bold text-gray-700">
              <Share2 className="w-3 h-3 text-[#FF9900]" /> Share
            </button>
          </div>

          {/* Author & Timestamp Section */}
          <div className="flex items-center justify-between py-8 border-y border-gray-100 mb-12">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center">
                <Globe className="text-white w-5 h-5" />
              </div>
              <p className="text-sm font-bold text-gray-700">
                Written by <span className="text-[#007185] hover:underline cursor-pointer">Baalvion Staff</span>
              </p>
            </div>
            <div className="text-right space-y-1">
              <p className="text-xs text-gray-500 font-bold uppercase tracking-widest">
                Last updated: March 24, 2026
              </p>
              <p className="text-xs text-gray-400 font-medium">2 min read</p>
            </div>
          </div>

          {/* Article Content */}
          <div className="space-y-12 mb-20">
            {/* Section 1 */}
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-[#007185] hover:underline cursor-pointer">
                Baalvion Trade Corridors expanded in Middle East
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                We are working closely with local authorities and prioritizing the safety of our personnel throughout our recovery efforts. We continue to support affected customers, helping them to migrate to alternate Baalvion Nexus Nodes, with a large number already successfully operating their applications from other parts of the world.
              </p>
            </div>

            {/* Section 2 */}
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-[#007185] hover:underline cursor-pointer">
                Baalvion satellite production to accelerate launch cadence
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                Baalvion is accelerating satellite deployment with over 200 Nexus satellites now operational. The company has completed 11 launches in year one and plans to more than double its pace to 20+ missions in year two. Production capacity reaches 30 satellites weekly at the strategic facility, with hundreds flight-ready and six payloads stacked in Singapore totaling 200+ satellites.
              </p>
            </div>

            {/* Section 3 */}
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-[#007185] hover:underline cursor-pointer">
                Baalvion AI scoring platform launches in UK
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                The United Kingdom is the first country in Europe to get Baalvion's next-generation AI scoring system. This platform provides real-time risk assessment and trade compliance intelligence for mid-market businesses.
              </p>
            </div>
          </div>

          {/* Newsletter Signup Section */}
          <div className="mt-20 pt-10 border-t border-gray-100">
            <div className="relative bg-white border border-gray-200 p-8 shadow-sm">
              <div className="absolute top-0 left-0 w-full h-1 bg-[#FF9900]" />
              <h3 className="text-2xl font-bold text-[#111111] mb-8">Sign up for the weekly Baalvion newsletter</h3>
              
              <div className="max-w-md">
                <div className="relative flex items-center group">
                  <input 
                    type="email" 
                    placeholder="Enter email" 
                    className="w-full border-b border-gray-300 py-3 text-lg outline-none focus:border-[#FF9900] transition-colors placeholder:text-gray-400"
                  />
                  <button className="absolute right-0 w-10 h-10 bg-[#FF9900] rounded-full flex items-center justify-center text-white transition-transform group-focus-within:scale-105 hover:bg-[#e68a00]">
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </div>
                <div className="mt-3 flex gap-4 text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                  <Link href="/privacy" className="hover:text-gray-600 underline">Baalvion Privacy Policy</Link>
                  <span>Opt out anytime</span>
                </div>
              </div>
            </div>

            <div className="mt-12">
              <p className="text-lg font-bold text-gray-900">
                Get more headlines from <Link href="/news/updates" className="text-[#007185] hover:underline">Baalvion News.</Link>
              </p>
            </div>
          </div>

          {/* Trending News Section */}
          <div className="mt-20">
            <div className="border-b border-gray-200 pb-3 mb-8">
              <h3 className="text-xl font-bold text-[#111111]">Trending news and stories</h3>
            </div>
            
            <ul className="space-y-6">
              {[
                "Baalvion's new automated customs clearance node goes live in Singapore",
                "How AI is transforming trade finance for mid-market exporters",
                "Everything you need to know about the Baalvion Nexus Core upgrade",
                "Baalvion establishes new strategic trade corridor with Brazil",
                "Baalvion increases investment in green energy for industrial logistics"
              ].map((story, i) => (
                <li key={i} className="flex gap-4 group">
                  <div className="mt-2.5 w-1.5 h-1.5 bg-gray-400 rounded-full shrink-0 group-hover:bg-[#FF9900]" />
                  <Link href="#" className="text-lg font-bold text-gray-700 leading-tight hover:text-[#007185] hover:underline transition-colors">
                    {story}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* More Baalvion News Section (Amazon Style) */}
        <section className="bg-[#F2F2F2] py-20">
          <div className="max-w-[1200px] mx-auto px-6">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-xl font-bold text-[#111111]">More Baalvion News</h3>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1.5">
                  <button className="w-8 h-8 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-400 cursor-not-allowed">
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <span className="text-xs font-bold text-gray-400 px-2 uppercase tracking-widest">1 / 2</span>
                  <button className="w-8 h-8 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-900 hover:border-[#FF9900] hover:text-[#FF9900] transition-all">
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {moreNews.map((news) => (
                <Link key={news.id} href={`/news/updates/${news.id}`} className="group bg-white rounded-lg shadow-sm border border-gray-100 flex flex-col h-full overflow-hidden transition-transform hover:-translate-y-1">
                  <div className="aspect-[16/10] relative overflow-hidden bg-gray-50">
                    <Image
                      src={news.image}
                      alt={news.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      data-ai-hint="news coverage"
                    />
                  </div>
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div className="space-y-3">
                      <h4 className="text-sm font-bold leading-tight text-gray-900 group-hover:text-[#007185] transition-colors line-clamp-3">
                        {news.title}
                      </h4>
                      <p className="text-[11px] text-gray-400 font-medium">
                        {news.date}
                      </p>
                    </div>
                    <div className="mt-4">
                      <span className="inline-block px-2.5 py-1 bg-gray-100 border border-gray-200 rounded text-[9px] font-bold text-gray-500 uppercase tracking-widest">
                        {news.category}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
