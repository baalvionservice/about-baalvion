import Link from "next/link";
import { Globe, Github, Linkedin, Twitter } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-card border-t border-white/5 pt-20 pb-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="space-y-6">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary flex items-center justify-center rounded-lg">
                <Globe className="text-white w-5 h-5" />
              </div>
              <span className="text-lg font-bold text-white tracking-tight">BAALVION</span>
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Global trade infrastructure connecting businesses, finance, compliance, and intelligence systems into a unified global nexus.
            </p>
            <div className="flex gap-4">
              <Linkedin className="w-5 h-5 text-muted-foreground hover:text-accent cursor-pointer transition-colors" />
              <Twitter className="w-5 h-5 text-muted-foreground hover:text-accent cursor-pointer transition-colors" />
              <Github className="w-5 h-5 text-muted-foreground hover:text-accent cursor-pointer transition-colors" />
            </div>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-6">Platform</h4>
            <ul className="space-y-4 text-sm text-muted-foreground">
              <li><Link href="/platform" className="hover:text-white transition-colors">Trade Engine</Link></li>
              <li><Link href="/ecosystem" className="hover:text-white transition-colors">Ecosystem Layers</Link></li>
              <li><Link href="/projects" className="hover:text-white transition-colors">Active Projects</Link></li>
              <li><Link href="/how-it-works" className="hover:text-white transition-colors">Methodology</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-6">Company</h4>
            <ul className="space-y-4 text-sm text-muted-foreground">
              <li><Link href="/company" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="/careers" className="hover:text-white transition-colors">Careers</Link></li>
              <li><Link href="/trust" className="hover:text-white transition-colors">Compliance & Trust</Link></li>
              <li><Link href="/partners" className="hover:text-white transition-colors">Partner Network</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-6">Newsletter</h4>
            <p className="text-muted-foreground text-sm mb-4">Stay updated with global trade intelligence.</p>
            <div className="flex gap-2">
              <input 
                type="email" 
                placeholder="Email address" 
                className="bg-background border border-white/10 rounded-lg px-4 py-2 text-sm w-full focus:outline-none focus:border-accent"
              />
              <button className="px-4 py-2 bg-primary rounded-lg text-white text-sm font-medium hover:bg-primary/90">Join</button>
            </div>
          </div>
        </div>

        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} Baalvion Industries Private Limited. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
