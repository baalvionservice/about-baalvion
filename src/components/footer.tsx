import Link from "next/link";
import { Globe, Github, Linkedin, Twitter, Mail, Shield } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-gray-100 pt-20 pb-12">
      <div className="section-container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 mb-16">
          <div className="lg:col-span-5 space-y-8">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-9 h-9 bg-primary flex items-center justify-center rounded-sm shadow-sm transition-transform">
                <Globe className="text-white w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold tracking-tight text-gray-900 leading-none">BAALVION</span>
                <span className="text-[8px] font-bold text-primary tracking-widest uppercase mt-0.5">Nexus Industries</span>
              </div>
            </Link>
            <p className="text-gray-600 text-lg leading-relaxed max-w-sm font-medium">
              Architecting the foundational layer for the next century of international commerce through unified global trade infrastructure.
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
                  className="w-10 h-10 rounded-sm border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors text-gray-400 hover:text-primary"
                  aria-label="Social Link"
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          <div className="lg:col-span-2 space-y-6">
            <h4 className="text-gray-900 font-bold text-[11px] uppercase tracking-widest">Platform</h4>
            <ul className="space-y-3 text-gray-600 text-sm font-medium">
              {['Nexus Core', 'Ecosystem Layers', 'Strategic Portfolio', 'Infrastructure Specs', 'Developers'].map(item => (
                <li key={item}>
                  <Link href="#" className="hover:text-primary transition-colors">{item}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2 space-y-6">
            <h4 className="text-gray-900 font-bold text-[11px] uppercase tracking-widest">Governance</h4>
            <ul className="space-y-3 text-gray-600 text-sm font-medium">
              {['Trust Center', 'Compliance AI', 'Legal Framework', 'Data Sovereign', 'Media'].map(item => (
                <li key={item}>
                  <Link href="#" className="hover:text-primary transition-colors">{item}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3 space-y-6">
            <div className="p-6 rounded-lg bg-gray-50 border border-gray-100 space-y-6">
              <div className="space-y-2">
                <h4 className="text-gray-900 font-bold text-[11px] uppercase tracking-widest">Nexus Intel</h4>
                <p className="text-gray-600 text-sm leading-relaxed font-medium">Join the secure feed for infrastructure updates.</p>
              </div>
              <div className="space-y-3">
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input 
                    type="email" 
                    placeholder="email@address.com" 
                    className="bg-white border border-gray-200 rounded-sm pl-10 pr-4 py-2 text-sm w-full focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>
                <button className="w-full py-2 bg-primary rounded-sm text-white text-sm font-bold hover:bg-[#e68a00] transition-colors">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-100 pt-8 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] text-gray-400 font-bold uppercase tracking-widest">
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-primary" />
            <p>© {currentYear} Baalvion Industries Private Limited.</p>
          </div>
          <div className="flex gap-8">
            <Link href="/privacy" className="hover:text-gray-900 transition-colors">Privacy Architecture</Link>
            <Link href="/terms" className="hover:text-gray-900 transition-colors">Service Protocols</Link>
            <Link href="/admin/login" className="text-gray-100 hover:text-gray-200 transition-colors">Admin</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}