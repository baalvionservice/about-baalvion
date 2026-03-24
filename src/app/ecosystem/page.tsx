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
      <div className="flex flex-col items-center gap-6">
        <Loader2 className="w-16 h-16 animate-spin text-primary" />
        <p className="text-muted-foreground font-bold uppercase tracking-[0.5em] text-xs">Syncing Architecture Registry...</p>
      </div>
    </div>
  );

  const layers = Array.from(new Set(items.map(i => i.layer)));

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <main className="flex-1 pt-48 pb-40">
        <div className="section-container">
          <div className="max-w-4xl mb-40 space-y-10 animate-fade-in">
            <span className="section-label">Nexus Architecture</span>
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold text-white leading-[0.9] tracking-tight gradient-text">
              Operational <br/>Nexus Layers
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground font-light leading-relaxed max-w-3xl">
              A standardized blueprint of the Baalvion Nexus, architected for transparency, scalability, and modular integration across 180+ global markets.
            </p>
          </div>

          <div className="layout-stack">
            {layers.map((layer) => (
              <div key={layer} className="space-y-16 group">
                <div className="flex items-center gap-8">
                  <div className="w-1.5 h-16 bg-primary shadow-[0_0_20px_rgba(var(--primary),0.5)] rounded-full" />
                  <h2 className="text-4xl md:text-5xl font-bold text-white uppercase tracking-[0.25em]">{layer} Layer</h2>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                  {items.filter(i => i.layer === layer).map((item) => (
                    <Card key={item.id} className="glass-card card-hover group/card h-full bg-white/[0.01] hover:border-primary/40">
                      <CardContent className="p-14 space-y-12 flex flex-col h-full">
                        <div className="w-24 h-24 bg-primary/10 rounded-[2.5rem] flex items-center justify-center text-primary group-hover/card:bg-primary group-hover/card:text-white transition-all duration-700 shadow-2xl shadow-primary/10">
                          {getIcon(item.layer)}
                        </div>
                        <div className="space-y-6 flex-1">
                          <h3 className="text-4xl font-bold text-white group-hover/card:text-primary transition-colors duration-500">{item.name}</h3>
                          <p className="text-muted-foreground leading-relaxed text-xl font-light">{item.description}</p>
                        </div>
                        {item.domain && (
                          <div className="pt-12 flex items-center justify-between border-t border-white/5">
                            <span className="text-xs text-muted-foreground font-mono uppercase tracking-[0.2em]">{item.domain}</span>
                            <button className="flex items-center text-[11px] font-bold text-primary uppercase tracking-[0.3em] hover:text-white transition-all duration-300">
                              Protocol Specs <ArrowRight className="ml-4 w-5 h-5 group-hover/card:translate-x-2 transition-transform" />
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