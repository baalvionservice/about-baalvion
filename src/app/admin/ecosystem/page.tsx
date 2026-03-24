"use client"

import { useEffect, useState } from "react";
import { EcosystemLayer } from "@/lib/db";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Loader2, Pencil, Trash2, Plus, Layers } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

export default function EcosystemAdmin() {
  const [layers, setLayers] = useState<EcosystemLayer[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Partial<EcosystemLayer> | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    fetch('/api/ecosystem').then(res => res.json()).then(data => {
      setLayers(data);
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
    
    try {
      const res = await fetch('/api/ecosystem', {
        method: 'PUT',
        headers: getAdminHeaders(),
        body: JSON.stringify(editing),
      });

      if (!res.ok) throw new Error('Unauthorized');

      toast({ title: "Success", description: "Ecosystem layer saved." });
      setEditing(null);
      fetch('/api/ecosystem').then(res => res.json()).then(setLayers);
    } catch (err) {
      toast({ title: "Error", description: "Action denied. Check credentials.", variant: "destructive" });
    }
  };

  if (loading) return <Loader2 className="animate-spin mx-auto mt-20" />;

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Ecosystem Layers</h2>
        <Button onClick={() => setEditing({ title: '', description: '', icon: 'Database' })} className="btn-primary">
          <Plus className="w-4 h-4 mr-2" /> Add Layer
        </Button>
      </div>

      <Card className="glass-card">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Layer Title</TableHead>
                <TableHead>Description</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {layers.map(layer => (
                <TableRow key={layer.id}>
                  <TableCell className="font-bold text-white">{layer.title}</TableCell>
                  <TableCell className="text-muted-foreground max-w-md truncate">{layer.description}</TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button variant="ghost" size="icon" onClick={() => setEditing(layer)}>
                      <Pencil className="w-4 h-4" />
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
            <DialogTitle className="text-white">{editing?.id ? 'Edit' : 'Add'} Layer</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSave} className="space-y-4 pt-4">
            <div className="space-y-2">
              <label className="text-xs font-bold text-muted-foreground uppercase">Title</label>
              <Input 
                required
                value={editing?.title} 
                onChange={(e) => setEditing({ ...editing!, title: e.target.value })} 
                className="bg-white/5 border-white/10"
              />
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
            <Button type="submit" className="w-full btn-primary">Save Ecosystem Layer</Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
