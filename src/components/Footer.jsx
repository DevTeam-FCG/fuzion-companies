import { Anchor, BookOpen } from "lucide-react";
import { generateBrandBookPDF } from "@/functions/generateBrandBookPDF";

const handleBrandBook = async () => {
  try {
    const res = await generateBrandBookPDF({});
    const blob = res.data instanceof Blob ? res.data : new Blob([res.data], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Fuzion_Editorial_System_Brand_Book.pdf';
    a.click();
    URL.revokeObjectURL(url);
  } catch (e) {
    console.error(e);
  }
};

export default function Footer() {
  return (
    <footer style={{background:'#0a1628'}}>
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="relative flex-shrink-0">
                <div className="w-9 h-9 flex items-center justify-center" style={{background:'#C8922A'}}>
                  <span className="text-base font-semibold" style={{color:'white', fontFamily:"'Cormorant Garamond', serif", fontSize:'1.1rem'}}>F</span>
                </div>
                <div className="absolute -bottom-0.5 -right-0.5 w-2 h-2 bg-white/30" />
              </div>
              <div className="flex flex-col leading-none gap-0.5">
                <span className="text-[15px] font-semibold tracking-[0.06em] text-white" style={{fontFamily:"'Cormorant Garamond', serif"}}>FUZION COMPANIES</span>
                <div className="flex items-center justify-center gap-2">
                  <div className="w-4 h-px" style={{background:'#C8922A'}} />
                  <span className="text-[8px] tracking-[0.3em] uppercase font-medium text-white/40">Est. 2019</span>
                  <div className="w-4 h-px" style={{background:'#C8922A'}} />
                </div>
              </div>
            </div>
            <p className="text-white/50 text-xs leading-relaxed">
              Built by Fuzion Consulting Group &amp; Fuzion Chickasaw Group
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

          {/* Platforms */}
          <div>
            <p className="text-white/40 text-xs font-bold tracking-widest uppercase mb-5">Platforms</p>
            <div className="flex flex-col gap-3">
              <a href="/works-suite" className="text-white/60 text-xs hover:text-primary transition-colors duration-200">The Works Suite</a>
              <a href="/sb217" className="text-white/60 text-xs hover:text-primary transition-colors duration-200">SB217 Platform</a>
              <a href="https://fuzionchickasawgroup.com/" target="_blank" rel="noopener noreferrer" className="text-white/60 text-xs hover:text-primary transition-colors duration-200">Fuzion Storm Works <span className="text-white/30">(Coming Soon)</span></a>
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
              <button onClick={handleBrandBook} className="text-white/60 text-xs hover:text-primary transition-colors duration-200 flex items-center gap-1.5 text-left">
                <BookOpen className="w-3 h-3 text-primary" />
                Brand Book (PDF)
              </button>
            </div>
          </div>
        </div>

        {/* Values row */}
        <div className="text-center mb-8">
          <p className="text-xs tracking-[0.3em] uppercase font-medium" style={{color:'#C8922A'}}>
            Faith · Service · Precision · Community
          </p>
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