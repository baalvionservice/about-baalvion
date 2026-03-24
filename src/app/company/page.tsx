"use client"

import { useEffect, useState } from "react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Page } from "@/lib/db";
import { Badge } from "@/components/ui/badge";
import { Loader2, Globe, Shield, Target, Users, Zap, Building2 } from "lucide-react";

export default function CompanyPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-48 pb-40">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center space-y-12 mb-40">
            <span className="section-label">The Vision</span>
            <h1 className="text-6xl md:text-9xl font-bold text-white leading-[0.9] gradient-text">
              Unified <br/>Global Trade
            </h1>
            <p className="text-xl md:text-3xl text-muted-foreground font-light leading-relaxed max-w-3xl mx-auto">
              We are architecting the foundational layer for the next century of international commerce, bridging the gap between legacy systems and future automation.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-40">
            {[
              { icon: Globe, title: 'Unmatched Reach', desc: 'Operating across 180+ jurisdictions with localized intelligence and legal mapping.' },
              { icon: Shield, title: 'Integrity First', desc: 'A culture rooted in transparency, compliance, and absolute accountability.' },
              { icon: Target, title: 'Strategic Scale', desc: 'Focusing on deep infrastructure that transforms how the world moves value.' },
            ].map((item, i) => (
              <div key={i} className="glass-card p-12 rounded-[2.5rem] space-y-8 group hover:border-primary/50 transition-all duration-500">
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
                  <item.icon className="w-8 h-8" />
                </div>
                <h4 className="text-2xl font-bold text-white">{item.title}</h4>
                <p className="text-muted-foreground leading-relaxed font-light">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div className="glass-card p-16 rounded-[3rem] space-y-10">
              <span className="section-label">Our Impact</span>
              <h3 className="text-4xl font-bold text-white leading-tight">Infrastructure built for resilience.</h3>
              <p className="text-lg text-muted-foreground font-light leading-relaxed">
                Baalvion Industries was founded on the belief that global trade is the most powerful engine for human progress, yet it remains hampered by fragmentation. We build the nexus that resolves this.
              </p>
              <div className="grid grid-cols-2 gap-8 pt-6">
                <div>
                  <p className="text-3xl font-bold text-white">2021</p>
                  <p className="text-xs text-muted-foreground uppercase tracking-widest font-bold mt-2">Nexus Foundation</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-white">Global</p>
                  <p className="text-xs text-muted-foreground uppercase tracking-widest font-bold mt-2">Operational Presence</p>
                </div>
              </div>
            </div>
            <div className="space-y-12">
              <div className="flex gap-8">
                <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center text-primary flex-shrink-0">
                  <Building2 className="w-7 h-7" />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-white mb-2">Corporate Governance</h4>
                  <p className="text-muted-foreground leading-relaxed font-light">Headquartered in New Delhi, operating as a decentralized global nexus with strategic hubs in major trade corridors.</p>
                </div>
              </div>
              <div className="flex gap-8">
                <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center text-accent flex-shrink-0">
                  <Users className="w-7 h-7" />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-white mb-2">The Nexus Network</h4>
                  <p className="text-muted-foreground leading-relaxed font-light">A team of world-class engineers, legal scholars, and trade specialists working to unify global commerce protocols.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}