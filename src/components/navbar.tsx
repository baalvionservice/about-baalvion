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

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <nav className={cn(
      "fixed top-0 w-full z-50 transition-all duration-500",
      scrolled 
        ? "bg-background/80 backdrop-blur-2xl border-b border-white/5 h-16" 
        : "bg-transparent h-24"
    )}>
      <div className="container mx-auto px-6 h-full flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 bg-primary flex items-center justify-center rounded-2xl shadow-lg shadow-primary/20 group-hover:rotate-12 transition-all">
            <Globe className="text-white w-6 h-6" />
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-bold tracking-tighter text-white leading-none">BAALVION</span>
            <span className="text-[9px] font-bold text-accent tracking-[0.3em] uppercase mt-1">Nexus Industries</span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-2">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "px-5 py-2 text-sm font-medium transition-all rounded-full",
                pathname === link.href 
                  ? "text-primary bg-primary/5 font-bold" 
                  : "text-muted-foreground hover:text-white hover:bg-white/5"
              )}
            >
              {link.name}
            </Link>
          ))}
          <Button asChild className="ml-6 btn-primary h-10 px-6 rounded-full font-bold">
            <Link href="/contact">Get Started</Link>
          </Button>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="lg:hidden text-white p-2 rounded-xl bg-white/5 border border-white/5" 
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={cn(
        "lg:hidden fixed inset-0 top-0 left-0 w-full h-screen bg-background/98 backdrop-blur-3xl z-[60] py-24 px-8 flex flex-col gap-6 transition-all duration-500",
        isOpen ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
      )}>
        <button 
          className="absolute top-8 right-8 text-white p-2" 
          onClick={() => setIsOpen(false)}
        >
          <X className="w-8 h-8" />
        </button>
        
        <div className="flex flex-col gap-4">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-3xl font-bold p-4 rounded-2xl border border-transparent flex justify-between items-center group",
                pathname === link.href 
                  ? "text-primary bg-primary/10 border-primary/20" 
                  : "text-white hover:bg-white/5"
              )}
            >
              {link.name}
              <ChevronRight className="w-6 h-6 opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all" />
            </Link>
          ))}
        </div>
        <Button asChild className="mt-auto btn-primary h-16 text-xl rounded-2xl shadow-2xl" onClick={() => setIsOpen(false)}>
          <Link href="/contact">Initiate Nexus Link</Link>
        </Button>
      </div>
    </nav>
  );
}
