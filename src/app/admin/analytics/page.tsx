
"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, AreaChart, Area } from "recharts";
import { TrendingUp, Users, Zap, Briefcase, ArrowUpRight, ArrowDownRight, Activity } from "lucide-react";
import { cn } from "@/lib/utils";

const transactionData = [
  { name: 'Jan', value: 400 },
  { name: 'Feb', value: 300 },
  { name: 'Mar', value: 600 },
  { name: 'Apr', value: 800 },
  { name: 'May', value: 500 },
  { name: 'Jun', value: 900 },
];

const nodePerformance = [
  { name: 'APAC', uptime: 99.9 },
  { name: 'EMEA', uptime: 99.7 },
  { name: 'AMER', uptime: 99.8 },
  { name: 'Global', uptime: 99.95 },
];

export default function AnalyticsAdmin() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Analytics & Strategic Insights</h2>
          <p className="text-sm text-gray-500">Real-time performance metrics across the Baalvion Operating System (BOS).</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Total Transactions', value: '542,890', change: '+12.5%', trend: 'up', icon: Activity },
          { label: 'Active Partners', value: '148', change: '+4.2%', trend: 'up', icon: Users },
          { label: 'System Uptime', value: '99.99%', change: 'Nominal', trend: 'neutral', icon: Zap },
          { label: 'Launch Success', value: '100%', change: '+0.0%', trend: 'neutral', icon: Briefcase },
        ].map((stat, i) => (
          <Card key={i} className="bg-white border-gray-200 shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{stat.label}</CardTitle>
              <stat.icon className="w-4 h-4 text-[#FF9900]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
              <div className={cn(
                "flex items-center gap-1 text-[10px] font-bold mt-1",
                stat.trend === 'up' ? "text-emerald-500" : "text-gray-400"
              )}>
                {stat.trend === 'up' ? <ArrowUpRight className="w-3 h-3" /> : null}
                {stat.change} vs Last Month
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid lg:grid-cols-12 gap-8">
        <Card className="lg:col-span-8 bg-white border-gray-200 shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-bold">Clearing Velocity</CardTitle>
            <CardDescription>Monthly transaction volume across all global nodes.</CardDescription>
          </CardHeader>
          <CardContent className="h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={transactionData}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#FF9900" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#FF9900" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 10, fontWeight: 'bold', fill: '#999'}} />
                <YAxis axisLine={false} tickLine={false} tick={{fontSize: 10, fontWeight: 'bold', fill: '#999'}} />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                />
                <Area type="monotone" dataKey="value" stroke="#FF9900" strokeWidth={3} fillOpacity={1} fill="url(#colorValue)" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="lg:col-span-4 bg-white border-gray-200 shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-bold">Node Reliability</CardTitle>
            <CardDescription>Uptime metrics per geographic sector.</CardDescription>
          </CardHeader>
          <CardContent className="h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={nodePerformance} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f0f0f0" />
                <XAxis type="number" domain={[99, 100]} hide />
                <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{fontSize: 10, fontWeight: 'bold', fill: '#999'}} width={60} />
                <Tooltip />
                <Bar dataKey="uptime" fill="#FF9900" radius={[0, 4, 4, 0]} barSize={20} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
