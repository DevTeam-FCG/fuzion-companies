import { useState, useEffect, useRef } from "react";
import { Factory, Zap, Fuel, Train, Landmark, Building2, Mountain } from "lucide-react";

const NAVY = '#0a1628';
const GOLD = '#C8922A';
const CREAM = '#FAF8F4';
const CREAM_DEEP = '#EEE9E2';

const INDUSTRIES = [
  { icon: Factory, name: "Engineering & EPC", desc: "Tier-1 engineering, procurement, and construction firms managing multi-billion-dollar program portfolios." },
  { icon: Zap, name: "Utilities", desc: "Investor-owned, municipal, and cooperative utilities running long-cycle capital and T&D programs." },
  { icon: Fuel, name: "Energy", desc: "Oil, gas, renewables, and power generation programs with regulated compliance and Stage Gate discipline." },
  { icon: Train, name: "Transportation & Infrastructure", desc: "DOTs, transit authorities, and infrastructure programs requiring document control at federal scale." },
  { icon: Landmark, name: "Federal & Owner Programs", desc: "Owner's representatives and federal program offices managing prime contractor and program-level oversight." },
  { icon: Building2, name: "Capital Programs", desc: "Healthcare, higher education, and corporate capital programs running multiple concurrent projects." },
  { icon: Mountain, name: "Tribal & Public Sector", desc: "Tribal governments, nations, and public sector organizations served through Fuzion Chickasaw Group." },
];

function AnimatedElement({ children, className, delay = 0 }) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight) { setIsVisible(true); return; }
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setTimeout(() => setIsVisible(true), delay); observer.unobserve(el); }
    }, { threshold: 0.05, rootMargin: '0px 0px 200px 0px' });
    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);
  return (
    <div ref={ref} className={`transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'} ${className || ''}`}>
      {children}
    </div>
  );
}

export default function BuiltForIndustries() {
  return (
    <section className="py-32" style={{ background: CREAM_DEEP }}>
      <div className="max-w-7xl mx-auto px-6">
        <AnimatedElement>
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-24 items-end mb-16">
            <div className="lg:w-1/2">
              <p className="text-[10px] tracking-[0.3em] uppercase mb-4 font-semibold" style={{ color: GOLD }}>Built For</p>
              <h2 className="text-4xl sm:text-5xl lg:text-[3.5rem] font-medium leading-[1.1]" style={{ fontFamily: "'Cormorant Garamond', serif", color: NAVY }}>
                The programs<br />we were built for.
              </h2>
            </div>
            <div className="lg:w-1/2 pb-2">
              <p className="text-gray-600 text-base leading-relaxed font-normal">
                The Works Suite is engineered for high-stakes, regulated, long-cycle programs — where document control is audit-grade, schedule slip costs millions, and the executive team needs the same view as the field.
              </p>
            </div>
          </div>
        </AnimatedElement>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border border-gray-200">
          {INDUSTRIES.map((ind, i) => (
            <AnimatedElement key={i} delay={i * 80} className="h-full">
              <div className="p-8 h-full border-r border-b border-gray-200 hover:shadow-md transition-shadow duration-300" style={{ background: CREAM }}>
                <div className="w-10 h-10 border border-gray-200 flex items-center justify-center mb-6">
                  <ind.icon className="w-4 h-4" style={{ color: GOLD }} />
                </div>
                <h3 className="text-lg font-semibold mb-3 leading-snug" style={{ fontFamily: "'Cormorant Garamond', serif", color: NAVY }}>{ind.name}</h3>
                <p className="text-gray-600 text-[14px] leading-relaxed font-normal">{ind.desc}</p>
              </div>
            </AnimatedElement>
          ))}
        </div>
      </div>
    </section>
  );
}