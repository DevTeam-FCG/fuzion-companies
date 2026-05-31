import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'bg-white shadow-sm border-b border-gray-200' : 'bg-white border-b border-gray-100'}`}>
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between gap-6">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-4 flex-shrink-0 group">
          {/* Wordmark monogram */}
          <div className="relative flex-shrink-0">
            <div className="w-9 h-9 flex items-center justify-center" style={{background:'#0a1628'}}>
              <span className="text-base font-semibold tracking-widest" style={{color:'#C8922A', fontFamily:"'Cormorant Garamond', serif", fontSize:'1.1rem'}}>F</span>
            </div>
            <div className="absolute -bottom-0.5 -right-0.5 w-2 h-2" style={{background:'#C8922A'}} />
          </div>
          {/* Text lockup */}
          <div className="hidden sm:flex flex-col leading-none gap-0.5">
            <span className="text-[15px] font-semibold tracking-[0.08em]" style={{color:'#0a1628', fontFamily:"'Cormorant Garamond', serif", letterSpacing:'0.06em'}}>FUZION COMPANIES</span>
            <div className="flex items-center justify-center gap-2">
              <div className="w-4 h-px" style={{background:'#C8922A'}} />
              <span className="text-[8px] tracking-[0.3em] uppercase font-medium text-gray-400">Est. 2019</span>
              <div className="w-4 h-px" style={{background:'#C8922A'}} />
            </div>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden sm:flex items-center gap-6">
          {[['#story','Our Story'],['#portfolio','Portfolio'],['#products','Products'],['#mission','Mission'],['#partner','Rancher Navy'],['#contact','Contact']].map(([href, label]) => (
            <a key={href} href={href} className="text-gray-500 text-xs tracking-widest uppercase hover:text-primary transition-colors duration-200 font-medium">{label}</a>
          ))}
        </nav>

        {/* CTA */}
        <a href="#contact" className="hidden sm:inline-flex items-center px-5 py-2.5 text-xs font-semibold tracking-widest uppercase text-white hover:-translate-y-0.5 hover:opacity-90 transition-all duration-300 flex-shrink-0" style={{background:'#0a1628'}}>
          Partner With Us
        </a>

        {/* Mobile Menu */}
        <Sheet>
          <SheetTrigger asChild className="sm:hidden">
            <Button variant="ghost" size="icon" className="text-gray-700 hover:bg-gray-100">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="bg-white border-gray-200 w-72">
            <div className="flex items-center gap-3 mb-10 mt-2">
              <div className="w-8 h-8 flex items-center justify-center font-bold text-sm" style={{background:'#0a1628', color:'#C8922A'}}>F</div>
              <div className="flex flex-col leading-none">
                <span className="text-gray-400 text-[9px] tracking-[0.25em] uppercase">Est. 2019</span>
                <span className="text-sm font-semibold tracking-wide" style={{color:'#0a1628'}}>Fuzion Companies</span>
              </div>
            </div>
            <nav className="flex flex-col gap-6">
              {[['#story','Our Story'],['#portfolio','Portfolio'],['#products','Products'],['#mission','Mission'],['#partner','Rancher Navy'],['#contact','Contact']].map(([href, label]) => (
                <a key={href} href={href} className="text-gray-500 text-xs tracking-widest uppercase hover:text-primary transition-colors duration-200 font-medium">{label}</a>
              ))}
              <a href="#contact" className="mt-4 inline-flex items-center justify-center px-4 py-3 text-xs font-semibold tracking-widest uppercase text-white hover:opacity-90 transition-all duration-300" style={{background:'#0a1628'}}>
                Partner With Us
              </a>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}