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
  ClipboardList
} from "lucide-react";
import { useState, useEffect } from "react";

const adminLinks = [
  { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { name: 'Updates Log', href: '/admin/updates', icon: ClipboardList },
  { name: 'Pages', href: '/admin/pages', icon: FileText },
  { name: 'Projects', href: '/admin/projects', icon: Briefcase },
  { name: 'Ecosystem', href: '/admin/ecosystem', icon: Layers },
  { name: 'News & Intel', href: '/admin/news', icon: Newspaper },
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
      <aside className="w-64 border-r border-gray-200 bg-white hidden lg:flex flex-col fixed inset-y-0 shadow-sm">
        <div className="p-6">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[#FF9900] flex items-center justify-center rounded-sm">
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
                "flex items-center gap-3 px-4 py-3 rounded-md text-sm font-bold transition-all",
                pathname === link.href 
                  ? "bg-[#FF9900] text-white shadow-md shadow-orange-100" 
                  : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
              )}
            >
              <link.icon className="w-5 h-5" />
              {link.name}
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-gray-100 space-y-1">
          <button className="flex w-full items-center gap-3 px-4 py-3 rounded-md text-sm font-bold text-gray-500 hover:bg-gray-50 hover:text-gray-900">
            <Settings className="w-5 h-5" />
            Settings
          </button>
          <button onClick={handleLogout} className="flex w-full items-center gap-3 px-4 py-3 rounded-md text-sm font-bold text-destructive hover:bg-destructive/5">
            <LogOut className="w-5 h-5" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 lg:ml-64">
        <header className="h-16 border-b border-gray-200 bg-white/80 backdrop-blur-md px-8 flex items-center justify-between sticky top-0 z-40">
          <h1 className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.3em] mb-0">
            {adminLinks.find(l => l.href === pathname)?.name || 'Nexus Admin'}
          </h1>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm font-bold text-gray-900">Administrative Portal</p>
              <p className="text-[10px] text-[#FF9900] font-bold uppercase tracking-wider">Super Administrator</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-orange-50 border border-orange-100 flex items-center justify-center text-[#FF9900] font-bold shadow-sm">B</div>
          </div>
        </header>
        <div className="p-8 max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
