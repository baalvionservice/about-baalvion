"use client"

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Menu, X, Globe, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";

const navLinks = [
  { name: 'Company', href: '/company' },
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
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <nav className={cn(
      "fixed top-0 w-full z-50 transition-all duration-700 ease-in-out",
      scrolled 
        ? "bg-background/80 backdrop-blur-3xl border-b border-white/5 h-20" 
        : "bg-transparent h-28"
    )}>
      <div className="section-container h-full flex items-center justify-between">
        <Link href="/" className="flex items-center gap-4 group">
          <div className="w-12 h-12 bg-primary flex items-center justify-center rounded-[1rem] shadow-xl shadow-primary/20 group-hover:rotate-12 transition-all duration-500 ease-out">
            <Globe className="text-white w-7 h-7" />
          </div>
          <div className="flex flex-col">
            <span className="text-2xl font-bold tracking-tighter text-white leading-none">BAALVION</span>
            <span className="text-[10px] font-bold text-accent tracking-[0.4em] uppercase mt-1.5">Nexus Industries</span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-2">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "px-6 py-2.5 text-sm font-medium transition-all duration-300 rounded-full tracking-wide relative group",
                pathname === link.href 
                  ? "text-primary bg-primary/10 font-bold" 
                  : "text-muted-foreground hover:text-white hover:bg-white/5"
              )}
            >
              {link.name}
              {pathname !== link.href && (
                <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-4" />
              )}
            </Link>
          ))}
          <Button asChild className="ml-8 h-12 px-8 font-bold text-sm tracking-wide">
            <Link href="/contact">Initiate Nexus</Link>
          </Button>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="lg:hidden text-white p-3 rounded-2xl bg-white/5 border border-white/5 transition-all active:scale-95 hover:bg-white/10" 
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={cn(
        "lg:hidden fixed inset-0 top-0 left-0 w-full h-screen bg-background/98 backdrop-blur-3xl z-[60] py-32 px-8 flex flex-col gap-8 transition-all duration-700 cubic-bezier(0.16, 1, 0.3, 1)",
        isOpen ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
      )}>
        <button 
          className="absolute top-10 right-10 text-white p-2 hover:bg-white/5 rounded-full transition-colors" 
          onClick={() => setIsOpen(false)}
        >
          <X className="w-10 h-10" />
        </button>
        
        <div className="flex flex-col gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-4xl font-bold p-6 rounded-3xl border border-transparent flex justify-between items-center group transition-all duration-500",
                pathname === link.href 
                  ? "text-primary bg-primary/10 border-primary/20" 
                  : "text-white hover:bg-white/5"
              )}
            >
              {link.name}
              <ChevronRight className="w-8 h-8 opacity-0 group-hover:opacity-100 -translate-x-6 group-hover:translate-x-0 transition-all duration-500" />
            </Link>
          ))}
        </div>
        <Button asChild className="mt-auto h-20 text-xl font-bold rounded-[2rem] shadow-2xl" onClick={() => setIsOpen(false)}>
          <Link href="/contact">Initiate Nexus Link</Link>
        </Button>
      </div>
    </nav>
  );
}
