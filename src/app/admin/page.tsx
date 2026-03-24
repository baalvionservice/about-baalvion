"use client"

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Project, Inquiry } from "@/lib/db";
import { Briefcase, MessageSquare, TrendingUp, Users } from "lucide-react";

export default function AdminDashboard() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);

  useEffect(() => {
    fetch('/api/projects').then(res => res.json()).then(setProjects);
    fetch('/api/inquiry').then(res => res.json()).then(setInquiries);
  }, []);

  const stats = [
    { name: 'Active Projects', value: projects.filter(p => p.status === 'Active').length, icon: Briefcase, color: 'text-emerald-500' },
    { name: 'New Inquiries', value: inquiries.filter(i => i.status === 'New').length, icon: MessageSquare, color: 'text-blue-500' },
    { name: 'Platform Users', value: '1,284', icon: Users, color: 'text-accent' },
    { name: 'Global Growth', value: '+24%', icon: TrendingUp, color: 'text-amber-500' },
  ];

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <Card key={i} className="glass-card">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{stat.name}</CardTitle>
              <stat.icon className={cn("w-4 h-4", stat.color)} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="text-white">Recent Inquiries</CardTitle>
          </CardHeader>
          <CardContent>
            {inquiries.length === 0 ? (
              <p className="text-sm text-muted-foreground italic">No inquiries received yet.</p>
            ) : (
              <div className="space-y-4">
                {inquiries.slice(-5).reverse().map((inquiry) => (
                  <div key={inquiry.id} className="p-4 rounded-xl bg-white/5 border border-white/5">
                    <div className="flex justify-between mb-1">
                      <p className="font-semibold text-white">{inquiry.name}</p>
                      <span className="text-[10px] text-muted-foreground">{new Date(inquiry.date).toLocaleDateString()}</span>
                    </div>
                    <p className="text-xs text-muted-foreground truncate">{inquiry.message}</p>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="text-white">Project Distribution</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px] flex items-center justify-center text-muted-foreground italic">
            Visual metrics dashboard under development...
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

import { cn } from "@/lib/utils";
