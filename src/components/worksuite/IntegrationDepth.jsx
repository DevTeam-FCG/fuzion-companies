import { useState, useEffect, useRef } from "react";

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

export default function IntegrationDepth() {
  const systems = [
    { name: "Microsoft 365", category: "Native" },
    { name: "SharePoint", category: "Native" },
    { name: "PowerApps", category: "Native" },
    { name: "Bluebeam", category: "Direct" },
    { name: "SAP", category: "Direct" },
    { name: "Oracle", category: "Direct" },
    { name: "Maximo", category: "Direct" },
    { name: "ESRI / ArcGIS", category: "Direct" },
    { name: "AWS", category: "Infrastructure" },
    { name: "Azure", category: "Infrastructure" },
    { name: "Primavera P6", category: "Direct" },
    { name: "REST / GraphQL", category: "Open API" },
  ];

  return (
    <section className="py-24 border-t border-gray-200" style={{ background: CREAM }}>
      <div className="max-w-7xl mx-auto px-6">
        <AnimatedElement>
          <div className="text-center mb-16">
            <p className="text-[10px] tracking-[0.3em] uppercase mb-4 font-semibold" style={{ color: GOLD }}>Integration Depth</p>
            <h2 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-medium leading-[1.15]" style={{ fontFamily: "'Cormorant Garamond', serif", color: NAVY }}>
              Built to connect with the systems<br />enterprise programs already run on.
            </h2>
          </div>
        </AnimatedElement>

        <AnimatedElement delay={100}>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-px border border-gray-200" style={{ background: '#e5e7eb' }}>
            {systems.map((s, i) => (
              <div key={i} className="p-6 flex flex-col items-center justify-center text-center min-h-[110px] hover:shadow-sm transition-shadow duration-300" style={{ background: CREAM }}>
                <span className="text-[15px] font-semibold mb-1.5" style={{ color: NAVY, fontFamily: "'Cormorant Garamond', serif" }}>{s.name}</span>
                <span className="text-[9px] tracking-[0.18em] uppercase font-bold" style={{ color: GOLD }}>{s.category}</span>
              </div>
            ))}
          </div>
        </AnimatedElement>

        <AnimatedElement delay={200}>
          <p className="text-center text-gray-500 text-[13px] mt-8 max-w-3xl mx-auto font-normal italic">
            Open architecture. Standard APIs. No proprietary lock-in. Built on Microsoft 365 and AWS so your data and workflows stay portable.
          </p>
        </AnimatedElement>
      </div>
    </section>
  );
}