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
      "fixed top-0 w-full z-50 transition-all duration-300 ease-in-out",
      scrolled 
        ? "bg-white/95 backdrop-blur-md border-b border-gray-100 h-16 shadow-sm" 
        : "bg-transparent h-20"
    )}>
      <div className="section-container h-full flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 bg-primary flex items-center justify-center rounded-md shadow-sm transition-transform group-hover:scale-105">
            <Globe className="text-white w-6 h-6" />
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-bold tracking-tight text-gray-900 leading-none">BAALVION</span>
            <span className="text-[8px] font-bold text-primary tracking-widest uppercase mt-1">Nexus Industries</span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "px-5 py-2 text-sm font-semibold transition-all duration-200 rounded-md relative group",
                pathname === link.href 
                  ? "text-primary bg-primary/5" 
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
              )}
            >
              {link.name}
            </Link>
          ))}
          <Button asChild className="ml-4 h-10 px-6 btn-primary rounded-md text-sm">
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
        "lg:hidden fixed inset-0 top-0 left-0 w-full h-screen bg-white z-[60] py-24 px-6 flex flex-col gap-6 transition-transform duration-500",
        isOpen ? "translate-x-0" : "translate-x-full"
      )}>
        <button 
          className="absolute top-6 right-6 text-gray-900 p-2 rounded-md hover:bg-gray-50" 
          onClick={() => setIsOpen(false)}
        >
          <X className="w-8 h-8" />
        </button>
        
        <div className="flex flex-col gap-2">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-2xl font-bold p-4 rounded-xl flex justify-between items-center transition-all",
                pathname === link.href 
                  ? "text-primary bg-primary/5" 
                  : "text-gray-900 hover:bg-gray-50"
              )}
            >
              {link.name}
              <ChevronRight className="w-6 h-6 text-primary" />
            </Link>
          ))}
        </div>
        <Button asChild className="mt-auto h-14 btn-primary rounded-xl text-lg" onClick={() => setIsOpen(false)}>
          <Link href="/contact">Initiate Nexus Link</Link>
        </Button>
      </div>
    </nav>
  );
}
