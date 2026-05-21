import { useState, useEffect, useRef } from "react";
import { Check, Minus } from "lucide-react";

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

const Yes = () => <Check className="w-4 h-4 mx-auto" style={{ color: '#1A8A6E' }} strokeWidth={3} />;
const No = () => <Minus className="w-4 h-4 mx-auto text-gray-300" strokeWidth={3} />;
const Partial = () => <span className="text-[10px] font-bold tracking-wider uppercase" style={{ color: GOLD }}>Partial</span>;

export default function ComparisonMatrix() {
  const competitors = ["The Works Suite", "Procore", "Aconex", "Autodesk CC", "Hexagon"];

  const rows = [
    { label: "Native Microsoft 365 integration", values: [<Yes key="1"/>, <No key="2"/>, <No key="3"/>, <Partial key="4"/>, <No key="5"/>] },
    { label: "Bluebeam connectivity", values: [<Yes key="1"/>, <Partial key="2"/>, <No key="3"/>, <Partial key="4"/>, <No key="5"/>] },
    { label: "Stage Gate 1–5 forecasting", values: [<Yes key="1"/>, <No key="2"/>, <No key="3"/>, <No key="4"/>, <Partial key="5"/>] },
    { label: "AI-native document understanding", values: [<Yes key="1"/>, <Partial key="2"/>, <No key="3"/>, <Partial key="4"/>, <No key="5"/>] },
    { label: "Deploy in your own tenant", values: [<Yes key="1"/>, <No key="2"/>, <No key="3"/>, <No key="4"/>, <Partial key="5"/>] },
    { label: "SAP / Oracle / Maximo native integration", values: [<Yes key="1"/>, <Partial key="2"/>, <Partial key="3"/>, <Partial key="4"/>, <Yes key="5"/>] },
    { label: "Field + Document + Program in one suite", values: [<Yes key="1"/>, <Partial key="2"/>, <No key="3"/>, <Partial key="4"/>, <Partial key="5"/>] },
    { label: "Built by 35+ year practitioners", values: [<Yes key="1"/>, <No key="2"/>, <No key="3"/>, <No key="4"/>, <No key="5"/>] },
  ];

  return (
    <section className="py-32" style={{ background: CREAM }}>
      <div className="max-w-7xl mx-auto px-6">
        <AnimatedElement>
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <p className="text-[10px] tracking-[0.3em] uppercase mb-4 font-semibold" style={{ color: GOLD }}>The Capability Wedge</p>
            <h2 className="text-4xl sm:text-5xl lg:text-[3.5rem] font-medium leading-[1.1] mb-6" style={{ fontFamily: "'Cormorant Garamond', serif", color: NAVY }}>
              How the suite compares.
            </h2>
            <p className="text-base leading-relaxed font-normal" style={{ color: NAVY, opacity: 0.75 }}>
              Procore, Aconex, Autodesk Construction Cloud, and Hexagon are excellent at what they do — but each was built for a different era and a different problem. The Works Suite was built for what the work looks like now.
            </p>
          </div>
        </AnimatedElement>

        <AnimatedElement delay={100}>
          <div className="border border-gray-200 overflow-x-auto" style={{ background: CREAM }}>
            <table className="w-full min-w-[720px]">
              <thead>
                <tr style={{ background: NAVY }}>
                  <th className="text-left text-white text-[11px] tracking-[0.15em] uppercase font-bold px-6 py-5 border-r border-white/10">Capability</th>
                  {competitors.map((c, i) => (
                    <th key={i} className={`text-center text-white text-[11px] tracking-[0.15em] uppercase font-bold px-4 py-5 ${i < competitors.length - 1 ? 'border-r border-white/10' : ''}`} style={i === 0 ? { background: GOLD } : {}}>
                      {c}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((row, ri) => (
                  <tr key={ri} className={ri % 2 === 0 ? '' : 'bg-gray-50/50'} style={ri % 2 === 0 ? { background: CREAM } : {}}>
                    <td className="text-[14px] font-medium px-6 py-4 border-r border-gray-200 border-t" style={{ color: NAVY }}>{row.label}</td>
                    {row.values.map((v, vi) => (
                      <td key={vi} className={`text-center px-4 py-4 border-t border-gray-200 ${vi < row.values.length - 1 ? 'border-r' : ''}`} style={vi === 0 ? { background: `${GOLD}0d` } : {}}>
                        {v}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </AnimatedElement>

        <AnimatedElement delay={200}>
          <p className="text-center text-[11px] mt-6 max-w-3xl mx-auto font-normal italic leading-relaxed" style={{ color: NAVY, opacity: 0.5 }}>
            Comparison reflects Fuzion's professional assessment based on publicly available product documentation and customer-reported capabilities as of 2026. Competitor product capabilities evolve continuously; buyers should validate current capability sets directly with each vendor.
          </p>
        </AnimatedElement>
      </div>
    </section>
  );
}