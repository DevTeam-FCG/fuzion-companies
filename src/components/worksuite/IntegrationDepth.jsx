import { useState, useEffect, useRef } from "react";

const NAVY = '#0a1628';
const GOLD = '#C8922A';
const CREAM = '#FAF8F4';

const INTEGRATIONS = [
  { name: "Microsoft 365", category: "Productivity & Identity" },
  { name: "Bluebeam", category: "Drawing & Markup" },
  { name: "SAP", category: "Enterprise ERP" },
  { name: "Oracle", category: "Enterprise ERP" },
  { name: "Maximo", category: "Asset Management" },
  { name: "ESRI", category: "GIS & Mapping" },
  { name: "AWS", category: "Cloud Infrastructure" },
  { name: "PowerApps", category: "Low-Code Extension" },
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

export default function IntegrationDepth() {
  return (
    <section className="py-24 border-t border-gray-200" style={{ background: CREAM }}>
      <div className="max-w-7xl mx-auto px-6">
        <AnimatedElement>
          <div className="flex flex-col lg:flex-row gap-10 lg:gap-24 items-end mb-12">
            <div className="lg:w-1/2">
              <p className="text-[10px] tracking-[0.3em] uppercase mb-4 font-semibold" style={{ color: GOLD }}>Integration Depth</p>
              <h2 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-medium leading-[1.1]" style={{ fontFamily: "'Cormorant Garamond', serif", color: NAVY }}>
                Native to the systems<br />you already run.
              </h2>
            </div>
            <div className="lg:w-1/2 pb-2">
              <p className="text-gray-600 text-base leading-relaxed font-normal">
                The Works Suite was engineered around the platforms enterprise programs depend on — not as bolt-on connectors, but as first-class integrations built by people who have implemented each one in production.
              </p>
            </div>
          </div>
        </AnimatedElement>

        <AnimatedElement delay={150}>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 border border-gray-200">
            {INTEGRATIONS.map((item, i) => (
              <div key={i} className="p-6 border-r border-b border-gray-200 flex flex-col items-center justify-center text-center min-h-[120px] hover:bg-white transition-colors duration-300" style={{ background: CREAM }}>
                <p className="text-[15px] font-semibold mb-1.5 tracking-wide" style={{ color: NAVY, fontFamily: "'Cormorant Garamond', serif" }}>{item.name}</p>
                <p className="text-[9px] tracking-[0.15em] uppercase font-semibold text-gray-400 leading-tight">{item.category}</p>
              </div>
            ))}
          </div>
        </AnimatedElement>
      </div>
    </section>
  );
}