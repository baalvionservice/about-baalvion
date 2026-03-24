"use client"

import { useState } from "react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Mail, MapPin, ShieldCheck, Send, Users, Globe, Lock, ArrowRight, Loader2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

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
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-48 pb-32">
        <div className="section-container">
          <div className="grid lg:grid-cols-2 gap-24 items-start">
            <div className="space-y-16 animate-fade-in">
              <div className="space-y-6">
                <span className="section-label">Strategic Communications</span>
                <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tighter leading-tight">Establish <br/><span className="gradient-text">Nexus Link</span></h1>
                <p className="text-xl text-muted-foreground leading-relaxed max-w-lg">
                  Initiate a strategic partnership or project briefing. Our global trade specialists are ready to architect your integration.
                </p>
              </div>

              <div className="grid gap-6">
                {[
                  { icon: Mail, value: "intel@baalvion.nexus", label: "Email Protocol" },
                  { icon: MapPin, value: "New Delhi, NCR, IN", label: "Physical Node" },
                  { icon: ShieldCheck, value: "PGP: BAAL-2024-NX", label: "Encryption Key" },
                ].map((item, i) => (
                  <div key={i} className={cn(
                    "flex gap-6 items-center p-8 glass-card border-white/5 card-hover group opacity-0 animate-fade-in fill-mode-forwards",
                    i === 0 ? "stagger-1" : i === 1 ? "stagger-2" : "stagger-3"
                  )}>
                    <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:bg-primary transition-all duration-500 text-primary group-hover:text-white border border-primary/10">
                      <item.icon className="w-6 h-6" />
                    </div>
                    <div className="space-y-1">
                      <p className="text-[10px] font-bold text-primary uppercase tracking-widest">{item.label}</p>
                      <h4 className="text-white font-bold text-lg">{item.value}</h4>
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-10 rounded-[2rem] bg-primary/[0.02] border border-primary/10 relative overflow-hidden group">
                <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                <div className="relative z-10 space-y-4">
                  <div className="flex items-center gap-3">
                    <Users className="w-5 h-5 text-accent animate-pulse" />
                    <h4 className="text-white font-bold uppercase tracking-widest text-[10px]">Response Protocol</h4>
                  </div>
                  <p className="text-lg text-muted-foreground leading-relaxed italic font-light">
                    "Our strategic response team typically reviews all inbound nexus links within 4-6 operational hours. Global trade never sleeps."
                  </p>
                </div>
              </div>
            </div>

            <div className="glass-card p-10 md:p-16 border-primary/20 shadow-2xl relative animate-fade-in stagger-2">
              <div className="absolute -top-4 left-10">
                <Badge className="bg-primary text-white py-1.5 px-6 rounded-full font-bold shadow-xl text-[10px] tracking-widest uppercase">Secure Link Terminal</Badge>
              </div>
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-2 group">
                    <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest ml-1 group-focus-within:text-primary transition-colors">Identity Designation</label>
                    <Input name="name" required placeholder="Full Name" className="bg-white/5 border-white/10 h-14 rounded-xl px-6 focus:border-primary focus:ring-1 focus:ring-primary/20 text-base transition-all" />
                  </div>
                  <div className="space-y-2 group">
                    <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest ml-1 group-focus-within:text-primary transition-colors">Secure Email</label>
                    <Input name="email" type="email" required placeholder="Secure Address" className="bg-white/5 border-white/10 h-14 rounded-xl px-6 focus:border-primary focus:ring-1 focus:ring-primary/20 text-base transition-all" />
                  </div>
                </div>
                <div className="space-y-2 group">
                  <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest ml-1 group-focus-within:text-primary transition-colors">Strategic Objective</label>
                  <Input name="subject" required placeholder="e.g. Infrastructure Integration" className="bg-white/5 border-white/10 h-14 rounded-xl px-6 focus:border-primary focus:ring-1 focus:ring-primary/20 text-base transition-all" />
                </div>
                <div className="space-y-2 group">
                  <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest ml-1 group-focus-within:text-primary transition-colors">Operational Brief</label>
                  <Textarea name="message" required placeholder="How can we architect the future together?" className="bg-white/5 border-white/10 min-h-[180px] rounded-2xl p-6 focus:border-primary focus:ring-1 focus:ring-primary/20 resize-none text-base leading-relaxed transition-all" />
                </div>
                <Button type="submit" disabled={loading} className="w-full h-16 text-lg font-bold group">
                  {loading ? (
                    <span className="flex items-center gap-3">
                      <Loader2 className="w-5 h-5 animate-spin" /> Establishing Link...
                    </span>
                  ) : (
                    <span className="flex items-center gap-3">
                      Establish Nexus Link <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </span>
                  )}
                </Button>
                <div className="flex items-center justify-center gap-3 text-[9px] text-muted-foreground uppercase tracking-widest font-bold">
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
