"use client"

import { useEffect, useState } from "react";
import { Inquiry } from "@/lib/db";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Loader2, Mail, CheckCircle, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

export default function AdminInquiries() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetch('/api/inquiry').then(res => res.json()).then(data => {
      setInquiries(data);
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

  const updateStatus = async (id: string, status: Inquiry['status']) => {
    try {
      const res = await fetch('/api/inquiry', {
        method: 'PATCH',
        headers: getAdminHeaders(),
        body: JSON.stringify({ id, status }),
      });
      if (!res.ok) throw new Error('Unauthorized');
      setInquiries(inquiries.map(i => i.id === id ? { ...i, status } : i));
      toast({ title: "Success", description: `Status updated to ${status}.` });
    } catch (err) {
      toast({ title: "Error", description: "Operation denied.", variant: "destructive" });
    }
  };

  if (loading) return <Loader2 className="animate-spin mx-auto mt-20" />;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold text-white">Visitor Inquiries</h2>
      </div>

      <div className="grid gap-4">
        {inquiries.length === 0 ? (
          <Card className="glass-card text-center p-20">
            <Mail className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">No inquiries found in the system.</p>
          </Card>
        ) : inquiries.slice().reverse().map(inquiry => (
          <Card key={inquiry.id} className="glass-card overflow-hidden">
            <div className="flex flex-col md:flex-row">
              <div className="p-6 flex-1 space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-bold text-white">{inquiry.name}</h3>
                    <p className="text-sm text-accent">{inquiry.email}</p>
                  </div>
                  <Badge variant={inquiry.status === 'New' ? 'default' : 'secondary'}>
                    {inquiry.status}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed italic border-l-2 border-primary/20 pl-4">
                  "{inquiry.message}"
                </p>
                <div className="flex items-center gap-2 text-[10px] text-muted-foreground uppercase tracking-widest">
                  <Clock className="w-3 h-3" />
                  Received: {new Date(inquiry.date).toLocaleString()}
                </div>
              </div>
              <div className="bg-white/5 p-4 flex md:flex-col justify-end gap-2 border-t md:border-t-0 md:border-l border-white/5">
                {inquiry.status === 'New' && (
                  <Button size="sm" onClick={() => updateStatus(inquiry.id, 'Read')} variant="ghost" className="text-accent hover:bg-accent/10">
                    <CheckCircle className="w-4 h-4 mr-2" /> Mark as Read
                  </Button>
                )}
                {inquiry.status !== 'Archived' && (
                  <Button size="sm" onClick={() => updateStatus(inquiry.id, 'Archived')} variant="ghost" className="text-destructive hover:bg-destructive/10">
                    Archive
                  </Button>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
