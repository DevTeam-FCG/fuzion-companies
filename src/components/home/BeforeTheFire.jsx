import { useState, useEffect, useRef } from "react";
import { Briefcase, Layers, Flame } from "lucide-react";

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

const PILLARS = [
  {
    icon: Briefcase,
    eyebrow: "Founded 2019",
    title: "35+ Years Combined Experience",
    body: "Program management, business process optimization, engineering, construction, document management, SaaS, and Microsoft 365 — built by practitioners who have spent decades inside large-scale capital programs.",
  },
  {
    icon: Layers,
    eyebrow: "The Works Suite",
    title: "Building enterprise software, by design",
    body: "Fuzion365 Fieldworks live and in deployment. Construct Works and ProjectWorks in active development — purpose-built for EPC, utility, and regulated programs that demand audit-grade discipline.",
  },
  {
    icon: Flame,
    eyebrow: "February 17, 2026",
    title: "Then the Ranger Road Fire happened",
    body: "We drove into Gate, Oklahoma with a hay trailer and our own time. We met Rancher Navy. The work expanded — but the people, the values, and the engineering discipline were already in place.",
  },
];

export default function BeforeTheFire() {
  return (
    <section className="py-32 border-t border-gray-200" style={{ background: CREAM }}>
      <div className="max-w-7xl mx-auto px-6">
        <AnimatedElement>
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-24 mb-16 items-end">
            <div className="lg:w-1/2">
              <p className="text-[10px] tracking-[0.3em] uppercase mb-4 font-semibold" style={{ color: GOLD }}>Before The Fire</p>
              <h2 className="text-4xl sm:text-5xl lg:text-[3.5rem] font-medium leading-[1.1]" style={{ fontFamily: "'Cormorant Garamond', serif", color: NAVY }}>
                Seven years of expertise.<br />
                <em className="italic font-semibold" style={{ color: GOLD }}>One moment that changed everything.</em>
              </h2>
            </div>
            <div className="lg:w-1/2 pb-2">
              <p className="text-gray-600 text-base leading-relaxed font-normal">
                Long before a wildfire rerouted our largest contract and led us to Rancher Navy, Fuzion Consulting Group was already in the work — quietly building Microsoft 365 integrations, modernizing field operations, and developing the enterprise suite that anchors everything we do today.
              </p>
            </div>
          </div>
        </AnimatedElement>

        <div className="grid grid-cols-1 md:grid-cols-3 border border-gray-200">
          {PILLARS.map((p, i) => (
            <AnimatedElement key={i} delay={i * 120} className="h-full">
              <div className="p-10 h-full flex flex-col border-r border-b border-gray-200 last:border-r-0 hover:shadow-sm transition-shadow duration-300" style={{ background: CREAM }}>
                <div className="h-1 w-12 mb-6" style={{ background: GOLD }} />
                <div className="w-10 h-10 border border-gray-200 flex items-center justify-center mb-6">
                  <p.icon className="w-4 h-4" style={{ color: GOLD }} />
                </div>
                <p className="text-[10px] tracking-[0.2em] uppercase font-semibold mb-3" style={{ color: GOLD }}>{p.eyebrow}</p>
                <h3 className="text-xl font-semibold mb-4 leading-snug" style={{ fontFamily: "'Cormorant Garamond', serif", color: NAVY }}>{p.title}</h3>
                <p className="text-gray-600 text-[14px] leading-relaxed font-normal">{p.body}</p>
              </div>
            </AnimatedElement>
          ))}
        </div>

        <AnimatedElement delay={400}>
          <p className="text-center text-gray-500 text-[13px] mt-10 max-w-3xl mx-auto font-normal italic">
            The expertise came first. The fire revealed who we are.
          </p>
        </AnimatedElement>
      </div>
    </section>
  );
}