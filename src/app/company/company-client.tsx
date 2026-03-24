
"use client"

import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { SubPageHero, SubPageContent } from "@/components/sub-page-hero";
import { Globe, Shield, Target, Users, Building2 } from "lucide-react";

export default function CompanyClient() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main>
        <SubPageHero category="Corporate" title="What We Do" />
        <SubPageContent>
          <div className="space-y-32">
            <div className="max-w-4xl mx-auto text-center space-y-8">
              <p className="text-xl md:text-2xl text-gray-700 leading-relaxed font-medium">
                We are architecting the foundational layer for the next century of international commerce, bridging the gap between legacy systems and future automation.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                { icon: Globe, title: 'Unmatched Reach', desc: 'Operating across 180+ jurisdictions with localized intelligence and legal mapping.' },
                { icon: Shield, title: 'Integrity First', desc: 'A culture rooted in transparency, compliance, and absolute accountability.' },
                { icon: Target, title: 'Strategic Scale', desc: 'Focusing on deep infrastructure that transforms how the world moves value.' },
              ].map((item, i) => (
                <div key={i} className="bg-gray-50 p-10 rounded-xl space-y-6 border border-gray-100 group hover:border-primary transition-all">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
                    <item.icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">{item.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </SubPageContent>
      </main>
      <Footer />
    </div>
  );
}
