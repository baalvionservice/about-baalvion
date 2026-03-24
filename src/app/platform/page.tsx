"use client"

import { useEffect, useState } from "react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Page } from "@/lib/db";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Zap, Shield, Database, LayoutGrid } from "lucide-react";

interface PopulatedPage extends Page {
  sectionData: any[];
}

export default function PlatformPage() {
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
      <Loader2 className="w-10 h-10 animate-spin text-primary" />
    </div>
  );

  const featuresSection = pageData?.sectionData.find(s => s.type === 'cards');

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-48 pb-32">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mb-24">
            <Badge className="py-1 px-4 text-[10px] tracking-[0.3em] uppercase font-bold bg-primary/20 text-accent border-primary/20">Technology</Badge>
            <h1 className="text-5xl md:text-8xl font-bold text-white mt-8 leading-tight">
              Nexus <span className="gradient-text">Core</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground font-light mt-8 leading-relaxed">
              {featuresSection?.description}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {featuresSection?.data?.features?.map((f: any, i: number) => (
              <Card key={i} className="glass-card border-primary/20 hover:border-accent transition-all duration-500">
                <CardHeader className="p-8">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-6">
                    <Database className="w-6 h-6 text-accent" />
                  </div>
                  <CardTitle className="text-2xl font-bold text-white">{f.title}</CardTitle>
                </CardHeader>
                <CardContent className="px-8 pb-8">
                  <p className="text-muted-foreground leading-relaxed">{f.desc}</p>
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