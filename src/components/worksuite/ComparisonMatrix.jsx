import { useState, useEffect, useRef } from "react";
import { Check, Minus, CircleDot } from "lucide-react";

const NAVY = '#0a1628';
const NAVY2 = '#0d1f3c';
const GOLD = '#C8922A';

// Cell values: "yes" | "partial" | "no"
const CAPABILITIES = [
  { capability: "Native Microsoft 365 integration", works: "yes", procore: "partial", aconex: "no", acc: "no", hexagon: "no" },
  { capability: "Bluebeam connectivity", works: "yes", procore: "partial", aconex: "no", acc: "partial", hexagon: "no" },
  { capability: "Stage Gate 1–5 forecasting", works: "yes", procore: "no", aconex: "no", acc: "no", hexagon: "partial" },
  { capability: "SAP / Oracle / Maximo integration", works: "yes", procore: "partial", aconex: "yes", acc: "no", hexagon: "yes" },
  { capability: "AI-native document understanding", works: "yes", procore: "partial", aconex: "no", acc: "partial", hexagon: "no" },
  { capability: "Custom forms & configurable workflows", works: "yes", procore: "partial", aconex: "partial", acc: "yes", hexagon: "partial" },
  { capability: "Client-tenant deployment (your M365 / AWS)", works: "yes", procore: "no", aconex: "no", acc: "no", hexagon: "no" },
  { capability: "Per-project pricing model", works: "yes", procore: "no", aconex: "no", acc: "no", hexagon: "no" },
  { capability: "Owner / EPC / Contractor agnostic", works: "yes", procore: "partial", aconex: "yes", acc: "partial", hexagon: "yes" },
  { capability: "PowerApps-extensible architecture", works: "yes", procore: "no", aconex: "no", acc: "no", hexagon: "no" },
];

const COLUMNS = [
  { key: "works", label: "Works Suite", sub: "Fuzion", highlight: true },
  { key: "procore", label: "Procore", sub: "", highlight: false },
  { key: "aconex", label: "Aconex", sub: "Oracle", highlight: false },
  { key: "acc", label: "ACC", sub: "Autodesk", highlight: false },
  { key: "hexagon", label: "Hexagon", sub: "", highlight: false },
];

function Cell({ value, highlight }) {
  if (value === "yes") {
    return (
      <div className="flex justify-center">
        <div className="w-7 h-7 flex items-center justify-center" style={{ background: highlight ? GOLD : `${GOLD}22` }}>
          <Check className="w-3.5 h-3.5" style={{ color: highlight ? 'white' : GOLD }} strokeWidth={3} />
        </div>
      </div>
    );
  }
  if (value === "partial") {
    return (
      <div className="flex justify-center">
        <div className="w-7 h-7 flex items-center justify-center border border-gray-300">
          <CircleDot className="w-3.5 h-3.5 text-gray-400" />
        </div>
      </div>
    );
  }
  return (
    <div className="flex justify-center">
      <div className="w-7 h-7 flex items-center justify-center">
        <Minus className="w-3.5 h-3.5 text-gray-300" />
      </div>
    </div>
  );
}

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

export default function ComparisonMatrix() {
  return (
    <section className="py-32" style={{ background: `linear-gradient(160deg, ${NAVY} 0%, ${NAVY2} 100%)` }}>
      <div className="max-w-7xl mx-auto px-6">
        <AnimatedElement>
          <div className="flex flex-col lg:flex-row gap-10 lg:gap-24 items-end mb-16">
            <div className="lg:w-1/2">
              <p className="text-[10px] tracking-[0.3em] uppercase mb-4 font-semibold" style={{ color: GOLD }}>Capability Comparison</p>
              <h2 className="text-4xl sm:text-5xl lg:text-[3.5rem] font-medium leading-[1.1] text-white" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                How the Works Suite<br />compares.
              </h2>
            </div>
            <div className="lg:w-1/2 pb-2">
              <p className="text-white/70 text-base leading-relaxed font-normal">
                A capability-by-capability comparison against the platforms enterprise programs most commonly evaluate. Where peers offer a capability, we recognize it. Where the Works Suite goes further — particularly in M365 integration, Stage Gate forecasting, and client-tenant deployment — we say so plainly.
              </p>
            </div>
          </div>
        </AnimatedElement>

        <AnimatedElement delay={150}>
          {/* Legend */}
          <div className="flex flex-wrap items-center gap-6 mb-6">
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 flex items-center justify-center" style={{ background: `${GOLD}22` }}>
                <Check className="w-3 h-3" style={{ color: GOLD }} strokeWidth={3} />
              </div>
              <span className="text-white/70 text-[11px] tracking-[0.15em] uppercase font-semibold">Full</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 flex items-center justify-center border border-white/30">
                <CircleDot className="w-3 h-3 text-white/50" />
              </div>
              <span className="text-white/70 text-[11px] tracking-[0.15em] uppercase font-semibold">Partial</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 flex items-center justify-center">
                <Minus className="w-3 h-3 text-white/40" />
              </div>
              <span className="text-white/70 text-[11px] tracking-[0.15em] uppercase font-semibold">Not Available</span>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto bg-white">
            <table className="w-full min-w-[800px] border-collapse">
              <thead>
                <tr style={{ background: NAVY }}>
                  <th className="text-left p-5 border-r border-white/10">
                    <p className="text-[10px] tracking-[0.2em] uppercase font-semibold text-white/60">Capability</p>
                  </th>
                  {COLUMNS.map((col) => (
                    <th key={col.key} className="p-5 border-r border-white/10 last:border-r-0 text-center min-w-[110px]" style={{ background: col.highlight ? GOLD : NAVY }}>
                      <p className="text-[13px] font-semibold tracking-wide text-white leading-tight" style={{ fontFamily: "'Cormorant Garamond', serif" }}>{col.label}</p>
                      {col.sub && <p className="text-[9px] tracking-[0.15em] uppercase font-semibold mt-1 text-white/70">{col.sub}</p>}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {CAPABILITIES.map((row, i) => (
                  <tr key={i} className="border-b border-gray-200 last:border-b-0 hover:bg-gray-50 transition-colors">
                    <td className="p-4 border-r border-gray-200 text-[14px] font-medium" style={{ color: NAVY }}>{row.capability}</td>
                    {COLUMNS.map((col) => (
                      <td key={col.key} className="p-4 border-r border-gray-200 last:border-r-0 text-center" style={{ background: col.highlight ? `${GOLD}08` : 'transparent' }}>
                        <Cell value={row[col.key]} highlight={col.highlight} />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Footnote */}
          <p className="text-white/50 text-[11px] leading-relaxed mt-6 max-w-4xl italic font-normal">
            Comparison reflects Fuzion Consulting Group's assessment based on publicly available product documentation, standard product editions, and direct field experience as of May 2026. Competitor product capabilities continue to evolve — readers are encouraged to verify current functionality directly with each vendor. Procore, Aconex (Oracle), Autodesk Construction Cloud, and Hexagon trademarks remain the property of their respective owners.
          </p>
        </AnimatedElement>
      </div>
    </section>
  );
}