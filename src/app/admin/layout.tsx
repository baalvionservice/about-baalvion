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
  Settings,
  Newspaper,
  ClipboardList,
  BarChart3,
  Users,
  Megaphone,
  ShieldCheck,
  Cpu
} from "lucide-react";
import { useState, useEffect } from "react";

const adminLinks = [
  { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { name: 'Analytics', href: '/admin/analytics', icon: BarChart3 },
  { name: 'Updates Log', href: '/admin/updates', icon: ClipboardList },
  { name: 'Pages', href: '/admin/pages', icon: FileText },
  { name: 'Projects', href: '/admin/projects', icon: Briefcase },
  { name: 'Ecosystem', href: '/admin/ecosystem', icon: Layers },
  { name: 'Management', href: '/admin/management', icon: Users },
  { name: 'Engagement', href: '/admin/engagement', icon: Megaphone },
  { name: 'Governance', href: '/admin/governance', icon: ShieldCheck },
  { name: 'News & Intel', href: '/admin/news', icon: Newspaper },
  { name: 'Technical', href: '/admin/technical', icon: Cpu },
  { name: 'Inquiries', href: '/admin/inquiries', icon: MessageSquare },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('admin_token');
    if (token === 'secure-admin-key' || pathname === '/admin/login') {
      setIsAuthenticated(true);
    } else {
      router.push('/admin/login');
    }
  }, [pathname, router]);

  if (!isAuthenticated && pathname !== '/admin/login') return null;
  if (pathname === '/admin/login') return children;

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    router.push('/admin/login');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside 
        className="w-64 border-r border-gray-200 bg-white hidden lg:flex flex-col fixed inset-y-0 shadow-sm overflow-y-auto custom-scrollbar transition-all duration-300"
        aria-label="Admin Sidebar"
      >
        <div className="p-6 sticky top-0 bg-white z-10">
          <Link href="/" className="flex items-center gap-2 group" aria-label="Back to Public Site">
            <div className="w-8 h-8 bg-[#FF9900] flex items-center justify-center rounded-sm group-hover:scale-105 transition-transform" aria-hidden="true">
              <Globe className="text-white w-5 h-5" />
            </div>
            <span className="text-lg font-bold text-gray-900 tracking-tight text-[11px] uppercase tracking-widest leading-none">BAALVION</span>
          </Link>
        </div>

        <nav className="flex-1 px-4 space-y-1 py-4">
          {adminLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "flex items-center gap-3 px-4 py-2.5 rounded-md text-sm font-bold transition-all",
                pathname === link.href 
                  ? "bg-[#FF9900] text-white shadow-md shadow-orange-100" 
                  : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
              )}
              aria-current={pathname === link.href ? "page" : undefined}
            >
              <link.icon className="w-4 h-4" aria-hidden="true" />
              {link.name}
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-gray-100 space-y-1 sticky bottom-0 bg-white">
          <button className="flex w-full items-center gap-3 px-4 py-2 rounded-md text-xs font-bold text-gray-500 hover:bg-gray-50 hover:text-gray-900 transition-colors" aria-label="Adjust system settings">
            <Settings className="w-4 h-4" aria-hidden="true" />
            System Settings
          </button>
          <button onClick={handleLogout} className="flex w-full items-center gap-3 px-4 py-2 rounded-md text-xs font-bold text-destructive hover:bg-destructive/5 transition-colors" aria-label="Sign out of admin portal">
            <LogOut className="w-4 h-4" aria-hidden="true" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 lg:ml-64 flex flex-col min-h-screen">
        <header className="h-16 border-b border-gray-200 bg-white/80 backdrop-blur-md px-8 flex items-center justify-between sticky top-0 z-40">
          <h1 className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.3em] mb-0" id="admin-module-title">
            {adminLinks.find(l => l.href === pathname)?.name || 'BOS Enterprise Admin'}
          </h1>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-xs font-bold text-gray-900">Super Admin</p>
              <p className="text-[9px] text-[#FF9900] font-bold uppercase tracking-wider">Level 10 Authority</p>
            </div>
            <div className="w-9 h-9 rounded-full bg-orange-50 border border-orange-100 flex items-center justify-center text-[#FF9900] font-bold shadow-sm" aria-hidden="true">B</div>
          </div>
        </header>
        <div className="p-8 max-w-7xl mx-auto w-full flex-1" aria-labelledby="admin-module-title">
          {children}
        </div>
      </main>
    </div>
  );
}
