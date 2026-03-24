"use client"

import { useEffect, useState, useMemo } from "react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Project, ProjectStatus, projectCategories } from "@/lib/db";
import { Target, Loader2, Star, LayoutGrid, CheckCircle2, Clock, Calendar, ArrowRight } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function ProjectsClient() {
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
      case 'Active': return 'bg-emerald-50 text-emerald-600 border-emerald-100';
      case 'In Development': return 'bg-amber-50 text-amber-600 border-amber-100';
      case 'Planned': return 'bg-gray-50 text-gray-500 border-gray-100';
      default: return '';
    }
  };

  if (loading) return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center gap-8">
      <Loader2 className="w-16 h-16 animate-spin text-primary" />
      <p className="text-[11px] font-bold uppercase tracking-[0.5em] text-gray-400">Syncing Strategic Portfolio...</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-56 pb-48">
        <div className="section-container">
          <div className="max-w-4xl mb-32 space-y-8 animate-fade-in">
            <span className="section-label">Operational Portfolio</span>
            <h1 className="text-gray-900 mb-8 font-bold leading-tight">Strategic <br/>Nexus Initiatives</h1>
            <p className="text-2xl text-gray-600 leading-relaxed max-w-3xl font-normal">
              A curated landscape of high-impact infrastructure projects architected to resolve terminal fragmentation in global commerce and financial clearing.
            </p>
          </div>

          {featuredProjects.length > 0 && (
            <div className="mb-48 space-y-16 animate-fade-in stagger-1">
              <div className="flex items-center gap-6">
                <div className="w-1.5 h-12 bg-primary rounded-full" />
                <h2 className="text-3xl font-bold text-gray-900 mb-0 tracking-tight flex items-center gap-3">
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

          <div className="space-y-48">
            {projectCategories.map((cat, i) => {
              const catProjects = projects.filter(p => p.category === cat.name);
              return (
                <section key={cat.id} className={cn("space-y-16 animate-fade-in", `stagger-${(i % 3) + 1}`)}>
                  <div className="max-w-3xl space-y-4">
                    <h2 className="text-3xl font-bold text-gray-900 mb-0">{cat.name}</h2>
                    <p className="text-lg text-gray-500 font-normal">{cat.description}</p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {catProjects.length === 0 ? (
                      <Card className="col-span-full border-dashed border-gray-200 py-24 flex flex-col items-center justify-center gap-6 bg-gray-50/50">
                        <Target className="w-12 h-12 text-gray-300" />
                        <p className="text-xs font-bold uppercase tracking-widest text-gray-400">No active nodes in this registry</p>
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
    <Card className="bg-white border border-gray-100 shadow-sm hover:shadow-md transition-all group h-full flex flex-col rounded-xl overflow-hidden">
      <Link href={`/projects/${project.id}`} className="flex flex-col h-full">
        <CardHeader className="p-10 pb-6 space-y-10">
          <div className="flex justify-between items-start">
            <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center group-hover:bg-primary transition-all duration-500 border border-gray-100">
              <Target className="w-6 h-6 text-primary group-hover:text-white" />
            </div>
            <Badge className={cn("py-1.5 px-4 text-[9px] font-bold uppercase tracking-widest rounded-full border flex items-center gap-2", statusColor)} variant="outline">
              {statusIcon}
              {project.status}
            </Badge>
          </div>
          <div className="space-y-3">
            <h3 className="text-2xl font-bold text-gray-900 group-hover:text-primary transition-colors leading-tight">{project.name}</h3>
            <p className="text-[10px] font-bold text-primary tracking-[0.2em] uppercase">{project.type}</p>
          </div>
        </CardHeader>
        <CardContent className="px-10 pb-10 flex-1 flex flex-col justify-between space-y-12">
          <p className="text-gray-500 leading-relaxed font-normal text-base line-clamp-3">
            {project.description}
          </p>
          
          <div className="space-y-6 pt-8 border-t border-gray-50">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
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
