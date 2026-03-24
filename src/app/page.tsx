"use client"

import { useEffect, useState } from "react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Shield, Globe, Zap, Database, Workflow, CheckCircle2, Loader2, ArrowUpRight, Target, ShieldCheck, Activity } from "lucide-react";
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
      <div className="flex flex-col items-center gap-8">
        <Loader2 className="w-16 h-16 animate-spin text-primary" />
        <p className="text-muted-foreground text-[11px] font-bold uppercase tracking-[0.5em] animate-pulse">Establishing Nexus Link...</p>
      </div>
    </div>
  );

  const heroSection = page.sectionData.find(s => s.type === 'hero');
  const problemSection = page.sectionData.find(s => s.type === 'problem');
  const solutionSection = page.sectionData.find(s => s.type === 'solution');
  const trustSection = page.sectionData.find(s => s.type === 'trust');
  const ctaSection = page.sectionData.find(s => s.type === 'cta-final');

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        {/* Hero Section */}
        {heroSection && (
          <section className="relative pt-64 pb-48 overflow-hidden hero-glow">
            <div className="section-container text-center relative z-10 animate-fade-in">
              <span className="section-label">{heroSection.data.label}</span>
              <h1 className="gradient-text max-w-5xl mx-auto mb-8">
                {heroSection.title}
              </h1>
              <p className="mx-auto mb-16 text-xl text-muted-foreground max-w-3xl">
                {heroSection.description}
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                <Button size="lg" asChild className="btn-primary h-16 px-12 text-base font-bold min-w-[240px]">
                  <Link href="/platform">{heroSection.data.ctaPrimary} <ArrowRight className="ml-2 w-5 h-5" /></Link>
                </Button>
                <Button size="lg" variant="outline" asChild className="btn-outline h-16 px-12 text-base font-bold min-w-[240px] backdrop-blur-sm">
                  <Link href="/contact">{heroSection.data.ctaSecondary}</Link>
                </Button>
              </div>
            </div>
          </section>
        )}

        <div className="layout-stack">
          {/* Problem Section */}
          {problemSection && (
            <section className="section-vertical-padding bg-white/[0.01] border-y border-white/5">
              <div className="section-container">
                <div className="max-w-3xl mb-16">
                  <span className="section-label">Structural Friction</span>
                  <h2>{problemSection.title}</h2>
                  <p className="text-lg text-muted-foreground">{problemSection.description}</p>
                </div>
                <div className="grid md:grid-cols-3 gap-8">
                  {problemSection.data.points.map((point: any, i: number) => (
                    <Card key={i} className="glass-card border-white/5 p-10 hover:border-destructive/20 transition-all">
                      <div className="w-12 h-12 rounded-xl bg-destructive/10 flex items-center justify-center text-destructive mb-8">
                        <Zap className="w-6 h-6" />
                      </div>
                      <h3 className="text-xl font-bold mb-4">{point.title}</h3>
                      <p className="text-sm text-muted-foreground">{point.desc}</p>
                    </Card>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* Solution Section */}
          {solutionSection && (
            <section className="section-vertical-padding">
              <div className="section-container">
                <div className="grid lg:grid-cols-2 gap-24 items-center">
                  <div className="space-y-12">
                    <div className="space-y-6">
                      <span className="section-label">The Baalvion Solution</span>
                      <h2>{solutionSection.title}</h2>
                      <p className="text-lg text-muted-foreground">{solutionSection.description}</p>
                    </div>
                    <div className="space-y-8">
                      {solutionSection.data.features.map((feat: any, i: number) => (
                        <div key={i} className="flex gap-6 items-start group">
                          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
                            <CheckCircle2 className="w-6 h-6" />
                          </div>
                          <div className="space-y-2">
                            <h4 className="text-xl font-bold text-white">{feat.title}</h4>
                            <p className="text-base text-muted-foreground">{feat.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="glass-card p-12 lg:p-20 border-primary/20 bg-primary/[0.02] relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] -mr-32 -mt-32" />
                    <div className="relative z-10 text-center space-y-12">
                      <Workflow className="w-20 h-20 text-primary mx-auto" />
                      <h3 className="text-4xl font-bold leading-tight">Unified <br/>Global Trade <br/>OS</h3>
                      <p className="text-muted-foreground mx-auto">Connecting every node of the global supply chain into a single, high-speed execution layer.</p>
                      <Button asChild size="lg" className="btn-primary w-full h-16 text-lg font-bold">
                        <Link href="/platform">Learn How It Works</Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* Ecosystem Preview */}
          <section className="section-vertical-padding bg-white/[0.01] border-y border-white/5">
            <div className="section-container">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-12 mb-16">
                <div className="max-w-2xl space-y-6">
                  <span className="section-label">Nexus Architecture</span>
                  <h2 className="mb-0">A Modular <span className="text-primary">Ecosystem</span></h2>
                  <p className="text-lg text-muted-foreground">Strategic infrastructure architected for global scale and deep market integration.</p>
                </div>
                <Button asChild variant="outline" className="btn-outline h-14 px-10 font-bold">
                  <Link href="/ecosystem">Explore Architecture <ArrowRight className="ml-2 w-5 h-5" /></Link>
                </Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {ecoItems.slice(0, 4).map((item) => (
                  <Card key={item.id} className="glass-card card-hover flex flex-col h-full border-white/5">
                    <CardContent className="p-10 flex flex-col h-full">
                      <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-10 text-primary border border-primary/10">
                        <Database className="w-6 h-6" />
                      </div>
                      <div className="space-y-4 flex-1">
                        <h3 className="text-xl font-bold text-white">{item.name}</h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
                      </div>
                      <div className="pt-8 mt-8 border-t border-white/5">
                        <span className="text-[10px] font-bold text-primary uppercase tracking-widest">{item.layer} Layer</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>

          {/* Projects Preview */}
          <section className="section-vertical-padding">
            <div className="section-container">
              <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-12 mb-16">
                <div className="max-w-2xl space-y-6">
                  <span className="section-label">Strategic Initiatives</span>
                  <h2 className="mb-0">Nexus <span className="text-accent">Portfolio</span></h2>
                  <p className="text-lg text-muted-foreground">High-impact infrastructure projects resolving global trade fragmentation.</p>
                </div>
                <Button asChild variant="outline" className="btn-outline h-14 px-10 font-bold">
                  <Link href="/projects">View All Projects <ArrowRight className="ml-2 w-5 h-5" /></Link>
                </Button>
              </div>
              <div className="grid md:grid-cols-3 gap-8">
                {projects.slice(0, 3).map((project) => (
                  <Card key={project.id} className="glass-card card-hover group border-white/5">
                    <CardContent className="p-10 space-y-12">
                      <div className="flex justify-between items-start">
                        <div className="w-14 h-14 bg-white/5 rounded-xl flex items-center justify-center text-accent group-hover:bg-primary transition-all border border-white/5">
                          <Target className="w-6 h-6" />
                        </div>
                        <Badge className={cn(
                          "py-1 px-4 text-[9px] font-bold uppercase tracking-widest rounded-full border",
                          project.status === 'Active' ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' : 
                          project.status === 'In Development' ? 'bg-amber-500/10 text-amber-500 border-amber-500/20' : 
                          'bg-white/10 text-muted-foreground border-white/10'
                        )}>
                          {project.status}
                        </Badge>
                      </div>
                      <div className="space-y-4">
                        <h3 className="text-2xl font-bold group-hover:text-primary transition-colors">{project.name}</h3>
                        <p className="line-clamp-2 text-base text-muted-foreground">{project.description}</p>
                      </div>
                      <div className="flex items-center gap-4 text-[10px] font-bold text-muted-foreground uppercase tracking-widest pt-8 border-t border-white/5">
                        <span className="text-primary">{project.category}</span>
                        <span>{project.type}</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>

          {/* Trust Section */}
          {trustSection && (
            <section className="section-vertical-padding bg-white/[0.01] border-y border-white/5">
              <div className="section-container">
                <div className="text-center max-w-3xl mx-auto mb-20 space-y-6">
                  <span className="section-label">Trust & Governance</span>
                  <h2>{trustSection.title}</h2>
                  <p className="text-lg text-muted-foreground">{trustSection.description}</p>
                </div>
                <div className="grid md:grid-cols-3 gap-12">
                  {trustSection.data.metrics.map((metric: any, i: number) => (
                    <div key={i} className="text-center space-y-4">
                      <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mx-auto mb-8 border border-primary/20">
                        {i === 0 ? <Globe className="w-8 h-8" /> : i === 1 ? <ShieldCheck className="w-8 h-8" /> : <Activity className="w-8 h-8" />}
                      </div>
                      <p className="text-4xl font-bold text-white">{metric.value}</p>
                      <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">{metric.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* Final CTA */}
          {ctaSection && (
            <section className="section-vertical-padding pb-48">
              <div className="section-container">
                <div className="glass-card p-12 md:p-24 text-center relative overflow-hidden border-primary/20 bg-primary/[0.01]">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(var(--primary),0.05)_0%,transparent_100%)] opacity-50" />
                  <div className="relative z-10 space-y-12">
                    <h2 className="max-w-4xl mx-auto mb-0 text-3xl md:text-5xl font-bold leading-tight">
                      {ctaSection.title}
                    </h2>
                    <p className="text-lg md:text-xl max-w-2xl mx-auto text-muted-foreground">
                      {ctaSection.description}
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-6 pt-8">
                      <Button size="lg" asChild className="btn-primary h-16 px-12 text-lg font-bold">
                        <Link href="/contact">{ctaSection.data.ctaPrimary}</Link>
                      </Button>
                      <Button size="lg" variant="outline" asChild className="btn-outline h-16 px-12 text-lg font-bold backdrop-blur-md">
                        <Link href="/trust">{ctaSection.data.ctaSecondary}</Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
