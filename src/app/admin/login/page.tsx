"use client"

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Globe, Lock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const SECURE_KEY = "secure-admin-key";

export default function LoginPage() {
  const [password, setPassword] = useState("");
  const router = useRouter();
  const { toast } = useToast();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === SECURE_KEY) {
      localStorage.setItem('admin_token', password);
      router.push('/admin');
      toast({ title: "Access Granted", description: "Welcome to Baalvion Nexus Control." });
    } else {
      toast({ 
        title: "Access Denied", 
        description: "Invalid credentials. Strategic link rejected.",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-background">
      <Card className="w-full max-w-md glass-card border-gray-100 shadow-xl bg-white">
        <CardHeader className="text-center space-y-4 pt-10">
          <div className="w-16 h-16 bg-[#FF9900] rounded-2xl flex items-center justify-center mx-auto shadow-lg shadow-[#FF9900]/20">
            <Globe className="text-white w-8 h-8" />
          </div>
          <div className="space-y-1">
            <CardTitle className="text-3xl font-bold text-gray-900 tracking-tight">Nexus Admin</CardTitle>
            <CardDescription className="text-gray-500 font-medium uppercase tracking-widest text-[10px]">Strategic Control Terminal</CardDescription>
          </div>
        </CardHeader>
        <CardContent className="pb-12 px-10">
          <form onSubmit={handleLogin} className="space-y-8">
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Secure Authorization Key</label>
              <div className="relative">
                <Lock className="absolute left-4 top-4 w-4 h-4 text-gray-400" />
                <input 
                  type="password" 
                  className="flex h-14 w-full rounded-xl border border-gray-100 bg-gray-50 px-4 py-2 pl-12 text-sm focus:outline-none focus:ring-1 focus:ring-[#FF9900] transition-all text-gray-900"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>
            <Button type="submit" className="w-full h-14 btn-primary rounded-xl text-lg font-bold">
              Initiate Access
            </Button>
          </form>
          <p className="text-center text-[9px] text-gray-400 font-bold uppercase tracking-[0.3em] mt-10">
            Secured by Baalvion Imperial Governance
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
