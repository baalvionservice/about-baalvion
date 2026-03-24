"use client"

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Menu, X, Globe } from "lucide-react";
import { useState, useEffect } from "react";

const navLinks = [
  { name: 'Company', href: '/company' },
  { name: 'Platform', href: '/platform' },
  { name: 'Ecosystem', href: '/ecosystem' },
  { name: 'Projects', href: '/projects' },
  { name: 'Contact', href: '/contact' },
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

  return (
    <nav className={cn(
      "fixed top-0 w-full z-50 transition-all duration-300",
      scrolled ? "bg-background/80 backdrop-blur-xl border-b border-white/5 h-16" : "bg-transparent h-20"
    )}>
      <div className="container mx-auto px-4 h-full flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-9 h-9 bg-primary flex items-center justify-center rounded-xl shadow-lg shadow-primary/20 group-hover:scale-110 transition-transform">
            <Globe className="text-white w-5 h-5" />
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-bold tracking-tight text-white leading-none">BAALVION</span>
            <span className="text-[9px] font-semibold text-accent tracking-[0.2em] uppercase mt-0.5">Nexus Industries</span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "px-4 py-2 text-sm font-medium transition-colors hover:text-accent",
                pathname === link.href ? "text-accent" : "text-muted-foreground"
              )}
            >
              {link.name}
            </Link>
          ))}
          <Button asChild className="ml-4 btn-primary h-9 px-5">
            <Link href="/contact">Get Started</Link>
          </Button>
        </div>

        {/* Mobile Toggle */}
        <button className="lg:hidden text-white p-2" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-background border-b border-white/5 py-8 px-4 flex flex-col gap-4 animate-in slide-in-from-top duration-300">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className={cn(
                "text-lg font-medium px-4 py-2 rounded-lg",
                pathname === link.href ? "bg-primary/10 text-accent" : "text-white"
              )}
            >
              {link.name}
            </Link>
          ))}
          <Button asChild className="w-full btn-primary h-12" onClick={() => setIsOpen(false)}>
            <Link href="/contact">Get Started</Link>
          </Button>
        </div>
      )}
    </nav>
  );
}