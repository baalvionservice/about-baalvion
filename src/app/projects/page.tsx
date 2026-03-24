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
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-48 pb-40">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mb-32">
            <span className="section-label">Strategic Portfolio</span>
            <h1 className="text-6xl md:text-8xl font-bold text-white mb-10 leading-[0.95] gradient-text">Nexus <br/>Initiatives</h1>
            <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed font-light">
              A managed portfolio of high-impact strategic projects architected to resolve fragmentation in global commerce.
            </p>
          </div>

          <div className="flex flex-wrap gap-4 mb-20 pb-8 border-b border-white/5">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveTab(cat)}
                className={cn(
                  "px-8 py-3 rounded-full text-sm font-bold transition-all",
                  activeTab === cat 
                    ? "bg-primary text-white shadow-lg shadow-primary/20" 
                    : "text-muted-foreground hover:text-white hover:bg-white/5"
                )}
              >
                {cat}
              </button>
            ))}
          </div>

          {loading ? (
            <div className="flex flex-col items-center justify-center py-40 gap-4">
              <Loader2 className="w-12 h-12 animate-spin text-primary" />
              <p className="text-muted-foreground font-medium uppercase tracking-widest text-xs">Syncing Portfolio...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.filter(p => p.category === activeTab).map(project => (
                <Card key={project.id} className="glass-card card-hover flex flex-col h-full group">
                  <CardHeader className="p-10 pb-6">
                    <div className="flex justify-between items-start mb-10">
                      <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center group-hover:bg-primary transition-all">
                        <Target className="w-7 h-7 text-accent group-hover:text-white" />
                      </div>
                      <Badge className={cn("py-1 px-4 text-[10px] font-bold uppercase tracking-widest rounded-full", getStatusColor(project.status))} variant="outline">
                        {project.status}
                      </Badge>
                    </div>
                    <CardTitle className="text-3xl font-bold text-white mb-4">{project.name}</CardTitle>
                    <div className="flex items-center gap-2 text-[10px] font-bold text-primary tracking-[0.2em] uppercase">
                      <span>{project.type}</span>
                    </div>
                  </CardHeader>
                  <CardContent className="px-10 pb-10 flex-1 flex flex-col justify-between">
                    <CardDescription className="text-muted-foreground leading-relaxed text-base mb-12 font-light">
                      {project.description}
                    </CardDescription>
                    
                    <div className="space-y-6 pt-8 border-t border-white/5">
                      {project.domain && (
                        <div className="flex items-center gap-3 text-xs text-muted-foreground font-mono">
                          <Globe className="w-4 h-4 text-primary" />
                          {project.subdomain ? `${project.subdomain}.${project.domain}` : project.domain}
                        </div>
                      )}
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                          Updated • {new Date(project.updatedAt).toLocaleDateString()}
                        </span>
                        <button className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white hover:bg-primary hover:border-primary transition-all">
                          <ExternalLink className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
              {projects.filter(p => p.category === activeTab).length === 0 && (
                <div className="col-span-full py-40 text-center glass-card rounded-[3rem] border-dashed border-white/10">
                  <Target className="w-16 h-16 text-muted-foreground mx-auto mb-6 opacity-20" />
                  <h3 className="text-white font-bold text-2xl">No Active Initiatives</h3>
                  <p className="text-muted-foreground mt-2 font-light">The category "{activeTab}" currently has no publicly registered projects.</p>
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