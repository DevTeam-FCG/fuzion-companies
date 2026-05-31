import { useState, useEffect, useRef } from "react";
import { Workflow, Layers, Cpu, Cloud, GanttChart, ShieldCheck } from "lucide-react";

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

export default function Capabilities() {
  const capabilities = [
    { icon: Workflow, title: "Workflow Automation", desc: "Replace manual approvals and email chains with clean, measurable, audit-ready processes." },
    { icon: Layers, title: "Document & Construction SaaS", desc: "Modern platforms that streamline approvals, documentation, scheduling, and project delivery." },
    { icon: Cpu, title: "AI Engineering", desc: "Practical AI that reduces overhead, automates decisions, and increases output — built in, not bolted on." },
    { icon: Cloud, title: "M365 & Cloud", desc: "Microsoft 365 implementation, governance, security hardening, and cloud cost control." },
    { icon: GanttChart, title: "Program Controls", desc: "Long-range forecasting, Stage Gate management, and integration with SAP, Oracle, and Maximo." },
    { icon: ShieldCheck, title: "Integration Strategy", desc: "Connect tools, data, and workflows so your operations run as a single coherent system." },
  ];

  return (
    <section id="capabilities" className="py-32" style={{ background: CREAM }}>
      <div className="max-w-7xl mx-auto px-6">
        <AnimatedElement>
          <p className="text-[10px] tracking-[0.3em] uppercase mb-4 font-semibold" style={{ color: GOLD }}>Capabilities</p>
          <h2 className="text-4xl sm:text-5xl lg:text-[3.5rem] font-medium mb-6 leading-[1.1]" style={{ fontFamily: "'Cormorant Garamond', serif", color: NAVY }}>
            What the suite does.
          </h2>
          <p className="text-base leading-relaxed mb-16 max-w-2xl font-normal" style={{ color: NAVY, opacity: 0.75 }}>
            The Works Suite is the productized expression of every engagement Fuzion Consulting Group has delivered. Every capability has been earned in the field.
          </p>
        </AnimatedElement>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-0 border border-gray-200">
          {capabilities.map((c, i) => (
            <AnimatedElement key={i} delay={i * 80}>
              <div className="p-8 border-r border-b border-gray-200 hover:shadow-sm transition-shadow duration-300 h-full" style={{ background: CREAM }}>
                <div className="w-10 h-10 border border-gray-200 flex items-center justify-center mb-6">
                  <c.icon className="w-4 h-4" style={{ color: GOLD }} />
                </div>
                <h3 className="text-xl font-semibold mb-3" style={{ fontFamily: "'Cormorant Garamond', serif", color: NAVY }}>{c.title}</h3>
                <p className="text-[14px] leading-relaxed font-normal" style={{ color: NAVY, opacity: 0.75 }}>{c.desc}</p>
              </div>
            </AnimatedElement>
          ))}
        </div>
      </div>
    </section>
  );
}