"use client"

import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Globe, Shield, Target, Users, Building2 } from "lucide-react";

export default function CompanyClient() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-56 pb-48">
        <div className="section-container">
          <div className="max-w-5xl mx-auto text-center space-y-16 mb-56 animate-fade-in">
            <span className="section-label">The Vision</span>
            <h1 className="gradient-text">
              Unified <br/>Global Trade
            </h1>
            <p className="text-2xl md:text-4xl mx-auto leading-relaxed">
              We are architecting the foundational layer for the next century of international commerce, bridging the gap between legacy systems and future automation.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-12 mb-56">
            {[
              { icon: Globe, title: 'Unmatched Reach', desc: 'Operating across 180+ jurisdictions with localized intelligence and legal mapping.' },
              { icon: Shield, title: 'Integrity First', desc: 'A culture rooted in transparency, compliance, and absolute accountability.' },
              { icon: Target, title: 'Strategic Scale', desc: 'Focusing on deep infrastructure that transforms how the world moves value.' },
            ].map((item, i) => (
              <div key={i} className="glass-card p-14 rounded-[3rem] space-y-10 group hover:border-primary/50 transition-all duration-700">
                <div className="w-20 h-20 rounded-[2rem] bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-700 shadow-2xl">
                  <item.icon className="w-10 h-10" />
                </div>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="grid lg:grid-cols-2 gap-32 items-center">
            <div className="glass-card p-20 rounded-[4rem] space-y-16">
              <span className="section-label">Our Impact</span>
              <h2>Infrastructure built for resilience.</h2>
              <p className="text-xl md:text-2xl">
                Baalvion Industries was founded on the belief that global trade is the most powerful engine for human progress, yet it remains hampered by fragmentation. We build the nexus that resolves this.
              </p>
              <div className="grid grid-cols-2 gap-12 pt-10">
                <div>
                  <p className="text-5xl font-bold text-white mb-4">2021</p>
                  <p className="text-[11px] text-muted-foreground uppercase tracking-[0.4em] font-bold">Nexus Foundation</p>
                </div>
                <div>
                  <p className="text-5xl font-bold text-white mb-4">Global</p>
                  <p className="text-[11px] text-muted-foreground uppercase tracking-[0.4em] font-bold">Operational Presence</p>
                </div>
              </div>
            </div>
            <div className="space-y-20">
              <div className="flex gap-12 group">
                <div className="w-20 h-20 bg-white/5 rounded-[2rem] flex items-center justify-center text-primary flex-shrink-0 group-hover:bg-primary/10 transition-colors">
                  <Building2 className="w-10 h-10" />
                </div>
                <div className="space-y-4">
                  <h3 className="group-hover:text-primary transition-colors">Corporate Governance</h3>
                  <p>Headquartered in New Delhi, operating as a decentralized global nexus with strategic hubs in major trade corridors.</p>
                </div>
              </div>
              <div className="flex gap-12 group">
                <div className="w-20 h-20 bg-white/5 rounded-[2rem] flex items-center justify-center text-accent flex-shrink-0 group-hover:bg-accent/10 transition-colors">
                  <Users className="w-10 h-10" />
                </div>
                <div className="space-y-4">
                  <h3 className="group-hover:text-accent transition-colors">The Nexus Network</h3>
                  <p>A team of world-class engineers, legal scholars, and trade specialists working to unify global commerce protocols.</p>
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
