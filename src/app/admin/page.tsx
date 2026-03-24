"use client"

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Project, Inquiry, Page, EcosystemItem } from "@/lib/db";
import { Briefcase, MessageSquare, Layout, Layers, TrendingUp, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

export default function AdminDashboard() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [pages, setPages] = useState<Page[]>([]);
  const [ecosystem, setEcosystem] = useState<EcosystemItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [pRes, iRes, pgRes, eRes] = await Promise.all([
          fetch('/api/projects'),
          fetch('/api/inquiry'),
          fetch('/api/pages'),
          fetch('/api/ecosystem')
        ]);
        
        setProjects(await pRes.json());
        setInquiries(await iRes.json());
        setPages(await pgRes.json());
        setEcosystem(await eRes.json());
      } catch (err) {
        console.error("Failed to sync dashboard data", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const stats = [
    { name: 'Total Pages', value: pages.length, icon: Layout, color: 'text-blue-500' },
    { name: 'Active Projects', value: projects.length, icon: Briefcase, color: 'text-emerald-500' },
    { name: 'Ecosystem Layers', value: ecosystem.length, icon: Layers, color: 'text-accent' },
    { name: 'New Inquiries', value: inquiries.filter(i => i.status === 'New').length, icon: MessageSquare, color: 'text-amber-500' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <Card key={i} className="glass-card border-white/5 hover:border-primary/20 transition-all">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-xs font-bold text-muted-foreground uppercase tracking-widest">{stat.name}</CardTitle>
              <stat.icon className={cn("w-4 h-4", stat.color)} />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-white">
                {loading ? "..." : stat.value}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <Card className="glass-card lg:col-span-2 border-white/5">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-white text-lg">Recent Strategic Inquiries</CardTitle>
            <MessageSquare className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {inquiries.length === 0 ? (
              <div className="py-12 text-center">
                <p className="text-sm text-muted-foreground italic">No inquiries received yet.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {inquiries.slice(-4).reverse().map((inquiry) => (
                  <div key={inquiry.id} className="p-5 rounded-2xl bg-white/5 border border-white/5 flex justify-between items-center group hover:bg-white/10 transition-all">
                    <div className="space-y-1">
                      <p className="font-bold text-white text-sm">{inquiry.name}</p>
                      <p className="text-xs text-muted-foreground truncate max-w-md">{inquiry.message}</p>
                    </div>
                    <div className="text-right">
                      <div className={cn(
                        "text-[9px] font-bold uppercase tracking-tighter px-2 py-0.5 rounded-full mb-1 inline-block",
                        inquiry.status === 'New' ? "bg-amber-500/10 text-amber-500" : "bg-blue-500/10 text-blue-500"
                      )}>
                        {inquiry.status}
                      </div>
                      <p className="text-[10px] text-muted-foreground block">
                        {new Date(inquiry.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="glass-card border-white/5">
          <CardHeader>
            <CardTitle className="text-white text-lg">System Pulse</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                <TrendingUp className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm font-bold text-white">Infrastructure Status</p>
                <p className="text-xs text-emerald-500 font-medium">Nominal • 99.9% Uptime</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center text-accent">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm font-bold text-white">Last Sync</p>
                <p className="text-xs text-muted-foreground font-medium">Just now</p>
              </div>
            </div>
            <div className="pt-4 border-t border-white/5">
              <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em] mb-4">Storage Usage</p>
              <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                <div className="h-full bg-primary w-[12%] rounded-full shadow-[0_0_10px_rgba(var(--primary),0.5)]" />
              </div>
              <p className="text-[10px] text-right mt-2 text-muted-foreground">0.8GB / 10GB</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
