"use client"

import { useEffect, useState } from "react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Shield, Globe, Zap, Database, Workflow, CheckCircle2, Loader2, ArrowUpRight, Target, Activity } from "lucide-react";
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
    Promise.all([
      fetch('/api/pages?slug=home').then(res => res.json()),
      fetch('/api/projects').then(res => res.json()),
      fetch('/api/ecosystem').then(res => res.json())
    ]).then(([pg, p, e]) => {
      setPage(pg);
      setProjects(p);
      setEcoItems(e);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  if (loading || !page) return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <Loader2 className="w-10 h-10 animate-spin text-primary" />
    </div>
  );

  const heroSection = page.sectionData.find(s => s.type === 'hero');
  const problemSection = page.sectionData.find(s => s.type === 'problem');

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      {heroSection && (
        <section className="relative pt-64 pb-48 overflow-hidden hero-glow">
          <div className="container mx-auto px-6 text-center relative z-10">
            <Badge className="mb-10 py-1.5 px-5 text-[10px] tracking-[0.4em] uppercase font-bold bg-primary/10 text-primary border-primary/20 rounded-full">
              {heroSection.data.label}
            </Badge>
            <h1 className="text-6xl md:text-8xl font-bold tracking-tight text-white mb-10 max-w-6xl mx-auto leading-[1.05] gradient-text">
              {heroSection.title}
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-16 leading-relaxed font-light">
              {heroSection.description}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Button size="lg" asChild className="btn-primary h-16 px-12 text-base font-bold rounded-full min-w-[240px]">
                <Link href="/platform">{heroSection.data.ctaPrimary} <ArrowRight className="ml-2 w-5 h-5" /></Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="h-16 px-12 border-white/10 hover:bg-white/5 text-base font-bold rounded-full min-w-[240px]">
                <Link href="/contact">{heroSection.data.ctaSecondary}</Link>
              </Button>
            </div>
          </div>
        </section>
      )}

      {/* Metrics Bar */}
      <section className="py-20 border-y border-white/5 bg-black/20">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 items-center">
            <div className="space-y-2 text-center md:text-left">
              <p className="text-4xl font-bold text-white tabular-nums">$2.4T+</p>
              <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold">Annual Trade Volume</p>
            </div>
            <div className="space-y-2 text-center md:text-left">
              <p className="text-4xl font-bold text-white tabular-nums">180+</p>
              <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold">Jurisdictions Integrated</p>
            </div>
            <div className="space-y-2 text-center md:text-left">
              <p className="text-4xl font-bold text-white tabular-nums">99.99%</p>
              <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold">Nexus Uptime SLA</p>
            </div>
            <div className="space-y-2 text-center md:text-left">
              <p className="text-4xl font-bold text-white tabular-nums">500ms</p>
              <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold">Global Sync Latency</p>
            </div>
          </div>
        </div>
      </section>

      {/* Problem → Solution */}
      {problemSection && (
        <section className="py-40 bg-card/20 overflow-hidden">
          <div className="container mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-32 items-center">
              <div className="space-y-12">
                <div className="space-y-4">
                  <span className="section-label">The Fragmentation</span>
                  <h2 className="text-4xl md:text-6xl font-bold text-white leading-tight">{problemSection.title}</h2>
                </div>
                <div className="space-y-10">
                  {problemSection.data.points.map((item: any, i: number) => (
                    <div key={i} className="flex gap-8 group">
                      <div className="w-10 h-10 rounded-xl bg-destructive/10 border border-destructive/20 flex-shrink-0 flex items-center justify-center text-destructive group-hover:bg-destructive group-hover:text-white transition-all">
                        <Zap className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="text-xl font-bold text-white mb-2">{item.title}</h4>
                        <p className="text-muted-foreground leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="glass-card p-16 rounded-[3rem] relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-[100px] -mr-32 -mt-32" />
                <div className="relative z-10 space-y-10">
                  <Workflow className="w-16 h-16 text-primary" />
                  <h3 className="text-4xl font-bold text-white">Baalvion Nexus: The Unified Solution</h3>
                  <p className="text-lg text-muted-foreground leading-relaxed font-light">
                    {problemSection.description}
                  </p>
                  <div className="grid gap-6">
                    {["Unified Trade Ledger", "Autonomous Compliance AI", "Secure Financial Settlement"].map((item, i) => (
                      <div key={i} className="flex items-center gap-4 text-white font-medium">
                        <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center">
                          <CheckCircle2 className="w-4 h-4 text-primary" />
                        </div>
                        {item}
                      </div>
                    ))}
                  </div>
                  <Button size="lg" className="w-full btn-primary h-16 rounded-2xl text-lg font-bold">
                    Discover the Methodology
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Ecosystem Preview */}
      <section className="py-40">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mb-24">
            <span className="section-label">Architecture</span>
            <h2 className="text-4xl md:text-7xl font-bold text-white mb-8">Ecosystem <span className="text-primary">Layers</span></h2>
            <p className="text-xl text-muted-foreground leading-relaxed font-light">A multi-layered approach to modernizing the global supply chain infrastructure.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {ecoItems.map((item) => (
              <Card key={item.id} className="glass-card card-hover overflow-hidden flex flex-col h-full">
                <CardContent className="p-8 flex-1 flex flex-col">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-10 text-primary">
                    <Database className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white mb-4">{item.name}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-6">{item.description}</p>
                  </div>
                  <div className="pt-6 border-t border-white/5 flex items-center justify-between">
                    <span className="text-[9px] font-bold text-primary uppercase tracking-widest">{item.layer}</span>
                    <ArrowUpRight className="w-4 h-4 text-muted-foreground" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Preview */}
      <section className="py-40 bg-card/20">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-24">
            <div className="max-w-2xl">
              <span className="section-label">Strategic Portfolio</span>
              <h2 className="text-4xl md:text-7xl font-bold text-white">Active <span className="text-accent">Initiatives</span></h2>
            </div>
            <Button asChild variant="outline" className="h-12 px-8 rounded-full font-bold border-white/10 hover:bg-white/5">
              <Link href="/projects">View All Projects</Link>
            </Button>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {projects.slice(0, 3).map((project) => (
              <Card key={project.id} className="glass-card card-hover overflow-hidden group">
                <CardContent className="p-10 space-y-8">
                  <div className="flex justify-between items-start">
                    <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center text-accent group-hover:bg-primary transition-colors">
                      <Target className="w-7 h-7" />
                    </div>
                    <Badge className={cn(
                      "py-1 px-3 text-[9px] font-bold uppercase tracking-widest rounded-full",
                      project.status === 'Active' ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' : 
                      project.status === 'In Development' ? 'bg-amber-500/10 text-amber-500 border-amber-500/20' : 
                      'bg-white/10 text-muted-foreground border-white/10'
                    )}>
                      {project.status}
                    </Badge>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-primary transition-colors">{project.name}</h3>
                    <p className="text-muted-foreground leading-relaxed text-sm">{project.description}</p>
                  </div>
                  <div className="flex items-center gap-4 text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                    <span>{project.category}</span>
                    <div className="w-1 h-1 rounded-full bg-white/20" />
                    <span>{project.type}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-48">
        <div className="container mx-auto px-6">
          <div className="glass-card rounded-[4rem] p-16 md:p-32 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-primary/5" />
            <div className="relative z-10 space-y-12">
              <h2 className="text-5xl md:text-8xl font-bold text-white leading-tight max-w-5xl mx-auto">
                Ready to integrate with the <span className="text-primary">Nexus?</span>
              </h2>
              <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto font-light leading-relaxed">
                Connect with our strategic team to architect your global trade infrastructure.
              </p>
              <div className="pt-8">
                <Button size="lg" asChild className="btn-primary h-20 px-16 text-xl font-bold rounded-full shadow-2xl">
                  <Link href="/contact">Schedule Strategic Briefing</Link>
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