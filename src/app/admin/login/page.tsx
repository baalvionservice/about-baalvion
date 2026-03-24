"use client"

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Globe, Lock } from "lucide-react";

export default function LoginPage() {
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple mock auth for demonstration
    if (password === "admin123") {
      localStorage.setItem('admin_auth', 'true');
      router.push('/admin');
    } else {
      alert("Invalid password (try admin123)");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-background">
      <Card className="w-full max-w-md glass-card">
        <CardHeader className="text-center">
          <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center mx-auto mb-4">
            <Globe className="text-white w-6 h-6" />
          </div>
          <CardTitle className="text-2xl font-bold text-white">Nexus Admin</CardTitle>
          <CardDescription>Enter credentials to access Baalvion CMS</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground">Admin Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                <Input 
                  type="password" 
                  className="pl-10 bg-white/5 border-white/10"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                />
              </div>
            </div>
            <Button type="submit" className="w-full btn-primary">Login to Dashboard</Button>
          </form>
          <p className="text-center text-xs text-muted-foreground mt-8">
            Secured by Baalvion Imperial Governance Systems
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
