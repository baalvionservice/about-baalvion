"use client"

import { useEffect, useState } from "react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Page } from "@/lib/db";
import { Loader2, Database } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

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
        setPageData(data);
        setLoading(false);
      });
  }, []);

  if (loading) return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="flex flex-col items-center gap-8">
        <Loader2 className="w-16 h-16 animate-spin text-primary" />
        <p className="text-[11px] font-bold uppercase tracking-[0.5em] text-muted-foreground">Syncing Core Layers...</p>
      </div>
    </div>
  );

  const featuresSection = pageData?.sectionData.find(s => s.type === 'cards');

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-56 pb-48">
        <div className="section-container">
          <div className="max-w-5xl mb-32 animate-fade-in">
            <span className="section-label">Technology</span>
            <h1 className="mb-12">
              Nexus <span className="gradient-text">Core</span>
            </h1>
            <p className="text-2xl md:text-3xl max-w-4xl leading-relaxed text-muted-foreground">
              {featuresSection?.description}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            {featuresSection?.data?.features?.map((f: any, i: number) => (
              <Card key={i} className="glass-card border-primary/20 hover:border-accent transition-all duration-700">
                <CardContent className="p-16 space-y-12">
                  <div className="w-20 h-20 bg-primary/10 rounded-[2rem] flex items-center justify-center shadow-2xl">
                    <Database className="w-10 h-10 text-accent" />
                  </div>
                  <div className="space-y-6">
                    <h3 className="text-3xl font-bold text-white">{f.title}</h3>
                    <p className="text-base md:text-lg leading-relaxed text-muted-foreground">{f.desc}</p>
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
