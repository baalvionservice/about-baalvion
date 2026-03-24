"use client"

import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Badge } from "@/components/ui/badge";
import { Shield, Lock, FileText, Scale, CheckCircle2, Globe, ShieldCheck, Activity } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function TrustPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-48 pb-40">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mb-32">
            <span className="section-label">Governance & Compliance</span>
            <h1 className="text-6xl md:text-8xl font-bold text-white mb-10 leading-[0.95] gradient-text">Built on <br/>Unwavering Trust</h1>
            <p className="text-xl md:text-2xl text-muted-foreground font-light leading-relaxed">
              Security, transparency, and international law are at the core of the Baalvion Nexus infrastructure. We architect for the highest global standards.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-40">
            {[
              { icon: ShieldCheck, title: "AES-256 Encryption", desc: "Military-grade encryption for all data in transit and at rest." },
              { icon: Lock, title: "Zero-Knowledge", desc: "Your trade data is private by design, visible only to authorized nodes." },
              { icon: Scale, title: "Global Compliance", desc: "Real-time mapping of trade laws across 180+ jurisdictions." },
              { icon: Activity, title: "Immutable Audit", desc: "Transparent, cryptographically signed logs for every transaction." }
            ].map((item, i) => (
              <Card key={i} className="glass-card card-hover">
                <CardContent className="p-10 space-y-6">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                    <item.icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-white">{item.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-12">
              <div className="space-y-4">
                <span className="section-label">Standardization</span>
                <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">Adhering to the world's strictest protocols.</h2>
              </div>
              <div className="grid gap-8">
                {[
                  "GDPR & Data Privacy Excellence",
                  "SOC2 Type II Compliant Architecture",
                  "ISO 27001 Information Security",
                  "KYC/AML Global Standards"
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-6 p-6 glass-card rounded-2xl border-white/5">
                    <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0" />
                    <span className="text-lg font-medium text-white">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="glass-card p-16 rounded-[3rem] border-primary/20 bg-primary/5 text-center space-y-10">
              <FileText className="w-20 h-20 text-primary mx-auto" />
              <h3 className="text-3xl font-bold text-white">Security & Compliance Documentation</h3>
              <p className="text-muted-foreground leading-relaxed font-light">
                Request our complete security whitepaper and compliance certificates for your strategic audit and due diligence process.
              </p>
              <button className="btn-primary w-full h-16 rounded-2xl text-lg font-bold">
                Download Trust Bundle
              </button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}