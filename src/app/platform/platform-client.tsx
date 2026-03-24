"use client"

import { useEffect, useState } from "react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Page } from "@/lib/db";
import { Loader2, Database, Shield, Zap, Globe } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface PopulatedPage extends Page {
  sectionData: any[];
}

export default function PlatformClient() {
  const [pageData, setPageData] = useState<PopulatedPage | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/pages?slug=platform')
      .then(res => res.json())
      .then(data => {
        if (data && !data.error) {
          setPageData(data);
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading || !pageData) return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="flex flex-col items-center gap-6">
        <Loader2 className="w-12 h-12 animate-spin text-primary" />
        <p className="text-[11px] font-bold uppercase tracking-[0.5em] text-gray-400">Syncing Core Layers...</p>
      </div>
    </div>
  );

  const featuresSection = pageData?.sectionData?.find(s => s.type === 'cards');

  const getIcon = (title: string) => {
    const t = title.toLowerCase();
    if (t.includes('ledger') || t.includes('infrastructure')) return <Database className="w-10 h-10" />;
    if (t.includes('compliance') || t.includes('security')) return <Shield className="w-10 h-10" />;
    if (t.includes('clearing') || t.includes('engine')) return <Zap className="w-10 h-10" />;
    return <Globe className="w-10 h-10" />;
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main className="pt-48 pb-32">
        <div className="section-container">
          <div className="max-w-4xl mb-24 animate-fade-in">
            <span className="section-label">Technology & Infrastructure</span>
            <h1 className="text-gray-900 mb-8 leading-tight">
              Nexus <span className="text-primary">Core</span> Architecture
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 leading-relaxed font-medium">
              {featuresSection?.description || "Architecting the foundational layer for global trade with enterprise-grade reliability."}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {featuresSection?.data?.features?.map((f: any, i: number) => (
              <Card key={i} className="bg-white border border-gray-100 shadow-sm hover:shadow-md transition-all duration-500 rounded-2xl group overflow-hidden">
                <div className="h-2 w-full bg-primary/10 group-hover:bg-primary transition-colors duration-500" />
                <CardContent className="p-12 space-y-10">
                  <div className="w-20 h-20 bg-primary/5 rounded-2xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-500">
                    {getIcon(f.title)}
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-2xl font-bold text-gray-900 group-hover:text-primary transition-colors">{f.title}</h3>
                    <p className="text-gray-500 leading-relaxed">{f.desc}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
