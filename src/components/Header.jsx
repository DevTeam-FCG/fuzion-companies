import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
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
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? "bg-background/95 backdrop-blur-md border-b border-border/20 shadow-lg shadow-background/50 py-3" : "bg-transparent py-5"}`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between gap-6">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 flex-shrink-0 group">
          <div className="w-8 h-8 bg-primary flex items-center justify-center text-primary-foreground font-bold text-sm tracking-wider flex-shrink-0 group-hover:scale-105 transition-transform duration-300">
            F
          </div>
          <div className="hidden sm:flex flex-col leading-none">
            <span className="text-muted-foreground text-[8px] tracking-[0.3em] uppercase font-semibold mb-0.5">Est. 2026</span>
            <span className="text-foreground text-sm font-semibold tracking-widest uppercase">Fuzion Companies</span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden sm:flex items-center gap-7">
          <a href="#story" className="text-muted-foreground text-[10px] tracking-[0.2em] uppercase hover:text-primary transition-colors duration-200 font-medium">Our Story</a>
          <a href="#portfolio" className="text-muted-foreground text-[10px] tracking-[0.2em] uppercase hover:text-primary transition-colors duration-200 font-medium">Portfolio</a>
          <a href="#mission" className="text-muted-foreground text-[10px] tracking-[0.2em] uppercase hover:text-primary transition-colors duration-200 font-medium">Mission</a>
          <a href="#partner" className="text-muted-foreground text-[10px] tracking-[0.2em] uppercase hover:text-primary transition-colors duration-200 font-medium">Rancher Navy</a>
          <a href="#leadership" className="text-muted-foreground text-[10px] tracking-[0.2em] uppercase hover:text-primary transition-colors duration-200 font-medium">Leadership</a>
          <a href="#contact" className="text-muted-foreground text-[10px] tracking-[0.2em] uppercase hover:text-primary transition-colors duration-200 font-medium">Contact</a>
        </nav>

        {/* CTA */}
        <a href="#contact" className="hidden sm:inline-flex items-center justify-center border border-border/40 text-foreground px-5 py-2.5 text-[10px] font-semibold tracking-[0.2em] uppercase hover:border-primary/50 hover:text-primary transition-all duration-300 flex-shrink-0 backdrop-blur-sm bg-background/10">
          Partner With Us
        </a>

        {/* Mobile Menu */}
        <Sheet>
          <SheetTrigger asChild className="sm:hidden">
            <Button variant="ghost" size="icon" className="text-foreground hover:bg-muted/50">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="bg-background border-border/30 w-72">
            <div className="flex items-center gap-3 mb-10 mt-2">
              <div className="w-8 h-8 bg-primary flex items-center justify-center text-primary-foreground font-bold text-sm">F</div>
              <div className="flex flex-col leading-none">
                <span className="text-muted-foreground text-[8px] tracking-[0.3em] uppercase font-semibold mb-0.5">Est. 2026</span>
                <span className="text-foreground text-sm font-semibold tracking-widest uppercase">Fuzion Companies</span>
              </div>
            </div>
            <nav className="flex flex-col gap-6">
              <a href="#story" className="text-muted-foreground text-xs tracking-widest uppercase hover:text-primary transition-colors duration-200 font-medium">Our Story</a>
              <a href="#portfolio" className="text-muted-foreground text-xs tracking-widest uppercase hover:text-primary transition-colors duration-200 font-medium">Portfolio</a>
              <a href="#mission" className="text-muted-foreground text-xs tracking-widest uppercase hover:text-primary transition-colors duration-200 font-medium">Mission</a>
              <a href="#partner" className="text-muted-foreground text-xs tracking-widest uppercase hover:text-primary transition-colors duration-200 font-medium">Rancher Navy</a>
              <a href="#leadership" className="text-muted-foreground text-xs tracking-widest uppercase hover:text-primary transition-colors duration-200 font-medium">Leadership</a>
              <a href="#contact" className="text-muted-foreground text-xs tracking-widest uppercase hover:text-primary transition-colors duration-200 font-medium">Contact</a>
              <a href="#contact" className="mt-4 inline-flex items-center justify-center border border-primary/50 text-primary px-4 py-3 text-xs font-semibold tracking-widest uppercase hover:bg-primary/10 transition-all duration-300">
                Partner With Us
              </a>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}