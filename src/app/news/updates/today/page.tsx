'use client';

import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { Share2, Globe } from 'lucide-react';

export default function TodayNewsPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main className="pt-48 pb-24">
        <div className="max-w-4xl mx-auto px-6">
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
          <div className="space-y-12">
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
                Baalvion is accelerating satellite deployment with over 200 Nexus satellites now operational. The company has completed 11 launches in year one and plans to more than double its pace to 20+ missions in year two. Production capacity reaches 30 satellites weekly at the strategic facility, with hundreds flight-ready and six payloads stacked in Singapore totaling 200+ satellites. Heavy-lift rockets will carry larger payloads to support both current and next-generation constellations.
              </p>
            </div>

            {/* Section 3 */}
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-[#007185] hover:underline cursor-pointer">
                Baalvion AI scoring platform launches in UK
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                The United Kingdom is the first country in Europe to get Baalvion's next-generation AI scoring system. This platform provides real-time risk assessment and trade compliance intelligence for mid-market businesses, streamlining cross-border operations in a post-fragmentation trade environment.
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
