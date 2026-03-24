"use client"

import { useEffect, useState } from "react";
import { Project, ProjectStatus } from "@/lib/db";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DraftTool } from "@/components/admin/draft-tool";
import { Plus, Trash2, Pencil, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const categories = [
  "Core Platform Projects",
  "Industrial Projects",
  "Intelligence Platforms",
  "Governance",
  "Commerce",
  "Future Projects"
];

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
      'Authorization': `Bearer ${token}`
    };
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const isNew = !editing?.id;
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
      toast({ title: "Success", description: "Project saved successfully." });
    } catch (err) {
      toast({ title: "Error", description: "Operation denied. Check credentials.", variant: "destructive" });
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure?')) return;
    try {
      const res = await fetch(`/api/projects?id=${id}`, { 
        method: 'DELETE',
        headers: getAdminHeaders()
      });
      
      if (!res.ok) throw new Error('Authorization failed');
      
      setProjects(projects.filter(p => p.id !== id));
      toast({ title: "Deleted", description: "Project removed." });
    } catch (err) {
      toast({ title: "Error", description: "Operation denied.", variant: "destructive" });
    }
  };

  return (
    <div className="space-y-12">
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-white">Manage Projects</h2>
            <Button onClick={() => setEditing({ name: '', description: '', category: categories[0], status: 'Active' })} className="btn-primary">
              <Plus className="w-4 h-4 mr-2" /> New Project
            </Button>
          </div>

          <div className="space-y-4">
            {loading ? <Loader2 className="animate-spin text-primary mx-auto" /> : projects.map(project => (
              <Card key={project.id} className="glass-card">
                <CardContent className="p-6 flex items-center justify-between">
                  <div className="space-y-1">
                    <h3 className="font-bold text-white">{project.name}</h3>
                    <p className="text-xs text-muted-foreground uppercase">{project.category} • {project.status}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button size="icon" variant="ghost" onClick={() => setEditing(project)} className="hover:bg-accent/20 hover:text-accent">
                      <Pencil className="w-4 h-4" />
                    </Button>
                    <Button size="icon" variant="ghost" onClick={() => handleDelete(project.id)} className="hover:bg-destructive/20 hover:text-destructive">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <DraftTool />
          
          {editing && (
            <Card className="glass-card sticky top-28">
              <CardHeader>
                <CardTitle className="text-white">{editing.id ? 'Edit' : 'Create'} Project</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSave} className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-muted-foreground uppercase">Project Name</label>
                    <Input 
                      required
                      value={editing.name} 
                      onChange={(e) => setEditing({ ...editing, name: e.target.value })} 
                      className="bg-white/5 border-white/10"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-muted-foreground uppercase">Description</label>
                    <Textarea 
                      required
                      value={editing.description} 
                      onChange={(e) => setEditing({ ...editing, description: e.target.value })} 
                      className="bg-white/5 border-white/10"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-xs font-semibold text-muted-foreground uppercase">Category</label>
                      <Select value={editing.category} onValueChange={(val) => setEditing({ ...editing, category: val })}>
                        <SelectTrigger className="bg-white/5 border-white/10">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-semibold text-muted-foreground uppercase">Status</label>
                      <Select value={editing.status} onValueChange={(val) => setEditing({ ...editing, status: val as ProjectStatus })}>
                        <SelectTrigger className="bg-white/5 border-white/10">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Active">Active</SelectItem>
                          <SelectItem value="In Development">In Development</SelectItem>
                          <SelectItem value="Planned">Planned</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="flex gap-2 pt-4">
                    <Button type="button" variant="ghost" onClick={() => setEditing(null)} className="flex-1">Cancel</Button>
                    <Button type="submit" className="flex-1 btn-primary">Save Changes</Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
