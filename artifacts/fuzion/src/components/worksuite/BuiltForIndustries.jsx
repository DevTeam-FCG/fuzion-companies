import { useState, useEffect, useRef } from "react";
import { Building2, Zap, Factory, Wrench, Mountain, Layers } from "lucide-react";

const NAVY = '#0a1628';
const GOLD = '#C8922A';
const CREAM = '#FAF8F4';
const CREAM_DEEP = '#EEE9E2';

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

export default function BuiltForIndustries() {
  const industries = [
    { icon: Wrench, name: "EPC & Heavy Construction", desc: "Engineering, procurement, and construction programs running multi-billion-dollar capital portfolios." },
    { icon: Zap, name: "Utilities", desc: "Electric, gas, and water utilities managing regulated infrastructure with audit-grade documentation." },
    { icon: Factory, name: "Energy & Industrial", desc: "Power generation, refining, and industrial owners running long-cycle capital programs." },
    { icon: Mountain, name: "Infrastructure & Civil", desc: "Transportation, water, and public infrastructure programs with public-sector reporting demands." },
    { icon: Building2, name: "Commercial Construction", desc: "Owners, GCs, and developers managing complex multi-stakeholder build programs." },
    { icon: Layers, name: "Public Sector & Tribal", desc: "Government agencies, tribal nations, and public works programs requiring compliance-grade systems." },
  ];

  return (
    <section className="py-32" style={{ background: CREAM_DEEP }}>
      <div className="max-w-7xl mx-auto px-6">
        <AnimatedElement>
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-24 mb-16 items-end">
            <div className="lg:w-1/2">
              <p className="text-[10px] tracking-[0.3em] uppercase mb-4 font-semibold" style={{ color: GOLD }}>Built For</p>
              <h2 className="text-4xl sm:text-5xl lg:text-[3.5rem] font-medium leading-[1.1]" style={{ fontFamily: "'Cormorant Garamond', serif", color: NAVY }}>
                The industries that<br />run the real world.
              </h2>
            </div>
            <div className="lg:w-1/2 pb-2">
              <p className="text-base leading-relaxed font-normal" style={{ color: NAVY, opacity: 0.75 }}>
                The Works Suite was designed by people who have spent decades inside regulated capital programs — where documentation is audit evidence, schedules are commitments, and field productivity is measured in millions of dollars per day.
              </p>
            </div>
          </div>
        </AnimatedElement>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border border-gray-200">
          {industries.map((ind, i) => (
            <AnimatedElement key={i} delay={i * 80}>
              <div className="p-8 border-r border-b border-gray-200 h-full hover:shadow-sm transition-shadow duration-300" style={{ background: CREAM }}>
                <div className="w-10 h-10 border border-gray-200 flex items-center justify-center mb-6">
                  <ind.icon className="w-4 h-4" style={{ color: GOLD }} />
                </div>
                <h3 className="text-xl font-semibold mb-3" style={{ fontFamily: "'Cormorant Garamond', serif", color: NAVY }}>{ind.name}</h3>
                <p className="text-[14px] leading-relaxed font-normal" style={{ color: NAVY, opacity: 0.75 }}>{ind.desc}</p>
              </div>
            </AnimatedElement>
          ))}
        </div>
      </div>
    </section>
  );
}