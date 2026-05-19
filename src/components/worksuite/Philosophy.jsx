import { useState, useEffect, useRef } from "react";
import { HardHat, Cpu, Cloud, ShieldCheck } from "lucide-react";

const NAVY = '#0a1628';
const GOLD = '#C8922A';
const CREAM = '#FAF8F4';

function AnimatedElement({ children, className, delay = 0 }) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight) { setIsVisible(true); return; }
    const fallback = setTimeout(() => setIsVisible(true), 200);
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { clearTimeout(fallback); setTimeout(() => setIsVisible(true), delay); observer.unobserve(el); }
    }, { threshold: 0.05, rootMargin: '0px 0px 200px 0px' });
    observer.observe(el);
    return () => { observer.disconnect(); clearTimeout(fallback); };
  }, [delay]);
  return (
    <div ref={ref} className={`transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'} ${className || ''}`}>
      {children}
    </div>
  );
}

export default function Philosophy() {
  const pillars = [
    { icon: HardHat, title: "Built from the field", desc: "Every workflow was specified by people who have actually run engineering and construction programs — not designed in a vacuum." },
    { icon: Cpu, title: "AI-native, not AI-bolted", desc: "AI engineering is built into the platform — document understanding, forecasting, and automation are core, not add-ons." },
    { icon: Cloud, title: "M365 & cloud-aligned", desc: "Deep Microsoft 365 integration with PowerApps, AWS, and modern cloud architecture from day one." },
    { icon: ShieldCheck, title: "Regulated-industry ready", desc: "Audit-grade event logs, role-based access, and compliance patterns built for utility, EPC, and enterprise programs." },
  ];

  return (
    <section id="philosophy" className="py-32" style={{ background: CREAM }}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-12 gap-16 lg:gap-24 items-start">
          <div className="lg:col-span-5">
            <AnimatedElement>
              <p className="text-[10px] tracking-[0.3em] uppercase mb-4 font-semibold" style={{ color: GOLD }}>How We Build</p>
              <h2 className="text-4xl sm:text-5xl lg:text-[3.5rem] font-medium mb-8 leading-[1.1]" style={{ fontFamily: "'Cormorant Garamond', serif", color: NAVY }}>
                Engineering-grade<br />software for<br />engineering work.
              </h2>
              <p className="text-gray-600 text-base leading-relaxed font-normal">
                The Works Suite was born inside Fuzion Consulting Group — a firm with over 35 combined years supporting large-scale construction, utility, and enterprise programs. We built it because the tools we needed did not exist. Now they do.
              </p>
            </AnimatedElement>
          </div>
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-px" style={{ background: '#e5e7eb' }}>
            {pillars.map((p, i) => (
              <AnimatedElement key={i} delay={i * 100}>
                <div className="p-8 h-full" style={{ background: CREAM }}>
                  <div className="w-10 h-10 border border-gray-200 flex items-center justify-center mb-6">
                    <p.icon className="w-4 h-4" style={{ color: GOLD }} />
                  </div>
                  <h3 className="text-xl font-semibold mb-3" style={{ fontFamily: "'Cormorant Garamond', serif", color: NAVY }}>{p.title}</h3>
                  <p className="text-gray-600 text-[14px] leading-relaxed font-normal">{p.desc}</p>
                </div>
              </AnimatedElement>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}