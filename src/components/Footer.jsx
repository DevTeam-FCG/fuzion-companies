import { Anchor } from "lucide-react";

export default function Footer() {
  return (
    <footer style={{background:'#0a1628'}}>
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 flex items-center justify-center font-bold text-sm flex-shrink-0" style={{background:'#C8922A', color:'white'}}>
                F
              </div>
              <span className="text-white font-semibold tracking-wide">Fuzion Companies</span>
            </div>
            <p className="text-white/50 text-xs leading-relaxed mb-3">
              Built by Fuzion Consulting Group &amp; Fuzion Chickasaw Group
            </p>
            <p className="text-xs tracking-[0.15em] uppercase font-medium" style={{color:'#C8922A'}}>
              Faith · Service · Precision · Community
            </p>
          </div>

          {/* Companies */}
          <div>
            <p className="text-white/40 text-xs font-bold tracking-widest uppercase mb-5">Companies</p>
            <div className="flex flex-col gap-3">
              <a href="https://fcghelps.com/" target="_blank" rel="noopener noreferrer" className="text-white/60 text-xs hover:text-primary transition-colors duration-200">Fuzion Consulting Group</a>
              <a href="https://fuzionchickasawgroup.com/" target="_blank" rel="noopener noreferrer" className="text-white/60 text-xs hover:text-primary transition-colors duration-200">Fuzion Chickasaw Group</a>
              <a href="https://sb217platform.com/" target="_blank" rel="noopener noreferrer" className="text-white/60 text-xs hover:text-primary transition-colors duration-200">SB217 Platform</a>
              <a href="#contact" className="text-white/60 text-xs hover:text-primary transition-colors duration-200">Fortitude (Coming Soon)</a>
            </div>
          </div>

          {/* Products */}
          <div>
            <p className="text-white/40 text-xs font-bold tracking-widest uppercase mb-5">Products</p>
            <div className="flex flex-col gap-3">
              <a href="https://beacon-relief-hub.replit.app/" target="_blank" rel="noopener noreferrer" className="text-white/60 text-xs hover:text-primary transition-colors duration-200">Support Beacon Relief</a>
              <a href="#contact" className="text-white/60 text-xs hover:text-primary transition-colors duration-200">Support Beacon Logistics</a>
              <a href="https://www.supportbeaconrelief.com/" target="_blank" rel="noopener noreferrer" className="text-white/60 text-xs hover:text-primary transition-colors duration-200">SBR Application</a>
            </div>
          </div>

          {/* Partners */}
          <div>
            <p className="text-white/40 text-xs font-bold tracking-widest uppercase mb-5">Partners &amp; Links</p>
            <div className="flex flex-col gap-3">
              <a href="https://ranchernavy.org/" target="_blank" rel="noopener noreferrer" className="text-white/60 text-xs hover:text-primary transition-colors duration-200 flex items-center gap-1.5">
                <Anchor className="w-3 h-3 text-primary" />
                Rancher Navy
              </a>
              <a href="#contact" className="text-white/60 text-xs hover:text-primary transition-colors duration-200">Contact Us</a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <p className="text-white/40 text-xs leading-relaxed">
            © 2019–2026 Fuzion Companies. All rights reserved. Fuzion Consulting Group LLC · Fuzion Chickasaw Group LLC
          </p>
          <p className="text-white/30 text-xs">
            Est. February 17, 2026 · SB217 · The Ranger Road Fire · Gate, Oklahoma
          </p>
        </div>
      </div>
    </footer>
  );
}