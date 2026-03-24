"use client"

import { useEffect, useState } from "react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Page } from "@/lib/db";
import { Badge } from "@/components/ui/badge";
import { Loader2, Globe, Shield, Target } from "lucide-react";

interface PopulatedPage extends Page {
  sectionData: any[];
}

export default function CompanyPage() {
  const [pageData, setPageData] = useState<PopulatedPage | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/pages?slug=company')
      .then(res => res.json())
      .then(data => {
        setPageData(data);
        setLoading(false);
      });
  }, []);

  if (loading) return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <Loader2 className="w-10 h-10 animate-spin text-primary" />
    </div>
  );

  const hero = pageData?.sectionData.find(s => s.type === 'hero');

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-48 pb-32">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-12">
            <Badge className="py-1 px-4 text-[10px] tracking-[0.3em] uppercase font-bold bg-primary/20 text-accent border-primary/20">Our Mission</Badge>
            <h1 className="text-5xl md:text-8xl font-bold text-white leading-tight">
              {hero?.title || 'Company Architecture'}
            </h1>
            <p className="text-xl md:text-3xl text-muted-foreground font-light leading-relaxed">
              {hero?.description}
            </p>

            <div className="grid md:grid-cols-3 gap-8 pt-20">
              {[
                { icon: Globe, title: 'Global reach', desc: 'Operating across 150+ jurisdictions with localized intelligence.' },
                { icon: Shield, title: 'Compliance first', desc: 'A culture rooted in transparency and international law.' },
                { icon: Target, title: 'Strategic impact', desc: 'Focusing on long-term infrastructure over short-term gains.' },
              ].map((item, i) => (
                <div key={i} className="glass-card p-8 rounded-2xl text-left border-white/5 space-y-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <item.icon className="w-6 h-6 text-accent" />
                  </div>
                  <h4 className="text-white font-bold uppercase tracking-widest text-sm">{item.title}</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}