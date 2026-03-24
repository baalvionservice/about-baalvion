"use client"

import { useState } from "react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Mail, MapPin, Phone, Send, ShieldCheck, Globe, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function ContactPage() {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    try {
      const res = await fetch('/api/inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        toast({ title: "Nexus Link Established", description: "Our strategic team will review your inquiry immediately." });
        (e.target as HTMLFormElement).reset();
      }
    } catch (err) {
      toast({ title: "Connection Failed", description: "Strategic link could not be established. Please retry.", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-48 pb-32">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-24 items-start">
            <div className="space-y-12">
              <div className="space-y-6">
                <Badge className="py-1 px-4 text-[10px] tracking-[0.3em] uppercase font-bold bg-primary/20 text-accent border-primary/20">Communications</Badge>
                <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight">Establish <br/><span className="gradient-text">Nexus Link</span></h1>
                <p className="text-xl text-muted-foreground leading-relaxed font-light max-w-lg">
                  Initiate a strategic partnership or project briefing. Our global trade specialists are ready to architect your integration.
                </p>
              </div>

              <div className="grid gap-8">
                {[
                  { icon: Mail, title: "Global Intelligence", value: "intel@baalvion.nexus" },
                  { icon: MapPin, title: "Strategic Headquarters", value: "New Delhi, NCR, IN" },
                  { icon: ShieldCheck, title: "Secure Protocol", value: "PGP: BAAL-2024-NEXUS" },
                ].map((item, i) => (
                  <div key={i} className="flex gap-6 items-center p-6 glass-card rounded-2xl border-white/5 hover:border-primary/30 transition-all group">
                    <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <item.icon className="text-accent w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="text-white font-bold text-sm uppercase tracking-widest mb-1">{item.title}</h4>
                      <p className="text-muted-foreground font-medium">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-8 rounded-3xl bg-primary/5 border border-primary/10">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
                    <Users className="w-5 h-5 text-accent" />
                  </div>
                  <h4 className="text-white font-bold uppercase tracking-widest text-sm">Strategic Response Team</h4>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed italic">
                  "Our team typically reviews all strategic inquiries within 4-6 operational hours. Global trade never sleeps, and neither does the Nexus."
                </p>
              </div>
            </div>

            <div className="glass-card p-10 md:p-16 rounded-[3rem] border-primary/20 shadow-2xl shadow-primary/5">
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-white uppercase tracking-widest ml-1">Full Identity</label>
                    <Input name="name" required placeholder="Arch. John Doe" className="bg-white/5 border-white/10 h-14 rounded-xl px-6 focus:border-accent" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-white uppercase tracking-widest ml-1">Secure Email</label>
                    <Input name="email" type="email" required placeholder="john@enterprise.nexus" className="bg-white/5 border-white/10 h-14 rounded-xl px-6 focus:border-accent" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-white uppercase tracking-widest ml-1">Strategic Objective</label>
                  <Input name="subject" required placeholder="Infrastructure Integration / Strategic Partner" className="bg-white/5 border-white/10 h-14 rounded-xl px-6 focus:border-accent" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-white uppercase tracking-widest ml-1">Nexus Brief</label>
                  <Textarea name="message" required placeholder="How can we architect the future together?" className="bg-white/5 border-white/10 min-h-[180px] rounded-xl p-6 focus:border-accent resize-none" />
                </div>
                <Button type="submit" disabled={loading} className="w-full btn-primary h-16 text-lg font-bold rounded-xl shadow-xl shadow-primary/20">
                  {loading ? "Establishing Link..." : "Establish Nexus Link"}
                  <Send className="ml-3 w-5 h-5" />
                </Button>
                <p className="text-center text-[10px] text-muted-foreground uppercase tracking-widest font-bold">
                  Encryption Layer: ACTIVE • AES-256
                </p>
              </form>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}