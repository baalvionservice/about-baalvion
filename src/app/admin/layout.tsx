"use client"

import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { 
  LayoutDashboard, 
  FileText, 
  Briefcase, 
  Layers, 
  MessageSquare, 
  LogOut,
  Globe,
  Settings
} from "lucide-react";
import { useState, useEffect } from "react";

const adminLinks = [
  { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { name: 'Page Editor', href: '/admin/pages', icon: FileText },
  { name: 'Projects', href: '/admin/projects', icon: Briefcase },
  { name: 'Ecosystem', href: '/admin/ecosystem', icon: Layers },
  { name: 'Inquiries', href: '/admin/inquiries', icon: MessageSquare },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const auth = localStorage.getItem('admin_auth');
    if (auth === 'true' || pathname === '/admin/login') {
      setIsAuthenticated(true);
    } else {
      router.push('/admin/login');
    }
  }, [pathname, router]);

  if (!isAuthenticated && pathname !== '/admin/login') return null;
  if (pathname === '/admin/login') return children;

  const handleLogout = () => {
    localStorage.removeItem('admin_auth');
    router.push('/admin/login');
  };

  return (
    <div className="min-h-screen bg-[#0F1318] flex">
      {/* Sidebar */}
      <aside className="w-64 border-r border-white/5 bg-[#151B24] hidden lg:flex flex-col fixed inset-y-0">
        <div className="p-6">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary flex items-center justify-center rounded-lg">
              <Globe className="text-white w-5 h-5" />
            </div>
            <span className="text-lg font-bold text-white tracking-tight">Nexus CMS</span>
          </Link>
        </div>

        <nav className="flex-1 px-4 space-y-1 py-4">
          {adminLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all",
                pathname === link.href 
                  ? "bg-primary text-white" 
                  : "text-muted-foreground hover:bg-white/5 hover:text-white"
              )}
            >
              <link.icon className="w-5 h-5" />
              {link.name}
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-white/5 space-y-1">
          <button className="flex w-full items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-muted-foreground hover:bg-white/5 hover:text-white">
            <Settings className="w-5 h-5" />
            Settings
          </button>
          <button onClick={handleLogout} className="flex w-full items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-destructive hover:bg-destructive/10">
            <LogOut className="w-5 h-5" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 lg:ml-64">
        <header className="h-20 border-b border-white/5 bg-[#151B24]/50 backdrop-blur-md px-8 flex items-center justify-between sticky top-0 z-40">
          <h1 className="text-xl font-bold text-white">
            {adminLinks.find(l => l.href === pathname)?.name || 'Admin'}
          </h1>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm font-medium text-white">Admin User</p>
              <p className="text-xs text-muted-foreground">Super Administrator</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">A</div>
          </div>
        </header>
        <div className="p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
