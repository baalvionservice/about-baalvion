"use client"

import { useEffect, useState } from "react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Globe, Zap, Database, Workflow, CheckCircle2, Loader2, Target, ShieldCheck, Activity, Star, BarChart3 } from "lucide-react";
import Link from "next/link";
import { Project, EcosystemItem, Page } from "@/lib/db";
import { cn } from "@/lib/utils";

interface PopulatedPage extends Page {
  sectionData: any[];
}

export default function HomePageClient() {
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
      <div className="flex flex-col items-center gap-8">
        <Loader2 className="w-16 h-16 animate-spin text-primary" />
        <p className="text-muted-foreground text-[11px] font-bold uppercase tracking-[0.5em]">Establishing Secure Nexus...</p>
      </div>
    </div>
  );

  const heroSection = page.sectionData.find(s => s.type === 'hero');
  const problemSection = page.sectionData.find(s => s.type === 'problem');
  const solutionSection = page.sectionData.find(s => s.type === 'solution');
  const ctaSection = page.sectionData.find(s => s.type === 'cta-final');

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        {/* HERO SECTION */}
        {heroSection && (
          <section className="relative pt-64 pb-32 overflow-hidden hero-glow">
            <div className="section-container text-center relative z-10 animate-fade-in">
              <span className="section-label">{heroSection.data.label}</span>
              <h1 className="gradient-text max-w-5xl mx-auto mb-8 text-5xl md:text-8xl leading-tight font-bold">
                {heroSection.title}
              </h1>
              <p className="mx-auto mb-12 text-xl md:text-2xl text-muted-foreground max-w-3xl font-light leading-relaxed">
                {heroSection.description}
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-24">
                <Button size="lg" asChild className="h-16 px-12 text-lg font-bold min-w-[240px] rounded-2xl shadow-2xl">
                  <Link href="/platform">{heroSection.data.ctaPrimary} <ArrowRight className="ml-2 w-5 h-5" /></Link>
                </Button>
                <Button size="lg" variant="outline" asChild className="h-16 px-12 text-lg font-bold min-w-[240px] rounded-2xl border-white/10 hover:bg-white/5">
                  <Link href="/contact">{heroSection.data.ctaSecondary}</Link>
                </Button>
              </div>

              {/* STATS TICKER */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-12 border-t border-white/5 pt-12 max-w-4xl mx-auto">
                {heroSection.data.stats.map((stat: any, i: number) => (
                  <div key={i} className="space-y-2">
                    <p className="text-4xl font-bold text-white tracking-tighter">{stat.value}</p>
                    <p className="text-[10px] font-bold text-primary uppercase tracking-[0.4em]">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
            {/* Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[600px] bg-primary/10 blur-[150px] rounded-full -z-10 opacity-30" />
          </section>
        )}

        {/* PROBLEM SECTION */}
        {problemSection && (
          <section className="section-vertical-padding bg-black/40 border-y border-white/5">
            <div className="section-container">
              <div className="max-w-3xl mb-24">
                <span className="section-label">Terminal Friction</span>
                <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">{problemSection.title}</h2>
                <p className="text-xl text-muted-foreground leading-relaxed">{problemSection.description}</p>
              </div>
              
              <div className="grid md:grid-cols-3 gap-8">
                {problemSection.data.points.map((point: any, i: number) => (
                  <Card key={i} className="glass-card p-12 hover:border-primary/40 transition-all duration-700">
                    <div className="w-16 h-16 rounded-2xl bg-destructive/10 flex items-center justify-center text-destructive mb-8">
                      {i === 0 ? <Workflow className="w-8 h-8" /> : i === 1 ? <ShieldCheck className="w-8 h-8" /> : <BarChart3 className="w-8 h-8" />}
                    </div>
                    <h3 className="text-2xl font-bold mb-4">{point.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{point.desc}</p>
                  </Card>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* SOLUTION SECTION */}
        {solutionSection && (
          <section className="section-vertical-padding">
            <div className="section-container">
              <div className="grid lg:grid-cols-2 gap-32 items-center">
                <div className="space-y-12">
                  <div className="space-y-6">
                    <span className="section-label">The Baalvion OS</span>
                    <h2 className="text-4xl md:text-6xl font-bold text-white leading-tight">{solutionSection.title}</h2>
                    <p className="text-xl text-muted-foreground leading-relaxed">{solutionSection.description}</p>
                  </div>
                  <div className="space-y-8">
                    {solutionSection.data.features.map((feat: any, i: number) => (
                      <div key={i} className="flex gap-8 items-start group">
                        <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-700 shadow-xl">
                          <CheckCircle2 className="w-7 h-7" />
                        </div>
                        <div className="space-y-2 pt-2">
                          <h4 className="text-2xl font-bold text-white group-hover:text-primary transition-colors">{feat.title}</h4>
                          <p className="text-lg text-muted-foreground">{feat.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="glass-card p-16 md:p-24 bg-primary/[0.02] border-primary/10 relative overflow-hidden group">
                  <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                  <div className="relative z-10 space-y-12 text-center">
                    <Globe className="w-24 h-24 text-primary mx-auto animate-pulse" />
                    <h3 className="text-4xl font-bold leading-tight">Unified <br/>Infrastructure <br/>Layer</h3>
                    <p className="text-muted-foreground text-lg italic">"A single protocol connecting every node of the global trade nexus."</p>
                    <Button asChild size="lg" className="w-full h-18 text-xl font-bold rounded-2xl shadow-2xl">
                      <Link href="/platform">Explore Platform Architecture</Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ECOSYSTEM PREVIEW */}
        <section className="section-vertical-padding bg-black/20 border-t border-white/5">
          <div className="section-container">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-12 mb-20">
              <div className="max-w-2xl space-y-6">
                <span className="section-label">Nexus Portfolio</span>
                <h2 className="mb-0 text-white">Multi-Layered <span className="text-primary">Ecosystem</span></h2>
                <p className="text-xl text-muted-foreground">Strategically resolving global commerce bottlenecks through modular infrastructure.</p>
              </div>
              <Button asChild variant="outline" className="h-14 px-10 rounded-2xl font-bold">
                <Link href="/ecosystem" className="flex items-center gap-2">Explore All Layers <ArrowRight className="w-5 h-5" /></Link>
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {ecoItems.slice(0, 4).map((item, i) => (
                <Card key={item.id} className="glass-card group hover:border-primary/40 p-0 overflow-hidden h-full">
                  <div className="p-12 space-y-10 flex flex-col h-full">
                    <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                      {i === 0 ? <Database className="w-8 h-8" /> : i === 1 ? <Target className="w-8 h-8" /> : i === 2 ? <ShieldCheck className="w-8 h-8" /> : <Globe className="w-8 h-8" />}
                    </div>
                    <div className="space-y-4 flex-1">
                      <h3 className="text-2xl font-bold text-white group-hover:text-primary transition-colors">{item.name}</h3>
                      <p className="text-muted-foreground leading-relaxed">{item.description}</p>
                    </div>
                    <div className="pt-8 border-t border-white/5">
                      <span className="text-[10px] font-bold text-primary uppercase tracking-[0.3em]">{item.layer} LAYER</span>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* EXECUTION LAYER / PROJECTS */}
        <section className="section-vertical-padding border-t border-white/5">
          <div className="section-container">
            <div className="text-center max-w-3xl mx-auto mb-20 space-y-6">
              <span className="section-label">Execution Layer</span>
              <h2 className="text-4xl md:text-6xl font-bold text-white">What We're <span className="text-primary">Building</span></h2>
              <p className="text-xl text-muted-foreground">Every initiative contributes to a unified global trade infrastructure.</p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-10">
              {projects.slice(0, 3).map((project, i) => (
                <Card key={project.id} className="glass-card group hover:border-accent/40 border-white/5">
                  <CardContent className="p-12 space-y-12">
                    <div className="flex justify-between items-start">
                      <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-white transition-all duration-500">
                        <Activity className="w-7 h-7" />
                      </div>
                      <Badge className={cn(
                        "py-1.5 px-5 text-[9px] font-bold uppercase tracking-widest rounded-full border",
                        project.status === 'Active' ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' : 
                        project.status === 'In Development' ? 'bg-amber-500/10 text-amber-500 border-amber-500/20' : 
                        'bg-white/10 text-muted-foreground border-white/10'
                      )}>
                        {project.status}
                      </Badge>
                    </div>
                    <div className="space-y-4">
                      <h3 className="text-2xl font-bold text-white group-hover:text-accent transition-colors">{project.name}</h3>
                      <p className="text-muted-foreground leading-relaxed line-clamp-2">{project.description}</p>
                    </div>
                    <div className="pt-8 border-t border-white/5 flex justify-between items-center">
                      <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">{project.category}</span>
                      <Link href={`/projects/${project.id}`} className="text-accent hover:text-white transition-colors">
                        <ArrowRight className="w-6 h-6" />
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            <div className="text-center mt-20">
              <Button asChild variant="outline" className="h-16 px-16 text-lg font-bold rounded-2xl border-white/10 hover:bg-white/5">
                <Link href="/projects">View Strategic Portfolio</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* TRUST SECTION */}
        <section className="section-vertical-padding bg-primary/[0.01] border-y border-white/5">
          <div className="section-container">
            <div className="text-center max-w-4xl mx-auto space-y-16">
              <div className="space-y-6">
                <span className="section-label">Institutional Integrity</span>
                <h2 className="text-4xl md:text-6xl font-bold text-white">Trusted by Financiers and <span className="text-primary">Regulators</span></h2>
                <p className="text-xl text-muted-foreground">Baalvion is architected to the highest enterprise governance standards.</p>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-12 opacity-50 grayscale hover:grayscale-0 transition-all duration-1000">
                {/* Placeholder Logos */}
                <div className="flex flex-col items-center gap-4">
                  <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center"><Target className="w-10 h-10" /></div>
                  <p className="text-[10px] font-bold uppercase tracking-widest">Global Logistics</p>
                </div>
                <div className="flex flex-col items-center gap-4">
                  <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center"><Database className="w-10 h-10" /></div>
                  <p className="text-[10px] font-bold uppercase tracking-widest">FinTech Alliance</p>
                </div>
                <div className="flex flex-col items-center gap-4">
                  <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center"><ShieldCheck className="w-10 h-10" /></div>
                  <p className="text-[10px] font-bold uppercase tracking-widest">Regulatory Board</p>
                </div>
                <div className="flex flex-col items-center gap-4">
                  <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center"><Activity className="w-10 h-10" /></div>
                  <p className="text-[10px] font-bold uppercase tracking-widest">Trade Council</p>
                </div>
              </div>

              <div className="flex flex-wrap justify-center gap-6 pt-12">
                <Badge variant="outline" className="py-2 px-6 rounded-full border-white/10 text-white font-bold uppercase text-[10px] tracking-widest">Compliance First</Badge>
                <Badge variant="outline" className="py-2 px-6 rounded-full border-white/10 text-white font-bold uppercase text-[10px] tracking-widest">AI-Powered</Badge>
                <Badge variant="outline" className="py-2 px-6 rounded-full border-white/10 text-white font-bold uppercase text-[10px] tracking-widest">Global Coverage</Badge>
              </div>
            </div>
          </div>
        </section>

        {/* FINAL CTA */}
        {ctaSection && (
          <section className="section-vertical-padding pb-48">
            <div className="section-container">
              <div className="glass-card p-20 md:p-32 text-center relative overflow-hidden bg-primary/[0.02] border-primary/20">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(var(--primary),0.05)_0%,transparent_100%)] opacity-30" />
                <div className="relative z-10 space-y-12">
                  <h2 className="text-4xl md:text-7xl font-bold text-white leading-tight mb-0">
                    {ctaSection.title}
                  </h2>
                  <p className="text-xl md:text-2xl max-w-3xl mx-auto text-muted-foreground font-light">
                    {ctaSection.description}
                  </p>
                  <div className="flex flex-col sm:flex-row justify-center gap-8 pt-12">
                    <Button size="lg" asChild className="h-20 px-16 text-xl font-bold rounded-3xl shadow-2xl">
                      <Link href="/platform">{ctaSection.data.ctaPrimary}</Link>
                    </Button>
                    <Button size="lg" variant="outline" asChild className="h-20 px-16 text-xl font-bold rounded-3xl border-white/10 hover:bg-white/5">
                      <Link href="/contact">{ctaSection.data.ctaSecondary}</Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
}
