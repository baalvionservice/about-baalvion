"use client"

import { useEffect, useState } from "react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Project, ProjectStatus } from "@/lib/db";
import { LayoutGrid, Loader2, ExternalLink, Target, Globe, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

const categories = ["Core", "Industrial", "Internal", "Governance", "Commerce"];

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState(categories[0]);

  useEffect(() => {
    fetch('/api/projects')
      .then(res => res.json())
      .then(data => {
        setProjects(data);
        setLoading(false);
      });
  }, []);

  const getStatusColor = (status: ProjectStatus) => {
    switch (status) {
      case 'Active': return 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20';
      case 'In Development': return 'bg-amber-500/10 text-amber-500 border-amber-500/20';
      case 'Planned': return 'bg-white/10 text-muted-foreground border-white/10';
      default: return '';
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-56 pb-48">
        <div className="section-container">
          <div className="max-w-5xl mb-40 space-y-12 animate-fade-in">
            <span className="section-label">Strategic Portfolio</span>
            <h1 className="gradient-text mb-0">Nexus <br/>Initiatives</h1>
            <p className="text-2xl md:text-3xl max-w-4xl leading-relaxed">
              A managed portfolio of high-impact strategic projects architected to resolve terminal fragmentation in global commerce.
            </p>
          </div>

          <div className="flex flex-wrap gap-6 mb-32 pb-10 border-b border-white/5 overflow-x-auto no-scrollbar">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveTab(cat)}
                className={cn(
                  "px-12 py-5 rounded-full text-[12px] uppercase tracking-[0.3em] font-bold transition-all whitespace-nowrap",
                  activeTab === cat 
                    ? "bg-primary text-white shadow-2xl shadow-primary/40" 
                    : "text-muted-foreground hover:text-white hover:bg-white/5"
                )}
              >
                {cat}
              </button>
            ))}
          </div>

          {loading ? (
            <div className="flex flex-col items-center justify-center py-64 gap-12">
              <Loader2 className="w-20 h-20 animate-spin text-primary" />
              <p className="text-muted-foreground font-bold uppercase tracking-[0.6em] text-[11px]">Syncing Strategic Portfolio...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
              {projects.filter(p => p.category === activeTab).map(project => (
                <Card key={project.id} className="glass-card card-hover flex flex-col h-full group border-white/5 hover:border-primary/40 bg-white/[0.01]">
                  <CardHeader className="p-16 pb-10 space-y-12">
                    <div className="flex justify-between items-start">
                      <div className="w-20 h-20 bg-white/5 rounded-[2rem] flex items-center justify-center group-hover:bg-primary transition-all duration-700 border border-white/10 shadow-inner">
                        <Target className="w-10 h-10 text-accent group-hover:text-white" />
                      </div>
                      <Badge className={cn("py-3 px-6 text-[11px] font-bold uppercase tracking-widest rounded-full shadow-2xl", getStatusColor(project.status))} variant="outline">
                        {project.status}
                      </Badge>
                    </div>
                    <div className="space-y-6">
                      <h3 className="text-4xl group-hover:text-primary transition-colors duration-700">{project.name}</h3>
                      <div className="flex items-center gap-5 text-[11px] font-bold text-primary tracking-[0.4em] uppercase">
                        <span>{project.type}</span>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="px-16 pb-16 flex-1 flex flex-col justify-between">
                    <p className="mb-20 text-xl font-light">
                      {project.description}
                    </p>
                    
                    <div className="space-y-10 pt-12 border-t border-white/5">
                      {project.domain && (
                        <div className="flex items-center gap-5 text-[13px] text-muted-foreground font-mono group/domain">
                          <Globe className="w-6 h-6 text-primary group-hover/domain:rotate-12 transition-transform duration-500" />
                          <span className="group-hover:text-white transition-colors duration-500">
                            {project.subdomain ? `${project.subdomain}.${project.domain}` : project.domain}
                          </span>
                        </div>
                      )}
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-bold text-muted-foreground/60 uppercase tracking-[0.3em]">
                          Last Updated • {new Date(project.updatedAt).toLocaleDateString()}
                        </span>
                        <button className="w-14 h-14 rounded-full border border-white/10 flex items-center justify-center text-white hover:bg-primary hover:border-primary hover:shadow-2xl hover:shadow-primary/30 transition-all duration-700">
                          <ExternalLink className="w-6 h-6" />
                        </button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
              {projects.filter(p => p.category === activeTab).length === 0 && (
                <div className="col-span-full py-72 text-center glass-card border-dashed border-white/10 flex flex-col items-center justify-center space-y-10">
                  <div className="w-32 h-32 rounded-full bg-white/5 flex items-center justify-center">
                    <Target className="w-16 h-16 text-muted-foreground opacity-20" />
                  </div>
                  <div className="space-y-6">
                    <h3 className="text-4xl">Registry Empty</h3>
                    <p className="max-w-md mx-auto">
                      The category <span className="text-primary font-bold">"{activeTab}"</span> currently has no publicly registered strategic initiatives.
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
