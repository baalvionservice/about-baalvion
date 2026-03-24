"use client"

import { useState } from "react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Mail, MapPin, Phone, Send } from "lucide-react";

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
        toast({ title: "Message Sent", description: "We will get back to you shortly." });
        (e.target as HTMLFormElement).reset();
      }
    } catch (err) {
      toast({ title: "Error", description: "Failed to send message. Please try again.", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <main className="pt-40 pb-32">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-20">
            <div>
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">Let's Build the <span className="text-primary">Nexus</span></h1>
              <p className="text-xl text-muted-foreground mb-12">
                Whether you're an investor, potential partner, or looking to join our mission, we'd love to hear from you.
              </p>

              <div className="space-y-8">
                <div className="flex gap-6 items-center">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Mail className="text-accent" />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold">Global Intelligence</h4>
                    <p className="text-muted-foreground">intel@baalvion.nexus</p>
                  </div>
                </div>
                <div className="flex gap-6 items-center">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <MapPin className="text-accent" />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold">Strategic Headquarters</h4>
                    <p className="text-muted-foreground">Financial District, New Delhi, India</p>
                  </div>
                </div>
                <div className="flex gap-6 items-center">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Phone className="text-accent" />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold">Support Nexus</h4>
                    <p className="text-muted-foreground">+91 (800) NEXUS-BAAL</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="glass-card p-8 md:p-12 rounded-3xl">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-white">Full Name</label>
                    <Input name="name" required placeholder="John Doe" className="bg-white/5 border-white/10" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-white">Email Address</label>
                    <Input name="email" type="email" required placeholder="john@company.com" className="bg-white/5 border-white/10" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-white">Message</label>
                  <Textarea name="message" required placeholder="How can we collaborate?" className="bg-white/5 border-white/10 min-h-[150px]" />
                </div>
                <Button type="submit" disabled={loading} className="w-full btn-primary h-12">
                  {loading ? "Sending..." : "Submit Inquiry"}
                  <Send className="ml-2 w-4 h-4" />
                </Button>
              </form>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
