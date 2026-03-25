"use client"

import { useEffect, useState } from "react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowRight, Globe, Database, Workflow, CheckCircle2, 
  Loader2, Target, ShieldCheck, Activity, BarChart3, 
  Cpu, Zap, Leaf, Mail, Milestone, Users, Star,
  ShieldAlert, Globe2, TrendingUp, Search
} from "lucide-react";
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
        <p className="text-gray-400 text-xs font-bold uppercase tracking-widest">Syncing Baalvion Operating System (BOS)...</p>
      </div>
    </div>
  );

  const sections = page?.sectionData || [];
  const heroSection = sections.find(s => s.type === 'hero');
  const problemSection = sections.find(s => s.type === 'problem');
  const solutionSection = sections.find(s => s.type === 'solution');
  const ctaSection = sections.find(s => s.type === 'cta-final');

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        {/* HERO SECTION */}
        {heroSection && (
          <section className="relative pt-40 pb-20 border-b border-gray-100 bg-white overflow-hidden">
            <div className="section-container relative z-10 animate-fade-in">
              <div className="max-w-4xl">
                <span className="section-label">{heroSection.data?.label}</span>
                <h1 className="text-gray-900 mb-6 font-bold leading-[1.1] tracking-tight">
                  {heroSection.title}
                </h1>
                <p className="mb-10 text-gray-600 text-lg md:text-xl max-w-2xl font-medium">
                  {heroSection.description}
                </p>
                
                <div className="flex flex-col sm:flex-row items-center gap-4 mb-16">
                  <Button size="lg" asChild className="h-12 px-10 btn-primary w-full sm:w-auto">
                    <Link href="/platform" className="flex items-center">{heroSection.data?.ctaPrimary} <ArrowRight className="ml-2 w-4 h-4" /></Link>
                  </Button>
                  <Button size="lg" variant="outline" asChild className="h-12 px-10 btn-outline w-full sm:w-auto">
                    <Link href="/contact">{heroSection.data?.ctaSecondary}</Link>
                  </Button>
                </div>

                {/* STATS TICKER */}
                <div className="flex flex-wrap gap-12 pt-10 border-t border-gray-100">
                  {heroSection.data?.stats?.map((stat: any, i: number) => (
                    <div key={i} className="space-y-1">
                      <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                      <p className="text-[11px] font-bold text-primary uppercase tracking-widest">{stat.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="absolute top-0 right-0 w-1/3 h-full bg-gray-50/50 -z-10 hidden lg:block" />
          </section>
        )}

        {/* PROBLEM SECTION */}
        {problemSection && (
          <section className="section-vertical-padding bg-gray-50 border-b border-gray-100">
            <div className="section-container">
              <div className="max-w-3xl mb-16">
                <span className="section-label">The Challenge</span>
                <h2 className="text-gray-900 mb-4 font-bold">{problemSection.title}</h2>
                <p className="text-gray-600 text-lg leading-relaxed">{problemSection.description}</p>
              </div>
              
              <div className="grid md:grid-cols-3 gap-8">
                {problemSection.data?.points?.map((point: any, i: number) => (
                  <Card key={i} className="bg-white p-8 shadow-sm border border-gray-100 rounded-lg hover:shadow-md transition-shadow">
                    <div className="w-12 h-12 rounded-sm bg-primary/5 flex items-center justify-center text-primary mb-6">
                      {i === 0 ? <Workflow className="w-6 h-6" /> : i === 1 ? <ShieldCheck className="w-6 h-6" /> : <BarChart3 className="w-6 h-6" />}
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{point.title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{point.desc}</p>
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
              <div className="grid lg:grid-cols-2 gap-20 items-center">
                <div className="space-y-10">
                  <div className="space-y-4">
                    <span className="section-label">Baalvion Operating System (BOS)</span>
                    <h2 className="text-gray-900 font-bold">{solutionSection.title}</h2>
                    <p className="text-gray-600 text-lg leading-relaxed">{solutionSection.description}</p>
                  </div>
                  <div className="space-y-6">
                    {solutionSection.data?.features?.map((feat: any, i: number) => (
                      <div key={i} className="flex gap-4 items-start">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                          <CheckCircle2 className="w-4 h-4" />
                        </div>
                        <div className="space-y-1">
                          <h4 className="text-lg font-bold text-gray-900">{feat.title}</h4>
                          <p className="text-sm text-gray-600">{feat.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="bg-gray-50 rounded-lg p-10 lg:p-16 text-center space-y-8 border border-gray-100">
                  <Globe className="w-16 h-16 text-primary mx-auto" />
                  <h3 className="text-2xl font-bold text-gray-900">Unified Infrastructure Layer</h3>
                  <p className="text-gray-600 italic font-medium">"A single protocol connecting every node of the global trade Baalvion Operating System (BOS)."</p>
                  <Button asChild className="w-full h-12 btn-primary font-bold">
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
                <span className="section-label">Baalvion Operating System (BOS) Portfolio</span>
                <h2 className="mb-0 text-gray-900 font-bold">Multi-Layered Ecosystem</h2>
                <p className="text-gray-600 text-lg">Strategically resolving global commerce bottlenecks.</p>
              </div>
              <Button asChild variant="outline" className="btn-outline h-12 px-8">
                <Link href="/ecosystem">Explore All Layers <ArrowRight className="ml-2 w-4 h-4" /></Link>
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {ecoItems.slice(0, 4).map((item, i) => (
                <Card key={item.id} className="bg-white border border-gray-100 shadow-sm hover:shadow-md transition-all rounded-lg group">
                  <div className="p-8 space-y-6 flex flex-col h-full">
                    <div className="w-12 h-12 bg-primary/5 rounded-sm flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
                      {i === 0 ? <Database className="w-6 h-6" /> : i === 1 ? <Target className="w-6 h-6" /> : i === 2 ? <ShieldCheck className="w-6 h-6" /> : <Globe className="w-6 h-6" />}
                    </div>
                    <div className="space-y-2 flex-1">
                      <h3 className="text-lg font-bold text-gray-900 group-hover:text-primary transition-colors">{item.name}</h3>
                      <p className="text-gray-600 text-sm leading-relaxed">{item.description}</p>
                    </div>
                    <div className="pt-4 border-t border-gray-50">
                      <span className="text-[11px] font-bold text-primary uppercase tracking-widest">{item.layer} LAYER</span>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* PROJECTS PREVIEW */}
        <section className="section-vertical-padding bg-white border-b border-gray-100">
          <div className="section-container">
            <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
              <span className="section-label">Execution Layer</span>
              <h2 className="text-gray-900 font-bold">What We're Building</h2>
              <p className="text-gray-600 text-lg">Every initiative contributes to a unified global trade infrastructure.</p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6">
              {projects.slice(0, 3).map((project) => (
                <Card key={project.id} className="bg-white border border-gray-100 shadow-sm hover:shadow-md transition-all rounded-lg group">
                  <CardContent className="p-8 space-y-6">
                    <div className="flex justify-between items-start">
                      <div className="w-10 h-10 bg-gray-50 rounded-sm flex items-center justify-center text-primary group-hover:bg-primary/10 transition-colors">
                        <Activity className="w-5 h-5" />
                      </div>
                      <Badge className={cn(
                        "py-1 px-3 text-[10px] font-bold uppercase rounded-sm border",
                        project.status === 'Active' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 
                        project.status === 'In Development' ? 'bg-amber-50 text-amber-600 border-amber-100' : 
                        'bg-gray-50 text-gray-500 border-gray-100'
                      )}>
                        {project.status}
                      </Badge>
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-xl font-bold text-gray-900 group-hover:text-primary transition-colors">{project.name}</h3>
                      <p className="text-gray-600 text-sm line-clamp-2 leading-relaxed">{project.description}</p>
                    </div>
                    <div className="pt-6 border-t border-gray-50 flex justify-between items-center">
                      <span className="text-[11px] font-bold text-primary uppercase tracking-widest">{project.category}</span>
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

        {/* AI & TECHNOLOGY HIGHLIGHTS */}
        <section className="section-vertical-padding bg-gray-50 border-b border-gray-100">
          <div className="section-container">
            <div className="grid lg:grid-cols-2 gap-20 items-center">
              <div className="relative order-2 lg:order-1">
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { icon: Cpu, title: "AI Vendor Scoring", desc: "Predictive risk analysis for global supply chains." },
                    { icon: Zap, title: "Clearing Automation", desc: "Instant settlement protocols for trade finance." },
                    { icon: ShieldCheck, title: "Compliance Core", desc: "Automated legal mapping across 180+ regions." },
                    { icon: BarChart3, title: "Predictive Intel", desc: "Real-time market insights and demand forecasting." }
                  ].map((item, i) => (
                    <div key={i} className="p-8 bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-xl transition-all group">
                      <item.icon className="w-8 h-8 text-primary mb-4 group-hover:scale-110 transition-transform" />
                      <h4 className="text-lg font-bold text-gray-900 mb-2">{item.title}</h4>
                      <p className="text-xs text-gray-500 leading-relaxed">{item.desc}</p>
                    </div>
                  ))}
                </div>
                <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
              </div>
              <div className="space-y-8 order-1 lg:order-2">
                <span className="section-label">Intelligence Layer</span>
                <h2 className="text-gray-900 font-bold leading-tight">Advanced AI Orchestration for Global Trade</h2>
                <p className="text-lg text-gray-600">
                  The Baalvion Operating System (BOS) leverages custom machine learning models to eliminate friction in international commerce, automating compliance and risk scoring in real-time.
                </p>
                <ul className="space-y-4">
                  <li className="flex items-center gap-3 text-sm font-bold text-gray-700">
                    <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center text-primary"><CheckCircle2 className="w-3 h-3" /></div>
                    Automated KYC/AML verification protocols
                  </li>
                  <li className="flex items-center gap-3 text-sm font-bold text-gray-700">
                    <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center text-primary"><CheckCircle2 className="w-3 h-3" /></div>
                    Dynamic multi-currency clearing engine
                  </li>
                  <li className="flex items-center gap-3 text-sm font-bold text-gray-700">
                    <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center text-primary"><CheckCircle2 className="w-3 h-3" /></div>
                    Localized intelligence for 198 markets
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* INTERACTIVE GLOBAL TRADE MAP */}
        <section className="section-vertical-padding bg-white border-b border-gray-100 overflow-hidden">
          <div className="section-container">
            <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
              <span className="section-label">Global Presence</span>
              <h2 className="text-gray-900 font-bold">198 Markets. One Operating System.</h2>
              <p className="text-gray-600">Explore the connectivity of the Baalvion BOS network across international trade hubs.</p>
            </div>

            <div className="relative aspect-[21/9] bg-gray-50 rounded-[2.5rem] border border-gray-100 p-8 flex items-center justify-center group overflow-hidden">
              <div className="absolute inset-0 opacity-10 bg-[url('https://picsum.photos/seed/map/1200/800')] bg-cover bg-center grayscale" />
              <div className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
                {[
                  { region: "Americas", partners: "42+", nodes: "12", status: "Nominal" },
                  { region: "EMEA", partners: "58+", nodes: "24", status: "Expanding" },
                  { region: "APAC", partners: "85+", nodes: "32", status: "Active" },
                  { region: "Global Nodes", partners: "125+", nodes: "68", status: "Unified" }
                ].map((reg, i) => (
                  <div key={i} className="space-y-4 p-6 rounded-2xl hover:bg-white transition-all cursor-default group/item">
                    <Globe2 className="w-8 h-8 text-primary mx-auto mb-2 group-hover/item:rotate-12 transition-transform" />
                    <h4 className="text-xl font-bold text-gray-900">{reg.region}</h4>
                    <div className="space-y-1">
                      <p className="text-xs font-bold text-primary uppercase tracking-widest">{reg.partners} Partners</p>
                      <p className="text-[10px] text-gray-400 font-bold uppercase tracking-tighter">{reg.nodes} Infrastructure Nodes</p>
                    </div>
                    <Badge className="bg-emerald-50 text-emerald-600 border-emerald-100 text-[10px] py-0 px-2">{reg.status}</Badge>
                  </div>
                ))}
              </div>
              <div className="absolute bottom-8 right-12 flex items-center gap-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest animate-pulse">
                <div className="w-2 h-2 rounded-full bg-primary" /> Live Network Connectivity: 99.9%
              </div>
            </div>
          </div>
        </section>

        {/* PROJECT PIPELINE / ROADMAP */}
        <section className="section-vertical-padding bg-gray-50 border-b border-gray-100">
          <div className="section-container">
            <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-16">
              <div className="max-w-2xl space-y-4">
                <span className="section-label">Execution Roadmap</span>
                <h2 className="mb-0 text-gray-900 font-bold">Upcoming Initiatives</h2>
                <p className="text-gray-600">The next technical milestones scheduled for deployment in the BOS ecosystem.</p>
              </div>
              <div className="flex items-center gap-2 text-xs font-bold text-gray-400 uppercase tracking-widest">
                <Milestone className="w-4 h-4" /> Quarter 1-2 • 2026
              </div>
            </div>

            <div className="grid md:grid-cols-4 gap-4">
              {[
                { title: "BOS Mobile Terminal", status: "In Development", progress: 75, q: "Q1" },
                { title: "Automated Customs Node", status: "Planned", progress: 20, q: "Q2" },
                { title: "ESG Compliance Audit", status: "Active", progress: 90, q: "Q1" },
                { title: "Satellite Link v3", status: "Research", progress: 10, q: "Q3" }
              ].map((step, i) => (
                <div key={i} className="p-8 bg-white border border-gray-100 rounded-xl space-y-6 hover:border-primary/20 transition-all group">
                  <div className="flex justify-between items-start">
                    <span className="text-[10px] font-bold text-primary uppercase tracking-widest">{step.q} Designation</span>
                    <Badge variant="outline" className="text-[9px] font-bold uppercase">{step.status}</Badge>
                  </div>
                  <h4 className="text-lg font-bold text-gray-900 group-hover:text-primary transition-colors">{step.title}</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between text-[9px] font-bold text-gray-400 uppercase">
                      <span>Deployment</span>
                      <span>{step.progress}%</span>
                    </div>
                    <div className="h-1 w-full bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full bg-primary transition-all duration-1000" style={{ width: `${step.progress}%` }} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SUSTAINABILITY & ESG */}
        <section className="section-vertical-padding bg-white border-b border-gray-100">
          <div className="section-container">
            <div className="bg-[#151B24] rounded-[3rem] p-12 lg:p-24 overflow-hidden relative group">
              <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/5 -skew-x-12 translate-x-1/4" />
              <div className="relative z-10 grid lg:grid-cols-2 gap-20 items-center">
                <div className="space-y-8">
                  <span className="text-[10px] font-bold text-primary uppercase tracking-[0.4em]">ESG & Responsibility</span>
                  <h2 className="text-white font-bold leading-tight mb-0">Architecting Green Trade Infrastructure</h2>
                  <p className="text-gray-400 text-lg">
                    Baalvion is committed to carbon-neutral trade routes and ethical vendor scoring. Our platform ensures every node follows global sustainability protocols.
                  </p>
                  <div className="flex flex-wrap gap-8 pt-4">
                    <div className="space-y-1">
                      <p className="text-3xl font-bold text-white">100%</p>
                      <p className="text-[10px] font-bold text-primary uppercase tracking-widest">Compliance Audit</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-3xl font-bold text-white">40%</p>
                      <p className="text-[10px] font-bold text-primary uppercase tracking-widest">Energy Reduction</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-3xl font-bold text-white">Net-0</p>
                      <p className="text-[10px] font-bold text-primary uppercase tracking-widest">Target Roadmap</p>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-1 gap-6">
                  {[
                    { icon: Leaf, title: "Carbon-Free Routing", desc: "Optimizing logistics for minimum environmental impact." },
                    { icon: ShieldAlert, title: "Ethical Sourcing AI", desc: "Monitoring labor laws and safety across all tiers." }
                  ].map((item, i) => (
                    <div key={i} className="p-10 rounded-2xl bg-white/5 border border-white/10 flex gap-8 items-center group/card hover:bg-white hover:border-white transition-all duration-500">
                      <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary group-hover/card:bg-primary group-hover/card:text-white transition-all">
                        <item.icon className="w-8 h-8" />
                      </div>
                      <div className="space-y-2">
                        <h4 className="text-xl font-bold text-white group-hover/card:text-gray-900 transition-colors">{item.title}</h4>
                        <p className="text-sm text-gray-400 group-hover/card:text-gray-600 transition-colors">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FEATURED PARTNERS */}
        <section className="py-20 bg-white border-b border-gray-100 overflow-hidden">
          <div className="section-container">
            <p className="text-center text-[10px] font-bold text-gray-400 uppercase tracking-[0.5em] mb-12">Institutional Partners & Trust</p>
            <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24 opacity-40 hover:opacity-80 transition-opacity grayscale hover:grayscale-0">
              {['SBI Corporate', 'PayU Enterprise', 'HSBC Node', 'Standard Chartered', 'Global Logistics'].map((name, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-gray-200" />
                  <span className="text-lg font-black tracking-tighter text-gray-900 uppercase italic">{name}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* NEWSLETTER / UPDATES SIGNUP */}
        <section className="section-vertical-padding bg-gray-50">
          <div className="section-container">
            <div className="max-w-4xl mx-auto bg-white p-12 lg:p-20 rounded-[2.5rem] border border-gray-100 shadow-sm text-center space-y-10">
              <div className="space-y-4">
                <div className="w-16 h-16 bg-primary/5 rounded-full flex items-center justify-center mx-auto text-primary">
                  <Mail className="w-8 h-8" />
                </div>
                <h2 className="text-gray-900 font-bold mb-0">Stay Integrated</h2>
                <p className="text-gray-600 text-lg max-w-xl mx-auto">
                  Receive weekly strategic briefs, technical milestones, and BOS system logs directly to your inbox.
                </p>
              </div>
              <form className="max-w-md mx-auto relative group">
                <input 
                  type="email" 
                  placeholder="Enter institutional email" 
                  className="w-full h-16 bg-gray-50 border border-gray-100 rounded-full px-8 pr-40 text-lg outline-none focus:ring-2 focus:ring-primary/20 focus:bg-white transition-all"
                />
                <button className="absolute right-2 top-2 h-12 px-8 bg-primary hover:bg-primary/90 text-white rounded-full font-bold text-sm transition-all shadow-lg active:scale-95">
                  Subscribe
                </button>
              </form>
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">
                Protected by Baalvion Compliance Protocols. Opt-out anytime.
              </p>
            </div>
          </div>
        </section>

        {/* FINAL CTA */}
        {ctaSection && (
          <section className="section-vertical-padding bg-white">
            <div className="section-container">
              <div className="bg-gray-50 p-12 md:p-16 text-center rounded-lg shadow-sm border border-gray-100 max-w-5xl mx-auto">
                <div className="max-w-3xl mx-auto space-y-8">
                  <h2 className="text-gray-900 leading-tight mb-0 font-bold">
                    {ctaSection.title}
                  </h2>
                  <p className="text-gray-600 text-lg font-medium">
                    {ctaSection.description}
                  </p>
                  <div className="flex flex-col sm:flex-row justify-center gap-4">
                    <Button size="lg" asChild className="h-12 px-12 btn-primary">
                      <Link href="/platform">{ctaSection.data?.ctaPrimary}</Link>
                    </Button>
                    <Button size="lg" variant="outline" asChild className="h-12 px-12 btn-outline">
                      <Link href="/contact">{ctaSection.data?.ctaSecondary}</Link>
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
