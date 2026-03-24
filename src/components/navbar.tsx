"use client"

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Menu, X, Globe } from "lucide-react";
import { useState } from "react";

const navLinks = [
  { name: 'Company', href: '/company' },
  { name: 'Platform', href: '/platform' },
  { name: 'Ecosystem', href: '/ecosystem' },
  { name: 'Projects', href: '/projects' },
  { name: 'How It Works', href: '/how-it-works' },
  { name: 'Trust', href: '/trust' },
  { name: 'Partners', href: '/partners' },
  { name: 'Careers', href: '/careers' },
  { name: 'Contact', href: '/contact' },
];

export function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full z-50 border-b border-white/5 bg-background/80 backdrop-blur-xl">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 bg-primary flex items-center justify-center rounded-xl shadow-lg shadow-primary/20">
            <Globe className="text-white w-6 h-6" />
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-bold tracking-tight text-white leading-none">BAALVION</span>
            <span className="text-[10px] font-semibold text-accent tracking-[0.2em] uppercase mt-0.5">Nexus Industries</span>
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
          <Button asChild className="ml-4 btn-primary">
            <Link href="/contact">Get Started</Link>
          </Button>
        </div>

        {/* Mobile Toggle */}
        <button className="lg:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden absolute top-20 left-0 w-full bg-background border-b border-white/5 py-8 px-4 flex flex-col gap-4 animate-in slide-in-from-top duration-300">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className={cn(
                "text-lg font-medium",
                pathname === link.href ? "text-accent" : "text-white"
              )}
            >
              {link.name}
            </Link>
          ))}
          <Button asChild className="w-full btn-primary" onClick={() => setIsOpen(false)}>
            <Link href="/contact">Get Started</Link>
          </Button>
        </div>
      )}
    </nav>
  );
}
