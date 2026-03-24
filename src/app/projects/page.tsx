"use client"

import { useEffect, useState, useMemo } from "react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Project, ProjectStatus } from "@/lib/db";
import { Target, Globe, Loader2, Star, LayoutGrid, CheckCircle2, Clock, Calendar, ArrowRight } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const categories = [
  { name: "Core Platform", desc: "Foundation systems powering global trade infrastructure." },
  { name: "Industrial", desc: "Deep-layer logistics and industrial connectivity nodes." },
  { name: "Internal Systems", desc: "Proprietary governance and resource orchestration." },
  { name: "Intelligence", desc: "Neural risk assessment and compliance monitoring." },
  { name: "Governance", desc: "Regulatory mapping and legal protocol alignment." },
  { name: "Commerce", desc: "High-speed marketplace and settlement execution." }
];

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/projects')
      .then(res => res.json())
      .then(data => {
        setProjects(data);
        setLoading(false);
      });
  }, []);

  const featuredProjects = useMemo(() => {
    return projects.filter(p => p.isFeatured).sort((a, b) => (a.priority || 10) - (b.priority || 10));
  }, [projects]);

  const getStatusIcon = (status: ProjectStatus) => {
    switch (status) {
      case 'Active': return <CheckCircle2 className="w-3.5 h-3.5" />;
      case 'In Development': return <Clock className="w-3.5 h-3.5" />;
      case 'Planned': return <Calendar className="w-3.5 h-3.5" />;
      default: return null;
    }
  };

  const getStatusColor = (status: ProjectStatus) => {
    switch (status) {
      case 'Active': return 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20';
      case 'In Development': return 'bg-amber-500/10 text-amber-500 border-amber-500/20';
      case 'Planned': return 'bg-white/10 text-muted-foreground border-white/10';
      default: return '';
    }
  };

  if (loading) return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center gap-8">
      <Loader2 className="w-16 h-16 animate-spin text-primary" />
      <p className="text-[11px] font-bold uppercase tracking-[0.5em] text-muted-foreground">Syncing Strategic Portfolio...</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-56 pb-48">
        <div className="section-container">
          {/* Hero */}
          <div className="max-w-4xl mb-32 space-y-8 animate-fade-in">
            <span className="section-label">Operational Portfolio</span>
            <h1 className="gradient-text mb-8">Strategic <br/>Nexus Initiatives</h1>
            <p className="text-2xl text-muted-foreground leading-relaxed max-w-3xl font-light">
              A curated landscape of high-impact infrastructure projects architected to resolve terminal fragmentation in global commerce and financial clearing.
            </p>
          </div>

          {/* Featured Section */}
          {featuredProjects.length > 0 && (
            <div className="mb-48 space-y-16 animate-fade-in stagger-1">
              <div className="flex items-center gap-6">
                <div className="w-1.5 h-12 bg-primary rounded-full shadow-[0_0_20px_rgba(var(--primary),0.5)]" />
                <h2 className="text-3xl font-bold text-white mb-0 tracking-tight flex items-center gap-3">
                  <Star className="w-6 h-6 text-primary fill-primary" /> Featured Initiatives
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {featuredProjects.map(project => (
                  <ProjectCard key={project.id} project={project} statusIcon={getStatusIcon(project.status)} statusColor={getStatusColor(project.status)} />
                ))}
              </div>
            </div>
          )}

          {/* Categories Sections */}
          <div className="space-y-48">
            {categories.map((cat, i) => {
              const catProjects = projects.filter(p => p.category === cat.name);
              return (
                <section key={cat.name} className={cn("space-y-16 animate-fade-in", `stagger-${(i % 3) + 1}`)}>
                  <div className="max-w-3xl space-y-4">
                    <h2 className="text-3xl font-bold text-white mb-0">{cat.name}</h2>
                    <p className="text-lg text-muted-foreground font-light">{cat.desc}</p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {catProjects.length === 0 ? (
                      <Card className="col-span-full glass-card border-dashed border-white/5 py-24 flex flex-col items-center justify-center gap-6 opacity-30">
                        <Target className="w-12 h-12 text-muted-foreground" />
                        <p className="text-xs font-bold uppercase tracking-widest">No active nodes in this registry</p>
                      </Card>
                    ) : (
                      catProjects.map(project => (
                        <ProjectCard key={project.id} project={project} statusIcon={getStatusIcon(project.status)} statusColor={getStatusColor(project.status)} />
                      ))
                    )}
                  </div>
                </section>
              );
            })}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

function ProjectCard({ project, statusIcon, statusColor }: { project: Project, statusIcon: React.ReactNode, statusColor: string }) {
  return (
    <Card className="glass-card card-hover group h-full border-white/5 flex flex-col">
      <Link href={`/projects/${project.id}`} className="flex flex-col h-full">
        <CardHeader className="p-10 pb-6 space-y-10">
          <div className="flex justify-between items-start">
            <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center group-hover:bg-primary transition-all duration-500 border border-white/5">
              <Target className="w-6 h-6 text-accent group-hover:text-white" />
            </div>
            <Badge className={cn("py-1.5 px-4 text-[9px] font-bold uppercase tracking-widest rounded-full border shadow-lg flex items-center gap-2", statusColor)} variant="outline">
              {statusIcon}
              {project.status}
            </Badge>
          </div>
          <div className="space-y-3">
            <h3 className="text-2xl font-bold text-white group-hover:text-primary transition-colors leading-tight">{project.name}</h3>
            <p className="text-[10px] font-bold text-primary tracking-[0.2em] uppercase">{project.type}</p>
          </div>
        </CardHeader>
        <CardContent className="px-10 pb-10 flex-1 flex flex-col justify-between space-y-12">
          <p className="text-muted-foreground leading-relaxed font-light text-base line-clamp-3">
            {project.description}
          </p>
          
          <div className="space-y-6 pt-8 border-t border-white/5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-[10px] font-bold text-muted-foreground/40 uppercase tracking-widest">
                <LayoutGrid className="w-3 h-3" />
                EXPLORE NODE
              </div>
              <ArrowRight className="w-4 h-4 text-primary group-hover:translate-x-2 transition-all" />
            </div>
          </div>
        </CardContent>
      </Link>
    </Card>
  );
}
