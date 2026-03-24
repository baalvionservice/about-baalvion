"use client"

import { useEffect, useState } from "react";
import { Page, Section } from "@/lib/db";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Loader2, Pencil, Trash2, Plus, Layout, ArrowRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";

export default function PagesAdmin() {
  const [pages, setPages] = useState<Page[]>([]);
  const [sections, setSections] = useState<Section[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingPage, setEditingPage] = useState<Page | null>(null);
  const [editingSection, setEditingSection] = useState<Section | null>(null);
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

  const handleUpdatePage = async (page: Page) => {
    await fetch('/api/pages', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(page),
    });
    setPages(pages.map(p => p.id === page.id ? page : p));
    setEditingPage(null);
    toast({ title: "Page Updated", description: "The page metadata has been saved." });
  };

  const handleUpdateSection = async (section: Section) => {
    const res = await fetch('/api/sections', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(section),
    });
    const updated = await res.json();
    setSections(sections.map(s => s.id === updated.id ? updated : s));
    setEditingSection(null);
    toast({ title: "Section Updated", description: "The section content has been saved." });
  };

  if (loading) return <Loader2 className="animate-spin mx-auto mt-20" />;

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Pages & Layouts</h2>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Pages List */}
        <Card className="glass-card lg:col-span-1">
          <CardHeader>
            <CardTitle className="text-white text-lg flex items-center gap-2">
              <Layout className="w-4 h-4" /> Site Pages
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {pages.map(page => (
                  <TableRow key={page.id}>
                    <TableCell className="font-medium text-white">{page.title}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="icon" onClick={() => setEditingPage(page)}>
                        <Pencil className="w-4 h-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Section Editor / View */}
        <div className="lg:col-span-2 space-y-6">
          {editingPage ? (
            <Card className="glass-card border-primary/50">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="text-white">Editing: {editingPage.title}</CardTitle>
                  <p className="text-xs text-muted-foreground">Path: /{editingPage.slug}</p>
                </div>
                <Button variant="outline" size="sm" onClick={() => setEditingPage(null)}>Close</Button>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h4 className="text-sm font-bold text-accent uppercase tracking-widest">Page Sections</h4>
                  <div className="grid gap-4">
                    {editingPage.sections.map(sid => {
                      const section = sections.find(s => s.id === sid);
                      if (!section) return null;
                      return (
                        <div key={sid} className="p-4 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between group hover:border-primary/50 transition-all">
                          <div>
                            <p className="font-bold text-white">{section.title}</p>
                            <p className="text-xs text-muted-foreground uppercase">{section.type}</p>
                          </div>
                          <Button size="sm" variant="secondary" onClick={() => setEditingSection(section)}>
                            Edit Content <ArrowRight className="ml-2 w-3 h-3" />
                          </Button>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card className="glass-card h-full flex items-center justify-center border-dashed">
              <div className="text-center p-12">
                <Layout className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-20" />
                <p className="text-muted-foreground">Select a page from the list to edit its structure and content.</p>
              </div>
            </Card>
          )}
        </div>
      </div>

      {/* Section Edit Dialog */}
      <Dialog open={!!editingSection} onOpenChange={() => setEditingSection(null)}>
        <DialogContent className="glass-card border-white/10 max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-white">Edit Section: {editingSection?.title}</DialogTitle>
          </DialogHeader>
          {editingSection && (
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <label className="text-xs font-bold text-muted-foreground uppercase">Section Title</label>
                <Input 
                  value={editingSection.title} 
                  onChange={(e) => setEditingSection({...editingSection, title: e.target.value})}
                  className="bg-white/5 border-white/10"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-muted-foreground uppercase">Description / Content</label>
                <Textarea 
                  value={editingSection.description} 
                  onChange={(e) => setEditingSection({...editingSection, description: e.target.value})}
                  className="bg-white/5 border-white/10 min-h-[150px]"
                />
              </div>
              <Button className="w-full btn-primary" onClick={() => handleUpdateSection(editingSection)}>
                Save Section Changes
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
