import Link from "next/link";
import { Globe, Facebook, Instagram, Linkedin, Youtube, Mail, ChevronUp } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#151B24] text-white pt-20 pb-10 relative">
      <div className="section-container">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
          
          {/* Left Section: Logo & Links */}
          <div className="lg:w-1/2 flex flex-col md:flex-row gap-16 lg:gap-24">
            <div className="space-y-8">
              <Link href="/" className="flex items-center gap-3 group">
                <div className="w-10 h-10 bg-[#FF9900] flex items-center justify-center rounded-sm shadow-sm transition-transform">
                  <Globe className="text-white w-6 h-6" />
                </div>
                <span className="text-2xl font-bold tracking-tight text-white leading-none">BAALVION</span>
              </Link>
              
              <div className="flex flex-col gap-4 text-sm font-bold text-gray-300">
                <div className="flex items-center gap-2 cursor-pointer hover:text-[#FF9900] transition-colors">
                  <span className="text-xs">Country & Language:</span>
                  <div className="flex items-center gap-1.5 border border-gray-600 px-2 py-1 rounded-sm bg-gray-800/50">
                    <span className="text-[10px]">🇺🇸 EN</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-12">
              <div className="space-y-4">
                <Link href="/news/updates" className="block text-sm font-bold text-gray-300 hover:text-[#FF9900] transition-colors">Baalvion News</Link>
                <Link href="#" className="block text-sm font-bold text-gray-300 hover:text-[#FF9900] transition-colors">Press Center <span className="inline-block text-[10px] ml-1 opacity-50">↗</span></Link>
                <Link href="/" className="block text-sm font-bold text-gray-300 hover:text-[#FF9900] transition-colors">Baalvion.nexus <span className="inline-block text-[10px] ml-1 opacity-50">↗</span></Link>
                <Link href="/investors" className="block text-sm font-bold text-gray-300 hover:text-[#FF9900] transition-colors">Investor Resources <span className="inline-block text-[10px] ml-1 opacity-50">↗</span></Link>
              </div>
              <div className="space-y-4">
                <Link href="/careers" className="block text-sm font-bold text-gray-300 hover:text-[#FF9900] transition-colors">Careers <span className="inline-block text-[10px] ml-1 opacity-50">↗</span></Link>
                <Link href="#" className="block text-sm font-bold text-gray-300 hover:text-[#FF9900] transition-colors">Site Map</Link>
                <Link href="/platform" className="block text-sm font-bold text-gray-300 hover:text-[#FF9900] transition-colors">More from Baalvion</Link>
              </div>
            </div>
          </div>

          {/* Vertical Separator */}
          <div className="hidden lg:block w-px bg-gray-700 self-stretch" />

          {/* Right Section: Subscription */}
          <div className="lg:w-1/2 space-y-8">
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-white">Subscribe to Baalvion News</h3>
              <p className="text-gray-400 text-base leading-relaxed max-w-md">
                Sign up for the latest news, facts, analysis, and original stories about Baalvion, delivered to you weekly.
              </p>
            </div>
            
            <div className="space-y-6">
              <div className="relative group max-w-md">
                <input 
                  type="email" 
                  placeholder="Enter email" 
                  className="w-full bg-transparent border-b border-gray-600 focus:border-[#FF9900] py-3 text-white outline-none transition-colors placeholder:text-gray-500"
                />
              </div>
              <button className="bg-[#FF9900] hover:bg-[#e68a00] text-white px-10 py-3 rounded-full font-bold transition-all transform active:scale-95 shadow-lg">
                Subscribe
              </button>
              <div className="text-[11px] text-gray-500 font-bold uppercase tracking-widest flex gap-4">
                <Link href="/privacy" className="hover:text-white transition-colors underline underline-offset-4">Baalvion Privacy Policy</Link>
                <span>Opt out anytime</span>
              </div>
            </div>
          </div>
        </div>

        {/* Social & Bottom Bar */}
        <div className="mt-20 pt-10 border-t border-gray-800 flex flex-col gap-10">
          <div className="flex gap-8">
            <Link href="#" className="text-gray-400 hover:text-white transition-colors"><Facebook className="w-5 h-5" /></Link>
            <Link href="#" className="text-gray-400 hover:text-white transition-colors"><Instagram className="w-5 h-5" /></Link>
            <Link href="#" className="text-gray-400 hover:text-white transition-colors">
              <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
            </Link>
            <Link href="#" className="text-gray-400 hover:text-white transition-colors"><Linkedin className="w-5 h-5" /></Link>
            <Link href="#" className="text-gray-400 hover:text-white transition-colors"><Youtube className="w-5 h-5" /></Link>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 text-[10px] text-gray-500 font-bold uppercase tracking-widest">
            <div className="flex flex-wrap gap-x-6 gap-y-2">
              <Link href="/" className="hover:text-white transition-colors">Baalvion.nexus</Link>
              <Link href="/terms" className="hover:text-white transition-colors">Conditions of Use</Link>
              <Link href="/privacy" className="hover:text-white transition-colors">Baalvion Privacy Policy</Link>
              <span className="text-gray-600">© 1996-{currentYear} Baalvion Industries Private Limited.</span>
            </div>
          </div>
        </div>
      </div>

      {/* Back to Top */}
      <button 
        onClick={scrollToTop}
        className="absolute bottom-8 right-8 w-12 h-12 bg-white text-gray-900 rounded-full flex items-center justify-center shadow-2xl hover:bg-gray-100 transition-all transform hover:-translate-y-1 active:scale-90 z-10"
        aria-label="Back to top"
      >
        <ChevronUp className="w-6 h-6" />
      </button>
    </footer>
  );
}
