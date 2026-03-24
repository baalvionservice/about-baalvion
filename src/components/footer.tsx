import Link from "next/link";
import { Globe, Github, Linkedin, Twitter, Mail, ArrowRight, Shield } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#07090D] border-t border-white/5 pt-32 pb-16">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-20 mb-32">
          <div className="lg:col-span-4 space-y-10">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-12 h-12 bg-primary flex items-center justify-center rounded-2xl shadow-xl shadow-primary/20 transition-transform group-hover:rotate-12">
                <Globe className="text-white w-7 h-7" />
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-bold tracking-tighter text-white leading-none">BAALVION</span>
                <span className="text-[10px] font-bold text-accent tracking-[0.4em] uppercase mt-1">Nexus Industries</span>
              </div>
            </Link>
            <p className="text-muted-foreground text-lg leading-relaxed max-w-sm font-light">
              Architecting the foundation for the next century of international commerce through unified global trade infrastructure.
            </p>
            <div className="flex gap-4">
              {[
                { icon: Linkedin, href: "#" },
                { icon: Twitter, href: "#" },
                { icon: Github, href: "#" }
              ].map((social, i) => (
                <a 
                  key={i} 
                  href={social.href} 
                  className="w-12 h-12 rounded-2xl border border-white/10 flex items-center justify-center hover:bg-white/5 hover:border-primary transition-all text-muted-foreground hover:text-white"
                  aria-label={`Visit our ${social.icon.name}`}
                >
                  <social.icon className="w-6 h-6" />
                </a>
              ))}
            </div>
          </div>

          <div className="lg:col-span-2 space-y-8">
            <h4 className="text-white font-bold text-sm uppercase tracking-[0.3em]">Platform</h4>
            <ul className="space-y-4 text-muted-foreground font-light">
              {['Nexus Core', 'Ecosystem Layers', 'Strategic Portfolio', 'Infrastructure Specs'].map(item => (
                <li key={item}>
                  <Link href="#" className="hover:text-primary transition-colors hover:translate-x-1 inline-block">{item}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2 space-y-8">
            <h4 className="text-white font-bold text-sm uppercase tracking-[0.3em]">Governance</h4>
            <ul className="space-y-4 text-muted-foreground font-light">
              {['Trust Center', 'Compliance AI', 'Legal Framework', 'Data Sovereign'].map(item => (
                <li key={item}>
                  <Link href="#" className="hover:text-primary transition-colors hover:translate-x-1 inline-block">{item}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-4 space-y-10">
            <div className="p-8 rounded-[2rem] bg-white/5 border border-white/10 space-y-8">
              <div className="space-y-2">
                <h4 className="text-white font-bold text-sm uppercase tracking-[0.3em]">Nexus Intelligence</h4>
                <p className="text-muted-foreground text-sm font-light">Join the secure feed for global trade infrastructure updates.</p>
              </div>
              <div className="flex gap-3">
                <div className="relative flex-1">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input 
                    type="email" 
                    placeholder="nexus-id@intel.link" 
                    className="bg-black/40 border border-white/10 rounded-2xl pl-12 pr-4 py-4 text-sm w-full focus:outline-none focus:border-primary transition-all"
                  />
                </div>
                <button className="px-8 py-4 bg-primary rounded-2xl text-white text-sm font-bold hover:bg-primary/90 shadow-xl shadow-primary/20 transition-all active:scale-[0.98]">
                  Secure Join
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/5 pt-16 flex flex-col md:flex-row justify-between items-center gap-8 text-[10px] text-muted-foreground font-bold uppercase tracking-[0.3em]">
          <div className="flex items-center gap-3">
            <Shield className="w-4 h-4 text-primary" />
            <p>© {currentYear} Baalvion Industries Private Limited. Imperial Nexus Div.</p>
          </div>
          <div className="flex gap-12">
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy Architecture</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Service Protocols</Link>
            <Link href="/admin/login" className="text-primary/40 hover:text-primary transition-colors">Admin Entry</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
