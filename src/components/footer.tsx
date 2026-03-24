import Link from "next/link";
import { Globe, Github, Linkedin, Twitter, Mail, Shield } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#05070A] border-t border-white/5 pt-48 pb-16">
      <div className="section-container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-20 lg:gap-32 mb-48">
          <div className="lg:col-span-5 space-y-16">
            <Link href="/" className="flex items-center gap-6 group">
              <div className="w-16 h-16 bg-primary flex items-center justify-center rounded-2xl shadow-2xl shadow-primary/40 transition-transform duration-500 group-hover:rotate-12">
                <Globe className="text-white w-9 h-9" />
              </div>
              <div className="flex flex-col">
                <span className="text-4xl font-bold tracking-tighter text-white leading-none">BAALVION</span>
                <span className="text-[10px] font-bold text-accent tracking-[0.5em] uppercase mt-3">Nexus Industries</span>
              </div>
            </Link>
            <p className="text-muted-foreground text-2xl leading-relaxed max-w-md font-light">
              Architecting the foundational layer for the next century of international commerce through unified global trade infrastructure.
            </p>
            <div className="flex gap-6">
              {[
                { icon: Linkedin, href: "#" },
                { icon: Twitter, href: "#" },
                { icon: Github, href: "#" }
              ].map((social, i) => (
                <a 
                  key={i} 
                  href={social.href} 
                  className="w-16 h-16 rounded-2xl border border-white/10 flex items-center justify-center hover:bg-primary/10 hover:border-primary transition-all duration-300 text-muted-foreground hover:text-white"
                  aria-label="Social Link"
                >
                  <social.icon className="w-7 h-7" />
                </a>
              ))}
            </div>
          </div>

          <div className="lg:col-span-2 space-y-12 pt-4">
            <h4 className="text-white font-bold text-xs uppercase tracking-[0.5em] opacity-30">Platform</h4>
            <ul className="space-y-6 text-muted-foreground font-light text-xl">
              {['Nexus Core', 'Ecosystem Layers', 'Strategic Portfolio', 'Infrastructure Specs', 'Developers'].map(item => (
                <li key={item}>
                  <Link href="#" className="hover:text-primary transition-all hover:translate-x-2 inline-block">{item}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2 space-y-12 pt-4">
            <h4 className="text-white font-bold text-xs uppercase tracking-[0.5em] opacity-30">Governance</h4>
            <ul className="space-y-6 text-muted-foreground font-light text-xl">
              {['Trust Center', 'Compliance AI', 'Legal Framework', 'Data Sovereign', 'Media'].map(item => (
                <li key={item}>
                  <Link href="#" className="hover:text-primary transition-all hover:translate-x-2 inline-block">{item}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3 space-y-16">
            <div className="p-12 rounded-[3rem] bg-white/[0.02] border border-white/5 space-y-12">
              <div className="space-y-4">
                <h4 className="text-white font-bold text-xs uppercase tracking-[0.5em] opacity-30">Nexus Intel</h4>
                <p className="text-muted-foreground text-base font-light leading-relaxed">Join the secure feed for global trade infrastructure updates.</p>
              </div>
              <div className="space-y-6">
                <div className="relative">
                  <Mail className="absolute left-6 top-1/2 -translate-y-1/2 w-6 h-6 text-muted-foreground" />
                  <input 
                    type="email" 
                    placeholder="nexus-id@intel.link" 
                    className="bg-black/60 border border-white/10 rounded-2xl pl-16 pr-6 py-6 text-lg w-full focus:outline-none focus:border-primary transition-all shadow-inner"
                  />
                </div>
                <button className="w-full py-6 bg-primary rounded-2xl text-white text-lg font-bold hover:bg-primary/90 shadow-2xl shadow-primary/30 transition-all active:scale-[0.98]">
                  Establish Secure Connection
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/5 pt-16 flex flex-col md:flex-row justify-between items-center gap-12 text-[11px] text-muted-foreground font-bold uppercase tracking-[0.4em]">
          <div className="flex items-center gap-6">
            <Shield className="w-6 h-6 text-primary" />
            <p>© {currentYear} Baalvion Industries Private Limited. Imperial Nexus Division.</p>
          </div>
          <div className="flex gap-16">
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy Architecture</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Service Protocols</Link>
            <Link href="/admin/login" className="text-primary/40 hover:text-primary transition-colors">Admin Entry</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
