"use client"

import { useEffect, useState } from "react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Project } from "@/lib/db";
import { LayoutGrid, Loader2 } from "lucide-react";

const categories = [
  "Core Platform Projects",
  "Industrial Projects",
  "Internal Systems",
  "Intelligence Platforms",
  "Governance",
  "Commerce",
  "Future Projects"
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20';
      case 'In Development': return 'bg-amber-500/10 text-amber-500 border-amber-500/20';
      case 'Planned': return 'bg-blue-500/10 text-blue-500 border-blue-500/20';
      default: return '';
    }
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <main className="pt-40 pb-32">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mb-16">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">Strategic Initiatives</h1>
            <p className="text-xl text-muted-foreground">
              Our diverse portfolio of projects driving global trade infrastructure across multiple sectors and layers.
            </p>
          </div>

          {loading ? (
            <div className="flex justify-center py-20">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
          ) : (
            <div className="space-y-24">
              {categories.map(category => {
                const categoryProjects = projects.filter(p => p.category === category);
                if (categoryProjects.length === 0) return null;

                return (
                  <section key={category} className="space-y-8">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <LayoutGrid className="w-5 h-5 text-accent" />
                      </div>
                      <h2 className="text-2xl font-bold text-white tracking-tight">{category}</h2>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {categoryProjects.map(project => (
                        <Card key={project.id} className="glass-card hover:border-accent/50 transition-all group">
                          <CardHeader>
                            <div className="flex justify-between items-start mb-4">
                              <Badge className={getStatusColor(project.status)} variant="outline">
                                {project.status}
                              </Badge>
                            </div>
                            <CardTitle className="text-white group-hover:text-accent transition-colors">
                              {project.name}
                            </CardTitle>
                            <CardDescription className="text-muted-foreground pt-2">
                              {project.description}
                            </CardDescription>
                          </CardHeader>
                        </Card>
                      ))}
                    </div>
                  </section>
                );
              })}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
