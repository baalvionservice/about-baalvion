"use client"

import { useState } from "react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Mail, MapPin, ShieldCheck, Send, Users, Globe, Lock, ArrowRight } from "lucide-react";
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

      if (!res.ok) throw new Error('Network response was not ok');

      toast({ 
        title: "Nexus Link Established", 
        description: "Your strategic inquiry has been registered in the secure buffer." 
      });
      (e.target as HTMLFormElement).reset();
    } catch (err) {
      toast({ 
        title: "Link Error", 
        description: "Could not establish nexus link. Please check your network protocol.", 
        variant: "destructive" 
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-48 pb-40">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-32 items-start">
            <div className="space-y-16 animate-fade-in">
              <div className="space-y-8">
                <span className="section-label">Strategic Communications</span>
                <h1 className="text-6xl md:text-8xl font-bold text-white leading-[0.9] tracking-tighter">Establish <br/><span className="gradient-text">Nexus Link</span></h1>
                <p className="text-2xl text-muted-foreground leading-relaxed font-light max-w-lg">
                  Initiate a strategic partnership or project briefing. Our global trade specialists are ready to architect your integration.
                </p>
              </div>

              <div className="grid gap-10">
                {[
                  { icon: Mail, title: "Global Intelligence", value: "intel@baalvion.nexus", label: "Email Protocol" },
                  { icon: MapPin, title: "Strategic HQ", value: "New Delhi, NCR, IN", label: "Physical Node" },
                  { icon: ShieldCheck, title: "Secure Buffer", value: "PGP: BAAL-2024-NX", label: "Encryption Key" },
                ].map((item, i) => (
                  <div key={i} className="flex gap-8 items-center p-8 glass-card rounded-3xl border-white/5 hover:border-primary/40 group">
                    <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:bg-primary transition-all duration-500 text-primary group-hover:text-white shadow-xl shadow-primary/5">
                      <item.icon className="w-8 h-8" />
                    </div>
                    <div className="space-y-1">
                      <p className="text-[10px] font-bold text-primary uppercase tracking-[0.2em]">{item.label}</p>
                      <h4 className="text-white font-bold text-xl">{item.value}</h4>
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-10 rounded-[3rem] bg-primary/5 border border-primary/10 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700" />
                <div className="relative z-10 space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-accent/20 flex items-center justify-center">
                      <Users className="w-6 h-6 text-accent" />
                    </div>
                    <h4 className="text-white font-bold uppercase tracking-[0.2em] text-sm">Response Protocol</h4>
                  </div>
                  <p className="text-lg text-muted-foreground leading-relaxed italic font-light">
                    "Our strategic response team typically reviews all inbound nexus links within 4-6 operational hours. Global trade never sleeps, and neither does the Nexus."
                  </p>
                </div>
              </div>
            </div>

            <div className="glass-card p-12 md:p-20 rounded-[4rem] border-primary/20 shadow-2xl shadow-primary/5 relative">
              <div className="absolute -top-6 left-12">
                <Badge className="bg-primary text-white py-2 px-6 rounded-full font-bold shadow-xl">Secure Link Terminal</Badge>
              </div>
              <form onSubmit={handleSubmit} className="space-y-10">
                <div className="grid md:grid-cols-2 gap-10">
                  <div className="space-y-3">
                    <label className="text-xs font-bold text-white uppercase tracking-[0.2em] ml-1">Identity Designation</label>
                    <Input name="name" required placeholder="Full Name" className="bg-white/5 border-white/10 h-16 rounded-2xl px-8 focus:border-accent text-lg" />
                  </div>
                  <div className="space-y-3">
                    <label className="text-xs font-bold text-white uppercase tracking-[0.2em] ml-1">Secure Email</label>
                    <Input name="email" type="email" required placeholder="Secure Address" className="bg-white/5 border-white/10 h-16 rounded-2xl px-8 focus:border-accent text-lg" />
                  </div>
                </div>
                <div className="space-y-3">
                  <label className="text-xs font-bold text-white uppercase tracking-[0.2em] ml-1">Strategic Objective</label>
                  <Input name="subject" required placeholder="e.g. Infrastructure Integration" className="bg-white/5 border-white/10 h-16 rounded-2xl px-8 focus:border-accent text-lg" />
                </div>
                <div className="space-y-3">
                  <label className="text-xs font-bold text-white uppercase tracking-[0.2em] ml-1">Operational Brief</label>
                  <Textarea name="message" required placeholder="How can we architect the future together?" className="bg-white/5 border-white/10 min-h-[220px] rounded-[2rem] p-8 focus:border-accent resize-none text-lg leading-relaxed" />
                </div>
                <Button type="submit" disabled={loading} className="w-full btn-primary h-20 text-xl font-bold rounded-[2rem] shadow-2xl">
                  {loading ? (
                    <span className="flex items-center gap-3">
                      <Globe className="w-6 h-6 animate-spin" /> Establishing Link...
                    </span>
                  ) : (
                    <span className="flex items-center gap-3">
                      Establish Nexus Link <Send className="w-6 h-6" />
                    </span>
                  )}
                </Button>
                <div className="flex items-center justify-center gap-4 text-[10px] text-muted-foreground uppercase tracking-[0.3em] font-bold">
                  <Lock className="w-4 h-4 text-primary" /> Encryption ACTIVE • AES-256
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
