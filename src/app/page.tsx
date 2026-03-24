"use client"

import { useEffect, useState } from "react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Shield, Globe, Zap, Database, Workflow, CheckCircle2, Loader2, ArrowUpRight, Target } from "lucide-react";
import Link from "next/link";
import { Project, EcosystemItem, Page } from "@/lib/db";
import { cn } from "@/lib/utils";

interface PopulatedPage extends Page {
  sectionData: any[];
}

export default function Home() {
  const [page, setPage] = useState<PopulatedPage | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [ecoItems, setEcoItems] = useState<EcosystemItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function init() {
      try {
        const [pgRes, pRes, eRes] = await Promise.all([
          fetch('/api/pages?slug=home'),
          fetch('/api/projects'),
          fetch('/api/ecosystem')
        ]);
        
        if (!pgRes.ok || !pRes.ok || !eRes.ok) throw new Error('Failed to load');

        const [pg, p, e] = await Promise.all([
          pgRes.json(),
          pRes.json(),
          eRes.json()
        ]);

        setPage(pg);
        setProjects(p);
        setEcoItems(e);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    init();
  }, []);

  if (loading || !page) return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="flex flex-col items-center gap-6">
        <Loader2 className="w-12 h-12 animate-spin text-primary" />
        <p className="text-muted-foreground text-[10px] font-bold uppercase tracking-[0.4em] animate-pulse">Establishing Nexus Link...</p>
      </div>
    </div>
  );

  const heroSection = page.sectionData.find(s => s.type === 'hero');
  const problemSection = page.sectionData.find(s => s.type === 'problem');

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        {/* Hero Section */}
        {heroSection && (
          <section className="relative pt-64 pb-48 overflow-hidden hero-glow">
            <div className="section-container text-center relative z-10 animate-fade-in">
              <span className="section-label">{heroSection.data.label}</span>
              <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter text-white mb-12 max-w-6xl mx-auto leading-[0.9] gradient-text">
                {heroSection.title}
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-16 leading-relaxed font-light">
                {heroSection.description}
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                <Button size="lg" asChild className="btn-primary h-16 px-12 text-base font-bold min-w-[240px]">
                  <Link href="/platform">{heroSection.data.ctaPrimary} <ArrowRight className="ml-2 w-5 h-5" /></Link>
                </Button>
                <Button size="lg" variant="outline" asChild className="h-16 px-12 border-white/10 hover:bg-white/5 text-base font-bold rounded-full min-w-[240px] text-white backdrop-blur-sm">
                  <Link href="/contact">{heroSection.data.ctaSecondary}</Link>
                </Button>
              </div>
            </div>
            
            {/* Background Texture */}
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-[0.03] pointer-events-none" />
          </section>
        )}

        {/* Metrics Bar */}
        <section className="py-24 border-y border-white/5 bg-black/20 backdrop-blur-md">
          <div className="section-container">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-24 items-center">
              {[
                { label: 'Annual Trade Volume', value: '$2.4T+' },
                { label: 'Jurisdictions Integrated', value: '180+' },
                { label: 'Nexus Uptime SLA', value: '99.99%' },
                { label: 'Global Sync Latency', value: '500ms' }
              ].map((stat, i) => (
                <div key={i} className="space-y-4 text-center lg:text-left group">
                  <p className="text-4xl md:text-5xl font-bold text-white tabular-nums group-hover:text-primary transition-colors duration-500">{stat.value}</p>
                  <div className="h-px w-12 bg-primary/30 mx-auto lg:mx-0 group-hover:w-full transition-all duration-700" />
                  <p className="text-[10px] text-muted-foreground uppercase tracking-[0.2em] font-bold">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="layout-stack">
          {/* Problem → Solution */}
          {problemSection && (
            <section className="section-vertical-padding bg-card/10">
              <div className="section-container">
                <div className="grid lg:grid-cols-2 gap-24 lg:gap-40 items-start">
                  <div className="space-y-16 lg:sticky lg:top-32">
                    <div className="space-y-6">
                      <span className="section-label">The Fragmentation</span>
                      <h2 className="text-5xl md:text-7xl font-bold text-white leading-[1] tracking-tight">{problemSection.title}</h2>
                    </div>
                    <div className="space-y-12">
                      {problemSection.data.points.map((item: any, i: number) => (
                        <div key={i} className="flex gap-10 group">
                          <div className="w-14 h-14 rounded-2xl bg-destructive/10 border border-destructive/20 flex-shrink-0 flex items-center justify-center text-destructive group-hover:bg-destructive group-hover:text-white transition-all duration-500 shadow-xl shadow-destructive/5">
                            <Zap className="w-6 h-6" />
                          </div>
                          <div className="space-y-3">
                            <h4 className="text-2xl font-bold text-white group-hover:text-destructive transition-colors">{item.title}</h4>
                            <p className="text-muted-foreground leading-relaxed text-lg font-light">{item.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="glass-card p-12 md:p-20 relative overflow-hidden group border-primary/20 bg-primary/[0.02]">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-[120px] -mr-48 -mt-48 transition-all duration-1000 group-hover:scale-125" />
                    <div className="relative z-10 space-y-12">
                      <div className="w-20 h-20 bg-primary/10 rounded-[2rem] flex items-center justify-center text-primary border border-primary/20 shadow-2xl shadow-primary/10">
                        <Workflow className="w-10 h-10" />
                      </div>
                      <div className="space-y-6">
                        <h3 className="text-4xl md:text-5xl font-bold text-white leading-tight">Baalvion Nexus: <br/>The Unified Solution</h3>
                        <p className="text-xl text-muted-foreground leading-relaxed font-light">
                          {problemSection.description}
                        </p>
                      </div>
                      <div className="grid gap-6">
                        {["Unified Trade Ledger", "Autonomous Compliance AI", "Secure Financial Settlement"].map((item, i) => (
                          <div key={i} className="flex items-center gap-6 p-4 rounded-2xl bg-white/5 border border-white/5 text-white text-lg font-medium group/item hover:bg-white/10 transition-all">
                            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center group-hover/item:bg-primary transition-all duration-300">
                              <CheckCircle2 className="w-5 h-5 text-primary group-hover/item:text-white" />
                            </div>
                            {item}
                          </div>
                        ))}
                      </div>
                      <Button size="lg" asChild className="w-full btn-primary h-20 text-xl font-bold mt-8">
                        <Link href="/platform">Explore Methodology</Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* Ecosystem Preview */}
          <section className="section-vertical-padding">
            <div className="section-container">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-12 mb-24">
                <div className="max-w-3xl space-y-6">
                  <span className="section-label">Architecture</span>
                  <h2 className="text-5xl md:text-8xl font-bold text-white tracking-tight">Ecosystem <span className="text-primary">Layers</span></h2>
                  <p className="text-2xl text-muted-foreground leading-relaxed font-light">Modular infrastructure architected for deep integration.</p>
                </div>
                <Button asChild variant="outline" className="h-14 px-10 rounded-full font-bold border-white/10 hover:bg-white/5 text-white backdrop-blur-sm">
                  <Link href="/ecosystem">Explore Registry <ArrowRight className="ml-2 w-5 h-5" /></Link>
                </Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8">
                {ecoItems.map((item) => (
                  <Card key={item.id} className="glass-card card-hover flex flex-col h-full border-white/5 hover:border-primary/30">
                    <CardContent className="p-10 flex-1 flex flex-col">
                      <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-10 text-primary border border-primary/10 shadow-lg">
                        <Database className="w-8 h-8" />
                      </div>
                      <div className="flex-1 space-y-4">
                        <h3 className="text-2xl font-bold text-white group-hover:text-primary transition-colors">{item.name}</h3>
                        <p className="text-sm text-muted-foreground leading-relaxed font-light">{item.description}</p>
                      </div>
                      <div className="pt-8 mt-8 border-t border-white/5 flex items-center justify-between">
                        <span className="text-[10px] font-bold text-primary uppercase tracking-[0.3em]">{item.layer}</span>
                        <ArrowUpRight className="w-5 h-5 text-muted-foreground group-hover:text-white transition-colors" />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>

          {/* Projects Preview */}
          <section className="section-vertical-padding bg-card/10">
            <div className="section-container">
              <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-16 mb-24">
                <div className="max-w-3xl space-y-6">
                  <span className="section-label">Strategic Portfolio</span>
                  <h2 className="text-5xl md:text-8xl font-bold text-white tracking-tight">Active <span className="text-accent">Initiatives</span></h2>
                  <p className="text-2xl text-muted-foreground leading-relaxed font-light">A managed portfolio of infrastructure transformations.</p>
                </div>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button asChild variant="outline" className="h-14 px-10 rounded-full font-bold border-white/10 hover:bg-white/5 text-white backdrop-blur-sm">
                    <Link href="/projects">Full Portfolio</Link>
                  </Button>
                  <Button asChild className="btn-primary h-14 px-10 font-bold">
                    <Link href="/contact">Propose Initiative</Link>
                  </Button>
                </div>
              </div>
              <div className="grid md:grid-cols-3 gap-10">
                {projects.slice(0, 3).map((project) => (
                  <Card key={project.id} className="glass-card card-hover group border-white/5 hover:border-accent/40">
                    <CardContent className="p-12 space-y-12">
                      <div className="flex justify-between items-start">
                        <div className="w-16 h-16 bg-white/5 rounded-[1.5rem] flex items-center justify-center text-accent group-hover:bg-primary transition-all duration-500 border border-white/10 shadow-inner">
                          <Target className="w-8 h-8" />
                        </div>
                        <Badge className={cn(
                          "py-2 px-5 text-[9px] font-bold uppercase tracking-widest rounded-full border shadow-sm",
                          project.status === 'Active' ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' : 
                          project.status === 'In Development' ? 'bg-amber-500/10 text-amber-500 border-amber-500/20' : 
                          'bg-white/10 text-muted-foreground border-white/10'
                        )}>
                          {project.status}
                        </Badge>
                      </div>
                      <div className="space-y-4">
                        <h3 className="text-3xl font-bold text-white group-hover:text-primary transition-colors duration-500">{project.name}</h3>
                        <p className="text-muted-foreground leading-relaxed text-lg font-light line-clamp-3">{project.description}</p>
                      </div>
                      <div className="flex items-center gap-4 text-[11px] font-bold text-muted-foreground uppercase tracking-[0.25em] pt-6 border-t border-white/5">
                        <span className="text-primary">{project.category}</span>
                        <div className="w-1.5 h-1.5 rounded-full bg-white/10" />
                        <span>{project.type}</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="section-vertical-padding">
            <div className="section-container">
              <div className="glass-card p-16 md:p-32 text-center relative overflow-hidden border-primary/30 bg-primary/[0.03]">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(var(--primary),0.1)_0%,transparent_100%)] opacity-50" />
                <div className="relative z-10 space-y-12">
                  <h2 className="text-5xl md:text-8xl font-bold text-white leading-[1] max-w-5xl mx-auto tracking-tight">
                    Integrate with the <br/><span className="text-primary">Global Nexus.</span>
                  </h2>
                  <p className="text-xl md:text-3xl text-muted-foreground max-w-3xl mx-auto font-light leading-relaxed">
                    Our strategic response team is ready to architect your infrastructure integration.
                  </p>
                  <div className="pt-12 flex flex-col sm:flex-row justify-center gap-8">
                    <Button size="lg" asChild className="btn-primary h-24 px-16 text-2xl font-bold shadow-2xl">
                      <Link href="/contact">Schedule Strategic Briefing</Link>
                    </Button>
                    <Button size="lg" variant="outline" asChild className="h-24 px-12 text-xl font-bold rounded-full border-white/10 hover:bg-white/5 text-white backdrop-blur-md">
                      <Link href="/trust">Governance Specs</Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}