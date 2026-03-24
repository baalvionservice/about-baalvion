"use client"

import { useEffect, useState, useMemo } from "react";
import { Page, Section } from "@/lib/db";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, ArrowRight, Save, FileText, Settings, Sparkles, Search, X, Edit3 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

export default function PagesAdmin() {
  const [pages, setPages] = useState<Page[]>([]);
  const [sections, setSections] = useState<Section[]>([]);
  const [loading, setLoading] = useState(true);
  const [savingPage, setSavingPage] = useState(false);
  const [savingSection, setSavingSection] = useState(false);
  const [editingPage, setEditingPage] = useState<Page | null>(null);
  const [editingSection, setEditingSection] = useState<Section | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    Promise.all([
      fetch('/api/pages').then(res => res.json()),
      fetch('/api/sections').then(res => res.json())
    ]).then(([pagesData, sectionsData]) => {
      setPages(pagesData);
      setSections(sectionsData);
      setLoading(false);
    });
  }, []);

  const getAdminHeaders = () => {
    const token = localStorage.getItem('admin_token');
    return {
      'Content-Type': 'application/json',
      'x-admin-key': token || ''
    };
  };

  const handleUpdatePage = async (page: Page) => {
    setSavingPage(true);
    try {
      const res = await fetch('/api/pages', {
        method: 'PUT',
        headers: getAdminHeaders(),
        body: JSON.stringify(page),
      });
      if (!res.ok) throw new Error('Unauthorized');
      setPages(pages.map(p => p.id === page.id ? page : p));
      toast({ title: "Page Updated", description: "Metadata saved successfully." });
    } catch (err) {
      toast({ title: "Authorization Denied", description: "Strategic update failed.", variant: "destructive" });
    } finally {
      setSavingPage(false);
    }
  };

  const handleUpdateSection = async (section: Section) => {
    setSavingSection(true);
    try {
      const res = await fetch('/api/sections', {
        method: 'PUT',
        headers: getAdminHeaders(),
        body: JSON.stringify(section),
      });
      if (!res.ok) throw new Error('Unauthorized');
      const updated = await res.json();
      setSections(sections.map(s => s.id === updated.id ? updated : s));
      setEditingSection(null);
      toast({ title: "Section Updated", description: "Infrastructure content architected." });
    } catch (err) {
      toast({ title: "Authorization Denied", description: "Deployment failed.", variant: "destructive" });
    } finally {
      setSavingSection(false);
    }
  };

  const filteredPages = useMemo(() => {
    return pages.filter(p => 
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      p.slug.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [pages, searchQuery]);

  if (loading) return (
    <div className="flex flex-col items-center justify-center py-24 gap-4">
      <Loader2 className="animate-spin text-primary w-10 h-10" />
      <p className="text-muted-foreground text-sm font-medium">Syncing Architecture...</p>
    </div>
  );

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-white tracking-tight">Nexus Architecture</h2>
          <p className="text-sm text-muted-foreground">Manage pages, sections, and structural content protocols.</p>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-12">
        <Card className="glass-card lg:col-span-4 border-white/5 p-0 flex flex-col h-fit">
          <CardHeader className="p-6 border-b border-white/5 flex flex-col gap-4">
            <CardTitle className="text-white text-md flex items-center gap-2">
              <FileText className="w-4 h-4 text-primary" /> Active Pages
            </CardTitle>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
              <Input 
                placeholder="Search slug/title..." 
                className="pl-9 h-9 bg-white/5 border-white/10 text-xs"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery("")} className="absolute right-3 top-1/2 -translate-y-1/2">
                  <X className="w-3 h-3 text-muted-foreground hover:text-white" />
                </button>
              )}
            </div>
          </CardHeader>
          <div className="divide-y divide-white/5 overflow-y-auto max-h-[600px] no-scrollbar">
            {filteredPages.length === 0 ? (
              <div className="p-12 text-center">
                <p className="text-xs text-muted-foreground italic">No matching pages found.</p>
              </div>
            ) : filteredPages.map(page => (
              <div 
                key={page.id} 
                onClick={() => setEditingPage(page)}
                className={cn(
                  "p-5 cursor-pointer transition-all flex items-center justify-between group",
                  editingPage?.id === page.id ? "bg-primary/10 border-r-2 border-primary" : "hover:bg-white/5"
                )}
              >
                <div>
                  <p className="font-bold text-white text-sm group-hover:text-primary transition-colors">{page.title}</p>
                  <p className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest mt-1">/{page.slug}</p>
                </div>
                <ArrowRight className={cn("w-4 h-4 text-muted-foreground transition-all", editingPage?.id === page.id ? "translate-x-1 text-primary" : "group-hover:translate-x-1")} />
              </div>
            ))}
          </div>
        </Card>

        <div className="lg:col-span-8 space-y-6">
          {editingPage ? (
            <div className="space-y-6 animate-in slide-in-from-right-4 duration-300">
              <Card className="glass-card border-white/5">
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle className="text-white text-lg">Page Configuration</CardTitle>
                    <p className="text-[10px] text-accent font-bold uppercase tracking-widest mt-1">Designation ID: {editingPage.id}</p>
                  </div>
                  <Button variant="ghost" size="sm" onClick={() => setEditingPage(null)} className="h-8 rounded-lg hover:bg-white/10">Close Editor</Button>
                </CardHeader>
                <CardContent className="space-y-6 pt-0">
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest ml-1">Page Title</label>
                      <Input 
                        value={editingPage.title} 
                        onChange={(e) => setEditingPage({...editingPage, title: e.target.value})}
                        className="bg-white/5 border-white/10 h-11"
                        placeholder="Nexus Entry"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest ml-1">URL Slug (Locked)</label>
                      <Input 
                        value={editingPage.slug} 
                        disabled
                        className="bg-white/5 border-white/10 opacity-50 cursor-not-allowed h-11"
                      />
                    </div>
                  </div>
                  <Button disabled={savingPage} className="btn-primary w-full h-12 rounded-xl font-bold" onClick={() => handleUpdatePage(editingPage)}>
                    {savingPage ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Save className="w-4 h-4 mr-2" />}
                    Synchronize Metadata
                  </Button>
                </CardContent>
              </Card>

              <div className="space-y-4">
                <h3 className="text-sm font-bold text-white uppercase tracking-widest flex items-center gap-2 mb-6">
                  <Settings className="w-4 h-4 text-primary" /> Structural Sections Registry
                </h3>
                <div className="grid gap-4">
                  {editingPage.sections.map((sid, idx) => {
                    const section = sections.find(s => s.id === sid);
                    if (!section) return null;
                    return (
                      <Card key={sid} className="glass-card border-white/5 hover:border-white/10 transition-all overflow-hidden">
                        <div className="flex items-center p-6">
                          <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center mr-6 text-xs font-bold text-muted-foreground border border-white/5">
                            {idx + 1}
                          </div>
                          <div className="flex-1">
                            <p className="font-bold text-white text-sm">{section.title}</p>
                            <p className="text-[10px] text-primary uppercase font-bold tracking-widest mt-0.5">{section.type} protocol</p>
                          </div>
                          <Button size="sm" variant="outline" onClick={() => setEditingSection(section)} className="h-10 px-5 rounded-lg font-bold border-white/10 hover:bg-white/5">
                            Modify Content <Edit3 className="ml-2 w-3.5 h-3.5" />
                          </Button>
                        </div>
                      </Card>
                    )
                  })}
                </div>
              </div>
            </div>
          ) : (
            <Card className="glass-card h-full flex items-center justify-center border-dashed border-white/10 min-h-[400px]">
              <div className="text-center p-12 max-w-xs space-y-4">
                <FileText className="w-12 h-12 text-muted-foreground mx-auto opacity-20" />
                <h3 className="text-white font-bold">No Architecture Selected</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">Select an active page from the nexus registry to architect its layout and dynamic sections.</p>
              </div>
            </Card>
          )}
        </div>
      </div>

      <Dialog open={!!editingSection} onOpenChange={() => setEditingSection(null)}>
        <DialogContent className="glass-card border-white/10 max-w-2xl p-0 overflow-hidden">
          <DialogHeader className="p-8 border-b border-white/5">
            <div className="flex justify-between items-center">
              <div>
                <DialogTitle className="text-xl font-bold text-white">{editingSection?.title}</DialogTitle>
                <p className="text-[10px] text-primary font-bold uppercase tracking-[0.2em] mt-1">{editingSection?.type} LAYER ARCHITECT</p>
              </div>
              <Sparkles className="w-6 h-6 text-accent animate-pulse" />
            </div>
          </DialogHeader>
          {editingSection && (
            <div className="p-8 space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest ml-1">Section Protocol Heading</label>
                <Input 
                  value={editingSection.title} 
                  onChange={(e) => setEditingSection({...editingSection, title: e.target.value})}
                  className="bg-white/5 border-white/10 h-12"
                  placeholder="Infrastructure Core"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest ml-1">Operational Brief / Description</label>
                <Textarea 
                  value={editingSection.description} 
                  onChange={(e) => setEditingSection({...editingSection, description: e.target.value})}
                  className="bg-white/5 border-white/10 min-h-[220px] py-4 resize-none"
                  placeholder="Architect the core strategic messaging for this section..."
                />
              </div>
              <DialogFooter className="pt-4">
                <Button variant="ghost" onClick={() => setEditingSection(null)} className="h-12 rounded-xl">Cancel</Button>
                <Button disabled={savingSection} className="btn-primary h-12 px-10 rounded-xl font-bold" onClick={() => handleUpdateSection(editingSection)}>
                  {savingSection ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Save className="w-4 h-4 mr-2" />}
                  Deploy Architecture
                </Button>
              </DialogFooter>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
