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
      
      <main className="flex-1 pt-48 pb-32">
        <div className="section-container">
          <div className="max-w-4xl mb-24 space-y-8 animate-fade-in">
            <span className="section-label">Strategic Portfolio</span>
            <h1 className="gradient-text mb-6">Nexus <br/>Initiatives</h1>
            <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl">
              A managed portfolio of high-impact strategic projects architected to resolve terminal fragmentation in global commerce.
            </p>
          </div>

          <div className="flex flex-wrap gap-4 mb-20 pb-8 border-b border-white/5 overflow-x-auto no-scrollbar">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveTab(cat)}
                className={cn(
                  "px-8 py-4 rounded-2xl text-[11px] uppercase tracking-widest font-bold transition-all whitespace-nowrap",
                  activeTab === cat 
                    ? "bg-primary text-white shadow-xl shadow-primary/20" 
                    : "text-muted-foreground hover:text-white hover:bg-white/5"
                )}
              >
                {cat}
              </button>
            ))}
          </div>

          {loading ? (
            <div className="flex flex-col items-center justify-center py-48 gap-8">
              <Loader2 className="w-12 h-12 animate-spin text-primary" />
              <p className="text-muted-foreground font-bold uppercase tracking-widest text-[10px]">Syncing Strategic Portfolio...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.filter(p => p.category === activeTab).map(project => (
                <Card key={project.id} className="glass-card card-hover flex flex-col h-full group border-white/5">
                  <CardHeader className="p-10 pb-6 space-y-10">
                    <div className="flex justify-between items-start">
                      <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center group-hover:bg-primary transition-all duration-500 border border-white/5">
                        <Target className="w-6 h-6 text-accent group-hover:text-white" />
                      </div>
                      <Badge className={cn("py-1.5 px-4 text-[9px] font-bold uppercase tracking-widest rounded-full border shadow-xl", getStatusColor(project.status))} variant="outline">
                        {project.status}
                      </Badge>
                    </div>
                    <div className="space-y-4">
                      <h3 className="text-2xl font-bold group-hover:text-primary transition-colors">{project.name}</h3>
                      <div className="flex items-center gap-4 text-[10px] font-bold text-primary tracking-widest uppercase">
                        <span>{project.type}</span>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="px-10 pb-10 flex-1 flex flex-col justify-between">
                    <p className="mb-12 text-base text-muted-foreground leading-relaxed">
                      {project.description}
                    </p>
                    
                    <div className="space-y-8 pt-8 border-t border-white/5">
                      {project.domain && (
                        <div className="flex items-center gap-3 text-xs text-muted-foreground font-mono">
                          <Globe className="w-4 h-4 text-primary" />
                          <span className="hover:text-white transition-colors">
                            {project.subdomain ? `${project.subdomain}.${project.domain}` : project.domain}
                          </span>
                        </div>
                      )}
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold text-muted-foreground/50 uppercase tracking-widest">
                          Updated • {new Date(project.updatedAt).toLocaleDateString()}
                        </span>
                        <button className="w-10 h-10 rounded-xl border border-white/5 flex items-center justify-center text-white hover:bg-primary hover:border-primary transition-all duration-500">
                          <ExternalLink className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
              {projects.filter(p => p.category === activeTab).length === 0 && (
                <div className="col-span-full py-48 text-center glass-card border-dashed border-white/10 flex flex-col items-center justify-center space-y-6">
                  <Target className="w-12 h-12 text-muted-foreground opacity-20" />
                  <div className="space-y-4">
                    <h3 className="text-2xl font-bold">No Initiatives Found</h3>
                    <p className="max-w-md mx-auto text-muted-foreground">
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
