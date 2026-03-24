
"use client"

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Menu, X, Globe, ChevronDown, ChevronRight, Mail, Search } from "lucide-react";
import { useState, useEffect } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

const newsItems = [
  { name: 'Company Updates', href: '/news/updates', desc: 'Press releases & official announcements' },
  { name: 'Global Trade Insights', href: '/news/insights', desc: 'Research & industry trends' },
  { name: 'Technology & AI', href: '/news/tech', desc: 'Platform updates & AI scoring' },
  { name: 'Finance & Compliance', href: '/news/finance', desc: 'Trade finance & compliance news' },
  { name: 'Sustainability & ESG', href: '/news/sustainability', desc: 'Green initiatives & ESG reports' },
  { name: 'Community & Partnerships', href: '/news/community', desc: 'Collaborations & network updates' },
  { name: 'International Markets', href: '/news/markets', desc: 'Global expansion & trade routes' },
  { name: 'Featured Reports', href: '/news/reports', desc: 'Major project highlights' },
];

const aboutItems = [
  { name: 'What We Do', href: '/company', desc: 'Baalvion ecosystem & platform layers' },
  { name: 'Working at Baalvion', href: '/careers', desc: 'Careers, team stories, & culture' },
  { name: 'Leadership & Founders', href: '/leadership', desc: 'Vision, timeline, & leadership' },
  { name: 'Investor Letters', href: '/investors', desc: 'Shareholder updates & reports' },
  { name: 'Platform Reports', href: '/reports', desc: 'Execution metrics & system updates' },
];

const mainLinks = [
  { name: 'Platform', href: '/platform' },
  { name: 'Ecosystem', href: '/ecosystem' },
  { name: 'Projects', href: '/projects' },
  { name: 'Trust', href: '/trust' },
];

export function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <nav className={cn(
      "fixed top-0 w-full z-50 transition-all duration-300",
      scrolled 
        ? "bg-white/98 backdrop-blur-md border-b border-gray-100 h-16 shadow-sm" 
        : "bg-white h-20 border-b border-transparent"
    )}>
      <div className="section-container h-full flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group shrink-0">
          <div className="w-9 h-9 bg-primary flex items-center justify-center rounded-sm transition-transform group-hover:scale-105">
            <Globe className="text-white w-5 h-5" />
          </div>
          <span className="text-xl font-bold tracking-tight text-gray-900 leading-none">BAALVION</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-1">
          {/* News Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger className="px-4 py-2 text-sm font-semibold text-gray-700 hover:text-primary hover:bg-gray-50 rounded-sm transition-all flex items-center gap-1 outline-none group">
              News & Insights
              <ChevronDown className="w-3.5 h-3.5 opacity-50 group-data-[state=open]:rotate-180 transition-transform" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-80 p-2 bg-white border-gray-100 shadow-xl rounded-md animate-in fade-in zoom-in-95">
              <div className="p-3 mb-2 bg-gray-50/50 rounded-sm">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Global Intelligence</p>
              </div>
              <div className="grid grid-cols-1 gap-1">
                {newsItems.map((item) => (
                  <DropdownMenuItem key={item.href} asChild className="p-0 focus:bg-transparent">
                    <Link href={item.href} className="flex flex-col p-3 rounded-sm hover:bg-gray-50 group transition-colors">
                      <span className="text-sm font-bold text-gray-900 group-hover:text-primary transition-colors">{item.name}</span>
                      <span className="text-[10px] text-gray-500 line-clamp-1">{item.desc}</span>
                    </Link>
                  </DropdownMenuItem>
                ))}
              </div>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* About Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger className="px-4 py-2 text-sm font-semibold text-gray-700 hover:text-primary hover:bg-gray-50 rounded-sm transition-all flex items-center gap-1 outline-none group">
              About & Company
              <ChevronDown className="w-3.5 h-3.5 opacity-50 group-data-[state=open]:rotate-180 transition-transform" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-80 p-2 bg-white border-gray-100 shadow-xl rounded-md animate-in fade-in zoom-in-95">
              <div className="p-3 mb-2 bg-gray-50/50 rounded-sm">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Corporate Nexus</p>
              </div>
              <div className="grid grid-cols-1 gap-1">
                {aboutItems.map((item) => (
                  <DropdownMenuItem key={item.href} asChild className="p-0 focus:bg-transparent">
                    <Link href={item.href} className="flex flex-col p-3 rounded-sm hover:bg-gray-50 group transition-colors">
                      <span className="text-sm font-bold text-gray-900 group-hover:text-primary transition-colors">{item.name}</span>
                      <span className="text-[10px] text-gray-500 line-clamp-1">{item.desc}</span>
                    </Link>
                  </DropdownMenuItem>
                ))}
              </div>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Regular Links */}
          {mainLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "px-4 py-2 text-sm font-semibold transition-all rounded-sm",
                pathname === link.href 
                  ? "text-primary bg-primary/5" 
                  : "text-gray-700 hover:text-primary hover:bg-gray-50"
              )}
            >
              {link.name}
            </Link>
          ))}
          
          {/* Subscribe and Search */}
          <div className="flex items-center gap-6 ml-4 mr-4">
            <Link href="#" className="flex items-center gap-1.5 text-sm font-semibold text-gray-900 hover:text-primary group transition-colors">
              Subscribe <Mail className="w-4 h-4 text-gray-400 group-hover:text-primary transition-colors" />
            </Link>
            <div className="relative group">
              <input 
                type="text" 
                placeholder="Search Baalvion News" 
                className="h-9 w-48 xl:w-56 pl-5 pr-10 rounded-full border border-gray-300 bg-gray-50/50 text-[13px] focus:outline-none focus:ring-1 focus:ring-primary focus:bg-white transition-all placeholder:text-gray-500"
              />
              <Search className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-900 cursor-pointer hover:text-primary transition-colors" />
            </div>
          </div>

          <Button asChild className="h-10 px-6 btn-primary rounded-sm font-bold">
            <Link href="/contact">Initiate Nexus</Link>
          </Button>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="lg:hidden text-gray-900 p-2 rounded-md hover:bg-gray-50" 
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={cn(
        "lg:hidden fixed inset-0 top-0 left-0 w-full h-screen bg-white z-[60] py-24 px-6 flex flex-col gap-4 transition-transform duration-500 ease-in-out",
        isOpen ? "translate-x-0" : "translate-x-full"
      )}>
        <button 
          className="absolute top-6 right-6 text-gray-900 p-2 rounded-md" 
          onClick={() => setIsOpen(false)}
        >
          <X className="w-8 h-8" />
        </button>
        
        <div className="flex flex-col gap-2 overflow-y-auto pb-12">
          {/* Mobile Search */}
          <div className="px-4 mb-6">
            <div className="relative">
              <input 
                type="text" 
                placeholder="Search News" 
                className="h-12 w-full pl-5 pr-12 rounded-full border border-gray-200 bg-gray-50 text-sm focus:outline-none"
              />
              <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            </div>
          </div>

          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.3em] px-4 mb-2">Navigation</p>
          
          <div className="space-y-1">
            <p className="px-4 py-2 text-xs font-bold text-primary uppercase tracking-widest">News & Insights</p>
            {newsItems.map(item => (
              <Link key={item.href} href={item.href} className="flex items-center justify-between p-4 text-gray-900 font-bold hover:bg-gray-50 rounded-lg">
                {item.name} <ChevronRight className="w-4 h-4 text-primary" />
              </Link>
            ))}
          </div>

          <DropdownMenuSeparator className="bg-gray-100 my-2 mx-4" />

          <div className="space-y-1">
            <p className="px-4 py-2 text-xs font-bold text-primary uppercase tracking-widest">About & Company</p>
            {aboutItems.map(item => (
              <Link key={item.href} href={item.href} className="flex items-center justify-between p-4 text-gray-900 font-bold hover:bg-gray-50 rounded-lg">
                {item.name} <ChevronRight className="w-4 h-4 text-primary" />
              </Link>
            ))}
          </div>

          <DropdownMenuSeparator className="bg-gray-100 my-2 mx-4" />

          {mainLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-xl font-bold p-4 rounded-lg flex justify-between items-center transition-all",
                pathname === link.href 
                  ? "text-primary bg-primary/5" 
                  : "text-gray-900 hover:bg-gray-50"
              )}
            >
              {link.name}
              <ChevronRight className="w-5 h-5 text-primary" />
            </Link>
          ))}
        </div>
        <Button asChild className="mt-auto h-14 btn-primary rounded-sm text-lg font-bold" onClick={() => setIsOpen(false)}>
          <Link href="/contact">Initiate Nexus Link</Link>
        </Button>
      </div>
    </nav>
  );
}
