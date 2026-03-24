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
      
      <main className="flex-1 pt-48 pb-40">
        <div className="section-container">
          <div className="max-w-4xl mb-32 space-y-10 animate-fade-in">
            <span className="section-label">Strategic Portfolio</span>
            <h1 className="text-6xl md:text-8xl font-bold text-white leading-[0.95] tracking-tight gradient-text">Nexus <br/>Initiatives</h1>
            <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed font-light">
              A managed portfolio of high-impact strategic projects architected to resolve terminal fragmentation in global commerce.
            </p>
          </div>

          <div className="flex flex-wrap gap-4 mb-24 pb-8 border-b border-white/5 overflow-x-auto no-scrollbar">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveTab(cat)}
                className={cn(
                  "px-10 py-4 rounded-full text-sm font-bold transition-all whitespace-nowrap",
                  activeTab === cat 
                    ? "bg-primary text-white shadow-2xl shadow-primary/30" 
                    : "text-muted-foreground hover:text-white hover:bg-white/5"
                )}
              >
                {cat}
              </button>
            ))}
          </div>

          {loading ? (
            <div className="flex flex-col items-center justify-center py-48 gap-8">
              <Loader2 className="w-16 h-16 animate-spin text-primary" />
              <p className="text-muted-foreground font-bold uppercase tracking-[0.5em] text-xs">Syncing Strategic Portfolio...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {projects.filter(p => p.category === activeTab).map(project => (
                <Card key={project.id} className="glass-card card-hover flex flex-col h-full group border-white/5 hover:border-primary/40 bg-white/[0.01]">
                  <CardHeader className="p-12 pb-8 space-y-10">
                    <div className="flex justify-between items-start">
                      <div className="w-16 h-16 bg-white/5 rounded-3xl flex items-center justify-center group-hover:bg-primary transition-all duration-500 border border-white/10 shadow-inner">
                        <Target className="w-8 h-8 text-accent group-hover:text-white" />
                      </div>
                      <Badge className={cn("py-2 px-5 text-[10px] font-bold uppercase tracking-widest rounded-full shadow-lg", getStatusColor(project.status))} variant="outline">
                        {project.status}
                      </Badge>
                    </div>
                    <div className="space-y-4">
                      <CardTitle className="text-4xl font-bold text-white group-hover:text-primary transition-colors duration-500">{project.name}</CardTitle>
                      <div className="flex items-center gap-3 text-[11px] font-bold text-primary tracking-[0.3em] uppercase">
                        <span>{project.type}</span>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="px-12 pb-12 flex-1 flex flex-col justify-between">
                    <CardDescription className="text-muted-foreground leading-relaxed text-lg mb-16 font-light">
                      {project.description}
                    </CardDescription>
                    
                    <div className="space-y-8 pt-10 border-t border-white/5">
                      {project.domain && (
                        <div className="flex items-center gap-4 text-sm text-muted-foreground font-mono group/domain">
                          <Globe className="w-5 h-5 text-primary group-hover/domain:rotate-12 transition-transform" />
                          <span className="group-hover:text-white transition-colors">
                            {project.subdomain ? `${project.subdomain}.${project.domain}` : project.domain}
                          </span>
                        </div>
                      )}
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold text-muted-foreground/60 uppercase tracking-widest">
                          Last Updated • {new Date(project.updatedAt).toLocaleDateString()}
                        </span>
                        <button className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white hover:bg-primary hover:border-primary hover:shadow-xl hover:shadow-primary/20 transition-all duration-500">
                          <ExternalLink className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
              {projects.filter(p => p.category === activeTab).length === 0 && (
                <div className="col-span-full py-64 text-center glass-card border-dashed border-white/10 flex flex-col items-center justify-center space-y-8">
                  <div className="w-24 h-24 rounded-full bg-white/5 flex items-center justify-center">
                    <Target className="w-12 h-12 text-muted-foreground opacity-20" />
                  </div>
                  <div className="space-y-3">
                    <h3 className="text-white font-bold text-3xl">Registry Empty</h3>
                    <p className="text-muted-foreground max-w-sm mx-auto font-light leading-relaxed">
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