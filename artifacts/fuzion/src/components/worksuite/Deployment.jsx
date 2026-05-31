import { useState, useEffect, useRef } from "react";

const NAVY = '#0a1628';
const NAVY2 = '#0d1f3c';
const GOLD = '#C8922A';
const INDIGO = '#3D3B8E';
const TEAL = '#1A8A6E';

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

export default function Deployment() {
  const options = [
    { name: "Fuzion-Hosted SaaS", desc: "Run on Fuzion's secure tenant. Fastest time-to-value. Managed updates, monitoring, and support included.", tag: "Fastest", color: GOLD },
    { name: "Private Tenant", desc: "Deploy The Works Suite inside your own Microsoft 365 or AWS tenant. Your data, your governance, your security posture.", tag: "Your Tenant", color: INDIGO },
    { name: "Hybrid Integration", desc: "Connect The Works Suite to your existing SAP, Oracle, Maximo, and M365 systems. We do the integration engineering.", tag: "Connected", color: TEAL },
  ];

  return (
    <section className="py-32" style={{ background: `linear-gradient(160deg, ${NAVY} 0%, ${NAVY2} 100%)` }}>
      <div className="max-w-7xl mx-auto px-6">
        <AnimatedElement>
          <p className="text-[10px] tracking-[0.3em] uppercase mb-4 font-semibold" style={{ color: GOLD }}>Deployment</p>
          <h2 className="text-4xl sm:text-5xl lg:text-[3.5rem] font-medium mb-6 leading-[1.1] text-white" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
            Your tenant or ours.
          </h2>
          <p className="text-white/70 text-base leading-relaxed mb-16 max-w-2xl font-normal">
            Built for regulated industries that need flexibility. Three deployment paths — each with the same product, the same data model, and the same engineering team behind it.
          </p>
        </AnimatedElement>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-px" style={{ background: 'rgba(255,255,255,0.1)' }}>
          {options.map((o, i) => (
            <AnimatedElement key={i} delay={i * 100}>
              <div className="p-10 h-full" style={{ background: NAVY }}>
                <span className="text-[9px] font-bold tracking-[0.15em] uppercase px-2 py-0.5 inline-block mb-6" style={{ background: `${o.color}25`, color: o.color }}>{o.tag}</span>
                <h3 className="text-2xl font-semibold mb-4 text-white" style={{ fontFamily: "'Cormorant Garamond', serif" }}>{o.name}</h3>
                <p className="text-white/70 text-[14px] leading-relaxed font-normal">{o.desc}</p>
              </div>
            </AnimatedElement>
          ))}
        </div>
      </div>
    </section>
  );
}