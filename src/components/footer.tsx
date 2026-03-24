import Link from "next/link";
import { Globe, Github, Linkedin, Twitter, Mail, ArrowRight } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-[#0A0D12] border-t border-white/5 pt-24 pb-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-16 mb-24">
          <div className="lg:col-span-4 space-y-8">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-10 h-10 bg-primary flex items-center justify-center rounded-xl shadow-lg shadow-primary/20">
                <Globe className="text-white w-6 h-6" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold tracking-tight text-white leading-none">BAALVION</span>
                <span className="text-[10px] font-semibold text-accent tracking-[0.2em] uppercase mt-0.5">Nexus Industries</span>
              </div>
            </Link>
            <p className="text-muted-foreground text-base leading-relaxed max-w-sm font-light">
              Global trade infrastructure connecting businesses, finance, compliance, and intelligence systems into a unified global nexus.
            </p>
            <div className="flex gap-4">
              {[Linkedin, Twitter, Github].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/5 hover:border-accent transition-all text-muted-foreground hover:text-white">
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          <div className="lg:col-span-2">
            <h4 className="text-white font-bold text-sm uppercase tracking-[0.2em] mb-8">Platform</h4>
            <ul className="space-y-4 text-sm text-muted-foreground">
              {['Trade Engine', 'Ecosystem Layers', 'Strategic Projects', 'Infrastructure'].map(item => (
                <li key={item}><Link href="#" className="hover:text-accent transition-colors font-medium">{item}</Link></li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h4 className="text-white font-bold text-sm uppercase tracking-[0.2em] mb-8">Company</h4>
            <ul className="space-y-4 text-sm text-muted-foreground">
              {['About Nexus', 'Strategic Briefing', 'Compliance', 'Career Network'].map(item => (
                <li key={item}><Link href="#" className="hover:text-accent transition-colors font-medium">{item}</Link></li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-4 space-y-8">
            <h4 className="text-white font-bold text-sm uppercase tracking-[0.2em] mb-8">Nexus Intelligence</h4>
            <p className="text-muted-foreground text-sm leading-relaxed font-light">Stay updated with the latest in global trade technology and compliance standards.</p>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input 
                  type="email" 
                  placeholder="Intelligence Feed Email" 
                  className="bg-white/5 border border-white/10 rounded-xl pl-11 pr-4 py-3 text-sm w-full focus:outline-none focus:border-accent transition-all"
                />
              </div>
              <button className="px-6 py-3 bg-primary rounded-xl text-white text-sm font-bold hover:bg-primary/90 shadow-lg shadow-primary/20">
                Join
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-white/5 pt-12 flex flex-col md:flex-row justify-between items-center gap-6 text-xs text-muted-foreground font-medium uppercase tracking-widest">
          <p>© {new Date().getFullYear()} Baalvion Industries Private Limited. Imperial Nexus Div.</p>
          <div className="flex gap-10">
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy Architecture</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Service Protocols</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}