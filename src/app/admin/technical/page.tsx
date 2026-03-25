
"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Cpu, Zap, Database, Globe, RefreshCcw, HardDrive, FileArchive, Server, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";

export default function TechnicalAdmin() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 tracking-tight">System Infrastructure & Integration</h2>
          <p className="text-sm text-gray-500">Monitor BOS nodes, API integrations, and digital asset registries.</p>
        </div>
        <Button variant="outline" className="h-11 px-6 rounded-xl font-bold border-gray-200 bg-white">
          <RefreshCcw className="w-4 h-4 mr-2" /> Global Sync
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <Card className="bg-[#151B24] border-none text-white shadow-xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 -mr-16 -mt-16 rounded-full blur-3xl" />
          <CardHeader>
            <CardTitle className="text-sm font-bold uppercase tracking-[0.3em] flex items-center gap-2">
              <Server className="w-4 h-4 text-[#FF9900]" /> Core Uptime
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-end gap-2">
              <span className="text-4xl font-bold">99.998%</span>
              <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest mb-1.5">Operational</span>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-[10px] font-bold text-gray-500 uppercase">
                <span>Monthly Stability</span>
                <span className="text-primary">Nominal</span>
              </div>
              <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                <div className="h-full bg-primary w-[99.9%]" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white border-gray-200 shadow-sm">
          <CardHeader>
            <CardTitle className="text-sm font-bold uppercase tracking-widest flex items-center gap-2 text-gray-400">
              <Zap className="w-4 h-4 text-primary" /> Active API Streams
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-2xl font-bold text-gray-900">124</p>
                <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">External Links</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-emerald-500">0</p>
                <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Protocol Failures</p>
              </div>
            </div>
            <div className="pt-4 border-t border-gray-50 flex items-center gap-2 text-[10px] font-bold text-emerald-500 uppercase">
              <ShieldCheck className="w-3 h-3" /> All Integrations SECURE
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white border-gray-200 shadow-sm">
          <CardHeader>
            <CardTitle className="text-sm font-bold uppercase tracking-widest flex items-center gap-2 text-gray-400">
              <HardDrive className="w-4 h-4 text-primary" /> Registry Load
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <p className="text-2xl font-bold text-gray-900">14.8 TB</p>
              <Badge variant="outline" className="text-[9px] font-bold uppercase">42% Capacity</Badge>
            </div>
            <Progress value={42} className="h-1.5 bg-gray-100" />
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="nodes" className="w-full">
        <TabsList className="bg-gray-100 p-1 rounded-xl mb-8">
          <TabsTrigger value="nodes" className="rounded-lg font-bold text-xs uppercase tracking-widest px-8">BOS Infrastructure Nodes</TabsTrigger>
          <TabsTrigger value="integrations" className="rounded-lg font-bold text-xs uppercase tracking-widest px-8">Partner Integrations</TabsTrigger>
          <TabsTrigger value="assets" className="rounded-lg font-bold text-xs uppercase tracking-widest px-8">Asset Registry</TabsTrigger>
        </TabsList>

        <TabsContent value="nodes" className="space-y-6">
          <Card className="bg-white border-gray-200 overflow-hidden shadow-sm">
            <Table>
              <TableHeader className="bg-gray-50">
                <TableRow>
                  <TableHead className="text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-8">Node Identifier</TableHead>
                  <TableHead className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Region</TableHead>
                  <TableHead className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Protocol Health</TableHead>
                  <TableHead className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">CPU/Mem Load</TableHead>
                  <TableHead className="text-right pr-8 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Telemetry</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {[
                  { id: 'NODE-IND-DEL-01', region: 'APAC (India)', status: 'Nominal', load: 24 },
                  { id: 'NODE-SGP-CHG-02', region: 'APAC (Singapore)', status: 'Nominal', load: 18 },
                  { id: 'NODE-GBR-LDN-01', region: 'EMEA (UK)', status: 'Degraded', load: 82 },
                  { id: 'NODE-USA-NYC-01', region: 'AMER (USA)', status: 'Nominal', load: 45 },
                ].map((node, i) => (
                  <TableRow key={i} className="hover:bg-gray-50 transition-colors group">
                    <TableCell className="pl-8 py-5">
                      <div className="flex items-center gap-3">
                        <div className={cn(
                          "w-2 h-2 rounded-full",
                          node.status === 'Nominal' ? "bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.4)]" : "bg-amber-500 animate-pulse"
                        )} />
                        <span className="font-mono text-xs font-bold text-gray-900">{node.id}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">{node.region}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className={cn(
                        "text-[9px] uppercase tracking-tighter py-0 font-bold",
                        node.status === 'Nominal' ? "bg-emerald-50 text-emerald-600 border-emerald-100" : "bg-amber-50 text-amber-600 border-amber-100"
                      )}>{node.status}</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono text-gray-400 w-8">{node.load}%</span>
                        <div className="w-20 h-1 bg-gray-100 rounded-full overflow-hidden">
                          <div className={cn(
                            "h-full rounded-full transition-all",
                            node.load > 80 ? "bg-red-500" : "bg-primary"
                          )} style={{ width: `${node.load}%` }} />
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-right pr-8">
                      <Button variant="ghost" size="sm" className="text-[10px] font-bold text-primary uppercase">Direct Link</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </TabsContent>

        <TabsContent value="integrations" className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { name: 'SBI Corporate Banking', type: 'REST API', latency: '124ms', security: 'mTLS + AES', logo: Globe },
            { name: 'PayU Enterprise Link', type: 'Webhook', latency: '240ms', security: 'HMAC-SHA256', logo: Zap },
            { name: 'HSBC Settlement Engine', type: 'SWIFT/ISO', latency: '1.2s', security: 'End-to-End', logo: RefreshCcw },
          ].map((int, i) => (
            <Card key={i} className="bg-white border-gray-200 p-6 space-y-6 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between">
                <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center text-primary">
                  <int.logo className="w-6 h-6" />
                </div>
                <Badge className="bg-emerald-50 text-emerald-600 border-emerald-100 text-[9px] font-bold uppercase tracking-widest">Active</Badge>
              </div>
              <div className="space-y-1">
                <h4 className="font-bold text-gray-900 text-sm">{int.name}</h4>
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">{int.type} Protocol</p>
              </div>
              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-50">
                <div>
                  <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Latency</p>
                  <p className="text-xs font-mono text-gray-900 mt-1">{int.latency}</p>
                </div>
                <div>
                  <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Security</p>
                  <p className="text-xs font-mono text-gray-900 mt-1">{int.security}</p>
                </div>
              </div>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="assets" className="space-y-6">
          <div className="flex items-center gap-4 bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <FileArchive className="w-8 h-8 text-primary" />
            <div className="flex-1">
              <h4 className="font-bold text-gray-900">Global Asset Buffer</h4>
              <p className="text-xs text-gray-500">Centralized storage for technical reports, audit certifications, and media nodes.</p>
            </div>
            <Button className="btn-primary h-10 px-6 rounded-lg font-bold">Upload Infrastructure Asset</Button>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {[
              { name: 'Q1_Audit.pdf', size: '2.4 MB', type: 'PDF' },
              { name: 'BOS_v2_Architecture.zip', size: '148 MB', type: 'Archive' },
              { name: 'Partner_Agreement_SBI.docx', size: '420 KB', type: 'Doc' },
              { name: 'System_Logs_Oct24.log', size: '12 MB', type: 'Log' },
            ].map((file, i) => (
              <Card key={i} className="bg-white border-gray-200 p-4 text-center space-y-3 hover:border-primary/20 transition-all cursor-pointer">
                <div className="w-10 h-10 bg-gray-50 rounded-lg mx-auto flex items-center justify-center text-gray-400">
                  <Database className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] font-bold text-gray-900 truncate">{file.name}</p>
                  <p className="text-[9px] text-gray-400 font-bold uppercase">{file.size}</p>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
