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
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <nav className={cn(
      "fixed top-0 w-full z-50 transition-all duration-200",
      scrolled 
        ? "bg-white/95 backdrop-blur-md border-b border-gray-100 h-16 shadow-sm" 
        : "bg-white h-20 border-b border-transparent"
    )}>
      <div className="section-container h-full flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-9 h-9 bg-primary flex items-center justify-center rounded-sm transition-transform group-hover:scale-105">
            <Globe className="text-white w-5 h-5" />
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-bold tracking-tight text-gray-900 leading-none">BAALVION</span>
            <span className="text-[8px] font-bold text-primary tracking-widest uppercase mt-0.5">Nexus Industries</span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-2">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "px-4 py-2 text-sm font-semibold transition-colors rounded-sm",
                pathname === link.href 
                  ? "text-primary bg-primary/5" 
                  : "text-gray-700 hover:text-primary hover:bg-gray-50"
              )}
            >
              {link.name}
            </Link>
          ))}
          <Button asChild className="ml-4 h-9 px-6 btn-primary">
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
        "lg:hidden fixed inset-0 top-0 left-0 w-full h-screen bg-white z-[60] py-24 px-6 flex flex-col gap-4 transition-transform duration-300",
        isOpen ? "translate-x-0" : "translate-x-full"
      )}>
        <button 
          className="absolute top-6 right-6 text-gray-900 p-2 rounded-md" 
          onClick={() => setIsOpen(false)}
        >
          <X className="w-8 h-8" />
        </button>
        
        <div className="flex flex-col gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-xl font-bold p-4 rounded-md flex justify-between items-center transition-all",
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
        <Button asChild className="mt-auto h-14 btn-primary rounded-md text-lg" onClick={() => setIsOpen(false)}>
          <Link href="/contact">Initiate Nexus Link</Link>
        </Button>
      </div>
    </nav>
  );
}