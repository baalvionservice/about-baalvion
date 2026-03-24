"use client"

import { useEffect, useState } from "react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { EcosystemItem } from "@/lib/db";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2, ArrowRight, Database, ShieldCheck, BrainCircuit, Globe } from "lucide-react";

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
      case 'Infrastructure': return <Database className="w-7 h-7" />;
      case 'Intelligence': return <BrainCircuit className="w-7 h-7" />;
      case 'Governance': return <ShieldCheck className="w-7 h-7" />;
      default: return <Globe className="w-7 h-7" />;
    }
  };

  if (loading) return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <Loader2 className="w-10 h-10 animate-spin text-primary" />
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-48 pb-32">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mb-24">
            <Badge className="py-1 px-4 text-[10px] tracking-[0.3em] uppercase font-bold bg-primary/20 text-accent border-primary/20">Infrastructure Architecture</Badge>
            <h1 className="text-5xl md:text-8xl font-bold text-white mt-8 leading-tight">
              Operational <span className="gradient-text">Layers</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground font-light mt-8 leading-relaxed max-w-2xl">
              A standardized blueprint of the Baalvion Nexus, architected for transparency, modularity, and global scale.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {items.map((item, idx) => (
              <Card key={item.id} className="glass-card group hover:border-primary/50 transition-all duration-500">
                <CardContent className="p-12 flex flex-col md:flex-row gap-8 items-start">
                  <div className="w-16 h-16 bg-primary/10 rounded-2xl flex-shrink-0 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <span className="text-accent">{getIcon(item.layer)}</span>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-3xl font-bold text-white">{item.name}</h3>
                      <span className="text-[10px] font-bold text-primary tracking-widest uppercase">{item.layer}</span>
                    </div>
                    <p className="text-muted-foreground leading-relaxed text-lg font-light">{item.description}</p>
                    {item.domain && (
                      <div className="pt-4 flex items-center justify-between border-t border-white/5">
                        <span className="text-xs text-muted-foreground font-mono">{item.domain}</span>
                        <button className="flex items-center text-xs font-bold text-accent uppercase tracking-widest hover:gap-4 transition-all">
                          Protocol Specs <ArrowRight className="ml-2 w-4 h-4" />
                        </button>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}