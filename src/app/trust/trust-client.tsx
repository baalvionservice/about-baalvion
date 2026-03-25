"use client"

import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { ShieldCheck, Lock, FileText, Scale, CheckCircle2, Activity } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function TrustClient() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main className="pt-56 pb-48">
        <div className="section-container">
          <div className="max-w-5xl mb-48 animate-fade-in">
            <span className="section-label">Governance & Compliance</span>
            <h1 className="text-gray-900 mb-12 font-bold leading-tight">Built on <br/>Unwavering <span className="text-primary">Trust</span></h1>
            <p className="text-2xl md:text-3xl text-gray-600 max-w-4xl leading-relaxed font-medium">
              Security, transparency, and international law are at the core of the Baalvion Nexus infrastructure. We architect for the highest global standards.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10 mb-56">
            {[
              { icon: ShieldCheck, title: "AES-256 Encryption", desc: "Military-grade encryption for all data in transit and at rest." },
              { icon: Lock, title: "Zero-Knowledge", desc: "Your trade data is private by design, visible only to authorized nodes." },
              { icon: Scale, title: "Global Compliance", desc: "Real-time mapping of trade laws across 180+ jurisdictions." },
              { icon: Activity, title: "Immutable Audit", desc: "Transparent, cryptographically signed logs for every transaction." }
            ].map((item, i) => (
              <Card key={i} className="bg-white border-gray-100 shadow-sm hover:shadow-md transition-all duration-500 rounded-xl group">
                <CardContent className="p-12 space-y-8">
                  <div className="w-16 h-16 rounded-2xl bg-primary/5 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-500 border border-primary/10">
                    <item.icon className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">{item.title}</h3>
                  <p className="text-base leading-relaxed text-gray-500">{item.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid lg:grid-cols-2 gap-32 items-center">
            <div className="space-y-16">
              <div className="space-y-6">
                <span className="section-label">Standardization</span>
                <h2 className="text-gray-900 font-bold">Adhering to the world's strictest protocols.</h2>
              </div>
              <div className="grid gap-6">
                {[
                  "GDPR & Data Privacy Excellence",
                  "SOC2 Type II Compliant Architecture",
                  "ISO 27001 Information Security",
                  "KYC/AML Global Standards"
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-8 p-8 bg-gray-50 border border-gray-100 rounded-2xl hover:border-primary/20 transition-all duration-500">
                    <CheckCircle2 className="w-8 h-8 text-primary flex-shrink-0" />
                    <span className="text-xl md:text-2xl font-bold text-gray-900 tracking-tight">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-primary/[0.03] p-16 md:p-24 rounded-[3rem] border border-primary/10 text-center space-y-12">
              <FileText className="w-24 h-24 text-primary mx-auto mb-4" />
              <h3 className="text-3xl font-bold text-gray-900 leading-tight">Security & Compliance Documentation</h3>
              <p className="text-xl mx-auto text-gray-600 font-medium">
                Request our complete security whitepaper and compliance certificates for your strategic audit and due diligence process.
              </p>
              <button className="btn-primary w-full h-20 rounded-xl text-xl font-bold shadow-xl shadow-primary/20">
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
