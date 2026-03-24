"use client"

import { useEffect, useState } from "react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Shield, Globe, Zap, BarChart3, Database, Workflow, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { Page, EcosystemLayer } from "@/lib/db";
import { cn } from "@/lib/utils";

// Interface for populated page data
interface PopulatedPage extends Page {
  sectionData: any[];
}

export default function Home() {
  const [pageData, setPageData] = useState<PopulatedPage | null>(null);
  const [ecoData, setEcoData] = useState<EcosystemLayer[]>([]);

  useEffect(() => {
    fetch('/api/pages?slug=home').then(res => res.json()).then(setPageData);
    fetch('/api/ecosystem').then(res => res.json()).then(setEcoData);
  }, []);

  if (!pageData) return null;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-48 pb-32 overflow-hidden hero-gradient">
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-bold text-accent mb-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
            <Zap className="w-3.5 h-3.5" />
            <span className="tracking-widest uppercase">Global Trade Infrastructure 2.0</span>
          </div>
          <h1 className="text-5xl md:text-8xl font-bold tracking-tight text-white mb-8 max-w-5xl mx-auto leading-[1.1]">
            The Digital Nexus for <span className="gradient-text">Global Commerce</span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-12 leading-relaxed font-light">
            {pageData.sectionData.find(s => s.type === 'hero')?.description || 'Connecting businesses, finance, compliance, and intelligence systems into a unified global infrastructure.'}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Button size="lg" asChild className="btn-primary h-14 px-10 text-base font-semibold min-w-[220px]">
              <Link href="/platform">Explore Platform <ArrowRight className="ml-2 w-5 h-5" /></Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="h-14 px-10 border-white/10 hover:bg-white/5 text-base font-semibold min-w-[220px]">
              <Link href="/contact">Partner with Us</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Trust & Metrics Bar */}
      <section className="py-12 border-y border-white/5 bg-black/20">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center md:justify-between items-center gap-8 md:gap-4 opacity-70 grayscale hover:grayscale-0 transition-all">
            <div className="flex items-center gap-2 text-white font-bold tracking-tighter text-xl">
              <Shield className="w-6 h-6 text-primary" /> TRUSTED INFRASTRUCTURE
            </div>
            <div className="h-4 w-px bg-white/10 hidden md:block" />
            <div className="text-center">
              <p className="text-white font-bold text-2xl leading-none mb-1">150+</p>
              <p className="text-[10px] text-muted-foreground uppercase tracking-widest">Countries</p>
            </div>
            <div className="text-center">
              <p className="text-white font-bold text-2xl leading-none mb-1">$2.4T</p>
              <p className="text-[10px] text-muted-foreground uppercase tracking-widest">Trade Volume</p>
            </div>
            <div className="text-center">
              <p className="text-white font-bold text-2xl leading-none mb-1">99.9%</p>
              <p className="text-[10px] text-muted-foreground uppercase tracking-widest">Uptime Nexus</p>
            </div>
          </div>
        </div>
      </section>

      {/* Ecosystem Section */}
      <section className="py-32">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mb-24">
            <h2 className="text-[10px] font-bold text-accent uppercase tracking-[0.4em] mb-4">Architecture</h2>
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">Our Ecosystem <span className="text-primary">Layers</span></h2>
            <p className="text-xl text-muted-foreground leading-relaxed">A multi-layered approach to solving the complexities of international trade at scale.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {ecoData.map((layer, idx) => (
              <Card key={layer.id} className="glass-card group hover:border-primary/50 transition-all duration-500 overflow-hidden">
                <CardContent className="pt-10 p-8">
                  <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-primary/20 transition-colors">
                    <Database className="text-accent w-7 h-7" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">{layer.title}</h3>
                  <p className="text-muted-foreground leading-relaxed text-sm mb-6">{layer.description}</p>
                  <div className="flex items-center text-xs font-bold text-primary group-hover:text-accent transition-colors">
                    LAYER 0{idx + 1} <ArrowRight className="ml-2 w-3 h-3" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Problem/Solution Section */}
      <section className="py-32 bg-card/20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-accent/5 rounded-full blur-[120px]" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-24 items-center">
            <div className="space-y-10">
              <div className="space-y-4">
                <h2 className="text-[10px] font-bold text-destructive uppercase tracking-[0.4em]">The Fragmentation</h2>
                <h2 className="text-4xl md:text-6xl font-bold text-white leading-[1.1]">Solving Fragmented <br/><span className="text-primary">Global Systems</span></h2>
              </div>
              <div className="space-y-8">
                <div className="flex gap-6">
                  <div className="mt-1 w-6 h-6 rounded-full border-2 border-destructive flex-shrink-0 flex items-center justify-center text-xs text-destructive font-bold">!</div>
                  <div>
                    <h4 className="text-xl font-bold text-white mb-2">Isolated Trade Networks</h4>
                    <p className="text-muted-foreground leading-relaxed">Archaic, siloed systems create information black holes and operational bottlenecks across the supply chain.</p>
                  </div>
                </div>
                <div className="flex gap-6">
                  <div className="mt-1 w-6 h-6 rounded-full border-2 border-destructive flex-shrink-0 flex items-center justify-center text-xs text-destructive font-bold">!</div>
                  <div>
                    <h4 className="text-xl font-bold text-white mb-2">Regulatory Complexity</h4>
                    <p className="text-muted-foreground leading-relaxed">Navigating divergent international compliance standards is the #1 barrier to global business expansion.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="glass-card p-12 md:p-16 rounded-[2.5rem] relative group border-primary/20">
              <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-[2.5rem]" />
              <Workflow className="w-16 h-16 text-accent mb-10" />
              <h3 className="text-3xl font-bold text-white mb-6">The Baalvion Solution</h3>
              <p className="text-lg text-muted-foreground mb-10 leading-relaxed font-light">
                We provide a unified API and infrastructure layer that bridges the gap between commerce, finance, and legal networks. One integration, global reach.
              </p>
              <ul className="space-y-4 mb-12">
                {['Unified Execution Engine', 'Automated Compliance', 'Real-time Intelligence'].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-white font-medium">
                    <CheckCircle2 className="w-5 h-5 text-accent" /> {item}
                  </li>
                ))}
              </ul>
              <Button size="lg" asChild className="btn-accent w-full h-14 text-base font-bold">
                <Link href="/how-it-works">Discover the Methodology</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-40">
        <div className="container mx-auto px-4">
          <div className="glass-card rounded-[3rem] p-12 md:p-24 text-center border-white/5 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-primary/10 to-transparent" />
            <div className="relative z-10 space-y-8">
              <h2 className="text-4xl md:text-7xl font-bold text-white max-w-4xl mx-auto leading-tight">Ready to integrate with the <span className="gradient-text">Nexus?</span></h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto font-light">Join the leading enterprises building on Baalvion's global trade infrastructure.</p>
              <div className="pt-6">
                <Button size="lg" asChild className="btn-primary h-16 px-12 text-lg font-bold">
                  <Link href="/contact">Schedule a Strategic Briefing</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}