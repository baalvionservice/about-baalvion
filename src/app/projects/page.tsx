"use client"

import { useEffect, useState } from "react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Project } from "@/lib/db";
import { LayoutGrid, Loader2, ExternalLink, Activity, Target, Search, Globe } from "lucide-react";
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20';
      case 'In Development': return 'bg-amber-500/10 text-amber-500 border-amber-500/20';
      case 'Planned': return 'bg-blue-500/10 text-blue-500 border-blue-500/20';
      default: return '';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-40 pb-32">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mb-24">
            <Badge className="mb-6 py-1 px-4 text-[10px] tracking-[0.2em] uppercase font-bold bg-primary/20 text-accent border-primary/20">Strategic Portfolio</Badge>
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-8 leading-tight">Nexus <br/><span className="gradient-text">Initiatives</span></h1>
            <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed font-light">
              Managed portfolio of high-impact strategic projects driving global trade integration.
            </p>
          </div>

          <div className="flex flex-wrap gap-2 mb-16 pb-4 border-b border-white/5 overflow-x-auto">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveTab(cat)}
                className={cn(
                  "px-6 py-2.5 rounded-full text-sm font-bold whitespace-nowrap transition-all",
                  activeTab === cat 
                    ? "bg-primary text-white" 
                    : "text-muted-foreground hover:text-white hover:bg-white/5"
                )}
              >
                {cat}
              </button>
            ))}
          </div>

          {loading ? (
            <div className="flex flex-col items-center justify-center py-32 gap-4">
              <Loader2 className="w-10 h-10 animate-spin text-primary" />
              <p className="text-muted-foreground font-medium">Syncing Portfolio Data...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.filter(p => p.category === activeTab).map(project => (
                <Card key={project.id} className="glass-card group hover:border-primary/50 transition-all duration-500 flex flex-col h-full">
                  <CardHeader className="p-8">
                    <div className="flex justify-between items-start mb-8">
                      <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                        <LayoutGrid className="w-6 h-6 text-accent" />
                      </div>
                      <Badge className={cn("py-1 px-3 text-[10px] font-bold uppercase tracking-widest", getStatusColor(project.status))} variant="outline">
                        {project.status}
                      </Badge>
                    </div>
                    <CardTitle className="text-2xl font-bold text-white group-hover:text-accent transition-colors">
                      {project.name}
                    </CardTitle>
                    <p className="text-[10px] font-bold text-primary tracking-[0.2em] uppercase mt-2">{project.type}</p>
                  </CardHeader>
                  <CardContent className="px-8 pb-8 pt-0 flex-1 flex flex-col justify-between">
                    <CardDescription className="text-muted-foreground leading-relaxed text-base mb-8 font-light">
                      {project.description}
                    </CardDescription>
                    
                    <div className="space-y-4 pt-6 border-t border-white/5">
                      {project.domain && (
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Globe className="w-3.5 h-3.5" />
                          {project.subdomain ? `${project.subdomain}.${project.domain}` : project.domain}
                        </div>
                      )}
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                          Updated: {new Date(project.updatedAt).toLocaleDateString()}
                        </span>
                        <button className="text-white hover:text-accent transition-colors">
                          <ExternalLink className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}