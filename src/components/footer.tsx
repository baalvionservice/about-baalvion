import Link from "next/link";
import { Globe, Github, Linkedin, Twitter, Mail, Shield } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#05070A] border-t border-white/5 pt-32 pb-16">
      <div className="section-container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-20 lg:gap-32 mb-32">
          <div className="lg:col-span-5 space-y-12">
            <Link href="/" className="flex items-center gap-4 group">
              <div className="w-14 h-14 bg-primary flex items-center justify-center rounded-[1.25rem] shadow-2xl shadow-primary/30 transition-transform duration-500 group-hover:rotate-12">
                <Globe className="text-white w-8 h-8" />
              </div>
              <div className="flex flex-col">
                <span className="text-3xl font-bold tracking-tighter text-white leading-none">BAALVION</span>
                <span className="text-[10px] font-bold text-accent tracking-[0.5em] uppercase mt-2">Nexus Industries</span>
              </div>
            </Link>
            <p className="text-muted-foreground text-xl leading-relaxed max-w-md font-light">
              Architecting the foundational layer for the next century of international commerce through unified global trade infrastructure.
            </p>
            <div className="flex gap-5">
              {[
                { icon: Linkedin, href: "#" },
                { icon: Twitter, href: "#" },
                { icon: Github, href: "#" }
              ].map((social, i) => (
                <a 
                  key={i} 
                  href={social.href} 
                  className="w-14 h-14 rounded-2xl border border-white/10 flex items-center justify-center hover:bg-primary/10 hover:border-primary transition-all duration-300 text-muted-foreground hover:text-white"
                  aria-label="Social Link"
                >
                  <social.icon className="w-6 h-6" />
                </a>
              ))}
            </div>
          </div>

          <div className="lg:col-span-2 space-y-10">
            <h4 className="text-white font-bold text-xs uppercase tracking-[0.4em] opacity-50">Platform</h4>
            <ul className="space-y-5 text-muted-foreground font-light text-lg">
              {['Nexus Core', 'Ecosystem Layers', 'Strategic Portfolio', 'Infrastructure Specs'].map(item => (
                <li key={item}>
                  <Link href="#" className="hover:text-primary transition-all hover:translate-x-1 inline-block">{item}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2 space-y-10">
            <h4 className="text-white font-bold text-xs uppercase tracking-[0.4em] opacity-50">Governance</h4>
            <ul className="space-y-5 text-muted-foreground font-light text-lg">
              {['Trust Center', 'Compliance AI', 'Legal Framework', 'Data Sovereign'].map(item => (
                <li key={item}>
                  <Link href="#" className="hover:text-primary transition-all hover:translate-x-1 inline-block">{item}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3 space-y-12">
            <div className="p-10 rounded-[2.5rem] bg-white/[0.02] border border-white/5 space-y-10">
              <div className="space-y-3">
                <h4 className="text-white font-bold text-xs uppercase tracking-[0.4em] opacity-50">Nexus Intelligence</h4>
                <p className="text-muted-foreground text-sm font-light leading-relaxed">Join the secure feed for global trade infrastructure updates.</p>
              </div>
              <div className="space-y-4">
                <div className="relative">
                  <Mail className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <input 
                    type="email" 
                    placeholder="nexus-id@intel.link" 
                    className="bg-black/40 border border-white/10 rounded-2xl pl-14 pr-5 py-5 text-base w-full focus:outline-none focus:border-primary transition-all"
                  />
                </div>
                <button className="w-full py-5 bg-primary rounded-2xl text-white text-base font-bold hover:bg-primary/90 shadow-2xl shadow-primary/20 transition-all active:scale-[0.98]">
                  Establish Secure Connection
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/5 pt-16 flex flex-col md:flex-row justify-between items-center gap-10 text-[11px] text-muted-foreground font-bold uppercase tracking-[0.4em]">
          <div className="flex items-center gap-4">
            <Shield className="w-5 h-5 text-primary" />
            <p>© {currentYear} Baalvion Industries Private Limited. Imperial Nexus Division.</p>
          </div>
          <div className="flex gap-16">
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy Architecture</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Service Protocols</Link>
            <Link href="/admin/login" className="text-primary/30 hover:text-primary transition-colors">Admin Entry</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}