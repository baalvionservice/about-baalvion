"use client"

import { useEffect, useState } from "react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Globe, Zap, Database, Workflow, CheckCircle2, Loader2, Target, ShieldCheck, Activity, Star, BarChart3, Lock, Users } from "lucide-react";
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
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <Loader2 className="w-10 h-10 animate-spin text-primary" />
        <p className="text-gray-400 text-xs font-bold uppercase tracking-widest">Loading Baalvion Nexus...</p>
      </div>
    </div>
  );

  const heroSection = page.sectionData.find(s => s.type === 'hero');
  const problemSection = page.sectionData.find(s => s.type === 'problem');
  const solutionSection = page.sectionData.find(s => s.type === 'solution');
  const ctaSection = page.sectionData.find(s => s.type === 'cta-final');

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        {/* HERO SECTION */}
        {heroSection && (
          <section className="relative pt-40 pb-24 overflow-hidden border-b border-gray-100">
            <div className="section-container relative z-10 animate-fade-in">
              <div className="max-w-4xl">
                <span className="section-label">{heroSection.data.label}</span>
                <h1 className="text-gray-900 mb-6">
                  {heroSection.title}
                </h1>
                <p className="mb-10 text-gray-600 max-w-2xl font-medium">
                  {heroSection.description}
                </p>
                
                <div className="flex flex-col sm:flex-row items-center gap-4 mb-16">
                  <Button size="lg" asChild className="h-14 px-10 btn-primary w-full sm:w-auto">
                    <Link href="/platform">{heroSection.data.ctaPrimary} <ArrowRight className="ml-2 w-4 h-4" /></Link>
                  </Button>
                  <Button size="lg" variant="outline" asChild className="h-14 px-10 btn-outline w-full sm:w-auto">
                    <Link href="/contact">{heroSection.data.ctaSecondary}</Link>
                  </Button>
                </div>

                {/* STATS TICKER */}
                <div className="flex flex-wrap gap-12 pt-8 border-t border-gray-100">
                  {heroSection.data.stats.map((stat: any, i: number) => (
                    <div key={i} className="space-y-1">
                      <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                      <p className="text-[10px] font-bold text-primary uppercase tracking-widest">{stat.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            {/* Visual background placeholder */}
            <div className="absolute top-0 right-0 w-1/3 h-full bg-gray-50 -z-10 hidden lg:block" />
          </section>
        )}

        {/* PROBLEM SECTION */}
        {problemSection && (
          <section className="section-vertical-padding bg-gray-50 border-b border-gray-100">
            <div className="section-container">
              <div className="max-w-3xl mb-16">
                <span className="section-label">The Challenge</span>
                <h2 className="text-gray-900 mb-4">{problemSection.title}</h2>
                <p className="text-gray-600">{problemSection.description}</p>
              </div>
              
              <div className="grid md:grid-cols-3 gap-8">
                {problemSection.data.points.map((point: any, i: number) => (
                  <Card key={i} className="glass-card p-8 hover:shadow-md transition-all border-none">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-6">
                      {i === 0 ? <Workflow className="w-6 h-6" /> : i === 1 ? <ShieldCheck className="w-6 h-6" /> : <BarChart3 className="w-6 h-6" />}
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{point.title}</h3>
                    <p className="text-gray-500 text-sm">{point.desc}</p>
                  </Card>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* SOLUTION SECTION */}
        {solutionSection && (
          <section className="section-vertical-padding bg-white border-b border-gray-100">
            <div className="section-container">
              <div className="grid lg:grid-cols-2 gap-24 items-center">
                <div className="space-y-10">
                  <div className="space-y-4">
                    <span className="section-label">The Operating System</span>
                    <h2 className="text-gray-900">{solutionSection.title}</h2>
                    <p className="text-gray-600">{solutionSection.description}</p>
                  </div>
                  <div className="space-y-6">
                    {solutionSection.data.features.map((feat: any, i: number) => (
                      <div key={i} className="flex gap-6 items-start">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                          <CheckCircle2 className="w-5 h-5" />
                        </div>
                        <div className="space-y-1">
                          <h4 className="text-lg font-bold text-gray-900">{feat.title}</h4>
                          <p className="text-sm text-gray-500">{feat.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="bg-gray-50 rounded-2xl p-12 lg:p-16 text-center space-y-8">
                  <Globe className="w-16 h-16 text-primary mx-auto" />
                  <h3 className="text-2xl text-gray-900">Unified Infrastructure Layer</h3>
                  <p className="text-gray-500 italic">"A single protocol connecting every node of the global trade nexus."</p>
                  <Button asChild className="w-full h-12 btn-primary rounded-lg">
                    <Link href="/platform">Explore Platform Architecture</Link>
                  </Button>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ECOSYSTEM PREVIEW */}
        <section className="section-vertical-padding bg-gray-50 border-b border-gray-100">
          <div className="section-container">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
              <div className="max-w-2xl space-y-4">
                <span className="section-label">Nexus Portfolio</span>
                <h2 className="mb-0 text-gray-900">Multi-Layered Ecosystem</h2>
                <p className="text-gray-600">Strategically resolving global commerce bottlenecks.</p>
              </div>
              <Button asChild variant="outline" className="btn-outline h-12">
                <Link href="/ecosystem">Explore All Layers <ArrowRight className="ml-2 w-4 h-4" /></Link>
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {ecoItems.slice(0, 4).map((item, i) => (
                <Card key={item.id} className="bg-white border-none shadow-sm hover:shadow-md transition-all rounded-xl h-full">
                  <div className="p-8 space-y-6 flex flex-col h-full">
                    <div className="w-12 h-12 bg-primary/5 rounded-lg flex items-center justify-center text-primary">
                      {i === 0 ? <Database className="w-6 h-6" /> : i === 1 ? <Target className="w-6 h-6" /> : i === 2 ? <ShieldCheck className="w-6 h-6" /> : <Globe className="w-6 h-6" />}
                    </div>
                    <div className="space-y-2 flex-1">
                      <h3 className="text-lg font-bold text-gray-900">{item.name}</h3>
                      <p className="text-gray-500 text-sm leading-relaxed">{item.description}</p>
                    </div>
                    <div className="pt-4 border-t border-gray-50">
                      <span className="text-[10px] font-bold text-primary uppercase tracking-widest">{item.layer} LAYER</span>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* EXECUTION LAYER / PROJECTS */}
        <section className="section-vertical-padding bg-white">
          <div className="section-container">
            <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
              <span className="section-label">Execution Layer</span>
              <h2 className="text-gray-900">What We're Building</h2>
              <p className="text-gray-600">Every initiative contributes to a unified global trade infrastructure.</p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6">
              {projects.slice(0, 3).map((project) => (
                <Card key={project.id} className="bg-white border border-gray-100 shadow-sm hover:shadow-md transition-all rounded-xl">
                  <CardContent className="p-8 space-y-6">
                    <div className="flex justify-between items-start">
                      <div className="w-10 h-10 bg-gray-50 rounded-lg flex items-center justify-center text-primary">
                        <Activity className="w-5 h-5" />
                      </div>
                      <Badge className={cn(
                        "py-1 px-3 text-[9px] font-bold uppercase rounded-md border",
                        project.status === 'Active' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 
                        project.status === 'In Development' ? 'bg-amber-50 text-amber-600 border-amber-100' : 
                        'bg-gray-50 text-gray-500 border-gray-100'
                      )}>
                        {project.status}
                      </Badge>
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-xl font-bold text-gray-900">{project.name}</h3>
                      <p className="text-gray-500 text-sm line-clamp-2">{project.description}</p>
                    </div>
                    <div className="pt-6 border-t border-gray-50 flex justify-between items-center">
                      <span className="text-[10px] font-bold text-primary uppercase tracking-widest">{project.category}</span>
                      <Link href={`/projects/${project.id}`} className="text-primary hover:translate-x-1 transition-transform">
                        <ArrowRight className="w-5 h-5" />
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            <div className="text-center mt-12">
              <Button asChild variant="outline" className="btn-outline h-12 px-10">
                <Link href="/projects">View Strategic Portfolio</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* FINAL CTA */}
        {ctaSection && (
          <section className="section-vertical-padding bg-gray-50">
            <div className="section-container">
              <div className="bg-white p-12 md:p-20 text-center rounded-2xl shadow-sm border border-gray-100">
                <div className="max-w-3xl mx-auto space-y-8">
                  <h2 className="text-gray-900 leading-tight mb-0">
                    {ctaSection.title}
                  </h2>
                  <p className="text-gray-600">
                    {ctaSection.description}
                  </p>
                  <div className="flex flex-col sm:flex-row justify-center gap-4">
                    <Button size="lg" asChild className="h-14 px-12 btn-primary rounded-lg">
                      <Link href="/platform">{ctaSection.data.ctaPrimary}</Link>
                    </Button>
                    <Button size="lg" variant="outline" asChild className="h-14 px-12 btn-outline rounded-lg">
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
