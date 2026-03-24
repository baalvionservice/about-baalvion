"use client"

import { useEffect, useState } from "react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { EcosystemItem } from "@/lib/db";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2, ArrowRight, Database, ShieldCheck, BrainCircuit, Globe, Scale, Workflow } from "lucide-react";

export default function EcosystemPage() {
  const [items, setItems] = useState<EcosystemItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/ecosystem')
      .then(res => res.json())
      .then(data => {
        setItems(data);
        setLoading(false);
      });
  }, []);

  const getIcon = (layer: string) => {
    switch (layer) {
      case 'Infrastructure': return <Database className="w-10 h-10" />;
      case 'Intelligence': return <BrainCircuit className="w-10 h-10" />;
      case 'Governance': return <Scale className="w-10 h-10" />;
      case 'Finance': return <Globe className="w-10 h-10" />;
      case 'Commerce': return <Workflow className="w-10 h-10" />;
      default: return <Globe className="w-10 h-10" />;
    }
  };

  if (loading) return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <Loader2 className="w-12 h-12 animate-spin text-primary" />
    </div>
  );

  const layers = Array.from(new Set(items.map(i => i.layer)));

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-48 pb-40">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mb-32">
            <span className="section-label">Architecture</span>
            <h1 className="text-6xl md:text-8xl font-bold text-white mb-10 leading-[0.95] gradient-text">
              Operational <br/>Nexus Layers
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground font-light leading-relaxed max-w-3xl">
              A standardized blueprint of the Baalvion Nexus, architected for transparency, scalability, and modular integration across 180+ global markets.
            </p>
          </div>

          <div className="space-y-40">
            {layers.map((layer) => (
              <div key={layer} className="space-y-12">
                <div className="flex items-center gap-6">
                  <div className="w-px h-12 bg-primary" />
                  <h2 className="text-3xl font-bold text-white uppercase tracking-[0.2em]">{layer} Layer</h2>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {items.filter(i => i.layer === layer).map((item) => (
                    <Card key={item.id} className="glass-card card-hover group h-full">
                      <CardContent className="p-12 space-y-10 flex flex-col h-full">
                        <div className="w-20 h-20 bg-primary/10 rounded-[2rem] flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-500">
                          {getIcon(item.layer)}
                        </div>
                        <div className="space-y-4 flex-1">
                          <h3 className="text-3xl font-bold text-white">{item.name}</h3>
                          <p className="text-muted-foreground leading-relaxed text-lg font-light">{item.description}</p>
                        </div>
                        {item.domain && (
                          <div className="pt-10 flex items-center justify-between border-t border-white/5">
                            <span className="text-xs text-muted-foreground font-mono uppercase tracking-widest">{item.domain}</span>
                            <button className="flex items-center text-[10px] font-bold text-primary uppercase tracking-[0.2em] hover:text-white transition-colors">
                              Protocol Specs <ArrowRight className="ml-3 w-4 h-4" />
                            </button>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}