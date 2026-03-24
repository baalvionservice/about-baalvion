"use client"

import { useEffect, useState } from "react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Shield, Globe, Zap, BarChart3, Database, Workflow } from "lucide-react";
import Link from "next/link";
import { PageContent, EcosystemLayer } from "@/lib/db";

export default function Home() {
  const [pageData, setPageData] = useState<PageContent | null>(null);
  const [ecoData, setEcoData] = useState<EcosystemLayer[]>([]);

  useEffect(() => {
    fetch('/api/pages?slug=home').then(res => res.json()).then(setPageData);
    fetch('/api/ecosystem').then(res => res.json()).then(setEcoData);
  }, []);

  if (!pageData) return null;

  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-40 pb-20 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-primary/10 rounded-full blur-[120px] -z-10" />
        <div className="container mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-accent mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <Zap className="w-3 h-3" />
            <span>GLOBAL TRADE INFRASTRUCTURE 2.0</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-6 max-w-4xl mx-auto leading-tight">
            The Digital Nexus for <span className="gradient-text">Global Commerce</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
            Connecting businesses, finance, compliance, and intelligence systems into a unified global infrastructure.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" asChild className="btn-primary min-w-[200px]">
              <Link href="/platform">Explore Platform <ArrowRight className="ml-2 w-4 h-4" /></Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="border-white/10 hover:bg-white/5 min-w-[200px]">
              <Link href="/contact">Partner with Us</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Stats/Features Section */}
      <section className="py-20 border-y border-white/5">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Shield, title: "Total Compliance", desc: "Built-in regulatory framework for global jurisdictions." },
              { icon: Globe, title: "Universal Access", desc: "Connect with supply chains across 150+ countries." },
              { icon: BarChart3, title: "Real-time Intel", desc: "Live intelligence feeds and market sentiment analysis." },
            ].map((feature, i) => (
              <div key={i} className="flex gap-6 items-start p-6 rounded-2xl hover:bg-white/5 transition-colors">
                <div className="p-3 bg-primary/10 rounded-xl">
                  <feature.icon className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Ecosystem Section */}
      <section className="py-32">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Our Ecosystem Layers</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">A multi-layered approach to solving the complexities of international trade.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {ecoData.map((layer) => (
              <Card key={layer.id} className="glass-card hover:scale-[1.02] transition-transform duration-300">
                <CardContent className="pt-8 text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <Database className="text-accent w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{layer.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{layer.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Problem/Solution Section */}
      <section className="py-32 bg-card/30">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-8">
              <h2 className="text-3xl md:text-5xl font-bold text-white leading-tight">Solving Fragmented <br/><span className="text-primary">Global Systems</span></h2>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="mt-1 w-5 h-5 rounded-full border border-destructive flex-shrink-0 flex items-center justify-center text-[10px] text-destructive">X</div>
                  <div>
                    <h4 className="font-semibold text-white mb-1">Fragmented Networks</h4>
                    <p className="text-sm text-muted-foreground">Current trade systems are siloed, causing massive delays and information gaps.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="mt-1 w-5 h-5 rounded-full border border-destructive flex-shrink-0 flex items-center justify-center text-[10px] text-destructive">X</div>
                  <div>
                    <h4 className="font-semibold text-white mb-1">Compliance Headaches</h4>
                    <p className="text-sm text-muted-foreground">Ever-changing regulations make cross-border scaling expensive and risky.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="glass-card p-10 rounded-3xl relative">
              <div className="absolute -top-6 -right-6 w-24 h-24 bg-accent/20 rounded-full blur-3xl" />
              <Workflow className="w-12 h-12 text-accent mb-8" />
              <h3 className="text-2xl font-bold text-white mb-4">The Baalvion Solution</h3>
              <p className="text-muted-foreground mb-8 leading-relaxed">
                We provide a unified API and infrastructure layer that bridges the gap between commerce, finance, and legal networks. One integration, global reach.
              </p>
              <Button asChild className="btn-accent">
                <Link href="/how-it-works">See How it Works</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
