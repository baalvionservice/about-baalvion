"use client"

import { useEffect, useState } from "react";
import { EcosystemItem } from "@/lib/db";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Loader2, Pencil, Trash2, Plus, Database } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

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
      'Authorization': `Bearer admin123`
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

      toast({ title: "Success", description: "Ecosystem item saved." });
      setEditing(null);
      fetch('/api/ecosystem').then(res => res.json()).then(setItems);
    } catch (err) {
      toast({ title: "Error", description: "Operation denied.", variant: "destructive" });
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure?')) return;
    try {
      const res = await fetch(`/api/ecosystem?id=${id}`, { 
        method: 'DELETE',
        headers: getAdminHeaders()
      });
      if (!res.ok) throw new Error('Unauthorized');
      setItems(items.filter(i => i.id !== id));
      toast({ title: "Deleted", description: "Item removed." });
    } catch (err) {
      toast({ title: "Error", description: "Delete failed.", variant: "destructive" });
    }
  };

  if (loading) return <Loader2 className="animate-spin mx-auto mt-20" />;

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Ecosystem Layers</h2>
        <Button onClick={() => setEditing({ layer: 'Infrastructure', name: '', description: '', domain: '' })} className="btn-primary">
          <Plus className="w-4 h-4 mr-2" /> Add Layer Item
        </Button>
      </div>

      <Card className="glass-card">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Layer</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Domain</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {items.map(item => (
                <TableRow key={item.id}>
                  <TableCell className="font-bold text-primary uppercase text-[10px] tracking-widest">{item.layer}</TableCell>
                  <TableCell className="font-medium text-white">{item.name}</TableCell>
                  <TableCell className="text-muted-foreground text-xs font-mono">{item.domain || '-'}</TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button variant="ghost" size="icon" onClick={() => setEditing(item)}>
                      <Pencil className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => handleDelete(item.id)} className="text-destructive">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </TableCell>
                </TableRow>
                ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={!!editing} onOpenChange={() => setEditing(null)}>
        <DialogContent className="glass-card border-white/10">
          <DialogHeader>
            <DialogTitle className="text-white">{editing?.id ? 'Edit' : 'Add'} Ecosystem Item</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSave} className="space-y-4 pt-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-bold text-muted-foreground uppercase">Layer Type</label>
                <Input 
                  required
                  value={editing?.layer} 
                  onChange={(e) => setEditing({ ...editing!, layer: e.target.value })} 
                  className="bg-white/5 border-white/10"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-muted-foreground uppercase">Item Name</label>
                <Input 
                  required
                  value={editing?.name} 
                  onChange={(e) => setEditing({ ...editing!, name: e.target.value })} 
                  className="bg-white/5 border-white/10"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-muted-foreground uppercase">Description</label>
              <Textarea 
                required
                value={editing?.description} 
                onChange={(e) => setEditing({ ...editing!, description: e.target.value })} 
                className="bg-white/5 border-white/10"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-muted-foreground uppercase">Domain</label>
              <Input 
                value={editing?.domain} 
                onChange={(e) => setEditing({ ...editing!, domain: e.target.value })} 
                className="bg-white/5 border-white/10"
                placeholder="domain.baalvion.nexus"
              />
            </div>
            <Button type="submit" className="w-full btn-primary">Save Ecosystem Item</Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}