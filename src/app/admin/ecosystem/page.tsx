"use client"

import { useEffect, useState } from "react";
import { EcosystemItem } from "@/lib/db";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Loader2, Pencil, Trash2, Plus, Database, Globe, Layers, ArrowRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

export default function EcosystemAdmin() {
  const [items, setItems] = useState<EcosystemItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Partial<EcosystemItem> | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    fetch('/api/ecosystem').then(res => res.json()).then(data => {
      setItems(data);
      setLoading(false);
    });
  }, []);

  const getAdminHeaders = () => {
    const token = localStorage.getItem('admin_token');
    return {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    };
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editing) return;
    const isNew = !editing.id;
    const method = isNew ? 'POST' : 'PUT';
    
    try {
      const res = await fetch('/api/ecosystem', {
        method,
        headers: getAdminHeaders(),
        body: JSON.stringify(editing),
      });

      if (!res.ok) throw new Error('Unauthorized');

      toast({ title: "Success", description: `Layer ${isNew ? 'added' : 'updated'} successfully.` });
      setEditing(null);
      fetch('/api/ecosystem').then(res => res.json()).then(setItems);
    } catch (err) {
      toast({ title: "Error", description: "Action protocol denied.", variant: "destructive" });
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Dismantle this ecosystem layer?')) return;
    try {
      const res = await fetch(`/api/ecosystem?id=${id}`, { 
        method: 'DELETE',
        headers: getAdminHeaders()
      });
      if (!res.ok) throw new Error('Unauthorized');
      setItems(items.filter(i => i.id !== id));
      toast({ title: "Layer Dismantled", description: "Node removed from the nexus ecosystem." });
    } catch (err) {
      toast({ title: "Error", description: "Dismantle protocol failure.", variant: "destructive" });
    }
  };

  if (loading) return (
    <div className="flex flex-col items-center justify-center py-24 gap-4">
      <Loader2 className="animate-spin text-primary w-10 h-10" />
      <p className="text-muted-foreground text-sm font-medium">Syncing Ecosystem Layers...</p>
    </div>
  );

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-white tracking-tight">Ecosystem Registry</h2>
          <p className="text-sm text-muted-foreground">Manage operational layers and infrastructure nodes.</p>
        </div>
        <Button onClick={() => setEditing({ layer: 'Infrastructure', name: '', description: '', domain: '' })} className="btn-primary rounded-xl h-12 px-6">
          <Plus className="w-4 h-4 mr-2" /> Add Registry Item
        </Button>
      </div>

      <Card className="glass-card border-white/5 p-0 overflow-hidden">
        <Table>
          <TableHeader className="bg-white/5">
            <TableRow className="border-white/5 hover:bg-transparent">
              <TableHead className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest pl-8">Layer Protocol</TableHead>
              <TableHead className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Item Designation</TableHead>
              <TableHead className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Nexus Domain</TableHead>
              <TableHead className="text-right pr-8 text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Protocol Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.map(item => (
              <TableRow key={item.id} className="border-white/5 hover:bg-white/5 transition-colors group">
                <TableCell className="pl-8">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
                      <Layers className="w-4 h-4" />
                    </div>
                    <span className="font-bold text-white text-xs uppercase tracking-wider">{item.layer}</span>
                  </div>
                </TableCell>
                <TableCell className="font-medium text-white text-sm">{item.name}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground group-hover:text-accent transition-colors">
                    <Globe className="w-3.5 h-3.5" />
                    {item.domain || 'internal.nexus'}
                  </div>
                </TableCell>
                <TableCell className="text-right pr-8 space-x-1">
                  <Button variant="ghost" size="icon" onClick={() => setEditing(item)} className="w-9 h-9 hover:bg-white/10 rounded-lg">
                    <Pencil className="w-4 h-4 text-muted-foreground" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => handleDelete(item.id)} className="w-9 h-9 hover:bg-destructive/10 text-destructive rounded-lg">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      <Dialog open={!!editing} onOpenChange={() => setEditing(null)}>
        <DialogContent className="glass-card border-white/10 p-0 max-w-lg overflow-hidden">
          <DialogHeader className="p-8 border-b border-white/5">
            <DialogTitle className="text-xl font-bold text-white flex items-center gap-2">
              <Database className="w-5 h-5 text-primary" />
              {editing?.id ? 'Modify Registry' : 'New Ecosystem Node'}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSave} className="p-8 space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Layer Protocol</label>
                <Input 
                  required
                  value={editing?.layer || ''} 
                  onChange={(e) => setEditing({ ...editing!, layer: e.target.value })} 
                  className="bg-white/5 border-white/10 h-12"
                  placeholder="Infrastructure"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Item Name</label>
                <Input 
                  required
                  value={editing?.name || ''} 
                  onChange={(e) => setEditing({ ...editing!, name: e.target.value })} 
                  className="bg-white/5 border-white/10 h-12"
                  placeholder="Nexus Bedrock"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Operational Brief</label>
              <Textarea 
                required
                value={editing?.description || ''} 
                onChange={(e) => setEditing({ ...editing!, description: e.target.value })} 
                className="bg-white/5 border-white/10 min-h-[120px] py-4"
                placeholder="Core functionality and purpose..."
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Primary Domain</label>
              <div className="relative">
                <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input 
                  value={editing?.domain || ''} 
                  onChange={(e) => setEditing({ ...editing!, domain: e.target.value })} 
                  className="bg-white/5 border-white/10 h-12 pl-12"
                  placeholder="node.baalvion.nexus"
                />
              </div>
            </div>
            <DialogFooter className="pt-4">
              <Button type="button" variant="ghost" onClick={() => setEditing(null)} className="h-12 rounded-xl">Cancel</Button>
              <Button type="submit" className="btn-primary h-12 px-8 rounded-xl font-bold">
                Deploy Node
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
