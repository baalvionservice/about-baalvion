"use client"

import { useEffect, useState } from "react";
import { Project, ProjectStatus } from "@/lib/db";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Plus, Trash2, Pencil, Loader2, Globe, LayoutGrid, CheckCircle2, Clock, Calendar } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

const categories = ["Core", "Industrial", "Internal", "Governance", "Commerce"];
const statuses: ProjectStatus[] = ["Active", "In Development", "Planned"];

export default function AdminProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Partial<Project> | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    fetch('/api/projects').then(res => res.json()).then(data => {
      setProjects(data);
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

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editing) return;
    const isNew = !editing.id;
    const method = isNew ? 'POST' : 'PUT';
    
    try {
      const res = await fetch('/api/projects', {
        method,
        headers: getAdminHeaders(),
        body: JSON.stringify(editing),
      });
      
      if (!res.ok) throw new Error('Authorization failed');
      
      const updated = await res.json();
      
      if (isNew) {
        setProjects([...projects, updated]);
      } else {
        setProjects(projects.map(p => p.id === updated.id ? updated : p));
      }
      
      setEditing(null);
      toast({ title: "Success", description: `Project ${isNew ? 'created' : 'updated'} successfully.` });
    } catch (err) {
      toast({ title: "Error", description: "Operation denied. Check credentials.", variant: "destructive" });
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Permanently delete this strategic project?')) return;
    try {
      const res = await fetch(`/api/projects?id=${id}`, { 
        method: 'DELETE',
        headers: getAdminHeaders()
      });
      
      if (!res.ok) throw new Error('Authorization failed');
      
      setProjects(projects.filter(p => p.id !== id));
      toast({ title: "Project Removed", description: "The project has been purged from the nexus." });
    } catch (err) {
      toast({ title: "Error", description: "Purge protocol failed.", variant: "destructive" });
    }
  };

  const getStatusIcon = (status: string) => {
    switch(status) {
      case 'Active': return <CheckCircle2 className="w-3 h-3 text-emerald-500" />;
      case 'In Development': return <Clock className="w-3 h-3 text-amber-500" />;
      case 'Planned': return <Calendar className="w-3 h-3 text-blue-500" />;
      default: return null;
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-white tracking-tight">Project Initiatives</h2>
          <p className="text-sm text-muted-foreground">Manage the Baalvion Nexus strategic portfolio portfolio.</p>
        </div>
        <Button onClick={() => setEditing({ name: '', description: '', category: categories[0], type: 'Platform', status: 'Active' })} className="btn-primary rounded-xl h-12 px-6">
          <Plus className="w-4 h-4 mr-2" /> New Initiative
        </Button>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-24 gap-4">
          <Loader2 className="animate-spin text-primary w-10 h-10" />
          <p className="text-muted-foreground text-sm font-medium">Syncing Portfolio...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {projects.map(project => (
            <Card key={project.id} className="glass-card border-white/5 hover:border-primary/20 transition-all group overflow-hidden">
              <div className="absolute top-0 left-0 w-1 h-full bg-primary/20 group-hover:bg-primary transition-colors" />
              <CardHeader className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="w-10 h-10 bg-white/5 rounded-lg flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                    <LayoutGrid className="w-5 h-5 text-accent" />
                  </div>
                  <div className="flex gap-1">
                    <Button size="icon" variant="ghost" onClick={() => setEditing(project)} className="w-8 h-8 hover:bg-white/10 rounded-lg">
                      <Pencil className="w-3.5 h-3.5" />
                    </Button>
                    <Button size="icon" variant="ghost" onClick={() => handleDelete(project.id)} className="w-8 h-8 hover:bg-destructive/10 text-destructive rounded-lg">
                      <Trash2 className="w-3.5 h-3.5" />
                    </Button>
                  </div>
                </div>
                <CardTitle className="text-lg font-bold text-white group-hover:text-primary transition-colors">{project.name}</CardTitle>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-[10px] font-bold text-accent uppercase tracking-widest">{project.category}</span>
                  <span className="text-muted-foreground text-xs">•</span>
                  <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">{project.type}</span>
                </div>
              </CardHeader>
              <CardContent className="p-6 pt-0 space-y-4">
                <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
                  {project.description}
                </p>
                <div className="flex items-center justify-between pt-4 border-t border-white/5">
                  <div className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-white/5 border border-white/5">
                    {getStatusIcon(project.status)}
                    <span className="text-[9px] font-bold text-white uppercase">{project.status}</span>
                  </div>
                  {project.domain && (
                    <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground">
                      <Globe className="w-3 h-3" />
                      {project.subdomain ? `${project.subdomain}.${project.domain}` : project.domain}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <Dialog open={!!editing} onOpenChange={() => setEditing(null)}>
        <DialogContent className="glass-card border-white/10 max-w-xl p-0 overflow-hidden">
          <DialogHeader className="p-8 border-b border-white/5">
            <DialogTitle className="text-xl font-bold text-white">{editing?.id ? 'Modify Initiative' : 'New Strategic Briefing'}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSave} className="p-8 space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Project Name</label>
                <Input 
                  required
                  value={editing?.name || ''} 
                  onChange={(e) => setEditing({ ...editing!, name: e.target.value })} 
                  className="bg-white/5 border-white/10 h-12"
                  placeholder="e.g. Nexus Core"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Type</label>
                <Input 
                  required
                  value={editing?.type || ''} 
                  onChange={(e) => setEditing({ ...editing!, type: e.target.value })} 
                  className="bg-white/5 border-white/10 h-12"
                  placeholder="e.g. AI Engine"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Project Description</label>
              <Textarea 
                required
                value={editing?.description || ''} 
                onChange={(e) => setEditing({ ...editing!, description: e.target.value })} 
                className="bg-white/5 border-white/10 min-h-[100px] py-4"
                placeholder="Strategic objectives and technical scope..."
              />
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Category</label>
                <Select value={editing?.category} onValueChange={(val) => setEditing({ ...editing!, category: val })}>
                  <SelectTrigger className="bg-white/5 border-white/10 h-12">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Status</label>
                <Select value={editing?.status} onValueChange={(val) => setEditing({ ...editing!, status: val as ProjectStatus })}>
                  <SelectTrigger className="bg-white/5 border-white/10 h-12">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {statuses.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Domain (Optional)</label>
                <Input 
                  value={editing?.domain || ''} 
                  onChange={(e) => setEditing({ ...editing!, domain: e.target.value })} 
                  className="bg-white/5 border-white/10 h-12"
                  placeholder="baalvion.nexus"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Subdomain (Optional)</label>
                <Input 
                  value={editing?.subdomain || ''} 
                  onChange={(e) => setEditing({ ...editing!, subdomain: e.target.value })} 
                  className="bg-white/5 border-white/10 h-12"
                  placeholder="intel"
                />
              </div>
            </div>

            <DialogFooter className="pt-6">
              <Button type="button" variant="ghost" onClick={() => setEditing(null)} className="h-12 px-6 rounded-xl">Cancel</Button>
              <Button type="submit" className="btn-primary h-12 px-8 rounded-xl font-bold">
                {editing?.id ? 'Update Project' : 'Launch Initiative'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
