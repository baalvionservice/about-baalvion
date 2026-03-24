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
      case 'Infrastructure': return <Database className="w-12 h-12" />;
      case 'Intelligence': return <BrainCircuit className="w-12 h-12" />;
      case 'Governance': return <Scale className="w-12 h-12" />;
      case 'Finance': return <Globe className="w-12 h-12" />;
      case 'Commerce': return <Workflow className="w-12 h-12" />;
      default: return <Globe className="w-12 h-12" />;
    }
  };

  if (loading) return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="flex flex-col items-center gap-8">
        <Loader2 className="w-16 h-16 animate-spin text-primary" />
        <p className="text-muted-foreground font-bold uppercase tracking-[0.5em] text-[11px]">Syncing Architecture Registry...</p>
      </div>
    </div>
  );

  const layers = Array.from(new Set(items.map(i => i.layer)));

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <main className="flex-1 pt-56 pb-48">
        <div className="section-container">
          <div className="max-w-5xl mb-48 space-y-12 animate-fade-in">
            <span className="section-label">Nexus Architecture</span>
            <h1 className="gradient-text mb-0">
              Operational <br/>Nexus Layers
            </h1>
            <p className="text-2xl md:text-3xl max-w-4xl leading-relaxed">
              A standardized blueprint of the Baalvion Nexus, architected for transparency, scalability, and modular integration across 180+ global markets.
            </p>
          </div>

          <div className="layout-stack">
            {layers.map((layer) => (
              <div key={layer} className="space-y-24 group">
                <div className="flex items-center gap-12">
                  <div className="w-2 h-20 bg-primary shadow-[0_0_30px_rgba(var(--primary),0.5)] rounded-full" />
                  <h2 className="mb-0 uppercase tracking-[0.3em] text-4xl md:text-6xl">{layer} Layer</h2>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                  {items.filter(i => i.layer === layer).map((item) => (
                    <Card key={item.id} className="glass-card card-hover group/card h-full bg-white/[0.01] hover:border-primary/40">
                      <CardContent className="p-16 space-y-16 flex flex-col h-full">
                        <div className="w-24 h-24 bg-primary/10 rounded-[2.5rem] flex items-center justify-center text-primary group-hover/card:bg-primary group-hover/card:text-white transition-all duration-700 shadow-2xl">
                          {getIcon(item.layer)}
                        </div>
                        <div className="space-y-8 flex-1">
                          <h3 className="text-4xl font-bold text-white group-hover/card:text-primary transition-colors duration-700">{item.name}</h3>
                          <p className="text-xl font-light leading-relaxed">{item.description}</p>
                        </div>
                        {item.domain && (
                          <div className="pt-12 flex items-center justify-between border-t border-white/5">
                            <span className="text-[11px] text-muted-foreground font-mono uppercase tracking-[0.3em]">{item.domain}</span>
                            <button className="flex items-center text-[12px] font-bold text-primary uppercase tracking-[0.4em] hover:text-white transition-all duration-500">
                              Protocol Specs <ArrowRight className="ml-5 w-6 h-6 group-hover/card:translate-x-3 transition-transform" />
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
